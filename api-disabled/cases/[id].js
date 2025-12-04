/**
 * SINGLE CASE API - The Eye / Oracle System
 * 
 * GET /api/cases/[id] - Get case by ID
 * PUT /api/cases/[id] - Update case
 * DELETE /api/cases/[id] - Delete case (admin only)
 */

import * as db from '../../../utils/db.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const caseData = db.getCaseById(id);
      
      if (!caseData) {
        return res.status(404).json({
          success: false,
          error: 'Case not found',
        });
      }
      
      // Get evidence for this case
      const evidence = db.getEvidence({ case_id: id });
      
      // Get provenance chain
      const provenance = db.getProvenanceChain('case', id);
      
      return res.status(200).json({
        success: true,
        data: {
          ...caseData,
          evidence,
          provenance,
        },
      });
    }

    if (req.method === 'PUT') {
      const updates = req.body;
      
      const updatedCase = db.updateCase(id, updates);
      
      if (!updatedCase) {
        return res.status(404).json({
          success: false,
          error: 'Case not found',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: updatedCase,
      });
    }

    if (req.method === 'DELETE') {
      // TODO: Add admin authentication
      const caseData = db.getCaseById(id);
      
      if (!caseData) {
        return res.status(404).json({
          success: false,
          error: 'Case not found',
        });
      }
      
      // Mark as retracted instead of deleting
      const retractedCase = db.updateCase(id, {
        status: 'RETRACTED',
        updated_by: 'admin',
      });
      
      return res.status(200).json({
        success: true,
        data: retractedCase,
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('Case API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

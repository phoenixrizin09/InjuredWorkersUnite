/**
 * CASE WORKFLOW API - The Eye / Oracle System
 * 
 * POST /api/cases/[id]/workflow - Change case status
 * 
 * Actions: submit, approve, publish, retract
 */

import * as db from '../../../../utils/db.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  const { id } = req.query;
  const { action, actor = 'admin' } = req.body;

  try {
    const caseData = db.getCaseById(id);
    
    if (!caseData) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
      });
    }

    let result;
    
    switch (action) {
      case 'submit':
        // DRAFT -> UNDER_REVIEW
        if (caseData.status !== 'DRAFT') {
          return res.status(400).json({
            success: false,
            error: 'Can only submit draft cases',
          });
        }
        result = db.submitForReview(id, actor);
        break;
        
      case 'approve':
        // UNDER_REVIEW -> APPROVED
        if (caseData.status !== 'UNDER_REVIEW') {
          return res.status(400).json({
            success: false,
            error: 'Can only approve cases under review',
          });
        }
        result = db.approveCase(id, actor);
        break;
        
      case 'publish':
        // APPROVED -> PUBLISHED
        if (caseData.status !== 'APPROVED') {
          return res.status(400).json({
            success: false,
            error: 'Can only publish approved cases',
          });
        }
        result = db.publishCase(id, actor);
        break;
        
      case 'retract':
        // Any -> RETRACTED
        result = db.updateCase(id, {
          status: 'RETRACTED',
          updated_by: actor,
        });
        break;
        
      default:
        return res.status(400).json({
          success: false,
          error: `Unknown action: ${action}. Valid actions: submit, approve, publish, retract`,
        });
    }

    return res.status(200).json({
      success: true,
      data: result,
      message: `Case ${action}ed successfully`,
    });
  } catch (error) {
    console.error('Workflow API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

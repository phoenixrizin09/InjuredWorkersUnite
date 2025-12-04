/**
 * CASES API - The Eye / Oracle System
 * 
 * GET /api/cases - List cases with filters
 * POST /api/cases - Create new case
 */

import * as db from '../../../utils/db.js';

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { status, category, scope, severity, limit = 50, offset = 0 } = req.query;
      
      let cases = db.getCases({ status, category, scope, severity });
      
      // Sort by created_at descending
      cases.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      // Pagination
      const total = cases.length;
      cases = cases.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
      
      return res.status(200).json({
        success: true,
        data: cases,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
        },
      });
    }

    if (req.method === 'POST') {
      const caseData = req.body;
      
      // Validate required fields
      if (!caseData.title || !caseData.category) {
        return res.status(400).json({
          success: false,
          error: 'Title and category are required',
        });
      }
      
      const newCase = db.createCase(caseData);
      
      return res.status(201).json({
        success: true,
        data: newCase,
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('Cases API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

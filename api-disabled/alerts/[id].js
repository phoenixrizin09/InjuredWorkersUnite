/**
 * SINGLE ALERT API - The Eye / Oracle System
 * 
 * GET /api/alerts/[id] - Get alert by ID
 * PUT /api/alerts/[id] - Update alert (acknowledge)
 */

import * as db from '../../../utils/db.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const alert = db.getAlertById(id);
      
      if (!alert) {
        return res.status(404).json({
          success: false,
          error: 'Alert not found',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: alert,
      });
    }

    if (req.method === 'PUT') {
      const { action } = req.body;
      
      if (action === 'acknowledge') {
        const acknowledged = db.acknowledgeAlert(id);
        
        if (!acknowledged) {
          return res.status(404).json({
            success: false,
            error: 'Alert not found',
          });
        }
        
        return res.status(200).json({
          success: true,
          data: acknowledged,
        });
      }
      
      return res.status(400).json({
        success: false,
        error: 'Unknown action',
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('Alert API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

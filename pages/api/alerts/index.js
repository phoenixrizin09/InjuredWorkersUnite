/**
 * ALERTS API - The Eye / Oracle System
 * 
 * GET /api/alerts - List alerts with filters
 * POST /api/alerts - Create new alert
 */

import * as db from '../../../utils/db.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { severity, category, scope, acknowledged, limit = 50, offset = 0 } = req.query;
      
      const filters = {};
      if (severity) filters.severity = severity;
      if (category) filters.category = category;
      if (scope) filters.scope = scope;
      if (acknowledged !== undefined) filters.acknowledged = acknowledged === 'true';
      
      let alerts = db.getAlerts(filters);
      
      const total = alerts.length;
      alerts = alerts.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
      
      return res.status(200).json({
        success: true,
        data: alerts,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
        },
        stats: {
          critical: db.getAlerts({ severity: 'critical' }).length,
          high: db.getAlerts({ severity: 'high' }).length,
          unacknowledged: db.getAlerts({ acknowledged: false }).length,
        },
      });
    }

    if (req.method === 'POST') {
      const alertData = req.body;
      
      if (!alertData.title || !alertData.category) {
        return res.status(400).json({
          success: false,
          error: 'Title and category are required',
        });
      }
      
      const newAlert = db.createAlert(alertData);
      
      return res.status(201).json({
        success: true,
        data: newAlert,
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('Alerts API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

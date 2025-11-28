/**
 * TARGETS API - The Eye / Oracle System
 * 
 * GET /api/targets - List targets with filters
 * POST /api/targets - Create new target
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
      const { type, jurisdiction, threat_level, status, limit = 50, offset = 0 } = req.query;
      
      let targets = db.getTargets({ type, jurisdiction, threat_level, status });
      
      // Sort by threat level and evidence count
      const threatOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      targets.sort((a, b) => {
        const threatDiff = (threatOrder[a.threat_level] || 3) - (threatOrder[b.threat_level] || 3);
        if (threatDiff !== 0) return threatDiff;
        return b.evidence_count - a.evidence_count;
      });
      
      const total = targets.length;
      targets = targets.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
      
      return res.status(200).json({
        success: true,
        data: targets,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
        },
        stats: {
          critical: db.getTargets({ threat_level: 'critical' }).length,
          high: db.getTargets({ threat_level: 'high' }).length,
          active: db.getTargets({ status: 'active_monitoring' }).length,
        },
      });
    }

    if (req.method === 'POST') {
      const targetData = req.body;
      
      if (!targetData.name || !targetData.type) {
        return res.status(400).json({
          success: false,
          error: 'Name and type are required',
        });
      }
      
      const newTarget = db.createTarget(targetData);
      
      return res.status(201).json({
        success: true,
        data: newTarget,
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('Targets API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

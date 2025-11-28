/**
 * SYSTEM STATS API - The Eye / Oracle System
 * 
 * GET /api/stats - Get system statistics
 */

import * as db from '../../utils/db.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const stats = db.getSystemStats();
    const settings = db.getSettings();
    
    return res.status(200).json({
      success: true,
      data: {
        ...stats,
        settings: {
          telegram_enabled: settings.telegram_enabled,
          email_enabled: settings.email_enabled,
          webhook_enabled: settings.webhook_enabled,
          auto_publish: settings.auto_publish,
          require_approval: settings.require_approval,
        },
        system: {
          version: '2.0.0',
          name: 'The Eye Oracle System',
          uptime: process.uptime ? process.uptime() : null,
        },
      },
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

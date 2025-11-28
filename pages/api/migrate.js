/**
 * DATA MIGRATION API - The Eye / Oracle System
 * 
 * POST /api/migrate - Migrate data from real-data-generator to database
 */

import * as db from '../../utils/db.js';

export default async function handler(req, res) {
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

  try {
    const result = await db.migrateFromRealDataGenerator();
    
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Migration API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

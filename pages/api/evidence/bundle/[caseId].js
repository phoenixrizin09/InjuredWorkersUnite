/**
 * EVIDENCE BUNDLE DOWNLOAD API - The Eye / Oracle System
 * 
 * GET /api/evidence/bundle/[caseId] - Download evidence bundle for a case
 */

import * as db from '../../../../utils/db.js';
import { EvidenceBundler } from '../../../../utils/evidence-bundler.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  const { caseId } = req.query;

  try {
    const caseData = db.getCaseById(caseId);
    
    if (!caseData) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
      });
    }

    // Only allow downloading bundles for published cases
    if (caseData.status !== 'PUBLISHED') {
      return res.status(403).json({
        success: false,
        error: 'Evidence bundles are only available for published cases',
      });
    }

    const bundler = new EvidenceBundler(db);
    const bundle = await bundler.createBundle(caseId);

    // Set headers for file download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${bundle.filename}"`);
    res.setHeader('Content-Length', bundle.size);
    res.setHeader('X-Bundle-Hash', bundle.manifest.integrity.bundle_hash);

    return res.send(bundle.content);
  } catch (error) {
    console.error('Bundle API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

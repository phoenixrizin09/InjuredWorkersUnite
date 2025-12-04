/**
 * SCAN API - The Eye / Oracle System
 * 
 * POST /api/scan - Trigger a manual scan of all sources
 * GET /api/scan - Get scan history
 */

import * as db from '../../utils/db.js';
import { UnifiedSourceMonitor } from '../../utils/connectors.js';
import { processDocument } from '../../utils/the-eye-v2-processor.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const scans = db.getRecentScans(20);
      
      return res.status(200).json({
        success: true,
        data: scans,
      });
    }

    if (req.method === 'POST') {
      const { sources = 'all' } = req.body;
      
      // Record scan start
      const scan = db.recordScan({
        source: sources,
        type: 'manual',
        started_at: new Date().toISOString(),
        status: 'running',
      });

      try {
        // Run the scan
        const monitor = new UnifiedSourceMonitor();
        const results = await monitor.scanAllSources();
        
        let alertsCreated = 0;
        let casesCreated = 0;

        // Process government data updates
        if (results.sources.openGov) {
          for (const dataset of results.sources.openGov.slice(0, 10)) {
            // Check if this might be relevant
            const relevantKeywords = ['wsib', 'disability', 'injury', 'worker', 'health', 'social'];
            const isRelevant = relevantKeywords.some(k => 
              dataset.title.toLowerCase().includes(k) ||
              dataset.description.toLowerCase().includes(k)
            );
            
            if (isRelevant) {
              // Create an alert for new relevant data
              db.createAlert({
                title: `New Government Data: ${dataset.title}`,
                message: dataset.description.substring(0, 300),
                severity: 'medium',
                category: 'government_data',
                scope: 'federal',
                source: dataset.organization,
                source_url: dataset.sourceUrl,
                verified: true,
              });
              alertsCreated++;
            }
          }
        }

        // Process legislative updates
        if (results.sources.parliament) {
          for (const bill of results.sources.parliament) {
            if (bill.relevance === 'critical' || bill.relevance === 'high') {
              db.createAlert({
                title: `Legislative Update: ${bill.number} - ${bill.title}`,
                message: bill.description,
                severity: bill.relevance === 'critical' ? 'critical' : 'high',
                category: 'legislation',
                scope: 'federal',
                source: 'Parliament of Canada',
                source_url: bill.url,
                verified: true,
              });
              alertsCreated++;
            }
          }
        }

        // Process Ontario legislation
        if (results.sources.ontarioLeg) {
          for (const bill of results.sources.ontarioLeg) {
            if (bill.relevance === 'critical' || bill.charter_violations) {
              db.createAlert({
                title: `Ontario Bill: ${bill.number} - ${bill.title}`,
                message: bill.description,
                severity: 'high',
                category: 'legislation',
                scope: 'provincial',
                source: 'Ontario Legislature',
                source_url: bill.url,
                verified: true,
              });
              alertsCreated++;
            }
          }
        }

        // Update scan record
        db.updateScan(scan.id, {
          completed_at: new Date().toISOString(),
          status: 'completed',
          items_found: results.totalItems,
          alerts_created: alertsCreated,
          cases_created: casesCreated,
        });

        return res.status(200).json({
          success: true,
          data: {
            scan_id: scan.id,
            items_found: results.totalItems,
            alerts_created: alertsCreated,
            cases_created: casesCreated,
            sources_scanned: Object.keys(results.sources),
            errors: results.errors,
          },
        });
      } catch (scanError) {
        db.updateScan(scan.id, {
          completed_at: new Date().toISOString(),
          status: 'failed',
          error: scanError.message,
        });
        throw scanError;
      }
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('Scan API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * RUN ANALYSIS PIPELINE - The Eye / Oracle System
 * 
 * Takes raw scan data and runs it through The Eye v2.0 processor
 * to extract corruption indicators, Charter violations, etc.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../data');

// Import The Eye processor
const { processDocument } = require('../utils/the-eye-v2-processor');

async function main() {
  console.log('👁️ THE EYE - Analysis Pipeline');
  console.log('===============================\n');
  console.log(`📅 Analysis started: ${new Date().toISOString()}\n`);

  // Load alerts that need analysis
  const alertsFile = path.join(DATA_DIR, 'alerts.json');
  let alerts = [];
  
  try {
    if (fs.existsSync(alertsFile)) {
      alerts = JSON.parse(fs.readFileSync(alertsFile, 'utf8'));
    }
  } catch (e) {
    console.log('No alerts to analyze');
    return;
  }

  // Find alerts without analysis
  const unanalyzed = alerts.filter(a => !a.analysis);
  console.log(`📊 Found ${unanalyzed.length} alerts needing analysis\n`);

  let analyzed = 0;
  let upgraded = 0;

  for (const alert of unanalyzed.slice(0, 20)) { // Limit to 20 per run
    try {
      console.log(`   Analyzing: ${alert.title.substring(0, 50)}...`);
      
      // Create document for The Eye
      const document = {
        title: alert.title,
        content: alert.message || '',
        metadata: {
          source: alert.source,
          date: alert.created_at,
          category: alert.category,
        },
      };

      // Run through The Eye processor
      const analysis = processDocument(document);
      
      // Update alert with analysis
      alert.analysis = {
        corruption_risk: analysis.RiskAssessment?.overall_risk_score || 0,
        charter_violations: analysis.ConstitutionViolations || [],
        uncrpd_violations: analysis.UNCRPDBreaches || [],
        corruption_findings: analysis.CorruptionFindings || [],
        recommended_actions: analysis.RecommendedActions || [],
        analyzed_at: new Date().toISOString(),
      };

      // Upgrade severity if analysis finds serious issues
      const originalSeverity = alert.severity;
      if (analysis.RiskAssessment?.overall_risk_score > 80) {
        alert.severity = 'critical';
      } else if (analysis.RiskAssessment?.overall_risk_score > 60) {
        if (alert.severity !== 'critical') {
          alert.severity = 'high';
        }
      }

      if (alert.severity !== originalSeverity) {
        console.log(`      ⬆️ Upgraded severity: ${originalSeverity} -> ${alert.severity}`);
        upgraded++;
      }

      analyzed++;
    } catch (error) {
      console.error(`      ❌ Error analyzing alert: ${error.message}`);
    }
  }

  // Save updated alerts
  fs.writeFileSync(alertsFile, JSON.stringify(alerts, null, 2));

  console.log(`\n📊 Analysis Summary:`);
  console.log(`   Alerts analyzed: ${analyzed}`);
  console.log(`   Severity upgrades: ${upgraded}`);
  console.log(`\n✅ Analysis pipeline complete!`);
}

main().catch(error => {
  console.error('❌ Analysis failed:', error);
  process.exit(1);
});

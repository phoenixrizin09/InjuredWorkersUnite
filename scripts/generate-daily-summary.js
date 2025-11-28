/**
 * GENERATE DAILY SUMMARY - The Eye / Oracle System
 * 
 * Creates a summary of the day's findings for reporting
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../data');

async function main() {
  console.log('👁️ THE EYE - Daily Summary Generator');
  console.log('=====================================\n');
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Load alerts
  const alertsFile = path.join(DATA_DIR, 'alerts.json');
  let alerts = [];
  try {
    if (fs.existsSync(alertsFile)) {
      alerts = JSON.parse(fs.readFileSync(alertsFile, 'utf8'));
    }
  } catch (e) {}

  // Filter today's alerts
  const todaysAlerts = alerts.filter(a => 
    a.created_at && a.created_at.startsWith(today)
  );

  // Count by severity
  const bySeverity = {
    critical: todaysAlerts.filter(a => a.severity === 'critical').length,
    high: todaysAlerts.filter(a => a.severity === 'high').length,
    medium: todaysAlerts.filter(a => a.severity === 'medium').length,
    low: todaysAlerts.filter(a => a.severity === 'low').length,
  };

  // Count by category
  const byCategory = {};
  todaysAlerts.forEach(a => {
    byCategory[a.category] = (byCategory[a.category] || 0) + 1;
  });

  // Find top alert
  const topAlert = todaysAlerts.find(a => a.severity === 'critical') ||
                   todaysAlerts.find(a => a.severity === 'high') ||
                   todaysAlerts[0];

  // Load scan history
  const scansFile = path.join(DATA_DIR, 'scan-history.json');
  let scans = [];
  try {
    if (fs.existsSync(scansFile)) {
      scans = JSON.parse(fs.readFileSync(scansFile, 'utf8'));
    }
  } catch (e) {}

  const todaysScans = scans.filter(s => 
    s.started_at && s.started_at.startsWith(today)
  );

  // Load cases
  const casesFile = path.join(DATA_DIR, 'cases.json');
  let cases = [];
  try {
    if (fs.existsSync(casesFile)) {
      cases = JSON.parse(fs.readFileSync(casesFile, 'utf8'));
    }
  } catch (e) {}

  const caseStats = {
    draft: cases.filter(c => c.status === 'DRAFT').length,
    underReview: cases.filter(c => c.status === 'UNDER_REVIEW').length,
    approved: cases.filter(c => c.status === 'APPROVED').length,
    published: cases.filter(c => c.status === 'PUBLISHED').length,
  };

  // Load targets
  const targetsFile = path.join(DATA_DIR, 'targets.json');
  let targets = [];
  try {
    if (fs.existsSync(targetsFile)) {
      targets = JSON.parse(fs.readFileSync(targetsFile, 'utf8'));
    }
  } catch (e) {}

  // Build summary
  const summary = {
    date: today,
    generated_at: new Date().toISOString(),
    
    alerts: {
      new_today: todaysAlerts.length,
      total: alerts.length,
      by_severity: bySeverity,
      by_category: byCategory,
      unacknowledged: alerts.filter(a => !a.acknowledged).length,
    },
    
    scans: {
      today: todaysScans.length,
      total: scans.length,
      last_scan: scans[0] || null,
    },
    
    cases: caseStats,
    
    targets: {
      total: targets.length,
      critical: targets.filter(t => t.threat_level === 'critical').length,
      active: targets.filter(t => t.status === 'active_monitoring').length,
    },
    
    top_alert: topAlert ? {
      id: topAlert.id,
      title: topAlert.title,
      severity: topAlert.severity,
      category: topAlert.category,
      source_url: topAlert.source_url,
    } : null,
    
    sources_scanned: [
      'Open Government Canada',
      'Ontario Open Data',
      'Parliament of Canada',
      'Ontario Legislature',
      'WSIB Policy Manual',
    ],
  };

  // Save summary
  const summaryFile = path.join(DATA_DIR, 'daily-summary.json');
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

  console.log('📊 Daily Summary Generated');
  console.log('==========================\n');
  console.log(`📅 Date: ${today}`);
  console.log(`\n🚨 Alerts:`);
  console.log(`   New today: ${summary.alerts.new_today}`);
  console.log(`   Critical: ${bySeverity.critical}`);
  console.log(`   High: ${bySeverity.high}`);
  console.log(`   Unacknowledged: ${summary.alerts.unacknowledged}`);
  console.log(`\n📋 Cases:`);
  console.log(`   Draft: ${caseStats.draft}`);
  console.log(`   Under Review: ${caseStats.underReview}`);
  console.log(`   Published: ${caseStats.published}`);
  console.log(`\n🎯 Targets: ${summary.targets.total} (${summary.targets.critical} critical)`);
  console.log(`\n📡 Scans today: ${summary.scans.today}`);
  
  if (topAlert) {
    console.log(`\n🔥 Top Alert: ${topAlert.title}`);
  }
  
  console.log(`\n💾 Saved to ${summaryFile}`);
  console.log('\n✅ Daily summary complete!');

  // Return summary for use by other scripts
  return summary;
}

// Export for use by other scripts
module.exports = { generateDailySummary: main };

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Summary generation failed:', error);
    process.exit(1);
  });
}

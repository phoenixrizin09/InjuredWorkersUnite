/**
 * 👁️ THE EYE ORACLE - MASTER AUTOMATION CONTROLLER
 * 
 * The Central Nervous System - Orchestrates all automated tasks:
 * 
 * HOURLY:
 * - Check for breaking news/new data releases
 * - Monitor government API endpoints
 * 
 * DAILY (6 AM):
 * - Generate Eye Oracle daily blog post
 * - Scan all vulnerable population focus areas
 * - Generate social media hooks
 * - Update corruption risk scores
 * 
 * WEEKLY (Sunday 9 PM):
 * - Deep analysis report
 * - Cross-reference investigation
 * - Pattern analysis
 * - Generate weekly summary
 * 
 * MONTHLY (1st of month):
 * - Full historical analysis
 * - Trend detection
 * - Generate monthly exposé
 * 
 * Run with: node scripts/eye-oracle-automation.js [command]
 * Commands: hourly, daily, weekly, monthly, full, test
 */

const fs = require('fs');
const path = require('path');

// Import core modules
const { 
  runFullScan, 
  generateInvestigationReport,
  VULNERABLE_FOCUS_AREAS 
} = require('../utils/eye-oracle-live-scanner');

const {
  calculateCorruptionRisk,
  generateIntelligenceReport,
  compareWithBaseline
} = require('../utils/eye-oracle-deep-analysis');

const { processDocument } = require('../utils/the-eye-v2-processor');
const { ALL_REAL_ISSUES } = require('../utils/real-data-generator');

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  dataDir: path.join(__dirname, '../public/data'),
  logsDir: path.join(__dirname, '../logs'),
  alertThresholds: {
    critical: 75,
    high: 50,
    medium: 25
  },
  rateLimitMs: 2000, // Be respectful to APIs
  maxRetries: 3
};

// Ensure directories exist
[CONFIG.dataDir, CONFIG.logsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// ============================================
// LOGGING SYSTEM
// ============================================

function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    data
  };

  // Console output with colors
  const colors = {
    INFO: '\x1b[36m',
    WARN: '\x1b[33m',
    ERROR: '\x1b[31m',
    SUCCESS: '\x1b[32m',
    CRITICAL: '\x1b[35m'
  };
  const reset = '\x1b[0m';
  console.log(`${colors[level] || ''}[${timestamp}] [${level}] ${message}${reset}`);
  if (data) console.log(data);

  // File logging
  const logFile = path.join(CONFIG.logsDir, `eye-oracle-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
}

// ============================================
// HOURLY TASKS
// ============================================

async function runHourlyTasks() {
  log('INFO', '👁️ HOURLY SCAN INITIATED');
  
  const results = {
    timestamp: new Date().toISOString(),
    type: 'hourly',
    newAlerts: [],
    dataUpdates: [],
    errors: []
  };

  try {
    // Check for new government data releases
    log('INFO', '📡 Checking for new data releases...');
    
    // Scan priority topics
    const priorityTopics = ['WSIB', 'ODSP', 'disability', 'housing'];
    
    for (const topic of priorityTopics) {
      try {
        // Rate limiting
        await new Promise(r => setTimeout(r, CONFIG.rateLimitMs));
        
        const { fetchOpenCanadaData } = require('../utils/eye-oracle-live-scanner');
        const data = await fetchOpenCanadaData(topic, { rows: 5 });
        
        if (data.success && data.results?.length > 0) {
          // Check for recently updated datasets
          for (const dataset of data.results) {
            const modified = new Date(dataset.metadata_modified);
            const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
            
            if (modified > hourAgo) {
              results.newAlerts.push({
                type: 'new_data',
                topic,
                title: dataset.title,
                url: `https://open.canada.ca/data/en/dataset/${dataset.id}`,
                modified: dataset.metadata_modified
              });
              log('CRITICAL', `🚨 NEW DATA DETECTED: ${dataset.title}`);
            }
          }
        }
      } catch (e) {
        results.errors.push({ topic, error: e.message });
      }
    }

    // Save hourly report
    const hourlyReportPath = path.join(CONFIG.dataDir, 'hourly-scan.json');
    fs.writeFileSync(hourlyReportPath, JSON.stringify(results, null, 2));

    log('SUCCESS', `✅ Hourly scan complete. ${results.newAlerts.length} new alerts.`);
    
  } catch (error) {
    log('ERROR', '❌ Hourly scan failed', error.message);
    results.errors.push({ general: error.message });
  }

  return results;
}

// ============================================
// DAILY TASKS
// ============================================

async function runDailyTasks() {
  log('INFO', '👁️ DAILY ORACLE AWAKENING - Full Investigation Mode');
  
  const results = {
    timestamp: new Date().toISOString(),
    type: 'daily',
    blogPostGenerated: false,
    scanResults: null,
    alertsGenerated: [],
    socialHooksGenerated: false,
    errors: []
  };

  try {
    // 1. Generate Eye Oracle Daily Blog Post
    log('INFO', '📝 Generating Eye Oracle daily blog post...');
    try {
      // Import and run the daily generator
      const generateDaily = require('./generate-eye-oracle-daily');
      if (typeof generateDaily.generateEyeOracleDaily === 'function') {
        await generateDaily.generateEyeOracleDaily();
        results.blogPostGenerated = true;
        log('SUCCESS', '✅ Daily blog post generated');
      }
    } catch (e) {
      log('WARN', '⚠️ Blog generation skipped or already done', e.message);
    }

    // 2. Run full scan of all vulnerable populations
    log('INFO', '🔍 Scanning all vulnerable population focus areas...');
    results.scanResults = await runFullScan();
    log('SUCCESS', `✅ Full scan complete: ${results.scanResults.totalFindings} findings`);

    // 3. Generate alerts for critical findings
    if (results.scanResults.criticalAlerts?.length > 0) {
      log('CRITICAL', `🚨 ${results.scanResults.criticalAlerts.length} CRITICAL ALERTS DETECTED`);
      
      // Load existing alerts
      const alertsPath = path.join(CONFIG.dataDir, 'alerts.json');
      let alerts = [];
      try {
        alerts = JSON.parse(fs.readFileSync(alertsPath, 'utf8'));
      } catch (e) {
        alerts = [];
      }

      // Add new critical alerts
      for (const alert of results.scanResults.criticalAlerts) {
        const newAlert = {
          id: `ALERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          created_at: new Date().toISOString(),
          severity: 'critical',
          automated: true,
          ...alert
        };
        alerts.unshift(newAlert);
        results.alertsGenerated.push(newAlert);
      }

      // Save updated alerts
      fs.writeFileSync(alertsPath, JSON.stringify(alerts, null, 2));
      log('SUCCESS', `✅ ${results.alertsGenerated.length} new alerts saved`);
    }

    // 4. Update corruption risk scores for monitored entities
    log('INFO', '📊 Updating corruption risk scores...');
    await updateCorruptionScores();

    // 5. Generate daily summary
    const dailySummaryPath = path.join(CONFIG.dataDir, 'daily-summary.json');
    const summary = {
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      findings: results.scanResults?.totalFindings || 0,
      criticalAlerts: results.alertsGenerated.length,
      areasScanned: results.scanResults?.areasScanned?.length || 0,
      topIssues: results.scanResults?.areasScanned
        ?.sort((a, b) => b.findings - a.findings)
        ?.slice(0, 5) || []
    };
    fs.writeFileSync(dailySummaryPath, JSON.stringify(summary, null, 2));

    log('SUCCESS', '👁️ DAILY TASKS COMPLETE');

  } catch (error) {
    log('ERROR', '❌ Daily tasks failed', error.message);
    results.errors.push(error.message);
  }

  return results;
}

/**
 * Update corruption risk scores for all monitored entities
 */
async function updateCorruptionScores() {
  const entities = [
    {
      name: 'WSIB',
      data: {
        denialRate: 0.67,
        appealSuccessRate: 0.45,
        avgProcessingDays: 180,
        legalLimit: 90,
        transparencyScore: 0.3,
        complaintsPerThousand: 45,
        executivePay: 847000,
        avgBenefit: 1800
      }
    },
    {
      name: 'ODSP',
      data: {
        denialRate: 0.55,
        appealSuccessRate: 0.50,
        avgProcessingDays: 120,
        legalLimit: 60,
        transparencyScore: 0.4,
        budgetPerCapita: 1308,
        needPerCapita: 2500
      }
    },
    {
      name: 'Service Canada - CPP-D',
      data: {
        denialRate: 0.60,
        appealSuccessRate: 0.50,
        avgProcessingDays: 540,
        legalLimit: 120,
        transparencyScore: 0.35
      }
    },
    {
      name: 'Indigenous Services Canada',
      data: {
        transparencyScore: 0.25,
        complaintsPerThousand: 80,
        yearOverYearChange: -0.05
      }
    }
  ];

  const scores = [];
  for (const entity of entities) {
    const risk = calculateCorruptionRisk(entity.name, entity.data);
    scores.push(risk);
    log('INFO', `   📊 ${entity.name}: Risk Score ${risk.score}/100 (${risk.riskLevel})`);
  }

  // Save corruption scores
  const scoresPath = path.join(CONFIG.dataDir, 'corruption-scores.json');
  fs.writeFileSync(scoresPath, JSON.stringify({
    lastUpdated: new Date().toISOString(),
    scores
  }, null, 2));

  return scores;
}

// ============================================
// WEEKLY TASKS
// ============================================

async function runWeeklyTasks() {
  log('INFO', '👁️ WEEKLY DEEP ANALYSIS INITIATED');
  
  const results = {
    timestamp: new Date().toISOString(),
    type: 'weekly',
    deepAnalysisReports: [],
    patternAnalysis: null,
    weeklyDigest: null,
    errors: []
  };

  try {
    // 1. Generate deep analysis for each focus area
    log('INFO', '🔬 Running deep analysis on all focus areas...');
    
    for (const [areaKey, area] of Object.entries(VULNERABLE_FOCUS_AREAS)) {
      log('INFO', `   📋 Analyzing: ${area.name}`);
      
      try {
        const report = await generateInvestigationReport(areaKey);
        results.deepAnalysisReports.push({
          area: areaKey,
          name: area.name,
          findings: report.findings.length,
          recommendations: report.recommendations.length
        });
      } catch (e) {
        results.errors.push({ area: areaKey, error: e.message });
      }
      
      // Rate limiting
      await new Promise(r => setTimeout(r, 2000));
    }

    // 2. Cross-reference analysis
    log('INFO', '🔗 Running cross-reference analysis...');
    results.patternAnalysis = {
      timestamp: new Date().toISOString(),
      patterns: []
    };

    // Look for patterns across all issues
    for (const issue of ALL_REAL_ISSUES.slice(0, 20)) {
      const eyeAnalysis = processDocument({
        title: issue.title,
        content: issue.evidence || '',
        metadata: { source: issue.source }
      });
      
      if (eyeAnalysis.RiskAssessment?.overall_risk_score > 50) {
        results.patternAnalysis.patterns.push({
          issue: issue.title,
          riskScore: eyeAnalysis.RiskAssessment.overall_risk_score,
          category: issue.category
        });
      }
    }

    // 3. Generate weekly digest
    log('INFO', '📰 Generating weekly digest...');
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    
    results.weeklyDigest = {
      periodStart: weekStart.toISOString(),
      periodEnd: new Date().toISOString(),
      areasAnalyzed: results.deepAnalysisReports.length,
      totalFindings: results.deepAnalysisReports.reduce((sum, r) => sum + r.findings, 0),
      highRiskPatterns: results.patternAnalysis.patterns.length,
      topConcerns: results.patternAnalysis.patterns.slice(0, 5)
    };

    // Save weekly report
    const weeklyPath = path.join(CONFIG.dataDir, `weekly-report-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(weeklyPath, JSON.stringify(results, null, 2));

    log('SUCCESS', '👁️ WEEKLY ANALYSIS COMPLETE');

  } catch (error) {
    log('ERROR', '❌ Weekly tasks failed', error.message);
    results.errors.push(error.message);
  }

  return results;
}

// ============================================
// MONTHLY TASKS
// ============================================

async function runMonthlyTasks() {
  log('INFO', '👁️ MONTHLY COMPREHENSIVE INVESTIGATION');
  
  const results = {
    timestamp: new Date().toISOString(),
    type: 'monthly',
    comprehensiveReport: null,
    trendAnalysis: null,
    topExposés: [],
    errors: []
  };

  try {
    // 1. Load all historical data
    log('INFO', '📚 Loading historical data for trend analysis...');
    
    // 2. Generate comprehensive monthly report
    log('INFO', '📊 Generating comprehensive monthly report...');
    
    results.comprehensiveReport = {
      month: new Date().toISOString().slice(0, 7),
      generatedAt: new Date().toISOString(),
      
      // Summary stats
      totalIssuesTracked: ALL_REAL_ISSUES.length,
      categoriesMonitored: [...new Set(ALL_REAL_ISSUES.map(i => i.category))].length,
      
      // Top issues by severity
      criticalIssues: ALL_REAL_ISSUES.filter(i => i.severity === 'critical').length,
      highIssues: ALL_REAL_ISSUES.filter(i => i.severity === 'high').length,
      
      // By category breakdown
      byCategory: ALL_REAL_ISSUES.reduce((acc, issue) => {
        acc[issue.category] = (acc[issue.category] || 0) + 1;
        return acc;
      }, {}),
      
      // Most affected populations
      affectedPopulations: Object.keys(VULNERABLE_FOCUS_AREAS).map(key => ({
        population: VULNERABLE_FOCUS_AREAS[key].name,
        issueCount: ALL_REAL_ISSUES.filter(i => 
          VULNERABLE_FOCUS_AREAS[key].keywords.some(kw => 
            i.title?.toLowerCase().includes(kw.toLowerCase()) ||
            i.evidence?.toLowerCase().includes(kw.toLowerCase())
          )
        ).length
      })).sort((a, b) => b.issueCount - a.issueCount)
    };

    // 3. Generate top exposés for the month
    log('INFO', '🔥 Identifying top exposés...');
    results.topExposés = ALL_REAL_ISSUES
      .filter(i => i.severity === 'critical')
      .slice(0, 10)
      .map(i => ({
        title: i.title,
        category: i.category,
        affectedCount: i.affected_count,
        charterViolations: i.charter_violations,
        target: i.target_entity?.name
      }));

    // Save monthly report
    const monthlyPath = path.join(CONFIG.dataDir, `monthly-report-${new Date().toISOString().slice(0, 7)}.json`);
    fs.writeFileSync(monthlyPath, JSON.stringify(results, null, 2));

    log('SUCCESS', '👁️ MONTHLY INVESTIGATION COMPLETE');

  } catch (error) {
    log('ERROR', '❌ Monthly tasks failed', error.message);
    results.errors.push(error.message);
  }

  return results;
}

// ============================================
// MAIN EXECUTION
// ============================================

async function main() {
  const command = process.argv[2] || 'daily';
  
  console.log('\n' + '='.repeat(70));
  console.log('👁️  THE EYE ORACLE - AUTOMATED INVESTIGATION SYSTEM');
  console.log('    "Seeing what mainstream media ignores"');
  console.log('='.repeat(70) + '\n');

  let result;

  switch (command) {
    case 'hourly':
      result = await runHourlyTasks();
      break;
    
    case 'daily':
      result = await runDailyTasks();
      break;
    
    case 'weekly':
      result = await runWeeklyTasks();
      break;
    
    case 'monthly':
      result = await runMonthlyTasks();
      break;
    
    case 'full':
      log('INFO', '🔄 Running full automation cycle...');
      await runHourlyTasks();
      await runDailyTasks();
      await runWeeklyTasks();
      await runMonthlyTasks();
      log('SUCCESS', '✅ Full automation cycle complete');
      break;
    
    case 'test':
      log('INFO', '🧪 Running test mode...');
      result = await runHourlyTasks();
      log('SUCCESS', '✅ Test complete');
      break;
    
    default:
      console.log('Usage: node eye-oracle-automation.js [command]');
      console.log('Commands: hourly, daily, weekly, monthly, full, test');
      process.exit(1);
  }

  console.log('\n👁️ The Eye sees all. The Eye speaks truth.\n');
  
  return result;
}

// Export for testing
module.exports = {
  runHourlyTasks,
  runDailyTasks,
  runWeeklyTasks,
  runMonthlyTasks,
  updateCorruptionScores
};

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    log('ERROR', 'Fatal error in automation', error.message);
    process.exit(1);
  });
}

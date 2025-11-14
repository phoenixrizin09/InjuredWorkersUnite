const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/wsib-policies.json');
const ALERTS_FILE = path.join(__dirname, '../../data/alerts.json');

async function monitorWSIB() {
  console.log('👁️ Monitoring WSIB Policies...');
  
  try {
    // Fetch WSIB operational policy manual
    const response = await fetch('https://www.wsib.ca/en/operational-policy-manual');
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const policies = [];
    
    // Extract policy information
    $('.policy-item, .policy-link, a[href*="policy"]').each((i, elem) => {
      const title = $(elem).text().trim();
      const href = $(elem).attr('href');
      
      if (title && title.length > 10) {
        policies.push({
          title: title,
          url: href ? `https://www.wsib.ca${href}` : null,
          scannedAt: new Date().toISOString()
        });
      }
    });
    
    console.log(`✅ Found ${policies.length} policy references`);
    
    // Load previous data
    let previousPolicies = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      previousPolicies = JSON.parse(data);
    } catch (e) {
      console.log('📝 No previous data found, creating new baseline');
    }
    
    // Detect changes
    const changes = detectChanges(policies, previousPolicies);
    
    if (changes.length > 0) {
      console.log(`🚨 Detected ${changes.length} changes`);
      
      const alerts = analyzeChanges(changes);
      
      if (alerts.length > 0) {
        await sendAlerts(alerts);
      }
    } else {
      console.log('✅ No changes detected');
    }
    
    // Save current state
    await fs.writeFile(DATA_FILE, JSON.stringify(policies, null, 2));
    console.log('💾 Data saved');
    
  } catch (error) {
    console.error('❌ Error monitoring WSIB:', error.message);
    throw error;
  }
}

function detectChanges(current, previous) {
  const changes = [];
  const prevSet = new Set(previous.map(p => p.title));
  const currSet = new Set(current.map(p => p.title));
  
  // New policies
  current.forEach(policy => {
    if (!prevSet.has(policy.title)) {
      changes.push({
        type: 'NEW_POLICY',
        policy: policy,
        severity: 'warning'
      });
    }
  });
  
  // Removed policies
  previous.forEach(policy => {
    if (!currSet.has(policy.title)) {
      changes.push({
        type: 'REMOVED_POLICY',
        policy: policy,
        severity: 'high'
      });
    }
  });
  
  return changes;
}

function analyzeChanges(changes) {
  const criticalKeywords = [
    'chronic pain', 'mental', 'psychological', 'stress',
    'denial', 'appeal', 'eligibility', 'assessment',
    'benefit', 'compensation', 'claim', 'duration'
  ];
  
  return changes.filter(change => {
    const text = JSON.stringify(change.policy).toLowerCase();
    return criticalKeywords.some(keyword => text.includes(keyword));
  }).map(change => {
    const text = JSON.stringify(change.policy).toLowerCase();
    const matchCount = criticalKeywords.filter(k => text.includes(k)).length;
    
    if (matchCount >= 3) change.severity = 'critical';
    else if (matchCount >= 2) change.severity = 'high';
    
    return change;
  });
}

async function sendAlerts(alerts) {
  try {
    let existingAlerts = [];
    try {
      const data = await fs.readFile(ALERTS_FILE, 'utf8');
      existingAlerts = JSON.parse(data);
    } catch (e) {
      // File doesn't exist yet
    }
    
    const newAlerts = alerts.map(alert => ({
      source: 'WSIB',
      type: alert.type.replace('_', ' '),
      severity: alert.severity,
      title: alert.policy.title,
      details: {},
      url: alert.policy.url || 'https://www.wsib.ca/en/operational-policy-manual',
      timestamp: new Date().toISOString(),
      emoji: getEmoji(alert.severity)
    }));
    
    const allAlerts = [...newAlerts, ...existingAlerts].slice(0, 100);
    
    await fs.writeFile(ALERTS_FILE, JSON.stringify(allAlerts, null, 2));
    console.log(`✅ Saved ${newAlerts.length} alerts to file`);
    
  } catch (error) {
    console.error('❌ Error saving alerts:', error.message);
  }
}

function getEmoji(severity) {
  const emojis = {
    critical: '🔴',
    high: '🟠',
    warning: '🟡',
    info: '🔵'
  };
  return emojis[severity] || '⚪';
}

monitorWSIB().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

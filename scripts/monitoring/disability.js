const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/disability-benefits.json');
const ALERTS_FILE = path.join(__dirname, '../../data/alerts.json');

// Key sources to monitor
const SOURCES = {
  odsp: 'https://www.mcss.gov.on.ca/en/mcss/programs/social/odsp/',
  cpp_disability: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-disability-benefit.html',
  wsib_mental: 'https://www.wsib.ca/en/mental-stress',
  accessibility: 'https://www.ontario.ca/page/accessibility-laws'
};

async function monitorDisability() {
  console.log('👁️ Monitoring Disability Benefits & Rights...');
  
  try {
    const results = [];
    
    // Monitor ODSP
    try {
      console.log('Checking ODSP...');
      const response = await fetch(SOURCES.odsp);
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const updates = [];
      $('h2, h3, .update, .news-item, article').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text.length > 20 && text.length < 500) {
          updates.push(text);
        }
      });
      
      results.push({
        source: 'ODSP',
        url: SOURCES.odsp,
        updates: updates.slice(0, 10),
        scannedAt: new Date().toISOString()
      });
      console.log(`✅ ODSP: Found ${updates.length} sections`);
    } catch (e) {
      console.log('⚠️ ODSP check failed:', e.message);
    }
    
    // Monitor CPP Disability
    try {
      console.log('Checking CPP Disability...');
      const response = await fetch(SOURCES.cpp_disability);
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const updates = [];
      $('h2, h3, .alert, .wb-stps').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text.length > 20 && text.length < 500) {
          updates.push(text);
        }
      });
      
      results.push({
        source: 'CPP Disability',
        url: SOURCES.cpp_disability,
        updates: updates.slice(0, 10),
        scannedAt: new Date().toISOString()
      });
      console.log(`✅ CPP Disability: Found ${updates.length} sections`);
    } catch (e) {
      console.log('⚠️ CPP Disability check failed:', e.message);
    }
    
    // Monitor WSIB Mental Health
    try {
      console.log('Checking WSIB Mental Health...');
      const response = await fetch(SOURCES.wsib_mental);
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const updates = [];
      $('h2, h3, p').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text.length > 30 && text.length < 500) {
          updates.push(text);
        }
      });
      
      results.push({
        source: 'WSIB Mental Health',
        url: SOURCES.wsib_mental,
        updates: updates.slice(0, 10),
        scannedAt: new Date().toISOString()
      });
      console.log(`✅ WSIB Mental Health: Found ${updates.length} sections`);
    } catch (e) {
      console.log('⚠️ WSIB Mental Health check failed:', e.message);
    }
    
    // Monitor Accessibility Laws
    try {
      console.log('Checking Accessibility Laws...');
      const response = await fetch(SOURCES.accessibility);
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const updates = [];
      $('h2, h3, .alert, article').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text.length > 20 && text.length < 500) {
          updates.push(text);
        }
      });
      
      results.push({
        source: 'Accessibility Laws',
        url: SOURCES.accessibility,
        updates: updates.slice(0, 10),
        scannedAt: new Date().toISOString()
      });
      console.log(`✅ Accessibility: Found ${updates.length} sections`);
    } catch (e) {
      console.log('⚠️ Accessibility check failed:', e.message);
    }
    
    // Load previous data
    let previousData = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      previousData = JSON.parse(data);
    } catch (e) {
      console.log('📝 No previous data found, creating new baseline');
    }
    
    // Detect changes
    const changes = detectChanges(results, previousData);
    
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
    await fs.writeFile(DATA_FILE, JSON.stringify(results, null, 2));
    console.log('💾 Data saved');
    
  } catch (error) {
    console.error('❌ Error monitoring disability benefits:', error.message);
    throw error;
  }
}

function detectChanges(current, previous) {
  const changes = [];
  
  current.forEach(curr => {
    const prev = previous.find(p => p.source === curr.source);
    
    if (!prev) {
      changes.push({
        type: 'NEW_SOURCE',
        source: curr.source,
        data: curr,
        severity: 'info'
      });
      return;
    }
    
    // Check for new content
    const prevContent = prev.updates.join(' ');
    const currContent = curr.updates.join(' ');
    
    if (prevContent !== currContent) {
      changes.push({
        type: 'CONTENT_CHANGE',
        source: curr.source,
        data: curr,
        previous: prev,
        severity: 'warning'
      });
    }
  });
  
  return changes;
}

function analyzeChanges(changes) {
  const criticalKeywords = [
    'eligibility', 'cut', 'reduce', 'restriction', 'requirement',
    'denial', 'appeal', 'terminate', 'decrease', 'elimination',
    'stricter', 'tighten', 'limit', 'cap', 'maximum',
    'chronic pain', 'mental health', 'psychiatric', 'assessment',
    'ODSP', 'CPP-D', 'disability benefit', 'income support'
  ];
  
  const positiveKeywords = [
    'increase', 'expand', 'improve', 'enhance', 'additional',
    'new benefit', 'more support', 'simplified', 'easier'
  ];
  
  return changes.map(change => {
    const text = JSON.stringify(change.data).toLowerCase();
    
    // Count critical vs positive keywords
    const criticalCount = criticalKeywords.filter(k => text.includes(k)).length;
    const positiveCount = positiveKeywords.filter(k => text.includes(k)).length;
    
    // Determine severity
    if (criticalCount >= 3) {
      change.severity = 'critical';
    } else if (criticalCount >= 2) {
      change.severity = 'high';
    } else if (positiveCount >= 2) {
      change.severity = 'info';
    }
    
    return change;
  }).filter(change => {
    // Only alert on significant changes
    const text = JSON.stringify(change.data).toLowerCase();
    return criticalKeywords.some(k => text.includes(k)) || 
           positiveKeywords.some(k => text.includes(k));
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
      source: `Disability: ${alert.source}`,
      type: alert.type.replace('_', ' '),
      severity: alert.severity,
      title: `${alert.source} - ${alert.type.replace('_', ' ')}`,
      details: {
        updates: alert.data.updates.slice(0, 3).join(' | ')
      },
      url: alert.data.url,
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

monitorDisability().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

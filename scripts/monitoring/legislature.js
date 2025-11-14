const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/legislature-bills.json');
const ALERTS_FILE = path.join(__dirname, '../../data/alerts.json');

async function monitorLegislature() {
  console.log('👁️ Monitoring Ontario Legislature...');
  
  try {
    // Fetch current bills
    const response = await fetch('https://www.ola.org/en/legislative-business/bills');
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const bills = [];
    
    // Extract bill information
    $('.views-row').each((i, elem) => {
      const billNumber = $(elem).find('.bill-number').text().trim();
      const billTitle = $(elem).find('.bill-title').text().trim();
      const billStatus = $(elem).find('.bill-status').text().trim();
      const billSponsor = $(elem).find('.bill-sponsor').text().trim();
      
      if (billNumber) {
        bills.push({
          number: billNumber,
          title: billTitle,
          status: billStatus,
          sponsor: billSponsor,
          scannedAt: new Date().toISOString()
        });
      }
    });
    
    console.log(`✅ Found ${bills.length} bills`);
    
    // Load previous data
    let previousBills = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      previousBills = JSON.parse(data);
    } catch (e) {
      console.log('📝 No previous data found, creating new baseline');
    }
    
    // Detect changes
    const changes = detectChanges(bills, previousBills);
    
    if (changes.length > 0) {
      console.log(`🚨 Detected ${changes.length} changes`);
      
      // Analyze for concerning content
      const alerts = analyzeChanges(changes);
      
      if (alerts.length > 0) {
        await sendAlerts(alerts);
      }
    } else {
      console.log('✅ No changes detected');
    }
    
    // Save current state
    await fs.writeFile(DATA_FILE, JSON.stringify(bills, null, 2));
    console.log('💾 Data saved');
    
  } catch (error) {
    console.error('❌ Error monitoring legislature:', error.message);
    throw error;
  }
}

function detectChanges(current, previous) {
  const changes = [];
  const prevMap = new Map(previous.map(b => [b.number, b]));
  
  current.forEach(bill => {
    const prev = prevMap.get(bill.number);
    
    if (!prev) {
      changes.push({
        type: 'NEW_BILL',
        bill: bill,
        severity: 'info'
      });
    } else if (bill.status !== prev.status) {
      changes.push({
        type: 'STATUS_CHANGE',
        bill: bill,
        previous: prev,
        severity: 'warning'
      });
    } else if (bill.title !== prev.title) {
      changes.push({
        type: 'TITLE_CHANGE',
        bill: bill,
        previous: prev,
        severity: 'high'
      });
    }
  });
  
  return changes;
}

function analyzeChanges(changes) {
  const criticalKeywords = [
    'disability', 'ODSP', 'WSIB', 'workers compensation',
    'benefit', 'eligibility', 'assessment', 'reduction',
    'cut', 'decrease', 'restriction', 'requirement'
  ];
  
  const alerts = changes.filter(change => {
    const text = JSON.stringify(change.bill).toLowerCase();
    return criticalKeywords.some(keyword => text.includes(keyword));
  });
  
  // Mark as critical if multiple keywords found
  alerts.forEach(alert => {
    const text = JSON.stringify(alert.bill).toLowerCase();
    const matchCount = criticalKeywords.filter(k => text.includes(k)).length;
    if (matchCount >= 3) {
      alert.severity = 'critical';
    } else if (matchCount >= 2) {
      alert.severity = 'high';
    }
  });
  
  return alerts;
}

async function sendAlerts(alerts) {
  // Save alerts to file for web interface
  try {
    let existingAlerts = [];
    try {
      const data = await fs.readFile(ALERTS_FILE, 'utf8');
      existingAlerts = JSON.parse(data);
    } catch (e) {
      // File doesn't exist yet
    }
    
    const newAlerts = alerts.map(alert => ({
      source: 'Ontario Legislature',
      type: alert.type.replace('_', ' '),
      severity: alert.severity,
      title: `${alert.bill.number}: ${alert.bill.title}`,
      details: {
        status: alert.bill.status || 'Unknown',
        sponsor: alert.bill.sponsor || 'Unknown'
      },
      url: 'https://www.ola.org/en/legislative-business/bills',
      timestamp: new Date().toISOString(),
      emoji: getEmoji(alert.severity)
    }));
    
    // Keep last 100 alerts
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

// Run
monitorLegislature().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

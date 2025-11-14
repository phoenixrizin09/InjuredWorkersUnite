const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/federal-bills.json');
const ALERTS_FILE = path.join(__dirname, '../../data/alerts.json');

async function monitorFederalBills() {
  console.log('👁️ Monitoring Federal Bills (House of Commons)...');
  
  try {
    // Fetch federal bills from LEGISinfo
    const response = await fetch('https://www.parl.ca/legisinfo/en/bills');
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const bills = [];
    
    // Extract bill information
    $('tr.billRow, .bill-item, article').each((i, elem) => {
      const billNumber = $(elem).find('.bill-number, .billNumber').text().trim();
      const billTitle = $(elem).find('.bill-title, .billTitle, h3, h4').text().trim();
      const billStatus = $(elem).find('.status, .bill-status').text().trim();
      const billSponsor = $(elem).find('.sponsor, .mp-name').text().trim();
      
      if (billNumber && billTitle) {
        bills.push({
          number: billNumber,
          title: billTitle,
          status: billStatus || 'Unknown',
          sponsor: billSponsor || 'Unknown',
          level: 'Federal',
          scannedAt: new Date().toISOString()
        });
      }
    });
    
    // If structured scraping fails, try text extraction
    if (bills.length === 0) {
      console.log('Structured extraction failed, trying text patterns...');
      const bodyText = $('body').text();
      const billPattern = /(C-\d+|S-\d+)[:\s]+([^.\n]+)/gi;
      let match;
      
      while ((match = billPattern.exec(bodyText)) !== null && bills.length < 50) {
        bills.push({
          number: match[1],
          title: match[2].substring(0, 200).trim(),
          status: 'Unknown',
          sponsor: 'Unknown',
          level: 'Federal',
          scannedAt: new Date().toISOString()
        });
      }
    }
    
    console.log(`✅ Found ${bills.length} federal bills`);
    
    // Load previous data
    let previousBills = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      previousBills = JSON.parse(data);
    } catch (e) {
      console.log('📝 No previous federal data found, creating new baseline');
    }
    
    // Detect changes
    const changes = detectChanges(bills, previousBills);
    
    if (changes.length > 0) {
      console.log(`🚨 Detected ${changes.length} federal changes`);
      const alerts = analyzeChanges(changes);
      
      if (alerts.length > 0) {
        await sendAlerts(alerts);
      }
    } else {
      console.log('✅ No federal changes detected');
    }
    
    // Save current state
    await fs.writeFile(DATA_FILE, JSON.stringify(bills, null, 2));
    console.log('💾 Federal data saved');
    
  } catch (error) {
    console.error('❌ Error monitoring federal bills:', error.message);
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
    'disability', 'workers compensation', 'employment insurance',
    'CPP', 'cpp-d', 'benefit', 'eligibility', 'assessment',
    'reduction', 'cut', 'decrease', 'restriction', 'requirement',
    'canada pension', 'ei sickness', 'medical', 'injured worker',
    'workplace safety', 'occupational health', 'labour standards'
  ];
  
  const alerts = changes.filter(change => {
    const text = JSON.stringify(change.bill).toLowerCase();
    return criticalKeywords.some(keyword => text.includes(keyword));
  });
  
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
  try {
    let existingAlerts = [];
    try {
      const data = await fs.readFile(ALERTS_FILE, 'utf8');
      existingAlerts = JSON.parse(data);
    } catch (e) {
      // File doesn't exist yet
    }
    
    const newAlerts = alerts.map(alert => ({
      source: 'Federal Parliament',
      type: alert.type.replace('_', ' '),
      severity: alert.severity,
      title: `${alert.bill.number}: ${alert.bill.title}`,
      details: {
        status: alert.bill.status || 'Unknown',
        sponsor: alert.bill.sponsor || 'Unknown'
      },
      url: `https://www.parl.ca/legisinfo/en/bill/${alert.bill.number.toLowerCase()}`,
      timestamp: new Date().toISOString(),
      emoji: getEmoji(alert.severity)
    }));
    
    const allAlerts = [...newAlerts, ...existingAlerts].slice(0, 100);
    
    await fs.writeFile(ALERTS_FILE, JSON.stringify(allAlerts, null, 2));
    console.log(`✅ Saved ${newAlerts.length} federal alerts to file`);
    
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

monitorFederalBills().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

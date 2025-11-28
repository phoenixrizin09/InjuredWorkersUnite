/**
 * SCAN LEGISLATION - The Eye / Oracle System
 * 
 * Monitors federal and provincial legislation for relevant bills
 * Run via GitHub Actions or manually
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Keywords that indicate relevant legislation
const RELEVANT_KEYWORDS = [
  'disability', 'worker', 'employment', 'health', 'safety',
  'compensation', 'insurance', 'benefit', 'pension', 'injury',
  'accessibility', 'accommodation', 'discrimination', 'rights',
  'housing', 'social', 'welfare', 'assistance', 'support',
  'healthcare', 'medical', 'mental health', 'chronic',
];

// Known important bills (manually curated)
const KNOWN_IMPORTANT_BILLS = {
  federal: [
    {
      number: 'C-22',
      title: 'Canada Disability Benefit Act',
      status: 'Royal Assent - Awaiting Implementation',
      description: 'Establishes a new income support benefit for working-age persons with disabilities',
      url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-22',
      relevance: 'critical',
      charter_implications: ['Section 7 (security of person)', 'Section 15 (equality)'],
      impacts: ['500,000+ disabled Canadians may benefit', 'Implementation delayed'],
    },
    {
      number: 'C-64',
      title: 'Pharmacare Act',
      status: 'In Progress',
      description: 'National universal pharmacare program',
      url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-64',
      relevance: 'high',
      charter_implications: ['Section 7 (right to life)'],
      impacts: ['Diabetes and contraceptive coverage first', '9 million uninsured Canadians'],
    },
    {
      number: 'C-35',
      title: 'Canada Early Learning and Child Care Act',
      status: 'Royal Assent',
      description: 'Enshrines child care as a right',
      url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-35',
      relevance: 'medium',
      impacts: ['$10/day child care', 'Working families benefit'],
    },
  ],
  ontario: [
    {
      number: 'Bill 124',
      title: 'Protecting a Sustainable Public Sector for Future Generations Act',
      status: 'STRUCK DOWN - Unconstitutional',
      description: 'Wage restraint legislation that limited public sector wage increases to 1%',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-42/session-1/bill-124',
      relevance: 'critical',
      charter_implications: ['Section 2(d) - Freedom of Association'],
      court_decision: 'Ontario Superior Court ruled unconstitutional (November 2022)',
      impacts: ['Nurses, teachers, healthcare workers affected', 'Contributed to healthcare crisis'],
    },
    {
      number: 'Bill 60',
      title: 'Your Health Act',
      status: 'Passed',
      description: 'Expands private surgical clinics and healthcare delivery',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-43/session-1/bill-60',
      relevance: 'high',
      concerns: ['Healthcare privatization', 'Two-tier system fears'],
      impacts: ['For-profit clinics can perform more surgeries', 'Staff poaching concerns'],
    },
    {
      number: 'Bill 23',
      title: 'More Homes Built Faster Act',
      status: 'Passed',
      description: 'Removes environmental and planning protections for development',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-43/session-1/bill-23',
      relevance: 'medium',
      concerns: ['Greenbelt development', 'Conservation authority powers reduced'],
      impacts: ['Housing development accelerated', 'Environmental protections weakened'],
    },
    {
      number: 'Bill 212',
      title: 'Reducing Gridlock, Saving You Time Act',
      status: 'In Progress',
      description: 'Transportation and infrastructure changes',
      url: 'https://www.ola.org/en/legislative-business/bills/current',
      relevance: 'medium',
      impacts: ['Highway 413', 'Bike lane removals'],
    },
  ],
};

async function fetchParliamentRSS() {
  try {
    const response = await fetch('https://www.parl.ca/legisinfo/en/bills/rss');
    const text = await response.text();
    
    // Simple RSS parsing
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/;
    const linkRegex = /<link>(.*?)<\/link>/;
    const descRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/;
    const dateRegex = /<pubDate>(.*?)<\/pubDate>/;

    let match;
    while ((match = itemRegex.exec(text)) !== null) {
      const item = match[1];
      const titleMatch = titleRegex.exec(item);
      const linkMatch = linkRegex.exec(item);
      const descMatch = descRegex.exec(item);
      const dateMatch = dateRegex.exec(item);

      items.push({
        title: titleMatch ? (titleMatch[1] || titleMatch[2] || '').trim() : '',
        url: linkMatch ? linkMatch[1].trim() : '',
        description: descMatch ? (descMatch[1] || descMatch[2] || '').trim() : '',
        date: dateMatch ? dateMatch[1].trim() : '',
        source: 'parl.ca',
        jurisdiction: 'federal',
      });
    }

    return items;
  } catch (error) {
    console.error('Error fetching Parliament RSS:', error.message);
    return [];
  }
}

function assessRelevance(bill) {
  const text = `${bill.title} ${bill.description}`.toLowerCase();
  
  let score = 0;
  let matchedKeywords = [];
  
  for (const keyword of RELEVANT_KEYWORDS) {
    if (text.includes(keyword.toLowerCase())) {
      score++;
      matchedKeywords.push(keyword);
    }
  }
  
  if (score >= 3) return { relevance: 'critical', matchedKeywords };
  if (score >= 2) return { relevance: 'high', matchedKeywords };
  if (score >= 1) return { relevance: 'medium', matchedKeywords };
  return { relevance: 'low', matchedKeywords };
}

async function main() {
  console.log('👁️ THE EYE - Legislative Scanner');
  console.log('=================================\n');
  console.log(`📅 Scan started: ${new Date().toISOString()}`);
  console.log(`📂 Data directory: ${DATA_DIR}\n`);

  const results = {
    timestamp: new Date().toISOString(),
    federal: {
      known_important: KNOWN_IMPORTANT_BILLS.federal,
      recent_activity: [],
    },
    provincial: {
      ontario: KNOWN_IMPORTANT_BILLS.ontario,
    },
    alerts: [],
  };

  // Fetch recent Parliament activity
  console.log('🇨🇦 Fetching Parliament of Canada RSS feed...');
  const parliamentItems = await fetchParliamentRSS();
  console.log(`   Found ${parliamentItems.length} recent items`);

  // Assess relevance of each item
  for (const item of parliamentItems) {
    const assessment = assessRelevance(item);
    if (assessment.relevance !== 'low') {
      results.federal.recent_activity.push({
        ...item,
        ...assessment,
      });
    }
  }
  console.log(`   ${results.federal.recent_activity.length} items are relevant\n`);

  // Load previous results
  const previousFile = path.join(DATA_DIR, 'legislation.json');
  let previousResults = { federal: { recent_activity: [] }, alerts: [] };
  try {
    if (fs.existsSync(previousFile)) {
      previousResults = JSON.parse(fs.readFileSync(previousFile, 'utf8'));
    }
  } catch (e) {
    console.log('   No previous legislation data found');
  }

  // Detect new items
  const previousUrls = new Set(
    (previousResults.federal?.recent_activity || []).map(i => i.url)
  );
  
  const newItems = results.federal.recent_activity.filter(i => !previousUrls.has(i.url));

  console.log(`📊 Summary:`);
  console.log(`   Known important federal bills: ${results.federal.known_important.length}`);
  console.log(`   Known important Ontario bills: ${results.provincial.ontario.length}`);
  console.log(`   Recent Parliament activity: ${results.federal.recent_activity.length}`);
  console.log(`   New since last scan: ${newItems.length}`);

  // Save results
  fs.writeFileSync(previousFile, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to ${previousFile}`);

  // Create alerts for new relevant items
  if (newItems.length > 0) {
    console.log('\n🚨 New legislative activity - creating alerts...');
    
    const alertsFile = path.join(DATA_DIR, 'alerts.json');
    let alerts = [];
    try {
      if (fs.existsSync(alertsFile)) {
        alerts = JSON.parse(fs.readFileSync(alertsFile, 'utf8'));
      }
    } catch (e) {}

    for (const item of newItems) {
      alerts.unshift({
        id: `LEG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: `Legislative Update: ${item.title}`,
        message: item.description.substring(0, 300),
        severity: item.relevance === 'critical' ? 'critical' : 'high',
        category: 'legislation',
        scope: item.jurisdiction,
        source: 'Parliament of Canada',
        source_url: item.url,
        verified: true,
        acknowledged: false,
        created_at: new Date().toISOString(),
        keywords: item.matchedKeywords,
      });
    }

    // Keep last 500 alerts
    alerts = alerts.slice(0, 500);
    fs.writeFileSync(alertsFile, JSON.stringify(alerts, null, 2));
    console.log(`   Created ${newItems.length} alerts`);
  }

  // Also create alerts for critical known bills that need tracking
  console.log('\n📋 Checking known important bills...');
  const criticalBills = [
    ...KNOWN_IMPORTANT_BILLS.federal.filter(b => b.relevance === 'critical'),
    ...KNOWN_IMPORTANT_BILLS.ontario.filter(b => b.relevance === 'critical'),
  ];
  console.log(`   ${criticalBills.length} critical bills being tracked`);

  console.log('\n✅ Legislative scan complete!');
}

main().catch(error => {
  console.error('❌ Scan failed:', error);
  process.exit(1);
});

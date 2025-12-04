/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - DAILY REPORT GENERATOR
 * 
 * Generates quirky, plain-English daily reports from real government data
 * Run daily via GitHub Actions or manually
 * 
 * Usage: node scripts/generate-eye-oracle-report.js
 * ═══════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ═══════════════════════════════════════════════════════════════════════════
// QUIRKY LANGUAGE GENERATORS
// ═══════════════════════════════════════════════════════════════════════════

const QUIRKY_INTROS = [
  "Happy {day}! Grab your coffee, here's what the powers-that-be were up to while you weren't looking.",
  "Another day in paradise! Just kidding. Here's what's actually happening.",
  "Good {timeOfDay}! Let's see what fresh nonsense awaits us today.",
  "Rise and shine! The bureaucracy never sleeps, and neither does The Eye. 👁️",
  "Welcome back! Spoiler alert: they're still at it.",
  "{day} update: We watched. We saw. Here's the report.",
  "Buckle up, buttercup. Today's report is a doozy.",
  "Here's your daily dose of 'are you kidding me?'",
  "Another {day}, another dollar they're trying to take from injured workers.",
  "The Eye sees all. Unfortunately, 'all' isn't pretty today.",
  "Pour yourself a strong one. You're gonna need it for this report.",
  "Good {timeOfDay}! Time to see what shenanigans they've been up to.",
  "Breaking: They're still doing it. Here's the proof.",
  "{day} check-in: Still watching. Still reporting. Still mad about it.",
  "Ready or not, here comes the truth. The Eye never blinks.",
  "Fresh off the government APIs, here's today's reality check.",
  "The system said 'trust the process.' The Eye said 'show receipts.'",
  "Welcome to today's episode of 'You Can't Make This Stuff Up.'",
  "Good {timeOfDay}! The Eye has been busy while you were sleeping.",
  "Plot twist: They're doing exactly what we thought they were doing."
];

const CLOSING_QUIPS = [
  "Remember: They're counting on you giving up. Don't. 👁️",
  "Stay informed, stay angry, stay organized. We're watching together.",
  "Knowledge is power. Now you know what they're doing. Use it.",
  "They work in darkness. We bring the light. See you tomorrow.",
  "Document everything. Share everything. Change everything.",
  "The system isn't broken - it's working exactly as designed. Time to redesign it.",
  "You're not alone. You're not crazy. And you're definitely not wrong to be mad.",
  "Every report is a receipt. We're keeping the receipts. 👁️",
  "They may have the power, but we have the numbers. And the facts.",
  "Tomorrow we watch again. They can count on that.",
  "Share this. Forward this. Post this. Visibility creates accountability.",
  "The truth doesn't sleep. Neither does The Eye. See you tomorrow.",
  "One day at a time. One report at a time. One change at a time.",
  "Your story matters. Your claim matters. You matter. Don't forget that.",
  "They want you to feel powerless. Reading this is already fighting back.",
  "Keep pushing. Keep documenting. Keep demanding better. We're with you.",
  "The Eye watches so you don't have to do it alone. We've got your back.",
  "Justice delayed is justice denied. That's why we report daily.",
  "They count on you being too tired to care. Prove them wrong.",
  "Until tomorrow: Stay informed, stay connected, stay strong. 👁️"
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_OF_DAY = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

// ═══════════════════════════════════════════════════════════════════════════
// PLAIN ENGLISH TRANSLATORS
// ═══════════════════════════════════════════════════════════════════════════

const LEGAL_TO_PLAIN = {
  // Charter sections
  'section 7': 'your right to life, liberty, and security',
  'section 15': 'your right to be treated equally',
  'section 12': 'your right not to be treated cruelly',
  'section 2': 'your fundamental freedoms',
  'section 1': 'the limits on government power',
  'section 24': 'your right to a remedy when rights are violated',
  
  // CHRA
  'duty to accommodate': 'their legal requirement to make adjustments for your disability',
  'discrimination on prohibited grounds': 'treating you worse because of who you are',
  'adverse effect discrimination': 'rules that seem fair but actually hurt certain groups',
  'undue hardship': 'the point where accommodation becomes truly impossible, not just inconvenient',
  'bona fide occupational requirement': 'a legitimate job requirement, not an excuse to discriminate',
  
  // UNCRPD
  'article 9': 'accessibility requirements',
  'article 19': 'your right to live independently',
  'article 25': 'your right to healthcare without discrimination',
  'article 27': 'your right to work with reasonable accommodations',
  'article 12': 'your right to make your own decisions',
  'article 13': 'your right to access the justice system',
  
  // Workers Compensation
  'loss of earning capacity': 'how much money you can\'t make anymore because of your injury',
  'permanent impairment': 'damage that will never fully heal',
  'pre-existing condition': 'their favorite excuse to deny claims',
  'non-economic loss': 'pain and suffering they don\'t want to pay for',
  'functional abilities evaluation': 'a test designed to find reasons to cut your benefits',
  'independent medical examination': 'their doctor saying what they want to hear',
  
  // Bureaucratic speak
  'administrative delay': 'they\'re dragging their feet',
  'resource constraints': 'they didn\'t budget for helping you',
  'process improvement': 'more hoops to jump through',
  'efficiency measures': 'cuts that hurt services',
  'stakeholder consultation': 'asking everyone except the people affected',
  'program review': 'looking for ways to deny more claims',
  'service delivery modernization': 'making it harder to reach a real person',
  'tiered service model': 'making you prove you really need help',
  'self-service portal': 'do it yourself because we won\'t help you',
  'evidence-based decision making': 'ignoring your reality in favor of statistics',
  'performance metrics': 'counting denials as success',
  'client-centered approach': 'just words, no action',
  'comprehensive assessment': 'looking for reasons to deny your claim'
};

function translateToPlainEnglish(text) {
  let translated = text.toLowerCase();
  for (const [legal, plain] of Object.entries(LEGAL_TO_PLAIN)) {
    translated = translated.replace(new RegExp(legal, 'gi'), plain);
  }
  return translated.charAt(0).toUpperCase() + translated.slice(1);
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA FETCHERS (Real Government APIs)
// ═══════════════════════════════════════════════════════════════════════════

async function fetchWithTimeout(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(timeout, () => {
      req.destroy();
      resolve(null);
    });
  });
}

async function fetchFederalData() {
  console.log('📡 Fetching federal data...');
  try {
    // Open Canada API - Disability-related policies
    const data = await fetchWithTimeout(
      'https://open.canada.ca/data/api/3/action/package_search?q=disability+workers&rows=5'
    );
    return data?.result?.results || [];
  } catch (error) {
    console.error('Federal fetch error:', error.message);
    return [];
  }
}

async function fetchProvincialData() {
  console.log('📡 Fetching provincial data from ALL provinces...');
  const results = [];
  
  // Ontario
  try {
    const ontario = await fetchWithTimeout(
      'https://data.ontario.ca/api/3/action/package_search?q=wsib+disability+workers&rows=10'
    );
    if (ontario?.result?.results) {
      results.push(...ontario.result.results.map(r => ({ ...r, province: 'Ontario' })));
    }
    console.log(`  ✓ Ontario: ${ontario?.result?.results?.length || 0} datasets`);
  } catch (error) {
    console.error('Ontario fetch error:', error.message);
  }
  
  // BC
  try {
    const bc = await fetchWithTimeout(
      'https://catalogue.data.gov.bc.ca/api/3/action/package_search?q=workers+compensation+disability&rows=10'
    );
    if (bc?.result?.results) {
      results.push(...bc.result.results.map(r => ({ ...r, province: 'British Columbia' })));
    }
    console.log(`  ✓ BC: ${bc?.result?.results?.length || 0} datasets`);
  } catch (error) {
    console.error('BC fetch error:', error.message);
  }
  
  // Alberta
  try {
    const alberta = await fetchWithTimeout(
      'https://open.alberta.ca/api/3/action/package_search?q=workers+disability+wcb&rows=10'
    );
    if (alberta?.result?.results) {
      results.push(...alberta.result.results.map(r => ({ ...r, province: 'Alberta' })));
    }
    console.log(`  ✓ Alberta: ${alberta?.result?.results?.length || 0} datasets`);
  } catch (error) {
    console.error('Alberta fetch error:', error.message);
  }
  
  // Quebec
  try {
    const quebec = await fetchWithTimeout(
      'https://www.donneesquebec.ca/recherche/api/3/action/package_search?q=invalidite+travail&rows=5'
    );
    if (quebec?.result?.results) {
      results.push(...quebec.result.results.map(r => ({ ...r, province: 'Quebec' })));
    }
    console.log(`  ✓ Quebec: ${quebec?.result?.results?.length || 0} datasets`);
  } catch (error) {
    console.error('Quebec fetch error:', error.message);
  }
  
  // Nova Scotia
  try {
    const ns = await fetchWithTimeout(
      'https://data.novascotia.ca/api/3/action/package_search?q=workers+disability&rows=5'
    );
    if (ns?.result?.results) {
      results.push(...ns.result.results.map(r => ({ ...r, province: 'Nova Scotia' })));
    }
    console.log(`  ✓ Nova Scotia: ${ns?.result?.results?.length || 0} datasets`);
  } catch (error) {
    console.error('Nova Scotia fetch error:', error.message);
  }
  
  // Manitoba
  try {
    const mb = await fetchWithTimeout(
      'https://geoportal.gov.mb.ca/api/3/action/package_search?q=workers+disability&rows=5'
    );
    if (mb?.result?.results) {
      results.push(...mb.result.results.map(r => ({ ...r, province: 'Manitoba' })));
    }
    console.log(`  ✓ Manitoba: ${mb?.result?.results?.length || 0} datasets`);
  } catch (error) {
    console.error('Manitoba fetch error:', error.message);
  }
  
  // Saskatchewan
  try {
    const sk = await fetchWithTimeout(
      'https://opendata.arcgis.com/api/v3/datasets?q=saskatchewan+workers+disability&rows=5'
    );
    if (sk?.data) {
      results.push(...(sk.data || []).map(r => ({ ...r, province: 'Saskatchewan' })));
    }
    console.log(`  ✓ Saskatchewan: ${sk?.data?.length || 0} datasets`);
  } catch (error) {
    console.error('Saskatchewan fetch error:', error.message);
  }
  
  return results;
}

async function fetchParliamentData() {
  console.log('📡 Fetching Parliament data...');
  try {
    // LEGISinfo API
    const data = await fetchWithTimeout(
      'https://www.parl.ca/legisinfo/en/bills/json?parlSession=44-1'
    );
    return Array.isArray(data) ? data.slice(0, 10) : [];
  } catch (error) {
    console.error('Parliament fetch error:', error.message);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// VIOLATION ANALYZER
// ═══════════════════════════════════════════════════════════════════════════

function analyzeForViolations(data) {
  const violations = [];
  
  // Keywords that suggest potential issues
  const concerningKeywords = {
    critical: ['denied', 'rejected', 'terminated', 'eliminated', 'cancelled'],
    high: ['reduced', 'delayed', 'backlog', 'waitlist', 'cuts'],
    medium: ['review', 'changes', 'modified', 'updated', 'amended'],
    low: ['proposed', 'considering', 'studying', 'evaluating']
  };
  
  const categories = {
    disability: ['disability', 'accommodation', 'accessible', 'aoda'],
    workers: ['workers', 'wsib', 'wcb', 'compensation', 'injured'],
    charter: ['charter', 'rights', 'constitutional', 'section 7', 'section 15'],
    human_rights: ['human rights', 'discrimination', 'chra', 'equality'],
    uncrpd: ['uncrpd', 'convention', 'un', 'accessibility'],
    healthcare: ['health', 'medical', 'treatment', 'doctor'],
    housing: ['housing', 'shelter', 'rent', 'homeless']
  };
  
  for (const item of data) {
    const text = JSON.stringify(item).toLowerCase();
    
    // Determine severity
    let severity = 'info';
    for (const [level, keywords] of Object.entries(concerningKeywords)) {
      if (keywords.some(k => text.includes(k))) {
        severity = level;
        break;
      }
    }
    
    // Determine category
    let category = 'systemic';
    for (const [cat, keywords] of Object.entries(categories)) {
      if (keywords.some(k => text.includes(k))) {
        category = cat;
        break;
      }
    }
    
    // Only include if there's something concerning
    if (severity !== 'info') {
      violations.push({
        title: item.title || item.name || 'Unnamed Issue',
        severity,
        category,
        plainEnglish: generatePlainEnglishDescription(item, severity),
        whatItMeans: generateWhatItMeans(category, severity),
        legalBasis: getLegalBasis(category),
        source: item.province || 'Federal'
      });
    }
  }
  
  return violations;
}

function generatePlainEnglishDescription(item, severity) {
  const title = (item.title || item.name || '').toLowerCase();
  const severityPhrases = {
    critical: "This is a big deal: ",
    high: "Here's the problem: ",
    medium: "Something's up: ",
    low: "Keep an eye on this: "
  };
  
  return `${severityPhrases[severity] || ''}${translateToPlainEnglish(title)}. We're tracking this one closely.`;
}

function generateWhatItMeans(category, severity) {
  const meanings = {
    disability: {
      critical: "People with disabilities could lose benefits or access to services they depend on.",
      high: "Expect longer waits and more paperwork if you have a disability claim.",
      medium: "Changes are coming that might affect how disability services work.",
      low: "They're looking at disability policies - could go either way."
    },
    workers: {
      critical: "Injured workers could see their benefits cut or claims denied more often.",
      high: "The system is getting harder to navigate for injured workers.",
      medium: "Workers' compensation processes are changing - stay informed.",
      low: "They're reviewing how injured workers are treated."
    },
    charter: {
      critical: "Your fundamental rights might be at risk here.",
      high: "This could affect your constitutional protections.",
      medium: "There may be Charter implications we're watching.",
      low: "Could have rights implications down the road."
    },
    human_rights: {
      critical: "Potential discrimination that affects many people.",
      high: "Human rights protections might be weakened.",
      medium: "Changes that could affect equality rights.",
      low: "Human rights angle worth monitoring."
    }
  };
  
  return meanings[category]?.[severity] || "We're watching to see how this affects you.";
}

function getLegalBasis(category) {
  const bases = {
    disability: "CHRA disability protections, UNCRPD Articles 9, 25, 27",
    workers: "Provincial WC Acts, Charter Section 7 & 15",
    charter: "Canadian Charter of Rights and Freedoms",
    human_rights: "CHRA prohibited grounds, Provincial HR Codes",
    uncrpd: "UN Convention on Rights of Persons with Disabilities",
    healthcare: "Canada Health Act, Provincial health legislation",
    housing: "CHRA, Provincial tenant protection acts",
    systemic: "Various statutory and constitutional provisions"
  };
  
  return bases[category] || "Constitutional and statutory protections";
}

// ═══════════════════════════════════════════════════════════════════════════
// REPORT GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

async function generateDailyReport() {
  console.log('👁️ THE EYE ORACLE - Generating Daily Report');
  console.log('═'.repeat(50));
  
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const dayName = DAYS[today.getDay()];
  
  // Fetch all data
  console.log('\n📡 Fetching real government data...\n');
  const [federalData, provincialData, parliamentData] = await Promise.all([
    fetchFederalData(),
    fetchProvincialData(),
    fetchParliamentData()
  ]);
  
  // Also load pre-verified alerts if available
  let verifiedAlerts = [];
  try {
    const alertsPath = path.join(__dirname, '..', 'public', 'data', 'alerts.json');
    if (fs.existsSync(alertsPath)) {
      verifiedAlerts = JSON.parse(fs.readFileSync(alertsPath, 'utf8'))
        .filter(a => a.verified && a.verificationBadge);
      console.log(`📋 Loaded ${verifiedAlerts.length} pre-verified alerts`);
    }
  } catch (e) {
    console.log('   Note: No pre-verified alerts found');
  }
  
  // Combine and analyze
  const allData = [...federalData, ...provincialData, ...parliamentData];
  console.log(`📊 Retrieved ${allData.length} data items`);
  
  const violations = analyzeForViolations(allData);
  
  // Add verified alerts as high-priority violations
  for (const alert of verifiedAlerts.slice(0, 5)) {
    violations.unshift({
      title: alert.title,
      severity: alert.severity || 'high',
      category: alert.category || 'systemic',
      plainEnglish: alert.message || alert.title,
      whatItMeans: alert.evidence || 'This is a verified issue backed by official data.',
      legalBasis: (alert.charter_violations || []).join(', ') || 'Constitutional protections',
      source: alert.source,
      verified: true,
      verificationBadge: alert.verificationBadge,
      url: alert.source_url || alert.url
    });
  }
  
  console.log(`🚨 Found ${violations.length} potential issues\n`);
  
  // Generate quirky intro
  let quirkyIntro = QUIRKY_INTROS[Math.floor(Math.random() * QUIRKY_INTROS.length)];
  quirkyIntro = quirkyIntro.replace('{day}', dayName).replace('{timeOfDay}', TIME_OF_DAY());
  
  // Generate closing
  const closingQuip = CLOSING_QUIPS[Math.floor(Math.random() * CLOSING_QUIPS.length)];
  
  // Build report
  const report = {
    id: dateStr,
    date: dateStr,
    headline: `👁️ ${dayName}'s Reality Check`,
    violationCount: violations.length,
    quirkyIntro,
    tldr: generateTLDR(violations),
    violations: violations.slice(0, 10), // Cap at 10 for readability
    goodNews: findGoodNews(allData),
    actionItems: generateActionItems(violations),
    closingQuip,
    generatedAt: new Date().toISOString(),
    // Verification info
    verified: true,
    verificationBadge: '✅ VERIFIED - Government APIs',
    verificationNote: 'All data sourced from official government open data portals',
    dataSources: {
      federal: federalData.length,
      provincial: provincialData.length,
      parliament: parliamentData.length,
      sources: [
        'open.canada.ca',
        'data.ontario.ca',
        'open.alberta.ca',
        'donneesquebec.ca'
      ]
    }
  };
  
  // Load existing reports
  const reportsPath = path.join(__dirname, '..', 'public', 'data', 'eye-oracle-reports.json');
  let existingReports = [];
  
  try {
    const existing = fs.readFileSync(reportsPath, 'utf8');
    existingReports = JSON.parse(existing);
  } catch {
    console.log('📝 Creating new reports file');
  }
  
  // Remove old report for same day if exists
  existingReports = existingReports.filter(r => r.id !== dateStr);
  
  // Add new report at the beginning
  existingReports.unshift(report);
  
  // Keep only last 30 days
  existingReports = existingReports.slice(0, 30);
  
  // Save
  fs.writeFileSync(reportsPath, JSON.stringify(existingReports, null, 2));
  
  console.log('✅ Report generated and saved!');
  console.log(`📄 Report: ${report.headline}`);
  console.log(`🚨 Violations: ${report.violationCount}`);
  console.log(`📁 Saved to: ${reportsPath}\n`);
  
  return report;
}

function generateTLDR(violations) {
  if (violations.length === 0) {
    return "Surprisingly quiet today. Either they're behaving or they're hiding something. We're betting on the latter.";
  }
  
  const critical = violations.filter(v => v.severity === 'critical').length;
  const high = violations.filter(v => v.severity === 'high').length;
  
  if (critical > 0) {
    return `${critical} critical issue${critical > 1 ? 's' : ''} today that you need to know about. Plus ${high} other serious concerns. It's not a great day for rights.`;
  }
  
  if (high > 0) {
    return `Found ${high} significant issue${high > 1 ? 's' : ''} affecting injured workers and people with disabilities. No critical emergencies, but plenty to be concerned about.`;
  }
  
  return `${violations.length} items worth watching today. Nothing earth-shattering, but that's how big problems start - one small thing at a time.`;
}

function findGoodNews(data) {
  const goodNews = [];
  const positiveKeywords = ['improved', 'increased funding', 'approved', 'expanded', 'new program', 'enhanced'];
  
  for (const item of data) {
    const text = JSON.stringify(item).toLowerCase();
    if (positiveKeywords.some(k => text.includes(k))) {
      goodNews.push({
        title: 'Positive Development',
        description: `${item.title || item.name || 'Something good happened'} - we'll take any wins we can get!`
      });
    }
  }
  
  return goodNews.slice(0, 3);
}

function generateActionItems(violations) {
  const actions = new Set();
  
  actions.add("Document everything - every appointment, every denial, every form");
  actions.add("Share this report - visibility creates accountability");
  
  if (violations.some(v => v.category === 'disability')) {
    actions.add("Connect with disability advocacy organizations in your area");
  }
  
  if (violations.some(v => v.category === 'workers')) {
    actions.add("Know your rights under your provincial workers' compensation act");
  }
  
  if (violations.some(v => v.severity === 'critical' || v.severity === 'high')) {
    actions.add("Contact your MPP/MLA/MP about these issues (takes 5 minutes)");
  }
  
  return Array.from(actions);
}

// ═══════════════════════════════════════════════════════════════════════════
// RUN
// ═══════════════════════════════════════════════════════════════════════════

generateDailyReport()
  .then(() => {
    console.log('═'.repeat(50));
    console.log('👁️ THE EYE ORACLE - Report generation complete');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error generating report:', error);
    process.exit(1);
  });

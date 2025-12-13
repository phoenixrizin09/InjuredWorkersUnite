/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - DAILY JUSTICE REPORT GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * AUTOMATED DAILY JUSTICE REPORTING SYSTEM
 * 
 * Every day, automatically generates a Daily Justice Report containing:
 * 1️⃣ Legal & Policy Changes (new bills, amendments, policy updates)
 * 2️⃣ Rights Impact Analysis (Charter, Human Rights, UNCRPD compliance)
 * 3️⃣ Violation Flags (benefit reductions, deeming, barriers, denials)
 * 4️⃣ Population Impact (injured workers, disabled, seniors, Indigenous)
 * 
 * NON-NEGOTIABLE STANDARDS:
 * ✔ Evidence-based
 * ✔ Source-verified
 * ✔ Timestamped
 * ✔ Jurisdiction-specific
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

// Fetch data connectors
async function fetchAllDataSources() {
  const data = {
    federal: [],
    ontario: [],
    bc: [],
    alberta: [],
    legislation: [],
    rss: [],
    fetchedAt: new Date().toISOString()
  };

  // Federal Open Canada API
  try {
    const response = await fetch('https://open.canada.ca/data/api/3/action/package_search?q=disability+OR+workers+OR+WSIB&rows=20');
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.result) {
        data.federal = result.result.results.map(pkg => ({
          id: pkg.id,
          title: pkg.title,
          description: pkg.notes || '',
          organization: pkg.organization?.title || 'Government of Canada',
          url: `https://open.canada.ca/data/en/dataset/${pkg.id}`,
          lastUpdated: pkg.metadata_modified,
          verified: true,
          verificationSource: 'open.canada.ca'
        }));
      }
    }
  } catch (e) {
    console.log('Federal API fetch failed:', e.message);
  }

  // Ontario Open Data API
  try {
    const response = await fetch('https://data.ontario.ca/api/3/action/package_search?q=WSIB+OR+ODSP+OR+disability&rows=20');
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.result) {
        data.ontario = result.result.results.map(pkg => ({
          id: pkg.id,
          title: pkg.title,
          description: pkg.notes || '',
          organization: pkg.organization?.title || 'Government of Ontario',
          url: `https://data.ontario.ca/dataset/${pkg.name || pkg.id}`,
          lastUpdated: pkg.metadata_modified,
          verified: true,
          verificationSource: 'data.ontario.ca'
        }));
      }
    }
  } catch (e) {
    console.log('Ontario API fetch failed:', e.message);
  }

  // Parliament LEGISinfo
  try {
    const response = await fetch('https://www.parl.ca/legisinfo/en/bills/json');
    if (response.ok) {
      const bills = await response.json();
      const relevantBills = bills.filter(bill => 
        /disability|worker|pension|benefit|health|employment|accessible/i.test(
          `${bill.ShortTitleEn || ''} ${bill.LongTitleEn || ''}`
        )
      );
      data.legislation = relevantBills.slice(0, 20).map(bill => ({
        id: bill.Id,
        number: bill.NumberCode,
        title: bill.ShortTitleEn || bill.LongTitleEn,
        status: bill.StatusNameEn,
        sponsor: bill.SponsorAffiliationTitleEn,
        lastEvent: bill.LastMajorStageNameEn,
        url: `https://www.parl.ca/legisinfo/en/bill/${bill.ParliamentNumber}-${bill.SessionNumber}/${bill.NumberCode}`,
        verified: true,
        verificationSource: 'parl.ca'
      }));
    }
  } catch (e) {
    console.log('Parliament API fetch failed:', e.message);
  }

  return data;
}

/**
 * VIOLATION FLAGS - Automatic detection of rights violations
 */
const VIOLATION_FLAGS = {
  benefitReductions: {
    name: 'Benefit Reductions',
    description: 'Any reduction in disability or workers\' compensation benefits',
    charterImplication: 'Section 7 (security of person)',
    uncrpdArticle: 'Article 28 (adequate standard of living)',
    keywords: ['reduce', 'cut', 'decrease', 'lower', 'cap', 'freeze', 'rollback']
  },
  deemingPractices: {
    name: 'Deeming Practices',
    description: 'Workers deemed capable of jobs they cannot perform',
    charterImplication: 'Section 7 (fundamental justice)',
    uncrpdArticle: 'Article 27 (work and employment)',
    keywords: ['deem', 'deemed', 'deeming', 'capable', 'employable', 'theoretical']
  },
  appealsBarriers: {
    name: 'Barriers to Appeals',
    description: 'Obstacles preventing workers from challenging decisions',
    charterImplication: 'Section 7 (access to justice)',
    uncrpdArticle: 'Article 13 (access to justice)',
    keywords: ['backlog', 'delay', 'wait', 'denied', 'barrier', 'inaccessible']
  },
  medicalCareDenial: {
    name: 'Denial of Medical Care',
    description: 'Refusal to authorize necessary medical treatment',
    charterImplication: 'Section 7 (security of person - Chaoulli)',
    uncrpdArticle: 'Article 25 (health)',
    keywords: ['deny', 'refuse', 'terminate treatment', 'cut off', 'not approved']
  },
  incomeInadequacy: {
    name: 'Income Inadequacy',
    description: 'Benefits below poverty line',
    charterImplication: 'Section 7 (right to life)',
    uncrpdArticle: 'Article 28 (adequate standard of living)',
    keywords: ['poverty', 'inadequate', 'below poverty', 'insufficient', 'starvation']
  },
  discriminatoryRules: {
    name: 'Discriminatory Eligibility Rules',
    description: 'Rules that disproportionately exclude disabled persons',
    charterImplication: 'Section 15 (equality rights)',
    uncrpdArticle: 'Article 5 (equality and non-discrimination)',
    keywords: ['eligibility', 'exclude', 'criteria', 'disqualify', 'ineligible']
  }
};

/**
 * Analyze text for violation flags
 */
function detectViolations(text) {
  const violations = [];
  const lowerText = text.toLowerCase();

  Object.entries(VIOLATION_FLAGS).forEach(([key, flag]) => {
    const matchedKeywords = flag.keywords.filter(kw => lowerText.includes(kw));
    if (matchedKeywords.length > 0) {
      violations.push({
        type: key,
        name: flag.name,
        description: flag.description,
        charterImplication: flag.charterImplication,
        uncrpdArticle: flag.uncrpdArticle,
        matchedKeywords,
        severity: matchedKeywords.length >= 3 ? 'critical' : matchedKeywords.length >= 2 ? 'high' : 'medium'
      });
    }
  });

  return violations;
}

/**
 * Rights Impact Analysis
 */
function analyzeRightsImpact(item) {
  const text = `${item.title || ''} ${item.description || ''}`.toLowerCase();
  
  const analysis = {
    charterCompliance: { status: 'REQUIRES_REVIEW', issues: [] },
    humanRightsCompliance: { status: 'REQUIRES_REVIEW', issues: [] },
    uncrpdCompliance: { status: 'REQUIRES_REVIEW', issues: [] }
  };

  // Charter Section 7 analysis
  if (/deny|refuse|terminate|cut|reduce|inadequate|delay/i.test(text) &&
      /benefit|income|support|care|treatment/i.test(text)) {
    analysis.charterCompliance.status = 'POTENTIAL_VIOLATION';
    analysis.charterCompliance.issues.push({
      section: 'Section 7',
      right: 'Life, Liberty, Security of Person',
      concern: 'May deprive individuals of security of person through denial of essential support'
    });
  }

  // Charter Section 15 analysis
  if (/disability|disabled|mental health|chronic/i.test(text) &&
      /discriminat|deny|barrier|exclude|adverse/i.test(text)) {
    analysis.charterCompliance.status = 'POTENTIAL_VIOLATION';
    analysis.charterCompliance.issues.push({
      section: 'Section 15',
      right: 'Equality Rights',
      concern: 'May constitute discrimination based on disability'
    });
  }

  // UNCRPD analysis
  if (/disability|disabled|accessibility/i.test(text)) {
    if (/inaccessible|barrier|exclude/i.test(text)) {
      analysis.uncrpdCompliance.status = 'POTENTIAL_VIOLATION';
      analysis.uncrpdCompliance.issues.push({
        article: 'Article 9',
        right: 'Accessibility',
        concern: 'May fail accessibility requirements'
      });
    }
    if (/benefit|income|support|poverty/i.test(text)) {
      analysis.uncrpdCompliance.status = 'REQUIRES_ASSESSMENT';
      analysis.uncrpdCompliance.issues.push({
        article: 'Article 28',
        right: 'Adequate Standard of Living',
        concern: 'Must ensure adequate standard of living for persons with disabilities'
      });
    }
  }

  return analysis;
}

/**
 * Identify impacted populations
 */
function identifyImpactedPopulations(text) {
  const populations = [];
  const lowerText = text.toLowerCase();

  const populationChecks = [
    { name: 'Injured Workers', keywords: ['worker', 'wsib', 'wcb', 'workplace', 'injury', 'claim'], icon: '👷' },
    { name: 'Persons with Disabilities', keywords: ['disability', 'disabled', 'odsp', 'aish', 'accessibility'], icon: '♿' },
    { name: 'Seniors', keywords: ['senior', 'elderly', 'aged', 'pension', 'retirement', 'ltc'], icon: '👴' },
    { name: 'Indigenous Peoples', keywords: ['indigenous', 'first nations', 'inuit', 'métis', 'aboriginal', 'treaty'], icon: '🪶' },
    { name: 'Low-Income Canadians', keywords: ['poverty', 'low-income', 'welfare', 'social assistance', 'food bank'], icon: '💰' },
    { name: 'Mental Health Community', keywords: ['mental health', 'psychiatric', 'anxiety', 'depression', 'ptsd'], icon: '🧠' },
    { name: 'Women', keywords: ['women', 'gender', 'female', 'maternal', 'pregnancy'], icon: '👩' },
    { name: 'Children', keywords: ['child', 'youth', 'minor', 'school', 'pediatric'], icon: '👶' }
  ];

  populationChecks.forEach(pop => {
    if (pop.keywords.some(kw => lowerText.includes(kw))) {
      populations.push({
        name: pop.name,
        icon: pop.icon,
        matchedKeywords: pop.keywords.filter(kw => lowerText.includes(kw))
      });
    }
  });

  return populations;
}

/**
 * Generate Daily Justice Report
 */
async function generateDailyJusticeReport() {
  console.log('👁️ THE EYE ORACLE: Generating Daily Justice Report...');
  console.log(`📅 Date: ${new Date().toISOString().split('T')[0]}`);
  console.log('═══════════════════════════════════════════════════════════');

  // Fetch all data sources
  console.log('📡 Fetching data from official government sources...');
  const rawData = await fetchAllDataSources();

  // Initialize report
  const report = {
    id: `daily_justice_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    date: new Date().toISOString().split('T')[0],
    title: `Daily Justice Report - ${new Date().toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    
    // 1️⃣ Legal & Policy Changes
    legalChanges: {
      newBills: [],
      amendments: [],
      policyUpdates: [],
      regulatoryChanges: []
    },
    
    // 2️⃣ Rights Impact Analysis
    rightsAnalysis: [],
    
    // 3️⃣ Violation Flags
    violations: {
      critical: [],
      high: [],
      medium: []
    },
    
    // 4️⃣ Population Impact
    populationImpact: {
      injuredWorkers: { count: 0, issues: [] },
      disabledPersons: { count: 0, issues: [] },
      seniors: { count: 0, issues: [] },
      indigenous: { count: 0, issues: [] },
      lowIncome: { count: 0, issues: [] }
    },
    
    // Summary statistics
    summary: {
      totalItemsAnalyzed: 0,
      violationsDetected: 0,
      charterConcerns: 0,
      uncrpdConcerns: 0,
      populationsAffected: []
    },
    
    // Data sources
    sources: {
      federal: rawData.federal.length,
      ontario: rawData.ontario.length,
      legislation: rawData.legislation.length,
      fetchedAt: rawData.fetchedAt
    }
  };

  // Process legislation
  console.log('📜 Analyzing legislation...');
  rawData.legislation.forEach(bill => {
    const text = `${bill.title} ${bill.status}`;
    
    // Categorize bill
    if (bill.status && /first reading|introduced/i.test(bill.status)) {
      report.legalChanges.newBills.push({
        ...bill,
        rightsAnalysis: analyzeRightsImpact(bill),
        violations: detectViolations(text),
        impactedPopulations: identifyImpactedPopulations(text)
      });
    } else if (bill.status && /second reading|committee|third reading/i.test(bill.status)) {
      report.legalChanges.amendments.push({
        ...bill,
        rightsAnalysis: analyzeRightsImpact(bill),
        violations: detectViolations(text),
        impactedPopulations: identifyImpactedPopulations(text)
      });
    }
  });

  // Process federal data
  console.log('🍁 Analyzing federal government data...');
  rawData.federal.forEach(item => {
    const text = `${item.title} ${item.description}`;
    const analysis = {
      ...item,
      scope: 'federal',
      rightsAnalysis: analyzeRightsImpact(item),
      violations: detectViolations(text),
      impactedPopulations: identifyImpactedPopulations(text)
    };
    
    report.rightsAnalysis.push(analysis);
    
    // Categorize violations
    analysis.violations.forEach(v => {
      if (v.severity === 'critical') report.violations.critical.push({ ...v, source: item });
      else if (v.severity === 'high') report.violations.high.push({ ...v, source: item });
      else report.violations.medium.push({ ...v, source: item });
    });
  });

  // Process Ontario data
  console.log('🏛️ Analyzing Ontario government data...');
  rawData.ontario.forEach(item => {
    const text = `${item.title} ${item.description}`;
    const analysis = {
      ...item,
      scope: 'provincial',
      jurisdiction: 'Ontario',
      rightsAnalysis: analyzeRightsImpact(item),
      violations: detectViolations(text),
      impactedPopulations: identifyImpactedPopulations(text)
    };
    
    report.rightsAnalysis.push(analysis);
    
    // Categorize violations
    analysis.violations.forEach(v => {
      if (v.severity === 'critical') report.violations.critical.push({ ...v, source: item });
      else if (v.severity === 'high') report.violations.high.push({ ...v, source: item });
      else report.violations.medium.push({ ...v, source: item });
    });
  });

  // Compile population impact
  console.log('👥 Compiling population impact...');
  report.rightsAnalysis.forEach(item => {
    item.impactedPopulations.forEach(pop => {
      if (pop.name === 'Injured Workers') {
        report.populationImpact.injuredWorkers.count++;
        report.populationImpact.injuredWorkers.issues.push(item.title);
      }
      if (pop.name === 'Persons with Disabilities') {
        report.populationImpact.disabledPersons.count++;
        report.populationImpact.disabledPersons.issues.push(item.title);
      }
      if (pop.name === 'Seniors') {
        report.populationImpact.seniors.count++;
        report.populationImpact.seniors.issues.push(item.title);
      }
      if (pop.name === 'Indigenous Peoples') {
        report.populationImpact.indigenous.count++;
        report.populationImpact.indigenous.issues.push(item.title);
      }
      if (pop.name === 'Low-Income Canadians') {
        report.populationImpact.lowIncome.count++;
        report.populationImpact.lowIncome.issues.push(item.title);
      }
    });
  });

  // Compile summary
  report.summary.totalItemsAnalyzed = 
    rawData.federal.length + 
    rawData.ontario.length + 
    rawData.legislation.length;
  
  report.summary.violationsDetected = 
    report.violations.critical.length + 
    report.violations.high.length + 
    report.violations.medium.length;
  
  report.summary.charterConcerns = report.rightsAnalysis.filter(
    a => a.rightsAnalysis?.charterCompliance?.status === 'POTENTIAL_VIOLATION'
  ).length;
  
  report.summary.uncrpdConcerns = report.rightsAnalysis.filter(
    a => a.rightsAnalysis?.uncrpdCompliance?.status === 'POTENTIAL_VIOLATION'
  ).length;
  
  // Identify affected populations
  const popCounts = {};
  report.rightsAnalysis.forEach(item => {
    item.impactedPopulations.forEach(pop => {
      popCounts[pop.name] = (popCounts[pop.name] || 0) + 1;
    });
  });
  report.summary.populationsAffected = Object.entries(popCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  // Save report
  const outputDir = path.join(__dirname, '../public/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save current report
  const currentReportPath = path.join(outputDir, 'daily-justice-report.json');
  fs.writeFileSync(currentReportPath, JSON.stringify(report, null, 2));
  console.log(`✅ Saved current report to: ${currentReportPath}`);

  // Append to historical reports
  const historyPath = path.join(outputDir, 'justice-report-history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    } catch (e) {
      history = [];
    }
  }
  
  // Keep last 90 days of reports
  history.unshift({
    id: report.id,
    date: report.date,
    summary: report.summary,
    violationCounts: {
      critical: report.violations.critical.length,
      high: report.violations.high.length,
      medium: report.violations.medium.length
    }
  });
  history = history.slice(0, 90);
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
  console.log(`✅ Updated history with ${history.length} reports`);

  // Print summary
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📊 DAILY JUSTICE REPORT SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`📅 Date: ${report.date}`);
  console.log(`📄 Items Analyzed: ${report.summary.totalItemsAnalyzed}`);
  console.log(`🚨 Violations Detected: ${report.summary.violationsDetected}`);
  console.log(`   ❌ Critical: ${report.violations.critical.length}`);
  console.log(`   ⚠️ High: ${report.violations.high.length}`);
  console.log(`   ⚡ Medium: ${report.violations.medium.length}`);
  console.log(`⚖️ Charter Concerns: ${report.summary.charterConcerns}`);
  console.log(`🌍 UNCRPD Concerns: ${report.summary.uncrpdConcerns}`);
  console.log(`📜 New Bills: ${report.legalChanges.newBills.length}`);
  console.log(`📝 Amendments in Progress: ${report.legalChanges.amendments.length}`);
  console.log('');
  console.log('👥 POPULATIONS AFFECTED:');
  report.summary.populationsAffected.forEach(pop => {
    console.log(`   ${pop.name}: ${pop.count} issues`);
  });
  console.log('');
  console.log('👁️ THE EYE ORACLE: Daily Justice Report complete.');
  console.log('═══════════════════════════════════════════════════════════');

  return report;
}

// Run if executed directly
if (require.main === module) {
  generateDailyJusticeReport()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Error generating report:', err);
      process.exit(1);
    });
}

module.exports = { generateDailyJusticeReport, detectViolations, analyzeRightsImpact };

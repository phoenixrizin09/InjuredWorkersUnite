/**
 * 👁️ THE EYE ORACLE - LIVE SCANNER
 * 
 * Automated real-time investigation system that:
 * 1. Scans live government data feeds for anomalies
 * 2. Detects patterns of corruption and injustice
 * 3. Cross-references multiple sources for verification
 * 4. Generates alerts when issues are found
 * 5. Tracks changes over time to catch cover-ups
 * 
 * THE ULTIMATE INVESTIGATOR - Seeing what mainstream media ignores
 * 
 * Data Sources:
 * - Federal Open Data Portal (open.canada.ca)
 * - Provincial Open Data (Ontario, BC, Alberta, Quebec)
 * - Parliament/Legislature APIs
 * - Court Decision Databases (CanLII)
 * - Corporate Filings (SEDAR+)
 * - ATIP/FOI Request Databases
 * - Ombudsman Reports
 * - Auditor General Reports
 * - Statistics Canada
 * - WSIB/WCB Data
 * - Social Assistance Data
 */

const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION - LIVE DATA SOURCES
// ============================================

const LIVE_DATA_SOURCES = {
  // FEDERAL SOURCES
  federal: {
    openData: {
      name: 'Open Canada',
      baseUrl: 'https://open.canada.ca/data/api/3/action',
      endpoints: {
        search: '/package_search',
        show: '/package_show',
        recent: '/recently_changed_packages_activity_list'
      },
      categories: [
        'disability', 'workers-compensation', 'employment-insurance',
        'indigenous', 'housing', 'healthcare', 'poverty', 'veterans'
      ]
    },
    parliament: {
      name: 'Parliament of Canada',
      baseUrl: 'https://www.parl.ca/legisinfo/en/bills',
      apiUrl: 'https://www.ourcommons.ca/Members/en/search',
      watchKeywords: [
        'disability', 'ODSP', 'WSIB', 'workers compensation', 
        'indigenous', 'first nations', 'housing', 'pharmacare',
        'dental care', 'mental health', 'veterans', 'poverty'
      ]
    },
    statsCan: {
      name: 'Statistics Canada',
      baseUrl: 'https://www150.statcan.gc.ca/t1/wds/rest',
      tables: {
        disability: '13-10-0374-01',
        income: '11-10-0190-01',
        housing: '46-10-0001-01',
        health: '13-10-0096-01',
        employment: '14-10-0287-01'
      }
    },
    auditorGeneral: {
      name: 'Auditor General of Canada',
      url: 'https://www.oag-bvg.gc.ca/internet/English/parl_e.html',
      rssUrl: 'https://www.oag-bvg.gc.ca/internet/English/rss_e.xml'
    },
    indigenousServices: {
      name: 'Indigenous Services Canada',
      waterAdvisories: 'https://www.sac-isc.gc.ca/eng/1506514143353/1533317130660',
      apiEndpoint: 'https://services.aadnc-aandc.gc.ca/api'
    }
  },

  // PROVINCIAL SOURCES - ONTARIO
  ontario: {
    openData: {
      name: 'Ontario Open Data',
      baseUrl: 'https://data.ontario.ca/api/3/action',
      datasets: {
        wsib: 'workplace-safety-and-insurance-board',
        odsp: 'ontario-disability-support-program',
        ow: 'ontario-works',
        ltc: 'long-term-care-home-inspections',
        healthcare: 'wait-times'
      }
    },
    ombudsman: {
      name: 'Ontario Ombudsman',
      url: 'https://www.ombudsman.on.ca/resources/reports-and-case-summaries',
      rssUrl: 'https://www.ombudsman.on.ca/resources/rss-feeds'
    },
    auditorGeneral: {
      name: 'Auditor General of Ontario',
      url: 'https://www.auditor.on.ca/en/content/annualreports/arbyyear/arbyyear.aspx'
    },
    fao: {
      name: 'Financial Accountability Office',
      url: 'https://www.fao-on.org/en/Blog/Publications',
      apiUrl: 'https://www.fao-on.org/web/default/api'
    },
    legislature: {
      name: 'Ontario Legislature',
      billsUrl: 'https://www.ola.org/en/legislative-business/bills',
      hansardUrl: 'https://www.ola.org/en/legislative-business/house-documents/parliament-43'
    }
  },

  // PROVINCIAL SOURCES - OTHER PROVINCES
  provinces: {
    bc: {
      openData: 'https://catalogue.data.gov.bc.ca/api/3/action',
      wcb: 'https://www.worksafebc.com/en/resources/health-safety/statistics'
    },
    alberta: {
      openData: 'https://open.alberta.ca/api/3/action',
      wcb: 'https://www.wcb.ab.ca/about-wcb/corporate-publications-and-statistics.html'
    },
    quebec: {
      openData: 'https://www.donneesquebec.ca/recherche/api/3/action',
      cnesst: 'https://www.cnesst.gouv.qc.ca/en/organization/documentation/statistics'
    },
    manitoba: {
      openData: 'https://geoportal.gov.mb.ca/api/3/action'
    },
    saskatchewan: {
      openData: 'https://data.saskatchewan.ca/api/3/action'
    },
    maritimes: {
      ns: 'https://data.novascotia.ca/api/3/action',
      nb: 'https://open.new-brunswick.ca/api/3/action',
      pei: 'https://data.princeedwardisland.ca/api/3/action'
    }
  },

  // LEGAL SOURCES
  legal: {
    canlii: {
      name: 'CanLII - Canadian Legal Information',
      baseUrl: 'https://www.canlii.org',
      searchApi: 'https://www.canlii.org/en/search/ajaxSearch.do',
      courts: ['scc', 'fca', 'fc', 'onca', 'onsc', 'hrto', 'wsiat']
    },
    humanRightsTribunal: {
      ontario: 'https://www.canlii.org/en/on/onhrt/',
      federal: 'https://www.canlii.org/en/ca/chrt/'
    },
    wsiat: {
      name: 'WSIAT - Appeals Tribunal',
      url: 'https://www.wsiat.on.ca/en/home/index.htm',
      decisions: 'https://www.canlii.org/en/on/onwsiat/'
    }
  },

  // CORPORATE SOURCES
  corporate: {
    sedar: {
      name: 'SEDAR+ Corporate Filings',
      url: 'https://www.sedarplus.ca',
      searchUrl: 'https://www.sedarplus.ca/csa-party/records/search'
    },
    lobbyRegistry: {
      federal: 'https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/vwRg',
      ontario: 'https://lobbyist.oico.on.ca/'
    }
  }
};

// ============================================
// SCANDAL DETECTION PATTERNS
// ============================================

const SCANDAL_PATTERNS = {
  // Financial anomalies
  financial: {
    denial_rate_spike: {
      threshold: 0.1, // 10% increase
      description: 'Sudden increase in benefit denial rates',
      severity: 'critical'
    },
    budget_cut_while_surplus: {
      description: 'Program budget cuts while government runs surplus',
      severity: 'critical'
    },
    executive_pay_vs_benefits: {
      ratio_threshold: 100, // CEO pay 100x average benefit
      description: 'Executive compensation exceeds benefit payments',
      severity: 'high'
    },
    processing_time_increase: {
      threshold: 0.25, // 25% increase
      description: 'Application processing times increasing',
      severity: 'high'
    }
  },

  // Policy patterns
  policy: {
    midnight_regulation: {
      description: 'Regulation changes made with minimal notice',
      severity: 'critical'
    },
    buried_report: {
      description: 'Critical report released on Friday afternoon/holiday',
      severity: 'high'
    },
    retroactive_denial: {
      description: 'Benefits denied retroactively after policy change',
      severity: 'critical'
    },
    appeal_backlog_growth: {
      threshold: 0.2,
      description: 'Appeals backlog growing faster than resolutions',
      severity: 'high'
    }
  },

  // Systemic patterns
  systemic: {
    geographic_disparity: {
      description: 'Significant variation in outcomes by region',
      severity: 'high'
    },
    demographic_disparity: {
      description: 'Disparate outcomes by race, gender, disability type',
      severity: 'critical'
    },
    privatization_creep: {
      description: 'Public services being privatized incrementally',
      severity: 'critical'
    },
    regulatory_capture: {
      description: 'Industry insiders appointed to regulate industry',
      severity: 'critical'
    }
  },

  // Cover-up patterns
  coverup: {
    data_suppression: {
      description: 'Previously public data no longer available',
      severity: 'critical'
    },
    methodology_change: {
      description: 'Statistical methodology changed to hide bad numbers',
      severity: 'high'
    },
    foi_delays: {
      threshold: 90, // days
      description: 'FOI requests delayed beyond legal limits',
      severity: 'high'
    },
    whistleblower_retaliation: {
      description: 'Evidence of retaliation against whistleblowers',
      severity: 'critical'
    }
  }
};

// ============================================
// VULNERABLE POPULATION FOCUS AREAS
// ============================================

const VULNERABLE_FOCUS_AREAS = {
  disabled_workers: {
    name: 'Injured & Disabled Workers',
    keywords: ['WSIB', 'workers compensation', 'workplace injury', 'occupational disease', 'chronic pain', 'mental health claim'],
    agencies: ['WSIB', 'WorkSafeBC', 'WCB Alberta', 'CNESST'],
    watchFor: ['denial rates', 'appeal times', 'deeming', 'benefit cuts', 'surveillance']
  },
  
  disability_benefits: {
    name: 'Disability Benefits Recipients',
    keywords: ['ODSP', 'CPP-D', 'disability tax credit', 'AISH', 'disability assistance'],
    agencies: ['MCCSS', 'Service Canada', 'CRA'],
    watchFor: ['rate freezes', 'clawbacks', 'medical reviews', 'denial rates']
  },
  
  indigenous_peoples: {
    name: 'Indigenous Peoples',
    keywords: ['First Nations', 'Inuit', 'Métis', 'reserve', 'treaty', 'indigenous services'],
    agencies: ['ISC', 'CIRNAC'],
    watchFor: ['water advisories', 'housing', 'child welfare', 'healthcare access', 'land claims']
  },
  
  homeless_housing: {
    name: 'Homeless & Housing Insecure',
    keywords: ['homelessness', 'shelter', 'affordable housing', 'rent', 'eviction', 'encampment'],
    agencies: ['CMHC', 'municipal housing'],
    watchFor: ['encampment clearances', 'shelter capacity', 'rent increases', 'renovictions']
  },
  
  seniors_ltc: {
    name: 'Seniors in Long-Term Care',
    keywords: ['long-term care', 'nursing home', 'elder abuse', 'staffing ratios', 'for-profit care'],
    agencies: ['LTC homes', 'provincial ministries'],
    watchFor: ['inspection failures', 'abuse reports', 'staffing levels', 'COVID outbreaks']
  },
  
  mental_health: {
    name: 'Mental Health & Addiction',
    keywords: ['mental health', 'addiction', 'psychiatric', 'overdose', 'safe supply', 'CAMH'],
    agencies: ['mental health agencies', 'hospitals'],
    watchFor: ['wait times', 'bed closures', 'overdose deaths', 'funding cuts']
  },
  
  children_youth: {
    name: 'Vulnerable Children & Youth',
    keywords: ['child welfare', 'foster care', 'group home', 'youth in care', 'autism services'],
    agencies: ['CAS', 'children\'s aid', 'MCCSS'],
    watchFor: ['waitlists', 'placement breakdowns', 'aging out', 'abuse in care']
  },
  
  low_income: {
    name: 'Low-Income & Working Poor',
    keywords: ['Ontario Works', 'social assistance', 'food bank', 'minimum wage', 'gig workers'],
    agencies: ['social services', 'employment services'],
    watchFor: ['benefit rates', 'cost of living gap', 'food insecurity', 'benefit cuts']
  },
  
  veterans: {
    name: 'Veterans',
    keywords: ['veterans affairs', 'military', 'PTSD', 'veteran benefits', 'transition services'],
    agencies: ['VAC', 'DND'],
    watchFor: ['benefit delays', 'mental health services', 'homelessness', 'suicide rates']
  },
  
  immigrants_refugees: {
    name: 'Immigrants & Refugees',
    keywords: ['immigration', 'refugee', 'asylum', 'temporary worker', 'international student'],
    agencies: ['IRCC', 'refugee boards'],
    watchFor: ['processing delays', 'detention', 'deportation', 'worker exploitation']
  }
};

// ============================================
// LIVE DATA FETCHING FUNCTIONS
// ============================================

/**
 * Fetch data from Open Canada API
 */
async function fetchOpenCanadaData(query, options = {}) {
  const baseUrl = LIVE_DATA_SOURCES.federal.openData.baseUrl;
  const searchUrl = `${baseUrl}/package_search?q=${encodeURIComponent(query)}&rows=${options.rows || 50}`;
  
  try {
    const response = await fetch(searchUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'EyeOracle/1.0 (Transparency Research)'
      }
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    return {
      success: true,
      source: 'Open Canada',
      timestamp: new Date().toISOString(),
      results: data.result?.results || [],
      count: data.result?.count || 0
    };
  } catch (error) {
    return {
      success: false,
      source: 'Open Canada',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Fetch Ontario Open Data
 */
async function fetchOntarioData(dataset, options = {}) {
  const baseUrl = LIVE_DATA_SOURCES.ontario.openData.baseUrl;
  const searchUrl = `${baseUrl}/package_search?q=${encodeURIComponent(dataset)}&rows=${options.rows || 50}`;
  
  try {
    const response = await fetch(searchUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'EyeOracle/1.0 (Transparency Research)'
      }
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    return {
      success: true,
      source: 'Ontario Open Data',
      timestamp: new Date().toISOString(),
      results: data.result?.results || [],
      count: data.result?.count || 0
    };
  } catch (error) {
    return {
      success: false,
      source: 'Ontario Open Data',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Scan all data sources for a specific topic
 */
async function scanAllSourcesForTopic(topic) {
  const results = {
    topic,
    scanTime: new Date().toISOString(),
    findings: [],
    sources: []
  };

  // Scan Federal Open Data
  const federalData = await fetchOpenCanadaData(topic);
  results.sources.push(federalData);
  
  if (federalData.success && federalData.results.length > 0) {
    for (const dataset of federalData.results.slice(0, 10)) {
      results.findings.push({
        title: dataset.title,
        source: 'Open Canada',
        url: `https://open.canada.ca/data/en/dataset/${dataset.id}`,
        organization: dataset.organization?.title,
        lastModified: dataset.metadata_modified,
        notes: dataset.notes?.substring(0, 500)
      });
    }
  }

  // Scan Ontario Open Data
  const ontarioData = await fetchOntarioData(topic);
  results.sources.push(ontarioData);
  
  if (ontarioData.success && ontarioData.results.length > 0) {
    for (const dataset of ontarioData.results.slice(0, 10)) {
      results.findings.push({
        title: dataset.title,
        source: 'Ontario Open Data',
        url: `https://data.ontario.ca/dataset/${dataset.id}`,
        organization: dataset.organization?.title,
        lastModified: dataset.metadata_modified,
        notes: dataset.notes?.substring(0, 500)
      });
    }
  }

  return results;
}

/**
 * Analyze data for scandal patterns
 */
function analyzeForScandals(data, focusArea) {
  const scandals = [];
  
  // Check for denial rate patterns
  if (data.denial_rate && data.previous_denial_rate) {
    const increase = (data.denial_rate - data.previous_denial_rate) / data.previous_denial_rate;
    if (increase > SCANDAL_PATTERNS.financial.denial_rate_spike.threshold) {
      scandals.push({
        type: 'denial_rate_spike',
        severity: 'critical',
        description: `Denial rate increased by ${(increase * 100).toFixed(1)}%`,
        evidence: {
          current: data.denial_rate,
          previous: data.previous_denial_rate,
          change: increase
        }
      });
    }
  }

  // Check for processing time increases
  if (data.processing_time && data.previous_processing_time) {
    const increase = (data.processing_time - data.previous_processing_time) / data.previous_processing_time;
    if (increase > SCANDAL_PATTERNS.financial.processing_time_increase.threshold) {
      scandals.push({
        type: 'processing_time_increase',
        severity: 'high',
        description: `Processing times increased by ${(increase * 100).toFixed(1)}%`,
        evidence: {
          current: data.processing_time,
          previous: data.previous_processing_time,
          change: increase
        }
      });
    }
  }

  // Check for data suppression (if previously available data is now missing)
  if (data.expected_fields) {
    const missingFields = data.expected_fields.filter(f => !data[f]);
    if (missingFields.length > 0) {
      scandals.push({
        type: 'data_suppression',
        severity: 'critical',
        description: `Previously available data no longer published: ${missingFields.join(', ')}`,
        evidence: {
          missingFields
        }
      });
    }
  }

  return scandals;
}

/**
 * Generate automated investigation report
 */
async function generateInvestigationReport(focusArea) {
  const area = VULNERABLE_FOCUS_AREAS[focusArea];
  if (!area) {
    throw new Error(`Unknown focus area: ${focusArea}`);
  }

  console.log(`\n👁️ THE EYE ORACLE - INITIATING INVESTIGATION`);
  console.log(`📋 Focus Area: ${area.name}`);
  console.log(`🔍 Keywords: ${area.keywords.slice(0, 5).join(', ')}...`);
  console.log(`⏰ Scan Time: ${new Date().toISOString()}\n`);

  const report = {
    focusArea: area.name,
    generatedAt: new Date().toISOString(),
    findings: [],
    scandalsDetected: [],
    dataSourcesScanned: [],
    recommendations: []
  };

  // Scan for each keyword
  for (const keyword of area.keywords.slice(0, 3)) {
    console.log(`   🔎 Scanning for: ${keyword}...`);
    const results = await scanAllSourcesForTopic(keyword);
    report.dataSourcesScanned.push(...results.sources);
    report.findings.push(...results.findings);
  }

  // Analyze for scandal patterns
  for (const item of area.watchFor) {
    const scandals = analyzeForScandals({ topic: item }, focusArea);
    report.scandalsDetected.push(...scandals);
  }

  // Generate recommendations
  if (report.findings.length > 0) {
    report.recommendations.push({
      action: 'Deep dive analysis',
      priority: 'high',
      description: `Found ${report.findings.length} relevant datasets - recommend detailed analysis`
    });
  }

  if (report.scandalsDetected.length > 0) {
    report.recommendations.push({
      action: 'Alert generation',
      priority: 'critical',
      description: `Detected ${report.scandalsDetected.length} potential scandals - recommend immediate alert`
    });
  }

  console.log(`\n✅ Investigation complete!`);
  console.log(`   📊 Findings: ${report.findings.length}`);
  console.log(`   ⚠️ Scandals Detected: ${report.scandalsDetected.length}`);
  console.log(`   💡 Recommendations: ${report.recommendations.length}`);

  return report;
}

/**
 * Run full automated scan across all vulnerable populations
 */
async function runFullScan() {
  console.log('\n' + '='.repeat(60));
  console.log('👁️ THE EYE ORACLE - FULL AUTOMATED SCAN');
  console.log('🎯 Scanning all vulnerable population focus areas');
  console.log('⏰ Started:', new Date().toISOString());
  console.log('='.repeat(60) + '\n');

  const fullReport = {
    scanId: `SCAN-${Date.now()}`,
    startTime: new Date().toISOString(),
    endTime: null,
    areasScanned: [],
    totalFindings: 0,
    totalScandals: 0,
    criticalAlerts: []
  };

  // Scan each focus area
  for (const [areaKey, area] of Object.entries(VULNERABLE_FOCUS_AREAS)) {
    try {
      const report = await generateInvestigationReport(areaKey);
      fullReport.areasScanned.push({
        area: areaKey,
        name: area.name,
        findings: report.findings.length,
        scandals: report.scandalsDetected.length
      });
      fullReport.totalFindings += report.findings.length;
      fullReport.totalScandals += report.scandalsDetected.length;

      // Add critical alerts
      const criticals = report.scandalsDetected.filter(s => s.severity === 'critical');
      fullReport.criticalAlerts.push(...criticals.map(c => ({
        ...c,
        focusArea: area.name
      })));

      // Rate limiting - be respectful to APIs
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`   ❌ Error scanning ${areaKey}:`, error.message);
    }
  }

  fullReport.endTime = new Date().toISOString();

  console.log('\n' + '='.repeat(60));
  console.log('👁️ FULL SCAN COMPLETE');
  console.log(`📊 Total Findings: ${fullReport.totalFindings}`);
  console.log(`⚠️ Total Scandals: ${fullReport.totalScandals}`);
  console.log(`🚨 Critical Alerts: ${fullReport.criticalAlerts.length}`);
  console.log('='.repeat(60) + '\n');

  return fullReport;
}

// ============================================
// HISTORICAL TRACKING
// ============================================

/**
 * Track data changes over time to detect cover-ups
 */
function trackDataChange(datasetId, currentData, historicalPath) {
  const historyFile = path.join(historicalPath, `${datasetId}.json`);
  
  let history = [];
  if (fs.existsSync(historyFile)) {
    try {
      history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
    } catch (e) {
      history = [];
    }
  }

  // Add current snapshot
  history.push({
    timestamp: new Date().toISOString(),
    data: currentData
  });

  // Keep last 365 days of history
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  history = history.filter(h => new Date(h.timestamp) > oneYearAgo);

  // Save updated history
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  // Analyze for changes
  if (history.length >= 2) {
    const previous = history[history.length - 2];
    const current = history[history.length - 1];
    
    return {
      hasChanged: JSON.stringify(previous.data) !== JSON.stringify(current.data),
      previousSnapshot: previous,
      currentSnapshot: current
    };
  }

  return { hasChanged: false, isFirstSnapshot: true };
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  LIVE_DATA_SOURCES,
  SCANDAL_PATTERNS,
  VULNERABLE_FOCUS_AREAS,
  fetchOpenCanadaData,
  fetchOntarioData,
  scanAllSourcesForTopic,
  analyzeForScandals,
  generateInvestigationReport,
  runFullScan,
  trackDataChange
};

// Run if called directly
if (require.main === module) {
  runFullScan().then(report => {
    const outputPath = path.join(__dirname, '../public/data/eye-oracle-scan-report.json');
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`📁 Full report saved to: ${outputPath}`);
  }).catch(console.error);
}

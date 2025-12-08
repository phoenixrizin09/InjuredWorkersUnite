/**
 * 👁️ THE EYE ORACLE - DEEP ANALYSIS ENGINE
 * 
 * The "Wizard" - An intelligent analysis system that:
 * 1. Cross-references multiple data sources
 * 2. Identifies patterns mainstream media misses
 * 3. Calculates corruption risk scores
 * 4. Generates evidence chains
 * 5. Creates actionable intelligence reports
 * 
 * THIS IS THE BRAIN OF THE EYE ORACLE
 */

const fs = require('fs');
const path = require('path');

// ============================================
// INTELLIGENCE ANALYSIS PATTERNS
// ============================================

/**
 * Cross-reference analysis - The Eye connects the dots
 */
const CROSS_REFERENCE_RULES = {
  // Money trail patterns
  moneyTrail: {
    lobbyist_to_policy: {
      name: 'Lobbyist Influence',
      description: 'Policy changes following lobbying activity',
      weight: 0.9,
      sources: ['lobbyRegistry', 'parliament', 'regulations']
    },
    contractor_to_official: {
      name: 'Contractor Connections',
      description: 'Government contracts awarded to connected parties',
      weight: 0.85,
      sources: ['sedar', 'lobbyRegistry', 'contracts']
    },
    executive_pay_vs_cuts: {
      name: 'Executive Enrichment',
      description: 'Executive pay increases during program cuts',
      weight: 0.8,
      sources: ['annualReports', 'budgets', 'sunshine_list']
    }
  },

  // Timing patterns (things they try to hide)
  timingPatterns: {
    friday_dump: {
      name: 'Friday News Dump',
      description: 'Bad news released Friday afternoon',
      dayOfWeek: 5,
      hourThreshold: 15,
      weight: 0.7
    },
    holiday_release: {
      name: 'Holiday Release',
      description: 'Bad news released before/during holidays',
      weight: 0.75
    },
    budget_buried: {
      name: 'Budget Burial',
      description: 'Bad news buried in budget documents',
      weight: 0.7
    },
    year_end_purge: {
      name: 'Year-End Purge',
      description: 'Documents released Dec 23-31',
      weight: 0.75
    }
  },

  // Statistical anomalies
  statisticalAnomalies: {
    sudden_improvement: {
      name: 'Suspicious Improvement',
      description: 'Metrics suddenly improve without policy change',
      threshold: 0.15,
      weight: 0.8
    },
    methodology_change: {
      name: 'Methodology Gaming',
      description: 'Counting method changed to hide bad numbers',
      weight: 0.9
    },
    missing_data: {
      name: 'Data Gaps',
      description: 'Key data points suddenly unavailable',
      weight: 0.85
    },
    rounding_patterns: {
      name: 'Round Number Fraud',
      description: 'Suspicious patterns in reported numbers',
      weight: 0.6
    }
  }
};

// ============================================
// CORRUPTION RISK CALCULATOR
// ============================================

/**
 * Calculate comprehensive corruption risk score
 */
function calculateCorruptionRisk(entity, data) {
  let score = 0;
  const factors = [];

  // Factor 1: Denial Rate Analysis (0-20 points)
  if (data.denialRate) {
    const denialScore = Math.min(20, data.denialRate * 25);
    score += denialScore;
    factors.push({
      name: 'Denial Rate',
      score: denialScore,
      max: 20,
      detail: `${(data.denialRate * 100).toFixed(1)}% denial rate`
    });
  }

  // Factor 2: Appeal Success Rate (0-15 points)
  // High appeal success = initial decisions were wrong
  if (data.appealSuccessRate) {
    const appealScore = Math.min(15, data.appealSuccessRate * 20);
    score += appealScore;
    factors.push({
      name: 'Appeal Success (indicates wrong initial decisions)',
      score: appealScore,
      max: 15,
      detail: `${(data.appealSuccessRate * 100).toFixed(1)}% of appeals succeed`
    });
  }

  // Factor 3: Processing Time Delays (0-15 points)
  if (data.avgProcessingDays && data.legalLimit) {
    const delayRatio = data.avgProcessingDays / data.legalLimit;
    const delayScore = Math.min(15, (delayRatio - 1) * 15);
    if (delayScore > 0) {
      score += delayScore;
      factors.push({
        name: 'Processing Delays',
        score: delayScore,
        max: 15,
        detail: `${data.avgProcessingDays} days avg (legal limit: ${data.legalLimit})`
      });
    }
  }

  // Factor 4: Budget vs Need Gap (0-15 points)
  if (data.budgetPerCapita && data.needPerCapita) {
    const gapRatio = 1 - (data.budgetPerCapita / data.needPerCapita);
    const gapScore = Math.min(15, Math.max(0, gapRatio * 20));
    score += gapScore;
    factors.push({
      name: 'Funding Gap',
      score: gapScore,
      max: 15,
      detail: `Budget covers ${((data.budgetPerCapita / data.needPerCapita) * 100).toFixed(0)}% of need`
    });
  }

  // Factor 5: Transparency Score (0-10 points, inverted)
  if (data.transparencyScore !== undefined) {
    const opacityScore = Math.min(10, (1 - data.transparencyScore) * 10);
    score += opacityScore;
    factors.push({
      name: 'Opacity (lack of transparency)',
      score: opacityScore,
      max: 10,
      detail: `Transparency rating: ${(data.transparencyScore * 100).toFixed(0)}%`
    });
  }

  // Factor 6: Complaint Volume (0-10 points)
  if (data.complaintsPerThousand) {
    const complaintScore = Math.min(10, data.complaintsPerThousand / 5);
    score += complaintScore;
    factors.push({
      name: 'Complaint Volume',
      score: complaintScore,
      max: 10,
      detail: `${data.complaintsPerThousand} complaints per 1000 cases`
    });
  }

  // Factor 7: Executive Pay Ratio (0-10 points)
  if (data.executivePay && data.avgBenefit) {
    const ratio = data.executivePay / (data.avgBenefit * 12);
    const ratioScore = Math.min(10, ratio / 10);
    score += ratioScore;
    factors.push({
      name: 'Executive Pay Disparity',
      score: ratioScore,
      max: 10,
      detail: `Executives earn ${ratio.toFixed(0)}x average annual benefit`
    });
  }

  // Factor 8: Year-over-Year Deterioration (0-5 points)
  if (data.yearOverYearChange && data.yearOverYearChange < 0) {
    const deteriorationScore = Math.min(5, Math.abs(data.yearOverYearChange) * 10);
    score += deteriorationScore;
    factors.push({
      name: 'Service Deterioration',
      score: deteriorationScore,
      max: 5,
      detail: `${(data.yearOverYearChange * 100).toFixed(1)}% worse than last year`
    });
  }

  // Normalize to 100
  score = Math.min(100, score);

  return {
    entity,
    score: Math.round(score),
    riskLevel: score >= 75 ? 'CRITICAL' : score >= 50 ? 'HIGH' : score >= 25 ? 'MEDIUM' : 'LOW',
    factors,
    calculatedAt: new Date().toISOString()
  };
}

// ============================================
// PATTERN DETECTION ENGINE
// ============================================

/**
 * Detect cover-up patterns in data releases
 */
function detectCoverUpPatterns(releaseData) {
  const patterns = [];

  // Check for Friday dump
  if (releaseData.releaseDate) {
    const date = new Date(releaseData.releaseDate);
    const dayOfWeek = date.getDay();
    const hour = date.getHours();

    if (dayOfWeek === 5 && hour >= 15) {
      patterns.push({
        pattern: 'friday_dump',
        confidence: 0.8,
        description: 'Released Friday afternoon - classic news dump timing',
        evidence: `Released at ${date.toISOString()}`
      });
    }

    // Check for holiday period
    const month = date.getMonth();
    const day = date.getDate();
    if ((month === 11 && day >= 20) || (month === 0 && day <= 3)) {
      patterns.push({
        pattern: 'holiday_release',
        confidence: 0.75,
        description: 'Released during holiday period when public attention is low',
        evidence: `Released on ${date.toDateString()}`
      });
    }
  }

  // Check for methodology changes
  if (releaseData.methodologyChanged) {
    patterns.push({
      pattern: 'methodology_change',
      confidence: 0.9,
      description: 'Counting methodology changed - numbers not comparable to previous periods',
      evidence: releaseData.methodologyNotes || 'Methodology change noted'
    });
  }

  // Check for missing historical data
  if (releaseData.historicalDataRemoved) {
    patterns.push({
      pattern: 'data_suppression',
      confidence: 0.95,
      description: 'Previously available historical data has been removed',
      evidence: `Missing data: ${releaseData.missingFields?.join(', ') || 'Multiple fields'}`
    });
  }

  return patterns;
}

/**
 * Analyze demographic disparities
 */
function analyzeDisparities(data) {
  const disparities = [];

  // Check geographic disparities
  if (data.byRegion) {
    const values = Object.values(data.byRegion);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const disparity = (max - min) / min;

    if (disparity > 0.5) {
      const worstRegion = Object.entries(data.byRegion).find(([k, v]) => v === max)?.[0];
      const bestRegion = Object.entries(data.byRegion).find(([k, v]) => v === min)?.[0];
      
      disparities.push({
        type: 'geographic',
        severity: disparity > 1 ? 'critical' : 'high',
        description: `${((disparity) * 100).toFixed(0)}% variation between regions`,
        worst: worstRegion,
        best: bestRegion,
        evidence: data.byRegion
      });
    }
  }

  // Check demographic disparities
  if (data.byDemographic) {
    for (const [category, groups] of Object.entries(data.byDemographic)) {
      const values = Object.values(groups);
      const max = Math.max(...values);
      const min = Math.min(...values);
      const disparity = (max - min) / min;

      if (disparity > 0.3) {
        const worstGroup = Object.entries(groups).find(([k, v]) => v === max)?.[0];
        const bestGroup = Object.entries(groups).find(([k, v]) => v === min)?.[0];
        
        disparities.push({
          type: `demographic_${category}`,
          severity: disparity > 0.75 ? 'critical' : 'high',
          description: `${category}: ${((disparity) * 100).toFixed(0)}% disparity`,
          disadvantaged: worstGroup,
          advantaged: bestGroup,
          evidence: groups
        });
      }
    }
  }

  return disparities;
}

// ============================================
// INTELLIGENCE REPORT GENERATOR
// ============================================

/**
 * Generate comprehensive intelligence report
 */
function generateIntelligenceReport(entity, allData) {
  const report = {
    entity,
    generatedAt: new Date().toISOString(),
    classification: 'PUBLIC INTEREST INVESTIGATION',
    
    // Executive Summary
    executiveSummary: {
      riskAssessment: null,
      keyFindings: [],
      immediateActions: []
    },
    
    // Detailed Analysis
    analysis: {
      corruptionRisk: null,
      coverUpPatterns: [],
      disparities: [],
      trendsOverTime: [],
      crossReferences: []
    },
    
    // Evidence Package
    evidence: {
      primarySources: [],
      secondarySources: [],
      dataPoints: [],
      documents: [],
      legalPrecedents: []
    },
    
    // Recommendations
    recommendations: {
      immediate: [],
      shortTerm: [],
      longTerm: [],
      legalOptions: []
    }
  };

  // Calculate corruption risk
  report.analysis.corruptionRisk = calculateCorruptionRisk(entity, allData);
  report.executiveSummary.riskAssessment = report.analysis.corruptionRisk;

  // Detect cover-up patterns
  if (allData.releases) {
    for (const release of allData.releases) {
      const patterns = detectCoverUpPatterns(release);
      report.analysis.coverUpPatterns.push(...patterns);
    }
  }

  // Analyze disparities
  report.analysis.disparities = analyzeDisparities(allData);

  // Generate key findings
  if (report.analysis.corruptionRisk.score >= 50) {
    report.executiveSummary.keyFindings.push({
      severity: 'high',
      finding: `${entity} has a corruption risk score of ${report.analysis.corruptionRisk.score}/100`,
      implication: 'Systematic issues detected requiring immediate attention'
    });
  }

  if (report.analysis.coverUpPatterns.length > 0) {
    report.executiveSummary.keyFindings.push({
      severity: 'high',
      finding: `${report.analysis.coverUpPatterns.length} cover-up patterns detected`,
      implication: 'Evidence suggests deliberate concealment of information'
    });
  }

  if (report.analysis.disparities.length > 0) {
    const criticalDisparities = report.analysis.disparities.filter(d => d.severity === 'critical');
    report.executiveSummary.keyFindings.push({
      severity: criticalDisparities.length > 0 ? 'critical' : 'high',
      finding: `${report.analysis.disparities.length} significant disparities detected`,
      implication: 'Potential discrimination or systemic bias'
    });
  }

  // Generate recommendations based on findings
  if (report.analysis.corruptionRisk.score >= 75) {
    report.recommendations.immediate.push({
      action: 'File FOI/ATIP Request',
      priority: 'critical',
      description: 'Request all internal documents related to decision-making processes',
      template: 'See FOI template generator'
    });
    report.recommendations.immediate.push({
      action: 'Contact Ombudsman',
      priority: 'critical',
      description: 'File formal complaint with relevant Ombudsman office'
    });
  }

  if (report.analysis.disparities.some(d => d.severity === 'critical')) {
    report.recommendations.immediate.push({
      action: 'Human Rights Complaint',
      priority: 'critical',
      description: 'Evidence suggests potential human rights violations',
      jurisdiction: 'Ontario Human Rights Tribunal / Canadian Human Rights Commission'
    });
  }

  report.recommendations.longTerm.push({
    action: 'Legislative Advocacy',
    priority: 'high',
    description: 'Push for legislative reform to address systemic issues'
  });

  return report;
}

// ============================================
// REAL-TIME MONITORING
// ============================================

/**
 * Compare current data with historical baseline
 */
function compareWithBaseline(currentData, baselinePath) {
  let baseline;
  try {
    baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  } catch (e) {
    return { isFirstRun: true, changes: [] };
  }

  const changes = [];

  // Compare key metrics
  for (const [key, currentValue] of Object.entries(currentData)) {
    if (baseline[key] !== undefined && typeof currentValue === 'number') {
      const baselineValue = baseline[key];
      const change = (currentValue - baselineValue) / baselineValue;
      
      if (Math.abs(change) > 0.05) { // 5% threshold
        changes.push({
          metric: key,
          baseline: baselineValue,
          current: currentValue,
          changePercent: (change * 100).toFixed(2),
          direction: change > 0 ? 'increased' : 'decreased',
          significance: Math.abs(change) > 0.2 ? 'major' : 'notable'
        });
      }
    }
  }

  return {
    isFirstRun: false,
    baselineDate: baseline._timestamp,
    changes,
    hasSignificantChanges: changes.some(c => c.significance === 'major')
  };
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  CROSS_REFERENCE_RULES,
  calculateCorruptionRisk,
  detectCoverUpPatterns,
  analyzeDisparities,
  generateIntelligenceReport,
  compareWithBaseline
};

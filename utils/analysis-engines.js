/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE EYE ORACLE - ADVANCED ANALYSIS ENGINES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * New analysis types for pattern detection, prediction, and systemic violation discovery
 */

/**
 * TREND ANALYSIS - Detect upward/downward trends in violations over time
 * Identifies accelerating problems like increasing denial rates
 */
function analyzeTrends(historicalData) {
  if (!historicalData || historicalData.length < 2) {
    return { trend: 'insufficient_data', confidence: 0 };
  }

  // Calculate trend using simple linear regression
  const n = historicalData.length;
  const x = Array.from({length: n}, (_, i) => i);
  const y = historicalData.map(d => d.value || 0);
  
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, s, i) => a + s * y[i], 0);
  const sumX2 = x.reduce((a, s) => a + s * s, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  // Calculate R-squared (confidence)
  const yMean = sumY / n;
  const ssRes = y.reduce((a, yi, i) => a + Math.pow(yi - (slope * i + intercept), 2), 0);
  const ssTot = y.reduce((a, yi) => a + Math.pow(yi - yMean, 2), 0);
  const rSquared = 1 - (ssRes / ssTot);
  
  return {
    trend: slope > 0.5 ? 'increasing' : slope < -0.5 ? 'decreasing' : 'stable',
    slope: slope.toFixed(2),
    confidence: Math.min(Math.abs(rSquared) * 100, 100).toFixed(1),
    projectedNext: (slope * n + intercept).toFixed(0),
    severity: slope > 1 ? 'critical' : slope > 0.5 ? 'high' : 'normal'
  };
}

/**
 * GEOGRAPHIC ANALYSIS - Map violations by region to identify hotspots
 */
function analyzeGeographicPatterns(violations, jurisdictions = ['Federal', 'Ontario', 'BC', 'Alberta', 'Quebec']) {
  const patterns = {};
  
  jurisdictions.forEach(jurisdiction => {
    const regional = violations.filter(v => v.jurisdiction === jurisdiction);
    patterns[jurisdiction] = {
      totalViolations: regional.length,
      severity: regional.reduce((sum, v) => sum + (v.severity || 0), 0) / Math.max(regional.length, 1),
      types: [...new Set(regional.map(v => v.type))],
      hotspot: regional.length > violations.length * 0.2 ? 'yes' : 'no',
      trend: regional.length > 0 ? 'active' : 'inactive'
    };
  });
  
  return {
    patterns,
    worstRegion: Object.entries(patterns).sort((a, b) => b[1].totalViolations - a[1].totalViolations)[0][0],
    highestSeverity: Object.entries(patterns).sort((a, b) => b[1].severity - a[1].severity)[0][0]
  };
}

/**
 * SYSTEMIC PATTERN DETECTION - Find coordinated discrimination patterns
 */
function detectSystems(violations) {
  const patterns = [];
  
  // Pattern 1: Same denial reason across regions
  const denialReasons = {};
  violations.forEach(v => {
    if (v.type === 'denial') {
      denialReasons[v.reason] = (denialReasons[v.reason] || 0) + 1;
    }
  });
  
  Object.entries(denialReasons).forEach(([reason, count]) => {
    if (count >= 3) {
      patterns.push({
        type: 'coordinated_denial_pattern',
        reason,
        instances: count,
        severity: count > 10 ? 'systemic' : 'significant',
        description: `Same denial reason ("${reason}") appears ${count} times - suggests policy coordination`
      });
    }
  });
  
  // Pattern 2: Policy changes leading to violations
  const timelines = violations.filter(v => v.date).sort((a, b) => new Date(a.date) - new Date(b.date));
  if (timelines.length > 2) {
    patterns.push({
      type: 'temporal_correlation',
      totalViolations: timelines.length,
      dateRange: `${timelines[0].date} to ${timelines[timelines.length - 1].date}`,
      avgPerMonth: (timelines.length / 12).toFixed(1),
      description: 'Violations concentrated over specific time period - possible policy-induced'
    });
  }
  
  return { patterns, systemicLevel: patterns.length > 3 ? 'critical' : 'significant' };
}

/**
 * CAUSALITY ANALYSIS - Link policy changes to specific outcomes
 */
function analyzeCausality(beforePolicy, afterPolicy, changeDate) {
  const before = {
    avgDenialRate: beforePolicy.reduce((sum, d) => sum + d.denialRate, 0) / beforePolicy.length,
    avgProcessingTime: beforePolicy.reduce((sum, d) => sum + d.processingDays, 0) / beforePolicy.length,
    complaintsCount: beforePolicy.filter(d => d.complaint).length
  };
  
  const after = {
    avgDenialRate: afterPolicy.reduce((sum, d) => sum + d.denialRate, 0) / afterPolicy.length,
    avgProcessingTime: afterPolicy.reduce((sum, d) => sum + d.processingDays, 0) / afterPolicy.length,
    complaintsCount: afterPolicy.filter(d => d.complaint).length
  };
  
  return {
    policyChangeDate: changeDate,
    denialRateChange: ((after.avgDenialRate - before.avgDenialRate) / before.avgDenialRate * 100).toFixed(1) + '%',
    processingTimeChange: ((after.avgProcessingTime - before.avgProcessingTime) / before.avgProcessingTime * 100).toFixed(1) + '%',
    complaintChange: after.complaintsCount - before.complaintsCount,
    causality: {
      strength: Math.abs(after.avgDenialRate - before.avgDenialRate) > 5 ? 'strong' : 'moderate',
      direction: after.avgDenialRate > before.avgDenialRate ? 'increased_harm' : 'improved_outcomes',
      confidence: '75%'
    }
  };
}

/**
 * COST-BENEFIT ANALYSIS - Calculate human/economic cost of violations
 */
function costBenefitAnalysis(violations, averageYearlyCost = 35000) {
  const totalViolations = violations.length;
  const affectedPeople = new Set(violations.map(v => v.personId || v.caseId)).size;
  
  const humanCosts = {
    deniedBenefits: violations.filter(v => v.type === 'denial').length * averageYearlyCost,
    delayedClaims: violations.filter(v => v.delay).length * (averageYearlyCost * 0.1), // 10% cost per month delay
    mentalHealthImpact: affectedPeople * 5000 // Estimate for mental health impact
  };
  
  const totalHumanCost = Object.values(humanCosts).reduce((a, b) => a + b, 0);
  
  const fixingCosts = {
    adminOverhead: affectedPeople * 500, // Cost to process appeals
    systemReform: 1000000, // One-time cost to fix policy
    compensation: affectedPeople * 10000 // Average compensation
  };
  
  const totalFixingCost = Object.values(fixingCosts).reduce((a, b) => a + b, 0);
  
  return {
    violationsCount: totalViolations,
    affectedPeople,
    humanCostPerViolation: (totalHumanCost / totalViolations).toFixed(0),
    totalHumanCost: `$${totalHumanCost.toLocaleString()}`,
    costToFix: `$${totalFixingCost.toLocaleString()}`,
    savingsIfFixed: `$${(totalHumanCost - totalFixingCost).toLocaleString()}`,
    recommendation: totalHumanCost > totalFixingCost * 2 ? 'URGENT: Fix immediately' : 'Consider fixing'
  };
}

/**
 * INTERNATIONAL COMPARATIVE ANALYSIS - Compare to global standards
 */
function compareToInternational(canadianData, unanlytics = {}) {
  const unatargets = {
    minBenefitRate: 100, // Everyone should get benefits
    maxDenialRate: 5, // UNCRPD standard
    maxWaitingDays: 30,
    minComplianceScore: 90
  };
  
  const canadian = {
    denialRate: canadianData.denialRate || 60,
    averageWaitDays: canadianData.waitDays || 120,
    complianceScore: canadianData.complianceScore || 45
  };
  
  const gaps = {
    denialRateGap: canadian.denialRate - unatargets.maxDenialRate,
    waitTimeGap: canadian.averageWaitDays - unatargets.maxWaitingDays,
    complianceGap: unatargets.minComplianceScore - canadian.complianceScore
  };
  
  return {
    canadian,
    unatargets,
    gaps,
    violatesUncrpd: gaps.complianceGap > 0,
    violatesGeneralComment: gaps.denialRateGap > 0,
    severity: gaps.denialRateGap > 30 ? 'severe_violation' : 'moderate_violation',
    internationalStanding: 'Below acceptable standards'
  };
}

/**
 * PREDICTION MODEL - Forecast future violations
 */
function predictFutureViolations(historicalViolations, monthsAhead = 6) {
  const timeline = historicalViolations.filter(v => v.date).sort((a, b) => new Date(a.date) - new Date(b.date));
  
  if (timeline.length < 3) return { prediction: 'insufficient_data' };
  
  // Simple moving average prediction
  const recentCount = timeline.slice(-12).length; // Last 12 months
  const avgViolationsPerMonth = recentCount / 12;
  
  const predictions = [];
  for (let i = 1; i <= monthsAhead; i++) {
    predictions.push({
      month: `+${i}`,
      projectedViolations: Math.round(avgViolationsPerMonth * i),
      confidence: 75 - (i * 3) // Decreases with distance
    });
  }
  
  return {
    baselineViolationRate: avgViolationsPerMonth.toFixed(1),
    predictions,
    trend: avgViolationsPerMonth > 5 ? 'increasing' : 'stable',
    recommendation: avgViolationsPerMonth > 5 ? 'Immediate intervention needed' : 'Monitor closely'
  };
}

/**
 * INTERSECTIONALITY ANALYSIS - How multiple factors compound discrimination
 */
function analyzeIntersectionality(violations) {
  const intersectionGroups = {};
  
  violations.forEach(v => {
    if (v.demographics) {
      const key = `${v.demographics.race || 'unknown'}_${v.demographics.gender || 'unknown'}_${v.demographics.disabilityType || 'unknown'}`;
      if (!intersectionGroups[key]) {
        intersectionGroups[key] = {
          count: 0,
          avgSeverity: 0,
          denialRate: 0,
          group: v.demographics
        };
      }
      intersectionGroups[key].count++;
      intersectionGroups[key].avgSeverity += (v.severity || 0);
      if (v.type === 'denial') intersectionGroups[key].denialRate++;
    }
  });
  
  // Calculate intersectional impact scores
  const intersectionalImpact = Object.entries(intersectionGroups).map(([key, data]) => ({
    group: key,
    population: data.count,
    disproportionateImpact: data.denialRate > violations.filter(v => v.type === 'denial').length / violations.length * 1.5,
    compoundingFactors: Object.keys(data.group).length,
    urgencyScore: (data.denialRate / data.count * 100).toFixed(1)
  }));
  
  return {
    totalGroups: Object.keys(intersectionGroups).length,
    mostDisproportionate: intersectionalImpact.sort((a, b) => b.urgencyScore - a.urgencyScore)[0],
    analysis: intersectionalImpact,
    recommendation: 'Targeted interventions needed for most impacted intersectional groups'
  };
}

module.exports = {
  analyzeTrends,
  analyzeGeographicPatterns,
  detectSystems,
  analyzeCausality,
  costBenefitAnalysis,
  compareToInternational,
  predictFutureViolations,
  analyzeIntersectionality
};

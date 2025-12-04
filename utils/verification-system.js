/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VERIFICATION BADGE SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Adds verification badges to all claims and data to distinguish:
 * - ✅ VERIFIED: Data from official government/legal sources
 * - 📊 SOURCED: Data with cited public sources
 * - ⚠️ UNVERIFIED: Claims without verified sources
 * - 🔴 MOCK: Placeholder/example data
 * 
 * This ensures transparency and credibility for all displayed information.
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Verification levels
export const VERIFICATION_LEVELS = {
  VERIFIED: {
    level: 'verified',
    badge: '✅ VERIFIED',
    color: '#22c55e',
    description: 'Official government, court, or regulatory source',
    trustScore: 100
  },
  SOURCED: {
    level: 'sourced',
    badge: '📊 SOURCED',
    color: '#3b82f6',
    description: 'Public source cited but not directly verified',
    trustScore: 75
  },
  COMMUNITY: {
    level: 'community',
    badge: '👥 COMMUNITY',
    color: '#8b5cf6',
    description: 'User-reported or community-sourced information',
    trustScore: 50
  },
  UNVERIFIED: {
    level: 'unverified',
    badge: '⚠️ UNVERIFIED',
    color: '#f59e0b',
    description: 'Cannot be independently verified',
    trustScore: 25
  },
  MOCK: {
    level: 'mock',
    badge: '🔴 EXAMPLE',
    color: '#ef4444',
    description: 'Placeholder or demonstration data',
    trustScore: 0
  }
};

// Official verified sources
export const VERIFIED_SOURCES = [
  // Government
  'open.canada.ca',
  'data.ontario.ca',
  'parl.ca',
  'openparliament.ca',
  'canlii.org',
  'sedarplus.ca',
  'wsib.ca',
  'ontario.ca',
  'canada.ca',
  'auditor.on.ca',
  'ombudsman.on.ca',
  'sac-isc.gc.ca',
  'statcan.gc.ca',
  
  // Courts & Tribunals
  'scc-csc.ca',
  'ontariocourts.ca',
  'sst-tss.gc.ca',
  
  // Regulatory
  'osc.ca',
  'ipc.on.ca',
  'ohrc.on.ca',
  
  // Verified News (Major outlets)
  'cbc.ca',
  'globeandmail.com',
  'thestar.com',
  'nationalpost.com'
];

// Sourced but not directly verified
export const SOURCED_SOURCES = [
  'reddit.com',
  'twitter.com',
  'x.com',
  'linkedin.com',
  'incomesecurity.org',
  'ontariohealthcoalition.ca',
  'ontarioautismcoalition.com',
  'diabetes.ca',
  'cda-adc.ca'
];

/**
 * Determine verification level for a data item
 */
export function getVerificationLevel(item) {
  // Check if explicitly marked
  if (item.verified === true && item.source_url) {
    return VERIFICATION_LEVELS.VERIFIED;
  }
  
  if (item.verified === false || item.mock === true) {
    return VERIFICATION_LEVELS.MOCK;
  }
  
  // Check source URL against verified sources
  if (item.source_url) {
    const urlLower = item.source_url.toLowerCase();
    
    if (VERIFIED_SOURCES.some(src => urlLower.includes(src))) {
      return VERIFICATION_LEVELS.VERIFIED;
    }
    
    if (SOURCED_SOURCES.some(src => urlLower.includes(src))) {
      return VERIFICATION_LEVELS.SOURCED;
    }
    
    // Has URL but not in known lists
    return VERIFICATION_LEVELS.COMMUNITY;
  }
  
  // Check if source text references known sources
  if (item.source) {
    const sourceLower = item.source.toLowerCase();
    
    if (sourceLower.includes('ombudsman') || 
        sourceLower.includes('auditor general') ||
        sourceLower.includes('government') ||
        sourceLower.includes('parliament') ||
        sourceLower.includes('canlii') ||
        sourceLower.includes('statistics canada')) {
      return VERIFICATION_LEVELS.SOURCED;
    }
    
    if (sourceLower.includes('reddit') || sourceLower.includes('community')) {
      return VERIFICATION_LEVELS.COMMUNITY;
    }
  }
  
  // Default to unverified
  return VERIFICATION_LEVELS.UNVERIFIED;
}

/**
 * Add verification badge to an item
 */
export function addVerificationBadge(item) {
  const verification = getVerificationLevel(item);
  
  return {
    ...item,
    verification: {
      level: verification.level,
      badge: verification.badge,
      color: verification.color,
      description: verification.description,
      trustScore: verification.trustScore,
      verifiedAt: new Date().toISOString()
    }
  };
}

/**
 * Process an array of items and add verification badges
 */
export function addVerificationBadges(items) {
  return items.map(addVerificationBadge);
}

/**
 * Generate verification summary for a dataset
 */
export function getVerificationSummary(items) {
  const summary = {
    total: items.length,
    verified: 0,
    sourced: 0,
    community: 0,
    unverified: 0,
    mock: 0,
    averageTrustScore: 0
  };
  
  let totalScore = 0;
  
  for (const item of items) {
    const verification = item.verification || getVerificationLevel(item);
    totalScore += verification.trustScore;
    
    switch (verification.level) {
      case 'verified': summary.verified++; break;
      case 'sourced': summary.sourced++; break;
      case 'community': summary.community++; break;
      case 'unverified': summary.unverified++; break;
      case 'mock': summary.mock++; break;
    }
  }
  
  summary.averageTrustScore = items.length > 0 
    ? Math.round(totalScore / items.length) 
    : 0;
  
  summary.credibilityRating = getCredibilityRating(summary.averageTrustScore);
  
  return summary;
}

/**
 * Get credibility rating based on trust score
 */
function getCredibilityRating(score) {
  if (score >= 90) return { rating: 'A+', label: 'Highly Credible', color: '#22c55e' };
  if (score >= 80) return { rating: 'A', label: 'Very Credible', color: '#4ade80' };
  if (score >= 70) return { rating: 'B', label: 'Credible', color: '#86efac' };
  if (score >= 60) return { rating: 'C', label: 'Mostly Credible', color: '#fbbf24' };
  if (score >= 50) return { rating: 'D', label: 'Partially Credible', color: '#f59e0b' };
  return { rating: 'F', label: 'Low Credibility', color: '#ef4444' };
}

/**
 * Create verification badge HTML for display
 */
export function createBadgeHTML(verification) {
  if (!verification) return '';
  
  return `
    <span class="verification-badge" 
          style="
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            background: ${verification.color}20;
            color: ${verification.color};
            border: 1px solid ${verification.color}40;
          "
          title="${verification.description}">
      ${verification.badge}
    </span>
  `;
}

/**
 * Create verification badge React component props
 */
export function getBadgeProps(verification) {
  if (!verification) {
    verification = VERIFICATION_LEVELS.UNVERIFIED;
  }
  
  return {
    badge: verification.badge,
    color: verification.color,
    backgroundColor: `${verification.color}20`,
    borderColor: `${verification.color}40`,
    title: verification.description,
    trustScore: verification.trustScore
  };
}

/**
 * Validate and enhance an alert with verification
 */
export function validateAlert(alert) {
  const enhanced = addVerificationBadge(alert);
  
  // Add specific validation for different alert types
  if (alert.category === 'legislation') {
    enhanced.validationNotes = 'Verify on parl.ca or openparliament.ca';
  } else if (alert.category === 'court_decision') {
    enhanced.validationNotes = 'Full decision available on CanLII';
  } else if (alert.category === 'government_data') {
    enhanced.validationNotes = 'Dataset available on open data portal';
  } else if (alert.category === 'corporate_filing') {
    enhanced.validationNotes = 'Filing available on SEDAR+';
  }
  
  return enhanced;
}

/**
 * Generate trust report for entire system
 */
export function generateTrustReport(allData) {
  const report = {
    generatedAt: new Date().toISOString(),
    sections: {}
  };
  
  for (const [section, items] of Object.entries(allData)) {
    if (Array.isArray(items)) {
      report.sections[section] = getVerificationSummary(items);
    }
  }
  
  // Overall system credibility
  const allItems = Object.values(allData).flat().filter(Array.isArray);
  if (allItems.length > 0) {
    report.overall = getVerificationSummary(allItems);
  }
  
  return report;
}

export default {
  VERIFICATION_LEVELS,
  VERIFIED_SOURCES,
  SOURCED_SOURCES,
  getVerificationLevel,
  addVerificationBadge,
  addVerificationBadges,
  getVerificationSummary,
  createBadgeHTML,
  getBadgeProps,
  validateAlert,
  generateTrustReport
};

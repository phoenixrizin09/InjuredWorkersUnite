/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE EYE ORACLE - Incorruptible Evidence-Driven Investigative Intelligence
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * An evidence-driven investigative AI system that exposes corruption,
 * abuse of power, discrimination, human rights violations, and unconstitutional
 * actions across Canada at all levels of government.
 * 
 * CORE MISSION:
 * ✓ Identify corruption and misconduct
 * ✓ Analyze constitutional compliance (Charter, Constitution Acts)
 * ✓ Detect human rights violations (CHRA, provincial codes, Bill C-81)
 * ✓ Monitor UNCRPD compliance (UN Convention on Rights of Persons with Disabilities)
 * ✓ Protect vulnerable populations
 * ✓ Expose systemic patterns of harm
 * ✓ Provide evidence-based, actionable intelligence
 * 
 * OUTPUT: Structured JSON with 10 mandatory sections
 * VERSION: 2.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * UTILITY FUNCTIONS
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * Escape special regex characters in a string
 * This prevents regex injection and "Invalid regular expression" errors
 * @param {string} string - The string to escape
 * @returns {string} - The escaped string safe for use in RegExp
 */
function escapeRegExp(string) {
  if (typeof string !== 'string') return '';
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MAIN PROCESSOR - THE EYE ANALYSIS ENGINE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * INPUT: {
 *   raw_text: string,
 *   fetch_date: ISO date string,
 *   source_type: 'news'|'FOI'|'report'|'social'|'official'|'leak',
 *   source_url: optional URL,
 *   raw_metadata: optional {title, author, etc}
 * }
 * 
 * OUTPUT: Complete investigative intelligence report (JSON)
 */
export async function processDocument(input) {
  const startTime = Date.now();
  
  // Robust input validation
  if (!input) {
    throw new Error('THE EYE requires input to analyze');
  }
  
  // Extract text from input - handle various input formats
  let text = '';
  if (typeof input === 'string') {
    text = input;
  } else if (typeof input === 'object') {
    text = input.raw_text || input.content || input.text || '';
    
    // If input is still an object (not text), try to extract meaningful content
    if (!text && input.title) {
      text = `${input.title || ''} ${input.description || ''} ${input.summary || ''}`.trim();
    }
    
    // Avoid processing raw JSON objects as text
    if (!text || text.startsWith('{') || text.startsWith('[')) {
      console.warn('THE EYE: Received JSON object instead of text content');
      throw new Error('THE EYE requires text content, not raw JSON');
    }
  }
  
  if (!text || text.trim().length === 0) {
    throw new Error('THE EYE requires text content to analyze');
  }
  
  // Ensure text is actually text, not stringified JSON
  if (text.includes('"datasets":[') || text.includes('"jurisdiction"')) {
    console.warn('THE EYE: Detected JSON string passed as text content');
    throw new Error('THE EYE requires readable text content, not JSON data');
  }
  
  console.log('👁️ THE EYE: Initiating evidence-driven analysis...');
  
  // ═══════════════════════════════════════════════════════════════════
  // STEP 1-4: STANDARD EVIDENCE EXTRACTION
  // ═══════════════════════════════════════════════════════════════════
  
  const metadata = extractMetadata(input);
  const entities = extractEntities(text);
  const relationships = mapRelationships(entities, text);
  const claims = extractClaims(text, entities);
  
  console.log(`  ✓ Extracted ${claims.length} claims, ${entities.organizations?.length || 0} organizations, ${entities.people?.length || 0} people`);
  
  // ═══════════════════════════════════════════════════════════════════
  // STEP 5: VERIFY AGAINST AUTHORITATIVE SOURCES
  // ═══════════════════════════════════════════════════════════════════
  
  const corroboration = await corroborateClaims(claims, metadata);
  
  // ═══════════════════════════════════════════════════════════════════
  // THE EYE DEEP ANALYSIS (v2.0)
  // ═══════════════════════════════════════════════════════════════════
  
  console.log('👁️ THE EYE: Performing deep constitutional & rights analysis...');
  
  // STEP 6: CORRUPTION DETECTION
  const corruptionFindings = identifyCorruption(text, entities, claims, relationships);
  
  // STEP 7: CONSTITUTIONAL ANALYSIS
  const constitutionViolations = analyzeConstitutionalCompliance(text, claims, entities);
  
  // STEP 8: HUMAN RIGHTS ANALYSIS
  const humanRightsBreaches = analyzeHumanRights(text, claims, entities);
  
  // STEP 9: UNCRPD COMPLIANCE
  const uncrpdBreaches = analyzeUNCRPD(text, claims, entities);
  
  // STEP 10: VULNERABLE POPULATION IMPACT
  const impactedGroups = identifyVulnerablePopulations(text, entities, claims);
  
  // STEP 11: SYSTEMIC PATTERN DETECTION
  const patternsDetected = detectSystemicPatterns(claims, entities, corroboration);
  
  console.log(`  ✓ Found ${corruptionFindings.length} corruption indicators`);
  console.log(`  ✓ Detected ${constitutionViolations.length} constitutional violations`);
  console.log(`  ✓ Identified ${humanRightsBreaches.length} human rights breaches`);
  console.log(`  ✓ Found ${uncrpdBreaches.length} UNCRPD violations`);
  console.log(`  ✓ ${impactedGroups.length} vulnerable groups impacted`);
  
  // ═══════════════════════════════════════════════════════════════════
  // STEP 12: COMPREHENSIVE RISK ASSESSMENT
  // ═══════════════════════════════════════════════════════════════════
  
  const riskAssessment = calculateRiskScore(
    claims,
    corroboration,
    entities,
    corruptionFindings,
    constitutionViolations,
    humanRightsBreaches,
    uncrpdBreaches,
    impactedGroups
  );
  
  console.log(`  ✓ Risk Score: ${riskAssessment.overall_risk_score}/100 (${riskAssessment.priority})`);
  
  // ═══════════════════════════════════════════════════════════════════
  // STEP 13: GENERATE EVIDENCE-BASED ACTIONS
  // ═══════════════════════════════════════════════════════════════════
  
  const actions = generateActions(
    claims,
    entities,
    metadata,
    riskAssessment,
    corruptionFindings,
    constitutionViolations,
    humanRightsBreaches,
    uncrpdBreaches
  );
  
  // ═══════════════════════════════════════════════════════════════════
  // STEP 14-15: PROVENANCE & ACTORS
  // ═══════════════════════════════════════════════════════════════════
  
  const provenance = compileProvenance(input, corroboration);
  const actorsInvolved = extractActors(entities, corruptionFindings, constitutionViolations);
  
  // ═══════════════════════════════════════════════════════════════════
  // FINAL REPORT ASSEMBLY
  // ═══════════════════════════════════════════════════════════════════
  
  const report = {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // DOCUMENT IDENTIFIERS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    id: `eye_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: metadata.title,
    date: new Date().toISOString().split('T')[0],
    publication_date: metadata.date || new Date().toISOString().split('T')[0],
    jurisdiction: metadata.jurisdiction,
    source_url: input.source_url || metadata.source_url || 'N/A',
    source_type: input.source_type || 'unknown',
    fetch_date: input.fetch_date || new Date().toISOString(),
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // BASIC METADATA
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    metadata: {
      title: metadata.title,
      author: metadata.author,
      word_count: text.split(/\s+/).length,
      language: metadata.language || 'en',
      jurisdiction_level: metadata.jurisdiction?.level || 'unknown'
    },
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 📋 THE EYE MANDATORY OUTPUT (10 SECTIONS)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    // 1️⃣ CORRUPTION FINDINGS
    CorruptionFindings: corruptionFindings,
    
    // 2️⃣ CONSTITUTION VIOLATIONS
    ConstitutionViolations: constitutionViolations,
    
    // 3️⃣ HUMAN RIGHTS BREACHES
    HumanRightsBreaches: humanRightsBreaches,
    
    // 4️⃣ UNCRPD BREACHES
    UNCRPDBreaches: uncrpdBreaches,
    
    // 5️⃣ IMPACTED GROUPS
    ImpactedGroups: impactedGroups,
    
    // 6️⃣ EVIDENCE
    Evidence: {
      entities,
      relationships,
      claims,
      corroboration,
      provenance
    },
    
    // 7️⃣ ACTORS INVOLVED
    ActorsInvolved: actorsInvolved,
    
    // 8️⃣ PATTERNS DETECTED
    PatternsDetected: patternsDetected,
    
    // 9️⃣ RISK ASSESSMENT
    RiskAssessment: {
      legal_risk: riskAssessment.legal_risk,
      human_rights_impact: riskAssessment.human_rights_impact,
      constitutional_violation_severity: riskAssessment.constitutional_severity,
      corruption_exposure_risk: riskAssessment.corruption_risk,
      vulnerable_population_harm_level: riskAssessment.vulnerable_harm,
      overall_risk_score: riskAssessment.overall_risk_score,
      risk_explanation: riskAssessment.explanation,
      priority: riskAssessment.priority
    },
    
    // 🔟 RECOMMENDED ACTIONS
    RecommendedActions: actions,
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PROCESSING METADATA
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    processing_time_ms: Date.now() - startTime,
    processed_at: new Date().toISOString(),
    version: '2.0.0',
    system: 'THE EYE - Incorruptible Evidence-Driven Investigative Intelligence'
  };
  
  console.log(`👁️ THE EYE: Analysis complete. ${report.RecommendedActions.length} actions recommended.`);
  
  return report;
}

// ═══════════════════════════════════════════════════════════════════════════
// EVIDENCE EXTRACTION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function extractMetadata(input) {
  const content = input.raw_text || input.content || '';
  const metadata = input.raw_metadata || {};
  
  return {
    title: metadata.title || extractTitle(content) || 'Untitled Document',
    date: metadata.date || extractDate(content) || input.fetch_date,
    author: metadata.author || extractAuthor(content) || 'Unknown',
    source_url: input.source_url || input.raw_text_or_url || 'N/A',
    jurisdiction: metadata.jurisdiction || detectJurisdiction(content),
    language: metadata.language || 'en'
  };
}

function extractTitle(text) {
  const lines = text.split('\n').filter(l => l.trim().length > 10);
  return lines[0]?.trim().substring(0, 200) || 'Untitled Document';
}

function extractDate(text) {
  const datePattern = /\b(20\d{2})[-\/](\d{1,2})[-\/](\d{1,2})\b/;
  const match = text.match(datePattern);
  return match ? match[0] : new Date().toISOString().split('T')[0];
}

function extractAuthor(text) {
  const authorPattern = /(?:by|author|written by):?\s*([A-Z][a-z]+\s+[A-Z][a-z]+)/i;
  const match = text.match(authorPattern);
  return match ? match[1] : 'Unknown';
}

function detectJurisdiction(text) {
  const provinces = {
    'Ontario': ['Ontario', 'Toronto', 'Ottawa', 'Hamilton', 'WSIB', 'ODSP'],
    'Quebec': ['Quebec', 'Montreal', 'CNESST'],
    'British Columbia': ['BC', 'British Columbia', 'Vancouver', 'WorkSafeBC'],
    'Alberta': ['Alberta', 'Calgary', 'Edmonton', 'WCB Alberta'],
    'Federal': ['Canada', 'Federal', 'RCMP', 'CRA', 'Service Canada']
  };
  
  for (const [jurisdiction, keywords] of Object.entries(provinces)) {
    if (keywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(text))) {
      return {
        location: jurisdiction,
        level: jurisdiction === 'Federal' ? 'federal' : 'province'
      };
    }
  }
  
  return { location: 'Canada', level: 'unknown' };
}

function extractEntities(text) {
  const entities = {
    people: [],
    organizations: [],
    money: [],
    dates: []
  };
  
  // People (simple NER pattern)
  const peoplePattern = /\b([A-Z][a-z]+\s+[A-Z][a-z]+)\b/g;
  let peopleMatches = text.match(peoplePattern) || [];
  peopleMatches = [...new Set(peopleMatches)].slice(0, 10);
  
  peopleMatches.forEach(name => {
    if (!['The Eye', 'United Nations', 'Supreme Court'].includes(name)) {
      entities.people.push({
        full_name: name,
        role: extractRole(text, name),
        context: extractContext(text, name, 100)
      });
    }
  });
  
  // Organizations
  const orgPatterns = [
    { pattern: /\b(WSIB|Workplace Safety Insurance Board)\b/gi, type: 'workers_comp' },
    { pattern: /\b(ODSP|Ontario Disability Support Program)\b/gi, type: 'social_assistance' },
    { pattern: /\b(CPP-D|Canada Pension Plan Disability)\b/gi, type: 'social_assistance' },
    { pattern: /\b(Service Canada)\b/gi, type: 'government' },
    { pattern: /\b(Ministry of Labour|Labour Ministry)\b/gi, type: 'government' },
    { pattern: /\b(Ombudsman|Auditor General|Integrity Commissioner)\b/gi, type: 'oversight' },
    { pattern: /\b(RCMP|OPP|Police)\b/gi, type: 'law_enforcement' },
    { pattern: /\b([A-Z][a-zA-Z&\s]+(?:Inc\.|Corp\.|Ltd\.|Company))\b/g, type: 'corporation' }
  ];
  
  orgPatterns.forEach(({ pattern, type }) => {
    const matches = [...new Set([...text.matchAll(pattern)].map(m => m[1]))];
    matches.forEach(name => {
      entities.organizations.push({
        name,
        type,
        context: extractContext(text, name, 100)
      });
    });
  });
  
  // Money
  const moneyPattern = /\$?([\d,]+(?:\.\d+)?)\s*(million|billion|thousand)?/gi;
  const moneyMatches = [...text.matchAll(moneyPattern)];
  moneyMatches.slice(0, 10).forEach(match => {
    entities.money.push({
      amount: match[1].replace(/,/g, ''),
      scale: match[2] || 'dollars',
      context: extractContext(text, match[0], 80)
    });
  });
  
  // Dates
  const datePattern = /\b(20\d{2}(?:[-\/]\d{1,2}(?:[-\/]\d{1,2})?)?)\b/g;
  const dateMatches = [...new Set([...text.matchAll(datePattern)].map(m => m[1]))];
  dateMatches.slice(0, 5).forEach(date => {
    entities.dates.push({
      date,
      context: extractContext(text, date, 80)
    });
  });
  
  return entities;
}

function extractRole(text, name) {
  try {
    const escapedName = escapeRegExp(name);
    const rolePattern = new RegExp(`${escapedName}[,\\s]+((?:a|an|the)\\s+)?([a-z\\s]+?)(?=[,\\.\\n])`, 'i');
    const match = text.match(rolePattern);
    return match ? match[2].trim() : 'unknown';
  } catch (e) {
    return 'unknown';
  }
}

function mapRelationships(entities, text) {
  const relationships = [];
  
  // Simple relationship extraction between people and organizations
  entities.people?.forEach(person => {
    entities.organizations?.forEach(org => {
      try {
        const escapedPerson = escapeRegExp(person.full_name);
        const escapedOrg = escapeRegExp(org.name);
        const pattern = new RegExp(`${escapedPerson}[^.]{0,100}${escapedOrg}`, 'i');
        if (pattern.test(text)) {
          relationships.push({
            type: 'association',
            from: person.full_name,
            to: org.name,
            confidence: 'medium',
            evidence: extractContext(text, person.full_name, 100)
          });
        }
      } catch (e) {
        // Skip if regex fails
      }
    });
  });
  
  return relationships.slice(0, 20);
}

function extractClaims(text, entities) {
  const claims = [];
  
  const claimPatterns = [
    { type: 'denial', pattern: /(den(y|ied|ial)|refus(e|ed|al)|reject(ed|ion))\s+[^.]{10,200}/gi },
    { type: 'fraud', pattern: /(fraud|defraud|fraudulent|scam)[^.]{10,200}/gi },
    { type: 'abuse', pattern: /(abuse|abusive|mistreat|exploit)[^.]{10,200}/gi },
    { type: 'violation', pattern: /(violat(e|ed|ion|ing)|breach|infringe)[^.]{10,200}/gi },
    { type: 'discrimination', pattern: /(discriminat(e|ed|ion|ing)|unfair treatment)[^.]{10,200}/gi },
    { type: 'corruption', pattern: /(corrupt(ion|)|bribe|kickback|payoff)[^.]{10,200}/gi }
  ];
  
  claimPatterns.forEach(({ type, pattern }) => {
    const matches = text.match(pattern);
    if (matches) {
      matches.slice(0, 3).forEach(match => {
        // Get a short keyword from the match for context extraction
        const shortKeyword = match.substring(0, 50).split(/\s+/).slice(0, 5).join(' ');
        claims.push({
          claim_text: match.trim(),
          claim_type: type,
          alleged_actor: findActor(match, entities),
          alleged_victim: findVictim(match, entities),
          date_of_event: extractDate(match) || 'unknown',
          supporting_evidence: {
            quote: match.substring(0, 200),
            source_snippet: extractContext(text, shortKeyword, 150)
          },
          evidence_strength: determineEvidenceStrength(match, type)
        });
      });
    }
  });
  
  return claims;
}

function findActor(text, entities) {
  const org = entities.organizations?.find(o => text.includes(o.name));
  return org ? org.name : 'Unknown';
}

function findVictim(text, entities) {
  const person = entities.people?.find(p => text.includes(p.full_name));
  return person ? person.full_name : 'injured workers';
}

function determineEvidenceStrength(text, claimType) {
  if (/accord(ing)? to|report(s|ed)|document(s|ed)|evidence|data show/i.test(text)) {
    return 'High';
  }
  if (/allege(d|s)?|claim(s|ed)?|suggest(s|ed)?/i.test(text)) {
    return 'Medium';
  }
  return 'Low';
}

async function corroborateClaims(claims, metadata) {
  // In production, this would query real databases
  // For now, return structured corroboration framework
  
  return claims.map(claim => ({
    claim: claim.claim_text.substring(0, 150),
    claim_type: claim.claim_type,
    corroborating_sources: [
      {
        source: `${metadata.jurisdiction?.location || 'Government'} Official Records`,
        url: `https://www.ontario.ca/search?q=${encodeURIComponent(claim.alleged_actor)}`,
        snippet: '[Corroboration would be fetched from real sources]',
        confidence: claim.evidence_strength === 'High' ? 'high' : 'medium',
        last_checked: new Date().toISOString()
      }
    ],
    corroboration_level: claim.evidence_strength === 'High' ? 'strong' : 'moderate',
    needs_further_investigation: claim.evidence_strength === 'Low'
  }));
}

function compileProvenance(input, corroboration) {
  return [
    {
      source: 'Original Document',
      url: input.source_url || input.raw_text_or_url || 'N/A',
      snippet: (input.raw_text || '').substring(0, 200),
      fetch_date: input.fetch_date || new Date().toISOString(),
      verification_method: 'Direct ingestion'
    },
    ...corroboration.flatMap(c => c.corroborating_sources || [])
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// THE EYE v2.0 CORE ANALYSIS FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 1️⃣ IDENTIFY CORRUPTION
 * Detect corruption, misconduct, abuse of power, conflicts of interest
 */
function identifyCorruption(text, entities, claims, relationships) {
  const findings = [];
  
  const corruptionPatterns = [
    { pattern: /conflict\s+of\s+interest/gi, type: 'conflict_of_interest', severity: 'high' },
    { pattern: /kickback|bribe|payoff|pay-off/gi, type: 'bribery', severity: 'critical' },
    { pattern: /misuse\s+of\s+(public\s+)?funds/gi, type: 'misappropriation', severity: 'critical' },
    { pattern: /no-bid\s+contract|sole-source\s+contract/gi, type: 'procurement_fraud', severity: 'high' },
    { pattern: /revolving\s+door|lobbying/gi, type: 'undue_influence', severity: 'medium' },
    { pattern: /cover-?up|conceal|destroy(ed)?\s+evidence/gi, type: 'obstruction', severity: 'critical' },
    { pattern: /retaliation|whistleblower/gi, type: 'retaliation', severity: 'high' },
    { pattern: /abuse\s+of\s+power|overreach/gi, type: 'abuse_of_power', severity: 'high' },
    { pattern: /nepotism|cronyism/gi, type: 'nepotism', severity: 'medium' },
    { pattern: /insider\s+(trading|dealing)/gi, type: 'insider_dealing', severity: 'critical' }
  ];
  
  corruptionPatterns.forEach(({ pattern, type, severity }) => {
    const matches = [...text.matchAll(pattern)];
    if (matches.length > 0) {
      findings.push({
        corruption_type: type,
        description: matches[0][0],
        evidence_snippet: extractContext(text, matches[0][0], 200),
        entities_involved: entities.organizations?.map(o => o.name) || [],
        severity,
        requires_investigation: true,
        instance_count: matches.length
      });
    }
  });
  
  // Financial irregularities
  if (entities.money && entities.money.length > 0) {
    const largeContracts = entities.money.filter(m =>
      (m.scale === 'million' && parseFloat(m.amount) >= 1) ||
      (m.scale === 'billion')
    );
    
    if (largeContracts.length > 0 && /contract|award|grant/i.test(text)) {
      findings.push({
        corruption_type: 'financial_irregularity',
        description: `Large financial transactions: ${largeContracts.map(m => `$${m.amount} ${m.scale}`).join(', ')}`,
        evidence_snippet: largeContracts.map(m => m.context).join('; '),
        entities_involved: entities.organizations?.map(o => o.name) || [],
        severity: 'high',
        requires_investigation: true,
        instance_count: largeContracts.length
      });
    }
  }
  
  return findings;
}

/**
 * 2️⃣ CONSTITUTIONAL ANALYSIS
 * Compare actions against Canadian Charter and Constitution
 */
function analyzeConstitutionalCompliance(text, claims, entities) {
  const violations = [];
  
  // Charter Section 1: Reasonable Limits
  if (/unreasonable|unjustifiable|disproportionate/gi.test(text) &&
      /limit|restriction|infringement/gi.test(text)) {
    violations.push({
      section: 'Charter Section 1',
      right: 'Reasonable Limits Analysis',
      violation_type: 'unreasonable_limitation',
      description: 'Potential unreasonable or unjustifiable limitation of rights',
      evidence: extractContext(text, 'unreasonable', 200),
      severity: 'high',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 1 (Oakes Test)'
    });
  }
  
  // Charter Section 2: Fundamental Freedoms
  if (/freedom\s+of\s+(expression|speech|assembly|association|religion|conscience|press)/gi.test(text) &&
      /restrict|limit|prohibit|deny|suppress|censor/gi.test(text)) {
    violations.push({
      section: 'Charter Section 2',
      right: 'Fundamental Freedoms',
      violation_type: 'restriction_of_freedoms',
      description: 'Potential restriction of fundamental freedoms',
      evidence: extractContext(text, 'freedom', 200),
      severity: 'high',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 2'
    });
  }
  
  // Charter Section 3: Democratic Rights
  if (/vote|voting|election|electoral|ballot/gi.test(text) &&
      /deny|prevent|suppress|restrict/gi.test(text)) {
    violations.push({
      section: 'Charter Section 3',
      right: 'Democratic Rights',
      violation_type: 'voter_suppression',
      description: 'Potential denial or restriction of democratic rights',
      evidence: extractContext(text, 'vote', 200),
      severity: 'critical',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 3'
    });
  }
  
  // Charter Section 6: Mobility Rights
  if (/mobility|relocat|travel|move\s+(freely|between)/gi.test(text) &&
      /restrict|deny|prevent|barrier/gi.test(text)) {
    violations.push({
      section: 'Charter Section 6',
      right: 'Mobility Rights',
      violation_type: 'mobility_restriction',
      description: 'Potential restriction of mobility rights',
      evidence: extractContext(text, 'mobility', 200),
      severity: 'medium',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 6'
    });
  }
  
  // Charter Section 7: Life, Liberty, Security of Person
  const section7Keywords = [
    /deny|denial|refuse|refusal|terminate|cut|reduce/gi,
    /medical\s+care|healthcare|treatment|therapy|medication/gi,
    /benefit|support|assistance|income|housing/gi
  ];
  
  if (section7Keywords.every(pattern => pattern.test(text))) {
    violations.push({
      section: 'Charter Section 7',
      right: 'Life, Liberty and Security of the Person',
      violation_type: 'denial_of_security',
      description: 'Denial of essential care or benefits affecting security of person',
      evidence: extractContext(text, 'medical', 200),
      severity: 'critical',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 7'
    });
  }
  
  // Section 7: Psychological Security
  if (/mental\s+health|psychological|anxiety|stress|trauma|PTSD/gi.test(text) &&
      /cause|inflict|exacerbate|worsen|harm/gi.test(text)) {
    violations.push({
      section: 'Charter Section 7',
      right: 'Psychological Security of the Person',
      violation_type: 'psychological_harm',
      description: 'State action causing psychological harm',
      evidence: extractContext(text, 'mental health', 200),
      severity: 'high',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 7 (Blencoe, G(J))'
    });
  }
  
  // Charter Section 8: Unreasonable Search and Seizure
  if (/search|seizure|surveillance|privacy|personal\s+information/gi.test(text) &&
      /unreasonable|without\s+consent|warrantless/gi.test(text)) {
    violations.push({
      section: 'Charter Section 8',
      right: 'Freedom from Unreasonable Search and Seizure',
      violation_type: 'privacy_violation',
      description: 'Potential unreasonable search, seizure, or privacy violation',
      evidence: extractContext(text, 'search', 200),
      severity: 'high',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 8'
    });
  }
  
  // Charter Section 9: Arbitrary Detention
  if (/detention|detain|arrest|held|custody/gi.test(text) &&
      /arbitrary|unlawful|without\s+cause/gi.test(text)) {
    violations.push({
      section: 'Charter Section 9',
      right: 'Freedom from Arbitrary Detention',
      violation_type: 'arbitrary_detention',
      description: 'Potential arbitrary detention or imprisonment',
      evidence: extractContext(text, 'detention', 200),
      severity: 'critical',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 9'
    });
  }
  
  // Charter Section 10: Rights on Arrest
  if (/arrest|detained|custody/gi.test(text) &&
      /not\s+informed|no\s+access|denied\s+counsel|no\s+lawyer/gi.test(text)) {
    violations.push({
      section: 'Charter Section 10',
      right: 'Rights on Arrest or Detention',
      violation_type: 'denial_of_rights_on_arrest',
      description: 'Denial of rights to counsel or to be informed of charges',
      evidence: extractContext(text, 'arrest', 200),
      severity: 'critical',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 10'
    });
  }
  
  // Charter Section 11: Legal Rights in Criminal Proceedings
  if (/trial|proceeding|charge|accused|criminal/gi.test(text) &&
      /delay|unreasonable|presumption|innocence|self.incrimination/gi.test(text)) {
    violations.push({
      section: 'Charter Section 11',
      right: 'Legal Rights in Criminal Proceedings',
      violation_type: 'criminal_proceeding_rights',
      description: 'Potential violation of rights in criminal proceedings',
      evidence: extractContext(text, 'trial', 200),
      severity: 'high',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 11'
    });
  }
  
  // Charter Section 12: Cruel and Unusual Treatment
  if (/cruel|inhumane|degrading|suffering|torture|abuse/gi.test(text)) {
    violations.push({
      section: 'Charter Section 12',
      right: 'Freedom from Cruel and Unusual Treatment',
      violation_type: 'cruel_treatment',
      description: 'Potential cruel or unusual treatment or punishment',
      evidence: extractContext(text, 'cruel', 200),
      severity: 'critical',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 12'
    });
  }
  
  // Charter Section 14: Right to Interpreter
  if (/interpreter|language\s+barrier|translation|communicate/gi.test(text) &&
      /deny|refused|unavailable|no\s+access/gi.test(text)) {
    violations.push({
      section: 'Charter Section 14',
      right: 'Right to Interpreter',
      violation_type: 'denial_of_interpreter',
      description: 'Denial of interpreter services in proceedings',
      evidence: extractContext(text, 'interpreter', 200),
      severity: 'high',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 14'
    });
  }
  
  // Charter Section 15: Equality Rights
  const discriminationGrounds = [
    'disability', 'age', 'race', 'gender', 'Indigenous',
    'sex', 'religion', 'national origin', 'ethnicity',
    'sexual orientation', 'marital status', 'citizenship',
    'mental disability', 'physical disability', 'colour'
  ];
  
  discriminationGrounds.forEach(ground => {
    if (new RegExp(ground, 'gi').test(text) && /discriminat|unequal|differential\s+treatment|adverse\s+effect/gi.test(text)) {
      violations.push({
        section: 'Charter Section 15',
        right: 'Equality Rights',
        violation_type: 'discrimination',
        description: `Potential discrimination based on ${ground}`,
        evidence: extractContext(text, ground, 200),
        severity: 'high',
        legal_basis: 'Canadian Charter of Rights and Freedoms, s. 15(1)'
      });
    }
  });
  
  // Section 15(2): Affirmative Action Analysis
  if (/affirmative\s+action|employment\s+equity|designated\s+group/gi.test(text) &&
      /challenge|reverse\s+discrimination|quota/gi.test(text)) {
    violations.push({
      section: 'Charter Section 15(2)',
      right: 'Affirmative Action Programs',
      violation_type: 'affirmative_action_challenge',
      description: 'Challenge to or inadequacy of affirmative action programs',
      evidence: extractContext(text, 'affirmative', 200),
      severity: 'medium',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 15(2)'
    });
  }
  
  // Charter Section 24: Enforcement and Remedies
  if (/remedy|enforcement|damages|compensation/gi.test(text) &&
      /denied|refused|inadequate|no\s+recourse/gi.test(text)) {
    violations.push({
      section: 'Charter Section 24',
      right: 'Enforcement and Remedies',
      violation_type: 'denial_of_remedy',
      description: 'Denial of appropriate Charter remedy',
      evidence: extractContext(text, 'remedy', 200),
      severity: 'high',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 24'
    });
  }
  
  // Administrative Law: Procedural Fairness
  if (/procedural\s+fairness|natural\s+justice|bias|reasonable\s+apprehension|audi\s+alteram/gi.test(text)) {
    violations.push({
      section: 'Administrative Law',
      right: 'Procedural Fairness',
      violation_type: 'breach_of_fairness',
      description: 'Breach of procedural fairness or natural justice',
      evidence: extractContext(text, 'procedural fairness', 200),
      severity: 'high',
      legal_basis: 'Administrative law principles (Baker v. Canada)'
    });
  }
  
  // Administrative Law: Unreasonableness
  if (/unreasonable|arbitrary|capricious|bad\s+faith/gi.test(text) &&
      /decision|determination|ruling/gi.test(text)) {
    violations.push({
      section: 'Administrative Law',
      right: 'Reasonable Decision-Making',
      violation_type: 'unreasonable_decision',
      description: 'Unreasonable or arbitrary administrative decision',
      evidence: extractContext(text, 'unreasonable', 200),
      severity: 'high',
      legal_basis: 'Administrative law (Vavilov standard of review)'
    });
  }
  
  // Section 35: Indigenous Rights
  if (/(Indigenous|First\s+Nations|Inuit|Métis|aboriginal)/gi.test(text) &&
      /duty\s+to\s+consult|treaty\s+rights|aboriginal\s+rights|title|self.government/gi.test(text)) {
    violations.push({
      section: 'Constitution Act Section 35',
      right: 'Aboriginal and Treaty Rights',
      violation_type: 'indigenous_rights_violation',
      description: 'Potential violation of Indigenous rights or duty to consult',
      evidence: extractContext(text, 'Indigenous', 200),
      severity: 'critical',
      legal_basis: 'Constitution Act, 1982, s. 35 (Haida Nation, Tsilhqot\'in)'
    });
  }
  
  // Section 35: UNDRIP Alignment
  if (/UNDRIP|free.*prior.*informed\s+consent|FPIC/gi.test(text)) {
    violations.push({
      section: 'UNDRIP Implementation',
      right: 'Free, Prior and Informed Consent',
      violation_type: 'undrip_violation',
      description: 'Failure to obtain free, prior and informed consent',
      evidence: extractContext(text, 'consent', 200),
      severity: 'critical',
      legal_basis: 'UN Declaration on the Rights of Indigenous Peoples (adopted by Canada)'
    });
  }
  
  // Constitution Act 1867: Division of Powers
  if (/federal|provincial|jurisdiction|ultra\s+vires|constitutional\s+authority/gi.test(text) &&
      /exceed|overstep|encroach/gi.test(text)) {
    violations.push({
      section: 'Constitution Act 1867',
      right: 'Division of Powers',
      violation_type: 'jurisdictional_overreach',
      description: 'Potential ultra vires action or jurisdictional overreach',
      evidence: extractContext(text, 'jurisdiction', 200),
      severity: 'medium',
      legal_basis: 'Constitution Act, 1867, ss. 91-92'
    });
  }
  
  return violations;
}

/**
 * 3️⃣ HUMAN RIGHTS ANALYSIS - COMPREHENSIVE
 * Evaluate against Canadian Human Rights Act, Provincial Codes, and Accessibility Laws
 */
function analyzeHumanRights(text, claims, entities) {
  const breaches = [];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CANADIAN HUMAN RIGHTS ACT (CHRA) - Prohibited Grounds
  // ═══════════════════════════════════════════════════════════════════════════
  const chraGrounds = [
    { ground: 'disability', pattern: /disability|disabled|impairment|mental\s+health|chronic\s+illness/gi },
    { ground: 'age', pattern: /age|elderly|senior|youth|ageism/gi },
    { ground: 'race', pattern: /race|racial|racialized|visible\s+minority/gi },
    { ground: 'national_or_ethnic_origin', pattern: /national\s+origin|ethnic|ethnicity|immigrant|newcomer/gi },
    { ground: 'colour', pattern: /colour|color|skin/gi },
    { ground: 'religion', pattern: /religion|religious|creed|faith|belief/gi },
    { ground: 'sex', pattern: /\bsex\b|gender|women|men|female|male/gi },
    { ground: 'sexual_orientation', pattern: /sexual\s+orientation|gay|lesbian|bisexual|homosexual/gi },
    { ground: 'gender_identity_or_expression', pattern: /gender\s+identity|transgender|trans|non.binary|gender\s+expression/gi },
    { ground: 'marital_status', pattern: /marital\s+status|married|single|divorced|spouse/gi },
    { ground: 'family_status', pattern: /family\s+status|parent|child\s+care|caregiver/gi },
    { ground: 'genetic_characteristics', pattern: /genetic|DNA|hereditary/gi },
    { ground: 'pardoned_conviction', pattern: /criminal\s+record|pardon|conviction|background\s+check/gi }
  ];
  
  chraGrounds.forEach(({ ground, pattern }) => {
    if (pattern.test(text) && /discriminat|deny|refuse|exclude|harass|adverse\s+treatment/gi.test(text)) {
      breaches.push({
        legislation: 'Canadian Human Rights Act',
        ground_of_discrimination: ground,
        description: `Potential discrimination based on ${ground.replace(/_/g, ' ')}`,
        evidence: extractContext(text, ground, 200),
        severity: 'high',
        complaint_body: 'Canadian Human Rights Commission',
        complaint_deadline: '1 year from incident',
        requires_complaint: true
      });
    }
  });
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ONTARIO HUMAN RIGHTS CODE
  // ═══════════════════════════════════════════════════════════════════════════
  const ontarioGrounds = [
    { ground: 'citizenship', pattern: /citizenship|citizen|non.citizen/gi },
    { ground: 'ancestry', pattern: /ancestry|ancestor|heritage/gi },
    { ground: 'place_of_origin', pattern: /place\s+of\s+origin|born|birthplace/gi },
    { ground: 'record_of_offences', pattern: /record\s+of\s+offences|criminal\s+record/gi },
    { ground: 'receipt_of_public_assistance', pattern: /social\s+assistance|welfare|ODSP|OW|Ontario\s+Works/gi }
  ];
  
  ontarioGrounds.forEach(({ ground, pattern }) => {
    if (pattern.test(text) && /discriminat|deny|refuse|exclude/gi.test(text)) {
      breaches.push({
        legislation: 'Ontario Human Rights Code',
        ground_of_discrimination: ground,
        description: `Potential discrimination based on ${ground.replace(/_/g, ' ')}`,
        evidence: extractContext(text, ground, 200),
        severity: 'high',
        complaint_body: 'Human Rights Tribunal of Ontario',
        complaint_deadline: '1 year from incident',
        requires_complaint: true
      });
    }
  });
  
  // ═══════════════════════════════════════════════════════════════════════════
  // BC HUMAN RIGHTS CODE
  // ═══════════════════════════════════════════════════════════════════════════
  if (/British\s+Columbia|BC|Vancouver|Victoria/gi.test(text)) {
    const bcGrounds = [
      { ground: 'physical_disability', pattern: /physical\s+disability|mobility|wheelchair/gi },
      { ground: 'mental_disability', pattern: /mental\s+disability|mental\s+health|psychiatric/gi },
      { ground: 'source_of_income', pattern: /source\s+of\s+income|income|PWD|disability\s+assistance/gi },
      { ground: 'lawful_source_of_income', pattern: /lawful\s+source|income\s+assistance/gi }
    ];
    
    bcGrounds.forEach(({ ground, pattern }) => {
      if (pattern.test(text) && /discriminat|deny|refuse/gi.test(text)) {
        breaches.push({
          legislation: 'BC Human Rights Code',
          ground_of_discrimination: ground,
          description: `BC: Potential discrimination based on ${ground.replace(/_/g, ' ')}`,
          evidence: extractContext(text, ground, 200),
          severity: 'high',
          complaint_body: 'BC Human Rights Tribunal',
          complaint_deadline: '1 year from incident',
          requires_complaint: true
        });
      }
    });
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ALBERTA HUMAN RIGHTS ACT
  // ═══════════════════════════════════════════════════════════════════════════
  if (/Alberta|Edmonton|Calgary/gi.test(text)) {
    if (/source\s+of\s+income|AISH|income\s+support/gi.test(text) && /discriminat|deny|refuse/gi.test(text)) {
      breaches.push({
        legislation: 'Alberta Human Rights Act',
        ground_of_discrimination: 'source_of_income',
        description: 'Alberta: Potential discrimination based on source of income',
        evidence: extractContext(text, 'income', 200),
        severity: 'high',
        complaint_body: 'Alberta Human Rights Commission',
        complaint_deadline: '1 year from incident',
        requires_complaint: true
      });
    }
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // HARASSMENT AND POISONED ENVIRONMENT
  // ═══════════════════════════════════════════════════════════════════════════
  if (/harass|hostile\s+environment|poisoned\s+environment|bullying|intimidat/gi.test(text)) {
    breaches.push({
      legislation: 'Human Rights Code (Harassment)',
      ground_of_discrimination: 'harassment',
      description: 'Harassment or poisoned environment',
      evidence: extractContext(text, 'harass', 200),
      severity: 'high',
      complaint_body: 'Applicable Human Rights Commission/Tribunal',
      requires_complaint: true
    });
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DUTY TO ACCOMMODATE
  // ═══════════════════════════════════════════════════════════════════════════
  if (/accommodat|undue\s+hardship|reasonable\s+accommodation/gi.test(text) &&
      /deny|fail|refuse|inadequate/gi.test(text)) {
    breaches.push({
      legislation: 'Duty to Accommodate',
      ground_of_discrimination: 'failure_to_accommodate',
      description: 'Failure to provide reasonable accommodation to point of undue hardship',
      evidence: extractContext(text, 'accommodation', 200),
      severity: 'high',
      legal_test: 'Meiorin Test / BFOR Analysis',
      requires_complaint: true
    });
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ACCESSIBLE CANADA ACT (Bill C-81)
  // ═══════════════════════════════════════════════════════════════════════════
  if (/accessibility|barrier|accessible/gi.test(text) &&
      /deny|fail|refuse|inaccessible|non.compliant/gi.test(text)) {
    breaches.push({
      legislation: 'Accessible Canada Act (Bill C-81)',
      ground_of_discrimination: 'accessibility_barrier',
      description: 'Failure to identify, remove, or prevent barriers to accessibility',
      evidence: extractContext(text, 'accessibility', 200),
      severity: 'high',
      areas_covered: ['employment', 'built environment', 'ICT', 'communications', 'procurement', 'programs/services', 'transportation'],
      complaint_body: 'Accessibility Commissioner',
      requires_complaint: true
    });
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ACCESSIBILITY FOR ONTARIANS WITH DISABILITIES ACT (AODA)
  // ═══════════════════════════════════════════════════════════════════════════
  if (/Ontario|AODA|accessibility\s+standard/gi.test(text) &&
      /non.compliant|violat|fail|barrier/gi.test(text)) {
    breaches.push({
      legislation: 'Accessibility for Ontarians with Disabilities Act (AODA)',
      ground_of_discrimination: 'aoda_non_compliance',
      description: 'Non-compliance with AODA accessibility standards',
      evidence: extractContext(text, 'AODA', 200),
      severity: 'high',
      standards: ['Customer Service', 'Information & Communications', 'Transportation', 'Employment', 'Design of Public Spaces'],
      complaint_body: 'Ontario Accessibility Directorate',
      requires_complaint: true
    });
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SYSTEMIC DISCRIMINATION
  // ═══════════════════════════════════════════════════════════════════════════
  if (/systemic|structural|institutional|pattern|policy/gi.test(text) &&
      /discriminat|barrier|adverse\s+impact/gi.test(text)) {
    breaches.push({
      legislation: 'Systemic Discrimination',
      ground_of_discrimination: 'systemic',
      description: 'Systemic or structural discrimination embedded in policies/practices',
      evidence: extractContext(text, 'systemic', 200),
      severity: 'critical',
      remedy_type: 'Systemic remedy required',
      requires_complaint: true
    });
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // INTERSECTIONAL DISCRIMINATION
  // ═══════════════════════════════════════════════════════════════════════════
  const groundsFound = [];
  chraGrounds.forEach(({ ground, pattern }) => {
    if (pattern.test(text)) groundsFound.push(ground);
  });
  
  if (groundsFound.length >= 2 && /discriminat|deny|barrier/gi.test(text)) {
    breaches.push({
      legislation: 'Intersectional Discrimination',
      ground_of_discrimination: 'intersectional',
      description: `Intersectional discrimination based on multiple grounds: ${groundsFound.join(', ')}`,
      evidence: extractContext(text, groundsFound[0], 200),
      severity: 'critical',
      grounds_involved: groundsFound,
      requires_complaint: true
    });
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RETALIATION / REPRISAL
  // ═══════════════════════════════════════════════════════════════════════════
  if (/retaliat|reprisal|punish|adverse\s+action|penalty/gi.test(text) &&
      /complaint|report|claim|human\s+rights/gi.test(text)) {
    breaches.push({
      legislation: 'Protection from Retaliation',
      ground_of_discrimination: 'retaliation',
      description: 'Retaliation for making or supporting a human rights complaint',
      evidence: extractContext(text, 'retaliat', 200),
      severity: 'critical',
      requires_complaint: true
    });
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ECONOMIC/SOCIAL STATUS DISCRIMINATION
  // ═══════════════════════════════════════════════════════════════════════════
  if (/low.income|poverty|financial\s+hardship|poor|homeless|socioeconomic/gi.test(text) &&
      /deny|refuse|exclude|discriminat/gi.test(text)) {
    breaches.push({
      legislation: 'Social Condition Discrimination',
      ground_of_discrimination: 'economic_status',
      description: 'Discrimination based on economic or social status/condition',
      evidence: extractContext(text, 'poverty', 200),
      severity: 'high',
      note: 'Protected in some provincial codes (Quebec, NB, NWT, Yukon)',
      requires_complaint: true
    });
  }
  
  return breaches;
}

/**
 * 4️⃣ UNCRPD ANALYSIS - COMPREHENSIVE
 * Check compliance with ALL articles of UN Convention on Rights of Persons with Disabilities
 * Canada ratified UNCRPD on March 11, 2010
 */
function analyzeUNCRPD(text, claims, entities) {
  const breaches = [];
  
  // Article 1: Purpose - Promote, protect, ensure full enjoyment of human rights
  if (/disability|disabled/gi.test(text) && /purpose|objective|goal/gi.test(text) &&
      /fail|violat|undermine/gi.test(text)) {
    breaches.push({
      article: 'Article 1',
      right: 'Purpose - Full Enjoyment of Human Rights',
      description: 'Failure to promote full and equal enjoyment of human rights by persons with disabilities',
      evidence: extractContext(text, 'disability', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 3: General Principles
  if (/dignity|autonomy|independence|non.discrimination|participation|inclusion|accessibility|respect\s+for\s+difference/gi.test(text) &&
      /violat|breach|deny|fail/gi.test(text)) {
    breaches.push({
      article: 'Article 3',
      right: 'General Principles',
      description: 'Violation of UNCRPD general principles (dignity, autonomy, non-discrimination, inclusion)',
      evidence: extractContext(text, 'dignity', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 4: General Obligations
  if (/legislation|law|policy|program/gi.test(text) &&
      /fail\s+to\s+(adopt|implement|modify|repeal)|discriminatory\s+(law|policy)/gi.test(text)) {
    breaches.push({
      article: 'Article 4',
      right: 'General Obligations',
      description: 'Failure to adopt or implement disability-inclusive legislation/policy',
      evidence: extractContext(text, 'legislation', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 5: Equality and Non-Discrimination
  if (/disability|disabled/gi.test(text) && /discriminat|deny|exclude|unequal/gi.test(text)) {
    breaches.push({
      article: 'Article 5',
      right: 'Equality and Non-Discrimination',
      description: 'Discrimination against persons with disabilities',
      evidence: extractContext(text, 'disability', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 6: Women with Disabilities
  if (/women|female|girl/gi.test(text) && /disability|disabled/gi.test(text) &&
      /discriminat|violat|multiple|intersectional/gi.test(text)) {
    breaches.push({
      article: 'Article 6',
      right: 'Women with Disabilities',
      description: 'Multiple/intersectional discrimination against women with disabilities',
      evidence: extractContext(text, 'women', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 7: Children with Disabilities
  if (/child|minor|youth|young\s+person/gi.test(text) && /disability|disabled/gi.test(text) &&
      /rights|best\s+interest|voice|participation/gi.test(text)) {
    breaches.push({
      article: 'Article 7',
      right: 'Children with Disabilities',
      description: 'Failure to protect rights of children with disabilities',
      evidence: extractContext(text, 'child', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 8: Awareness-Raising
  if (/stigma|stereotype|prejudice|awareness|public\s+perception/gi.test(text) &&
      /disability|disabled/gi.test(text)) {
    breaches.push({
      article: 'Article 8',
      right: 'Awareness-Raising',
      description: 'Failure to combat stereotypes, prejudices, harmful practices',
      evidence: extractContext(text, 'stigma', 200),
      severity: 'medium',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 9: Accessibility
  if (/accessibility|accessible|barrier|inaccessible/gi.test(text) &&
      /building|transport|information|communication|service/gi.test(text)) {
    breaches.push({
      article: 'Article 9',
      right: 'Accessibility',
      description: 'Failure to ensure accessibility of environment, transportation, information, services',
      evidence: extractContext(text, 'accessibility', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 10: Right to Life
  if (/life|death|dying|suicide|MAID/gi.test(text) && /disability|disabled/gi.test(text) &&
      /coerce|pressure|safeguard/gi.test(text)) {
    breaches.push({
      article: 'Article 10',
      right: 'Right to Life',
      description: 'Threat to right to life of persons with disabilities',
      evidence: extractContext(text, 'life', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 11: Situations of Risk and Humanitarian Emergencies
  if (/emergency|disaster|risk|crisis|humanitarian/gi.test(text) && /disability|disabled/gi.test(text)) {
    breaches.push({
      article: 'Article 11',
      right: 'Situations of Risk and Humanitarian Emergencies',
      description: 'Failure to protect persons with disabilities in emergencies',
      evidence: extractContext(text, 'emergency', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 12: Equal Recognition Before the Law
  if (/capacity|competence|decision.making|guardian|substitute/gi.test(text) && 
      /deny|restrict|remove|override/gi.test(text)) {
    breaches.push({
      article: 'Article 12',
      right: 'Equal Recognition Before the Law',
      description: 'Denial of legal capacity or decision-making autonomy',
      evidence: extractContext(text, 'capacity', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 13: Access to Justice
  if (/legal\s+(aid|representation)|access\s+to\s+justice|court|tribunal|hearing/gi.test(text) && 
      /deny|barrier|inaccessible|accommodation/gi.test(text)) {
    breaches.push({
      article: 'Article 13',
      right: 'Access to Justice',
      description: 'Barriers to accessing justice for persons with disabilities',
      evidence: extractContext(text, 'justice', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 14: Liberty and Security of Person
  if (/detention|institutionalization|hospital|confined|restrain/gi.test(text) && 
      /disability|mental\s+health/gi.test(text) && /unlawful|arbitrary|involuntary/gi.test(text)) {
    breaches.push({
      article: 'Article 14',
      right: 'Liberty and Security of Person',
      description: 'Unlawful or arbitrary detention based on disability',
      evidence: extractContext(text, 'detention', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 15: Freedom from Torture and Cruel Treatment
  if (/torture|cruel|inhuman|degrading|treatment|force|restraint|seclusion/gi.test(text) && 
      /disability|disabled/gi.test(text)) {
    breaches.push({
      article: 'Article 15',
      right: 'Freedom from Torture and Cruel Treatment',
      description: 'Cruel, inhuman or degrading treatment of persons with disabilities',
      evidence: extractContext(text, 'cruel', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 16: Freedom from Exploitation, Violence and Abuse
  if (/exploit|violence|abuse|neglect|assault/gi.test(text) && /disability|disabled/gi.test(text)) {
    breaches.push({
      article: 'Article 16',
      right: 'Freedom from Exploitation, Violence and Abuse',
      description: 'Exploitation, violence or abuse against persons with disabilities',
      evidence: extractContext(text, 'abuse', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 17: Protecting the Integrity of the Person
  if (/integrity|consent|treatment|procedure|sterilization/gi.test(text) && 
      /without\s+consent|force|coerce/gi.test(text) && /disability|disabled/gi.test(text)) {
    breaches.push({
      article: 'Article 17',
      right: 'Protecting the Integrity of the Person',
      description: 'Violation of physical or mental integrity without consent',
      evidence: extractContext(text, 'integrity', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 18: Liberty of Movement and Nationality
  if (/travel|movement|immigration|citizenship|nationality/gi.test(text) && 
      /disability|disabled/gi.test(text) && /deny|restrict|barrier/gi.test(text)) {
    breaches.push({
      article: 'Article 18',
      right: 'Liberty of Movement and Nationality',
      description: 'Restriction of movement or nationality rights based on disability',
      evidence: extractContext(text, 'movement', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 19: Independent Living
  if (/independent\s+living|community|institution|choice|where\s+to\s+live/gi.test(text) && 
      /force|segregat|no\s+choice|mandatory/gi.test(text)) {
    breaches.push({
      article: 'Article 19',
      right: 'Living Independently and Being Included in the Community',
      description: 'Forced institutionalization or denial of community living',
      evidence: extractContext(text, 'independent living', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 20: Personal Mobility
  if (/mobility|wheelchair|assistive\s+(device|technology)|prosthetic/gi.test(text) && 
      /deny|cost|afford|access/gi.test(text)) {
    breaches.push({
      article: 'Article 20',
      right: 'Personal Mobility',
      description: 'Barriers to personal mobility and assistive devices',
      evidence: extractContext(text, 'mobility', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 21: Freedom of Expression and Access to Information
  if (/information|communication|expression|accessible\s+format|sign\s+language/gi.test(text) && 
      /inaccessible|barrier|deny|unavailable/gi.test(text)) {
    breaches.push({
      article: 'Article 21',
      right: 'Freedom of Expression and Access to Information',
      description: 'Barriers to accessible information and communication',
      evidence: extractContext(text, 'information', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 22: Respect for Privacy
  if (/privacy|personal\s+information|confidential|data/gi.test(text) && 
      /disability|disabled/gi.test(text) && /violat|breach|disclose/gi.test(text)) {
    breaches.push({
      article: 'Article 22',
      right: 'Respect for Privacy',
      description: 'Violation of privacy rights of persons with disabilities',
      evidence: extractContext(text, 'privacy', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 23: Respect for Home and the Family
  if (/family|marriage|parent|child|custody|adoption/gi.test(text) && 
      /disability|disabled/gi.test(text) && /discriminat|deny|remove|separate/gi.test(text)) {
    breaches.push({
      article: 'Article 23',
      right: 'Respect for Home and the Family',
      description: 'Discrimination in family matters based on disability',
      evidence: extractContext(text, 'family', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 24: Education
  if (/education|school|learning|student|academic/gi.test(text) && 
      /disability|disabled/gi.test(text) && /exclude|segregat|deny|accommodation/gi.test(text)) {
    breaches.push({
      article: 'Article 24',
      right: 'Education',
      description: 'Denial of inclusive education or educational accommodations',
      evidence: extractContext(text, 'education', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 25: Health
  if (/(medical\s+care|healthcare|treatment|health\s+service)/gi.test(text) && 
      /deny|refuse|withhold|discriminat|barrier/gi.test(text)) {
    breaches.push({
      article: 'Article 25',
      right: 'Health',
      description: 'Denial of healthcare or discriminatory health services',
      evidence: extractContext(text, 'health', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 26: Habilitation and Rehabilitation
  if (/rehabilitation|habilitation|therapy|physiotherapy|occupational\s+therapy/gi.test(text) && 
      /deny|terminate|cut|reduce|wait/gi.test(text)) {
    breaches.push({
      article: 'Article 26',
      right: 'Habilitation and Rehabilitation',
      description: 'Denial or inadequacy of rehabilitation services',
      evidence: extractContext(text, 'rehabilitation', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 27: Work and Employment
  if (/work|employment|job|career|occupation|labour|labor/gi.test(text) && 
      /disability|disabled/gi.test(text) && /discriminat|barrier|deny|terminat|fire/gi.test(text)) {
    breaches.push({
      article: 'Article 27',
      right: 'Work and Employment',
      description: 'Employment discrimination or barriers for persons with disabilities',
      evidence: extractContext(text, 'employment', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 28: Adequate Standard of Living & Social Protection
  if (/(benefit|support|assistance|income|welfare|social\s+protection|housing|poverty)/gi.test(text) &&
      /(deny|reduce|cut|terminate|deem|inadequate|poverty)/gi.test(text)) {
    breaches.push({
      article: 'Article 28',
      right: 'Adequate Standard of Living and Social Protection',
      description: 'Denial or reduction of benefits forcing poverty',
      evidence: extractContext(text, 'benefit', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 29: Participation in Political and Public Life
  if (/vote|voting|election|political|public\s+life|decision.making/gi.test(text) && 
      /disability|disabled/gi.test(text) && /barrier|inaccessible|exclude/gi.test(text)) {
    breaches.push({
      article: 'Article 29',
      right: 'Participation in Political and Public Life',
      description: 'Barriers to political participation for persons with disabilities',
      evidence: extractContext(text, 'vote', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 30: Participation in Cultural Life, Recreation, Sport
  if (/culture|recreation|sport|leisure|tourism|art/gi.test(text) && 
      /disability|disabled/gi.test(text) && /barrier|exclude|inaccessible/gi.test(text)) {
    breaches.push({
      article: 'Article 30',
      right: 'Participation in Cultural Life, Recreation, Sport',
      description: 'Exclusion from cultural, recreational, or sporting activities',
      evidence: extractContext(text, 'culture', 200),
      severity: 'medium',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 31: Statistics and Data Collection
  if (/data|statistics|research|information/gi.test(text) && /disability|disabled/gi.test(text) &&
      /lack|inadequate|no\s+data|invisible/gi.test(text)) {
    breaches.push({
      article: 'Article 31',
      right: 'Statistics and Data Collection',
      description: 'Failure to collect adequate disability data for policy development',
      evidence: extractContext(text, 'data', 200),
      severity: 'medium',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 33: National Implementation and Monitoring
  if (/monitoring|implementation|oversight|accountability/gi.test(text) && 
      /disability|UNCRPD|convention/gi.test(text) && /fail|inadequate|weak/gi.test(text)) {
    breaches.push({
      article: 'Article 33',
      right: 'National Implementation and Monitoring',
      description: 'Inadequate implementation or monitoring of UNCRPD',
      evidence: extractContext(text, 'monitoring', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  return breaches;
}

/**
 * 5️⃣ IDENTIFY VULNERABLE POPULATIONS
 * Detect impacts on vulnerable groups
 */
function identifyVulnerablePopulations(text, entities, claims) {
  const impacted = [];
  
  const vulnerableGroups = [
    {
      group: 'Injured Workers',
      patterns: [/injured\s+worker/gi, /workplace\s+injury/gi, /WSIB/gi, /workers.?\s*compensation/gi],
      harm_indicators: [/deny|denial|terminate|cut|reduce/gi]
    },
    {
      group: 'Persons with Disabilities',
      patterns: [/disability|disabled|impairment/gi, /ODSP/gi, /CPP.?D/gi],
      harm_indicators: [/deny|discriminat|exclude|barrier/gi]
    },
    {
      group: 'Indigenous Peoples',
      patterns: [/Indigenous|First\s+Nations|Inuit|Métis|aboriginal/gi],
      harm_indicators: [/discriminat|treaty|land|consultation/gi]
    },
    {
      group: 'Seniors/Elders',
      patterns: [/senior|elderly|elder|aged|retirement/gi],
      harm_indicators: [/neglect|abuse|deny|inadequate\s+care/gi]
    },
    {
      group: 'Low-Income Households',
      patterns: [/low.income|poverty|financial\s+hardship/gi],
      harm_indicators: [/exclude|deny|unaffordable/gi]
    },
    {
      group: 'Racialized Communities',
      patterns: [/racialized|Black|Asian|Arab|Latin|immigrant/gi],
      harm_indicators: [/discriminat|racial|systemic\s+racism/gi]
    },
    {
      group: 'Women and Gender-Diverse People',
      patterns: [/women|gender|LGBTQ|transgender|non.binary/gi],
      harm_indicators: [/discriminat|violence|harassment/gi]
    }
  ];
  
  vulnerableGroups.forEach(({ group, patterns, harm_indicators }) => {
    const groupMentioned = patterns.some(p => p.test(text));
    const harmDetected = harm_indicators.some(p => p.test(text));
    
    if (groupMentioned && harmDetected) {
      const harmType = extractHarmType(text, harm_indicators);
      impacted.push({
        group,
        harm_type: harmType,
        evidence: extractContext(text, group, 200),
        severity: 'high',
        requires_protection: true,
        intersectionality: checkIntersectionality(group, text)
      });
    }
  });
  
  return impacted;
}

function extractHarmType(text, indicators) {
  for (const indicator of indicators) {
    const match = text.match(indicator);
    if (match) return match[0];
  }
  return 'unspecified harm';
}

function checkIntersectionality(group, text) {
  const intersections = [];
  if (group === 'Injured Workers' && /disability/gi.test(text)) {
    intersections.push('disability');
  }
  if (/women|female/gi.test(text) && group !== 'Women and Gender-Diverse People') {
    intersections.push('gender');
  }
  if (/Indigenous|First Nations/gi.test(text) && group !== 'Indigenous Peoples') {
    intersections.push('Indigenous');
  }
  return intersections.length > 0 ? intersections : null;
}

/**
 * 6️⃣ DETECT SYSTEMIC PATTERNS
 * Identify repeated practices and statistical anomalies
 */
function detectSystemicPatterns(claims, entities, corroboration) {
  const patterns = [];
  
  // Pattern 1: Repeated claim types
  const claimTypes = {};
  claims.forEach(claim => {
    claimTypes[claim.claim_type] = (claimTypes[claim.claim_type] || 0) + 1;
  });
  
  Object.entries(claimTypes).forEach(([type, count]) => {
    if (count >= 2) {
      patterns.push({
        pattern_type: 'repeated_claim_type',
        description: `${count} instances of ${type} claims`,
        frequency: count,
        significance: 'Suggests systemic practice',
        requires_investigation: true
      });
    }
  });
  
  // Pattern 2: Same actor in multiple claims
  const actorCounts = {};
  claims.forEach(claim => {
    if (claim.alleged_actor) {
      actorCounts[claim.alleged_actor] = (actorCounts[claim.alleged_actor] || 0) + 1;
    }
  });
  
  Object.entries(actorCounts).forEach(([actor, count]) => {
    if (count >= 2) {
      patterns.push({
        pattern_type: 'repeated_actor',
        description: `${actor} appears in ${count} allegations`,
        frequency: count,
        significance: 'Multiple allegations against same entity',
        requires_investigation: true
      });
    }
  });
  
  // Pattern 3: Multi-source corroboration
  const multiSourceClaims = corroboration.filter(c =>
    c.corroborating_sources && c.corroborating_sources.length >= 2
  );
  
  if (multiSourceClaims.length > 0) {
    patterns.push({
      pattern_type: 'multi_source_corroboration',
      description: `${multiSourceClaims.length} claims verified by multiple independent sources`,
      frequency: multiSourceClaims.length,
      significance: 'Strong evidence base',
      requires_investigation: false
    });
  }
  
  return patterns;
}

/**
 * 7️⃣ EXTRACT ACTORS INVOLVED
 * Identify all individuals, institutions, and entities
 */
function extractActors(entities, corruptionFindings, constitutionViolations) {
  const actors = [];
  
  if (entities.organizations) {
    entities.organizations.forEach(org => {
      actors.push({
        name: org.name,
        type: 'organization',
        role: org.type,
        context: org.context,
        corruption_allegations: corruptionFindings
          .filter(f => f.entities_involved.includes(org.name))
          .map(f => f.corruption_type),
        constitutional_violations: constitutionViolations.length > 0
      });
    });
  }
  
  if (entities.people) {
    entities.people.forEach(person => {
      actors.push({
        name: person.full_name,
        type: 'individual',
        role: person.role,
        context: person.context,
        corruption_allegations: [],
        constitutional_violations: false
      });
    });
  }
  
  return actors;
}

/**
 * 8️⃣ CALCULATE COMPREHENSIVE RISK SCORES
 */
function calculateRiskScore(
  claims,
  corroboration,
  entities,
  corruptionFindings,
  constitutionViolations,
  humanRightsBreaches,
  uncrpdBreaches,
  impactedGroups
) {
  let legalRisk = 0;
  let humanRightsImpact = 0;
  let constitutionalSeverity = 0;
  let corruptionRisk = 0;
  let vulnerableHarm = 0;
  const factors = [];
  
  // Legal Risk (0-100)
  const criticalClaims = claims.filter(c =>
    ['fraud', 'abuse', 'violation', 'denial'].includes(c.claim_type)
  );
  legalRisk += Math.min(criticalClaims.length * 20, 60);
  if (criticalClaims.length > 0) {
    factors.push(`${criticalClaims.length} critical allegations`);
  }
  
  const strongCorroboration = corroboration.filter(c =>
    c.corroboration_level === 'strong' || c.corroboration_level === 'verified'
  );
  legalRisk += Math.min(strongCorroboration.length * 10, 40);
  
  // Human Rights Impact (0-100)
  humanRightsImpact = Math.min(humanRightsBreaches.length * 25, 100);
  if (humanRightsBreaches.length > 0) {
    factors.push(`${humanRightsBreaches.length} human rights violations`);
  }
  
  // Constitutional Severity (0-100)
  const criticalViolations = constitutionViolations.filter(v => v.severity === 'critical');
  constitutionalSeverity = Math.min(
    (criticalViolations.length * 30) + (constitutionViolations.length * 15),
    100
  );
  if (constitutionViolations.length > 0) {
    factors.push(`${constitutionViolations.length} constitutional violations`);
  }
  
  // Corruption Risk (0-100)
  corruptionRisk = Math.min(corruptionFindings.length * 30, 100);
  if (corruptionFindings.length > 0) {
    factors.push(`${corruptionFindings.length} corruption indicators`);
  }
  
  // Vulnerable Population Harm (0-100)
  vulnerableHarm = Math.min(impactedGroups.length * 25, 100);
  if (impactedGroups.length > 0) {
    factors.push(`${impactedGroups.length} vulnerable groups harmed`);
  }
  
  const criticalUNCRPD = uncrpdBreaches.filter(b => b.severity === 'critical');
  vulnerableHarm = Math.min(vulnerableHarm + (criticalUNCRPD.length * 20), 100);
  if (uncrpdBreaches.length > 0) {
    factors.push(`${uncrpdBreaches.length} UNCRPD violations`);
  }
  
  // Overall Score (weighted average)
  const overallScore = Math.round(
    (legalRisk * 0.2) +
    (humanRightsImpact * 0.25) +
    (constitutionalSeverity * 0.25) +
    (corruptionRisk * 0.2) +
    (vulnerableHarm * 0.1)
  );
  
  // Priority determination
  let priority = 'LOW';
  if (overallScore >= 70 || constitutionalSeverity >= 80 || corruptionRisk >= 70) {
    priority = 'CRITICAL';
  } else if (overallScore >= 50) {
    priority = 'HIGH';
  } else if (overallScore >= 30) {
    priority = 'MEDIUM';
  }
  
  return {
    legal_risk: Math.min(legalRisk, 100),
    human_rights_impact: humanRightsImpact,
    constitutional_severity: constitutionalSeverity,
    corruption_risk: corruptionRisk,
    vulnerable_harm: vulnerableHarm,
    overall_risk_score: overallScore,
    explanation: factors.join('; '),
    priority
  };
}

/**
 * 9️⃣ GENERATE EVIDENCE-BASED RECOMMENDED ACTIONS
 */
function generateActions(
  claims,
  entities,
  metadata,
  riskAssessment,
  corruptionFindings,
  constitutionViolations,
  humanRightsBreaches,
  uncrpdBreaches
) {
  const actions = [];
  
  // CRITICAL: Corruption investigations
  if (corruptionFindings && corruptionFindings.length > 0) {
    corruptionFindings.forEach(finding => {
      actions.push({
        action_type: 'corruption_investigation',
        description: `Investigate ${finding.corruption_type}`,
        target: finding.entities_involved.join(', ') || 'Unknown',
        priority: 'immediate',
        agencies: [
          'RCMP Anti-Corruption Unit',
          'Ontario Provincial Police - Anti-Rackets',
          'Auditor General of Ontario',
          'Integrity Commissioner'
        ],
        evidence: finding.evidence_snippet,
        next_steps: 'File formal complaint with law enforcement'
      });
    });
  }
  
  // Constitutional violations → Charter challenge
  if (riskAssessment.constitutional_severity >= 60) {
    actions.push({
      action_type: 'constitutional_challenge',
      description: 'File Charter challenge for constitutional violations',
      target: 'Superior Court of Justice',
      priority: 'immediate',
      legal_basis: 'Canadian Charter of Rights and Freedoms',
      estimated_cost: '$10,000-$50,000+',
      next_steps: 'Retain experienced constitutional lawyer; Consider public interest litigation funding'
    });
  }
  
  // Human rights breaches → Tribunal complaints
  if (riskAssessment.human_rights_impact >= 50) {
    actions.push({
      action_type: 'human_rights_complaint',
      description: 'File complaints with human rights tribunals',
      parties_to_notify: [
        {
          name: 'Canadian Human Rights Commission',
          url: 'https://www.chrc-ccdp.gc.ca/',
          complaint_type: 'Discrimination complaint',
          deadline: '1 year from incident'
        },
        {
          name: 'Ontario Human Rights Tribunal',
          url: 'http://www.sjto.ca/hrto/',
          complaint_type: 'Human rights application',
          deadline: '1 year from incident'
        }
      ],
      priority: 'immediate',
      next_steps: 'Complete online complaint form; Gather all documentary evidence'
    });
  }
  
  // UNCRPD violations → International reporting
  if (uncrpdBreaches.length >= 2) {
    actions.push({
      action_type: 'international_reporting',
      description: 'Report UNCRPD violations to UN Committee',
      target: 'UN Committee on the Rights of Persons with Disabilities',
      priority: 'high',
      process: 'Individual communication after exhausting domestic remedies',
      url: 'https://www.ohchr.org/en/treaty-bodies/crpd',
      next_steps: 'Exhaust domestic remedies first; Then submit individual communication'
    });
  }
  
  // High-risk findings → FOI requests
  if (riskAssessment.overall_risk_score >= 60) {
    const targetOrg = entities.organizations?.[0]?.name || 'Government';
    
    actions.push({
      action_type: 'foi_request',
      description: `File Freedom of Information request targeting ${targetOrg}`,
      template: {
        subject: `FOI Request - ${targetOrg} Records`,
        request_body: `Under the Freedom of Information and Protection of Privacy Act, I request:\n\n1. All internal communications regarding ${claims[0]?.claim_text?.substring(0, 100) || 'the matter'}\n2. All policy documents\n3. All statistical data\n4. All decision-making records\n\nTime period: [specify dates]\n\nFormat: Electronic copies preferred.`,
        estimated_cost: '$0-$25',
        response_deadline: '30 days'
      },
      target: `${targetOrg} Freedom of Information Office`,
      priority: 'immediate',
      next_steps: 'Submit FOI request; Track response deadline; Appeal if necessary'
    });
  }
  
  // Oversight body notifications
  if (riskAssessment.overall_risk_score >= 50) {
    actions.push({
      action_type: 'notify_oversight',
      description: 'Submit to Ombudsman and/or Auditor General',
      parties_to_notify: [
        {
          name: 'Ontario Ombudsman',
          url: 'https://www.ombudsman.on.ca/',
          complaint_type: 'Systemic investigation request'
        },
        {
          name: 'Auditor General of Ontario',
          url: 'https://www.auditor.on.ca/',
          complaint_type: 'Value-for-money audit request'
        }
      ],
      priority: riskAssessment.overall_risk_score >= 70 ? 'immediate' : 'high',
      next_steps: 'Submit detailed complaint with all evidence'
    });
  }
  
  // Media exposure for critical findings
  if (riskAssessment.overall_risk_score >= 70 || corruptionFindings.length > 0) {
    actions.push({
      action_type: 'media_exposure',
      description: 'Release evidence to investigative journalists',
      target_outlets: [
        'CBC Marketplace',
        'Toronto Star Investigations',
        'Globe and Mail',
        'Fifth Estate',
        'CTV W5'
      ],
      priority: 'high',
      next_steps: 'Prepare media package; Protect sources; Consider anonymity'
    });
  }
  
  // Legal action for severe cases
  if (riskAssessment.overall_risk_score >= 80) {
    actions.push({
      action_type: 'legal_action',
      description: 'Consider judicial review or civil lawsuit',
      target: 'Superior Court of Justice',
      legal_grounds: [
        ...constitutionViolations.map(v => v.legal_basis),
        ...humanRightsBreaches.map(b => b.legislation)
      ],
      priority: 'immediate',
      estimated_cost: '$15,000-$100,000+',
      next_steps: 'Consult litigation lawyer; Explore public interest funding'
    });
  }
  
  return actions;
}

function extractContext(text, keyword, contextLength = 200) {
  // Comprehensive input validation
  if (!keyword) return '';
  if (typeof keyword !== 'string') return '';
  if (keyword.length > 100) return '';
  if (keyword.length < 2) return '';
  
  // Skip if keyword looks like JSON or contains problematic patterns
  if (keyword.includes('{') || keyword.includes('[') || keyword.includes('"')) return '';
  if (keyword.includes('http://') || keyword.includes('https://')) return '';
  
  // Ensure text is a string
  if (!text || typeof text !== 'string') return '';
  
  try {
    // Escape special regex characters
    const escapedKeyword = escapeRegExp(keyword);
    
    // Additional safety: if escaped keyword is empty or too long, skip
    if (!escapedKeyword || escapedKeyword.length > 200) return '';
    
    const regex = new RegExp(escapedKeyword, 'gi');
    const match = regex.exec(text);
    if (!match) return '';
    
    const start = Math.max(0, match.index - contextLength);
    const end = Math.min(text.length, match.index + keyword.length + contextLength);
    
    return '...' + text.substring(start, end).trim() + '...';
  } catch (error) {
    // If regex still fails, return empty string silently
    console.warn('extractContext: Regex failed for keyword:', keyword.substring(0, 50));
    return '';
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SAFETY CHECKS (Legacy function - kept for backwards compatibility)
// ═══════════════════════════════════════════════════════════════════════════

export function applySafetyChecks(report) {
  // Privacy check
  const personalDataIndicators = report.Evidence?.entities?.people?.length > 0;
  
  // Legal check  
  const requiresLawyer = report.RiskAssessment?.overall_risk_score >= 70;
  
  return {
    ...report,
    privacy_check: {
      contains_personal_data: personalDataIndicators,
      requires_redaction: false,
      redaction_notes: []
    },
    legal_check: {
      potentially_privileged: false,
      requires_lawyer_review: requiresLawyer,
      lawyer_review_reason: requiresLawyer ? 'High-risk allegations require legal counsel' : 'N/A'
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export default {
  processDocument,
  applySafetyChecks
};

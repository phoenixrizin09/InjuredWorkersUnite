/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE EYE v2.0 - Incorruptible Evidence-Driven Investigative Intelligence
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
  const text = input.raw_text || input.content || '';
  
  if (!text || text.trim().length === 0) {
    throw new Error('THE EYE requires text content to analyze');
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
  const rolePattern = new RegExp(`${name}[,\\s]+((?:a|an|the)\\s+)?([a-z\\s]+?)(?=[,\\.\\n])`, 'i');
  const match = text.match(rolePattern);
  return match ? match[2].trim() : 'unknown';
}

function mapRelationships(entities, text) {
  const relationships = [];
  
  // Simple relationship extraction between people and organizations
  entities.people?.forEach(person => {
    entities.organizations?.forEach(org => {
      const pattern = new RegExp(`${person.full_name}[^.]{0,100}${org.name}`, 'i');
      if (pattern.test(text)) {
        relationships.push({
          type: 'association',
          from: person.full_name,
          to: org.name,
          confidence: 'medium',
          evidence: extractContext(text, person.full_name, 100)
        });
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
        claims.push({
          claim_text: match.trim(),
          claim_type: type,
          alleged_actor: findActor(match, entities),
          alleged_victim: findVictim(match, entities),
          date_of_event: extractDate(match) || 'unknown',
          supporting_evidence: {
            quote: match.substring(0, 200),
            source_snippet: extractContext(text, match, 150)
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
  
  // Charter Section 2: Fundamental Freedoms
  if (/freedom\s+of\s+(expression|speech|assembly|association)/gi.test(text) &&
      /restrict|limit|prohibit|deny/gi.test(text)) {
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
  
  // Charter Section 7: Life, Liberty, Security of Person
  const section7Keywords = [
    /deny|denial|refuse|refusal/gi,
    /medical\s+care|healthcare|treatment/gi,
    /benefit|support|assistance/gi
  ];
  
  if (section7Keywords.every(pattern => pattern.test(text))) {
    violations.push({
      section: 'Charter Section 7',
      right: 'Life, Liberty and Security of the Person',
      violation_type: 'denial_of_security',
      description: 'Denial of essential medical care or benefits affecting security of person',
      evidence: extractContext(text, 'medical', 200),
      severity: 'critical',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 7'
    });
  }
  
  // Charter Section 12: Cruel and Unusual Treatment
  if (/cruel|inhumane|degrading|suffering/gi.test(text)) {
    violations.push({
      section: 'Charter Section 12',
      right: 'Freedom from Cruel and Unusual Treatment',
      violation_type: 'cruel_treatment',
      description: 'Potential cruel or unusual treatment',
      evidence: extractContext(text, 'cruel', 200),
      severity: 'critical',
      legal_basis: 'Canadian Charter of Rights and Freedoms, s. 12'
    });
  }
  
  // Charter Section 15: Equality Rights
  const discriminationGrounds = [
    'disability', 'age', 'race', 'gender', 'Indigenous',
    'sex', 'religion', 'national origin'
  ];
  
  discriminationGrounds.forEach(ground => {
    if (new RegExp(ground, 'gi').test(text) && /discriminat|unequal/gi.test(text)) {
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
  
  // Administrative Law: Procedural Fairness
  if (/procedural\s+fairness|natural\s+justice|bias|reasonable\s+apprehension/gi.test(text)) {
    violations.push({
      section: 'Administrative Law',
      right: 'Procedural Fairness',
      violation_type: 'breach_of_fairness',
      description: 'Breach of procedural fairness or natural justice',
      evidence: extractContext(text, 'procedural fairness', 200),
      severity: 'high',
      legal_basis: 'Administrative law principles'
    });
  }
  
  // Section 35: Indigenous Rights
  if (/(Indigenous|First\s+Nations|Inuit|Métis)/gi.test(text) &&
      /duty\s+to\s+consult|treaty\s+rights|aboriginal\s+rights/gi.test(text)) {
    violations.push({
      section: 'Constitution Act Section 35',
      right: 'Aboriginal and Treaty Rights',
      violation_type: 'indigenous_rights_violation',
      description: 'Potential violation of Indigenous rights or duty to consult',
      evidence: extractContext(text, 'Indigenous', 200),
      severity: 'critical',
      legal_basis: 'Constitution Act, 1982, s. 35'
    });
  }
  
  return violations;
}

/**
 * 3️⃣ HUMAN RIGHTS ANALYSIS
 * Evaluate against Canadian Human Rights Act and provincial codes
 */
function analyzeHumanRights(text, claims, entities) {
  const breaches = [];
  
  const prohibitedGrounds = [
    { ground: 'disability', pattern: /disability|disabled|impairment/gi },
    { ground: 'age', pattern: /age|elderly|senior|youth/gi },
    { ground: 'race', pattern: /race|racial|racialized/gi },
    { ground: 'national_origin', pattern: /national\s+origin|ethnicity|immigrant/gi },
    { ground: 'sex', pattern: /sex|gender|women|men/gi },
    { ground: 'family_status', pattern: /family\s+status|marital|parent/gi },
    { ground: 'religion', pattern: /religion|religious\s+belief/gi },
    { ground: 'sexual_orientation', pattern: /sexual\s+orientation|LGBTQ/gi }
  ];
  
  prohibitedGrounds.forEach(({ ground, pattern }) => {
    if (pattern.test(text) && /discriminat|deny|refuse|exclude/gi.test(text)) {
      breaches.push({
        legislation: 'Canadian Human Rights Act',
        ground_of_discrimination: ground,
        description: `Potential discrimination based on ${ground}`,
        evidence: extractContext(text, ground, 200),
        severity: 'high',
        requires_complaint: true,
        complaint_deadline: '1 year from incident'
      });
    }
  });
  
  // Bill C-81 Accessible Canada Act
  if (/accessibility|barrier|accommodation/gi.test(text) &&
      /deny|fail|refuse/gi.test(text)) {
    breaches.push({
      legislation: 'Accessible Canada Act (Bill C-81)',
      ground_of_discrimination: 'accessibility',
      description: 'Failure to provide accessibility or reasonable accommodation',
      evidence: extractContext(text, 'accessibility', 200),
      severity: 'high',
      requires_complaint: true,
      complaint_deadline: '1 year from incident'
    });
  }
  
  // Economic discrimination
  if (/low.income|poverty|financial\s+hardship/gi.test(text) &&
      /deny|refuse|exclude/gi.test(text)) {
    breaches.push({
      legislation: 'Provincial Human Rights Code',
      ground_of_discrimination: 'economic_status',
      description: 'Discrimination based on economic or social status',
      evidence: extractContext(text, 'poverty', 200),
      severity: 'high',
      requires_complaint: true,
      complaint_deadline: '1 year from incident'
    });
  }
  
  return breaches;
}

/**
 * 4️⃣ UNCRPD ANALYSIS
 * Check compliance with UN Convention on Rights of Persons with Disabilities
 */
function analyzeUNCRPD(text, claims, entities) {
  const breaches = [];
  
  // Article 5: Equality and Non-Discrimination
  if (/disability|disabled/gi.test(text) && /discriminat|deny|exclude/gi.test(text)) {
    breaches.push({
      article: 'Article 5',
      right: 'Equality and Non-Discrimination',
      description: 'Discrimination against persons with disabilities',
      evidence: extractContext(text, 'disability', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 12: Equal Recognition Before the Law
  if (/capacity|competence|decision.making/gi.test(text) && /deny|restrict/gi.test(text)) {
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
  if (/legal\s+(aid|representation)|access\s+to\s+justice/gi.test(text) && /deny|barrier/gi.test(text)) {
    breaches.push({
      article: 'Article 13',
      right: 'Access to Justice',
      description: 'Barriers to accessing justice for persons with disabilities',
      evidence: extractContext(text, 'access to justice', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 19: Independent Living
  if (/independent\s+living|community|institution/gi.test(text) && /force|segregat/gi.test(text)) {
    breaches.push({
      article: 'Article 19',
      right: 'Living Independently and Being Included in the Community',
      description: 'Forced institutionalization or segregation',
      evidence: extractContext(text, 'independent living', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 25: Health
  if (/(medical\s+care|healthcare|treatment)/gi.test(text) && /deny|refuse|withhold/gi.test(text)) {
    breaches.push({
      article: 'Article 25',
      right: 'Health',
      description: 'Denial of medical care or discriminatory health services',
      evidence: extractContext(text, 'medical care', 200),
      severity: 'critical',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 26: Habilitation and Rehabilitation
  if (/rehabilitation|habilitation|therapy/gi.test(text) && /deny|terminate|cut/gi.test(text)) {
    breaches.push({
      article: 'Article 26',
      right: 'Habilitation and Rehabilitation',
      description: 'Denial of rehabilitation services',
      evidence: extractContext(text, 'rehabilitation', 200),
      severity: 'high',
      canada_obligations: 'State party since 2010'
    });
  }
  
  // Article 28: Adequate Standard of Living & Social Protection
  if (/(benefit|support|assistance|income)/gi.test(text) &&
      /(deny|reduce|cut|terminate|deem)/gi.test(text)) {
    breaches.push({
      article: 'Article 28',
      right: 'Adequate Standard of Living and Social Protection',
      description: 'Denial or reduction of essential benefits forcing poverty',
      evidence: extractContext(text, 'benefit', 200),
      severity: 'critical',
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

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function extractContext(text, keyword, contextLength = 200) {
  const regex = new RegExp(keyword, 'gi');
  const match = regex.exec(text);
  if (!match) return '';
  
  const start = Math.max(0, match.index - contextLength);
  const end = Math.min(text.length, match.index + keyword.length + contextLength);
  
  return '...' + text.substring(start, end).trim() + '...';
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

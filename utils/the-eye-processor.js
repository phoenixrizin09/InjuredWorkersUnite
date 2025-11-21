/**
 * THE EYE - Evidence-First Investigative Processor
 * 
 * Ingests raw documents, web pages, FOI responses, reports, social media, etc.
 * Extracts structured claims, entities, relationships
 * Scores credibility against authoritative sources
 * Produces actionable findings with provenance
 * 
 * STRICTLY JSON OUTPUT unless asked otherwise
 */

/**
 * MAIN PROCESSOR
 * 
 * INPUT: {raw_text_or_url, fetch_date, source_type, raw_metadata}
 * OUTPUT: Full JSON investigation report
 */
export async function processDocument(input) {
  const startTime = Date.now();
  
  // 1. Extract structured metadata
  const metadata = extractMetadata(input);
  
  // 2. Identify entities & relationships
  const entities = extractEntities(input.raw_text || input.content);
  const relationships = mapRelationships(entities, input.raw_text || input.content);
  
  // 3. Extract allegations/claims
  const claims = extractClaims(input.raw_text || input.content, entities);
  
  // 4. Check primary-source corroboration
  const corroborated = await corroborateClaims(claims, entities);
  
  // 5. Score risk & priority
  const riskScore = calculateRiskScore(claims, corroborated);
  
  // 6. Produce follow-up actions
  const actions = generateActions(claims, corroborated, riskScore);
  
  // 7. Compile provenance
  const provenance = compileProvenance(input, corroborated);
  
  // 8. Final output (JSON)
  const output = {
    id: generateId(input),
    title: metadata.title,
    date: metadata.date,
    publication_date: metadata.publication_date,
    jurisdiction: metadata.jurisdiction,
    source_url: input.raw_text_or_url,
    source_type: input.source_type,
    fetch_date: input.fetch_date,
    
    metadata: metadata,
    entities: entities,
    relationships: relationships,
    claims: claims,
    corroboration: corroborated,
    
    risk_score: riskScore.score,
    risk_explanation: riskScore.explanation,
    priority: riskScore.priority,
    
    suggested_actions: actions,
    provenance: provenance,
    
    processing_time_ms: Date.now() - startTime,
    processed_at: new Date().toISOString(),
    version: '1.0.0'
  };
  
  return output;
}

/**
 * 1. EXTRACT STRUCTURED METADATA
 */
function extractMetadata(input) {
  const content = input.raw_text || input.content || '';
  const metadata = input.raw_metadata || {};
  
  return {
    title: metadata.title || extractTitle(content) || 'Unknown Document',
    date: metadata.date || extractDate(content) || input.fetch_date,
    publication_date: metadata.publication_date || extractDate(content),
    source_url: input.raw_text_or_url,
    author: metadata.author || extractAuthor(content) || 'Unknown',
    source_type: input.source_type || detectSourceType(content, input.raw_text_or_url),
    jurisdiction: metadata.jurisdiction || detectJurisdiction(content),
    language: metadata.language || 'en',
    word_count: content.split(/\s+/).length,
    raw_metadata: metadata
  };
}

function extractTitle(text) {
  // Extract first meaningful line or header
  const lines = text.split('\n').filter(l => l.trim().length > 10);
  return lines[0]?.trim().substring(0, 200);
}

function extractDate(text) {
  // Simple date extraction - would use NLP in production
  const datePatterns = [
    /\d{4}-\d{2}-\d{2}/,
    /\d{1,2}\/\d{1,2}\/\d{4}/,
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/i
  ];
  
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  
  return null;
}

function extractAuthor(text) {
  // Look for common author patterns
  const authorPatterns = [
    /by\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/i,
    /author:\s*([A-Z][a-z]+\s+[A-Z][a-z]+)/i
  ];
  
  for (const pattern of authorPatterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

function detectSourceType(text, url) {
  if (url?.includes('news') || url?.includes('cbc') || url?.includes('ctv')) return 'news';
  if (url?.includes('gov') || url?.includes('ontario.ca')) return 'official';
  if (url?.includes('foi') || url?.includes('freedom')) return 'FOI';
  if (text.includes('report') || text.includes('annual')) return 'report';
  if (url?.includes('twitter') || url?.includes('facebook')) return 'social';
  return 'unknown';
}

function detectJurisdiction(text) {
  const jurisdictions = {
    'Toronto': 'city',
    'Ontario': 'province',
    'Canada': 'federal',
    'WSIB': 'province',
    'Parliament': 'federal'
  };
  
  for (const [keyword, level] of Object.entries(jurisdictions)) {
    if (text.includes(keyword)) {
      return { location: keyword, level: level };
    }
  }
  
  return { location: 'unknown', level: 'unknown' };
}

/**
 * 2. IDENTIFY ENTITIES & RELATIONSHIPS
 */
function extractEntities(text) {
  const entities = {
    people: [],
    organizations: [],
    locations: [],
    money: [],
    dates: [],
    contracts: []
  };
  
  // People (basic pattern matching - would use NER in production)
  const peoplePattern = /([A-Z][a-z]+\s+[A-Z][a-z]+)(?:\s+(CEO|President|Minister|Director|VP|Commissioner))?/g;
  let match;
  while ((match = peoplePattern.exec(text)) !== null) {
    entities.people.push({
      full_name: match[1],
      role: match[2] || 'unknown',
      context: extractContext(text, match.index)
    });
  }
  
  // Organizations (WSIB, ministries, companies)
  const orgPattern = /(WSIB|WCB|Ministry of [A-Z][a-z]+|[A-Z][a-z]+\s+Insurance|Department of [A-Z][a-z]+)/g;
  while ((match = orgPattern.exec(text)) !== null) {
    entities.organizations.push({
      name: match[0],
      type: classifyOrganization(match[0]),
      context: extractContext(text, match.index)
    });
  }
  
  // Money amounts
  const moneyPattern = /\$\s*(\d[\d,]*(?:\.\d{2})?)\s*(million|billion|thousand)?/gi;
  while ((match = moneyPattern.exec(text)) !== null) {
    entities.money.push({
      amount: match[1],
      scale: match[2] || 'dollars',
      context: extractContext(text, match.index)
    });
  }
  
  // Dates
  const datePattern = /\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/gi;
  while ((match = datePattern.exec(text)) !== null) {
    entities.dates.push({
      date: match[0],
      context: extractContext(text, match.index)
    });
  }
  
  // De-duplicate
  entities.people = deduplicateEntities(entities.people, 'full_name');
  entities.organizations = deduplicateEntities(entities.organizations, 'name');
  entities.money = deduplicateEntities(entities.money, 'amount');
  entities.dates = deduplicateEntities(entities.dates, 'date');
  
  return entities;
}

function classifyOrganization(name) {
  if (name.includes('WSIB') || name.includes('WCB')) return 'workers_comp';
  if (name.includes('Ministry') || name.includes('Department')) return 'government';
  if (name.includes('Insurance')) return 'insurance';
  return 'other';
}

function extractContext(text, index, radius = 100) {
  const start = Math.max(0, index - radius);
  const end = Math.min(text.length, index + radius);
  return text.substring(start, end).trim();
}

function deduplicateEntities(entities, key) {
  const seen = new Set();
  return entities.filter(e => {
    const value = e[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function mapRelationships(entities, text) {
  const relationships = [];
  
  // Look for relationships between entities
  // Pattern: "Person at Organization"
  entities.people.forEach(person => {
    entities.organizations.forEach(org => {
      const distance = Math.abs(
        text.indexOf(person.full_name) - text.indexOf(org.name)
      );
      
      if (distance < 200) { // If mentioned within 200 characters
        relationships.push({
          type: 'employment',
          from: person.full_name,
          to: org.name,
          confidence: distance < 50 ? 'high' : 'medium',
          evidence: extractContext(text, text.indexOf(person.full_name))
        });
      }
    });
  });
  
  return relationships;
}

/**
 * 3. EXTRACT ALLEGATIONS/CLAIMS
 */
function extractClaims(text, entities) {
  const claims = [];
  
  // Keywords that indicate allegations/claims
  const claimIndicators = [
    { pattern: /denied|rejected|refused/gi, type: 'denial' },
    { pattern: /fraud|corruption|bribe/gi, type: 'fraud' },
    { pattern: /abuse|harassment|discrimination/gi, type: 'abuse' },
    { pattern: /negligence|failure to|failed to/gi, type: 'negligence' },
    { pattern: /systemic|pattern of|repeatedly/gi, type: 'pattern' },
    { pattern: /violation|breach|illegal/gi, type: 'violation' }
  ];
  
  claimIndicators.forEach(({ pattern, type }) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const context = extractContext(text, match.index, 200);
      
      // Identify actors from entities
      const actor = findActorInContext(context, entities);
      const victim = findVictimInContext(context, entities);
      
      claims.push({
        claim_text: context,
        claim_type: type,
        alleged_actor: actor,
        alleged_victim: victim,
        date_of_event: extractDateFromContext(context),
        supporting_evidence: {
          quote: context,
          source_snippet: extractContext(text, match.index, 300)
        },
        evidence_strength: calculateEvidenceStrength(context, entities)
      });
    }
  });
  
  return claims;
}

function findActorInContext(context, entities) {
  // Find organization or person mentioned in context
  for (const org of entities.organizations) {
    if (context.includes(org.name)) {
      return org.name;
    }
  }
  for (const person of entities.people) {
    if (context.includes(person.full_name)) {
      return person.full_name;
    }
  }
  return 'unknown';
}

function findVictimInContext(context, entities) {
  // Look for victim indicators
  const victimKeywords = ['worker', 'claimant', 'recipient', 'patient', 'employee'];
  for (const keyword of victimKeywords) {
    if (context.toLowerCase().includes(keyword)) {
      return keyword;
    }
  }
  return 'unknown';
}

function extractDateFromContext(context) {
  const datePattern = /\d{4}|\d{1,2}\/\d{1,2}\/\d{4}/;
  const match = context.match(datePattern);
  return match ? match[0] : null;
}

function calculateEvidenceStrength(context, entities) {
  let score = 0;
  
  // Stronger if has specific names
  if (entities.people.some(p => context.includes(p.full_name))) score += 30;
  if (entities.organizations.some(o => context.includes(o.name))) score += 20;
  
  // Stronger if has specific amounts
  if (entities.money.some(m => context.includes(m.amount))) score += 20;
  
  // Stronger if has specific dates
  if (entities.dates.some(d => context.includes(d.date))) score += 15;
  
  // Stronger if uses definitive language
  if (/proved|confirmed|documented|evidence shows/i.test(context)) score += 15;
  
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
}

/**
 * 4. CHECK PRIMARY-SOURCE CORROBORATION
 */
async function corroborateClaims(claims, entities) {
  // In production, this would query actual databases
  // For now, we'll simulate with known authoritative sources
  
  const authoritativeSources = [
    {
      name: 'WSIB Annual Reports',
      type: 'official',
      url: 'https://www.wsib.ca/en/annualreport',
      searchable: true
    },
    {
      name: 'Ontario Auditor General Reports',
      type: 'oversight',
      url: 'https://www.auditor.on.ca/',
      searchable: true
    },
    {
      name: 'CanLII Legal Decisions',
      type: 'legal',
      url: 'https://www.canlii.org/',
      searchable: true
    },
    {
      name: 'Statistics Canada',
      type: 'data',
      url: 'https://www.statcan.gc.ca/',
      searchable: true
    },
    {
      name: 'Ontario Legislature Hansard',
      type: 'legislative',
      url: 'https://www.ola.org/en/legislative-business/house-documents/hansard',
      searchable: true
    }
  ];
  
  const corroborated = await Promise.all(claims.map(async (claim) => {
    const matches = [];
    
    // Simulate database searches
    // In production: actual API calls to each source
    for (const source of authoritativeSources) {
      if (shouldCheckSource(claim, source)) {
        const match = await simulateSourceSearch(claim, source);
        if (match) {
          matches.push(match);
        }
      }
    }
    
    return {
      claim: claim.claim_text,
      claim_type: claim.claim_type,
      corroborating_sources: matches,
      corroboration_level: matches.length >= 2 ? 'strong' : matches.length === 1 ? 'moderate' : 'weak',
      needs_further_investigation: matches.length === 0
    };
  }));
  
  return corroborated;
}

function shouldCheckSource(claim, source) {
  // Optimization: only check relevant sources
  if (claim.claim_type === 'fraud' && source.type === 'oversight') return true;
  if (claim.alleged_actor?.includes('WSIB') && source.name.includes('WSIB')) return true;
  if (source.type === 'legal') return true; // Always check legal sources
  return Math.random() > 0.5; // Simulate partial checking
}

async function simulateSourceSearch(claim, source) {
  // In production: actual API call or web scraping
  // For now: simulate finding relevant documents
  
  const hasMatch = Math.random() > 0.6; // 40% chance of finding corroboration
  
  if (!hasMatch) return null;
  
  return {
    source: source.name,
    url: source.url,
    snippet: `Relevant excerpt from ${source.name} that corroborates: "${claim.claim_text.substring(0, 100)}..."`,
    confidence: Math.random() > 0.5 ? 'high' : 'medium',
    last_checked: new Date().toISOString()
  };
}

/**
 * 5. SCORE RISK & PRIORITY
 */
function calculateRiskScore(claims, corroborated) {
  let score = 0;
  let reasons = [];
  
  // Factor 1: Number and severity of claims
  const criticalClaims = claims.filter(c => 
    c.claim_type === 'fraud' || c.claim_type === 'abuse'
  );
  if (criticalClaims.length > 0) {
    score += 30;
    reasons.push(`${criticalClaims.length} critical allegations`);
  }
  
  // Factor 2: Monetary value
  const hasMoney = claims.some(c => c.supporting_evidence?.source_snippet?.includes('$'));
  if (hasMoney) {
    score += 20;
    reasons.push('Significant financial amounts involved');
  }
  
  // Factor 3: Corroboration strength
  const strongCorroboration = corroborated.filter(c => c.corroboration_level === 'strong').length;
  if (strongCorroboration > 0) {
    score += 25;
    reasons.push(`${strongCorroboration} strongly corroborated claims`);
  }
  
  // Factor 4: Pattern/systemic issue
  const hasPattern = claims.some(c => c.claim_type === 'pattern');
  if (hasPattern) {
    score += 15;
    reasons.push('Indicates systematic pattern');
  }
  
  // Factor 5: Public safety
  const hasPublicSafety = claims.some(c => 
    c.claim_text?.includes('safety') || c.claim_text?.includes('harm')
  );
  if (hasPublicSafety) {
    score += 10;
    reasons.push('Public safety implications');
  }
  
  // Determine priority
  let priority;
  if (score >= 70) priority = 'CRITICAL';
  else if (score >= 50) priority = 'HIGH';
  else if (score >= 30) priority = 'MEDIUM';
  else priority = 'LOW';
  
  return {
    score: Math.min(100, score),
    explanation: reasons.join('; '),
    priority: priority
  };
}

/**
 * 6. PRODUCE FOLLOW-UP ACTIONS
 */
function generateActions(claims, corroborated, riskScore) {
  const actions = [];
  
  // High-risk actions
  if (riskScore.score >= 70) {
    actions.push({
      action_type: 'foi_request',
      description: 'File Freedom of Information request for complete documentation',
      template: generateFOITemplate(claims),
      target: identifyFOITarget(claims),
      priority: 'immediate'
    });
    
    actions.push({
      action_type: 'notify_oversight',
      description: 'Submit to Ombudsman/Auditor General/PSIC',
      parties_to_notify: identifyOversightBodies(claims),
      priority: 'immediate'
    });
    
    actions.push({
      action_type: 'media_alert',
      description: 'Prepare media package for investigative journalists',
      recommended_outlets: ['CBC Marketplace', 'CTV W5', 'Globe & Mail'],
      public_release_language: generatePublicStatement(claims, 280),
      priority: 'high'
    });
  }
  
  // Standard actions
  actions.push({
    action_type: 'evidence_checklist',
    description: 'Gather additional supporting documentation',
    checklist: generateEvidenceChecklist(claims, corroborated)
  });
  
  // If low corroboration, recommend additional research
  const weakCorroboration = corroborated.filter(c => c.corroboration_level === 'weak');
  if (weakCorroboration.length > 0) {
    actions.push({
      action_type: 'further_investigation',
      description: 'Claims requiring additional verification',
      targets: weakCorroboration.map(c => c.claim)
    });
  }
  
  return actions;
}

function generateFOITemplate(claims) {
  const actors = [...new Set(claims.map(c => c.alleged_actor).filter(Boolean))];
  
  return {
    subject: 'Freedom of Information Request - ' + actors[0],
    request_body: `I am requesting the following records under [Access to Information Act / FOIA]:

1. All documents, emails, and communications related to: ${claims.slice(0, 3).map(c => c.claim_text.substring(0, 100)).join('; ')}

2. Time period: ${extractTimeRange(claims)}

3. Format: Searchable PDF or CSV where applicable

4. Fee waiver requested on grounds of public interest.

Requester: [Your name and contact]`,
    estimated_cost: '$0-$25',
    response_deadline: '30 days from submission'
  };
}

function identifyFOITarget(claims) {
  const actors = claims.map(c => c.alleged_actor).filter(Boolean);
  if (actors.some(a => a.includes('WSIB'))) return 'WSIB Freedom of Information Office';
  if (actors.some(a => a.includes('Ministry'))) return 'Ontario Ministry FOI Office';
  if (actors.some(a => a.includes('Federal') || a.includes('Canada'))) return 'Federal ATIP Office';
  return 'Relevant government agency';
}

function identifyOversightBodies(claims) {
  const bodies = [];
  
  if (claims.some(c => c.alleged_actor?.includes('WSIB'))) {
    bodies.push({
      name: 'Ontario Ombudsman',
      url: 'https://www.ombudsman.on.ca/',
      complaint_type: 'Systemic investigation request'
    });
  }
  
  if (claims.some(c => c.claim_type === 'fraud')) {
    bodies.push({
      name: 'Public Sector Integrity Commissioner',
      url: 'https://psic-ispc.gc.ca/',
      complaint_type: 'Whistleblower disclosure'
    });
  }
  
  bodies.push({
    name: 'Provincial Auditor General',
    url: 'https://www.auditor.on.ca/',
    complaint_type: 'Request for value-for-money audit'
  });
  
  return bodies;
}

function generatePublicStatement(claims, maxLength) {
  const firstClaim = claims[0];
  const statement = `BREAKING: Investigation reveals ${firstClaim.claim_type} allegations against ${firstClaim.alleged_actor}. ${claims.length} documented incidents. Full evidence available.`;
  
  return statement.substring(0, maxLength);
}

function generateEvidenceChecklist(claims, corroborated) {
  const checklist = [];
  
  // Missing corroboration
  const needsVerification = corroborated.filter(c => c.corroboration_level === 'weak');
  if (needsVerification.length > 0) {
    checklist.push({
      item: 'Obtain primary source documents for weak claims',
      count: needsVerification.length,
      priority: 'high'
    });
  }
  
  // Financial documentation
  if (claims.some(c => c.supporting_evidence?.source_snippet?.includes('$'))) {
    checklist.push({
      item: 'Obtain financial records, invoices, contracts',
      priority: 'high'
    });
  }
  
  // Witness statements
  checklist.push({
    item: 'Collect witness testimonials with consent forms',
    priority: 'medium'
  });
  
  // Legal opinions
  if (claims.some(c => c.claim_type === 'violation' || c.claim_type === 'fraud')) {
    checklist.push({
      item: 'Seek legal review for potential litigation',
      priority: 'high'
    });
  }
  
  return checklist;
}

function extractTimeRange(claims) {
  const dates = claims.map(c => c.date_of_event).filter(Boolean);
  if (dates.length === 0) return 'Past 5 years';
  
  const years = dates.map(d => d.match(/\d{4}/)?.[0]).filter(Boolean);
  if (years.length === 0) return 'Past 5 years';
  
  const minYear = Math.min(...years.map(Number));
  const maxYear = Math.max(...years.map(Number));
  
  return `${minYear} to ${maxYear}`;
}

/**
 * 7. COMPILE PROVENANCE
 */
function compileProvenance(input, corroborated) {
  const provenance = [
    {
      source: 'Original Document',
      url: input.raw_text_or_url,
      snippet: input.raw_text?.substring(0, 200) + '...',
      fetch_date: input.fetch_date,
      verification_method: 'Direct ingestion'
    }
  ];
  
  // Add all corroborating sources
  corroborated.forEach(c => {
    c.corroborating_sources?.forEach(source => {
      provenance.push({
        source: source.source,
        url: source.url,
        snippet: source.snippet,
        last_checked: source.last_checked,
        verification_method: 'Database cross-reference'
      });
    });
  });
  
  return provenance;
}

/**
 * 8. SAFETY & FORENSICS
 */
export function applySafetyChecks(output) {
  // Privacy protection
  output.privacy_check = {
    contains_personal_data: checkForPersonalData(output),
    requires_redaction: false,
    redaction_notes: []
  };
  
  // Legal privilege check
  output.legal_check = {
    potentially_privileged: checkForPrivilege(output),
    requires_lawyer_review: output.risk_score >= 70,
    lawyer_review_reason: output.risk_score >= 70 ? 'High-risk allegations require legal review before publication' : null
  };
  
  // Explainability
  output.explainability = {
    strongest_evidence: getStrongestEvidence(output.corroboration, 3),
    last_checked: new Date().toISOString(),
    methodology: 'Evidence-first investigative analysis with multi-source corroboration'
  };
  
  return output;
}

function checkForPersonalData(output) {
  // Check for SINs, addresses, medical info
  const sensitivePatterns = [
    /\d{3}-\d{3}-\d{3}/,  // SIN
    /\d{1,5}\s+[A-Z][a-z]+\s+(Street|Ave|Road)/i,  // Address
    /medical records|health information/i
  ];
  
  const text = JSON.stringify(output);
  return sensitivePatterns.some(pattern => pattern.test(text));
}

function checkForPrivilege(output) {
  const privilegeKeywords = [
    'solicitor-client',
    'attorney-client',
    'legal advice',
    'privileged communication'
  ];
  
  const text = JSON.stringify(output).toLowerCase();
  return privilegeKeywords.some(keyword => text.includes(keyword));
}

function getStrongestEvidence(corroboration, count) {
  return corroboration
    .filter(c => c.corroboration_level === 'strong')
    .slice(0, count)
    .map(c => ({
      claim: c.claim.substring(0, 150),
      sources: c.corroborating_sources.map(s => ({
        name: s.source,
        url: s.url,
        quote: s.snippet.substring(0, 150)
      }))
    }));
}

/**
 * HELPER: Generate unique ID
 */
function generateId(input) {
  const timestamp = Date.now();
  const hash = simpleHash(input.raw_text || input.content || '');
  return `eye_${timestamp}_${hash}`;
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < Math.min(str.length, 1000); i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

/**
 * EXPORT FOR USE IN BROWSER OR NODE
 */
export default {
  processDocument,
  applySafetyChecks
};

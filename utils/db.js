/**
 * DATABASE LAYER - The Eye / Oracle System
 * 
 * Uses JSON file storage for free, serverless operation.
 * Can be upgraded to PostgreSQL/Supabase when needed.
 * 
 * This provides persistent storage that works with:
 * - Cloudflare Pages (via API routes)
 * - GitHub Actions (direct file access)
 * - Local development
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Data directory
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Generate UUID
function generateId() {
  return crypto.randomUUID();
}

// Generate SHA-256 hash
function generateHash(data) {
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

// Read JSON file safely
function readJsonFile(filename) {
  ensureDataDir();
  const filepath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filepath)) {
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
  } catch (e) {
    console.error(`Error reading ${filename}:`, e.message);
  }
  return null;
}

// Write JSON file safely
function writeJsonFile(filename, data) {
  ensureDataDir();
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

// ============================================================================
// CASES
// ============================================================================

const CASES_FILE = 'cases.json';

export function getCases(filters = {}) {
  const cases = readJsonFile(CASES_FILE) || [];
  
  return cases.filter(c => {
    if (filters.status && c.status !== filters.status) return false;
    if (filters.category && c.category !== filters.category) return false;
    if (filters.scope && c.scope !== filters.scope) return false;
    if (filters.severity && c.severity !== filters.severity) return false;
    return true;
  });
}

export function getCaseById(id) {
  const cases = readJsonFile(CASES_FILE) || [];
  return cases.find(c => c.id === id);
}

export function createCase(caseData) {
  const cases = readJsonFile(CASES_FILE) || [];
  
  const newCase = {
    id: generateId(),
    title: caseData.title,
    status: 'DRAFT',
    category: caseData.category,
    scope: caseData.scope || 'provincial',
    severity: caseData.severity || 'medium',
    summary: caseData.summary || '',
    full_analysis: caseData.full_analysis || null,
    source_urls: caseData.source_urls || [],
    charter_violations: caseData.charter_violations || [],
    uncrpd_violations: caseData.uncrpd_violations || [],
    affected_count: caseData.affected_count || '',
    financial_impact: caseData.financial_impact || '',
    target_entity: caseData.target_entity || null,
    evidence_ids: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: null,
    created_by: caseData.created_by || 'system',
    approved_by: null,
  };
  
  cases.push(newCase);
  writeJsonFile(CASES_FILE, cases);
  
  // Add provenance entry
  addProvenanceEntry('case', newCase.id, 'CREATED', newCase.created_by, {
    title: newCase.title,
    category: newCase.category,
  });
  
  return newCase;
}

export function updateCase(id, updates) {
  const cases = readJsonFile(CASES_FILE) || [];
  const index = cases.findIndex(c => c.id === id);
  
  if (index === -1) return null;
  
  const oldCase = { ...cases[index] };
  cases[index] = {
    ...cases[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  
  writeJsonFile(CASES_FILE, cases);
  
  // Add provenance entry
  addProvenanceEntry('case', id, 'UPDATED', updates.updated_by || 'system', {
    changes: Object.keys(updates),
    old_status: oldCase.status,
    new_status: cases[index].status,
  });
  
  return cases[index];
}

export function approveCase(id, approvedBy) {
  return updateCase(id, {
    status: 'APPROVED',
    approved_by: approvedBy,
    updated_by: approvedBy,
  });
}

export function publishCase(id, publishedBy) {
  return updateCase(id, {
    status: 'PUBLISHED',
    published_at: new Date().toISOString(),
    updated_by: publishedBy,
  });
}

export function submitForReview(id, submittedBy) {
  return updateCase(id, {
    status: 'UNDER_REVIEW',
    updated_by: submittedBy,
  });
}

// ============================================================================
// ALERTS
// ============================================================================

const ALERTS_FILE = 'alerts.json';

export function getAlerts(filters = {}) {
  const alerts = readJsonFile(ALERTS_FILE) || [];
  
  return alerts.filter(a => {
    if (filters.severity && a.severity !== filters.severity) return false;
    if (filters.category && a.category !== filters.category) return false;
    if (filters.scope && a.scope !== filters.scope) return false;
    if (filters.acknowledged !== undefined && a.acknowledged !== filters.acknowledged) return false;
    return true;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function getAlertById(id) {
  const alerts = readJsonFile(ALERTS_FILE) || [];
  return alerts.find(a => a.id === id);
}

export function createAlert(alertData) {
  const alerts = readJsonFile(ALERTS_FILE) || [];
  
  const newAlert = {
    id: generateId(),
    case_id: alertData.case_id || null,
    title: alertData.title,
    message: alertData.message || '',
    severity: alertData.severity || 'medium',
    category: alertData.category,
    scope: alertData.scope || 'provincial',
    source: alertData.source || '',
    source_url: alertData.source_url || '',
    verified: alertData.verified || false,
    delivered_via: [],
    acknowledged: false,
    created_at: new Date().toISOString(),
    acknowledged_at: null,
  };
  
  alerts.unshift(newAlert); // Add to beginning
  
  // Keep only last 500 alerts
  if (alerts.length > 500) {
    alerts.splice(500);
  }
  
  writeJsonFile(ALERTS_FILE, alerts);
  
  return newAlert;
}

export function acknowledgeAlert(id) {
  const alerts = readJsonFile(ALERTS_FILE) || [];
  const index = alerts.findIndex(a => a.id === id);
  
  if (index === -1) return null;
  
  alerts[index].acknowledged = true;
  alerts[index].acknowledged_at = new Date().toISOString();
  
  writeJsonFile(ALERTS_FILE, alerts);
  
  return alerts[index];
}

export function updateAlertDelivery(id, channel) {
  const alerts = readJsonFile(ALERTS_FILE) || [];
  const index = alerts.findIndex(a => a.id === id);
  
  if (index === -1) return null;
  
  if (!alerts[index].delivered_via.includes(channel)) {
    alerts[index].delivered_via.push(channel);
  }
  
  writeJsonFile(ALERTS_FILE, alerts);
  
  return alerts[index];
}

// ============================================================================
// TARGETS
// ============================================================================

const TARGETS_FILE = 'targets.json';

export function getTargets(filters = {}) {
  const targets = readJsonFile(TARGETS_FILE) || [];
  
  return targets.filter(t => {
    if (filters.type && t.type !== filters.type) return false;
    if (filters.jurisdiction && t.jurisdiction !== filters.jurisdiction) return false;
    if (filters.threat_level && t.threat_level !== filters.threat_level) return false;
    if (filters.status && t.status !== filters.status) return false;
    return true;
  });
}

export function getTargetById(id) {
  const targets = readJsonFile(TARGETS_FILE) || [];
  return targets.find(t => t.id === id);
}

export function getTargetByName(name) {
  const targets = readJsonFile(TARGETS_FILE) || [];
  return targets.find(t => t.name.toLowerCase() === name.toLowerCase());
}

export function createTarget(targetData) {
  const targets = readJsonFile(TARGETS_FILE) || [];
  
  // Check if target already exists
  const existing = targets.find(t => 
    t.name.toLowerCase() === targetData.name.toLowerCase()
  );
  
  if (existing) {
    // Update existing target
    return updateTarget(existing.id, targetData);
  }
  
  const newTarget = {
    id: generateId(),
    name: targetData.name,
    type: targetData.type,
    jurisdiction: targetData.jurisdiction,
    leadership: targetData.leadership || '',
    budget: targetData.budget || '',
    corruption_indicators: targetData.corruption_indicators || [],
    related_cases: targetData.related_cases || [],
    evidence_count: targetData.evidence_count || 0,
    threat_level: targetData.threat_level || 'medium',
    status: 'active_monitoring',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  targets.push(newTarget);
  writeJsonFile(TARGETS_FILE, targets);
  
  addProvenanceEntry('target', newTarget.id, 'CREATED', 'system', {
    name: newTarget.name,
    type: newTarget.type,
  });
  
  return newTarget;
}

export function updateTarget(id, updates) {
  const targets = readJsonFile(TARGETS_FILE) || [];
  const index = targets.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  targets[index] = {
    ...targets[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  
  writeJsonFile(TARGETS_FILE, targets);
  
  return targets[index];
}

export function linkCaseToTarget(targetId, caseId) {
  const targets = readJsonFile(TARGETS_FILE) || [];
  const index = targets.findIndex(t => t.id === targetId);
  
  if (index === -1) return null;
  
  if (!targets[index].related_cases.includes(caseId)) {
    targets[index].related_cases.push(caseId);
    targets[index].evidence_count++;
    targets[index].updated_at = new Date().toISOString();
  }
  
  writeJsonFile(TARGETS_FILE, targets);
  
  return targets[index];
}

// ============================================================================
// EVIDENCE
// ============================================================================

const EVIDENCE_FILE = 'evidence.json';

export function getEvidence(filters = {}) {
  const evidence = readJsonFile(EVIDENCE_FILE) || [];
  
  return evidence.filter(e => {
    if (filters.case_id && e.case_id !== filters.case_id) return false;
    if (filters.type && e.file_type !== filters.type) return false;
    return true;
  });
}

export function getEvidenceById(id) {
  const evidence = readJsonFile(EVIDENCE_FILE) || [];
  return evidence.find(e => e.id === id);
}

export function createEvidence(evidenceData) {
  const evidence = readJsonFile(EVIDENCE_FILE) || [];
  
  const newEvidence = {
    id: generateId(),
    case_id: evidenceData.case_id,
    file_name: evidenceData.file_name,
    file_type: evidenceData.file_type,
    file_size: evidenceData.file_size || 0,
    storage_path: evidenceData.storage_path,
    sha256_hash: evidenceData.sha256_hash || generateHash(evidenceData),
    captured_at: evidenceData.captured_at || new Date().toISOString(),
    source_url: evidenceData.source_url || '',
    description: evidenceData.description || '',
    metadata: evidenceData.metadata || {},
    created_at: new Date().toISOString(),
  };
  
  evidence.push(newEvidence);
  writeJsonFile(EVIDENCE_FILE, evidence);
  
  // Update case's evidence_ids
  const cases = readJsonFile(CASES_FILE) || [];
  const caseIndex = cases.findIndex(c => c.id === evidenceData.case_id);
  if (caseIndex !== -1) {
    cases[caseIndex].evidence_ids.push(newEvidence.id);
    writeJsonFile(CASES_FILE, cases);
  }
  
  addProvenanceEntry('evidence', newEvidence.id, 'CREATED', 'system', {
    case_id: newEvidence.case_id,
    file_name: newEvidence.file_name,
    sha256_hash: newEvidence.sha256_hash,
  });
  
  return newEvidence;
}

// ============================================================================
// PROVENANCE CHAIN (Audit Trail)
// ============================================================================

const PROVENANCE_FILE = 'provenance.json';

export function addProvenanceEntry(entityType, entityId, action, actor, metadata = {}) {
  const provenance = readJsonFile(PROVENANCE_FILE) || [];
  
  // Get previous entry for this entity
  const previousEntries = provenance.filter(
    p => p.entity_type === entityType && p.entity_id === entityId
  );
  const previousEntry = previousEntries[previousEntries.length - 1];
  
  const entry = {
    id: generateId(),
    entity_type: entityType,
    entity_id: entityId,
    action: action,
    actor: actor || 'system',
    timestamp: new Date().toISOString(),
    previous_hash: previousEntry?.current_hash || null,
    metadata: metadata,
  };
  
  // Calculate hash including previous hash for chain integrity
  entry.current_hash = generateHash({
    ...entry,
    previous_hash: entry.previous_hash,
  });
  
  provenance.push(entry);
  
  // Keep last 10000 entries
  if (provenance.length > 10000) {
    provenance.splice(0, provenance.length - 10000);
  }
  
  writeJsonFile(PROVENANCE_FILE, provenance);
  
  return entry;
}

export function getProvenanceChain(entityType, entityId) {
  const provenance = readJsonFile(PROVENANCE_FILE) || [];
  
  return provenance
    .filter(p => p.entity_type === entityType && p.entity_id === entityId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

export function verifyProvenanceChain(entityType, entityId) {
  const entries = getProvenanceChain(entityType, entityId);
  
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const previousEntry = i > 0 ? entries[i - 1] : null;
    
    // Verify previous hash link
    if (entry.previous_hash !== (previousEntry?.current_hash || null)) {
      return { valid: false, error: `Chain broken at entry ${i}`, entry_id: entry.id };
    }
    
    // Verify current hash
    const expectedHash = generateHash({
      id: entry.id,
      entity_type: entry.entity_type,
      entity_id: entry.entity_id,
      action: entry.action,
      actor: entry.actor,
      timestamp: entry.timestamp,
      previous_hash: entry.previous_hash,
      metadata: entry.metadata,
    });
    
    if (entry.current_hash !== expectedHash) {
      return { valid: false, error: `Hash mismatch at entry ${i}`, entry_id: entry.id };
    }
  }
  
  return { valid: true, entries: entries.length };
}

// ============================================================================
// SCAN HISTORY
// ============================================================================

const SCANS_FILE = 'scan-history.json';

export function recordScan(scanData) {
  const scans = readJsonFile(SCANS_FILE) || [];
  
  const scan = {
    id: generateId(),
    source: scanData.source,
    type: scanData.type || 'scheduled',
    started_at: scanData.started_at || new Date().toISOString(),
    completed_at: scanData.completed_at || null,
    status: scanData.status || 'running',
    items_found: scanData.items_found || 0,
    alerts_created: scanData.alerts_created || 0,
    cases_created: scanData.cases_created || 0,
    error: scanData.error || null,
  };
  
  scans.unshift(scan);
  
  // Keep last 100 scans
  if (scans.length > 100) {
    scans.splice(100);
  }
  
  writeJsonFile(SCANS_FILE, scans);
  
  return scan;
}

export function updateScan(id, updates) {
  const scans = readJsonFile(SCANS_FILE) || [];
  const index = scans.findIndex(s => s.id === id);
  
  if (index === -1) return null;
  
  scans[index] = { ...scans[index], ...updates };
  writeJsonFile(SCANS_FILE, scans);
  
  return scans[index];
}

export function getRecentScans(limit = 20) {
  const scans = readJsonFile(SCANS_FILE) || [];
  return scans.slice(0, limit);
}

// ============================================================================
// SETTINGS
// ============================================================================

const SETTINGS_FILE = 'settings.json';

export function getSettings() {
  return readJsonFile(SETTINGS_FILE) || {
    telegram_enabled: false,
    telegram_chat_id: '',
    email_enabled: false,
    email_recipients: [],
    webhook_enabled: false,
    webhook_url: '',
    auto_scan_interval: 6, // hours
    auto_publish: false,
    require_approval: true,
    alert_severity_threshold: 'medium',
  };
}

export function updateSettings(updates) {
  const settings = getSettings();
  const newSettings = { ...settings, ...updates };
  writeJsonFile(SETTINGS_FILE, newSettings);
  return newSettings;
}

// ============================================================================
// STATISTICS
// ============================================================================

export function getSystemStats() {
  const cases = readJsonFile(CASES_FILE) || [];
  const alerts = readJsonFile(ALERTS_FILE) || [];
  const targets = readJsonFile(TARGETS_FILE) || [];
  const evidence = readJsonFile(EVIDENCE_FILE) || [];
  const scans = readJsonFile(SCANS_FILE) || [];
  
  const byStatus = {};
  const byCategory = {};
  const bySeverity = {};
  const byScope = {};
  
  cases.forEach(c => {
    byStatus[c.status] = (byStatus[c.status] || 0) + 1;
    byCategory[c.category] = (byCategory[c.category] || 0) + 1;
    bySeverity[c.severity] = (bySeverity[c.severity] || 0) + 1;
    byScope[c.scope] = (byScope[c.scope] || 0) + 1;
  });
  
  return {
    cases: {
      total: cases.length,
      byStatus,
      byCategory,
      bySeverity,
      byScope,
    },
    alerts: {
      total: alerts.length,
      unacknowledged: alerts.filter(a => !a.acknowledged).length,
      critical: alerts.filter(a => a.severity === 'critical').length,
    },
    targets: {
      total: targets.length,
      active: targets.filter(t => t.status === 'active_monitoring').length,
      critical: targets.filter(t => t.threat_level === 'critical').length,
    },
    evidence: {
      total: evidence.length,
    },
    scans: {
      total: scans.length,
      lastScan: scans[0] || null,
    },
    lastUpdated: new Date().toISOString(),
  };
}

// ============================================================================
// MIGRATION: Import from real-data-generator
// ============================================================================

export async function migrateFromRealDataGenerator() {
  try {
    // Dynamic import to handle ES modules
    const { ALL_REAL_ISSUES } = await import('./real-data-generator.js');
    
    let casesCreated = 0;
    let targetsCreated = 0;
    let alertsCreated = 0;
    
    for (const issue of ALL_REAL_ISSUES) {
      // Create case
      const caseData = createCase({
        title: issue.title,
        category: issue.category,
        scope: issue.scope,
        severity: issue.severity,
        summary: issue.evidence,
        source_urls: [issue.url],
        charter_violations: issue.charter_violations || [],
        uncrpd_violations: issue.uncrpd_violations || [],
        affected_count: issue.affected_count,
        financial_impact: issue.financial_impact,
        target_entity: issue.target_entity,
        created_by: 'migration',
      });
      casesCreated++;
      
      // Create target if exists
      if (issue.target_entity) {
        const target = createTarget({
          name: issue.target_entity.name,
          type: issue.target_entity.type,
          jurisdiction: issue.target_entity.jurisdiction,
          leadership: issue.target_entity.head || issue.target_entity.minister || issue.target_entity.ceo || '',
          budget: issue.target_entity.budget || '',
          corruption_indicators: issue.target_entity.corruption_indicators || [],
          threat_level: 'critical',
        });
        
        // Link case to target
        linkCaseToTarget(target.id, caseData.id);
        targetsCreated++;
      }
      
      // Create alert
      createAlert({
        case_id: caseData.id,
        title: issue.title,
        message: issue.evidence,
        severity: issue.severity,
        category: issue.category,
        scope: issue.scope,
        source: issue.source,
        source_url: issue.url,
        verified: true,
      });
      alertsCreated++;
    }
    
    return {
      success: true,
      casesCreated,
      targetsCreated,
      alertsCreated,
    };
  } catch (error) {
    console.error('Migration error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default {
  // Cases
  getCases,
  getCaseById,
  createCase,
  updateCase,
  approveCase,
  publishCase,
  submitForReview,
  
  // Alerts
  getAlerts,
  getAlertById,
  createAlert,
  acknowledgeAlert,
  updateAlertDelivery,
  
  // Targets
  getTargets,
  getTargetById,
  getTargetByName,
  createTarget,
  updateTarget,
  linkCaseToTarget,
  
  // Evidence
  getEvidence,
  getEvidenceById,
  createEvidence,
  
  // Provenance
  addProvenanceEntry,
  getProvenanceChain,
  verifyProvenanceChain,
  
  // Scans
  recordScan,
  updateScan,
  getRecentScans,
  
  // Settings
  getSettings,
  updateSettings,
  
  // Stats
  getSystemStats,
  
  // Migration
  migrateFromRealDataGenerator,
};

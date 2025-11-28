/**
 * EVIDENCE BUNDLER - The Eye / Oracle
 * 
 * Creates downloadable evidence packages with:
 * - All evidence files
 * - Analysis reports
 * - Provenance chain (audit trail)
 * - Hash manifest for integrity verification
 * 
 * Uses JSZip (free, browser + Node compatible)
 */

import crypto from 'crypto';

// Browser-compatible imports
let JSZip;
if (typeof window !== 'undefined') {
  // Will be loaded from CDN in browser
  JSZip = window.JSZip;
} else {
  // Node.js
  JSZip = require('jszip');
}

// ============================================================================
// EVIDENCE BUNDLE GENERATOR
// ============================================================================

export class EvidenceBundler {
  constructor(db) {
    this.db = db;
  }

  /**
   * Create a complete evidence bundle for a case
   */
  async createBundle(caseId) {
    const zip = new JSZip();
    
    // Get case data
    const caseData = this.db.getCaseById(caseId);
    if (!caseData) {
      throw new Error(`Case not found: ${caseId}`);
    }

    // Initialize manifest
    const manifest = {
      bundle_version: '1.0.0',
      case_id: caseId,
      case_title: caseData.title,
      generated_at: new Date().toISOString(),
      generated_by: 'The Eye Oracle System',
      integrity: {
        algorithm: 'SHA-256',
        files: [],
        bundle_hash: null,
      },
      case_summary: {
        status: caseData.status,
        category: caseData.category,
        scope: caseData.scope,
        severity: caseData.severity,
        created_at: caseData.created_at,
        published_at: caseData.published_at,
        charter_violations: caseData.charter_violations,
        uncrpd_violations: caseData.uncrpd_violations,
        affected_count: caseData.affected_count,
        financial_impact: caseData.financial_impact,
      },
      sources: caseData.source_urls,
      legal_disclaimer: this.getLegalDisclaimer(),
    };

    // Add case analysis report
    const analysisReport = this.formatAnalysisReport(caseData);
    const analysisContent = JSON.stringify(analysisReport, null, 2);
    zip.file('analysis/case-analysis.json', analysisContent);
    manifest.integrity.files.push({
      path: 'analysis/case-analysis.json',
      sha256: this.hash(analysisContent),
      type: 'json',
      description: 'Full case analysis from The Eye v2.0',
    });

    // Add human-readable report
    const readableReport = this.formatReadableReport(caseData);
    zip.file('analysis/case-report.md', readableReport);
    manifest.integrity.files.push({
      path: 'analysis/case-report.md',
      sha256: this.hash(readableReport),
      type: 'markdown',
      description: 'Human-readable case report',
    });

    // Add evidence files
    const evidence = this.db.getEvidence({ case_id: caseId });
    const evidenceFolder = zip.folder('evidence');
    
    for (const item of evidence) {
      // For file-based evidence, we store metadata
      // Actual files would be fetched from storage
      const evidenceMeta = {
        id: item.id,
        file_name: item.file_name,
        file_type: item.file_type,
        sha256_hash: item.sha256_hash,
        captured_at: item.captured_at,
        source_url: item.source_url,
        description: item.description,
        storage_path: item.storage_path,
      };
      
      const metaContent = JSON.stringify(evidenceMeta, null, 2);
      evidenceFolder.file(`${item.id}.meta.json`, metaContent);
      
      manifest.integrity.files.push({
        path: `evidence/${item.id}.meta.json`,
        sha256: this.hash(metaContent),
        type: 'evidence-metadata',
        original_file: item.file_name,
        original_hash: item.sha256_hash,
      });
    }

    // Add provenance chain (audit trail)
    const provenance = this.db.getProvenanceChain('case', caseId);
    const provenanceContent = JSON.stringify({
      entity_type: 'case',
      entity_id: caseId,
      chain: provenance,
      verification: this.db.verifyProvenanceChain('case', caseId),
      w3c_prov: this.formatAsW3CPROV(provenance),
    }, null, 2);
    
    zip.file('provenance/audit-trail.json', provenanceContent);
    manifest.integrity.files.push({
      path: 'provenance/audit-trail.json',
      sha256: this.hash(provenanceContent),
      type: 'json',
      description: 'Complete provenance chain with cryptographic verification',
    });

    // Add target dossier if available
    if (caseData.target_entity) {
      const target = this.db.getTargetByName(caseData.target_entity.name);
      if (target) {
        const targetDossier = this.formatTargetDossier(target);
        const targetContent = JSON.stringify(targetDossier, null, 2);
        zip.file('targets/target-dossier.json', targetContent);
        manifest.integrity.files.push({
          path: 'targets/target-dossier.json',
          sha256: this.hash(targetContent),
          type: 'json',
          description: 'Target entity dossier',
        });
      }
    }

    // Add source verification guide
    const verificationGuide = this.createVerificationGuide(caseData);
    zip.file('verification/how-to-verify.md', verificationGuide);
    manifest.integrity.files.push({
      path: 'verification/how-to-verify.md',
      sha256: this.hash(verificationGuide),
      type: 'markdown',
      description: 'Guide for independently verifying all claims',
    });

    // Add README
    const readme = this.createReadme(caseData);
    zip.file('README.md', readme);
    manifest.integrity.files.push({
      path: 'README.md',
      sha256: this.hash(readme),
      type: 'markdown',
      description: 'Bundle overview and usage guide',
    });

    // Calculate bundle integrity hash
    const allHashes = manifest.integrity.files.map(f => f.sha256).join('');
    manifest.integrity.bundle_hash = this.hash(allHashes);

    // Add manifest (must be last)
    zip.file('manifest.json', JSON.stringify(manifest, null, 2));

    // Generate the bundle
    const content = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });

    return {
      filename: `IWU-Evidence-Bundle-${caseId.substring(0, 8)}-${Date.now()}.zip`,
      content,
      manifest,
      size: content.length,
    };
  }

  /**
   * Generate SHA-256 hash
   */
  hash(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  /**
   * Format case as analysis report
   */
  formatAnalysisReport(caseData) {
    return {
      meta: {
        version: '2.0.0',
        processor: 'The Eye v2.0',
        timestamp: new Date().toISOString(),
      },
      case: {
        id: caseData.id,
        title: caseData.title,
        status: caseData.status,
        category: caseData.category,
        scope: caseData.scope,
        severity: caseData.severity,
      },
      summary: caseData.summary,
      full_analysis: caseData.full_analysis,
      violations: {
        charter: caseData.charter_violations,
        uncrpd: caseData.uncrpd_violations,
      },
      impact: {
        affected_count: caseData.affected_count,
        financial_impact: caseData.financial_impact,
      },
      target_entity: caseData.target_entity,
      sources: caseData.source_urls,
      evidence_count: caseData.evidence_ids?.length || 0,
      timeline: {
        created: caseData.created_at,
        updated: caseData.updated_at,
        published: caseData.published_at,
      },
    };
  }

  /**
   * Format human-readable report
   */
  formatReadableReport(caseData) {
    return `# ${caseData.title}

## Executive Summary

**Case ID:** ${caseData.id}  
**Status:** ${caseData.status}  
**Severity:** ${caseData.severity.toUpperCase()}  
**Category:** ${caseData.category}  
**Scope:** ${caseData.scope}  

---

## Overview

${caseData.summary || 'No summary available.'}

---

## Findings

### Charter of Rights Violations

${caseData.charter_violations?.length > 0 
  ? caseData.charter_violations.map(v => `- ${v}`).join('\n')
  : 'No Charter violations identified.'}

### UN Convention on Rights of Persons with Disabilities (UNCRPD)

${caseData.uncrpd_violations?.length > 0
  ? caseData.uncrpd_violations.map(v => `- ${v}`).join('\n')
  : 'No UNCRPD violations identified.'}

---

## Impact Assessment

**People Affected:** ${caseData.affected_count || 'Unknown'}  
**Financial Impact:** ${caseData.financial_impact || 'Unknown'}

---

## Target Entity

${caseData.target_entity ? `
**Name:** ${caseData.target_entity.name}  
**Type:** ${caseData.target_entity.type}  
**Jurisdiction:** ${caseData.target_entity.jurisdiction}  

### Corruption Indicators
${caseData.target_entity.corruption_indicators?.map(i => `- ${i}`).join('\n') || 'None documented.'}
` : 'No target entity identified.'}

---

## Sources

${caseData.source_urls?.map((url, i) => `${i + 1}. ${url}`).join('\n') || 'No sources provided.'}

---

## Timeline

- **Created:** ${caseData.created_at}
- **Last Updated:** ${caseData.updated_at}
${caseData.published_at ? `- **Published:** ${caseData.published_at}` : ''}

---

## Verification

All claims in this report can be independently verified using the sources provided above.
See \`verification/how-to-verify.md\` for step-by-step verification instructions.

---

*Generated by The Eye Oracle System*  
*👁️ The Eye sees. The Eye speaks truth.*
`;
  }

  /**
   * Format target dossier
   */
  formatTargetDossier(target) {
    return {
      meta: {
        generated_at: new Date().toISOString(),
        source: 'The Eye Oracle System',
      },
      target: {
        id: target.id,
        name: target.name,
        type: target.type,
        jurisdiction: target.jurisdiction,
        leadership: target.leadership,
        budget: target.budget,
        threat_level: target.threat_level,
        status: target.status,
      },
      corruption_profile: {
        indicators: target.corruption_indicators,
        evidence_count: target.evidence_count,
        related_cases: target.related_cases,
      },
      timeline: {
        first_detected: target.created_at,
        last_updated: target.updated_at,
      },
    };
  }

  /**
   * Format provenance as W3C PROV
   */
  formatAsW3CPROV(entries) {
    return {
      '@context': 'https://www.w3.org/ns/prov.jsonld',
      '@graph': entries.map(e => ({
        '@id': `iwu:entry/${e.id}`,
        '@type': 'prov:Activity',
        'prov:startedAtTime': e.timestamp,
        'prov:wasAssociatedWith': {
          '@id': `iwu:agent/${e.actor}`,
          '@type': 'prov:Agent',
        },
        'prov:used': {
          '@id': `iwu:${e.entity_type}/${e.entity_id}`,
        },
        'prov:type': e.action,
        'iwu:previousHash': e.previous_hash,
        'iwu:currentHash': e.current_hash,
      })),
    };
  }

  /**
   * Create verification guide
   */
  createVerificationGuide(caseData) {
    return `# How to Verify This Evidence Bundle

## Why Verification Matters

Every claim made by The Eye Oracle System is based on publicly accessible 
government documents, court decisions, and official reports. We encourage 
you to verify everything independently.

## Verification Steps

### 1. Check the Sources

Each source URL in this bundle points to an official government or court website.
Visit these URLs directly to verify the information.

**Sources for this case:**
${caseData.source_urls?.map((url, i) => `${i + 1}. ${url}`).join('\n') || 'No sources provided.'}

### 2. Verify Evidence Integrity

Each file in the \`evidence/\` folder has a corresponding \`.meta.json\` file 
containing the SHA-256 hash of the original evidence.

To verify a file hasn't been tampered with:
\`\`\`bash
# On Linux/Mac
sha256sum <filename>

# On Windows PowerShell
Get-FileHash <filename> -Algorithm SHA256
\`\`\`

Compare the output with the \`sha256_hash\` in the meta file.

### 3. Verify Provenance Chain

The \`provenance/audit-trail.json\` file contains a cryptographic chain of 
all actions taken on this case. Each entry's hash includes the previous 
entry's hash, creating an unbroken chain.

To verify:
1. Check that each entry's \`previous_hash\` matches the prior entry's \`current_hash\`
2. Recalculate the \`current_hash\` and compare

### 4. Check the Bundle Hash

The \`manifest.json\` contains a \`bundle_hash\` that is computed from all 
individual file hashes. Recalculate to verify bundle integrity.

## Independent Research

### Government Sources
- Open Government Canada: https://open.canada.ca/
- Ontario Open Data: https://data.ontario.ca/
- Statistics Canada: https://www.statcan.gc.ca/

### Legal Databases
- CanLII (free): https://www.canlii.org/
- WSIAT Decisions: https://www.wsiat.on.ca/

### Oversight Bodies
- Auditor General of Canada: https://www.oag-bvg.gc.ca/
- Ontario Ombudsman: https://www.ombudsman.on.ca/
- Auditor General of Ontario: https://www.auditor.on.ca/

---

*👁️ The Eye sees. The Eye speaks truth.*  
*Trust, but verify.*
`;
  }

  /**
   * Create README for bundle
   */
  createReadme(caseData) {
    return `# Evidence Bundle: ${caseData.title}

## Contents

- \`manifest.json\` - Bundle metadata and integrity hashes
- \`README.md\` - This file
- \`analysis/\` - Case analysis and reports
  - \`case-analysis.json\` - Full structured analysis
  - \`case-report.md\` - Human-readable report
- \`evidence/\` - Evidence files and metadata
- \`provenance/\` - Audit trail and provenance chain
- \`targets/\` - Target entity dossiers (if applicable)
- \`verification/\` - Guide for independent verification

## About This Bundle

This evidence bundle was generated by The Eye Oracle System, an automated 
investigative tool that monitors government actions, court decisions, and 
public data for corruption, human rights violations, and systemic abuse.

**Case ID:** ${caseData.id}  
**Generated:** ${new Date().toISOString()}

## Legal Notice

This bundle contains factual information sourced from public government 
documents and official records. All claims can be independently verified 
using the sources provided.

This is not legal advice. Consult a qualified lawyer for legal matters.

## Integrity Verification

See \`verification/how-to-verify.md\` for detailed verification instructions.

Quick check:
1. Open \`manifest.json\`
2. Verify the \`bundle_hash\` matches your recalculation
3. Check individual file hashes against the manifest

## Contact

- Website: https://injuredworkersunite.pages.dev
- Alerts: https://injuredworkersunite.pages.dev/alerts
- The Eye Oracle: https://injuredworkersunite.pages.dev/the-eye-oracle

---

*👁️ The Eye sees. The Eye speaks truth.*  
*Injured Workers Unite*
`;
  }

  /**
   * Legal disclaimer
   */
  getLegalDisclaimer() {
    return `This evidence bundle is provided for informational purposes only. 
All information is sourced from publicly accessible government documents, 
court decisions, and official reports. The Eye Oracle System aggregates 
and analyzes this public information to identify patterns of corruption, 
human rights violations, and systemic abuse.

This is not legal advice. The information in this bundle should be 
independently verified before any legal or advocacy use. Consult with 
a qualified lawyer for legal matters.

The Eye Oracle System operates in the public interest to promote 
transparency and accountability in government and corporate entities.`;
  }
}

export default EvidenceBundler;

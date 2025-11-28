# The Eye / Oracle Architecture Review and Implementation Plan

## Executive Summary

This document provides a comprehensive analysis of the current "The Eye / Oracle" system implementation and a detailed plan to transform it into the fully automated, auditable, real-time investigative system specified in the project requirements.

---

## Part 1: Current Architecture Analysis

### 1.1 What Exists Today

#### Frontend Pages (Next.js/React)

| Page | Purpose | Current State |
|------|---------|---------------|
| `pages/the-eye.js` | Main Eye v2.0 interface | ✅ Complete - 3131 lines, monitoring dashboard, category filtering, insights display |
| `pages/eye-oracle.js` | Daily investigative reports | ✅ Complete - Loads from JSON, blog-style display |
| `pages/automated-monitoring.js` | 24/7 monitoring control panel | ✅ Complete - Master toggle, source display, simulated alerts |
| `pages/alerts.js` | Real-time alert display | ✅ Complete - Severity filtering, verification sources |
| `pages/target-acquisition.js` | Target dossier system | ✅ Complete - 35+ action packages, evidence documentation |
| `pages/legislative-tracking.js` | Bill monitoring | ✅ Complete - Multi-level government tracking |

#### Backend Utilities

| Utility | Purpose | Current State |
|---------|---------|---------------|
| `utils/automation-engine.js` | Core automation coordinator | ⚠️ Partial - Uses localStorage, no real API calls |
| `utils/the-eye-v2-processor.js` | Document analysis engine | ⚠️ Partial - Pattern matching only, no ML |
| `utils/source-connectors.js` | Data ingestion layer | ❌ Placeholder - Documented endpoints but no real fetching |
| `utils/real-data-generator.js` | Real case database | ✅ Complete - 45+ documented real cases with sources |

#### Scripts

| Script | Purpose | Current State |
|--------|---------|---------------|
| `scripts/generate-eye-oracle-daily.js` | Daily blog generator | ✅ Works - Deterministic rotation through cases |
| `scripts/monitoring/wsib.js` | WSIB policy monitoring | ⚠️ Basic - Web scraping, needs error handling |
| `scripts/monitoring/*.js` | Other monitors | ⚠️ Placeholder templates |

### 1.2 Architecture Gaps

Based on the specification requirements, here are the critical gaps:

#### ❌ GAP 1: No Persistent Database
- **Current**: localStorage (browser-only, ephemeral)
- **Required**: PostgreSQL/Elasticsearch for cases, alerts, targets
- **Impact**: Data lost on browser clear, no multi-user support, no audit trail

#### ❌ GAP 2: No Object Storage
- **Current**: No file storage
- **Required**: S3-compatible storage for evidence packages (PDFs, screenshots, documents)
- **Impact**: Cannot store evidence files, no downloadable bundles

#### ❌ GAP 3: Placeholder API Connectors
- **Current**: `source-connectors.js` has documented endpoints but returns mock data
- **Required**: Real API calls to Open Government, CanLII, FOI portals, media APIs
- **Impact**: No automatic ingestion of new data

#### ❌ GAP 4: No Immutable Evidence Chain
- **Current**: None
- **Required**: SHA-256 hashing, optional signing, W3C PROV provenance
- **Impact**: Cannot prove evidence authenticity in legal/court proceedings

#### ❌ GAP 5: No Human Review Workflow
- **Current**: Auto-publish (scripts write directly to JSON)
- **Required**: Admin dashboard with DRAFT → UNDER_REVIEW → APPROVED → PUBLISHED states
- **Impact**: Risk of publishing unverified content

#### ❌ GAP 6: No Alert Delivery System
- **Current**: Displayed in UI only
- **Required**: Email, webhook, Telegram Bot notifications
- **Impact**: Users must constantly check the site

#### ❌ GAP 7: No Public API
- **Current**: None
- **Required**: REST/GraphQL API for querying cases, alerts, targets
- **Impact**: No integration with external tools or advocacy groups

#### ❌ GAP 8: No OCR/PDF Processing
- **Current**: None
- **Required**: PDF parsing, OCR for scanned documents
- **Impact**: Cannot ingest most government PDFs

#### ❌ GAP 9: Pattern Matching vs ML
- **Current**: Keyword/regex pattern matching for violation detection
- **Required**: (Phase 2) Local ML models for better detection
- **Impact**: May miss nuanced violations, false positives

#### ❌ GAP 10: No Receipt Bundles
- **Current**: None
- **Required**: Downloadable evidence packages with hash manifests
- **Impact**: Cannot provide court-ready evidence bundles

---

## Part 2: Implementation Plan

### Phase 1: MVP Foundation (Weeks 1-4)

#### 2.1 Database Layer

```
Priority: CRITICAL
Effort: 1 week
```

**Implementation:**

1. **Set up PostgreSQL database** with the following schema:

```sql
-- Core tables
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'UNDER_REVIEW', 'APPROVED', 'PUBLISHED', 'RETRACTED')),
  category TEXT NOT NULL,
  scope TEXT NOT NULL CHECK (scope IN ('local', 'provincial', 'federal')),
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  summary TEXT,
  full_analysis JSONB,
  source_urls TEXT[],
  charter_violations TEXT[],
  uncrpd_violations TEXT[],
  affected_count TEXT,
  financial_impact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  created_by TEXT,
  approved_by TEXT
);

CREATE TABLE evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  storage_path TEXT NOT NULL,
  sha256_hash TEXT NOT NULL,
  captured_at TIMESTAMPTZ NOT NULL,
  source_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id),
  title TEXT NOT NULL,
  message TEXT,
  severity TEXT NOT NULL,
  category TEXT NOT NULL,
  scope TEXT NOT NULL,
  source TEXT,
  source_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  delivered_via TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ
);

CREATE TABLE targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  leadership TEXT,
  budget TEXT,
  corruption_indicators TEXT[],
  related_cases UUID[],
  evidence_count INTEGER DEFAULT 0,
  threat_level TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'active_monitoring',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE provenance_chain (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  actor TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  previous_hash TEXT,
  current_hash TEXT NOT NULL,
  metadata JSONB
);

-- Indexes
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_category ON cases(category);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_targets_threat_level ON targets(threat_level);
CREATE INDEX idx_provenance_entity ON provenance_chain(entity_type, entity_id);
```

2. **Create API routes** in `pages/api/`:

```
pages/api/
  cases/
    index.js          - GET (list), POST (create)
    [id].js           - GET, PUT, DELETE
    [id]/approve.js   - POST (workflow)
    [id]/publish.js   - POST (workflow)
  alerts/
    index.js
    [id].js
  targets/
    index.js
    [id].js
  evidence/
    index.js
    upload.js
    [id]/download.js
  search.js           - Full-text search
```

3. **Database client** (`utils/db.js`):

```javascript
// Use @vercel/postgres or pg library
import { sql } from '@vercel/postgres';

export async function createCase(caseData) {
  const result = await sql`
    INSERT INTO cases (title, category, scope, severity, summary, source_urls)
    VALUES (${caseData.title}, ${caseData.category}, ${caseData.scope}, 
            ${caseData.severity}, ${caseData.summary}, ${caseData.sourceUrls})
    RETURNING *
  `;
  await addProvenanceEntry('case', result.rows[0].id, 'CREATED', caseData.createdBy);
  return result.rows[0];
}
```

#### 2.2 Object Storage

```
Priority: CRITICAL
Effort: 3 days
```

**Implementation:**

1. **Set up Cloudflare R2** (S3-compatible, free tier available):

```javascript
// utils/storage.js
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function storeEvidence(file, caseId) {
  const buffer = await file.arrayBuffer();
  const hash = crypto.createHash('sha256').update(Buffer.from(buffer)).digest('hex');
  
  const key = `evidence/${caseId}/${hash}-${file.name}`;
  
  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: file.type,
    Metadata: {
      'original-name': file.name,
      'sha256': hash,
      'case-id': caseId,
      'captured-at': new Date().toISOString(),
    },
  }));
  
  return { path: key, hash, size: buffer.byteLength };
}
```

2. **Evidence bundler** (`utils/evidence-bundler.js`):

```javascript
import JSZip from 'jszip';

export async function createEvidenceBundle(caseId) {
  const zip = new JSZip();
  
  // Get case and evidence from database
  const caseData = await getCase(caseId);
  const evidence = await getEvidenceForCase(caseId);
  
  // Add manifest
  const manifest = {
    caseId,
    title: caseData.title,
    generatedAt: new Date().toISOString(),
    files: [],
    integrityHash: null,
  };
  
  // Add each evidence file
  for (const item of evidence) {
    const file = await downloadFromStorage(item.storage_path);
    zip.file(`evidence/${item.file_name}`, file);
    manifest.files.push({
      name: item.file_name,
      sha256: item.sha256_hash,
      capturedAt: item.captured_at,
      sourceUrl: item.source_url,
    });
  }
  
  // Add analysis report
  zip.file('analysis.json', JSON.stringify(caseData.full_analysis, null, 2));
  
  // Add provenance chain
  const provenance = await getProvenanceChain('case', caseId);
  zip.file('provenance.json', JSON.stringify(provenance, null, 2));
  
  // Calculate bundle hash
  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
  manifest.integrityHash = crypto.createHash('sha256').update(zipBuffer).digest('hex');
  
  // Re-add manifest with hash
  zip.file('manifest.json', JSON.stringify(manifest, null, 2));
  
  return zip.generateAsync({ type: 'nodebuffer' });
}
```

#### 2.3 Real Source Connectors

```
Priority: HIGH
Effort: 2 weeks
```

**Implementation for each source:**

```javascript
// utils/connectors/open-government.js
import fetch from 'node-fetch';

const CKAN_BASE = 'https://open.canada.ca/data/api/3';

export async function searchGovernmentData(query, options = {}) {
  const params = new URLSearchParams({
    q: query,
    rows: options.limit || 100,
    start: options.offset || 0,
    sort: 'metadata_modified desc',
  });
  
  const response = await fetch(`${CKAN_BASE}/action/package_search?${params}`);
  if (!response.ok) throw new Error(`CKAN API error: ${response.status}`);
  
  const data = await response.json();
  return data.result.results.map(dataset => ({
    id: dataset.id,
    title: dataset.title,
    description: dataset.notes,
    organization: dataset.organization?.title,
    lastModified: dataset.metadata_modified,
    resources: dataset.resources?.map(r => ({
      name: r.name,
      url: r.url,
      format: r.format,
      size: r.size,
    })),
    source: 'open.canada.ca',
    sourceUrl: `https://open.canada.ca/data/en/dataset/${dataset.id}`,
  }));
}

export async function monitorForUpdates(topics, since) {
  const results = [];
  for (const topic of topics) {
    const datasets = await searchGovernmentData(topic);
    const recent = datasets.filter(d => new Date(d.lastModified) > since);
    results.push(...recent);
  }
  return results;
}
```

```javascript
// utils/connectors/canlii.js
import * as cheerio from 'cheerio';

export async function searchCanLII(query, options = {}) {
  // CanLII doesn't have a public API, so we scrape search results
  const params = new URLSearchParams({
    searchUrlRecaptcha: query,
    origin1: options.court || '',
    startDate: options.startDate || '',
    endDate: options.endDate || '',
  });
  
  const response = await fetch(`https://www.canlii.org/en/search/search.do?${params}`);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const cases = [];
  $('.searchResult').each((i, el) => {
    cases.push({
      title: $(el).find('.title').text().trim(),
      citation: $(el).find('.citation').text().trim(),
      url: 'https://www.canlii.org' + $(el).find('a').attr('href'),
      excerpt: $(el).find('.excerpt').text().trim(),
      date: $(el).find('.date').text().trim(),
      court: $(el).find('.court').text().trim(),
    });
  });
  
  return cases;
}

export async function getCaseDocument(caseUrl) {
  const response = await fetch(caseUrl);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  return {
    title: $('h1').text().trim(),
    citation: $('.citation').text().trim(),
    fullText: $('.casecontent').text().trim(),
    metadata: {
      court: $('.court').text().trim(),
      date: $('.date').text().trim(),
      judges: $('.judges').text().trim(),
    },
  };
}
```

```javascript
// utils/connectors/legislature.js
import { XMLParser } from 'fast-xml-parser';

// Federal bills (LEGISinfo)
export async function getFederalBills(session = '44-1') {
  const response = await fetch(
    `https://www.parl.ca/LegisInfo/en/bills?parlSession=${session}&download=xml`
  );
  const xml = await response.text();
  const parser = new XMLParser();
  const data = parser.parse(xml);
  
  return data.Bills?.Bill?.map(bill => ({
    number: bill.BillNumber,
    title: bill.BillTitle,
    status: bill.StatusName,
    sponsor: bill.SponsorName,
    lastUpdated: bill.LatestEvent?.Date,
    url: `https://www.parl.ca/LegisInfo/en/bill/${session}/${bill.BillNumber}`,
    source: 'parl.ca',
  })) || [];
}

// Ontario bills
export async function getOntarioBills() {
  const response = await fetch(
    'https://www.ola.org/en/legislative-business/bills/current'
  );
  const html = await response.text();
  // Parse Ontario legislature HTML...
  return [];
}
```

#### 2.4 Cron-Based Ingestion Pipeline

```
Priority: HIGH
Effort: 1 week
```

**GitHub Actions workflow** (`.github/workflows/automated-ingestion.yml`):

```yaml
name: Automated Data Ingestion

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:        # Manual trigger

jobs:
  ingest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Government Data Monitor
        run: node scripts/monitoring/government-data.js
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          R2_ENDPOINT: ${{ secrets.R2_ENDPOINT }}
          R2_ACCESS_KEY_ID: ${{ secrets.R2_ACCESS_KEY_ID }}
          R2_SECRET_ACCESS_KEY: ${{ secrets.R2_SECRET_ACCESS_KEY }}
      
      - name: Run Legislative Monitor
        run: node scripts/monitoring/legislature.js
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      - name: Run WSIB Monitor
        run: node scripts/monitoring/wsib.js
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      - name: Run CanLII Monitor
        run: node scripts/monitoring/canlii.js
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      - name: Run Analysis Pipeline
        run: node scripts/run-analysis-pipeline.js
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      - name: Send Alert Summary
        if: success()
        run: node scripts/send-alert-summary.js
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
```

#### 2.5 Enhanced Document Processor

```
Priority: HIGH
Effort: 1 week
```

Enhance `the-eye-v2-processor.js` with:

```javascript
// Add PDF parsing
import pdf from 'pdf-parse';
import Tesseract from 'tesseract.js';

export async function processDocument(input) {
  let text = '';
  let metadata = {};
  
  // Handle different input types
  if (input.type === 'pdf') {
    const pdfData = await pdf(input.buffer);
    text = pdfData.text;
    metadata = pdfData.info;
    
    // If text is empty, try OCR
    if (text.trim().length < 100) {
      text = await performOCR(input.buffer);
    }
  } else if (input.type === 'image') {
    text = await performOCR(input.buffer);
  } else {
    text = input.content || input.text || '';
  }
  
  // Run through existing analysis pipeline
  const analysis = analyzeText(text);
  
  // Add provenance
  analysis.provenance = {
    inputHash: crypto.createHash('sha256').update(text).digest('hex'),
    processedAt: new Date().toISOString(),
    processorVersion: '2.1.0',
  };
  
  return analysis;
}

async function performOCR(imageBuffer) {
  const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');
  return text;
}
```

#### 2.6 Admin Dashboard

```
Priority: HIGH
Effort: 1 week
```

Create `pages/admin/index.js`:

```javascript
// Admin dashboard for case review workflow
export default function AdminDashboard() {
  const [cases, setCases] = useState([]);
  const [filter, setFilter] = useState('DRAFT');
  
  // Fetch cases by status
  useEffect(() => {
    fetch(`/api/cases?status=${filter}`)
      .then(res => res.json())
      .then(setCases);
  }, [filter]);
  
  const handleApprove = async (caseId) => {
    await fetch(`/api/cases/${caseId}/approve`, { method: 'POST' });
    // Refresh list
  };
  
  const handlePublish = async (caseId) => {
    await fetch(`/api/cases/${caseId}/publish`, { method: 'POST' });
    // This will trigger evidence bundle generation and provenance logging
  };
  
  return (
    <div>
      <h1>Case Review Dashboard</h1>
      
      <div className="workflow-tabs">
        {['DRAFT', 'UNDER_REVIEW', 'APPROVED', 'PUBLISHED'].map(status => (
          <button 
            key={status}
            onClick={() => setFilter(status)}
            className={filter === status ? 'active' : ''}
          >
            {status}
          </button>
        ))}
      </div>
      
      <div className="cases-list">
        {cases.map(caseItem => (
          <CaseCard 
            key={caseItem.id} 
            case={caseItem}
            onApprove={handleApprove}
            onPublish={handlePublish}
          />
        ))}
      </div>
    </div>
  );
}
```

#### 2.7 Alert Delivery System

```
Priority: MEDIUM
Effort: 3 days
```

```javascript
// utils/alert-delivery.js
import { Telegraf } from 'telegraf';
import nodemailer from 'nodemailer';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

export async function deliverAlert(alert, channels) {
  const results = [];
  
  for (const channel of channels) {
    try {
      switch (channel.type) {
        case 'telegram':
          await deliverTelegram(alert, channel.chatId);
          results.push({ channel: 'telegram', success: true });
          break;
          
        case 'email':
          await deliverEmail(alert, channel.recipients);
          results.push({ channel: 'email', success: true });
          break;
          
        case 'webhook':
          await deliverWebhook(alert, channel.url);
          results.push({ channel: 'webhook', success: true });
          break;
      }
    } catch (error) {
      results.push({ channel: channel.type, success: false, error: error.message });
    }
  }
  
  // Update alert record with delivery status
  await updateAlertDeliveryStatus(alert.id, results);
  
  return results;
}

async function deliverTelegram(alert, chatId) {
  const emoji = {
    critical: '🚨',
    high: '🔴',
    medium: '🟠',
    low: '🟡',
  }[alert.severity];
  
  const message = `
${emoji} *${alert.title}*

${alert.message}

📍 Scope: ${alert.scope}
📂 Category: ${alert.category}
🔗 Source: ${alert.source_url || 'Internal'}

👁️ The Eye sees. The Eye speaks truth.
  `.trim();
  
  await bot.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}
```

### Phase 2: Advanced Features (Weeks 5-8)

#### 2.8 W3C PROV Provenance Chain

```javascript
// utils/provenance.js
import crypto from 'crypto';

export async function addProvenanceEntry(entityType, entityId, action, actor, metadata = {}) {
  // Get previous entry for this entity
  const previousEntry = await getLatestProvenanceEntry(entityType, entityId);
  
  const entry = {
    entity_type: entityType,
    entity_id: entityId,
    action: action,
    actor: actor,
    timestamp: new Date().toISOString(),
    previous_hash: previousEntry?.current_hash || null,
    metadata: metadata,
  };
  
  // Calculate hash including previous hash for chain integrity
  const hashInput = JSON.stringify({
    ...entry,
    previous_hash: entry.previous_hash,
  });
  entry.current_hash = crypto.createHash('sha256').update(hashInput).digest('hex');
  
  await insertProvenanceEntry(entry);
  
  return entry;
}

export async function verifyProvenanceChain(entityType, entityId) {
  const entries = await getProvenanceChain(entityType, entityId);
  
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const previousEntry = i > 0 ? entries[i - 1] : null;
    
    // Verify previous hash link
    if (entry.previous_hash !== (previousEntry?.current_hash || null)) {
      return { valid: false, error: `Chain broken at entry ${i}` };
    }
    
    // Verify current hash
    const expectedHash = crypto.createHash('sha256')
      .update(JSON.stringify({
        entity_type: entry.entity_type,
        entity_id: entry.entity_id,
        action: entry.action,
        actor: entry.actor,
        timestamp: entry.timestamp,
        previous_hash: entry.previous_hash,
        metadata: entry.metadata,
      }))
      .digest('hex');
    
    if (entry.current_hash !== expectedHash) {
      return { valid: false, error: `Hash mismatch at entry ${i}` };
    }
  }
  
  return { valid: true, entries: entries.length };
}

export function exportAsW3CPROV(entries) {
  return {
    '@context': 'https://www.w3.org/ns/prov.jsonld',
    'entity': entries.map(e => ({
      '@id': `iwu:${e.entity_type}/${e.entity_id}`,
      'prov:generatedAtTime': e.timestamp,
    })),
    'activity': entries.map(e => ({
      '@id': `iwu:activity/${e.id}`,
      'prov:type': e.action,
      'prov:startedAtTime': e.timestamp,
      'prov:wasAssociatedWith': e.actor ? `iwu:agent/${e.actor}` : undefined,
    })),
  };
}
```

#### 2.9 Public API

```javascript
// pages/api/v1/cases.js
export default async function handler(req, res) {
  // CORS headers for public API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { 
    status = 'PUBLISHED',
    category,
    scope,
    severity,
    limit = 50,
    offset = 0,
  } = req.query;
  
  // Only allow access to published cases via public API
  if (status !== 'PUBLISHED') {
    return res.status(403).json({ error: 'Only published cases are accessible' });
  }
  
  const cases = await queryCases({
    status: 'PUBLISHED',
    category,
    scope,
    severity,
    limit: Math.min(parseInt(limit), 100),
    offset: parseInt(offset),
  });
  
  return res.json({
    data: cases,
    pagination: {
      limit,
      offset,
      total: await getCasesCount({ status: 'PUBLISHED', category, scope, severity }),
    },
  });
}
```

#### 2.10 ML-Enhanced Analysis (Future)

```javascript
// utils/ml-analyzer.js (Phase 2+)
// Using Hugging Face Transformers.js for local inference

import { pipeline } from '@xenova/transformers';

let classifier = null;

export async function initializeClassifier() {
  if (!classifier) {
    classifier = await pipeline('zero-shot-classification', 'Xenova/mobilebert-uncased-mnli');
  }
  return classifier;
}

export async function classifyViolationType(text) {
  const classifier = await initializeClassifier();
  
  const labels = [
    'Charter Section 7 violation (life, liberty, security)',
    'Charter Section 15 violation (equality, discrimination)',
    'Charter Section 2 violation (fundamental freedoms)',
    'UNCRPD violation (disability rights)',
    'Corruption or fraud',
    'Systemic discrimination',
    'Administrative misconduct',
    'No violation detected',
  ];
  
  const result = await classifier(text, labels, { multi_label: true });
  
  return result.labels
    .filter((_, i) => result.scores[i] > 0.5)
    .map((label, i) => ({
      violation: label,
      confidence: result.scores[result.labels.indexOf(label)],
    }));
}
```

---

## Part 3: File Structure (Post-Implementation)

```
project/
├── pages/
│   ├── api/
│   │   ├── v1/                    # Public API
│   │   │   ├── cases.js
│   │   │   ├── alerts.js
│   │   │   └── targets.js
│   │   ├── cases/                 # Internal API
│   │   │   ├── index.js
│   │   │   ├── [id].js
│   │   │   ├── [id]/approve.js
│   │   │   ├── [id]/publish.js
│   │   │   └── [id]/evidence.js
│   │   ├── alerts/
│   │   ├── targets/
│   │   ├── evidence/
│   │   │   ├── upload.js
│   │   │   └── [id]/download.js
│   │   └── webhooks/
│   │       └── telegram.js
│   ├── admin/
│   │   ├── index.js               # Dashboard
│   │   ├── cases/[id].js          # Case review
│   │   └── settings.js            # Alert config
│   └── ... (existing pages)
├── utils/
│   ├── db.js                      # Database client
│   ├── storage.js                 # R2/S3 client
│   ├── provenance.js              # W3C PROV chain
│   ├── evidence-bundler.js        # ZIP generation
│   ├── alert-delivery.js          # Multi-channel alerts
│   ├── connectors/
│   │   ├── open-government.js
│   │   ├── canlii.js
│   │   ├── legislature.js
│   │   ├── media.js
│   │   └── index.js               # Unified connector
│   └── ... (existing utils)
├── scripts/
│   ├── monitoring/
│   │   ├── government-data.js
│   │   ├── legislature.js
│   │   ├── canlii.js
│   │   └── wsib.js
│   ├── run-analysis-pipeline.js
│   └── send-alert-summary.js
├── .github/
│   └── workflows/
│       ├── automated-ingestion.yml
│       └── deploy.yml
└── prisma/                        # If using Prisma ORM
    └── schema.prisma
```

---

## Part 4: Technology Stack

### Current Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Hosting**: Cloudflare Pages
- **Storage**: None (localStorage only)

### Recommended Additions

| Component | Technology | Reason | Free Tier |
|-----------|------------|--------|-----------|
| Database | Neon PostgreSQL or Supabase | Serverless, scales with Cloudflare | Yes |
| Object Storage | Cloudflare R2 | Native integration, S3-compatible | 10GB free |
| Cron Jobs | GitHub Actions | Already using for deployment | 2000 min/month |
| PDF Parsing | pdf-parse (npm) | Lightweight, no external service | Open source |
| OCR | Tesseract.js | Browser/Node.js compatible | Open source |
| Alerts | Telegram Bot API | Free, no rate limits | Free |
| Search | PostgreSQL FTS or Elasticsearch | Full-text search | Built-in |

---

## Part 5: Security Considerations

### Data Protection
- [ ] Environment variables for all API keys
- [ ] Admin routes behind authentication
- [ ] Rate limiting on public API
- [ ] Input sanitization for user uploads
- [ ] CORS restrictions on admin endpoints

### Evidence Integrity
- [ ] SHA-256 hash on all evidence files
- [ ] Provenance chain for audit trail
- [ ] No modification of published evidence
- [ ] Backup evidence to multiple locations

### Access Control
- [ ] Role-based access (Admin, Reviewer, Public)
- [ ] Audit log for all admin actions
- [ ] Two-factor for publishing approval

---

## Part 6: Implementation Timeline

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1 | Database & API | PostgreSQL schema, CRUD APIs, migration from localStorage |
| 2 | Storage & Evidence | R2 integration, evidence upload, bundle generation |
| 3 | Real Connectors | Open Government, CanLII, Legislature APIs working |
| 4 | Ingestion Pipeline | GitHub Actions cron, automated scanning |
| 5 | Admin Dashboard | Review workflow, approval system |
| 6 | Alert System | Telegram, email, webhook delivery |
| 7 | Provenance & Bundles | W3C PROV, downloadable evidence packages |
| 8 | Testing & Polish | End-to-end testing, documentation |

---

## Part 7: Immediate Next Steps

1. **Choose database provider** (Neon, Supabase, or PlanetScale)
2. **Set up R2 bucket** for evidence storage
3. **Create database schema** and run migrations
4. **Migrate existing real-data-generator.js cases** to database
5. **Build first real connector** (Open Government Canada)
6. **Set up Telegram bot** for alert delivery

---

## Appendix A: Current Code Strengths

✅ **Real Case Database**: `real-data-generator.js` contains 45+ documented, sourced cases  
✅ **Pattern Matching Engine**: `the-eye-v2-processor.js` has comprehensive violation patterns  
✅ **Category System**: 20 categories with Charter/UNCRPD mapping  
✅ **Target System**: Well-structured entity tracking with corruption indicators  
✅ **Action Packages**: 35+ pre-built advocacy action packages  
✅ **UI/UX**: Clean, functional interface with proper filtering  

## Appendix B: Critical Path Items

🔴 **Must Have for MVP**:
1. Database (no more localStorage)
2. Evidence storage (files must persist)
3. At least 2 real connectors working
4. Human review before publish

🟡 **Should Have**:
1. Telegram alerts
2. Evidence bundles
3. Provenance chain

🟢 **Nice to Have**:
1. Public API
2. ML-enhanced analysis
3. Email delivery

---

*Document prepared: Analysis complete*
*The Eye sees. The Eye speaks truth.*

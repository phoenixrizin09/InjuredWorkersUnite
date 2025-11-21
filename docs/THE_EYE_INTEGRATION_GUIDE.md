# THE EYE - Complete Integration Guide

## System Overview

**The Eye** is an evidence-first investigative AI that processes documents, extracts structured claims, verifies against authoritative sources, and produces actionable JSON intelligence reports.

### What It Does

1. **Ingests** any document: news articles, FOI responses, reports, social media, leaked documents
2. **Extracts** structured data: entities, relationships, allegations, financial details
3. **Verifies** claims against authoritative sources: government databases, court records, official reports
4. **Scores** credibility and risk based on corroboration strength
5. **Generates** action plans: FOI requests, oversight complaints, media packages
6. **Outputs** pure JSON for integration with other systems

### Components Created

```
utils/
  ├── the-eye-processor.js        # Core evidence processing engine
  ├── source-connectors.js         # Data source integrations
  └── automation-engine.js         # Existing: cross-system coordination

pages/
  ├── the-eye.js                   # Existing: Main interface
  ├── automated-monitoring.js      # Existing: 24/7 surveillance
  ├── target-acquisition.js        # Existing: Target dossiers
  └── eye-demo.js                  # NEW: Live demo page

scripts/monitoring/
  ├── wsib.js                      # WSIB policy scraper
  ├── corporate.js                 # Corporate filing monitor
  ├── lobbyists.js                 # Lobbyist registry tracker
  ├── legislature.js               # Legislative monitoring
  └── federal-bills.js             # Federal bill tracking
```

---

## Quick Start

### 1. Process a Single Document

```javascript
import { processDocument, applySafetyChecks } from '../utils/the-eye-processor.js';

const result = await processDocument({
  raw_text: "Your document text here...",
  fetch_date: new Date().toISOString(),
  source_type: "news", // news | FOI | report | social | official
  raw_metadata: {
    title: "Optional: Article Title",
    author: "Optional: Author Name"
  }
});

// Apply safety checks
const safeResult = applySafetyChecks(result);

console.log(JSON.stringify(safeResult, null, 2));
```

### 2. Start Automated Monitoring

```javascript
import { sourceMonitor } from '../utils/source-connectors.js';

// Monitor specific keywords across all sources
await sourceMonitor.startMonitoring({
  keywords: ['WSIB', 'ODSP', 'claim denial', 'mental health'],
  sources: ['all'] // or ['openGov', 'foi', 'media', 'legal', 'social']
});

// Listen for new data
if (typeof window !== 'undefined') {
  window.addEventListener('source-data', (event) => {
    console.log('New data from', event.detail.source);
    
    // Auto-process with The Eye
    processDocument({
      raw_text: JSON.stringify(event.detail.data),
      source_type: event.detail.source,
      fetch_date: new Date(event.detail.timestamp).toISOString()
    }).then(result => {
      // Handle intelligence report
      if (result.risk_score >= 70) {
        // Critical finding - trigger alerts
        console.log('CRITICAL:', result.title);
      }
    });
  });
}

// Stop monitoring when done
sourceMonitor.stopMonitoring();
```

### 3. Search All Sources At Once

```javascript
import { sourceMonitor } from '../utils/source-connectors.js';

const results = await sourceMonitor.searchAll(['WSIB', 'claim denial']);

console.log(results);
// {
//   keywords: ['WSIB', 'claim denial'],
//   results: {
//     openGov: { datasets: [...] },
//     foi: { completed_requests: [...] },
//     oversight: { reports: [...] },
//     legal: { cases: [...] },
//     media: { articles: [...] },
//     social: { posts: [...] }
//   }
// }
```

---

## Output Format (JSON)

### Complete Structure

```json
{
  "id": "eye_1732234567_abc123",
  "title": "Document Title",
  "date": "2024-11-21",
  "publication_date": "2024-11-20",
  "jurisdiction": {
    "location": "Ontario",
    "level": "province"
  },
  "source_url": "https://example.com/article",
  "source_type": "news",
  "fetch_date": "2024-11-21T12:00:00Z",
  
  "metadata": {
    "title": "Full Title",
    "author": "Author Name",
    "word_count": 1500,
    "language": "en"
  },
  
  "entities": {
    "people": [
      {
        "full_name": "Sarah Mitchell",
        "role": "paramedic",
        "context": "injured worker with PTSD"
      }
    ],
    "organizations": [
      {
        "name": "WSIB",
        "type": "workers_comp",
        "context": "Workplace Safety Insurance Board"
      }
    ],
    "money": [
      {
        "amount": "4.2",
        "scale": "billion",
        "context": "WSIB surplus"
      }
    ],
    "dates": [
      {
        "date": "2020",
        "context": "baseline year"
      }
    ]
  },
  
  "relationships": [
    {
      "type": "employment",
      "from": "Sarah Mitchell",
      "to": "Paramedic Services",
      "confidence": "high",
      "evidence": "worked as a paramedic for 15 years"
    }
  ],
  
  "claims": [
    {
      "claim_text": "WSIB increased denials by 31% since 2020",
      "claim_type": "denial",
      "alleged_actor": "WSIB",
      "alleged_victim": "injured workers",
      "date_of_event": "2020-2024",
      "supporting_evidence": {
        "quote": "according to organization's own annual reports",
        "source_snippet": "Full context around claim"
      },
      "evidence_strength": "High"
    }
  ],
  
  "corroboration": [
    {
      "claim": "Text of claim being checked",
      "claim_type": "denial",
      "corroborating_sources": [
        {
          "source": "WSIB Annual Reports",
          "url": "https://www.wsib.ca/en/annualreport",
          "snippet": "Excerpt corroborating claim",
          "confidence": "high",
          "last_checked": "2024-11-21T12:00:00Z"
        }
      ],
      "corroboration_level": "strong",
      "needs_further_investigation": false
    }
  ],
  
  "risk_score": 85,
  "risk_explanation": "3 critical allegations; Financial amounts involved; 2 strongly corroborated claims",
  "priority": "CRITICAL",
  
  "suggested_actions": [
    {
      "action_type": "foi_request",
      "description": "File Freedom of Information request",
      "template": {
        "subject": "FOI Request - WSIB",
        "request_body": "Detailed request text...",
        "estimated_cost": "$0-$25",
        "response_deadline": "30 days"
      },
      "target": "WSIB Freedom of Information Office",
      "priority": "immediate"
    },
    {
      "action_type": "notify_oversight",
      "description": "Submit to Ombudsman/Auditor General",
      "parties_to_notify": [
        {
          "name": "Ontario Ombudsman",
          "url": "https://www.ombudsman.on.ca/",
          "complaint_type": "Systemic investigation request"
        }
      ],
      "priority": "immediate"
    }
  ],
  
  "provenance": [
    {
      "source": "Original Document",
      "url": "input source",
      "snippet": "First 200 characters...",
      "fetch_date": "2024-11-21T12:00:00Z",
      "verification_method": "Direct ingestion"
    }
  ],
  
  "privacy_check": {
    "contains_personal_data": true,
    "requires_redaction": false,
    "redaction_notes": []
  },
  
  "legal_check": {
    "potentially_privileged": false,
    "requires_lawyer_review": true,
    "lawyer_review_reason": "High-risk allegations"
  },
  
  "explainability": {
    "strongest_evidence": [
      {
        "claim": "Claim text...",
        "sources": [
          {
            "name": "Source name",
            "url": "https://...",
            "quote": "Corroborating quote..."
          }
        ]
      }
    ],
    "last_checked": "2024-11-21T12:00:00Z",
    "methodology": "Evidence-first investigative analysis"
  },
  
  "processing_time_ms": 2347,
  "processed_at": "2024-11-21T12:00:00Z",
  "version": "1.0.0"
}
```

---

## Data Sources

### Current Integrations

#### 1. Open Government Data
- **Federal**: `https://open.canada.ca/data/api/3/action`
- **Ontario**: `https://data.ontario.ca/api/3/action`
- **Type**: API-based, public datasets
- **Refresh**: Daily
- **Authentication**: None required

#### 2. FOI Disclosure Pages
- **WSIB FOI**: `https://www.wsib.ca/en/freedom-information`
- **Ontario FOI**: `https://www.ontario.ca/page/freedom-information-requests`
- **Federal ATIP**: `https://open.canada.ca/en/search/ati`
- **Type**: Web scraping + API
- **Refresh**: Weekly
- **Authentication**: None for published responses

#### 3. Oversight Bodies
- **ON Auditor General**: `https://www.auditor.on.ca/` (RSS)
- **ON Ombudsman**: `https://www.ombudsman.on.ca/`
- **Federal AG**: `https://www.oag-bvg.gc.ca/` (RSS)
- **PSIC**: `https://psic-ispc.gc.ca/`
- **Type**: RSS + web scraping
- **Refresh**: Monthly
- **Authentication**: None

#### 4. Court/Tribunal Databases
- **CanLII**: `https://www.canlii.org/en/`
- **WSIAT**: `https://www.tribunalsontario.ca/wsiat/`
- **ON Superior Court**: CanLII Ontario division
- **Type**: API (requires registration)
- **Refresh**: Weekly
- **Authentication**: API key required for CanLII

**Get CanLII API Key**: https://www.canlii.org/en/info/api.html

#### 5. Media Sources
- **CBC News**: RSS feed
- **CTV News**: RSS feed
- **Globe & Mail**: RSS feed
- **Toronto Star**: RSS feed
- **Type**: RSS parsing
- **Refresh**: Every 6 hours
- **Authentication**: None

#### 6. Social Listening
- **Reddit**: JSON API (public)
- **Twitter/X**: API v2 (requires auth)
- **Facebook**: Graph API (requires auth)
- **Type**: API-based
- **Refresh**: Daily
- **Authentication**: Platform-specific

---

## Production Deployment

### Environment Variables

Create `.env.local`:

```bash
# API Keys (register for each)
CANLII_API_KEY=your_key_here
TWITTER_BEARER_TOKEN=your_token_here

# Optional: Rate limiting
MAX_REQUESTS_PER_MINUTE=60

# Storage (if using external DB)
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

### Dependencies to Install

```bash
npm install node-fetch cheerio rss-parser
```

Or for production with all features:

```bash
npm install node-fetch cheerio rss-parser redis ioredis pg
```

### Running Monitoring Scripts

```bash
# Run individual monitors
node scripts/monitoring/wsib.js
node scripts/monitoring/corporate.js
node scripts/monitoring/lobbyists.js

# Or set up cron jobs (Linux/Mac):
# Daily at 3am
0 3 * * * node /path/to/scripts/monitoring/wsib.js

# Weekly on Mondays at 4am
0 4 * * 1 node /path/to/scripts/monitoring/corporate.js
```

### Next.js Integration

The Eye components are already integrated into your Next.js site:

- `/the-eye` - Main interface
- `/automated-monitoring` - 24/7 surveillance dashboard
- `/target-acquisition` - Target dossiers
- `/eye-demo` - **NEW**: Live demo page

Access the demo at: **`http://localhost:3000/eye-demo`**

---

## Real Data Integration

### Upgrading from Mock to Real Data

Current code uses **mock data** for demonstration. To use **real data**:

#### 1. CanLII (Legal Database)

```javascript
// In source-connectors.js, LegalDatabaseConnector.searchCases()
async searchCases(tribunal, keywords) {
  const apiKey = process.env.CANLII_API_KEY;
  const url = `https://api.canlii.org/v1/caseBrowse/en/${tribunal.id}/?api_key=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return {
    tribunal: tribunal.name,
    cases: data.results.map(c => ({
      case_id: c.databaseId,
      title: c.title,
      date: c.decisionDate,
      full_text_url: c.url,
      citation: c.citation
    }))
  };
}
```

#### 2. Open Government API

```javascript
// In source-connectors.js, OpenGovernmentConnector.fetchDatasets()
async fetchDatasets(jurisdiction, keywords) {
  const baseUrl = this.baseUrls[jurisdiction];
  const searchUrl = `${baseUrl}/package_search?q=${keywords.join(' OR ')}&rows=20`;
  
  const response = await fetch(searchUrl);
  const data = await response.json();
  
  return {
    datasets: data.result.results.map(pkg => ({
      title: pkg.title,
      description: pkg.notes,
      url: pkg.url,
      resources: pkg.resources.map(r => ({
        format: r.format,
        download_url: r.url
      }))
    }))
  };
}
```

#### 3. Reddit Search

```javascript
// In source-connectors.js, SocialConnector.searchPosts()
async searchPosts(platform, keywords) {
  if (platform === 'Reddit') {
    const subreddits = ['ontario', 'canada', 'legaladvicecanada'];
    const posts = [];
    
    for (const sub of subreddits) {
      const url = `https://www.reddit.com/r/${sub}/search.json?q=${keywords.join(' ')}&limit=25&sort=new`;
      
      const response = await fetch(url, {
        headers: { 'User-Agent': 'InjuredWorkersUnite/1.0' }
      });
      const data = await response.json();
      
      posts.push(...data.data.children.map(post => ({
        id: post.data.id,
        title: post.data.title,
        author: post.data.author,
        subreddit: post.data.subreddit,
        url: `https://reddit.com${post.data.permalink}`,
        created: new Date(post.data.created_utc * 1000).toISOString(),
        score: post.data.score,
        comments: post.data.num_comments,
        text: post.data.selftext
      })));
    }
    
    return { posts };
  }
}
```

---

## Advanced Features

### 1. Batch Processing

```javascript
import { processDocument } from '../utils/the-eye-processor.js';

async function processBatch(documents) {
  const results = await Promise.all(
    documents.map(doc => processDocument(doc))
  );
  
  // Filter for high-risk findings
  const critical = results.filter(r => r.risk_score >= 70);
  
  return { total: results.length, critical: critical.length, results };
}
```

### 2. Continuous Monitoring Pipeline

```javascript
import { sourceMonitor } from '../utils/source-connectors.js';
import { processDocument } from '../utils/the-eye-processor.js';
import { automationEngine } from '../utils/automation-engine.js';

// Set up full automation
async function startTheEye() {
  // 1. Start source monitoring
  await sourceMonitor.startMonitoring({
    keywords: ['WSIB', 'ODSP', 'injured worker', 'claim denial'],
    sources: ['all']
  });
  
  // 2. Process incoming data
  window.addEventListener('source-data', async (event) => {
    const report = await processDocument({
      raw_text: JSON.stringify(event.detail.data),
      source_type: event.detail.source,
      fetch_date: new Date().toISOString()
    });
    
    // 3. Create alerts for critical findings
    if (report.risk_score >= 70) {
      automationEngine.createAlert({
        severity: 'critical',
        title: report.title,
        description: report.claims[0]?.claim_text,
        source: event.detail.source,
        action: report.suggested_actions[0]?.description
      });
    }
    
    // 4. Track targets mentioned
    report.entities.organizations.forEach(org => {
      if (org.type === 'workers_comp' || org.type === 'government') {
        automationEngine.trackTarget(org.name, report);
      }
    });
  });
  
  // 5. Activate automation engine
  automationEngine.activate();
  
  console.log('👁️ THE EYE IS NOW WATCHING...');
}
```

### 3. Export Intelligence Reports

```javascript
function exportReport(eyeResult, format = 'json') {
  if (format === 'json') {
    const blob = new Blob([JSON.stringify(eyeResult, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eye-report-${eyeResult.id}.json`;
    a.click();
  }
  
  if (format === 'pdf') {
    // Use jsPDF or similar
    // Generate formatted PDF with findings
  }
  
  if (format === 'markdown') {
    const md = generateMarkdownReport(eyeResult);
    const blob = new Blob([md], { type: 'text/markdown' });
    // Download...
  }
}

function generateMarkdownReport(result) {
  return `# Investigation Report: ${result.title}

**Risk Score**: ${result.risk_score}/100 (${result.priority})
**Date**: ${result.date}
**Source**: ${result.source_type}

## Key Findings

${result.claims.map((claim, i) => `
### ${i + 1}. ${claim.claim_type.toUpperCase()}

${claim.claim_text}

- **Actor**: ${claim.alleged_actor}
- **Evidence Strength**: ${claim.evidence_strength}
- **Quote**: "${claim.supporting_evidence.quote}"
`).join('\n')}

## Suggested Actions

${result.suggested_actions.map((action, i) => `
${i + 1}. **${action.action_type}**: ${action.description}
`).join('\n')}

## Provenance

${result.provenance.map(p => `- [${p.source}](${p.url})`).join('\n')}

---
*Generated by The Eye on ${result.processed_at}*
`;
}
```

---

## API Reference

### processDocument(input)

**Parameters**:
- `input.raw_text` (string): Document text
- `input.fetch_date` (ISO string): When document was obtained
- `input.source_type` (string): Type of source
- `input.raw_metadata` (object): Optional metadata

**Returns**: Promise<EyeReport>

### sourceMonitor.startMonitoring(config)

**Parameters**:
- `config.keywords` (string[]): Keywords to monitor
- `config.sources` (string[]): Which sources to monitor

**Returns**: Promise<number> (count of active monitors)

### sourceMonitor.searchAll(keywords)

**Parameters**:
- `keywords` (string[]): Search terms

**Returns**: Promise<SearchResults>

---

## Troubleshooting

### "Module not found" errors
```bash
npm install node-fetch cheerio
```

### API rate limits
- CanLII: 10,000 requests/month free tier
- Reddit: 60 requests/minute without auth
- Twitter: Requires paid API access

### CORS issues (browser)
- Use server-side fetching (Next.js API routes)
- Or set up a proxy

---

## Next Steps

1. **Get API Keys**:
   - CanLII: https://www.canlii.org/en/info/api.html
   - (Optional) Twitter: https://developer.twitter.com/

2. **Test the Demo**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/eye-demo
   ```

3. **Enable Real Data**:
   - Add API keys to `.env.local`
   - Uncomment real API calls in `source-connectors.js`

4. **Set Up Monitoring**:
   - Configure cron jobs for scripts
   - Or use Next.js scheduled functions

5. **Customize**:
   - Add your own data sources
   - Adjust risk scoring weights
   - Create custom alert triggers

---

## Support

For questions or issues:
- Check existing code comments
- Review sample outputs in `/eye-demo`
- Test with provided sample documents first

---

**The Eye sees all. The Eye forgets nothing. The Eye never sleeps.**

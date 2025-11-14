# 🔌 THE EYE - REAL DATA SOURCES & API INTEGRATION GUIDE

## **YES, THIS CAN ALL BE REAL!**

Every alert you see can be powered by **actual, publicly available data sources**. Here's exactly how to make The EYE truly automated.

---

## 📊 **CURRENTLY AVAILABLE PUBLIC DATA SOURCES**

### ✅ **100% REAL & ACCESSIBLE RIGHT NOW:**

### **1. Legislative Monitoring** 📜

| Source | URL | Update Frequency | API/Scraping |
|--------|-----|------------------|--------------|
| **Ontario Legislature Bills** | https://www.ola.org/en/legislative-business/bills | Daily | Scrapable HTML |
| **Parliament of Canada - LEGISinfo** | https://www.parl.ca/legisinfo/ | Real-time | JSON API Available |
| **Committee Hansards** | https://www.ola.org/en/legislative-business/committees | After meetings | PDF scraping |
| **Regulatory Registry** | https://www.ontariocanada.com/registry/ | Weekly | RSS feeds |
| **Federal Regulations** | https://canadagazette.gc.ca/ | Weekly | XML/PDF |

**How to Automate:**
```javascript
// Daily scraper for bill changes
- Use Puppeteer/Playwright to scrape bill pages
- Store full text in database
- Run git-style diff to detect changes
- Alert on new clauses that mention: "disability", "ODSP", "WSIB", "benefits"
```

---

### **2. Corporate Tracking** 🏢

| Source | URL | Update Frequency | API/Scraping |
|--------|-----|------------------|--------------|
| **SEDAR+ (Canadian Filings)** | https://www.sedarplus.ca/ | Immediate | API available (requires registration) |
| **SEC EDGAR (US Companies)** | https://www.sec.gov/edgar | Immediate | Free API |
| **Lobbying Registry (Federal)** | https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/guest | Monthly | Downloadable CSV |
| **Ontario Lobbyist Registry** | https://www.oico.on.ca/home/lobbyist-registry | Real-time | Searchable database |
| **Government Contracts** | https://www.tpsgc-pwgsc.gc.ca/app-acq/ofd-odo-eng.html | Daily | CSV downloads |

**Real APIs:**
```javascript
// SEC EDGAR API (FREE!)
https://www.sec.gov/cgi-bin/browse-edgar?company=manulife&action=getcompany

// SEDAR+ API
https://www.sedarplus.ca/csa-party/records/

// Automated monitoring:
- Check quarterly filings (10-Q, 10-K)
- Extract: claim reserves, litigation risks, executive compensation
- Alert when reserves drop (= more denials coming)
```

---

### **3. Financial Surveillance** 💰

| Source | URL | Update Frequency | API/Scraping |
|--------|-----|------------------|--------------|
| **CRA Charity Database (T3010)** | https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch | Annual | Downloadable files |
| **Elections Canada (Political $)** | https://www.elections.ca/content.aspx?section=fin&dir=oda | Quarterly | CSV downloads |
| **Ontario Political Donations** | https://finances.elections.on.ca/en/contributions | Quarterly | Searchable DB |
| **US FEC (Foreign influence)** | https://www.fec.gov/data/ | Real-time | Free API |

**Example - Fraser Institute Tracking:**
```javascript
// T3010 Charity Returns (Public!)
1. Download Fraser Institute's T3010 from CRA
2. Extract donor names from Schedule 6
3. Cross-reference with Elections Canada donations
4. Track: Who funds think tank + who they donate to politically
5. Alert when funding spikes before anti-social program reports
```

---

### **4. Personnel Tracking (Revolving Door)** 👥

| Source | URL | Update Frequency | API/Scraping |
|--------|-----|------------------|--------------|
| **LinkedIn Public Profiles** | https://www.linkedin.com | Real-time | Scraping (careful with ToS) |
| **Ontario Public Service Salary Disclosure** | https://www.ontario.ca/page/public-sector-salary-disclosure | Annual | CSV download |
| **Corporate Board Announcements** | Company websites + press releases | Real-time | RSS/scraping |
| **Lobbyist Registry** | https://lobbycanada.gc.ca/ | Real-time | CSV downloads |

**Revolving Door Detection:**
```javascript
// Automated tracking:
1. Monitor LinkedIn for job changes (VP at WSIB → Insurance Lobby)
2. Cross-reference with Ontario Sunshine List (salary disclosure)
3. Check lobbyist registry for new registrations
4. Alert when government official joins industry they regulated
5. Calculate: decisions made during tenure + impact on companies
```

---

### **5. Decision-Making Patterns** 📊

| Source | URL | Access Method | Feasibility |
|--------|-----|---------------|-------------|
| **WSIB Appeals Database** | WSIB website | FOI requests + scraping | Requires FOI |
| **Court Decisions (CanLII)** | https://www.canlii.org | Free API | 100% accessible |
| **ODSP/AISH Statistics** | Provincial reports | Annual reports | Publicly available |
| **Human Rights Tribunal Decisions** | http://www.ohrc.on.ca/ | Searchable | Scrapable |

**Pattern Detection (REQUIRES FOI BUT TOTALLY DOABLE):**
```javascript
// Step 1: FOI Request Strategy
- File FOI for: "All WSIB claim decisions for chronic pain (2020-2024)"
- Request: adjudicator name, decision, claimant demographics
- Cost: Usually free or < $100

// Step 2: Statistical Analysis
- Import into database
- Run stats: which adjudicators deny most?
- Demographic analysis: age/gender/condition bias?
- Geographic patterns: some regions worse?

// Step 3: Automated Alerts
- When pattern detected → auto-generate discrimination complaint
- Identify affected claimants for potential class action
```

---

### **6. Media Monitoring** 📰

| Source | Type | Cost | API |
|--------|------|------|-----|
| **RSS Feeds** | Free | $0 | Standard RSS |
| **Google News API** | Free tier | $0 | Yes |
| **Twitter/X API** | Limited free | $0-100/mo | Yes |
| **Reddit API** | Free | $0 | Yes |
| **Government Press Releases** | Free | $0 | RSS |

**24/7 Media Scraping:**
```javascript
// Monitor in real-time:
- Government press release pages (RSS)
- Twitter accounts of politicians/agencies
- News mentions of "WSIB", "ODSP", "disability cuts"
- Reddit communities (r/EAPD, r/OntarioWorks)
- Alert when negative policy announcements detected
```

---

### **7. Court & Legal Monitoring** ⚖️

| Source | URL | Update Frequency | Access |
|--------|-----|------------------|--------|
| **CanLII (Canadian Law)** | https://www.canlii.org | Daily | Free API |
| **Ontario Court Dockets** | https://www.ontariocourts.ca/ | Real-time | Public access |
| **Class Action Database** | https://www.classactions.ca/ | Weekly | Scrapable |
| **WSIAT Decisions** | http://www.wsiat.on.ca/ | Weekly | Searchable |

**API Example (CanLII):**
```javascript
// FREE API for Canadian legal decisions!
GET https://api.canlii.org/v1/caseBrowse/en/

// Monitor:
- New WSIB appeal decisions
- Class action filings against insurers
- Human rights tribunal rulings
- Alert when similar case succeeds (replication opportunity)
```

---

### **8. International Intelligence** 🌍

| Source | URL | Scope | API |
|--------|-----|-------|-----|
| **IMF Publications** | https://www.imf.org/en/Publications | Global | RSS feeds |
| **World Bank Open Data** | https://data.worldbank.org/ | Global | Free API |
| **UN Human Rights Database** | https://www.ohchr.org/en/databases | Global | Searchable |
| **OECD Statistics** | https://stats.oecd.org/ | OECD countries | Free API |

---

## 🚀 **IMPLEMENTATION ROADMAP**

### **Phase 1: Immediate (Week 1)**
✅ **No coding required:**
- Set up Google Alerts for key terms
- Subscribe to RSS feeds (Ontario Legislature, Canada Gazette)
- Bookmark key databases (SEDAR+, CRA Charity, Elections Canada)
- Weekly manual checks (30 min/week)

### **Phase 2: Semi-Automated (Month 1)**
✅ **Basic scripting:**
- Python script to scrape Ontario Legislature bills daily
- RSS reader that emails you on keywords
- IFTTT/Zapier automation for social media monitoring
- Google Sheets to track data

### **Phase 3: Fully Automated (Month 2-3)**
✅ **Backend development:**
- Node.js + MongoDB database
- Daily scrapers for all sources
- Pattern detection algorithms
- Email/Slack alerts on threats
- Dashboard showing live monitoring

### **Phase 4: AI-Powered (Month 4-6)**
✅ **Advanced features:**
- Natural language processing of legislative text
- Machine learning for pattern prediction
- Automated FOI request generation
- Network analysis of power relationships
- Blockchain timestamping of evidence

---

## 💻 **TECH STACK RECOMMENDATION**

```javascript
// Backend
- Node.js + Express (web scraping, APIs)
- Python (data analysis, ML)
- MongoDB (data storage)
- Redis (caching)

// Scraping & Monitoring
- Puppeteer (browser automation)
- Cheerio (HTML parsing)
- node-cron (scheduling)
- RSS-parser (feed monitoring)

// APIs
- CanLII API (legal decisions)
- SEC EDGAR API (corporate filings)
- Google News API (media monitoring)
- Twitter API (social media)

// Analysis
- pandas (Python - data manipulation)
- scikit-learn (pattern detection)
- spaCy (natural language processing)

// Alerting
- Nodemailer (email alerts)
- Twilio (SMS alerts)
- Slack webhooks
- Discord webhooks
```

---

## 📋 **SAMPLE AUTOMATED WORKFLOW**

### **Example: Detecting WSIB Policy Changes**

```javascript
// DAILY AUTOMATED SCRIPT (30 lines of code)

const puppeteer = require('puppeteer');
const diff = require('diff');

// 1. SCRAPE WSIB POLICY PAGES
async function scrapeWSIBPolicies() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.wsib.ca/en/operational-policy-manual');
  
  const policies = await page.evaluate(() => {
    // Extract policy text
    return Array.from(document.querySelectorAll('.policy'))
      .map(p => p.innerText);
  });
  
  await browser.close();
  return policies;
}

// 2. COMPARE TO YESTERDAY'S VERSION
function detectChanges(today, yesterday) {
  const changes = diff.diffLines(yesterday, today);
  return changes.filter(c => c.added || c.removed);
}

// 3. ALERT IF HARMFUL CHANGES
function analyzeChanges(changes) {
  const harmfulKeywords = [
    'increase eligibility requirements',
    'reduce benefits',
    'stricter assessment',
    'additional documentation'
  ];
  
  return changes.filter(change => 
    harmfulKeywords.some(keyword => 
      change.value.toLowerCase().includes(keyword)
    )
  );
}

// 4. SEND ALERTS
async function alertCoalition(harmfulChanges) {
  // Email 50 coalition partners
  // Generate FOI request automatically
  // Draft media alert
  // Post to Discord/Slack
}

// RUN DAILY AT 6 AM
cron.schedule('0 6 * * *', async () => {
  const today = await scrapeWSIBPolicies();
  const yesterday = await loadFromDatabase();
  const changes = detectChanges(today, yesterday);
  const harmful = analyzeChanges(changes);
  
  if (harmful.length > 0) {
    await alertCoalition(harmful);
  }
  
  await saveToDatabase(today);
});
```

**Result:** You're alerted within hours of WSIB changing policies, BEFORE they announce it publicly.

---

## 🎯 **PRIORITY DATA SOURCES TO IMPLEMENT FIRST**

### **Tier 1: Easiest & Highest Impact**
1. ✅ **Ontario Legislature Bills** (daily scraping)
2. ✅ **SEDAR+ Corporate Filings** (API available)
3. ✅ **Lobbyist Registry** (CSV downloads)
4. ✅ **CRA Charity Database** (annual, but huge impact)
5. ✅ **CanLII Legal Decisions** (free API)

### **Tier 2: Moderate Effort**
6. ✅ **LinkedIn Scraping** (revolving door tracking)
7. ✅ **Media Monitoring** (RSS + APIs)
8. ✅ **Court Dockets** (varies by jurisdiction)
9. ✅ **WSIB/ODSP Statistics** (FOI + scraping)

### **Tier 3: Advanced (But Worth It)**
10. ✅ **Pattern Analysis** (requires FOI data + stats)
11. ✅ **Network Mapping** (relationship databases)
12. ✅ **Predictive Modeling** (ML on historical patterns)

---

## 💰 **COST ANALYSIS**

### **Free Tier (100% Possible)**
- All government websites: **FREE**
- Most APIs: **FREE**
- Basic web scraping: **FREE**
- Google Sheets/Docs: **FREE**
- **Total Cost: $0/month**

### **Enhanced Tier**
- Server hosting (Digital Ocean): **$5-10/month**
- Database (MongoDB Atlas): **FREE** (512MB)
- SMS alerts (Twilio): **$0.0075/SMS**
- **Total Cost: $10-20/month**

### **Pro Tier**
- Dedicated server: **$20-50/month**
- Premium APIs: **$50-100/month**
- Data storage: **$10-20/month**
- **Total Cost: $80-170/month**

---

## 🔥 **BOTTOM LINE**

### **Every alert The EYE shows CAN BE REAL.**

- ✅ 95% of data sources are **FREE and PUBLIC**
- ✅ Most require only **basic web scraping** (20-50 lines of code each)
- ✅ Some APIs are **FREE** (CanLII, SEC EDGAR, Parliament)
- ✅ FOI requests cost **$0-100** and provide goldmine data
- ✅ Full automation possible for **$10-20/month** in hosting

**The technology exists. The data is public. The only question is: who builds it first?**

---

## 📚 **NEXT STEPS**

1. **Start Manual** (this week): Bookmark these sources, check weekly
2. **Semi-Automate** (next month): Set up Google Alerts, RSS readers
3. **Build MVP** (3 months): One working scraper + one alert
4. **Scale Up** (6 months): Full monitoring system across all categories
5. **Go Public** (1 year): Make The EYE available to everyone

---

## 🎯 **THE VISION**

Imagine:
- **47,000 ODSP recipients** get a text alert 3 days before a policy change
- **Class action lawyers** are auto-notified when enough similar cases exist
- **Journalists** receive evidence packages before the story even breaks
- **Coalition partners** coordinate responses within hours, not weeks
- **The powerful** can no longer hide in bureaucratic complexity

**This is possible. This is achievable. This is The EYE.**

---

**The data is public. The tools are free. The power is yours.** 👁️

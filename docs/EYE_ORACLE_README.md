# 👁️ THE EYE ORACLE - Daily Investigative Blog

## What Is The Eye Oracle?

**The Eye Oracle** is an automated daily blog system that uses **The Eye v2.0** AI processor to analyze REAL documented corruption cases and publish investigative journalism.

Every day, a new case is selected from our database of 45+ documented Canadian government corruption issues, analyzed by The Eye for corruption patterns, Charter violations, human rights breaches, and systemic abuse, then published as a detailed investigative blog post.

## Key Features

✅ **100% Real Data** - Every post analyzes actual documented government corruption  
✅ **Official Sources** - All claims sourced from Auditor General reports, Ombudsman findings, court decisions  
✅ **The Eye v2.0 Analysis** - Deep AI analysis for corruption, Constitutional violations, UNCRPD breaches  
✅ **Actionable Intelligence** - Each post includes recommended actions with evidence  
✅ **Daily Automatic** - New report every 24 hours (when scheduled)

## How It Works

```
1. SELECT CASE
   ↓
   Deterministic rotation through 45+ real documented cases
   (WSIB corruption, ODSP poverty, Indigenous rights, LTC deaths, etc.)

2. THE EYE ANALYZES
   ↓
   The Eye v2.0 processes the case:
   • Corruption detection
   • Charter violation analysis
   • Human rights breach identification
   • UNCRPD compliance checking
   • Vulnerable population impact
   • Risk scoring (0-100)

3. GENERATE BLOG POST
   ↓
   Formats Eye's analysis into investigative report:
   • Overview (what happened)
   • Corruption findings
   • Constitutional/rights violations
   • Impact on vulnerable populations
   • Target entity profile
   • Recommended actions
   • Verification links

4. PUBLISH
   ↓
   Post saved to /public/data/eye-oracle-posts.json
   Visible at /eye-oracle page
```

## File Structure

```
scripts/
  generate-eye-oracle-daily.js  ← Generator script (run daily)

pages/
  eye-oracle.js                  ← Oracle blog page (frontend)

public/data/
  eye-oracle-posts.json          ← All published posts (auto-generated)

utils/
  the-eye-v2-processor.js        ← The Eye AI analysis engine
  real-data-generator.js         ← 45+ documented real cases
```

## Usage

### Generate Today's Post

```bash
node scripts/generate-eye-oracle-daily.js
```

**Output:**
```
👁️ THE EYE ORACLE AWAKENS...
📋 Selected Case: Toronto Housing Crisis: 98,000+ on Waitlist
📊 Source: City of Toronto Housing Report 2023
🔍 Running The Eye v2.0 analysis...
✅ Eye analysis complete!
   Corruption Risk: 85/100
   Findings: 5 corruption indicators
   Charter Violations: 2
   Recommended Actions: 4
✅ EYE ORACLE POST PUBLISHED!
```

### View Posts

Visit: **http://localhost:3000/eye-oracle**

Features:
- Browse all Oracle reports
- Filter by category (workers, housing, indigenous, etc.)
- View full analysis with evidence
- Click through to action packages
- Verify all claims with official sources

### Automate Daily Posts

**Option 1: Windows Task Scheduler**
```powershell
# Create task that runs daily at midnight
schtasks /create /tn "EyeOracleDaily" /tr "node C:\path\to\scripts\generate-eye-oracle-daily.js" /sc daily /st 00:00
```

**Option 2: GitHub Actions**
```yaml
# .github/workflows/eye-oracle-daily.yml
name: Eye Oracle Daily
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: node scripts/generate-eye-oracle-daily.js
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "👁️ Eye Oracle: Daily investigative post"
```

**Option 3: Cron (Linux/Mac)**
```bash
# Add to crontab -e
0 0 * * * cd /path/to/project && node scripts/generate-eye-oracle-daily.js
```

## Post Structure

Each Eye Oracle post includes:

### 1. **Overview**
- Title of the issue
- Official source & URL
- Severity level
- People affected
- Financial impact
- Core evidence

### 2. **Corruption Findings**
- Specific corruption indicators detected by The Eye
- Overall corruption risk score (0-100)
- Type of corruption (systemic, financial, regulatory, etc.)

### 3. **Constitutional & Rights Violations**
- Canadian Charter violations (Section 7, 15, etc.)
- Human rights breaches (CHRA)
- UNCRPD violations (Articles)

### 4. **Impact Analysis**
- Vulnerable populations harmed
- Affected count (specific numbers)
- Disproportionate impact details

### 5. **Target Entity Profile**
- Name of responsible organization
- Type (government agency, corporation, etc.)
- Jurisdiction & leadership
- Budget information
- Corruption indicators

### 6. **Recommended Actions**
- Specific action to take right now
- Priority level
- Timeline
- Rationale (why it works)
- Next steps

### 7. **Verification**
- Official source name
- Direct URL to government document
- Date of evidence
- Additional corroborating evidence

## Data Sources

All Eye Oracle posts use REAL documented cases:

| Category | Examples | Official Sources |
|----------|----------|------------------|
| **WSIB Corruption** | 67% mental health denial rate, 18-month delays | Ontario Ombudsman, Auditor General |
| **ODSP Poverty** | $1,308/month (below poverty line) | Ontario Government |
| **Indigenous Rights** | 33 communities without clean water | Indigenous Services Canada |
| **Housing Crisis** | 98,000+ on Toronto waitlist | City of Toronto |
| **LTC Deaths** | 4,000+ COVID deaths in for-profit homes | Ontario LTC Commission |
| **CPP Disability** | 60% denial rate | Service Canada stats |
| **Veterans** | Homeless veterans, benefit denials | Veterans Affairs Canada |

**Total:** 45+ documented cases, all with official government sources

## Customization

### Add New Cases

Edit `scripts/generate-eye-oracle-daily.js` and add to `ALL_REAL_CASES` array:

```javascript
{
  title: 'Your Case Title',
  source: 'Official Source Name',
  url: 'https://official-government-url.ca',
  severity: 'critical', // critical | high | medium | low
  category: 'workers', // workers | disabilities | indigenous | housing | etc.
  scope: 'provincial', // federal | provincial | municipal
  evidence: 'Specific evidence statement from official source',
  charter_violations: ['Section 7', 'Section 15'],
  affected_count: '10,000+ people',
  financial_impact: '$50M+ in harm',
  timestamp: '2024-01-01',
  target_entity: {
    name: 'Responsible Entity Name',
    type: 'provincial_agency',
    jurisdiction: 'Ontario',
    corruption_indicators: ['indicator 1', 'indicator 2']
  }
}
```

### Adjust Rotation

The system uses deterministic rotation - same case on same day of year:
```javascript
const dayOfYear = Math.floor(diff / oneDay);
const caseIndex = dayOfYear % ALL_REAL_CASES.length;
```

To change rotation logic, edit `selectCaseForToday()` function.

### Customize Post Format

Edit `formatEyeAnalysisAsBlogPost()` function to change:
- Section titles
- Content structure
- CTA buttons
- Styling

## Integration

The Eye Oracle integrates with:

✅ **Alerts System** - High-risk findings trigger alerts  
✅ **Target Acquisition** - Links to action packages for each entity  
✅ **Legislative Tracking** - Cross-references relevant bills  
✅ **The Eye v2.0 Demo** - Users can run Eye on custom documents  
✅ **Automation Engine** - Feeds real data across all systems

## Navigation

Eye Oracle link added to header navigation:
```
👁️ Oracle (highlighted in gradient purple/cyan)
```

Visible on all pages in main navigation menu.

## Example Post

**Title:** 👁️ The Eye Oracle: WSIB Mental Health Claim Denial Rate: 67%

**Excerpt:** The Eye v2.0 has analyzed official government data and found systemic corruption. Ombudsman found 2 out of 3 mental health claims denied on first application. Official source: Ontario Ombudsman Report 2023.

**Corruption Risk Score:** 85/100

**Charter Violations:** Section 7 (security of person), Section 15 (equality rights)

**People Affected:** 10,000+ workers annually

**Recommended Action:** File coordinated Ombudsman complaints with evidence packages

**Verification:** https://www.ombudsman.on.ca/resources/reports-and-case-summaries

## Maintenance

### Check Post Generation

```bash
node scripts/generate-eye-oracle-daily.js
```

Successful output:
```
✅ EYE ORACLE POST PUBLISHED!
📅 Date: 2025-11-24
📝 Title: [Post title]
🎯 Target: [Entity name]
📊 Risk Score: [0-100]/100
```

### View All Posts

```bash
Get-Content public/data/eye-oracle-posts.json | ConvertFrom-Json | Select-Object id, date, title, @{Name='Risk';Expression={$_.metadata.riskScore}}
```

### Delete All Posts (Reset)

```bash
Remove-Item public/data/eye-oracle-posts.json
```

Next run will start fresh with ID 1.

## FAQ

**Q: Will it duplicate posts?**  
A: No. Script checks if post for today already exists and skips generation.

**Q: What if The Eye finds nothing?**  
A: The post still publishes with the original case evidence. Risk score may be low if The Eye needs more keywords.

**Q: Can I manually trigger specific cases?**  
A: Yes. Modify `selectCaseForToday()` to return `ALL_REAL_CASES[index]` for testing.

**Q: How accurate is The Eye's analysis?**  
A: The Eye uses keyword matching and pattern detection. It's best at detecting explicit mentions of corruption, Charter sections, and rights violations. All posts still include original evidence.

**Q: What if a source URL breaks?**  
A: Update the URL in `ALL_REAL_CASES`. Posts include date stamps so older posts reflect info at that time.

## Roadmap

Future enhancements:
- [ ] Email digest of daily posts
- [ ] Social media auto-posting (Twitter/X, Facebook)
- [ ] PDF export of posts
- [ ] RSS feed
- [ ] Archive page by month/year
- [ ] Search functionality
- [ ] Related posts suggestions
- [ ] User comments (with moderation)

## Philosophy

**The Eye Oracle speaks truth to power - daily.**

Unlike traditional media that waits for press releases, The Eye Oracle:
- **Proactively analyzes** documented corruption
- **Connects the dots** across systems (WSIB, ODSP, housing, etc.)
- **Provides actionable intelligence** not just headlines
- **Cites official sources** so you can verify everything
- **Runs daily** so nothing gets buried or forgotten

Every post is an indictment backed by evidence.  
Every post is a call to action.  
Every post is verifiable truth.

---

**Generated:** November 24, 2025  
**System:** The Eye Oracle v1.0  
**Powered By:** The Eye v2.0 Investigative AI  
**Data Source:** 45+ documented Canadian corruption cases

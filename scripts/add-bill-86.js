const fs = require('fs');
const path = require('path');

// Add Bill 86 to parliament-bills.json
const billsPath = path.join(__dirname, '../public/data/parliament-bills.json');
let bills = [];
try { bills = JSON.parse(fs.readFileSync(billsPath, 'utf8')); } catch(e) { bills = []; }

const bill86 = {
  id: 'Bill-86',
  number: 'Bill 86',
  title: 'Meredith Act (Fair Compensation for Injured Workers), 2025',
  status: 'First Reading - Ordered for Second Reading',
  introduced: '2025-12-08',
  url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-86',
  sponsor: 'Lise Vaugeois, Wayne Gates, Jamie West',
  party: 'NDP',
  source: 'ola.org',
  verified: true,
  description: 'Fair compensation for injured workers - restoring the historic compromise',
  relevance: 'CRITICAL - Directly affects injured workers rights and WSIB compensation'
};

// Check if already exists
if (!bills.some(b => b.id === 'Bill-86')) {
  bills.unshift(bill86);
  fs.writeFileSync(billsPath, JSON.stringify(bills, null, 2));
  console.log('✅ Added Bill 86 to parliament-bills.json');
} else {
  console.log('Bill 86 already exists in bills');
}

// Now add to Eye Oracle posts
const postsPath = path.join(__dirname, '../public/data/eye-oracle-posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

// Check if Bill 86 report already exists
if (posts.some(p => p.id === 'eye-oracle-bill-86')) {
  console.log('Bill 86 Eye Oracle report already exists');
  process.exit(0);
}

const newReport = {
  id: 'eye-oracle-bill-86',
  date: '2025-12-09',
  emoji: '⚖️',
  category: 'The Eye Oracle - LEGISLATIVE ALERT',
  title: '👁️ BREAKING: Bill 86 - Meredith Act for Fair Injured Worker Compensation!',
  excerpt: 'MPP Lise Vaugeois (NDP) introduced Bill 86 on Dec 8, 2025 - The Meredith Act aims to restore fair compensation for injured workers under WSIB.',
  content: {
    overview: {
      title: '🎯 What The Eye Found',
      body: `**BREAKING LEGISLATIVE NEWS**

**Bill 86: Meredith Act (Fair Compensation for Injured Workers), 2025**

**Sponsors:** Lise Vaugeois (NDP - Thunder Bay-Superior North), Wayne Gates, Jamie West
**Introduced:** December 8, 2025
**Status:** First Reading PASSED - Ordered for Second Reading

**Source:** [Ontario Legislative Assembly](https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-86)

**Why This Matters:**
The Meredith Principles (1914) established the historic compromise - workers gave up the right to sue in exchange for guaranteed compensation. This bill aims to restore that promise which has been systematically eroded.`
    },
    corruption: {
      title: '🔍 Why This Bill Was Needed',
      body: `**The Broken Promise:**
• WSIB denial rates have skyrocketed (67% for mental health)
• Benefits have been cut repeatedly since 1990s
• The "historic compromise" has become one-sided
• Workers gave up right to sue but aren't getting fair compensation

**Who Broke It:**
• Ontario PC Government - Bill 162 (1989 cuts)
• Ontario PC Government - Bill 99 (1997 cuts)  
• Ongoing WSIB policy changes favoring employers`
    },
    constitutional: {
      title: '📜 Legal Framework',
      body: `**The Meredith Principles (1914):**
1. No-fault compensation
2. Collective liability of employers
3. Security of payment
4. Exclusive jurisdiction
5. Independent administration

**These principles have been violated by:**
• Arbitrary claim denials
• Insufficient benefit levels
• Barriers to appeals
• Employer influence over WSIB policy`
    },
    evidenceReceipts: {
      title: '🧾 Evidence Receipts - THE PROOF',
      body: `### 📊 Bill 86 Details
| Field | Information |
|-------|-------------|
| Bill Number | Bill 86 |
| Short Title | Meredith Act (Fair Compensation for Injured Workers), 2025 |
| Sponsor | Lise Vaugeois (NDP) |
| Co-Sponsors | Wayne Gates, Jamie West |
| Introduced | December 8, 2025 |
| First Reading | PASSED (Carried) |
| Status | Ordered for Second Reading |

### 🔗 Official Source
**Ontario Legislative Assembly:** [Bill 86 Full Text](https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-86)

### 📞 Contact Your MPP
Support this bill by contacting your MPP: [Find Your MPP](https://www.ola.org/en/members/current)`
    },
    action: {
      title: '⚡ What You Can Do RIGHT NOW',
      body: `**URGENT: This Bill Needs Public Support**

1. **Contact Your MPP** - Ask them to support Bill 86
2. **Share This Report** - Spread awareness on social media
3. **Contact the Sponsors:**
   - Lise Vaugeois: lvaugeois-qp@ndp.on.ca | 807-345-3647
   - Wayne Gates: wgates-qp@ndp.on.ca
   - Jamie West: jwest-qp@ndp.on.ca

4. **Submit Your Story** at /submit-tip - Your experience matters!

**Why Act Now:**
Bills often die after First Reading if there's no public pressure. Second Reading debate is when support matters most!`
    }
  },
  evidencePackage: {
    primarySource: {
      name: 'Ontario Legislative Assembly - Bill 86',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-86',
      type: 'government_legislation',
      accessDate: '2025-12-09',
      archiveUrl: 'https://web.archive.org/web/https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-86'
    },
    dataPoints: [
      { stat: 'Bill 86', description: 'Meredith Act', source: 'OLA' },
      { stat: 'Dec 8, 2025', description: 'Date Introduced', source: 'OLA' },
      { stat: 'Passed', description: 'First Reading Vote', source: 'OLA' }
    ]
  }
};

// Add at the beginning (newest first)
posts.unshift(newReport);
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('✅ Added Bill 86 Eye Oracle report');
console.log('📊 Total posts now:', posts.length);

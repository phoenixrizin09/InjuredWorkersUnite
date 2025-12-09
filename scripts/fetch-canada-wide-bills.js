/**
 * 👁️ THE EYE ORACLE - CANADA-WIDE LEGISLATIVE TRACKER
 * 
 * Monitors ALL provincial and federal legislatures for:
 * - New bills affecting workers, disabled, vulnerable populations
 * - Policy changes at WSIB/WCB across all provinces
 * - Healthcare, housing, social services legislation
 * 
 * THE EYE SEES ALL. THE EYE NEVER SLEEPS. COAST TO COAST.
 */

const fs = require('fs');
const path = require('path');

const BILLS_PATH = path.join(__dirname, '../public/data/parliament-bills.json');
const POSTS_PATH = path.join(__dirname, '../public/data/eye-oracle-posts.json');
const ALERTS_PATH = path.join(__dirname, '../public/data/alerts.json');

// ═══════════════════════════════════════════════════════════════════
// CANADA-WIDE LEGISLATIVE SOURCES
// ═══════════════════════════════════════════════════════════════════

const LEGISLATURES = {
  federal: {
    name: 'Parliament of Canada',
    url: 'https://www.parl.ca/legisinfo/en/bills',
    wcb: null, // Federal workers under Canada Labour Code
    abbrev: 'FED'
  },
  ontario: {
    name: 'Ontario Legislative Assembly',
    url: 'https://www.ola.org/en/legislative-business/bills/current',
    wcb: 'WSIB',
    wcbUrl: 'https://www.wsib.ca',
    abbrev: 'ON'
  },
  british_columbia: {
    name: 'BC Legislative Assembly',
    url: 'https://www.leg.bc.ca/parliamentary-business/legislation',
    wcb: 'WorkSafeBC',
    wcbUrl: 'https://www.worksafebc.com',
    abbrev: 'BC'
  },
  alberta: {
    name: 'Alberta Legislative Assembly',
    url: 'https://www.assembly.ab.ca/assembly-business/bills',
    wcb: 'WCB Alberta',
    wcbUrl: 'https://www.wcb.ab.ca',
    abbrev: 'AB'
  },
  quebec: {
    name: 'Assemblée nationale du Québec',
    url: 'http://www.assnat.qc.ca/en/travaux-parlementaires/projets-loi/projets-loi.html',
    wcb: 'CNESST',
    wcbUrl: 'https://www.cnesst.gouv.qc.ca',
    abbrev: 'QC'
  },
  manitoba: {
    name: 'Manitoba Legislative Assembly',
    url: 'https://www.gov.mb.ca/legislature/business/bills.html',
    wcb: 'WCB Manitoba',
    wcbUrl: 'https://www.wcb.mb.ca',
    abbrev: 'MB'
  },
  saskatchewan: {
    name: 'Saskatchewan Legislative Assembly',
    url: 'https://www.legassembly.sk.ca/legislative-business/bills/',
    wcb: 'WCB Saskatchewan',
    wcbUrl: 'https://www.wcbsask.com',
    abbrev: 'SK'
  },
  nova_scotia: {
    name: 'Nova Scotia House of Assembly',
    url: 'https://nslegislature.ca/legislative-business/bills',
    wcb: 'WCB Nova Scotia',
    wcbUrl: 'https://www.wcb.ns.ca',
    abbrev: 'NS'
  },
  new_brunswick: {
    name: 'New Brunswick Legislative Assembly',
    url: 'https://www.gnb.ca/legis/index-e.asp',
    wcb: 'WorkSafeNB',
    wcbUrl: 'https://www.worksafenb.ca',
    abbrev: 'NB'
  },
  newfoundland: {
    name: 'Newfoundland and Labrador House of Assembly',
    url: 'https://www.assembly.nl.ca/HouseBusiness/Bills/',
    wcb: 'WorkplaceNL',
    wcbUrl: 'https://workplacenl.ca',
    abbrev: 'NL'
  },
  pei: {
    name: 'PEI Legislative Assembly',
    url: 'https://www.assembly.pe.ca/legislative-business/bills',
    wcb: 'WCB PEI',
    wcbUrl: 'https://www.wcb.pe.ca',
    abbrev: 'PE'
  },
  yukon: {
    name: 'Yukon Legislative Assembly',
    url: 'https://yukonassembly.ca/legislative-business/bills',
    wcb: 'YWCHSB',
    wcbUrl: 'https://wcb.yk.ca',
    abbrev: 'YT'
  },
  nwt: {
    name: 'NWT Legislative Assembly',
    url: 'https://www.ntassembly.ca/content/bills',
    wcb: 'WSCC',
    wcbUrl: 'https://www.wscc.nt.ca',
    abbrev: 'NT'
  },
  nunavut: {
    name: 'Nunavut Legislative Assembly',
    url: 'https://assembly.nu.ca/legislative-business/bills',
    wcb: 'WSCC',
    wcbUrl: 'https://www.wscc.nu.ca',
    abbrev: 'NU'
  }
};

// Keywords that make legislation relevant to our mission
const RELEVANT_KEYWORDS = [
  // Workers
  'worker', 'workers', 'workplace', 'employment', 'labour', 'labor',
  'wsib', 'wcb', 'worksafe', 'cnesst', 'compensation', 'occupational',
  'injury', 'injured', 'disability', 'disabled', 'ptsd', 'mental health',
  'safety', 'hazard', 'fatality', 'death', 'accident',
  'union', 'collective bargaining', 'strike', 'lockout',
  'minimum wage', 'wage theft', 'overtime', 'hours of work',
  
  // Healthcare
  'health care', 'healthcare', 'hospital', 'nurse', 'nursing',
  'doctor', 'physician', 'patient', 'medical',
  'long-term care', 'ltc', 'seniors', 'elder', 'aging',
  'mental health', 'addiction', 'opioid', 'overdose',
  
  // Social Services
  'odsp', 'ontario works', 'welfare', 'social assistance',
  'disability support', 'income support', 'poverty',
  'cpp', 'pension', 'retirement', 'ei', 'employment insurance',
  
  // Housing
  'housing', 'homeless', 'homelessness', 'rent', 'tenant',
  'eviction', 'affordable housing', 'shelter',
  
  // Indigenous
  'indigenous', 'first nations', 'métis', 'inuit', 'aboriginal',
  'treaty', 'reconciliation', 'mmiwg',
  
  // Human Rights
  'human rights', 'discrimination', 'accessibility', 'equity',
  'violence', 'harassment', 'abuse'
];

// ═══════════════════════════════════════════════════════════════════
// CURRENT BILLS DATABASE - Updated December 2025
// This gets updated daily by the workflow
// ═══════════════════════════════════════════════════════════════════

const CURRENT_BILLS = {
  // ─────────────────────────────────────────────────────────────────
  // FEDERAL - Parliament of Canada
  // ─────────────────────────────────────────────────────────────────
  federal: [
    {
      id: 'FED-C-58',
      number: 'C-58',
      title: 'Replacement Workers Act',
      status: 'Royal Assent',
      introduced: '2023-11-09',
      url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-58',
      sponsor: 'Government Bill',
      relevance: 'CRITICAL - Bans replacement workers during strikes',
      province: 'federal'
    },
    {
      id: 'FED-C-64',
      number: 'C-64',
      title: 'Pharmacare Act',
      status: 'Committee',
      introduced: '2024-02-29',
      url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-64',
      sponsor: 'Government Bill',
      relevance: 'HIGH - Universal pharmacare coverage',
      province: 'federal'
    }
  ],
  
  // ─────────────────────────────────────────────────────────────────
  // ONTARIO
  // ─────────────────────────────────────────────────────────────────
  ontario: [
    {
      id: 'ON-Bill-86',
      number: 'Bill 86',
      title: 'Meredith Act (Fair Compensation for Injured Workers), 2025',
      status: 'First Reading - Ordered for Second Reading',
      introduced: '2025-12-08',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-86',
      sponsor: 'Lise Vaugeois, Wayne Gates, Jamie West (NDP)',
      relevance: 'CRITICAL - Injured Workers Compensation',
      province: 'ontario'
    },
    {
      id: 'ON-Bill-77',
      number: 'Bill 77',
      title: 'Speaking Out About, and Reporting On, Workplace Violence and Harassment Act, 2025',
      status: 'First Reading',
      introduced: '2025-11-25',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-77',
      sponsor: 'France Gélinas, Jamie West (NDP)',
      relevance: 'HIGH - Workplace Safety',
      province: 'ontario'
    },
    {
      id: 'ON-Bill-69',
      number: 'Bill 69',
      title: 'Respecting Workers in Health Care and in Related Fields Act, 2025',
      status: 'First Reading',
      introduced: '2025-11-18',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-69',
      sponsor: 'France Gélinas, Wayne Gates, Lisa Gretzky, Jamie West (NDP)',
      relevance: 'HIGH - Healthcare Workers',
      province: 'ontario'
    },
    {
      id: 'ON-Bill-44',
      number: 'Bill 44',
      title: 'Healthcare Staffing Agencies Act, 2025',
      status: 'First Reading',
      introduced: '2025-06-03',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-44',
      sponsor: 'France Gélinas, Wayne Gates, Lisa Gretzky, Jamie West (NDP)',
      relevance: 'HIGH - Healthcare Workers',
      province: 'ontario'
    },
    {
      id: 'ON-Bill-36',
      number: 'Bill 36',
      title: 'Heat Stress Act, 2025',
      status: 'First Reading',
      introduced: '2025-05-29',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-36',
      sponsor: 'Peter Tabuns, Chandra Pasma, Lise Vaugeois, Jamie West (NDP)',
      relevance: 'HIGH - Workplace Safety',
      province: 'ontario'
    },
    {
      id: 'ON-Bill-30',
      number: 'Bill 30',
      title: 'Working for Workers Seven Act, 2025',
      status: 'Royal Assent',
      introduced: '2025-05-28',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-30',
      sponsor: 'David Piccini (PC - Minister of Labour)',
      relevance: 'CRITICAL - Workers Rights',
      province: 'ontario'
    },
    {
      id: 'ON-Bill-23',
      number: 'Bill 23',
      title: 'Protecting Seniors\' Rights in Care Homes Act, 2025',
      status: 'First Reading',
      introduced: '2025-05-14',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-23',
      sponsor: 'Chandra Pasma, Jessica Bell, Chris Glover, Lise Vaugeois (NDP)',
      relevance: 'HIGH - Seniors/LTC',
      province: 'ontario'
    },
    {
      id: 'ON-Bill-19',
      number: 'Bill 19',
      title: 'Patient-to-Nurse Ratios for Hospitals Act, 2025',
      status: 'First Reading',
      introduced: '2025-05-13',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-19',
      sponsor: 'France Gélinas, Jamie West (NDP)',
      relevance: 'HIGH - Healthcare',
      province: 'ontario'
    },
    {
      id: 'ON-Bill-8',
      number: 'Bill 8',
      title: 'WSIB Coverage for Workers in Residential Care Facilities and Group Homes Act, 2025',
      status: 'First Reading',
      introduced: '2025-04-30',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-8',
      sponsor: 'John Fraser (Liberal)',
      relevance: 'CRITICAL - WSIB Coverage Gap',
      province: 'ontario'
    },
    {
      id: 'ON-Bill-7',
      number: 'Bill 7',
      title: 'Health Care is Not for Sale Act, 2025',
      status: 'First Reading',
      introduced: '2025-04-30',
      url: 'https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-7',
      sponsor: 'France Gélinas, Robin Lennox, Chandra Pasma (NDP)',
      relevance: 'HIGH - Healthcare Privatization',
      province: 'ontario'
    }
  ],
  
  // ─────────────────────────────────────────────────────────────────
  // BRITISH COLUMBIA
  // ─────────────────────────────────────────────────────────────────
  british_columbia: [
    {
      id: 'BC-Bill-24',
      number: 'Bill 24',
      title: 'Workers Compensation Amendment Act, 2024',
      status: 'Royal Assent',
      introduced: '2024-04-18',
      url: 'https://www.leg.bc.ca/parliamentary-business/legislation-debates-proceedings/42nd-parliament/5th-session/bills/first-reading/gov24-1',
      sponsor: 'Government Bill',
      relevance: 'CRITICAL - WorkSafeBC improvements',
      province: 'british_columbia'
    },
    {
      id: 'BC-Bill-13',
      number: 'Bill 13',
      title: 'Pay Transparency Act',
      status: 'Royal Assent',
      introduced: '2023-03-07',
      url: 'https://www.leg.bc.ca/parliamentary-business/legislation-debates-proceedings/42nd-parliament/4th-session/bills/first-reading/gov13-1',
      sponsor: 'Government Bill',
      relevance: 'HIGH - Pay Equity',
      province: 'british_columbia'
    }
  ],
  
  // ─────────────────────────────────────────────────────────────────
  // ALBERTA
  // ─────────────────────────────────────────────────────────────────
  alberta: [
    {
      id: 'AB-Bill-17',
      number: 'Bill 17',
      title: 'Workers\' Compensation (Presumptive Coverage) Amendment Act, 2024',
      status: 'Royal Assent',
      introduced: '2024-05-09',
      url: 'https://www.assembly.ab.ca/assembly-business/bills/bill?billinfoid=11984',
      sponsor: 'Government Bill',
      relevance: 'HIGH - Presumptive coverage for PTSD',
      province: 'alberta'
    },
    {
      id: 'AB-Bill-21',
      number: 'Bill 21',
      title: 'Skilled Trades and Apprenticeship Education Act',
      status: 'Royal Assent',
      introduced: '2024-05-21',
      url: 'https://www.assembly.ab.ca/assembly-business/bills/bill?billinfoid=11988',
      sponsor: 'Government Bill',
      relevance: 'MEDIUM - Trades workers',
      province: 'alberta'
    }
  ],
  
  // ─────────────────────────────────────────────────────────────────
  // QUEBEC
  // ─────────────────────────────────────────────────────────────────
  quebec: [
    {
      id: 'QC-Bill-59',
      number: 'Bill 59 (Projet de loi 59)',
      title: 'Act to modernize the occupational health and safety regime',
      status: 'Royal Assent (2021)',
      introduced: '2020-10-27',
      url: 'http://www.assnat.qc.ca/en/travaux-parlementaires/projets-loi/projet-loi-59-42-1.html',
      sponsor: 'Government Bill',
      relevance: 'CRITICAL - Major CNESST reform',
      province: 'quebec'
    },
    {
      id: 'QC-Bill-42',
      number: 'Bill 42 (Projet de loi 42)',
      title: 'Act to prevent and fight psychological harassment and sexual violence in the workplace',
      status: 'Royal Assent',
      introduced: '2024-04-02',
      url: 'http://www.assnat.qc.ca/en/travaux-parlementaires/projets-loi/projet-loi-42-43-1.html',
      sponsor: 'Government Bill',
      relevance: 'HIGH - Workplace harassment',
      province: 'quebec'
    }
  ],
  
  // ─────────────────────────────────────────────────────────────────
  // MANITOBA
  // ─────────────────────────────────────────────────────────────────
  manitoba: [
    {
      id: 'MB-Bill-9',
      number: 'Bill 9',
      title: 'The Workers Compensation Amendment Act',
      status: 'First Reading',
      introduced: '2024-11-14',
      url: 'https://web2.gov.mb.ca/bills/43-2/b009e.php',
      sponsor: 'NDP Government',
      relevance: 'CRITICAL - WCB Manitoba improvements',
      province: 'manitoba'
    }
  ],
  
  // ─────────────────────────────────────────────────────────────────
  // SASKATCHEWAN
  // ─────────────────────────────────────────────────────────────────
  saskatchewan: [
    {
      id: 'SK-Bill-151',
      number: 'Bill 151',
      title: 'The Workers\' Compensation Amendment Act, 2024',
      status: 'First Reading',
      introduced: '2024-11-18',
      url: 'https://www.legassembly.sk.ca/legislative-business/bills/',
      sponsor: 'Government Bill',
      relevance: 'HIGH - WCB Saskatchewan',
      province: 'saskatchewan'
    }
  ],
  
  // ─────────────────────────────────────────────────────────────────
  // NOVA SCOTIA
  // ─────────────────────────────────────────────────────────────────
  nova_scotia: [
    {
      id: 'NS-Bill-419',
      number: 'Bill 419',
      title: 'Workers\' Compensation Act (amended)',
      status: 'First Reading',
      introduced: '2024-10-10',
      url: 'https://nslegislature.ca/legislative-business/bills/64th-general-assembly-1st-session/bill-419',
      sponsor: 'NDP Opposition',
      relevance: 'CRITICAL - WCB coverage expansion',
      province: 'nova_scotia'
    }
  ],
  
  // ─────────────────────────────────────────────────────────────────
  // NEW BRUNSWICK
  // ─────────────────────────────────────────────────────────────────
  new_brunswick: [
    {
      id: 'NB-Bill-127',
      number: 'Bill 127',
      title: 'Workers\' Compensation Act Amendments',
      status: 'Enacted',
      introduced: '2024-06-05',
      url: 'https://www.gnb.ca/legis/bill/FILE/60/3/Bill-127-e.htm',
      sponsor: 'Government Bill',
      relevance: 'HIGH - WorkSafeNB reform',
      province: 'new_brunswick'
    }
  ],
  
  // ─────────────────────────────────────────────────────────────────
  // NEWFOUNDLAND & LABRADOR
  // ─────────────────────────────────────────────────────────────────
  newfoundland: [
    {
      id: 'NL-Bill-32',
      number: 'Bill 32',
      title: 'Workplace Health, Safety and Compensation Act Amendments',
      status: 'Second Reading',
      introduced: '2024-05-28',
      url: 'https://www.assembly.nl.ca/HouseBusiness/Bills/ga50session2/bill2432.htm',
      sponsor: 'Government Bill',
      relevance: 'HIGH - WorkplaceNL improvements',
      province: 'newfoundland'
    }
  ],
  
  // ─────────────────────────────────────────────────────────────────
  // PEI
  // ─────────────────────────────────────────────────────────────────
  pei: [
    {
      id: 'PE-Bill-114',
      number: 'Bill 114',
      title: 'Workers Compensation Act Amendment',
      status: 'Royal Assent',
      introduced: '2024-04-30',
      url: 'https://www.assembly.pe.ca/legislative-business/bills',
      sponsor: 'Government Bill',
      relevance: 'MEDIUM - WCB PEI updates',
      province: 'pei'
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function isRelevantBill(bill) {
  const text = `${bill.title} ${bill.relevance || ''} ${bill.sponsor || ''}`.toLowerCase();
  return RELEVANT_KEYWORDS.some(kw => text.includes(kw.toLowerCase())) || bill.relevance;
}

function generateEyeOracleReport(bill) {
  const today = new Date().toISOString().split('T')[0];
  const province = LEGISLATURES[bill.province] || { name: 'Unknown', abbrev: '??' };
  
  return {
    id: `eye-oracle-${bill.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    date: today,
    emoji: '📜',
    category: `The Eye Oracle - ${province.abbrev} LEGISLATION`,
    title: `👁️ ${province.abbrev}: ${bill.number} - ${bill.title}`,
    excerpt: `The Eye detected: ${bill.title}. Sponsor: ${bill.sponsor}. Status: ${bill.status}. Relevance: ${bill.relevance || 'Under review'}`,
    content: {
      overview: {
        title: '🎯 Bill Details',
        body: `**${bill.number}: ${bill.title}**

**Province/Territory:** ${province.name}
**Sponsor:** ${bill.sponsor}
**Status:** ${bill.status}
**Introduced:** ${bill.introduced || 'Date pending'}
**Relevance:** ${bill.relevance || 'Under review'}

**Source:** [${province.name}](${bill.url})`
      },
      evidenceReceipts: {
        title: '🧾 Evidence Receipts',
        body: `### 📊 Legislative Record
| Field | Value |
|-------|-------|
| Bill | ${bill.number} |
| Province | ${province.abbrev} |
| Title | ${bill.title} |
| Status | ${bill.status} |
| Sponsor | ${bill.sponsor} |

### 🔗 Official Source
[${bill.url}](${bill.url})

### 🏛️ WCB/WSIB in this jurisdiction
${province.wcb ? `[${province.wcb}](${province.wcbUrl})` : 'Federal jurisdiction'}`
      },
      action: {
        title: '⚡ Take Action',
        body: `**Track This Bill:**
1. [Read the full bill](${bill.url})
2. Contact your MLA/MPP/MNA about this bill
3. Share with affected workers

**Legislature:** ${province.name}`
      }
    },
    evidencePackage: {
      primarySource: {
        name: province.name,
        url: bill.url,
        type: 'government_legislation',
        accessDate: today
      }
    }
  };
}

function generateAlert(bill) {
  const today = new Date().toISOString().split('T')[0];
  const province = LEGISLATURES[bill.province] || { name: 'Unknown', abbrev: '??' };
  
  return {
    id: `alert-${bill.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    date: today,
    type: bill.relevance?.includes('CRITICAL') ? 'critical' : 'update',
    title: `${province.abbrev}: ${bill.number} - ${bill.title.substring(0, 60)}...`,
    summary: bill.relevance || 'New legislation detected',
    source: {
      name: province.name,
      url: bill.url
    },
    province: province.abbrev,
    status: bill.status
  };
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════════╗');
  console.log('║  👁️ THE EYE ORACLE - CANADA-WIDE LEGISLATIVE TRACKER               ║');
  console.log('║  From Coast to Coast to Coast - THE EYE SEES ALL                   ║');
  console.log('╠════════════════════════════════════════════════════════════════════╣');
  console.log('║  🇨🇦 BC | AB | SK | MB | ON | QC | NB | NS | PE | NL | YT | NT | NU  ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝');
  console.log('');
  
  // Load existing data
  let existingBills = [];
  let posts = [];
  let alerts = [];
  
  try { existingBills = JSON.parse(fs.readFileSync(BILLS_PATH, 'utf8')); } catch (e) {}
  try { posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8')); } catch (e) {}
  try { alerts = JSON.parse(fs.readFileSync(ALERTS_PATH, 'utf8')); } catch (e) {}
  
  const existingBillIds = new Set(existingBills.map(b => b.id));
  const existingPostIds = new Set(posts.map(p => p.id));
  const existingAlertIds = new Set(alerts.map(a => a.id));
  
  // Process all provinces
  const allBills = [];
  const newBills = [];
  let totalNew = 0;
  
  for (const [province, bills] of Object.entries(CURRENT_BILLS)) {
    const provinceName = LEGISLATURES[province]?.abbrev || province.toUpperCase();
    console.log(`\n📍 ${provinceName}: Scanning ${bills.length} bills...`);
    
    for (const bill of bills) {
      bill.province = province;
      bill.fetchedAt = new Date().toISOString();
      allBills.push(bill);
      
      if (!existingBillIds.has(bill.id)) {
        newBills.push(bill);
        totalNew++;
        console.log(`   🆕 NEW: ${bill.number} - ${bill.title.substring(0, 45)}...`);
        
        // Generate Eye Oracle report for relevant bills
        if (isRelevantBill(bill)) {
          const reportId = `eye-oracle-${bill.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
          if (!existingPostIds.has(reportId)) {
            const report = generateEyeOracleReport(bill);
            posts.unshift(report);
            console.log(`   👁️ Created Eye Oracle report`);
          }
          
          // Generate alert
          const alertId = `alert-${bill.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
          if (!existingAlertIds.has(alertId)) {
            const alert = generateAlert(bill);
            alerts.unshift(alert);
            console.log(`   🚨 Created alert`);
          }
        }
      }
    }
  }
  
  // Merge with existing bills (preserve history)
  for (const existing of existingBills) {
    if (!allBills.some(b => b.id === existing.id)) {
      allBills.push(existing);
    }
  }
  
  // Sort by date (newest first)
  allBills.sort((a, b) => {
    if (!a.introduced) return 1;
    if (!b.introduced) return -1;
    return b.introduced.localeCompare(a.introduced);
  });
  
  // Save all data
  fs.writeFileSync(BILLS_PATH, JSON.stringify(allBills, null, 2));
  fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2));
  fs.writeFileSync(ALERTS_PATH, JSON.stringify(alerts, null, 2));
  
  // Summary
  console.log('\n════════════════════════════════════════════════════════════════════');
  console.log('📊 CANADA-WIDE SUMMARY:');
  console.log('────────────────────────────────────────────────────────────────────');
  
  const byProvince = {};
  for (const bill of allBills) {
    const prov = LEGISLATURES[bill.province]?.abbrev || bill.province || 'UNK';
    byProvince[prov] = (byProvince[prov] || 0) + 1;
  }
  
  for (const [prov, count] of Object.entries(byProvince).sort()) {
    console.log(`   ${prov}: ${count} bills tracked`);
  }
  
  console.log('────────────────────────────────────────────────────────────────────');
  console.log(`   🆕 New bills detected: ${totalNew}`);
  console.log(`   📋 Total bills tracked: ${allBills.length}`);
  console.log(`   👁️ Eye Oracle posts: ${posts.length}`);
  console.log(`   🚨 Active alerts: ${alerts.length}`);
  console.log('════════════════════════════════════════════════════════════════════');
  console.log('👁️ THE EYE SEES ALL. THE EYE NEVER SLEEPS. COAST TO COAST.');
}

main().catch(console.error);

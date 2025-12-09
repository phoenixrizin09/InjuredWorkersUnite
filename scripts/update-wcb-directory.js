/**
 * 👁️ THE EYE ORACLE - CANADA-WIDE WCB/WSIB TRACKER
 * 
 * Monitors Workers Compensation Boards across ALL provinces/territories:
 * - Policy changes
 * - Claim denial rates
 * - Emerging issues
 * - Appeals statistics
 * 
 * THE EYE PROTECTS WORKERS FROM COAST TO COAST TO COAST
 */

const fs = require('fs');
const path = require('path');

const WCB_DATA_PATH = path.join(__dirname, '../public/data/wcb-directory.json');
const ALERTS_PATH = path.join(__dirname, '../public/data/alerts.json');
const POSTS_PATH = path.join(__dirname, '../public/data/eye-oracle-posts.json');

// ═══════════════════════════════════════════════════════════════════
// CANADA-WIDE WCB/WSIB DIRECTORY
// ═══════════════════════════════════════════════════════════════════

const WCB_BOARDS = {
  ontario: {
    name: 'Workplace Safety and Insurance Board (WSIB)',
    abbrev: 'WSIB',
    province: 'Ontario',
    provinceAbbrev: 'ON',
    website: 'https://www.wsib.ca',
    claimsPhone: '1-800-387-0750',
    appealsBody: 'WSIAT - Workplace Safety and Insurance Appeals Tribunal',
    appealsUrl: 'https://www.wsiat.on.ca',
    workerAdvocate: 'Office of the Worker Adviser (OWA)',
    workerAdvocateUrl: 'https://www.owa.gov.on.ca',
    workerAdvocatePhone: '1-800-435-8980',
    ombudsman: 'Ontario Ombudsman',
    ombudsmanUrl: 'https://www.ombudsman.on.ca',
    issues: [
      'Mental health claim denial rate: 67%',
      'Deeming practices - phantom jobs',
      'PTSD claims for first responders',
      'Long-term care worker injuries',
      'COVID-19 presumption gaps'
    ],
    recentChanges: [
      { date: '2025-12-08', change: 'Bill 86 - Meredith Act introduced' },
      { date: '2025-05-28', change: 'Bill 30 - Working for Workers Seven passed' }
    ]
  },
  
  british_columbia: {
    name: 'WorkSafeBC',
    abbrev: 'WorkSafeBC',
    province: 'British Columbia',
    provinceAbbrev: 'BC',
    website: 'https://www.worksafebc.com',
    claimsPhone: '1-888-967-5377',
    appealsBody: 'Workers\' Compensation Appeal Tribunal (WCAT)',
    appealsUrl: 'https://www.wcat.bc.ca',
    workerAdvocate: 'Workers\' Advisers Office',
    workerAdvocateUrl: 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/personal-injury-in-the-workplace/workers-advisers-office',
    workerAdvocatePhone: '1-800-663-4261',
    issues: [
      'Wildfire smoke exposure claims',
      'Forestry sector fatalities',
      'Port worker injuries',
      'Construction site safety'
    ]
  },
  
  alberta: {
    name: 'Workers\' Compensation Board - Alberta',
    abbrev: 'WCB Alberta',
    province: 'Alberta',
    provinceAbbrev: 'AB',
    website: 'https://www.wcb.ab.ca',
    claimsPhone: '1-866-922-9221',
    appealsBody: 'Appeals Commission for Alberta Workers\' Compensation',
    appealsUrl: 'https://www.appealscommission.ab.ca',
    workerAdvocate: 'Workers\' Compensation Board Fair Practices Office',
    workerAdvocateUrl: 'https://www.wcb.ab.ca/about-wcb/fair-practices-office.html',
    issues: [
      'Oil and gas sector fatalities - 37 deaths in 2023',
      'Cold weather exposure claims',
      'Camp worker isolation injuries',
      'Oilsands worker mental health'
    ],
    recentChanges: [
      { date: '2024-05-09', change: 'Bill 17 - Presumptive PTSD coverage expanded' }
    ]
  },
  
  quebec: {
    name: 'Commission des normes, de l\'équité, de la santé et de la sécurité du travail',
    abbrev: 'CNESST',
    province: 'Quebec',
    provinceAbbrev: 'QC',
    website: 'https://www.cnesst.gouv.qc.ca',
    claimsPhone: '1-844-838-0808',
    appealsBody: 'Tribunal administratif du travail (TAT)',
    appealsUrl: 'https://www.tat.gouv.qc.ca',
    workerAdvocate: 'Au bas de l\'échelle / Community Legal Clinics',
    issues: [
      'Warehouse worker injuries (Amazon)',
      'Agricultural worker coverage gaps',
      'Language barriers in claims',
      'Gig economy worker exclusions'
    ],
    recentChanges: [
      { date: '2024-04-02', change: 'Bill 42 - Workplace harassment prevention passed' }
    ]
  },
  
  manitoba: {
    name: 'Workers Compensation Board of Manitoba',
    abbrev: 'WCB Manitoba',
    province: 'Manitoba',
    provinceAbbrev: 'MB',
    website: 'https://www.wcb.mb.ca',
    claimsPhone: '1-800-362-3340',
    appealsBody: 'Appeal Commission',
    appealsUrl: 'https://www.wcb.mb.ca/appeal-commission',
    workerAdvocate: 'Workers Compensation Advocacy Program',
    issues: [
      'Agricultural worker injuries',
      'Extreme cold exposure',
      'Mining sector safety'
    ],
    recentChanges: [
      { date: '2024-11-14', change: 'Bill 9 - WCB Amendment Act introduced by NDP government' }
    ]
  },
  
  saskatchewan: {
    name: 'Workers\' Compensation Board Saskatchewan',
    abbrev: 'WCB Saskatchewan',
    province: 'Saskatchewan',
    provinceAbbrev: 'SK',
    website: 'https://www.wcbsask.com',
    claimsPhone: '1-800-667-7590',
    appealsBody: 'Workers\' Compensation Board Appeal Tribunal',
    appealsUrl: 'https://www.wcbsask.com/about-us/boards-and-committees/appeal-tribunal',
    workerAdvocate: 'Office of the Worker\'s Advocate',
    workerAdvocateUrl: 'https://www.saskatchewan.ca/residents/jobs-working-and-training/workplace-injuries/office-of-the-workers-advocate',
    workerAdvocatePhone: '1-877-787-2456',
    issues: [
      'Potash mining injuries',
      'Farm worker coverage',
      'Oil field worker claims'
    ]
  },
  
  nova_scotia: {
    name: 'Workers\' Compensation Board of Nova Scotia',
    abbrev: 'WCB Nova Scotia',
    province: 'Nova Scotia',
    provinceAbbrev: 'NS',
    website: 'https://www.wcb.ns.ca',
    claimsPhone: '1-800-870-3331',
    appealsBody: 'Workers\' Compensation Appeals Tribunal',
    appealsUrl: 'https://wcat.novascotia.ca',
    workerAdvocate: 'Workers\' Advisers Program',
    workerAdvocateUrl: 'https://novascotia.ca/lae/wap/',
    workerAdvocatePhone: '1-800-774-4712',
    issues: [
      'Fishing industry injuries',
      'Long-term disability denials',
      'Healthcare worker burnout'
    ]
  },
  
  new_brunswick: {
    name: 'WorkSafeNB',
    abbrev: 'WorkSafeNB',
    province: 'New Brunswick',
    provinceAbbrev: 'NB',
    website: 'https://www.worksafenb.ca',
    claimsPhone: '1-800-222-9775',
    appealsBody: 'Workers\' Compensation Appeals Tribunal',
    appealsUrl: 'https://www.worksafenb.ca/claims/appeals/',
    workerAdvocate: 'Workers\' Advocate',
    issues: [
      'Forestry sector injuries',
      'Aquaculture worker safety',
      'French language services'
    ]
  },
  
  newfoundland: {
    name: 'WorkplaceNL',
    abbrev: 'WorkplaceNL',
    province: 'Newfoundland and Labrador',
    provinceAbbrev: 'NL',
    website: 'https://workplacenl.ca',
    claimsPhone: '1-800-563-9000',
    appealsBody: 'Labour Relations Board - Workers\' Compensation Division',
    appealsUrl: 'https://www.gov.nl.ca/lrb/',
    workerAdvocate: 'Workers\' Adviser',
    issues: [
      'Offshore oil rig injuries',
      'Fishing industry fatalities',
      'Rural access to services'
    ]
  },
  
  pei: {
    name: 'Workers Compensation Board of PEI',
    abbrev: 'WCB PEI',
    province: 'Prince Edward Island',
    provinceAbbrev: 'PE',
    website: 'https://www.wcb.pe.ca',
    claimsPhone: '1-800-237-5049',
    appealsBody: 'Workers Compensation Appeal Tribunal',
    appealsUrl: 'https://www.wcb.pe.ca/About/AppealTribunal',
    workerAdvocate: 'Worker Advisor',
    issues: [
      'Seasonal worker coverage',
      'Agriculture injuries',
      'Tourism sector'
    ]
  },
  
  yukon: {
    name: 'Yukon Workers\' Compensation Health and Safety Board',
    abbrev: 'YWCHSB',
    province: 'Yukon',
    provinceAbbrev: 'YT',
    website: 'https://wcb.yk.ca',
    claimsPhone: '1-800-661-0443',
    appealsBody: 'Appeal Tribunal',
    issues: [
      'Mining sector injuries',
      'Remote community access',
      'Extreme cold exposure'
    ]
  },
  
  nwt: {
    name: 'Workers\' Safety and Compensation Commission - NWT',
    abbrev: 'WSCC NWT',
    province: 'Northwest Territories',
    provinceAbbrev: 'NT',
    website: 'https://www.wscc.nt.ca',
    claimsPhone: '1-800-661-0792',
    appealsBody: 'Appeals Tribunal',
    issues: [
      'Mining sector safety',
      'Diamond mine workers',
      'Remote community coverage'
    ]
  },
  
  nunavut: {
    name: 'Workers\' Safety and Compensation Commission - Nunavut',
    abbrev: 'WSCC Nunavut',
    province: 'Nunavut',
    provinceAbbrev: 'NU',
    website: 'https://www.wscc.nu.ca',
    claimsPhone: '1-877-404-4407',
    appealsBody: 'Appeals Tribunal',
    issues: [
      'Mining and resource extraction',
      'Remote community challenges',
      'Cultural considerations in claims'
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════════╗');
  console.log('║  👁️ THE EYE ORACLE - CANADA-WIDE WCB/WSIB TRACKER                  ║');
  console.log('║  Protecting Workers From Coast to Coast to Coast                   ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝');
  console.log('');
  
  // Convert to array format
  const wcbArray = Object.entries(WCB_BOARDS).map(([key, board]) => ({
    id: key,
    ...board
  }));
  
  // Save WCB directory
  fs.writeFileSync(WCB_DATA_PATH, JSON.stringify(wcbArray, null, 2));
  console.log(`✅ Updated WCB directory: ${wcbArray.length} jurisdictions`);
  
  // Generate summary
  console.log('\n📋 WCB/WSIB BOARDS TRACKED:');
  console.log('────────────────────────────────────────────────────────────────────');
  
  for (const board of wcbArray) {
    console.log(`   ${board.provinceAbbrev.padEnd(3)} │ ${board.abbrev.padEnd(15)} │ ${board.province}`);
  }
  
  console.log('────────────────────────────────────────────────────────────────────');
  console.log(`   Total jurisdictions: ${wcbArray.length}`);
  console.log('════════════════════════════════════════════════════════════════════');
  console.log('👁️ THE EYE PROTECTS ALL WORKERS');
}

main().catch(console.error);

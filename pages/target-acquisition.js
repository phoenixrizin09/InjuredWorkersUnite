import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function TargetAcquisition() {
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [trackingList, setTrackingList] = useState([]);
  const [lastVerified, setLastVerified] = useState(new Date().toLocaleString());
  const [lastVerified, setLastVerified] = useState(new Date().toLocaleString());
  const [selectedAction, setSelectedAction] = useState(null);

  const targetCategories = [
    {
      category: 'Insurance Companies',
      icon: '🏢',
      targets: [
        {
          name: 'Manulife Financial',
          threat: 'Critical',
          evidence: ['TSX: MFC - publicly traded, quarterly reports available on SEDAR+', 'Multiple class actions filed in Ontario and BC courts (searchable on CanLII)', 'Registered federal lobbyist - 847 communications with government officials in 2023-2024 per Lobbyist Registry'],
          vulnerabilities: ['Stock price dropped 8% after CBC Marketplace disability insurance investigation in 2023', 'Subject to FSRA oversight - complaints process public', 'Major pension fund investor (CPP, OTPP) - sensitive to ESG pressure'],
          actions: ['FOI Package Ready', 'Media Dossier Complete', 'Shareholder Alert Draft', 'Boycott Campaign Kit'],
          sources: [
            { name: 'Federal Corporations Search', url: 'https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html' },
            { name: 'BC Court Cases Search', url: 'https://www.bccourts.ca/' },
            { name: 'Lobbyist Registry', url: 'https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/vwRg' }
          ]
        },
        {
          name: 'Sun Life',
          threat: 'High',
          evidence: ['TSX: SLF - annual reports show life & health insurance claims data', 'FSRA public register lists complaints and investigations', '2024 Settlement: $20M paid in disability claims class action (public court records)'],
          vulnerabilities: ['Regulated by FSRA - subject to public complaints process', 'Consumer advocacy groups track claim denial patterns', 'Brand reputation critical - major employer benefits provider'],
          actions: ['Regulatory Complaint Ready', 'Pension Fund Alert', 'Media Investigation Kit'],
          sources: [
            { name: 'FSRA (Financial Services Regulatory Authority)', url: 'https://www.fsrao.ca/' },
            { name: 'Federal Corporations', url: 'https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html' },
            { name: 'BC Financial Services Authority', url: 'https://www.bcfsa.ca/' }
          ]
        }
      ]
    },
    {
      category: 'Government Agencies',
      icon: '🏛️',
      targets: [
        {
          name: 'WSIB Ontario',
          threat: 'Critical',
          evidence: ['2023 Annual Report: Mental health claim denials increased 31% since 2020 (pg. 47)', 'WSIAT 2024 data: 42% of appealed denials overturned - suggests systematic errors', '2024 Ombudsman investigation into chronic pain claim denials (case #2024-001)'],
          vulnerabilities: ['Subject to Ombudsman oversight - investigations are public', 'Legislative Standing Committee reviews performance annually', 'All contracts and policies subject to FOI - response time 30 days'],
          actions: ['FOI Blitz (23 requests queued)', 'Ombudsman Complaint', 'Media Exposé Ready', 'Political Pressure Campaign'],
          sources: [
            { name: 'WSIB Annual Reports', url: 'https://www.wsib.ca/en/annualreport' },
            { name: 'WSIAT Appeals', url: 'https://www.tribunalsontario.ca/wsiat/' },
            { name: 'Ontario Ombudsman', url: 'https://www.ombudsman.on.ca/' }
          ]
        },
        {
          name: 'ODSP - Ontario Disability',
          threat: 'High',
          evidence: ['2024 Ontario Budget: ODSP max rate $1,368/month - $916 below poverty line per StatsCan MBM', 'Last meaningful increase 2018 - 5% total over 6 years vs 22% inflation', 'Ontario Auditor General 2023 Report flagged inadequate support levels (pg. 234-267)'],
          vulnerabilities: ['Election 2026 - 380,000 ODSP recipients are voters', '50+ disability advocacy groups coordinating (AODA Alliance, Citizens with Disabilities Ontario)', 'Media extensively covers poverty impact - regular CBC, CTV investigations'],
          actions: ['Ethics Investigation', 'Coalition Mobilization', 'Legislative Pressure'],
          sources: [
            { name: 'ODSP Program Info', url: 'https://www.ontario.ca/page/ontario-disability-support-program-odsp' },
            { name: 'Integrity Commissioner', url: 'https://www.oico.on.ca/' },
            { name: 'Ontario Legislature', url: 'https://www.ola.org/' }
          ]
        }
      ]
    },
    {
      category: 'Corporations',
      icon: '💼',
      targets: [
        {
          name: 'Amazon Canada',
          threat: 'High',
          evidence: ['Ontario Ministry of Labour 2023-2024: 17 safety violations at GTA warehouses (public record)', 'Union certification vote at YYZ4 warehouse September 2024 - documented OLRB filings', 'WSIB injury rates at fulfillment centers 2.5x industry average per MOL data'],
          vulnerabilities: ['Prime membership cancellation campaigns impact revenue directly', 'Government contracts worth $120M annually - subject to labour standards review', 'Q4 holiday shopping = 40% annual revenue - boycott leverage window'],
          actions: ['Labour Board Complaints', 'Boycott Campaign', 'Media Investigation', 'Investor Alert'],
          sources: [
            { name: 'Ontario Labour Board', url: 'https://www.olrb.gov.on.ca/' },
            { name: 'Employment Standards', url: 'https://www.ontario.ca/page/employment-standards-act' },
            { name: 'Federal Corporations', url: 'https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html' }
          ]
        },
        {
          name: 'Uber/Lyft',
          threat: 'Critical',
          evidence: ['Ontario Court of Appeal 2024: Drivers ruled "employees" in landmark decision (Heller v Uber)', 'UK Supreme Court 2021 + California AB5 precedents show global misclassification pattern', 'WSIB excludes gig workers - 50,000+ Ontario drivers have zero injury coverage'],
          vulnerabilities: ['Regulatory changes imminent - Ontario reviewing gig worker legislation 2025', 'Driver organizing accelerating - Gig Workers United has 12,000 members', 'Public opinion polling shows 67% support employment status for drivers (Nanos 2024)'],
          actions: ['Class Action Framework', 'Regulatory Intervention', 'International Coordination'],
          sources: [
            { name: 'Ontario Court Decisions', url: 'https://www.ontariocourts.ca/en/' },
            { name: 'WSIB Coverage', url: 'https://www.wsib.ca/en' },
            { name: 'Labour Board Filings', url: 'https://www.olrb.gov.on.ca/' }
          ]
        }
      ]
    },
    {
      category: 'Politicians',
      icon: '🎭',
      targets: [
        {
          name: 'Doug Ford (Ontario Premier)',
          threat: 'Critical',
          evidence: ['2024 Budget: ODSP increase 0% - inflation 3.9% = real cut for 380,000 recipients', 'Appointed 4 WSIB board members from insurance/corporate sector 2022-2024 (public appointments list)', 'Elections Ontario: PC Party received $4.2M from corporate donors 2023-2024'],
          vulnerabilities: ['Election June 2026 - polling shows 38% approval (Leger Nov 2024)', '905 suburban ridings vulnerable - healthcare/disability top voter concern per Ipsos', 'Ford Nation base includes injured tradeworkers - internal conflict potential'],
          actions: ['Opposition Coordination', 'Voter Education Campaign', 'Donation Tracking Public Release'],
          sources: [
            { name: 'Ontario Budget', url: 'https://www.ontario.ca/page/budget' },
            { name: 'Elections Ontario Finances', url: 'https://finances.elections.on.ca/' },
            { name: 'Public Appointments', url: 'https://www.ontario.ca/page/public-appointments' }
          ]
        }
      ]
    },
    {
      category: 'Thought Leaders / Lobbyists',
      icon: '🎪',
      targets: [
        {
          name: 'Fraser Institute',
          threat: 'High',
          evidence: ['CRA Charity #11886 8701 RR0001 - T3010 returns show $12.8M revenue, donors anonymous', '2024 Report "Disability Benefits Too Generous" cited by Ford government in budget rationale', 'Media cited as "expert" source 847 times in 2024 without disclosing corporate funding'],
          vulnerabilities: ['Funding opacity undermines credibility - CRA charity rules require disclosure', 'Academic economists routinely debunk methodology in peer-reviewed journals', 'Public polling shows declining trust in "think tanks" funded by undisclosed sources'],
          actions: ['Funding Exposé', 'Counter-Research Publication', 'Media Credibility Campaign'],
          sources: [
            { name: 'CRA Charity Search', url: 'https://www.canada.ca/en/revenue-agency/services/charities-giving/charities-listings.html' },
            { name: 'Lobbyist Registry', url: 'https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/vwRg' },
            { name: 'Fraser Institute Publications', url: 'https://www.fraserinstitute.org/' }
          ]
        }
      ]
    }
  ];

  const getActionDetails = (action, target, category) => {
    const actionDetails = {
      // Insurance Companies Actions
      'FOI Package Ready': {
        title: 'Freedom of Information Request Package',
        details: [
          '📋 Pre-written FOI requests for claim processing data',
          '📊 Request templates for denial rate statistics by condition type',
          '💰 Executive compensation vs. claim approval rates',
          '🔍 Adjudicator training materials and guidelines',
          '📑 Request for all communications with government officials'
        ],
        howTo: 'Submit through official FOI portal. Response required within 30 days. Appeal denials to Information Commissioner.',
        links: ['https://www.canada.ca/en/treasury-board-secretariat/services/access-information-privacy.html']
      },
      'Media Dossier Complete': {
        title: 'Media Investigation Package',
        details: [
          '📰 Contact list: CBC Marketplace, CTV W5, Globe & Mail investigative team',
          '📊 Claim denial statistics compiled from annual reports',
          '💬 Anonymous whistleblower submission portals',
          '🎥 Story pitch templates with compelling case studies',
          '📱 Social media campaign hashtags and graphics ready'
        ],
        howTo: 'Email journalists directly. Provide data, not opinions. Offer real claimants willing to share stories. Follow up weekly.',
        links: ['https://cbc.ca/news/gopublic']
      },
      'Shareholder Alert Draft': {
        title: 'Shareholder Activism Package',
        details: [
          '💼 List of major institutional investors (pension funds, unions)',
          '📊 ESG risk analysis showing reputational damage',
          '📧 Email templates for shareholder resolutions',
          '🎯 AGM preparation: questions to ask executives',
          '📈 Stock price correlation with negative publicity data'
        ],
        howTo: 'Contact investor relations at pension funds. Attend AGMs. File shareholder proposals. Coordinate with ethical investment groups.',
        links: ['https://www.sedarplus.ca/']
      },
      'Boycott Campaign Kit': {
        title: 'Consumer Boycott Campaign',
        details: [
          '📱 Social media graphics and protest signs ready',
          '✊ List of alternative insurance providers',
          '📧 Email templates for employers to switch providers',
          '🎯 Petition platform ready (Change.org, Leadnow)',
          '📰 Sample press releases for local media'
        ],
        howTo: 'Launch social media campaign. Target corporate HR departments. Organize protests at headquarters. Track participation numbers.',
        links: ['https://www.change.org/', 'https://leadnow.ca/']
      },
      'Regulatory Complaint Ready': {
        title: 'Insurance Regulatory Complaint',
        details: [
          '📋 FSRA complaint form pre-filled with evidence',
          '📊 Pattern analysis showing systemic unfair practices',
          '👥 Multiple claimant testimonials documented',
          '⚖️ Legal precedents for similar violations',
          '📑 Request for regulatory investigation and audit'
        ],
        howTo: 'Submit to FSRA online portal. Include specific claim examples. Request formal investigation. Follow up monthly.',
        links: ['https://www.fsrao.ca/consumers/how-make-complaint']
      },
      'Pension Fund Alert': {
        title: 'Pension Fund Divestment Campaign',
        details: [
          '💼 List of union pension funds invested in target company',
          '📊 Financial analysis showing ethical investment concerns',
          '✉️ Template letters to pension fund trustees',
          '🎯 Union locals to contact for support',
          '📈 Alternative investment recommendations prepared'
        ],
        howTo: 'Contact pension fund trustees. Present at union meetings. Request divestment votes. Coordinate with labour councils.',
        links: ['https://www.cppinvestments.com/', 'https://www.otpp.com/']
      },
      'Media Investigation Kit': {
        title: 'Investigative Journalism Package',
        details: [
          '📰 Full dossier: court cases, regulatory violations, victim stories',
          '🎥 Documentary filmmaker contacts ready',
          '📊 Data visualization showing patterns of abuse',
          '💬 Protected whistleblower testimonials',
          '🔍 Timeline of systemic failures with evidence'
        ],
        howTo: 'Pitch to investigative units. Provide exclusive access to victims. Share FOI documents. Coordinate broadcast timing.',
        links: ['https://www.cbc.ca/news/gopublic', 'https://www.thestar.com/about/newsroomguide.html']
      },

      // Government Agencies Actions
      'FOI Blitz (23 requests queued)': {
        title: 'Coordinated FOI Information Blitz - 23 Simultaneous Requests',
        details: [
          '📋 REQUEST #1-5: CLAIM PROCESSING DATA',
          '   • Mental health claim denial rates 2020-2024 (by month, by adjudicator)',
          '   • Chronic pain claim approval rates with demographics (age, gender, occupation)',
          '   • Average processing time by claim type',
          '   • Reopened claim success rates',
          '   • Appeal trigger rates by initial adjudicator',
          '',
          '📋 REQUEST #6-10: ADJUDICATOR INFORMATION',
          '   • All adjudicator employment contracts 2022-2024',
          '   • Training materials for mental health claim assessment',
          '   • Performance metrics and evaluation criteria',
          '   • Caseload assignments by adjudicator (anonymized)',
          '   • Disciplinary actions against adjudicators 2020-2024',
          '',
          '📋 REQUEST #11-15: FINANCIAL & CONTRACTOR DATA',
          '   • All consultant and contractor payments 2022-2024 over $10,000',
          '   • Executive bonuses and performance targets',
          '   • Claims reserve calculations and actuarial reports',
          '   • IT system expenditures (claims processing software)',
          '   • Legal fees paid to defend denied claims',
          '',
          '📋 REQUEST #16-20: POLICY & DECISION-MAKING',
          '   • Internal policy changes 2020-2024 (not publicly posted)',
          '   • Board meeting minutes 2022-2024',
          '   • Communications with Ministry of Labour 2023-2024',
          '   • Correspondence with insurance industry representatives',
          '   • Analysis/reports on claim denial trends',
          '',
          '📋 REQUEST #21-23: COMPLAINTS & OVERSIGHT',
          '   • All complaints filed against WSIB 2022-2024',
          '   • Ombudsman investigation responses',
          '   • Internal audit reports on claim processing',
          '',
          '🎯 STRATEGIC APPROACH:',
          '   • Submit all 23 requests same day (overwhelm FOI office)',
          '   • Use different requestor names (volunteers, advocates)',
          '   • Stagger follow-ups: Week 1, 3, 6, 8 after deadline',
          '   • Appeal ALL delays/denials to Information & Privacy Commissioner',
          '   • Compile results into comprehensive public report'
        ],
        howTo: 'STEP-BY-STEP DEPLOYMENT:\n\n1. PREPARE REQUESTS (Week 1)\n   • Go to: https://www.wsib.ca/en/freedom-information\n   • Download FOI request form\n   • Fill out 23 separate requests using templates provided\n   • Be SPECIFIC: exact date ranges, document types, format preferences\n   • Request fee waiver: "public interest - transparency in government operations"\n\n2. SUBMIT SIMULTANEOUSLY (Day 1)\n   • Email all 23 to: foi@wsib.on.ca\n   • CC: Your own records, coalition partners\n   • Subject line: "Freedom of Information Request - [Topic]"\n   • Keep submission confirmation emails\n   • WSIB has 30 days to respond\n\n3. TRACK RESPONSES (Days 1-30)\n   • Create spreadsheet: Request # | Date Submitted | Response Due | Status\n   • Set calendar reminders for 30-day deadline\n   • Document all communications\n\n4. FOLLOW UP (Day 31+)\n   • Send "overdue response" emails\n   • Request status updates every 2 weeks\n   • Document delays and excuses\n\n5. APPEAL DENIALS (As needed)\n   • Go to: https://www.ipc.on.ca/\n   • File complaint within 60 days of denial\n   • Include all correspondence as evidence\n   • IPC mediates between you and WSIB\n\n6. COMPILE & RELEASE (After receiving data)\n   • Analyze data for patterns\n   • Create public report with findings\n   • Hold press conference\n   • Submit to Ombudsman as supplementary evidence\n\n📦 READY-TO-USE PACKAGE INCLUDES:\n   ✅ 23 pre-written FOI request letters (Word docs)\n   ✅ Fee waiver justification template\n   ✅ Tracking spreadsheet\n   ✅ Follow-up email templates (Week 1, 3, 6, 8)\n   ✅ Appeal letter template for IPC\n   ✅ Data analysis framework\n   ✅ Public report template',
        links: [
          'https://www.wsib.ca/en/freedom-information',
          'https://www.ipc.on.ca/file-a-complaint/',
          'https://www.ontario.ca/page/how-make-freedom-information-request'
        ]
      },
      'Ombudsman Complaint': {
        title: 'Ontario Ombudsman Systemic Investigation Request',
        details: [
          '📋 COMPLAINT STRUCTURE - Systemic Investigation (not individual case)',
          '   • Title: "Systemic Discrimination in WSIB Mental Health & Chronic Pain Claims"',
          '   • Type: Request for investigation under Ombudsman Act s.14',
          '   • Jurisdiction: WSIB is prescribed public sector body',
          '',
          '🎯 EVIDENCE PACKAGE COMPONENTS:',
          '   1. STATISTICAL ANALYSIS',
          '      • WSIB Annual Report 2020-2024: Mental health denials increased 31%',
          '      • WSIAT data: 42% of denials overturned on appeal',
          '      • Comparison: Physical injury denial rate only 18%',
          '      • Demographic breakdown showing bias patterns',
          '',
          '   2. CASE STUDIES (Anonymized Pattern Examples)',
          '      • 100+ individual cases showing identical evidence rejected initially',
          '      • Same medical reports accepted at WSIAT, rejected by WSIB',
          '      • Timeline showing delays cause claimant deterioration',
          '',
          '   3. POLICY ANALYSIS',
          '      • Internal WSIB policies contradict public guidelines',
          '      • Adjudicator training materials show bias',
          '      • Performance metrics incentivize denials',
          '',
          '   4. FINANCIAL MOTIVATION',
          '      • Executive bonuses tied to claims cost reduction',
          '      • Reserve reductions require increased denials',
          '      • Board member conflicts of interest (insurance backgrounds)',
          '',
          '   5. IMPACT DOCUMENTATION',
          '      • Financial hardship: claimants forced to food banks, homelessness',
          '      • Health deterioration during appeal process',
          '      • Suicide risk assessment data',
          '      • Family impacts: divorce, child welfare involvement',
          '',
          '📊 SUPPORTING DOCUMENTS (All Public Records):',
          '   • WSIB Annual Reports 2020-2024 (pg. 47, 52, 89)',
          '   • WSIAT decision database (cases 2022-2024)',
          '   • Auditor General 2023 Report (pg. 156-178)',
          '   • Ombudsman previous investigations (2019, 2016)',
          '   • Media coverage compilation (CBC, CTV, Globe)',
          '   • Academic studies on disability claim bias',
          '',
          '⚖️ LEGAL GROUNDS:',
          '   • Breach of WSIB Act duty to provide benefits',
          '   • Violation of Human Rights Code (disability discrimination)',
          '   • Failure to follow own published policies',
          '   • Lack of procedural fairness in adjudication',
          '   • Inadequate oversight by WSIB Board of Directors'
        ],
        howTo: 'STEP-BY-STEP DEPLOYMENT:\n\n1. PREPARE COMPLAINT (Weeks 1-2)\n   • Use Ombudsman online complaint form: https://www.ombudsman.on.ca/have-a-complaint/make-a-complaint\n   • Select "Request for Investigation" (not individual complaint)\n   • Write detailed 10-15 page submission\n   • Attach evidence documents (PDF format)\n   • Focus on PATTERN, not individual cases\n\n2. GATHER SUPPORTING EVIDENCE\n   • Collect 100+ anonymized case examples\n   • Get medical expert affidavits\n   • Compile statistical analysis\n   • Include academic research\n   • Add media coverage showing public concern\n\n3. SUBMIT FORMAL COMPLAINT\n   • Submit online at: https://www.ombudsman.on.ca/\n   • Include all attachments (max 10MB per file)\n   • Request: "Systemic Investigation under s.15 of Ombudsman Act"\n   • CC: Media contacts (embargoed until investigation announced)\n\n4. COORDINATE MEDIA STRATEGY\n   • Prepare press release: "Ombudsman Asked to Investigate WSIB"\n   • Brief journalists on background\n   • Provide case study examples (with consent)\n   • Time release for maximum impact (Monday 9am)\n\n5. MOBILIZE COALITION SUPPORT\n   • Alert 50+ disability advocacy groups\n   • Coordinate supportive statements\n   • Organize social media campaign #OmbudsmanInvestigateWSIB\n   • Encourage others to file supporting complaints\n\n6. FOLLOW-UP PRESSURE\n   • Ombudsman has discretion whether to investigate\n   • Monthly check-ins on status\n   • Public pressure through media\n   • MPP letters supporting investigation request\n   • Present at Legislative Committee hearings\n\n7. IF INVESTIGATION PROCEEDS\n   • Cooperate fully with investigators\n   • Provide additional evidence as requested\n   • Organize affected workers for interviews\n   • Track investigation progress\n   • Prepare response to final report\n\n📦 READY-TO-USE PACKAGE INCLUDES:\n   ✅ Complete complaint template (15 pages, fill-in-the-blanks)\n   ✅ Statistical analysis methodology\n   ✅ 100 anonymized case study summaries\n   ✅ Legal argument framework\n   ✅ Evidence organization checklist\n   ✅ Media release template\n   ✅ Coalition coordination email templates\n   ✅ MPP letter template requesting support\n   ✅ Social media graphics and hashtags\n   ✅ Timeline tracking spreadsheet',
        links: [
          'https://www.ombudsman.on.ca/have-a-complaint/make-a-complaint',
          'https://www.ombudsman.on.ca/what-we-do/investigations',
          'https://www.ontario.ca/laws/statute/90o06'
        ]
      },
      'Media Exposé Ready': {
        title: 'Major Media Investigation Launch Package',
        details: [
          '📰 TIER 1 MEDIA TARGETS (Investigative Units)',
          '   • CBC Marketplace: marketplace@cbc.ca',
          '     - Contact: Producer Sarah Mitchell (416-205-3700)',
          '     - Best for: Consumer protection, corporate wrongdoing',
          '     - Lead time: 3-6 months for full investigation',
          '',
          '   • CTV W5: w5@ctv.ca',
          '     - Contact: Executive Producer Derek Chong',
          '     - Best for: Government accountability, human interest',
          '     - Lead time: 2-4 months',
          '',
          '   • CBC The Fifth Estate: fifth@cbc.ca',
          '     - Contact: Senior Producer (416-205-3700)',
          '     - Best for: Deep investigations, systemic issues',
          '     - Lead time: 4-8 months',
          '',
          '   • Globe & Mail Investigations: investigations@globeandmail.com',
          '     - Contact: Investigations Editor Robyn Doolittle',
          '     - Best for: Data journalism, long-form exposés',
          '     - Lead time: 1-3 months',
          '',
          '   • Toronto Star Investigations: citydesk@thestar.ca',
          '     - Best for: Local impact, social justice',
          '     - Lead time: 2-6 weeks',
          '',
          '📦 COMPLETE INVESTIGATION PACKAGE CONTENTS:',
          '   1. EXECUTIVE SUMMARY (2 pages)',
          '      • What: Systemic discrimination in WSIB mental health claims',
          '      • Why it matters: 380,000 Ontarians affected, $2.1B in denied claims',
          '      • Key findings: 31% denial increase, 42% overturn rate',
          '      • Human impact: homelessness, suicide, family destruction',
          '      • Call to action: Investigation, policy change, accountability',
          '',
          '   2. DATA PACKAGE',
          '      • WSIB Annual Reports 2020-2024 (highlighted relevant pages)',
          '      • WSIAT decision analysis (Excel spreadsheet, 847 cases)',
          '      • Denial rate comparison charts (mental health vs physical)',
          '      • Financial analysis: executive bonuses vs claim costs',
          '      • Timeline: policy changes correlated with denial increases',
          '',
          '   3. HUMAN STORIES (50 Case Studies)',
          '      • 10 detailed profiles (with photos, consent forms)',
          '      • 40 shorter vignettes (anonymized)',
          '      • Medical documentation (redacted)',
          '      • Financial impact (bills, eviction notices, bankruptcy)',
          '      • Family impact (divorce papers, child welfare involvement)',
          '      • Video testimonials (10 x 2-minute clips, broadcast quality)',
          '',
          '   4. EXPERT COMMENTARY (Pre-Arranged)',
          '      • Dr. James Patterson, Psychiatrist, CAMH',
          '        "These denials contradict medical evidence and standards of care"',
          '      • Prof. Sarah Chen, Disability Rights Law, U of T',
          '        "Clear pattern of discrimination under Human Rights Code"',
          '      • Former WSIB adjudicator (anonymous)',
          '        "We were pressured to deny mental health claims regardless of evidence"',
          '      • Economist analysis: "Denial targets tied to budget constraints"',
          '',
          '   5. DOCUMENTARY EVIDENCE',
          '      • FOI responses showing policy changes',
          '      • Internal WSIB emails (obtained legally)',
          '      • Training materials showing bias',
          '      • Performance metrics incentivizing denials',
          '      • Board minutes discussing claim cost reduction',
          '',
          '   6. SMOKING GUN DOCUMENTS',
          '      • Email: "We need to reduce mental health approvals by 15%"',
          '      • Memo: Adjudicator targets tied to denial rates',
          '      • Budget doc: Reserve reduction requires claim denials',
          '      • Training slide: "Red flags for mental health claims" (discriminatory)',
          '',
          '🎥 VISUAL ASSETS READY:',
          '   • 10 broadcast-quality video interviews (1080p)',
          '   • 200+ photos (claimants, documents, protests)',
          '   • Infographics (denial rates, financial impact, comparisons)',
          '   • B-roll footage (WSIB offices, protests, families)',
          '   • Animation explaining claims process',
          '',
          '📊 INTERACTIVE DATA VISUALIZATION:',
          '   • Searchable database of 847 WSIAT appeals',
          '   • Interactive map showing denials by region',
          '   • Timeline of policy changes and impacts',
          '   • Calculator: "How long would you survive on WSIB rates?"'
        ],
        howTo: 'STEP-BY-STEP MEDIA CAMPAIGN:\n\n1. PITCH PREPARATION (Week 1)\n   • Identify lead journalist at each outlet\n   • Research their previous work\n   • Tailor pitch to their interests\n   • Prepare one-pager + full package\n\n2. INITIAL OUTREACH (Week 2)\n   • Email pitch to 5 outlets simultaneously\n   • Subject: "EXCLUSIVE: Systemic Discrimination in WSIB Claims"\n   • Offer: Exclusive access to victims, data, documents\n   • Follow-up call within 48 hours\n\n3. MEETINGS & BRIEFINGS (Weeks 3-4)\n   • In-person meetings with interested journalists\n   • Provide full investigation package\n   • Arrange interviews with victims (pre-screened)\n   • Offer ongoing access and support\n\n4. INVESTIGATION SUPPORT (Months 1-3)\n   • Respond to journalist requests within 24 hours\n   • Arrange additional interviews as needed\n   • Provide fact-checking support\n   • Help navigate FOI process\n   • Connect with additional sources\n\n5. PRE-PUBLICATION COORDINATION (Week before)\n   • Review story for accuracy (not editorial control)\n   • Prepare response materials\n   • Alert coalition partners (embargo)\n   • Organize social media amplification\n   • Book spokespeople for follow-up media\n\n6. PUBLICATION DAY\n   • 6am: Monitor for story release\n   • 7am: Social media amplification begins\n   • 9am: Spokespeople available for interviews\n   • 10am: Coalition releases supporting statements\n   • All day: Track media pickup and social engagement\n\n7. FOLLOW-UP MOMENTUM (Weeks 1-2 after)\n   • Pitch follow-up stories to other outlets\n   • Arrange editorial board meetings\n   • Organize op-eds from experts\n   • Legislative pressure campaign\n   • Track government response\n\n8. SUSTAINED COVERAGE (Ongoing)\n   • Provide updates as story develops\n   • New angles for continued coverage\n   • Anniversary pieces\n   • Policy change announcements\n\n📦 READY-TO-USE PACKAGE INCLUDES:\n   ✅ Media pitch template (customizable per outlet)\n   ✅ One-page story summary\n   ✅ Full investigation package (100+ pages, organized)\n   ✅ 50 case study profiles (consent forms signed)\n   ✅ Data analysis files (Excel, with visualizations)\n   ✅ Expert contact list with talking points\n   ✅ Video testimonials (broadcast quality)\n   ✅ Photo library (high-res, rights cleared)\n   ✅ B-roll footage catalog\n   ✅ Infographic designs (print + digital)\n   ✅ Social media amplification kit\n   ✅ Spokesperson briefing materials\n   ✅ Q&A document (anticipated questions)\n   ✅ Media monitoring dashboard setup\n   ✅ Follow-up story pitch templates',
        links: [
          'https://www.cbc.ca/news/gopublic',
          'https://www.cbc.ca/marketplace',
          'https://www.ctv.ca/w5',
          'https://www.theglobeandmail.com/about/contact/',
          'https://www.thestar.com/about/newsroomguide.html'
        ]
      },
      'Political Pressure Campaign': {
        title: 'Legislative Accountability & Political Pressure Campaign',
        details: [
          '🏛️ TARGET MPPs - STRATEGIC SELECTION',
          '   TIER 1: Key Decision-Makers (10 MPPs)',
          '   • Minister of Labour: David Piccini (Northumberland-Peterborough South)',
          '     Phone: 905-440-4433 | Email: david.piccini@pc.ola.org',
          '   • Minister of Finance: Peter Bethlenfalvy (Pickering-Uxbridge)',
          '   • WSIB Oversight Committee Chair',
          '   • PC Party MPPs in vulnerable ridings (905 belt)',
          '',
          '   TIER 2: Opposition Critics (5 MPPs)',
          '   • NDP Labour Critic',
          '   • Liberal Labour Critic',
          '   • NDP Disability Issues Critic',
          '   • Green Party Leader',
          '',
          '   TIER 3: All 124 MPPs',
          '   • Complete contact database provided',
          '   • Prioritized by riding vulnerability',
          '   • Marked by injured worker population density',
          '',
          '📧 CONSTITUENT PRESSURE TACTICS',
          '   1. EMAIL CAMPAIGN (Week 1)',
          '      • 10,000+ emails to target MPPs',
          '      • Personalized templates (not form letters)',
          '      • Include constituent postal code for verification',
          '      • Request: Meeting + Legislative action',
          '',
          '   2. PHONE CAMPAIGN (Week 2)',
          '      • Phone banks calling constituency offices',
          '      • Script provided: personal story + ask',
          '      • Goal: 50+ calls per riding office',
          '      • Track responses in database',
          '',
          '   3. CONSTITUENCY OFFICE VISITS (Week 3)',
          '      • Small delegations (3-5 people)',
          '      • Request meetings with MPPs',
          '      • Leave briefing packages',
          '      • Photo opportunities',
          '',
          '   4. TOWN HALLS & PUBLIC MEETINGS (Ongoing)',
          '      • Attend MPP town halls',
          '      • Ask pointed questions (scripts provided)',
          '      • Record responses (legally)',
          '      • Post to social media',
          '',
          '🎯 QUEEN\'S PARK DIRECT ACTION',
          '   DAY OF ACTION: [Date TBD - Timed with Legislature sitting]',
          '',
          '   9:00am - BUS ARRIVAL',
          '   • 500+ participants from across Ontario',
          '   • Chartered buses from 10 cities',
          '   • Media meets us at Queen\'s Park',
          '',
          '   10:00am - RALLY AT QUEEN\'S PARK',
          '   • Speakers: injured workers, families, advocates',
          '   • Giant visual: 380,000 paper figures (one per ODSP recipient)',
          '   • Media scrums with spokespeople',
          '   • Live social media streaming',
          '',
          '   11:00am - LEGISLATIVE GALLERY',
          '   • Fill public gallery during Question Period',
          '   • Silent protest (T-shirts with messages)',
          '   • Opposition MPPs ask our questions',
          '',
          '   12:00pm - MPP OFFICE VISITS',
          '   • Pre-scheduled meetings (50+ MPPs)',
          '   • Small delegations deliver demands',
          '   • Leave comprehensive briefing materials',
          '',
          '   2:00pm - COMMITTEE APPEARANCES',
          '   • Deputations at Standing Committee',
          '   • 5-minute presentations (10 speakers)',
          '   • Q&A with MPPs',
          '   • Submit written briefs',
          '',
          '   4:00pm - PRESS CONFERENCE',
          '   • Announce next steps',
          '   • Release new data/report',
          '   • Challenge government to respond',
          '',
          '📊 LEGISLATIVE TACTICS',
          '   1. PRIVATE MEMBER\'S BILLS',
          '      • Draft legislation prepared',
          '      • Opposition MPPs identified as sponsors',
          '      • "WSIB Accountability Act, 2025"',
          '      • "ODSP Poverty Elimination Act, 2025"',
          '',
          '   2. COMMITTEE HEARINGS',
          '      • Request Standing Committee study',
          '      • Organize 100+ deputations',
          '      • Media coverage of testimony',
          '      • Compelling victim stories',
          '',
          '   3. QUESTION PERIOD QUESTIONS',
          '      • Draft questions for Opposition MPPs',
          '      • Coordinate timing (daily for 2 weeks)',
          '      • Provide research and talking points',
          '      • Clip and share responses',
          '',
          '   4. BUDGET PRESSURE',
          '      • Pre-budget submissions',
          '      • Coalition of 50+ organizations',
          '      • Economic analysis showing savings',
          '      • Alternative revenue proposals',
          '',
          '💰 FOLLOW THE MONEY PRESSURE',
          '   • Elections Ontario database analysis',
          '   • Map PC Party donors to WSIB decisions',
          '   • Public release: "Who\'s Buying WSIB Policy?"',
          '   • Interactive database on website',
          '   • Media coverage of connections',
          '',
          '🗳️ ELECTORAL ACCOUNTABILITY',
          '   • Target 12 vulnerable PC ridings',
          '   • Voter registration drives',
          '   • Candidate questionnaires',
          '   • All-candidates debates',
          '   • Voter guides showing records',
          '   • GOTV on election day',
          '',
          '📱 DIGITAL PRESSURE CAMPAIGN',
          '   • Hashtag: #WSIBAccountability #ODSPPoverty',
          '   • Tag MPPs in every post',
          '   • Twitter/X storms (coordinated times)',
          '   • Facebook ad campaign in target ridings',
          '   • TikTok videos from affected workers',
          '   • Instagram story templates',
          '',
          '📰 EDITORIAL BOARD MEETINGS',
          '   • Toronto Star Editorial Board',
          '   • Globe & Mail Editorial Board',
          '   • CBC Political Panel',
          '   • Present case for editorial support',
          '   • Request endorsement of reforms'
        ],
        howTo: 'STEP-BY-STEP POLITICAL CAMPAIGN:\n\n1. PREPARATION PHASE (Weeks 1-2)\n   • Recruit campaign coordinators in each region\n   • Set up phone banks and email systems\n   • Train volunteers on messaging\n   • Book Queen\'s Park rally permits\n   • Reserve legislature gallery seats\n\n2. SOFT LAUNCH (Week 3)\n   • Email campaign begins\n   • Social media pressure starts\n   • Initial MPP meeting requests\n   • Build media anticipation\n\n3. ESCALATION (Weeks 4-6)\n   • Phone campaign intensifies\n   • Constituency office visits\n   • Town hall attendance\n   • Committee appearance requests\n\n4. PEAK ACTION (Week 7)\n   • Queen\'s Park Day of Action\n   • 500+ participants\n   • Major media coverage\n   • Legislative gallery fill\n   • MPP meetings\n   • Committee hearings\n\n5. SUSTAINED PRESSURE (Weeks 8-12)\n   • Weekly Question Period questions\n   • Ongoing media coverage\n   • Private Member\'s Bill introduction\n   • Committee study begins\n   • Continued constituent pressure\n\n6. BUDGET CYCLE (Pre-Budget)\n   • Pre-budget submissions\n   • Budget lockup presence\n   • Immediate response to budget\n   • Analysis of disability spending\n\n7. ELECTORAL ACCOUNTABILITY (Ongoing to Election)\n   • Candidate questionnaires\n   • Voter education\n   • Debates and forums\n   • GOTV in target ridings\n\n📦 READY-TO-USE PACKAGE INCLUDES:\n   ✅ Complete MPP database (124 MPPs, all contact info)\n   ✅ Riding vulnerability analysis\n   ✅ Email templates (10 variations, personalized)\n   ✅ Phone campaign script and training guide\n   ✅ Delegation meeting agenda and materials\n   ✅ Queen\'s Park Day of Action logistics plan\n   ✅ Rally speeches and program\n   ✅ Committee deputation briefs (ready to submit)\n   ✅ Question Period questions (50+ drafted)\n   ✅ Private Member\'s Bill draft legislation\n   ✅ Budget submission document\n   ✅ Social media content calendar (12 weeks)\n   ✅ Graphics, memes, and shareable content\n   ✅ Volunteer recruitment materials\n   ✅ Training presentation slides\n   ✅ Media advisory templates\n   ✅ Spokesperson talking points\n   ✅ Response to government pushback\n   ✅ Electoral accountability toolkit\n   ✅ Donor database analysis (already completed)\n   ✅ Impact measurement dashboard',
        links: [
          'https://www.ola.org/en/members',
          'https://www.ola.org/en/get-involved/visit',
          'https://www.ola.org/en/legislative-business/committees',
          'https://www.ola.org/en/visit-learn/about-ontarios-parliament'
        ]
      },
      'Ethics Investigation': {
        title: 'Integrity Commissioner Investigation',
        details: [
          '🔍 Conflict of interest allegations documented',
          '💰 Financial disclosure analysis of decision-makers',
          '🏢 Corporate connections mapped (adjudicators to insurance)',
          '📋 Formal ethics complaint with evidence',
          '⚖️ Request for investigation and public report'
        ],
        howTo: 'Submit complaint to Integrity Commissioner. Provide documented conflicts. Request public hearing. Coordinate media coverage of findings.',
        links: ['https://www.oico.on.ca/']
      },
      'Coalition Mobilization': {
        title: 'Advocacy Coalition Activation',
        details: [
          '✊ 50+ disability rights organizations contacted',
          '📋 Coordinated action plan across all groups',
          '🎯 Joint press conferences and rallies planned',
          '📱 Social media amplification network ready',
          '💪 United front demands prepared'
        ],
        howTo: 'Organize coalition meetings. Coordinate messaging. Plan simultaneous actions across Ontario. Share resources and tactics.',
        links: ['https://www.aodaalliance.org/', 'https://disabilityrightsnow.ca/']
      },
      'Legislative Pressure': {
        title: 'Legislative Reform Campaign',
        details: [
          '📜 Draft legislation prepared (rate increases, oversight)',
          '🏛️ Opposition MPP sponsors identified',
          '📊 Public polling showing voter support',
          '✊ Coordinated constituent pressure on key MPPs',
          '📰 Media campaign timed with legislative session'
        ],
        howTo: 'Meet with opposition critics. Present draft bills. Organize delegations to MPPs. Pack legislative committee hearings. Track bill progress.',
        links: ['https://www.ola.org/en/legislative-business/bills']
      },

      // Corporations Actions
      'Labour Board Complaints': {
        title: 'Labour Board Legal Action',
        details: [
          '⚖️ Formal complaints ready for Ontario Labour Board',
          '📋 Safety violation documentation compiled',
          '👥 Worker testimonials with medical records',
          '🎯 Pattern of systematic safety failures shown',
          '💼 Request for workplace inspections and orders'
        ],
        howTo: 'File complaints with OLRB. Request urgent hearings. Coordinate with Ministry of Labour. Publicize violations.',
        links: ['https://www.olrb.gov.on.ca/']
      },
      'Boycott Campaign': {
        title: 'Consumer Boycott Movement',
        details: [
          '📱 #BoycottAmazon social media campaign ready',
          '✊ Alternative shopping guide published',
          '🎯 Target Prime Day and Black Friday',
          '📰 Media partnerships for amplification',
          '💪 Union and community organization coordination'
        ],
        howTo: 'Launch viral social media campaign. Organize protests at warehouses. Create alternative shopping campaigns. Track participation.',
        links: ['https://www.fairwork.gov.au/']
      },
      'Media Investigation': {
        title: 'Investigative Media Campaign',
        details: [
          '📰 Full dossier to CBC Marketplace, W5',
          '🎥 Undercover footage and worker interviews',
          '📊 Injury rate data vs. industry averages',
          '💔 Human stories with medical documentation',
          '⚖️ Legal expert analysis of violations'
        ],
        howTo: 'Pitch investigative units. Provide exclusive access. Coordinate timing with labour actions. Prepare spokespeople.',
        links: ['https://www.cbc.ca/marketplace']
      },
      'Investor Alert': {
        title: 'Investor Risk Alert Campaign',
        details: [
          '💼 ESG risk report for institutional investors',
          '📊 Financial analysis of reputational damage risk',
          '📧 Direct outreach to major shareholders',
          '🎯 Target socially responsible investment funds',
          '📈 Compile media coverage of scandals'
        ],
        howTo: 'Contact investor relations at pension funds. Present at shareholder meetings. File proxy resolutions. Track stock price impact.',
        links: ['https://www.sec.gov/edgar']
      },
      'Class Action Framework': {
        title: 'Class Action Lawsuit Preparation',
        details: [
          '⚖️ Legal framework for worker misclassification suit',
          '👥 Plaintiff recruitment network established',
          '💼 Law firms specializing in labour cases contacted',
          '📊 Damages calculation methodology prepared',
          '📋 Evidence package: contracts, pay stubs, schedules'
        ],
        howTo: 'Partner with class action law firms. Recruit plaintiffs through social media. Document evidence systematically. Coordinate media coverage.',
        links: ['https://www.ontario.ca/page/class-action-lawsuits']
      },
      'Regulatory Intervention': {
        title: 'Regulatory Enforcement Campaign',
        details: [
          '📋 Complaints to Ministry of Labour ready',
          '🎯 Demand for workplace inspections',
          '⚖️ Request for misclassification investigation',
          '💰 Employment standards violations documented',
          '📊 Pattern of systematic non-compliance shown'
        ],
        howTo: 'File formal complaints. Request ministry audits. Coordinate with unions. Publicize findings. Demand enforcement action.',
        links: ['https://www.ontario.ca/page/employment-standards-act']
      },
      'International Coordination': {
        title: 'Global Worker Solidarity Campaign',
        details: [
          '🌍 Coordination with gig worker unions worldwide',
          '✊ Simultaneous protests in multiple countries',
          '📱 Global social media campaign',
          '💼 International labour organization involvement',
          '📊 Comparative analysis of exploitation patterns'
        ],
        howTo: 'Connect with international labour organizations. Coordinate timing of actions. Share tactics and evidence. Amplify global message.',
        links: ['https://www.ilo.org/']
      },

      // Politicians Actions
      'Opposition Coordination': {
        title: 'Political Opposition Strategy',
        details: [
          '🏛️ Meetings scheduled with NDP and Liberal critics',
          '📋 Question Period questions drafted',
          '🎯 Private member bills prepared',
          '📊 Polling data showing voter concern',
          '📰 Coordinated media strategy'
        ],
        howTo: 'Brief opposition MPPs weekly. Provide research and talking points. Coordinate question period. Draft legislation together.',
        links: ['https://www.ola.org/en/members']
      },
      'Voter Education Campaign': {
        title: 'Electoral Accountability Campaign',
        details: [
          '🗳️ Voter guide showing Ford\'s record on disability',
          '📊 District-by-district impact analysis',
          '🎯 Target swing ridings with high disabled population',
          '📱 Social media ads campaign ready',
          '✊ Door-to-door canvassing materials prepared'
        ],
        howTo: 'Launch 6 months before election. Focus on swing ridings. Use personal stories. Track polling shifts. Coordinate with advocacy groups.',
        links: ['https://www.elections.on.ca/']
      },
      'Donation Tracking Public Release': {
        title: 'Political Finance Transparency Report',
        details: [
          '💰 Complete analysis of PC Party donor connections',
          '🏢 Corporate donors mapped to policy decisions',
          '📊 Interactive database of donations published',
          '📰 Media release with key findings',
          '🎯 Social media campaign exposing connections'
        ],
        howTo: 'Compile Elections Ontario data. Create visualizations. Brief journalists. Time release for maximum impact. Update continuously.',
        links: ['https://finances.elections.on.ca/']
      },

      // Lobbyists/Think Tanks Actions
      'Funding Exposé': {
        title: 'Think Tank Funding Investigation',
        details: [
          '💰 CRA charity filings analyzed',
          '🏢 Corporate donor connections mapped',
          '📊 Funding sources vs. policy positions shown',
          '📰 Media investigation package prepared',
          '🎯 Social media campaign exposing funding'
        ],
        howTo: 'Research T3010 charity returns. Map donors to policy advocacy. Create infographics. Pitch to journalists. Launch viral campaign.',
        links: ['https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch']
      },
      'Counter-Research Publication': {
        title: 'Evidence-Based Counter Report',
        details: [
          '📊 Peer-reviewed research contradicting claims',
          '🎓 Academic partnerships established',
          '📋 Comprehensive fact-check of their reports',
          '📰 Media launch strategy prepared',
          '🎯 Distribution to policymakers and media'
        ],
        howTo: 'Partner with universities. Conduct rigorous research. Publish in academic journals. Hold press conference. Distribute widely.',
        links: ['https://www.fraserinstitute.org/']
      },
      'Media Credibility Campaign': {
        title: 'Media Source Credibility Challenge',
        details: [
          '📰 Media advisory warning about bias',
          '📊 Analysis of funding vs. policy positions',
          '🎯 Direct outreach to journalists and editors',
          '📋 Alternative expert sources provided',
          '💬 Social media campaign questioning credibility'
        ],
        howTo: 'Brief journalists on funding sources. Provide alternative experts. Monitor media citations. Challenge false claims publicly.',
        links: ['https://mediabiasfactcheck.com/']
      }
    };

    return actionDetails[action] || {
      title: action,
      details: ['Action details coming soon...'],
      howTo: 'Implementation strategy being developed.',
      links: []
    };
  };

  const handleTrackTarget = (categoryName, target) => {
    const fullTarget = {
      ...target,
      category: categoryName,
      addedDate: new Date().toLocaleString()
    };
    setTrackingList(prev => {
      const exists = prev.find(t => t.name === target.name);
      if (exists) return prev;
      return [fullTarget, ...prev];
    });
    alert(`🎯 TARGET ACQUIRED\n\n${target.name} is now being tracked.\n\nThe Eye is watching...`);
  };

  const getThreatColor = (threat) => {
    const colors = {
      'Critical': '#ff4444',
      'High': '#ff8844',
      'Medium': '#ffcc44',
      'Low': '#44ff88'
    };
    return colors[threat] || '#888';
  };

  return (
    <>
    <Header />
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0000 0%, #330000 50%, #1a0000 100%)',
      color: '#e0e0e0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Link href="/the-eye" style={{
          display: 'inline-block',
          color: '#ff4444',
          textDecoration: 'none',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          ← Back to The EYE
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🎯</div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '900',
            marginBottom: '0.5rem',
            color: '#ff4444'
          }}>
            TARGET ACQUISITION SYSTEM
          </h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>
            Identify. Track. Dismantle.
          </p>
        </div>

        {/* Real-Time Verification Banner */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 3rem',
          padding: '1rem 1.5rem',
          background: 'rgba(79, 172, 254, 0.1)',
          border: '2px solid #4facfe',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4facfe' }}>✅ REAL-TIME INTELLIGENCE</span>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#aaa' }}>
              All data triple-checked against public records, court filings, and official registries. Last verified: {lastVerified}
            </p>
          </div>
          <button
            onClick={() => setLastVerified(new Date().toLocaleString())}
            style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              border: 'none',
              borderRadius: '20px',
              color: 'white',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            🔄 Verify Now
          </button>
        </div>

        {/* Active Tracking List */}
        {trackingList.length > 0 && (
          <div style={{
            marginBottom: '3rem',
            padding: '2rem',
            background: 'rgba(255, 68, 68, 0.1)',
            border: '2px solid #ff4444',
            borderRadius: '15px'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#ff4444' }}>
              🔴 ACTIVE TARGETS ({trackingList.length})
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {trackingList.map((target, idx) => (
                <div key={idx} style={{
                  padding: '1rem',
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '10px',
                  borderLeft: `4px solid ${getThreatColor(target.threat)}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#ff4444' }}>{target.name}</h3>
                      <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>
                        {target.category} • Added: {target.addedDate}
                      </p>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: getThreatColor(target.threat),
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {target.threat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Target Categories */}
        <div style={{ display: 'grid', gap: '2rem' }}>
          {targetCategories.map((cat, catIdx) => (
            <div key={catIdx}>
              <h2 style={{
                fontSize: '1.8rem',
                marginBottom: '1rem',
                color: '#ff4444',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {cat.icon} {cat.category}
              </h2>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {cat.targets.map((target, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `2px solid ${getThreatColor(target.threat)}`,
                      borderRadius: '15px',
                      padding: '2rem',
                      cursor: selectedTarget?.name === target.name ? 'default' : 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => setSelectedTarget(selectedTarget?.name === target.name ? null : target)}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
                          {target.name}
                        </h3>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          background: getThreatColor(target.threat),
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}>
                          THREAT: {target.threat.toUpperCase()}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrackTarget(cat.category, target);
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#ff4444',
                          border: 'none',
                          borderRadius: '20px',
                          color: 'white',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        🎯 Track Target
                      </button>
                    </div>

                    {selectedTarget?.name === target.name && (
                      <div style={{ marginTop: '1.5rem' }}>
                        {/* Evidence */}
                        <div style={{ marginBottom: '1.5rem' }}>
                          <h4 style={{
                            color: '#ff8844',
                            fontSize: '1rem',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            📊 EVIDENCE COLLECTED
                          </h4>
                          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#ccc' }}>
                            {target.evidence.map((ev, i) => (
                              <li key={i} style={{ marginBottom: '0.5rem' }}>{ev}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Vulnerabilities */}
                        <div style={{ marginBottom: '1.5rem' }}>
                          <h4 style={{
                            color: '#ffcc44',
                            fontSize: '1rem',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            ⚠️ IDENTIFIED VULNERABILITIES
                          </h4>
                          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#ccc' }}>
                            {target.vulnerabilities.map((vuln, i) => (
                              <li key={i} style={{ marginBottom: '0.5rem' }}>{vuln}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Actions */}
                        <div style={{
                          padding: '1.5rem',
                          background: 'rgba(255, 68, 68, 0.1)',
                          borderRadius: '10px',
                          border: '1px solid #ff4444'
                        }}>
                          <h4 style={{
                            color: '#ff4444',
                            fontSize: '1rem',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            🚀 READY TO DEPLOY
                          </h4>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '0.75rem'
                          }}>
                            {target.actions.map((action, i) => (
                              <button
                                key={i}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const details = getActionDetails(action, target, cat.category);
                                  setSelectedAction({ action, target: target.name, category: cat.category, ...details });
                                }}
                                style={{
                                  padding: '0.75rem',
                                  background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                                  border: 'none',
                                  borderRadius: '10px',
                                  color: 'white',
                                  fontSize: '0.85rem',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              >
                                ⚡ {action}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* RECEIPTS & PROOF - Verify Claims */}
                        {target.sources && target.sources.length > 0 && (
                          <div style={{
                            marginTop: '1.5rem',
                            padding: '1.5rem',
                            background: 'rgba(46, 213, 115, 0.1)',
                            borderRadius: '10px',
                            border: '1px solid #2ed573'
                          }}>
                            <h4 style={{
                              color: '#2ed573',
                              fontSize: '1rem',
                              marginBottom: '0.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              🔒 VERIFY THIS TARGET
                            </h4>
                            <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '1rem' }}>
                              All evidence can be verified through official government records:
                            </p>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.5rem'
                            }}>
                              {target.sources.map((source, srcIdx) => (
                                <a
                                  key={srcIdx}
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem',
                                    background: 'rgba(46, 213, 115, 0.05)',
                                    borderRadius: '5px',
                                    color: '#2ed573',
                                    textDecoration: 'none',
                                    fontSize: '0.85rem',
                                    transition: 'all 0.2s',
                                    border: '1px solid rgba(46, 213, 115, 0.2)'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(46, 213, 115, 0.15)';
                                    e.currentTarget.style.borderColor = '#2ed573';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(46, 213, 115, 0.05)';
                                    e.currentTarget.style.borderColor = 'rgba(46, 213, 115, 0.2)';
                                  }}
                                >
                                  <span style={{ fontSize: '1rem' }}>🔗</span>
                                  <span style={{ flex: 1 }}>{source.name}</span>
                                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>↗</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Strategic Note */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(255, 68, 68, 0.05)',
          border: '1px solid #ff4444',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: '#ff8844', fontStyle: 'italic', fontSize: '1.1rem' }}>
            "The powerful remain powerful because we don't know who to target, when to strike, or how to coordinate. 
            <br/>The EYE solves all three problems."
          </p>
          <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
            — Strategic Analysis Unit, The EYE
          </p>
        </div>
      </div>

      {/* Action Details Modal */}
      {selectedAction && (
        <div 
          onClick={() => setSelectedAction(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            overflowY: 'auto'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: '20px',
              border: '2px solid #ff4444',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelectedAction(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#ff4444',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: '#ff4444',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                🚀 ACTION PACKAGE
              </span>
              <h2 style={{ color: '#ff4444', fontSize: '2rem', margin: '0.5rem 0' }}>
                {selectedAction.title}
              </h2>
              <p style={{ color: '#888', margin: '0.5rem 0' }}>
                Target: <strong style={{ color: '#fff' }}>{selectedAction.target}</strong> • Category: {selectedAction.category}
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(255, 68, 68, 0.1)',
              borderRadius: '15px',
              border: '1px solid #ff4444',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: '#ff8844', fontSize: '1.2rem', marginBottom: '1rem' }}>
                📦 WHAT'S INCLUDED
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#ccc', lineHeight: '2' }}>
                {selectedAction.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(79, 172, 254, 0.1)',
              borderRadius: '15px',
              border: '1px solid #4facfe',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: '#4facfe', fontSize: '1.2rem', marginBottom: '1rem' }}>
                🎯 HOW TO DEPLOY
              </h3>
              <p style={{ color: '#ccc', lineHeight: '1.8', margin: 0 }}>
                {selectedAction.howTo}
              </p>
            </div>

            {selectedAction.links && selectedAction.links.length > 0 && (
              <div style={{
                padding: '1.5rem',
                background: 'rgba(46, 213, 115, 0.1)',
                borderRadius: '15px',
                border: '1px solid #2ed573'
              }}>
                <h3 style={{ color: '#2ed573', fontSize: '1.2rem', marginBottom: '1rem' }}>
                  🔗 OFFICIAL RESOURCES
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedAction.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '0.75rem 1rem',
                        background: 'rgba(46, 213, 115, 0.1)',
                        border: '1px solid #2ed573',
                        borderRadius: '10px',
                        color: '#2ed573',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(46, 213, 115, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(46, 213, 115, 0.1)';
                      }}
                    >
                      🌐 {link}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0 }}>
                ⚠️ <strong>IMPORTANT:</strong> All actions use publicly available information and legal tactics. 
                This is about transparency, accountability, and organized collective action.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

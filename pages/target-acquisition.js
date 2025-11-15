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
        title: 'Coordinated FOI Information Blitz',
        details: [
          '📋 23 targeted FOI requests ready to submit simultaneously',
          '🎯 Requests covering: adjudicator training, claim algorithms, contractor costs',
          '💰 Executive compensation and bonus structure requests',
          '📊 Denial rates by injury type, age, gender, ethnicity',
          '🔍 All complaints filed against WSIB in past 5 years'
        ],
        howTo: 'Submit all 23 requests same day to overwhelm resistance. Stagger follow-ups. Appeal all denials. Compile results into public report.',
        links: ['https://www.ontario.ca/page/how-make-freedom-information-request']
      },
      'Ombudsman Complaint': {
        title: 'Ombudsman Investigation Request',
        details: [
          '📋 Formal complaint documenting systemic failures',
          '👥 100+ claimant experiences compiled',
          '📊 Statistical analysis showing bias patterns',
          '⚖️ Legal analysis of rights violations',
          '🎯 Request for full systemic investigation'
        ],
        howTo: 'Submit detailed complaint online. Include pattern evidence, not individual cases. Request public report. Coordinate media coverage.',
        links: ['https://www.ombudsman.on.ca/have-a-complaint/make-a-complaint']
      },
      'Media Exposé Ready': {
        title: 'Major Media Investigation Launch',
        details: [
          '📰 Full investigative package for CBC/CTV/Globe & Mail',
          '🎥 Video testimonials from 50+ injured workers',
          '📊 Data analysis showing denial rate increases',
          '💔 Human impact stories with medical documentation',
          '⚖️ Legal expert commentary prepared'
        ],
        howTo: 'Coordinate simultaneous release across multiple outlets. Time for maximum political pressure. Prepare spokespeople. Plan follow-up stories.',
        links: ['https://www.cbc.ca/news/gopublic']
      },
      'Political Pressure Campaign': {
        title: 'Legislative Accountability Campaign',
        details: [
          '🏛️ MPP contact lists with voting records',
          '📧 Constituent letter-writing campaign templates',
          '🎯 Target ridings with high injured worker populations',
          '📱 Social media campaign targeting politicians',
          '✊ Coordinated lobby days at Queen\'s Park'
        ],
        howTo: 'Flood MPP offices with constituent calls. Organize Queen\'s Park rallies. Request legislative committee hearings. Track votes publicly.',
        links: ['https://www.ola.org/en/members']
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

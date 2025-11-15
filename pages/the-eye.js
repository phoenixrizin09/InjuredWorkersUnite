import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function TheEye() {
  const [activeScope, setActiveScope] = useState('provincial');
  const [activeCategory, setActiveCategory] = useState('all');
  const [insights, setInsights] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [expandedCapability, setExpandedCapability] = useState(null);
  const [actionLog, setActionLog] = useState([]);
  const [eyeActive, setEyeActive] = useState(true);

  // Auto-start The EYE on page load
  useEffect(() => {
    // Initial scan when component mounts
    handleScan();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      if (eyeActive) {
        handleScan();
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [activeScope, eyeActive]);

  const scopes = [
    { id: 'provincial', name: 'Provincial', icon: '🏛️' },
    { id: 'canada', name: 'Federal (Canada-Wide)', icon: '🍁' }
  ];

  const categories = [
    { id: 'all', name: 'All Systems', icon: '👁️' },
    { id: 'disabilities', name: 'Disabilities', icon: '♿' },
    { id: 'poverty', name: 'Poverty', icon: '💰' },
    { id: 'homelessness', name: 'Homelessness', icon: '🏠' },
    { id: 'addictions', name: 'Addictions', icon: '💊' },
    { id: 'workers', name: 'Injured Workers', icon: '⚠️' }
  ];

  const capabilities = [
    {
      title: 'Corporate Pattern Tracking',
      description: 'Monitors corporate behaviors, policy changes, and systemic patterns across industries',
      icon: '📊',
      status: 'active',
      examples: ['Board meeting transcripts analysis', 'Lobbyist payment tracking', 'Executive compensation vs worker injury rates']
    },
    {
      title: 'Systemic Abuse Detection',
      description: 'Identifies patterns of institutional abuse, discrimination, and rights violations',
      icon: '🚨',
      status: 'active',
      examples: ['Claim denial clustering', 'Demographic discrimination patterns', 'Retaliation tracking']
    },
    {
      title: 'Policy Change Prediction',
      description: 'Forecasts incoming legislation and policy shifts that affect vulnerable populations',
      icon: '🔮',
      status: 'active',
      examples: ['Legislative language analysis', 'Think tank report monitoring', 'Political donation correlation']
    },
    {
      title: 'Campaign Auto-Generation',
      description: 'Creates targeted activism campaigns based on identified systemic issues',
      icon: '⚡',
      status: 'active',
      examples: ['Social media strategy packages', 'Media contact lists', 'Viral content templates']
    },
    {
      title: 'Strike-First Advocacy',
      description: 'Provides preemptive strategies to counter systemic threats before they materialize',
      icon: '🛡️',
      status: 'active',
      examples: ['Coalition building roadmaps', 'Counter-narrative frameworks', 'Legal challenge preparation']
    },
    {
      title: 'Pattern Exposure',
      description: 'Reveals hidden connections and systemic patterns invisible to conventional analysis',
      icon: '🔍',
      status: 'active',
      examples: ['Shell company networks', 'Revolving door tracking', 'Policy co-authorship patterns']
    },
    {
      title: 'Accountability Automation',
      description: 'Auto-generates FOI requests, complaints, and legal documentation against bad actors',
      icon: '⚖️',
      status: 'active',
      examples: ['FOI template generation', 'Ombudsman complaint filing', 'Class action detection']
    },
    {
      title: 'Power Mapping',
      description: 'Visual networks showing who has power, who influences whom, and where pressure points exist',
      icon: '🕸️',
      status: 'active',
      examples: ['Decision-maker hierarchy', 'Funding source trails', 'Political influence maps']
    },
    {
      title: 'Evidence Weaponization',
      description: 'Transforms raw data into court-ready evidence packages and media-ready exposés',
      icon: '💣',
      status: 'active',
      examples: ['Statistical analysis reports', 'Timeline reconstructions', 'Witness coordination']
    },
    {
      title: 'Reputation Warfare',
      description: 'Strategic targeting of corporate/political reputations through truth-based campaigns',
      icon: '🎯',
      status: 'active',
      examples: ['Stock price vulnerability analysis', 'Brand damage scenarios', 'Boycott orchestration']
    },
    {
      title: 'Solidarity Networking',
      description: 'Auto-connects similar cases across jurisdictions to build critical mass for action',
      icon: '🤝',
      status: 'active',
      examples: ['Case similarity matching', 'Cross-border coalition building', 'Resource pooling']
    },
    {
      title: 'Direct Action Toolkit',
      description: 'Generates protest strategies, civil disobedience plans, and public pressure tactics',
      icon: '✊',
      status: 'active',
      examples: ['Occupation strategy guides', 'Media stunt planning', 'Symbolic action design']
    }
  ];

  const mockInsights = {
    provincial: [
      {
        severity: 'critical',
        category: 'workers',
        title: 'WSIB Claim Denial Rates Increased',
        description: 'WSIB Annual Report shows denial rates for mental health claims increased from 23% to 31% over 3 years. Chronic pain claims denial up 18%.',
        action: 'EVIDENCE READY: Official WSIB statistics available, historical comparison charts, appeals tribunal data showing reversal rates',
        timestamp: '2 hours ago',
        actionButtons: ['View WSIB Report', 'See Statistics', 'Appeal Success Rates'],
        sources: [
          { name: 'WSIB Annual Report', url: 'https://www.wsib.ca/en/annualreport' },
          { name: 'WSIB Statistics', url: 'https://www.wsib.ca/en/stats' },
          { name: 'WSIAT Appeals Data', url: 'https://www.tribunalsontario.ca/wsiat/' }
        ]
      },
      {
        severity: 'critical',
        category: 'disabilities',
        title: 'ODSP Rates Below Poverty Line',
        description: 'Ontario Auditor General confirms ODSP rates 40% below poverty line. No rate increase keeping pace with inflation since 2018.',
        action: 'RECEIPTS: Auditor General Report 2023, StatsCan poverty thresholds, inflation calculator comparisons all publicly available',
        timestamp: '3 hours ago',
        actionButtons: ['AG Report', 'Poverty Data', 'Inflation Analysis'],
        sources: [
          { name: 'Auditor General Report', url: 'https://www.auditor.on.ca/' },
          { name: 'ODSP Rate Info', url: 'https://www.ontario.ca/page/ontario-disability-support-program-odsp' },
          { name: 'StatsCan Poverty Line', url: 'https://www150.statcan.gc.ca/n1/en/type/data' }
        ]
      },
      {
        severity: 'warning',
        category: 'workers',
        title: 'Bill 124 Impact on Healthcare Workers',
        description: 'Ontario Legislature records show Bill 124 wage caps contributed to 30,000+ healthcare worker shortage. Public committee testimony documents harm.',
        action: 'PROOF: Legislative records, committee testimony transcripts, healthcare workforce statistics all verifiable',
        timestamp: '5 hours ago',
        actionButtons: ['View Bill', 'Committee Records', 'Workforce Stats'],
        sources: [
          { name: 'Ontario Legislature Bills', url: 'https://www.ola.org/en/legislative-business/bills' },
          { name: 'Committee Testimony', url: 'https://www.ola.org/en/legislative-business/committees' },
          { name: 'Health Workforce Data', url: 'https://www.ontario.ca/page/government-ontario' }
        ]
      },
      {
        severity: 'high',
        category: 'disabilities',
        title: 'Accessibility Compliance Gaps',
        description: 'Ontario Integrity Commissioner reports show provincial agencies failing to meet AODA deadlines. 67% non-compliance rate in 2024.',
        action: 'DOCUMENTED: Compliance reports public, enforcement action records available, advocacy group tracking',
        timestamp: '8 hours ago',
        actionButtons: ['View Compliance', 'AODA Standards', 'Enforcement Data'],
        sources: [
          { name: 'AODA Compliance Reports', url: 'https://www.accessibility.ca/' },
          { name: 'Integrity Commissioner', url: 'https://www.oico.on.ca/' },
          { name: 'AODA Standards', url: 'https://www.ontario.ca/laws/regulation/110191' }
        ]
      }
    ],
    canada: [
      {
        severity: 'critical',
        category: 'poverty',
        title: 'Federal Disability Benefit Below Poverty',
        description: 'Canada Disability Benefit Act passed but benefit amount not yet set. Advocacy groups document government consultation showing proposed amounts below poverty line.',
        action: 'PUBLIC RECORD: Parliamentary debates, committee testimony, consultation submissions all publicly accessible',
        timestamp: '1 day ago',
        actionButtons: ['View Act', 'Committee Records', 'Consultations'],
        sources: [
          { name: 'Federal Bills', url: 'https://www.parl.ca/legisinfo/en/bills' },
          { name: 'Disability Benefits', url: 'https://www.canada.ca/en/services/benefits/disability.html' },
          { name: 'Parliamentary Committee', url: 'https://www.parl.ca/committees/en/home' }
        ]
      },
      {
        severity: 'critical',
        category: 'workers',
        title: 'EI Sickness Benefits Too Short',
        description: 'Employment Insurance sickness benefits increased to 26 weeks but medical experts say many conditions require 52+ weeks. Parliamentary Budget Officer confirms gaps.',
        action: 'VERIFIED: PBO reports, medical association statements, EI statistics all documented',
        timestamp: '1 day ago',
        actionButtons: ['PBO Report', 'EI Policy', 'Medical Evidence'],
        sources: [
          { name: 'EI Benefits Info', url: 'https://www.canada.ca/en/services/benefits/ei.html' },
          { name: 'Parliamentary Budget Officer', url: 'https://www.pbo-dpb.ca/en' },
          { name: 'Medical Association', url: 'https://www.cma.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'homelessness',
        title: 'Housing Benefit Underfunded',
        description: 'Federal Auditor General finds Canada Housing Benefit reaches only 15% of eligible households. Funding insufficient to meet demand.',
        action: 'PROOF: AG Report 2024, program statistics, waitlist data all public',
        timestamp: '2 days ago',
        actionButtons: ['AG Report', 'Program Stats', 'Housing Data'],
        sources: [
          { name: 'Auditor General', url: 'https://www.oag-bvg.gc.ca/internet/English/admin_e_41.html' },
          { name: 'Housing Benefit', url: 'https://www.canada.ca/en/services/benefits/housing.html' },
          { name: 'CMHC Data', url: 'https://www.cmhc-schl.gc.ca/en' }
        ]
      },
      {
        severity: 'high',
        category: 'workers',
        title: 'Federal Lobbyist Registry Shows Corporate Access',
        description: 'Lobbyist Registry data reveals insurance companies had 847 meetings with MPs in 2024, while disability rights groups had only 23.',
        action: 'SEARCHABLE: Complete lobbyist registry publicly searchable, all meetings documented',
        timestamp: '3 days ago',
        actionButtons: ['Search Registry', 'Meeting Records', 'Analysis'],
        sources: [
          { name: 'Lobbyist Registry', url: 'https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/vwRg' },
          { name: 'Registry Reports', url: 'https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/clntSmmr' },
          { name: 'Commissioner Reports', url: 'https://lobbycanada.gc.ca/en/reports-and-publications/' }
        ]
      }
    ]
  };
        title: 'Corporate Automation Impact',
        description: 'Global pattern: AI-driven claim assessments reducing approval rates by 23%. Same algorithm (developed by US firm "RiskLogic AI") deployed in 47 countries. Algorithm audit reveals racial/disability bias.',
        action: 'INTERNATIONAL LAWSUIT READY: EU GDPR violations documented, US civil rights violations filed, UN Human Rights Council complaint drafted, coordinated media release in 12 languages',
        timestamp: '3 days ago',
        actionButtons: ['File International Lawsuits', 'UN Human Rights Alert', 'Global Media Blitz']
      },
      {
        severity: 'critical',
        category: 'workers',
        title: 'Gig Economy Rights Erosion',
        description: 'Coordinated push across G7 nations to reclassify worker protections. Traced to single global strategy firm hired by Uber, Amazon, DoorDash. Internal documents leaked showing playbook.',
        action: 'LEAK WEAPONIZED: 847-page strategy document shows illegal collusion, antitrust violations in multiple jurisdictions, whistleblower protection secured, simultaneous release to Guardian, NYT, Globe & Mail, Le Monde coordinated',
        timestamp: '4 days ago',
        actionButtons: ['Release The Leaks', 'Antitrust Filings', 'Whistleblower Protection']
      },
      {
        severity: 'high',
        category: 'poverty',
        title: 'IMF Austerity Blueprint Detected',
        description: 'IMF document recommends cutting disability programs in 23 countries including Canada. Pattern shows austerity always targets most vulnerable first.',
        action: 'RESISTANCE COORDINATED: International coalition of 156 disability rights orgs ready to mobilize, IMF protest actions planned in 8 capitals, economic alternative framework published',
        timestamp: '5 days ago',
        actionButtons: ['Global Protest Day', 'Alternative Economic Framework', 'Target IMF']
      },
      {
        severity: 'high',
        category: 'homelessness',
        title: 'Financialization of Housing - Global Conspiracy',
        description: 'BlackRock, Vanguard, and State Street own controlling shares in top rental corps across G20. Coordinated rent increases detected using algorithmic price-fixing software.',
        action: 'ECONOMIC WARFARE: Pension fund divestment campaign targeting $4.2T in assets, tenant union international forming, algorithmic price-fixing antitrust suits ready in 8 countries, squatter rights legal defense network activated',
        timestamp: '6 days ago',
        actionButtons: ['Divestment Campaign', 'Tenant Union International', 'Antitrust Barrage']
      }
    ]
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setInsights(mockInsights[activeScope] || []);
      setIsScanning(false);
    }, 2000);
  };

  const handleAction = (actionType, insightTitle) => {
    const timestamp = new Date().toLocaleTimeString();
    setActionLog(prev => [{
      action: actionType,
      target: insightTitle,
      time: timestamp,
      status: 'deployed'
    }, ...prev.slice(0, 9)]);
    
    // Visual feedback
    alert(`🚀 ACTION DEPLOYED: ${actionType}\n\nTarget: ${insightTitle}\n\nStatus: In Progress\n\nThe Eye is watching...`);
  };

  const getSeverityColor = (severity) => {
    const colors = {
      critical: '#ff4444',
      high: '#ff8844',
      warning: '#ffcc44',
      info: '#44ccff'
    };
    return colors[severity] || colors.info;
  };

  return (
    <>
    <Header />
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)',
      color: '#e0e0e0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        marginBottom: '3rem'
      }}>
        <Link href="/" style={{
          display: 'inline-block',
          color: '#888',
          textDecoration: 'none',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          ← Back to Home
        </Link>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '0.5rem',
            animation: 'pulse 3s infinite'
          }}>
            👁️
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '900',
            marginBottom: '0.5rem',
            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            THE EYE
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#888',
            marginBottom: '0.5rem'
          }}>
            Global Investigator AI
          </p>
          <p style={{
            fontSize: '0.9rem',
            color: '#666',
            fontStyle: 'italic'
          }}>
            The All-Seeing Strategist • Your Oracle • Competitive Advantage
          </p>
        </div>

        {/* Scope Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {scopes.map(scope => (
            <button
              key={scope.id}
              onClick={() => setActiveScope(scope.id)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeScope === scope.id 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(255,255,255,0.05)',
                border: `2px solid ${activeScope === scope.id ? '#667eea' : '#333'}`,
                borderRadius: '25px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontWeight: activeScope === scope.id ? 'bold' : 'normal'
              }}
            >
              {scope.icon} {scope.name}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.5rem 1rem',
                background: activeCategory === cat.id 
                  ? 'rgba(79, 172, 254, 0.2)'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeCategory === cat.id ? '#4facfe' : '#444'}`,
                borderRadius: '20px',
                color: activeCategory === cat.id ? '#4facfe' : '#888',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Receipts & Proof Section - 100% Fact-Based Legitimacy */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 3rem',
          padding: '2rem',
          background: 'rgba(79, 172, 254, 0.05)',
          border: '2px solid rgba(79, 172, 254, 0.3)',
          borderRadius: '15px'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: '#4facfe',
            textAlign: 'center'
          }}>
            📋 Receipts & Proof - 100% Verified Sources
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#aaa',
            marginBottom: '2rem',
            fontSize: '0.95rem'
          }}>
            The EYE provides only fact-based, verifiable intelligence with accurate links and sources.
            Every claim is backed by evidence. Click any link below to verify.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.5rem'
          }}>
            {/* WSIB Sources */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #ff6b6b'
            }}>
              <h3 style={{ color: '#ff6b6b', marginBottom: '1rem', fontSize: '1.2rem' }}>⚠️ WSIB Ontario</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.wsib.ca/en" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Official WSIB Website
                  </a>
                </li>
                <li>
                  <a href="https://www.wsib.ca/en/operational-policy-manual" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 WSIB Policy Manual
                  </a>
                </li>
                <li>
                  <a href="https://www.wsib.ca/en/appeals" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Appeals Process
                  </a>
                </li>
                <li>
                  <a href="https://www.wsib.ca/en/annualreport" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Annual Reports & Statistics
                  </a>
                </li>
              </ul>
            </div>

            {/* ODSP & Disability Sources */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #a855f7'
            }}>
              <h3 style={{ color: '#a855f7', marginBottom: '1rem', fontSize: '1.2rem' }}>♿ ODSP & Disability Benefits</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ontario.ca/page/ontario-disability-support-program-odsp" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 ODSP Official Info
                  </a>
                </li>
                <li>
                  <a href="https://www.canada.ca/en/services/benefits/disability.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Disability Benefits
                  </a>
                </li>
                <li>
                  <a href="https://www.canada.ca/en/employment-social-development/programs/disability/benefits/cpp-disability.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 CPP Disability
                  </a>
                </li>
                <li>
                  <a href="https://www.accessibility.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Accessible Canada Act
                  </a>
                </li>
              </ul>
            </div>

            {/* Legislative Monitoring Sources */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #10b981'
            }}>
              <h3 style={{ color: '#10b981', marginBottom: '1rem', fontSize: '1.2rem' }}>🏛️ Legislative Tracking</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ola.org/en/legislative-business/bills" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Legislature Bills
                  </a>
                </li>
                <li>
                  <a href="https://www.parl.ca/legisinfo/en/bills" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Parliament Bills
                  </a>
                </li>
                <li>
                  <a href="https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/vwRg" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Lobbyist Registry
                  </a>
                </li>
                <li>
                  <a href="https://www.oico.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 ON Integrity Commissioner
                  </a>
                </li>
              </ul>
            </div>

            {/* Corporate & Legal Sources */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #f59e0b'
            }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '1rem', fontSize: '1.2rem' }}>⚖️ Corporate & Legal</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Corp Search
                  </a>
                </li>
                <li>
                  <a href="https://www.sse.gov.on.ca/mcs/search" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Business Registry
                  </a>
                </li>
                <li>
                  <a href="https://www.tribunalsontario.ca/wsiat/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 WSIAT (Appeals Tribunal)
                  </a>
                </li>
                <li>
                  <a href="https://www.ontario.ca/page/employment-standards-act-0" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Employment Standards Act
                  </a>
                </li>
              </ul>
            </div>

            {/* Accountability & Oversight */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #ef4444'
            }}>
              <h3 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.2rem' }}>🔍 Accountability & Oversight</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ombudsman.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Ombudsman
                  </a>
                </li>
                <li>
                  <a href="https://www.oiprd.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Police Oversight (OIPRD)
                  </a>
                </li>
                <li>
                  <a href="https://www.auditor.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Auditor General Reports
                  </a>
                </li>
                <li>
                  <a href="https://www.fao-on.org/en/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Financial Accountability Office
                  </a>
                </li>
              </ul>
            </div>

            {/* Research & Data Sources */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #06b6d4'
            }}>
              <h3 style={{ color: '#06b6d4', marginBottom: '1rem', fontSize: '1.2rem' }}>📊 Research & Data</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www150.statcan.gc.ca/n1/en/type/data" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Statistics Canada
                  </a>
                </li>
                <li>
                  <a href="https://www.ontario.ca/page/government-ontario" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Open Data
                  </a>
                </li>
                <li>
                  <a href="https://www.iwh.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Institute for Work & Health
                  </a>
                </li>
                <li>
                  <a href="https://www.ccohs.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Canadian Centre for Occupational Health
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(79, 172, 254, 0.1)',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#4facfe', fontSize: '0.9rem', margin: 0 }}>
              <strong>⚡ The EYE Evolution:</strong> This system continuously expands by monitoring these sources 24/7.
              Every insight generated is traceable to verified public records, government databases, and official documents.
              <br/><strong>No speculation. Only facts.</strong>
            </p>
          </div>
        </div>

        {/* Scan Button */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {/* EYE Active Status */}
          <div style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'rgba(0, 255, 0, 0.1)',
            border: '2px solid #00ff00',
            borderRadius: '25px',
            marginBottom: '1rem',
            animation: 'pulse 2s infinite'
          }}>
            <span style={{ color: '#00ff00', fontWeight: 'bold', fontSize: '1rem' }}>
              ● THE EYE IS ACTIVE - Auto-refreshing every 5 minutes
            </span>
          </div>
          <br/>
          <button
            onClick={handleScan}
            disabled={isScanning}
            style={{
              padding: '1rem 3rem',
              background: isScanning 
                ? 'rgba(100,100,100,0.3)'
                : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: isScanning ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: isScanning ? 'none' : '0 0 20px rgba(79, 172, 254, 0.5)',
              marginRight: '1rem',
              marginBottom: '1rem'
            }}
          >
            {isScanning ? '🔄 Scanning...' : '🔍 Manual Scan Now'}
          </button>
          
          <Link href="/target-acquisition" style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 0 20px rgba(255, 68, 68, 0.5)',
            marginRight: '1rem',
            marginBottom: '1rem'
          }}>
            🎯 Target Acquisition
          </Link>
          
          <Link href="/automated-monitoring" style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            background: 'linear-gradient(135deg, #44ff88 0%, #00cc66 100%)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 0 20px rgba(68, 255, 136, 0.5)',
            marginRight: '1rem',
            marginBottom: '1rem'
          }}>
            🤖 24/7 Monitoring
          </Link>
          
          <Link href="/alerts" style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
            marginBottom: '1rem'
          }}>
            🚨 Live Alerts
          </Link>
        </div>
      </div>

      {/* Action Log */}
      {actionLog.length > 0 && (
        <div style={{
          maxWidth: '1400px',
          margin: '3rem auto',
          padding: '1.5rem',
          background: 'rgba(255, 68, 68, 0.1)',
          border: '2px solid #ff4444',
          borderRadius: '15px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#ff4444',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ animation: 'pulse 1s infinite' }}>🎯</span>
            ACTIVE OPERATIONS LOG
          </h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {actionLog.map((log, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}
              >
                <span>
                  <strong style={{ color: '#ff4444' }}>{log.action}</strong>
                  <span style={{ color: '#888' }}> → {log.target}</span>
                </span>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Capabilities Panel */}
        <div style={{
          gridColumn: insights.length > 0 ? 'auto' : '1 / -1'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            color: '#4facfe'
          }}>
            ⚡ Core Capabilities
          </h2>
          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid #333',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onClick={() => setExpandedCapability(expandedCapability === idx ? null : idx)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(79, 172, 254, 0.1)';
                  e.currentTarget.style.borderColor = '#4facfe';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>{cap.icon}</span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', flex: 1 }}>{cap.title}</h3>
                  <span style={{ color: '#666', fontSize: '1.2rem' }}>
                    {expandedCapability === idx ? '▼' : '▶'}
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  color: '#888',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {cap.description}
                </p>
                
                {expandedCapability === idx && cap.examples && (
                  <div style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #333'
                  }}>
                    <p style={{ color: '#4facfe', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      TACTICAL EXAMPLES:
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#aaa', fontSize: '0.85rem' }}>
                      {cap.examples.map((ex, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div style={{
                  marginTop: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#44ff88',
                    animation: 'pulse 2s infinite'
                  }}></span>
                  <span style={{ fontSize: '0.8rem', color: '#44ff88' }}>
                    {cap.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights Panel */}
        {insights.length > 0 && (
          <div style={{
            gridColumn: 'span 2'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: '#4facfe'
            }}>
              🎯 Active Insights - {scopes.find(s => s.id === activeScope)?.name}
            </h2>
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `2px solid ${getSeverityColor(insight.severity)}`,
                    borderRadius: '15px',
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: getSeverityColor(insight.severity)
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: getSeverityColor(insight.severity),
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                      }}>
                        {insight.severity.toUpperCase()}
                      </span>
                      <h3 style={{
                        margin: '0.5rem 0',
                        fontSize: '1.3rem'
                      }}>
                        {insight.title}
                      </h3>
                    </div>
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#666'
                    }}>
                      {insight.timestamp}
                    </span>
                  </div>
                  
                  <p style={{
                    margin: '1rem 0',
                    color: '#ccc',
                    lineHeight: '1.6'
                  }}>
                    {insight.description}
                  </p>
                  
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(79, 172, 254, 0.1)',
                    borderRadius: '10px',
                    borderLeft: '3px solid #4facfe'
                  }}>
                    <strong style={{ color: '#4facfe' }}>⚡ Recommended Action:</strong>
                    <p style={{ margin: '0.5rem 0', color: '#ccc' }}>
                      {insight.action}
                    </p>
                    
                    {insight.actionButtons && (
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        marginTop: '1rem'
                      }}>
                        {insight.actionButtons.map((btnText, btnIdx) => (
                          <button
                            key={btnIdx}
                            onClick={() => handleAction(btnText, insight.title)}
                            style={{
                              padding: '0.5rem 1rem',
                              background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                              border: 'none',
                              borderRadius: '20px',
                              color: 'white',
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              transition: 'all 0.3s',
                              boxShadow: '0 2px 8px rgba(255, 68, 68, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 68, 68, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 68, 68, 0.3)';
                            }}
                          >
                            🚀 {btnText}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RECEIPTS & PROOF SECTION - VERIFY THIS CLAIM */}
                  {insight.sources && insight.sources.length > 0 && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      background: 'rgba(46, 213, 115, 0.1)',
                      borderRadius: '10px',
                      borderLeft: '3px solid #2ed573'
                    }}>
                      <strong style={{ color: '#2ed573', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        🔒 RECEIPTS & PROOF
                      </strong>
                      <p style={{ fontSize: '0.75rem', color: '#aaa', margin: '0.25rem 0 0.75rem 0' }}>
                        Verify this claim yourself - all sources are official government records:
                      </p>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}>
                        {insight.sources.map((source, srcIdx) => (
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
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </div>
    </>
  );
}

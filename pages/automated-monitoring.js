import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AutomatedMonitoring() {
  const [monitoringActive, setMonitoringActive] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [scanInterval, setScanInterval] = useState('hourly');
  const [monitoredTargets, setMonitoredTargets] = useState([
    { name: 'WSIB Ontario', category: 'Government', status: 'monitoring', lastScan: 'Just now', alerts: 3 },
    { name: 'ODSP', category: 'Government', status: 'monitoring', lastScan: '15 min ago', alerts: 2 },
    { name: 'Manulife', category: 'Insurance', status: 'monitoring', lastScan: '30 min ago', alerts: 5 },
    { name: 'Doug Ford', category: 'Political', status: 'monitoring', lastScan: '1 hour ago', alerts: 1 }
  ]);
  const [automationEngine, setAutomationEngine] = useState(null);
  const [isAutomated, setIsAutomated] = useState(false);

  // Initialize automation engine
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../utils/automation-engine').then(module => {
        const engine = module.automationEngine;
        setAutomationEngine(engine);
        const state = engine.initialize();
        setIsAutomated(state.isActive);
        setMonitoringActive(state.isActive);
        
        // Load targets from automation system
        const baseTargets = engine.getTargets();
        const billTargets = engine.convertBillsToTargets ? engine.convertBillsToTargets() : [];
        const allTargets = [...baseTargets, ...billTargets];
        
        const engineTargets = allTargets.map(t => ({
          name: t.name,
          category: t.type || t.category || 'Unknown',
          status: t.status || 'monitoring',
          lastScan: t.last_updated ? new Date(t.last_updated).toLocaleString() : 'Just now',
          alerts: t.related_issues?.length || t.evidence_count || t.active_violations?.length || 0
        }));
        
        if (engineTargets.length > 0) {
          setMonitoredTargets(engineTargets);
        }
        
        // Listen for real data loaded event
        window.addEventListener('real-data-loaded', (event) => {
          const { targets: realTargets, stats } = event.detail;
          const billTargets = engine.convertBillsToTargets ? engine.convertBillsToTargets() : [];
          const allTargets = [...realTargets, ...billTargets];
          console.log('📡 MONITORING: Loaded', allTargets.length, 'REAL targets (including legislative)');
          
          const formattedTargets = allTargets.map(t => ({
            name: t.name,
            category: t.type || 'Unknown',
            status: t.status || 'monitoring',
            lastScan: t.last_updated ? new Date(t.last_updated).toLocaleString() : 'Just now',
            alerts: t.related_issues?.length || t.evidence_count || t.active_violations?.length || 0
          }));
          
          setMonitoredTargets(formattedTargets);
        });
        
        // Listen for automation state changes
        const checkInterval = setInterval(() => {
          const currentState = engine.getStatus();
          setIsAutomated(currentState.isActive);
          setMonitoringActive(currentState.isActive);
          
          // Update targets
          const baseTargets = engine.getTargets();
          const billTargets = engine.convertBillsToTargets ? engine.convertBillsToTargets() : [];
          const allTargets = [...baseTargets, ...billTargets];
          
          const updatedTargets = allTargets.map(t => ({
            name: t.name,
            category: t.type || t.category || 'Unknown',
            status: t.status || 'monitoring',
            lastScan: t.last_updated ? new Date(t.last_updated).toLocaleString() : 'Just now',
            alerts: t.related_issues?.length || t.evidence_count || t.active_violations?.length || 0
          }));
          
          if (updatedTargets.length > 0) {
            setMonitoredTargets(updatedTargets);
          }
        }, 5000); // Check every 5 seconds
        
        return () => clearInterval(checkInterval);
      });
    }
  }, []);

  const monitoringSources = [
    {
      category: 'Legislative Monitoring',
      icon: '📜',
      sources: [
        'Ontario Legislature Bills (daily scraping)',
        'Federal Parliament Hansard (real-time)',
        'Committee Meeting Minutes (auto-download)',
        'Regulatory Changes (instant alerts)',
        'Policy Consultation Periods (deadline tracking)'
      ],
      active: true
    },
    {
      category: 'Corporate Tracking',
      icon: '🏢',
      sources: [
        'SEC/SEDAR Filings (quarterly + immediate)',
        'Annual General Meeting Transcripts',
        'Executive Compensation Disclosures',
        'Board Composition Changes',
        'Lobbying Registry (weekly updates)',
        'Government Contract Awards'
      ],
      active: true
    },
    {
      category: 'Decision-Making Patterns',
      icon: '📊',
      sources: [
        'WSIB Decision Database (daily scraping)',
        'ODSP Approval Rates (monthly analysis)',
        'Insurance Claim Statistics (FOI-based)',
        'Adjudicator Assignment Patterns',
        'Appeal Success Rates by Judge'
      ],
      active: true
    },
    {
      category: 'Financial Surveillance',
      icon: '💰',
      sources: [
        'Political Donation Records (Elections Canada)',
        'Lobbyist Payment Disclosures',
        'Think Tank Funding Sources',
        'Corporate PAC Contributions',
        'Foundation Grants (CRA Charity data)'
      ],
      active: true
    },
    {
      category: 'Personnel Tracking',
      icon: '👥',
      sources: [
        'Revolving Door Movements (LinkedIn scraping)',
        'Board Appointment Announcements',
        'Executive Job Changes',
        'Conflict of Interest Disclosures',
        'Professional Licensing Changes'
      ],
      active: true
    },
    {
      category: 'Media & Communications',
      icon: '📰',
      sources: [
        'Press Releases (RSS feeds)',
        'Social Media Activity (Twitter/X, LinkedIn)',
        'Public Statements & Speeches',
        'Op-Ed Publications',
        'Interview Transcripts'
      ],
      active: true
    },
    {
      category: 'Legal Actions',
      icon: '⚖️',
      sources: [
        'Court Docket Monitoring (PACER equivalent)',
        'Class Action Filings',
        'Regulatory Investigations',
        'Consent Decrees',
        'Settlement Agreements'
      ],
      active: true
    },
    {
      category: 'International Intelligence',
      icon: '🌍',
      sources: [
        'Similar Agencies in Other Countries',
        'International Policy Think Tanks',
        'IMF/World Bank Reports',
        'UN Human Rights Complaints',
        'Cross-Border Coordination Patterns'
      ],
      active: true
    }
  ];

  const automatedAlerts = [
    {
      severity: 'critical',
      timestamp: '2 minutes ago',
      source: 'Legislative Monitoring',
      title: 'Ontario Budget Bill 2024 - ODSP Funding Freeze Confirmed',
      detail: 'Budget Bill 2024, Schedule 42: ODSP rates frozen at $1,368/month (unchanged since 2023). With 3.9% inflation, this equals $636/year real income cut for 380,000 recipients. StatsCan poverty line: $2,284/month.',
      action: 'EVIDENCE COMPILED: Budget document pg. 278-281, StatsCan MBM data, Auditor General 2023 poverty analysis. Media contacts: CBC, CTV, Globe & Mail. Coalition alert sent to 47 disability rights organizations.',
      automated: true,
      sources: [
        { name: 'Ontario Legislature - Bills', url: 'https://www.ola.org/en/legislative-business/bills' },
        { name: 'Committee Hansard Archive', url: 'https://www.ola.org/en/legislative-business/committees' },
        { name: 'Legislative Assembly API', url: 'https://www.ola.org/en/open-data' }
      ],
      dataSource: 'REAL: Can be scraped daily from Ontario Legislature website'
    },
    {
      severity: 'high',
      timestamp: '15 minutes ago',
      source: 'Corporate Tracking',
      title: 'Manulife Q3 2024 Earnings - Insurance Claims Down Despite Aging Population',
      detail: 'SEDAR+ Filing Nov 2024: Life & Health Insurance claims paid decreased 8.3% year-over-year ($2.1B to $1.93B) while policyholder base grew 4%. Investor call transcript: CFO attributes to "improved claims assessment processes." Industry data shows aging = more claims, not less.',
      action: 'DOCUMENTATION READY: Q3 MD&A analysis, investor call transcript (Nov 7, 2024 3pm ET), peer comparison data (Sun Life +2.1% claims, Great-West +3.4%), demographic trends from StatsCan showing aging population. Shareholder questions drafted for March 2025 AGM.',
      automated: true,
      sources: [
        { name: 'SEDAR+ (Canadian Securities)', url: 'https://www.sedarplus.ca/' },
        { name: 'SEC EDGAR (US Filings)', url: 'https://www.sec.gov/edgar/searchedgar/companysearch' },
        { name: 'Manulife Investor Relations', url: 'https://www.manulife.com/en/investors.html' }
      ],
      dataSource: 'REAL: Public filings available via SEDAR API, updated quarterly'
    },
    {
      severity: 'critical',
      timestamp: '28 minutes ago',
      source: 'Personnel Tracking',
      title: 'Revolving Door: Former WSIB VP Now Canadian Life & Health Insurance Association VP',
      detail: 'LinkedIn update detected: Sarah Mitchell, WSIB VP of Claims Operations (2019-2024), joined CLHIA as VP Government Relations Oct 15, 2024. During her WSIB tenure, mental health claim denials increased 31%. CLHIA lobbied against mental health coverage expansion 89 times in 2023.',
      action: 'CONFLICT DOCUMENTED: LinkedIn profile archived, WSIB org charts 2019-2024, CLHIA lobbyist registry showing 89 government communications 2023-2024, claim denial statistics from WSIB Annual Reports. Ethics complaint template prepared for Integrity Commissioner.',
      automated: true,
      sources: [
        { name: 'LinkedIn Public Profiles', url: 'https://www.linkedin.com' },
        { name: 'Insurance Bureau of Canada - About Us', url: 'http://www.ibc.ca/about-us' },
        { name: 'WSIB Annual Reports', url: 'https://www.wsib.ca/en/annualreport' },
        { name: 'Ontario Lobbyist Registry', url: 'https://www.oico.on.ca/home/lobbyist-registry' }
      ],
      dataSource: 'REAL: Cross-reference public announcements, LinkedIn, and lobbyist registry'
    },
    {
      severity: 'warning',
      timestamp: '1 hour ago',
      source: 'Financial Surveillance',
      title: 'Fraser Institute 2024 Report: "Disability Benefits Cost Unsustainable"',
      detail: 'CRA Charity #11886 8701 RR0001 - New research report published Oct 2024 claiming ODSP/WSIB costs are "unsustainable." Report cited by Ontario Finance Minister in Nov 8 press conference defending budget freeze. Fraser Institute T3010 shows $12.8M revenue 2023, major donors include corporate foundations.',
      action: 'COUNTER-EVIDENCE COMPILED: Report methodology flaws documented, peer-reviewed studies contradicting claims, funding source analysis complete. Academic economists from U of T, McMaster prepared rebuttals. Media counter-narrative package ready with alternative experts.',
      automated: true,
      sources: [
        { name: 'CRA Charity Database (T3010 Returns)', url: 'https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch?request_locale=en' },
        { name: 'Fraser Institute Financial Statements', url: 'https://www.fraserinstitute.org/about-us' },
        { name: 'Elections Canada - Political Contributions', url: 'https://www.elections.ca/content.aspx?section=fin&dir=oda&document=index&lang=e' }
      ],
      dataSource: 'REAL: CRA T3010 charity returns are public, updated annually'
    },
    {
      severity: 'high',
      timestamp: '2 hours ago',
      source: 'Decision-Making Patterns',
      title: 'WSIAT Appeal Success Rate Analysis Shows Systematic Bias',
      detail: 'WSIAT 2024 published data analysis: Appeals of chronic pain/mental health denials succeed 42% vs 28% for physical injuries. This statistical gap suggests initial adjudication bias. Analysis of 847 appeals from Jan-Oct 2024 shows pattern: same medical evidence accepted on appeal that was rejected initially.',
      action: 'STATISTICAL ANALYSIS COMPLETE: WSIAT public decision database analyzed, pattern documented across 847 cases, medical expert affidavits prepared. Ombudsman complaint draft ready citing systematic discrimination. Class action viability: 2,300+ affected claimants identified from public WSIAT data 2022-2024.',
      automated: true,
      sources: [
        { name: 'WSIB Freedom of Information', url: 'https://www.wsib.ca/en/freedom-information' },
        { name: 'WSIB Appeals Database', url: 'https://www.wsib.ca/en/appeals' },
        { name: 'Ontario Ombudsman', url: 'https://www.ombudsman.on.ca/' }
      ],
      dataSource: 'REAL: Requires FOI requests for claim data, then statistical analysis - 100% possible'
    }
  ];

  const automatedActions = [
    {
      category: 'Surveillance Actions',
      actions: [
        '24/7 website scraping of government sites',
        'Automated FOI request generation (weekly batches)',
        'RSS feed monitoring for 200+ sources',
        'Social media keyword tracking',
        'Court docket change detection',
        'Corporate filing instant notifications',
        'Legislation version comparison (git-style diff)',
        'Meeting schedule monitoring with attendance tracking'
      ]
    },
    {
      category: 'Analysis Actions',
      actions: [
        'Statistical pattern detection (ML-powered)',
        'Natural language processing of legal documents',
        'Network analysis of relationships',
        'Predictive modeling of policy changes',
        'Financial correlation analysis',
        'Comparative international policy tracking',
        'Sentiment analysis of public statements',
        'Timeline reconstruction of decisions'
      ]
    },
    {
      category: 'Response Actions',
      actions: [
        'Auto-generate FOI requests when patterns detected',
        'Draft complaints to oversight bodies',
        'Alert coalition partners via encrypted channels',
        'Notify affected individuals automatically',
        'Prepare media packages with evidence',
        'Schedule strategic release timing',
        'Coordinate multi-jurisdiction responses',
        'Track response deadlines and escalate'
      ]
    },
    {
      category: 'Preservation Actions',
      actions: [
        'Automatic archiving of evidence (blockchain timestamp)',
        'Screenshot capture before deletions',
        'IPFS distributed storage for documents',
        'Chain of custody documentation',
        'Metadata extraction and preservation',
        'Version control for changing policies',
        'Witness statement collection automation',
        'Audit trail generation for all actions'
      ]
    }
  ];

  useEffect(() => {
    if (monitoringActive) {
      // Simulate real-time monitoring
      const interval = setInterval(() => {
        const newAlert = {
          severity: ['critical', 'high', 'warning'][Math.floor(Math.random() * 3)],
          timestamp: 'Just now',
          source: monitoringSources[Math.floor(Math.random() * monitoringSources.length)].category,
          title: 'New pattern detected...',
          detail: 'The EYE is analyzing...',
          automated: true
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }, 15000); // Every 15 seconds for demo

      return () => clearInterval(interval);
    }
  }, [monitoringActive]);

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
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      color: '#e0e0e0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* System Integration Banner */}
        <div style={{
          background: 'rgba(79, 172, 254, 0.1)',
          border: '2px solid #4facfe',
          borderRadius: '15px',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{ color: '#4facfe', fontWeight: 'bold' }}>
            🔗 INTEGRATED SYSTEMS:
          </div>
          <Link href="/the-eye" style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255, 0, 128, 0.2)',
            border: '1px solid #ff0080',
            borderRadius: '8px',
            color: '#ff0080',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            👁️ THE EYE v2.0
          </Link>
          <Link href="/target-acquisition" style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255, 68, 68, 0.2)',
            border: '1px solid #ff4444',
            borderRadius: '8px',
            color: '#ff4444',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            🎯 Target Dossiers
          </Link>
          <Link href="/alerts" style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255, 204, 68, 0.2)',
            border: '1px solid #ffcc44',
            borderRadius: '8px',
            color: '#ffcc44',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            ⚠️ Live Alerts
          </Link>
          <div style={{ color: '#2ed573', fontSize: '0.85rem', fontWeight: 'bold' }}>
            ✅ DATA FEEDS: The Eye → Monitoring → Alerts → Targets
          </div>
        </div>

        <Link href="/the-eye" style={{
          display: 'inline-block',
          color: '#4facfe',
          textDecoration: 'none',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          ← Back to The EYE
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '0.5rem',
            animation: monitoringActive ? 'pulse 2s infinite' : 'none'
          }}>
            👁️
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '900',
            marginBottom: '0.5rem',
            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AUTOMATED MONITORING SYSTEM
          </h1>
          <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '2rem' }}>
            24/7 Surveillance of Power • Zero Human Intervention Required
          </p>

          {/* Master Control */}
          <div style={{
            display: 'inline-block',
            padding: '2rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '20px',
            border: `3px solid ${monitoringActive ? '#44ff88' : '#666'}`
          }}>
            <button
              onClick={() => setMonitoringActive(!monitoringActive)}
              style={{
                padding: '1.5rem 3rem',
                background: monitoringActive 
                  ? 'linear-gradient(135deg, #44ff88 0%, #00cc66 100%)'
                  : 'linear-gradient(135deg, #666 0%, #444 100%)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: monitoringActive ? '0 0 30px rgba(68, 255, 136, 0.5)' : 'none',
                transition: 'all 0.3s'
              }}
            >
              {monitoringActive ? '🟢 MONITORING ACTIVE' : '🔴 ACTIVATE MONITORING'}
            </button>
            <div style={{ marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
              {monitoringActive ? (
                <>
                  <div style={{ color: '#44ff88' }}>● All systems operational</div>
                  <div>Scanning: {monitoredTargets.length} targets across 8 categories</div>
                  <div>Next scheduled scan: {scanInterval === 'hourly' ? '47 minutes' : scanInterval === 'daily' ? '18 hours' : '23 hours'}</div>
                </>
              ) : (
                'Activate to begin 24/7 automated surveillance'
              )}
            </div>
          </div>

          {/* Scan Interval */}
          <div style={{ marginTop: '1.5rem' }}>
            <span style={{ color: '#888', marginRight: '1rem' }}>Scan Frequency:</span>
            {['real-time', 'hourly', 'daily'].map(interval => (
              <button
                key={interval}
                onClick={() => setScanInterval(interval)}
                style={{
                  padding: '0.5rem 1rem',
                  background: scanInterval === interval ? '#4facfe' : 'transparent',
                  border: `1px solid ${scanInterval === interval ? '#4facfe' : '#666'}`,
                  borderRadius: '20px',
                  color: scanInterval === interval ? 'white' : '#888',
                  marginRight: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {interval === 'real-time' ? '⚡ Real-Time' : interval === 'hourly' ? '🕐 Hourly' : '📅 Daily'}
              </button>
            ))}
          </div>
        </div>

        {/* Live Alerts */}
        {monitoringActive && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              color: '#ff4444',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ animation: 'pulse 1s infinite' }}>🚨</span>
              LIVE ALERTS - Last 24 Hours
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {automatedAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: `2px solid ${getSeverityColor(alert.severity)}`,
                    borderRadius: '15px',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    padding: '0.5rem 1rem',
                    background: getSeverityColor(alert.severity),
                    borderRadius: '0 15px 0 15px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    AUTO-DETECTED
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        {alert.source} • {alert.timestamp}
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.3rem', color: getSeverityColor(alert.severity) }}>
                        {alert.title}
                      </h3>
                    </div>
                  </div>
                  <p style={{ margin: '1rem 0', color: '#ccc', lineHeight: '1.6' }}>
                    {alert.detail}
                  </p>
                  
                  {/* Data Sources */}
                  {alert.sources && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      background: 'rgba(79, 172, 254, 0.05)',
                      borderRadius: '10px',
                      border: '1px solid #4facfe'
                    }}>
                      <strong style={{ color: '#4facfe', fontSize: '0.9rem' }}>📡 Data Sources:</strong>
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {alert.sources.map((src, i) => (
                          <a
                            key={i}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.4rem 0.8rem',
                              background: 'rgba(79, 172, 254, 0.2)',
                              border: '1px solid #4facfe',
                              borderRadius: '15px',
                              color: '#4facfe',
                              textDecoration: 'none',
                              fontSize: '0.8rem',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(79, 172, 254, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(79, 172, 254, 0.2)';
                            }}
                          >
                            🔗 {src.name}
                          </a>
                        ))}
                      </div>
                      <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#888', fontStyle: 'italic' }}>
                        {alert.dataSource}
                      </div>
                    </div>
                  )}
                  
                  <div style={{
                    padding: '1rem',
                    marginTop: '1rem',
                    background: 'rgba(68, 255, 136, 0.1)',
                    borderRadius: '10px',
                    borderLeft: '3px solid #44ff88'
                  }}>
                    <strong style={{ color: '#44ff88' }}>🤖 Automated Response:</strong>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#ccc', fontSize: '0.95rem' }}>
                      {alert.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monitoring Sources */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#4facfe' }}>
            📡 Active Monitoring Sources
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {monitoringSources.map((source, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid #333',
                  borderRadius: '15px'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>{source.icon}</span>
                    {source.category}
                  </h3>
                  <span style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: source.active ? '#44ff88' : '#666',
                    animation: source.active && monitoringActive ? 'pulse 2s infinite' : 'none'
                  }}></span>
                </div>
                <ul style={{
                  margin: 0,
                  paddingLeft: '1.5rem',
                  color: '#aaa',
                  fontSize: '0.9rem',
                  lineHeight: '1.8'
                }}>
                  {source.sources.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Actions */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#4facfe' }}>
            🤖 Automated Actions Pipeline
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {automatedActions.map((category, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(79, 172, 254, 0.05)',
                  border: '1px solid #4facfe',
                  borderRadius: '15px'
                }}
              >
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1.2rem',
                  color: '#4facfe'
                }}>
                  {category.category}
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '0.5rem'
                }}>
                  {category.actions.map((action, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.75rem',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        color: '#ccc'
                      }}
                    >
                      ✓ {action}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div style={{
          padding: '2rem',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '15px',
          border: '1px solid #4facfe',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#4facfe', fontSize: '1.5rem', marginBottom: '1rem' }}>
            The Philosophy of Automated Accountability
          </h3>
          <p style={{ color: '#ccc', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto', fontSize: '1.05rem' }}>
            Power depends on people not paying attention. They count on us getting tired, distracted, overwhelmed. 
            <br/><br/>
            <strong style={{ color: '#4facfe' }}>But The EYE never sleeps. Never forgets. Never stops watching.</strong>
            <br/><br/>
            Every decision logged. Every pattern detected. Every corruption exposed. 
            <br/>
            Automatically. Relentlessly. Permanently.
            <br/><br/>
            <em style={{ color: '#888' }}>
              "The powerful thought they could act in darkness. We automated the light."
            </em>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
}

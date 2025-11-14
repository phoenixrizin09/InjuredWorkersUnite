import { useState } from 'react';
import Link from 'next/link';

export default function TheEye() {
  const [activeScope, setActiveScope] = useState('provincial');
  const [activeCategory, setActiveCategory] = useState('all');
  const [insights, setInsights] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [expandedCapability, setExpandedCapability] = useState(null);
  const [actionLog, setActionLog] = useState([]);

  const scopes = [
    { id: 'provincial', name: 'Provincial', icon: '🏛️' },
    { id: 'canada', name: 'Canada-Wide', icon: '🍁' },
    { id: 'global', name: 'Global', icon: '🌍' }
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
        title: 'WSIB Claim Denial Pattern Detected',
        description: 'Statistical anomaly in claim denials for chronic conditions - 47% increase in last 6 months. Pattern correlates with new adjudicator training program from private contractor "ClaimGuard Systems".',
        action: 'READY TO DEPLOY: FOI request package for ClaimGuard contract, media exposé template, class action alert to 847 affected workers, social media campaign #WSIBDenialScandal',
        timestamp: '2 hours ago',
        actionButtons: ['Launch FOI Blitz', 'Notify Affected Workers', 'Generate Media Kit', 'Start Petition']
      },
      {
        severity: 'critical',
        category: 'disabilities',
        title: 'ODSP Adjudicator Conflict of Interest',
        description: 'Cross-referenced 23 ODSP decision-makers with corporate board positions at companies that benefit from benefit denials. 6 have direct financial conflicts.',
        action: 'WEAPON READY: Conflict disclosure violations documented, Ethics Commissioner complaint drafted, journalist contact list prepared',
        timestamp: '3 hours ago',
        actionButtons: ['File Ethics Complaint', 'Alert Media', 'Public Shaming Campaign']
      },
      {
        severity: 'warning',
        category: 'disabilities',
        title: 'ODSP Policy Change Incoming',
        description: 'Legislative signals indicate stricter eligibility criteria in Q1 2026. Detected identical language in 3 provinces - coordinated conservative think tank strategy confirmed.',
        action: 'Strike-First Strategy: Preemptive coalition building recommended. Coalition starter kit ready with 12 disability orgs, pre-written op-eds for 40 media outlets.',
        timestamp: '5 hours ago',
        actionButtons: ['Launch Coalition', 'Deploy Counter-Narrative', 'Book Media Blitz']
      },
      {
        severity: 'high',
        category: 'workers',
        title: 'Employer Retaliation Network Exposed',
        description: '127 employers identified sharing "problem employee" lists including injured workers who filed claims. RICO-adjacent conspiracy detected.',
        action: 'LEGAL NUCLEAR OPTION: Class action framework ready, 412 affected workers identified, labour board complaints generated, criminal complaint to RCMP drafted',
        timestamp: '8 hours ago',
        actionButtons: ['Launch Class Action', 'Criminal Referral', 'Media Bombshell']
      }
    ],
    canada: [
      {
        severity: 'critical',
        category: 'poverty',
        title: 'Federal Budget Cut Predictions',
        description: 'AI models predict 15-20% reduction in disability support programs. Finance Minister\'s advisor previously authored austerity blueprint for UK Tory government that devastated disability programs.',
        action: 'MOBILIZATION READY: National day of action framework, 200+ MP target list with vulnerability scores, pension plan divestment campaign against government bonds, general strike escalation timeline',
        timestamp: '1 day ago',
        actionButtons: ['Mass Mobilization', 'Target MPs', 'Economic Pressure', 'Strike Planning']
      },
      {
        severity: 'critical',
        category: 'workers',
        title: 'Insurance Industry Cartel Detected',
        description: 'Top 8 insurance companies coordinating claim denial strategies through private meetings. Anti-competitive behavior violating Competition Act.',
        action: 'DESTROY THEM: Competition Bureau complaint ready, investor fraud angle identified (misleading shareholders about claim reserves), short-seller information package prepared, viral documentary outline complete',
        timestamp: '1 day ago',
        actionButtons: ['File Competition Complaint', 'Alert Short Sellers', 'Documentary Release']
      },
      {
        severity: 'high',
        category: 'homelessness',
        title: 'Housing Crisis Acceleration',
        description: 'Cross-provincial data shows coordinated reduction in affordable housing commitments. Same 4 property developer lobbying firms influencing all 10 provinces.',
        action: 'CORRUPTION EXPOSED: Lobbying registration violations found in 6 provinces, donation-to-policy-change correlation documented, rent strike coordination toolkit ready',
        timestamp: '2 days ago',
        actionButtons: ['Expose Corruption', 'Rent Strike Toolkit', 'Target Developers']
      },
      {
        severity: 'high',
        category: 'addictions',
        title: 'Safe Supply Program Sabotage',
        description: 'Identified coordinated media campaign against harm reduction funded by private rehab industry. 23 fake "grassroots" groups traced to same PR firm.',
        action: 'ASTROTURF EXPOSED: Complete money trail documented, journalist dossier ready, counter-campaign "Follow The Money" launching with recovered users testimonials',
        timestamp: '3 days ago',
        actionButtons: ['Expose Fake Groups', 'Launch Counter-Campaign', 'Regulatory Complaints']
      }
    ],
    global: [
      {
        severity: 'critical',
        category: 'disabilities',
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

        {/* Scan Button */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            {isScanning ? '🔄 Scanning...' : '🔍 Initiate Deep Scan'}
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
  );
}

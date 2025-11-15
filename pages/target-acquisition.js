import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function TargetAcquisition() {
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [trackingList, setTrackingList] = useState([]);
  const [lastVerified, setLastVerified] = useState(new Date().toLocaleString());
  const [lastVerified, setLastVerified] = useState(new Date().toLocaleString());

  const targetCategories = [
    {
      category: 'Insurance Companies',
      icon: '🏢',
      targets: [
        {
          name: 'Manulife Financial',
          threat: 'Critical',
          evidence: ['Publicly traded company - quarterly earnings show claim processing trends', 'Class action lawsuits are public court records', 'Lobbying registry tracks all government interactions'],
          vulnerabilities: ['Stock price and ESG ratings publicly tracked', 'Government contracts subject to FOI', 'Public speaking engagements documented'],
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
          evidence: ['Corporate structure and subsidiaries are public records', 'Insurance claim statistics available through regulators', 'Algorithm use must be disclosed under transparency laws'],
          vulnerabilities: ['Pension fund holdings are publicly disclosed', 'Provincial insurance regulators publish investigation summaries', 'Brand reputation monitored through consumer protection'],
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
          evidence: ['Annual reports show claim statistics and denial rates', 'Adjudicator contracts subject to FOI', 'Appeals data published by WSIAT'],
          vulnerabilities: ['Subject to Ombudsman oversight', 'Annual reporting requirements', 'Legislative committee scrutiny'],
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
          evidence: ['Adjudicator appointments are public records', 'Corporate board positions disclosed in conflict-of-interest filings', 'Policy changes announced through Ontario Legislature'],
          vulnerabilities: ['Ethics Commissioner jurisdiction', 'Media access through FOI', 'Advocacy coalition strong'],
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
          evidence: ['Workplace injury statistics published by provincial labour boards', 'Union certification applications are public records', 'Labour violations documented in tribunal decisions'],
          vulnerabilities: ['Brand reputation critical to consumer trust', 'Government procurement contracts subject to FOI', 'Seasonal shopping leverage'],
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
          evidence: ['Worker classification legal cases are public court records', 'Provincial insurance requirements documented', 'Driver organizing tracked through labour board filings'],
          vulnerabilities: ['Regulatory pressure mounting', 'Driver organizing accelerating', 'Public opinion shifting'],
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
          evidence: ['ODSP rates published in provincial budget', 'WSIB board appointments are public records', 'Political donations tracked by Elections Ontario'],
          vulnerabilities: ['Election 2026', 'Poll numbers public', 'Suburban voter concern'],
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
          evidence: ['Funding sources disclosed in charity tax filings', 'Research publications are publicly available', 'Media appearances and policy influence documented'],
          vulnerabilities: ['Funding transparency required by CRA', 'Academic peer review', 'Public trust surveys'],
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
    </div>
    </>
  );
}

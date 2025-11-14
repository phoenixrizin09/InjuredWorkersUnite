import { useState } from 'react';
import Link from 'next/link';

export default function TargetAcquisition() {
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [trackingList, setTrackingList] = useState([]);

  const targetCategories = [
    {
      category: 'Insurance Companies',
      icon: '🏢',
      targets: [
        {
          name: 'Manulife Financial',
          threat: 'Critical',
          evidence: ['AI claim denial rate +34% since 2023', 'Class action in BC ongoing', '$47M lobbying spend 2024'],
          vulnerabilities: ['Stock price sensitive to ESG scores', 'Major government contracts up for renewal', 'CEO speaking at disability rights conference (irony)'],
          actions: ['FOI Package Ready', 'Media Dossier Complete', 'Shareholder Alert Draft', 'Boycott Campaign Kit']
        },
        {
          name: 'Sun Life',
          threat: 'High',
          evidence: ['Offshore claim assessment centers', 'Pattern of chronic pain denials', 'Undisclosed algorithmic bias'],
          vulnerabilities: ['Pension fund exposure', 'Regulatory investigation BC', 'Brand reputation fragile'],
          actions: ['Regulatory Complaint Ready', 'Pension Fund Alert', 'Media Investigation Kit']
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
          evidence: ['Denial rates up 47% for chronic conditions', 'Private adjudicator contracts suspicious', '847 affected workers identified'],
          vulnerabilities: ['Public accountability mechanisms', 'Ombudsman oversight', 'Election year pressure'],
          actions: ['FOI Blitz (23 requests queued)', 'Ombudsman Complaint', 'Media Exposé Ready', 'Political Pressure Campaign']
        },
        {
          name: 'ODSP - Ontario Disability',
          threat: 'High',
          evidence: ['Adjudicator conflicts of interest', '6 decision-makers with corporate board positions', 'Eligibility tightening detected'],
          vulnerabilities: ['Ethics Commissioner jurisdiction', 'Media attention high', 'Advocacy coalition strong'],
          actions: ['Ethics Investigation', 'Coalition Mobilization', 'Legislative Pressure']
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
          evidence: ['Workplace injury rate 2x industry average', 'Union busting activities documented', 'Worker classification violations'],
          vulnerabilities: ['Brand reputation critical', 'Government contracts pending', 'Holiday shopping season leverage'],
          actions: ['Labour Board Complaints', 'Boycott Campaign', 'Media Investigation', 'Investor Alert']
        },
        {
          name: 'Uber/Lyft',
          threat: 'Critical',
          evidence: ['Worker classification scheme', 'No injury coverage', 'Algorithmic wage theft patterns'],
          vulnerabilities: ['Regulatory pressure mounting', 'Driver organizing accelerating', 'Public opinion shifting'],
          actions: ['Class Action Framework', 'Regulatory Intervention', 'International Coordination']
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
          evidence: ['ODSP cuts during inflation', 'WSIB board appointments suspicious', 'Corporate donor influence clear'],
          vulnerabilities: ['Election 2026', 'Poll numbers weak on healthcare', 'Suburban voter concern'],
          actions: ['Opposition Coordination', 'Voter Education Campaign', 'Donation Tracking Public Release']
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
          evidence: ['Anti-disability program rhetoric', 'Corporate funded think tank', 'Policy influence documented'],
          vulnerabilities: ['Funding sources exposed', 'Academic credibility questioned', 'Public trust low'],
          actions: ['Funding Exposé', 'Counter-Research Publication', 'Media Credibility Campaign']
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
  );
}

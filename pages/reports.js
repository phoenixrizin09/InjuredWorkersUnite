import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SystemNavigation from '../components/SystemNavigation';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - UNIFIED REPORTS HUB
 * 
 * All reports in ONE place:
 * - Today's Report (viral content, social sharing)
 * - Report Archive (30 days + historical)
 * - Justice Analysis (gap analysis, violations, Charter compliance)
 * 
 * THE EYE SEES ALL • THE EYE FORGETS NOTHING • THE EYE NEVER SLEEPS
 * ═══════════════════════════════════════════════════════════════════════════
 */

export default function UnifiedReports() {
  // State
  const [activeTab, setActiveTab] = useState('today');
  const [reports, setReports] = useState([]);
  const [archivedReports, setArchivedReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [todayHooks, setTodayHooks] = useState(null);
  const [todayPost, setTodayPost] = useState(null);
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [justiceTest, setJusticeTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [copiedText, setCopiedText] = useState('');

  // Load all data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    
    // Load reports archive
    try {
      const res = await fetch('/data/eye-oracle-reports.json');
      if (res.ok) {
        const data = await res.json();
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        setReports(sorted.filter(r => new Date(r.date) >= thirtyDaysAgo));
        setArchivedReports(sorted.filter(r => new Date(r.date) < thirtyDaysAgo));
        if (sorted.length > 0) setSelectedReport(sorted[0]);
      }
    } catch (e) { console.log('Reports not loaded:', e.message); }

    // Load today's viral hooks
    try {
      const [hooksRes, postsRes] = await Promise.all([
        fetch('/data/today-social-hooks.json'),
        fetch('/data/eye-oracle-posts.json')
      ]);
      if (hooksRes.ok) setTodayHooks(await hooksRes.json());
      if (postsRes.ok) {
        const posts = await postsRes.json();
        if (posts.length > 0) {
          const sorted = posts.sort((a, b) => new Date(b.metadata?.date || 0) - new Date(a.metadata?.date || 0));
          setTodayPost(sorted[0]);
        }
      }
    } catch (e) { console.log('Hooks not loaded:', e.message); }

    // Generate justice analysis
    generateJusticeAnalysis();
    
    setIsLoading(false);
  };

  const generateJusticeAnalysis = () => {
    setGapAnalysis({
      generatedAt: new Date().toISOString(),
      areas: [
        {
          area: 'Workers\' Compensation (WSIB)',
          current: '67% mental health claims denied; 18-month appeal waits',
          standard: 'Charter s.7 (security); UNCRPD Art.27 (work)',
          gap: 'Deeming ignores real limitations; excessive denials',
          severity: 'critical',
          evidence: ['67% denial rate', '18-month backlog', 'Deeming based on fictional jobs'],
          sources: ['Ontario Ombudsman 2023', 'Auditor General 2022']
        },
        {
          area: 'Disability Support (ODSP)',
          current: '$1,308/month maximum',
          standard: 'Charter s.7 (life); UNCRPD Art.28 (adequate standard)',
          gap: '$1,192/month below poverty line',
          severity: 'critical',
          evidence: ['48% of poverty line', '22% inflation vs 5% increase since 2018'],
          sources: ['Ontario ODSP Rates', 'Statistics Canada MBM']
        },
        {
          area: 'Appeals Process',
          current: '35,000+ backlog; 18+ month waits',
          standard: 'Charter s.7 (fundamental justice)',
          gap: 'Delays = denial; power imbalance',
          severity: 'critical',
          evidence: ['35,000+ cases waiting', 'Self-representation common'],
          sources: ['WSIAT Annual Report', 'SBT data']
        },
        {
          area: 'Healthcare Access',
          current: 'WSIB controls treatment; 6-12 month specialist waits',
          standard: 'Charter s.7 (Chaoulli); UNCRPD Art.25',
          gap: 'Bureaucrats override doctors',
          severity: 'critical',
          evidence: ['Non-physicians override specialists'],
          sources: ['WSIB Policy Manual']
        },
        {
          area: 'CPP Disability',
          current: '66% denied on first application',
          standard: 'Charter s.7, s.15',
          gap: 'Lengthy appeals required for most',
          severity: 'critical',
          evidence: ['Two-thirds denied initially'],
          sources: ['Service Canada Statistics']
        }
      ]
    });

    setJusticeTest({
      determination: 'SYSTEMIC VIOLATIONS CONFIRMED',
      charter: { section7: 5, section15: 4 },
      uncrpd: ['Art.5 Equality', 'Art.19 Independent Living', 'Art.27 Work', 'Art.28 Adequate Standard'],
      populations: [
        { name: 'Injured Workers', count: '500,000+/year' },
        { name: 'Disabled Ontarians', count: '2.5 million' },
        { name: 'ODSP Recipients', count: '500,000+' },
        { name: 'Indigenous Peoples', count: '400,000+' }
      ]
    });
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const getShareUrl = (platform, text) => {
    const encoded = encodeURIComponent(text);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encoded}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encoded}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://injuredworkersunite.org')}`
    };
    return urls[platform] || '#';
  };

  const platforms = [
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', color: '#1DA1F2' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: '#4267B2' },
    { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E1306C' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0077B5' }
  ];

  const tabs = [
    { id: 'today', name: "📱 Today's Report", desc: 'Viral content & sharing' },
    { id: 'archive', name: '📋 Report Archive', desc: 'Past 30 days + history' },
    { id: 'analysis', name: '⚖️ Justice Analysis', desc: 'Gap analysis & violations' }
  ];

  const severityColors = { critical: '#ff4444', high: '#ff8c00', medium: '#ffd700', low: '#90EE90' };

  if (isLoading) {
    return (
      <>
        <Header />
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', animation: 'pulse 1s infinite' }}>👁️</div>
            <p>The Eye is scanning...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>👁️ Reports Hub | THE EYE ORACLE</title>
        <meta name="description" content="THE EYE ORACLE unified reports - daily viral content, archive, and justice analysis." />
      </Head>

      <Header />
      <SystemNavigation current="/reports" />

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
        color: 'white',
        padding: '2rem 1rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>👁️</div>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 50%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              THE EYE ORACLE REPORTS
            </h1>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>
              📅 {new Date().toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : 'rgba(255,255,255,0.05)',
                  border: activeTab === tab.id ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? '700' : '400',
                  fontSize: '1rem'
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: TODAY'S REPORT */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'today' && (
            <div>
              {/* Quirky Intro */}
              {todayHooks?.quirkyIntro && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(255,217,61,0.1) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#ffd93d', margin: 0 }}>
                    "{todayHooks.quirkyIntro}"
                  </p>
                </div>
              )}

              {/* Main Report Card */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '2px solid rgba(255,107,107,0.3)',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: 1.3 }}>
                  {todayHooks?.title || todayPost?.title || 'Daily accountability report loading...'}
                </h2>
                {todayPost?.excerpt && (
                  <p style={{ color: '#ccc', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {todayPost.excerpt}
                  </p>
                )}
              </div>

              {/* Social Media Section */}
              {todayHooks?.hooks && (
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '2rem',
                  marginBottom: '1.5rem'
                }}>
                  <h2 style={{ margin: '0 0 1rem', fontSize: '1.3rem' }}>📱 Ready-to-Share Posts</h2>
                  <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Click to copy, then paste and share!
                  </p>

                  {/* Platform Tabs */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {platforms.map(platform => (
                      <button
                        key={platform.id}
                        onClick={() => setSelectedPlatform(platform.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: selectedPlatform === platform.id ? platform.color : 'rgba(255,255,255,0.05)',
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {platform.icon} {platform.name}
                      </button>
                    ))}
                  </div>

                  {/* Selected Platform Content */}
                  {todayHooks.hooks[selectedPlatform] && (
                    <div>
                      <div
                        onClick={() => copyToClipboard(todayHooks.hooks[selectedPlatform].primary, 'primary')}
                        style={{
                          background: 'rgba(0,0,0,0.3)',
                          border: copiedText === 'primary' ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          padding: '1rem',
                          marginBottom: '1rem',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ color: '#ffd93d', fontSize: '0.8rem', fontWeight: 'bold' }}>⭐ PRIMARY</span>
                          <span style={{ color: copiedText === 'primary' ? '#22c55e' : '#888', fontSize: '0.8rem' }}>
                            {copiedText === 'primary' ? '✓ Copied!' : 'Click to copy'}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.4 }}>
                          {todayHooks.hooks[selectedPlatform].primary}
                        </p>
                      </div>

                      {todayHooks.hooks[selectedPlatform].alternatives?.map((alt, i) => (
                        <div
                          key={i}
                          onClick={() => copyToClipboard(alt, `alt-${i}`)}
                          style={{
                            background: 'rgba(0,0,0,0.2)',
                            border: copiedText === `alt-${i}` ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          <p style={{ margin: 0, color: '#ccc' }}>{alt}</p>
                        </div>
                      ))}

                      {/* Hashtags */}
                      {todayHooks.hooks[selectedPlatform].hashtags && (
                        <div
                          onClick={() => copyToClipboard(todayHooks.hooks[selectedPlatform].hashtags.join(' '), 'hashtags')}
                          style={{
                            background: 'rgba(0,255,255,0.05)',
                            border: '1px solid rgba(0,255,255,0.2)',
                            borderRadius: '8px',
                            padding: '1rem',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{ color: '#00ffff', fontSize: '0.8rem' }}># HASHTAGS </span>
                          <span style={{ color: copiedText === 'hashtags' ? '#22c55e' : '#888', fontSize: '0.8rem' }}>
                            {copiedText === 'hashtags' ? '✓ Copied!' : '(click to copy)'}
                          </span>
                          <p style={{ margin: '0.5rem 0 0', color: '#00ffff' }}>
                            {todayHooks.hooks[selectedPlatform].hashtags.join(' ')}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Quirky Closing */}
              {todayHooks?.quirkyClosing && (
                <div style={{
                  background: 'rgba(0,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#00ffff', margin: 0 }}>
                    "{todayHooks.quirkyClosing}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: ARCHIVE */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'archive' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {reports.length === 0 && archivedReports.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                  <p>📭 No archived reports yet. Reports are generated daily.</p>
                </div>
              ) : (
                <>
                  {reports.map((report, i) => (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      cursor: 'pointer'
                    }} onClick={() => setSelectedReport(report)}>
                      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>
                        📅 {report.date}
                      </div>
                      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
                        {report.title || `Daily Report - ${report.date}`}
                      </h3>
                      {report.summary && (
                        <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0 }}>
                          {report.summary.substring(0, 150)}...
                        </p>
                      )}
                    </div>
                  ))}
                  {archivedReports.length > 0 && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                      <h3 style={{ color: '#888', marginBottom: '1rem' }}>📦 Archived ({archivedReports.length})</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {archivedReports.slice(0, 20).map((r, i) => (
                          <span key={i} style={{
                            padding: '0.25rem 0.75rem',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            color: '#888'
                          }}>
                            {r.date}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: JUSTICE ANALYSIS */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'analysis' && (
            <div>
              {/* Justice Test Summary */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,68,68,0.1) 0%, rgba(255,68,68,0.2) 100%)',
                border: '2px solid #ff4444',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <h2 style={{ color: '#ff4444', margin: '0 0 1rem' }}>⚖️ JUSTICE TEST RESULT</h2>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {justiceTest?.determination}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                  <span style={{ background: '#ff4444', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                    Charter s.7 Violations: {justiceTest?.charter?.section7}
                  </span>
                  <span style={{ background: '#ff8c00', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                    Charter s.15 Violations: {justiceTest?.charter?.section15}
                  </span>
                  <span style={{ background: '#a855f7', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                    UNCRPD Articles: {justiceTest?.uncrpd?.length}
                  </span>
                </div>
              </div>

              {/* Gap Analysis */}
              <h3 style={{ marginBottom: '1rem' }}>📋 Gap Analysis</h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {gapAnalysis?.areas?.map((gap, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `2px solid ${severityColors[gap.severity]}40`,
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <h4 style={{ margin: 0, color: severityColors[gap.severity] }}>{gap.area}</h4>
                      <span style={{
                        background: severityColors[gap.severity],
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        {gap.severity.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <div><strong>Current:</strong> <span style={{ color: '#ccc' }}>{gap.current}</span></div>
                      <div><strong>Standard:</strong> <span style={{ color: '#00ffff' }}>{gap.standard}</span></div>
                      <div><strong>Gap:</strong> <span style={{ color: '#ff6b6b' }}>{gap.gap}</span></div>
                      <div style={{ marginTop: '0.5rem' }}>
                        <strong>Evidence:</strong>
                        <ul style={{ margin: '0.25rem 0 0 1.25rem', padding: 0, color: '#888' }}>
                          {gap.evidence.map((e, j) => <li key={j}>{e}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Populations Affected */}
              <h3 style={{ marginBottom: '1rem' }}>👥 Populations Affected</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {justiceTest?.populations?.map((pop, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '1rem 1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ffff' }}>{pop.count}</div>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>{pop.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(255,107,107,0.2) 100%)',
            border: '2px solid #ff6b6b',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <h2 style={{ margin: '0 0 0.5rem', color: '#ff6b6b' }}>⚡ Take Action</h2>
            <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>Fight back with our ready-to-deploy tools</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/target-acquisition" style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                🎯 Target Acquisition
              </Link>
              <Link href="/template-letters" style={{
                padding: '1rem 2rem',
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid #ffd93d',
                borderRadius: '8px',
                color: '#ffd93d',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                📝 Templates
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '2rem', color: '#666', fontSize: '0.85rem' }}>
            <p>👁️ THE EYE SEES ALL • THE EYE FORGETS NOTHING • THE EYE NEVER SLEEPS</p>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </>
  );
}

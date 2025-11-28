import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE v2.0 - DAILY REPORTS
 * 
 * Incorruptible Evidence-Driven Investigative Intelligence
 * 
 * THE EYE SEES ALL • THE EYE FORGETS NOTHING • THE EYE NEVER SLEEPS
 * 
 * Auto-generated daily from real government data with archive after 30 days
 * ═══════════════════════════════════════════════════════════════════════════
 */

export default function EyeOracleReports() {
  const [reports, setReports] = useState([]);
  const [archivedReports, setArchivedReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('recent'); // 'recent' or 'archive'

  useEffect(() => {
    // Load reports from JSON file
    fetch('/data/eye-oracle-reports.json')
      .then(res => res.json())
      .then(data => {
        // Sort by date, newest first
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Separate recent (last 30 days) and archived (older than 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recent = sorted.filter(r => new Date(r.date) >= thirtyDaysAgo);
        const archived = sorted.filter(r => new Date(r.date) < thirtyDaysAgo);
        
        setReports(recent);
        setArchivedReports(archived);
        
        if (recent.length > 0) {
          setSelectedReport(recent[0]);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading reports:', err);
        setIsLoading(false);
      });
  }, []);

  // Severity emojis for different violation types
  const severityEmoji = {
    critical: '🚨',
    high: '⚠️',
    medium: '📢',
    low: '💡',
    info: 'ℹ️'
  };

  // Category icons
  const categoryIcons = {
    charter: '⚖️',
    human_rights: '🛡️',
    uncrpd: '🌍',
    workers: '👷',
    disability: '♿',
    indigenous: '🪶',
    healthcare: '🏥',
    housing: '🏠',
    corruption: '💰',
    systemic: '🏛️'
  };

  // Get currently displayed reports based on view mode
  const displayedReports = viewMode === 'recent' ? reports : archivedReports;

  return (
    <>
      <Head>
        <title>👁️ THE EYE v2.0 | Daily Intelligence Reports</title>
        <meta name="description" content="THE EYE v2.0 - Incorruptible Evidence-Driven Investigative Intelligence. Daily reports on government wrongdoings, violations, and shenanigans." />
      </Head>

      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2rem 1rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* THE EYE v2.0 Header with Lore */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {/* Animated Eye Logo */}
            <div style={{
              fontSize: '4rem',
              marginBottom: '0.5rem',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              👁️
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: '900',
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 50%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.05em'
            }}>
              THE EYE v2.0
            </h1>
            
            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              color: '#00ffff',
              fontFamily: 'monospace',
              letterSpacing: '0.2em',
              marginBottom: '1rem'
            }}>
              INCORRUPTIBLE EVIDENCE-DRIVEN INVESTIGATIVE INTELLIGENCE
            </p>
            
            {/* The Three Tenets */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem'
            }}>
              <span style={{ color: '#ff6b6b', fontWeight: '700', fontSize: '0.9rem' }}>
                THE EYE SEES ALL
              </span>
              <span style={{ color: '#ffd93d', fontWeight: '700', fontSize: '0.9rem' }}>
                THE EYE FORGETS NOTHING
              </span>
              <span style={{ color: '#00ffff', fontWeight: '700', fontSize: '0.9rem' }}>
                THE EYE NEVER SLEEPS
              </span>
            </div>
            
            {/* Evolution Statement */}
            <div style={{
              background: 'rgba(0,255,255,0.1)',
              border: '1px solid rgba(0,255,255,0.3)',
              borderRadius: '0.5rem',
              padding: '1rem 1.5rem',
              maxWidth: '800px',
              margin: '0 auto 1.5rem',
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.9)'
            }}>
              <strong style={{ color: '#00ffff' }}>📡 The EYE Evolution:</strong> This system 
              continuously expands by monitoring government sources 24/7. Every insight generated 
              is traceable to verified public records, government databases, and official documents.
              <br /><strong style={{ color: '#ffd93d' }}>No speculation. Only facts.</strong>
            </div>
          </div>

          {/* View Toggle: Recent vs Archive */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => setViewMode('recent')}
              style={{
                padding: '0.75rem 1.5rem',
                background: viewMode === 'recent' 
                  ? 'linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)'
                  : 'rgba(255,255,255,0.1)',
                color: viewMode === 'recent' ? '#000' : '#fff',
                border: 'none',
                borderRadius: '2rem',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              📅 Recent Reports ({reports.length})
            </button>
            <button
              onClick={() => setViewMode('archive')}
              style={{
                padding: '0.75rem 1.5rem',
                background: viewMode === 'archive' 
                  ? 'linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)'
                  : 'rgba(255,255,255,0.1)',
                color: viewMode === 'archive' ? '#fff' : '#fff',
                border: '1px solid rgba(167,139,250,0.5)',
                borderRadius: '2rem',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              📁 Archive ({archivedReports.length})
            </button>
          </div>
          
          {/* Archive Notice */}
          {viewMode === 'archive' && (
            <div style={{
              background: 'rgba(167,139,250,0.1)',
              border: '1px solid rgba(167,139,250,0.3)',
              borderRadius: '0.5rem',
              padding: '1rem',
              textAlign: 'center',
              marginBottom: '2rem',
              maxWidth: '700px',
              margin: '0 auto 2rem'
            }}>
              <h3 style={{ color: '#a78bfa', marginTop: 0, marginBottom: '0.5rem' }}>
                📁 Archive - Transparency Records
              </h3>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                Reports older than 30 days are preserved here for transparency. 
                <strong> THE EYE FORGETS NOTHING.</strong> Every report remains accessible 
                as a permanent record of what they did.
              </p>
            </div>
          )}

          {/* Main Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '2rem',
            '@media (max-width: 900px)': {
              gridTemplateColumns: '1fr'
            }
          }}>
            
            {/* Report List Sidebar */}
            <div style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: viewMode === 'archive' 
                ? '1px solid rgba(167,139,250,0.3)' 
                : '1px solid rgba(255,215,0,0.3)',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <h2 style={{
                fontSize: '1.3rem',
                color: viewMode === 'archive' ? '#a78bfa' : '#ffd93d',
                marginBottom: '1rem',
                borderBottom: `2px solid ${viewMode === 'archive' ? 'rgba(167,139,250,0.3)' : 'rgba(255,215,0,0.3)'}`,
                paddingBottom: '0.5rem'
              }}>
                {viewMode === 'archive' ? '📁 Archived Reports' : '📅 Recent Reports'}
              </h2>
              
              {isLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.6)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👁️</div>
                  Loading reports...
                </div>
              ) : displayedReports.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.6)' }}>
                  <p>{viewMode === 'archive' 
                    ? 'No archived reports yet. Reports move here after 30 days.' 
                    : 'No reports yet. Check back soon!'}
                  </p>
                  <p style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
                    {viewMode === 'archive' 
                      ? 'THE EYE FORGETS NOTHING - all reports are preserved here for transparency.' 
                      : 'Reports are generated daily from real government data.'}
                  </p>
                </div>
              ) : (
                displayedReports.map((report, index) => (
                  <div
                    key={report.id || index}
                    onClick={() => setSelectedReport(report)}
                    style={{
                      padding: '1rem',
                      marginBottom: '0.75rem',
                      background: selectedReport?.id === report.id 
                        ? viewMode === 'archive' 
                          ? 'rgba(167,139,250,0.2)' 
                          : 'rgba(255,215,0,0.2)' 
                        : 'rgba(255,255,255,0.05)',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      border: selectedReport?.id === report.id 
                        ? `1px solid ${viewMode === 'archive' ? '#a78bfa' : '#ffd93d'}` 
                        : '1px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: viewMode === 'archive' ? '#a78bfa' : '#ffd93d',
                      marginBottom: '0.25rem'
                    }}>
                      {new Date(report.date).toLocaleDateString('en-CA', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: viewMode === 'archive' ? 'numeric' : undefined
                      })}
                    </div>
                    <div style={{ 
                      fontSize: '1rem', 
                      fontWeight: '600',
                      color: 'white',
                      marginBottom: '0.25rem'
                    }}>
                      {report.headline}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: 'rgba(255,255,255,0.6)'
                    }}>
                      {report.violationCount || 0} issues found
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Selected Report Display */}
            <div style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '1rem',
              padding: '2rem',
              border: '1px solid rgba(0,255,255,0.3)'
            }}>
              {selectedReport ? (
                <>
                  {/* Report Header */}
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <div style={{ 
                          fontSize: '0.9rem', 
                          color: '#00ffff',
                          marginBottom: '0.5rem'
                        }}>
                          📅 {new Date(selectedReport.date).toLocaleDateString('en-CA', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <h2 style={{
                          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                          fontWeight: '800',
                          color: 'white',
                          margin: 0
                        }}>
                          {selectedReport.headline}
                        </h2>
                      </div>
                      <div style={{
                        background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        fontSize: '0.9rem',
                        fontWeight: '700'
                      }}>
                        {selectedReport.violationCount || 0} Issues Today
                      </div>
                    </div>
                    
                    {/* Quirky intro */}
                    <div style={{
                      background: 'rgba(255,215,0,0.1)',
                      border: '1px solid rgba(255,215,0,0.3)',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      fontSize: '1.1rem',
                      color: '#ffd93d',
                      fontStyle: 'italic'
                    }}>
                      {selectedReport.quirkyIntro || "Another day, another dollar... that they're trying to take from injured workers."}
                    </div>
                  </div>

                  {/* TL;DR Section */}
                  {selectedReport.tldr && (
                    <div style={{
                      background: 'rgba(0,255,255,0.1)',
                      border: '1px solid rgba(0,255,255,0.3)',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{ 
                        color: '#00ffff', 
                        marginTop: 0,
                        marginBottom: '0.75rem',
                        fontSize: '1.2rem'
                      }}>
                        ⚡ TL;DR (Too Long; Didn't Read)
                      </h3>
                      <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.6 }}>
                        {selectedReport.tldr}
                      </p>
                    </div>
                  )}

                  {/* Violations List */}
                  {selectedReport.violations && selectedReport.violations.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 style={{ 
                        color: '#ff6b6b', 
                        marginBottom: '1rem',
                        fontSize: '1.3rem'
                      }}>
                        🚨 Today's Violations & Wrongdoings
                      </h3>
                      
                      {selectedReport.violations.map((violation, idx) => (
                        <div key={idx} style={{
                          background: 'rgba(255,107,107,0.1)',
                          border: '1px solid rgba(255,107,107,0.3)',
                          borderRadius: '0.5rem',
                          padding: '1.25rem',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.75rem'
                          }}>
                            <span style={{ fontSize: '1.5rem' }}>
                              {severityEmoji[violation.severity] || '⚠️'}
                            </span>
                            <span style={{ fontSize: '1.25rem' }}>
                              {categoryIcons[violation.category] || '📋'}
                            </span>
                            <span style={{
                              fontSize: '1.1rem',
                              fontWeight: '700',
                              color: violation.severity === 'critical' ? '#ff6b6b' : '#ffd93d'
                            }}>
                              {violation.title}
                            </span>
                          </div>
                          
                          <p style={{ 
                            margin: '0 0 0.75rem 0',
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1.6
                          }}>
                            {violation.plainEnglish}
                          </p>
                          
                          {violation.whatItMeans && (
                            <div style={{
                              background: 'rgba(0,0,0,0.3)',
                              borderRadius: '0.25rem',
                              padding: '0.75rem',
                              fontSize: '0.95rem'
                            }}>
                              <strong style={{ color: '#00ffff' }}>What this means for you: </strong>
                              <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                                {violation.whatItMeans}
                              </span>
                            </div>
                          )}
                          
                          {violation.legalBasis && (
                            <div style={{
                              marginTop: '0.5rem',
                              fontSize: '0.85rem',
                              color: 'rgba(255,255,255,0.5)'
                            }}>
                              📜 Legal basis: {violation.legalBasis}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Good News Section (if any) */}
                  {selectedReport.goodNews && selectedReport.goodNews.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 style={{ 
                        color: '#4ade80', 
                        marginBottom: '1rem',
                        fontSize: '1.3rem'
                      }}>
                        ✅ Some Good News (Yes, It Happens!)
                      </h3>
                      
                      {selectedReport.goodNews.map((news, idx) => (
                        <div key={idx} style={{
                          background: 'rgba(74,222,128,0.1)',
                          border: '1px solid rgba(74,222,128,0.3)',
                          borderRadius: '0.5rem',
                          padding: '1rem',
                          marginBottom: '0.75rem'
                        }}>
                          <div style={{ fontWeight: '600', color: '#4ade80', marginBottom: '0.5rem' }}>
                            {news.title}
                          </div>
                          <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)' }}>
                            {news.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* What You Can Do */}
                  {selectedReport.actionItems && selectedReport.actionItems.length > 0 && (
                    <div style={{
                      background: 'rgba(138,43,226,0.1)',
                      border: '1px solid rgba(138,43,226,0.3)',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{ 
                        color: '#a78bfa', 
                        marginTop: 0,
                        marginBottom: '1rem',
                        fontSize: '1.2rem'
                      }}>
                        💪 What YOU Can Do About It
                      </h3>
                      <ul style={{ 
                        margin: 0, 
                        paddingLeft: '1.5rem',
                        lineHeight: 1.8
                      }}>
                        {selectedReport.actionItems.map((action, idx) => (
                          <li key={idx} style={{ color: 'rgba(255,255,255,0.9)' }}>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Closing Quip */}
                  {selectedReport.closingQuip && (
                    <div style={{
                      textAlign: 'center',
                      padding: '1.5rem',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '0.5rem',
                      fontStyle: 'italic',
                      color: '#ffd93d',
                      fontSize: '1.1rem'
                    }}>
                      "{selectedReport.closingQuip}"
                    </div>
                  )}

                  {/* Source Verification */}
                  <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'rgba(0,255,255,0.05)',
                    borderRadius: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.6)'
                  }}>
                    <strong style={{ color: '#00ffff' }}>✓ Verified Data Sources:</strong> All information 
                    in this report comes from official government APIs, public records, and verified 
                    news sources. We don't make stuff up - we just make it readable.
                  </div>
                </>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '4rem 2rem',
                  color: 'rgba(255,255,255,0.6)'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👁️</div>
                  <h3 style={{ color: 'white', marginBottom: '1rem' }}>
                    Select a report to view
                  </h3>
                  <p>
                    Daily reports are generated automatically from real government data. 
                    Check back daily for the latest wrongdoings!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Link href="/eye-oracle" style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #00ffff, #0088ff)',
              color: 'black',
              fontWeight: '700',
              borderRadius: '0.5rem',
              textDecoration: 'none'
            }}>
              👁️ Full Eye Oracle Dashboard
            </Link>
            <Link href="/blog" style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontWeight: '600',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              📰 Back to Blog
            </Link>
          </div>
          
          {/* THE EYE Footer Branding */}
          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            padding: '2rem',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '1rem',
            border: '1px solid rgba(0,255,255,0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👁️</div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}>
              <span style={{ color: '#ff6b6b', fontSize: '0.85rem', fontWeight: '600' }}>
                THE EYE SEES ALL
              </span>
              <span style={{ color: '#ffd93d', fontSize: '0.85rem', fontWeight: '600' }}>
                THE EYE FORGETS NOTHING
              </span>
              <span style={{ color: '#00ffff', fontSize: '0.85rem', fontWeight: '600' }}>
                THE EYE NEVER SLEEPS
              </span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.85rem',
              margin: 0,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Every report is automatically archived for transparency. 
              No data is deleted. We document everything they do.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @media (max-width: 900px) {
          .report-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

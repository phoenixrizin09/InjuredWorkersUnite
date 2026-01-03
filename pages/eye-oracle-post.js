import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Eye Oracle Post Detail Page
 * Shows full analysis with evidence receipts
 */

export default function EyeOraclePost() {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get from localStorage first
    const stored = localStorage.getItem('selectedOraclePost');
    if (stored) {
      try {
        const postData = JSON.parse(stored);
        setPost(postData);
        setLoading(false);
        localStorage.removeItem('selectedOraclePost');
        return;
      } catch (e) {
        console.error('Error parsing stored post:', e);
      }
    }

    // Otherwise load all posts and get by ID
    fetch('/data/eye-oracle-posts.json')
      .then(res => res.json())
      .then(data => {
        const posts = Array.isArray(data) ? data : [];
        const id = router.query.id ? parseInt(router.query.id) : 0;
        if (posts[id]) {
          setPost(posts[id]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading post:', err);
        setLoading(false);
      });
  }, [router.query.id]);

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: '#00ffff' }}>
          <p>🔍 Loading report...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: '#aaa' }}>
          <div style={{ textAlign: 'center' }}>
            <p>📭 Report not found</p>
            <Link href="/eye-oracle-reports" style={{ color: '#00ffff' }}>← Back to reports</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - The Eye Oracle</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <Header />

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2rem 1rem'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Back Link */}
          <Link href="/eye-oracle-reports" style={{
            color: '#00ffff',
            textDecoration: 'none',
            marginBottom: '2rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ← Back to reports
          </Link>

          {/* Header */}
          <div style={{
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '2rem' }}>{post.emoji || '👁️'}</span>
              <div>
                <h1 style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  fontWeight: 'bold',
                  margin: 0,
                  color: '#fff'
                }}>
                  {post.title}
                </h1>
              </div>
            </div>

            {/* Metadata Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.9rem',
              color: '#aaa',
              marginBottom: '1.5rem'
            }}>
              <span>📅 {new Date(post.metadata?.date || post.date).toLocaleDateString()}</span>
              {post.metadata?.severity && (
                <span style={{ color: '#ff6b6b' }}>
                  ⚠️ {post.metadata.severity.toUpperCase()}
                </span>
              )}
              {post.metadata?.riskScore !== undefined && (
                <span style={{ color: '#ffd93d' }}>
                  🎯 Risk: {post.metadata.riskScore}/100
                </span>
              )}
              {post.verificationBadge && (
                <span style={{ color: '#00ff00' }}>
                  {post.verificationBadge}
                </span>
              )}
            </div>

            {/* Excerpt */}
            <div style={{
              background: 'rgba(0, 255, 255, 0.1)',
              border: '2px solid #00ffff',
              borderRadius: '8px',
              padding: '1.5rem',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#ccc'
            }}>
              {post.excerpt}
            </div>
          </div>

          {/* Main Content Sections */}
          {post.content && (
            <div style={{
              display: 'grid',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* Overview */}
              {post.content.overview && (
                <ContentSection
                  emoji="🎯"
                  title={post.content.overview.title}
                  body={post.content.overview.body}
                />
              )}

              {/* Corruption */}
              {post.content.corruption && (
                <ContentSection
                  emoji="🔍"
                  title={post.content.corruption.title}
                  body={post.content.corruption.body}
                  color="#ff6b6b"
                />
              )}

              {/* Constitutional */}
              {post.content.constitutional && (
                <ContentSection
                  emoji="📜"
                  title={post.content.constitutional.title}
                  body={post.content.constitutional.body}
                  color="#ffd93d"
                />
              )}

              {/* Impact */}
              {post.content.impact && (
                <ContentSection
                  emoji="👥"
                  title={post.content.impact.title}
                  body={post.content.impact.body}
                />
              )}

              {/* Target */}
              {post.content.target && (
                <ContentSection
                  emoji="🎯"
                  title={post.content.target.title}
                  body={post.content.target.body}
                  color="#ff6b6b"
                />
              )}

              {/* Action */}
              {post.content.action && (
                <ContentSection
                  emoji="⚡"
                  title={post.content.action.title}
                  body={post.content.action.body}
                  color="#00ff00"
                />
              )}

              {/* Evidence Receipts */}
              {post.content.evidenceReceipts && (
                <ContentSection
                  emoji="🧾"
                  title={post.content.evidenceReceipts.title}
                  body={post.content.evidenceReceipts.body}
                  color="#00ffff"
                />
              )}

              {/* Verification */}
              {post.content.verification && (
                <ContentSection
                  emoji="✅"
                  title={post.content.verification.title}
                  body={post.content.verification.body}
                  color="#00ff00"
                />
              )}
            </div>
          )}

          {/* Viral Hooks */}
          {post.viralHooks && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 107, 107, 0.1) 100%)',
              border: '2px solid #00ffff',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#ffd93d' }}>
                📱 Share On Social Media
              </h2>
              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                {Object.entries(post.viralHooks).map(([platform, content]) => (
                  <div key={platform} style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    padding: '1rem',
                    textTransform: 'capitalize'
                  }}>
                    <h4 style={{ marginTop: 0, color: '#00ffff' }}>🐦 {platform}</h4>
                    <p style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      padding: '1rem',
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      lineHeight: '1.5'
                    }}>
                      {content.primary || content.selectedHeadline || 'Click to view'}
                    </p>
                    {content.hashtags && (
                      <p style={{ color: '#aaa', fontSize: '0.85rem' }}>
                        {Array.isArray(content.hashtags) ? content.hashtags.join(' ') : content.hashtags}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          {post.cta && (
            <div style={{
              background: 'linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)',
              color: '#000',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>⚡ What You Can Do Right Now</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Share this report. Contact your representative. Demand change.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                {post.cta.primary && (
                  <a href={post.cta.primary.link} style={{
                    padding: '0.75rem 1.5rem',
                    background: '#000',
                    color: '#ffd93d',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                  }}>
                    {post.cta.primary.text}
                  </a>
                )}
                {post.cta.secondary && (
                  <a href={post.cta.secondary.link} style={{
                    padding: '0.75rem 1.5rem',
                    background: '#000',
                    color: '#ffd93d',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                  }}>
                    {post.cta.secondary.text}
                  </a>
                )}
                {post.cta.tertiary && (
                  <a href={post.cta.tertiary.link} style={{
                    padding: '0.75rem 1.5rem',
                    background: '#000',
                    color: '#ffd93d',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                  }}>
                    {post.cta.tertiary.text}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

/**
 * Reusable content section component
 */
function ContentSection({ emoji, title, body, color = '#00ffff' }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f0f1e 0%, #16213e 100%)',
      border: `2px solid ${color}`,
      borderRadius: '12px',
      padding: '1.5rem'
    }}>
      <h2 style={{
        marginTop: 0,
        marginBottom: '1rem',
        color: color,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {emoji} {title}
      </h2>
      <div style={{
        color: '#ccc',
        lineHeight: '1.8',
        fontSize: '0.95rem',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
      }}>
        {/* Simple markdown-like rendering */}
        {body && body.split('\n').map((line, idx) => {
          if (line.startsWith('# ')) {
            return <h1 key={idx} style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>{line.slice(2)}</h1>;
          }
          if (line.startsWith('## ')) {
            return <h2 key={idx} style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#fff' }}>{line.slice(3)}</h2>;
          }
          if (line.startsWith('### ')) {
            return <h3 key={idx} style={{ marginTop: '0.75rem', marginBottom: '0.25rem', color: '#ccc' }}>{line.slice(4)}</h3>;
          }
          if (line.startsWith('- ') || line.startsWith('• ')) {
            return <li key={idx} style={{ marginLeft: '2rem', marginBottom: '0.25rem' }}>{line.slice(2)}</li>;
          }
          if (line.startsWith('| ')) {
            return <code key={idx} style={{ background: 'rgba(0,0,0,0.3)', padding: '0.25rem', display: 'block', marginBottom: '0.5rem' }}>{line}</code>;
          }
          if (line.startsWith('> ')) {
            return <blockquote key={idx} style={{ borderLeft: '4px solid #00ffff', paddingLeft: '1rem', marginLeft: 0, marginBottom: '0.5rem', color: '#aaa' }}>{line.slice(2)}</blockquote>;
          }
          if (line.trim() === '') {
            return <div key={idx} style={{ marginBottom: '0.5rem' }}></div>;
          }
          return <p key={idx} style={{ marginBottom: '0.5rem' }}>{line}</p>;
        })}
      </div>
    </div>
  );
}

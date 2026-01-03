import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Eye Oracle Daily Reports Page
 * Displays all generated Eye Oracle posts with full evidence receipts
 */

export default function EyeOracleReports() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load Eye Oracle posts from JSON file
    fetch('/data/eye-oracle-posts.json')
      .then(res => res.json())
      .then(data => {
        // Ensure it's an array, sort by date descending
        const postsArray = Array.isArray(data) ? data : [];
        const sorted = postsArray.sort((a, b) => {
          const dateA = new Date(b.metadata?.date || b.date || 0);
          const dateB = new Date(a.metadata?.date || a.date || 0);
          return dateA - dateB;
        });
        setPosts(sorted);
        setFilteredPosts(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Eye Oracle posts:', err);
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(posts.map(p => p.metadata?.category || p.category || 'Other'))];

  // Filter posts by category and search
  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => (p.metadata?.category || p.category) === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        (p.title || '').toLowerCase().includes(query) ||
        (p.excerpt || '').toLowerCase().includes(query) ||
        (p.metadata?.source || '').toLowerCase().includes(query)
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery, posts]);

  return (
    <>
      <Head>
        <title>Eye Oracle Reports - Daily Corruption Investigations</title>
        <meta name="description" content="Daily reports on real government corruption, analyzed by The Eye v2.0" />
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
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: '900',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              👁️ The Eye Oracle - Daily Reports
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#00ffff',
              maxWidth: '700px',
              margin: '0 auto 1rem'
            }}>
              Automated investigative journalism powered by The Eye v2.0
            </p>
            <p style={{
              fontSize: '0.95rem',
              color: '#aaa',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Every report analyzed with government data. Every claim verified. Every link provided so you can check it yourself.
            </p>
          </div>

          {/* Search and Filter */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {/* Search Bar */}
            <input
              type="text"
              placeholder="🔍 Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                border: '2px solid #00ffff',
                borderRadius: '8px',
                background: '#0f0f1e',
                color: '#fff',
                width: '100%',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff6b6b'}
              onBlur={(e) => e.target.style.borderColor = '#00ffff'}
            />

            {/* Category Filter */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: selectedCategory === cat ? '2px solid #ff6b6b' : '2px solid #00ffff',
                    background: selectedCategory === cat ? 'rgba(255, 107, 107, 0.2)' : 'transparent',
                    color: selectedCategory === cat ? '#ff6b6b' : '#00ffff',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                    transition: 'all 0.3s',
                    textTransform: 'capitalize'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#00ffff'
            }}>
              <p>🔍 Loading reports...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && filteredPosts.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#aaa'
            }}>
              <p>📭 No reports found matching your search.</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    background: '#00ffff',
                    color: '#000',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Posts Grid */}
          {!loading && filteredPosts.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {filteredPosts.map((post, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, #0f0f1e 0%, #16213e 100%)',
                    border: '2px solid #00ffff',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ff6b6b';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#00ffff';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Category Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontSize: '1.5rem'
                    }}>
                      {post.emoji || '👁️'}
                    </span>
                    <span style={{
                      fontSize: '0.85rem',
                      background: 'rgba(0, 255, 255, 0.2)',
                      color: '#00ffff',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {post.metadata?.category || post.category || 'Report'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    lineHeight: '1.4',
                    color: '#fff'
                  }}>
                    {post.title}
                  </h3>

                  {/* Date */}
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#aaa',
                    marginBottom: '1rem'
                  }}>
                    📅 {new Date(post.metadata?.date || post.date).toLocaleDateString()}
                  </p>

                  {/* Excerpt */}
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#ccc',
                    marginBottom: '1rem',
                    lineHeight: '1.5',
                    flex: 1
                  }}>
                    {post.excerpt}
                  </p>

                  {/* Metadata */}
                  {post.metadata && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                      fontSize: '0.85rem',
                      color: '#aaa'
                    }}>
                      {post.metadata.severity && (
                        <div>
                          <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                            {post.metadata.severity.toUpperCase()}
                          </span>
                          <span> Severity</span>
                        </div>
                      )}
                      {post.metadata.riskScore !== undefined && (
                        <div>
                          <span style={{ color: '#ffd93d', fontWeight: 'bold' }}>
                            {post.metadata.riskScore}/100
                          </span>
                          <span> Risk Score</span>
                        </div>
                      )}
                      {post.metadata.affectedCount && (
                        <div>
                          <span style={{ color: '#00ffff', fontWeight: 'bold' }}>
                            {post.metadata.affectedCount}
                          </span>
                          <span> Affected</span>
                        </div>
                      )}
                      {post.metadata.charterViolations && post.metadata.charterViolations.length > 0 && (
                        <div>
                          <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                            {post.metadata.charterViolations.length}
                          </span>
                          <span> Charter Violations</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Source */}
                  {post.metadata?.source && (
                    <p style={{
                      fontSize: '0.8rem',
                      color: '#666',
                      marginBottom: '1rem',
                      fontStyle: 'italic',
                      borderTop: '1px solid #333',
                      paddingTop: '0.75rem'
                    }}>
                      📋 Source: {post.metadata.source}
                    </p>
                  )}

                  {/* Read More Link */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: 'auto',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <button
                      onClick={() => {
                        // Store the post for detailed view
                        localStorage.setItem('selectedOraclePost', JSON.stringify(post));
                        // Navigate to detail page
                        window.location.href = `/eye-oracle-post?id=${idx}`;
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        background: 'linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }}
                    >
                      Read Full Report →
                    </button>
                    {post.metadata?.sourceUrl && (
                      <a
                        href={post.metadata.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View original source"
                        style={{
                          padding: '0.75rem 1rem',
                          background: 'rgba(0, 255, 255, 0.1)',
                          color: '#00ffff',
                          border: '2px solid #00ffff',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          textDecoration: 'none'
                        }}
                      >
                        🔗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Footer */}
          {!loading && (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              borderTop: '2px solid #333',
              marginTop: '2rem',
              color: '#aaa'
            }}>
              <p>
                Showing {filteredPosts.length} of {posts.length} reports
                {searchQuery && ` (filtered: "${searchQuery}")`}
              </p>
              <p style={{
                fontSize: '0.9rem',
                marginTop: '1rem',
                color: '#666'
              }}>
                ✅ All reports based on verified government sources.
                👁️ The Eye sees all. The Eye forgets nothing.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

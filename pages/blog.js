import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Load blog posts from JSON file
    fetch('/data/blog-posts.json')
      .then(res => res.json())
      .then(data => {
        // Sort by date, newest first
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sorted);
      })
      .catch(err => console.error('Error loading blog posts:', err));
  }, []);

  const categories = [
    'all',
    'Eye Oracle Reports',
    'The EYE',
    'Monitoring',
    'Memetic Embassy',
    'Target Acquisition',
    'Alerts',
    'Legislative Tracking',
    'Meme Gallery',
    'Legal Framework'
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <>
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
              background: 'linear-gradient(135deg, #00ffff 0%, #ff6b6b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              📰 Feature Spotlight Blog
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#00ffff',
              maxWidth: '700px',
              margin: '0 auto 1.5rem'
            }}>
              Daily deep dives into the powerful tools and features we've built to fight for justice
            </p>
            
            {/* Eye Oracle Reports Quick Link */}
            <Link href="/eye-oracle-reports" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '30px',
              fontWeight: 'bold',
              fontSize: '1rem',
              marginBottom: '1.5rem',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              👁️ NEW: Daily Eye Oracle Reports - What They Did Today →
            </Link>
            
            {/* Social Media Links */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>Follow us:</span>
              <a href="https://x.com/Phoenixrizin09" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} title="Follow us on X/Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span>X/Twitter</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61551426728894" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} title="Follow us on Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/PhoenixRizin09/" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} title="Follow us on Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                <span>Instagram</span>
              </a>
              <a href="https://www.tiktok.com/@PhoenixRizin09" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} title="Follow us on TikTok">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                <span>TikTok</span>
              </a>
              <a href="https://www.youtube.com/@InjuredWorkersVideoCampaign" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} title="Subscribe on YouTube">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Category Filter */}
          <div style={{
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.5rem 1rem',
                  background: selectedCategory === category 
                    ? 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)' 
                    : 'rgba(255,255,255,0.1)',
                  color: selectedCategory === category ? '#000' : '#fff',
                  border: '1px solid rgba(0,255,255,0.3)',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.background = 'rgba(0,255,255,0.2)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '15px',
              border: '2px solid rgba(0,255,255,0.3)'
            }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</h2>
              <p style={{ fontSize: '1.2rem', color: '#00ffff' }}>
                Blog posts are loading... Stay tuned for daily feature spotlights!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
              gap: '2rem'
            }}>
              {filteredPosts.map(post => (
                <article
                  key={post.id}
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '15px',
                    border: '2px solid rgba(0,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,255,255,0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Post Header */}
                  <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,107,107,0.1) 100%)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{
                        fontSize: '0.85rem',
                        color: '#00ffff',
                        fontWeight: 'bold'
                      }}>
                        {post.category}
                      </span>
                      <span style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.6)'
                      }}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h2 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem'
                    }}>
                      {post.emoji} {post.title}
                    </h2>
                  </div>

                  {/* Post Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{
                      lineHeight: '1.6',
                      color: 'rgba(255,255,255,0.9)',
                      marginBottom: '1rem'
                    }}>
                      {post.excerpt}
                    </p>

                    {/* Key Features */}
                    {post.keyFeatures && post.keyFeatures.length > 0 && (
                      <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          color: '#00ffff',
                          marginBottom: '0.5rem'
                        }}>
                          Key Features:
                        </h4>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          fontSize: '0.9rem',
                          lineHeight: '1.8'
                        }}>
                          {post.keyFeatures.map((feature, idx) => (
                            <li key={idx}>✓ {feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Share Buttons */}
                    <div style={{
                      marginTop: '1rem',
                      marginBottom: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Share:</span>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title + ' - Injured Workers Unite')}&url=${encodeURIComponent('https://injuredworkersunite.pages.dev/blog')}&via=Phoenixrizin09`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={shareButtonStyle}
                          title="Share on X/Twitter"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://injuredworkersunite.pages.dev/blog')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={shareButtonStyle}
                          title="Share on Facebook"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://injuredworkersunite.pages.dev/blog')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={shareButtonStyle}
                          title="Share on LinkedIn"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <button
                          onClick={() => {
                            const url = 'https://injuredworkersunite.pages.dev/blog';
                            const text = post.title + ' - Injured Workers Unite';
                            if (navigator.share) {
                              navigator.share({ title: text, url: url }).catch(() => {});
                            } else {
                              navigator.clipboard.writeText(url);
                              alert('Link copied to clipboard!');
                            }
                          }}
                          style={shareButtonStyle}
                          title="Copy link or share"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                        </button>
                      </div>
                    </div>

                    {/* Call to Action */}
                    {post.ctaLink && (
                      <Link href={post.ctaLink} style={{
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)',
                        color: '#000',
                        textDecoration: 'none',
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                      }}>
                        {post.ctaText || 'Explore This Feature →'}
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Subscribe CTA */}
          <div style={{
            marginTop: '4rem',
            padding: '2rem',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '15px',
            border: '2px solid rgba(255,107,107,0.5)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '1rem',
              color: '#ff6b6b'
            }}>
              ✊ Stay Updated
            </h3>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '1.5rem',
              maxWidth: '600px',
              margin: '0 auto 1.5rem'
            }}>
              New feature spotlights published daily. Follow our social media to never miss an update on the tools we're building for justice.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="https://x.com/Phoenixrizin09" target="_blank" rel="noopener noreferrer" style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}>
                Follow on X/Twitter
              </a>
              <Link href="/contact" style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                border: '2px solid rgba(0,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const socialLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.5rem 1rem',
  background: 'rgba(0,255,255,0.1)',
  border: '1px solid rgba(0,255,255,0.3)',
  borderRadius: '20px',
  color: '#00ffff',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
};

const shareButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: 'rgba(0,255,255,0.1)',
  border: '1px solid rgba(0,255,255,0.3)',
  color: '#00ffff',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textDecoration: 'none'
};

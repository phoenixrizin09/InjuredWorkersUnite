import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fs from 'fs';
import path from 'path';

// Get memes at build time
export async function getStaticProps() {
  const memesDir = path.join(process.cwd(), 'public', 'memes');
  const catalogPath = path.join(process.cwd(), 'public', 'data', 'meme-catalog.json');
  
  let catalog = { memes: [] };
  let memeFiles = [];
  
  try {
    // Try to load the catalog with alt text
    if (fs.existsSync(catalogPath)) {
      catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
    }
  } catch (e) {
    console.log('No catalog found, will use filenames');
  }
  
  try {
    // Get all meme files
    memeFiles = fs.readdirSync(memesDir)
      .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
      .map(filename => {
        // Check if we have catalog entry with alt text
        const catalogEntry = catalog.memes?.find(m => m.filename === filename);
        
        return {
          filename,
          path: `/memes/${filename}`,
          altText: catalogEntry?.altText || 'Injured worker advocacy meme',
          category: catalogEntry?.category || 'General',
          id: filename.replace(/\.[^.]+$/, '').substring(0, 20)
        };
      });
  } catch (e) {
    console.log('Error reading memes directory:', e);
  }
  
  return {
    props: {
      memes: memeFiles,
      catalogStats: catalog.stats || null,
      totalCount: memeFiles.length
    }
  };
}

export default function MemeGallery({ memes, catalogStats, totalCount }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const [viewMode, setViewMode] = useState('grid');

  // Get unique categories
  const categories = ['all', ...new Set(memes.map(m => m.category))];
  
  // Filter memes
  const filteredMemes = memes.filter(meme => {
    const matchesFilter = filter === 'all' || meme.category === filter;
    const matchesSearch = searchTerm === '' || 
      meme.altText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meme.filename.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Load more
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 24, filteredMemes.length));
  };

  // Share functions
  const shareToSocial = (platform, meme) => {
    const pageUrl = encodeURIComponent('https://injuredworkersunite.pages.dev/meme-gallery');
    const text = encodeURIComponent('Fighting for injured workers with memes! #InjuredWorkersUnite');
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${pageUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      reddit: `https://www.reddit.com/submit?url=${pageUrl}&title=${text}`
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const downloadMeme = (meme) => {
    const link = document.createElement('a');
    link.href = meme.path;
    link.download = meme.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        color: '#fff',
        padding: '40px 20px',
        fontFamily: 'monospace'
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
            padding: '40px',
            borderRadius: '20px',
            marginBottom: '30px',
            boxShadow: '0 0 50px rgba(255,0,255,0.3)',
            textAlign: 'center'
          }}>
            <h1 style={{ 
              margin: 0, 
              fontSize: 'clamp(2rem, 6vw, 4rem)', 
              textShadow: '0 0 20px rgba(0,0,0,0.5)',
              color: '#000'
            }}>
              🎨 MEME ARSENAL 🎨
            </h1>
            <p style={{ 
              margin: '15px 0 0 0', 
              fontSize: '1.3rem', 
              color: '#000',
              fontWeight: 'bold'
            }}>
              {totalCount} Weapons of Mass Awareness
            </p>
            <p style={{ margin: '10px 0 0 0', fontSize: '1rem', color: '#333' }}>
              Fighting injustice one meme at a time • The Memetic Embassy Collection
            </p>
          </div>

          {/* Stats Bar */}
          {catalogStats && catalogStats.byCategory && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              {Object.entries(catalogStats.byCategory).map(([cat, count]) => (
                <div
                  key={cat}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: '0.9rem'
                  }}
                >
                  <strong style={{ color: '#00ffff' }}>{count}</strong>
                  <span style={{ color: '#888', marginLeft: '0.5rem' }}>{cat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Search & Filter Bar */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '30px',
            border: '2px solid rgba(255,0,255,0.3)'
          }}>
            {/* Search */}
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="🔍 Search memes by description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  background: 'rgba(0,0,0,0.5)',
                  border: '2px solid rgba(0,255,255,0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Category Filters */}
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <span style={{ color: '#888', marginRight: '0.5rem' }}>Filter:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setFilter(cat); setVisibleCount(24); }}
                  style={{
                    padding: '8px 16px',
                    background: filter === cat 
                      ? 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)' 
                      : 'rgba(255,255,255,0.1)',
                    color: filter === cat ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {cat} {cat !== 'all' && `(${memes.filter(m => m.category === cat).length})`}
                </button>
              ))}
              
              {/* View Mode Toggle */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 12px',
                    background: viewMode === 'grid' ? '#ff00ff' : 'rgba(255,255,255,0.1)',
                    color: viewMode === 'grid' ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  ▦ Grid
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  style={{
                    padding: '8px 12px',
                    background: viewMode === 'masonry' ? '#ff00ff' : 'rgba(255,255,255,0.1)',
                    color: viewMode === 'masonry' ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  ▤ Flow
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div style={{ 
            marginBottom: '1.5rem', 
            color: '#888',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <span>
              Showing {Math.min(visibleCount, filteredMemes.length)} of {filteredMemes.length} memes
              {searchTerm && ` matching "${searchTerm}"`}
            </span>
            <Link href="/memetic-embassy-full" style={{ color: '#ff00ff', textDecoration: 'none' }}>
              🏛️ Visit the Memetic Embassy →
            </Link>
          </div>

          {/* Meme Grid */}
          {filteredMemes.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '15px',
              border: '2px dashed rgba(255,255,255,0.3)'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔍</div>
              <h2>No memes found</h2>
              <p style={{ color: '#888' }}>Try adjusting your search or filter</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'masonry' 
                ? 'repeat(auto-fill, minmax(200px, 1fr))'
                : 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '15px'
            }}>
              {filteredMemes.slice(0, visibleCount).map((meme, idx) => (
                <div
                  key={meme.filename}
                  onClick={() => setSelectedMeme(meme)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid rgba(255,0,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(255,0,255,0.4)';
                    e.currentTarget.style.borderColor = '#ff00ff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255,0,255,0.2)';
                  }}
                >
                  <img 
                    src={meme.path} 
                    alt={meme.altText}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: viewMode === 'masonry' ? 'auto' : '250px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div style={{ padding: '10px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
                        color: '#000',
                        padding: '3px 10px',
                        borderRadius: '10px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold'
                      }}>
                        {meme.category}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#555' }}>
                        #{idx + 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredMemes.length && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button
                onClick={loadMore}
                style={{
                  padding: '15px 40px',
                  background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(255,0,255,0.4)'
                }}
              >
                Load More ({filteredMemes.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {/* Share Section */}
          <div style={{
            marginTop: '4rem',
            background: 'linear-gradient(135deg, rgba(255,0,255,0.1) 0%, rgba(0,255,255,0.1) 100%)',
            border: '2px solid #ff00ff',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: '15px', color: '#ff00ff' }}>💪 Spread the Arsenal</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '25px', color: '#ccc' }}>
              Share these memes across social media to raise awareness!
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => shareToSocial('twitter')}
                style={{
                  padding: '12px 24px',
                  background: '#1DA1F2',
                  border: 'none',
                  borderRadius: '25px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🐦 Share on X
              </button>
              <button
                onClick={() => shareToSocial('facebook')}
                style={{
                  padding: '12px 24px',
                  background: '#1877F2',
                  border: 'none',
                  borderRadius: '25px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                📘 Share on Facebook
              </button>
              <button
                onClick={() => shareToSocial('reddit')}
                style={{
                  padding: '12px 24px',
                  background: '#FF4500',
                  border: 'none',
                  borderRadius: '25px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🤖 Share on Reddit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMeme && (
        <div
          onClick={() => setSelectedMeme(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative',
              cursor: 'default'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMeme(null)}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '2.5rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedMeme.path}
              alt={selectedMeme.altText}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                borderRadius: '10px',
                boxShadow: '0 0 50px rgba(255,0,255,0.5)'
              }}
            />

            {/* Info & Actions */}
            <div style={{
              background: 'rgba(0,0,0,0.9)',
              padding: '20px',
              borderRadius: '0 0 10px 10px',
              marginTop: '-5px'
            }}>
              <p style={{ 
                color: '#aaa', 
                margin: '0 0 15px 0',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                <strong style={{ color: '#00ffff' }}>Description:</strong> {selectedMeme.altText}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => downloadMeme(selectedMeme)}
                  style={{
                    padding: '10px 20px',
                    background: '#00ffff',
                    border: 'none',
                    borderRadius: '20px',
                    color: '#000',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📥 Download
                </button>
                <button
                  onClick={() => shareToSocial('twitter', selectedMeme)}
                  style={{
                    padding: '10px 20px',
                    background: '#1DA1F2',
                    border: 'none',
                    borderRadius: '20px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  🐦 Tweet
                </button>
                <button
                  onClick={() => shareToSocial('facebook', selectedMeme)}
                  style={{
                    padding: '10px 20px',
                    background: '#1877F2',
                    border: 'none',
                    borderRadius: '20px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📘 Share
                </button>
                <span style={{
                  background: 'rgba(255,0,255,0.3)',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  color: '#ff00ff',
                  fontWeight: 'bold'
                }}>
                  {selectedMeme.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

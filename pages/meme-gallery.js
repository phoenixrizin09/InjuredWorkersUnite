import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MemeGallery() {
  const [memes, setMemes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadMemes();
  }, []);

  async function loadMemes() {
    try {
      // This will load memes from the public/memes folder
      // For now, we'll use a placeholder structure
      // Once you add memes, they'll automatically show up
      const response = await fetch('/api/memes');
      if (response.ok) {
        const data = await response.json();
        setMemes(data);
      }
    } catch (error) {
      console.log('Loading memes...');
      // Fallback to showing folder structure
      setMemes([]);
    }
  }

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
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
            padding: '30px',
            borderRadius: '15px',
            marginBottom: '30px',
            boxShadow: '0 0 30px rgba(255,107,107,0.3)'
          }}>
            <h1 style={{ margin: 0, fontSize: '48px', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
              😂 MEME GALLERY
            </h1>
            <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: 0.9 }}>
              Fighting injustice one meme at a time
            </p>
          </div>

          {/* Categories Filter */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '30px',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            {['all', 'wsib', 'odsp', 'insurance', 'government', 'solidarity'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '10px 20px',
                  background: filter === cat ? 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)' : 'rgba(255,255,255,0.1)',
                  color: filter === cat ? '#000' : '#fff',
                  border: filter === cat ? 'none' : '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Instructions for adding memes */}
          <div style={{
            background: 'rgba(0,255,255,0.1)',
            border: '2px solid #00ffff',
            borderRadius: '10px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <h2 style={{ margin: '0 0 15px 0', color: '#00ffff' }}>📁 How to Add Your Memes</h2>
            <ol style={{ lineHeight: '2', fontSize: '16px' }}>
              <li>Place all your meme images in: <code style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px' }}>public/memes/</code></li>
              <li>Supported formats: .jpg, .jpeg, .png, .gif, .webp</li>
              <li>Optionally organize into subfolders: wsib/, odsp/, insurance/, government/, solidarity/</li>
              <li>Memes will automatically appear on this page once added</li>
              <li>Click any meme to view full size and share</li>
            </ol>
            <p style={{ marginTop: '20px', fontSize: '14px', opacity: 0.8 }}>
              💡 Tip: Name your files descriptively (e.g., "wsib-denial-meme.jpg") for better organization
            </p>
          </div>

          {/* Meme Grid */}
          {memes.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '15px',
              border: '2px dashed rgba(255,255,255,0.3)'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>📸</div>
              <h2 style={{ marginBottom: '15px' }}>No Memes Yet</h2>
              <p style={{ fontSize: '18px', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                Add your meme collection to <strong>public/memes/</strong> folder and they'll appear here automatically!
              </p>
              <div style={{ marginTop: '30px', fontSize: '14px', opacity: 0.6 }}>
                Folder created at: <code>public/memes/</code>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {memes.filter(m => filter === 'all' || m.category === filter).map((meme, idx) => (
                <MemeCard key={idx} meme={meme} />
              ))}
            </div>
          )}

          {/* Share Section */}
          <div style={{
            marginTop: '50px',
            background: 'rgba(255,255,255,0.05)',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: '15px' }}>💪 Spread the Word</h2>
            <p style={{ fontSize: '18px', marginBottom: '20px', opacity: 0.9 }}>
              Share these memes on social media to raise awareness!
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <SocialShareButton platform="facebook" />
              <SocialShareButton platform="twitter" />
              <SocialShareButton platform="instagram" />
              <SocialShareButton platform="tiktok" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function MemeCard({ meme }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '2px solid rgba(0,255,255,0.3)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,255,0.5)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <img 
        src={meme.url} 
        alt={meme.title}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{meme.title}</h3>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            background: '#00ffff',
            color: '#000',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {meme.category}
          </span>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#00ffff',
            cursor: 'pointer',
            fontSize: '20px'
          }}>
            ⬇️
          </button>
        </div>
      </div>
    </div>
  );
}

function SocialShareButton({ platform }) {
  const platformInfo = {
    facebook: { name: 'Facebook', icon: '📘', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
    twitter: { name: 'X/Twitter', icon: '🐦', url: 'https://twitter.com/intent/tweet?url=' },
    instagram: { name: 'Instagram', icon: '📷', url: 'https://www.instagram.com/' },
    tiktok: { name: 'TikTok', icon: '🎵', url: 'https://www.tiktok.com/' }
  };

  const info = platformInfo[platform];

  return (
    <a
      href={info.url + encodeURIComponent('https://injuredworkersunite.pages.dev/meme-gallery')}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: '12px 24px',
        background: 'rgba(255,255,255,0.1)',
        border: '2px solid rgba(0,255,255,0.5)',
        borderRadius: '25px',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(0,255,255,0.2)';
        e.currentTarget.style.borderColor = '#00ffff';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.borderColor = 'rgba(0,255,255,0.5)';
      }}
    >
      {info.icon} Share on {info.name}
    </a>
  );
}

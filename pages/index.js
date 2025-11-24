import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
    <Header />
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: '900',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          INJURED WORKERS UNITE
        </h1>
        
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          maxWidth: '800px',
          marginBottom: '3rem',
          opacity: 0.95
        }}>
          A Digital Sanctuary for Injured Workers, Disabled Persons, and Creative Resistance
        </p>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1rem',
          maxWidth: '1200px',
          width: '100%',
          marginBottom: '3rem',
          padding: '0 1rem'
        }}>
          <Link href="/the-eye" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: 'clamp(1rem, 4vw, 2rem)',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(79, 172, 254, 0.5)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              color: 'white',
              height: '100%'
            }}>
              <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '1rem' }}>👁️</div>
              <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginBottom: '0.5rem' }}>The EYE</h3>
              <p style={{ opacity: 0.9, fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}>AI-powered investigator tracking systemic abuse, policy changes, and corporate accountability.</p>
            </div>
          </Link>

          <Link href="/automated-monitoring" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '2rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              color: 'white',
              height: '100%'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>24/7 Monitoring</h3>
              <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Automated tracking of provincial & federal bills, WSIB policies, disability benefits, and more.</p>
            </div>
          </Link>

          <Link href="/memetic-embassy" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '2rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              color: 'white',
              height: '100%'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Memetic Embassy</h3>
              <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Creative resistance through powerful narratives and viral storytelling. Amplify the truth.</p>
            </div>
          </Link>

          <Link href="/target-acquisition" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '2rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              color: 'white',
              height: '100%'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Target Acquisition</h3>
              <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Track entities causing harm to workers and disabled persons. Evidence-based accountability.</p>
            </div>
          </Link>

          <Link href="/alerts" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '2rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 100, 100, 0.5)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              color: 'white',
              height: '100%'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚨</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Live Alerts</h3>
              <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Real-time notifications of critical policy changes, new bills, and system updates.</p>
            </div>
          </Link>

          <Link href="/meme-gallery" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '2rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              color: 'white',
              height: '100%'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😂</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Meme Gallery</h3>
              <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Creative resistance through humor. Share and spread awareness with powerful memes.</p>
            </div>
          </Link>
        </div>

        <div style={{
          padding: '2rem',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '20px',
          maxWidth: '600px',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>What We Stand For</h3>
          <ul style={{ textAlign: 'left', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
            <li>✊ Worker Rights & Safety</li>
            <li>🛡️ Disability Justice & Advocacy</li>
            <li>🎨 Creative Resistance & Memetic Warfare</li>
            <li>🌐 Digital Sovereignty & Mutual Aid</li>
          </ul>
        </div>

        {/* Blog Teaser */}
        <div style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,107,107,0.1) 100%)',
          borderRadius: '20px',
          maxWidth: '800px',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(0,255,255,0.3)',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #00ffff 0%, #ff6b6b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📰 Feature Spotlight Blog
          </h3>
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Daily deep dives into our powerful tools and features. Learn how each component works to fight for justice.
          </p>
          <Link href="/blog" style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 0 20px rgba(0,255,255,0.5)',
            transition: 'all 0.3s ease'
          }}>
            Read the Blog →
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

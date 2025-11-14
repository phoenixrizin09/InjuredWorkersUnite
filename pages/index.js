import Link from 'next/link';
import Header from '../components/Header';

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

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          <Link href="/the-eye" style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.3), rgba(0, 242, 254, 0.3))',
            border: '2px solid #4facfe',
            borderRadius: '50px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(79, 172, 254, 0.4)',
            transition: 'all 0.3s'
          }}>
            👁️ The EYE
          </Link>
          
          <Link href="/memetic-embassy" style={{
            padding: '1rem 2rem',
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid white',
            borderRadius: '50px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            backdropFilter: 'blur(10px)'
          }}>
            🏛️ Memetic Embassy
          </Link>
          
          <Link href="/contact" style={{
            padding: '1rem 2rem',
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid white',
            borderRadius: '50px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            backdropFilter: 'blur(10px)'
          }}>
            📧 Contact
          </Link>
        </div>

        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '20px',
          maxWidth: '600px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>What We Stand For</h3>
          <ul style={{ textAlign: 'left', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
            <li>✊ Worker Rights & Safety</li>
            <li>🛡️ Disability Justice & Advocacy</li>
            <li>🎨 Creative Resistance & Memetic Warfare</li>
            <li>🌐 Digital Sovereignty & Mutual Aid</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}

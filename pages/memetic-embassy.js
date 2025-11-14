import { useState } from 'react';
import Link from 'next/link';

export default function MemeticEmbassy() {
  const [activeTab, setActiveTab] = useState('charter');

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ textAlign: 'center', zIndex: 1, padding: '2rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: '900',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🏛️ THE MEMETIC EMBASSY
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.9 }}>
            A Digital Nation-State for the Injured, Disabled & Resistance
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('charter')} style={getTabStyle(activeTab === 'charter')}>
              Our Charter
            </button>
            <button onClick={() => setActiveTab('passport')} style={getTabStyle(activeTab === 'passport')}>
              Get Passport
            </button>
            <button onClick={() => setActiveTab('squad')} style={getTabStyle(activeTab === 'squad')}>
              Denial Squad
            </button>
            <button onClick={() => setActiveTab('resources')} style={getTabStyle(activeTab === 'resources')}>
              Resources
            </button>
            <button onClick={() => setActiveTab('tools')} style={getTabStyle(activeTab === 'tools')}>
              Meme Tools
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'charter' && <CharterSection />}
        {activeTab === 'passport' && <PassportSection />}
        {activeTab === 'squad' && <DenialSquadSection />}
        {activeTab === 'resources' && <ResourcesSection />}
        {activeTab === 'tools' && <MemeToolsSection />}
      </section>

      {/* Navigation Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center', background: '#111', borderTop: '1px solid #333' }}>
        <Link href="/" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </footer>
    </div>
  );
}

function CharterSection() {
  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#667eea' }}>🏛️ Embassy Charter</h2>
      
      <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
        <h3 style={{ color: '#764ba2', marginTop: '2rem' }}>Article I: Sovereignty</h3>
        <p>
          The Memetic Embassy is a sovereign digital nation-state, operating under the principles of mutual aid, 
          worker solidarity, and disability justice. We recognize no borders, no hierarchies, and no gatekeepers.
        </p>

        <h3 style={{ color: '#764ba2', marginTop: '2rem' }}>Article II: Citizenship</h3>
        <p>
          Citizenship is open to all injured workers, disabled persons, and allies who commit to our principles. 
          Passports are issued freely, without discrimination or barrier.
        </p>

        <h3 style={{ color: '#764ba2', marginTop: '2rem' }}>Article III: Digital Rights</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✊ Right to organize without retaliation</li>
          <li>🛡️ Right to share stories without censorship</li>
          <li>🎨 Right to create and distribute resistance media</li>
          <li>🌐 Right to digital sanctuary from corporate surveillance</li>
        </ul>

        <h3 style={{ color: '#764ba2', marginTop: '2rem' }}>Article IV: The Denial Squad</h3>
        <p>
          Our memetic warriors - The Denial Squad - protect citizens from gaslighting, medical denial, 
          and corporate propaganda through truth-telling, solidarity, and creative resistance.
        </p>
      </div>
    </div>
  );
}

function PassportSection() {
  const [formData, setFormData] = useState({ name: '', story: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#667eea' }}>🛂 Digital Passport</h2>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              Your Name (or alias)
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              placeholder="Enter your name"
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              Your Story (optional)
            </label>
            <textarea
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
              placeholder="Share your journey, if you'd like..."
            />
          </div>

          <button type="submit" style={{ ...buttonStyle, width: '100%', padding: '1rem' }}>
            Request Citizenship ✊
          </button>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3 style={{ fontSize: '2rem', color: '#667eea', marginBottom: '1rem' }}>Welcome, Citizen!</h3>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Your digital passport has been issued. You are now a citizen of The Memetic Embassy.
          </p>
          <div style={{
            padding: '2rem',
            background: '#16213e',
            borderRadius: '10px',
            border: '2px solid #667eea'
          }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Passport #{Math.floor(Math.random() * 10000)}
            </p>
            <p style={{ fontSize: '1.2rem' }}>Citizen: {formData.name}</p>
            <p style={{ marginTop: '1rem', opacity: 0.8 }}>
              "In solidarity, we resist. In community, we heal."
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function DenialSquadSection() {
  const squadMembers = [
    {
      name: 'Captain Truth-Teller',
      role: 'Commander',
      bio: 'Exposes medical gaslighting and insurance fraud with receipts',
      emoji: '🎖️'
    },
    {
      name: 'Sergeant Solidarity',
      role: 'Organizer',
      bio: 'Builds worker networks and mutual aid systems',
      emoji: '🤝'
    },
    {
      name: 'Lieutenant Meme-Maker',
      role: 'Creative Director',
      bio: 'Weaponizes humor against corporate propaganda',
      emoji: '🎨'
    },
    {
      name: 'Major Accessibility',
      role: 'Inclusion Officer',
      bio: 'Ensures no one is left behind in the fight',
      emoji: '♿'
    }
  ];

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#667eea' }}>⚔️ The Denial Squad</h2>
      
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', lineHeight: '1.8' }}>
        Our memetic warriors fight back against denial, gaslighting, and erasure. They protect injured workers 
        from corporate propaganda and medical gatekeeping through truth, solidarity, and creative resistance.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {squadMembers.map((member, idx) => (
          <div key={idx} style={{
            padding: '1.5rem',
            background: '#16213e',
            borderRadius: '10px',
            border: '2px solid #667eea',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{member.emoji}</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#764ba2' }}>
              {member.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#667eea', marginBottom: '1rem' }}>
              {member.role}
            </p>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>
              {member.bio}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: '#0f3460',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Join The Squad</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          We need artists, organizers, storytellers, and advocates. Your skills matter. Your voice matters.
        </p>
        <Link href="/contact" style={{
          display: 'inline-block',
          padding: '0.8rem 2rem',
          background: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '50px',
          fontWeight: 'bold'
        }}>
          Get Involved →
        </Link>
      </div>
    </div>
  );
}

function ResourcesSection() {
  const resources = [
    {
      title: 'Worker Rights Guides',
      items: [
        'Know Your Rights at Work',
        'Filing Workers\' Compensation Claims',
        'Dealing with Insurance Denials',
        'Disability Accommodations'
      ]
    },
    {
      title: 'Legal Resources',
      items: [
        'Finding Pro Bono Legal Help',
        'OSHA Complaint Procedures',
        'ADA Compliance Guide',
        'Medical Records Access Rights'
      ]
    },
    {
      title: 'Support Networks',
      items: [
        'Peer Support Groups',
        'Mental Health Resources',
        'Financial Assistance Programs',
        'Community Organizing Tips'
      ]
    },
    {
      title: 'Educational Materials',
      items: [
        'Understanding Your Injuries',
        'Ergonomics & Prevention',
        'Return-to-Work Planning',
        'Self-Advocacy Skills'
      ]
    }
  ];

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#667eea' }}>📚 Resources Library</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {resources.map((category, idx) => (
          <div key={idx} style={{
            padding: '1.5rem',
            background: '#16213e',
            borderRadius: '10px',
            border: '2px solid #667eea'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
              {category.title}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {category.items.map((item, i) => (
                <li key={i} style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(102, 126, 234, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                  📄 {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: '#0f3460',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>📖 Digital Library</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          Access our complete collection of guides, templates, and resources for injured workers.
        </p>
        <button style={buttonStyle}>
          Browse Full Library →
        </button>
      </div>
    </div>
  );
}

function MemeToolsSection() {
  const [memeText, setMemeText] = useState({ top: '', bottom: '' });
  const [sloganText, setSloganText] = useState('');
  const [generatedSlogan, setGeneratedSlogan] = useState('');

  const slogans = [
    'They denied my claim, we deny their legitimacy',
    'My body, my story, our solidarity',
    'Injured not invisible',
    'Disability is not inability',
    'Worker safety over corporate greed',
    'Our pain is political',
    'Solidarity is our medicine',
    'They silence us, we amplify each other'
  ];

  const generateSlogan = () => {
    const random = slogans[Math.floor(Math.random() * slogans.length)];
    setGeneratedSlogan(random);
  };

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#667eea' }}>🎨 Meme Warfare Tools</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Meme Generator */}
        <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: '2px solid #667eea' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
            🖼️ Meme Generator
          </h3>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Top text"
              value={memeText.top}
              onChange={(e) => setMemeText({ ...memeText, top: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Bottom text"
              value={memeText.bottom}
              onChange={(e) => setMemeText({ ...memeText, bottom: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{
            background: '#0a0a0a',
            padding: '2rem',
            borderRadius: '8px',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>
              {memeText.top || 'TOP TEXT'}
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>[Image would go here]</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>
              {memeText.bottom || 'BOTTOM TEXT'}
            </p>
          </div>
          <button style={{ ...buttonStyle, width: '100%', marginTop: '1rem' }}>
            Generate Meme
          </button>
        </div>

        {/* Slogan Generator */}
        <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: '2px solid #667eea' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
            ✊ Slogan Generator
          </h3>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem', opacity: 0.9 }}>
            Generate powerful slogans for protests, social media, and solidarity campaigns.
          </p>
          <button onClick={generateSlogan} style={{ ...buttonStyle, width: '100%', marginBottom: '1.5rem' }}>
            Generate Random Slogan
          </button>
          {generatedSlogan && (
            <div style={{
              padding: '1.5rem',
              background: '#0f3460',
              borderRadius: '8px',
              border: '2px solid #764ba2',
              marginBottom: '1.5rem'
            }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.6' }}>
                "{generatedSlogan}"
              </p>
            </div>
          )}
          <div>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Popular Slogans:</p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', opacity: 0.8 }}>
              {slogans.slice(0, 4).map((slogan, idx) => (
                <li key={idx} style={{ padding: '0.3rem 0' }}>• {slogan}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Poster Maker */}
        <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: '2px solid #667eea' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
            📢 Protest Poster Maker
          </h3>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem', opacity: 0.9 }}>
            Create downloadable posters for rallies, strikes, and demonstrations.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Main Message
            </label>
            <input
              type="text"
              placeholder="Your message here"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Color Scheme
            </label>
            <select style={inputStyle}>
              <option>Red & Black (Classic)</option>
              <option>Purple & White (Unity)</option>
              <option>Green & Yellow (Safety)</option>
              <option>Blue & Silver (Professional)</option>
            </select>
          </div>
          <button style={{ ...buttonStyle, width: '100%' }}>
            Create Poster
          </button>
        </div>
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: '#0f3460',
        borderRadius: '10px'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>💡 Memetic Warfare Tips</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Be Authentic</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Share real stories, real struggles. Authenticity cuts through propaganda.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Use Humor</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Humor disarms, educates, and builds solidarity. Make them laugh, then think.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Stay United</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Share each other's content. Amplify marginalized voices. We rise together.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Document Everything</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Screenshots, receipts, dates. Evidence is our strongest weapon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const getTabStyle = (isActive) => ({
  padding: '0.8rem 1.5rem',
  background: isActive 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'rgba(102, 126, 234, 0.2)',
  border: isActive ? 'none' : '2px solid #667eea',
  borderRadius: '50px',
  color: 'white',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s',
  transform: isActive ? 'scale(1.05)' : 'scale(1)',
});

const buttonStyle = {
  padding: '0.8rem 1.5rem',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  border: 'none',
  borderRadius: '50px',
  color: 'white',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  background: '#0f3460',
  border: '2px solid #667eea',
  borderRadius: '8px',
  color: 'white',
  fontSize: '1rem',
};

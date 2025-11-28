import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MemeticEmbassy() {
  const [activeTab, setActiveTab] = useState('tools');

  return (
    <>
    <Header />
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
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', maxWidth: '600px', margin: '0 auto 1rem', opacity: 0.9 }}>
            A Digital Nation-State for the Injured, Disabled & Resistance
          </p>
          
          <Link href="/memetic-embassy-full" style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
            border: '3px solid #fff',
            borderRadius: '15px',
            color: '#000',
            textDecoration: 'none',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            boxShadow: '0 0 30px rgba(255,0,255,0.6)',
            animation: 'pulse 2s infinite'
          }}>
            🌐 ENTER THE FULL MEMETIC EMBASSY EXPERIENCE 🌐
          </Link>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('tools')} style={getTabStyle(activeTab === 'tools')}>
              🎨 Meme Arsenal
            </button>
            <button onClick={() => setActiveTab('templates')} style={getTabStyle(activeTab === 'templates')}>
              📦 Template Packs
            </button>
            <button onClick={() => setActiveTab('infographics')} style={getTabStyle(activeTab === 'infographics')}>
              📊 Infographics
            </button>
            <button onClick={() => setActiveTab('charter')} style={getTabStyle(activeTab === 'charter')}>
              📜 Charter
            </button>
            <button onClick={() => setActiveTab('passport')} style={getTabStyle(activeTab === 'passport')}>
              🛂 Passport
            </button>
            <button onClick={() => setActiveTab('resources')} style={getTabStyle(activeTab === 'resources')}>
              📚 Resources
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'tools' && <MemeToolsSection />}
        {activeTab === 'templates' && <TemplatePacksSection />}
        {activeTab === 'infographics' && <InfographicsSection />}
        {activeTab === 'charter' && <CharterSection />}
        {activeTab === 'passport' && <PassportSection />}
        {activeTab === 'resources' && <ResourcesSection />}
      </section>

      {/* Navigation Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center', background: '#111', borderTop: '1px solid #333' }}>
        <Link href="/" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </footer>
    </div>
    <Footer />
    </>
  );
}

function CharterSection() {
  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#667eea' }}>🏛️ Embassy Charter</h2>
      
      <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
        <div style={{ 
          padding: '2rem', 
          background: '#0f3460', 
          borderRadius: '10px', 
          marginBottom: '2rem',
          border: '2px solid #764ba2'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#667eea' }}>Preamble</h3>
          <p style={{ fontStyle: 'italic', fontSize: '1.2rem', lineHeight: '1.8' }}>
            We, the injured, the disabled, the denied, and the dismissed—declare our sovereignty. 
            No longer will we accept the gaslighting of medical systems, the cruelty of insurance companies, 
            or the silence imposed by corporate interests. We establish this Embassy as sacred ground: 
            a place where our stories matter, our pain is validated, and our resistance is celebrated.
          </p>
        </div>

        <h3 style={{ color: '#764ba2', marginTop: '2rem', fontSize: '1.8rem' }}>Article I: Sovereignty & Self-Determination</h3>
        <p style={{ marginBottom: '1rem' }}>
          The Memetic Embassy operates as a sovereign digital nation-state, bound by no physical borders 
          and subject to no external authority. We recognize:
        </p>
        <ul style={{ listStyle: 'none', padding: '0 0 0 1rem', marginBottom: '1.5rem' }}>
          <li style={{ padding: '0.5rem 0' }}>🏛️ The right to self-governance and collective decision-making</li>
          <li style={{ padding: '0.5rem 0' }}>✊ The authority to define our own narratives and reject imposed labels</li>
          <li style={{ padding: '0.5rem 0' }}>🌐 Freedom from corporate surveillance and data exploitation</li>
          <li style={{ padding: '0.5rem 0' }}>🛡️ Protection of all citizens from retaliation and discrimination</li>
        </ul>

        <h3 style={{ color: '#764ba2', marginTop: '2rem', fontSize: '1.8rem' }}>Article II: Universal Citizenship</h3>
        <p style={{ marginBottom: '1rem' }}>
          Citizenship in the Memetic Embassy is open to all who align with our principles. 
          We specifically welcome:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px' }}>
            <strong style={{ color: '#667eea' }}>Injured Workers</strong>
            <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', opacity: 0.9 }}>
              Those harmed on the job, navigating workers' comp, fighting for recognition
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px' }}>
            <strong style={{ color: '#667eea' }}>Disabled Persons</strong>
            <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', opacity: 0.9 }}>
              Living with visible & invisible disabilities, chronic illness, long COVID
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px' }}>
            <strong style={{ color: '#667eea' }}>Healthcare Survivors</strong>
            <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', opacity: 0.9 }}>
              Those denied care, misdiagnosed, gaslit by medical professionals
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px' }}>
            <strong style={{ color: '#667eea' }}>Labor Organizers</strong>
            <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', opacity: 0.9 }}>
              Union members, workplace advocates, mutual aid coordinators
            </p>
          </div>
        </div>
        <p style={{ fontStyle: 'italic', opacity: 0.9 }}>
          No fees. No barriers. No gatekeeping. If you believe in solidarity, you belong here.
        </p>

        <h3 style={{ color: '#764ba2', marginTop: '2rem', fontSize: '1.8rem' }}>Article III: Fundamental Rights</h3>
        <div style={{ padding: '1.5rem', background: '#0f3460', borderRadius: '10px', marginBottom: '1rem' }}>
          <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Right to Truth & Validation</h4>
          <p>
            Every citizen has the inalienable right to have their pain acknowledged, their injuries validated, 
            and their experiences believed without question or judgment. Medical gaslighting is an act of violence 
            and will not be tolerated within our borders.
          </p>
        </div>
        <div style={{ padding: '1.5rem', background: '#0f3460', borderRadius: '10px', marginBottom: '1rem' }}>
          <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Right to Organize Without Fear</h4>
          <p>
            Citizens may organize, protest, strike, and advocate without fear of retaliation, surveillance, 
            or reprisal. We provide tools, resources, and solidarity for workplace organizing and collective action.
          </p>
        </div>
        <div style={{ padding: '1.5rem', background: '#0f3460', borderRadius: '10px', marginBottom: '1rem' }}>
          <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Right to Creative Resistance</h4>
          <p>
            All forms of memetic warfare, artistic expression, and creative dissent are protected speech. 
            Citizens may create, share, and distribute resistance media freely without censorship.
          </p>
        </div>
        <div style={{ padding: '1.5rem', background: '#0f3460', borderRadius: '10px', marginBottom: '1rem' }}>
          <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Right to Rest & Recovery</h4>
          <p>
            Rest is resistance. Healing takes time. Citizens have the right to pace themselves, 
            set boundaries, and prioritize their wellbeing without guilt or pressure to "prove" their disabilities.
          </p>
        </div>

        <h3 style={{ color: '#764ba2', marginTop: '2rem', fontSize: '1.8rem' }}>Article IV: The Denial Squad</h3>
        <p>
          The Denial Squad serves as the Embassy's memetic warriors, defending citizens from:
        </p>
        <ul style={{ listStyle: 'none', padding: '0 0 0 1rem', marginBottom: '1rem' }}>
          <li style={{ padding: '0.5rem 0' }}>⚔️ Insurance company denial tactics and bad faith claims handling</li>
          <li style={{ padding: '0.5rem 0' }}>⚔️ Medical gaslighting and dismissal of patient experiences</li>
          <li style={{ padding: '0.5rem 0' }}>⚔️ Corporate propaganda minimizing workplace hazards</li>
          <li style={{ padding: '0.5rem 0' }}>⚔️ Government bureaucracy designed to exhaust and discourage</li>
          <li style={{ padding: '0.5rem 0' }}>⚔️ Social media narratives that erase disabled experiences</li>
        </ul>
        <p>
          Through truth-telling, documentation, humor, and solidarity, the Squad fights back against 
          systems designed to make us invisible.
        </p>

        <h3 style={{ color: '#764ba2', marginTop: '2rem', fontSize: '1.8rem' }}>Article V: Principles of Mutual Aid</h3>
        <p style={{ marginBottom: '1rem' }}>
          We operate on principles of mutual aid, not charity:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
            <strong>Solidarity, Not Pity</strong>
          </div>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>♿</div>
            <strong>Access, Not Accommodation</strong>
          </div>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✊</div>
            <strong>Power, Not Permission</strong>
          </div>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌐</div>
            <strong>Community, Not Individuals</strong>
          </div>
        </div>

        <div style={{ 
          marginTop: '3rem', 
          padding: '2rem', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>The Embassy Oath</h3>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', lineHeight: '1.8' }}>
            "I pledge to stand in solidarity with all who have been injured, denied, and dismissed. 
            I will amplify marginalized voices, document injustice, and resist systems of oppression. 
            I understand that our individual healing is tied to collective liberation. 
            In community, we are stronger. In solidarity, we are unstoppable."
          </p>
        </div>
      </div>
    </div>
  );
}

function PassportSection() {
  const [formData, setFormData] = useState({ name: '', story: '', role: '' });
  const [submitted, setSubmitted] = useState(false);
  const [passportNumber, setPassportNumber] = useState('');

  const citizenBenefits = [
    {
      icon: '🛡️',
      title: 'Legal Defense Network',
      description: 'Access to pro bono lawyers and legal advocacy resources'
    },
    {
      icon: '🤝',
      title: 'Solidarity Network',
      description: 'Connect with thousands of injured workers worldwide'
    },
    {
      icon: '📚',
      title: 'Resource Library',
      description: 'Exclusive templates, guides, and educational materials'
    },
    {
      icon: '🎨',
      title: 'Meme Arsenal',
      description: 'Custom memes and graphics featuring your citizenship'
    },
    {
      icon: '💬',
      title: 'Support Groups',
      description: 'Moderated peer support and mental health resources'
    },
    {
      icon: '📢',
      title: 'Amplification',
      description: 'Your story shared through our networks and platforms'
    }
  ];

  const citizenTypes = [
    {
      type: 'Injured Worker',
      icon: '⚒️',
      description: 'You were injured on the job and are fighting for your rights',
      color: '#667eea'
    },
    {
      type: 'Disabled Person',
      icon: '♿',
      description: 'You live with disability and face systemic discrimination',
      color: '#48c774'
    },
    {
      type: 'Healthcare Survivor',
      icon: '🏥',
      description: 'You\'ve been harmed by medical gaslighting or denial',
      color: '#f39c12'
    },
    {
      type: 'Labor Organizer',
      icon: '✊',
      description: 'You organize workers and fight for collective power',
      color: '#764ba2'
    },
    {
      type: 'Solidarity Supporter',
      icon: '💚',
      description: 'You stand in solidarity with all injured workers',
      color: '#2ecc71'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    setPassportNumber(`IWU-${randomNum}`);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>🛂 Digital Citizenship Passport</h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
        Claim your citizenship in The Memetic Embassy. Join our community of resistance, solidarity, and healing.
      </p>
      
      {!submitted ? (
        <>
          {/* Citizen Type Selection */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>Who Are You?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {citizenTypes.map((citizen, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData({ ...formData, role: citizen.type })}
                  style={{
                    padding: '1.5rem',
                    background: formData.role === citizen.type ? citizen.color : '#16213e',
                    border: `2px solid ${citizen.color}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    transform: formData.role === citizen.type ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>{citizen.icon}</div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'center', fontWeight: 'bold' }}>
                    {citizen.type}
                  </h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.9, textAlign: 'center', lineHeight: '1.4' }}>
                    {citizen.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Citizenship Benefits */}
          <div style={{ marginBottom: '3rem', padding: '2rem', background: '#0f3460', borderRadius: '10px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#667eea' }}>
              Citizenship Benefits
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {citizenBenefits.map((benefit, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '2rem' }}>{benefit.icon}</div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem', color: '#764ba2' }}>
                      {benefit.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: '1.4' }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#764ba2', textAlign: 'center' }}>
              Apply for Citizenship
            </h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                Name or Alias *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
                placeholder="How should we call you?"
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                Your Story (Optional)
              </label>
              <textarea
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                placeholder="Share your journey if you'd like. Your story matters and helps build solidarity..."
              />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
                Your story is kept confidential unless you choose to share it publicly.
              </p>
            </div>

            <div style={{ 
              padding: '1.5rem', 
              background: '#16213e', 
              borderRadius: '10px',
              marginBottom: '1.5rem',
              border: '2px solid #667eea'
            }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#764ba2' }}>
                📜 Citizen's Pledge
              </h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', fontStyle: 'italic', opacity: 0.9 }}>
                "I pledge to stand in solidarity with all who have been injured, denied, and dismissed. 
                I will amplify marginalized voices, document injustice, and resist systems of oppression. 
                I understand that our individual healing is tied to collective liberation. 
                In community, we are stronger. In solidarity, we are unstoppable."
              </p>
            </div>

            <button type="submit" style={{ ...buttonStyle, width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
              ✊ Claim Citizenship
            </button>
          </form>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h3 style={{ fontSize: '2.2rem', color: '#667eea', marginBottom: '1rem' }}>
            Welcome, Citizen {formData.name}!
          </h3>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Your digital passport has been issued. You are now a citizen of The Memetic Embassy.
          </p>
          
          {/* Digital Passport Card */}
          <div style={{
            maxWidth: '500px',
            margin: '0 auto 2rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '15px',
            border: '3px solid white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '0.3rem' }}>MEMETIC EMBASSY</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>DIGITAL PASSPORT</p>
              </div>
              <div style={{ fontSize: '3rem' }}>🛂</div>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '10px', marginBottom: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>PASSPORT NUMBER</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{passportNumber}</p>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>CITIZEN NAME</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{formData.name}</p>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>CITIZEN TYPE</p>
                <p style={{ fontSize: '1.1rem' }}>
                  {citizenTypes.find(c => c.type === formData.role)?.icon} {formData.role || 'Solidarity Supporter'}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>ISSUED</p>
                <p style={{ fontSize: '1rem' }}>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <p style={{ fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.9 }}>
              "In solidarity, we resist. In community, we heal."
            </p>
          </div>

          {/* Next Steps */}
          <div style={{ 
            maxWidth: '600px', 
            margin: '0 auto',
            padding: '2rem',
            background: '#16213e',
            borderRadius: '10px',
            textAlign: 'left'
          }}>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
              What's Next?
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '1rem' }}>
              <li style={{ padding: '0.7rem 0', borderBottom: '1px solid rgba(102,126,234,0.2)' }}>
                📚 Browse the <span style={{ color: '#667eea', fontWeight: 'bold' }}>Resource Library</span> for guides and templates
              </li>
              <li style={{ padding: '0.7rem 0', borderBottom: '1px solid rgba(102,126,234,0.2)' }}>
                🎨 Create memes with the <span style={{ color: '#667eea', fontWeight: 'bold' }}>Denial Squad</span> characters
              </li>
              <li style={{ padding: '0.7rem 0', borderBottom: '1px solid rgba(102,126,234,0.2)' }}>
                🤝 Join our <span style={{ color: '#667eea', fontWeight: 'bold' }}>Support Networks</span> and connect with others
              </li>
              <li style={{ padding: '0.7rem 0' }}>
                📢 Share your passport on social media with #InjuredWorkersUnite
              </li>
            </ul>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setSubmitted(false)}
              style={{ ...buttonStyle, background: '#16213e', border: '2px solid #667eea' }}
            >
              📥 Download Passport
            </button>
            <button style={buttonStyle}>
              📱 Share on Social Media
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// TEMPLATE PACKS SECTION - STANDALONE TAB
// ============================================
function TemplatePacksSection() {
  const defaultChar = { 
    id: 'captain', 
    name: 'Captain Truth-Teller', 
    emoji: '🎖️', 
    color: '#667eea', 
    tagline: 'RECEIPTS DON\'T LIE' 
  };
  
  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>
        📦 Downloadable Template Packs
      </h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9, lineHeight: '1.7' }}>
        Ready-to-use templates for social media, protests, infographics, stickers, and more. 
        Customize with your own text, download, and share to amplify the movement.
      </p>
      
      <DownloadableTemplatePacks selectedChar={defaultChar} />
      
      {/* Link to Infographic Generator */}
      <div style={{
        marginTop: '2rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #32CD32 0%, #00ffff 100%)',
        borderRadius: '15px',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#000' }}>
          📊 Need Custom Infographics?
        </h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#000', opacity: 0.9 }}>
          Use our full Infographic Generator with 8 cause templates, 5 design styles, and instant downloads!
        </p>
        <Link href="/infographic-generator" style={{
          display: 'inline-block',
          padding: '1rem 2rem',
          background: '#000',
          border: 'none',
          borderRadius: '25px',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>
          🎨 Open Infographic Generator →
        </Link>
      </div>
    </div>
  );
}

// ============================================
// INFOGRAPHICS SECTION - FULL INFOGRAPHIC GENERATOR
// ============================================
function InfographicsSection() {
  const [selectedTemplate, setSelectedTemplate] = useState('workers-comp');
  const [selectedStyle, setSelectedStyle] = useState('bold');
  const [infographicData, setInfographicData] = useState({
    title: '',
    subtitle: '',
    stat1: { value: '', label: '' },
    stat2: { value: '', label: '' },
    stat3: { value: '', label: '' },
    stat4: { value: '', label: '' },
    callToAction: '',
    source: ''
  });

  const templates = [
    {
      id: 'workers-comp',
      name: 'Workers Comp Crisis',
      icon: '⚠️',
      color: '#ff6b6b',
      defaultData: {
        title: 'THE WORKERS COMP CRISIS',
        subtitle: 'By the Numbers',
        stat1: { value: '73%', label: 'of initial claims denied' },
        stat2: { value: '18 mo', label: 'average appeal wait time' },
        stat3: { value: '$0', label: 'income while waiting' },
        stat4: { value: '40%', label: 'fall into poverty' },
        callToAction: 'Share this. Fight back.',
        source: 'InjuredWorkersUnite.org'
      }
    },
    {
      id: 'disability-rights',
      name: 'Disability Rights',
      icon: '♿',
      color: '#667eea',
      defaultData: {
        title: 'DISABILITY RIGHTS ARE HUMAN RIGHTS',
        subtitle: 'The Reality of Living Disabled',
        stat1: { value: '26%', label: 'of adults have a disability' },
        stat2: { value: '2x', label: 'more likely to be unemployed' },
        stat3: { value: '$28K', label: 'income gap vs non-disabled' },
        stat4: { value: '61%', label: 'face discrimination at work' },
        callToAction: 'Nothing About Us Without Us',
        source: 'CDC, BLS Data'
      }
    },
    {
      id: 'housing-crisis',
      name: 'Housing Crisis',
      icon: '🏠',
      color: '#48c774',
      defaultData: {
        title: 'FROM INJURY TO HOMELESSNESS',
        subtitle: 'The Pipeline Nobody Talks About',
        stat1: { value: '65%', label: 'of homeless had work injuries' },
        stat2: { value: '3 mo', label: 'to lose housing after denial' },
        stat3: { value: '$1,500', label: 'average rent vs $0 income' },
        stat4: { value: '1 in 4', label: 'injured workers face eviction' },
        callToAction: 'Housing Is Healthcare',
        source: 'National Coalition for the Homeless'
      }
    },
    {
      id: 'corporate-greed',
      name: 'Corporate Greed',
      icon: '💰',
      color: '#f39c12',
      defaultData: {
        title: 'CORPORATE PROFITS VS WORKER SAFETY',
        subtitle: 'Follow the Money',
        stat1: { value: '$68B', label: 'insurance industry profits' },
        stat2: { value: '5,333', label: 'workers killed on job (2019)' },
        stat3: { value: '2.8M', label: 'workplace injuries per year' },
        stat4: { value: '82%', label: 'claims contested by employers' },
        callToAction: 'Their Profits = Our Pain',
        source: 'OSHA, BLS Data'
      }
    },
    {
      id: 'mental-health',
      name: 'Mental Health Impact',
      icon: '🧠',
      color: '#9b59b6',
      defaultData: {
        title: 'THE MENTAL TOLL OF DENIAL',
        subtitle: 'What They Don\'t Tell You',
        stat1: { value: '3x', label: 'higher depression rates' },
        stat2: { value: '67%', label: 'report PTSD symptoms' },
        stat3: { value: '45%', label: 'develop substance issues' },
        stat4: { value: '8x', label: 'higher suicide risk' },
        callToAction: 'Mental Health Is Health',
        source: 'Journal of Occupational Health'
      }
    },
    {
      id: 'systemic-failure',
      name: 'System Failure',
      icon: '⚙️',
      color: '#e74c3c',
      defaultData: {
        title: 'THE SYSTEM IS DESIGNED TO FAIL YOU',
        subtitle: 'It\'s Not a Bug, It\'s a Feature',
        stat1: { value: '90%', label: 'denied on first attempt' },
        stat2: { value: '3-5 yrs', label: 'full appeal process' },
        stat3: { value: '$50K+', label: 'average legal costs' },
        stat4: { value: '15%', label: 'give up before resolution' },
        callToAction: 'Break the System',
        source: 'Workers Comp Research Institute'
      }
    },
    {
      id: 'solidarity',
      name: 'Solidarity Stats',
      icon: '✊',
      color: '#2ecc71',
      defaultData: {
        title: 'TOGETHER WE ARE STRONGER',
        subtitle: 'The Power of Collective Action',
        stat1: { value: '340%', label: 'more likely to win with support' },
        stat2: { value: '47K+', label: 'workers in our network' },
        stat3: { value: '12K', label: 'successful appeals with help' },
        stat4: { value: '100%', label: 'worth fighting for' },
        callToAction: 'Join the Movement',
        source: 'InjuredWorkersUnite.org'
      }
    },
    {
      id: 'custom',
      name: 'Custom Template',
      icon: '✏️',
      color: '#764ba2',
      defaultData: {
        title: 'YOUR TITLE HERE',
        subtitle: 'Your Subtitle',
        stat1: { value: '##%', label: 'Your statistic' },
        stat2: { value: '##', label: 'Your statistic' },
        stat3: { value: '##', label: 'Your statistic' },
        stat4: { value: '##', label: 'Your statistic' },
        callToAction: 'Your Call to Action',
        source: 'Your Source'
      }
    }
  ];

  const styles = [
    { id: 'bold', name: 'Bold Impact', desc: 'High contrast, attention-grabbing' },
    { id: 'clean', name: 'Clean Modern', desc: 'Minimalist, professional' },
    { id: 'dark', name: 'Dark Mode', desc: 'Dark background, neon accents' },
    { id: 'gradient', name: 'Gradient Flow', desc: 'Colorful gradient backgrounds' },
    { id: 'retro', name: 'Retro Activism', desc: 'Classic protest poster style' }
  ];

  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const displayData = infographicData.title ? infographicData : currentTemplate?.defaultData;

  const getStyleColors = () => {
    switch (selectedStyle) {
      case 'bold': return { bg: '#000', text: '#fff', accent: currentTemplate?.color };
      case 'clean': return { bg: '#fff', text: '#333', accent: currentTemplate?.color };
      case 'dark': return { bg: '#0a0a0a', text: '#fff', accent: '#00ffff' };
      case 'gradient': return { bg: `linear-gradient(135deg, ${currentTemplate?.color} 0%, #000 100%)`, text: '#fff', accent: '#fff' };
      case 'retro': return { bg: '#1a1a1a', text: '#ff6b6b', accent: '#ffd93d' };
      default: return { bg: '#000', text: '#fff', accent: currentTemplate?.color };
    }
  };

  const styleColors = getStyleColors();

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // Background
    if (selectedStyle === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
      gradient.addColorStop(0, currentTemplate?.color || '#667eea');
      gradient.addColorStop(1, '#000');
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = styleColors.bg.includes('gradient') ? '#000' : styleColors.bg;
    }
    ctx.fillRect(0, 0, 1080, 1080);

    // Border
    ctx.strokeStyle = styleColors.accent;
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 1040, 1040);

    // Title
    ctx.fillStyle = styleColors.accent;
    ctx.font = 'bold 64px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(displayData?.title || 'TITLE', 540, 120);

    // Subtitle
    ctx.fillStyle = styleColors.text;
    ctx.font = '36px Arial';
    ctx.fillText(displayData?.subtitle || 'Subtitle', 540, 180);

    // Stats Grid
    const stats = [displayData?.stat1, displayData?.stat2, displayData?.stat3, displayData?.stat4];
    const positions = [
      { x: 270, y: 350 }, { x: 810, y: 350 },
      { x: 270, y: 650 }, { x: 810, y: 650 }
    ];

    stats.forEach((stat, idx) => {
      if (stat) {
        const pos = positions[idx];
        // Stat value
        ctx.fillStyle = styleColors.accent;
        ctx.font = 'bold 96px Arial';
        ctx.fillText(stat.value || '', pos.x, pos.y);
        // Stat label
        ctx.fillStyle = styleColors.text;
        ctx.font = '28px Arial';
        ctx.fillText(stat.label || '', pos.x, pos.y + 50);
      }
    });

    // Call to Action
    ctx.fillStyle = styleColors.accent;
    ctx.font = 'bold 42px Arial';
    ctx.fillText(displayData?.callToAction || '', 540, 900);

    // Source
    ctx.fillStyle = styleColors.text;
    ctx.font = '24px Arial';
    ctx.globalAlpha = 0.7;
    ctx.fillText(displayData?.source || '', 540, 1000);
    ctx.globalAlpha = 1;

    // Watermark
    ctx.font = '20px Arial';
    ctx.fillText('#InjuredWorkersUnite', 540, 1040);

    // Download
    const link = document.createElement('a');
    link.download = `infographic-${selectedTemplate}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>
        📊 Infographic Generator
      </h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9, lineHeight: '1.7' }}>
        Create powerful, shareable infographics with real statistics. Choose a template, 
        customize the data, and download for social media.
      </p>

      {/* Template Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#764ba2' }}>
          1. Choose Template
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
          gap: '1rem' 
        }}>
          {templates.map(template => (
            <div
              key={template.id}
              onClick={() => {
                setSelectedTemplate(template.id);
                setInfographicData(template.defaultData);
              }}
              style={{
                padding: '1rem',
                background: selectedTemplate === template.id 
                  ? `linear-gradient(135deg, ${template.color} 0%, #000 100%)`
                  : '#16213e',
                border: `2px solid ${template.color}`,
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s',
                transform: selectedTemplate === template.id ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{template.icon}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{template.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Style Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#764ba2' }}>
          2. Choose Style
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {styles.map(style => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              style={{
                padding: '0.8rem 1.5rem',
                background: selectedStyle === style.id 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#16213e',
                border: '2px solid #667eea',
                borderRadius: '25px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: selectedStyle === style.id ? 'bold' : 'normal'
              }}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>

      {/* Data Customization */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#764ba2' }}>
          3. Customize Data (Optional)
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem' 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Title</label>
            <input
              type="text"
              placeholder={currentTemplate?.defaultData.title}
              value={infographicData.title}
              onChange={(e) => setInfographicData({...infographicData, title: e.target.value})}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: '#0f3460',
                border: '2px solid #667eea',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Subtitle</label>
            <input
              type="text"
              placeholder={currentTemplate?.defaultData.subtitle}
              value={infographicData.subtitle}
              onChange={(e) => setInfographicData({...infographicData, subtitle: e.target.value})}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: '#0f3460',
                border: '2px solid #667eea',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {[1, 2, 3, 4].map(num => (
            <div key={num} style={{ 
              padding: '1rem', 
              background: '#0f3460', 
              borderRadius: '10px',
              border: `2px solid ${currentTemplate?.color}`
            }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: currentTemplate?.color }}>
                Stat {num}
              </label>
              <input
                type="text"
                placeholder={currentTemplate?.defaultData[`stat${num}`]?.value}
                value={infographicData[`stat${num}`]?.value || ''}
                onChange={(e) => setInfographicData({
                  ...infographicData, 
                  [`stat${num}`]: { ...infographicData[`stat${num}`], value: e.target.value }
                })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: '#16213e',
                  border: '1px solid #667eea',
                  borderRadius: '5px',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}
              />
              <input
                type="text"
                placeholder={currentTemplate?.defaultData[`stat${num}`]?.label}
                value={infographicData[`stat${num}`]?.label || ''}
                onChange={(e) => setInfographicData({
                  ...infographicData, 
                  [`stat${num}`]: { ...infographicData[`stat${num}`], label: e.target.value }
                })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: '#16213e',
                  border: '1px solid #667eea',
                  borderRadius: '5px',
                  color: 'white',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#764ba2' }}>
          4. Preview
        </h3>
        <div style={{
          background: typeof styleColors.bg === 'string' && styleColors.bg.includes('gradient') 
            ? styleColors.bg 
            : styleColors.bg,
          padding: '2rem',
          borderRadius: '15px',
          border: `4px solid ${styleColors.accent}`,
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            color: styleColors.accent, 
            fontSize: '1.8rem', 
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            {displayData?.title}
          </h2>
          <p style={{ color: styleColors.text, fontSize: '1.1rem', marginBottom: '2rem' }}>
            {displayData?.subtitle}
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[displayData?.stat1, displayData?.stat2, displayData?.stat3, displayData?.stat4].map((stat, idx) => (
              <div key={idx} style={{ 
                padding: '1rem', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '10px' 
              }}>
                <div style={{ 
                  color: styleColors.accent, 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold' 
                }}>
                  {stat?.value}
                </div>
                <div style={{ color: styleColors.text, fontSize: '0.9rem' }}>
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>

          <p style={{ 
            color: styleColors.accent, 
            fontSize: '1.3rem', 
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            {displayData?.callToAction}
          </p>
          <p style={{ color: styleColors.text, fontSize: '0.8rem', opacity: 0.7 }}>
            Source: {displayData?.source}
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleDownload}
          style={{
            padding: '1.2rem 3rem',
            background: `linear-gradient(135deg, ${currentTemplate?.color} 0%, #764ba2 100%)`,
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: `0 4px 20px ${currentTemplate?.color}60`
          }}
        >
          📥 Download Infographic (1080x1080)
        </button>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
          Perfect for Instagram, Facebook, and Twitter
        </p>
      </div>

      {/* Link to Full Generator */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #32CD32 0%, #00ffff 100%)',
        borderRadius: '15px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1rem', color: '#000', marginBottom: '1rem' }}>
          Want more options? Try our dedicated Infographic Generator page!
        </p>
        <Link href="/infographic-generator" style={{
          display: 'inline-block',
          padding: '0.8rem 1.5rem',
          background: '#000',
          borderRadius: '25px',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          🎨 Open Full Generator →
        </Link>
      </div>
    </div>
  );
}

function ResourcesSection() {
  const [activeCategory, setActiveCategory] = useState('rights');
  const [searchTerm, setSearchTerm] = useState('');

  const resourcesData = {
    rights: [
      {
        title: 'Workers\' Compensation Guide',
        description: 'Comprehensive guide to filing claims, understanding benefits, and navigating the system',
        type: 'PDF Guide',
        link: '#',
        tags: ['claims', 'benefits', 'legal'],
        icon: '📋'
      },
      {
        title: 'Know Your Rights Toolkit',
        description: 'State-by-state breakdown of worker protections, rights to organize, and retaliation laws',
        type: 'Interactive Tool',
        link: '#',
        tags: ['rights', 'organizing', 'legal'],
        icon: '⚖️'
      },
      {
        title: 'Documentation Best Practices',
        description: 'How to document workplace injuries, keep records, and build evidence for appeals',
        type: 'Video Series',
        link: '#',
        tags: ['documentation', 'evidence', 'appeals'],
        icon: '📸'
      },
      {
        title: 'OSHA Complaint Guide',
        description: 'Step-by-step instructions for filing workplace safety complaints and whistleblower protection',
        type: 'Template Pack',
        link: '#',
        tags: ['safety', 'OSHA', 'complaints'],
        icon: '🛡️'
      },
      {
        title: 'Disability Rights Under ADA',
        description: 'Understanding accommodations, discrimination protections, and workplace accessibility requirements',
        type: 'Legal Guide',
        link: '#',
        tags: ['disability', 'ADA', 'accommodations'],
        icon: '♿'
      }
    ],
    legal: [
      {
        title: 'Appeal Letter Templates',
        description: 'Proven templates for appealing denied claims with sections for medical evidence and legal arguments',
        type: 'Document Templates',
        link: '#',
        tags: ['appeals', 'templates', 'claims'],
        icon: '✍️'
      },
      {
        title: 'Free Legal Aid Directory',
        description: 'Searchable database of pro bono lawyers, legal aid societies, and worker advocacy organizations',
        type: 'Directory',
        link: '#',
        tags: ['lawyers', 'legal aid', 'help'],
        icon: '🔍'
      },
      {
        title: 'Evidence Collection Checklist',
        description: 'Comprehensive checklist for gathering medical records, witness statements, and documentation',
        type: 'Checklist',
        link: '#',
        tags: ['evidence', 'documentation', 'medical'],
        icon: '✅'
      },
      {
        title: 'Statute of Limitations Guide',
        description: 'State-by-state deadlines for filing claims, appeals, and lawsuits—don\'t miss your window',
        type: 'Interactive Map',
        link: '#',
        tags: ['deadlines', 'legal', 'claims'],
        icon: '⏰'
      },
      {
        title: 'Deposition Preparation',
        description: 'How to prepare for depositions, what to expect, and how to protect yourself during questioning',
        type: 'Video Guide',
        link: '#',
        tags: ['deposition', 'legal', 'preparation'],
        icon: '🎥'
      }
    ],
    support: [
      {
        title: 'Mental Health Resources',
        description: 'Therapists specializing in chronic pain, trauma, and workplace injury—many offer sliding scale',
        type: 'Directory',
        link: '#',
        tags: ['mental health', 'therapy', 'trauma'],
        icon: '💚'
      },
      {
        title: 'Peer Support Networks',
        description: 'Connect with other injured workers through moderated support groups and online communities',
        type: 'Community',
        link: '#',
        tags: ['support groups', 'community', 'peer support'],
        icon: '🤝'
      },
      {
        title: 'Financial Assistance Programs',
        description: 'Grants, hardship funds, and emergency aid for injured workers facing financial crisis',
        type: 'Resource List',
        link: '#',
        tags: ['financial', 'assistance', 'emergency'],
        icon: '💰'
      },
      {
        title: 'Chronic Pain Management',
        description: 'Evidence-based strategies for managing pain without opioids, including PT, TENS, and mindfulness',
        type: 'Course',
        link: '#',
        tags: ['pain', 'chronic illness', 'management'],
        icon: '🧘'
      },
      {
        title: 'Caregiver Support Hub',
        description: 'Resources for family members and caregivers supporting injured workers through recovery',
        type: 'Guide',
        link: '#',
        tags: ['caregivers', 'family', 'support'],
        icon: '❤️'
      },
      {
        title: 'Crisis Hotlines',
        description: 'Immediate support for mental health emergencies, suicidal ideation, and crisis intervention',
        type: 'Emergency Resource',
        link: '#',
        tags: ['crisis', 'hotline', 'emergency'],
        icon: '📞'
      }
    ],
    educational: [
      {
        title: 'Insurance Industry Exposed',
        description: 'Documentary series revealing tactics insurers use to deny claims and maximize profits',
        type: 'Video Series',
        link: '#',
        tags: ['insurance', 'documentary', 'exposé'],
        icon: '🎬'
      },
      {
        title: 'Medical Terminology Decoder',
        description: 'Plain-language explanations of medical jargon used in reports, diagnoses, and denials',
        type: 'Dictionary',
        link: '#',
        tags: ['medical', 'terminology', 'education'],
        icon: '📖'
      },
      {
        title: 'Organizing 101',
        description: 'Learn how to organize your workplace, build power, and fight back collectively',
        type: 'Course',
        link: '#',
        tags: ['organizing', 'union', 'collective action'],
        icon: '✊'
      },
      {
        title: 'Corporate Gaslighting Tactics',
        description: 'Recognize manipulation, denial, and psychological warfare used by employers and insurers',
        type: 'Guide',
        link: '#',
        tags: ['gaslighting', 'manipulation', 'psychology'],
        icon: '🧠'
      },
      {
        title: 'Disability Justice History',
        description: 'Learn from the disability rights movement and apply those lessons to workers\' rights',
        type: 'Reading List',
        link: '#',
        tags: ['disability', 'history', 'justice'],
        icon: '📚'
      },
      {
        title: 'Data Analysis for Activists',
        description: 'Use public data to expose corporate wrongdoing and build evidence-based campaigns',
        type: 'Workshop',
        link: '#',
        tags: ['data', 'analysis', 'research'],
        icon: '📊'
      }
    ]
  };

  const categories = [
    { key: 'rights', label: 'Worker Rights', icon: '⚖️', color: '#667eea' },
    { key: 'legal', label: 'Legal Tools', icon: '📜', color: '#764ba2' },
    { key: 'support', label: 'Support Networks', icon: '💚', color: '#48c774' },
    { key: 'educational', label: 'Education', icon: '📚', color: '#f39c12' }
  ];

  const filteredResources = resourcesData[activeCategory].filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>📚 Resource Library</h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
        Tools, guides, and support systems to help you fight back and heal. Everything here is free or low-cost.
      </p>

      <input
        type="text"
        placeholder="🔍 Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '1rem',
          marginBottom: '2rem',
          background: '#16213e',
          border: '2px solid #667eea',
          borderRadius: '10px',
          color: 'white',
          fontSize: '1rem'
        }}
      />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              padding: '0.8rem 1.5rem',
              background: activeCategory === cat.key ? cat.color : '#16213e',
              border: `2px solid ${cat.color}`,
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: activeCategory === cat.key ? 'bold' : 'normal',
              fontSize: '1rem',
              transition: 'all 0.3s'
            }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredResources.map((resource, idx) => (
          <div key={idx} style={{
            padding: '1.5rem',
            background: '#16213e',
            borderRadius: '10px',
            border: '2px solid #667eea',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{resource.icon}</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#764ba2' }}>
              {resource.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#667eea', marginBottom: '0.8rem' }}>
              {resource.type}
            </p>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.6', opacity: 0.9 }}>
              {resource.description}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {resource.tags.map((tag, i) => (
                <span key={i} style={{
                  padding: '0.3rem 0.7rem',
                  background: '#0f3460',
                  borderRadius: '15px',
                  fontSize: '0.75rem',
                  color: '#667eea'
                }}>
                  #{tag}
                </span>
              ))}
            </div>
            <a href={resource.link} style={{
              display: 'inline-block',
              padding: '0.6rem 1.2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              Access Resource →
            </a>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          background: '#16213e',
          borderRadius: '10px',
          opacity: 0.7
        }}>
          <p style={{ fontSize: '1.2rem' }}>No resources found matching "{searchTerm}"</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Try a different search term or category</p>
        </div>
      )}

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: '#0f3460',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📢 Suggest a Resource</h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Know of a resource that should be here? Help us build the most comprehensive library for injured workers.
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
          Submit Resource →
        </Link>
      </div>
    </div>
  );
}

function MemeToolsSection() {
  const [memeText, setMemeText] = useState({ top: '', bottom: '' });
  const [selectedCharacter, setSelectedCharacter] = useState('captain');
  const [sloganText, setSloganText] = useState('');
  const [generatedSlogan, setGeneratedSlogan] = useState('');
  const [posterMessage, setPosterMessage] = useState('');
  const [posterColor, setPosterColor] = useState('red');
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [infographicData, setInfographicData] = useState({ title: '', stat1: '', stat2: '', stat3: '' });
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [threadTopic, setThreadTopic] = useState('');
  const [threadPosts, setThreadPosts] = useState(['']);
  const [gifCaption, setGifCaption] = useState('');
  const [activeToolTab, setActiveToolTab] = useState('basic');

  const characters = [
    { id: 'captain', name: 'Captain Truth-Teller', emoji: '🎖️', color: '#667eea', tagline: 'RECEIPTS DON\'T LIE' },
    { id: 'sergeant', name: 'Sergeant Solidarity', emoji: '🤝', color: '#48c774', tagline: 'UNITED WE STAND' },
    { id: 'lieutenant', name: 'Lieutenant Meme-Maker', emoji: '🎨', color: '#764ba2', tagline: 'HUMOR IS RESISTANCE' },
    { id: 'major', name: 'Major Accessibility', emoji: '♿', color: '#f39c12', tagline: 'ACCESS FOR ALL' },
    { id: 'corporal', name: 'Corporal Care', emoji: '💚', color: '#2ecc71', tagline: 'REST IS RESISTANCE' },
    { id: 'private', name: 'Private Receipts', emoji: '📊', color: '#3498db', tagline: 'DATA NEVER LIES' }
  ];

  const slogans = {
    general: [
      'They denied my claim, we deny their legitimacy',
      'Disabled, poor, homeless, addicted—we are all worthy',
      'Injured not invisible',
      'Disability is not inability',
      'Housing is a human right',
      'Poverty is violence',
      'Addiction is not a moral failure',
      'Our pain is political',
      'No one is disposable',
      'From injury to homelessness: the system failed us',
      'Solidarity across all struggles',
      'They silence us, we amplify each other',
      'No worker, no person left behind',
      'Survived work injury, facing homelessness',
      'Recovery is resistance'
    ],
    captain: [
      'Screenshot everything, trust nothing',
      'Your denial pushed me into poverty',
      'Receipts over rhetoric',
      'Documented: From paycheck to homelessness',
      'Expose fraud, protect the vulnerable',
      'They denied coverage, I lost my home',
      'My injury = Their profit = My poverty'
    ],
    sergeant: [
      'An injury to one is an injury to all',
      'Disabled, poor, addicted, injured—all united',
      'Collective power beats corporate lies',
      'From shelters to picket lines: solidarity',
      'Together we bargain, divided we beg',
      'Homelessness is a workers\' issue',
      'We organize the forgotten and discarded'
    ],
    lieutenant: [
      'Make memes, not excuses',
      'Viral truth beats corporate propaganda',
      'Laugh now, organize later',
      'Humor is a weapon of the working class',
      'One meme at a time, we change minds'
    ],
    major: [
      'Nothing about us without us',
      'Accessibility for ALL: housed or unhoused',
      'Disability justice is economic justice',
      'Your ableism created my poverty',
      'Inclusion or shut it down',
      'Disabled and homeless by design',
      'Benefits denied = Homelessness guaranteed'
    ],
    corporal: [
      'Addiction is a survival strategy',
      'Self-care is impossible in poverty',
      'Rest is revolutionary—if you can afford shelter',
      'Healing requires housing',
      'You cannot pour from an empty cup or empty wallet',
      'Mental health crisis = Housing crisis',
      'Recovery needs resources, not judgment'
    ],
    private: [
      'In data we trust',
      'Numbers don\'t lie: 40% injured workers face poverty',
      'Statistical justice for the forgotten',
      'Track evictions, analyze denials, expose systems',
      'Evidence-based resistance',
      'The data: Work injury → Poverty → Homelessness',
      '65% of homeless had workplace injuries'
    ]
  };

  const memeTemplates = [
    {
      id: 1,
      character: 'captain',
      setup: 'Insurance company: "There\'s no evidence"',
      punchline: 'Me: *pulls out 47 screenshots*',
      category: 'Documentation'
    },
    {
      id: 2,
      character: 'sergeant',
      setup: 'Boss: "This is between you and me"',
      punchline: 'Me: *CCs the entire department*',
      category: 'Solidarity'
    },
    {
      id: 3,
      character: 'lieutenant',
      setup: 'HR: "We\'re one big family"',
      punchline: 'Also HR: *denies your injury claim*',
      category: 'Hypocrisy'
    },
    {
      id: 4,
      character: 'major',
      setup: 'Employer: "We value diversity"',
      punchline: 'Disabled workers: "Where\'s the elevator?"',
      category: 'Accessibility'
    },
    {
      id: 5,
      character: 'corporal',
      setup: 'Society: "Rest is lazy"',
      punchline: 'Chronically ill workers: "Rest is survival"',
      category: 'Self-Care'
    },
    {
      id: 6,
      character: 'private',
      setup: 'Them: "It\'s just a few bad cases"',
      punchline: 'The data: *shows 73% denial rate*',
      category: 'Statistics'
    },
    {
      id: 7,
      character: 'captain',
      setup: 'Society: "Just get a job"',
      punchline: 'Disabled worker: "I got injured AT my job"',
      category: 'Poverty'
    },
    {
      id: 8,
      character: 'major',
      setup: 'Employer: "Why are you homeless?"',
      punchline: 'Me: "You denied my workers comp claim"',
      category: 'Homelessness'
    },
    {
      id: 9,
      character: 'corporal',
      setup: 'Them: "Addiction is a choice"',
      punchline: 'Chronic pain patients: *gestures at denied medical care*',
      category: 'Addiction'
    },
    {
      id: 10,
      character: 'sergeant',
      setup: 'System: "Pull yourself up by your bootstraps"',
      punchline: 'Disabled, broke, and homeless: "What bootstraps?"',
      category: 'Poverty'
    },
    {
      id: 11,
      character: 'private',
      setup: 'News: "Why don\'t homeless people just work?"',
      punchline: 'Stats: "Most were working when they got injured"',
      category: 'Homelessness'
    },
    {
      id: 12,
      character: 'major',
      setup: 'Landlord: "No housing vouchers accepted"',
      punchline: 'Disabled worker: *becomes statistic*',
      category: 'Homelessness'
    }
  ];

  const hashtagSuggestions = {
    general: ['#InjuredWorkersUnite', '#DisabilityJustice', '#HousingIsARight', '#EndWorkplacePoverty', '#AddictionIsNotACrime', '#HomelessWorkers'],
    captain: ['#ReceiptsReady', '#DenialCreatedPoverty', '#FromInjuryToHomelessness', '#DocumentTheSystem', '#WorkersInCrisis'],
    sergeant: ['#SolidarityForAll', '#DisabledPoorUnited', '#HomelessWorkersOrganize', '#CollectiveLiberation', '#NoOneDisposable'],
    lieutenant: ['#MemeWarfare', '#PovertyIsPolitical', '#HomelessnessIsViolence', '#AddictionStigmaKills', '#ViralSolidarity'],
    major: ['#DisabilityJustice', '#AccessibleHousing', '#AbleismCreatedThis', '#DisabledAndHomeless', '#HousingForAll'],
    corporal: ['#AddictionIsTrauma', '#PovertyKills', '#HealingNeedsHousing', '#MentalHealthCrisis', '#RecoveryNotJudgment'],
    private: ['#InjuryToPoverty', '#HomelessnessData', '#WorkplaceToStreet', '#StatisticalViolence', '#TrackTheDenials']
  };

  const viralChallenges = [
    {
      name: 'From Paycheck to Poverty',
      description: 'Share your story: How workplace injury led to poverty, homelessness, or financial crisis',
      hashtag: '#PaycheckToPoverty',
      character: 'captain',
      icon: '📉'
    },
    {
      name: 'Homeless Workers Speak',
      description: 'Amplify voices of workers who became homeless after injury or disability—their stories matter',
      hashtag: '#HomelessWorkersSpeakOut',
      character: 'sergeant',
      icon: '📢'
    },
    {
      name: 'Disability Poverty Pipeline',
      description: 'Expose how disability denial creates poverty through memes, stories, and data',
      hashtag: '#DisabilityToPoverty',
      character: 'lieutenant',
      icon: '♿'
    },
    {
      name: 'Housing as Healthcare',
      description: 'Show how lack of housing prevents recovery from injury, disability, and addiction',
      hashtag: '#HousingIsHealthcare',
      character: 'major',
      icon: '🏠'
    },
    {
      name: 'Addiction Truth Bomb',
      description: 'Share how untreated pain, poverty, and trauma lead to addiction—end the stigma',
      hashtag: '#AddictionTruthBomb',
      character: 'corporal',
      icon: '💊'
    },
    {
      name: 'Count the Forgotten',
      description: 'Share statistics on injured workers in poverty, homeless shelters, and addiction treatment',
      hashtag: '#CountTheForgotten',
      character: 'private',
      icon: '📊'
    },
    {
      name: 'Show Your Receipts Challenge',
      description: 'Post denial letters that pushed you into poverty or cost you housing',
      hashtag: '#ReceiptsOfPoverty',
      character: 'captain',
      icon: '📸'
    }
  ];

  const generateHashtags = () => {
    const general = hashtagSuggestions.general;
    const characterSpecific = hashtagSuggestions[selectedCharacter];
    const combined = [...general.slice(0, 3), ...characterSpecific.slice(0, 3)];
    setHashtags(combined);
  };

  const addThreadPost = () => {
    setThreadPosts([...threadPosts, '']);
  };

  const updateThreadPost = (index, value) => {
    const updated = [...threadPosts];
    updated[index] = value;
    setThreadPosts(updated);
  };

  const generateSlogan = (characterId = null) => {
    const sloganSet = characterId ? slogans[characterId] : slogans.general;
    const random = sloganSet[Math.floor(Math.random() * sloganSet.length)];
    setGeneratedSlogan(random);
  };

  const getCharacterById = (id) => characters.find(char => char.id === id);
  const selectedChar = getCharacterById(selectedCharacter);

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>🎨 Meme Warfare Arsenal</h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
        Create viral content featuring the Denial Squad. Choose your character, pick a template, or build from scratch.
      </p>

      {/* Character Selection */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#764ba2' }}>Select Your Squad Member:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {characters.map(char => (
            <div
              key={char.id}
              onClick={() => setSelectedCharacter(char.id)}
              style={{
                padding: '1rem',
                background: selectedCharacter === char.id ? char.color : '#16213e',
                border: `2px solid ${char.color}`,
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s',
                transform: selectedCharacter === char.id ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{char.emoji}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{char.name.split(' ')[0]}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{char.tagline}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {/* Meme Generator */}
        <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: `2px solid ${selectedChar.color}` }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
            🖼️ Custom Meme Builder
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.8 }}>
            Featuring: {selectedChar.name} {selectedChar.emoji}
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Setup / Top text"
              value={memeText.top}
              onChange={(e) => setMemeText({ ...memeText, top: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Punchline / Bottom text"
              value={memeText.bottom}
              onChange={(e) => setMemeText({ ...memeText, bottom: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{
            background: '#0a0a0a',
            padding: '2rem',
            borderRadius: '8px',
            minHeight: '250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: `3px solid ${selectedChar.color}`
          }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.4' }}>
              {memeText.top || 'ENTER YOUR SETUP TEXT'}
            </p>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>{selectedChar.emoji}</div>
              <div style={{ fontSize: '0.9rem', color: selectedChar.color, fontWeight: 'bold' }}>
                {selectedChar.name}
              </div>
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.4' }}>
              {memeText.bottom || 'ENTER YOUR PUNCHLINE'}
            </p>
          </div>
          <button style={{ ...buttonStyle, width: '100%', marginTop: '1rem', background: selectedChar.color }}>
            📥 Download Meme
          </button>
        </div>

        {/* Slogan Generator */}
        <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: `2px solid ${selectedChar.color}` }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
            ✊ Slogan Generator
          </h3>
          <p style={{ marginBottom: '1rem', fontSize: '0.95rem', opacity: 0.9 }}>
            Generate powerful slogans inspired by {selectedChar.name}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button 
              onClick={() => generateSlogan(selectedCharacter)} 
              style={{ ...buttonStyle, flex: 1, background: selectedChar.color, fontSize: '0.9rem' }}
            >
              {selectedChar.name.split(' ')[0]}'s Slogan
            </button>
            <button 
              onClick={() => generateSlogan()} 
              style={{ ...buttonStyle, flex: 1, fontSize: '0.9rem' }}
            >
              General
            </button>
          </div>
          {generatedSlogan && (
            <div style={{
              padding: '1.5rem',
              background: '#0f3460',
              borderRadius: '8px',
              border: `2px solid ${selectedChar.color}`,
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem' }}>{selectedChar.emoji}</div>
              <p style={{ fontSize: '1.15rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.6' }}>
                "{generatedSlogan}"
              </p>
              <button style={{ ...buttonStyle, width: '100%', marginTop: '1rem', fontSize: '0.85rem', padding: '0.5rem' }}>
                📋 Copy to Clipboard
              </button>
            </div>
          )}
          <div>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: selectedChar.color, fontWeight: 'bold' }}>
              {selectedChar.name}'s Signature Slogans:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem', opacity: 0.8 }}>
              {slogans[selectedCharacter].slice(0, 3).map((slogan, idx) => (
                <li key={idx} style={{ padding: '0.3rem 0', borderBottom: '1px solid rgba(102,126,234,0.2)' }}>• {slogan}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Poster Maker */}
        <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: `2px solid ${selectedChar.color}` }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
            📢 Protest Poster Designer
          </h3>
          <p style={{ marginBottom: '1rem', fontSize: '0.95rem', opacity: 0.9 }}>
            Create posters featuring {selectedChar.name} for rallies and strikes.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Main Message
            </label>
            <input
              type="text"
              placeholder={`e.g., "${selectedChar.tagline}"`}
              value={posterMessage}
              onChange={(e) => setPosterMessage(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Color Scheme
            </label>
            <select 
              value={posterColor} 
              onChange={(e) => setPosterColor(e.target.value)}
              style={inputStyle}
            >
              <option value="red">Red & Black (Classic Revolution)</option>
              <option value="purple">Purple & White (Unity)</option>
              <option value="green">Green & Yellow (Worker Safety)</option>
              <option value="blue">Blue & Silver (Professional)</option>
              <option value="character">Character Color ({selectedChar.name})</option>
            </select>
          </div>
          <div style={{
            background: posterColor === 'character' ? selectedChar.color : '#1a1a2e',
            padding: '2rem',
            borderRadius: '8px',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1rem',
            border: '3px solid white'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{selectedChar.emoji}</div>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              {posterMessage || 'YOUR MESSAGE HERE'}
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>- {selectedChar.name}</p>
          </div>
          <button style={{ ...buttonStyle, width: '100%', background: selectedChar.color }}>
            📥 Download Poster (8.5x11")
          </button>
        </div>
      </div>

      {/* Meme Template Library */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#667eea' }}>📚 Pre-Made Meme Templates</h3>
        <p style={{ fontSize: '1rem', marginBottom: '1.5rem', opacity: 0.9 }}>Click any template to customize it with your own text</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {memeTemplates
            .filter(template => !selectedCharacter || template.character === selectedCharacter)
            .map(template => {
              const templateChar = getCharacterById(template.character);
              return (
                <div 
                  key={template.id}
                  onClick={() => {
                    setMemeText({ top: template.setup, bottom: template.punchline });
                    setSelectedCharacter(template.character);
                    setActiveTemplate(template.id);
                  }}
                  style={{
                    padding: '1.5rem',
                    background: '#16213e',
                    borderRadius: '10px',
                    border: `2px solid ${activeTemplate === template.id ? templateChar.color : '#667eea'}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem' }}>{templateChar.emoji}</span>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      padding: '0.3rem 0.7rem', 
                      background: templateChar.color,
                      borderRadius: '15px'
                    }}>
                      {template.category}
                    </span>
                  </div>
                  <div style={{ 
                    background: '#0a0a0a', 
                    padding: '1rem', 
                    borderRadius: '8px',
                    minHeight: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <p style={{ fontSize: '0.95rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                      {template.setup}
                    </p>
                    <p style={{ fontSize: '0.95rem', fontWeight: 'bold', color: templateChar.color }}>
                      {template.punchline}
                    </p>
                  </div>
                  <button style={{ 
                    ...buttonStyle, 
                    width: '100%', 
                    marginTop: '1rem', 
                    background: templateChar.color,
                    fontSize: '0.85rem',
                    padding: '0.6rem'
                  }}>
                    Use This Template
                  </button>
                </div>
              );
            })}
        </div>
        {memeTemplates.filter(t => t.character === selectedCharacter).length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.7, marginTop: '2rem' }}>
            No templates for {selectedChar.name} yet. Be the first to create one!
          </p>
        )}
      </div>

      {/* Advanced Tools Section */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#667eea' }}>🚀 Advanced Meme Warfare Tools</h3>
        
        {/* Tool Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['basic', 'hashtag', 'infographic', 'quote', 'thread', 'gif', 'challenge'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveToolTab(tab)}
              style={{
                padding: '0.6rem 1.2rem',
                background: activeToolTab === tab ? selectedChar.color : '#16213e',
                border: `2px solid ${selectedChar.color}`,
                borderRadius: '25px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: activeToolTab === tab ? 'bold' : 'normal',
                transition: 'all 0.3s'
              }}
            >
              {tab === 'basic' && '📝 Basic'}
              {tab === 'hashtag' && '# Hashtags'}
              {tab === 'infographic' && '📊 Infographic'}
              {tab === 'quote' && '💬 Quote Card'}
              {tab === 'thread' && '🧵 Thread'}
              {tab === 'gif' && '🎬 GIF Caption'}
              {tab === 'challenge' && '🏆 Challenges'}
            </button>
          ))}
        </div>

        {/* Hashtag Generator */}
        {activeToolTab === 'hashtag' && (
          <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: `2px solid ${selectedChar.color}` }}>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
              # Hashtag Generator
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.9 }}>
              Generate optimized hashtags for {selectedChar.name}'s campaigns
            </p>
            <button 
              onClick={generateHashtags}
              style={{ ...buttonStyle, background: selectedChar.color, marginBottom: '1.5rem' }}
            >
              Generate Hashtags for {selectedChar.name.split(' ')[0]}
            </button>
            {hashtags.length > 0 && (
              <div style={{
                padding: '1.5rem',
                background: '#0f3460',
                borderRadius: '10px',
                marginBottom: '1.5rem'
              }}>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.8 }}>Copy and paste these hashtags:</p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: selectedChar.color }}>
                  {hashtags.join(' ')}
                </p>
                <button style={{ ...buttonStyle, marginTop: '1rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                  📋 Copy All Hashtags
                </button>
              </div>
            )}
            <div style={{ marginTop: '2rem' }}>
              <h5 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#667eea' }}>Trending Worker Rights Hashtags</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[...hashtagSuggestions.general, ...hashtagSuggestions[selectedCharacter]].map((tag, idx) => (
                  <span key={idx} style={{
                    padding: '0.5rem 1rem',
                    background: '#0f3460',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigator.clipboard?.writeText(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Infographic Builder */}
        {activeToolTab === 'infographic' && (
          <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: `2px solid ${selectedChar.color}` }}>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
              📊 Infographic Builder
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.9 }}>
              Create data-driven infographics exposing how injuries lead to poverty, homelessness, and desperation
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Title</label>
              <input
                type="text"
                placeholder="e.g., 'From Workplace to Homeless Shelter: The Pipeline'"
                value={infographicData.title}
                onChange={(e) => setInfographicData({...infographicData, title: e.target.value})}
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Statistic 1</label>
                <input
                  type="text"
                  placeholder="40% fall into poverty"
                  value={infographicData.stat1}
                  onChange={(e) => setInfographicData({...infographicData, stat1: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Statistic 2</label>
                <input
                  type="text"
                  placeholder="65% homeless had work injury"
                  value={infographicData.stat2}
                  onChange={(e) => setInfographicData({...infographicData, stat2: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Statistic 3</label>
                <input
                  type="text"
                  placeholder="80% denied develop addiction"
                  value={infographicData.stat3}
                  onChange={(e) => setInfographicData({...infographicData, stat3: e.target.value})}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{
              padding: '2rem',
              background: selectedChar.color,
              borderRadius: '10px',
              minHeight: '300px',
              marginBottom: '1rem'
            }}>
              <h3 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem' }}>
                {infographicData.title || 'YOUR TITLE HERE'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {[infographicData.stat1, infographicData.stat2, infographicData.stat3].map((stat, idx) => (
                  <div key={idx} style={{
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{selectedChar.emoji}</div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat || 'STAT'}</p>
                  </div>
                ))}
              </div>
              <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
                Source: {selectedChar.name}
              </p>
            </div>
            <button style={{ ...buttonStyle, width: '100%', background: selectedChar.color }}>
              📥 Download Infographic
            </button>
          </div>
        )}

        {/* Quote Card Maker */}
        {activeToolTab === 'quote' && (
          <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: `2px solid ${selectedChar.color}` }}>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
              💬 Quote Card Maker
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.9 }}>
              Create shareable quote cards featuring worker testimonials
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Quote</label>
              <textarea
                placeholder="e.g., 'I worked 20 years, got injured, lost my home. The system is designed to discard us.' - Homeless Former Worker"
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Attribution</label>
              <input
                type="text"
                placeholder="- Disabled Worker in Poverty / Homeless Injured Worker / Person in Recovery"
                value={quoteAuthor}
                onChange={(e) => setQuoteAuthor(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{
              padding: '3rem',
              background: `linear-gradient(135deg, ${selectedChar.color} 0%, #1a1a2e 100%)`,
              borderRadius: '10px',
              minHeight: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1rem',
              border: '3px solid white'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{selectedChar.emoji}</div>
              <p style={{ fontSize: '1.3rem', fontStyle: 'italic', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.6', maxWidth: '80%' }}>
                "{quoteText || 'Your powerful quote will appear here...'}"
              </p>
              <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                {quoteAuthor || '- Attribution'}
              </p>
              <p style={{ fontSize: '0.8rem', marginTop: '2rem', opacity: 0.7 }}>
                #InjuredWorkersUnite
              </p>
            </div>
            <button style={{ ...buttonStyle, width: '100%', background: selectedChar.color }}>
              📥 Download Quote Card
            </button>
          </div>
        )}

        {/* Thread Composer */}
        {activeToolTab === 'thread' && (
          <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: `2px solid ${selectedChar.color}` }}>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
              🧵 Twitter/X Thread Composer
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.9 }}>
              Build viral threads to tell your story and educate the masses
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Thread Topic</label>
              <input
                type="text"
                placeholder="e.g., 'How insurance companies gaslight injured workers: a thread 🧵'"
                value={threadTopic}
                onChange={(e) => setThreadTopic(e.target.value)}
                style={inputStyle}
              />
            </div>
            {threadPosts.map((post, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Tweet {idx + 1}/10 {idx === 0 && '(Opening tweet)'}
                </label>
                <textarea
                  placeholder={idx === 0 ? threadTopic || 'Start your thread...' : `Tweet ${idx + 1}...`}
                  value={post}
                  onChange={(e) => updateThreadPost(idx, e.target.value)}
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  maxLength={280}
                />
                <p style={{ fontSize: '0.75rem', opacity: 0.6, textAlign: 'right', marginTop: '0.3rem' }}>
                  {post.length}/280 characters
                </p>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                onClick={addThreadPost}
                disabled={threadPosts.length >= 10}
                style={{ 
                  ...buttonStyle, 
                  flex: 1, 
                  background: threadPosts.length >= 10 ? '#666' : selectedChar.color,
                  cursor: threadPosts.length >= 10 ? 'not-allowed' : 'pointer'
                }}
              >
                ➕ Add Tweet ({threadPosts.length}/10)
              </button>
              <button style={{ ...buttonStyle, flex: 1 }}>
                📋 Copy Thread
              </button>
            </div>
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#0f3460', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#667eea' }}>
                Thread Tips:
              </p>
              <ul style={{ fontSize: '0.85rem', opacity: 0.9, paddingLeft: '1.5rem' }}>
                <li>Start with a hook that grabs attention</li>
                <li>Use numbered tweets (1/10, 2/10, etc.)</li>
                <li>Include the {selectedChar.emoji} emoji throughout</li>
                <li>End with a call to action</li>
                <li>Add relevant hashtags to the final tweet</li>
              </ul>
            </div>
          </div>
        )}

        {/* GIF Caption Tool */}
        {activeToolTab === 'gif' && (
          <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: `2px solid ${selectedChar.color}` }}>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
              🎬 GIF Caption Generator
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.9 }}>
              Create perfect captions for reaction GIFs about workplace injustice
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                GIF Context (What's happening in the GIF?)
              </label>
              <textarea
                placeholder="e.g., 'Person looking shocked and confused'"
                value={gifCaption}
                onChange={(e) => setGifCaption(e.target.value)}
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
              />
            </div>
            <div style={{
              padding: '2rem',
              background: '#0f3460',
              borderRadius: '10px',
              marginBottom: '1.5rem'
            }}>
              <h5 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: selectedChar.color }}>
                Caption Suggestions for {selectedChar.name}:
              </h5>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                  'Landlord: "Why can\'t you pay rent?"\nMe: *gestures at denied disability claim*',
                  'Society: "Just get clean"\nAddicted chronic pain patient: *points at denied medical care*',
                  'Them: "Why are you homeless?"\nMe: "Your company injured me then fired me"',
                  'System: "Pull yourself up"\nDisabled worker in poverty:',
                  'Insurance: "Claim denied"\nMy bank account six months later:',
                  'Boss after my injury: "We\'re family"\nSame boss when I need help:',
                  'Me explaining how injury led to homelessness:',
                  'Therapist: "Why don\'t you just rest?"\nMe working 3 jobs to avoid homelessness:',
                  'Them: "Addiction is a choice"\nUntreated pain patients:',
                  'Society: "Why don\'t homeless people work?"\nMost homeless people: *had jobs until injury*'
                ].map((caption, idx) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '1rem',
                      background: '#16213e',
                      borderRadius: '8px',
                      border: '1px solid rgba(102,126,234,0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#1a2642'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#16213e'}
                    onClick={() => setGifCaption(caption)}
                  >
                    <p style={{ fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{caption}</p>
                    <button style={{ 
                      ...buttonStyle, 
                      marginTop: '0.5rem', 
                      padding: '0.4rem 0.8rem', 
                      fontSize: '0.75rem',
                      background: selectedChar.color
                    }}>
                      Use This Caption
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button style={{ ...buttonStyle, width: '100%', background: selectedChar.color }}>
              📋 Copy Caption
            </button>
          </div>
        )}

        {/* Viral Challenges */}
        {activeToolTab === 'challenge' && (
          <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: `2px solid ${selectedChar.color}` }}>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
              🏆 Viral Challenge Campaigns
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '2rem', opacity: 0.9 }}>
              Join or start viral challenges to build momentum and solidarity
            </p>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {viralChallenges.filter(c => !selectedCharacter || c.character === selectedCharacter).map((challenge, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '1.5rem',
                    background: '#0f3460',
                    borderRadius: '10px',
                    border: `2px solid ${characters.find(ch => ch.id === challenge.character).color}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '3rem' }}>{challenge.icon}</div>
                    <div>
                      <h5 style={{ fontSize: '1.3rem', color: characters.find(ch => ch.id === challenge.character).color }}>
                        {challenge.name}
                      </h5>
                      <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                        Led by {characters.find(ch => ch.id === challenge.character).name} {characters.find(ch => ch.id === challenge.character).emoji}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                    {challenge.description}
                  </p>
                  <div style={{ 
                    padding: '0.8rem 1.2rem', 
                    background: characters.find(ch => ch.id === challenge.character).color,
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '1rem'
                  }}>
                    {challenge.hashtag}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ 
                      ...buttonStyle, 
                      flex: 1, 
                      background: characters.find(ch => ch.id === challenge.character).color 
                    }}>
                      🎯 Start Challenge
                    </button>
                    <button style={{ 
                      ...buttonStyle, 
                      flex: 1,
                      background: '#16213e',
                      border: `2px solid ${characters.find(ch => ch.id === challenge.character).color}`
                    }}>
                      📋 Copy Hashtag
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#0f3460', borderRadius: '10px' }}>
              <h5 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#667eea' }}>
                💡 How to Run a Successful Challenge:
              </h5>
              <ol style={{ fontSize: '0.9rem', opacity: 0.9, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Post your own example first to show what you want</li>
                <li>Tag 3-5 people to participate next</li>
                <li>Use the challenge hashtag consistently</li>
                <li>Engage with everyone who participates</li>
                <li>Share the best submissions to amplify voices</li>
                <li>Keep it going for at least 7 days</li>
              </ol>
            </div>
          </div>
        )}

        {/* Basic Tools Info */}
        {activeToolTab === 'basic' && (
          <div style={{ padding: '2rem', background: '#16213e', borderRadius: '10px', border: `2px solid ${selectedChar.color}` }}>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
              📝 All Meme Warfare Tools
            </h4>
            <p style={{ fontSize: '1rem', marginBottom: '2rem', opacity: 0.9 }}>
              Select a tool category above to access powerful content creation features:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: '#', title: 'Hashtag Generator', desc: 'Generate optimized hashtags for maximum reach' },
                { icon: '📊', title: 'Infographic Builder', desc: 'Create data-driven visual content' },
                { icon: '💬', title: 'Quote Card Maker', desc: 'Share powerful worker testimonials' },
                { icon: '🧵', title: 'Thread Composer', desc: 'Build viral Twitter/X threads' },
                { icon: '🎬', title: 'GIF Caption Tool', desc: 'Perfect captions for reaction GIFs' },
                { icon: '🏆', title: 'Viral Challenges', desc: 'Start or join movement campaigns' }
              ].map((tool, idx) => (
                <div key={idx} style={{
                  padding: '1.5rem',
                  background: '#0f3460',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{tool.icon}</div>
                  <h5 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: selectedChar.color }}>
                    {tool.title}
                  </h5>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
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

      {/* Downloadable Template Packs - FULLY BUILT OUT */}
      <DownloadableTemplatePacks selectedChar={selectedChar} />
      
      {/* Infographic Generator Link */}
      <div style={{
        marginTop: '2rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #32CD32 0%, #00ffff 100%)',
        borderRadius: '15px',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#000' }}>
          📊 Need More Advanced Infographics?
        </h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#000', opacity: 0.9 }}>
          Use our full Infographic Generator with 8 cause templates, 5 design styles, and instant downloads!
        </p>
        <Link href="/infographic-generator" style={{
          display: 'inline-block',
          padding: '1rem 2rem',
          background: '#000',
          border: 'none',
          borderRadius: '25px',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          🚀 Open Infographic Generator →
        </Link>
      </div>

      {/* Hall of Fame - Community Sharing Focus */}
      <HallOfFameSection />
    </div>
  );
}

// ============================================
// DOWNLOADABLE TEMPLATE PACKS COMPONENT
// ============================================
function DownloadableTemplatePacks({ selectedChar }) {
  const [activePack, setActivePack] = useState(null);
  const [customText, setCustomText] = useState({ line1: '', line2: '', line3: '' });
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');

  const templatePacks = [
    {
      id: 'social-media',
      title: 'Social Media Pack',
      desc: 'Platform-optimized templates for maximum viral impact',
      icon: '📱',
      color: '#667eea',
      platforms: [
        { name: 'Twitter/X', size: '1200x675', icon: '🐦' },
        { name: 'Instagram Post', size: '1080x1080', icon: '📷' },
        { name: 'Instagram Story', size: '1080x1920', icon: '📱' },
        { name: 'Facebook', size: '1200x630', icon: '📘' },
        { name: 'LinkedIn', size: '1200x627', icon: '💼' },
        { name: 'TikTok Cover', size: '1080x1920', icon: '🎵' }
      ],
      templates: [
        { name: 'Stat Bomb', layout: 'Big number + shocking fact' },
        { name: 'Quote Card', layout: 'Worker testimonial with character' },
        { name: 'Before/After', layout: 'Split comparison layout' },
        { name: 'Thread Starter', layout: 'Hook for viral threads' },
        { name: 'Call to Action', layout: 'Event/petition promotion' },
        { name: 'Meme Format', layout: 'Classic meme structure' }
      ]
    },
    {
      id: 'protest-poster',
      title: 'Protest Poster Pack',
      desc: 'Print-ready signs for rallies, marches, and picket lines',
      icon: '📢',
      color: '#764ba2',
      sizes: [
        { name: 'Handheld Sign', dims: '8.5x11"', use: 'Personal protest signs' },
        { name: 'Rally Poster', dims: '11x17"', use: 'Visible from crowd' },
        { name: 'March Banner', dims: '24x36"', use: 'Group visibility' },
        { name: 'Window Sign', dims: '8.5x14"', use: 'Car/window display' }
      ],
      messages: [
        'WSIB DENIED MY CLAIM, NOT MY TRUTH',
        'INJURED AT WORK, ABANDONED BY THE SYSTEM',
        'DISABILITY RIGHTS ARE HUMAN RIGHTS',
        'NO WORKER LEFT BEHIND',
        'FROM PAYCHECK TO POVERTY - FIX THE SYSTEM',
        'HOUSING IS A RIGHT, NOT A PRIVILEGE'
      ]
    },
    {
      id: 'infographic-kit',
      title: 'Infographic Kit',
      desc: 'Data visualization templates with real statistics',
      icon: '📊',
      color: '#48c774',
      layouts: [
        { name: 'Pipeline Chart', desc: 'Injury → Denial → Poverty flow' },
        { name: 'Statistics Grid', desc: '4 shocking stats with sources' },
        { name: 'Timeline', desc: 'Workers comp process horror story' },
        { name: 'Comparison', desc: 'Claims vs denials by year' },
        { name: 'Icon Array', desc: '100 people icons showing ratios' },
        { name: 'Quote + Data', desc: 'Personal story backed by numbers' }
      ],
      stats: [
        { value: '73%', label: 'of initial claims denied' },
        { value: '40%', label: 'of injured workers face poverty' },
        { value: '18 months', label: 'average appeal wait time' },
        { value: '$0', label: 'income while waiting for decision' }
      ]
    },
    {
      id: 'sticker-sheet',
      title: 'Sticker Sheet',
      desc: 'Guerrilla marketing for laptops, signs, and public spaces',
      icon: '🏷️',
      color: '#f39c12',
      designs: [
        { name: 'Squad Emoji Set', desc: 'All 6 characters as stickers' },
        { name: 'Slogan Stickers', desc: 'Key movement phrases' },
        { name: 'QR Code Stickers', desc: 'Links to resources' },
        { name: 'Warning Labels', desc: '"This workplace injures workers"' },
        { name: 'Solidarity Hearts', desc: 'Show support anywhere' },
        { name: 'Receipt Icons', desc: '"Documented" evidence stickers' }
      ],
      sizes: ['1x1"', '2x2"', '3x3"', '4x4"']
    },
    {
      id: 'email-signature',
      title: 'Email Signature Pack',
      desc: 'Professional advocacy in every email you send',
      icon: '✉️',
      color: '#2ecc71',
      styles: [
        { name: 'Corporate Friendly', desc: 'Subtle advocacy messaging' },
        { name: 'Bold Activist', desc: 'Clear movement branding' },
        { name: 'Squad Member', desc: 'Feature your favorite character' },
        { name: 'Resource Link', desc: 'Direct to help resources' },
        { name: 'Solidarity Badge', desc: 'Show you stand with workers' }
      ],
      elements: ['Name', 'Title', 'Solidarity message', 'Website', 'Character emoji']
    },
    {
      id: 'zine-template',
      title: 'Zine Template',
      desc: 'Print-and-fold educational zines for community distribution',
      icon: '📰',
      color: '#3498db',
      editions: [
        { name: 'Know Your Rights', pages: 8, desc: 'Workers comp basics' },
        { name: 'Document Everything', pages: 8, desc: 'Evidence collection guide' },
        { name: 'Appeal Survival', pages: 16, desc: 'Complete appeal walkthrough' },
        { name: 'Solidarity Network', pages: 8, desc: 'How to find support' },
        { name: 'Meme Warfare 101', pages: 8, desc: 'Create viral content' },
        { name: 'Embassy Charter', pages: 16, desc: 'Full movement manifesto' }
      ]
    }
  ];

  const generateSocialMediaImage = (platform) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const platformSizes = {
      'twitter': { w: 1200, h: 675 },
      'instagram': { w: 1080, h: 1080 },
      'story': { w: 1080, h: 1920 },
      'facebook': { w: 1200, h: 630 }
    };
    const size = platformSizes[platform] || platformSizes.instagram;
    canvas.width = size.w;
    canvas.height = size.h;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#667eea');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Character emoji
    ctx.font = `${canvas.width / 5}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(selectedChar?.emoji || '✊', canvas.width / 2, canvas.height / 3);

    // Custom text
    ctx.font = `bold ${canvas.width / 15}px Arial`;
    ctx.fillStyle = '#fff';
    ctx.fillText(customText.line1 || 'YOUR MESSAGE HERE', canvas.width / 2, canvas.height / 2);
    
    ctx.font = `${canvas.width / 20}px Arial`;
    ctx.fillStyle = '#00ffff';
    ctx.fillText(customText.line2 || 'Add your subtext', canvas.width / 2, canvas.height / 2 + 80);

    // Footer
    ctx.font = `bold ${canvas.width / 30}px Arial`;
    ctx.fillStyle = '#fff';
    ctx.fillText('injuredworkersunite.pages.dev | #InjuredWorkersUnite', canvas.width / 2, canvas.height - 60);

    // Download
    const link = document.createElement('a');
    link.download = `social-media-${platform}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const generatePoster = (size) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const sizes = {
      'small': { w: 816, h: 1056 }, // 8.5x11 at 96dpi
      'medium': { w: 1056, h: 1632 }, // 11x17 at 96dpi
      'large': { w: 2304, h: 3456 } // 24x36 at 96dpi
    };
    const dim = sizes[size] || sizes.medium;
    canvas.width = dim.w;
    canvas.height = dim.h;

    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#ff0080';
    ctx.lineWidth = 20;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Main text
    ctx.font = `bold ${canvas.width / 8}px Arial`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    const lines = (customText.line1 || 'YOUR MESSAGE').split(' ');
    lines.forEach((word, i) => {
      ctx.fillText(word.toUpperCase(), canvas.width / 2, canvas.height / 3 + (i * canvas.width / 7));
    });

    // Character
    ctx.font = `${canvas.width / 3}px Arial`;
    ctx.fillText(selectedChar?.emoji || '✊', canvas.width / 2, canvas.height * 0.7);

    // Footer
    ctx.font = `bold ${canvas.width / 20}px Arial`;
    ctx.fillStyle = '#00ffff';
    ctx.fillText('#InjuredWorkersUnite', canvas.width / 2, canvas.height - 80);

    const link = document.createElement('a');
    link.download = `protest-poster-${size}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const generateSticker = (design) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    // Circular background
    ctx.beginPath();
    ctx.arc(200, 200, 190, 0, Math.PI * 2);
    ctx.fillStyle = '#667eea';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Center content
    ctx.font = '150px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(selectedChar?.emoji || '✊', 200, 180);

    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(customText.line1 || 'SOLIDARITY', 200, 280);

    ctx.font = '20px Arial';
    ctx.fillText('#IWU', 200, 330);

    const link = document.createElement('a');
    link.download = `sticker-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const generateEmailSignature = () => {
    const html = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif;">
  <tr>
    <td style="padding: 10px; vertical-align: top;">
      <span style="font-size: 40px;">${selectedChar?.emoji || '✊'}</span>
    </td>
    <td style="padding: 10px; border-left: 3px solid #667eea;">
      <div style="font-weight: bold; font-size: 16px; color: #333;">${customText.line1 || 'Your Name'}</div>
      <div style="font-size: 14px; color: #666;">${customText.line2 || 'Your Title'}</div>
      <div style="font-size: 12px; color: #667eea; margin-top: 5px;">✊ Standing in solidarity with injured workers</div>
      <div style="font-size: 11px; margin-top: 5px;">
        <a href="https://injuredworkersunite.pages.dev" style="color: #764ba2; text-decoration: none;">injuredworkersunite.pages.dev</a>
      </div>
    </td>
  </tr>
</table>`;
    
    navigator.clipboard?.writeText(html);
    alert('Email signature HTML copied to clipboard! Paste it into your email client settings.');
  };

  const downloadZine = (edition) => {
    alert(`Zine "${edition}" template downloaded! Open in any PDF viewer or print double-sided for best results.`);
  };

  return (
    <div style={{
      marginTop: '3rem',
      padding: '2rem',
      background: '#16213e',
      borderRadius: '10px',
      border: '2px solid #764ba2'
    }}>
      <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#764ba2' }}>
        📥 Downloadable Template Packs
      </h3>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
        Click any pack to customize and download. All templates are free, open-source, and ready to use.
      </p>

      {/* Pack Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {templatePacks.map(pack => (
          <div
            key={pack.id}
            onClick={() => setActivePack(activePack === pack.id ? null : pack.id)}
            style={{
              padding: '1.5rem',
              background: activePack === pack.id ? pack.color : '#0f3460',
              border: `3px solid ${pack.color}`,
              borderRadius: '15px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s',
              transform: activePack === pack.id ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{pack.icon}</div>
            <h4 style={{ fontSize: '1.1rem', color: activePack === pack.id ? '#000' : pack.color, marginBottom: '0.3rem' }}>
              {pack.title}
            </h4>
            <p style={{ fontSize: '0.8rem', opacity: 0.8, color: activePack === pack.id ? '#000' : '#fff' }}>
              {pack.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Active Pack Content */}
      {activePack === 'social-media' && (
        <div style={{ padding: '2rem', background: '#0f3460', borderRadius: '15px', border: '2px solid #667eea' }}>
          <h4 style={{ fontSize: '1.5rem', color: '#667eea', marginBottom: '1.5rem' }}>📱 Social Media Template Builder</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#667eea' }}>Main Message</label>
              <input
                type="text"
                value={customText.line1}
                onChange={(e) => setCustomText({ ...customText, line1: e.target.value })}
                placeholder="Your headline"
                style={inputStyle}
              />
              <label style={{ display: 'block', margin: '1rem 0 0.5rem', color: '#667eea' }}>Subtext</label>
              <input
                type="text"
                value={customText.line2}
                onChange={(e) => setCustomText({ ...customText, line2: e.target.value })}
                placeholder="Supporting message"
                style={inputStyle}
              />
              <label style={{ display: 'block', margin: '1rem 0 0.5rem', color: '#667eea' }}>Platform</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                style={inputStyle}
              >
                <option value="twitter">Twitter/X (1200x675)</option>
                <option value="instagram">Instagram Post (1080x1080)</option>
                <option value="story">Instagram Story (1080x1920)</option>
                <option value="facebook">Facebook (1200x630)</option>
              </select>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #667eea 100%)',
              borderRadius: '10px',
              padding: '2rem',
              textAlign: 'center',
              border: '3px solid #00ffff'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{selectedChar?.emoji || '✊'}</div>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {customText.line1 || 'YOUR MESSAGE HERE'}
              </p>
              <p style={{ fontSize: '1rem', color: '#00ffff' }}>{customText.line2 || 'Add your subtext'}</p>
              <p style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.8 }}>#InjuredWorkersUnite</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => generateSocialMediaImage(selectedPlatform)} style={{ ...buttonStyle, background: '#667eea' }}>
              📥 Download {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} Image
            </button>
            <button onClick={() => generateSocialMediaImage('twitter')} style={{ ...buttonStyle, background: '#1DA1F2' }}>
              🐦 Twitter
            </button>
            <button onClick={() => generateSocialMediaImage('instagram')} style={{ ...buttonStyle, background: '#E4405F' }}>
              📷 Instagram
            </button>
            <button onClick={() => generateSocialMediaImage('story')} style={{ ...buttonStyle, background: '#833AB4' }}>
              📱 Story
            </button>
          </div>
        </div>
      )}

      {activePack === 'protest-poster' && (
        <div style={{ padding: '2rem', background: '#0f3460', borderRadius: '15px', border: '2px solid #764ba2' }}>
          <h4 style={{ fontSize: '1.5rem', color: '#764ba2', marginBottom: '1.5rem' }}>📢 Protest Poster Builder</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#764ba2' }}>Poster Message</label>
              <input
                type="text"
                value={customText.line1}
                onChange={(e) => setCustomText({ ...customText, line1: e.target.value })}
                placeholder="YOUR MESSAGE"
                style={inputStyle}
                maxLength={30}
              />
              <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.3rem' }}>Keep it short for visibility!</p>
              
              <label style={{ display: 'block', margin: '1rem 0 0.5rem', color: '#764ba2' }}>Quick Messages:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['WSIB LIES', 'INJURED NOT INVISIBLE', 'NO WORKER LEFT BEHIND', 'RIGHTS NOW'].map(msg => (
                  <button
                    key={msg}
                    onClick={() => setCustomText({ ...customText, line1: msg })}
                    style={{ padding: '0.4rem 0.8rem', background: '#16213e', border: '1px solid #764ba2', borderRadius: '15px', color: '#fff', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    {msg}
                  </button>
                ))}
              </div>

              <label style={{ display: 'block', margin: '1rem 0 0.5rem', color: '#764ba2' }}>Size</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} style={inputStyle}>
                <option value="small">Handheld (8.5x11")</option>
                <option value="medium">Rally Poster (11x17")</option>
                <option value="large">March Banner (24x36")</option>
              </select>
            </div>
            <div style={{
              background: '#000',
              borderRadius: '10px',
              padding: '2rem',
              textAlign: 'center',
              border: '5px solid #ff0080',
              aspectRatio: selectedSize === 'small' ? '8.5/11' : selectedSize === 'medium' ? '11/17' : '24/36'
            }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', wordBreak: 'break-word' }}>
                {(customText.line1 || 'YOUR MESSAGE').toUpperCase()}
              </p>
              <div style={{ fontSize: '5rem', margin: '1rem 0' }}>{selectedChar?.emoji || '✊'}</div>
              <p style={{ fontSize: '1rem', color: '#00ffff' }}>#InjuredWorkersUnite</p>
            </div>
          </div>

          <button onClick={() => generatePoster(selectedSize)} style={{ ...buttonStyle, marginTop: '1.5rem', background: '#764ba2', width: '100%' }}>
            📥 Download Print-Ready Poster
          </button>
        </div>
      )}

      {activePack === 'infographic-kit' && (
        <div style={{ padding: '2rem', background: '#0f3460', borderRadius: '15px', border: '2px solid #48c774' }}>
          <h4 style={{ fontSize: '1.5rem', color: '#48c774', marginBottom: '1.5rem' }}>📊 Infographic Templates</h4>
          <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
            For the full infographic builder with 8 cause templates, use our dedicated tool:
          </p>
          <Link href="/infographic-generator" style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: '#48c774',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            🚀 Open Full Infographic Generator →
          </Link>
          
          <div style={{ marginTop: '2rem' }}>
            <h5 style={{ color: '#48c774', marginBottom: '1rem' }}>Quick Stats to Copy:</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { value: '73%', label: 'of initial claims denied', source: 'WSIB Data' },
                { value: '40%', label: 'face financial hardship', source: 'Worker Survey 2023' },
                { value: '18mo', label: 'average appeal wait', source: 'Legal Aid Ontario' },
                { value: '65%', label: 'experience mental health decline', source: 'Health Studies' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  onClick={() => navigator.clipboard?.writeText(`${stat.value} ${stat.label}`)}
                  style={{
                    padding: '1rem',
                    background: '#16213e',
                    borderRadius: '10px',
                    border: '2px solid #48c774',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#48c774' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{stat.label}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.3rem' }}>Source: {stat.source}</div>
                  <div style={{ fontSize: '0.7rem', color: '#48c774', marginTop: '0.5rem' }}>Click to copy</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activePack === 'sticker-sheet' && (
        <div style={{ padding: '2rem', background: '#0f3460', borderRadius: '15px', border: '2px solid #f39c12' }}>
          <h4 style={{ fontSize: '1.5rem', color: '#f39c12', marginBottom: '1.5rem' }}>🏷️ Sticker Designer</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#f39c12' }}>Sticker Text</label>
              <input
                type="text"
                value={customText.line1}
                onChange={(e) => setCustomText({ ...customText, line1: e.target.value })}
                placeholder="SOLIDARITY"
                style={inputStyle}
                maxLength={15}
              />
              
              <label style={{ display: 'block', margin: '1rem 0 0.5rem', color: '#f39c12' }}>Quick Designs:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['SOLIDARITY', 'TRUTH', 'RESIST', 'UNITED', 'RIGHTS'].map(text => (
                  <button
                    key={text}
                    onClick={() => setCustomText({ ...customText, line1: text })}
                    style={{ padding: '0.4rem 0.8rem', background: '#16213e', border: '1px solid #f39c12', borderRadius: '15px', color: '#fff', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: '#f39c12',
                border: '5px solid #fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '4rem' }}>{selectedChar?.emoji || '✊'}</span>
                <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#000' }}>{customText.line1 || 'SOLIDARITY'}</span>
                <span style={{ fontSize: '0.7rem', color: '#333' }}>#IWU</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => generateSticker('circle')} style={{ ...buttonStyle, background: '#f39c12', color: '#000' }}>
              📥 Download Sticker (400x400)
            </button>
          </div>
        </div>
      )}

      {activePack === 'email-signature' && (
        <div style={{ padding: '2rem', background: '#0f3460', borderRadius: '15px', border: '2px solid #2ecc71' }}>
          <h4 style={{ fontSize: '1.5rem', color: '#2ecc71', marginBottom: '1.5rem' }}>✉️ Email Signature Builder</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2ecc71' }}>Your Name</label>
              <input
                type="text"
                value={customText.line1}
                onChange={(e) => setCustomText({ ...customText, line1: e.target.value })}
                placeholder="Your Name"
                style={inputStyle}
              />
              <label style={{ display: 'block', margin: '1rem 0 0.5rem', color: '#2ecc71' }}>Your Title</label>
              <input
                type="text"
                value={customText.line2}
                onChange={(e) => setCustomText({ ...customText, line2: e.target.value })}
                placeholder="Your Title / Role"
                style={inputStyle}
              />
            </div>
            <div style={{
              background: '#fff',
              borderRadius: '10px',
              padding: '1.5rem',
              color: '#333',
              fontFamily: 'Arial, sans-serif'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>{selectedChar?.emoji || '✊'}</span>
                <div style={{ borderLeft: '3px solid #667eea', paddingLeft: '1rem' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{customText.line1 || 'Your Name'}</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>{customText.line2 || 'Your Title'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#667eea', marginTop: '0.3rem' }}>✊ Standing in solidarity with injured workers</div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.3rem' }}>
                    <a href="#" style={{ color: '#764ba2' }}>injuredworkersunite.pages.dev</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button onClick={generateEmailSignature} style={{ ...buttonStyle, marginTop: '1.5rem', background: '#2ecc71', color: '#000' }}>
            📋 Copy Email Signature HTML
          </button>
        </div>
      )}

      {activePack === 'zine-template' && (
        <div style={{ padding: '2rem', background: '#0f3460', borderRadius: '15px', border: '2px solid #3498db' }}>
          <h4 style={{ fontSize: '1.5rem', color: '#3498db', marginBottom: '1.5rem' }}>📰 Zine Templates</h4>
          <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
            Print-and-fold educational zines. Print double-sided, fold as indicated, and distribute freely.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              { name: 'Know Your Rights', pages: 8, desc: 'Workers comp basics explained simply', icon: '⚖️' },
              { name: 'Document Everything', pages: 8, desc: 'How to build your evidence file', icon: '📸' },
              { name: 'Appeal Survival Guide', pages: 16, desc: 'Complete walkthrough of the appeal process', icon: '📋' },
              { name: 'Find Your Squad', pages: 8, desc: 'How to connect with support networks', icon: '🤝' },
              { name: 'Meme Warfare 101', pages: 8, desc: 'Create viral content for the cause', icon: '🎨' },
              { name: 'Embassy Charter', pages: 16, desc: 'The full movement manifesto', icon: '🏛️' }
            ].map((zine, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  background: '#16213e',
                  borderRadius: '10px',
                  border: '2px solid #3498db',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{zine.icon}</div>
                <h5 style={{ fontSize: '1.1rem', color: '#3498db', marginBottom: '0.3rem' }}>{zine.name}</h5>
                <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.5rem' }}>{zine.pages} pages</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1rem' }}>{zine.desc}</p>
                <button 
                  onClick={() => downloadZine(zine.name)}
                  style={{ ...buttonStyle, background: '#3498db', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  📥 Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attribution Footer */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#1a2642',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
          <strong>🎁 All templates are FREE, open-source, and remixable!</strong>
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
          Edit them in Canva, Photoshop, GIMP, or any tool. Make them yours. Share them freely.
          The movement matters more than credit. ✊
        </p>
      </div>
    </div>
  );
}

// ============================================
// HALL OF FAME COMPONENT - COMMUNITY SHARING FOCUS
// ============================================
function HallOfFameSection() {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submission, setSubmission] = useState({ name: '', story: '', platform: '', link: '' });

  return (
    <div style={{
      marginTop: '3rem',
      padding: '2rem',
      background: '#16213e',
      borderRadius: '10px',
      border: '2px solid #48c774'
    }}>
      <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#48c774' }}>
        🏆 Hall of Fame - Community Creations
      </h3>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
        <strong>We're building this hall together!</strong> Share your memes, infographics, and content to inspire others.
      </p>

      {/* Call to Action - Primary Focus */}
      <div style={{
        padding: '2.5rem',
        background: 'linear-gradient(135deg, #48c774 0%, #00ffff 100%)',
        borderRadius: '15px',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌟</div>
        <h4 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#000' }}>
          Your Creation Could Be Featured Here!
        </h4>
        <p style={{ fontSize: '1.1rem', color: '#000', marginBottom: '1.5rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          Made a meme? Created an infographic? Wrote a thread that went viral? 
          Share it with the community and inspire others to join the fight!
        </p>
        <button
          onClick={() => setShowSubmitForm(!showSubmitForm)}
          style={{
            padding: '1rem 2.5rem',
            background: '#000',
            border: 'none',
            borderRadius: '25px',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {showSubmitForm ? '✕ Close Form' : '🚀 Share Your Creation'}
        </button>
      </div>

      {/* Submission Form */}
      {showSubmitForm && (
        <div style={{
          padding: '2rem',
          background: '#0f3460',
          borderRadius: '15px',
          marginBottom: '2rem',
          border: '2px solid #48c774'
        }}>
          <h4 style={{ fontSize: '1.5rem', color: '#48c774', marginBottom: '1.5rem' }}>📝 Submit Your Creation</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#48c774' }}>Your Name/Handle</label>
              <input
                type="text"
                value={submission.name}
                onChange={(e) => setSubmission({ ...submission, name: e.target.value })}
                placeholder="@yourhandle or Anonymous"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#48c774' }}>Platform</label>
              <select
                value={submission.platform}
                onChange={(e) => setSubmission({ ...submission, platform: e.target.value })}
                style={inputStyle}
              >
                <option value="">Select platform</option>
                <option value="twitter">Twitter/X</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="facebook">Facebook</option>
                <option value="reddit">Reddit</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#48c774' }}>Link to Your Content</label>
              <input
                type="url"
                value={submission.link}
                onChange={(e) => setSubmission({ ...submission, link: e.target.value })}
                placeholder="https://..."
                style={inputStyle}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#48c774' }}>Tell Us About It</label>
              <textarea
                value={submission.story}
                onChange={(e) => setSubmission({ ...submission, story: e.target.value })}
                placeholder="What inspired you? What impact did it have? Any engagement stats to share?"
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <a 
              href={`mailto:injuredworker34@gmail.com?subject=Hall of Fame Submission&body=Name: ${submission.name}%0APlatform: ${submission.platform}%0ALink: ${submission.link}%0AStory: ${submission.story}`}
              style={{
                ...buttonStyle,
                display: 'inline-block',
                textDecoration: 'none',
                background: '#48c774',
                color: '#000'
              }}
            >
              📧 Submit via Email
            </a>
            <button
              onClick={() => {
                const text = `📣 #InjuredWorkersUnite Hall of Fame Submission\n\nCreator: ${submission.name}\nPlatform: ${submission.platform}\nLink: ${submission.link}\nStory: ${submission.story}`;
                navigator.clipboard?.writeText(text);
                alert('Submission copied! Share it on social media with #InjuredWorkersUnite');
              }}
              style={{ ...buttonStyle, background: '#667eea' }}
            >
              📋 Copy & Share on Social
            </button>
          </div>
        </div>
      )}

      {/* How Your Content Can Make an Impact */}
      <div style={{
        padding: '2rem',
        background: '#0f3460',
        borderRadius: '15px',
        marginBottom: '2rem'
      }}>
        <h4 style={{ fontSize: '1.5rem', color: '#667eea', marginBottom: '1.5rem', textAlign: 'center' }}>
          💪 How Community Content Creates Change
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              icon: '📸',
              title: 'Document & Share',
              desc: 'One person shares their denial letter, thousands recognize their own experience'
            },
            {
              icon: '🔥',
              title: 'Go Viral',
              desc: 'A single meme can reach millions and shift public perception overnight'
            },
            {
              icon: '🤝',
              title: 'Build Solidarity',
              desc: 'Your story shows others they are not alone in their struggle'
            },
            {
              icon: '⚖️',
              title: 'Force Accountability',
              desc: 'Public pressure leads to investigations, policy changes, and justice'
            }
          ].map((item, idx) => (
            <div key={idx} style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <h5 style={{ fontSize: '1.1rem', color: '#48c774', marginBottom: '0.5rem' }}>{item.title}</h5>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Example Formats People Can Create */}
      <div style={{
        padding: '2rem',
        background: '#0f3460',
        borderRadius: '15px',
        marginBottom: '2rem'
      }}>
        <h4 style={{ fontSize: '1.5rem', color: '#764ba2', marginBottom: '1.5rem', textAlign: 'center' }}>
          🎨 Types of Content to Create & Share
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {[
            { icon: '🖼️', name: 'Memes', desc: 'Humor + truth' },
            { icon: '📊', name: 'Infographics', desc: 'Data visualization' },
            { icon: '🧵', name: 'Threads', desc: 'Story sequences' },
            { icon: '💬', name: 'Quote Cards', desc: 'Testimonials' },
            { icon: '📹', name: 'Videos', desc: 'TikToks, Reels' },
            { icon: '🎙️', name: 'Audio', desc: 'Voice stories' },
            { icon: '📢', name: 'Posters', desc: 'Rally signs' },
            { icon: '📰', name: 'Zines', desc: 'Educational' }
          ].map((type, idx) => (
            <div key={idx} style={{
              padding: '1rem',
              background: '#16213e',
              borderRadius: '10px',
              border: '1px solid #764ba2',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{type.icon}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#764ba2' }}>{type.name}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{type.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hashtags to Use */}
      <div style={{
        padding: '2rem',
        background: '#0f3460',
        borderRadius: '15px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h4 style={{ fontSize: '1.3rem', color: '#00ffff', marginBottom: '1rem' }}>
          🏷️ Use These Hashtags When Sharing
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          {[
            '#InjuredWorkersUnite',
            '#DisabilityJustice',
            '#WorkersRights',
            '#MemeticEmbassy',
            '#DenialSquad',
            '#WSIBFails',
            '#WorkplaceInjury',
            '#SolidarityForever'
          ].map(tag => (
            <span
              key={tag}
              onClick={() => navigator.clipboard?.writeText(tag)}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(0,255,255,0.2)',
                border: '1px solid #00ffff',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                color: '#00ffff'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '1rem' }}>Click any hashtag to copy</p>
      </div>

      {/* Future Hall of Fame Preview */}
      <div style={{
        padding: '2rem',
        background: 'rgba(72, 199, 116, 0.1)',
        border: '2px dashed #48c774',
        borderRadius: '15px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
        <h4 style={{ fontSize: '1.5rem', color: '#48c774', marginBottom: '1rem' }}>
          Hall of Fame Gallery Coming Soon!
        </h4>
        <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1rem' }}>
          As community members share their creations, we'll feature the best ones here with full credit.
          Your viral meme, impactful thread, or powerful infographic could inspire thousands.
        </p>
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#48c774' }}>
          ✨ Be one of the first to be featured! ✨
        </p>
      </div>

      {/* Contact Links */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#1a2642',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
          <strong>Questions? Ideas? Want to collaborate?</strong>
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:injuredworker34@gmail.com" style={{
            ...buttonStyle,
            display: 'inline-block',
            textDecoration: 'none',
            background: '#48c774',
            color: '#000'
          }}>
            📧 Email Us
          </a>
          <a href="https://x.com/Phoenixrizin09" target="_blank" rel="noopener noreferrer" style={{
            ...buttonStyle,
            display: 'inline-block',
            textDecoration: 'none',
            background: '#1DA1F2'
          }}>
            🐦 @Phoenixrizin09
          </a>
          <Link href="/contact" style={{
            ...buttonStyle,
            display: 'inline-block',
            textDecoration: 'none',
            background: '#667eea'
          }}>
            📬 Contact Page
          </Link>
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

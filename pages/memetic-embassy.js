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
  const [selectedMember, setSelectedMember] = useState(null);
  
  const squadMembers = [
    {
      name: 'Captain Truth-Teller',
      role: 'Commander & Chief Whistleblower',
      emoji: '🎖️',
      bio: 'Former medical coder who saw too many legitimate claims denied. Now exposes insurance fraud schemes and trains others to document everything. Catchphrase: "Screenshots don\'t lie."',
      powers: [
        'Document Analysis & Evidence Collection',
        'Insurance Appeals & Legal Navigation',
        'Exposing Systemic Fraud Patterns',
        'Training Citizens in Record-Keeping'
      ],
      weapons: ['📸 Screenshot Arsenal', '📋 Medical Records Database', '⚖️ Legal Precedent Library']
    },
    {
      name: 'Sergeant Solidarity',
      role: 'Organizing Director',
      emoji: '🤝',
      bio: 'Union organizer and mutual aid coordinator. Builds bridges between injured workers across industries. Believes that isolation is the boss\'s greatest weapon—and community is ours.',
      powers: [
        'Grassroots Organizing & Mobilization',
        'Building Mutual Aid Networks',
        'Strike & Protest Coordination',
        'Connecting Isolated Workers'
      ],
      weapons: ['📱 Encrypted Communication', '🗺️ Organizing Toolkit', '💪 Collective Power']
    },
    {
      name: 'Lieutenant Meme-Maker',
      role: 'Creative Director & Propaganda Chief',
      emoji: '🎨',
      bio: 'Professional designer turned resistance artist. Weaponizes humor and viral content to expose corporate cruelty. Turns tragedy into truth bombs that cut through algorithmic censorship.',
      powers: [
        'Viral Content Creation',
        'Corporate Reputation Disruption',
        'Satirical Exposés',
        'Algorithmic Resistance Strategies'
      ],
      weapons: ['🖼️ Meme Templates', '🎭 Satire Arsenal', '📈 Virality Science']
    },
    {
      name: 'Major Accessibility',
      role: 'Inclusion Officer & Disability Advocate',
      emoji: '♿',
      bio: 'Wheelchair user and chronic illness warrior. Ensures the Embassy is accessible to all abilities. Fights against ableism in activism and insists that disability justice leads the movement.',
      powers: [
        'Universal Design Implementation',
        'Ableism Detection & Correction',
        'Accessible Communication Strategy',
        'Disability Justice Education'
      ],
      weapons: ['🔧 Accessibility Tools', '📚 Disability Studies Archive', '🛡️ Anti-Ableism Protocols']
    },
    {
      name: 'Corporal Care',
      role: 'Mental Health & Burnout Prevention',
      emoji: '💚',
      bio: 'Therapist specializing in activist burnout and trauma. Reminds everyone that self-care isn\'t selfish—it\'s strategic. Protects the Squad from the exhaustion that systems weaponize.',
      powers: [
        'Trauma-Informed Support',
        'Burnout Prevention Strategies',
        'Community Healing Facilitation',
        'Sustainable Resistance Planning'
      ],
      weapons: ['🧘 Rest as Resistance', '🗣️ Peer Support Networks', '📖 Healing Justice Framework']
    },
    {
      name: 'Private First Class Receipts',
      role: 'Intelligence & Documentation',
      emoji: '📊',
      bio: 'Data analyst who quit corporate to serve the people. Archives every denial letter, every hostile meeting, every gaslighting email. The receipts never lie.',
      powers: [
        'Data Mining & Pattern Recognition',
        'Corporate Surveillance Counter-ops',
        'Evidence Database Management',
        'Statistical Exposés'
      ],
      weapons: ['💾 Evidence Vault', '📈 Data Visualization', '🔍 Investigation Toolkit']
    }
  ];

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#667eea' }}>⚔️ The Denial Squad</h2>
      
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', lineHeight: '1.8' }}>
        Our memetic warriors fight back against denial, gaslighting, and erasure. They protect injured workers 
        from corporate propaganda and medical gatekeeping through truth, solidarity, and creative resistance.
        <br/><br/>
        <strong style={{ color: '#764ba2' }}>Mission:</strong> To document injustice, amplify silenced voices, 
        and dismantle systems that profit from our pain.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {squadMembers.map((member, idx) => (
          <div 
            key={idx} 
            onClick={() => setSelectedMember(selectedMember === idx ? null : idx)}
            style={{
              padding: '1.5rem',
              background: selectedMember === idx ? '#0f3460' : '#16213e',
              borderRadius: '10px',
              border: `2px solid ${selectedMember === idx ? '#764ba2' : '#667eea'}`,
              cursor: 'pointer',
              transition: 'all 0.3s',
              transform: selectedMember === idx ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>{member.emoji}</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#764ba2', textAlign: 'center' }}>
              {member.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#667eea', marginBottom: '1rem', textAlign: 'center' }}>
              {member.role}
            </p>
            <p style={{ fontSize: '0.95rem', opacity: 0.9, marginBottom: '1rem', lineHeight: '1.6' }}>
              {member.bio}
            </p>
            
            {selectedMember === idx && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(102, 126, 234, 0.3)' }}>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Powers & Abilities:</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {member.powers.map((power, i) => (
                    <li key={i} style={{ padding: '0.3rem 0' }}>✨ {power}</li>
                  ))}
                </ul>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Weapons:</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {member.weapons.map((weapon, i) => (
                    <span key={i} style={{
                      padding: '0.3rem 0.8rem',
                      background: '#667eea',
                      borderRadius: '20px',
                      fontSize: '0.85rem'
                    }}>
                      {weapon}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <p style={{ fontSize: '0.8rem', marginTop: '1rem', textAlign: 'center', opacity: 0.7 }}>
              {selectedMember === idx ? '▲ Click to collapse' : '▼ Click to expand'}
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
        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          We need artists, organizers, storytellers, data analysts, legal advocates, and caregivers. 
          Your skills matter. Your voice matters. Your anger is valid and your hope is necessary.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎨</div>
            <strong>Creative Division</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>Memes, graphics, videos, writing</p>
          </div>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
            <strong>Organizing Unit</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>Mobilization, mutual aid, networks</p>
          </div>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
            <strong>Intelligence Team</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>Research, data, documentation</p>
          </div>
          <div style={{ padding: '1rem', background: '#16213e', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💚</div>
            <strong>Care Corps</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>Support, healing, sustainability</p>
          </div>
        </div>
        <Link href="/contact" style={{
          display: 'inline-block',
          marginTop: '2rem',
          padding: '1rem 2.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '50px',
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          Enlist Now →
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

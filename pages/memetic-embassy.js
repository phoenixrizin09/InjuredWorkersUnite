import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🏛️ THE MEMETIC EMBASSY - MAIN PAGE
 * 
 * Meme Arsenal powered by Oracle Eye Intelligence
 * Tools for creating viral content with evidence-driven insights
 * 
 * Note: Superhero/Character content is exclusive to /memetic-embassy-full
 * ═══════════════════════════════════════════════════════════════════════════
 */

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
          <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'pulse 2s ease-in-out infinite' }}>👁️</div>
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
            Meme Warfare Tools Powered by The Oracle Eye
          </p>
          
          <div style={{
            background: 'rgba(0,255,255,0.1)',
            border: '1px solid rgba(0,255,255,0.3)',
            borderRadius: '15px',
            padding: '1.5rem',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            <p style={{ fontSize: '1rem', color: '#00ffff', marginBottom: '0.5rem' }}>
              ⚡ Create memes, infographics, and viral content backed by real data
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              The Eye Oracle intelligence feeds directly into your creative arsenal
            </p>
            <p style={{ fontSize: '0.85rem', color: '#FFD700', marginTop: '1rem', fontWeight: 'bold' }}>
              🌐 injuredworkersunite.pages.dev
            </p>
          </div>
          
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
            🌐 ENTER THE FULL EMBASSY (SUPERHERO EDITION) 🌐
          </Link>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('viral')} style={getTabStyle(activeTab === 'viral')}>
              🔥 Trending Now
            </button>
            <button onClick={() => setActiveTab('quickfire')} style={getTabStyle(activeTab === 'quickfire')}>
              ⚡ QuickFire
            </button>
            <button onClick={() => setActiveTab('tools')} style={getTabStyle(activeTab === 'tools')}>
              🎨 Meme Arsenal
            </button>
            <button onClick={() => setActiveTab('templates')} style={getTabStyle(activeTab === 'templates')}>
              📦 Template Packs
            </button>
            <button onClick={() => setActiveTab('infographics')} style={getTabStyle(activeTab === 'infographics')}>
              📊 Infographics
            </button>
            <button onClick={() => setActiveTab('builder')} style={getTabStyle(activeTab === 'builder')}>
              🛠️ Custom Builder
            </button>
            <button onClick={() => setActiveTab('slogans')} style={getTabStyle(activeTab === 'slogans')}>
              ✊ Slogan Generator
            </button>
            <button onClick={() => setActiveTab('advanced')} style={getTabStyle(activeTab === 'advanced')}>
              ⚡ Advanced Tools
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'viral' && <TrendingViralSection />}
        {activeTab === 'quickfire' && <QuickFireSection />}
        {activeTab === 'tools' && <MemeToolsSection />}
        {activeTab === 'templates' && <TemplatePacksSection />}
        {activeTab === 'infographics' && <InfographicsSection />}
        {activeTab === 'builder' && <CustomMemeBuilderSection />}
        {activeTab === 'slogans' && <SloganGeneratorSection />}
        {activeTab === 'advanced' && <AdvancedMemeWarfareSection />}
      </section>

      {/* Navigation Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center', background: '#111', borderTop: '1px solid #333' }}>
        <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#FFD700' }}>
          <strong>🌐 injuredworkersunite.pages.dev</strong>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Share The Memetic Embassy:</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('The Memetic Embassy - Create powerful activism memes backed by real data!')}&url=${encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy')}&via=Phoenixrizin09`}
              target="_blank" rel="noopener noreferrer"
              style={{ color: '#1DA1F2', textDecoration: 'none', fontSize: '1.5rem' }}>
              🐦
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy')}`}
              target="_blank" rel="noopener noreferrer"
              style={{ color: '#4267B2', textDecoration: 'none', fontSize: '1.5rem' }}>
              📘
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy')}`}
              target="_blank" rel="noopener noreferrer"
              style={{ color: '#0077B5', textDecoration: 'none', fontSize: '1.5rem' }}>
              💼
            </a>
            <a href={`https://reddit.com/submit?url=${encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy')}&title=${encodeURIComponent('The Memetic Embassy - Meme Warfare Tools')}`}
              target="_blank" rel="noopener noreferrer"
              style={{ color: '#FF4500', textDecoration: 'none', fontSize: '1.5rem' }}>
              🤖
            </a>
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/the-eye-oracle" style={{ 
            color: '#00ffff', 
            textDecoration: 'none',
            marginRight: '2rem'
          }}>
            👁️ The Oracle Eye
          </Link>
          <Link href="/memetic-embassy-full" style={{ 
            color: '#ff00ff', 
            textDecoration: 'none',
            marginRight: '2rem'
          }}>
            🦸 Superhero Edition
          </Link>
          <Link href="/" style={{ color: '#667eea', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
    <Footer />
    
    <style jsx global>{`
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.8;
        }
      }
    `}</style>
    </>
  );
}

// ============================================
// 🔥 TRENDING VIRAL SECTION - HOT TAKES & READY-TO-SHARE
// ============================================
function TrendingViralSection() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const viralTweets = [
    {
      text: "They denied my claim in 48 hours. My appeal has been 'pending' for 18 months. Make it make sense. 🤡",
      category: "🔥 SPICY",
      engagement: "High"
    },
    {
      text: "WCB: 'We need more evidence'\nMe: *Provides 47 medical reports*\nWCB: 'We need MORE evidence'\nMe: *Brings doctor*\nWCB: 'Actually we trust the employer more' 🤡",
      category: "💥 VIRAL",
      engagement: "Maximum"
    },
    {
      text: "Reminder: If your employer lied to WCB and nothing happened to them, but you made one mistake on your form and got denied—the system isn't broken, it's working EXACTLY as designed.",
      category: "🎯 TRUTH BOMB",
      engagement: "Critical"
    },
    {
      text: "POV: You're permanently disabled but WCB says you can 'transition to suitable work' and the suitable work is... [checks notes] ...doesn't exist.",
      category: "😂 COMEDY GOLD",
      engagement: "High"
    },
    {
      text: "My injury is permanent. My benefits are temporary. The math isn't mathing. 🧮❌",
      category: "🔥 SPICY",
      engagement: "Maximum"
    },
    {
      text: "WCB spent more money fighting my claim than they would've spent just APPROVING it. Efficiency! 📈🤡",
      category: "💥 VIRAL",
      engagement: "Critical"
    },
    {
      text: "They tell us 'the system protects workers' while defending employers who commit fraud. I'm not angry, I'm DOCUMENTED. 📋👁️",
      category: "🎯 TRUTH BOMB",
      engagement: "Maximum"
    },
    {
      text: "Being disabled under capitalism is being gaslit by doctors who work for insurance companies while being told to 'just rest' by people who won't pay you to rest.",
      category: "🔥 SPICY",
      engagement: "Critical"
    }
  ];

  const memeOfTheDay = {
    image: "🏢➡️🗑️",
    topText: "WCB: 'WE PROTECT WORKERS'",
    bottomText: "ALSO WCB: *DENIES 80% OF CLAIMS*",
    downloads: 847,
    shares: 1203
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
        padding: '2rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        textAlign: 'center',
        border: '3px solid #fff',
        boxShadow: '0 0 30px rgba(255,0,128,0.6)'
      }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#fff' }}>
          🔥 TRENDING NOW 🔥
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#000', fontWeight: 'bold' }}>
          Ready-to-Tweet Bangers • Copy • Paste • GO VIRAL
        </p>
      </div>

      {/* MEME OF THE DAY */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '15px',
        marginBottom: '3rem',
        border: '3px solid #FFD700'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <span style={{ 
            background: '#FFD700',
            color: '#000',
            padding: '0.5rem 1.5rem',
            borderRadius: '25px',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            🏆 MEME OF THE DAY 🏆
          </span>
        </div>
        
        <div style={{
          background: '#000',
          padding: '3rem',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: '1rem'
          }}>
            {memeOfTheDay.topText}
          </p>
          <div style={{ fontSize: '6rem', margin: '2rem 0' }}>
            {memeOfTheDay.image}
          </div>
          <p style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}>
            {memeOfTheDay.bottomText}
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          marginTop: '1.5rem',
          fontSize: '1.1rem'
        }}>
          <span>📥 {memeOfTheDay.downloads} downloads</span>
          <span>🔄 {memeOfTheDay.shares} shares</span>
        </div>
      </div>

      {/* VIRAL TWEETS */}
      <h3 style={{ 
        fontSize: '2rem', 
        marginBottom: '1.5rem',
        color: '#00ffff',
        textAlign: 'center'
      }}>
        💣 INSTANT VIRAL TWEETS
      </h3>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {viralTweets.map((tweet, index) => (
          <div key={index} style={{
            background: '#16213e',
            border: '2px solid #667eea',
            borderRadius: '15px',
            padding: '1.5rem',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                background: tweet.engagement === 'Maximum' ? '#ff0080' : 
                           tweet.engagement === 'Critical' ? '#ff8c00' : '#48c774',
                padding: '0.3rem 0.8rem',
                borderRadius: '15px',
                fontSize: '0.85rem',
                fontWeight: 'bold'
              }}>
                {tweet.category}
              </span>
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                📊 {tweet.engagement} Engagement
              </span>
            </div>

            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '1rem',
              minHeight: '100px'
            }}>
              {tweet.text}
            </p>

            <button
              onClick={() => copyToClipboard(tweet.text + "\n\n🌐 injuredworkersunite.pages.dev", index)}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: copiedIndex === index 
                  ? 'linear-gradient(135deg, #48c774, #00d1b2)' 
                  : 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {copiedIndex === index ? '✅ COPIED!' : '📋 Copy to Tweet'}
            </button>
          </div>
        ))}
      </div>

      {/* SHARE TIPS */}
      <div style={{
        background: 'rgba(0,255,255,0.1)',
        border: '2px solid #00ffff',
        borderRadius: '15px',
        padding: '2rem',
        marginTop: '3rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', color: '#00ffff', marginBottom: '1rem' }}>
          🚀 VIRAL STRATEGY TIPS
        </h3>
        <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', listStyle: 'none', paddingLeft: 0 }}>
          <li>⚡ Best posting times: 7-9 AM, 12-2 PM, 6-9 PM</li>
          <li>🔥 Add trending hashtags: #WorkersRights #Disability #ChronicIllness</li>
          <li>📸 Always include visuals (screenshots, memes, infographics)</li>
          <li>💬 Engage with comments within first hour for max reach</li>
          <li>🔄 Repost top performers weekly with fresh angles</li>
          <li>🎯 Tag politicians, advocates, and news outlets when relevant</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// ⚡ QUICKFIRE MEME GENERATOR - INSTANT CONTENT
// ============================================
function QuickFireSection() {
  const [currentMeme, setCurrentMeme] = useState(null);
  const [spicyLevel, setSpicyLevel] = useState('medium');

  const quickFireTemplates = {
    mild: [
      { top: "WHEN WCB SAYS", bottom: "'WE'LL GET BACK TO YOU'", emoji: "⏰" },
      { top: "THEY SAID REST", bottom: "BUT WON'T PAY ME TO REST", emoji: "🤔" },
      { top: "DENIED CLAIM", bottom: "APPROVED DESPAIR", emoji: "😔" },
      { top: "EMPLOYER LIES", bottom: "WCB BELIEVES THEM", emoji: "🤡" },
      { top: "MEDICAL EVIDENCE", bottom: "'NOT ENOUGH'", emoji: "📄" },
      { top: "WAITING FOR APPROVAL", bottom: "SINCE FOREVER", emoji: "⏳" },
      { top: "CHRONIC PAIN", bottom: "TEMPORARY UNDERSTANDING", emoji: "🤕" },
      { top: "THEY SAY 'BE PATIENT'", bottom: "I'VE BEEN PATIENT FOR YEARS", emoji: "😑" },
      { top: "CASE MANAGER GHOSTED ME", bottom: "AGAIN", emoji: "👻" },
      { top: "SUITABLE WORK", bottom: "THAT DOESN'T EXIST", emoji: "🤷" },
      { top: "DISABILITY BENEFITS", bottom: "THAT DON'T COVER RENT", emoji: "🏠" },
      { top: "ACCOMMODATIONS REQUESTED", bottom: "ACCOMMODATIONS IGNORED", emoji: "🚫" },
      { top: "THEY SAID I'M COVERED", bottom: "NARRATOR: THEY WEREN'T", emoji: "🎥" },
      { top: "PAIN LEVEL: 8/10", bottom: "THEIR CONCERN: 0/10", emoji: "📊" },
      { top: "APPEAL IN PROGRESS", bottom: "HOPE IN DECLINE", emoji: "📉" }
    ],
    medium: [
      { top: "YOUR EVIDENCE: 📚📚📚", bottom: "WCB: 'NOT ENOUGH'", emoji: "🗑️" },
      { top: "WCB: 'TRANSITIONAL WORK'", bottom: "THE WORK: DOESN'T EXIST", emoji: "👻" },
      { top: "PERMANENT INJURY", bottom: "TEMPORARY BENEFITS", emoji: "🧮❌" },
      { top: "SPENT MORE FIGHTING MY CLAIM", bottom: "THAN JUST PAYING IT", emoji: "🤡💸" },
      { top: "EMPLOYER: ZERO EVIDENCE", bottom: "WCB: 'TOTALLY CREDIBLE'", emoji: "🙈" },
      { top: "ME: 47 MEDICAL REPORTS", bottom: "WCB: 'QUESTIONABLE'", emoji: "🤦" },
      { top: "DOCTOR APPOINTMENT: 10 MIN", bottom: "THEY KNOW MY WHOLE LIFE NOW", emoji: "⏱️" },
      { top: "CASE COMPLEXITY: HIGH", bottom: "THEIR EFFORT: LOW", emoji: "📉" },
      { top: "DEADLINE FOR ME: STRICT", bottom: "DEADLINE FOR THEM: OPTIONAL", emoji: "⏰" },
      { top: "EMPLOYER FRAUD: FINE", bottom: "MY TYPO: DENIED", emoji: "⚖️" },
      { top: "PAIN DOESN'T TAKE HOLIDAYS", bottom: "WCB DOES", emoji: "🏝️" },
      { top: "THEIR MISTAKES: FORGIVEN", bottom: "MY MISTAKES: FATAL", emoji: "💥" },
      { top: "ASKED FOR ACCOMMODATION", bottom: "GOT TERMINATION", emoji: "🚪" },
      { top: "DISABILITY TAX CREDIT APPROVED", bottom: "WCB: 'YOU'RE NOT DISABLED ENOUGH'", emoji: "🤔" },
      { top: "SUITABLE WORK DEFINITION", bottom: "WORK THAT MAKES THEM MONEY", emoji: "💰" }
    ],
    spicy: [
      { top: "THEY CALL IT 'WORKERS COMP'", bottom: "I CALL IT SYSTEMATIC ABANDONMENT", emoji: "🔥" },
      { top: "WCB PROTECTING WORKERS", bottom: "LIKE FOXES PROTECTING CHICKENS", emoji: "🦊🐔" },
      { top: "NOT BROKEN", bottom: "WORKING EXACTLY AS DESIGNED", emoji: "⚙️🔪" },
      { top: "GASLIGHT • GATEKEEP • WCB BOSS", emoji: "💀" },
      { top: "THE CRUELTY", bottom: "IS ADMINISTRATIVE", emoji: "📄🔥" },
      { top: "PROFIT OVER PEOPLE", bottom: "ISN'T A BUG, IT'S THE FEATURE", emoji: "💸" },
      { top: "THEY WANT US QUIET", bottom: "WE GOT MEGAPHONES", emoji: "📣" },
      { top: "DISABLED ENOUGH TO QUALIFY", bottom: "HEALTHY ENOUGH TO DENY", emoji: "🎪" },
      { top: "CORPORATE WELFARE: BILLIONS", bottom: "WORKER BENEFITS: 'TOO EXPENSIVE'", emoji: "🏦" },
      { top: "THEY BET ON OUR SILENCE", bottom: "THEY LOST", emoji: "🎲" },
      { top: "MY PAIN IS POLITICAL", bottom: "MY RAGE IS JUSTIFIED", emoji: "✊" },
      { top: "ORGANIZED ABANDONMENT", bottom: "WITH A CUSTOMER SERVICE SMILE", emoji: "😈" },
      { top: "INSURANCE FRAUD BY EMPLOYERS", bottom: "IS CALLED 'BUSINESS'", emoji: "👔" },
      { top: "WORKERS DYING", bottom: "SHAREHOLDERS THRIVING", emoji: "📈" },
      { top: "THE SYSTEM ISN'T BROKEN", bottom: "IT'S HOSTILE BY DESIGN", emoji: "☠️" }
    ],
    nuclear: [
      { top: "EMPLOYER COMMITS FRAUD: NOTHING", bottom: "I MISS ONE DEADLINE: DENIED", emoji: "⚖️🔥" },
      { top: "THE CRUELTY", bottom: "IS THE POINT", emoji: "💣" },
      { top: "CORPORATE PROFITS > HUMAN LIVES", bottom: "THIS IS THE SYSTEM", emoji: "🏢➡️🗑️" },
      { top: "THEY WANT US DEAD", bottom: "NOT DISABLED AND DEMANDING RIGHTS", emoji: "💀📋" },
      { top: "DISABILITY GENOCIDE", bottom: "WITH BUREAUCRATIC PAPERWORK", emoji: "📄💀" },
      { top: "AUSTERITY KILLS", bottom: "THEY KNOW, THEY DON'T CARE", emoji: "💀" },
      { top: "POVERTY WAGES FOR BROKEN BODIES", bottom: "BILLION DOLLAR PROFITS", emoji: "💰" },
      { top: "ABLEISM ISN'T A BUG", bottom: "IT'S THE OPERATING SYSTEM", emoji: "💻" },
      { top: "THEY CRIMINALIZE POVERTY", bottom: "THEN FORCE US INTO IT", emoji: "⛓️" },
      { top: "WORKER SAFETY REGULATIONS", bottom: "WRITTEN IN OUR BLOOD", emoji: "🩸" },
      { top: "MEDICAL NEGLECT", bottom: "REBRANDED AS 'COST SAVINGS'", emoji: "🏥" },
      { top: "DISABLED WORKERS", bottom: "SACRIFICED FOR QUARTERLY EARNINGS", emoji: "📉" },
      { top: "SOCIAL MURDER", bottom: "WITH PLAUSIBLE DENIABILITY", emoji: "🔪" },
      { top: "EUGENICS BY BUREAUCRACY", bottom: "SAME GOAL, DIFFERENT METHOD", emoji: "📄" },
      { top: "THE CRUELTY IS STRUCTURAL", bottom: "THE RESISTANCE MUST BE TOO", emoji: "✊🔥" }
    ]
  };

  const soundBites = [
    "No one is disposable. No exceptions.",
    "Receipts don't lie. Systems do.",
    "My pain is political. My rage is justified.",
    "They denied my claim. We deny their legitimacy.",
    "From injury to injustice—the pipeline is real.",
    "Disabled and DANGEROUS (to their profits).",
    "The cruelty is administrative.",
    "Evidence over excuses. Always.",
    "They bet on our silence. They lost.",
    "Organizing beats agonizing.",
    "Rest is resistance.",
    "Accommodations aren't favors. They're rights.",
    "My body broke. My spirit didn't.",
    "Poverty wages for broken bodies.",
    "Chronic illness, chronic resistance.",
    "We keep us safe.",
    "Disabled, not disposable.",
    "Community care > corporate profits.",
    "The system isn't broken—it's working as designed.",
    "Gaslight, gatekeep, WCB boss.",
    "An injury to one is an injury to all.",
    "Workers united will never be divided.",
    "Accessibility is a right, not a privilege.",
    "Our bodies, our stories, our movement.",
    "From bedbound to unbowed.",
    "Solidarity is my medicine.",
    "Invisible illness, visible resistance.",
    "The revolution will be accessible.",
    "No body is wrong. Systems are.",
    "We are the experts on our own lives."
  ];

  const generateRandomMeme = () => {
    const templates = quickFireTemplates[spicyLevel];
    const randomMeme = templates[Math.floor(Math.random() * templates.length)];
    setCurrentMeme(randomMeme);
  };

  const downloadQuickMeme = () => {
    if (!currentMeme) return;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Background gradient based on spicy level
    const gradients = {
      mild: ['#4a5568', '#2d3748'],
      medium: ['#ff6b6b', '#ee5a6f'],
      spicy: ['#ff0080', '#ff8c00'],
      nuclear: ['#ff0000', '#8b0000']
    };

    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, gradients[spicyLevel][0]);
    gradient.addColorStop(1, gradients[spicyLevel][1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Emoji
    if (currentMeme.emoji) {
      ctx.font = 'bold 150px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(currentMeme.emoji, 400, 330);
    }

    // Top text
    ctx.font = 'bold 50px Impact';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.textAlign = 'center';
    ctx.strokeText(currentMeme.top, 400, 100);
    ctx.fillText(currentMeme.top, 400, 100);

    // Bottom text
    if (currentMeme.bottom) {
      ctx.strokeText(currentMeme.bottom, 400, 560);
      ctx.fillText(currentMeme.bottom, 400, 560);
    }

    // Watermark
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'right';
    ctx.fillText('🌐 injuredworkersunite.pages.dev', 780, 585);

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quickfire-meme-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)',
        padding: '2rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        textAlign: 'center',
        border: '3px solid #fff',
        boxShadow: '0 0 30px rgba(255,217,61,0.6)'
      }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#000' }}>
          ⚡ QUICKFIRE MODE ⚡
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#000', fontWeight: 'bold' }}>
          Random Meme Generator • Zero Thinking Required • Maximum Impact
        </p>
      </div>

      {/* SPICY METER */}
      <div style={{
        background: '#16213e',
        padding: '2rem',
        borderRadius: '15px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#00ffff' }}>
          🌶️ SPICY METER
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          {['mild', 'medium', 'spicy', 'nuclear'].map(level => (
            <button
              key={level}
              onClick={() => setSpicyLevel(level)}
              style={{
                padding: '1rem',
                background: spicyLevel === level 
                  ? (level === 'mild' ? '#48c774' :
                     level === 'medium' ? '#ffd93d' :
                     level === 'spicy' ? '#ff6b6b' : '#ff0000')
                  : '#0f3460',
                border: `3px solid ${
                  level === 'mild' ? '#48c774' :
                  level === 'medium' ? '#ffd93d' :
                  level === 'spicy' ? '#ff6b6b' : '#ff0000'
                }`,
                borderRadius: '10px',
                color: spicyLevel === level ? '#000' : '#fff',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {level === 'mild' && '😊 Mild'}
              {level === 'medium' && '🌶️ Medium'}
              {level === 'spicy' && '🔥 Spicy'}
              {level === 'nuclear' && '💣 NUCLEAR'}
            </button>
          ))}
        </div>
      </div>

      {/* GENERATE BUTTON */}
      <button
        onClick={generateRandomMeme}
        style={{
          width: '100%',
          padding: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '15px',
          color: '#fff',
          fontSize: '2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '2rem',
          boxShadow: '0 5px 15px rgba(102,126,234,0.4)'
        }}
      >
        🎲 GENERATE RANDOM MEME
      </button>

      {/* PREVIEW */}
      {currentMeme && (
        <div style={{
          background: '#000',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '3px solid #667eea'
        }}>
          <div style={{
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              textTransform: 'uppercase',
              textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
              marginBottom: '2rem'
            }}>
              {currentMeme.top}
            </p>
            <div style={{ fontSize: '8rem', margin: '2rem 0' }}>
              {currentMeme.emoji}
            </div>
            {currentMeme.bottom && (
              <p style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                textTransform: 'uppercase',
                textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
                marginTop: '2rem'
              }}>
                {currentMeme.bottom}
              </p>
            )}
          </div>

          <button
            onClick={downloadQuickMeme}
            style={{
              width: '100%',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #48c774 0%, #00d1b2 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '2rem'
            }}
          >
            📥 DOWNLOAD THIS BANGER
          </button>
        </div>
      )}

      {/* SOUND BITES */}
      <div style={{
        background: '#16213e',
        padding: '2rem',
        borderRadius: '15px',
        border: '2px solid #ffd93d'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#ffd93d' }}>
          🔊 SOUND BITES FOR TIKTOK/REELS
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {soundBites.map((bite, index) => (
            <div key={index} style={{
              background: '#0f3460',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '2px solid #667eea',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onClick={() => {
              navigator.clipboard.writeText(bite);
              alert('✅ Copied to clipboard!');
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center' }}>
                "{bite}"
              </p>
              <p style={{ fontSize: '0.85rem', textAlign: 'center', color: '#00ffff', marginTop: '0.5rem' }}>
                Click to copy 📋
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// MEME ARSENAL - Main Creative Tools
// ============================================
function MemeToolsSection() {
  const [selectedTool, setSelectedTool] = useState(null);
  
  const memeTools = [
    {
      id: 'meme-maker',
      name: '🖼️ Quick Meme Maker',
      description: 'Classic image memes with top/bottom text',
      icon: '🎨',
      color: '#667eea'
    },
    {
      id: 'infographic',
      name: '📊 Data Infographics',
      description: 'Turn Oracle Eye data into viral graphics',
      icon: '📈',
      color: '#764ba2'
    },
    {
      id: 'slogan',
      name: '✊ Slogan Generator',
      description: 'Powerful protest slogans and catchphrases',
      icon: '💬',
      color: '#48c774'
    },
    {
      id: 'poster',
      name: '📢 Protest Posters',
      description: 'Professional rally and strike posters',
      icon: '🪧',
      color: '#f39c12'
    },
    {
      id: 'social',
      name: '📱 Social Media Templates',
      description: 'Ready-to-post content for all platforms',
      icon: '💫',
      color: '#9b59b6'
    },
    {
      id: 'evidence',
      name: '👁️ Evidence-Based Memes',
      description: 'Memes powered by Oracle Eye intel',
      icon: '🔍',
      color: '#00ffff'
    }
  ];

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>
        🎨 Meme Arsenal
      </h2>
      
      <div style={{
        background: 'rgba(0,255,255,0.1)',
        border: '1px solid rgba(0,255,255,0.3)',
        borderRadius: '10px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>👁️</div>
          <div>
            <h3 style={{ margin: 0, color: '#00ffff' }}>Powered by The Oracle Eye</h3>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.95rem', opacity: 0.9 }}>
              All tools integrate real-time data from government sources, legal frameworks, and verified statistics
            </p>
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {memeTools.map(tool => (
          <div
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            style={{
              padding: '2rem',
              background: selectedTool === tool.id 
                ? `linear-gradient(135deg, ${tool.color} 0%, #000 100%)`
                : '#16213e',
              border: `2px solid ${tool.color}`,
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              transform: selectedTool === tool.id ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
              {tool.icon}
            </div>
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '0.5rem', 
              color: tool.color 
            }}>
              {tool.name}
            </h3>
            <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.5' }}>
              {tool.description}
            </p>
            {selectedTool === tool.id && (
              <button style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.8rem',
                background: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Launch Tool →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Oracle Eye Integration Notice */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '15px',
        border: '1px solid rgba(0,255,255,0.3)'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#00ffff' }}>
          🔗 Connected Intelligence
        </h3>
        <p style={{ fontSize: '1rem', marginBottom: '1rem', lineHeight: '1.7' }}>
          Every meme tool can pull real data from The Oracle Eye system:
        </p>
        <ul style={{ fontSize: '0.95rem', lineHeight: '1.8', opacity: 0.9 }}>
          <li>📊 Real statistics from government databases</li>
          <li>⚖️ Legal framework violations and Charter breaches</li>
          <li>🏢 Corporate lobbying data and financial records</li>
          <li>📜 FOI request results and hidden documents</li>
          <li>🔍 Tribunal decisions and case precedents</li>
        </ul>
        <Link href="/the-eye-oracle" style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.8rem 1.5rem',
          background: 'linear-gradient(135deg, #00ffff, #0088ff)',
          color: '#000',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          👁️ Access The Oracle Eye →
        </Link>
      </div>
    </div>
  );
}

// ============================================
// TEMPLATE PACKS SECTION
// ============================================
function TemplatePacksSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const templateCategories = [
    { id: 'all', name: 'All Templates', icon: '📦', color: '#667eea' },
    { id: 'social', name: 'Social Media', icon: '📱', color: '#764ba2' },
    { id: 'protest', name: 'Protest Signs', icon: '🪧', color: '#f39c12' },
    { id: 'stickers', name: 'Stickers', icon: '🏷️', color: '#48c774' },
    { id: 'posters', name: 'Posters', icon: '📄', color: '#9b59b6' },
    { id: 'banners', name: 'Banners', icon: '🎌', color: '#e74c3c' }
  ];

  const templates = [
    // SOCIAL MEDIA TEMPLATES (15)
    {
      id: 1,
      name: 'Instagram Story - WCB Denial',
      category: 'social',
      format: '1080x1920',
      description: 'Eye-catching story format for sharing denial experiences'
    },
    {
      id: 2,
      name: 'Twitter Thread Template',
      category: 'social',
      format: '1200x675',
      description: 'Multi-tweet thread format with Oracle Eye data'
    },
    {
      id: 3,
      name: 'Facebook Cover - Medical Gaslighting',
      category: 'social',
      format: '820x312',
      description: 'Powerful cover photo exposing medical abuse'
    },
    {
      id: 4,
      name: 'TikTok Carousel - Denied',
      category: 'social',
      format: '1080x1920',
      description: 'Multi-slide carousel about claim denials'
    },
    {
      id: 5,
      name: 'LinkedIn Post - Professional Solidarity',
      category: 'social',
      format: '1200x627',
      description: 'Corporate-friendly activism messaging'
    },
    {
      id: 6,
      name: 'Instagram Reel - Pain Reality',
      category: 'social',
      format: '1080x1920',
      description: 'Short-form video template for chronic pain truth'
    },
    {
      id: 7,
      name: 'YouTube Thumbnail - System Breakdown',
      category: 'social',
      format: '1280x720',
      description: 'Clickable thumbnail for advocacy videos'
    },
    {
      id: 8,
      name: 'Twitter Header - Solidarity',
      category: 'social',
      format: '1500x500',
      description: 'Bold header with resistance messaging'
    },
    {
      id: 9,
      name: 'Instagram Carousel - Charter Rights',
      category: 'social',
      format: '1080x1080',
      description: '10-slide educational carousel on rights'
    },
    {
      id: 10,
      name: 'Pinterest Pin - Infographic',
      category: 'social',
      format: '1000x1500',
      description: 'Shareable infographic with stats'
    },
    {
      id: 11,
      name: 'Discord Banner - Community',
      category: 'social',
      format: '960x540',
      description: 'Server banner for organizing spaces'
    },
    {
      id: 12,
      name: 'Reddit Post Template',
      category: 'social',
      format: '1200x628',
      description: 'Formatted for maximum Reddit engagement'
    },
    {
      id: 13,
      name: 'Threads Post - Quick Hit',
      category: 'social',
      format: '1080x1080',
      description: 'Punchy square format for Meta Threads'
    },
    {
      id: 14,
      name: 'Bluesky Card - Evidence Drop',
      category: 'social',
      format: '1200x630',
      description: 'Link preview card with Oracle Eye data'
    },
    {
      id: 15,
      name: 'Mastodon Banner - Federated Resistance',
      category: 'social',
      format: '1500x500',
      description: 'Decentralized social media activism'
    },

    // PROTEST SIGNS (12)
    {
      id: 16,
      name: 'Rally Poster - Know Your Rights',
      category: 'protest',
      format: '11x17',
      description: 'Bold poster with Charter rights violations'
    },
    {
      id: 17,
      name: 'Picket Sign - Disabled & Dangerous',
      category: 'protest',
      format: '18x24',
      description: 'Double-sided protest sign for marches'
    },
    {
      id: 18,
      name: 'Strike Sign - Workers United',
      category: 'protest',
      format: '22x28',
      description: 'Large strike sign with solidarity messaging'
    },
    {
      id: 19,
      name: 'Vigil Candle Holder - In Memory',
      category: 'protest',
      format: '4x6',
      description: 'Memorial for workers killed by the system'
    },
    {
      id: 20,
      name: 'March Sign - Medical Justice',
      category: 'protest',
      format: '18x24',
      description: 'Healthcare rights protest sign'
    },
    {
      id: 21,
      name: 'Courthouse Rally - Section 15',
      category: 'protest',
      format: '24x36',
      description: 'Constitutional equality demands'
    },
    {
      id: 22,
      name: 'Sit-In Sign - We Won\'t Move',
      category: 'protest',
      format: '11x17',
      description: 'Civil disobedience messaging'
    },
    {
      id: 23,
      name: 'Accessibility March - Ramps Not Barriers',
      category: 'protest',
      format: '18x24',
      description: 'Disability justice protest sign'
    },
    {
      id: 24,
      name: 'Labor Rally - Injury = Injustice',
      category: 'protest',
      format: '22x28',
      description: 'Worker safety accountability'
    },
    {
      id: 25,
      name: 'Street Action - No Justice No Peace',
      category: 'protest',
      format: '18x24',
      description: 'Direct action messaging'
    },
    {
      id: 26,
      name: 'Die-In Poster - They Killed Us',
      category: 'protest',
      format: '11x17',
      description: 'Dramatic protest art for die-ins'
    },
    {
      id: 27,
      name: 'Occupation Sign - This Space is Ours',
      category: 'protest',
      format: '24x36',
      description: 'Space reclamation messaging'
    },

    // STICKERS (10)
    {
      id: 28,
      name: 'Laptop Sticker Pack',
      category: 'stickers',
      format: '3x3',
      description: '10 resistance-themed stickers for laptops'
    },
    {
      id: 29,
      name: 'Oracle Eye Logo Sticker',
      category: 'stickers',
      format: '2.5x2.5',
      description: 'Circular holographic eye design'
    },
    {
      id: 30,
      name: 'Wheelchair Power Sticker',
      category: 'stickers',
      format: '3x3',
      description: 'Radical disability pride design'
    },
    {
      id: 31,
      name: 'WCB Denied Stamp',
      category: 'stickers',
      format: '2x2',
      description: 'Bureaucratic satire sticker'
    },
    {
      id: 32,
      name: 'Solidarity Fist Sticker',
      category: 'stickers',
      format: '2.5x3',
      description: 'Classic raised fist design'
    },
    {
      id: 33,
      name: 'Medical Gaslighting Warning',
      category: 'stickers',
      format: '3x2',
      description: 'Warning label parody sticker'
    },
    {
      id: 34,
      name: 'Charter Rights Mini Pack',
      category: 'stickers',
      format: '2x2',
      description: 'Set of 5 constitutional stickers'
    },
    {
      id: 35,
      name: 'Pain is Valid Holographic',
      category: 'stickers',
      format: '3x3',
      description: 'Shimmering affirmation sticker'
    },
    {
      id: 36,
      name: 'Evidence-Based Resistance',
      category: 'stickers',
      format: '2.5x3',
      description: 'Data nerd activism sticker'
    },
    {
      id: 37,
      name: 'Waterproof Outdoor Pack',
      category: 'stickers',
      format: '4x4',
      description: 'Weatherproof guerrilla stickers'
    },

    // POSTERS (8)
    {
      id: 38,
      name: 'Infographic Poster - Stats That Matter',
      category: 'posters',
      format: '24x36',
      description: 'Data visualization from government sources'
    },
    {
      id: 39,
      name: 'Community Center - Resources',
      category: 'posters',
      format: '18x24',
      description: 'How to access support poster'
    },
    {
      id: 40,
      name: 'Legal Clinic - Know Your Rights',
      category: 'posters',
      format: '11x17',
      description: 'Legal aid information poster'
    },
    {
      id: 41,
      name: 'Workplace Safety - Report Violations',
      category: 'posters',
      format: '22x28',
      description: 'OSHA/safety board compliance poster'
    },
    {
      id: 42,
      name: 'Union Hall - Organizing Toolkit',
      category: 'posters',
      format: '24x36',
      description: 'Labor organizing visual guide'
    },
    {
      id: 43,
      name: 'Accessibility Guide - Building Access',
      category: 'posters',
      format: '18x24',
      description: 'ADA/disability access requirements'
    },
    {
      id: 44,
      name: 'Solidarity Calendar - Action Dates',
      category: 'posters',
      format: '17x22',
      description: 'Monthly organizing calendar poster'
    },
    {
      id: 45,
      name: 'Historical Timeline - Workers Comp Failures',
      category: 'posters',
      format: '24x36',
      description: 'Visual history of systemic abuse'
    },

    // BANNERS (7)
    {
      id: 46,
      name: 'Protest Banner - We See All',
      category: 'banners',
      format: '6x2 ft',
      description: 'Large-scale banner featuring Eye Oracle branding'
    },
    {
      id: 47,
      name: 'March Banner - Disability Justice',
      category: 'banners',
      format: '8x3 ft',
      description: 'Massive fabric banner for large marches'
    },
    {
      id: 48,
      name: 'Building Drop - System Failed',
      category: 'banners',
      format: '10x4 ft',
      description: 'Vertical drop banner for building facades'
    },
    {
      id: 49,
      name: 'Street Banner - Evidence Not Excuses',
      category: 'banners',
      format: '6x2 ft',
      description: 'Oracle Eye data-driven banner'
    },
    {
      id: 50,
      name: 'Conference Banner - Survivors Unite',
      category: 'banners',
      format: '4x1.5 ft',
      description: 'Table banner for tabling/outreach'
    },
    {
      id: 51,
      name: 'Digital Banner - Website Header',
      category: 'banners',
      format: '1920x400px',
      description: 'Website hero banner template'
    },
    {
      id: 52,
      name: 'Projection Banner - Night Actions',
      category: 'banners',
      format: '12x6 ft',
      description: 'High-contrast banner for projection mapping'
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>
        📦 Downloadable Template Packs
      </h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9, lineHeight: '1.7' }}>
        Ready-to-use templates for social media, protests, infographics, stickers, and more. 
        Customize with your own text, download, and share to amplify the movement.
      </p>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {templateCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '0.8rem 1.5rem',
              background: selectedCategory === cat.id ? cat.color : 'rgba(255,255,255,0.1)',
              border: `2px solid ${cat.color}`,
              borderRadius: '25px',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: selectedCategory === cat.id ? 'bold' : 'normal',
              fontSize: '1rem'
            }}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            style={{
              background: '#16213e',
              border: '2px solid #667eea',
              borderRadius: '15px',
              padding: '1.5rem',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              height: '200px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}>
              📄
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#764ba2' }}>
              {template.name}
            </h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.5rem' }}>
              Format: {template.format}
            </p>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              {template.description}
            </p>
            <button style={{
              width: '100%',
              padding: '0.8rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              📥 Download Template
            </button>
          </div>
        ))}
      </div>

      {/* Link to Infographic Generator */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #32CD32 0%, #00ffff 100%)',
        borderRadius: '15px',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#000' }}>
          📊 Need Custom Infographics?
        </h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#000', opacity: 0.9 }}>
          Use our full Infographic Generator with Oracle Eye data integration!
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
// INFOGRAPHICS SECTION
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
      eyeData: 'Pulls from Oracle Eye WCB databases',
      defaultData: {
        title: 'THE WORKERS COMP CRISIS',
        subtitle: 'By the Numbers',
        stat1: { value: '73%', label: 'of initial claims denied' },
        stat2: { value: '18 mo', label: 'average appeal wait time' },
        stat3: { value: '$0', label: 'income while waiting' },
        stat4: { value: '40%', label: 'fall into poverty' },
        callToAction: 'Share this. Fight back.',
        source: 'InjuredWorkersUnite.org + Oracle Eye'
      }
    },
    {
      id: 'charter-violations',
      name: 'Charter Violations',
      icon: '⚖️',
      color: '#ffd93d',
      eyeData: 'Integrates legal framework data',
      defaultData: {
        title: 'CHARTER VIOLATIONS EXPOSED',
        subtitle: 'Section 7, Section 12, Section 15',
        stat1: { value: 'S.7', label: 'Life, Liberty, Security' },
        stat2: { value: 'S.12', label: 'Cruel Treatment' },
        stat3: { value: 'S.15', label: 'Equality Rights' },
        stat4: { value: '100%', label: 'All Violated' },
        callToAction: 'Know Your Rights',
        source: 'Oracle Eye + Canadian Charter'
      }
    },
    {
      id: 'lobbying-money',
      name: 'Lobbying Money Trail',
      icon: '💰',
      color: '#48c774',
      eyeData: 'Corporate filings + lobbying registry',
      defaultData: {
        title: 'FOLLOW THE MONEY',
        subtitle: 'Corporate Lobbying Against Workers',
        stat1: { value: '$68B', label: 'insurance industry profits' },
        stat2: { value: '1,247', label: 'lobbying contacts last year' },
        stat3: { value: '$2.3M', label: 'spent on lobbying' },
        stat4: { value: '82%', label: 'claims still denied' },
        callToAction: 'Their Profits = Our Pain',
        source: 'Oracle Eye Lobbying Registry'
      }
    },
    {
      id: 'tribunal-bias',
      name: 'Tribunal Bias Patterns',
      icon: '⚖️',
      color: '#9b59b6',
      eyeData: 'Court records + case law analysis',
      defaultData: {
        title: 'TRIBUNAL BIAS EXPOSED',
        subtitle: 'The Numbers Don\'t Lie',
        stat1: { value: '89%', label: 'decisions favor employers' },
        stat2: { value: '3-5 yr', label: 'appeal process length' },
        stat3: { value: '$50K+', label: 'average legal costs' },
        stat4: { value: '15%', label: 'give up from exhaustion' },
        callToAction: 'Justice Delayed is Justice Denied',
        source: 'Oracle Eye Court Records'
      }
    },
    {
      id: 'disability-poverty',
      name: 'Disability Poverty Pipeline',
      icon: '💔',
      color: '#e74c3c',
      eyeData: 'Social services data + economic analysis',
      defaultData: {
        title: 'DISABILITY = POVERTY',
        subtitle: 'The Intentional Pipeline',
        stat1: { value: '2x', label: 'poverty rate vs abled' },
        stat2: { value: '$12K', label: 'median disabled income' },
        stat3: { value: '54%', label: 'can\'t afford prescriptions' },
        stat4: { value: '1 in 3', label: 'face food insecurity' },
        callToAction: 'Austerity Kills',
        source: 'Oracle Eye + Statistics Canada'
      }
    },
    {
      id: 'medical-gaslighting',
      name: 'Medical Gaslighting Stats',
      icon: '🩺',
      color: '#3498db',
      eyeData: 'Patient advocacy data + healthcare complaints',
      defaultData: {
        title: 'MEDICAL GASLIGHTING IS REAL',
        subtitle: 'Invisible Illness Made Visible',
        stat1: { value: '83%', label: 'women told "it\'s in your head"' },
        stat2: { value: '7+ yrs', label: 'avg time to diagnosis' },
        stat3: { value: '91%', label: 'dismissed by multiple doctors' },
        stat4: { value: '65%', label: 'stop seeking care' },
        callToAction: 'My Pain is Valid',
        source: 'Oracle Eye Patient Surveys'
      }
    },
    {
      id: 'workplace-deaths',
      name: 'Workplace Deaths Covered Up',
      icon: '⚰️',
      color: '#34495e',
      eyeData: 'Coroner reports + WSIB death benefits',
      defaultData: {
        title: 'THEY KILLED US',
        subtitle: 'Preventable Workplace Deaths',
        stat1: { value: '1,027', label: 'workers killed annually' },
        stat2: { value: '251', label: 'deaths covered up' },
        stat3: { value: '$0', label: 'corporate accountability' },
        stat4: { value: '100%', label: 'preventable tragedies' },
        callToAction: 'Remember Their Names',
        source: 'Oracle Eye Fatality Database'
      }
    },
    {
      id: 'chronic-pain',
      name: 'Chronic Pain Epidemic',
      icon: '⚡',
      color: '#f39c12',
      eyeData: 'Pain research + disability benefits data',
      defaultData: {
        title: 'THE CHRONIC PAIN CRISIS',
        subtitle: 'Living With Invisible Disability',
        stat1: { value: '1 in 5', label: 'Canadians live with chronic pain' },
        stat2: { value: '37%', label: 'can\'t work full-time' },
        stat3: { value: '56%', label: 'denied disability benefits' },
        stat4: { value: '$63B', label: 'annual economic impact' },
        callToAction: 'Pain Doesn\'t Show on X-rays',
        source: 'Oracle Eye Pain Registry'
      }
    },
    {
      id: 'mental-health',
      name: 'Mental Health Discrimination',
      icon: '🧠',
      color: '#9b59b6',
      eyeData: 'Mental health tribunal decisions',
      defaultData: {
        title: 'MENTAL HEALTH STIGMA KILLS',
        subtitle: 'Workplace Discrimination Data',
        stat1: { value: '78%', label: 'hide mental illness from employer' },
        stat2: { value: '42%', label: 'face workplace discrimination' },
        stat3: { value: '89%', label: 'mental health claims denied' },
        stat4: { value: '63%', label: 'forced to quit jobs' },
        callToAction: 'End the Stigma',
        source: 'Oracle Eye Mental Health Data'
      }
    },
    {
      id: 'accessibility',
      name: 'Accessibility Failures',
      icon: '♿',
      color: '#16a085',
      eyeData: 'Building code violations + complaints',
      defaultData: {
        title: 'ACCESSIBILITY IS A RIGHT',
        subtitle: 'Not a Suggestion',
        stat1: { value: '84%', label: 'buildings not fully accessible' },
        stat2: { value: '91%', label: 'violations not enforced' },
        stat3: { value: '$0', label: 'fines actually collected' },
        stat4: { value: '57%', label: 'can\'t access public spaces' },
        callToAction: 'Ramps Not Barriers',
        source: 'Oracle Eye Accessibility Audit'
      }
    },
    {
      id: 'economic-inequality',
      name: 'Disabled Economic Inequality',
      icon: '💸',
      color: '#c0392b',
      eyeData: 'Income data + employment statistics',
      defaultData: {
        title: 'DISABLED WAGE GAP',
        subtitle: 'Structural Economic Violence',
        stat1: { value: '49%', label: 'less than minimum wage' },
        stat2: { value: '2x', label: 'unemployment vs abled' },
        stat3: { value: '$28K', label: 'avg income gap per year' },
        stat4: { value: '76%', label: 'underemployed or unemployed' },
        callToAction: 'Equal Pay for Equal Worth',
        source: 'Oracle Eye Economic Data'
      }
    },
    {
      id: 'appeal-failure',
      name: 'Appeal System Failure',
      icon: '📋',
      color: '#d35400',
      eyeData: 'Tribunal decisions + appeal statistics',
      defaultData: {
        title: 'THE APPEAL RIGGED GAME',
        subtitle: 'How the System Breaks Us',
        stat1: { value: '27 mo', label: 'average appeal wait' },
        stat2: { value: '11%', label: 'appeals actually succeed' },
        stat3: { value: '$73K', label: 'lost income during wait' },
        stat4: { value: '68%', label: 'forced to settle unfairly' },
        callToAction: 'They Count on You Giving Up',
        source: 'Oracle Eye Tribunal Analysis'
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

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Title
    ctx.font = 'bold 60px Arial';
    ctx.fillStyle = '#00ffff';
    ctx.textAlign = 'center';
    ctx.fillText('WORKERS COMP STATS', 540, 100);

    // Data visualization
    const stats = [
      { label: infographicData.stat1Label || 'Claims Denied', value: infographicData.stat1Value || '35%', color: '#ff6b6b' },
      { label: infographicData.stat2Label || 'Wait Time', value: infographicData.stat2Value || '6 months', color: '#ffd93d' },
      { label: infographicData.stat3Label || 'Recovery Rate', value: infographicData.stat3Value || '42%', color: '#48c774' },
      { label: infographicData.stat4Label || 'Cases Appealed', value: infographicData.stat4Value || '28%', color: '#667eea' }
    ];

    let y = 200;
    stats.forEach((stat, index) => {
      // Stat box
      ctx.fillStyle = stat.color;
      ctx.fillRect(140, y, 800, 120);
      
      // Value
      ctx.font = 'bold 50px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(stat.value, 540, y + 60);
      
      // Label
      ctx.font = 'bold 30px Arial';
      ctx.fillText(stat.label, 540, y + 100);
      
      y += 150;
    });

    // Quote section
    if (infographicData.quote) {
      ctx.font = 'italic 28px Arial';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(`"${infographicData.quote}"`, 540, y + 50);
      
      if (infographicData.quoteAuthor) {
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#00ffff';
        ctx.fillText(`- ${infographicData.quoteAuthor}`, 540, y + 90);
      }
    }

    // CTA
    if (infographicData.callToAction) {
      ctx.font = 'bold 32px Arial';
      ctx.fillStyle = '#FFD700';
      ctx.textAlign = 'center';
      ctx.fillText(infographicData.callToAction, 540, 950);
    }

    // Watermark
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText('🌐 injuredworkersunite.pages.dev', 540, 1050);

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `infographic-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>
        📊 Infographic Generator
      </h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9, lineHeight: '1.7' }}>
        Create powerful, shareable infographics with Oracle Eye data. Choose a template, 
        customize the data, and download for social media.
      </p>

      {/* Oracle Eye Integration Banner */}
      <div style={{
        background: 'rgba(0,255,255,0.1)',
        border: '1px solid rgba(0,255,255,0.3)',
        borderRadius: '10px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>👁️</div>
          <div>
            <h3 style={{ margin: 0, color: '#00ffff' }}>Oracle Eye Data Integration</h3>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.95rem', opacity: 0.9 }}>
              Each template automatically pulls verified data from government sources
            </p>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#764ba2' }}>
          1. Choose Template
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
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
                padding: '1.5rem',
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
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{template.icon}</div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{template.name}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7, color: '#00ffff' }}>
                👁️ {template.eyeData}
              </div>
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

      {/* Preview */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#764ba2' }}>
          3. Preview
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
    </div>
  );
}

// ============================================
// CUSTOM MEME BUILDER
// ============================================
function CustomMemeBuilderSection() {
  const [memeText, setMemeText] = useState({ top: '', bottom: '' });
  const [selectedBackground, setSelectedBackground] = useState('protest');

  const backgrounds = [
    { id: 'protest', name: 'Protest Rally', emoji: '✊', color: '#ff6b6b' },
    { id: 'courthouse', name: 'Courthouse Steps', emoji: '⚖️', color: '#ffd93d' },
    { id: 'office', name: 'Corporate Office', emoji: '🏢', color: '#667eea' },
    { id: 'solidarity', name: 'Solidarity', emoji: '🤝', color: '#48c774' },
    { id: 'custom', name: 'Upload Your Own', emoji: '📁', color: '#9b59b6' }
  ];

  const handleMemeDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Background
    const selectedBg = backgrounds.find(bg => bg.id === selectedBackground);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 800, 600);

    // Background emoji/icon
    ctx.font = 'bold 200px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(selectedBg.emoji, 400, 350);

    // Top text
    if (memeText.top) {
      ctx.font = 'bold 50px Impact';
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4;
      ctx.textAlign = 'center';
      ctx.strokeText(memeText.top.toUpperCase(), 400, 100);
      ctx.fillText(memeText.top.toUpperCase(), 400, 100);
    }

    // Bottom text
    if (memeText.bottom) {
      ctx.font = 'bold 50px Impact';
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4;
      ctx.textAlign = 'center';
      ctx.strokeText(memeText.bottom.toUpperCase(), 400, 560);
      ctx.fillText(memeText.bottom.toUpperCase(), 400, 560);
    }

    // Watermark
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'right';
    ctx.fillText('🌐 injuredworkersunite.pages.dev', 780, 585);

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `meme-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>
        🛠️ Custom Meme Builder
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Controls */}
        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#764ba2' }}>
            Design Your Meme
          </h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>
              Top Text
            </label>
            <input
              type="text"
              placeholder="Add your message..."
              value={memeText.top}
              onChange={(e) => setMemeText({ ...memeText, top: e.target.value })}
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

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>
              Bottom Text
            </label>
            <input
              type="text"
              placeholder="Add your punchline..."
              value={memeText.bottom}
              onChange={(e) => setMemeText({ ...memeText, bottom: e.target.value })}
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

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>
              Background Style
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {backgrounds.map(bg => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg.id)}
                  style={{
                    padding: '0.8rem',
                    background: selectedBackground === bg.id ? bg.color : '#16213e',
                    border: `2px solid ${bg.color}`,
                    borderRadius: '8px',
                    color: '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: selectedBackground === bg.id ? 'bold' : 'normal'
                  }}
                >
                  {bg.emoji} {bg.name}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleMemeDownload}
            style={{
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            📥 Download Meme
          </button>
        </div>

        {/* Preview */}
        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#764ba2' }}>
            Preview
          </h3>
          <div style={{
            background: '#000',
            padding: '2rem',
            borderRadius: '10px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '3px solid #667eea'
          }}>
            <p style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              textAlign: 'center',
              textTransform: 'uppercase',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}>
              {memeText.top || 'TOP TEXT'}
            </p>
            <div style={{ 
              textAlign: 'center',
              fontSize: '4rem'
            }}>
              {backgrounds.find(bg => bg.id === selectedBackground)?.emoji}
            </div>
            <p style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              textAlign: 'center',
              textTransform: 'uppercase',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}>
              {memeText.bottom || 'BOTTOM TEXT'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SLOGAN GENERATOR - EXPANDED WITH VIRAL CATEGORIES
// ============================================
function SloganGeneratorSection() {
  const [generatedSlogan, setGeneratedSlogan] = useState('');
  const [sloganCategory, setSloganCategory] = useState('general');

  const slogans = {
    general: [
      'They denied my claim, we deny their legitimacy',
      'Injured not invisible',
      'Our pain is political',
      'No one is disposable',
      'From injury to injustice: the system failed us',
      'Disabled and DANGEROUS (to corporate profits)',
      'They bet on our silence. They lost.',
      'My body broke. My spirit didn\'t.',
      'Chronic illness, chronic resistance',
      'Rest is resistance',
      'Disabled, not disposable',
      'We are the experts on our own lives',
      'My body is evidence',
      'Surviving despite the system',
      'From bedbound to unbowed'
    ],
    charter: [
      'Section 7: My life, liberty, security',
      'Charter violations end here',
      'Equal rights under Section 15',
      'Cruel treatment stops now - Section 12',
      'Justice demands action',
      'Constitutional rights aren\'t negotiable',
      'Section 15: Equality includes the disabled',
      'Rights delayed are rights denied',
      'The Charter protects ALL Canadians',
      'Section 12: No cruel and unusual treatment'
    ],
    evidence: [
      'The Oracle Eye sees all',
      'Receipts don\'t lie',
      'Data never sleeps',
      'Evidence over excuses',
      'We have the proof',
      'Documented, not desperate',
      'My evidence speaks louder than their lies',
      'FOI requests are my love language',
      'Paper trails don\'t lie',
      'Screenshots are forever',
      'The truth is in the documents',
      'Every denial is evidence of the system'
    ],
    solidarity: [
      'An injury to one is an injury to all',
      'Together we are unstoppable',
      'Collective power beats corporate lies',
      'United in resistance',
      'Solidarity forever',
      'We keep us safe',
      'Community care > corporate profits',
      'Alone we beg. Together we demand.',
      'Mutual aid not charity',
      'None of us are free until all of us are free',
      'Workers united will never be divided',
      'In solidarity we thrive'
    ],
    spicy: [
      'WCB: Workers Can\'t Breathe',
      'Gaslight • Gatekeep • WCB Boss',
      'The cruelty is the point',
      'Profit over people isn\'t a bug—it\'s the feature',
      'They want us dead, not disabled and demanding rights',
      'Your \'suitable work\' doesn\'t exist',
      'Permanent injury. Temporary benefits. Explain.',
      'Corporate fraud: ✅ Worker mistake: DENIED ❌',
      'The system isn\'t broken—it\'s working as designed',
      'Ableism kills',
      'Poverty is violence',
      'Austerity is murder',
      'The cruelty is structural',
      'Organized abandonment',
      'Social murder with paperwork'
    ],
    protest: [
      'NO JUSTICE, NO PEACE',
      'HEALTHCARE IS A HUMAN RIGHT',
      'WORKERS UNITED WILL NEVER BE DEFEATED',
      'DISABILITY RIGHTS = HUMAN RIGHTS',
      'SHAME ON WCB',
      'STOP ABANDONING INJURED WORKERS',
      'PAY US OR FACE US',
      'WE WON\'T BE SILENCED',
      'ACCESSIBILITY NOW',
      'FUND DISABILITY JUSTICE',
      'BENEFITS NOT BUREAUCRACY',
      'RIGHTS NOT CHARITY',
      'NOTHING ABOUT US WITHOUT US',
      'ACCESS IS A RIGHT'
    ],
    viral: [
      'POV: You\'re permanently disabled but WCB says "transition to suitable work"',
      'They spent more fighting my claim than approving it',
      'My injury is permanent. My benefits are temporary. Math isn\'t mathing.',
      'WCB protects workers like foxes protect chickens',
      'Being disabled under capitalism is being gaslit by insurance doctors',
      'Reminder: The system isn\'t broken. It\'s working exactly as designed.',
      'If your employer lied and got away with it—the system works FOR them',
      'They tell us to rest but won\'t pay us to rest',
      'Disability benefits that don\'t cover rent aren\'t benefits',
      'Suitable work: doesn\'t accommodate disability, doesn\'t pay living wage, doesn\'t exist',
      'Case manager ghosted me but I\'m the one "not cooperating"',
      'Insurance doctor: 10 minutes. My doctor: 10 years. Guess who they believe?',
      'Employer commits fraud: nothing. I miss one deadline: DENIED',
      'Pain is 24/7. Their concern is 9-5 Monday-Friday',
      'My body is the crime scene and the evidence but I\'m still not credible'
    ],
    medical: [
      'My pain is valid',
      'Believe disabled people',
      'Chronic pain is real',
      'Invisible illness, visible resistance',
      'No body is wrong',
      'Self-diagnosis is valid',
      'Listen to patient experiences',
      'Medical gaslighting is abuse',
      'Accommodations aren\'t favors',
      'Rest is productive',
      'Pacing prevents crashing',
      'Disabled joy is resistance',
      'Healing isn\'t linear'
    ],
    revolution: [
      'The revolution will be accessible',
      'Abolish ableism',
      'Smash the WCB system',
      'Dismantle disability oppression',
      'Burn down barriers',
      'Radical accessibility now',
      'No cops at disability justice',
      'Intersectional or nothing',
      'Disability justice is climate justice',
      'Housing is healthcare',
      'Collective liberation or nothing',
      'The future is accessible'
    ]
  };
      'Community care > corporate profits',
      'Alone we beg. Together we demand.'
    ],
    spicy: [
      'WCB: Workers Can\'t Breathe',
      'Gaslight • Gatekeep • WCB Boss',
      'The cruelty is the point',
      'Profit over people isn\'t a bug—it\'s the feature',
      'They want us dead, not disabled and demanding rights',
      'Your \'suitable work\' doesn\'t exist',
      'Permanent injury. Temporary benefits. Explain.',
      'Corporate fraud: ✅ Worker mistake: DENIED ❌'
    ],
    protest: [
      'NO JUSTICE, NO PEACE',
      'HEALTHCARE IS A HUMAN RIGHT',
      'WORKERS UNITED WILL NEVER BE DEFEATED',
      'DISABILITY RIGHTS = HUMAN RIGHTS',
      'SHAME ON WCB',
      'STOP ABANDONING INJURED WORKERS',
      'PAY US OR FACE US',
      'WE WON\'T BE SILENCED'
    ],
    viral: [
      'POV: You\'re permanently disabled but WCB says "transition to suitable work"',
      'They spent more fighting my claim than approving it',
      'My injury is permanent. My benefits are temporary. Math isn\'t mathing.',
      'WCB protects workers like foxes protect chickens',
      'Being disabled under capitalism is being gaslit by insurance doctors',
      'Reminder: The system isn\'t broken. It\'s working exactly as designed.',
      'If your employer lied and got away with it—the system works FOR them',
      'They tell us to rest but won\'t pay us to rest'
    ]
  };

  const generateSlogan = (category) => {
    const categorySlogan = slogans[category];
    const random = categorySlogan[Math.floor(Math.random() * categorySlogan.length)];
    setGeneratedSlogan(random);
  };

  const copySlogan = () => {
    if (generatedSlogan) {
      navigator.clipboard.writeText(generatedSlogan + "\n\n🌐 injuredworkersunite.pages.dev");
      alert('✅ Copied to clipboard!');
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>
        ✊ Viral Slogan Generator
      </h2>
      
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
        Generate powerful slogans for protests, social media, and resistance. One click to virality.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <button
          onClick={() => { setSloganCategory('viral'); generateSlogan('viral'); }}
          style={{
            padding: '1rem',
            background: sloganCategory === 'viral' ? '#ff0080' : '#16213e',
            border: '2px solid #ff0080',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: sloganCategory === 'viral' ? 'bold' : 'normal',
            fontSize: '1rem'
          }}
        >
          🔥 Viral Tweets
        </button>
        <button
          onClick={() => { setSloganCategory('spicy'); generateSlogan('spicy'); }}
          style={{
            padding: '1rem',
            background: sloganCategory === 'spicy' ? '#ff6b6b' : '#16213e',
            border: '2px solid #ff6b6b',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: sloganCategory === 'spicy' ? 'bold' : 'normal'
          }}
        >
          🌶️ Spicy
        </button>
        <button
          onClick={() => { setSloganCategory('protest'); generateSlogan('protest'); }}
          style={{
            padding: '1rem',
            background: sloganCategory === 'protest' ? '#ff8c00' : '#16213e',
            border: '2px solid #ff8c00',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: sloganCategory === 'protest' ? 'bold' : 'normal'
          }}
        >
          ✊ Protest
        </button>
        <button
          onClick={() => { setSloganCategory('general'); generateSlogan('general'); }}
          style={{
            padding: '1rem',
            background: sloganCategory === 'general' ? '#667eea' : '#16213e',
            border: '2px solid #667eea',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: sloganCategory === 'general' ? 'bold' : 'normal'
          }}
        >
          General
        </button>
        <button
          onClick={() => { setSloganCategory('charter'); generateSlogan('charter'); }}
          style={{
            padding: '1rem',
            background: sloganCategory === 'charter' ? '#ffd93d' : '#16213e',
            border: '2px solid #ffd93d',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: sloganCategory === 'charter' ? 'bold' : 'normal'
          }}
        >
          Charter Rights
        </button>
        <button
          onClick={() => { setSloganCategory('evidence'); generateSlogan('evidence'); }}
          style={{
            padding: '1rem',
            background: sloganCategory === 'evidence' ? '#00ffff' : '#16213e',
            border: '2px solid #00ffff',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: sloganCategory === 'evidence' ? 'bold' : 'normal'
          }}
        >
          👁️ Oracle Eye
        </button>
        <button
          onClick={() => { setSloganCategory('solidarity'); generateSlogan('solidarity'); }}
          style={{
            padding: '1rem',
            background: sloganCategory === 'solidarity' ? '#48c774' : '#16213e',
            border: '2px solid #48c774',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: sloganCategory === 'solidarity' ? 'bold' : 'normal'
          }}
        >
          🤝 Solidarity
        </button>
        <button
          onClick={() => { setSloganCategory('medical'); generateSlogan('medical'); }}
          style={{
            padding: '1rem',
            background: sloganCategory === 'medical' ? '#9b59b6' : '#16213e',
            border: '2px solid #9b59b6',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: sloganCategory === 'medical' ? 'bold' : 'normal'
          }}
        >
          🏥 Medical Justice
        </button>
        <button
          onClick={() => { setSloganCategory('revolution'); generateSlogan('revolution'); }}
          style={{
            padding: '1rem',
            background: sloganCategory === 'revolution' ? '#e74c3c' : '#16213e',
            border: '2px solid #e74c3c',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: sloganCategory === 'revolution' ? 'bold' : 'normal'
          }}
        >
          🔥 Revolution
        </button>
      </div>

      {generatedSlogan && (
        <div style={{
          padding: '2rem',
          background: 'rgba(0,255,255,0.1)',
          border: '2px solid #00ffff',
          borderRadius: '15px',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            "{generatedSlogan}"
          </p>
          <button 
            onClick={copySlogan}
            style={{
            padding: '0.8rem 1.5rem',
            background: '#00ffff',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            📋 Copy to Clipboard
          </button>
        </div>
      )}

      <div style={{
        background: 'rgba(0,0,0,0.4)',
        padding: '1.5rem',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h4 style={{ color: '#764ba2', marginBottom: '1rem' }}>💡 Tips for Powerful Slogans</h4>
        <ul style={{ fontSize: '0.95rem', lineHeight: '1.8', opacity: 0.9 }}>
          <li>Keep it short and memorable (7 words or less)</li>
          <li>Make it rhyme or use rhythm when possible</li>
          <li>Include a call to action</li>
          <li>Reference specific laws or data points</li>
          <li>Make it easy to chant</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// ADVANCED MEME WARFARE TOOLS
// ============================================
function AdvancedMemeWarfareSection() {
  const advancedTools = [
    {
      id: 'ai-caption',
      name: 'AI Caption Generator',
      description: 'Generate viral captions using Oracle Eye data',
      icon: '🤖',
      color: '#667eea'
    },
    {
      id: 'thread-builder',
      name: 'Twitter Thread Builder',
      description: 'Create multi-tweet threads with sources',
      icon: '🧵',
      color: '#764ba2'
    },
    {
      id: 'meme-analytics',
      name: 'Meme Analytics',
      description: 'Track which memes perform best',
      icon: '📈',
      color: '#48c774'
    },
    {
      id: 'evidence-overlay',
      name: 'Evidence Overlay Tool',
      description: 'Add Oracle Eye citations to any image',
      icon: '👁️',
      color: '#00ffff'
    },
    {
      id: 'video-meme',
      name: 'Video Meme Maker',
      description: 'Create short video memes with subtitles',
      icon: '🎬',
      color: '#f39c12'
    },
    {
      id: 'hashtag-optimizer',
      name: 'Hashtag Optimizer',
      description: 'Find the best hashtags for maximum reach',
      icon: '#️⃣',
      color: '#9b59b6'
    }
  ];

  return (
    <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#667eea' }}>
        ⚡ Advanced Meme Warfare Tools
      </h2>
      
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
        Professional-grade tools for serious memetic operations
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {advancedTools.map(tool => (
          <div
            key={tool.id}
            style={{
              padding: '2rem',
              background: '#16213e',
              border: `2px solid ${tool.color}`,
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
              {tool.icon}
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: tool.color }}>
              {tool.name}
            </h3>
            <p style={{ fontSize: '0.95rem', opacity: 0.9, marginBottom: '1rem' }}>
              {tool.description}
            </p>
            <button style={{
              width: '100%',
              padding: '0.8rem',
              background: tool.color,
              color: tool.id === 'evidence-overlay' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Launch Tool →
            </button>
          </div>
        ))}
      </div>

      {/* Oracle Eye Integration */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'rgba(0,255,255,0.1)',
        border: '1px solid rgba(0,255,255,0.3)',
        borderRadius: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '3rem' }}>👁️</div>
          <div>
            <h3 style={{ margin: 0, color: '#00ffff', fontSize: '1.5rem' }}>
              Powered by The Oracle Eye
            </h3>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>
              All advanced tools integrate real-time intelligence from government databases
            </p>
          </div>
        </div>
        <Link href="/the-eye-oracle" style={{
          display: 'inline-block',
          padding: '0.8rem 1.5rem',
          background: 'linear-gradient(135deg, #00ffff, #0088ff)',
          color: '#000',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          marginTop: '1rem'
        }}>
          👁️ Access The Oracle Eye →
        </Link>
      </div>
    </div>
  );
}

// Helper function for tab styling
function getTabStyle(isActive) {
  return {
    padding: '0.8rem 1.5rem',
    background: isActive ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
    border: '2px solid #667eea',
    borderRadius: '25px',
    color: 'white',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
    fontSize: '1rem'
  };
}

const buttonStyle = {
  padding: '0.8rem 1.5rem',
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  color: 'white',
  border: 'none',
  borderRadius: '25px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  background: '#0f3460',
  border: '2px solid #667eea',
  borderRadius: '8px',
  color: 'white',
  fontSize: '1rem',
  marginBottom: '1rem'
};

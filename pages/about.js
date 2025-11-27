import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    {
      name: 'Twitter/X',
      icon: '𝕏',
      url: 'https://x.com/InjuredWorkersU',
      color: '#000000',
      description: 'Follow for daily updates and advocacy'
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: 'https://www.facebook.com/InjuredWorkersUnite',
      color: '#1877F2',
      description: 'Join our community'
    },
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://www.instagram.com/injuredworkersunite/',
      color: '#E4405F',
      description: 'Memes and visual advocacy'
    },
    {
      name: 'TikTok',
      icon: '🎵',
      url: 'https://www.tiktok.com/@injuredworkersunite',
      color: '#000000',
      description: 'Short-form advocacy content'
    },
    {
      name: 'YouTube',
      icon: '▶️',
      url: 'https://www.youtube.com/@InjuredWorkersUnite',
      color: '#FF0000',
      description: 'Long-form content and stories'
    },
    {
      name: 'Reddit',
      icon: '🤖',
      url: 'https://www.reddit.com/r/InjuredWorkersUnite/',
      color: '#FF4500',
      description: 'Community discussions'
    },
    {
      name: 'GitHub',
      icon: '💻',
      url: 'https://github.com/phoenixrizin09/InjuredWorkersUnite',
      color: '#333',
      description: 'Open-source advocacy tools'
    }
  ];

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        color: '#fff',
        padding: '60px 20px',
        fontFamily: 'monospace'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Hero Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
            padding: '3rem 2rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '20px',
            border: '2px solid rgba(79, 172, 254, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #ff0080 0%, #ff8c00 50%, #4facfe 100%)'
            }}></div>
            
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              background: 'linear-gradient(135deg, #4facfe 0%, #ff0080 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
              fontWeight: '900'
            }}>
              About Injured Workers Unite
            </h1>
            
            <p style={{
              fontSize: '1.2rem',
              color: '#aaa',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              A grassroots movement exposing systemic corruption and fighting for the rights of injured workers and persons with disabilities across Canada
            </p>
          </div>

          {/* Founder Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(79, 172, 254, 0.3)',
              borderRadius: '20px',
              padding: '2.5rem',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '30px',
                background: 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
                padding: '0.5rem 1.5rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(255, 0, 128, 0.4)'
              }}>
                ⚡ FOUNDER & CREATOR
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                {/* Photo */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    position: 'relative',
                    width: '280px',
                    height: '350px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '4px solid #9932CC',
                    boxShadow: '0 10px 40px rgba(153, 50, 204, 0.4), 0 0 60px rgba(255, 140, 0, 0.2)'
                  }}>
                    <img 
                      src="/Lissa-speakers-school.jpg" 
                      alt="Lissa Beaulieu speaking at Speakers School graduation"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                      padding: '2rem 1rem 1rem',
                      textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '0.85rem', color: '#ccc' }}>
                        📍 Speakers School Graduation
                      </span>
                    </div>
                  </div>
                  <a 
                    href="https://www.speakersschool.ca/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      marginTop: '0.75rem',
                      fontSize: '0.85rem',
                      color: '#4facfe',
                      textDecoration: 'none'
                    }}
                  >
                    🎓 Speakers School Canada →
                  </a>
                </div>

                <h2 style={{
                  fontSize: '2rem',
                  color: '#4facfe',
                  marginBottom: '0.5rem',
                  fontWeight: '800'
                }}>
                  Lissa Beaulieu
                </h2>

                {/* Phoenix Title */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  background: 'linear-gradient(135deg, rgba(153, 50, 204, 0.2) 0%, rgba(255, 140, 0, 0.2) 100%)',
                  border: '2px solid #9932CC',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '15px',
                  width: 'fit-content'
                }}>
                  <span style={{ fontSize: '1.8rem' }}>🔥</span>
                  <div>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      color: '#9932CC'
                    }}>
                      The Phoenix — Commander of the Embassy
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#ff8c00',
                      fontStyle: 'italic'
                    }}>
                      Strategic Commander & Moral Core
                    </div>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    background: 'rgba(79, 172, 254, 0.2)',
                    border: '1px solid #4facfe',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    color: '#4facfe'
                  }}>
                    🏥 Injured Worker
                  </span>
                  <span style={{
                    background: 'rgba(255, 140, 0, 0.2)',
                    border: '1px solid #ff8c00',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    color: '#ff8c00'
                  }}>
                    ♿ Person with Disabilities
                  </span>
                  <span style={{
                    background: 'rgba(255, 0, 128, 0.2)',
                    border: '1px solid #ff0080',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    color: '#ff0080'
                  }}>
                    ✊ Advocate & Activist
                  </span>
                </div>

                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#ccc',
                  marginBottom: '2rem'
                }}>
                  <p style={{ marginBottom: '1rem' }}>
                    I am an injured worker living with permanent disabilities caused by workplace injuries sustained as a PSW (Personal Support Worker). My injuries include damage to my neck, shoulders, and entire spine down to my tailbone.
                  </p>
                  
                  <p style={{ marginBottom: '1rem' }}>
                    Currently navigating the <strong style={{ color: '#ff8c00' }}>WSIB appeals process</strong>, I advocate not only for myself but for all persons with disabilities who are trapped in a broken system designed to deny, delay, and demoralize.
                  </p>
                  
                  <p style={{ marginBottom: '1rem' }}>
                    I've been through the system. I've experienced firsthand how easy it is to <strong style={{ color: '#ff0080' }}>fall through the cracks</strong>. It took years to see the harsh realities we face:
                  </p>
                  
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    marginLeft: '1rem'
                  }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                      🚨 <strong>67% mental health claim denial rate</strong> at WSIB
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      ⏳ <strong>18-month average claim processing delays</strong>
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      💰 <strong>$1,308/month ODSP poverty wages</strong> (48% below poverty line)
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      📉 <strong>Systemic barriers</strong> designed to exhaust and eliminate claimants
                    </li>
                  </ul>
                  
                  <p style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                    As a <strong style={{ color: '#4facfe' }}>meme & content creator</strong>, I use humor, truth, and viral media to expose corruption and build solidarity. Memes are weapons. Truth is our ammunition.
                  </p>

                  <p style={{ marginBottom: '1rem' }}>
                    As <strong style={{ color: '#9932CC' }}>The Phoenix</strong>, I lead the <Link href="/memetic-embassy-full" style={{ color: '#ff00ff', textDecoration: 'underline' }}>Memetic Embassy</Link> — an interdimensional activist HQ where injured workers receive asylum, tools to fight back, and truth-based power. My abilities include <strong style={{ color: '#ff8c00' }}>Rebirth Memetics</strong> — turning trauma into power, generating Hope Bursts, and resurrecting crushed narratives. From the ashes, we rise. Together. 🔥
                  </p>
                </div>

                {/* 3mpwr App Highlight */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(255, 0, 128, 0.1) 100%)',
                  border: '2px solid #4facfe',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  marginTop: '2rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '2rem' }}>⚡</span>
                    <div>
                      <h3 style={{
                        fontSize: '1.3rem',
                        color: '#4facfe',
                        margin: 0,
                        fontWeight: '700'
                      }}>
                        Creator of 3mpwr App
                      </h3>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#888', fontSize: '0.9rem' }}>
                        Empowerment through technology
                      </p>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#ccc',
                    lineHeight: '1.6',
                    marginBottom: '1rem',
                    fontSize: '0.95rem'
                  }}>
                    Building tools that empower injured workers, persons with disabilities, and marginalized communities to fight back against systemic oppression.
                  </p>
                  
                  <a
                    href="https://3mpwrapp.pages.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #4facfe 0%, #ff0080 100%)',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '25px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(79, 172, 254, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(79, 172, 254, 0.4)';
                    }}
                  >
                    🚀 Visit 3mpwr App →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '2px solid rgba(255, 140, 0, 0.3)',
            borderRadius: '20px',
            padding: '2.5rem',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              color: '#ff8c00',
              marginBottom: '1.5rem',
              fontWeight: '800'
            }}>
              🎯 Our Mission
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                {
                  icon: '🔍',
                  title: 'EXPOSE',
                  description: 'Reveal systemic corruption, discrimination, and abuse in workers\' compensation systems'
                },
                {
                  icon: '📊',
                  title: 'DOCUMENT',
                  description: 'Gather and share real data, court cases, and evidence of rights violations'
                },
                {
                  icon: '✊',
                  title: 'MOBILIZE',
                  description: 'Build solidarity and organize collective action for systemic change'
                },
                {
                  icon: '⚖️',
                  title: 'ADVOCATE',
                  description: 'Fight for injured workers, persons with disabilities, and all marginalized communities'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '1.5rem',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 140, 0, 0.2)'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    {item.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    color: '#ff8c00',
                    marginBottom: '0.5rem',
                    fontWeight: '700'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    color: '#aaa',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Section */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '2px solid rgba(255, 0, 128, 0.3)',
            borderRadius: '20px',
            padding: '2.5rem',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              color: '#ff0080',
              marginBottom: '0.5rem',
              fontWeight: '800',
              textAlign: 'center'
            }}>
              🌐 Connect With Us
            </h2>
            <p style={{
              textAlign: 'center',
              color: '#888',
              marginBottom: '2rem',
              fontSize: '1rem'
            }}>
              Join the movement on your preferred platform
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(idx)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    background: hoveredSocial === idx 
                      ? `linear-gradient(135deg, ${social.color}22 0%, ${social.color}44 100%)`
                      : 'rgba(255,255,255,0.05)',
                    border: `2px solid ${hoveredSocial === idx ? social.color : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '15px',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    transform: hoveredSocial === idx ? 'translateY(-5px)' : 'translateY(0)',
                    boxShadow: hoveredSocial === idx 
                      ? `0 8px 25px ${social.color}44`
                      : '0 2px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '0.75rem',
                    filter: hoveredSocial === idx ? 'brightness(1.3)' : 'brightness(1)'
                  }}>
                    {social.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    color: hoveredSocial === idx ? social.color : '#fff',
                    marginBottom: '0.5rem',
                    fontWeight: '700'
                  }}>
                    {social.name}
                  </h3>
                  <p style={{
                    color: '#888',
                    fontSize: '0.85rem',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {social.description}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 0, 128, 0.1) 0%, rgba(79, 172, 254, 0.1) 100%)',
            border: '2px solid #4facfe',
            borderRadius: '20px',
            padding: '3rem 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2rem',
              color: '#4facfe',
              marginBottom: '1rem',
              fontWeight: '800'
            }}>
              ✊ Join the Fight
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#ccc',
              maxWidth: '700px',
              margin: '0 auto 2rem auto',
              lineHeight: '1.8'
            }}>
              Whether you're an injured worker, person with disabilities, advocate, or ally — we need you. 
              Together we expose corruption, demand accountability, and fight for justice.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/alerts" style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '30px',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(255, 0, 128, 0.4)',
                transition: 'all 0.3s'
              }}>
                🚨 View Active Alerts
              </Link>
              <Link href="/the-eye" style={{
                padding: '1rem 2rem',
                background: 'rgba(79, 172, 254, 0.2)',
                border: '2px solid #4facfe',
                color: '#4facfe',
                textDecoration: 'none',
                borderRadius: '30px',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}>
                👁️ Launch THE EYE
              </Link>
              <Link href="/contact" style={{
                padding: '1rem 2rem',
                background: 'rgba(255, 140, 0, 0.2)',
                border: '2px solid #ff8c00',
                color: '#ff8c00',
                textDecoration: 'none',
                borderRadius: '30px',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}>
                📧 Get In Touch
              </Link>
            </div>
          </div>

          {/* Why This Matters */}
          <div style={{
            marginTop: '4rem',
            padding: '2rem',
            background: 'rgba(255,255,255,0.02)',
            borderLeft: '4px solid #ff0080',
            borderRadius: '10px'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#ff0080',
              marginBottom: '1rem',
              fontWeight: '700'
            }}>
              💡 Why This Matters
            </h3>
            <p style={{
              color: '#bbb',
              fontSize: '1rem',
              lineHeight: '1.8',
              margin: 0
            }}>
              The system isn't broken — <strong style={{ color: '#ff8c00' }}>it's working exactly as designed</strong>. 
              Deny claims. Delay appeals. Demoralize claimants. Protect corporate profits. 
              <br/><br/>
              But when we organize, document, and expose the truth, we become unstoppable. 
              <strong style={{ color: '#4facfe' }}> We are Injured Workers Unite</strong>. 
              We don't ask for justice — we demand it.
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

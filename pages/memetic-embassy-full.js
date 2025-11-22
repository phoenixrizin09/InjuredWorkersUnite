import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MemeticEmbassyFull() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [moodSliders, setMoodSliders] = useState({
    petty: 50,
    chaotic: 50,
    angry: 50,
    hopeful: 50,
    sarcastic: 50
  });
  const [generatedMeme, setGeneratedMeme] = useState(null);
  const [citizenshipClaimed, setCitizenshipClaimed] = useState(false);
  const [selectedHabitat, setSelectedHabitat] = useState(null);
  const [spicyLevel, setSpicyLevel] = useState('medium');

  useEffect(() => {
    // Check if user already has citizenship
    if (typeof window !== 'undefined') {
      const citizenship = localStorage.getItem('memetic_embassy_citizenship');
      if (citizenship) {
        setCitizenshipClaimed(true);
      }
    }
  }, []);

  const denialSquad = [
    {
      id: 'delayla',
      name: 'Case Manager Delayla Denywell',
      title: 'Queen of Delay & Denials',
      emoji: '💅',
      powers: [
        'Makes evidence disappear in 0.3 seconds',
        'Files paperwork into "The Abyss of Lost Claims"',
        'Summons 12-week waiting periods like magic dust',
        'Smiles like everything is fine while everything burns'
      ],
      signature_move: 'The Perpetual Pending Spell',
      weakness: 'Documentation she actually has to read',
      favorite_phrase: '"Your file seems to be... temporarily unavailable."',
      visual: 'Pastel office wear, denial stamp, latte always in hand',
      backstory: 'Rose through the ranks by never approving a single claim on the first try. Has a wall of "Denied" stamps in her office. Coffee order is always more complex than any claim she reviews.',
      meme_potential: 'HIGH - Perfect for "when your case manager says" templates'
    },
    {
      id: 'no-evidence',
      name: 'Mr. No Evidence Required',
      title: 'Employer Whisperer',
      emoji: '🙈',
      powers: [
        'Approves employer statements telepathically',
        'Detects "worker exaggeration" from 40 miles away',
        "Can't read PDFs (literally doesn't know how)",
        'Believes everything except injured workers'
      ],
      signature_move: 'The Instant Employer Credibility Boost',
      weakness: 'Actual evidence',
      favorite_phrase: '"The employer says you seemed fine, so..."',
      visual: 'Suit, blindfold made from policy manuals, giant rubber stamp that says APPROVED (for employers only)',
      backstory: 'Never met an employer statement he didn\'t trust. Once approved a claim that said "worker injured by unicorn attack" because the employer filled out the form. Has literally never read a medical report.',
      meme_potential: 'CRITICAL - "Employer: *lie* / WSIB: seems legit" format'
    },
    {
      id: 'doctor-files',
      name: 'Doctor Who Never Reads Files',
      title: 'Master of 3-Minute Diagnoses',
      emoji: '🩺',
      powers: [
        '"You look fine to me!" beam (ignores actual injuries)',
        '3-minute appointment time limit (enforced magically)',
        'Can produce contradictory medical reports instantly',
        'Special ability: Googling your condition while you\'re sitting there'
      ],
      signature_move: 'The "Hmm Interesting" Head Nod (while not listening)',
      weakness: 'Patients who bring their own research',
      favorite_phrase: '"Have you tried yoga?"',
      visual: 'Disheveled lab coat, clipboard with nothing on it, stethoscope used as a necklace, computer with 47 tabs open',
      backstory: 'Graduated medical school by memorizing "return to work" forms. Once diagnosed someone without looking up from their phone. Has a secret passion for denying disability claims to "help people push through."',
      meme_potential: 'LEGENDARY - Endless "doctors be like" content'
    },
    {
      id: 'hr-ninja',
      name: 'HR Agent Ninja Vanish',
      title: 'Accountability Avoidance Expert',
      emoji: '🥷',
      powers: [
        'Smoke bombs made of "we take this seriously" statements',
        'Teleports during investigations',
        'Leaves only vague emails behind',
        'Can turn invisible when you need to file a complaint'
      ],
      signature_move: 'The Disappearing Act (right when you need them)',
      weakness: 'Paper trails and witnesses',
      favorite_phrase: '"I\'ll get back to you..." *vanishes*',
      visual: 'Corporate ninja outfit with HR badge, smoke bomb labeled "POLICY", disappearing ink pen',
      backstory: 'Trained in the ancient art of "looking busy while doing nothing." Holds the record for most "we\'re looking into it" emails sent. Has never actually resolved a complaint but has attended 10,000 diversity workshops.',
      meme_potential: 'MAXIMUM - Perfect for ghosting memes'
    }
  ];

  const memeHabitats = [
    {
      id: 'spicy-activism',
      name: 'Habitat of Spicy Activism 🌶️🔥',
      description: 'Where memes go to radicalize. Fire emoji density: 87%. Sarcasm levels: CRITICAL.',
      residents: [
        'The "Eat the Rich" meme family',
        'Call-out culture creatures',
        'Receipt-posting predators',
        'Accountability hawks'
      ],
      climate: 'HOT. No chill zone.',
      indigenous_species: 'Protest sign memes, Twitter thread screenshots, "that you?" energy',
      danger_level: 'Safe for workers, deadly for corporations'
    },
    {
      id: 'dark-humor-valley',
      name: 'Valley of Dark Humor 🌑💀',
      description: 'Laugh so you don\'t cry ecosystem. Therapeutic nihilism meets survival comedy.',
      residents: [
        'Gallows humor gigglers',
        'Trauma-bonding tribes',
        '"If I don\'t laugh I\'ll scream" species',
        'Disabled comedy veterans'
      ],
      climate: 'Dark but cozy. Bring your own coping mechanisms.',
      indigenous_species: 'Pain scale memes, medication jokes, "my body is a prison" content',
      danger_level: 'Emotionally safe, societally dangerous'
    },
    {
      id: 'spoonie-forest',
      name: 'The Spoonie Forest 🥄🌲',
      description: 'Where energy is currency and rest is resistance. Spoon theory central.',
      residents: [
        'Chronic illness warriors',
        'Energy accountants',
        'Nap champions',
        'The "but you don\'t look sick" survivors'
      ],
      climate: 'Low energy, high empathy',
      indigenous_species: 'Spoon counting memes, fatigue jokes, invisible illness content',
      danger_level: 'Gentle and validating'
    },
    {
      id: 'chronic-pain-volcano',
      name: 'The Chronic Pain Volcano 🌋💥',
      description: 'Always erupting, never ending. Pain level: yes. Active 24/7.',
      residents: [
        'Pain scale veterans',
        'Flare survivors',
        'Weather-sensitive beings',
        'The "I said I\'m fine" liars'
      ],
      climate: 'Explosive, unpredictable, validated',
      indigenous_species: 'Pain memes, medication humor, "rate your pain 1-10" satire',
      danger_level: 'Truthful and cathartic'
    },
    {
      id: 'bureaucratic-islands',
      name: 'Bureaucratic Islands of Infinite Waiting ⏳🏝️',
      description: 'Where time moves backward and claims go to die. Kafka would feel at home.',
      residents: [
        'The perpetually pending',
        'Appeals court survivors',
        'Fax machine ghosts',
        'Lost paperwork spirits'
      ],
      climate: 'Slow, frustrating, absurd',
      indigenous_species: 'WSIB memes, insurance logic jokes, "still waiting" content',
      danger_level: 'Existentially horrifying but weirdly funny'
    }
  ];

  const embassyDepartments = [
    {
      name: 'The Hall of Denied Claims',
      icon: '⛔',
      description: 'A sacred memorial to every bullshit denial. Walls lined with redacted documents. Eternal flame of rage burns 24/7.',
      services: [
        'Denial pattern recognition',
        'Rage validation ceremonies',
        'Evidence preservation vault',
        'Appeal ammunition library'
      ]
    },
    {
      name: 'The Ministry of Meme Mutation',
      icon: '🧬',
      description: 'Where memes evolve, adapt, and become unstoppable. Genetic engineering for digital resistance.',
      services: [
        'Meme variant tracking',
        'Viral potential analysis',
        'Cross-pollination lab',
        'Spicy level enhancement'
      ]
    },
    {
      name: 'The Office of Spoonie Affairs',
      icon: '🥄',
      description: 'Dedicated to energy conservation, rest advocacy, and fighting "just try harder" culture.',
      services: [
        'Spoon accounting services',
        'Energy budget consulting',
        'Guilt-free rest certification',
        'Boundary enforcement training'
      ]
    },
    {
      name: 'The Chamber of Chronic Truth',
      icon: '⚡',
      description: 'Where invisible illnesses become visible, pain is believed, and fatigue is validated.',
      services: [
        'Symptom translation services',
        'Visibility amplification',
        'Medical gaslighting detection',
        'Truth-telling sanctuary'
      ]
    },
    {
      name: 'The Department of Justice for the Injured',
      icon: '⚖️',
      description: 'Meme-based accountability. No lawyers, just receipts and satire.',
      services: [
        'Public shaming coordination',
        'Receipt organization',
        'Call-out template library',
        'Consequence manifestation rituals'
      ]
    }
  ];

  const memeCategories = [
    {
      category: 'WSIB / WCB / Workers\' Comp',
      icon: '🏭',
      vibe: 'Bureaucratic horror comedy',
      examples: [
        '"Your claim has been denied for existing"',
        '"We need more evidence" *provides MRI, X-ray, 3 doctor reports* "Not enough"',
        'Employer: "They were fine" / WSIB: "Seems legit"'
      ],
      templates: ['Claim denied for', 'Case manager be like', 'Still waiting since']
    },
    {
      category: 'Insurance Logic',
      icon: '🤡',
      vibe: 'Absurdist satire',
      examples: [
        '"We don\'t cover pre-existing injuries... like the one you got at work"',
        '"You\'re too injured to work but not injured enough for benefits"',
        'Insurance: "We need proof" / Also insurance: *ignores all proof*'
      ],
      templates: ['Insurance logic:', 'Makes perfect sense', 'Wait what']
    },
    {
      category: 'Disability Stereotype Flips',
      icon: '♿',
      vibe: 'Empowered reclaiming',
      examples: [
        '"Wheelchair user? So inspiring!" / Me: *literally just existing*',
        '"You don\'t look disabled" / Cool, you don\'t look ignorant',
        'Society: "Overcome your disability!" / Me: "How about you overcome your ableism?"'
      ],
      templates: ['Flip the script', 'Actually disabled people', 'We\'re not your inspiration']
    },
    {
      category: 'Before Injury vs After',
      icon: '📊',
      vibe: 'Dark reality check',
      examples: [
        'Before: Plans / After: Pain',
        'Before: Dreams / After: Disability benefits barely covering rent',
        'Before: "I got this" / After: "I got... a heating pad and anxiety"'
      ],
      templates: ['Life before', 'Life after', 'The shift']
    },
    {
      category: 'Chronic Pain Humor',
      icon: '💥',
      vibe: 'Laugh through the pain',
      examples: [
        '"Rate your pain 1-10" / Me: "Yes"',
        'My body: *random pain* / Me: "New area unlocked!"',
        '"What caused the flare?" / Weather / Stress / Existing / All of the above'
      ],
      templates: ['Pain scale:', 'My body said', 'Flare reasons']
    },
    {
      category: 'Dark Humor But Empowering',
      icon: '🌑',
      vibe: 'Survival comedy',
      examples: [
        '"How are you?" / Me: *existential scream* / "I\'m good, you?"',
        'My therapist: "What brings you joy?" / Me: "Spite"',
        '"Living my best life" *it\'s actually survival mode but make it aesthetic*'
      ],
      templates: ['Honestly though', 'The truth is', 'Real talk']
    },
    {
      category: 'Activism Fire & Protest',
      icon: '🔥',
      vibe: 'Revolutionary energy',
      examples: [
        '"Just be patient" / Me: I\'ve been patient for 3 years, now I\'m LOUD',
        'They want us quiet / We got MEGAPHONES',
        'Rights aren\'t given, they\'re DEMANDED'
      ],
      templates: ['Enough is enough', 'We demand', 'No more']
    },
    {
      category: 'Spoonie Memes',
      icon: '🥄',
      vibe: 'Energy economics',
      examples: [
        'Spoons today: 3 / Tasks needed: 47',
        '"Just do it" / Me: *checks spoon inventory* Hard pass',
        'Used all my spoons on existing today, sorry'
      ],
      templates: ['Spoon count:', 'Energy budget:', 'Out of spoons']
    }
  ];

  const handleClaimCitizenship = () => {
    if (typeof window !== 'undefined') {
      const citizenID = `ME-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      localStorage.setItem('memetic_embassy_citizenship', JSON.stringify({
        id: citizenID,
        claimed: new Date().toISOString(),
        rights: [
          'Diplomatic immunity from gaslighting',
          'Right to rest without guilt',
          'Right to be believed',
          'Right to make spicy memes',
          'Right to call out injustice'
        ]
      }));
      setCitizenshipClaimed(true);
      alert(`🎉 CITIZENSHIP GRANTED!\n\nYour Memetic Embassy ID: ${citizenID}\n\nYou are now a citizen of the world's first digital nation-state for the marginalized. Welcome home.`);
    }
  };

  const generateMeme = () => {
    const moods = Object.entries(moodSliders).map(([mood, value]) => ({
      mood,
      value,
      weight: value / 100
    }));

    const dominantMood = moods.reduce((prev, current) => 
      current.value > prev.value ? current : prev
    );

    const memeTemplates = {
      petty: [
        '"Oh you need more evidence?" *provides encyclopedia* "Still not enough"',
        'Them: "Have you tried yoga?" / My chronic pain: "Have you tried shutting up?"',
        'Case manager ghosting me / Me: *makes 47 memes about it*'
      ],
      chaotic: [
        'My body: *chaos* / My brain: *more chaos* / Me: "This is fine 🔥"',
        'Pain levels today: *spins wheel* SURPRISE!',
        'Doctor: "Interesting case" / Translation: "I have no idea"'
      ],
      angry: [
        'STILL WAITING FOR MY CLAIM SINCE 2022',
        'They deny benefits / We deny silence',
        '"Just be grateful" / FOR WHAT? POVERTY?'
      ],
      hopeful: [
        'We rise together 💪',
        'Today I rest. Tomorrow I fight.',
        'They tried to break us. We built an embassy instead.'
      ],
      sarcastic: [
        '"Wow you\'re so brave" / Me: *doing basic existence*',
        'Oh yes, let me just "heal" this permanent disability',
        'Thanks, I\'m cured! *eye roll*'
      ]
    };

    const selectedTemplate = memeTemplates[dominantMood.mood][
      Math.floor(Math.random() * memeTemplates[dominantMood.mood].length)
    ];

    setGeneratedMeme({
      template: selectedTemplate,
      mood: dominantMood.mood,
      style: spicyLevel,
      timestamp: new Date().toLocaleString()
    });
  };

  const makeItSpicy = () => {
    if (!generatedMeme) return;

    const spicyLevels = {
      mild: 'petty',
      medium: 'sarcastic',
      hot: 'activism',
      nuclear: 'brutal honesty'
    };

    const nextLevel = spicyLevel === 'mild' ? 'medium' : 
                     spicyLevel === 'medium' ? 'hot' :
                     spicyLevel === 'hot' ? 'nuclear' : 'nuclear';

    setSpicyLevel(nextLevel);

    const spicyVersions = {
      mild: generatedMeme.template,
      medium: generatedMeme.template + ' 🌶️',
      hot: generatedMeme.template.toUpperCase() + ' 🔥🔥🔥',
      nuclear: '🚨 ' + generatedMeme.template.toUpperCase() + ' + NAMES WILL BE NAMED 🚨'
    };

    setGeneratedMeme({
      ...generatedMeme,
      template: spicyVersions[nextLevel],
      style: nextLevel
    });
  };

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a0033 50%, #330066 100%)',
        color: '#fff',
        fontFamily: 'monospace'
      }}>
        {/* HERO SECTION */}
        <div style={{
          background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
          padding: '100px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
            animation: 'slide 20s linear infinite'
          }}></div>
          
          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 5rem)',
            fontWeight: 'bold',
            textShadow: '0 0 20px rgba(255,0,255,0.8), 0 0 40px rgba(0,255,255,0.6)',
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 1,
            color: '#000'
          }}>
            🌐 THE MEMETIC EMBASSY 🌐
          </h1>
          
          <h2 style={{
            fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
            marginBottom: '2rem',
            color: '#000',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1
          }}>
            The World's First Digital Nation-State<br/>
            For The Marginalized, By The Marginalized
          </h2>

          <div style={{
            background: 'rgba(0,0,0,0.8)',
            border: '3px solid #ff00ff',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            <p style={{
              fontSize: '1.3rem',
              lineHeight: '1.8',
              color: '#00ffff',
              marginBottom: '1.5rem'
            }}>
              Welcome to a place where injured workers, persons with disabilities, chronic illness warriors, and everyone overlooked by systems of power are finally the main characters.
            </p>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#ff00ff'
            }}>
              This is:<br/>
              🎭 A Meme Multiverse<br/>
              ✊ A Resistance Movement<br/>
              📚 A Digital Comic Book<br/>
              🏠 A Safe Haven<br/>
              🔥 A Satire-Powered Liberation Project
            </p>
          </div>
        </div>

        {/* SECTION 1: THE DENIAL SQUAD */}
        <div style={{
          padding: '80px 20px',
          background: 'linear-gradient(180deg, #1a0033 0%, #000000 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ff0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              💀 THE DENIAL SQUAD 💀
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#ff6b6b',
              marginBottom: '4rem',
              maxWidth: '800px',
              margin: '0 auto 4rem'
            }}>
              Meet the four recurring animated characters of bureaucratic horror-comedy.<br/>
              <em>Saturday morning cartoon meets Kafkaesque nightmare.</em>
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {denialSquad.map((character) => (
                <div
                  key={character.id}
                  onClick={() => setSelectedCharacter(character.id === selectedCharacter ? null : character.id)}
                  style={{
                    background: selectedCharacter === character.id 
                      ? 'linear-gradient(135deg, #ff0080 0%, #ff6b6b 100%)'
                      : 'rgba(255,255,255,0.05)',
                    border: '3px solid #ff0080',
                    borderRadius: '20px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedCharacter === character.id ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: selectedCharacter === character.id 
                      ? '0 0 30px rgba(255,0,128,0.6)'
                      : 'none'
                  }}
                >
                  <div style={{
                    fontSize: '4rem',
                    textAlign: 'center',
                    marginBottom: '1rem'
                  }}>
                    {character.emoji}
                  </div>

                  <h3 style={{
                    fontSize: '1.5rem',
                    color: selectedCharacter === character.id ? '#fff' : '#ff0080',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold'
                  }}>
                    {character.name}
                  </h3>

                  <div style={{
                    color: selectedCharacter === character.id ? '#fff' : '#ffaacc',
                    fontSize: '1.1rem',
                    marginBottom: '1rem',
                    fontStyle: 'italic'
                  }}>
                    {character.title}
                  </div>

                  {selectedCharacter === character.id && (
                    <div style={{
                      animation: 'fadeIn 0.5s ease',
                      color: '#fff'
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#00ffff' }}>Visual:</strong> {character.visual}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#00ffff' }}>Powers:</strong>
                        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                          {character.powers.map((power, idx) => (
                            <li key={idx} style={{ marginBottom: '0.3rem' }}>{power}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#00ffff' }}>Signature Move:</strong> {character.signature_move}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#00ffff' }}>Weakness:</strong> {character.weakness}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#00ffff' }}>Favorite Phrase:</strong> {character.favorite_phrase}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#00ffff' }}>Backstory:</strong> {character.backstory}
                      </div>

                      <div style={{
                        background: 'rgba(0,255,255,0.2)',
                        border: '2px solid #00ffff',
                        borderRadius: '10px',
                        padding: '1rem',
                        marginTop: '1rem'
                      }}>
                        <strong style={{ color: '#00ffff' }}>Meme Potential:</strong> {character.meme_potential}
                      </div>
                    </div>
                  )}

                  {selectedCharacter !== character.id && (
                    <div style={{
                      color: '#aaa',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      marginTop: '1rem'
                    }}>
                      Click to reveal full character sheet
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: THE LIVING MEME ECOSYSTEM */}
        <div style={{
          padding: '80px 20px',
          background: 'linear-gradient(180deg, #000000 0%, #001a33 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #00ff88 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🌿 THE LIVING MEME ECOSYSTEM 🌿
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#00ff88',
              marginBottom: '4rem',
              maxWidth: '900px',
              margin: '0 auto 4rem',
              lineHeight: '1.8'
            }}>
              A digital environment where memes <strong>evolve</strong>, <strong>merge</strong>, <strong>mutate</strong>, <strong>react to each other</strong>, <strong>build lore</strong>, <strong>form families</strong>, and <strong>change over time</strong>.<br/><br/>
              <em>Welcome to the National Park of Memes.</em>
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {memeHabitats.map((habitat) => (
                <div
                  key={habitat.id}
                  onClick={() => setSelectedHabitat(habitat.id === selectedHabitat ? null : habitat.id)}
                  style={{
                    background: selectedHabitat === habitat.id
                      ? 'linear-gradient(135deg, #00ff88 0%, #00ffff 100%)'
                      : 'rgba(0,255,136,0.1)',
                    border: '3px solid #00ff88',
                    borderRadius: '20px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedHabitat === habitat.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <h3 style={{
                    fontSize: '1.5rem',
                    color: selectedHabitat === habitat.id ? '#000' : '#00ff88',
                    marginBottom: '1rem',
                    fontWeight: 'bold'
                  }}>
                    {habitat.name}
                  </h3>

                  <p style={{
                    color: selectedHabitat === habitat.id ? '#000' : '#ccc',
                    marginBottom: '1rem',
                    fontSize: '1.1rem'
                  }}>
                    {habitat.description}
                  </p>

                  {selectedHabitat === habitat.id && (
                    <div style={{
                      animation: 'fadeIn 0.5s ease',
                      color: '#000'
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong>Climate:</strong> {habitat.climate}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong>Residents:</strong>
                        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                          {habitat.residents.map((resident, idx) => (
                            <li key={idx}>{resident}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong>Indigenous Species:</strong> {habitat.indigenous_species}
                      </div>

                      <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        fontWeight: 'bold'
                      }}>
                        Danger Level: {habitat.danger_level}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: THE MEMETIC EMBASSY - WORLD BUILDING */}
        <div style={{
          padding: '80px 20px',
          background: 'linear-gradient(180deg, #001a33 0%, #330066 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #ff00ff 0%, #ffaa00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🏛️ EMBASSY DEPARTMENTS 🏛️
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.4rem',
              color: '#ff00ff',
              marginBottom: '4rem',
              maxWidth: '900px',
              margin: '0 auto 4rem',
              lineHeight: '1.8'
            }}>
              <strong>Welcome to the nation where the marginalized finally have power.</strong><br/>
              Complete with digital passports, diplomatic immunity from gaslighting, citizenship badges, rights charters, and solidarity treaties.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {embassyDepartments.map((dept, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,0,255,0.1)',
                    border: '3px solid #ff00ff',
                    borderRadius: '20px',
                    padding: '2rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ff00ff 0%, #ffaa00 100%)';
                    e.currentTarget.style.transform = 'translateY(-10px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,0,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    fontSize: '3rem',
                    textAlign: 'center',
                    marginBottom: '1rem'
                  }}>
                    {dept.icon}
                  </div>

                  <h3 style={{
                    fontSize: '1.5rem',
                    color: '#ff00ff',
                    marginBottom: '1rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {dept.name}
                  </h3>

                  <p style={{
                    color: '#ddd',
                    marginBottom: '1.5rem',
                    fontSize: '1.1rem',
                    lineHeight: '1.6'
                  }}>
                    {dept.description}
                  </p>

                  <div>
                    <strong style={{ color: '#ffaa00' }}>Services:</strong>
                    <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', color: '#ccc' }}>
                      {dept.services.map((service, sidx) => (
                        <li key={sidx} style={{ marginBottom: '0.5rem' }}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: MEME CATEGORIES */}
        <div style={{
          padding: '80px 20px',
          background: 'linear-gradient(180deg, #330066 0%, #000000 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🎨 MEME CATEGORIES 🎨
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {memeCategories.map((cat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(0,255,255,0.1)',
                    border: '3px solid #00ffff',
                    borderRadius: '20px',
                    padding: '2rem'
                  }}
                >
                  <div style={{
                    fontSize: '3rem',
                    textAlign: 'center',
                    marginBottom: '1rem'
                  }}>
                    {cat.icon}
                  </div>

                  <h3 style={{
                    fontSize: '1.4rem',
                    color: '#00ffff',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {cat.category}
                  </h3>

                  <div style={{
                    textAlign: 'center',
                    color: '#ff00ff',
                    fontStyle: 'italic',
                    marginBottom: '1.5rem'
                  }}>
                    Vibe: {cat.vibe}
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <strong style={{ color: '#00ffff' }}>Examples:</strong>
                    <div style={{ marginTop: '0.5rem' }}>
                      {cat.examples.map((ex, eidx) => (
                        <div
                          key={eidx}
                          style={{
                            background: 'rgba(0,0,0,0.5)',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            marginBottom: '0.5rem',
                            color: '#fff',
                            fontSize: '0.95rem'
                          }}
                        >
                          "{ex}"
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong style={{ color: '#00ffff' }}>Templates:</strong>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      marginTop: '0.5rem'
                    }}>
                      {cat.templates.map((template, tidx) => (
                        <span
                          key={tidx}
                          style={{
                            background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
                            color: '#000',
                            padding: '0.3rem 0.7rem',
                            borderRadius: '15px',
                            fontSize: '0.85rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {template}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 5: INTERACTIVE TOOLS */}
        <div style={{
          padding: '80px 20px',
          background: 'linear-gradient(180deg, #000000 0%, #1a0033 100%)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ffaa00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🛠️ INTERACTIVE MEME TOOLS 🛠️
            </h2>

            {/* MEME MOOD MIXER */}
            <div style={{
              background: 'rgba(255,107,107,0.1)',
              border: '3px solid #ff6b6b',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '3rem'
            }}>
              <h3 style={{
                fontSize: '2rem',
                color: '#ff6b6b',
                marginBottom: '2rem',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                🎚️ MEME MOOD MIXER
              </h3>

              <p style={{
                textAlign: 'center',
                color: '#ccc',
                marginBottom: '2rem',
                fontSize: '1.1rem'
              }}>
                Adjust the sliders to match your emotional state. AI outputs a meme template that matches your vibe.
              </p>

              <div style={{
                display: 'grid',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                {Object.entries(moodSliders).map(([mood, value]) => (
                  <div key={mood}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <label style={{
                        color: '#ff6b6b',
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
                      }}>
                        {mood}
                      </label>
                      <span style={{ color: '#ffaa00', fontWeight: 'bold' }}>
                        {value}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => setMoodSliders({
                        ...moodSliders,
                        [mood]: parseInt(e.target.value)
                      })}
                      style={{
                        width: '100%',
                        height: '10px',
                        borderRadius: '5px',
                        background: `linear-gradient(to right, #ff6b6b 0%, #ff6b6b ${value}%, #333 ${value}%, #333 100%)`,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={generateMeme}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ffaa00 100%)',
                  border: 'none',
                  borderRadius: '15px',
                  color: '#000',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 0 30px rgba(255,107,107,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                🎲 GENERATE MEME
              </button>

              {generatedMeme && (
                <div style={{
                  marginTop: '2rem',
                  background: 'rgba(0,0,0,0.5)',
                  border: '3px solid #00ffff',
                  borderRadius: '15px',
                  padding: '2rem',
                  animation: 'fadeIn 0.5s ease'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div>
                      <span style={{
                        background: '#ff6b6b',
                        color: '#000',
                        padding: '0.3rem 0.7rem',
                        borderRadius: '10px',
                        marginRight: '0.5rem',
                        fontWeight: 'bold'
                      }}>
                        {generatedMeme.mood.toUpperCase()}
                      </span>
                      <span style={{
                        background: '#ffaa00',
                        color: '#000',
                        padding: '0.3rem 0.7rem',
                        borderRadius: '10px',
                        fontWeight: 'bold'
                      }}>
                        {generatedMeme.style.toUpperCase()}
                      </span>
                    </div>
                    <span style={{ color: '#666', fontSize: '0.9rem' }}>
                      {generatedMeme.timestamp}
                    </span>
                  </div>

                  <div style={{
                    background: '#000',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    fontSize: '1.3rem',
                    color: '#00ffff',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                  }}>
                    {generatedMeme.template}
                  </div>

                  <button
                    onClick={makeItSpicy}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #ff0000 0%, #ff6600 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    🌶️ MAKE IT SPICIER 🌶️
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 7: BIG PURPOSE + CITIZENSHIP */}
        <div style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, #1a0033 0%, #000000 100%)',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              THIS IS NOT "JUST MEMES"
            </h2>

            <div style={{
              background: 'rgba(255,0,255,0.1)',
              border: '3px solid #ff00ff',
              borderRadius: '20px',
              padding: '3rem',
              marginBottom: '3rem'
            }}>
              <p style={{
                fontSize: '1.5rem',
                lineHeight: '2',
                color: '#fff',
                marginBottom: '2rem'
              }}>
                <strong style={{ color: '#ff00ff' }}>The Memetic Embassy is:</strong>
              </p>

              <div style={{
                fontSize: '1.3rem',
                lineHeight: '2.2',
                color: '#00ffff',
                textAlign: 'left',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                ✨ A <strong>sanctuary</strong> for the dismissed<br/>
                🔥 A <strong>resistance tool</strong> against oppression<br/>
                🎨 A <strong>creative rebellion</strong> that refuses silence<br/>
                📢 A <strong>movement</strong> with humor as armor<br/>
                🏠 A place where injured & disabled people are finally <strong>the main characters</strong><br/>
                🌐 A <strong>nation built on truth, humor, and solidarity</strong>
              </div>
            </div>

            {!citizenshipClaimed ? (
              <div style={{
                background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
                border: '5px solid #fff',
                borderRadius: '25px',
                padding: '3rem',
                animation: 'pulse 2s infinite'
              }}>
                <h3 style={{
                  fontSize: '2.5rem',
                  color: '#000',
                  marginBottom: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  🎖️ CLAIM YOUR CITIZENSHIP 🎖️
                </h3>

                <p style={{
                  fontSize: '1.3rem',
                  color: '#000',
                  marginBottom: '2rem',
                  lineHeight: '1.8'
                }}>
                  Join the world's first digital nation-state for the marginalized.<br/>
                  Receive your passport, diplomatic immunity from gaslighting,<br/>
                  and official citizenship in the Memetic Embassy.
                </p>

                <button
                  onClick={handleClaimCitizenship}
                  style={{
                    padding: '1.5rem 3rem',
                    background: '#000',
                    border: '3px solid #fff',
                    borderRadius: '15px',
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#000';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  ✊ CLAIM CITIZENSHIP NOW ✊
                </button>
              </div>
            ) : (
              <div style={{
                background: 'rgba(0,255,136,0.2)',
                border: '3px solid #00ff88',
                borderRadius: '20px',
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '2rem',
                  color: '#00ff88',
                  marginBottom: '1rem'
                }}>
                  ✅ CITIZENSHIP GRANTED ✅
                </h3>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#fff'
                }}>
                  Welcome home, citizen. You are now part of the resistance.<br/>
                  Your voice matters. Your pain is valid. Your memes are weapons.
                </p>
              </div>
            )}

            <div style={{
              marginTop: '4rem',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/meme-gallery" style={{
                padding: '1rem 2rem',
                background: 'rgba(255,0,255,0.2)',
                border: '2px solid #ff00ff',
                borderRadius: '15px',
                color: '#ff00ff',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                🎨 Browse Meme Gallery
              </Link>

              <Link href="/the-eye" style={{
                padding: '1rem 2rem',
                background: 'rgba(0,255,255,0.2)',
                border: '2px solid #00ffff',
                borderRadius: '15px',
                color: '#00ffff',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                👁️ Return to THE EYE
              </Link>

              <Link href="/about" style={{
                padding: '1rem 2rem',
                background: 'rgba(255,170,0,0.2)',
                border: '2px solid #ffaa00',
                borderRadius: '15px',
                color: '#ffaa00',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                📖 Our Story
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slide {
            from { transform: translateX(0); }
            to { transform: translateX(20px); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: #ff6b6b;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(255,107,107,0.8);
          }

          input[type="range"]::-moz-range-thumb {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: #ff6b6b;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(255,107,107,0.8);
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}

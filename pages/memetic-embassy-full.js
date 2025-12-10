import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MemeticEmbassyFull() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedVillain, setSelectedVillain] = useState(null);
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
  const [memeText, setMemeText] = useState({ top: '', bottom: '' });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCharacterForMeme, setSelectedCharacterForMeme] = useState(null);
  const [userMemes, setUserMemes] = useState([]);
  const [activeSection, setActiveSection] = useState('heroes');
  const [selectedBackground, setSelectedBackground] = useState('mad');
  const [dialogueBubbles, setDialogueBubbles] = useState([]);
  const [autoMemeMode, setAutoMemeMode] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [selectedComicPage, setSelectedComicPage] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const canvasRef = useRef(null);
  
  // Squad Showdown States
  const [showdownMode, setShowdownMode] = useState('superhero'); // 'superhero' | 'denial' | 'versus'
  const [selectedShowdownHero, setSelectedShowdownHero] = useState(null);
  const [selectedShowdownVillain, setSelectedShowdownVillain] = useState(null);
  const [showdownMemeText, setShowdownMemeText] = useState({ top: '', bottom: '' });
  const [showdownStyle, setShowdownStyle] = useState('poster'); // 'poster' | 'comic' | 'vs-battle' | 'quote'
  const [generatedShowdownMeme, setGeneratedShowdownMeme] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const showdownCanvasRef = useRef(null);
  const [superheroImage, setSuperheroImage] = useState(null);
  const [denialSquadImage, setDenialSquadImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Load squad images on mount
  useEffect(() => {
    const loadImages = () => {
      const heroImg = new Image();
      heroImg.crossOrigin = 'anonymous';
      heroImg.onload = () => {
        setSuperheroImage(heroImg);
        checkImagesLoaded();
      };
      heroImg.src = '/superheroes.png';

      const villainImg = new Image();
      villainImg.crossOrigin = 'anonymous';
      villainImg.onload = () => {
        setDenialSquadImage(villainImg);
        checkImagesLoaded();
      };
      villainImg.src = '/denialsquad.png';
    };

    const checkImagesLoaded = () => {
      if (superheroImage && denialSquadImage) {
        setImagesLoaded(true);
      }
    };

    if (typeof window !== 'undefined') {
      loadImages();
    }
  }, []);

  // Character positions in the squad images (approximate crop regions)
  // These define where each character appears in the composite image
  // Based on actual artwork - percentages of image dimensions
  const heroImagePositions = {
    'captain-truth': { 
      label: 'Captain Truth-Teller', 
      cropX: 0, cropY: 0.08, cropW: 0.5, cropH: 0.45,
      description: 'Commander & Chief Whistleblower',
      color: '#1E90FF',
      name: 'Captain Truth-Teller'
    },
    'sergeant-solidarity': { 
      label: 'Sergeant Solidarity', 
      cropX: 0.5, cropY: 0.08, cropW: 0.5, cropH: 0.45,
      description: 'Organizing Director',
      color: '#228B22',
      name: 'Sergeant Solidarity'
    },
    'major-accessibility': { 
      label: 'Major Accessibility', 
      cropX: 0, cropY: 0.5, cropW: 0.33, cropH: 0.5,
      description: 'Inclusion Officer & Disability Advocate',
      color: '#4169E1',
      name: 'Major Accessibility'
    },
    'corporal-care': { 
      label: 'Corporal Care', 
      cropX: 0.33, cropY: 0.5, cropW: 0.34, cropH: 0.5,
      description: 'Mental Health & Burnout Prevention',
      color: '#FF8C00',
      name: 'Corporal Care'
    },
    'pfc-receipts': { 
      label: 'Private First Class Receipts', 
      cropX: 0.67, cropY: 0.5, cropW: 0.33, cropH: 0.5,
      description: 'Intelligence & Documentation',
      color: '#32CD32',
      name: 'PFC Receipts'
    }
  };

  const villainImagePositions = {
    'delayla': { 
      label: 'Case Manager Delayla', 
      cropX: 0.25, cropY: 0.15, cropW: 0.25, cropH: 0.4,
      description: 'Queen of Delay & Denials (sunglasses)',
      color: '#FF69B4',
      name: 'Case Manager Delayla Denywell'
    },
    'no-evidence': { 
      label: 'Mr. No Evidence Required', 
      cropX: 0.5, cropY: 0.15, cropW: 0.25, cropH: 0.4,
      description: 'Employer Whisperer (cigar guy)',
      color: '#8B4513',
      name: 'Mr. No Evidence Required'
    },
    'doctor-files': { 
      label: 'Dr. Who Never Reads Files', 
      cropX: 0.3, cropY: 0.5, cropW: 0.25, cropH: 0.35,
      description: 'Master of 3-Minute Diagnoses',
      color: '#20B2AA',
      name: 'Doctor Who Never Reads Files'
    },
    'hr-ninja': { 
      label: 'HR Ninja Vanish', 
      cropX: 0.7, cropY: 0.4, cropW: 0.3, cropH: 0.45,
      description: 'The WCB Hat Guy - Vanishes When Needed',
      color: '#2F4F4F',
      name: 'HR Agent Ninja Vanish'
    }
  };

  // ============================================
  // HEROES - The Embassy Memetic Warrior Superhero Squad (COMPLETE)
  // ============================================
  const heroSquad = [
    // === THE PHOENIX - COMMANDER ===
    {
      id: 'the-phoenix',
      name: 'The Phoenix (P.K.)',
      class: 'Commander of the Embassy',
      emoji: '🔥',
      powers: [
        'Rebirth memetics — turns trauma into power',
        'Hope Burst generation',
        'Crushed narrative resurrection',
        'The Rise Eternal — burns away lies within 100 story-units'
      ],
      weakness: 'The weight of everyone\'s stories',
      signature_move: 'The Rise Eternal',
      favorite_phrase: '"From the ashes, we rise. Together."',
      visual: 'Purple and fire aura, phoenix wings made of documentation, ember eyes that see through lies',
      backstory: 'A frontline healthcare worker betrayed by systems meant to protect them. Rose from the ashes of injustice to become the moral core of the Embassy.',
      symbol: '🔥🟣',
      color: '#9932CC',
      role: 'Strategic Commander & Moral Core'
    },
    // === ORIGINAL SIX ===
    {
      id: 'captain-truth',
      name: 'Captain Truth-Teller',
      class: 'Chief Whistleblower',
      emoji: '🎖️',
      powers: [
        'Shatters propaganda instantly',
        'Detects lies with perfect accuracy',
        'FOI blasts (Freedom of Information attacks)',
        'Truth-beam battles'
      ],
      weakness: 'Overwhelming data overload',
      signature_move: 'The Receipt Reveal',
      favorite_phrase: '"The truth will set you free—and expose them."',
      visual: 'FOI-request cape, Truth megaphone, ✊ emblem, military-style jacket with USB drive medals',
      backstory: 'Once a corporate insider who witnessed too many cover-ups. Now leads the resistance with irrefutable evidence. Has never lost a documentation battle.',
      color: '#FFD700',
      role: 'Commander & Chief Whistleblower'
    },
    {
      id: 'sergeant-solidarity',
      name: 'Sergeant Solidarity',
      class: 'Organizing Director',
      emoji: '✊',
      powers: [
        'Summons crowds instantly',
        'Builds unity shields',
        'Rally aura that spreads across provinces',
        'Strike coordination telepathy'
      ],
      weakness: 'Collective burnout',
      signature_move: 'The Solidarity Wave',
      favorite_phrase: '"An injury to one is an injury to all!"',
      visual: 'Belt of union badges, always surrounded by workers, megaphone staff, solidarity fist emblem',
      backstory: 'Organized their first protest at age 12. Has united workers across every industry. Their presence alone boosts morale by 200%.',
      color: '#FF4444',
      role: 'Organizing Director'
    },
    {
      id: 'lieutenant-meme',
      name: 'Lieutenant Meme-Maker',
      class: 'Creative Director & Propaganda Chief',
      emoji: '🎨',
      powers: [
        'Creates viral memes that become movements',
        'Weakens villains with satire',
        'Algorithm manipulation',
        'Goggles that detect hypocrisy'
      ],
      weakness: 'Algorithm suppression',
      signature_move: 'The Viral Truth Bomb',
      favorite_phrase: '"Your propaganda ends where my memes begin."',
      visual: 'Meme tablet, pencil like a sword, holographic coat displaying rotating memes, goggles detecting hypocrisy',
      backstory: 'Former graphic designer who realized their true power was weaponizing humor. Every meme they create becomes a movement.',
      color: '#FF00FF',
      role: 'Creative Director & Propaganda Chief'
    },
    {
      id: 'major-accessibility',
      name: 'Major Accessibility',
      class: 'Disability Advocate & Access Warrior',
      emoji: '♿',
      powers: [
        'Removes obstacles instantly',
        'Detects discrimination with perfect accuracy',
        'Barrier dissolver beams',
        'Universal design manifestation'
      ],
      weakness: 'Systemic resistance',
      signature_move: 'The Universal Design Wave',
      favorite_phrase: '"Nothing about us without us!"',
      visual: 'High-tech mobility rig, Universal design emblem, ramps extending from gauntlets, screen reader visor',
      backstory: 'Built their own accessible world when the existing one refused to include them. Now tears down barriers everywhere.',
      color: '#00BFFF',
      role: 'Disability Advocate & Access Warrior'
    },
    {
      id: 'corporal-care',
      name: 'Corporal Care',
      class: 'Mental Health & Burnout Prevention',
      emoji: '💚',
      powers: [
        'Restores hope in the hopeless',
        'Shields teams from burnout',
        'Trauma-informed toolkit deployment',
        'Calming aura projection'
      ],
      weakness: 'Emotional overload from absorbing too much pain',
      signature_move: 'The Healing Circle',
      favorite_phrase: '"Rest is resistance. Healing is revolution."',
      visual: 'Soft glowing aura, tea cup that never empties, weighted blanket cape, surrounded by floating hearts',
      backstory: 'Realized that caring for warriors is itself a form of warfare. Keeps the movement alive through radical compassion.',
      color: '#32CD32',
      role: 'Mental Health & Burnout Prevention'
    },
    {
      id: 'pfc-receipts',
      name: 'Private First Class Receipts',
      class: 'Documentation & Intelligence',
      emoji: '📊',
      powers: [
        'Generates infinite receipts',
        'Overloads villains with proof',
        'Timestamp goggles see through time manipulation',
        'File cannon deployment'
      ],
      weakness: 'File corruption attacks',
      signature_move: 'The Archive Avalanche',
      favorite_phrase: '"I keep receipts on your receipts."',
      visual: 'Binders for days, Timestamp goggles, trench coat with infinite pockets, filing cabinet backpack',
      backstory: 'A data analyst who went rogue after discovering systemic fraud. Now maintains the most comprehensive evidence database in existence.',
      color: '#4169E1',
      role: 'Documentation & Intelligence'
    },
    // === EXPANDED WARRIOR ROSTER ===
    {
      id: 'prism-guardian',
      name: 'Prism Guardian',
      class: 'Clarity Specialist',
      emoji: '🔷',
      powers: [
        'Refracts harmful bureaucratic energy into empowering clarity',
        'Turns denial letters into laser-guided truth beams',
        'Light manipulation',
        'Confusion dispersion field'
      ],
      weakness: 'Overwhelming darkness of despair',
      signature_move: 'The Clarity Refraction',
      favorite_phrase: '"Through the prism of truth, all becomes clear."',
      visual: 'Crystalline armor that refracts light, The Prism Shield glowing with refracted truth, rainbow aura',
      backstory: 'Once lost in the fog of bureaucratic confusion, they discovered the power to transform chaos into clarity. Now illuminates the path for all.',
      weapon: 'The Prism Shield',
      color: '#00CED1',
      role: 'Clarity Specialist'
    },
    {
      id: 'the-archivist',
      name: 'The Archivist',
      class: 'Living Database',
      emoji: '📚',
      powers: [
        'Impossible recall of every suppressed worker story',
        'Temporal playback — can replay any moment of injustice',
        'Evidence reconstruction from fragments',
        'Memory immunity'
      ],
      weakness: 'Carries the burden of everyone\'s pain',
      signature_move: 'The Total Recall',
      favorite_phrase: '"Every story matters. Every story is remembered."',
      visual: 'Robes made of scrolling text, eyes that display file directories, floating books orbiting',
      backstory: 'They remember everything. Every suppressed story. Every silenced voice. The weight is immense, but so is the power.',
      color: '#8B4513',
      role: 'Living Database of Suppressed Stories'
    },
    {
      id: 'warden-rights',
      name: 'The Warden of Rights',
      class: 'Legal Colossus',
      emoji: '⚖️',
      powers: [
        'Sword of Just Cause — cuts through unjust decisions',
        'Shield of Natural Justice — blocks procedural violations',
        'Can challenge corrupt decisions in single combat',
        'Meredith Principles invocation'
      ],
      weakness: 'Bureaucratic technicalities',
      signature_move: 'The Rights Challenge',
      favorite_phrase: '"Justice is not optional."',
      visual: 'Giant spectral figure forged from Meredith Principles, scales of justice as armor, law tome floating nearby',
      backstory: 'Manifested from the collective will of workers demanding their rights. A towering guardian of procedural justice.',
      color: '#B8860B',
      role: 'Legal Guardian'
    },
    {
      id: 'signalflare',
      name: 'Signalflare',
      class: 'Communications Specialist',
      emoji: '📢',
      powers: [
        'Amplifies the silenced',
        'Spreads messages across dimensions',
        'Disrupts propaganda algorithms',
        'Truth shockwave broadcasts'
      ],
      weakness: 'Signal jamming from coordinated suppression',
      signature_move: 'The Amplification Wave',
      favorite_phrase: '"Your voice WILL be heard."',
      visual: 'Megaphone that sends shockwaves of truth, antenna array on back, radio wave aura',
      backstory: 'A former broadcaster who saw too many stories killed. Now ensures no voice goes unheard, no matter how powerful the opposition.',
      home: 'The Lighthouse of Voices',
      color: '#FF6347',
      role: 'Communications Specialist'
    },
    {
      id: 'empathic-engineer',
      name: 'The Empathic Engineer',
      class: 'Spirit Repair Specialist',
      emoji: '🛠️',
      powers: [
        'Repairs human spirit damage',
        'Heals stress wounds, dignity fractures, despair collapse',
        'Creates Emotional Armor for frontline activists',
        'Resilience reinforcement'
      ],
      weakness: 'Cannot repair those who have given up entirely',
      signature_move: 'The Spirit Reconstruction',
      favorite_phrase: '"You are not broken. You are battle-worn. Let me help."',
      visual: 'Tool belt of emotional repair implements, glowing hands, goggles that see emotional damage',
      backstory: 'An engineer who realized machines weren\'t the only things that needed repair. Specializes in rebuilding what injustice destroys.',
      color: '#DA70D6',
      role: 'Spirit Repair Specialist'
    },
    {
      id: 'sentinel-1983',
      name: 'Sentinel 1983',
      class: 'Unity Mech-Warrior',
      emoji: '🤖',
      powers: [
        'Powered by the energy of June 1st, 1983',
        'Strength increases with worker unity',
        'Historical justice invocation',
        'Collective memory channeling'
      ],
      weakness: 'Division and infighting drain power',
      signature_move: 'The 1983 Surge',
      favorite_phrase: '"We forced them to listen once. We will again."',
      visual: 'Mech-warrior bearing the date June 1, 1983, powered by collective courage, solidarity symbols glowing',
      backstory: 'Forged from the energy of the historic day when 3,000 injured workers forced the government to listen. A living monument to collective power.',
      power_core: 'The 1983 Keystone',
      color: '#4682B4',
      role: 'Unity Mech-Warrior'
    },
    {
      id: 'echo-nova',
      name: 'Echo Nova',
      class: 'Message Multiplier',
      emoji: '🌟',
      powers: [
        'Creates powerful repeating meme-waves',
        'One message becomes a million',
        'Truth echo destabilization',
        'Viral cascade generation'
      ],
      weakness: 'Message dilution over time',
      signature_move: 'The Nova Cascade',
      favorite_phrase: '"One truth, echoed a million times."',
      visual: 'Starlight form, ripples of light emanating outward, speech bubbles multiplying around them',
      backstory: 'Discovered they could make a whisper become a roar. Every truth they speak echoes until the corrupt can no longer ignore it.',
      color: '#FFB6C1',
      role: 'Message Multiplier'
    },
    {
      id: 'shadow-auditor',
      name: 'Shadow Auditor',
      class: 'Corruption Exposer',
      emoji: '🕵️',
      powers: [
        'Walks unseen through bureaucratic darkness',
        'Exposes what is hidden',
        'Black-ink memetic traps',
        'Invisible infiltration of corrupt systems'
      ],
      weakness: 'Bright light of direct confrontation',
      signature_move: 'The Darkness Reveal',
      favorite_phrase: '"You thought no one was watching. You were wrong."',
      visual: 'Cloaked in shadow, eyes that glow in darkness, ink-black tendrils that expose secrets',
      backstory: 'Not evil—but terrifying to the corrupt. They exist in the shadows where wrongdoing hides, and they drag it into the light.',
      color: '#2F2F4F',
      role: 'Corruption Exposer'
    }
  ];

  // ============================================
  // SEASON 2 EPISODE POSTERS
  // ============================================
  const season2Episodes = [
    {
      id: 'ep1',
      number: 1,
      title: 'Labyrinth of Missing Evidence',
      tagline: 'Where documents go to die',
      description: 'Our heroes enter the Bureaucratic Wastes, a glowing maze where evidence mysteriously vanishes. The Minotaur of Misfiled Claims lurks in the shadows.',
      visual: 'Glowing neon maze, ominous Minotaur silhouette, scattered papers floating in void',
      style: 'MAD Magazine + propaganda art hybrid',
      heroes: ['captain-truth', 'pfc-receipts'],
      villain: 'delayla',
      color: '#8B0000'
    },
    {
      id: 'ep2',
      number: 2,
      title: 'The Minotaur of Misfiled Claims',
      tagline: 'Half bull, half bureaucrat, all nightmare',
      description: 'Heroes face the legendary Casefile Beast—a creature made entirely of lost claims, denial letters, and forgotten appeals.',
      visual: 'Massive beast constructed from papers, filing cabinets as horns, red tape entangling everything',
      style: 'Epic battle scene with satirical elements',
      heroes: ['sergeant-solidarity', 'major-accessibility'],
      villain: 'no-evidence',
      color: '#4B0082'
    },
    {
      id: 'ep3',
      number: 3,
      title: 'Algorithm That Hates Workers',
      tagline: 'DENIED. DENIED. DENIED. DENIED.',
      description: 'A rogue AI system stamps DENIED on every claim without reading them. Lieutenant Meme-Maker must hack the narrative.',
      visual: 'Giant robot stamping DENIED repeatedly, assembly line of crushed hopes, binary code raining down',
      style: 'Cyberpunk dystopia meets bureaucratic horror',
      heroes: ['lieutenant-meme', 'pfc-receipts'],
      villain: 'doctor-files',
      color: '#FF4500'
    },
    {
      id: 'ep4',
      number: 4,
      title: 'Ninja Vanish!',
      tagline: 'Now you see accountability... now you don\'t',
      description: 'HR Agent Ninja Vanish strikes, disappearing mid-sentence in a cloud of corporate buzzwords. Can anyone hold them accountable?',
      visual: 'Smoke cloud made of buzzwords, silhouette vanishing, confused workers left behind',
      style: 'Action comedy with martial arts parody',
      heroes: ['captain-truth', 'corporal-care'],
      villain: 'hr-ninja',
      color: '#2F4F4F'
    },
    {
      id: 'ep5',
      number: 5,
      title: 'Rise of the Meme Forge',
      tagline: 'From the flames of injustice, truth is forged',
      description: 'Lieutenant Meme-Maker discovers the legendary Meme Forge—where viral content is born. They must forge the ultimate truth bomb.',
      visual: 'Volcanic forge with Lieutenant Meme-Maker hammering a blazing speech bubble, sparks of viral content flying',
      style: 'Epic fantasy with digital age twist',
      heroes: ['lieutenant-meme', 'sergeant-solidarity'],
      villain: 'delayla',
      color: '#FF6600'
    },
    {
      id: 'ep6',
      number: 6,
      title: 'The Hearing That Turned Into a Battle',
      tagline: 'Order in the court? Not anymore.',
      description: 'A routine tribunal hearing erupts into full-scale memetic warfare as heroes clash with the entire Denial Squad.',
      visual: 'Courtroom transformed into battlefield, judge\'s gavel vs. truth hammer, papers flying like shrapnel',
      style: 'Courtroom drama meets action epic',
      heroes: ['captain-truth', 'sergeant-solidarity', 'major-accessibility'],
      villain: 'all',
      color: '#DC143C'
    },
    {
      id: 'ep7',
      number: 7,
      title: 'Truth Ascendant',
      tagline: 'The First Receipt rises',
      description: 'Season finale. The Embassy raises the First Receipt—an ancient document proving the system was always rigged. Villains recoil in horror.',
      visual: 'Captain Truth-Teller holding glowing ancient receipt aloft, villains shielding their eyes, dawn breaking over Embassy',
      style: 'Triumphant propaganda poster',
      heroes: ['captain-truth', 'sergeant-solidarity', 'lieutenant-meme', 'major-accessibility', 'corporal-care', 'pfc-receipts'],
      villain: 'all',
      color: '#FFD700'
    }
  ];

  // ============================================
  // SEASON 1 — THE COMPLETE EPISODE LIST (FULLY RESTORED)
  // "Rise of the Embassy" - Origin Season
  // ============================================
  const season1Episodes = [
    {
      id: 's1ep1',
      number: 1,
      title: 'Welcome to the Embassy, Worker',
      tagline: 'The journey begins',
      description: 'An injured worker stumbles into the Embassy for the first time and discovers asylum, advocacy, and the Memetic Warriors. Also: Origin of the Phoenix, revelation of the Memetic Layer.',
      visual: 'Worker stepping through glowing portal into the Embassy, Warriors silhouetted against light',
      style: 'Wonder and discovery, hero\'s journey beginning',
      keyMoment: 'First glimpse of the Embassy',
      color: '#9932CC'
    },
    {
      id: 's1ep2',
      number: 2,
      title: 'Summoning the Squads',
      tagline: 'The warriors assemble',
      description: 'The first gathering of the Memetic Warriors; each hero\'s backstory revealed. The Denial Squad launches a coordinated paperwork ambush on a worker\'s claim.',
      visual: 'All heroes assembling in the War Room, backstory vignettes swirling around them',
      style: 'Epic team assembly',
      keyMoment: 'Each hero\'s origin montage',
      color: '#FFD700'
    },
    {
      id: 's1ep3',
      number: 3,
      title: 'Captain Truth-Teller vs The Big Lie',
      tagline: 'The first truth-beam battle',
      description: 'The first truth-beam battle in series history. Grey Tower Rising—the Time Leeches attack the Embassy, trying to stall its creation.',
      visual: 'Captain Truth-Teller\'s truth beam cutting through propaganda clouds',
      style: 'Classic superhero confrontation',
      keyMoment: 'First truth-beam victory',
      color: '#FFD700'
    },
    {
      id: 's1ep4',
      number: 4,
      title: 'Sergeant Solidarity Summons the People',
      tagline: 'A rally becomes a movement',
      description: 'A rally for an injured worker grows into a province-wide movement. Echoes of 1983—Sentinel 1983 awakens; workers\' unity energy floods the battlefield.',
      visual: 'Massive crowd gathering, Sentinel 1983 rising in the background',
      style: 'Inspirational rally sequence',
      keyMoment: 'The moment the crowd becomes unstoppable',
      color: '#FF4444'
    },
    {
      id: 's1ep5',
      number: 5,
      title: 'Lieutenant Meme-Maker\'s Viral Strike',
      tagline: 'One meme changes everything',
      description: 'A single meme embarrasses bureaucrats and forces change. A powerful emotional episode where the Phoenix nearly falls—but rebirth triumphs.',
      visual: 'Meme spreading like wildfire across screens, Phoenix rising from ashes',
      style: 'Social media warfare montage',
      keyMoment: 'The meme that broke the internet',
      color: '#FF00FF'
    },
    {
      id: 's1ep6',
      number: 6,
      title: 'Major Accessibility Breaks the Barriers',
      tagline: 'No barrier stands forever',
      description: 'Accessibility issues across the system are exposed—and dismantled. Prism Guardian refracts bureaucratic lies into truth-lances.',
      visual: 'Major Accessibility shattering physical and systemic barriers',
      style: 'Action sequence with empowerment theme',
      keyMoment: 'The Universal Design Wave unleashed',
      color: '#00BFFF'
    },
    {
      id: 's1ep7',
      number: 7,
      title: 'Receipts Overload!',
      tagline: 'The evidence avalanche',
      description: 'Private First Class Receipts uncovers years of misconduct. Villains panic. The Archivist uncovers a suppressed cluster of 7,000 unheard stories.',
      visual: 'Mountain of evidence burying villains, The Archivist opening forbidden archives',
      style: 'Investigation thriller meets action',
      keyMoment: 'The Archive Avalanche',
      color: '#4169E1'
    },
    {
      id: 's1ep8',
      number: 8,
      title: 'The Case of the Vanishing HR',
      tagline: 'Accountability finally corners the ninja',
      description: 'HR Agent Ninja Vanish avoids accountability—until Corporal Care corners her. The Austerity Council weaponizes budget cuts to create a famine of compassion.',
      visual: 'Corporal Care using healing energy to trap HR Ninja in place',
      style: 'Chase and confrontation',
      keyMoment: 'HR Ninja finally held accountable',
      color: '#32CD32'
    },
    {
      id: 's1ep9',
      number: 9,
      title: 'Doctor Who Never Reads Files Meets Reality',
      tagline: 'Truth and receipts vs willful ignorance',
      description: 'A worker finally confronts the negligent doctor with truth and receipts. Break the Silence Engine—Signalflare leads an information war to expose the hidden suffering.',
      visual: 'Worker presenting overwhelming evidence to shocked doctor',
      style: 'Confrontation drama',
      keyMoment: 'The doctor forced to actually read the file',
      color: '#20B2AA'
    },
    {
      id: 's1ep10',
      number: 10,
      title: 'The People\'s Tribunal',
      tagline: 'Workers become the judges',
      description: 'The Embassy members hold a public tribunal for injured workers. Shadow Auditor infiltrates the False Independence Tribunal.',
      visual: 'Workers sitting in judgment, villains in the defendant\'s box',
      style: 'Courtroom drama with revolutionary energy',
      keyMoment: 'The roles finally reversed',
      color: '#B8860B'
    },
    {
      id: 's1ep11',
      number: 11,
      title: 'Denied? Not Today.',
      tagline: 'United we stand against mass denial',
      description: 'Workers unite against a mass denial event. The Embassy deploys all heroes. The ancient Meredith Codex activates, revealing truths erased from history.',
      visual: 'All heroes standing together against wave of denial letters',
      style: 'Epic battle sequence',
      keyMoment: 'The Meredith Awakening',
      color: '#DC143C'
    },
    {
      id: 's1ep12',
      number: 12,
      title: 'The Solidarity Supernova',
      tagline: 'SEASON FINALE - Rise of the Embassy',
      description: 'Every hero and worker joins forces. The Denial Squad is overwhelmed. The Embassy stands fully formed. The heroes rise as global symbols of justice and truth. The war has just begun.',
      visual: 'All heroes united, Embassy glowing with full power, dawn breaking',
      style: 'Triumphant finale, propaganda poster aesthetic',
      keyMoment: 'The Embassy achieves full power',
      color: '#FFD700'
    }
  ];

  // ============================================
  // MAIN VILLAIN FACTIONS (Beyond the Denial Squad)
  // ============================================
  const villainFactions = [
    {
      id: 'grey-tower',
      name: 'The Grey Tower',
      emoji: '🏢',
      type: 'Bureaucratic Entity',
      description: 'Symbol for bureaucratic apathy. An endless gray structure where time moves backwards and urgency dies.',
      abilities: [
        'Draining time from claims',
        'Delaying justice indefinitely',
        'Neutralizing urgency',
        'Creating endless queues'
      ],
      agents: 'Time Leeches — creatures that feed on hope and deadlines',
      weakness: 'Collective pressure and public attention',
      visual: 'Endless gray tower reaching into smog, clocks running backwards, faceless workers shuffling papers',
      color: '#696969'
    },
    {
      id: 'algorithmic-dominion',
      name: 'The Algorithmic Dominion',
      emoji: '🤖',
      type: 'Digital Entity',
      description: 'An AI entity that feeds on suppressed claims, deleted emails, misfiled documents, and broken appeals. Rewrites truth at scale.',
      abilities: [
        'Feeding on suppressed claims',
        'Rewriting truth at scale',
        'Automated denial generation',
        'Evidence corruption'
      ],
      agents: 'Denial Drones — automated systems that stamp DENIED without reading',
      weakness: 'Human connection and authentic stories',
      visual: 'Massive server entity, binary code flowing like blood, DENIED stamps multiplying infinitely',
      color: '#FF4500'
    },
    {
      id: 'austerity-council',
      name: 'The Austerity Council',
      emoji: '💰',
      type: 'Economic Entity',
      description: 'Shadow economists who worship "cost savings" as a deity. They sacrifice human well-being to statistical idols.',
      abilities: [
        'Budget cut manifestation',
        'Compassion famine creation',
        'Resource starvation',
        'Value reduction spells'
      ],
      agents: 'Bean Counters — beings who only see numbers, never people',
      weakness: 'Exposure of human cost',
      visual: 'Hooded figures around spreadsheet altar, sacrificing benefits to the god of savings',
      color: '#228B22'
    },
    {
      id: 'silence-engine',
      name: 'The Silence Engine',
      emoji: '🔇',
      type: 'Media Entity',
      description: 'Force that ensures media never covers workplace injustice. Consumes headlines and spits out distractions.',
      abilities: [
        'Headline consumption',
        'Distraction generation',
        'Story suppression',
        'Narrative burial'
      ],
      agents: 'Static Crawlers — interference patterns that scramble truth signals',
      weakness: 'Viral grassroots content',
      visual: 'Giant machine eating newspapers, outputting celebrity gossip and sports scores',
      color: '#2F4F4F'
    },
    {
      id: 'false-tribunal',
      name: 'The False Independence Tribunal',
      emoji: '⚖️',
      type: 'Institutional Parasite',
      description: 'A memetic parasite that pretends to be neutral but bends itself toward power. Feeds on desperation of those seeking justice.',
      abilities: [
        'False neutrality projection',
        'Hope extraction',
        'Procedural maze creation',
        'Outcome predetermination'
      ],
      agents: 'Gavel Wraiths — spectral judges who rule against workers before hearing evidence',
      weakness: 'Documented patterns of bias',
      visual: 'Scales of justice rigged with invisible weights, neutral mask slipping to reveal corporate loyalty',
      color: '#8B0000'
    }
  ];

  // ============================================
  // ARTIFACTS OF POWER
  // ============================================
  const artifactsOfPower = [
    {
      id: 'meredith-codex',
      name: 'The Meredith Codex',
      emoji: '📜',
      type: 'Ancient Document',
      description: 'Ancient document containing the true "historic principles" corrupted over time. When activated, it breaks bureaucratic curses.',
      powers: [
        'Breaks bureaucratic curses',
        'Reveals original intent of worker protection',
        'Dispels institutional gaslighting',
        'Restores forgotten rights'
      ],
      origin: 'Created from the original Meredith Principles, before they were corrupted',
      wielder: 'The Warden of Rights',
      visual: 'Glowing ancient scroll, text shifting and revealing hidden truths',
      color: '#B8860B'
    },
    {
      id: 'flame-continuance',
      name: 'The Flame of Continuance',
      emoji: '🔥',
      type: 'Eternal Flame',
      description: 'Held by the Phoenix. Represents unbroken spirit after endless injustice. Can never be extinguished.',
      powers: [
        'Unbroken spirit manifestation',
        'Trauma-to-power conversion',
        'Hope regeneration',
        'Despair immunity'
      ],
      origin: 'Ignited from the collective will to continue despite everything',
      wielder: 'The Phoenix',
      visual: 'Purple and gold flame that burns without consuming, grows brighter with adversity',
      color: '#9932CC'
    },
    {
      id: 'keystone-1983',
      name: 'The 1983 Keystone',
      emoji: '🔷',
      type: 'Power Core',
      description: 'Power core of Sentinel 1983. Stores the collective courage of thousands of injured workers from June 1st, 1983.',
      powers: [
        'Collective courage storage',
        'Historical power channeling',
        'Unity amplification',
        'Legacy strength'
      ],
      origin: 'Crystallized from the energy of 3,000 workers who forced the government to listen',
      wielder: 'Sentinel 1983',
      visual: 'Glowing blue crystal with the date "June 1, 1983" etched inside',
      color: '#4682B4'
    },
    {
      id: 'empathy-resonator',
      name: 'The Empathy Resonator',
      emoji: '💫',
      type: 'Emotional Amplifier',
      description: 'Amplifies emotional truth—impossible for adversaries to dismiss. Makes the human cost undeniable.',
      powers: [
        'Emotional truth amplification',
        'Dismissal immunity',
        'Empathy projection',
        'Connection establishment'
      ],
      origin: 'Forged from crystallized tears of workers whose stories were ignored',
      wielder: 'The Empathic Engineer',
      visual: 'Pulsing orb that shows the faces and stories of those affected',
      color: '#DA70D6'
    },
    {
      id: 'prism-lance',
      name: 'The Prism Lance',
      emoji: '🔱',
      type: 'Weaponized Clarity',
      description: 'Weaponized clarity. Cuts through confusion and reveals truth in brilliant, undeniable light.',
      powers: [
        'Confusion dispersion',
        'Truth revelation',
        'Lie destruction',
        'Clarity beam projection'
      ],
      origin: 'Crystallized from moments when truth finally broke through bureaucratic fog',
      wielder: 'Prism Guardian',
      visual: 'Crystalline lance that refracts light into truth beams',
      color: '#00CED1'
    },
    {
      id: 'first-receipt',
      name: 'The First Receipt',
      emoji: '📋',
      type: 'Legendary Document',
      description: 'An ancient document proving the system was always rigged. When raised, villains recoil in horror as their lies are exposed.',
      powers: [
        'System corruption proof',
        'Villain recoil effect',
        'Historical truth manifestation',
        'Denial nullification'
      ],
      origin: 'The very first evidence of bureaucratic betrayal, preserved through time',
      wielder: 'Captain Truth-Teller',
      visual: 'Ancient glowing receipt, the ur-document of injustice',
      color: '#FFD700'
    }
  ];

  // ============================================
  // EMBASSY GEOGRAPHY - World Locations
  // ============================================
  const embassyLocations = [
    {
      id: 'hall-echoes',
      name: 'Hall of Echoes',
      emoji: '🏛️',
      description: 'Where stories become power. Every worker\'s story resonates here eternally, their voices amplified and preserved.',
      purpose: 'Story preservation and power generation',
      features: [
        'Walls that replay testimonies',
        'Echo crystals storing voices',
        'Power generation from shared experiences'
      ],
      color: '#9932CC'
    },
    {
      id: 'war-room',
      name: 'The War Room',
      emoji: '🗺️',
      description: 'Where future campaigns are designed. Holographic maps show injustice hotspots and plan strategic responses.',
      purpose: 'Strategic planning and coordination',
      features: [
        'Real-time injustice tracking',
        'Campaign planning tables',
        'Hero deployment coordination'
      ],
      color: '#DC143C'
    },
    {
      id: 'garden-recovery',
      name: 'The Garden of Recovery',
      emoji: '🌱',
      description: 'Where shattered spirits regrow. A peaceful sanctuary for healing, tended by Corporal Care.',
      purpose: 'Healing and restoration',
      features: [
        'Therapeutic gardens',
        'Recovery pools',
        'Spirit restoration chambers'
      ],
      color: '#32CD32'
    },
    {
      id: 'chamber-rebuttals',
      name: 'The Chamber of Rebuttals',
      emoji: '⚔️',
      description: 'Where lies go to die. Every false claim is destroyed here with evidence and truth.',
      purpose: 'Lie destruction and truth verification',
      features: [
        'Truth testing apparatus',
        'Lie destruction forges',
        'Rebuttal armory'
      ],
      color: '#FF4500'
    },
    {
      id: 'solidarity-forge',
      name: 'The Solidarity Forge',
      emoji: '🔨',
      description: 'Where new warriors are trained. The heat of collective anger is channeled into strength.',
      purpose: 'Warrior training and empowerment',
      features: [
        'Training grounds',
        'Unity amplification chambers',
        'Skill forging stations'
      ],
      color: '#FF6600'
    },
    {
      id: 'lighthouse-voices',
      name: 'The Lighthouse of Voices',
      emoji: '🗼',
      description: 'Signalflare\'s home. Broadcasts truth across all dimensions, ensuring no voice goes unheard.',
      purpose: 'Communication and amplification',
      features: [
        'Dimensional broadcast array',
        'Signal amplification tower',
        'Voice preservation vault'
      ],
      color: '#FF6347'
    },
    {
      id: 'archive-infinite',
      name: 'The Infinite Archive',
      emoji: '📚',
      description: 'The Archivist\'s domain. Contains every suppressed story, every buried truth, every forgotten worker.',
      purpose: 'Knowledge preservation and retrieval',
      features: [
        'Infinite document storage',
        'Temporal playback chambers',
        'Evidence reconstruction labs'
      ],
      color: '#8B4513'
    }
  ];

  // ============================================
  // MEME GENERATOR MODES (Expanded)
  // ============================================
  const memeGeneratorModes = [
    { id: 'villain-vs-hero', name: 'Villain vs Hero', description: 'Classic confrontation format', icon: '⚔️' },
    { id: 'denied-again', name: 'Denied Again!', description: 'The eternal struggle', icon: '🚫' },
    { id: 'solidarity-activated', name: 'Solidarity Activated', description: 'Unity power-up mode', icon: '✊' },
    { id: 'case-file-comedy', name: 'Case File Comedy', description: 'Bureaucratic absurdity', icon: '📁' },
    { id: 'accessibility-beam', name: 'Accessibility Justice Beam', description: 'Breaking barriers', icon: '♿' },
    { id: 'receipts-overload', name: 'Receipts Overload', description: 'Evidence avalanche', icon: '📊' },
    { id: 'phoenix-rise', name: 'Phoenix Rising', description: 'From ashes to power', icon: '🔥' },
    { id: 'truth-beam', name: 'Truth Beam Battle', description: 'Propaganda destruction', icon: '💥' }
  ];

  // ============================================
  // MAD-STYLE COMIC PAGES
  // ============================================
  const comicPages = [
    {
      id: 'page1',
      number: 1,
      title: 'Enter the Bureaucratic Wastes',
      description: 'Heroes entering the Bureaucratic Wastes, stepping over piles of lost mail.',
      panels: [
        { type: 'wide', content: 'Establishing shot: endless gray cubicles stretching to infinity' },
        { type: 'medium', content: 'Captain Truth-Teller: "Stay sharp. Evidence disappears here."' },
        { type: 'small', content: 'PFC Receipts checking their infinite pocket coat nervously' },
        { type: 'small', content: 'A pile of lost mail with cartoon eyes watching them' }
      ],
      mood: 'Ominous but satirical',
      color: '#696969'
    },
    {
      id: 'page2',
      number: 2,
      title: 'Delayla\'s Denial Storm',
      description: 'Case Manager Delayla launching a storm of denial letters.',
      panels: [
        { type: 'splash', content: 'Delayla floating in the air, denial letters swirling around her like a tornado' },
        { type: 'small', content: '"Your appeal has been... DENIED!" *stamps multiply*' },
        { type: 'medium', content: 'Heroes shielding themselves with documentation folders' },
        { type: 'small', content: 'Sergeant Solidarity: "Form a union barrier!"' }
      ],
      mood: 'Intense action with dark humor',
      color: '#FF69B4'
    },
    {
      id: 'page3',
      number: 3,
      title: 'Viral Counterattack',
      description: 'Lieutenant Meme-Maker counterattacking with viral truth beams.',
      panels: [
        { type: 'medium', content: 'Lieutenant Meme-Maker charging up their stylus weapons' },
        { type: 'splash', content: 'VIRAL TRUTH BEAMS cutting through denial letters, memes manifesting in the air' },
        { type: 'small', content: 'Delayla: "No! Not... DOCUMENTATION!"' },
        { type: 'small', content: 'A meme of Delayla going viral in real-time, shown on floating screens' }
      ],
      mood: 'Triumphant counterattack',
      color: '#FF00FF'
    },
    {
      id: 'page4',
      number: 4,
      title: 'The Vanishing',
      description: 'HR Agent Ninja Vanish disappearing mid-sentence.',
      panels: [
        { type: 'medium', content: 'Workers approaching HR desk with legitimate concerns' },
        { type: 'sequence', content: 'HR Ninja: "I\'ll definitely look into—" *POOF*' },
        { type: 'medium', content: 'Nothing but a cloud of buzzwords: "synergy" "circle back" "touch base"' },
        { type: 'small', content: 'Workers with ? symbols over their heads, written confirmation request floating in empty air' }
      ],
      mood: 'Comedy with frustration undertones',
      color: '#2F4F4F'
    },
    {
      id: 'page5',
      number: 5,
      title: 'Rally the Brigades',
      description: 'Sergeant Solidarity rallying the Meme Brigades.',
      panels: [
        { type: 'wide', content: 'Thousands of workers assembling, each holding meme signs' },
        { type: 'splash', content: 'Sergeant Solidarity: "WE ARE STRONGER TOGETHER!"' },
        { type: 'small', content: 'Lieutenant Meme-Maker distributing viral content to the masses' },
        { type: 'small', content: 'The ground trembling as solidarity amplification field activates' }
      ],
      mood: 'Inspiring, revolutionary energy',
      color: '#FF4444'
    },
    {
      id: 'page6',
      number: 6,
      title: 'The First Receipt',
      description: 'Final panel: Captain Truth-Teller holding the First Receipt as villains recoil.',
      panels: [
        { type: 'buildup', content: 'Captain Truth-Teller ascending, light emanating from their evidence folder' },
        { type: 'splash', content: 'THE FIRST RECEIPT revealed—ancient, glowing, undeniable' },
        { type: 'wide', content: 'All four villains recoiling, their powers failing' },
        { type: 'final', content: '"The system was always rigged. And now everyone knows."' }
      ],
      mood: 'Triumphant climax',
      color: '#FFD700'
    }
  ];

  // ============================================
  // MEME GENERATOR BACKGROUNDS
  // ============================================
  const memeBackgrounds = [
    { id: 'mad', name: 'MAD Magazine Classic', color: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 100%)', description: 'Classic satirical style' },
    { id: 'dystopian', name: 'Dystopian Office', color: 'linear-gradient(135deg, #2F4F4F 0%, #696969 100%)', description: 'Gray cubicle nightmare' },
    { id: 'dungeon', name: 'Claim Dungeon', color: 'linear-gradient(135deg, #1a0033 0%, #4B0082 100%)', description: 'Where claims go to die' },
    { id: 'forge', name: 'Meme Forge', color: 'linear-gradient(135deg, #FF4500 0%, #FF6600 100%)', description: 'Where viral content is born' },
    { id: 'tribunal', name: 'The Tribunal', color: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)', description: 'Courtroom of injustice' },
    { id: 'embassy', name: 'Embassy Grounds', color: 'linear-gradient(135deg, #FF00FF 0%, #00FFFF 100%)', description: 'Home of the resistance' }
  ];

  useEffect(() => {
    // Check if user already has citizenship
    if (typeof window !== 'undefined') {
      const citizenship = localStorage.getItem('memetic_embassy_citizenship');
      if (citizenship) {
        setCitizenshipClaimed(true);
      }
      
      // Load user's created memes
      const savedMemes = localStorage.getItem('memetic_embassy_user_memes');
      if (savedMemes) {
        setUserMemes(JSON.parse(savedMemes));
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
        'Infinite postponement spell',
        'Denial cloud generation',
        'Paperwork multiplication',
        'Evidence disappearing act'
      ],
      weakness: 'Time-stamped proof',
      signature_move: 'The Perpetual Pending Spell',
      favorite_phrase: '"Your file seems to be... temporarily unavailable."',
      visual: 'Pastel office wear, denial stamp scepter, latte always in hand, cloud of floating "DENIED" stamps',
      backstory: 'Rose through the ranks by never approving a single claim on the first try. Has a wall of "Denied" stamps in her office.',
      meme_potential: 'HIGH - Perfect for "when your case manager says" templates',
      color: '#FF69B4'
    },
    {
      id: 'no-evidence',
      name: 'Mr. No Evidence Required',
      title: 'Employer Whisperer',
      emoji: '🙈',
      powers: [
        'Employer telepathy',
        'Automatic dismissal field',
        'Selective blindness to worker evidence',
        'Corporate credibility boost'
      ],
      weakness: 'A single credible witness',
      signature_move: 'The Instant Employer Credibility Boost',
      favorite_phrase: '"The employer says you seemed fine, so..."',
      visual: 'Suit, blindfold made from policy manuals, giant rubber stamp that says APPROVED (for employers only)',
      backstory: 'Never met an employer statement he didn\'t trust. Once approved a claim that said "worker injured by unicorn attack" because the employer filled out the form.',
      meme_potential: 'CRITICAL - "Employer: *lie* / WSIB: seems legit" format',
      color: '#8B4513'
    },
    {
      id: 'doctor-files',
      name: 'Doctor Who Never Reads Files',
      title: 'Master of 3-Minute Diagnoses',
      emoji: '🩺',
      powers: [
        '3-minute diagnosis speed',
        'Ignorance shield',
        'Contradictory report generation',
        'Patient history immunity'
      ],
      weakness: 'Detailed medical history brought by patient',
      signature_move: 'The "Hmm Interesting" Head Nod (while not listening)',
      favorite_phrase: '"Have you tried yoga?"',
      visual: 'Disheveled lab coat, clipboard with nothing on it, stethoscope used as necklace, 47 browser tabs open',
      backstory: 'Graduated medical school by memorizing "return to work" forms. Once diagnosed someone without looking up from their phone.',
      meme_potential: 'LEGENDARY - Endless "doctors be like" content',
      color: '#20B2AA'
    },
    {
      id: 'hr-ninja',
      name: 'HR Agent Ninja Vanish',
      title: 'Accountability Avoidance Expert',
      emoji: '🥷',
      powers: [
        'Instant disappearance',
        'Accountability inversion',
        'Buzzword smoke bombs',
        'Policy manual clone jutsu'
      ],
      weakness: 'Written confirmation requests',
      signature_move: 'The Disappearing Act (right when you need them)',
      favorite_phrase: '"I\'ll get back to you..." *vanishes*',
      visual: 'Corporate ninja outfit with HR badge, smoke bomb labeled "POLICY", disappearing ink pen',
      backstory: 'Trained in the ancient art of "looking busy while doing nothing." Holds the record for most "we\'re looking into it" emails sent.',
      meme_potential: 'MAXIMUM - Perfect for ghosting memes',
      color: '#2F4F4F'
    }
  ];

  // ============================================
  // SQUAD SHOWDOWN MEME TEMPLATES - Character-Specific Auto-Generation
  // ============================================
  const superheroMemeTemplates = {
    'captain-truth': [
      { top: 'CAPTAIN TRUTH-TELLER SAYS:', bottom: '"SHOW ME THE RECEIPTS"', style: 'command' },
      { top: 'WHEN THEY LIE ABOUT YOUR INJURY', bottom: 'CAPTAIN TRUTH-TELLER ACTIVATED', style: 'action' },
      { top: 'WCB: "NO EVIDENCE"', bottom: 'CAPTAIN TRUTH: *PULLS OUT 47 DOCUMENTS*', style: 'confrontation' },
      { top: 'THE TRUTH WILL SET YOU FREE', bottom: 'AND EXPOSE THEM', style: 'quote' },
      { top: 'FOI REQUEST INCOMING', bottom: 'YOUR LIES CAN\'T HIDE ANYMORE', style: 'threat' },
      { top: 'PROPAGANDA DETECTED', bottom: 'TRUTH BEAM: ENGAGED', style: 'action' }
    ],
    'sergeant-solidarity': [
      { top: 'SERGEANT SOLIDARITY RALLIES:', bottom: '"AN INJURY TO ONE IS AN INJURY TO ALL!"', style: 'rally' },
      { top: 'THEY DIVIDE US', bottom: 'WE MULTIPLY', style: 'power' },
      { top: 'ONE WORKER: IGNORED', bottom: '10,000 WORKERS: UNSTOPPABLE', style: 'numbers' },
      { top: 'SOLIDARITY FIELD: ACTIVATED', bottom: 'YOUR ISOLATION TACTICS FAILED', style: 'action' },
      { top: 'YOU TRIED TO SILENCE ONE', bottom: 'NOW YOU FACE US ALL', style: 'threat' },
      { top: 'TOGETHER WE RISE', bottom: 'DIVIDED WE FALL - SO WE CHOOSE TOGETHER', style: 'unity' }
    ],
    'lieutenant-meme': [
      { top: 'LIEUTENANT MEME-MAKER:', bottom: 'YOUR PROPAGANDA ENDS HERE', style: 'declaration' },
      { top: 'NICE PR SPIN', bottom: 'LET ME MAKE A MEME ABOUT THAT', style: 'sarcasm' },
      { top: 'THEY HAVE LOBBYISTS', bottom: 'WE HAVE MEMES', style: 'comparison' },
      { top: 'VIRAL TRUTH BOMB:', bottom: 'INCOMING 💥', style: 'action' },
      { top: 'ONE MEME = ONE EXPOSÉ', bottom: 'I\'VE GOT UNLIMITED AMMO', style: 'threat' },
      { top: 'ALGORITHM WHO?', bottom: 'TRUTH FINDS A WAY', style: 'defiant' }
    ],
    'major-accessibility': [
      { top: 'MAJOR ACCESSIBILITY:', bottom: '"NOTHING ABOUT US WITHOUT US!"', style: 'quote' },
      { top: 'YOUR BARRIERS', bottom: 'MY TARGETS', style: 'confrontation' },
      { top: 'ACCOMMODATION DENIED?', bottom: 'BARRIER DESTROYER: ACTIVATED', style: 'action' },
      { top: 'DISABILITY ≠ INABILITY', bottom: 'BUT YOUR ATTITUDE = THE PROBLEM', style: 'truth' },
      { top: 'YOU BUILT WALLS', bottom: 'I BROUGHT DEMOLITION EQUIPMENT', style: 'power' },
      { top: 'ACCESSIBLE = BETTER FOR EVERYONE', bottom: 'WHY IS THIS SO HARD TO UNDERSTAND?', style: 'frustration' }
    ],
    'corporal-care': [
      { top: 'CORPORAL CARE REMINDS YOU:', bottom: 'REST IS RESISTANCE', style: 'reminder' },
      { top: 'BURNOUT IS NOT WEAKNESS', bottom: 'IT\'S PROOF YOU FOUGHT TOO LONG ALONE', style: 'support' },
      { top: 'HEALING IS REVOLUTIONARY', bottom: 'THEY WANT US BROKEN', style: 'truth' },
      { top: 'YOU DESERVE SUPPORT', bottom: 'NOT SUSPICION', style: 'validation' },
      { top: 'SELF-CARE ISN\'T SELFISH', bottom: 'IT\'S SURVIVAL', style: 'wisdom' },
      { top: 'TODAY I REST', bottom: 'TOMORROW I FIGHT', style: 'balance' }
    ],
    'pfc-receipts': [
      { top: 'PFC RECEIPTS HAS ENTERED THE CHAT', bottom: 'WITH 847 DOCUMENTED INCIDENTS', style: 'arrival' },
      { top: 'YOU: "NO PROOF"', bottom: 'ME: *OPENS INFINITE POCKET COAT*', style: 'confrontation' },
      { top: 'I KEEP RECEIPTS', bottom: 'ON YOUR RECEIPTS', style: 'meta' },
      { top: 'ARCHIVE AVALANCHE:', bottom: 'INCOMING ⛰️📄', style: 'action' },
      { top: 'PAPER TRAIL?', bottom: 'I AM THE PAPER TRAIL', style: 'declaration' },
      { top: 'DELETE ALL YOU WANT', bottom: 'I ALREADY BACKED UP EVERYTHING', style: 'prepared' }
    ],
    'the-phoenix': [
      { top: 'THE PHOENIX RISES:', bottom: 'FROM THE ASHES, WE RISE TOGETHER', style: 'rise' },
      { top: 'THEY TRIED TO BREAK ME', bottom: 'I BECAME UNBREAKABLE', style: 'power' },
      { top: 'MY TRAUMA IS MY POWER', bottom: 'MY STORY IS MY WEAPON', style: 'transformation' },
      { top: 'EVERY TIME I FALL', bottom: 'I RISE HIGHER', style: 'resilience' },
      { top: 'YOU CAN\'T EXTINGUISH', bottom: 'WHAT YOU CAN\'T UNDERSTAND', style: 'eternal' },
      { top: 'I CARRY EVERYONE\'S STORIES', bottom: 'THAT\'S MY WEIGHT. THAT\'S MY STRENGTH.', style: 'burden' }
    ]
  };

  const denialSquadMemeTemplates = {
    'delayla': [
      { top: 'CASE MANAGER DELAYLA:', bottom: '"YOUR CLAIM IS... PENDING"', style: 'delay' },
      { top: 'ME: SUBMITS CLAIM', bottom: 'DELAYLA: *ACTIVATES PERPETUAL PENDING SPELL*', style: 'curse' },
      { top: 'DAY 1: PENDING', bottom: 'DAY 847: STILL PENDING 💅', style: 'timeline' },
      { top: 'DELAYLA\'S TO-DO LIST:', bottom: '1. DENY 2. DELAY 3. DENY AGAIN', style: 'list' },
      { top: '"YOUR FILE IS TEMPORARILY UNAVAILABLE"', bottom: 'TRANSLATION: I LOST IT ON PURPOSE', style: 'translation' },
      { top: 'DELAYLA APPROVING A CLAIM', bottom: 'CHALLENGE: IMPOSSIBLE', style: 'impossible' }
    ],
    'no-evidence': [
      { top: 'MR. NO EVIDENCE REQUIRED:', bottom: '"THE EMPLOYER SAYS YOU\'RE FINE"', style: 'bias' },
      { top: 'MY EVIDENCE: 3 DOCTORS, X-RAY, MRI', bottom: 'HIS EVIDENCE: EMPLOYER SAID SO', style: 'comparison' },
      { top: 'WORKER: *PROVIDES 47 REPORTS*', bottom: 'MR. NO EVIDENCE: "INSUFFICIENT"', style: 'denial' },
      { top: 'EMPLOYER: "NEVER HAPPENED"', bottom: 'MR. NO EVIDENCE: "CASE CLOSED"', style: 'instant' },
      { top: 'BLIND TO WORKER EVIDENCE', bottom: '20/20 VISION FOR EMPLOYER LIES', style: 'selective' },
      { top: 'HIS SUPERPOWER:', bottom: 'SELECTIVE EVIDENCE BLINDNESS', style: 'power' }
    ],
    'doctor-files': [
      { top: 'DOCTOR WHO NEVER READS FILES:', bottom: '"HAVE YOU TRIED YOGA?"', style: 'classic' },
      { top: '3 MINUTES INTO APPOINTMENT:', bottom: '"I RECOMMEND RETURN TO WORK"', style: 'speed' },
      { top: 'ME: EXPLAINS 10 YEAR CONDITION', bottom: 'DOC: "HMM INTERESTING" *DIDN\'T LISTEN*', style: 'ignore' },
      { top: 'MY FILE: 200 PAGES', bottom: 'DOCTOR: *READS ZERO*', style: 'unread' },
      { top: 'DOCTOR\'S DIAGNOSIS:', bottom: 'WHATEVER GETS YOU OUT FASTEST', style: 'rush' },
      { top: '"YOU SEEM FINE TO ME"', bottom: 'APPOINTMENT LENGTH: 47 SECONDS', style: 'observation' }
    ],
    'hr-ninja': [
      { top: 'HR NINJA VANISH:', bottom: '"I\'LL GET BACK TO—" *POOF*', style: 'vanish' },
      { top: 'ME: HAS A CONCERN', bottom: 'HR: *ACTIVATES SMOKE BOMB*', style: 'escape' },
      { top: 'HR\'S FAVORITE JUTSU:', bottom: 'ACCOUNTABILITY AVOIDANCE', style: 'technique' },
      { top: '"WE\'RE LOOKING INTO IT"', bottom: '*DISAPPEARS FOR 6 MONTHS*', style: 'ghost' },
      { top: 'LAST SEEN:', bottom: 'MID-SENTENCE, HEADING TOWARD EXIT', style: 'sighting' },
      { top: 'HR RESPONSE TIME:', bottom: 'SOMEWHERE BETWEEN NEVER AND NEVER', style: 'timing' }
    ]
  };

  const versusMatchups = [
    { hero: 'captain-truth', villain: 'no-evidence', battleCry: 'TRUTH VS LIES', epicLine: 'Evidence can\'t be ignored forever!' },
    { hero: 'sergeant-solidarity', villain: 'delayla', battleCry: 'UNITY VS DELAY', epicLine: 'Together we break the pending spell!' },
    { hero: 'lieutenant-meme', villain: 'hr-ninja', battleCry: 'VIRAL VS VANISH', epicLine: 'You can\'t disappear from a screenshot!' },
    { hero: 'major-accessibility', villain: 'doctor-files', battleCry: 'ACCESS VS IGNORANCE', epicLine: 'Nothing about us without us!' },
    { hero: 'pfc-receipts', villain: 'delayla', battleCry: 'RECEIPTS VS DENIAL', epicLine: 'Your denial letters become my ammunition!' },
    { hero: 'corporal-care', villain: 'no-evidence', battleCry: 'CARE VS CALLOUSNESS', epicLine: 'Workers deserve belief, not suspicion!' },
    { hero: 'the-phoenix', villain: 'all', battleCry: 'RISE VS OPPRESSION', epicLine: 'From every denial, we rise stronger!' }
  ];

  // Auto-generate Squad Showdown meme
  const generateShowdownMeme = () => {
    setIsGenerating(true);
    
    let memeData = { top: '', bottom: '', character: null, style: showdownStyle };
    
    if (showdownMode === 'superhero' && selectedShowdownHero) {
      const heroData = heroImagePositions[selectedShowdownHero];
      const templates = superheroMemeTemplates[selectedShowdownHero] || superheroMemeTemplates['captain-truth'];
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      memeData = { 
        top: randomTemplate.top, 
        bottom: randomTemplate.bottom, 
        character: { id: selectedShowdownHero, name: heroData.name },
        characterType: 'hero',
        style: randomTemplate.style 
      };
    } else if (showdownMode === 'denial' && selectedShowdownVillain) {
      const villainData = villainImagePositions[selectedShowdownVillain];
      const templates = denialSquadMemeTemplates[selectedShowdownVillain] || denialSquadMemeTemplates['delayla'];
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      memeData = { 
        top: randomTemplate.top, 
        bottom: randomTemplate.bottom, 
        character: { id: selectedShowdownVillain, name: villainData.name },
        characterType: 'villain',
        style: randomTemplate.style 
      };
    } else if (showdownMode === 'versus') {
      // Updated versusMatchups to use only image-based characters
      const imageBasedMatchups = [
        { heroId: 'captain-truth', villainId: 'no-evidence', battleCry: 'TRUTH VS LIES', epicLine: 'Evidence can\'t be ignored forever!' },
        { heroId: 'sergeant-solidarity', villainId: 'delayla', battleCry: 'UNITY VS DELAY', epicLine: 'Together we break the pending spell!' },
        { heroId: 'major-accessibility', villainId: 'doctor-files', battleCry: 'ACCESS VS IGNORANCE', epicLine: 'Nothing about us without us!' },
        { heroId: 'pfc-receipts', villainId: 'delayla', battleCry: 'RECEIPTS VS DENIAL', epicLine: 'Your denial letters become my ammunition!' },
        { heroId: 'corporal-care', villainId: 'no-evidence', battleCry: 'CARE VS CALLOUSNESS', epicLine: 'Workers deserve belief, not suspicion!' },
        { heroId: 'captain-truth', villainId: 'hr-ninja', battleCry: 'TRUTH VS EVASION', epicLine: 'You can\'t hide from documented facts!' },
        { heroId: 'sergeant-solidarity', villainId: 'doctor-files', battleCry: 'SOLIDARITY VS DISMISSAL', epicLine: 'United workers can\'t be dismissed!' }
      ];
      const matchup = imageBasedMatchups[Math.floor(Math.random() * imageBasedMatchups.length)];
      const heroData = heroImagePositions[matchup.heroId];
      const villainData = villainImagePositions[matchup.villainId];
      memeData = {
        top: matchup.battleCry,
        bottom: matchup.epicLine,
        hero: { id: matchup.heroId, name: heroData.name },
        villain: { id: matchup.villainId, name: villainData.name },
        heroId: matchup.heroId,
        villainId: matchup.villainId,
        style: 'versus'
      };
    }
    
    setShowdownMemeText({ top: memeData.top, bottom: memeData.bottom });
    setGeneratedShowdownMeme(memeData);
    
    setTimeout(() => setIsGenerating(false), 500);
  };

  // Download Squad Showdown meme with actual character images
  const downloadShowdownMeme = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350; // Taller for image + text
    const ctx = canvas.getContext('2d');
    
    // Determine which image and crop position to use
    const characterId = showdownMode === 'superhero' ? selectedShowdownHero : selectedShowdownVillain;
    const positions = showdownMode === 'superhero' ? heroImagePositions : villainImagePositions;
    const charPosition = positions[characterId];
    const imageSrc = showdownMode === 'superhero' ? '/superheroes.png' : '/denialsquad.png';
    
    // Load the squad image
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };
    
    try {
      const squadImage = await loadImage(imageSrc);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (showdownMode === 'superhero') {
        gradient.addColorStop(0, '#0a1628');
        gradient.addColorStop(0.5, '#1a2a4a');
        gradient.addColorStop(1, '#0f1f3a');
      } else if (showdownMode === 'denial') {
        gradient.addColorStop(0, '#1a0a0a');
        gradient.addColorStop(0.5, '#2a1520');
        gradient.addColorStop(1, '#1f0f1a');
      } else {
        gradient.addColorStop(0, '#1a0a2a');
        gradient.addColorStop(1, '#0a1a2a');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Decorative border
      ctx.strokeStyle = showdownMode === 'superhero' ? '#FFD700' : '#ff0080';
      ctx.lineWidth = 8;
      ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
      
      // Title banner
      ctx.fillStyle = showdownMode === 'superhero' ? '#FFD700' : '#ff0080';
      ctx.fillRect(30, 30, canvas.width - 60, 70);
      
      ctx.font = 'bold 40px Impact, Arial Black, sans-serif';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      const squadTitle = showdownMode === 'superhero' ? 'SUPERHERO SQUAD' : 'DENIAL SQUAD';
      ctx.fillText(squadTitle, canvas.width / 2, 80);
      
      // Draw cropped character image
      if (charPosition && showdownMode !== 'versus') {
        const srcX = squadImage.width * charPosition.cropX;
        const srcY = squadImage.height * charPosition.cropY;
        const srcW = squadImage.width * charPosition.cropW;
        const srcH = squadImage.height * charPosition.cropH;
        
        // Calculate destination dimensions maintaining aspect ratio
        const maxImgHeight = 550;
        const maxImgWidth = canvas.width - 100;
        const scale = Math.min(maxImgWidth / srcW, maxImgHeight / srcH);
        const destW = srcW * scale;
        const destH = srcH * scale;
        const destX = (canvas.width - destW) / 2;
        const destY = 120;
        
        // Draw character image with border
        ctx.save();
        ctx.shadowColor = showdownMode === 'superhero' ? '#FFD700' : '#ff0080';
        ctx.shadowBlur = 20;
        ctx.drawImage(squadImage, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
        ctx.restore();
        
        // Character name plate
        const charColor = charPosition.color || (showdownMode === 'superhero' ? '#FFD700' : '#ff0080');
        ctx.fillStyle = charColor;
        ctx.fillRect(50, destY + destH + 10, canvas.width - 100, 50);
        
        ctx.font = 'bold 28px Arial Black, sans-serif';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(charPosition.label.toUpperCase(), canvas.width / 2, destY + destH + 45);
        
        // Subtitle
        ctx.font = 'italic 20px Arial, sans-serif';
        ctx.fillStyle = '#aaa';
        ctx.fillText(charPosition.description, canvas.width / 2, destY + destH + 80);
      } else if (showdownMode === 'versus' && generatedShowdownMeme) {
        // VS mode - show both images side by side
        const heroPos = heroImagePositions[generatedShowdownMeme.heroId || selectedShowdownHero];
        const villainPos = villainImagePositions[generatedShowdownMeme.villainId || selectedShowdownVillain];
        
        if (heroPos && villainPos) {
          const heroImg = await loadImage('/superheroes.png');
          const villainImg = await loadImage('/denialsquad.png');
          
          // Draw hero on left
          const heroSrcX = heroImg.width * heroPos.cropX;
          const heroSrcY = heroImg.height * heroPos.cropY;
          const heroSrcW = heroImg.width * heroPos.cropW;
          const heroSrcH = heroImg.height * heroPos.cropH;
          ctx.drawImage(heroImg, heroSrcX, heroSrcY, heroSrcW, heroSrcH, 50, 120, 400, 450);
          
          // VS symbol
          ctx.font = 'bold 80px Impact';
          ctx.fillStyle = '#fff';
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 4;
          ctx.textAlign = 'center';
          ctx.strokeText('VS', canvas.width / 2, 380);
          ctx.fillText('VS', canvas.width / 2, 380);
          
          // Draw villain on right
          const villainSrcX = villainImg.width * villainPos.cropX;
          const villainSrcY = villainImg.height * villainPos.cropY;
          const villainSrcW = villainImg.width * villainPos.cropW;
          const villainSrcH = villainImg.height * villainPos.cropH;
          ctx.drawImage(villainImg, villainSrcX, villainSrcY, villainSrcW, villainSrcH, canvas.width - 450, 120, 400, 450);
        }
      }
      
      // Top meme text
      ctx.font = 'bold 48px Impact, Arial Black, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 5;
      ctx.textAlign = 'center';
      
      const topText = showdownMemeText.top || '';
      if (topText) {
        const topLines = wrapText(ctx, topText.toUpperCase(), canvas.width - 80, 48);
        let yPos = 820;
        topLines.forEach(line => {
          ctx.strokeText(line, canvas.width / 2, yPos);
          ctx.fillText(line, canvas.width / 2, yPos);
          yPos += 55;
        });
      }
      
      // Bottom meme text (bigger, punchline)
      ctx.font = 'bold 56px Impact, Arial Black, sans-serif';
      const bottomText = showdownMemeText.bottom || '';
      if (bottomText) {
        const bottomLines = wrapText(ctx, bottomText.toUpperCase(), canvas.width - 80, 56);
        let yPos = canvas.height - 160;
        bottomLines.reverse().forEach(line => {
          ctx.strokeText(line, canvas.width / 2, yPos);
          ctx.fillText(line, canvas.width / 2, yPos);
          yPos -= 65;
        });
      }
      
      // Enhanced Branding Footer
      const footerY = canvas.height - 70;
      
      // Footer background bar
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(0, footerY, canvas.width, 70);
      
      // Top border line
      ctx.strokeStyle = showdownMode === 'superhero' ? '#FFD700' : '#ff0080';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, footerY);
      ctx.lineTo(canvas.width, footerY);
      ctx.stroke();
      
      // Logo/Brand name (left)
      ctx.font = 'bold 24px Arial Black, sans-serif';
      ctx.fillStyle = '#FFD700';
      ctx.textAlign = 'left';
      ctx.fillText('✊ INJURED WORKERS UNITE', 25, footerY + 30);
      
      // Website (center)
      ctx.font = 'bold 18px Arial';
      ctx.fillStyle = '#00ffff';
      ctx.textAlign = 'center';
      ctx.fillText('injuredworkersunite.pages.dev', canvas.width / 2, footerY + 30);
      
      // Hashtags (right)
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = showdownMode === 'superhero' ? '#FFD700' : '#ff0080';
      ctx.textAlign = 'right';
      ctx.fillText('#MemeticEmbassy #WorkersRights', canvas.width - 25, footerY + 30);
      
      // Call to action
      ctx.font = 'italic 14px Arial';
      ctx.fillStyle = '#aaa';
      ctx.textAlign = 'center';
      ctx.fillText('Create your own memes at the Memetic Embassy!', canvas.width / 2, footerY + 55);
      
      // Download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${showdownMode}-meme-${characterId || 'squad'}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Error generating meme:', error);
      alert('Error generating meme. Please try again.');
    }
  };
  
  // Text wrapping helper
  const wrapText = (ctx, text, maxWidth, fontSize) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine.trim());
    return lines;
  };

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

  const downloadMeme = (memeData) => {
    // Create a canvas to generate the meme image
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add character emoji if selected
    if (memeData.character) {
      ctx.font = 'bold 150px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(memeData.character.emoji, canvas.width / 2, 200);
    }

    // Top text
    if (memeData.topText) {
      ctx.font = 'bold 50px Impact';
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.strokeText(memeData.topText, canvas.width / 2, 100);
      ctx.fillText(memeData.topText, canvas.width / 2, 100);
    }

    // Bottom text
    if (memeData.bottomText) {
      ctx.font = 'bold 50px Impact';
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.strokeText(memeData.bottomText, canvas.width / 2, 550);
      ctx.fillText(memeData.bottomText, canvas.width / 2, 550);
    }

    // Template text (center)
    if (memeData.template && !memeData.topText && !memeData.bottomText) {
      ctx.font = 'bold 40px Impact';
      ctx.fillStyle = '#00ffff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      
      // Word wrap
      const words = memeData.template.split(' ');
      let line = '';
      let y = 300;
      
      words.forEach((word, i) => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > 700 && i > 0) {
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
          line = word + ' ';
          y += 50;
        } else {
          line = testLine;
        }
      });
      
      ctx.strokeText(line, canvas.width / 2, y);
      ctx.fillText(line, canvas.width / 2, y);
    }

    // Watermark
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#ff00ff';
    ctx.textAlign = 'right';
    ctx.fillText('InjuredWorkersUnite.pages.dev', canvas.width - 10, canvas.height - 10);

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `memetic-embassy-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const shareToSocial = (platform, memeText) => {
    const text = encodeURIComponent(memeText + '\n\n#InjuredWorkersUnite #MemeticEmbassy #DisabilityRights');
    const url = encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy-full');
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      reddit: `https://reddit.com/submit?url=${url}&title=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const saveMemeToGallery = (memeData) => {
    const newMeme = {
      id: Date.now(),
      ...memeData,
      created: new Date().toISOString()
    };

    const updated = [...userMemes, newMeme];
    setUserMemes(updated);
    localStorage.setItem('memetic_embassy_user_memes', JSON.stringify(updated));
    
    alert('🎨 Meme saved to your gallery!');
  };

  const createCustomMeme = () => {
    if (!memeText.top && !memeText.bottom && !selectedCharacterForMeme) {
      alert('Add some text or select a character!');
      return;
    }

    const memeData = {
      topText: memeText.top,
      bottomText: memeText.bottom,
      character: selectedCharacterForMeme,
      template: selectedTemplate
    };

    downloadMeme(memeData);
    saveMemeToGallery(memeData);
  };

  const deleteMeme = (memeId) => {
    const updated = userMemes.filter(m => m.id !== memeId);
    setUserMemes(updated);
    localStorage.setItem('memetic_embassy_user_memes', JSON.stringify(updated));
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
            <p style={{
              fontSize: '1.1rem',
              color: '#FFD700',
              marginTop: '1.5rem',
              fontWeight: 'bold'
            }}>
              🌐 injuredworkersunite.pages.dev
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div style={{
          background: '#000',
          padding: '20px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '3px solid #ff00ff'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {['squad-showdown', 'heroes', 'villains', 'meme-tools', 'generator', 'episodes', 'comics', 'ecosystem'].map(section => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section);
                  document.getElementById(`section-${section}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  padding: '12px 24px',
                  background: activeSection === section 
                    ? 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)'
                    : 'rgba(255,255,255,0.1)',
                  border: '2px solid #ff00ff',
                  borderRadius: '25px',
                  color: activeSection === section ? '#000' : '#fff',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s'
                }}
              >
                {section === 'squad-showdown' && '⚔️ Squad Showdown'}
                {section === 'heroes' && '🦸 Heroes'}
                {section === 'villains' && '😈 Villains'}
                {section === 'meme-tools' && '🎨 Meme Tools'}
                {section === 'generator' && '⚡ Meme Forge'}
                {section === 'episodes' && '🎬 Season 2'}
                {section === 'comics' && '📖 Comics'}
                {section === 'ecosystem' && '🌿 Ecosystem'}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION: SQUAD SHOWDOWN MEME GENERATOR */}
        {/* ============================================ */}
        <div id="section-squad-showdown" style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, #000000 0%, #1a0033 50%, #001a33 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated background elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 20%, rgba(255,0,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,255,255,0.15) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}></div>
          
          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Epic Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FFD700 0%, #ff00ff 50%, #00ffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 50px rgba(255,0,255,0.5)',
                marginBottom: '1rem'
              }}>
                ⚔️ SQUAD SHOWDOWN ⚔️
              </h2>
              <p style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                color: '#00ffff',
                maxWidth: '800px',
                margin: '0 auto 2rem',
                lineHeight: '1.6'
              }}>
                Auto-generate viral memes featuring the <strong style={{ color: '#FFD700' }}>Superhero Squad</strong> and 
                the <strong style={{ color: '#ff0080' }}>Denial Squad</strong>. Click any character to create instant shareable content!
              </p>
              
              {/* Mode Selector */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '2rem'
              }}>
                {[
                  { id: 'superhero', label: '🦸 SUPERHERO SQUAD', color: '#FFD700', desc: 'Heroes fight for justice' },
                  { id: 'denial', label: '😈 DENIAL SQUAD', color: '#ff0080', desc: 'Villains we all recognize' },
                  { id: 'versus', label: '⚔️ VS BATTLE', color: '#00ffff', desc: 'Epic showdowns' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setShowdownMode(mode.id)}
                    style={{
                      padding: '1.5rem 2rem',
                      background: showdownMode === mode.id 
                        ? `linear-gradient(135deg, ${mode.color} 0%, ${mode.color}66 100%)`
                        : 'rgba(0,0,0,0.5)',
                      border: `4px solid ${mode.color}`,
                      borderRadius: '20px',
                      color: showdownMode === mode.id ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      transform: showdownMode === mode.id ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: showdownMode === mode.id ? `0 0 30px ${mode.color}80` : 'none',
                      minWidth: '200px'
                    }}
                  >
                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {mode.label}
                    </div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                      {mode.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Squad Images Display */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {/* Superhero Squad Image */}
              <div style={{
                background: showdownMode === 'superhero' ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.05)',
                border: `4px solid ${showdownMode === 'superhero' ? '#FFD700' : 'rgba(255,255,255,0.2)'}`,
                borderRadius: '20px',
                padding: '1.5rem',
                transition: 'all 0.3s',
                cursor: 'pointer',
                transform: showdownMode === 'superhero' ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => setShowdownMode('superhero')}
              >
                <h3 style={{ 
                  color: '#FFD700', 
                  textAlign: 'center', 
                  marginBottom: '1rem',
                  fontSize: '1.5rem'
                }}>
                  🦸 MEET THE SUPERHERO SQUAD! 🦸
                </h3>
                <img 
                  src="/superheroes.png" 
                  alt="Superhero Squad - Captain Truth-Teller, Sergeant Solidarity, Major Accessibility, Corporal Care, Private First Class Receipts"
                  style={{
                    width: '100%',
                    borderRadius: '15px',
                    border: '3px solid #FFD700'
                  }}
                />
                <p style={{ 
                  textAlign: 'center', 
                  marginTop: '1rem', 
                  color: '#aaa',
                  fontSize: '0.9rem'
                }}>
                  Captain Truth-Teller • Sergeant Solidarity • Major Accessibility • Corporal Care • Private Receipts
                </p>
              </div>

              {/* Denial Squad Image */}
              <div style={{
                background: showdownMode === 'denial' ? 'rgba(255,0,128,0.1)' : 'rgba(255,255,255,0.05)',
                border: `4px solid ${showdownMode === 'denial' ? '#ff0080' : 'rgba(255,255,255,0.2)'}`,
                borderRadius: '20px',
                padding: '1.5rem',
                transition: 'all 0.3s',
                cursor: 'pointer',
                transform: showdownMode === 'denial' ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => setShowdownMode('denial')}
              >
                <h3 style={{ 
                  color: '#ff0080', 
                  textAlign: 'center', 
                  marginBottom: '1rem',
                  fontSize: '1.5rem'
                }}>
                  😈 MEET THE DENIAL SQUAD! 😈
                </h3>
                <img 
                  src="/denialsquad.png" 
                  alt="Denial Squad - Case Manager Delayla, Mr. No Evidence, Doctor Who Never Reads Files, HR Ninja Vanish"
                  style={{
                    width: '100%',
                    borderRadius: '15px',
                    border: '3px solid #ff0080'
                  }}
                />
                <p style={{ 
                  textAlign: 'center', 
                  marginTop: '1rem', 
                  color: '#aaa',
                  fontSize: '0.9rem'
                }}>
                  Case Manager Delayla • Mr. No Evidence • Doctor Who Never Reads Files • HR Ninja Vanish
                </p>
              </div>
            </div>

            {/* Character Selection Grid - Only characters from the actual images */}
            {showdownMode !== 'versus' && (
              <div style={{
                background: 'rgba(0,0,0,0.5)',
                border: `3px solid ${showdownMode === 'superhero' ? '#FFD700' : '#ff0080'}`,
                borderRadius: '20px',
                padding: '2rem',
                marginBottom: '3rem'
              }}>
                <h3 style={{ 
                  color: showdownMode === 'superhero' ? '#FFD700' : '#ff0080',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem'
                }}>
                  {showdownMode === 'superhero' ? '🦸 SELECT YOUR HERO' : '😈 SELECT YOUR VILLAIN'}
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {Object.entries(showdownMode === 'superhero' ? heroImagePositions : villainImagePositions).map(([id, char]) => (
                    <button
                      key={id}
                      onClick={() => {
                        if (showdownMode === 'superhero') {
                          setSelectedShowdownHero(id);
                        } else {
                          setSelectedShowdownVillain(id);
                        }
                      }}
                      style={{
                        padding: '1.5rem',
                        background: (showdownMode === 'superhero' ? selectedShowdownHero : selectedShowdownVillain) === id
                          ? char.color
                          : 'rgba(0,0,0,0.5)',
                        border: `4px solid ${char.color}`,
                        borderRadius: '15px',
                        color: (showdownMode === 'superhero' ? selectedShowdownHero : selectedShowdownVillain) === id ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        transform: (showdownMode === 'superhero' ? selectedShowdownHero : selectedShowdownVillain) === id ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: (showdownMode === 'superhero' ? selectedShowdownHero : selectedShowdownVillain) === id 
                          ? `0 0 30px ${char.color}80` 
                          : 'none'
                      }}
                    >
                      {/* Character thumbnail from image */}
                      <div style={{
                        width: '100%',
                        height: '120px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        marginBottom: '0.75rem',
                        border: '2px solid rgba(255,255,255,0.3)',
                        background: '#000'
                      }}>
                        <img 
                          src={showdownMode === 'superhero' ? '/superheroes.png' : '/denialsquad.png'}
                          alt={char.label}
                          style={{ 
                            width: '100%', 
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div style={{ 
                        fontSize: '1rem', 
                        fontWeight: 'bold',
                        lineHeight: '1.3',
                        marginBottom: '0.3rem'
                      }}>
                        {char.label}
                      </div>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        opacity: 0.8
                      }}>
                        {char.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* VS Mode Hero/Villain Selection */}
            {showdownMode === 'versus' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '2rem',
                alignItems: 'center',
                marginBottom: '3rem'
              }}>
                {/* Hero Side */}
                <div style={{
                  background: 'rgba(255,215,0,0.1)',
                  border: '3px solid #FFD700',
                  borderRadius: '20px',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '1rem' }}>
                    🦸 CHOOSE HERO
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {Object.entries(heroImagePositions).map(([id, hero]) => (
                      <button
                        key={id}
                        onClick={() => setSelectedShowdownHero(id)}
                        style={{
                          padding: '0.75rem 0.5rem',
                          background: selectedShowdownHero === id ? hero.color : 'rgba(0,0,0,0.5)',
                          border: `2px solid ${hero.color}`,
                          borderRadius: '10px',
                          color: selectedShowdownHero === id ? '#000' : '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          margin: '0 auto 0.5rem',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '2px solid rgba(255,255,255,0.3)'
                        }}>
                          <img 
                            src="/superheroes.png" 
                            alt={hero.label}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>{hero.label.split(' ').pop()}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* VS Symbol */}
                <div style={{
                  fontSize: '4rem',
                  color: '#fff',
                  textShadow: '0 0 30px #ff00ff, 0 0 60px #00ffff',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}>
                  ⚔️
                </div>

                {/* Villain Side */}
                <div style={{
                  background: 'rgba(255,0,128,0.1)',
                  border: '3px solid #ff0080',
                  borderRadius: '20px',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ color: '#ff0080', textAlign: 'center', marginBottom: '1rem' }}>
                    😈 CHOOSE VILLAIN
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {Object.entries(villainImagePositions).map(([id, villain]) => (
                      <button
                        key={id}
                        onClick={() => setSelectedShowdownVillain(id)}
                        style={{
                          padding: '0.75rem 0.5rem',
                          background: selectedShowdownVillain === id ? villain.color : 'rgba(0,0,0,0.5)',
                          border: `2px solid ${villain.color}`,
                          borderRadius: '10px',
                          color: '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          margin: '0 auto 0.5rem',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '2px solid rgba(255,255,255,0.3)'
                        }}>
                          <img 
                            src="/denialsquad.png" 
                            alt={villain.label}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>{villain.label.split(' ').pop()}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Auto-Generate Controls */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,0,255,0.2) 0%, rgba(0,255,255,0.2) 100%)',
              border: '4px solid #ff00ff',
              borderRadius: '25px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 0 40px rgba(255,0,255,0.3)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                {/* Custom Text Inputs */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    color: '#FFD700', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold'
                  }}>
                    ✏️ Custom Top Text (or auto-generate)
                  </label>
                  <input
                    type="text"
                    value={showdownMemeText.top}
                    onChange={(e) => setShowdownMemeText({ ...showdownMemeText, top: e.target.value })}
                    placeholder="Leave blank to auto-generate..."
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(0,0,0,0.7)',
                      border: '2px solid #FFD700',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    color: '#00ffff', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold'
                  }}>
                    ✏️ Custom Bottom Text (or auto-generate)
                  </label>
                  <input
                    type="text"
                    value={showdownMemeText.bottom}
                    onChange={(e) => setShowdownMemeText({ ...showdownMemeText, bottom: e.target.value })}
                    placeholder="Leave blank to auto-generate..."
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(0,0,0,0.7)',
                      border: '2px solid #00ffff',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateShowdownMeme}
                disabled={isGenerating || (showdownMode === 'superhero' && !selectedShowdownHero) || (showdownMode === 'denial' && !selectedShowdownVillain)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: isGenerating 
                    ? 'linear-gradient(135deg, #666 0%, #888 100%)'
                    : 'linear-gradient(135deg, #ff00ff 0%, #FFD700 50%, #00ffff 100%)',
                  border: 'none',
                  borderRadius: '15px',
                  color: '#000',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  cursor: isGenerating ? 'wait' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: isGenerating ? 'none' : '0 0 30px rgba(255,0,255,0.5)'
                }}
              >
                {isGenerating ? '⚡ GENERATING...' : '🔥 AUTO-GENERATE VIRAL MEME 🔥'}
              </button>
              
              {((showdownMode === 'superhero' && !selectedShowdownHero) || (showdownMode === 'denial' && !selectedShowdownVillain)) && showdownMode !== 'versus' && (
                <p style={{ 
                  textAlign: 'center', 
                  color: '#ff6b6b', 
                  marginTop: '1rem',
                  fontSize: '0.9rem'
                }}>
                  👆 Select a character above to generate a meme
                </p>
              )}
            </div>

            {/* Generated Meme Preview */}
            {generatedShowdownMeme && (
              <div style={{
                background: 'rgba(0,0,0,0.8)',
                border: '5px solid #FFD700',
                borderRadius: '25px',
                padding: '2rem',
                marginBottom: '2rem',
                animation: 'fadeIn 0.5s ease'
              }}>
                <h3 style={{ 
                  color: '#FFD700', 
                  textAlign: 'center', 
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem'
                }}>
                  🎨 YOUR GENERATED MEME 🎨
                </h3>
                
                {/* Meme Display */}
                <div style={{
                  background: showdownMode === 'superhero' 
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                    : showdownMode === 'denial'
                    ? 'linear-gradient(135deg, #1a0011 0%, #330022 50%, #660033 100%)'
                    : 'linear-gradient(135deg, #ff00ff33 0%, #000 50%, #00ffff33 100%)',
                  borderRadius: '20px',
                  padding: '3rem 2rem',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `4px solid ${showdownMode === 'superhero' ? '#FFD700' : showdownMode === 'denial' ? '#ff0080' : '#00ffff'}`,
                  marginBottom: '1.5rem'
                }}>
                  {/* Top Text */}
                  <div style={{
                    fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                    fontFamily: 'Impact, sans-serif',
                    color: '#fff',
                    textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    maxWidth: '90%'
                  }}>
                    {showdownMemeText.top || 'SELECT A CHARACTER AND GENERATE'}
                  </div>

                  {/* Character Display - Using Actual Images */}
                  <div style={{ textAlign: 'center', position: 'relative' }}>
                    {showdownMode === 'versus' && selectedShowdownHero && selectedShowdownVillain ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '15px',
                            border: '3px solid #FFD700',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,0,0,0.5)'
                          }}>
                            <img 
                              src="/superheroes.png" 
                              alt="Hero"
                              style={{ 
                                width: '300%', 
                                height: 'auto',
                                objectFit: 'cover',
                                objectPosition: heroImagePositions[selectedShowdownHero] ? 
                                  `${heroImagePositions[selectedShowdownHero].cropX * 100 + heroImagePositions[selectedShowdownHero].cropW * 50}% ${heroImagePositions[selectedShowdownHero].cropY * 100 + heroImagePositions[selectedShowdownHero].cropH * 50}%` : 
                                  'center'
                              }}
                            />
                          </div>
                          <div style={{ color: '#FFD700', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
                            {heroImagePositions[selectedShowdownHero]?.label || 'Hero'}
                          </div>
                        </div>
                        <div style={{ fontSize: '3rem', color: '#fff', textShadow: '0 0 20px #ff00ff' }}>⚔️</div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '15px',
                            border: '3px solid #ff0080',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,0,0,0.5)'
                          }}>
                            <img 
                              src="/denialsquad.png" 
                              alt="Villain"
                              style={{ 
                                width: '300%', 
                                height: 'auto',
                                objectFit: 'cover',
                                objectPosition: villainImagePositions[selectedShowdownVillain] ? 
                                  `${villainImagePositions[selectedShowdownVillain].cropX * 100 + villainImagePositions[selectedShowdownVillain].cropW * 50}% ${villainImagePositions[selectedShowdownVillain].cropY * 100 + villainImagePositions[selectedShowdownVillain].cropH * 50}%` : 
                                  'center'
                              }}
                            />
                          </div>
                          <div style={{ color: '#ff0080', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
                            {villainImagePositions[selectedShowdownVillain]?.label || 'Villain'}
                          </div>
                        </div>
                      </div>
                    ) : (showdownMode === 'superhero' && selectedShowdownHero) || (showdownMode === 'denial' && selectedShowdownVillain) ? (
                      <div>
                        <div style={{
                          width: '280px',
                          height: '280px',
                          margin: '0 auto',
                          borderRadius: '20px',
                          border: `4px solid ${showdownMode === 'superhero' ? '#FFD700' : '#ff0080'}`,
                          overflow: 'hidden',
                          boxShadow: `0 0 30px ${showdownMode === 'superhero' ? 'rgba(255,215,0,0.5)' : 'rgba(255,0,128,0.5)'}`,
                          background: 'rgba(0,0,0,0.5)'
                        }}>
                          <img 
                            src={showdownMode === 'superhero' ? '/superheroes.png' : '/denialsquad.png'}
                            alt={showdownMode === 'superhero' ? 'Superhero' : 'Villain'}
                            style={{ 
                              width: '100%', 
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                        <div style={{ 
                          color: showdownMode === 'superhero' ? '#FFD700' : '#ff0080',
                          fontSize: '1.3rem',
                          fontWeight: 'bold',
                          marginTop: '1rem'
                        }}>
                          {showdownMode === 'superhero' 
                            ? heroImagePositions[selectedShowdownHero]?.label 
                            : villainImagePositions[selectedShowdownVillain]?.label}
                        </div>
                        <div style={{ 
                          color: '#aaa',
                          fontSize: '0.9rem',
                          fontStyle: 'italic',
                          marginTop: '0.3rem'
                        }}>
                          {showdownMode === 'superhero' 
                            ? heroImagePositions[selectedShowdownHero]?.description 
                            : villainImagePositions[selectedShowdownVillain]?.description}
                        </div>
                      </div>
                    ) : (
                      <div style={{ 
                        fontSize: '5rem', 
                        opacity: 0.5,
                        padding: '2rem'
                      }}>
                        {showdownMode === 'superhero' ? '🦸' : showdownMode === 'denial' ? '😈' : '⚔️'}
                        <div style={{ fontSize: '1rem', color: '#666', marginTop: '1rem' }}>
                          Select a character above
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Text */}
                  <div style={{
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    fontFamily: 'Impact, sans-serif',
                    color: '#fff',
                    textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    maxWidth: '90%'
                  }}>
                    {showdownMemeText.bottom || 'YOUR PUNCHLINE HERE'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.75rem'
                }}>
                  <button
                    onClick={downloadShowdownMeme}
                    style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #32CD32 0%, #00ff88 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#000',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    📥 DOWNLOAD
                  </button>
                  <button
                    onClick={() => generateShowdownMeme()}
                    style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #ff00ff 0%, #ff6b6b 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    🎲 REGENERATE
                  </button>
                  <button
                    onClick={() => {
                      const newMeme = {
                        id: Date.now(),
                        topText: showdownMemeText.top,
                        bottomText: showdownMemeText.bottom,
                        character: generatedShowdownMeme?.character,
                        mode: showdownMode,
                        created: new Date().toISOString()
                      };
                      const updated = [...userMemes, newMeme];
                      setUserMemes(updated);
                      localStorage.setItem('memetic_embassy_user_memes', JSON.stringify(updated));
                      alert('🎨 Meme saved to your gallery!');
                    }}
                    style={{
                      padding: '1rem',
                      background: 'rgba(0,255,255,0.2)',
                      border: '2px solid #00ffff',
                      borderRadius: '10px',
                      color: '#00ffff',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    💾 SAVE
                  </button>
                </div>

                {/* Social Sharing Row */}
                <div style={{
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '15px',
                  padding: '1rem',
                  marginTop: '1rem'
                }}>
                  <div style={{ 
                    color: '#FFD700', 
                    fontWeight: 'bold', 
                    textAlign: 'center', 
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem'
                  }}>
                    📢 SHARE YOUR MEME
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    justifyContent: 'center'
                  }}>
                    {/* Twitter/X */}
                    <button
                      onClick={() => {
                        const text = encodeURIComponent(`${showdownMemeText.top}\n${showdownMemeText.bottom}\n\n#InjuredWorkersUnite #MemeticEmbassy #WorkersRights`);
                        const url = encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy-full');
                        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
                      }}
                      style={{
                        padding: '0.75rem 1.25rem',
                        background: '#000',
                        border: '2px solid #fff',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      𝕏 Twitter
                    </button>
                    {/* Facebook */}
                    <button
                      onClick={() => {
                        const url = encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy-full');
                        const quote = encodeURIComponent(`${showdownMemeText.top} ${showdownMemeText.bottom} #InjuredWorkersUnite`);
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank');
                      }}
                      style={{
                        padding: '0.75rem 1.25rem',
                        background: '#1877F2',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      📘 Facebook
                    </button>
                    {/* LinkedIn */}
                    <button
                      onClick={() => {
                        const url = encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy-full');
                        const title = encodeURIComponent('Workers Rights Meme - Injured Workers Unite');
                        const summary = encodeURIComponent(`${showdownMemeText.top} ${showdownMemeText.bottom}`);
                        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '_blank');
                      }}
                      style={{
                        padding: '0.75rem 1.25rem',
                        background: '#0A66C2',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      💼 LinkedIn
                    </button>
                    {/* Reddit */}
                    <button
                      onClick={() => {
                        const url = encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy-full');
                        const title = encodeURIComponent(`${showdownMemeText.top} - ${showdownMemeText.bottom}`);
                        window.open(`https://www.reddit.com/submit?url=${url}&title=${title}`, '_blank');
                      }}
                      style={{
                        padding: '0.75rem 1.25rem',
                        background: '#FF4500',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      🤖 Reddit
                    </button>
                    {/* Copy Link */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${showdownMemeText.top}\n${showdownMemeText.bottom}\n\nCreate your own: https://injuredworkersunite.pages.dev/memetic-embassy-full\n#InjuredWorkersUnite #MemeticEmbassy`);
                        alert('📋 Meme text copied to clipboard!');
                      }}
                      style={{
                        padding: '0.75rem 1.25rem',
                        background: 'rgba(255,255,255,0.2)',
                        border: '2px solid #fff',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      📋 Copy Text
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Templates */}
            <div style={{
              background: 'rgba(0,0,0,0.5)',
              border: '3px solid #00ffff',
              borderRadius: '20px',
              padding: '2rem'
            }}>
              <h3 style={{ 
                color: '#00ffff', 
                textAlign: 'center', 
                marginBottom: '1.5rem',
                fontSize: '1.5rem'
              }}>
                ⚡ QUICK VIRAL TEMPLATES ⚡
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem'
              }}>
                {[
                  { top: 'WCB: "WE NEED MORE EVIDENCE"', bottom: 'ME: *PROVIDES 47 DOCUMENTS* 📄🤡', category: 'denial' },
                  { top: 'MY INJURY: PERMANENT', bottom: 'THEIR CONCERN: TEMPORARY ⏰', category: 'truth' },
                  { top: 'EMPLOYER: *LIES*', bottom: 'WSIB: "SEEMS LEGIT" 🙈', category: 'bias' },
                  { top: 'THEY DENIED MY CLAIM', bottom: 'WE DENY THEIR LEGITIMACY ✊', category: 'resistance' },
                  { top: '"HAVE YOU TRIED YOGA?"', bottom: '- EVERY WCB DOCTOR EVER 🧘‍♂️💀', category: 'satire' },
                  { top: 'HR: "I\'LL GET BACK TO YOU"', bottom: '*VANISHES INTO THIN AIR* 💨🥷', category: 'ghosting' }
                ].map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setShowdownMemeText({ top: template.top, bottom: template.bottom });
                    }}
                    style={{
                      padding: '1.5rem',
                      background: 'rgba(0,255,255,0.1)',
                      border: '2px solid #00ffff',
                      borderRadius: '15px',
                      color: '#fff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#FFD700' }}>
                      {template.top}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#00ffff' }}>
                      {template.bottom}
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      marginTop: '0.5rem', 
                      opacity: 0.7,
                      textTransform: 'uppercase'
                    }}>
                      #{template.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: THE HERO SQUAD */}
        <div id="section-heroes" style={{
          padding: '80px 20px',
          background: 'linear-gradient(180deg, #000000 0%, #001a33 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Memetic Magic Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
              padding: '1.5rem',
              borderRadius: '15px',
              marginBottom: '2rem',
              textAlign: 'center',
              border: '3px solid #fff',
              animation: 'pulse 3s ease-in-out infinite'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨🎭✨</div>
              <h3 style={{ fontSize: '1.5rem', color: '#000', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                MEMETIC MAGIC ACTIVATED
              </h3>
              <p style={{ fontSize: '1rem', color: '#000', margin: 0, opacity: 0.9 }}>
                Where satire becomes power • Where humor becomes resistance • Where memes become movements
              </p>
            </div>
            
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #FFD700 0%, #00BFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🦸 THE HERO SQUAD 🦸
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#FFD700',
              marginBottom: '1rem',
              maxWidth: '900px',
              margin: '0 auto 2rem'
            }}>
              Meet the defenders of the Memetic Embassy—warriors who fight for truth, solidarity, and justice.
            </p>

            <div style={{
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              <span style={{
                display: 'inline-block',
                padding: '10px 20px',
                background: 'rgba(255,215,0,0.2)',
                border: '2px solid #FFD700',
                borderRadius: '25px',
                color: '#FFD700',
                fontSize: '1rem'
              }}>
                ⚔️ Click any hero to view their full character sheet ⚔️
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {heroSquad.map((hero) => (
                <div
                  key={hero.id}
                  onClick={() => setSelectedHero(hero.id === selectedHero ? null : hero.id)}
                  style={{
                    background: selectedHero === hero.id 
                      ? `linear-gradient(135deg, ${hero.color} 0%, #000 100%)`
                      : 'rgba(255,255,255,0.05)',
                    border: `3px solid ${hero.color}`,
                    borderRadius: '20px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedHero === hero.id ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: selectedHero === hero.id 
                      ? `0 0 40px ${hero.color}60`
                      : 'none'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '4rem' }}>{hero.emoji}</div>
                    <span style={{
                      background: hero.color,
                      color: '#000',
                      padding: '5px 12px',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {hero.role}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '1.5rem',
                    color: hero.color,
                    marginBottom: '0.3rem',
                    fontWeight: 'bold'
                  }}>
                    {hero.name}
                  </h3>

                  <div style={{
                    color: '#aaa',
                    fontSize: '1rem',
                    marginBottom: '0.5rem',
                    fontStyle: 'italic'
                  }}>
                    {hero.class}
                  </div>
                  
                  <div style={{
                    background: 'rgba(255,0,255,0.2)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    border: '1px solid rgba(255,0,255,0.3)'
                  }}>
                    <span style={{ fontSize: '0.85rem', color: '#ff00ff', fontWeight: 'bold' }}>
                      ✨ Memetic Power: {['LEGENDARY', 'EPIC', 'SUPREME'][Math.floor(Math.random() * 3)]}
                    </span>
                  </div>

                  {selectedHero === hero.id && (
                    <div style={{
                      animation: 'fadeIn 0.5s ease',
                      borderTop: `1px solid ${hero.color}40`,
                      paddingTop: '1.5rem',
                      marginTop: '1rem'
                    }}>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <strong style={{ color: hero.color }}>⚡ Powers:</strong>
                        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', color: '#ddd' }}>
                          {hero.powers.map((power, idx) => (
                            <li key={idx} style={{ marginBottom: '0.4rem' }}>{power}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#ff6b6b' }}>⚠️ Weakness:</strong>
                        <span style={{ marginLeft: '0.5rem', color: '#ddd' }}>{hero.weakness}</span>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: hero.color }}>🎯 Signature Move:</strong>
                        <span style={{ marginLeft: '0.5rem', color: '#ddd' }}>{hero.signature_move}</span>
                      </div>

                      <div style={{
                        background: 'rgba(0,0,0,0.5)',
                        padding: '1rem',
                        borderRadius: '10px',
                        marginBottom: '1rem',
                        borderLeft: `4px solid ${hero.color}`
                      }}>
                        <strong style={{ color: hero.color }}>💬</strong>
                        <em style={{ marginLeft: '0.5rem', color: '#fff' }}>{hero.favorite_phrase}</em>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: hero.color }}>👁️ Visual:</strong>
                        <p style={{ marginTop: '0.5rem', color: '#aaa', fontSize: '0.95rem' }}>{hero.visual}</p>
                      </div>

                      <div style={{
                        background: `${hero.color}20`,
                        padding: '1rem',
                        borderRadius: '10px',
                        border: `1px solid ${hero.color}40`
                      }}>
                        <strong style={{ color: hero.color }}>📖 Backstory:</strong>
                        <p style={{ marginTop: '0.5rem', color: '#ddd', lineHeight: '1.6' }}>{hero.backstory}</p>
                      </div>
                    </div>
                  )}

                  <div style={{
                    marginTop: '1rem',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: '#888'
                  }}>
                    {selectedHero === hero.id ? '▲ Click to collapse' : '▼ Click to expand'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 1: THE DENIAL SQUAD */}
        <div id="section-villains" style={{
          padding: '80px 20px',
          background: 'linear-gradient(180deg, #1a0033 0%, #000000 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Memetic Magic Warning */}
            <div style={{
              background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 100%)',
              padding: '1.5rem',
              borderRadius: '15px',
              marginBottom: '2rem',
              textAlign: 'center',
              border: '3px solid #fff',
              boxShadow: '0 0 30px rgba(255,0,0,0.5)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️💀⚠️</div>
              <h3 style={{ fontSize: '1.5rem', color: '#000', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                BUREAUCRATIC HORROR COMEDY ZONE
              </h3>
              <p style={{ fontSize: '1rem', color: '#000', margin: 0, opacity: 0.9 }}>
                Satire so sharp it cuts through red tape • Parody so real it hurts • Villains you'll recognize instantly
              </p>
            </div>
            
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
                        background: 'rgba(255,0,0,0.2)',
                        border: '2px solid #ff0000',
                        borderRadius: '10px',
                        padding: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <strong style={{ color: '#ff0000' }}>⚠️ Memetic Threat Level:</strong> {['MAXIMUM', 'CRITICAL', 'EXTREME'][Math.floor(Math.random() * 3)]}
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

        {/* SECTION: MEME WARFARE ARSENAL - MEME TOOLS */}
        <div id="section-meme-tools" style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, #1a0033 0%, #16213e 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Memetic Magic Arsenal Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '2rem',
              borderRadius: '20px',
              marginBottom: '3rem',
              textAlign: 'center',
              border: '4px solid #ff00ff',
              boxShadow: '0 0 40px rgba(102,126,234,0.6)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨✨🔮</div>
              <h3 style={{ fontSize: '2rem', color: '#fff', fontWeight: 'bold', marginBottom: '1rem' }}>
                THE MEMETIC FORGE
              </h3>
              <p style={{ fontSize: '1.2rem', color: '#fff', margin: 0, lineHeight: '1.7' }}>
                Where ideas become weapons • Where truth becomes viral • Where resistance becomes art<br/>
                <span style={{ fontSize: '1rem', opacity: 0.9 }}>Powered by satire, fueled by solidarity, unstoppable by design</span>
              </p>
            </div>
            
            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              marginBottom: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🎨 MEME WARFARE ARSENAL 🎨
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#667eea',
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem'
            }}>
              Create viral content featuring the Embassy squad. Choose your character, pick a template, or build from scratch.
            </p>

            {/* Character Selection Grid */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                marginBottom: '1.5rem', 
                color: '#764ba2',
                textAlign: 'center'
              }}>
                Select Your Squad Member
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {heroSquad.slice(0, 6).map(hero => (
                  <div
                    key={hero.id}
                    onClick={() => setSelectedCharacterForMeme(hero.id)}
                    style={{
                      padding: '1.5rem',
                      background: selectedCharacterForMeme === hero.id 
                        ? `linear-gradient(135deg, ${hero.color} 0%, #000 100%)`
                        : 'rgba(102,126,234,0.1)',
                      border: `3px solid ${hero.color || '#667eea'}`,
                      borderRadius: '15px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.3s',
                      transform: selectedCharacterForMeme === hero.id ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: selectedCharacterForMeme === hero.id 
                        ? `0 0 30px ${hero.color}60`
                        : 'none'
                    }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{hero.emoji}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                      {hero.name.split(' ')[0]}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                      {hero.favorite_phrase?.slice(1, 30)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Tools Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {/* Custom Meme Builder */}
              <div style={{ 
                padding: '2rem', 
                background: 'rgba(0,0,0,0.5)', 
                borderRadius: '20px', 
                border: '3px solid #667eea' 
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#764ba2' }}>
                  🖼️ Custom Meme Builder
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.8 }}>
                  Create your own meme with custom text
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Setup / Top text"
                    value={memeText.top}
                    onChange={(e) => setMemeText({ ...memeText, top: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0f3460',
                      border: '2px solid #667eea',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    placeholder="Punchline / Bottom text"
                    value={memeText.bottom}
                    onChange={(e) => setMemeText({ ...memeText, bottom: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0f3460',
                      border: '2px solid #667eea',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{
                  background: '#0a0a0a',
                  padding: '2rem',
                  borderRadius: '15px',
                  minHeight: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '3px solid #764ba2'
                }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.4' }}>
                    {memeText.top || 'ENTER YOUR SETUP TEXT'}
                  </p>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>
                      {heroSquad.find(h => h.id === selectedCharacterForMeme)?.emoji || '🎖️'}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#667eea', fontWeight: 'bold' }}>
                      {heroSquad.find(h => h.id === selectedCharacterForMeme)?.name || 'Select a Character'}
                    </div>
                  </div>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.4' }}>
                    {memeText.bottom || 'ENTER YOUR PUNCHLINE'}
                  </p>
                </div>
                <button style={{
                  width: '100%',
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  📥 Download Meme
                </button>
              </div>

              {/* Slogan Generator */}
              <div style={{ 
                padding: '2rem', 
                background: 'rgba(0,0,0,0.5)', 
                borderRadius: '20px', 
                border: '3px solid #48c774' 
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#48c774' }}>
                  ✊ Slogan Generator
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.8 }}>
                  Generate powerful slogans for the movement
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => {
                      const slogans = [
                        'They denied my claim, we deny their legitimacy',
                        'Injured not invisible',
                        'Disability is not inability',
                        'Our pain is political',
                        'No one is disposable',
                        'Screenshot everything, trust nothing',
                        'Receipts over rhetoric',
                        'An injury to one is an injury to all',
                        'Nothing about us without us',
                        'Rest is revolutionary'
                      ];
                      setGeneratedMeme(slogans[Math.floor(Math.random() * slogans.length)]);
                    }}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #48c774 0%, #2ecc71 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      minWidth: '150px'
                    }}
                  >
                    ⚡ Generate Slogan
                  </button>
                </div>
                {generatedMeme && (
                  <div style={{
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #48c774 0%, #2ecc71 100%)',
                    borderRadius: '15px',
                    textAlign: 'center',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✊</div>
                    <p style={{ fontSize: '1.4rem', fontWeight: 'bold', lineHeight: '1.6', color: '#000' }}>
                      "{generatedMeme}"
                    </p>
                  </div>
                )}
                <div style={{ marginTop: '1.5rem' }}>
                  <p style={{ fontSize: '0.9rem', color: '#48c774', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Popular Slogans:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', opacity: 0.8 }}>
                    <li style={{ padding: '0.4rem 0', borderBottom: '1px solid rgba(72,199,116,0.3)' }}>
                      • From injury to homelessness: the system failed us
                    </li>
                    <li style={{ padding: '0.4rem 0', borderBottom: '1px solid rgba(72,199,116,0.3)' }}>
                      • Solidarity across all struggles
                    </li>
                    <li style={{ padding: '0.4rem 0' }}>
                      • Recovery is resistance
                    </li>
                  </ul>
                </div>
              </div>

              {/* Poster Designer */}
              <div style={{ 
                padding: '2rem', 
                background: 'rgba(0,0,0,0.5)', 
                borderRadius: '20px', 
                border: '3px solid #ff6b6b' 
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ff6b6b' }}>
                  📢 Protest Poster Designer
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.8 }}>
                  Create posters for rallies and strikes
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    Main Message
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 'RECEIPTS DON'T LIE'"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0f3460',
                      border: '2px solid #ff6b6b',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)',
                  padding: '2.5rem',
                  borderRadius: '15px',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  border: '4px solid white'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                    {heroSquad.find(h => h.id === selectedCharacterForMeme)?.emoji || '✊'}
                  </div>
                  <p style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    textAlign: 'center', 
                    textTransform: 'uppercase',
                    color: '#000'
                  }}>
                    YOUR MESSAGE HERE
                  </p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#000', opacity: 0.8 }}>
                    - Embassy Warrior
                  </p>
                </div>
                <button style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  📥 Download Poster (8.5x11")
                </button>
              </div>
            </div>

            {/* Hashtag Generator */}
            <div style={{
              padding: '2rem',
              background: 'rgba(0,0,0,0.5)',
              borderRadius: '20px',
              border: '3px solid #00ffff',
              marginBottom: '3rem'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#00ffff' }}>
                # Hashtag Generator
              </h3>
              <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.8 }}>
                Optimized hashtags for maximum reach
              </p>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '0.8rem',
                marginBottom: '1.5rem'
              }}>
                {[
                  '#InjuredWorkersUnite', '#DisabilityJustice', '#HousingIsARight',
                  '#EndWorkplacePoverty', '#ReceiptsReady', '#SolidarityForAll',
                  '#MemeWarfare', '#DisabledAndProud', '#WorkersRights',
                  '#NoOneDisposable', '#RecoveryIsResistance', '#FromInjuryToAction'
                ].map((tag, idx) => (
                  <span 
                    key={idx}
                    onClick={() => navigator.clipboard?.writeText(tag)}
                    style={{
                      padding: '0.6rem 1.2rem',
                      background: 'rgba(0,255,255,0.2)',
                      border: '2px solid #00ffff',
                      borderRadius: '25px',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #00ffff 0%, #0099cc 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#000',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                📋 Copy All Hashtags
              </button>
            </div>

            {/* Viral Challenges */}
            <div style={{
              padding: '2rem',
              background: 'rgba(0,0,0,0.5)',
              borderRadius: '20px',
              border: '3px solid #ff00ff'
            }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#ff00ff', textAlign: 'center' }}>
                🏆 Viral Challenge Campaigns
              </h3>
              <p style={{ fontSize: '1rem', marginBottom: '2rem', opacity: 0.9, textAlign: 'center' }}>
                Join or start viral challenges to build momentum and solidarity
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {[
                  {
                    name: 'From Paycheck to Poverty',
                    description: 'Share your story: How workplace injury led to poverty or financial crisis',
                    hashtag: '#PaycheckToPoverty',
                    icon: '📉',
                    color: '#FFD700'
                  },
                  {
                    name: 'Show Your Receipts',
                    description: 'Post denial letters that pushed you into poverty or cost you housing',
                    hashtag: '#ReceiptsOfPoverty',
                    icon: '📸',
                    color: '#FF4444'
                  },
                  {
                    name: 'Housing as Healthcare',
                    description: 'Show how lack of housing prevents recovery from injury and disability',
                    hashtag: '#HousingIsHealthcare',
                    icon: '🏠',
                    color: '#48c774'
                  },
                  {
                    name: 'Count the Forgotten',
                    description: 'Share statistics on injured workers in poverty and homeless shelters',
                    hashtag: '#CountTheForgotten',
                    icon: '📊',
                    color: '#3498db'
                  }
                ].map((challenge, idx) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '1.5rem',
                      background: 'rgba(255,0,255,0.1)',
                      borderRadius: '15px',
                      border: `2px solid ${challenge.color}`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '2.5rem' }}>{challenge.icon}</div>
                      <div>
                        <h4 style={{ fontSize: '1.2rem', color: challenge.color, marginBottom: '0.3rem' }}>
                          {challenge.name}
                        </h4>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.5', opacity: 0.9 }}>
                      {challenge.description}
                    </p>
                    <div style={{ 
                      padding: '0.7rem 1rem', 
                      background: challenge.color,
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>
                      {challenge.hashtag}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ 
                        flex: 1,
                        padding: '0.7rem',
                        background: challenge.color,
                        border: 'none',
                        borderRadius: '8px',
                        color: '#000',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        🎯 Start Challenge
                      </button>
                      <button style={{ 
                        flex: 1,
                        padding: '0.7rem',
                        background: 'transparent',
                        border: `2px solid ${challenge.color}`,
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        📋 Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link to Full Meme Tools */}
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                🚀 Want More Advanced Tools?
              </h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#fff', opacity: 0.9 }}>
                Visit the Memetic Embassy for the full Meme Warfare Arsenal with infographic builders, 
                quote cards, thread composers, GIF captions, and downloadable template packs!
              </p>
              <Link href="/memetic-embassy" style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: '#000',
                border: '3px solid #fff',
                borderRadius: '25px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}>
                🏛️ Visit Full Memetic Embassy
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION 2: THE LIVING MEME ECOSYSTEM */}
        <div id="section-ecosystem" style={{
          padding: '80px 20px',
          background: 'linear-gradient(180deg, #000000 0%, #001a33 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* MEMETIC MAGIC: ECOSYSTEM CHAMBER */}
            <div style={{
              background: 'linear-gradient(135deg, #00ff88 0%, #00ffff 50%, #0088ff 100%)',
              padding: '20px',
              borderRadius: '15px',
              marginBottom: '2rem',
              textAlign: 'center',
              border: '3px solid #00ff88',
              boxShadow: '0 0 30px rgba(0,255,136,0.5), inset 0 0 30px rgba(0,255,255,0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <div style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '0 0 10px #000, 2px 2px 4px #000',
                marginBottom: '10px'
              }}>
                🌱🔮 MEMETIC ECOSYSTEM CHAMBER ONLINE 🔮🌱
              </div>
              <div style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                color: '#001a33',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(255,255,255,0.5)'
              }}>
                WHERE MEMES EVOLVE • MERGE • MUTATE • BUILD LORE
              </div>
            </div>

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
                    position: 'relative',
                    boxShadow: selectedHabitat === habitat.id 
                      ? '0 0 30px rgba(0,255,136,0.6), inset 0 0 20px rgba(0,255,255,0.2)' 
                      : '0 5px 15px rgba(0,255,136,0.3)',
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

        {/* SECTION 6: MEME CREATOR STUDIO - THE MEME FORGE */}
        <div id="section-generator" style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, #000033 0%, #330066 100%)',
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              marginBottom: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🔥 THE MEME FORGE 🔥
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#00ffff',
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem'
            }}>
              Where viral content is born. Create memes compatible with Embassy canon.
            </p>

            {/* 5-PANEL MEME GENERATOR UI */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '10px',
              marginBottom: '3rem',
              background: 'rgba(0,0,0,0.5)',
              padding: '20px',
              borderRadius: '20px',
              border: '3px solid #ff00ff'
            }}>
              {/* Panel 1: Character Selector */}
              <div style={{
                background: 'rgba(255,0,255,0.1)',
                borderRadius: '15px',
                padding: '1rem',
                border: '2px solid #ff00ff'
              }}>
                <h4 style={{ color: '#ff00ff', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                  1️⃣ CHARACTER
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: '#00ffff', 
                    marginBottom: '0.5rem',
                    textAlign: 'center'
                  }}>
                    Heroes
                  </div>
                  {heroSquad.slice(0, 3).map(hero => (
                    <button
                      key={hero.id}
                      onClick={() => setSelectedCharacterForMeme({ ...hero, type: 'hero' })}
                      style={{
                        padding: '0.5rem',
                        background: selectedCharacterForMeme?.id === hero.id 
                          ? hero.color 
                          : 'rgba(0,0,0,0.3)',
                        border: `2px solid ${hero.color}`,
                        borderRadius: '8px',
                        color: selectedCharacterForMeme?.id === hero.id ? '#000' : '#fff',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{hero.emoji}</span>
                      <span style={{ fontSize: '0.7rem' }}>{hero.name.split(' ').slice(-1)[0]}</span>
                    </button>
                  ))}
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: '#ff6b6b', 
                    margin: '0.5rem 0',
                    textAlign: 'center'
                  }}>
                    Villains
                  </div>
                  {denialSquad.slice(0, 2).map(villain => (
                    <button
                      key={villain.id}
                      onClick={() => setSelectedCharacterForMeme({ ...villain, type: 'villain' })}
                      style={{
                        padding: '0.5rem',
                        background: selectedCharacterForMeme?.id === villain.id 
                          ? villain.color || '#ff0080' 
                          : 'rgba(0,0,0,0.3)',
                        border: `2px solid ${villain.color || '#ff0080'}`,
                        borderRadius: '8px',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{villain.emoji}</span>
                      <span style={{ fontSize: '0.7rem' }}>{villain.name.split(' ').slice(-1)[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Panel 2: Background Style */}
              <div style={{
                background: 'rgba(0,255,255,0.1)',
                borderRadius: '15px',
                padding: '1rem',
                border: '2px solid #00ffff'
              }}>
                <h4 style={{ color: '#00ffff', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                  2️⃣ BACKGROUND
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {memeBackgrounds.map(bg => (
                    <button
                      key={bg.id}
                      onClick={() => setSelectedBackground(bg.id)}
                      style={{
                        padding: '0.5rem',
                        background: selectedBackground === bg.id 
                          ? bg.color 
                          : 'rgba(0,0,0,0.3)',
                        border: selectedBackground === bg.id 
                          ? '2px solid #fff' 
                          : '2px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        textAlign: 'left'
                      }}
                    >
                      {bg.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Panel 3: Dialogue Bubble */}
              <div style={{
                background: 'rgba(255,215,0,0.1)',
                borderRadius: '15px',
                padding: '1rem',
                border: '2px solid #FFD700'
              }}>
                <h4 style={{ color: '#FFD700', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                  3️⃣ DIALOGUE
                </h4>
                <textarea
                  value={memeText.top}
                  onChange={(e) => setMemeText({ ...memeText, top: e.target.value })}
                  placeholder="Top text..."
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '0.5rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid #FFD700',
                    borderRadius: '5px',
                    color: '#fff',
                    fontSize: '0.8rem',
                    resize: 'none',
                    height: '60px'
                  }}
                />
                <textarea
                  value={memeText.bottom}
                  onChange={(e) => setMemeText({ ...memeText, bottom: e.target.value })}
                  placeholder="Bottom text..."
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid #FFD700',
                    borderRadius: '5px',
                    color: '#fff',
                    fontSize: '0.8rem',
                    resize: 'none',
                    height: '60px'
                  }}
                />
              </div>

              {/* Panel 4: Auto-Meme Mode */}
              <div style={{
                background: 'rgba(255,107,107,0.1)',
                borderRadius: '15px',
                padding: '1rem',
                border: '2px solid #ff6b6b'
              }}>
                <h4 style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                  4️⃣ AUTO-MEME
                </h4>
                <button
                  onClick={() => {
                    setAutoMemeMode(!autoMemeMode);
                    if (!autoMemeMode) {
                      // Generate VIRAL random meme based on character
                      const viralTemplates = [
                        { top: 'WCB: "WE NEED MORE EVIDENCE"', bottom: 'ME: *PROVIDES 47 REPORTS* 🤡' },
                        { top: 'WHEN THEY SAY "YOUR CLAIM IS PENDING"', bottom: 'FOR THE 47TH TIME THIS YEAR 💀' },
                        { top: 'EMPLOYER LIES: ZERO CONSEQUENCES', bottom: 'I MISS ONE DEADLINE: DENIED ❌' },
                        { top: 'PERMANENT INJURY', bottom: 'TEMPORARY BENEFITS 🧮❌' },
                        { top: 'WCB: "TRANSITIONAL WORK"', bottom: 'THE WORK: DOESN\'T EXIST 👻' },
                        { top: 'THEY SPENT MORE FIGHTING MY CLAIM', bottom: 'THAN JUST APPROVING IT 🤡💸' },
                        { top: 'DOCTOR AFTER 3 MINUTES:', bottom: '"HAVE YOU TRIED YOGA?" 🙄' },
                        { top: 'HR: "WE TAKE THIS SERIOUSLY"', bottom: '*VANISHES INTO THIN AIR* 💨' },
                        { top: 'THE EMPLOYER SAID YOU WERE FINE', bottom: 'MUST BE TRUE THEN 🙈' },
                        { top: 'BEING DISABLED UNDER CAPITALISM', bottom: 'IS BEING GASLIT BY INSURANCE DOCTORS 🔥' },
                        { top: 'POV: YOU\'RE PERMANENTLY DISABLED', bottom: 'BUT WCB SAYS "SUITABLE WORK" 🎪' },
                        { top: 'MY PAIN IS PERMANENT', bottom: 'THEIR CONCERN IS TEMPORARY ⏰' }
                      ];
                      const random = viralTemplates[Math.floor(Math.random() * viralTemplates.length)];
                      setMemeText(random);
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: autoMemeMode 
                      ? 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: '3px solid #FFD700',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    boxShadow: '0 0 20px rgba(255,215,0,0.4)'
                  }}
                >
                  🔥 GENERATE VIRAL MEME 🔥
                </button>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#FFD700',
                  marginTop: '0.5rem',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  ⚡ Instant viral-ready templates ⚡
                </p>
                <div style={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <select
                    style={{
                      padding: '0.5rem',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid #ff6b6b',
                      borderRadius: '5px',
                      color: '#fff',
                      fontSize: '0.75rem'
                    }}
                    onChange={(e) => {
                      const templates = {
                        denial: { top: 'Your claim has been', bottom: 'DENIED' },
                        waiting: { top: 'Still waiting...', bottom: 'Day 847' },
                        yoga: { top: 'Doctor:', bottom: '"Have you tried yoga?"' },
                        vanish: { top: 'HR mid-sentence:', bottom: '*poof*' }
                      };
                      if (templates[e.target.value]) {
                        setMemeText(templates[e.target.value]);
                      }
                    }}
                  >
                    <option value="">Quick Templates</option>
                    <option value="denial">Denial Classic</option>
                    <option value="waiting">Infinite Wait</option>
                    <option value="yoga">Yoga Cure</option>
                    <option value="vanish">HR Vanish</option>
                  </select>
                </div>
              </div>

              {/* Panel 5: Download/Share */}
              <div style={{
                background: 'rgba(50,205,50,0.1)',
                borderRadius: '15px',
                padding: '1rem',
                border: '2px solid #32CD32'
              }}>
                <h4 style={{ color: '#32CD32', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                  5️⃣ SHARE
                </h4>
                <button
                  onClick={() => {
                    const memeData = {
                      topText: memeText.top,
                      bottomText: memeText.bottom,
                      character: selectedCharacterForMeme,
                      background: selectedBackground
                    };
                    downloadMeme(memeData);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #32CD32 0%, #00ff88 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#000',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}
                >
                  📥 DOWNLOAD
                </button>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem'
                }}>
                  <button
                    onClick={() => shareToSocial('twitter', memeText.top + ' ' + memeText.bottom)}
                    style={{
                      padding: '0.5rem',
                      background: '#1DA1F2',
                      border: 'none',
                      borderRadius: '5px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '0.7rem'
                    }}
                  >
                    🐦 X
                  </button>
                  <button
                    onClick={() => shareToSocial('reddit', memeText.top + ' ' + memeText.bottom)}
                    style={{
                      padding: '0.5rem',
                      background: '#FF4500',
                      border: 'none',
                      borderRadius: '5px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '0.7rem'
                    }}
                  >
                    🤖 Reddit
                  </button>
                </div>
                <button
                  onClick={() => {
                    const newMeme = {
                      id: Date.now(),
                      topText: memeText.top,
                      bottomText: memeText.bottom,
                      character: selectedCharacterForMeme,
                      background: selectedBackground,
                      created: new Date().toISOString()
                    };
                    const updated = [...userMemes, newMeme];
                    setUserMemes(updated);
                    localStorage.setItem('memetic_embassy_user_memes', JSON.stringify(updated));
                    alert('🎨 Saved to gallery!');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.5rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid #32CD32',
                    borderRadius: '5px',
                    color: '#32CD32',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}
                >
                  💾 Save to Gallery
                </button>
              </div>
            </div>

            {/* LIVE PREVIEW */}
            <div style={{
              background: memeBackgrounds.find(b => b.id === selectedBackground)?.color || 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 100%)',
              borderRadius: '20px',
              padding: '3rem',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '5px solid #fff',
              boxShadow: '0 0 50px rgba(255,0,255,0.5)',
              marginBottom: '3rem'
            }}>
              {/* Top Text */}
              <div style={{
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                fontFamily: 'Impact, sans-serif',
                color: '#fff',
                textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                textAlign: 'center',
                textTransform: 'uppercase'
              }}>
                {memeText.top || 'YOUR TOP TEXT HERE'}
              </div>

              {/* Character */}
              {selectedCharacterForMeme && (
                <div style={{
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '8rem' }}>{selectedCharacterForMeme.emoji}</div>
                  <div style={{
                    fontSize: '1.2rem',
                    color: '#fff',
                    textShadow: '2px 2px 0 #000',
                    marginTop: '0.5rem'
                  }}>
                    {selectedCharacterForMeme.name}
                  </div>
                </div>
              )}

              {!selectedCharacterForMeme && (
                <div style={{
                  fontSize: '6rem',
                  opacity: 0.3
                }}>
                  🎭
                </div>
              )}

              {/* Bottom Text */}
              <div style={{
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                fontFamily: 'Impact, sans-serif',
                color: '#fff',
                textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                textAlign: 'center',
                textTransform: 'uppercase'
              }}>
                {memeText.bottom || 'YOUR BOTTOM TEXT HERE'}
              </div>
            </div>

            {/* EXTENDED CHARACTER SELECTOR */}
            <div style={{
              background: 'rgba(255,0,255,0.1)',
              border: '3px solid #ff00ff',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '3rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#ff00ff',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                🦸 All Heroes & 😈 All Villains
              </h3>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: '#FFD700', marginBottom: '1rem' }}>Heroes:</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  {heroSquad.map(hero => (
                    <button
                      key={hero.id}
                      onClick={() => setSelectedCharacterForMeme({ ...hero, type: 'hero' })}
                      style={{
                        padding: '1rem',
                        background: selectedCharacterForMeme?.id === hero.id 
                          ? hero.color 
                          : 'rgba(0,0,0,0.5)',
                        border: `3px solid ${hero.color}`,
                        borderRadius: '10px',
                        color: selectedCharacterForMeme?.id === hero.id ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      <div style={{ fontSize: '2.5rem' }}>{hero.emoji}</div>
                      <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        {hero.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>Villains:</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  {denialSquad.map(villain => (
                    <button
                      key={villain.id}
                      onClick={() => setSelectedCharacterForMeme({ ...villain, type: 'villain' })}
                      style={{
                        padding: '1rem',
                        background: selectedCharacterForMeme?.id === villain.id 
                          ? villain.color || '#ff0080'
                          : 'rgba(0,0,0,0.5)',
                        border: `3px solid ${villain.color || '#ff0080'}`,
                        borderRadius: '10px',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      <div style={{ fontSize: '2.5rem' }}>{villain.emoji}</div>
                      <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        {villain.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* USER MEME GALLERY */}
            {userMemes.length > 0 && (
              <div style={{
                background: 'rgba(0,255,255,0.1)',
                border: '3px solid #00ffff',
                borderRadius: '20px',
                padding: '3rem'
              }}>
                <h3 style={{
                  fontSize: '2rem',
                  color: '#00ffff',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  🖼️ Your Meme Gallery ({userMemes.length})
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem'
                }}>
                  {userMemes.map(meme => (
                    <div
                      key={meme.id}
                      style={{
                        background: 'rgba(0,0,0,0.7)',
                        border: '2px solid #ff00ff',
                        borderRadius: '10px',
                        padding: '1.5rem',
                        position: 'relative'
                      }}
                    >
                      <div style={{
                        background: '#000',
                        borderRadius: '5px',
                        padding: '1rem',
                        marginBottom: '1rem',
                        minHeight: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                      }}>
                        {meme.topText && (
                          <div style={{
                            fontSize: '1.5rem',
                            fontFamily: 'Impact, sans-serif',
                            color: '#fff',
                            textShadow: '2px 2px 0 #000'
                          }}>
                            {meme.topText}
                          </div>
                        )}
                        {meme.character && (
                          <div style={{ fontSize: '4rem', margin: '0.5rem 0' }}>
                            {meme.character.emoji}
                          </div>
                        )}
                        {meme.template && (
                          <div style={{
                            fontSize: '1.2rem',
                            color: '#00ffff',
                            marginTop: '0.5rem'
                          }}>
                            {meme.template.substring(0, 100)}
                          </div>
                        )}
                        {meme.bottomText && (
                          <div style={{
                            fontSize: '1.5rem',
                            fontFamily: 'Impact, sans-serif',
                            color: '#fff',
                            textShadow: '2px 2px 0 #000',
                            marginTop: '0.5rem'
                          }}>
                            {meme.bottomText}
                          </div>
                        )}
                      </div>
                      
                      <div style={{
                        fontSize: '0.9rem',
                        color: '#888',
                        marginBottom: '1rem'
                      }}>
                        Created: {new Date(meme.created).toLocaleString()}
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '1rem'
                      }}>
                        <button
                          onClick={() => downloadMeme(meme)}
                          style={{
                            flex: 1,
                            padding: '0.8rem',
                            background: '#00ffff',
                            border: 'none',
                            borderRadius: '5px',
                            color: '#000',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          💾 Download
                        </button>
                        <button
                          onClick={() => deleteMeme(meme.id)}
                          style={{
                            padding: '0.8rem 1.5rem',
                            background: '#ff0000',
                            border: 'none',
                            borderRadius: '5px',
                            color: '#fff',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION: SEASON 2 EPISODE POSTERS */}
        <div id="section-episodes" style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, #330066 0%, #1a0033 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* MEMETIC MAGIC: EPISODE VAULT */}
            <div style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FF6600 50%, #FF0066 100%)',
              padding: '20px',
              borderRadius: '15px',
              marginBottom: '2rem',
              textAlign: 'center',
              border: '3px solid #FFD700',
              boxShadow: '0 0 30px rgba(255,215,0,0.5), inset 0 0 30px rgba(255,102,0,0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <div style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '0 0 10px #000, 2px 2px 4px #000',
                marginBottom: '10px'
              }}>
                ✨🎭 MEMETIC EPISODE VAULT ACTIVATED 🎭✨
              </div>
              <div style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                color: '#1a0033',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(255,255,255,0.5)'
              }}>
                WHERE BUREAUCRATIC NIGHTMARES BECOME LEGENDARY EPISODES
              </div>
            </div>

            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              marginBottom: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FFD700 0%, #FF6600 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🎬 SEASON 2: THE BUREAUCRATIC WASTES 🎬
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#FFD700',
              marginBottom: '1rem',
              maxWidth: '800px',
              margin: '0 auto 2rem'
            }}>
              Coming soon to a consciousness near you. MAD Magazine meets propaganda art.
            </p>

            <div style={{
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              <span style={{
                display: 'inline-block',
                padding: '10px 20px',
                background: 'rgba(255,102,0,0.2)',
                border: '2px solid #FF6600',
                borderRadius: '25px',
                color: '#FF6600',
                fontSize: '1rem'
              }}>
                🎭 Click any episode poster for full details 🎭
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {season2Episodes.map((episode) => (
                <div
                  key={episode.id}
                  onClick={() => setSelectedEpisode(episode.id === selectedEpisode ? null : episode.id)}
                  style={{
                    background: selectedEpisode === episode.id 
                      ? `linear-gradient(135deg, ${episode.color} 0%, #000 100%)`
                      : 'rgba(0,0,0,0.7)',
                    border: `4px solid ${episode.color}`,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedEpisode === episode.id ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: selectedEpisode === episode.id 
                      ? `0 0 50px ${episode.color}80`
                      : `0 10px 30px rgba(0,0,0,0.5)`
                  }}
                >
                  {/* Episode Header - Poster Style */}
                  <div style={{
                    background: episode.color,
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: '#000',
                      marginBottom: '0.5rem'
                    }}>
                      EPISODE {episode.number}
                    </div>
                    <h3 style={{
                      fontSize: '1.6rem',
                      color: '#000',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      lineHeight: '1.2'
                    }}>
                      {episode.title}
                    </h3>
                  </div>

                  {/* Episode Body */}
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{
                      fontSize: '1.1rem',
                      color: episode.color,
                      fontStyle: 'italic',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}>
                      "{episode.tagline}"
                    </p>

                    {selectedEpisode === episode.id && (
                      <div style={{
                        animation: 'fadeIn 0.5s ease',
                        borderTop: `1px solid ${episode.color}40`,
                        paddingTop: '1.5rem',
                        marginTop: '1rem'
                      }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                          <strong style={{ color: episode.color }}>📖 Synopsis:</strong>
                          <p style={{ marginTop: '0.5rem', color: '#ddd', lineHeight: '1.6' }}>
                            {episode.description}
                          </p>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                          <strong style={{ color: episode.color }}>🎨 Visual Style:</strong>
                          <p style={{ marginTop: '0.5rem', color: '#aaa', fontSize: '0.95rem' }}>
                            {episode.visual}
                          </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                          <strong style={{ color: episode.color }}>🦸 Heroes Featured:</strong>
                          <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            flexWrap: 'wrap',
                            marginTop: '0.5rem'
                          }}>
                            {episode.heroes.map(heroId => {
                              const hero = heroSquad.find(h => h.id === heroId);
                              return hero ? (
                                <span
                                  key={heroId}
                                  style={{
                                    background: hero.color,
                                    color: '#000',
                                    padding: '5px 12px',
                                    borderRadius: '15px',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {hero.emoji} {hero.name.split(' ').slice(-1)[0]}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>

                        <div style={{
                          background: 'rgba(255,0,0,0.1)',
                          padding: '1rem',
                          borderRadius: '10px',
                          border: '1px solid #ff0000'
                        }}>
                          <strong style={{ color: '#ff0000' }}>😈 Villain:</strong>
                          <span style={{ marginLeft: '0.5rem', color: '#ff6b6b' }}>
                            {episode.villain === 'all' 
                              ? 'THE ENTIRE DENIAL SQUAD'
                              : denialSquad.find(v => v.id === episode.villain)?.name}
                          </span>
                        </div>

                        <div style={{
                          marginTop: '1rem',
                          padding: '0.5rem 1rem',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          fontSize: '0.9rem',
                          color: '#888'
                        }}>
                          Style: {episode.style}
                        </div>
                      </div>
                    )}

                    <div style={{
                      marginTop: '1rem',
                      textAlign: 'center',
                      fontSize: '0.85rem',
                      color: '#888'
                    }}>
                      {selectedEpisode === episode.id ? '▲ Collapse' : '▼ View Details'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION: MAD-STYLE COMIC PAGES */}
        <div id="section-comics" style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, #1a0033 0%, #000000 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* MEMETIC MAGIC: COMIC ARCHIVE */}
            <div style={{
              background: 'linear-gradient(135deg, #FF00FF 0%, #9900FF 50%, #FFD700 100%)',
              padding: '20px',
              borderRadius: '15px',
              marginBottom: '2rem',
              textAlign: 'center',
              border: '3px solid #FF00FF',
              boxShadow: '0 0 30px rgba(255,0,255,0.5), inset 0 0 30px rgba(153,0,255,0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <div style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '0 0 10px #000, 2px 2px 4px #000',
                marginBottom: '10px'
              }}>
                📚🎨 MEMETIC COMIC ARCHIVE UNLOCKED 🎨📚
              </div>
              <div style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                color: '#1a0033',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(255,255,255,0.5)'
              }}>
                SATIRE MEETS ACTION IN THE BUREAUCRATIC WASTES SAGA
              </div>
            </div>

            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              marginBottom: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FF00FF 0%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              📖 MAD-STYLE COMIC PAGES 📖
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#FF00FF',
              marginBottom: '2rem',
              maxWidth: '800px',
              margin: '0 auto 3rem'
            }}>
              Core scenes from the Bureaucratic Wastes saga. Satire meets action meets dark comedy.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {comicPages.map((page) => (
                <div
                  key={page.id}
                  onClick={() => setSelectedComicPage(page.id === selectedComicPage ? null : page.id)}
                  style={{
                    background: selectedComicPage === page.id 
                      ? `linear-gradient(135deg, ${page.color} 0%, #000 100%)`
                      : 'rgba(255,255,255,0.05)',
                    border: `4px solid ${page.color}`,
                    borderRadius: '15px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedComicPage === page.id ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: selectedComicPage === page.id 
                      ? `0 0 40px ${page.color}60`
                      : 'none'
                  }}
                >
                  {/* Page Header */}
                  <div style={{
                    background: page.color,
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#000'
                    }}>
                      PAGE {page.number}
                    </span>
                    <span style={{
                      background: '#000',
                      color: page.color,
                      padding: '5px 12px',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {page.mood}
                    </span>
                  </div>

                  {/* Page Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.4rem',
                      color: page.color,
                      marginBottom: '0.5rem',
                      fontWeight: 'bold'
                    }}>
                      {page.title}
                    </h3>

                    <p style={{
                      color: '#aaa',
                      fontSize: '1rem',
                      marginBottom: '1rem',
                      lineHeight: '1.5'
                    }}>
                      {page.description}
                    </p>

                    {selectedComicPage === page.id && (
                      <div style={{
                        animation: 'fadeIn 0.5s ease',
                        borderTop: `1px solid ${page.color}40`,
                        paddingTop: '1.5rem',
                        marginTop: '1rem'
                      }}>
                        <strong style={{ color: page.color, fontSize: '1.1rem' }}>📰 Panel Breakdown:</strong>
                        
                        <div style={{
                          display: 'grid',
                          gap: '1rem',
                          marginTop: '1rem'
                        }}>
                          {page.panels.map((panel, idx) => (
                            <div
                              key={idx}
                              style={{
                                background: 'rgba(0,0,0,0.5)',
                                border: `2px solid ${page.color}40`,
                                borderRadius: '10px',
                                padding: '1rem',
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'flex-start'
                              }}
                            >
                              <span style={{
                                background: page.color,
                                color: '#000',
                                padding: '3px 10px',
                                borderRadius: '10px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                flexShrink: 0
                              }}>
                                {panel.type}
                              </span>
                              <p style={{
                                color: '#ddd',
                                fontSize: '0.95rem',
                                lineHeight: '1.5',
                                margin: 0
                              }}>
                                {panel.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{
                      marginTop: '1rem',
                      textAlign: 'center',
                      fontSize: '0.85rem',
                      color: '#888'
                    }}>
                      {selectedComicPage === page.id ? '▲ Collapse' : '▼ View Panels'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION: SEASON 1 EPISODES - RISE OF THE EMBASSY */}
        <div id="section-season1" style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, #1a0033 0%, #330066 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              marginBottom: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #9932CC 0%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🎬 SEASON 1: RISE OF THE EMBASSY 🎬
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#9932CC',
              marginBottom: '2rem',
              maxWidth: '900px',
              margin: '0 auto 3rem'
            }}>
              The origin season. Where it all began. 12 episodes of truth, resistance, and the birth of a movement.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {season1Episodes.map((episode) => (
                <div
                  key={episode.id}
                  onClick={() => setSelectedEpisode(episode.id === selectedEpisode ? null : episode.id)}
                  style={{
                    background: selectedEpisode === episode.id 
                      ? `linear-gradient(135deg, ${episode.color}40 0%, #000 100%)`
                      : 'rgba(0,0,0,0.6)',
                    border: `3px solid ${episode.color}`,
                    borderRadius: '15px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedEpisode === episode.id ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div style={{
                    background: episode.color,
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#000' }}>
                      EPISODE {episode.number}
                    </div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      color: '#000',
                      fontWeight: 'bold',
                      margin: '0.5rem 0 0'
                    }}>
                      {episode.title}
                    </h3>
                  </div>

                  <div style={{ padding: '1rem' }}>
                    <p style={{
                      fontSize: '1rem',
                      color: episode.color,
                      fontStyle: 'italic',
                      marginBottom: '0.5rem',
                      textAlign: 'center'
                    }}>
                      "{episode.tagline}"
                    </p>

                    {selectedEpisode === episode.id && (
                      <div style={{
                        animation: 'fadeIn 0.3s ease',
                        borderTop: `1px solid ${episode.color}40`,
                        paddingTop: '1rem',
                        marginTop: '0.5rem'
                      }}>
                        <p style={{ color: '#ddd', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                          {episode.description}
                        </p>
                        <div style={{
                          background: 'rgba(255,255,255,0.1)',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          color: '#aaa'
                        }}>
                          <strong style={{ color: episode.color }}>🎬 Key Moment:</strong> {episode.keyMoment}
                        </div>
                      </div>
                    )}

                    <div style={{
                      marginTop: '0.75rem',
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      color: '#666'
                    }}>
                      {selectedEpisode === episode.id ? '▲ Less' : '▼ More'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION: ARTIFACTS OF POWER */}
        <div id="section-artifacts" style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, #330066 0%, #1a0033 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              marginBottom: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FFD700 0%, #9932CC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              ⚡ ARTIFACTS OF POWER ⚡
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#FFD700',
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem'
            }}>
              Legendary tools the heroes wield. Each artifact holds the power of collective struggle.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {artifactsOfPower.map((artifact) => (
                <div
                  key={artifact.id}
                  onClick={() => setSelectedArtifact(artifact.id === selectedArtifact ? null : artifact.id)}
                  style={{
                    background: selectedArtifact === artifact.id 
                      ? `linear-gradient(135deg, ${artifact.color}30 0%, #000 100%)`
                      : 'rgba(0,0,0,0.7)',
                    border: `3px solid ${artifact.color}`,
                    borderRadius: '20px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedArtifact === artifact.id ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '4rem' }}>{artifact.emoji}</span>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: artifact.color,
                      marginTop: '0.5rem',
                      fontWeight: 'bold'
                    }}>
                      {artifact.name}
                    </h3>
                    <span style={{
                      display: 'inline-block',
                      background: artifact.color,
                      color: '#000',
                      padding: '3px 12px',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      marginTop: '0.5rem'
                    }}>
                      {artifact.type}
                    </span>
                  </div>

                  <p style={{
                    color: '#ddd',
                    textAlign: 'center',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {artifact.description}
                  </p>

                  {selectedArtifact === artifact.id && (
                    <div style={{
                      animation: 'fadeIn 0.3s ease',
                      borderTop: `1px solid ${artifact.color}40`,
                      paddingTop: '1.5rem',
                      marginTop: '1rem'
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: artifact.color }}>⚡ Powers:</strong>
                        <ul style={{ color: '#aaa', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                          {artifact.powers.map((power, idx) => (
                            <li key={idx} style={{ marginBottom: '0.3rem' }}>{power}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: artifact.color }}>📜 Origin:</strong>
                        <p style={{ color: '#aaa', marginTop: '0.3rem', fontSize: '0.95rem' }}>{artifact.origin}</p>
                      </div>
                      <div style={{
                        background: `${artifact.color}20`,
                        padding: '0.75rem',
                        borderRadius: '10px',
                        textAlign: 'center'
                      }}>
                        <strong style={{ color: artifact.color }}>🦸 Wielded by:</strong>
                        <span style={{ color: '#fff', marginLeft: '0.5rem' }}>{artifact.wielder}</span>
                      </div>
                    </div>
                  )}

                  <div style={{
                    marginTop: '1rem',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: '#666'
                  }}>
                    {selectedArtifact === artifact.id ? '▲ Collapse' : '▼ Reveal Powers'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION: VILLAIN FACTIONS */}
        <div id="section-factions" style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, #1a0033 0%, #2a0000 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              marginBottom: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FF0000 0%, #8B0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🏴 THE ENEMY FACTIONS 🏴
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#ff6b6b',
              marginBottom: '3rem',
              maxWidth: '900px',
              margin: '0 auto 3rem'
            }}>
              Beyond the Denial Squad lie greater threats. Systemic forces of oppression that must be exposed and defeated.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {villainFactions.map((faction) => (
                <div
                  key={faction.id}
                  onClick={() => setSelectedFaction(faction.id === selectedFaction ? null : faction.id)}
                  style={{
                    background: selectedFaction === faction.id 
                      ? `linear-gradient(135deg, ${faction.color}30 0%, #000 100%)`
                      : 'rgba(0,0,0,0.8)',
                    border: `3px solid ${faction.color}`,
                    borderRadius: '20px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '4rem' }}>{faction.emoji}</span>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: faction.color,
                      marginTop: '0.5rem',
                      fontWeight: 'bold'
                    }}>
                      {faction.name}
                    </h3>
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(255,0,0,0.3)',
                      color: '#ff6b6b',
                      padding: '3px 12px',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      marginTop: '0.5rem'
                    }}>
                      {faction.type}
                    </span>
                  </div>

                  <p style={{
                    color: '#ccc',
                    textAlign: 'center',
                    lineHeight: '1.6'
                  }}>
                    {faction.description}
                  </p>

                  {selectedFaction === faction.id && (
                    <div style={{
                      animation: 'fadeIn 0.3s ease',
                      borderTop: `1px solid ${faction.color}40`,
                      paddingTop: '1.5rem',
                      marginTop: '1.5rem'
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: faction.color }}>💀 Abilities:</strong>
                        <ul style={{ color: '#aaa', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                          {faction.abilities.map((ability, idx) => (
                            <li key={idx} style={{ marginBottom: '0.3rem' }}>{ability}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: faction.color }}>👥 Agents:</strong>
                        <p style={{ color: '#aaa', marginTop: '0.3rem', fontSize: '0.95rem' }}>{faction.agents}</p>
                      </div>
                      <div style={{
                        background: 'rgba(0,255,0,0.1)',
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: '1px solid #00ff00'
                      }}>
                        <strong style={{ color: '#00ff00' }}>✨ Weakness:</strong>
                        <span style={{ color: '#aaa', marginLeft: '0.5rem' }}>{faction.weakness}</span>
                      </div>
                    </div>
                  )}

                  <div style={{
                    marginTop: '1rem',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: '#666'
                  }}>
                    {selectedFaction === faction.id ? '▲ Collapse' : '▼ Intel Report'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION: EMBASSY LOCATIONS */}
        <div id="section-locations" style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, #2a0000 0%, #1a0033 100%)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              marginBottom: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🏛️ EMBASSY GEOGRAPHY 🏛️
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#00ffff',
              marginBottom: '3rem',
              maxWidth: '900px',
              margin: '0 auto 3rem'
            }}>
              The Embassy exists between dimensions—between the World of Workers and the Bureaucratic Abyss. Explore its halls.
            </p>

            <div style={{
              textAlign: 'center',
              marginBottom: '2rem',
              padding: '1.5rem',
              background: 'rgba(255,0,255,0.1)',
              border: '2px solid #ff00ff',
              borderRadius: '15px',
              maxWidth: '800px',
              margin: '0 auto 3rem'
            }}>
              <p style={{ color: '#ff00ff', fontSize: '1.2rem', fontStyle: 'italic' }}>
                "Mourn the dead. Fight for the living. Meme for the truth."
              </p>
              <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                — Embassy Motto
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {embassyLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id === selectedLocation ? null : location.id)}
                  style={{
                    background: selectedLocation === location.id 
                      ? `linear-gradient(135deg, ${location.color}20 0%, #000 100%)`
                      : 'rgba(0,0,0,0.6)',
                    border: `2px solid ${location.color}`,
                    borderRadius: '15px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '3rem' }}>{location.emoji}</span>
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: location.color,
                      marginTop: '0.5rem',
                      fontWeight: 'bold'
                    }}>
                      {location.name}
                    </h3>
                  </div>

                  <p style={{
                    color: '#ccc',
                    textAlign: 'center',
                    fontSize: '0.95rem',
                    lineHeight: '1.5'
                  }}>
                    {location.description}
                  </p>

                  {selectedLocation === location.id && (
                    <div style={{
                      animation: 'fadeIn 0.3s ease',
                      borderTop: `1px solid ${location.color}40`,
                      paddingTop: '1rem',
                      marginTop: '1rem'
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: location.color }}>🎯 Purpose:</strong>
                        <p style={{ color: '#aaa', marginTop: '0.3rem' }}>{location.purpose}</p>
                      </div>
                      <div>
                        <strong style={{ color: location.color }}>✨ Features:</strong>
                        <ul style={{ color: '#aaa', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                          {location.features.map((feature, idx) => (
                            <li key={idx} style={{ marginBottom: '0.3rem' }}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div style={{
                    marginTop: '1rem',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    color: '#666'
                  }}>
                    {selectedLocation === location.id ? '▲ Close' : '▼ Enter'}
                  </div>
                </div>
              ))}
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
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨🏛️✨</div>
                <h3 style={{
                  fontSize: '2.5rem',
                  color: '#000',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  🎖️ CLAIM YOUR CITIZENSHIP 🎖️
                </h3>
                
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  padding: '1rem',
                  borderRadius: '10px',
                  marginBottom: '1.5rem'
                }}>
                  <p style={{ fontSize: '1rem', color: '#ff00ff', fontWeight: 'bold', margin: 0 }}>
                    🎭 MEMETIC MAGIC INCLUDES:
                  </p>
                  <p style={{ fontSize: '0.95rem', color: '#000', margin: '0.5rem 0 0', lineHeight: '1.5' }}>
                    Diplomatic immunity from gaslighting • Digital passport with meme powers •
                    Access to the Memetic Forge • Protection by the Hero Squad
                  </p>
                </div>

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

            {/* Social Share Section */}
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'rgba(255,0,255,0.1)',
              border: '2px solid #ff00ff',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '1.2rem',
                color: '#00ffff',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                🌐 Share The Memetic Embassy Full Experience
              </p>
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '1rem'
              }}>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Join the Memetic Embassy - Where injured workers become superheroes!')}&url=${encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy-full')}&via=Phoenixrizin09`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: '#1DA1F2', textDecoration: 'none', fontSize: '2rem' }}>
                  🐦
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy-full')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: '#4267B2', textDecoration: 'none', fontSize: '2rem' }}>
                  📘
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy-full')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: '#0077B5', textDecoration: 'none', fontSize: '2rem' }}>
                  💼
                </a>
                <a href={`https://reddit.com/submit?url=${encodeURIComponent('https://injuredworkersunite.pages.dev/memetic-embassy-full')}&title=${encodeURIComponent('The Memetic Embassy - Superhero Edition')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: '#FF4500', textDecoration: 'none', fontSize: '2rem' }}>
                  🤖
                </a>
              </div>
              <p style={{
                fontSize: '1.1rem',
                color: '#FFD700',
                fontWeight: 'bold'
              }}>
                🌐 injuredworkersunite.pages.dev
              </p>
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

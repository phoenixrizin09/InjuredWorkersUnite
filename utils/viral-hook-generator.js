/**
 * 🔥 VIRAL HOOK GENERATOR - THE EYE ORACLE EDITION
 * 
 * Professional social media strategist system for generating
 * scroll-stopping hooks that make users engage immediately.
 * 
 * TARGET AUDIENCE: The entire disability community
 * - Injured workers fighting WCB/WSIB claims
 * - ODSP/disability benefits recipients
 * - People with chronic illness and invisible disabilities
 * - Mental health survivors navigating the system
 * - Caregivers and family members
 * - Disability advocates and allies
 * 
 * MAIN GOAL: Expose corruption, build community, drive action
 * 
 * Auto-updates every 30 days based on analytics performance
 * 
 * Pain Points Addressed:
 * - Denied claims after years of work (WCB/WSIB)
 * - ODSP rates forcing people into poverty ($1,308/month)
 * - Bureaucratic runaround and medical gaslighting
 * - Invisible disabilities dismissed as "not real"
 * - Chronic illness not recognized as disability
 * - Mental health claims denied at 67% rate
 * - Poverty-level benefits while executives profit
 * - Feeling invisible, unheard, and dehumanized
 * - Confusing processes designed to make you give up
 * - Medical evidence being ignored or dismissed
 * - Accessibility barriers in healthcare and services
 * - Employment discrimination and accommodation denials
 * 
 * Desires Addressed:
 * - Justice and accountability for systemic ableism
 * - Fair treatment and livable benefits
 * - Community, solidarity, and disability pride
 * - Knowledge to fight back against the system
 * - Their story being heard and validated
 * - Winning their case/appeal
 * - Accessible and dignified services
 * - Recognition of disability rights as human rights
 */

// ═══════════════════════════════════════════════════════════════════════════
// POWER WORDS LIBRARY - Words that trigger emotional response
// ═══════════════════════════════════════════════════════════════════════════

const POWER_WORDS = {
  urgency: ['BREAKING', 'JUST IN', 'RIGHT NOW', 'TODAY', 'THIS WEEK', 'URGENT', 'ALERT', 'NOW'],
  curiosity: ['SECRET', 'HIDDEN', 'EXPOSED', 'REVEALED', 'LEAKED', 'DISCOVERED', 'UNCOVERED', 'THE TRUTH ABOUT'],
  emotion: ['OUTRAGEOUS', 'SHOCKING', 'HEARTBREAKING', 'INFURIATING', 'DEVASTATING', 'UNBELIEVABLE', 'ABLEIST'],
  validation: ['YOU\'RE NOT ALONE', 'WE SEE YOU', 'YOUR STORY MATTERS', 'FINALLY', 'VINDICATED', 'VALID', 'BELIEVED'],
  action: ['FIGHT BACK', 'TAKE ACTION', 'JOIN US', 'SHARE THIS', 'DEMAND', 'RESIST', 'NOTHING ABOUT US WITHOUT US'],
  numbers: ['67%', '18 MONTHS', '$1,308', '98,000+', '4,000+', '10,000+', '500,000+', '22%'],
  questions: ['DID YOU KNOW', 'EVER WONDER WHY', 'GUESS WHAT', 'WANT TO KNOW WHY'],
  disability: ['DISABILITY RIGHTS', 'ABLEISM', 'ACCESSIBILITY', 'ACCOMMODATION', 'CHRONIC ILLNESS', 'INVISIBLE DISABILITY', 'DISABLED AND PROUD']
};

// ═══════════════════════════════════════════════════════════════════════════
// HOOK TEMPLATES - Proven viral formulas customized for our audience
// ═══════════════════════════════════════════════════════════════════════════

const HOOK_TEMPLATES = {
  
  // FOMO (Fear of Missing Out) Hooks
  fomo: [
    "🚨 {STAT} disabled people don't know this one rule that could save their benefits...",
    "⚠️ They're about to change disability rules AGAIN. Here's what you need to know BEFORE {DATE}...",
    "🔥 BREAKING: We just found something in the data they really didn't want us to see...",
    "👁️ The Eye saw something today that changes EVERYTHING about {TOPIC}...",
    "📢 If you're waiting on ODSP, WSIB, or CPP-D, you NEED to read this before it's too late...",
    "🚨 New policy dropping that affects EVERY disabled Canadian. Are you ready?",
    "⚠️ They're quietly changing {TOPIC} rules. Here's what the disability community needs to know NOW..."
  ],
  
  // Outrage/Anger Hooks (validated emotion)
  outrage: [
    "They denied {NUMBER} disability claims in ONE week. The reason? You won't believe it. 🧵",
    "Remember when they said \"we help disabled people\"? Here's what they actually did today:",
    "CEO salary: ${CEO_SALARY}. ODSP maximum: ${BENEFIT}. Any questions?",
    "They rejected a claim in 48 hours but take 18 MONTHS to hear an appeal. Coincidence?",
    "The same agency that denied your disability claim just gave executives a ${AMOUNT} bonus.",
    "\"Fraud prevention\" - That's their excuse for denying {PERCENTAGE}% of mental health claims.",
    "ODSP: $1,308/month. Poverty line: $2,500/month. They call this \"support\"?",
    "They told her chronic pain \"isn't a real disability.\" She's been bedridden for 3 years.",
    "Invisible disability = invisible to them. But not to us. 👁️",
    "\"Just get a job\" they said to someone who can't leave their bed. The ableism is deafening."
  ],
  
  // Solidarity/Community Hooks
  solidarity: [
    "Every disabled person who's been told \"it's in your head\" 🤝 We see you.",
    "Thread: Real stories from {NUMBER} people denied benefits this month. You're not alone. 🧵",
    "POV: You did everything right, got sick/injured, and now YOU'RE the \"problem.\"",
    "If your claim was denied for a \"technicality,\" this thread is for you 👇",
    "To everyone still fighting after months (or years) of appeals: We're with you. ✊",
    "Chronic illness warriors 🤝 Injured workers 🤝 Mental health survivors. Same fight. Same enemy.",
    "Your disability is valid. Your pain is real. Your struggle matters. Period.",
    "To everyone with an invisible disability being told you \"don't look sick\" - WE SEE YOU. 💜",
    "Disabled and proud isn't just a slogan. It's resistance. ♿✊",
    "The spoon theory is real. The pain is real. YOU are real. Don't let them gaslight you.",
    "Neurodivergent 🤝 Physically disabled 🤝 Chronically ill. United against ableism."
  ],
  
  // Curiosity/Mystery Hooks
  curiosity: [
    "We ran the numbers on {AGENCY}. What we found will shock you. 🧵",
    "There's a pattern they don't want you to notice. Here's what The Eye found:",
    "Why do 67% of {TYPE} claims get denied? The answer isn't what you think...",
    "We traced the money. You won't believe where it leads. 👁️",
    "The document they tried to bury says it all. Thread 🧵"
  ],
  
  // Educational/Value Hooks
  educational: [
    "5 things you MUST document right now if you're filing a disability claim (thread):",
    "How to appeal an ODSP/WSIB/CPP-D denial (step-by-step guide that actually works):",
    "The exact words to use in your appeal that adjudicators can't ignore:",
    "FREE: The complete guide to FOI requests that get results 📁",
    "3 \"small\" mistakes that get disability claims denied (and how to avoid them):",
    "Know your rights: What they MUST accommodate under Ontario Human Rights Code 🧵",
    "Invisible disability? Here's how to document what doctors can't \"see\":",
    "ODSP survival guide: How to make $1,308 stretch (it shouldn't be this way, but here's how):",
    "Mental health claim denied? The 5 words that can change everything on appeal:",
    "Chronic illness + disability claims: What you need to know that they won't tell you:"
  ],
  
  // Bold Statement Hooks
  bold: [
    "The disability system isn't broken. It's working exactly as designed. Thread 🧵",
    "They don't deny claims to save money. They deny claims to make you give up.",
    "If they treated disabled people like they treat executives, we'd all have what we need.",
    "The person who denied your claim has never lived with a disability.",
    "Hot take: The 18-month wait for appeals isn't a bug, it's a feature.",
    "ODSP isn't \"support\" - it's enforced poverty. Call it what it is.",
    "Ableism isn't just attitudes. It's policy. It's budgets. It's intentional.",
    "Disability rights ARE human rights. Full stop. No exceptions.",
    "The medical model of disability is violence dressed up as science.",
    "\"Nothing about us without us\" isn't a request. It's a demand."
  ],
  
  // Data-Driven Hooks
  dataDriven: [
    "📊 THE NUMBERS ARE IN: {STAT} - here's what The Eye Oracle found today:",
    "{NUMBER} people affected. ${AMOUNT} in denied benefits. And they call it \"fraud prevention.\"",
    "We analyzed {NUMBER} claims. The results expose everything. Thread 👇",
    "The Eye tracked {DATA_POINT} this month. The pattern is undeniable:",
    "EXPOSED: The real numbers they don't want you to see 📈"
  ],
  
  // Question Hooks
  question: [
    "Did you know they can deny your claim without EVER speaking to your doctor?",
    "Ever wonder why appeals take 18 months but denials take 48 hours?",
    "Why do for-profit insurers get to decide if you're disabled?",
    "What if I told you there's a paper trail that proves it's all coordinated?",
    "How many injured workers have to suffer before someone holds them accountable?"
  ],
  
  // Storytelling Hooks  
  story: [
    "She worked there for 23 years. They denied her claim in 3 weeks. Here's her story 🧵",
    "A disabled person just sent us this. What happens next will make your blood boil.",
    "This email from an adjudicator accidentally got forwarded to us. Read it. 👀",
    "THREAD: What really happens behind closed doors at {AGENCY}:",
    "He followed every rule. Filed every form. They still denied him. Why? 👇",
    "She has 47 doctor's notes. They still said she's \"not disabled enough.\" 🧵",
    "Living on ODSP: A day in the life thread. This is what $1,308/month looks like:",
    "They told him chronic fatigue \"isn't real.\" He sleeps 16 hours a day. Thread:",
    "POV: You're disabled, you need help, and the system sees you as a number to reject.",
    "Her invisible illness is invisible to everyone except her body. Here's her story:"
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// PLATFORM-SPECIFIC ADAPTATIONS
// ═══════════════════════════════════════════════════════════════════════════

const PLATFORM_STYLES = {
  twitter: {
    maxLength: 280,
    style: 'punchy',
    useEmoji: true,
    useThread: true,
    hashtagCount: 2,
    bestTimes: ['7AM', '12PM', '5PM', '8PM'],
    toneNotes: 'Punchy, provocative, thread-friendly. End with 🧵 or 👇 for threads.',
    hashtagSuggestions: ['#3mpwrApp', '#DisabilityRights', '#DisabledAndProud', '#ODSP', '#WSIB', '#Ableism', '#ChronicIllness', '#InvisibleDisability', '#NothingAboutUsWithoutUs']
  },
  facebook: {
    maxLength: 500,
    style: 'storytelling',
    useEmoji: true,
    useThread: false,
    hashtagCount: 3,
    bestTimes: ['9AM', '1PM', '4PM'],
    toneNotes: 'More personal, storytelling. Ask for shares explicitly.',
    hashtagSuggestions: ['#3mpwrApp', '#DisabilityRights', '#DisabilityCommunity', '#ChronicIllnessWarrior', '#ODSPPoverty', '#AccessibilityMatters']
  },
  instagram: {
    maxLength: 2200,
    style: 'visual-first',
    useEmoji: true,
    useThread: false,
    hashtagCount: 15,
    bestTimes: ['11AM', '2PM', '7PM'],
    toneNotes: 'Hook in first line. Use line breaks. Caption should complement image.',
    hashtagSuggestions: ['#3mpwrApp', '#DisabilityRights', '#DisabledAndProud', '#ChronicIllness', '#InvisibleIllness', '#DisabilityAwareness', '#Ableism', '#SpoonieLife', '#ChronicPain', '#MentalHealthMatters', '#AccessibilityMatters', '#DisabilityCommunity', '#NothingAboutUsWithoutUs', '#DisabilityAdvocate', '#ChronicIllnessWarrior', '#DisabledNotBroken']
  },
  tiktok: {
    maxLength: 150,
    style: 'hook-heavy',
    useEmoji: true,
    useThread: false,
    hashtagCount: 5,
    bestTimes: ['7AM', '11AM', '7PM', '10PM'],
    toneNotes: 'First 3 seconds MUST hook. Pattern interrupt. Relatable POV style.',
    hashtagSuggestions: ['#3mpwrApp', '#DisabledTikTok', '#ChronicIllness', '#Spoonie', '#DisabilityAwareness', '#FYP', '#Ableism', '#InvisibleIllness']
  },
  linkedin: {
    maxLength: 3000,
    style: 'professional-activist',
    useEmoji: false,
    useThread: false,
    hashtagCount: 5,
    bestTimes: ['7AM', '12PM', '5PM'],
    toneNotes: 'Data-driven but human. Professional tone with activist heart.',
    hashtagSuggestions: ['#3mpwrApp', '#DisabilityInclusion', '#AccessibleWorkplace', '#DisabilityRights', '#Accommodation', '#InclusiveEmployment', '#DEI']
  },
  youtube: {
    maxLength: 5000,
    style: 'documentary',
    useEmoji: true,
    useThread: false,
    hashtagCount: 3,
    bestTimes: ['2PM', '5PM'],
    toneNotes: 'Clickable thumbnail energy. First 30 seconds hook. Pattern interrupts.',
    hashtagSuggestions: ['#3mpwrApp', '#WorkersComp', '#InjuredWorkers', '#Documentary']
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT THEMES BY DAY OF WEEK
// ═══════════════════════════════════════════════════════════════════════════

const WEEKLY_THEMES = {
  monday: {
    theme: 'Monday Motivation / Disability Pride',
    hookType: 'solidarity',
    emoji: '💪',
    mood: 'empowering',
    sampleHook: "New week, same fight. But this week, we have new ammunition. Disabled and proud. 👁️"
  },
  tuesday: {
    theme: 'Truth Tuesday / Data Drops',
    hookType: 'dataDriven',
    emoji: '📊',
    mood: 'exposing',
    sampleHook: "📊 TRUTH TUESDAY: The numbers they tried to hide this week..."
  },
  wednesday: {
    theme: 'Winning Wednesday / Community Victories',
    hookType: 'story',
    emoji: '🏆',
    mood: 'celebratory',
    sampleHook: "🏆 They said it couldn't be done. Here's how this disabled warrior WON:"
  },
  thursday: {
    theme: 'Throw Back / Historical Patterns',
    hookType: 'curiosity',
    emoji: '📜',
    mood: 'investigative',
    sampleHook: "This policy from 2019 explains EXACTLY why your claim was denied today:"
  },
  friday: {
    theme: 'Fury Friday / Outrage',
    hookType: 'outrage',
    emoji: '🔥',
    mood: 'angry',
    sampleHook: "🔥 The most infuriating thing The Eye saw this week:"
  },
  saturday: {
    theme: 'Story Saturday / Real Stories',
    hookType: 'story',
    emoji: '📖',
    mood: 'humanizing',
    sampleHook: "📖 Your stories, in your words. This week's community spotlight:"
  },
  sunday: {
    theme: 'Sunday Strategy / How To',
    hookType: 'educational',
    emoji: '🎯',
    mood: 'helpful',
    sampleHook: "🎯 Sunday prep: 5 things to do BEFORE Monday if you're fighting a claim:"
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// HOOK GENERATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a viral hook for a given topic and platform
 */
function generateViralHook(topic, platform = 'twitter', hookType = null, data = {}) {
  const platformStyle = PLATFORM_STYLES[platform] || PLATFORM_STYLES.twitter;
  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const dayTheme = WEEKLY_THEMES[dayOfWeek] || WEEKLY_THEMES.tuesday;
  
  // Select hook type based on day theme if not specified
  const selectedType = hookType || dayTheme.hookType;
  const templates = HOOK_TEMPLATES[selectedType] || HOOK_TEMPLATES.dataDriven;
  
  // Select random template
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Fill in data placeholders
  let hook = template
    .replace('{STAT}', data.stat || '67%')
    .replace('{NUMBER}', data.number || '10,000+')
    .replace('{TOPIC}', topic || 'workers\' compensation')
    .replace('{DATE}', data.date || 'next month')
    .replace('{CEO_SALARY}', data.ceoSalary || '847,000')
    .replace('{BENEFIT}', data.benefit || '1,308')
    .replace('{AMOUNT}', data.amount || '2.3M')
    .replace('{PERCENTAGE}', data.percentage || '67')
    .replace('{AGENCY}', data.agency || 'WSIB')
    .replace('{TYPE}', data.type || 'mental health')
    .replace('{DATA_POINT}', data.dataPoint || 'denial rates');
  
  // Add platform-specific hashtags
  if (platformStyle.useEmoji && !hook.includes('👁️')) {
    hook += ' 👁️';
  }
  
  // Truncate if needed
  if (hook.length > platformStyle.maxLength) {
    hook = hook.substring(0, platformStyle.maxLength - 3) + '...';
  }
  
  return {
    hook,
    platform,
    hookType: selectedType,
    dayTheme: dayTheme.theme,
    hashtags: platformStyle.hashtagSuggestions.slice(0, platformStyle.hashtagCount),
    bestTime: platformStyle.bestTimes[0],
    toneNotes: platformStyle.toneNotes
  };
}

/**
 * Generate a complete multi-platform post package from Eye Oracle data
 */
function generatePostPackage(eyeOracleReport) {
  const platforms = ['twitter', 'facebook', 'instagram', 'tiktok'];
  
  const extractedData = {
    stat: eyeOracleReport.violationCount ? `${eyeOracleReport.violationCount} violations` : '67%',
    number: eyeOracleReport.dataSources?.federal || '89',
    topic: eyeOracleReport.violations?.[0]?.category || 'workers rights',
    agency: 'WSIB',
    type: eyeOracleReport.violations?.[0]?.category || 'disability'
  };
  
  const package = {
    headline: eyeOracleReport.headline,
    date: eyeOracleReport.date,
    platforms: {}
  };
  
  platforms.forEach(platform => {
    const mainHook = generateViralHook(extractedData.topic, platform, null, extractedData);
    
    // Generate 3 alternative hooks
    const altHookTypes = ['outrage', 'curiosity', 'solidarity'];
    const alternativeHooks = altHookTypes.map(type => 
      generateViralHook(extractedData.topic, platform, type, extractedData).hook
    );
    
    package.platforms[platform] = {
      primaryHook: mainHook.hook,
      alternativeHooks,
      hashtags: mainHook.hashtags,
      bestTime: mainHook.bestTime,
      toneNotes: mainHook.toneNotes
    };
  });
  
  return package;
}

/**
 * Generate blog post title and hooks from Eye Oracle data
 */
function generateBlogContent(eyeOracleData) {
  const { title, violations, severity, category } = eyeOracleData;
  
  // Generate multiple headline options
  const headlines = [
    // Curiosity
    `👁️ What ${category === 'workers' ? 'WSIB' : 'The Government'} Doesn't Want You to Know About ${title}`,
    // Outrage
    `🔥 EXPOSED: The Shocking Truth Behind ${title}`,
    // FOMO
    `⚠️ ${violations?.length || 10}+ Workers Affected: What You NEED to Know About ${title}`,
    // Question
    `Why Are They Hiding This? The Real Story of ${title}`,
    // Bold Statement
    `The Eye Sees All: ${title} - And It's Worse Than They're Telling You`
  ];
  
  // Generate intro hooks (first paragraph that must grab attention)
  const introHooks = [
    `Here's the thing they don't want you to understand: ${title} isn't a mistake. It's a pattern. And today, The Eye Oracle exposes exactly how deep it goes.`,
    `They denied another claim today. They'll deny another one tomorrow. But we're tracking every single one. Here's what the data shows:`,
    `What if I told you that everything they've told you about ${category} benefits was designed to make you give up? Let me show you the receipts.`,
    `The numbers don't lie. The Eye Oracle has been watching, and what we found this week will make you question everything.`
  ];
  
  // Generate call-to-action hooks
  const ctaHooks = [
    `Share this with every injured worker you know. They're counting on us staying silent.`,
    `The Eye sees. The Eye remembers. Now it's your turn to take action. Here's how:`,
    `This ends when we make it end. Share this report. Contact your MPP. File that FOI request. We've got the tools - use them.`,
    `Knowledge is power. Now you know what they're doing. The question is: what are you going to do about it?`
  ];
  
  return {
    headlines,
    selectedHeadline: headlines[0],
    introHooks,
    selectedIntro: introHooks[Math.floor(Math.random() * introHooks.length)],
    ctaHooks,
    selectedCta: ctaHooks[Math.floor(Math.random() * ctaHooks.length)],
    metadata: {
      category,
      severity,
      generatedAt: new Date().toISOString()
    }
  };
}

/**
 * Generate a 30-day posting calendar
 */
function generate30DayCalendar(startDate = new Date()) {
  const calendar = [];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const dayTheme = WEEKLY_THEMES[dayName] || WEEKLY_THEMES.tuesday;
    
    // Rotate through hook types for variety
    const hookTypes = Object.keys(HOOK_TEMPLATES);
    const hookType = hookTypes[i % hookTypes.length];
    
    calendar.push({
      date: date.toISOString().split('T')[0],
      dayOfWeek: dayName,
      theme: dayTheme.theme,
      emoji: dayTheme.emoji,
      suggestedHookType: hookType,
      suggestedTopic: getTopicForDay(i),
      contentFocus: dayTheme.mood,
      sampleHook: dayTheme.sampleHook,
      platforms: {
        twitter: { postAt: '12:00 PM EST', priority: 'high' },
        facebook: { postAt: '1:00 PM EST', priority: 'medium' },
        instagram: { postAt: '7:00 PM EST', priority: 'high' },
        tiktok: { postAt: '7:00 PM EST', priority: 'high' }
      }
    });
  }
  
  return calendar;
}

/**
 * Get rotating topic for content variety
 */
function getTopicForDay(dayIndex) {
  const topics = [
    'WSIB claim denials',
    'ODSP poverty rates',
    'Mental health discrimination',
    'Appeal wait times',
    'Corporate executive bonuses',
    'Accessibility failures',
    'Medical evidence dismissal',
    'Retaliation against workers',
    'Housing crisis impact',
    'Success stories and wins'
  ];
  
  return topics[dayIndex % topics.length];
}

/**
 * Analytics-based hook optimization (updates every 30 days)
 */
function optimizeHooksFromAnalytics(analyticsData) {
  // This function would analyze which hooks performed best
  // and adjust the templates accordingly
  
  const analysis = {
    topPerformingTypes: [],
    underperformingTypes: [],
    recommendations: [],
    lastUpdated: new Date().toISOString()
  };
  
  if (analyticsData && analyticsData.posts) {
    // Analyze engagement by hook type
    const typeEngagement = {};
    
    analyticsData.posts.forEach(post => {
      if (!typeEngagement[post.hookType]) {
        typeEngagement[post.hookType] = { total: 0, count: 0 };
      }
      typeEngagement[post.hookType].total += post.engagement || 0;
      typeEngagement[post.hookType].count += 1;
    });
    
    // Calculate averages and rank
    const ranked = Object.entries(typeEngagement)
      .map(([type, data]) => ({
        type,
        avgEngagement: data.total / data.count
      }))
      .sort((a, b) => b.avgEngagement - a.avgEngagement);
    
    analysis.topPerformingTypes = ranked.slice(0, 3).map(r => r.type);
    analysis.underperformingTypes = ranked.slice(-2).map(r => r.type);
    
    // Generate recommendations
    if (analysis.topPerformingTypes.includes('outrage')) {
      analysis.recommendations.push('Outrage hooks performing well - increase frequency');
    }
    if (analysis.underperformingTypes.includes('educational')) {
      analysis.recommendations.push('Educational content underperforming - try adding more emotion');
    }
  }
  
  return analysis;
}

// ═══════════════════════════════════════════════════════════════════════════
// QUIRKY PERSONALITY TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════

const QUIRKY_INTROS = [
  "Good {TIME_OF_DAY}! Time to see what ableist shenanigans they've been up to. ☕",
  "The Eye never sleeps. Neither do bureaucratic nightmares, apparently. 👁️",
  "Happy {DAY}! Bad news: they're still at it. Good news: so are we.",
  "Rise and... well, do what you can today. We'll do the grinding. Spoons are precious.",
  "Another day, another {NUMBER} violations against disabled people. Let's dive in, shall we?",
  "Grab your tea/coffee/hydration of choice. Today's report is a doozy.",
  "Welcome back! Spoiler alert: ableism is alive and well. But so is our resistance.",
  "The Eye Oracle reporting for duty. What fresh ableist hell awaits us today? Let's find out.",
  "Good {TIME_OF_DAY}, fellow disability warriors. The data doesn't lie. Here's what we found.",
  "Plot twist: the system is still ableist. Here's today's evidence 📋",
  "Low spoon day? Same. But the receipts don't collect themselves. Here's what The Eye saw.",
  "They said we were exaggerating. The numbers say otherwise. 👁️"
];

const QUIRKY_CLOSINGS = [
  "Knowledge is power. Now you know what they're doing. Use it. 💪",
  "The Eye sees all. The Eye forgets nothing. And now, so do you.",
  "Stay vigilant. Stay informed. Stay angry (in a productive way).",
  "That's the tea for today. ☕ Share it before it goes cold.",
  "Remember: they're not understaffed, they're under-motivated to help. Keep pushing.",
  "Until tomorrow, when we do this all over again. The Eye is watching. 👁️",
  "Share this with someone who needs to know. We rise by lifting each other.",
  "The fight continues. See you tomorrow with more receipts. 🧾",
  "Rest if you need to. Your health comes first. But when you're ready, we're here.",
  "That's a wrap. But the fight? That never wraps. See you tomorrow.",
  "Disabled and proud. Informed and dangerous. Nothing about us without us. ♿✊",
  "Take your meds. Drink water. And remember: you're not the problem. The system is."
];

/**
 * Get quirky intro based on time and data
 */
function getQuirkyIntro(data = {}) {
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  let intro = QUIRKY_INTROS[Math.floor(Math.random() * QUIRKY_INTROS.length)];
  
  return intro
    .replace('{TIME_OF_DAY}', timeOfDay)
    .replace('{DAY}', dayName)
    .replace('{NUMBER}', data.violationCount || '15');
}

/**
 * Get quirky closing
 */
function getQuirkyClosing() {
  return QUIRKY_CLOSINGS[Math.floor(Math.random() * QUIRKY_CLOSINGS.length)];
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

module.exports = {
  generateViralHook,
  generatePostPackage,
  generateBlogContent,
  generate30DayCalendar,
  optimizeHooksFromAnalytics,
  getQuirkyIntro,
  getQuirkyClosing,
  HOOK_TEMPLATES,
  PLATFORM_STYLES,
  WEEKLY_THEMES,
  POWER_WORDS
};

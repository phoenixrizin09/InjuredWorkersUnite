const fs = require('fs');
const path = require('path');

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - DAILY VIRAL REPORT GENERATOR
 * 
 * "Quirky, funny, but BRUTAL with the truth"
 * 
 * Generates daily viral reports that:
 * - Summarize the justice report findings
 * - Use quirky/funny/sarcastic tone
 * - Include calls to action
 * - Are designed to go VIRAL
 * - Speak truth to power with ATTITUDE
 * 
 * THE EYE SEES. THE EYE REMEMBERS. THE EYE HAS OPINIONS. 👁️
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// QUIRKY INTROS - Different personality each day
// ═══════════════════════════════════════════════════════════════════════════

const QUIRKY_INTROS = {
  monday: [
    "☕ Monday morning, and The Eye is CAFFEINATED and IRRITATED. Let's see what fresh hell awaits...",
    "🌅 Rise and grind, disability warriors! The Eye didn't sleep - we were too busy reading government PDFs. Someone has to.",
    "👁️ New week, same audacity from the system. The Eye is ready. Are you?",
    "💪 Monday Motivation: Remember, you're not too disabled to matter. You're just too informed to ignore. Let's GO.",
    "🎯 The Eye's Monday mission: Expose at least one systemic injustice before noon. Challenge accepted."
  ],
  tuesday: [
    "📊 TRUTH TUESDAY! The Eye crunched numbers so you don't have to. Spoiler: they're not good.",
    "🔢 Tuesday data drop! Grab your calculators and your outrage - you'll need both.",
    "📈 The Eye ran the stats. The stats ran away screaming. Here's what we found...",
    "🎲 Fun game: Guess the denial rate! If you guessed 'way too high,' you win! (You don't actually win anything except righteous anger.)",
    "📉 Tuesday's Truth Bomb: brought to you by public data they hoped you'd never read."
  ],
  wednesday: [
    "🐪 Hump day! Halfway through the week of government agencies pretending to care.",
    "🏆 WINNING WEDNESDAY! Someone actually beat the system. Let's celebrate before the next denial.",
    "⚡ Mid-week energy check: The Eye is running on spite and determination. You?",
    "🎉 Wednesday wisdom: Every claim they deny is a receipt we're keeping. Forever.",
    "✨ Hump day hope: Somewhere, an appeal is being approved. The Eye manifests this for you."
  ],
  thursday: [
    "📜 THROWBACK THURSDAY: Remember that policy from 2019? It's still causing problems. Surprise!",
    "🕵️ The Eye went digging in the archives today. Found some interesting 'coincidences'...",
    "⏰ Thursday timeline check: They've had HOW LONG to fix this? And it's still broken?",
    "📚 History lesson: This isn't new. It's just newly exposed. You're welcome.",
    "🔍 The Eye's Thursday investigation: Following the paper trail where it leads..."
  ],
  friday: [
    "🔥 FURY FRIDAY! The Eye saved the most infuriating stuff for today. You're welcome.",
    "💢 TGIF - Thank God It's Fury-day! Let's get MAD before the weekend.",
    "🌋 Friday feels: Like a volcano of accountability about to erupt. Stand back.",
    "😤 End of week, end of patience. The Eye has THOUGHTS and they're not gentle.",
    "🎭 Friday mood: Professional on the outside, screaming into the void on the inside. Relatable?"
  ],
  saturday: [
    "📖 STORY SATURDAY! Real people, real struggles, real courage. Get the tissues.",
    "💜 Weekend warriors! The system takes weekends off. WE DON'T.",
    "🎤 Saturday spotlight: Your voice matters. Here's proof.",
    "✊ Community Saturday: Reminder that you're never fighting alone. The Eye sees ALL of you.",
    "🌟 Weekend wisdom: Rest is resistance. But also, here's what they did this week..."
  ],
  sunday: [
    "🎯 STRATEGY SUNDAY! Time to prep for battle. The Eye has tips.",
    "☀️ Sunday planning: What evidence are we gathering this week?",
    "📋 Pre-Monday prep: The Eye helps you get your ducks in a row. Angry ducks. Informed ducks.",
    "🧘 Sunday self-care: Read this, get informed, take a nap. Repeat.",
    "💡 Week ahead preview: The Eye has seen the schedule. There's gonna be drama."
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// SARCASTIC COMMENTARY TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════

const SARCASTIC_COMMENTS = {
  denial_rate: [
    "Oh good, they're still denying {rate}% of claims. Glad to see consistency! 🙄",
    "Denial rate at {rate}%? That's not a bug, that's a feature. Allegedly.",
    "Imagine being right {rate}% of the time... at being WRONG about disabilities.",
    "Achievement unlocked: {rate}% denial rate! Someone's getting a bonus. (Not you though.)",
    "Fun fact: {rate}% denied. Less fun fact: Those are real people."
  ],
  wait_times: [
    "Average wait time: {time}. Your patience is appreciated! (It's not, but they say it anyway.)",
    "{time} to process a claim. But sure, YOU'RE the problem for being 'difficult.'",
    "Waiting {time}? Perfect time to read War and Peace. Twice.",
    "They can deny in 48 hours but need {time} for an appeal. Math is hard, apparently.",
    "The Eye timed it: {time}. We could've trained for a marathon. And won."
  ],
  benefits: [
    "ODSP: ${amount}/month. Cost of existing: $$$$. The math ain't mathing.",
    "Living large on ${amount}! Said no one. Ever. In history.",
    "They said ${amount} was 'adequate.' The Eye said 'you try it first.'",
    "${amount}/month while rent is ${rent}. We're not saying it's intentional poverty, but... 👀",
    "Breaking: ${amount} still not enough to live. More at 11. And 12. And every day forever."
  ],
  bureaucracy: [
    "Form 17-B requires Form 23-A which requires Form 17-B. Kafka couldn't make this up.",
    "Step 1: Apply. Step 2: Wait. Step 3: Get denied. Step 4: Appeal. Step 5: Repeat until despair.",
    "The process is simple! *Hands you 47-page guide*",
    "Accessibility form is only available in 6-point font. The irony is *chef's kiss*.",
    "Call the help line! (Average hold time: Until the heat death of the universe.)"
  ],
  executive: [
    "CEO compensation: ${salary}. Your benefit increase this year: $0. Priorities! ✨",
    "Executives got ${bonus} in bonuses. You got a letter saying your claim is 'under review.'",
    "The same people who say 'there's no money' just approved ${amount} for office renovations.",
    "Fun comparison: {exec} salary vs your entire year of benefits. *The Eye does math* Yikes.",
    "They say they 'care about workers.' Their expense reports suggest otherwise."
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// CALL TO ACTION TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════

const CALLS_TO_ACTION = {
  share: [
    "🔄 SHARE THIS. Make it impossible to ignore. They hate when we're visible.",
    "📢 RT if you've been through this. Let's show them the numbers in real time.",
    "🗣️ Tag someone who needs to see this. Tag someone who needs to DO something about this.",
    "👊 Share, comment, RAGE. Silence helps them. Noise helps US.",
    "📲 Screenshot this. Send it to your MP. Send it to everyone. Make. Them. See.",
    "🌊 Let's make this trend. They can't ignore us if we're EVERYWHERE."
  ],
  contact: [
    "📧 Write your MP. Template in bio. Takes 2 minutes. DO IT.",
    "☎️ Call the Minister's office: {phone}. Ask them why. Be polite but PERSISTENT.",
    "📝 File a complaint: {url}. Every complaint is a receipt they can't destroy.",
    "🏛️ Contact info in bio. Flood their inbox. Democracy means they have to read it. (Eventually.)",
    "✉️ Draft email in our bio. Personalize it. Send it. Bug them until they respond."
  ],
  community: [
    "💜 You're not alone. Drop a 👁️ if you're with us.",
    "✊ Disabled and proud. Comment your story. We see you.",
    "🤝 Find your people. Links to support groups in bio.",
    "💪 Join the fight: {url}. Every voice matters. ESPECIALLY yours.",
    "👁️ The Eye sees you. The community supports you. You are NOT alone in this."
  ],
  evidence: [
    "📁 DOCUMENT EVERYTHING. Every email. Every call. Every denial. Build your paper trail.",
    "🗂️ Save this for your records. You might need it.",
    "📋 Evidence collection guide in bio. Your receipts are your power.",
    "🔍 Keep records. The Eye can only expose what's documented.",
    "📎 Add this to your file. Every piece of evidence matters in appeals."
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// EYE ORACLE PERSONALITY CLOSERS
// ═══════════════════════════════════════════════════════════════════════════

const QUIRKY_CLOSERS = [
  "👁️ THE EYE SEES ALL. THE EYE FORGETS NOTHING. THE EYE NEEDS MORE COFFEE.",
  "👁️ This has been your daily dose of righteous anger. Use it wisely.",
  "👁️ The Eye will return tomorrow. Because the audacity certainly will.",
  "👁️ Stay angry. Stay informed. Stay LOUD. - The Eye",
  "👁️ Remember: They want you to give up. Don't. - Your friendly neighborhood Oracle",
  "👁️ The Eye doesn't sleep. The Eye just blinks occasionally. See you tomorrow.",
  "👁️ That's all for today, but the receipts are FOREVER.",
  "👁️ Until tomorrow, keep fighting. The Eye believes in you even when the system doesn't.",
  "👁️ End transmission. But never end the resistance.",
  "👁️ The Eye Out. *drops mic* *picks it back up because mics are expensive*",
  "👁️ Be gay, do crimes, demand disability rights. Wait, not crimes. Just rights. The Eye is tired.",
  "👁️ Plot twist: We're the main characters. They just haven't realized it yet.",
  "👁️ The Eye has spoken. Now YOU speak. Louder.",
  "👁️ Signing off, but never logging out of accountability.",
  "👁️ Stay spicy, stay informed, stay UNGOVERNABLE. Love, The Eye",
  "👁️ This concludes today's programming. Tomorrow's programming: more of this. Forever."
];

// ═══════════════════════════════════════════════════════════════════════════
// VIRAL HEADLINE GENERATORS
// ═══════════════════════════════════════════════════════════════════════════

const HEADLINE_TEMPLATES = [
  "🚨 DAILY EYE REPORT: {mainFinding} (Thread 🧵)",
  "👁️ The Eye Saw {count} Things Today. #{number} Will Make You FURIOUS.",
  "🔥 TODAY IN 'ARE YOU KIDDING ME': {mainFinding}",
  "📊 EXPOSED: {mainFinding} - Here's the Proof",
  "⚠️ ALERT: {mainFinding} - What They Don't Want You to Know",
  "💢 The Daily Outrage Report: {mainFinding}",
  "👁️ EYE ORACLE DAILY: {count} Violations, {affected} Affected, 0 Accountability",
  "🎯 Today's Target: {target} | Today's Evidence: OVERWHELMING",
  "📢 THE EYE REPORT [{date}]: Still Mad About {mainFinding}",
  "🔍 Daily Justice Check: {status} (Spoiler: It's Bad)"
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN GENERATION FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

async function generateDailyViralReport() {
  console.log('👁️ THE EYE ORACLE: Generating Daily Viral Report...');
  console.log('═══════════════════════════════════════════════════════════');
  
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  
  console.log(`📅 Date: ${dateStr}`);
  console.log(`📆 Day: ${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}`);
  
  // Load justice report data
  let justiceReport = null;
  const justiceReportPath = path.join(__dirname, '../public/data/daily-justice-report.json');
  
  try {
    if (fs.existsSync(justiceReportPath)) {
      justiceReport = JSON.parse(fs.readFileSync(justiceReportPath, 'utf8'));
      console.log('📊 Loaded justice report data');
    }
  } catch (e) {
    console.log('⚠️ Could not load justice report:', e.message);
  }
  
  // Generate the quirky intro
  const intros = QUIRKY_INTROS[dayOfWeek] || QUIRKY_INTROS.tuesday;
  const intro = intros[Math.floor(Math.random() * intros.length)];
  
  // Generate main findings from justice report
  // Handle violations as object with severity keys (critical, high, medium, low) or as array
  let violations = [];
  const rawViolations = justiceReport?.violations;
  
  if (Array.isArray(rawViolations)) {
    violations = rawViolations;
  } else if (rawViolations && typeof rawViolations === 'object') {
    // Flatten object with severity keys into array
    violations = [
      ...(rawViolations.critical || []).map(v => ({ ...v, severity: 'critical' })),
      ...(rawViolations.high || []).map(v => ({ ...v, severity: 'high' })),
      ...(rawViolations.medium || []).map(v => ({ ...v, severity: 'medium' })),
      ...(rawViolations.low || []).map(v => ({ ...v, severity: 'low' }))
    ];
  }
  
  const violationCount = violations.length;
  const criticalCount = violations.filter(v => v.severity === 'critical' || v.severity === 'high').length;
  
  // Get top issues
  const topIssues = violations.slice(0, 3).map(v => ({
    title: v.title || v.name || v.finding || 'Systemic issue detected',
    severity: v.severity || 'high',
    type: v.type || 'GENERAL'
  }));
  
  // Get population impact - handle both array and object formats
  let populations = [];
  const rawPopulations = justiceReport?.impactedPopulations || justiceReport?.populationImpact;
  
  if (Array.isArray(rawPopulations)) {
    populations = rawPopulations;
  } else if (rawPopulations && typeof rawPopulations === 'object') {
    // Convert object format to array
    populations = Object.entries(rawPopulations).map(([key, data]) => ({
      name: key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, s => s.toUpperCase()),
      issueCount: data.count || data.issues?.length || 0,
      issues: data.issues || []
    }));
  }
  
  const totalAffected = populations.reduce((sum, p) => sum + (p.issueCount || 0), 0);
  
  // Generate headline
  const mainFinding = topIssues[0]?.title || 'More Evidence of Systemic Failures';
  const headlineTemplate = HEADLINE_TEMPLATES[Math.floor(Math.random() * HEADLINE_TEMPLATES.length)];
  const headline = headlineTemplate
    .replace('{mainFinding}', mainFinding.substring(0, 50))
    .replace('{count}', violationCount.toString())
    .replace('{number}', Math.min(violationCount, 5).toString())
    .replace('{affected}', populations[0]?.name || 'Thousands')
    .replace('{target}', 'The System')
    .replace('{date}', dateStr)
    .replace('{status}', criticalCount > 0 ? 'CRITICAL' : 'CONCERNING');
  
  // Generate sarcastic commentary for each finding
  const commentary = [];
  
  if (justiceReport?.summary) {
    // Add denial rate commentary if available
    const denialMatch = JSON.stringify(justiceReport).match(/(\d+)%/);
    if (denialMatch) {
      const comments = SARCASTIC_COMMENTS.denial_rate;
      commentary.push(comments[Math.floor(Math.random() * comments.length)]
        .replace('{rate}', denialMatch[1]));
    }
    
    // Add benefits commentary
    const benefitMatch = JSON.stringify(justiceReport).match(/\$[\d,]+/);
    if (benefitMatch) {
      const comments = SARCASTIC_COMMENTS.benefits;
      commentary.push(comments[Math.floor(Math.random() * comments.length)]
        .replace('{amount}', benefitMatch[0].replace('$', ''))
        .replace('{rent}', '1,800+'));
    }
  }
  
  // Add general bureaucracy comment
  const bureaucracyComments = SARCASTIC_COMMENTS.bureaucracy;
  commentary.push(bureaucracyComments[Math.floor(Math.random() * bureaucracyComments.length)]);
  
  // Generate call to action
  const ctaCategory = ['share', 'contact', 'community', 'evidence'][Math.floor(Math.random() * 4)];
  const ctas = CALLS_TO_ACTION[ctaCategory];
  const primaryCTA = ctas[Math.floor(Math.random() * ctas.length)]
    .replace('{phone}', '1-888-XXX-XXXX')
    .replace('{url}', 'injuredworkersunite.org');
  
  // Generate secondary CTA
  const secondaryCtas = CALLS_TO_ACTION.share;
  const secondaryCTA = secondaryCtas[Math.floor(Math.random() * secondaryCtas.length)];
  
  // Generate closer
  const closer = QUIRKY_CLOSERS[Math.floor(Math.random() * QUIRKY_CLOSERS.length)];
  
  // Build the complete report
  const viralReport = {
    meta: {
      generatedAt: new Date().toISOString(),
      date: dateStr,
      dayOfWeek,
      version: '1.0',
      source: 'THE EYE ORACLE Viral Report Generator'
    },
    
    headline,
    
    intro,
    
    summary: {
      violationsFound: violationCount,
      criticalIssues: criticalCount,
      populationsAffected: populations.length,
      charterConcerns: justiceReport?.summary?.charterConcerns || 0,
      uncrpdConcerns: justiceReport?.summary?.uncrpdConcerns || 0,
      justiceTestResult: justiceReport?.justiceTest?.determination || 'REQUIRES ASSESSMENT'
    },
    
    topFindings: topIssues.map((issue, i) => ({
      rank: i + 1,
      finding: issue.title,
      severity: issue.severity,
      emoji: issue.severity === 'critical' ? '🚨' : issue.severity === 'high' ? '⚠️' : '📌',
      sarcasticComment: commentary[i] || "The Eye is too tired to be sarcastic about this one. But trust us, it's bad."
    })),
    
    populationImpact: populations.slice(0, 5).map(p => ({
      group: p.name,
      issues: p.issueCount || 0,
      emoji: getPopulationEmoji(p.name)
    })),
    
    quirkyStats: generateQuirkyStats(justiceReport),
    
    callsToAction: {
      primary: primaryCTA,
      secondary: secondaryCTA,
      hashtags: ['#DisabilityRights', '#TheEyeOracle', '#InjuredWorkers', '#cdnpoli', '#Accountability']
    },
    
    closer,
    
    // Social media ready versions
    socialMedia: {
      twitter: generateTwitterThread(headline, intro, topIssues, commentary, primaryCTA, closer),
      facebook: generateFacebookPost(headline, intro, topIssues, commentary, primaryCTA, closer),
      instagram: generateInstagramCaption(headline, intro, topIssues, primaryCTA, closer),
      tiktok: generateTikTokScript(headline, topIssues[0], primaryCTA)
    },
    
    // Full blog post version
    blogPost: generateBlogPost(headline, intro, topIssues, commentary, populations, primaryCTA, closer, justiceReport)
  };
  
  // Save the viral report
  const outputPath = path.join(__dirname, '../public/data/daily-eye-viral-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(viralReport, null, 2));
  console.log(`✅ Saved viral report to: ${outputPath}`);
  
  // Save to history
  const historyPath = path.join(__dirname, '../public/data/eye-viral-report-history.json');
  let history = [];
  try {
    if (fs.existsSync(historyPath)) {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    }
  } catch (e) {}
  
  history.unshift({
    date: dateStr,
    headline: viralReport.headline,
    summary: viralReport.summary,
    intro: viralReport.intro.substring(0, 100) + '...'
  });
  history = history.slice(0, 30); // Keep last 30 days
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
  
  // Generate standalone HTML report for sharing
  generateHTMLReport(viralReport);
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('👁️ DAILY VIRAL REPORT PREVIEW');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📰 ${viralReport.headline}`);
  console.log('');
  console.log(`${viralReport.intro}`);
  console.log('');
  console.log('📊 TOP FINDINGS:');
  viralReport.topFindings.forEach(f => {
    console.log(`   ${f.emoji} ${f.finding}`);
    console.log(`      → ${f.sarcasticComment}`);
  });
  console.log('');
  console.log(`📢 ${viralReport.callsToAction.primary}`);
  console.log('');
  console.log(viralReport.closer);
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  
  return viralReport;
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function getPopulationEmoji(name) {
  const emojiMap = {
    'Persons with Disabilities': '♿',
    'Injured Workers': '🦺',
    'Low-Income Canadians': '💰',
    'Seniors': '👴',
    'Children': '👶',
    'Women': '👩',
    'Indigenous Peoples': '🪶',
    'Mental Health Community': '🧠',
    'Immigrants': '🌍',
    'Veterans': '🎖️'
  };
  return emojiMap[name] || '👥';
}

function generateQuirkyStats(justiceReport) {
  const stats = [];
  
  stats.push({
    stat: "∞",
    label: "Times The Eye has asked 'Are you serious?'",
    context: "Today alone"
  });
  
  if (justiceReport?.summary?.itemsAnalyzed) {
    stats.push({
      stat: justiceReport.summary.itemsAnalyzed,
      label: "Documents The Eye read",
      context: "So you don't have to"
    });
  }
  
  stats.push({
    stat: "0",
    label: "Times they admitted fault",
    context: "Shocking, we know"
  });
  
  stats.push({
    stat: "100%",
    label: "Of your outrage is valid",
    context: "The Eye confirms"
  });
  
  return stats;
}

function generateTwitterThread(headline, intro, findings, comments, cta, closer) {
  const tweets = [];
  
  // Tweet 1: Headline
  tweets.push(`${headline}\n\n🧵 Thread:`);
  
  // Tweet 2: Intro
  tweets.push(intro.substring(0, 270));
  
  // Tweet 3-5: Findings
  findings.forEach((finding, i) => {
    const emoji = finding.severity === 'critical' ? '🚨' : '⚠️';
    tweets.push(`${i + 1}/${findings.length} ${emoji} ${finding.title}\n\n${comments[i] || ''}`);
  });
  
  // Tweet 6: CTA
  tweets.push(`${cta}\n\n#DisabilityRights #TheEyeOracle #cdnpoli`);
  
  // Tweet 7: Closer
  tweets.push(closer);
  
  return tweets.map((tweet, i) => ({
    number: i + 1,
    content: tweet.substring(0, 280),
    charCount: Math.min(tweet.length, 280)
  }));
}

function generateFacebookPost(headline, intro, findings, comments, cta, closer) {
  let post = `${headline}\n\n`;
  post += `${intro}\n\n`;
  post += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  post += `📊 WHAT THE EYE FOUND TODAY:\n\n`;
  
  findings.forEach((finding, i) => {
    const emoji = finding.severity === 'critical' ? '🚨' : '⚠️';
    post += `${emoji} ${finding.title}\n`;
    if (comments[i]) {
      post += `   👁️ ${comments[i]}\n`;
    }
    post += '\n';
  });
  
  post += `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  post += `📢 ${cta}\n\n`;
  post += `${closer}\n\n`;
  post += `#DisabilityRights #TheEyeOracle #InjuredWorkers #cdnpoli #Accountability #WSIB #ODSP`;
  
  return post;
}

function generateInstagramCaption(headline, intro, findings, cta, closer) {
  let caption = `👁️ THE EYE ORACLE DAILY REPORT\n`;
  caption += `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  caption += `${headline.replace(/🧵|Thread/g, '').trim()}\n\n`;
  caption += `${intro}\n\n`;
  caption += `📊 TOP FINDINGS:\n`;
  
  findings.forEach((finding, i) => {
    const emoji = ['1️⃣', '2️⃣', '3️⃣'][i] || '➡️';
    caption += `${emoji} ${finding.title}\n`;
  });
  
  caption += `\n📢 ${cta}\n\n`;
  caption += `${closer}\n\n`;
  caption += `.\n.\n.\n`;
  caption += `#DisabilityRights #TheEyeOracle #InjuredWorkers #cdnpoli #Accountability #WSIB #ODSP #DisabledAndProud #ChronicIllness #InvisibleDisability #Ableism #DisabilityCommunity #NothingAboutUsWithoutUs #DisabilityAdvocate #AccessibilityMatters`;
  
  return caption;
}

function generateTikTokScript(headline, topFinding, cta) {
  return {
    hook: `POV: The Eye just exposed ${topFinding?.title?.substring(0, 30) || 'the government'} and it's WILD`,
    script: [
      "[HOOK - 0:00-0:03] The government doesn't want you to see this. *Eye emoji appears*",
      "[CONTEXT - 0:03-0:10] Every day I analyze disability and workers' comp data. What I found today...",
      `[REVEAL - 0:10-0:20] ${topFinding?.title || 'Systemic failures affecting thousands'}`,
      "[REACTION - 0:20-0:30] *Sarcastic commentary about the audacity*",
      `[CTA - 0:30-0:45] ${cta} Link in bio. THE EYE SEES ALL.`
    ],
    sounds: ["Dramatic reveal sound", "Original sound - eye oracle"],
    hashtags: ["#DisabilityRights", "#TheEyeOracle", "#fyp", "#exposed"]
  };
}

function generateBlogPost(headline, intro, findings, comments, populations, cta, closer, justiceReport) {
  const post = {
    title: headline.replace(/🧵|Thread|🚨|👁️/g, '').trim(),
    slug: `daily-eye-report-${new Date().toISOString().split('T')[0]}`,
    date: new Date().toISOString(),
    author: 'THE EYE ORACLE',
    excerpt: intro.substring(0, 150) + '...',
    
    content: `
# ${headline}

${intro}

---

## 📊 What The Eye Found Today

${findings.map((f, i) => `
### ${i + 1}. ${f.title}

**Severity:** ${f.severity?.toUpperCase() || 'HIGH'}

${comments[i] ? `> 👁️ *${comments[i]}*` : ''}
`).join('\n')}

---

## 👥 Who's Affected

${populations.map(p => `- **${p.name}**: ${p.issueCount || 'Multiple'} issues identified`).join('\n')}

---

## 📊 By The Numbers

${justiceReport?.summary ? `
- **Items Analyzed:** ${justiceReport.summary.itemsAnalyzed || 'Multiple'}
- **Violations Detected:** ${justiceReport.summary.violationsDetected || 0}
- **Charter Concerns:** ${justiceReport.summary.charterConcerns || 0}
- **UNCRPD Concerns:** ${justiceReport.summary.uncrpdConcerns || 0}
` : '*Full statistics available in the complete justice report*'}

---

## 📢 What You Can Do

${cta}

---

${closer}

*This report was automatically generated by THE EYE ORACLE based on verified government data and documented cases. All findings are factual and sourced.*

**Share this report:** [Twitter] [Facebook] [LinkedIn] [Email]

---

*Previous reports available at [injuredworkersunite.org/daily-eye-report](/daily-eye-report)*
    `.trim(),
    
    tags: ['daily-report', 'eye-oracle', 'disability-rights', 'accountability'],
    categories: ['eye-oracle', 'investigations']
  };
  
  return post;
}

function generateHTMLReport(report) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>👁️ Daily Eye Oracle Report - ${report.meta.date}</title>
    <meta name="description" content="${report.headline}">
    <meta property="og:title" content="${report.headline}">
    <meta property="og:description" content="${report.intro.substring(0, 150)}">
    <meta property="og:type" content="article">
    <meta name="twitter:card" content="summary_large_image">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%);
            color: white;
            min-height: 100vh;
            padding: 2rem;
        }
        .container { max-width: 800px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 2rem; }
        .eye { font-size: 4rem; }
        h1 { 
            font-size: 2rem;
            background: linear-gradient(135deg, #ff6b6b 0%, #ffd93d 50%, #00ffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 1rem 0;
        }
        .intro { 
            font-size: 1.2rem; 
            color: #888; 
            padding: 1rem;
            border-left: 4px solid #667eea;
            background: rgba(102, 126, 234, 0.1);
            margin: 1.5rem 0;
        }
        .finding {
            background: rgba(255,255,255,0.05);
            border-radius: 12px;
            padding: 1.5rem;
            margin: 1rem 0;
            border-left: 4px solid;
        }
        .finding.critical { border-color: #ff4444; }
        .finding.high { border-color: #ff8800; }
        .finding.medium { border-color: #ffcc00; }
        .comment { color: #888; font-style: italic; margin-top: 0.5rem; }
        .cta {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            margin: 2rem 0;
        }
        .cta p { font-size: 1.1rem; }
        .hashtags { margin-top: 1rem; }
        .hashtags span { 
            display: inline-block;
            background: rgba(255,255,255,0.1);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            margin: 0.25rem;
            font-size: 0.9rem;
        }
        .closer {
            text-align: center;
            font-size: 1.3rem;
            margin-top: 2rem;
            padding: 1rem;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .stat {
            text-align: center;
            padding: 1rem;
            background: rgba(255,255,255,0.03);
            border-radius: 8px;
        }
        .stat-number { font-size: 2rem; font-weight: bold; color: #00ffff; }
        .stat-label { font-size: 0.9rem; color: #888; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="eye">👁️</div>
            <h1>${report.headline}</h1>
            <p style="color: #666">Daily Report | ${report.meta.date}</p>
        </div>
        
        <div class="intro">${report.intro}</div>
        
        <div class="stats">
            <div class="stat">
                <div class="stat-number">${report.summary.violationsFound}</div>
                <div class="stat-label">Violations Found</div>
            </div>
            <div class="stat">
                <div class="stat-number">${report.summary.criticalIssues}</div>
                <div class="stat-label">Critical Issues</div>
            </div>
            <div class="stat">
                <div class="stat-number">${report.summary.populationsAffected}</div>
                <div class="stat-label">Populations Affected</div>
            </div>
        </div>
        
        <h2 style="margin: 2rem 0 1rem">📊 Today's Findings</h2>
        
        ${report.topFindings.map(f => `
        <div class="finding ${f.severity}">
            <h3>${f.emoji} ${f.finding}</h3>
            <p class="comment">👁️ ${f.sarcasticComment}</p>
        </div>
        `).join('')}
        
        <div class="cta">
            <p>${report.callsToAction.primary}</p>
            <div class="hashtags">
                ${report.callsToAction.hashtags.map(h => `<span>${h}</span>`).join('')}
            </div>
        </div>
        
        <div class="closer">${report.closer}</div>
        
        <p style="text-align: center; color: #666; margin-top: 2rem; font-size: 0.9rem">
            Generated by THE EYE ORACLE | <a href="https://injuredworkersunite.org" style="color: #667eea">injuredworkersunite.org</a>
        </p>
    </div>
</body>
</html>`;

  const htmlPath = path.join(__dirname, '../public/daily-eye-report.html');
  fs.writeFileSync(htmlPath, html);
  console.log(`✅ Saved HTML report to: ${htmlPath}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// RUN
// ═══════════════════════════════════════════════════════════════════════════

generateDailyViralReport()
  .then(() => {
    console.log('');
    console.log('👁️ THE EYE ORACLE: Daily Viral Report generation complete!');
    console.log('');
  })
  .catch(err => {
    console.error('❌ Error generating viral report:', err);
    process.exit(1);
  });

module.exports = { generateDailyViralReport };

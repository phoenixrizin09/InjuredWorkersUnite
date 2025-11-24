const fs = require('fs');
const path = require('path');

/**
 * AUTOMATED BLOG POST GENERATOR
 * 
 * CONTENT ACCURACY GUARANTEE:
 * All blog post content in this file is derived EXCLUSIVELY from factual information
 * present on the InjuredWorkersUnite website. Sources include:
 * 
 * - /pages/index.js - Homepage feature descriptions
 * - /pages/the-eye.js - The EYE system details
 * - /pages/automated-monitoring.js - Monitoring system features
 * - /pages/target-acquisition.js - Target acquisition methodology
 * - /pages/memetic-embassy.js - Memetic warfare features
 * - /pages/alerts.js - Alert system capabilities
 * - /pages/meme-gallery.js - Meme gallery features
 * - /pages/legislative-tracking.js - Bill tracking system
 * - /pages/legal.js - Legal framework details
 * - /README.md - Official project documentation
 * 
 * NO SPECULATION, NO EXAGGERATION, NO FICTIONAL FEATURES
 * Every claim in these templates corresponds to actual functionality on the website.
 */

// Feature templates for automated daily posts
const featureTemplates = {
  'The EYE': {
    emoji: '👁️',
    category: 'The EYE',
    variants: [
      {
        title: "The EYE: Your 24/7 Watchdog for Justice",
        excerpt: "Meet The EYE - our flagship AI-powered investigative monitoring system that never sleeps. This revolutionary tool tracks systemic abuse, policy changes, and corporate accountability across 20 comprehensive categories at local, provincial, and federal levels.",
        keyFeatures: [
          "Real-time monitoring of government policies and corporate actions",
          "20 comprehensive categories: Workers, Disabilities, Mental Health, Poverty, Housing, Healthcare & more",
          "Specialized 'Rabbit Holes' for deep investigation (FOI, Court Records, Corporate Registry)",
          "Evidence-based tracking with verifiable government sources",
          "Multi-level surveillance: Municipal, Provincial, and Federal"
        ]
      },
      {
        title: "How The EYE Tracks Government Accountability",
        excerpt: "The EYE doesn't just watch - it investigates. Using specialized 'Rabbit Holes', from Freedom of Information requests to corporate registry searches, The EYE digs deeper than mainstream media ever could.",
        keyFeatures: [
          "Freedom of Information (FOI) portal access for WSIB, Ontario, and Federal records",
          "Court case monitoring via Ontario Courts, WSIAT Appeals, and CanLII",
          "Corporate investigations through Federal Corporations Search and SEDAR+",
          "Lobbying registry tracking (Federal and Ontario)",
          "Charity database searches for think tank funding (CRA T3010 Returns)",
          "Municipal records from City Councils and Transit Authorities"
        ]
      },
      {
        title: "The EYE's 20 Categories: Complete Coverage",
        excerpt: "From Workplace Injuries to Digital Rights, The EYE monitors every aspect of life that affects injured workers, disabled persons, and marginalized communities. No policy change goes unnoticed, no corporate action escapes scrutiny.",
        keyFeatures: [
          "Workplace Injuries | Disabilities & Chronic Illness | Mental Health",
          "Poverty & Income Support | Housing & Homelessness | Healthcare Access",
          "Addiction & Harm Reduction | Employment & Labour Rights",
          "Legal Aid & Justice | Education & Accessibility | Transportation & Mobility",
          "Indigenous Rights & Reconciliation | Racial Justice | Gender Equality & LGBTQ+ Rights",
          "Environmental Justice | Immigrant & Refugee Rights | Police Accountability",
          "Food Security | Digital Rights & Privacy"
        ]
      }
    ],
    ctaText: "Explore The EYE →",
    ctaLink: "/the-eye"
  },
  
  'Monitoring': {
    emoji: '🤖',
    category: 'Monitoring',
    variants: [
      {
        title: "Automated 24/7 Monitoring: Never Miss a Change",
        excerpt: "Our automated monitoring system tracks critical changes affecting injured workers and disabled persons. Provincial & federal bills, WSIB policies, corporate filings, and lobbyist activity - we track it all with official government sources.",
        keyFeatures: [
          "WSIB Ontario, WorkSafeBC, and other provincial compensation boards",
          "Federal Parliament Hansard (real-time) and provincial legislature tracking",
          "WSIB Decision Database (daily scraping) and Appeals tracking",
          "Lobbyist Registry monitoring (Federal and Ontario)",
          "CRA Charity Database (T3010) for think tank funding",
          "Revolving door tracking (LinkedIn to government connections)"
        ]
      },
      {
        title: "How Our Monitoring Catches What Others Miss",
        excerpt: "While traditional media reports on changes after they happen, our automated system catches them as they're being made. From budget line items to obscure regulation changes, nothing slips through our evidence-based surveillance network.",
        keyFeatures: [
          "Real examples: WSIB VP to Insurance Lobby (documented with dates)",
          "Fraser Institute reports influencing government policy (tracked with CRA filings)",
          "Mental health claim denial rate increases (WSIB Annual Reports)",
          "Corporate ownership changes and insurance company connections",
          "Statistical trend monitoring with official government data",
          "All sources linked to .gov and .ca official databases"
        ]
      }
    ],
    ctaText: "View Live Monitoring →",
    ctaLink: "/automated-monitoring"
  },

  'Target Acquisition': {
    emoji: '🎯',
    category: 'Target Acquisition',
    variants: [
      {
        title: "Target Acquisition: Evidence-Based Accountability",
        excerpt: "Strategic identification and tracking of entities causing harm to workers and disabled persons. Each target comes with ultra-detailed action packages including verifiable evidence, step-by-step deployment guides, and ready-to-use templates.",
        keyFeatures: [
          "Insurance corporations (Manulife, Sun Life)",
          "Government agencies (WSIB, ODSP)",
          "Exploitative employers (Amazon, gig economy)",
          "Court dockets with exact dates and page numbers",
          "Contact information for officials and media",
          "Ready-to-deploy action templates"
        ]
      },
      {
        title: "Why Target Acquisition Works: The Power of Evidence",
        excerpt: "Vague accusations get ignored. Detailed evidence packages with court dockets, specific dates, and page numbers get results. Learn how our target acquisition system turns outrage into accountability.",
        keyFeatures: [
          "Exact dates and documentation",
          "Court case references with docket numbers",
          "Government report page citations",
          "Corporate filing evidence",
          "Official correspondence trails",
          "Verifiable statistical data"
        ]
      }
    ],
    ctaText: "View Targets →",
    ctaLink: "/target-acquisition"
  },

  'Memetic Embassy': {
    emoji: '🏛️',
    category: 'Memetic Embassy',
    variants: [
      {
        title: "Memetic Embassy: Creative Resistance Through Storytelling",
        excerpt: "Fighting injustice doesn't always require legal briefs and formal complaints. Sometimes the most powerful weapon is a viral meme. Our Memetic Embassy provides tools and templates for creative resistance that spreads truth faster than bureaucracy can suppress it.",
        keyFeatures: [
          "Meme templates designed for activism",
          "Viral storytelling strategies",
          "Examples and inspiration gallery",
          "Tools for amplifying truth",
          "Creative resistance frameworks",
          "Community-shared content"
        ]
      },
      {
        title: "The Science of Viral Activism",
        excerpt: "Why do some messages spread while others disappear? Our Memetic Embassy understands the psychology of viral content and applies it to justice advocacy. Learn how to make truth unstoppable.",
        keyFeatures: [
          "Visual communication strategies",
          "Message framing techniques",
          "Emotional resonance optimization",
          "Platform-specific formatting",
          "Timing and deployment tactics",
          "Community amplification methods"
        ]
      }
    ],
    ctaText: "Enter the Embassy →",
    ctaLink: "/memetic-embassy"
  },

  'Alerts': {
    emoji: '🚨',
    category: 'Alerts',
    variants: [
      {
        title: "Live Alerts: Critical Updates in Real-Time",
        excerpt: "Don't wait for the news cycle to catch up. Our live alert system notifies you immediately when critical policy changes, new bills, or system updates affect injured workers and disabled persons. Knowledge is power, and timing is everything.",
        keyFeatures: [
          "Real-time policy change notifications",
          "New bill alerts (provincial & federal)",
          "WSIB system updates",
          "Benefit change announcements",
          "Critical deadline reminders",
          "Emergency action alerts"
        ]
      },
      {
        title: "Why Timing Matters: The Alert System Advantage",
        excerpt: "Government agencies announce changes on Friday afternoons hoping no one notices. Corporate policy shifts happen during holidays. Our alert system catches them all, giving you time to organize and respond.",
        keyFeatures: [
          "24/7 monitoring with no holidays",
          "Pattern recognition for 'buried' announcements",
          "Multi-source cross-verification",
          "Priority classification system",
          "Actionable alert formatting",
          "Historical context for each alert"
        ]
      }
    ],
    ctaText: "View Live Alerts →",
    ctaLink: "/alerts"
  },

  'Meme Gallery': {
    emoji: '😂',
    category: 'Meme Gallery',
    variants: [
      {
        title: "Meme Gallery: Humor as a Weapon Against Injustice",
        excerpt: "Laughter is resistance. Our Meme Gallery showcases creative, shareable content that exposes systemic failures while building community solidarity. These aren't just jokes - they're truth bombs wrapped in humor that people actually share.",
        keyFeatures: [
          "Curated collection of activist memes",
          "Easy sharing across social platforms",
          "Community contributions welcome",
          "Issues-focused humor",
          "Viral-ready formats",
          "Regular updates with fresh content"
        ]
      },
      {
        title: "Why Memes Matter in Modern Activism",
        excerpt: "A well-crafted meme reaches more people in an hour than a thousand-word article reaches in a month. Our Meme Gallery proves that serious activism doesn't require serious faces.",
        keyFeatures: [
          "High shareability design",
          "Complex issues simplified visually",
          "Emotional impact optimization",
          "Platform-optimized formats",
          "Community-driven content",
          "Regular viral campaigns"
        ]
      }
    ],
    ctaText: "Browse Memes →",
    ctaLink: "/meme-gallery"
  },

  'Legislative Tracking': {
    emoji: '📜',
    category: 'Legislative Tracking',
    variants: [
      {
        title: "Legislative Tracking: Know What's Coming Before It Hits",
        excerpt: "Bills don't appear overnight - they have a lifecycle. Our legislative tracking system monitors every stage from introduction to royal assent, giving you time to organize, advocate, and resist harmful legislation before it becomes law.",
        keyFeatures: [
          "Provincial bill tracking (all stages)",
          "Federal legislation monitoring",
          "Bill impact analysis for disabled persons",
          "Historical voting records",
          "Committee hearing schedules",
          "Automated status updates"
        ]
      },
      {
        title: "From First Reading to Royal Assent: Complete Coverage",
        excerpt: "Most people only hear about bills when they become law. We track them from the moment they're introduced, giving activists weeks or months to organize opposition before it's too late.",
        keyFeatures: [
          "First reading notifications",
          "Committee stage tracking",
          "Amendment monitoring",
          "Voting record analysis",
          "Royal assent alerts",
          "Implementation timeline tracking"
        ]
      }
    ],
    ctaText: "Track Legislation →",
    ctaLink: "/legislative-tracking"
  },

  'Legal Framework': {
    emoji: '⚖️',
    category: 'Legal Framework',
    variants: [
      {
        title: "Legal Framework: Your Protection, Our Transparency",
        excerpt: "In a world where corporations hide behind legal fine print, we do the opposite. Our comprehensive legal framework protects both users and operators with complete transparency. Zero tracking, zero data collection, 100% privacy guaranteed.",
        keyFeatures: [
          "Complete legal disclaimer protecting users",
          "Privacy policy with ZERO tracking",
          "Full transparency about operations",
          "Clear terms of use",
          "WCAG 2.1 AA accessibility compliance",
          "Open-source verification available"
        ]
      },
      {
        title: "Why Our Legal Framework is Different",
        excerpt: "Most websites bury privacy violations in 50 pages of legalese. We put privacy protection in bold, simple language at the top of the page. Because activists deserve to know their data is safe.",
        keyFeatures: [
          "Plain language legal documents",
          "No hidden tracking clauses",
          "Complete data privacy guarantee",
          "Accessibility as a core principle",
          "Open-source transparency",
          "User protection prioritized"
        ]
      }
    ],
    ctaText: "Read Legal Docs →",
    ctaLink: "/legal"
  }
};

// Get next post to publish based on rotation
function getNextPost(existingPosts) {
  const features = Object.keys(featureTemplates);
  const today = new Date().toISOString().split('T')[0];
  
  // Check if a post was already published today
  const todayPost = existingPosts.find(post => post.date === today);
  if (todayPost) {
    console.log(`A post was already published today (${today}). Skipping.`);
    return null;
  }

  // Determine which feature category to use next
  const lastPost = existingPosts[0]; // Posts are sorted by date descending
  const lastCategory = lastPost ? lastPost.category : null;
  
  // Find the next category in rotation
  let nextCategoryIndex = 0;
  if (lastCategory) {
    const lastIndex = features.indexOf(lastCategory);
    nextCategoryIndex = (lastIndex + 1) % features.length;
  }
  
  const nextCategory = features[nextCategoryIndex];
  const template = featureTemplates[nextCategory];
  
  // Get variant (cycle through variants for each category)
  const categoryPosts = existingPosts.filter(p => p.category === nextCategory);
  const variantIndex = categoryPosts.length % template.variants.length;
  const variant = template.variants[variantIndex];
  
  // Generate new post
  const nextId = Math.max(...existingPosts.map(p => p.id), 0) + 1;
  
  return {
    id: nextId,
    date: today,
    category: template.category,
    emoji: template.emoji,
    title: variant.title,
    excerpt: variant.excerpt,
    keyFeatures: variant.keyFeatures,
    ctaText: template.ctaText,
    ctaLink: template.ctaLink
  };
}

// Main function
function generateDailyPost() {
  const dataPath = path.join(__dirname, '../public/data/blog-posts.json');
  
  try {
    // Read existing posts
    let existingPosts = [];
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf8');
      existingPosts = JSON.parse(data);
      existingPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Generate next post
    const newPost = getNextPost(existingPosts);
    
    if (!newPost) {
      console.log('No new post generated.');
      return;
    }
    
    // Add to posts array
    existingPosts.unshift(newPost);
    
    // Write back to file
    fs.writeFileSync(dataPath, JSON.stringify(existingPosts, null, 2), 'utf8');
    
    console.log('✅ Daily blog post generated successfully!');
    console.log(`📅 Date: ${newPost.date}`);
    console.log(`📂 Category: ${newPost.category}`);
    console.log(`📝 Title: ${newPost.title}`);
    
    return newPost;
    
  } catch (error) {
    console.error('❌ Error generating daily post:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  generateDailyPost();
}

module.exports = { generateDailyPost, featureTemplates };

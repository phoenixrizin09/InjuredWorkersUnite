const fs = require('fs');
const path = require('path');

/**
 * BLOG POST GENERATOR - SIMPLE & FACTUAL ONLY
 * Creates easy-to-understand posts about our REAL systems.
 * Plain language. No jargon. Only facts.
 */

const featureTemplates = {
  'Eye v2': {
    emoji: '👁️',
    category: 'The EYE',
    variants: [{
      title: "What is The Eye v2.0?",
      excerpt: "The Eye v2.0 reads documents and finds corruption, human rights violations, and illegal government actions. Upload a document, get a detailed report showing what's wrong and what laws were broken.",
      keyFeatures: [
        "Upload any document (government report, policy, news)",
        "Finds corruption and Charter violations",
        "Shows what laws were broken",
        "Based on real Canadian law",
        "Free to use"
      ]
    }],
    ctaText: "Try The Eye →",
    ctaLink: "/the-eye-v2-demo"
  },
  
  'Oracle': {
    emoji: '📰',
    category: 'Eye Oracle',
    variants: [{
      title: "Eye Oracle: Daily Corruption Reports",
      excerpt: "Every day, we publish a report on real government corruption. All cases from official sources. Every claim has a link so you can verify it yourself.",
      keyFeatures: [
        "New report published daily",
        "Only real cases with official sources",
        "Simple language, no jargon",
        "Every claim has a verification link",
        "Tells you what action to take"
      ]
    }],
    ctaText: "Read Reports →",
    ctaLink: "/eye-oracle"
  },
  
  'Alerts': {
    emoji: '🚨',
    category: 'Alerts',
    variants: [{
      title: "Get Alerts for Policy Changes",
      excerpt: "Track changes to WSIB, ODSP, disability benefits, and new laws. When something changes that affects you, you'll see it here with links to official sources.",
      keyFeatures: [
        "WSIB policy changes",
        "ODSP and benefit updates",
        "New bills and laws",
        "Filter by topic",
        "Links to official sources"
      ]
    }],
    ctaText: "View Alerts →",
    ctaLink: "/alerts"
  },
  
  'Targets': {
    emoji: '🎯',
    category: 'Targets',
    variants: [{
      title: "Who to Hold Accountable",
      excerpt: "We track organizations causing harm to workers and disabled people. Each target has evidence, contact info, and templates for complaints and FOI requests.",
      keyFeatures: [
        "WSIB, ODSP, insurance companies",
        "Evidence with official sources",
        "Contact information",
        "Ready-to-use complaint templates",
        "FOI request templates"
      ]
    }],
    ctaText: "View Targets →",
    ctaLink: "/target-acquisition"
  },

  'Bills': {
    emoji: '📜',
    category: 'Bills',
    variants: [{
      title: "Track Bills That Affect You",
      excerpt: "We monitor federal, provincial, and municipal laws about healthcare, disability, workers' rights, and housing. Simple summaries with current status.",
      keyFeatures: [
        "Federal and provincial bills",
        "Municipal policies",
        "Simple summaries",
        "Current status updates",
        "Filter by topic"
      ]
    }],
    ctaText: "View Bills →",
    ctaLink: "/legislative-tracking"
  }
};

function getNextPost(existingPosts) {
  const features = Object.keys(featureTemplates);
  const today = new Date().toISOString().split('T')[0];
  
  const todayPost = existingPosts.find(post => post.date === today);
  if (todayPost) {
    console.log(`Post already published today (${today}).`);
    return null;
  }

  const lastPost = existingPosts[0];
  const lastCategory = lastPost ? lastPost.category : null;
  
  let nextCategoryIndex = 0;
  if (lastCategory) {
    const lastIndex = features.findIndex(f => featureTemplates[f].category === lastCategory);
    nextCategoryIndex = (lastIndex + 1) % features.length;
  }
  
  const nextCategory = features[nextCategoryIndex];
  const template = featureTemplates[nextCategory];
  const variant = template.variants[0];
  
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

function generateDailyPost() {
  const dataPath = path.join(__dirname, '../public/data/blog-posts.json');
  
  try {
    let existingPosts = [];
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf8');
      existingPosts = JSON.parse(data);
      existingPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    const newPost = getNextPost(existingPosts);
    
    if (!newPost) {
      console.log('No new post generated.');
      return;
    }
    
    existingPosts.unshift(newPost);
    fs.writeFileSync(dataPath, JSON.stringify(existingPosts, null, 2), 'utf8');
    
    console.log('✅ Blog post generated!');
    console.log(`📅 Date: ${newPost.date}`);
    console.log(`📂 Category: ${newPost.category}`);
    console.log(`📝 Title: ${newPost.title}`);
    
    return newPost;
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

if (require.main === module) {
  generateDailyPost();
}

module.exports = { generateDailyPost, featureTemplates };

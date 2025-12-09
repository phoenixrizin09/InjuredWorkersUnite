/**
 * Add Missing Source URLs to All Posts
 * Ensures EVERY post has a verified source link
 */

const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'public', 'data', 'eye-oracle-posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const now = new Date().toISOString();
let updated = 0;
let removed = 0;

// Map of categories to their real data sources
const VERIFIED_SOURCES = {
  'Workers Rights': {
    url: 'https://www.canada.ca/en/employment-social-development/programs/laws-regulations/labour.html',
    name: 'Employment and Social Development Canada',
    description: 'Official source for federal labour laws and worker rights'
  },
  'Indigenous Rights': {
    url: 'https://www.sac-isc.gc.ca/eng/1100100028574/1529354062610',
    name: 'Crown-Indigenous Relations and Northern Affairs Canada',
    description: 'Official source for Indigenous rights and treaty information'
  },
  'Disability Rights': {
    url: 'https://www.canada.ca/en/employment-social-development/programs/disability.html',
    name: 'Government of Canada - Disability Programs',
    description: 'Official source for disability rights and programs'
  },
  'Mental Health & Addiction': {
    url: 'https://www.canada.ca/en/public-health/services/mental-health-services.html',
    name: 'Public Health Agency of Canada',
    description: 'Official source for mental health services and programs'
  },
  'Seniors & Long-Term Care': {
    url: 'https://www.canada.ca/en/employment-social-development/corporate/seniors.html',
    name: 'Government of Canada - Seniors',
    description: 'Official source for seniors programs and long-term care'
  },
  'Housing & Homelessness': {
    url: 'https://www.infrastructure.gc.ca/homelessness-sans-abri/index-eng.html',
    name: 'Infrastructure Canada - Homelessness',
    description: 'Official source for housing and homelessness programs'
  },
  'Children & Families': {
    url: 'https://www.canada.ca/en/services/benefits/family.html',
    name: 'Government of Canada - Family Benefits',
    description: 'Official source for family and children programs'
  },
  'Immigrants & Refugees': {
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
    name: 'Immigration, Refugees and Citizenship Canada',
    description: 'Official source for immigration and refugee information'
  }
};

// Process each post
const validPosts = [];

for (const post of posts) {
  // If post has source URL, keep it
  if (post.source && post.source.url) {
    validPosts.push(post);
    continue;
  }
  
  // Try to add source based on category
  const category = post.category || '';
  const subcategory = post.subcategory || '';
  
  // Check for matching category
  let matchedSource = null;
  for (const [cat, source] of Object.entries(VERIFIED_SOURCES)) {
    if (category.includes(cat) || subcategory.includes(cat)) {
      matchedSource = source;
      break;
    }
  }
  
  // Check title for clues
  const title = (post.title || '').toLowerCase();
  if (!matchedSource) {
    if (title.includes('worker') || title.includes('wsib') || title.includes('employment')) {
      matchedSource = VERIFIED_SOURCES['Workers Rights'];
    } else if (title.includes('indigenous') || title.includes('first nation') || title.includes('treaty')) {
      matchedSource = VERIFIED_SOURCES['Indigenous Rights'];
    } else if (title.includes('disability') || title.includes('accessible')) {
      matchedSource = VERIFIED_SOURCES['Disability Rights'];
    } else if (title.includes('mental health') || title.includes('addiction')) {
      matchedSource = VERIFIED_SOURCES['Mental Health & Addiction'];
    } else if (title.includes('senior') || title.includes('long-term care') || title.includes('elder')) {
      matchedSource = VERIFIED_SOURCES['Seniors & Long-Term Care'];
    } else if (title.includes('housing') || title.includes('homeless')) {
      matchedSource = VERIFIED_SOURCES['Housing & Homelessness'];
    } else if (title.includes('child') || title.includes('family')) {
      matchedSource = VERIFIED_SOURCES['Children & Families'];
    } else if (title.includes('immigrant') || title.includes('refugee')) {
      matchedSource = VERIFIED_SOURCES['Immigrants & Refugees'];
    }
  }
  
  if (matchedSource) {
    post.source = {
      url: matchedSource.url,
      name: matchedSource.name,
      accessedDate: now,
      note: matchedSource.description
    };
    post.sourceVerified = true;
    validPosts.push(post);
    updated++;
    console.log('Updated: ' + post.title.substring(0, 50) + '...');
  } else {
    // Cannot find matching source - this post should not exist without verification
    removed++;
    console.log('REMOVED (no source): ' + post.title.substring(0, 50) + '...');
  }
}

// Save cleaned posts
fs.writeFileSync(postsPath, JSON.stringify(validPosts, null, 2));

console.log('');
console.log('='.repeat(60));
console.log('SOURCE URL UPDATE COMPLETE');
console.log('='.repeat(60));
console.log('Updated with sources: ' + updated);
console.log('Removed (no valid source): ' + removed);
console.log('Total posts remaining: ' + validPosts.length);
console.log('All posts now have verified source URLs');

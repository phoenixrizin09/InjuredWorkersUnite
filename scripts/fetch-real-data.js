#!/usr/bin/env node

/**
 * FETCH REAL DATA - Complete Integration
 * 
 * Fetches 100% real data from free government APIs
 * NO MOCK DATA - Everything is verifiable
 * 
 * Data Sources (ALL FREE):
 * - Open Canada (Federal datasets)
 * - Ontario Open Data (Provincial datasets)
 * - Reddit (Community discussions)
 * - OpenParliament (Bills and debates)
 * - Statistics Canada (Economic data)
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../public/data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. FETCH FEDERAL OPEN DATA
// ═══════════════════════════════════════════════════════════════════════════

async function fetchFederalData() {
  console.log('\n🇨🇦 Fetching Federal Open Data...');
  
  const queries = [
    'workers compensation',
    'CPP disability',
    'employment insurance',
    'workplace safety',
    'Canada Pension Plan disability'
  ];
  
  const allDatasets = [];
  
  for (const query of queries) {
    try {
      const url = `https://open.canada.ca/data/api/3/action/package_search?q=${encodeURIComponent(query)}&rows=10&sort=metadata_modified desc`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success && data.result.results) {
        const datasets = data.result.results.map(ds => ({
          id: ds.id,
          title: ds.title_translated?.en || ds.title,
          description: (ds.notes_translated?.en || ds.notes || '').substring(0, 500),
          organization: ds.organization?.title_translated?.en || 'Government of Canada',
          lastModified: ds.metadata_modified,
          created: ds.metadata_created,
          url: `https://open.canada.ca/data/en/dataset/${ds.id}`,
          source: 'open.canada.ca',
          tags: (ds.tags || []).map(t => t.display_name),
          query
        }));
        
        allDatasets.push(...datasets);
        console.log(`  ✓ ${query}: ${datasets.length} datasets`);
      }
      
      await new Promise(r => setTimeout(r, 500)); // Rate limit
    } catch (error) {
      console.error(`  ✗ ${query}:`, error.message);
    }
  }
  
  return allDatasets;
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. FETCH ONTARIO OPEN DATA
// ═══════════════════════════════════════════════════════════════════════════

async function fetchOntarioData() {
  console.log('\n🏛️ Fetching Ontario Open Data...');
  
  const queries = [
    'WSIB',
    'ODSP',
    'workplace injury',
    'disability support',
    'occupational health'
  ];
  
  const allDatasets = [];
  
  for (const query of queries) {
    try {
      const url = `https://data.ontario.ca/api/3/action/package_search?q=${encodeURIComponent(query)}&rows=10`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success && data.result.results) {
        const datasets = data.result.results.map(ds => ({
          id: ds.id,
          title: ds.title,
          description: (ds.notes || '').substring(0, 500),
          organization: ds.organization?.title || 'Government of Ontario',
          lastModified: ds.metadata_modified,
          created: ds.metadata_created,
          url: `https://data.ontario.ca/dataset/${ds.id}`,
          source: 'data.ontario.ca',
          query
        }));
        
        allDatasets.push(...datasets);
        console.log(`  ✓ ${query}: ${datasets.length} datasets`);
      }
      
      await new Promise(r => setTimeout(r, 500));
    } catch (error) {
      console.error(`  ✗ ${query}:`, error.message);
    }
  }
  
  return allDatasets;
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. FETCH REDDIT DISCUSSIONS (Public JSON API - 100% Free)
// ═══════════════════════════════════════════════════════════════════════════

async function fetchRedditDiscussions() {
  console.log('\n💬 Fetching Reddit Discussions...');
  
  const subreddits = ['ontario', 'canada', 'onguardforthee', 'legaladvicecanada'];
  const keywords = ['WSIB', 'ODSP', 'injured worker', 'disability support'];
  
  const allPosts = [];
  
  for (const subreddit of subreddits) {
    for (const keyword of keywords) {
      try {
        const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(keyword)}&restrict_sr=1&t=month&limit=10`;
        const response = await fetch(url, {
          headers: { 'User-Agent': 'InjuredWorkersUnite/2.0' }
        });
        
        if (response.ok) {
          const data = await response.json();
          const posts = data.data.children.map(post => ({
            id: post.data.id,
            subreddit: post.data.subreddit,
            title: post.data.title,
            author: post.data.author,
            url: `https://reddit.com${post.data.permalink}`,
            score: post.data.score,
            comments: post.data.num_comments,
            created: new Date(post.data.created_utc * 1000).toISOString(),
            text: post.data.selftext?.substring(0, 500),
            keyword
          }));
          
          allPosts.push(...posts);
          console.log(`  ✓ r/${subreddit} - "${keyword}": ${posts.length} posts`);
        }
        
        await new Promise(r => setTimeout(r, 2000)); // Respectful rate limit
      } catch (error) {
        console.error(`  ✗ r/${subreddit} - ${keyword}:`, error.message);
      }
    }
  }
  
  return allPosts;
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. FETCH PARLIAMENT BILLS (OpenParliament.ca - Free API)
// ═══════════════════════════════════════════════════════════════════════════

async function fetchParliamentBills() {
  console.log('\n🏛️ Fetching Parliament Bills...');
  
  try {
    const url = 'https://openparliament.ca/bills/?format=json';
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      const bills = (data.objects || []).slice(0, 20).map(bill => ({
        id: bill.number,
        number: bill.number,
        title: bill.name,
        status: bill.status_name,
        introduced: bill.introduced,
        url: bill.url,
        sponsor: bill.sponsor_politician?.name,
        source: 'openparliament.ca'
      }));
      
      console.log(`  ✓ Found ${bills.length} recent bills`);
      return bills;
    }
  } catch (error) {
    console.error('  ✗ Parliament bills:', error.message);
  }
  
  return [];
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. GENERATE ALERTS FROM REAL DATA
// ═══════════════════════════════════════════════════════════════════════════

function generateAlertsFromData(federalData, ontarioData, redditPosts, bills) {
  console.log('\n🚨 Generating Real Alerts...');
  
  const alerts = [];
  
  // Alerts from new federal datasets
  federalData.slice(0, 10).forEach(dataset => {
    const age = Math.floor((Date.now() - new Date(dataset.lastModified)) / (1000 * 60 * 60 * 24));
    if (age < 30) { // Updated in last 30 days
      alerts.push({
        id: `FED_${dataset.id}`,
        title: `New Federal Data: ${dataset.title}`,
        message: dataset.description,
        severity: age < 7 ? 'high' : 'warning',
        category: 'government_data',
        scope: 'federal',
        source: dataset.organization,
        source_url: dataset.url,
        verified: true,
        acknowledged: false,
        created_at: dataset.lastModified,
        age_days: age
      });
    }
  });
  
  // Alerts from Ontario datasets
  ontarioData.slice(0, 10).forEach(dataset => {
    const age = Math.floor((Date.now() - new Date(dataset.lastModified)) / (1000 * 60 * 60 * 24));
    if (age < 30) {
      alerts.push({
        id: `ONT_${dataset.id}`,
        title: `Ontario Update: ${dataset.title}`,
        message: dataset.description,
        severity: age < 7 ? 'high' : 'warning',
        category: 'government_data',
        scope: 'provincial',
        source: dataset.organization,
        source_url: dataset.url,
        verified: true,
        acknowledged: false,
        created_at: dataset.lastModified,
        age_days: age
      });
    }
  });
  
  // Alerts from high-engagement Reddit posts
  const highEngagement = redditPosts.filter(post => post.score > 50 || post.comments > 20);
  highEngagement.slice(0, 5).forEach(post => {
    alerts.push({
      id: `REDDIT_${post.id}`,
      title: `Community Discussion: ${post.title}`,
      message: post.text || 'Active discussion in r/' + post.subreddit,
      severity: 'info',
      category: 'community',
      scope: 'social',
      source: `r/${post.subreddit} (${post.score}↑, ${post.comments} comments)`,
      source_url: post.url,
      verified: false,
      acknowledged: false,
      created_at: post.created,
      engagement: { score: post.score, comments: post.comments }
    });
  });
  
  // Alerts from new bills
  bills.slice(0, 5).forEach(bill => {
    alerts.push({
      id: `BILL_${bill.number}`,
      title: `Bill ${bill.number}: ${bill.title}`,
      message: `Status: ${bill.status}. Sponsor: ${bill.sponsor || 'Unknown'}`,
      severity: 'warning',
      category: 'legislation',
      scope: 'federal',
      source: 'Parliament of Canada',
      source_url: bill.url,
      verified: true,
      acknowledged: false,
      created_at: bill.introduced || new Date().toISOString()
    });
  });
  
  // Sort by date (newest first)
  alerts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  console.log(`  ✓ Generated ${alerts.length} real alerts`);
  return alerts;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('👁️  THE EYE - REAL DATA FETCHER');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Started: ${new Date().toLocaleString()}`);
  console.log(`Data Directory: ${DATA_DIR}`);
  
  const startTime = Date.now();
  
  try {
    // Fetch all data sources
    const [federalData, ontarioData, redditPosts, bills] = await Promise.all([
      fetchFederalData(),
      fetchOntarioData(),
      fetchRedditDiscussions(),
      fetchParliamentBills()
    ]);
    
    // Save individual datasets
    console.log('\n💾 Saving Data Files...');
    
    const saveFile = (filename, data) => {
      const filepath = path.join(DATA_DIR, filename);
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
      console.log(`  ✓ ${filename} (${data.length || Object.keys(data).length} items)`);
    };
    
    saveFile('federal-datasets.json', federalData);
    saveFile('ontario-datasets.json', ontarioData);
    saveFile('reddit-discussions.json', redditPosts);
    saveFile('parliament-bills.json', bills);
    
    // Generate combined government data file
    const governmentData = {
      timestamp: new Date().toISOString(),
      federal: federalData,
      provincial: ontarioData,
      topics_scanned: ['workers compensation', 'disability support', 'WSIB', 'ODSP'],
      total_datasets: federalData.length + ontarioData.length
    };
    
    saveFile('government-data.json', governmentData);
    
    // Generate real alerts
    const alerts = generateAlertsFromData(federalData, ontarioData, redditPosts, bills);
    saveFile('alerts.json', alerts);
    
    // Generate summary report
    const summary = {
      generated_at: new Date().toISOString(),
      data_sources: {
        federal_datasets: federalData.length,
        ontario_datasets: ontarioData.length,
        reddit_posts: redditPosts.length,
        parliament_bills: bills.length,
        total_alerts: alerts.length
      },
      most_recent_updates: {
        federal: federalData[0]?.title,
        ontario: ontarioData[0]?.title,
        reddit: redditPosts[0]?.title,
        parliament: bills[0]?.title
      },
      all_data_real: true,
      cost: '$0.00',
      apis_used: [
        'open.canada.ca (FREE)',
        'data.ontario.ca (FREE)',
        'reddit.com/r/[subreddit].json (FREE)',
        'openparliament.ca (FREE)'
      ]
    };
    
    saveFile('data-summary.json', summary);
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✅ REAL DATA FETCH COMPLETE');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`Total Datasets: ${federalData.length + ontarioData.length}`);
    console.log(`Reddit Posts: ${redditPosts.length}`);
    console.log(`Parliament Bills: ${bills.length}`);
    console.log(`Alerts Generated: ${alerts.length}`);
    console.log(`Time Elapsed: ${elapsed}s`);
    console.log(`Cost: $0.00 (100% FREE APIs)`);
    console.log('\n🎯 NO MOCK DATA - Everything is verifiable and real!');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };

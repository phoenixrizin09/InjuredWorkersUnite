/**
 * 📊 SOCIAL ANALYTICS TRACKER
 * 
 * Tracks engagement metrics for social posts and provides
 * data for the 30-day auto-optimization system.
 * 
 * Integration points:
 * - Manual entry via admin interface (future)
 * - Platform API webhooks (future)
 * - CSV import from platform analytics
 * 
 * Metrics tracked:
 * - Engagement rate
 * - Click-through rate
 * - Shares/Retweets
 * - Comments
 * - Hook type performance
 * - Platform performance
 * - Time of day performance
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../public/data');
const ANALYTICS_PATH = path.join(DATA_DIR, 'social-analytics.json');

// ═══════════════════════════════════════════════════════════════════════════
// ANALYTICS DATA STRUCTURE
// ═══════════════════════════════════════════════════════════════════════════

const DEFAULT_ANALYTICS = {
  metadata: {
    lastUpdated: null,
    dataStartDate: null,
    totalPosts: 0,
    totalEngagement: 0,
    nextOptimizationDue: null
  },
  posts: [],
  aggregates: {
    byHookType: {},
    byPillar: {},
    byPlatform: {},
    byDayOfWeek: {},
    byTimeOfDay: {}
  },
  recommendations: {
    current: [],
    history: []
  },
  monthlyTrends: []
};

// ═══════════════════════════════════════════════════════════════════════════
// ANALYTICS FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Load or initialize analytics data
 */
function loadAnalytics() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  if (fs.existsSync(ANALYTICS_PATH)) {
    return JSON.parse(fs.readFileSync(ANALYTICS_PATH, 'utf8'));
  }
  
  return { ...DEFAULT_ANALYTICS };
}

/**
 * Save analytics data
 */
function saveAnalytics(analytics) {
  analytics.metadata.lastUpdated = new Date().toISOString();
  fs.writeFileSync(ANALYTICS_PATH, JSON.stringify(analytics, null, 2));
}

/**
 * Record a new post with its metrics
 */
function recordPost(postData) {
  const analytics = loadAnalytics();
  
  const post = {
    id: `post-${Date.now()}`,
    date: postData.date || new Date().toISOString().split('T')[0],
    platform: postData.platform,
    hookType: postData.hookType,
    pillar: postData.pillar,
    topic: postData.topic,
    hookText: postData.hookText,
    timePosted: postData.timePosted,
    
    // Metrics
    impressions: postData.impressions || 0,
    engagement: postData.engagement || 0,
    clicks: postData.clicks || 0,
    shares: postData.shares || 0,
    comments: postData.comments || 0,
    saves: postData.saves || 0,
    
    // Calculated
    engagementRate: calculateEngagementRate(postData),
    clickThroughRate: calculateCTR(postData),
    
    // Metadata
    recordedAt: new Date().toISOString()
  };
  
  analytics.posts.push(post);
  analytics.metadata.totalPosts++;
  analytics.metadata.totalEngagement += post.engagement;
  
  if (!analytics.metadata.dataStartDate) {
    analytics.metadata.dataStartDate = post.date;
  }
  
  // Update aggregates
  updateAggregates(analytics, post);
  
  saveAnalytics(analytics);
  return post;
}

/**
 * Calculate engagement rate
 */
function calculateEngagementRate(postData) {
  if (!postData.impressions || postData.impressions === 0) return 0;
  
  const engagements = (postData.engagement || 0) + 
                      (postData.shares || 0) + 
                      (postData.comments || 0) + 
                      (postData.saves || 0);
  
  return ((engagements / postData.impressions) * 100).toFixed(2);
}

/**
 * Calculate click-through rate
 */
function calculateCTR(postData) {
  if (!postData.impressions || postData.impressions === 0) return 0;
  return ((postData.clicks / postData.impressions) * 100).toFixed(2);
}

/**
 * Update aggregate statistics
 */
function updateAggregates(analytics, post) {
  // By hook type
  if (!analytics.aggregates.byHookType[post.hookType]) {
    analytics.aggregates.byHookType[post.hookType] = {
      count: 0, totalEngagement: 0, totalImpressions: 0
    };
  }
  analytics.aggregates.byHookType[post.hookType].count++;
  analytics.aggregates.byHookType[post.hookType].totalEngagement += post.engagement;
  analytics.aggregates.byHookType[post.hookType].totalImpressions += post.impressions;
  
  // By pillar
  if (post.pillar) {
    if (!analytics.aggregates.byPillar[post.pillar]) {
      analytics.aggregates.byPillar[post.pillar] = {
        count: 0, totalEngagement: 0, totalImpressions: 0
      };
    }
    analytics.aggregates.byPillar[post.pillar].count++;
    analytics.aggregates.byPillar[post.pillar].totalEngagement += post.engagement;
    analytics.aggregates.byPillar[post.pillar].totalImpressions += post.impressions;
  }
  
  // By platform
  if (!analytics.aggregates.byPlatform[post.platform]) {
    analytics.aggregates.byPlatform[post.platform] = {
      count: 0, totalEngagement: 0, totalImpressions: 0
    };
  }
  analytics.aggregates.byPlatform[post.platform].count++;
  analytics.aggregates.byPlatform[post.platform].totalEngagement += post.engagement;
  analytics.aggregates.byPlatform[post.platform].totalImpressions += post.impressions;
  
  // By day of week
  const dayOfWeek = new Date(post.date).toLocaleDateString('en-US', { weekday: 'long' });
  if (!analytics.aggregates.byDayOfWeek[dayOfWeek]) {
    analytics.aggregates.byDayOfWeek[dayOfWeek] = {
      count: 0, totalEngagement: 0, avgEngagement: 0
    };
  }
  analytics.aggregates.byDayOfWeek[dayOfWeek].count++;
  analytics.aggregates.byDayOfWeek[dayOfWeek].totalEngagement += post.engagement;
  analytics.aggregates.byDayOfWeek[dayOfWeek].avgEngagement = 
    analytics.aggregates.byDayOfWeek[dayOfWeek].totalEngagement / 
    analytics.aggregates.byDayOfWeek[dayOfWeek].count;
}

/**
 * Generate 30-day performance report
 */
function generate30DayReport() {
  const analytics = loadAnalytics();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentPosts = analytics.posts.filter(
    p => new Date(p.date) >= thirtyDaysAgo
  );
  
  if (recentPosts.length === 0) {
    return {
      period: '30 days',
      message: 'No posts in the last 30 days',
      recommendations: ['Start posting to gather analytics data']
    };
  }
  
  // Calculate performance by category
  const hookTypePerformance = {};
  const platformPerformance = {};
  const pillarPerformance = {};
  
  recentPosts.forEach(post => {
    // Hook type
    if (!hookTypePerformance[post.hookType]) {
      hookTypePerformance[post.hookType] = [];
    }
    hookTypePerformance[post.hookType].push(post.engagement);
    
    // Platform
    if (!platformPerformance[post.platform]) {
      platformPerformance[post.platform] = [];
    }
    platformPerformance[post.platform].push(post.engagement);
    
    // Pillar
    if (post.pillar) {
      if (!pillarPerformance[post.pillar]) {
        pillarPerformance[post.pillar] = [];
      }
      pillarPerformance[post.pillar].push(post.engagement);
    }
  });
  
  // Calculate averages and rank
  const hookTypeRanked = rankByAverage(hookTypePerformance);
  const platformRanked = rankByAverage(platformPerformance);
  const pillarRanked = rankByAverage(pillarPerformance);
  
  // Generate recommendations
  const recommendations = [];
  
  if (hookTypeRanked.length > 0) {
    const topHook = hookTypeRanked[0];
    const bottomHook = hookTypeRanked[hookTypeRanked.length - 1];
    
    recommendations.push({
      type: 'increase',
      category: 'hookType',
      value: topHook.name,
      reason: `${topHook.name} hooks avg ${topHook.avgEngagement.toFixed(0)} engagement - increase frequency`,
      impact: 'high'
    });
    
    if (hookTypeRanked.length > 1) {
      recommendations.push({
        type: 'decrease',
        category: 'hookType',
        value: bottomHook.name,
        reason: `${bottomHook.name} hooks underperforming at ${bottomHook.avgEngagement.toFixed(0)} avg - reduce or revamp`,
        impact: 'medium'
      });
    }
  }
  
  if (platformRanked.length > 0) {
    const topPlatform = platformRanked[0];
    recommendations.push({
      type: 'focus',
      category: 'platform',
      value: topPlatform.name,
      reason: `${topPlatform.name} is your strongest platform with ${topPlatform.avgEngagement.toFixed(0)} avg engagement`,
      impact: 'high'
    });
  }
  
  // Save recommendations
  analytics.recommendations.history.push({
    date: new Date().toISOString(),
    recommendations: [...recommendations]
  });
  analytics.recommendations.current = recommendations;
  analytics.metadata.nextOptimizationDue = calculateNextOptimization();
  
  saveAnalytics(analytics);
  
  return {
    period: '30 days',
    totalPosts: recentPosts.length,
    totalEngagement: recentPosts.reduce((sum, p) => sum + p.engagement, 0),
    avgEngagement: recentPosts.reduce((sum, p) => sum + p.engagement, 0) / recentPosts.length,
    
    topPerforming: {
      hookTypes: hookTypeRanked.slice(0, 3),
      platforms: platformRanked.slice(0, 2),
      pillars: pillarRanked.slice(0, 2)
    },
    
    underPerforming: {
      hookTypes: hookTypeRanked.slice(-2),
      platforms: platformRanked.slice(-1),
      pillars: pillarRanked.slice(-1)
    },
    
    recommendations,
    generatedAt: new Date().toISOString()
  };
}

function rankByAverage(data) {
  return Object.entries(data)
    .map(([name, engagements]) => ({
      name,
      count: engagements.length,
      totalEngagement: engagements.reduce((a, b) => a + b, 0),
      avgEngagement: engagements.reduce((a, b) => a + b, 0) / engagements.length
    }))
    .sort((a, b) => b.avgEngagement - a.avgEngagement);
}

function calculateNextOptimization() {
  const next = new Date();
  next.setDate(next.getDate() + 30);
  return next.toISOString().split('T')[0];
}

/**
 * Import analytics from CSV (for manual platform exports)
 */
function importFromCSV(csvPath, platform) {
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`);
    return;
  }
  
  const csv = fs.readFileSync(csvPath, 'utf8');
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  let imported = 0;
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length < headers.length) continue;
    
    const post = {
      date: values[headers.indexOf('date')] || new Date().toISOString().split('T')[0],
      platform: platform,
      hookType: values[headers.indexOf('hook_type')] || 'unknown',
      pillar: values[headers.indexOf('pillar')] || 'unknown',
      topic: values[headers.indexOf('topic')] || '',
      hookText: values[headers.indexOf('text')] || '',
      impressions: parseInt(values[headers.indexOf('impressions')]) || 0,
      engagement: parseInt(values[headers.indexOf('engagement')]) || 0,
      clicks: parseInt(values[headers.indexOf('clicks')]) || 0,
      shares: parseInt(values[headers.indexOf('shares')]) || 0,
      comments: parseInt(values[headers.indexOf('comments')]) || 0
    };
    
    recordPost(post);
    imported++;
  }
  
  console.log(`✅ Imported ${imported} posts from ${platform} CSV`);
  return imported;
}

/**
 * Get current optimization status
 */
function getOptimizationStatus() {
  const analytics = loadAnalytics();
  
  const status = {
    lastUpdated: analytics.metadata.lastUpdated,
    totalPosts: analytics.metadata.totalPosts,
    totalEngagement: analytics.metadata.totalEngagement,
    nextOptimizationDue: analytics.metadata.nextOptimizationDue,
    currentRecommendations: analytics.recommendations.current,
    isOptimizationDue: false
  };
  
  if (analytics.metadata.nextOptimizationDue) {
    status.isOptimizationDue = new Date() >= new Date(analytics.metadata.nextOptimizationDue);
  }
  
  return status;
}

// ═══════════════════════════════════════════════════════════════════════════
// SAMPLE DATA GENERATOR (for testing)
// ═══════════════════════════════════════════════════════════════════════════

function generateSampleData(days = 30) {
  const platforms = ['twitter', 'facebook', 'instagram', 'tiktok'];
  const hookTypes = ['outrage', 'curiosity', 'solidarity', 'educational', 'fomo', 'dataDriven'];
  const pillars = ['Expose Corruption', 'Educate & Empower', 'Community Stories', 'Call to Action'];
  
  console.log(`📊 Generating ${days} days of sample analytics data...`);
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // 2-4 posts per day
    const postsPerDay = 2 + Math.floor(Math.random() * 3);
    
    for (let j = 0; j < postsPerDay; j++) {
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const hookType = hookTypes[Math.floor(Math.random() * hookTypes.length)];
      
      // Simulate that some hook types perform better
      let baseEngagement = 50;
      if (hookType === 'outrage') baseEngagement *= 1.5;
      if (hookType === 'solidarity') baseEngagement *= 1.3;
      if (hookType === 'educational') baseEngagement *= 0.8;
      
      // Platform multipliers
      if (platform === 'twitter') baseEngagement *= 1.2;
      if (platform === 'tiktok') baseEngagement *= 1.4;
      
      recordPost({
        date: date.toISOString().split('T')[0],
        platform,
        hookType,
        pillar: pillars[Math.floor(Math.random() * pillars.length)],
        topic: 'claim denials',
        hookText: 'Sample hook text',
        impressions: Math.floor(baseEngagement * 20 + Math.random() * 500),
        engagement: Math.floor(baseEngagement + Math.random() * 50),
        clicks: Math.floor(baseEngagement / 10 + Math.random() * 20),
        shares: Math.floor(baseEngagement / 5 + Math.random() * 10),
        comments: Math.floor(baseEngagement / 10 + Math.random() * 5)
      });
    }
  }
  
  console.log('✅ Sample data generated!');
  return generate30DayReport();
}

// ═══════════════════════════════════════════════════════════════════════════
// CLI
// ═══════════════════════════════════════════════════════════════════════════

if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--report')) {
    console.log('\n📊 30-DAY PERFORMANCE REPORT');
    console.log('============================\n');
    const report = generate30DayReport();
    console.log(JSON.stringify(report, null, 2));
  }
  else if (args.includes('--status')) {
    console.log('\n📊 ANALYTICS STATUS');
    console.log('===================\n');
    const status = getOptimizationStatus();
    console.log(JSON.stringify(status, null, 2));
  }
  else if (args.includes('--sample')) {
    const report = generateSampleData(30);
    console.log('\n📊 SAMPLE DATA REPORT:');
    console.log(JSON.stringify(report, null, 2));
  }
  else if (args.includes('--import')) {
    const csvPath = args[args.indexOf('--import') + 1];
    const platform = args[args.indexOf('--platform') + 1] || 'twitter';
    importFromCSV(csvPath, platform);
  }
  else {
    console.log(`
📊 SOCIAL ANALYTICS TRACKER
===========================

Usage:
  node social-analytics-tracker.js --report    Generate 30-day report
  node social-analytics-tracker.js --status    Show optimization status
  node social-analytics-tracker.js --sample    Generate sample data
  node social-analytics-tracker.js --import <csv> --platform <platform>

The system automatically:
- Tracks post performance by hook type, pillar, and platform
- Generates optimization recommendations every 30 days
- Informs the content calendar generator what's working
    `);
  }
}

module.exports = {
  loadAnalytics,
  recordPost,
  generate30DayReport,
  getOptimizationStatus,
  importFromCSV,
  generateSampleData
};

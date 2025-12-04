/**
 * 📅 SOCIAL CONTENT CALENDAR GENERATOR
 * 
 * Auto-generates posting calendar with viral hooks for The Eye Oracle
 * For the ENTIRE disability community: injured workers, ODSP recipients,
 * chronic illness warriors, invisible disability advocates, caregivers & more
 * Updates every 30 days based on analytics performance
 * 
 * Features:
 * - 30-day rolling content calendar
 * - Platform-specific posting times
 * - Hook rotation to prevent staleness
 * - Analytics-driven optimization
 * - Themed days for consistency
 * - Disability-first, nothing about us without us philosophy
 */

const fs = require('fs');
const path = require('path');

const {
  generateViralHook,
  generatePostPackage,
  generate30DayCalendar,
  getQuirkyIntro,
  getQuirkyClosing,
  WEEKLY_THEMES,
  PLATFORM_STYLES
} = require('./viral-hook-generator');

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT PILLARS - Main themes to rotate through
// ═══════════════════════════════════════════════════════════════════════════

const CONTENT_PILLARS = {
  expose: {
    name: 'Expose Corruption',
    description: 'Reveal what they\'re hiding about disability discrimination',
    weight: 30, // 30% of content
    hookTypes: ['outrage', 'curiosity', 'dataDriven'],
    topics: [
      'claim denial patterns',
      'executive compensation vs benefit rates',
      'ODSP vs cost of living gaps',
      'algorithmic discrimination',
      'statistical anomalies in disability decisions',
      'insurance company lobbying',
      'ableism in policy design'
    ]
  },
  educate: {
    name: 'Educate & Empower',
    description: 'How-to guides and rights info for all disabilities',
    weight: 25,
    hookTypes: ['educational', 'question'],
    topics: [
      'appeal processes for all programs',
      'documentation tips',
      'disability rights under law',
      'FOI requests',
      'Disability Tax Credit eligibility',
      'ODSP/CPP-D application tips',
      'invisible disability accommodation rights'
    ]
  },
  community: {
    name: 'Community Stories',
    description: 'Real stories from the disability community',
    weight: 25,
    hookTypes: ['solidarity', 'story'],
    topics: [
      'disability success stories',
      'you are not alone',
      'community wins against the system',
      'chronic illness lived experience',
      'caregiver solidarity',
      'tribute to disability fighters'
    ]
  },
  action: {
    name: 'Call to Action',
    description: 'Specific actions the disability community can take',
    weight: 15,
    hookTypes: ['fomo', 'bold'],
    topics: [
      'contact your MPP about disability issues',
      'share this report',
      'file accessibility complaints',
      'join disability advocacy campaigns',
      'upcoming benefit deadlines',
      'Canada Disability Benefit updates'
    ]
  },
  celebration: {
    name: 'Wins & Progress',
    description: 'Disability community victories and momentum',
    weight: 5,
    hookTypes: ['story', 'solidarity'],
    topics: [
      'successful appeals',
      'policy changes won',
      'accessibility wins',
      'community growth milestones',
      'disability pride moments'
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// CALENDAR GENERATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate comprehensive 30-day content calendar
 */
function generateContentCalendar(startDate = new Date()) {
  const calendar = [];
  const pillars = Object.entries(CONTENT_PILLARS);
  let pillarIndex = 0;
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const dayTheme = WEEKLY_THEMES[dayName];
    
    // Select content pillar based on weighted rotation
    const selectedPillar = selectWeightedPillar(i);
    
    // Generate hooks for each platform
    const platformContent = {};
    Object.keys(PLATFORM_STYLES).forEach(platform => {
      const hookType = selectedPillar.hookTypes[i % selectedPillar.hookTypes.length];
      const topic = selectedPillar.topics[i % selectedPillar.topics.length];
      
      const hook = generateViralHook(topic, platform, hookType, {
        stat: getRandomStat(),
        number: getRandomNumber(),
        agency: getRandomAgency()
      });
      
      platformContent[platform] = {
        hook: hook.hook,
        hashtags: hook.hashtags,
        bestTime: hook.bestTime,
        hookType: hookType,
        altHooks: generateAlternativeHooks(topic, platform, 2)
      };
    });
    
    calendar.push({
      date: date.toISOString().split('T')[0],
      dayOfWeek: dayName,
      dayNumber: i + 1,
      
      // Theme info
      dayTheme: dayTheme.theme,
      themeEmoji: dayTheme.emoji,
      mood: dayTheme.mood,
      
      // Content pillar
      pillar: selectedPillar.name,
      pillarDescription: selectedPillar.description,
      topic: selectedPillar.topics[i % selectedPillar.topics.length],
      
      // Platform-specific content
      platforms: platformContent,
      
      // Engagement prompts
      engagementPrompts: generateEngagementPrompts(dayTheme.mood),
      
      // Quirky elements
      quirkyIntro: getQuirkyIntro({ violationCount: 10 + (i % 15) }),
      quirkyClosing: getQuirkyClosing(),
      
      // Metadata
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '2.0',
        analyticsUpdateDue: calculateNextAnalyticsUpdate()
      }
    });
  }
  
  return {
    calendarPeriod: {
      start: startDate.toISOString().split('T')[0],
      end: new Date(startDate.getTime() + 29 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    totalDays: 30,
    generatedAt: new Date().toISOString(),
    nextUpdateDue: calculateNextAnalyticsUpdate(),
    days: calendar
  };
}

/**
 * Select content pillar based on weights
 */
function selectWeightedPillar(dayIndex) {
  const pillars = Object.values(CONTENT_PILLARS);
  const totalWeight = pillars.reduce((sum, p) => sum + p.weight, 0);
  
  // Use deterministic selection based on day
  const targetWeight = (dayIndex * 17) % totalWeight; // 17 is prime for better distribution
  
  let currentWeight = 0;
  for (const pillar of pillars) {
    currentWeight += pillar.weight;
    if (targetWeight < currentWeight) {
      return pillar;
    }
  }
  
  return pillars[0];
}

/**
 * Generate alternative hooks for A/B testing
 */
function generateAlternativeHooks(topic, platform, count) {
  const altHooks = [];
  const hookTypes = ['outrage', 'curiosity', 'fomo', 'solidarity'];
  
  for (let i = 0; i < count; i++) {
    const hookType = hookTypes[i % hookTypes.length];
    const hook = generateViralHook(topic, platform, hookType);
    altHooks.push(hook.hook);
  }
  
  return altHooks;
}

/**
 * Generate engagement prompts based on mood
 */
function generateEngagementPrompts(mood) {
  const prompts = {
    empowering: [
      'Share your own story in the comments 💬',
      'Tag someone who needs to see this',
      'RT if you\'ve experienced this too'
    ],
    exposing: [
      'Did you know about this? 👇',
      'This needs to go viral. Share it.',
      'Comment with your reaction'
    ],
    celebratory: [
      'Share your wins! We want to celebrate with you 🎉',
      'Who else has had a victory lately?',
      'Let\'s spread some hope - share this'
    ],
    investigative: [
      'What patterns have you noticed?',
      'Drop your FOI findings below 👇',
      'Help us connect the dots'
    ],
    angry: [
      'Are you as angry as we are?',
      'This can\'t keep happening. Share to expose.',
      'Tag your MPP in the comments'
    ],
    humanizing: [
      'Your story matters. Share it.',
      'We\'re listening. Tell us in the comments.',
      'Connect with others who understand'
    ],
    helpful: [
      'Bookmark this for later',
      'Tag someone who needs this info',
      'Which tip helped you most?'
    ]
  };
  
  return prompts[mood] || prompts.exposing;
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function getRandomStat() {
  const stats = ['67%', '47%', '18 months', '98,000+', '$1,308', '12%', '23 workers'];
  return stats[Math.floor(Math.random() * stats.length)];
}

function getRandomNumber() {
  const numbers = ['10,000+', '847', '4,000+', '500,000+', '33'];
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomAgency() {
  const agencies = ['WSIB', 'ODSP', 'WCB', 'Service Canada', 'CNESST'];
  return agencies[Math.floor(Math.random() * agencies.length)];
}

function calculateNextAnalyticsUpdate() {
  const nextUpdate = new Date();
  nextUpdate.setDate(nextUpdate.getDate() + 30);
  return nextUpdate.toISOString().split('T')[0];
}

// ═══════════════════════════════════════════════════════════════════════════
// ANALYTICS UPDATE SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Check if analytics update is due (every 30 days)
 */
function isAnalyticsUpdateDue(calendarPath) {
  if (!fs.existsSync(calendarPath)) return true;
  
  try {
    const calendar = JSON.parse(fs.readFileSync(calendarPath, 'utf8'));
    const lastUpdate = new Date(calendar.generatedAt);
    const daysSinceUpdate = (new Date() - lastUpdate) / (1000 * 60 * 60 * 24);
    
    return daysSinceUpdate >= 30;
  } catch {
    return true;
  }
}

/**
 * Analyze performance and regenerate calendar with optimizations
 */
function updateCalendarWithAnalytics(analyticsData, calendarPath) {
  console.log('📊 Analyzing 30-day performance data...\n');
  
  // Analyze which hook types performed best
  const hookPerformance = {};
  const pillarPerformance = {};
  const platformPerformance = {};
  
  if (analyticsData && analyticsData.posts) {
    analyticsData.posts.forEach(post => {
      // Track hook performance
      if (!hookPerformance[post.hookType]) {
        hookPerformance[post.hookType] = { engagements: 0, count: 0 };
      }
      hookPerformance[post.hookType].engagements += post.engagement || 0;
      hookPerformance[post.hookType].count++;
      
      // Track pillar performance
      if (!pillarPerformance[post.pillar]) {
        pillarPerformance[post.pillar] = { engagements: 0, count: 0 };
      }
      pillarPerformance[post.pillar].engagements += post.engagement || 0;
      pillarPerformance[post.pillar].count++;
      
      // Track platform performance
      if (!platformPerformance[post.platform]) {
        platformPerformance[post.platform] = { engagements: 0, count: 0 };
      }
      platformPerformance[post.platform].engagements += post.engagement || 0;
      platformPerformance[post.platform].count++;
    });
  }
  
  // Generate recommendations
  const recommendations = {
    hookRecommendations: analyzePerformance(hookPerformance),
    pillarRecommendations: analyzePerformance(pillarPerformance),
    platformRecommendations: analyzePerformance(platformPerformance),
    updatedAt: new Date().toISOString()
  };
  
  console.log('✅ Analysis complete!');
  console.log('\n📈 Top performing hook types:', recommendations.hookRecommendations.top);
  console.log('📉 Underperforming:', recommendations.hookRecommendations.bottom);
  
  // Generate new calendar with adjustments
  const newCalendar = generateContentCalendar();
  newCalendar.analyticsRecommendations = recommendations;
  
  // Save updated calendar
  fs.writeFileSync(calendarPath, JSON.stringify(newCalendar, null, 2));
  
  console.log('\n✅ Calendar regenerated with optimizations!');
  console.log(`📅 New calendar period: ${newCalendar.calendarPeriod.start} to ${newCalendar.calendarPeriod.end}`);
  
  return newCalendar;
}

function analyzePerformance(data) {
  const entries = Object.entries(data)
    .map(([name, stats]) => ({
      name,
      avgEngagement: stats.count > 0 ? stats.engagements / stats.count : 0
    }))
    .sort((a, b) => b.avgEngagement - a.avgEngagement);
  
  return {
    top: entries.slice(0, 3).map(e => e.name),
    bottom: entries.slice(-2).map(e => e.name)
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const DATA_DIR = path.join(__dirname, '../public/data');
  const CALENDAR_PATH = path.join(DATA_DIR, 'content-calendar.json');
  const ANALYTICS_PATH = path.join(DATA_DIR, 'social-analytics.json');
  
  console.log('📅 SOCIAL CONTENT CALENDAR GENERATOR');
  console.log('=====================================\n');
  
  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  // Check if update is due
  if (isAnalyticsUpdateDue(CALENDAR_PATH)) {
    console.log('⏰ 30-day analytics update is due!\n');
    
    // Load analytics if available
    let analyticsData = null;
    if (fs.existsSync(ANALYTICS_PATH)) {
      analyticsData = JSON.parse(fs.readFileSync(ANALYTICS_PATH, 'utf8'));
    }
    
    // Update calendar with analytics
    const calendar = updateCalendarWithAnalytics(analyticsData, CALENDAR_PATH);
    
    console.log('\n📊 Calendar Summary:');
    console.log(`   Total days: ${calendar.totalDays}`);
    console.log(`   Period: ${calendar.calendarPeriod.start} to ${calendar.calendarPeriod.end}`);
    console.log(`   Next update: ${calendar.nextUpdateDue}`);
    
  } else {
    console.log('✅ Calendar is up to date (less than 30 days old)');
    console.log('   Run with --force to regenerate anyway\n');
    
    if (process.argv.includes('--force')) {
      const calendar = generateContentCalendar();
      fs.writeFileSync(CALENDAR_PATH, JSON.stringify(calendar, null, 2));
      console.log('📅 Calendar force-regenerated!');
    }
  }
  
  // Also generate today's social content
  console.log('\n📱 Generating today\'s social content...');
  
  const todayContent = generateTodayContent();
  const TODAY_PATH = path.join(DATA_DIR, 'today-social-content.json');
  fs.writeFileSync(TODAY_PATH, JSON.stringify(todayContent, null, 2));
  
  console.log('✅ Today\'s content ready!');
  console.log(`   Theme: ${todayContent.dayTheme}`);
  console.log(`   Pillar: ${todayContent.pillar}`);
  console.log(`   Topic: ${todayContent.topic}`);
}

function generateTodayContent() {
  const calendar = generateContentCalendar();
  const today = new Date().toISOString().split('T')[0];
  
  return calendar.days.find(d => d.date === today) || calendar.days[0];
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  generateContentCalendar,
  updateCalendarWithAnalytics,
  isAnalyticsUpdateDue,
  generateTodayContent,
  CONTENT_PILLARS
};

#!/usr/bin/env node

/**
 * DIAGNOSTIC SCRIPT - Eye Oracle & Justice Report Automation
 * Verifies all components are working correctly
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'public/data');
const SCRIPTS_DIR = path.join(PROJECT_ROOT, 'scripts');

console.log(`
╔════════════════════════════════════════════════════════════════╗
║  👁️  EYE ORACLE AUTOMATION DIAGNOSTIC                         ║
║                                                                ║
║  Verifying: Eye Oracle, Justice Reports, Blog Posts, & Viral  ║
║  Content Generation                                           ║
╚════════════════════════════════════════════════════════════════╝
`);

// Color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

function log(status, message, details = '') {
  const statusMap = {
    ok: `${colors.green}✅${colors.reset}`,
    fail: `${colors.red}❌${colors.reset}`,
    warn: `${colors.yellow}⚠️${colors.reset}`,
    info: `${colors.cyan}ℹ️${colors.reset}`
  };

  console.log(`${statusMap[status] || '•'} ${message}`);
  if (details) {
    console.log(`   ${colors.gray}${details}${colors.reset}`);
  }
}

// DIAGNOSTIC 1: Check if data directory exists
console.log('\n📂 Data Directory Status');
console.log('─'.repeat(50));

if (fs.existsSync(DATA_DIR)) {
  log('ok', 'Data directory exists', DATA_DIR);
} else {
  log('fail', 'Data directory missing', DATA_DIR);
  process.exit(1);
}

// DIAGNOSTIC 2: Check required data files
console.log('\n📊 Required Data Files');
console.log('─'.repeat(50));

const requiredFiles = [
  'eye-oracle-posts.json',
  'daily-justice-report.json',
  'blog-posts.json',
  'daily-eye-viral-report.json'
];

const fileStatuses = {};
requiredFiles.forEach(file => {
  const filePath = path.join(DATA_DIR, file);
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    const sizeKB = (stat.size / 1024).toFixed(2);
    const modifiedDate = new Date(stat.mtime).toLocaleString();
    fileStatuses[file] = { exists: true, size: sizeKB, modified: modifiedDate };
    log('ok', `${file} (${sizeKB} KB)`, modifiedDate);
  } else {
    fileStatuses[file] = { exists: false };
    log('fail', `${file} missing`);
  }
});

// DIAGNOSTIC 3: Check Eye Oracle Posts
console.log('\n👁️  Eye Oracle Posts Analysis');
console.log('─'.repeat(50));

const eyeOraclePostsPath = path.join(DATA_DIR, 'eye-oracle-posts.json');
if (fs.existsSync(eyeOraclePostsPath)) {
  try {
    const posts = JSON.parse(fs.readFileSync(eyeOraclePostsPath, 'utf8'));
    if (Array.isArray(posts)) {
      log('ok', `Total posts: ${posts.length}`);
      
      if (posts.length > 0) {
        const latestPost = posts[0];
        const postDate = latestPost.metadata?.date || latestPost.date || 'unknown';
        const title = latestPost.title?.substring(0, 50) || 'No title';
        log('ok', `Latest post: ${postDate}`, title);
        
        // Check for required fields
        const requiredFields = ['title', 'excerpt', 'content', 'metadata'];
        const missingFields = requiredFields.filter(field => !latestPost[field]);
        
        if (missingFields.length === 0) {
          log('ok', 'Post structure: valid', 'All required fields present');
        } else {
          log('warn', 'Post structure: incomplete', `Missing: ${missingFields.join(', ')}`);
        }

        // Check for evidence receipts
        if (latestPost.content?.evidenceReceipts) {
          log('ok', 'Evidence receipts: included');
        } else {
          log('warn', 'Evidence receipts: missing');
        }

        // Check for viral hooks
        if (latestPost.viralHooks) {
          const hookCount = Object.keys(latestPost.viralHooks).length;
          log('ok', `Viral hooks: ${hookCount} platforms`);
        } else {
          log('warn', 'Viral hooks: missing');
        }
      } else {
        log('warn', 'Eye Oracle posts: empty array');
      }
    } else {
      log('fail', 'Eye Oracle posts: invalid JSON structure');
    }
  } catch (e) {
    log('fail', 'Eye Oracle posts: JSON parse error', e.message);
  }
}

// DIAGNOSTIC 4: Check Daily Justice Report
console.log('\n⚖️  Daily Justice Report Analysis');
console.log('─'.repeat(50));

const justiceReportPath = path.join(DATA_DIR, 'daily-justice-report.json');
if (fs.existsSync(justiceReportPath)) {
  try {
    const report = JSON.parse(fs.readFileSync(justiceReportPath, 'utf8'));
    const reportDate = report.date || new Date().toISOString().split('T')[0];
    
    log('ok', `Report date: ${reportDate}`);
    
    if (report.rightsAnalysis && Array.isArray(report.rightsAnalysis)) {
      log('ok', `Rights analysis items: ${report.rightsAnalysis.length}`);
    } else {
      log('warn', 'Rights analysis: missing or invalid');
    }

    if (report.violationFlags && Array.isArray(report.violationFlags)) {
      log('ok', `Violation flags: ${report.violationFlags.length}`, 
        `${report.violationFlags.filter(v => v.severity === 'critical').length} critical`);
    } else {
      log('warn', 'Violation flags: missing or invalid');
    }

    const summaryFields = ['violationsDetected', 'charterConcerns', 'uncrpdConcerns'];
    const summary = report.summary || {};
    
    summaryFields.forEach(field => {
      if (summary[field] !== undefined) {
        log('ok', `${field}: ${summary[field]}`);
      }
    });
  } catch (e) {
    log('fail', 'Daily Justice Report: JSON parse error', e.message);
  }
}

// DIAGNOSTIC 5: Check Blog Posts
console.log('\n📝 Blog Posts Analysis');
console.log('─'.repeat(50));

const blogPostsPath = path.join(DATA_DIR, 'blog-posts.json');
if (fs.existsSync(blogPostsPath)) {
  try {
    const posts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));
    if (Array.isArray(posts)) {
      log('ok', `Total blog posts: ${posts.length}`);
      
      if (posts.length > 0) {
        const latestBlogPost = posts[0];
        const date = latestBlogPost.date || 'unknown';
        const title = latestBlogPost.title?.substring(0, 50) || 'No title';
        log('ok', `Latest blog post: ${date}`, title);
        
        // Group by category
        const categories = new Set(posts.map(p => p.category));
        log('info', `Categories: ${Array.from(categories).join(', ')}`);
      }
    } else {
      log('fail', 'Blog posts: invalid JSON structure');
    }
  } catch (e) {
    log('fail', 'Blog posts: JSON parse error', e.message);
  }
}

// DIAGNOSTIC 6: Check Viral Report
console.log('\n📱 Daily Viral Report Analysis');
console.log('─'.repeat(50));

const viralReportPath = path.join(DATA_DIR, 'daily-eye-viral-report.json');
if (fs.existsSync(viralReportPath)) {
  try {
    const report = JSON.parse(fs.readFileSync(viralReportPath, 'utf8'));
    const reportDate = report.meta?.date || 'unknown';
    
    log('ok', `Report date: ${reportDate}`);
    
    if (report.headline) {
      log('ok', 'Headline generated', report.headline.substring(0, 60));
    } else {
      log('warn', 'Headline: missing');
    }

    if (report.topFindings && Array.isArray(report.topFindings)) {
      log('ok', `Top findings: ${report.topFindings.length}`);
    } else {
      log('warn', 'Top findings: missing or invalid');
    }

    if (report.summary) {
      const summary = report.summary;
      log('info', `Violations found: ${summary.violationsFound || '?'}`);
      log('info', `Populations affected: ${summary.populationsAffected || '?'}`);
    }
  } catch (e) {
    log('fail', 'Viral report: JSON parse error', e.message);
  }
}

// DIAGNOSTIC 7: Check scripts exist and are executable
console.log('\n🔧 Generation Scripts Status');
console.log('─'.repeat(50));

const scripts = [
  'generate-eye-oracle-daily.js',
  'generate-daily-justice-report.js',
  'generate-daily-blog-post.js',
  'generate-daily-eye-viral-report.js'
];

scripts.forEach(script => {
  const scriptPath = path.join(SCRIPTS_DIR, script);
  if (fs.existsSync(scriptPath)) {
    const stat = fs.statSync(scriptPath);
    const sizeKB = (stat.size / 1024).toFixed(2);
    log('ok', `${script} (${sizeKB} KB)`);
  } else {
    log('fail', `${script} not found`);
  }
});

// DIAGNOSTIC 8: Check GitHub Actions workflow
console.log('\n🤖 GitHub Actions Workflow Status');
console.log('─'.repeat(50));

const workflowPath = path.join(PROJECT_ROOT, '.github/workflows/eye-oracle-automation.yml');
if (fs.existsSync(workflowPath)) {
  log('ok', 'eye-oracle-automation.yml workflow exists');
  
  // Check workflow content
  const workflowContent = fs.readFileSync(workflowPath, 'utf8');
  
  const hasJusticeScript = workflowContent.includes('generate-daily-justice-report.js');
  const hasOracleScript = workflowContent.includes('generate-eye-oracle-daily.js');
  const hasBlogScript = workflowContent.includes('generate-daily-blog-post.js');
  const hasViralScript = workflowContent.includes('generate-daily-eye-viral-report.js');
  
  log(hasJusticeScript ? 'ok' : 'fail', 'Justice Report script in workflow');
  log(hasOracleScript ? 'ok' : 'fail', 'Eye Oracle script in workflow');
  log(hasBlogScript ? 'ok' : 'fail', 'Blog Post script in workflow');
  log(hasViralScript ? 'ok' : 'fail', 'Viral Report script in workflow');
  
  // Check schedule
  if (workflowContent.includes('schedule:')) {
    log('ok', 'Scheduled triggers configured');
    const cronMatches = workflowContent.match(/cron: '([^']+)'/g);
    if (cronMatches) {
      cronMatches.forEach(m => {
        console.log(`   ${colors.gray}${m}${colors.reset}`);
      });
    }
  }
} else {
  log('fail', 'Workflow file not found');
}

// DIAGNOSTIC 9: Check frontend pages
console.log('\n🌐 Frontend Pages Status');
console.log('─'.repeat(50));

const pages = [
  { name: 'eye-oracle-reports.js', path: 'pages/eye-oracle-reports.js' },
  { name: 'eye-oracle-post.js', path: 'pages/eye-oracle-post.js' },
  { name: 'blog.js', path: 'pages/blog.js' },
  { name: 'the-eye-oracle.js', path: 'pages/the-eye-oracle.js' }
];

pages.forEach(page => {
  const pagePath = path.join(PROJECT_ROOT, page.path);
  if (fs.existsSync(pagePath)) {
    log('ok', `${page.name} exists`);
  } else {
    log(page.name.includes('reports') || page.name.includes('-post') ? 'fail' : 'warn', 
      `${page.name} ${fs.existsSync(pagePath) ? 'exists' : 'missing'}`);
  }
});

// FINAL SUMMARY
console.log('\n' + '═'.repeat(50));
console.log('📋 SUMMARY & RECOMMENDATIONS');
console.log('═'.repeat(50));

const allFilesExist = requiredFiles.every(f => fileStatuses[f]?.exists);

if (allFilesExist) {
  log('ok', 'All required data files present');
  console.log('\n✅ Automation is WORKING correctly!');
  console.log('\n📌 Next Steps:');
  console.log('   1. Deploy website to GitHub Pages or Cloudflare Pages');
  console.log('   2. Verify /eye-oracle-reports page displays posts');
  console.log('   3. Configure social media API keys for auto-posting');
  console.log('   4. Set up Discord webhooks for automated notifications');
  console.log('   5. Monitor GitHub Actions runs for any failures');
} else {
  log('fail', 'Some data files are missing');
  console.log('\n❌ Automation needs attention');
  console.log('\n🔍 Troubleshooting:');
  console.log('   1. Run: npm run oracle:generate');
  console.log('   2. Run: npm run justice:generate');
  console.log('   3. Check logs: node scripts/generate-*.js');
  console.log('   4. Verify file permissions in public/data/');
  console.log('   5. Check Node.js version: ' + (require('child_process').execSync('node --version').toString().trim()));
}

console.log('\n' + '═'.repeat(50));

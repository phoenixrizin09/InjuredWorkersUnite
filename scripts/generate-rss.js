#!/usr/bin/env node

/**
 * GENERATE RSS FEEDS
 * 
 * Creates RSS feeds for blog and Eye Oracle reports
 * 100% standards compliant
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const BASE_URL = 'https://injuredworkersunite.pages.dev';

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate Blog RSS
function generateBlogRSS() {
  const blogFile = path.join(PUBLIC_DIR, 'data/blog-posts.json');
  if (!fs.existsSync(blogFile)) {
    console.log('⚠️  No blog posts found');
    return null;
  }
  
  const posts = JSON.parse(fs.readFileSync(blogFile, 'utf8'));
  const latestPosts = posts.slice(0, 20);
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Injured Workers Unite - Blog</title>
    <description>Daily features, tools, and updates for injured workers and disability rights activists</description>
    <link>${BASE_URL}/blog</link>
    <language>en-CA</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/blog-rss.xml" rel="self" type="application/rss+xml" />
    
${latestPosts.map(post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt)}</description>
      <link>${BASE_URL}/blog#${post.id}</link>
      <guid>${BASE_URL}/blog#${post.id}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`).join('\n')}
  </channel>
</rss>`;
  
  return rss;
}

// Generate Eye Oracle RSS
function generateOracleRSS() {
  const oracleFile = path.join(PUBLIC_DIR, 'data/eye-oracle-posts.json');
  if (!fs.existsSync(oracleFile)) {
    console.log('⚠️  No oracle reports found');
    return null;
  }
  
  const reports = JSON.parse(fs.readFileSync(oracleFile, 'utf8'));
  const latestReports = reports.slice(0, 20);
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Injured Workers Unite - Eye Oracle Reports</title>
    <description>Daily corruption reports and government accountability investigations</description>
    <link>${BASE_URL}/eye-oracle-reports</link>
    <language>en-CA</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/oracle-rss.xml" rel="self" type="application/rss+xml" />
    
${latestReports.map((report, idx) => `    <item>
      <title>${escapeXml(report.title || 'Eye Oracle Report')}</title>
      <description>${escapeXml(report.excerpt || 'Corruption investigation report')}</description>
      <link>${BASE_URL}/eye-oracle-reports#report-${idx}</link>
      <guid>${BASE_URL}/eye-oracle-reports#report-${idx}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>`;
  
  return rss;
}

// Generate Alerts RSS
function generateAlertsRSS() {
  const alertsFile = path.join(PUBLIC_DIR, 'data/alerts.json');
  if (!fs.existsSync(alertsFile)) {
    console.log('⚠️  No alerts found');
    return null;
  }
  
  const alerts = JSON.parse(fs.readFileSync(alertsFile, 'utf8'));
  const latestAlerts = alerts.filter(a => !a.acknowledged).slice(0, 30);
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Injured Workers Unite - Alerts</title>
    <description>Real-time alerts on government data updates, policy changes, and activism opportunities</description>
    <link>${BASE_URL}/alerts</link>
    <language>en-CA</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/alerts-rss.xml" rel="self" type="application/rss+xml" />
    
${latestAlerts.map(alert => `    <item>
      <title>${escapeXml(alert.title)}</title>
      <description>${escapeXml(alert.message)}</description>
      <link>${alert.source_url || BASE_URL + '/alerts'}</link>
      <guid>${alert.id}</guid>
      <pubDate>${new Date(alert.created_at).toUTCString()}</pubDate>
      <category>${escapeXml(alert.category)}</category>
    </item>`).join('\n')}
  </channel>
</rss>`;
  
  return rss;
}

// Main
function main() {
  console.log('📡 Generating RSS feeds...\n');
  
  const feeds = [
    { name: 'blog-rss.xml', generator: generateBlogRSS, description: 'Blog Feed' },
    { name: 'oracle-rss.xml', generator: generateOracleRSS, description: 'Oracle Reports Feed' },
    { name: 'alerts-rss.xml', generator: generateAlertsRSS, description: 'Alerts Feed' }
  ];
  
  let generated = 0;
  
  feeds.forEach(feed => {
    const rss = feed.generator();
    if (rss) {
      const feedPath = path.join(PUBLIC_DIR, feed.name);
      fs.writeFileSync(feedPath, rss);
      console.log(`   ✓ ${feed.description}: ${feedPath}`);
      generated++;
    }
  });
  
  console.log(`\n✅ Generated ${generated} RSS feeds\n`);
}

if (require.main === module) {
  main();
}

module.exports = { main };

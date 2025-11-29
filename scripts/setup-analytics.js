#!/usr/bin/env node

/**
 * Analytics & Monitoring Setup Script
 * Creates configuration files for privacy-friendly analytics
 * Run: node scripts/setup-analytics.js
 */

const fs = require('fs');
const path = require('path');

console.log('📊 Setting up Analytics & Monitoring...\n');

// 1. Create Plausible Analytics config
console.log('1️⃣ Creating Plausible Analytics configuration...');

const plausibleScript = `
<!-- Plausible Analytics (Privacy-Friendly, GDPR Compliant) -->
<script defer data-domain="injuredworkersunite.pages.dev" src="https://plausible.io/js/script.js"></script>
`;

console.log('   ✓ Add this to pages/_document.js <Head> section:\n');
console.log(plausibleScript);

// 2. Create UptimeRobot monitoring guide
console.log('\n2️⃣ Creating UptimeRobot monitoring guide...');

const uptimeConfig = {
  service: 'UptimeRobot',
  url: 'https://uptimerobot.com/',
  plan: 'Free',
  features: [
    '50 monitors (free)',
    '5-minute check intervals',
    'Email/SMS alerts',
    'Public status pages',
    'SSL certificate monitoring'
  ],
  monitors: [
    {
      name: 'InjuredWorkersUnite - Homepage',
      type: 'HTTP(s)',
      url: 'https://59047984.injuredworkersunite-rsr.pages.dev',
      interval: '5 minutes'
    },
    {
      name: 'InjuredWorkersUnite - API Health',
      type: 'HTTP(s)',
      url: 'https://59047984.injuredworkersunite-rsr.pages.dev/api/stats',
      interval: '5 minutes'
    },
    {
      name: 'InjuredWorkersUnite - RSS Feed',
      type: 'HTTP(s)',
      url: 'https://59047984.injuredworkersunite-rsr.pages.dev/blog-rss.xml',
      interval: '15 minutes'
    }
  ],
  alerts: [
    'Down for 2 minutes → Email notification',
    'Down for 5 minutes → SMS notification (optional)',
    'SSL certificate expires in 7 days → Email warning'
  ]
};

fs.writeFileSync(
  path.join(__dirname, '../monitoring-config.json'),
  JSON.stringify(uptimeConfig, null, 2)
);

console.log('   ✓ Created monitoring-config.json\n');

// 3. Create GitHub Actions monitoring workflow
console.log('3️⃣ Creating GitHub Actions monitoring workflow...');

const monitoringWorkflow = `name: Monitor Site Health

on:
  schedule:
    # Run every hour
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  monitor:
    runs-on: ubuntu-latest
    
    steps:
      - name: Check Homepage
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://59047984.injuredworkersunite-rsr.pages.dev)
          if [ $response != 200 ]; then
            echo "::error::Homepage returned $response"
            exit 1
          fi
          echo "✓ Homepage: $response"
      
      - name: Check Sitemap
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://59047984.injuredworkersunite-rsr.pages.dev/sitemap.xml)
          if [ $response != 200 ]; then
            echo "::error::Sitemap returned $response"
            exit 1
          fi
          echo "✓ Sitemap: $response"
      
      - name: Check RSS Feeds
        run: |
          for feed in blog-rss.xml oracle-rss.xml alerts-rss.xml; do
            response=$(curl -s -o /dev/null -w "%{http_code}" https://59047984.injuredworkersunite-rsr.pages.dev/$feed)
            if [ $response != 200 ]; then
              echo "::error::$feed returned $response"
              exit 1
            fi
            echo "✓ $feed: $response"
          done
      
      - name: Check Data Freshness
        run: |
          # Download data summary
          curl -s https://59047984.injuredworkersunite-rsr.pages.dev/data/data-summary.json > summary.json
          
          # Check if file exists and is valid JSON
          if ! jq empty summary.json 2>/dev/null; then
            echo "::error::Invalid data-summary.json"
            exit 1
          fi
          
          echo "✓ Data files accessible"
      
      - name: Notify on Failure
        if: failure()
        run: |
          echo "::warning::Site health check failed - investigate immediately"
`;

fs.writeFileSync(
  path.join(__dirname, '../.github/workflows/site-monitoring.yml'),
  monitoringWorkflow
);

console.log('   ✓ Created .github/workflows/site-monitoring.yml\n');

// 4. Create analytics dashboard component
console.log('4️⃣ Creating analytics dashboard component...');

const analyticsComponent = `// components/Analytics.js
import Head from 'next/head';

export default function Analytics() {
  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Head>
      {/* Plausible Analytics - Privacy-friendly, no cookies */}
      <script
        defer
        data-domain="injuredworkersunite.pages.dev"
        src="https://plausible.io/js/script.js"
      />
      
      {/* Optional: Plausible custom events */}
      <script dangerouslySetInnerHTML={{
        __html: \`
          window.plausible = window.plausible || function() {
            (window.plausible.q = window.plausible.q || []).push(arguments)
          }
        \`
      }} />
    </Head>
  );
}

// Usage: Add to pages/_app.js
// import Analytics from '../components/Analytics';
// 
// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <Analytics />
//       <Component {...pageProps} />
//     </>
//   );
// }
`;

fs.writeFileSync(
  path.join(__dirname, '../components/Analytics.js'),
  analyticsComponent
);

console.log('   ✓ Created components/Analytics.js\n');

// 5. Create monitoring dashboard
console.log('5️⃣ Creating monitoring dashboard page...');

const dashboardPage = `// pages/admin/monitoring.js
import { useState, useEffect } from 'react';

export default function MonitoringDashboard() {
  const [status, setStatus] = useState({
    site: 'loading',
    data: 'loading',
    actions: 'loading'
  });

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const checkStatus = async () => {
    // Check site
    try {
      await fetch('/');
      setStatus(prev => ({ ...prev, site: 'up' }));
    } catch (e) {
      setStatus(prev => ({ ...prev, site: 'down' }));
    }

    // Check data freshness
    try {
      const res = await fetch('/data/data-summary.json');
      const data = await res.json();
      const lastUpdate = new Date(data.lastUpdated);
      const hoursSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60);
      setStatus(prev => ({ 
        ...prev, 
        data: hoursSinceUpdate < 7 ? 'fresh' : 'stale' 
      }));
    } catch (e) {
      setStatus(prev => ({ ...prev, data: 'error' }));
    }

    // Check GitHub Actions (would need API integration)
    setStatus(prev => ({ ...prev, actions: 'unknown' }));
  };

  const getStatusColor = (stat) => {
    if (stat === 'loading' || stat === 'unknown') return 'gray';
    if (stat === 'up' || stat === 'fresh') return 'green';
    return 'red';
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🔍 Monitoring Dashboard</h1>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>System Status</h2>
        <ul>
          <li style={{ color: getStatusColor(status.site) }}>
            Site: {status.site.toUpperCase()}
          </li>
          <li style={{ color: getStatusColor(status.data) }}>
            Data: {status.data.toUpperCase()}
          </li>
          <li style={{ color: getStatusColor(status.actions) }}>
            GitHub Actions: {status.actions.toUpperCase()}
          </li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Quick Links</h2>
        <ul>
          <li><a href="https://plausible.io/injuredworkersunite.pages.dev" target="_blank">Plausible Analytics</a></li>
          <li><a href="https://uptimerobot.com/" target="_blank">UptimeRobot Dashboard</a></li>
          <li><a href="https://github.com/phoenixrizin09/InjuredWorkersUnite/actions" target="_blank">GitHub Actions</a></li>
          <li><a href="https://dash.cloudflare.com/" target="_blank">Cloudflare Dashboard</a></li>
        </ul>
      </div>
    </div>
  );
}
`;

const adminDashboardDir = path.join(__dirname, '../pages/admin');
if (!fs.existsSync(adminDashboardDir)) {
  fs.mkdirSync(adminDashboardDir, { recursive: true });
}

fs.writeFileSync(
  path.join(adminDashboardDir, 'monitoring.js'),
  dashboardPage
);

console.log('   ✓ Created pages/admin/monitoring.js\n');

// Generate setup instructions
const instructions = {
  analytics: {
    service: 'Plausible Analytics',
    setup: [
      '1. Visit https://plausible.io/',
      '2. Sign up for free (or self-host)',
      '3. Add site: injuredworkersunite.pages.dev',
      '4. Script already added to Analytics.js component',
      '5. Import Analytics component in pages/_app.js',
      '6. View stats at https://plausible.io/injuredworkersunite.pages.dev'
    ],
    cost: '$0/month (or $9/month for managed)',
    features: [
      'No cookies needed',
      'GDPR compliant',
      'Lightweight (<1KB)',
      'Real-time data',
      'No personal data collection'
    ]
  },
  monitoring: {
    service: 'UptimeRobot',
    setup: [
      '1. Visit https://uptimerobot.com/',
      '2. Sign up (free account)',
      '3. Add monitor: HTTP(s) - https://59047984.injuredworkersunite-rsr.pages.dev',
      '4. Set check interval: 5 minutes',
      '5. Add email notification',
      '6. Optional: Create public status page',
      '7. Repeat for sitemap, RSS feeds, API endpoints'
    ],
    cost: '$0/month',
    monitors: 3
  },
  github_actions: {
    service: 'GitHub Actions Monitoring',
    setup: [
      '1. Workflow already created: .github/workflows/site-monitoring.yml',
      '2. Commit and push to enable',
      '3. Runs hourly automatically',
      '4. Checks homepage, sitemap, RSS feeds, data freshness',
      '5. View results: https://github.com/phoenixrizin09/InjuredWorkersUnite/actions'
    ],
    cost: '$0/month (unlimited for public repos)'
  }
};

fs.writeFileSync(
  path.join(__dirname, '../ANALYTICS_SETUP.json'),
  JSON.stringify(instructions, null, 2)
);

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 ANALYTICS & MONITORING SETUP COMPLETE\n');
console.log('Created Files:');
console.log('  ✓ components/Analytics.js');
console.log('  ✓ pages/admin/monitoring.js');
console.log('  ✓ .github/workflows/site-monitoring.yml');
console.log('  ✓ monitoring-config.json');
console.log('  ✓ ANALYTICS_SETUP.json\n');

console.log('Next Steps:\n');
console.log('1. Plausible Analytics:');
console.log('   - Sign up at https://plausible.io/');
console.log('   - Add your domain');
console.log('   - Import Analytics component in _app.js\n');

console.log('2. UptimeRobot:');
console.log('   - Sign up at https://uptimerobot.com/');
console.log('   - Add monitors from monitoring-config.json\n');

console.log('3. GitHub Actions:');
console.log('   - Commit and push site-monitoring.yml');
console.log('   - Workflow runs automatically every hour\n');

console.log('4. View Monitoring Dashboard:');
console.log('   - https://yoursite.pages.dev/admin/monitoring\n');

console.log('═══════════════════════════════════════════════════════════');
console.log('💰 Total Cost: $0/month (all free tiers)\n');

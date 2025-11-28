/**
 * SEND DISCORD SUMMARY - The Eye Oracle System
 * 
 * Sends daily summary to Discord channel via webhook
 * 
 * Setup:
 * 1. In Discord: Server Settings → Integrations → Webhooks → New Webhook
 * 2. Copy the Webhook URL
 * 3. Set environment variable: DISCORD_WEBHOOK_URL
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../public/data');
const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

async function sendDiscordMessage(embed) {
  if (!WEBHOOK_URL) {
    console.log('⚠️ Discord webhook not configured - skipping');
    return false;
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: '👁️ THE EYE ORACLE',
        avatar_url: 'https://injuredworkersunite.pages.dev/logo.png',
        embeds: [embed]
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Discord API error: ${response.status} - ${text}`);
    }

    return true;
  } catch (error) {
    console.error('❌ Discord send error:', error.message);
    return false;
  }
}

async function main() {
  console.log('👁️ THE EYE ORACLE - Discord Summary Sender');
  console.log('============================================\n');

  if (!WEBHOOK_URL) {
    console.log('⚠️ Discord webhook not set');
    console.log('   Set DISCORD_WEBHOOK_URL environment variable');
    console.log('   Skipping Discord notification');
    return;
  }

  // Load Eye Oracle reports
  const reportsFile = path.join(DATA_DIR, 'eye-oracle-reports.json');
  let reports;
  
  try {
    reports = JSON.parse(fs.readFileSync(reportsFile, 'utf8'));
  } catch (error) {
    console.error('❌ Could not load reports:', error.message);
    process.exit(1);
  }

  // Get today's report (most recent) - handle both array and object formats
  const todayReport = Array.isArray(reports) ? reports[0] : (reports.reports?.[0] || reports);
  
  if (!todayReport) {
    console.log('⚠️ No reports found');
    return;
  }

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Toronto'
  });

  // Build Discord embed
  const embed = {
    title: todayReport.headline || '👁️ THE EYE ORACLE - Daily Intelligence Report',
    description: todayReport.quirkyIntro || todayReport.tldr || 'The Eye sees all. The Oracle speaks truth.',
    color: 0x667eea, // Purple-ish blue
    timestamp: new Date().toISOString(),
    thumbnail: {
      url: 'https://injuredworkersunite.pages.dev/logo.png'
    },
    fields: [
      {
        name: '📅 Date',
        value: date,
        inline: true
      },
      {
        name: '🚨 Issues Found',
        value: `${todayReport.violationCount || 0} violations`,
        inline: true
      },
      {
        name: '📊 TL;DR',
        value: (todayReport.tldr || 'Check the full report').substring(0, 200),
        inline: false
      }
    ],
    footer: {
      text: '✊ From the ashes, we rise together',
      icon_url: 'https://injuredworkersunite.pages.dev/logo.png'
    }
  };

  // Add top violations if available
  if (todayReport.violations && todayReport.violations.length > 0) {
    const topViolations = todayReport.violations
      .slice(0, 3)
      .map((v, i) => `${i + 1}. **${v.severity?.toUpperCase() || 'ALERT'}**: ${v.title?.substring(0, 80) || 'Issue detected'}`)
      .join('\n');
    
    embed.fields.push({
      name: '🔥 Top Issues Today',
      value: topViolations || 'No critical issues',
      inline: false
    });
  }

  // Add links
  embed.fields.push({
    name: '🔗 Quick Links',
    value: [
      '[👁️ View Full Report](https://injuredworkersunite.pages.dev/eye-oracle-reports)',
      '[🐰 Explore Rabbit Holes](https://injuredworkersunite.pages.dev/the-eye-oracle)',
      '[🚨 Check Alerts](https://injuredworkersunite.pages.dev/alerts)',
      '[📜 Legislative Tracking](https://injuredworkersunite.pages.dev/legislative-tracking)'
    ].join(' • '),
    inline: false
  });

  console.log('📤 Sending Discord summary...\n');
  console.log(`Title: ${embed.title}`);
  console.log(`Description: ${embed.description}`);
  console.log('\n');

  const sent = await sendDiscordMessage(embed);
  
  if (sent) {
    console.log('✅ Discord summary sent successfully!');
  } else {
    console.log('❌ Failed to send Discord summary');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});

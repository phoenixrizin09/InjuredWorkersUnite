/**
 * SEND TELEGRAM SUMMARY - The Eye / Oracle System
 * 
 * Sends daily summary to Telegram channel
 * 
 * Setup:
 * 1. Create bot with @BotFather on Telegram
 * 2. Get your chat ID (use @userinfobot or @getidsbot)
 * 3. Set environment variables:
 *    - TELEGRAM_BOT_TOKEN
 *    - TELEGRAM_CHAT_ID
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../data');
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function escapeMarkdown(text) {
  if (!text) return '';
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

async function sendTelegramMessage(text) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log('⚠️ Telegram not configured - skipping');
    return false;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
        disable_web_page_preview: false,
      }),
    });

    const result = await response.json();
    
    if (!result.ok) {
      throw new Error(result.description || 'Telegram API error');
    }

    return true;
  } catch (error) {
    console.error('❌ Telegram send error:', error.message);
    return false;
  }
}

async function main() {
  console.log('👁️ THE EYE - Telegram Summary Sender');
  console.log('=====================================\n');

  if (!BOT_TOKEN || !CHAT_ID) {
    console.log('⚠️ Telegram credentials not set');
    console.log('   Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables');
    console.log('   Skipping Telegram notification');
    return;
  }

  // Load daily summary
  const summaryFile = path.join(DATA_DIR, 'daily-summary.json');
  let summary;
  
  try {
    summary = JSON.parse(fs.readFileSync(summaryFile, 'utf8'));
  } catch (error) {
    console.error('❌ Could not load daily summary:', error.message);
    process.exit(1);
  }

  // Build message
  const message = `
📊 *THE EYE \\- DAILY SUMMARY*
📅 ${escapeMarkdown(summary.date)}

━━━━━━━━━━━━━━━━━━━━

📈 *New Alerts Today:* ${summary.alerts.new_today}
🚨 *Critical:* ${summary.alerts.by_severity.critical}
🔴 *High:* ${summary.alerts.by_severity.high}
🟠 *Medium:* ${summary.alerts.by_severity.medium}

⚠️ *Unacknowledged:* ${summary.alerts.unacknowledged}

📋 *Cases:*
• Draft: ${summary.cases.draft}
• Under Review: ${summary.cases.underReview}
• Published: ${summary.cases.published}

🎯 *Targets Monitored:* ${summary.targets.total}
   Critical: ${summary.targets.critical}

📡 *Sources Scanned:*
${summary.sources_scanned.map(s => `• ${escapeMarkdown(s)}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━

${summary.top_alert ? `
🔥 *Top Alert:*
${escapeMarkdown(summary.top_alert.title)}
[View Source](${summary.top_alert.source_url || 'https://injuredworkersunite.pages.dev/alerts'})
` : ''}

👁️ *The Eye never sleeps\\.*
🔗 [View Dashboard](https://injuredworkersunite.pages.dev/the-eye-oracle)
🔗 [Admin Panel](https://injuredworkersunite.pages.dev/admin)
  `.trim();

  console.log('📤 Sending Telegram summary...\n');
  console.log(message.replace(/\\/g, '')); // Print without escapes for readability
  console.log('\n');

  const sent = await sendTelegramMessage(message);
  
  if (sent) {
    console.log('✅ Telegram summary sent successfully!');
  } else {
    console.log('❌ Failed to send Telegram summary');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});

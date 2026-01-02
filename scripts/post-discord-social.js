// Posts the daily social pack summary to Discord via webhook.
// Expects DISCORD_WEBHOOK_URL env var.

const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fn }) => fn(...args));

const DATA_DIR = path.join(__dirname, '../public/data');
const PACK_FILE = path.join(DATA_DIR, 'daily-social-pack.json');
const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

function loadPack() {
  if (!fs.existsSync(PACK_FILE)) {
    throw new Error('daily-social-pack.json not found. Run social pack builder first.');
  }
  return JSON.parse(fs.readFileSync(PACK_FILE, 'utf8'));
}

async function postToDiscord(pack) {
  if (!WEBHOOK_URL) {
    console.log('⚠️ DISCORD_WEBHOOK_URL not set; skipping Discord post');
    return;
  }

  const headline = pack.meta?.headline || 'Daily social pack';
  const thread = pack.platforms?.x?.thread || [];
  const intro = thread[0] || headline;
  const link = pack.links?.blog || pack.links?.home || 'https://injuredworkersunite.pages.dev';

  const embed = {
    title: headline,
    description: intro,
    color: 0x0099ff,
    timestamp: new Date().toISOString(),
    fields: [
      {
        name: 'Tone',
        value: pack.tone || 'respectful',
        inline: true
      },
      {
        name: 'X thread length',
        value: `${thread.length} posts`,
        inline: true
      },
      {
        name: 'Links',
        value: `[Blog](${link}) • [Alerts](${pack.links?.alerts || link})`,
        inline: false
      }
    ],
    footer: {
      text: 'Injured Workers Unite — Daily Social Pack'
    }
  };

  const payload = {
    username: '👁️ THE EYE ORACLE',
    avatar_url: 'https://injuredworkersunite.pages.dev/logo.png',
    embeds: [embed]
  };

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Discord webhook failed: ${res.status} ${text}`);
  }

  console.log('✅ Posted social pack summary to Discord');
}

async function main() {
  try {
    const pack = loadPack();
    await postToDiscord(pack);
  } catch (err) {
    console.error('❌ Discord social post failed:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { postToDiscord };

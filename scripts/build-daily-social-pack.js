const fs = require('fs');
const path = require('path');

// Builds a per-platform social pack from the daily viral report + latest blog post.
// Tone defaults to respectful advocacy; set TONE=spicy for edgier copy where allowed.

const DATA_DIR = path.join(__dirname, '../public/data');
const OUTPUT_FILE = path.join(DATA_DIR, 'daily-social-pack.json');

function readJson(file) {
  try {
    const full = path.join(DATA_DIR, file);
    if (!fs.existsSync(full)) return null;
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (err) {
    console.error(`⚠️ Failed to read ${file}:`, err.message);
    return null;
  }
}

function utm(link, source = 'social', medium = 'organic', campaign = 'daily') {
  if (!link) return '';
  const url = new URL(link, 'https://injuredworkersunite.pages.dev');
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', campaign);
  return url.toString();
}

function clamp(text, max) {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + '…';
}

function pickTone() {
  const tone = (process.env.TONE || 'respectful').toLowerCase();
  return tone === 'spicy' ? 'spicy' : 'respectful';
}

function buildXThread(report, blogLink) {
  const parts = [];
  parts.push(clamp(report.headline || 'Daily report', 270));

  const findings = (report.topFindings || []).slice(0, 3);
  findings.forEach((f, idx) => {
    const line = `${idx + 1}) ${clamp(f.finding || f.title || 'Issue', 240)} (${f.severity || 'info'})`;
    parts.push(line);
  });

  const impact = report.summary?.violationsFound
    ? `Findings: ${report.summary.violationsFound} | Critical: ${report.summary.criticalIssues || 0}`
    : null;
  if (impact) parts.push(impact);

  if (blogLink) parts.push(`Full context: ${blogLink}`);

  // Keep to reasonable length for X threads (<=6 posts)
  return parts.slice(0, 6);
}

function buildLinkedInPost(report, blogLink, tone) {
  const opener = tone === 'spicy'
    ? 'Systemic barriers should not be a second injury.'
    : 'Injured workers and disabled people deserve a system that moves as fast as their bills.';
  const headline = report.headline || 'Daily accountability update';
  const key = (report.topFindings || []).slice(0, 2).map(f => `• ${f.finding || f.title || 'Issue'} (${f.severity || 'info'})`).join('\n');
  const cta = blogLink ? `Read more + today’s resource: ${blogLink}` : 'Learn more at injuredworkersunite.pages.dev';

  return [opener, '', headline, key, '', cta].filter(Boolean).join('\n');
}

function buildInstagramCaption(report, blogLink, tone) {
  const opener = tone === 'spicy'
    ? 'Respectful anger, real receipts.'
    : 'Respectful advocacy, real receipts.';
  const finding = clamp(report.topFindings?.[0]?.finding || report.headline || 'Today’s focus', 180);
  const impact = report.summary?.violationsFound
    ? `${report.summary.violationsFound} findings logged. ${report.summary.criticalIssues || 0} need urgent fixes.`
    : '';
  const hashtags = ['#DisabilityJustice', '#WorkersRights', '#Accountability', '#Inclusion'];
  const lines = [opener, finding, impact, blogLink ? `More context: ${blogLink}` : '', hashtags.join(' ')];
  return lines.filter(Boolean).join('\n');
}

function buildPack() {
  const report = readJson('daily-eye-viral-report.json');
  const blogPosts = readJson('blog-posts.json') || [];
  const latestBlog = Array.isArray(blogPosts) ? blogPosts[0] : null;
  const tone = pickTone();

  if (!report) {
    throw new Error('daily-eye-viral-report.json not found; cannot build social pack');
  }

  const blogLink = latestBlog ? utm(latestBlog.ctaLink || '/blog', 'social', 'organic', 'daily_blog') : utm('/blog', 'social', 'organic', 'daily_blog');
  const alertsLink = utm('/alerts', 'social', 'organic', 'daily_alerts');

  const pack = {
    generatedAt: new Date().toISOString(),
    tone,
    sourceDate: report.meta?.date || new Date().toISOString().split('T')[0],
    links: {
      blog: blogLink,
      alerts: alertsLink,
      home: utm('/', 'social', 'organic', 'daily_home')
    },
    platforms: {
      x: {
        thread: buildXThread(report, blogLink)
      },
      linkedin: {
        post: buildLinkedInPost(report, blogLink, tone)
      },
      instagram: {
        caption: buildInstagramCaption(report, blogLink, tone)
      }
    },
    meta: {
      headline: report.headline || 'Daily report',
      primaryFinding: report.topFindings?.[0]?.finding || null
    }
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(pack, null, 2));
  console.log(`✅ Daily social pack generated → ${OUTPUT_FILE}`);
  console.log(`Tone: ${tone}`);
  console.log(`X posts: ${pack.platforms.x.thread.length}`);
}

if (require.main === module) {
  try {
    buildPack();
  } catch (err) {
    console.error('❌ Failed to build social pack:', err.message);
    process.exit(1);
  }
}

module.exports = { buildPack };

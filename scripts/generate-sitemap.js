#!/usr/bin/env node

/**
 * GENERATE DYNAMIC SITEMAP
 * 
 * Creates sitemap.xml from actual pages and data files
 * Updates lastmod dates automatically
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const PAGES_DIR = path.join(__dirname, '../pages');
const BASE_URL = 'https://injuredworkersunite.pages.dev';

// Get all page files
function getPages() {
  const pages = [];
  const files = fs.readdirSync(PAGES_DIR);
  
  files.forEach(file => {
    if (file.endsWith('.js') && !file.startsWith('_') && !file.startsWith('api')) {
      const route = file === 'index.js' ? '' : file.replace('.js', '');
      const stats = fs.statSync(path.join(PAGES_DIR, file));
      
      pages.push({
        route,
        lastmod: stats.mtime.toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: route === '' ? 1.0 : 0.8
      });
    }
  });
  
  // Add admin pages
  const adminDir = path.join(PAGES_DIR, 'admin');
  if (fs.existsSync(adminDir)) {
    const adminFiles = fs.readdirSync(adminDir);
    adminFiles.forEach(file => {
      if (file.endsWith('.js')) {
        pages.push({
          route: `admin/${file.replace('.js', '')}`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: 0.5
        });
      }
    });
  }
  
  return pages;
}

// Get blog posts
function getBlogPosts() {
  const blogFile = path.join(PUBLIC_DIR, 'data/blog-posts.json');
  if (!fs.existsSync(blogFile)) return [];
  
  try {
    const posts = JSON.parse(fs.readFileSync(blogFile, 'utf8'));
    return posts.slice(0, 50).map(post => ({
      route: `blog/${post.id}`,
      lastmod: post.date,
      changefreq: 'monthly',
      priority: 0.7
    }));
  } catch (error) {
    return [];
  }
}

// Generate XML sitemap
function generateSitemap(pages, blogPosts) {
  const now = new Date().toISOString().split('T')[0];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
${pages.map(page => `  <url>
    <loc>${BASE_URL}/${page.route}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}

  <!-- Blog Posts -->
${blogPosts.map(post => `  <url>
    <loc>${BASE_URL}/${post.route}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>${post.changefreq}</changefreq>
    <priority>${post.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
}

// Main
function main() {
  console.log('🗺️  Generating dynamic sitemap...\n');
  
  const pages = getPages();
  const blogPosts = getBlogPosts();
  
  console.log(`   Found ${pages.length} pages`);
  console.log(`   Found ${blogPosts.length} blog posts`);
  
  const sitemap = generateSitemap(pages, blogPosts);
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`\n✅ Sitemap generated: ${sitemapPath}`);
  console.log(`   Total URLs: ${pages.length + blogPosts.length}\n`);
}

if (require.main === module) {
  main();
}

module.exports = { main };

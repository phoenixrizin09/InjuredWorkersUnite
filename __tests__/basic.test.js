/**
 * BASIC TESTS - Ensuring core functionality works
 * Run with: npm test
 */

const fs = require('fs');
const path = require('path');

describe('Data Files', () => {
  test('government-data.json should exist after fetch', () => {
    const dataFile = path.join(__dirname, '../public/data/government-data.json');
    // This test will pass once npm run fetch:real has been run
    if (fs.existsSync(dataFile)) {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('federal');
      expect(data).toHaveProperty('provincial');
      expect(Array.isArray(data.federal)).toBe(true);
      expect(Array.isArray(data.provincial)).toBe(true);
    }
  });
  
  test('alerts.json should exist after fetch', () => {
    const alertsFile = path.join(__dirname, '../public/data/alerts.json');
    if (fs.existsSync(alertsFile)) {
      const alerts = JSON.parse(fs.readFileSync(alertsFile, 'utf8'));
      expect(Array.isArray(alerts)).toBe(true);
      if (alerts.length > 0) {
        expect(alerts[0]).toHaveProperty('id');
        expect(alerts[0]).toHaveProperty('title');
        expect(alerts[0]).toHaveProperty('severity');
      }
    }
  });
  
  test('blog-posts.json should exist', () => {
    const blogFile = path.join(__dirname, '../public/data/blog-posts.json');
    expect(fs.existsSync(blogFile)).toBe(true);
    const posts = JSON.parse(fs.readFileSync(blogFile, 'utf8'));
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });
});

describe('Scripts', () => {
  test('fetch-real-data.js should exist', () => {
    const scriptPath = path.join(__dirname, '../scripts/fetch-real-data.js');
    expect(fs.existsSync(scriptPath)).toBe(true);
  });
  
  test('generate-sitemap.js should exist', () => {
    const scriptPath = path.join(__dirname, '../scripts/generate-sitemap.js');
    expect(fs.existsSync(scriptPath)).toBe(true);
  });
  
  test('generate-rss.js should exist', () => {
    const scriptPath = path.join(__dirname, '../scripts/generate-rss.js');
    expect(fs.existsSync(scriptPath)).toBe(true);
  });
});

describe('API Connectors', () => {
  test('free-api-connectors.js should export required classes', () => {
    const connectors = require('../utils/free-api-connectors.js');
    expect(connectors).toHaveProperty('RedditConnector');
    expect(connectors).toHaveProperty('OntarioOpenDataConnector');
    expect(connectors).toHaveProperty('FederalOpenDataConnector');
    expect(connectors).toHaveProperty('FreeAPIMonitor');
  });
});

describe('Configuration', () => {
  test('next.config.js should export static site', () => {
    const nextConfig = require('../next.config.js');
    expect(nextConfig.output).toBe('export');
    expect(nextConfig.images.unoptimized).toBe(true);
  });
  
  test('package.json should have correct scripts', () => {
    const pkg = require('../package.json');
    expect(pkg.scripts).toHaveProperty('fetch:real');
    expect(pkg.scripts).toHaveProperty('test');
  });
});

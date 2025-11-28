/**
 * SCAN GOVERNMENT DATA - The Eye / Oracle System
 * 
 * Scans Open Government Canada and Ontario Open Data for relevant updates
 * Run via GitHub Actions or manually
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Topics to monitor
const TOPICS = [
  'WSIB',
  'workers compensation', 
  'workplace injury',
  'ODSP',
  'disability support',
  'disability benefits',
  'mental health workplace',
  'injured workers',
  'occupational disease',
  'long-term care',
  'social assistance',
];

async function searchOpenCanada(query) {
  try {
    const params = new URLSearchParams({
      q: query,
      rows: 20,
      sort: 'metadata_modified desc',
    });

    const response = await fetch(
      `https://open.canada.ca/data/api/3/action/package_search?${params}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      return [];
    }

    return data.result.results.map(dataset => ({
      id: dataset.id,
      title: dataset.title,
      description: dataset.notes || '',
      organization: dataset.organization?.title || 'Unknown',
      lastModified: dataset.metadata_modified,
      created: dataset.metadata_created,
      tags: (dataset.tags || []).map(t => t.name),
      source: 'open.canada.ca',
      sourceUrl: `https://open.canada.ca/data/en/dataset/${dataset.id}`,
    }));
  } catch (error) {
    console.error(`Error searching for "${query}":`, error.message);
    return [];
  }
}

async function searchOntarioData(query) {
  try {
    const params = new URLSearchParams({
      q: query,
      rows: 20,
    });

    const response = await fetch(
      `https://data.ontario.ca/api/3/action/package_search?${params}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      return [];
    }

    return data.result.results.map(dataset => ({
      id: dataset.id,
      title: dataset.title,
      description: dataset.notes || '',
      organization: dataset.organization?.title || 'Ontario Government',
      lastModified: dataset.metadata_modified,
      source: 'data.ontario.ca',
      sourceUrl: `https://data.ontario.ca/dataset/${dataset.id}`,
    }));
  } catch (error) {
    console.error(`Error searching Ontario data for "${query}":`, error.message);
    return [];
  }
}

async function main() {
  console.log('👁️ THE EYE - Government Data Scanner');
  console.log('=====================================\n');
  console.log(`📅 Scan started: ${new Date().toISOString()}`);
  console.log(`📂 Data directory: ${DATA_DIR}\n`);

  const allResults = {
    timestamp: new Date().toISOString(),
    federal: [],
    provincial: [],
    topics_scanned: TOPICS,
  };

  // Scan Open Canada
  console.log('🇨🇦 Scanning Open Government Canada...');
  for (const topic of TOPICS) {
    console.log(`   Searching: ${topic}`);
    const results = await searchOpenCanada(topic);
    allResults.federal.push(...results);
    
    // Rate limiting
    await new Promise(r => setTimeout(r, 500));
  }

  // Remove duplicates
  const seenFederal = new Set();
  allResults.federal = allResults.federal.filter(item => {
    if (seenFederal.has(item.id)) return false;
    seenFederal.add(item.id);
    return true;
  });
  console.log(`   Found ${allResults.federal.length} unique datasets\n`);

  // Scan Ontario
  console.log('🏛️ Scanning Ontario Open Data...');
  for (const topic of TOPICS.slice(0, 5)) { // Fewer topics for Ontario
    console.log(`   Searching: ${topic}`);
    const results = await searchOntarioData(topic);
    allResults.provincial.push(...results);
    
    await new Promise(r => setTimeout(r, 500));
  }

  // Remove duplicates
  const seenProvincial = new Set();
  allResults.provincial = allResults.provincial.filter(item => {
    if (seenProvincial.has(item.id)) return false;
    seenProvincial.add(item.id);
    return true;
  });
  console.log(`   Found ${allResults.provincial.length} unique datasets\n`);

  // Load previous results to detect changes
  const previousFile = path.join(DATA_DIR, 'government-data.json');
  let previousResults = { federal: [], provincial: [] };
  try {
    if (fs.existsSync(previousFile)) {
      previousResults = JSON.parse(fs.readFileSync(previousFile, 'utf8'));
    }
  } catch (e) {
    console.log('   No previous scan data found');
  }

  // Detect new/updated datasets
  const previousIds = new Set([
    ...previousResults.federal.map(d => d.id),
    ...previousResults.provincial.map(d => d.id),
  ]);

  const newDatasets = [
    ...allResults.federal.filter(d => !previousIds.has(d.id)),
    ...allResults.provincial.filter(d => !previousIds.has(d.id)),
  ];

  console.log(`📊 Summary:`);
  console.log(`   Federal datasets: ${allResults.federal.length}`);
  console.log(`   Provincial datasets: ${allResults.provincial.length}`);
  console.log(`   New since last scan: ${newDatasets.length}`);

  // Save results
  fs.writeFileSync(previousFile, JSON.stringify(allResults, null, 2));
  console.log(`\n💾 Results saved to ${previousFile}`);

  // If there are new datasets, create alerts
  if (newDatasets.length > 0) {
    console.log('\n🚨 New datasets detected - creating alerts...');
    
    const alertsFile = path.join(DATA_DIR, 'alerts.json');
    let alerts = [];
    try {
      if (fs.existsSync(alertsFile)) {
        alerts = JSON.parse(fs.readFileSync(alertsFile, 'utf8'));
      }
    } catch (e) {}

    for (const dataset of newDatasets.slice(0, 10)) { // Limit to 10 alerts
      alerts.unshift({
        id: `GOV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: `New Government Data: ${dataset.title}`,
        message: dataset.description.substring(0, 300),
        severity: 'medium',
        category: 'government_data',
        scope: dataset.source.includes('canada') ? 'federal' : 'provincial',
        source: dataset.organization,
        source_url: dataset.sourceUrl,
        verified: true,
        acknowledged: false,
        created_at: new Date().toISOString(),
      });
    }

    // Keep last 500 alerts
    alerts = alerts.slice(0, 500);
    fs.writeFileSync(alertsFile, JSON.stringify(alerts, null, 2));
    console.log(`   Created ${Math.min(newDatasets.length, 10)} alerts`);
  }

  console.log('\n✅ Government data scan complete!');
}

main().catch(error => {
  console.error('❌ Scan failed:', error);
  process.exit(1);
});

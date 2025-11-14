const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

async function generateReport() {
  console.log('📊 Generating monitoring summary report...');
  
  try {
    const files = await fs.readdir(DATA_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    const summary = {
      generatedAt: new Date().toISOString(),
      sources: []
    };
    
    for (const file of jsonFiles) {
      const data = JSON.parse(await fs.readFile(path.join(DATA_DIR, file), 'utf8'));
      const source = file.replace('.json', '').replace(/-/g, ' ');
      
      summary.sources.push({
        name: source,
        recordCount: Array.isArray(data) ? data.length : 1,
        lastUpdate: data.scannedAt || data.lastChecked || 'unknown'
      });
    }
    
    console.log(`✅ Report generated for ${summary.sources.length} sources`);
    
    // Save report
    const reportFile = path.join(DATA_DIR, 'daily-summary.json');
    await fs.writeFile(reportFile, JSON.stringify(summary, null, 2));
    
  } catch (error) {
    console.error('❌ Error generating report:', error.message);
    throw error;
  }
}



generateReport().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

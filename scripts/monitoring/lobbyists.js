const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/lobbyist-registry.json');

async function monitorLobbyists() {
  console.log('👁️ Monitoring Lobbyist Registry...');
  
  try {
    // Ontario Lobbyist Registry is searchable online
    // Federal registry: https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/guest
    
    // For demonstration, we'll track known entities
    const watchlist = [
      'Insurance Bureau of Canada',
      'Canadian Life and Health Insurance Association',
      'Fraser Institute',
      'C.D. Howe Institute'
    ];
    
    const data = {
      lastChecked: new Date().toISOString(),
      watchlist: watchlist,
      note: 'Check https://www.oico.on.ca/home/lobbyist-registry manually for new registrations',
      reminderSent: true
    };
    
    console.log(`✅ Monitoring ${watchlist.length} entities`);
    
    // Save data
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    console.log('💾 Data saved');
    console.log('ℹ️  Check lobbyist registry: https://www.oico.on.ca/home/lobbyist-registry');
    
  } catch (error) {
    console.error('❌ Error monitoring lobbyists:', error.message);
    throw error;
  }
}



monitorLobbyists().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

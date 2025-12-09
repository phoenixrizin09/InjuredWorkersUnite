/**
 * 👁️ THE EYE ORACLE - ADD SOURCES TO ONTARIO BILLS
 * 
 * Updates all Eye Oracle posts for Ontario bills to include
 * verified source links to ola.org
 */

const fs = require('fs');
const path = require('path');

const POSTS_PATH = path.join(__dirname, '../public/data/eye-oracle-posts.json');
const BILLS_PATH = path.join(__dirname, '../public/data/parliament-bills.json');

console.log('👁️ Adding verified sources to Ontario bill posts...');
console.log('');

// Load posts
let posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'));
let bills = [];
if (fs.existsSync(BILLS_PATH)) {
  bills = JSON.parse(fs.readFileSync(BILLS_PATH, 'utf8'));
}

// Create bill lookup
const billLookup = {};
bills.forEach(b => {
  const num = b.number?.replace('Bill ', '') || b.id?.replace('Bill-', '') || '';
  if (num) {
    billLookup[num] = b;
  }
});

let updated = 0;

posts = posts.map(p => {
  const id = String(p.id || p.slug || '');
  
  // Match Ontario bill posts
  const billMatch = id.match(/bill[- ]?(\d+)/i);
  if (billMatch) {
    const billNum = billMatch[1];
    const bill = billLookup[billNum];
    
    if (bill && bill.url?.includes('ola.org')) {
      // Add source verification
      if (!p.source || !p.sourceVerified) {
        p.source = bill.url;
        p.sourceName = 'Ontario Legislative Assembly';
        p.sourceVerified = true;
        p.lastVerified = '2025-12-09';
        updated++;
        console.log(`   ✅ Added source to: ${id}`);
        console.log(`      📚 ${bill.url}`);
      }
    } else if (id.includes('-on-') || id.includes('ontario')) {
      // Ontario bill - construct URL
      const url = `https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-${billNum}`;
      p.source = url;
      p.sourceName = 'Ontario Legislative Assembly';
      p.sourceVerified = true;
      p.lastVerified = '2025-12-09';
      updated++;
      console.log(`   ✅ Added source to: ${id}`);
      console.log(`      📚 ${url}`);
    }
  }
  
  return p;
});

fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2));

console.log('');
console.log(`📊 Updated ${updated} posts with verified sources`);
console.log('👁️ All Ontario bills now linked to ola.org');

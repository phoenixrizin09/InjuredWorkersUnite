/**
 * Meme Alt Text Generator - AI Vision Analysis
 * Uses Hugging Face BLIP model to analyze actual image content
 * 
 * Usage: node scripts/generate-meme-alt-text-ai.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const HF_API_TOKEN = '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';
const HF_API_URL = 'https://router.huggingface.co/hf-inference/models/Salesforce/blip-image-captioning-large';

const MEMES_DIR = path.join(__dirname, '..', 'public', 'memes');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'data', 'meme-catalog.json');
const PROGRESS_FILE = path.join(__dirname, '..', 'public', 'data', 'meme-progress.json');

const BATCH_SIZE = 10;
const DELAY_BETWEEN_REQUESTS = 1000; // 1 second between API calls to avoid rate limiting

// Category detection based on alt text content
function detectCategory(altText, filename) {
  const text = (altText + ' ' + filename).toLowerCase();
  
  // WSIB / Insurance
  if (text.match(/wsib|wcb|insurance|compensation|claim|benefit/)) return 'WSIB';
  
  // Political / Legislative
  if (text.match(/bill|legislature|government|minister|parliament|politician|vote|law|policy|ford|liberal|conservative|ndp/)) return 'Political';
  
  // Medical
  if (text.match(/doctor|medical|hospital|injury|pain|disability|health|ime|diagnosis|treatment/)) return 'Medical';
  
  // Protest / Action
  if (text.match(/protest|rally|march|sign|banner|demonstration|picket|strike|stop|fight|justice/)) return 'Activism';
  
  // Meme formats
  if (text.match(/text|meme|caption|says|comic|cartoon|poster/)) return 'Meme';
  
  // Solidarity
  if (text.match(/solidarity|together|unite|union|workers|support|community/)) return 'Solidarity';
  
  // Financial
  if (text.match(/money|pay|debt|bills|rent|afford|surplus|budget/)) return 'Financial';
  
  // Emotional / Personal
  if (text.match(/sad|angry|frustrat|stress|depress|anxious|hope|struggle/)) return 'Personal';
  
  return 'General';
}

// Enhance the AI caption for accessibility
function enhanceAltText(caption, filename) {
  // Clean up AI output
  let enhanced = caption
    .replace(/^arafed?\s*/i, '') // Remove BLIP artifacts
    .replace(/^there is\s*/i, '')
    .replace(/^a\s+/i, 'A ')
    .trim();
  
  // Capitalize first letter
  if (enhanced.length > 0) {
    enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);
  }
  
  // Add context if it seems like a meme/advocacy image
  const lowerCaption = enhanced.toLowerCase();
  if (!lowerCaption.includes('meme') && 
      !lowerCaption.includes('injured') && 
      !lowerCaption.includes('worker') &&
      !lowerCaption.includes('wsib')) {
    // Add context hint
    enhanced = `${enhanced} - Injured workers advocacy content`;
  }
  
  return enhanced;
}

async function analyzeImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64 = imageBuffer.toString('base64');
  
  const response = await fetch(HF_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: base64,
      parameters: {
        max_new_tokens: 100
      }
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }
  
  const result = await response.json();
  
  // Handle different response formats
  if (Array.isArray(result) && result[0]?.generated_text) {
    return result[0].generated_text;
  } else if (result.generated_text) {
    return result.generated_text;
  } else if (typeof result === 'string') {
    return result;
  }
  
  throw new Error('Unexpected API response format');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateMemeId(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
}

// Load progress if exists
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    } catch (e) {
      return { processed: {}, lastIndex: 0 };
    }
  }
  return { processed: {}, lastIndex: 0 };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function main() {
  console.log('🤖 MEME ALT TEXT GENERATOR - AI VISION');
  console.log('======================================');
  console.log('📸 Using Hugging Face BLIP model for image analysis\n');

  if (!fs.existsSync(MEMES_DIR)) {
    console.error('❌ Memes directory not found:', MEMES_DIR);
    process.exit(1);
  }

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get all image files
  const files = fs.readdirSync(MEMES_DIR)
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .sort();

  console.log(`📁 Found ${files.length} memes to analyze\n`);

  // Load any existing progress
  const progress = loadProgress();
  
  let catalog = { 
    memes: [], 
    lastUpdated: null, 
    stats: {},
    generatedBy: 'huggingface-blip-vision',
    version: '3.0'
  };

  let processed = 0;
  let errors = 0;
  const categoryCount = {};

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const imagePath = path.join(MEMES_DIR, filename);
    
    let altText = '';
    let category = 'General';

    // Check if already processed in previous run
    if (progress.processed[filename]) {
      altText = progress.processed[filename].altText;
      category = progress.processed[filename].category;
      console.log(`  ⏭️  Skipping (cached): ${filename}`);
    } else {
      try {
        console.log(`  🔍 Analyzing: ${filename}...`);
        
        const rawCaption = await analyzeImage(imagePath);
        altText = enhanceAltText(rawCaption, filename);
        category = detectCategory(altText, filename);
        
        // Cache this result
        progress.processed[filename] = { altText, category };
        
        console.log(`     ✅ "${altText.substring(0, 60)}..."`);
        
        // Rate limiting
        await sleep(DELAY_BETWEEN_REQUESTS);
        
      } catch (error) {
        console.log(`     ⚠️  Error: ${error.message}`);
        errors++;
        
        // Use fallback alt text
        altText = `Injured workers advocacy meme - ${filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}`;
        category = 'General';
        
        // Still cache the fallback
        progress.processed[filename] = { altText, category, error: true };
      }
    }

    // Get file stats
    const stats = fs.statSync(imagePath);

    catalog.memes.push({
      id: generateMemeId(filename),
      filename: filename,
      path: `/memes/${filename}`,
      altText: altText,
      category: category,
      dateAdded: stats.birthtime.toISOString(),
      fileSize: stats.size,
    });

    processed++;
    categoryCount[category] = (categoryCount[category] || 0) + 1;

    // Save progress periodically
    if (processed % BATCH_SIZE === 0) {
      saveProgress(progress);
      console.log(`\n  📊 Progress: ${processed}/${files.length} memes analyzed\n`);
    }
  }

  // Final save
  catalog.lastUpdated = new Date().toISOString();
  catalog.stats = {
    total: catalog.memes.length,
    categories: Object.keys(categoryCount).sort(),
    byCategory: categoryCount,
    analyzedWithAI: processed - errors,
    fallbackUsed: errors
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2));
  saveProgress(progress);

  console.log('\n======================================');
  console.log('🎉 COMPLETE!');
  console.log(`📊 Processed: ${processed} memes`);
  console.log(`✅ AI analyzed: ${processed - errors}`);
  console.log(`⚠️  Fallback used: ${errors}`);
  console.log(`📁 Catalog saved to: ${OUTPUT_FILE}`);
  
  console.log('\n📈 Category breakdown:');
  const sortedCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1]);
  
  for (const [cat, count] of sortedCategories) {
    const bar = '█'.repeat(Math.ceil(count / 5));
    console.log(`  ${cat.padEnd(12)} ${count.toString().padStart(3)} ${bar}`);
  }
  
  console.log('\n✨ AI-powered alt text generated!');
  console.log('📌 Next: Run "npm run build" to update the meme gallery');
}

main().catch(console.error);

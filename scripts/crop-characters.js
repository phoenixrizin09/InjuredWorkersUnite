/**
 * Character Cropping Script
 * Crops individual heroes and villains from squad images
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');
const charactersDir = path.join(publicDir, 'characters');

// Create characters directory if it doesn't exist
if (!fs.existsSync(charactersDir)) {
  fs.mkdirSync(charactersDir, { recursive: true });
}

// Hero positions (percentages of image dimensions)
const heroImagePositions = {
  'captain-truth': { 
    label: 'Captain Truth-Teller', 
    cropX: 0, cropY: 0.08, cropW: 0.5, cropH: 0.45
  },
  'sergeant-solidarity': { 
    label: 'Sergeant Solidarity', 
    cropX: 0.5, cropY: 0.08, cropW: 0.5, cropH: 0.45
  },
  'major-accessibility': { 
    label: 'Major Accessibility', 
    cropX: 0, cropY: 0.5, cropW: 0.33, cropH: 0.5
  },
  'corporal-care': { 
    label: 'Corporal Care', 
    cropX: 0.33, cropY: 0.5, cropW: 0.34, cropH: 0.5
  },
  'pfc-receipts': { 
    label: 'Private First Class Receipts', 
    cropX: 0.67, cropY: 0.5, cropW: 0.33, cropH: 0.5
  }
};

// Villain positions (percentages of image dimensions)
// Image is 1024x1536 - 4 villains in 2x2 grid layout
const villainImagePositions = {
  'delayla': { 
    label: 'Case Manager Delayla', 
    cropX: 0.0, cropY: 0.05, cropW: 0.5, cropH: 0.45
  },
  'no-evidence': { 
    label: 'Mr. No Evidence Required', 
    cropX: 0.5, cropY: 0.05, cropW: 0.5, cropH: 0.45
  },
  'doctor-files': { 
    label: 'Dr. Who Never Reads Files', 
    cropX: 0.0, cropY: 0.5, cropW: 0.5, cropH: 0.45
  },
  'hr-ninja': { 
    label: 'HR Ninja Vanish', 
    cropX: 0.5, cropY: 0.5, cropW: 0.5, cropH: 0.45
  }
};

async function cropCharacters() {
  console.log('🎨 Starting character cropping...\n');

  // Crop heroes from superheroes.png
  const heroesPath = path.join(publicDir, 'superheroes.png');
  if (fs.existsSync(heroesPath)) {
    console.log('📦 Processing superheroes.png...');
    const heroMetadata = await sharp(heroesPath).metadata();
    const heroWidth = heroMetadata.width;
    const heroHeight = heroMetadata.height;
    console.log(`   Image size: ${heroWidth}x${heroHeight}`);

    for (const [id, pos] of Object.entries(heroImagePositions)) {
      const left = Math.round(pos.cropX * heroWidth);
      const top = Math.round(pos.cropY * heroHeight);
      const width = Math.round(pos.cropW * heroWidth);
      const height = Math.round(pos.cropH * heroHeight);

      const outputPath = path.join(charactersDir, `hero-${id}.png`);
      
      try {
        await sharp(heroesPath)
          .extract({ left, top, width, height })
          .toFile(outputPath);
        console.log(`   ✅ Cropped: ${pos.label} -> hero-${id}.png`);
      } catch (err) {
        console.log(`   ❌ Failed: ${pos.label} - ${err.message}`);
      }
    }
  } else {
    console.log('❌ superheroes.png not found!');
  }

  console.log('');

  // Crop villains from denialsquad.png
  const villainsPath = path.join(publicDir, 'denialsquad.png');
  if (fs.existsSync(villainsPath)) {
    console.log('📦 Processing denialsquad.png...');
    const villainMetadata = await sharp(villainsPath).metadata();
    const villainWidth = villainMetadata.width;
    const villainHeight = villainMetadata.height;
    console.log(`   Image size: ${villainWidth}x${villainHeight}`);

    for (const [id, pos] of Object.entries(villainImagePositions)) {
      const left = Math.round(pos.cropX * villainWidth);
      const top = Math.round(pos.cropY * villainHeight);
      const width = Math.round(pos.cropW * villainWidth);
      const height = Math.round(pos.cropH * villainHeight);

      const outputPath = path.join(charactersDir, `villain-${id}.png`);
      
      try {
        await sharp(villainsPath)
          .extract({ left, top, width, height })
          .toFile(outputPath);
        console.log(`   ✅ Cropped: ${pos.label} -> villain-${id}.png`);
      } catch (err) {
        console.log(`   ❌ Failed: ${pos.label} - ${err.message}`);
      }
    }
  } else {
    console.log('❌ denialsquad.png not found!');
  }

  console.log('\n🎉 Character cropping complete!');
  console.log(`📁 Files saved to: ${charactersDir}`);
}

cropCharacters().catch(console.error);

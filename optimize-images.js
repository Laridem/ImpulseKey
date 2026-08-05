const fs = require('fs');
const path = require('path');

// Simple image optimization script using Node.js built-in modules
// Since we don't have sharp or other tools, we'll copy and prepare for manual optimization

const sourceDir = 'app/public/assets/result-cards';
const targetDir = 'app/public/assets/result-cards-webp';

// Create target directory
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// List all PNG files
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'));

console.log('Found PNG files:', files);
console.log('\nSince automatic conversion failed, please use one of these options:');
console.log('\n1. Online tool (TinyPNG): https://tinypng.com/');
console.log('   - Upload all 16 PNG files');
console.log('   - Download optimized versions');
console.log('   - Replace files in app/public/assets/result-cards/');
console.log('\n2. Squoosh Web App: https://squoosh.app/');
console.log('   - Upload each file');
console.log('   - Choose WebP format with quality 80');
console.log('   - Download to app/public/assets/result-cards-webp/');
console.log('\n3. If you have Photoshop/Figma:');
console.log('   - Export as WebP or optimized PNG');
console.log('\nFiles to optimize:');
files.forEach(f => {
  const stats = fs.statSync(path.join(sourceDir, f));
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`   - ${f} (${sizeMB} MB)`);
});

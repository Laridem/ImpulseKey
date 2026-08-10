/**
 * Generate all 16 result PNGs automatically
 *
 * This script opens each result page in a headless browser,
 * waits for it to load, and clicks the "Save as Image" button
 * to generate the PNG export.
 *
 * Usage: node generate-results.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const RESULT_KEYS = [
  'A11Y', 'AGENT', 'API', 'BTP', 'CORE', 'CTRL',
  'FIORI', 'FIRE', 'JOULE', 'LOGS', 'OData', 'PIXEL',
  'QAQ', 'SAFE', 'TRIO', 'VOC'
];

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.join(__dirname, 'generated-results');

async function generateResultPNG(browser, resultKey) {
  console.log(`\n📸 Generating ${resultKey}...`);

  const page = await browser.newPage();

  // Set viewport to desktop size for consistent results
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Navigate to result page
    const url = `${BASE_URL}/result/${resultKey}`;
    console.log(`   → Opening ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for the page to fully render
    await page.waitForSelector('button', { timeout: 10000 });
    console.log('   → Page loaded');

    // Find and click the "Save as Image" button
    // Look for the button with the save text
    const saveButton = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.find(btn =>
        btn.textContent.includes('SAVE AS IMAGE') ||
        btn.textContent.includes('Save as Image') ||
        btn.textContent.includes('保存为图片')
      );
    });

    if (!saveButton) {
      throw new Error('Save button not found');
    }

    console.log('   → Clicking Save as Image button...');

    // Set up download handling
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: OUTPUT_DIR
    });

    // Click the button
    await page.click('button');

    // Wait for the export to complete (watch for console logs)
    await page.waitForTimeout(10000); // Wait 10 seconds for export

    console.log(`   ✅ ${resultKey} generated!`);

  } catch (error) {
    console.error(`   ❌ Error generating ${resultKey}:`, error.message);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('🚀 Starting PNG generation for all 16 results...');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('✅ Created output directory');
  }

  // Check if dev server is running
  console.log('\n⚠️  Make sure the dev server is running at http://localhost:5173');
  console.log('   Run: npm run dev\n');

  // Launch browser
  const browser = await puppeteer.launch({
    headless: false, // Set to false to see what's happening
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });

  console.log('✅ Browser launched');

  // Generate each result PNG sequentially
  for (const key of RESULT_KEYS) {
    await generateResultPNG(browser, key);
    // Small delay between results
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  await browser.close();
  console.log('\n✅ All done! Check the generated-results folder.');
}

main().catch(console.error);

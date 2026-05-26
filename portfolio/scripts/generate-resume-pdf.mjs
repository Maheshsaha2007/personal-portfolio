/**
 * Generates Mahesh_Saha_Resume.pdf from the HTML resume.
 * Run: node scripts/generate-resume-pdf.mjs
 */
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'public', 'assets', 'Mahesh_Saha_Resume.html');
const pdfPath = path.join(root, 'public', 'assets', 'Mahesh_Saha_Resume.pdf');

async function main() {
  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.log('Puppeteer not installed. Run: npm install -D puppeteer');
    console.log('Or open public/assets/Mahesh_Saha_Resume.html → Print → Save as PDF');
    process.exit(1);
  }

  const html = await readFile(htmlPath, 'utf-8');
  const browser = await puppeteer.default.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
  });
  await browser.close();
  console.log('Created:', pdfPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

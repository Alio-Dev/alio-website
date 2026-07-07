// Generate a branded 1200x630 Open Graph image at public/og-image.png.
// Uses the icon-only mark (Alio.svg's wordmark relies on a font not present
// during SVG rasterization) plus system-font text. Run: node scripts/generate-og.mjs
import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const W = 1200;
const H = 630;

const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#07B7D1"/>
      <stop offset="100%" stop-color="#2B3990"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="url(#brand)"/>
  <text x="${W / 2}" y="430" text-anchor="middle"
        font-family="Segoe UI, Helvetica, Arial, sans-serif" font-weight="700"
        font-size="76" fill="#12141D" letter-spacing="-1">Alio Analytics</text>
  <text x="${W / 2}" y="490" text-anchor="middle"
        font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="30" fill="#565E72">Clarity from complexity · Built in Angola, engineered for the world</text>
</svg>`);

const ICON_W = 190;
const icon = await sharp(join(pub, 'brand', 'alio-icon.svg'), { density: 300 })
  .resize({ width: ICON_W })
  .png()
  .toBuffer();

await sharp(bg)
  .composite([{ input: icon, top: 150, left: Math.round((W - ICON_W) / 2) }])
  .png()
  .toFile(join(pub, 'og-image.png'));

console.log('Wrote public/og-image.png (1200x630)');

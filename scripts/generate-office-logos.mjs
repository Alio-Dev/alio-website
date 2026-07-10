// Rasterize the installed brand icon/logo SVGs to transparent PNGs at print
// resolution, for embedding into the editable Office templates (docx/pptx/xlsx).
// Run: node scripts/generate-office-logos.mjs
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'assets', 'office-logos');
mkdirSync(OUT, { recursive: true });

const JOBS = [
  { src: 'public/brand/alio-icon-navy.svg', out: 'alio-icon-navy', width: 600 },
  { src: 'public/brand/alio-icon-white.svg', out: 'alio-icon-white', width: 600 },
  { src: 'public/brand/alio-icon.svg', out: 'alio-icon-gradient', width: 600 },
  { src: 'public/Alio.svg', out: 'alio-logo-full', width: 900 },
];

for (const job of JOBS) {
  const svg = readFileSync(join(root, job.src), 'utf8');
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: job.width }, background: 'rgba(0,0,0,0)' });
  writeFileSync(join(OUT, `${job.out}.png`), r.render().asPng());
  console.log('  ✓', job.out + '.png');
}
console.log('Done ->', OUT);

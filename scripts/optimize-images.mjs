// Generate optimized WebP versions of the raster images in /public.
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const RASTER = new Set(['.png', '.jpg', '.jpeg']);
// Cap very large full-bleed images; logos/screens keep their own size.
const MAX_WIDTH = 1920;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (RASTER.has(extname(entry.name).toLowerCase())) out.push(p);
  }
  return out;
}

const files = await walk(root);
let before = 0;
let after = 0;
for (const file of files) {
  const outPath = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const img = sharp(file);
  const meta = await img.metadata();
  const pipeline = meta.width && meta.width > MAX_WIDTH ? img.resize({ width: MAX_WIDTH }) : img;
  await pipeline.webp({ quality: 80, effort: 5 }).toFile(outPath);
  const [a, b] = await Promise.all([stat(file), stat(outPath)]);
  before += a.size;
  after += b.size;
  const rel = file.slice(root.length + 1);
  console.log(
    `${rel.padEnd(34)} ${(a.size / 1024).toFixed(0).padStart(6)} KB -> ${(b.size / 1024).toFixed(0).padStart(6)} KB webp`,
  );
}
console.log(
  `\nTotal: ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB (${Math.round((1 - after / before) * 100)}% smaller)`,
);

// Generate the Alio Analytics brand-kit templates (SVG + PNG) into
// public/brand-kit/. On-brand per the design system (BRAND.md / tokens).
// Run: node scripts/generate-brand-kit.mjs
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'public', 'brand-kit');
mkdirSync(OUT, { recursive: true });

/* ---------------- Brand tokens ---------------- */
const C = {
  navy: '#131840', indigo: '#2B3990', cyan: '#07B7D1',
  ink: '#12141D', slate: '#565E72', muted: '#717A8F',
  light: '#F7F8FA', line: '#DDE1E8', white: '#FFFFFF',
};
const GRAD = `<linearGradient id="alioBrand" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0%" stop-color="${C.cyan}"/><stop offset="100%" stop-color="${C.indigo}"/></linearGradient>`;
const DISPLAY = 'Sora, sans-serif';
const BODY = "'Instrument Sans', sans-serif";
const MONO = "'JetBrains Mono', monospace";

const FISCAL = 'Alio Analytics, Lda · NIF 5001021800 · Rua 49, Bairro Nova Vida, Edifício E-67, Kilamba Kiaxi, Luanda, Angola';
const IBAN = 'IBAN AO06 0006 0000 74963202301 93 · Banco de Fomento Angola (BFA)';
const AGT = 'Processado por programa validado — AGT';

/* ---------------- Fonts (embed + resvg buffers) ---------------- */
const fdir = (pkg) => {
  const base = join(root, 'node_modules', '.pnpm');
  const hit = readdirSync(base).find((d) => d.startsWith(`@fontsource+${pkg}@`));
  return join(base, hit, 'node_modules', '@fontsource', pkg, 'files');
};
const font = (pkg, file) => readFileSync(join(fdir(pkg), file));
const FONTS = [
  { family: 'Sora', weight: 700, buf: font('sora', 'sora-latin-700-normal.woff2') },
  { family: 'Sora', weight: 600, buf: font('sora', 'sora-latin-600-normal.woff2') },
  { family: 'Instrument Sans', weight: 400, buf: font('instrument-sans', 'instrument-sans-latin-400-normal.woff2') },
  { family: 'Instrument Sans', weight: 600, buf: font('instrument-sans', 'instrument-sans-latin-600-normal.woff2') },
  { family: 'JetBrains Mono', weight: 500, buf: font('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff2') },
];
const FONT_CSS = FONTS.map(
  (f) => `@font-face{font-family:'${f.family}';font-style:normal;font-weight:${f.weight};src:url(data:font/woff2;base64,${f.buf.toString('base64')}) format('woff2');}`,
).join('');
const fontBuffers = FONTS.map((f) => f.buf);

/* ---------------- Logo embedding (namespaced ids) ---------------- */
let uid = 0;
function icon(variant, x, y, w) {
  const file = readFileSync(join(root, 'public', 'brand', `alio-icon${variant ? '-' + variant : ''}.svg`), 'utf8');
  const inner = file.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const ns = `k${uid++}_`;
  const scoped = inner.replace(/id="([^"]+)"/g, `id="${ns}$1"`).replace(/url\(#([^)]+)\)/g, `url(#${ns}$1)`);
  const h = w / 1.4018;
  return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 156.9 111.95" overflow="visible">${scoped}</svg>`;
}

/** Wordmark rendered as brand text (icon SVG's own wordmark uses an unavailable font). */
function wordmark(x, y, size, color) {
  return `<text x="${x}" y="${y}" xml:space="preserve" font-family="${DISPLAY}" font-weight="700" font-size="${size}" fill="${color}" letter-spacing="-0.02em">alio<tspan font-weight="600" fill="${color}" opacity="0.85"> analytics</tspan></text>`;
}

function svgDoc(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><style>${FONT_CSS}</style>${GRAD}</defs>${body}</svg>`;
}

function write(name, svg, png) {
  writeFileSync(join(OUT, `${name}.svg`), svg);
  let line = `${name}.svg`;
  if (png) {
    const r = new Resvg(svg, {
      fitTo: { mode: 'width', value: png.width },
      font: { loadSystemFonts: false, fontBuffers },
    });
    writeFileSync(join(OUT, `${name}.png`), r.render().asPng());
    line += ` + ${name}.png`;
  }
  console.log('  ✓', line);
}

/* ============================================================
   BUSINESS CARD — 85×55mm + 3mm bleed = 91×61mm @300dpi
   ============================================================ */
const CARD_W = 1075, CARD_H = 720, BLEED = 35; // trim inset

function businessCardFront() {
  const cx = CARD_W / 2;
  const body = `
  <rect width="${CARD_W}" height="${CARD_H}" fill="${C.navy}"/>
  <rect x="0" y="${CARD_H - 14}" width="${CARD_W}" height="14" fill="url(#alioBrand)"/>
  ${icon('white', cx - 150, 210, 300)}
  ${wordmark(cx - 168, 560, 78, C.white)}
  <text x="${cx}" y="620" text-anchor="middle" font-family="${MONO}" font-weight="500" font-size="26" letter-spacing="6" fill="${C.cyan}">CLARITY FROM COMPLEXITY</text>`;
  return svgDoc(CARD_W, CARD_H, body);
}

function businessCardBack() {
  const L = BLEED + 70;
  const body = `
  <rect width="${CARD_W}" height="${CARD_H}" fill="${C.white}"/>
  <rect x="0" y="0" width="14" height="${CARD_H}" fill="url(#alioBrand)"/>
  ${icon('navy', CARD_W - BLEED - 190, BLEED + 55, 150)}
  <text x="${L}" y="240" font-family="${DISPLAY}" font-weight="700" font-size="60" fill="${C.ink}">[ Nome Completo ]</text>
  <text x="${L}" y="290" font-family="${BODY}" font-weight="600" font-size="30" fill="${C.indigo}">[ Cargo / Title ]</text>
  <rect x="${L}" y="330" width="120" height="4" fill="url(#alioBrand)"/>
  ${['info@alio.ao', '+244 923 710 906', 'www.alio.ao', 'Kilamba Kiaxi, Luanda'].map((t, i) => `
  <circle cx="${L + 6}" cy="${404 + i * 52 - 8}" r="5" fill="${C.cyan}"/>
  <text x="${L + 28}" y="${404 + i * 52}" font-family="${BODY}" font-weight="400" font-size="28" fill="${C.slate}">${t}</text>`).join('')}`;
  return svgDoc(CARD_W, CARD_H, body);
}

/* ============================================================
   LETTERHEAD — A4 210×297mm @150dpi = 1240×1754
   ============================================================ */
const A4_W = 1240, A4_H = 1754, MARGIN = 100;

function letterhead() {
  const body = `
  <rect width="${A4_W}" height="${A4_H}" fill="${C.white}"/>
  ${icon('navy', MARGIN, MARGIN - 6, 150)}
  ${wordmark(MARGIN + 168, MARGIN + 70, 46, C.ink)}
  <rect x="${MARGIN}" y="${MARGIN + 130}" width="${A4_W - MARGIN * 2}" height="4" fill="url(#alioBrand)"/>

  <text x="${MARGIN}" y="${MARGIN + 260}" font-family="${BODY}" font-weight="400" font-size="30" fill="${C.muted}">Luanda, [ data ]</text>
  <text x="${MARGIN}" y="${MARGIN + 360}" font-family="${BODY}" font-weight="600" font-size="32" fill="${C.ink}">Exmo.(a) Senhor(a),</text>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${MARGIN}" y="${MARGIN + 410 + i * 44}" width="${i === 5 ? 620 : A4_W - MARGIN * 2}" height="12" rx="6" fill="${C.light}"/>`).join('')}

  <rect x="0" y="${A4_H - 150}" width="${A4_W}" height="150" fill="${C.navy}"/>
  <rect x="0" y="${A4_H - 150}" width="${A4_W}" height="6" fill="url(#alioBrand)"/>
  <text x="${A4_W / 2}" y="${A4_H - 88}" text-anchor="middle" font-family="${MONO}" font-weight="500" font-size="20" fill="${C.white}">${FISCAL}</text>
  <text x="${A4_W / 2}" y="${A4_H - 52}" text-anchor="middle" font-family="${MONO}" font-weight="500" font-size="20" fill="${C.cyan}">www.alio.ao · info@alio.ao · +244 923 710 906</text>`;
  return svgDoc(A4_W, A4_H, body);
}

/* ============================================================
   INVOICE — A4, IVA 14%, AGT note
   ============================================================ */
function invoice() {
  const kz = (n) => 'Kz ' + n.toLocaleString('pt-PT', { minimumFractionDigits: 2 }).replace(/ /g, '.');
  const rows = [
    ['Serviço de exemplo — descrição', '1', 1000000],
    ['Item de linha adicional', '2', 250000],
  ];
  const sub = rows.reduce((s, r) => s + Number(r[1]) * r[2], 0);
  const iva = sub * 0.14;
  const tot = sub + iva;
  const tableTop = MARGIN + 470;
  const rightX = A4_W - MARGIN;

  const body = `
  <rect width="${A4_W}" height="${A4_H}" fill="${C.white}"/>
  ${icon('navy', MARGIN, MARGIN - 6, 130)}
  ${wordmark(MARGIN + 148, MARGIN + 62, 40, C.ink)}
  <text x="${rightX}" y="${MARGIN + 30}" text-anchor="end" font-family="${DISPLAY}" font-weight="700" font-size="56" fill="${C.indigo}">FATURA</text>
  <text x="${rightX}" y="${MARGIN + 72}" text-anchor="end" font-family="${MONO}" font-weight="500" font-size="22" fill="${C.muted}">Nº [ FT 2026/000 ] · [ data ]</text>

  <text x="${MARGIN}" y="${MARGIN + 210}" font-family="${MONO}" font-weight="500" font-size="20" letter-spacing="2" fill="${C.cyan}">EMITENTE</text>
  <text x="${MARGIN}" y="${MARGIN + 246}" font-family="${BODY}" font-weight="600" font-size="26" fill="${C.ink}">Alio Analytics, Lda</text>
  <text x="${MARGIN}" y="${MARGIN + 278}" font-family="${BODY}" font-size="22" fill="${C.slate}">NIF 5001021800 · Kilamba Kiaxi, Luanda</text>

  <text x="${rightX}" y="${MARGIN + 210}" text-anchor="end" font-family="${MONO}" font-weight="500" font-size="20" letter-spacing="2" fill="${C.cyan}">CLIENTE</text>
  <text x="${rightX}" y="${MARGIN + 246}" text-anchor="end" font-family="${BODY}" font-weight="600" font-size="26" fill="${C.ink}">[ Nome do cliente ]</text>
  <text x="${rightX}" y="${MARGIN + 278}" text-anchor="end" font-family="${BODY}" font-size="22" fill="${C.slate}">[ NIF ] · [ Morada ]</text>

  <rect x="${MARGIN}" y="${tableTop}" width="${A4_W - MARGIN * 2}" height="52" fill="${C.navy}"/>
  <text x="${MARGIN + 24}" y="${tableTop + 34}" font-family="${MONO}" font-weight="500" font-size="20" fill="${C.white}">DESCRIÇÃO</text>
  <text x="${rightX - 360}" y="${tableTop + 34}" text-anchor="end" font-family="${MONO}" font-weight="500" font-size="20" fill="${C.white}">QT</text>
  <text x="${rightX - 180}" y="${tableTop + 34}" text-anchor="end" font-family="${MONO}" font-weight="500" font-size="20" fill="${C.white}">PREÇO</text>
  <text x="${rightX - 24}" y="${tableTop + 34}" text-anchor="end" font-family="${MONO}" font-weight="500" font-size="20" fill="${C.white}">TOTAL</text>
  ${rows.map((r, i) => {
    const y = tableTop + 52 + i * 56;
    return `<rect x="${MARGIN}" y="${y}" width="${A4_W - MARGIN * 2}" height="56" fill="${i % 2 ? C.light : C.white}"/>
    <text x="${MARGIN + 24}" y="${y + 36}" font-family="${BODY}" font-size="24" fill="${C.ink}">${r[0]}</text>
    <text x="${rightX - 360}" y="${y + 36}" text-anchor="end" font-family="${BODY}" font-size="24" fill="${C.slate}">${r[1]}</text>
    <text x="${rightX - 180}" y="${y + 36}" text-anchor="end" font-family="${MONO}" font-size="22" fill="${C.slate}">${kz(r[2])}</text>
    <text x="${rightX - 24}" y="${y + 36}" text-anchor="end" font-family="${MONO}" font-size="22" fill="${C.ink}">${kz(Number(r[1]) * r[2])}</text>`;
  }).join('')}

  ${[['Subtotal', kz(sub), C.slate], ['IVA (14%)', kz(iva), C.slate], ['Total', kz(tot), C.indigo]].map((t, i) => {
    const y = tableTop + 52 + rows.length * 56 + 60 + i * 48;
    const bold = i === 2;
    return `<text x="${rightX - 260}" y="${y}" text-anchor="end" font-family="${BODY}" font-weight="${bold ? 700 : 400}" font-size="${bold ? 30 : 24}" fill="${t[2]}">${t[0]}</text>
    <text x="${rightX - 24}" y="${y}" text-anchor="end" font-family="${MONO}" font-weight="${bold ? 500 : 400}" font-size="${bold ? 30 : 24}" fill="${t[2]}">${t[1]}</text>`;
  }).join('')}

  <rect x="0" y="${A4_H - 190}" width="${A4_W}" height="190" fill="${C.light}"/>
  <rect x="0" y="${A4_H - 190}" width="${A4_W}" height="5" fill="url(#alioBrand)"/>
  <text x="${MARGIN}" y="${A4_H - 128}" font-family="${MONO}" font-weight="500" font-size="20" fill="${C.ink}">${IBAN}</text>
  <text x="${MARGIN}" y="${A4_H - 92}" font-family="${BODY}" font-size="20" fill="${C.slate}">${FISCAL}</text>
  <text x="${MARGIN}" y="${A4_H - 56}" font-family="${MONO}" font-size="18" fill="${C.muted}">${AGT}</text>`;
  return svgDoc(A4_W, A4_H, body);
}

/* ============================================================
   SOCIAL — LinkedIn banner, Instagram post & story
   ============================================================ */
function socialBase(w, h, opts = {}) {
  const bg = opts.dark
    ? `<rect width="${w}" height="${h}" fill="${C.navy}"/>
       <circle cx="${w}" cy="0" r="${h * 0.9}" fill="url(#alioBrand)" opacity="0.16"/>`
    : `<rect width="${w}" height="${h}" fill="${C.white}"/>`;
  return bg;
}

function linkedinBanner() {
  const w = 1584, h = 396, cy = h / 2;
  const body = `${socialBase(w, h, { dark: true })}
  ${icon('white', 120, cy - 90, 180)}
  <text x="340" y="${cy - 20}" font-family="${DISPLAY}" font-weight="700" font-size="72" fill="${C.white}" letter-spacing="-0.02em" xml:space="preserve">alio<tspan font-weight="600" opacity="0.85"> analytics</tspan></text>
  <text x="344" y="${cy + 44}" font-family="${BODY}" font-size="34" fill="${C.cyan}">Clarity from complexity · Built in Angola, engineered for the world</text>
  <rect x="0" y="${h - 10}" width="${w}" height="10" fill="url(#alioBrand)"/>`;
  return { svg: svgDoc(w, h, body), width: w };
}

function instagramPost() {
  const s = 1080, cx = s / 2;
  const body = `${socialBase(s, s, { dark: true })}
  ${icon('white', cx - 190, 300, 380)}
  <text x="${cx}" y="720" text-anchor="middle" font-family="${DISPLAY}" font-weight="700" font-size="88" fill="${C.white}" letter-spacing="-0.02em" xml:space="preserve">alio<tspan font-weight="600" opacity="0.85"> analytics</tspan></text>
  <text x="${cx}" y="800" text-anchor="middle" font-family="${MONO}" font-weight="500" font-size="30" letter-spacing="8" fill="${C.cyan}">CLARITY FROM COMPLEXITY</text>
  <text x="${cx}" y="1010" text-anchor="middle" font-family="${BODY}" font-size="34" fill="${C.line}">@alioanalytics · www.alio.ao</text>
  <rect x="0" y="${s - 12}" width="${s}" height="12" fill="url(#alioBrand)"/>`;
  return { svg: svgDoc(s, s, body), width: s };
}

function instagramStory() {
  const w = 1080, h = 1920, cx = w / 2;
  const body = `${socialBase(w, h, { dark: true })}
  ${icon('white', cx - 200, 560, 400)}
  <text x="${cx}" y="1020" text-anchor="middle" font-family="${DISPLAY}" font-weight="700" font-size="96" fill="${C.white}" letter-spacing="-0.02em" xml:space="preserve">alio<tspan font-weight="600" opacity="0.85"> analytics</tspan></text>
  <text x="${cx}" y="1110" text-anchor="middle" font-family="${MONO}" font-weight="500" font-size="32" letter-spacing="8" fill="${C.cyan}">CLARITY FROM COMPLEXITY</text>
  <rect x="${cx - 220}" y="1560" width="440" height="96" rx="48" fill="url(#alioBrand)"/>
  <text x="${cx}" y="1620" text-anchor="middle" font-family="${BODY}" font-weight="600" font-size="38" fill="${C.white}">www.alio.ao</text>`;
  return { svg: svgDoc(w, h, body), width: w };
}

/* ============================================================
   PRESENTATION — 16:9 slide templates (1920×1080)
   ============================================================ */
const SL_W = 1920, SL_H = 1080;

function slideTitle() {
  const body = `
  <rect width="${SL_W}" height="${SL_H}" fill="${C.navy}"/>
  <circle cx="${SL_W}" cy="0" r="${SL_H}" fill="url(#alioBrand)" opacity="0.14"/>
  ${icon('white', 130, 120, 150)}
  ${wordmark(300, 218, 46, C.white)}
  <text x="130" y="560" font-family="${DISPLAY}" font-weight="700" font-size="96" fill="${C.white}" letter-spacing="-0.03em">Título da Apresentação</text>
  <text x="134" y="640" font-family="${BODY}" font-size="40" fill="${C.line}">Subtítulo ou descrição breve da apresentação</text>
  <rect x="134" y="700" width="160" height="6" fill="url(#alioBrand)"/>
  <text x="130" y="${SL_H - 90}" font-family="${MONO}" font-weight="500" font-size="26" letter-spacing="4" fill="${C.cyan}">CLARITY FROM COMPLEXITY</text>
  <text x="${SL_W - 130}" y="${SL_H - 90}" text-anchor="end" font-family="${BODY}" font-size="28" fill="${C.muted}">www.alio.ao · [ apresentador ] · [ data ]</text>`;
  return svgDoc(SL_W, SL_H, body);
}

function slideSection() {
  const body = `
  <rect width="${SL_W}" height="${SL_H}" fill="url(#alioBrand)"/>
  <rect width="${SL_W}" height="${SL_H}" fill="${C.navy}" opacity="0.82"/>
  ${icon('white', 130, 110, 120)}
  <text x="130" y="640" font-family="${DISPLAY}" font-weight="700" font-size="200" fill="${C.cyan}" opacity="0.9">01</text>
  <text x="140" y="740" font-family="${DISPLAY}" font-weight="700" font-size="88" fill="${C.white}" letter-spacing="-0.03em">Título da Secção</text>`;
  return svgDoc(SL_W, SL_H, body);
}

function slideContent() {
  const body = `
  <rect width="${SL_W}" height="${SL_H}" fill="${C.white}"/>
  ${icon('navy', 130, 90, 90)}
  <text x="250" y="150" font-family="${DISPLAY}" font-weight="600" font-size="30" fill="${C.slate}" xml:space="preserve">alio analytics</text>
  <text x="130" y="320" font-family="${DISPLAY}" font-weight="700" font-size="72" fill="${C.ink}" letter-spacing="-0.02em">Título do Slide</text>
  <rect x="130" y="360" width="140" height="6" fill="url(#alioBrand)"/>
  ${[0, 1, 2, 3].map((i) => `
  <circle cx="150" cy="${470 + i * 110 - 12}" r="9" fill="${C.cyan}"/>
  <text x="190" y="${470 + i * 110}" font-family="${BODY}" font-size="40" fill="${C.ink}">Ponto de conteúdo ${i + 1} — descrição do item.</text>`).join('')}
  <rect x="0" y="${SL_H - 10}" width="${SL_W}" height="10" fill="url(#alioBrand)"/>
  <text x="${SL_W - 130}" y="${SL_H - 44}" text-anchor="end" font-family="${MONO}" font-size="24" fill="${C.muted}">www.alio.ao</text>`;
  return svgDoc(SL_W, SL_H, body);
}

/* ============================================================
   PROPOSAL — A4 structured document (cover + content)
   ============================================================ */
function proposalCover() {
  const body = `
  <rect width="${A4_W}" height="${A4_H}" fill="${C.navy}"/>
  <circle cx="${A4_W}" cy="${A4_H}" r="${A4_W * 0.9}" fill="url(#alioBrand)" opacity="0.16"/>
  ${icon('white', MARGIN, MARGIN, 130)}
  ${wordmark(MARGIN + 150, MARGIN + 64, 40, C.white)}
  <text x="${MARGIN}" y="${A4_H / 2}" font-family="${DISPLAY}" font-weight="700" font-size="96" fill="${C.white}" letter-spacing="-0.03em">Proposta</text>
  <text x="${MARGIN}" y="${A4_H / 2 + 74}" font-family="${DISPLAY}" font-weight="600" font-size="44" fill="${C.cyan}">[ Nome do Projeto ]</text>
  <rect x="${MARGIN}" y="${A4_H / 2 + 120}" width="180" height="6" fill="url(#alioBrand)"/>
  <text x="${MARGIN}" y="${A4_H - 220}" font-family="${BODY}" font-size="30" fill="${C.line}">Preparado para: [ Cliente ]</text>
  <text x="${MARGIN}" y="${A4_H - 176}" font-family="${BODY}" font-size="30" fill="${C.line}">Data: [ data ]</text>
  <text x="${MARGIN}" y="${A4_H - 90}" font-family="${MONO}" font-weight="500" font-size="20" fill="${C.white}">${FISCAL}</text>`;
  return svgDoc(A4_W, A4_H, body);
}

function proposalContent() {
  const secs = [
    ['1. Contexto &amp; Objetivos', 'Descrição do problema do cliente e dos objetivos da solução.'],
    ['2. Âmbito da Solução', 'O que será entregue — funcionalidades, módulos e resultados.'],
    ['3. Abordagem &amp; Metodologia', 'Como a Alio irá executar — fases, entregáveis e governação.'],
    ['4. Cronograma', 'Marcos principais e prazos estimados por fase.'],
    ['5. Investimento', 'Faturação por marcos. IVA 14%. Valores em Kwanza (Kz).'],
    ['6. Termos', 'Condições comerciais, validade da proposta e próximos passos.'],
  ];
  const body = `
  <rect width="${A4_W}" height="${A4_H}" fill="${C.white}"/>
  ${icon('navy', MARGIN, MARGIN - 6, 100)}
  <text x="${MARGIN + 116}" y="${MARGIN + 44}" font-family="${DISPLAY}" font-weight="600" font-size="30" fill="${C.slate}" xml:space="preserve">alio analytics</text>
  <rect x="${MARGIN}" y="${MARGIN + 90}" width="${A4_W - MARGIN * 2}" height="4" fill="url(#alioBrand)"/>
  ${secs.map((s, i) => {
    const y = MARGIN + 190 + i * 200;
    return `<text x="${MARGIN}" y="${y}" font-family="${DISPLAY}" font-weight="700" font-size="40" fill="${C.indigo}">${s[0]}</text>
    <text x="${MARGIN}" y="${y + 48}" font-family="${BODY}" font-size="26" fill="${C.slate}">${s[1]}</text>
    ${[0, 1, 2].map((j) => `<rect x="${MARGIN}" y="${y + 78 + j * 26}" width="${A4_W - MARGIN * 2 - (j === 2 ? 400 : 0)}" height="10" rx="5" fill="${C.light}"/>`).join('')}`;
  }).join('')}
  <rect x="0" y="${A4_H - 90}" width="${A4_W}" height="6" fill="url(#alioBrand)"/>
  <text x="${A4_W / 2}" y="${A4_H - 48}" text-anchor="middle" font-family="${MONO}" font-size="20" fill="${C.muted}">Alio Analytics, Lda · www.alio.ao · info@alio.ao</text>`;
  return svgDoc(A4_W, A4_H, body);
}

/* ---------------- Run ---------------- */
console.log('Generating brand kit →', OUT);
write('alio-business-card-front', businessCardFront(), { width: 1075 });
write('alio-business-card-back', businessCardBack(), { width: 1075 });
write('alio-letterhead', letterhead(), { width: 827 });
write('alio-invoice-template', invoice(), { width: 827 });
write('alio-presentation-title', slideTitle(), { width: 1280 });
write('alio-presentation-section', slideSection(), { width: 1280 });
write('alio-presentation-content', slideContent(), { width: 1280 });
write('alio-proposal-cover', proposalCover(), { width: 827 });
write('alio-proposal-content', proposalContent(), { width: 827 });
const li = linkedinBanner(); write('alio-social-linkedin-banner', li.svg, { width: li.width });
const ig = instagramPost(); write('alio-social-instagram-post', ig.svg, { width: ig.width });
const st = instagramStory(); write('alio-social-instagram-story', st.svg, { width: st.width });
console.log('Done.');

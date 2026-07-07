# ALIO ANALYTICS — BRAND.md
> Machine-readable brand summary for AI tools (Claude Code / Cowork).
> Load this file at the start of any session that produces Alio-branded output.
> Full visual reference: https://www.ocanda.ao/design-system · v1.0 · July 2026

## 1. Identity

- **Company:** Alio Analytics, Lda — Information Technology, Luanda, Angola (alio.ao)
- **Positioning:** For organisations in Angola and across Africa that run on critical data, Alio is the technology partner that turns complex systems into clear, reliable software — world-class engineering and design, delivered from Luanda.
- **Mission:** Build innovative technology solutions that solve real problems across Angola and Africa with world-class quality and exceptional UX.
- **Vision:** Become one of Africa's leading technology companies.
- **Services:** Custom software · Mobile apps · Web · GIS · Data analytics · BI · AI · Cloud · Systems integration · Digital transformation · UI/UX.
- **Clients:** Government, Oil & Gas, Mining, Banking, Healthcare, NGOs, Telecom, Logistics, SMEs, Startups.
- **Taglines:** "Clarity from complexity." / "Clareza na complexidade." (primary) · "Built in Angola. Engineered for the world." · "Data into decisions." / "Dados que decidem."
- **Pillars:** Engineered precision · Human clarity · African ambition (no clichés) · Quiet confidence · Long-term trust.

## 2. Logo

- Mark: two interlocking rounded peaks ("A" motif drawn as a circuit path) with node dots; gradient **cyan #07B7D1 → indigo #2B3990** left-to-right.
- Wordmark: lowercase — `alio` (Sora 700) + `analytics` (Sora 300), tracking −0.02em, in neutral-950 (light) or white (dark).
- Variants: gradient (default), mono black #12141D, mono white, navy #2B3990.
- Favicon ≤24px: **white symbol on navy #131840 tile** (gradient loses definition small). App icon: white symbol on 135° brand gradient, 22% corner radius.
- Clear space: ½ symbol height on all sides. Min sizes: lockup ≥96px/24mm wide; symbol ≥16px/5mm.
- Never: stretch, rotate, recolor, add shadows, place gradient mark on mid-tone fields, set wordmark in another face, use as watermark.

## 3. Color (hex)

- **Primary indigo** (logo at 700): 50 #EEF0FB · 100 #DDE2F7 · 200 #BCC5EF · 300 #93A1E3 · 400 #6B7CD5 · 500 #4C5DC2 · 600 #3A49A9 · **700 #2B3990** · 800 #232E74 · 900 #1D265C · 950 #131840
- **Accent cyan** (logo at 500): 50 #ECFCFF · 100 #D0F6FC · 200 #A6EDF8 · 300 #6EDFF0 · 400 #2FCBE2 · **500 #07B7D1** · 600 #0793AC · 700 #0C7589 · 800 #135E6E · 900 #144E5C · 950 #07333E
- **Neutral (indigo-cast):** 50 #F7F8FA · 100 #EEF0F4 · 200 #DDE1E8 · 300 #C4CAD6 · 400 #9AA2B3 · 500 #717A8F · 600 #565E72 · 700 #444B5C · 800 #2E3340 · 900 #1F2330 · 950 #12141D
- **Semantic 500s:** success #16A468 · warning #E5971B · danger #DC3D43 · info #3B82F6 (full scales in tokens.css)
- **Charts (categorical, in order):** #2B3990, #07B7D1, #16A468, #E5971B, #7C5CD6, #DC3D43, #D9679E, #5B8DEF. Sequential: #D0F6FC→#2B3990. Diverging: #C42B31↔#EEF0F4↔#2B3990.
- **Gradient:** `linear-gradient(90deg,#07B7D1,#2B3990)` (135° on surfaces). Use sparingly — one gradient element per view.
- **Light mode:** bg #FFFFFF, subtle #F7F8FA, border #DDE1E8/#EEF0F4, text #12141D/#444B5C/#717A8F, brand action #2B3990 (hover #232E74), accent text #0793AC (NOT #07B7D1 — fails contrast on white).
- **Dark mode:** bg #0E1017, surface #1F2330, raised #2E3340, border #2E3340, text #F7F8FA/#C4CAD6/#9AA2B3, brand action #6B7CD5, accent #2FCBE2, focus ring #2FCBE2. Shadows→borders; featured elements may use cyan glow.

## 4. Typography

- **Display/headings:** Sora (Google Fonts) — 700 display/H1-H2, 600 H3-H6; tracking −0.03em display, −0.02em headings.
- **Body/UI:** Instrument Sans — 400/500/600.
- **Code/data/labels:** JetBrains Mono — 400/500; overline labels 12px, +0.08em, uppercase.
- Scale (px/lh): DisplayXL 72/76 · L 60/64 · M 48/54 · H1 40/48 · H2 32/40 · H3 26/34 · H4 22/30 · H5 18/26 · H6 16/24 · BodyL 18/28 · BodyM 16/24 · BodyS 14/20 · Caption 12/16 · Code 14/22.
- Mobile: DisplayXL→40, H1→28, H2→24. Prose max-width 680px.

## 5. Layout & shape

- Spacing: 8-pt scale (2,4,8,12,16,24,32,40,48,64,80,96,128,160). Card padding 24/32/40. Section rhythm ≥80px. Generous whitespace is a brand asset.
- Grid: 12 col desktop (24px gutter, 48px margin) · 8 col tablet · 4 col mobile. Container max 1200px.
- Breakpoints: sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536.
- Radius: sm 6 (badges) · md 8 (buttons/inputs) · lg 12 (cards) · xl 16 (modals) · 2xl 24 (heroes) · full (pills/avatars).
- Shadows: indigo-tinted rgba(19,24,64,…), never pure black; borders do most separation. Dark mode: borders, no shadows below md.

## 6. Components (canonical styles)

- **Button primary:** bg primary-700, white text, radius-md, h 32/40/48 (sm/md/lg), Instrument Sans 600; hover primary-800; focus 2px cyan ring +2px offset; disabled 45% opacity. Dark mode primary = primary-400 with near-black text.
- **Secondary:** primary-50 bg + primary-700 text. **Outline:** white + neutral-200 border. **Ghost:** transparent. **Danger:** danger-600. **Success:** success-600.
- **Inputs:** h 40, radius-md, border neutral-200; focus border cyan + 3px rgba(7,183,209,0.18) ring; error border danger-500 + danger-50 bg; labels always visible, 13px 600.
- **Cards:** white, border neutral-100, radius-lg; hover = shadow-md + translateY(−2px), 200ms.
- **App shell:** 264px sidebar in #131840 (white/indigo-300 items, active = rgba(47,203,226,0.16) bg), 56px topbar, content well #F7F8FA.
- **Focus (all):** 2px #07B7D1 ring, 2px offset. Touch targets ≥44px.

## 7. Motion

Durations: 75 press · 150 hover · 200 lifts · 300 page-enter/accordion · 400 drawers/success · 500 charts · 700 hero only.
Easings: standard cubic-bezier(.4,0,.2,1) · enter (0,0,.2,1) · exit (.4,0,1,1) · spring (.34,1.56,.64,1) — spring reserved for success moments.
Page enter: fade + 8px rise, 40ms stagger (max 5). Respect prefers-reduced-motion (collapse to opacity).

## 8. Voice

Confident not boastful; precise not cold; plain language, short sentences, verbs over nouns. Bilingual EN/PT (EN primary; PT uses professional register). Errors: say what happened, reassure data is safe, give next step. Never blame the user. No exclamation marks in UI. Numbers: Kwanza formatted `Kz 1.000.000,00`; IVA 14%; dates DD.MM.YYYY in documents.

## 9. Imagery

Photography: real Angolan professionals, natural light, candid, cool desaturated grade. Illustration: geometric/diagrammatic, brand colors, node-dot motif. NEVER: stock handshakes, circuit-board overlays, holograms, safari clichés, blue-glow "tech" imagery, emoji in UI.

## 10. Fiscal details (documents)

Alio Analytics, Lda · NIF 5001021800 · Rua 49, Bairro Nova Vida, Edifício E-67, Kilamba Kiaxi, Luanda.
IBAN AO06 0006 0000 74963202301 93 · Banco de Fomento Angola (BFA). Invoices: IVA 14%, milestone billing, "Processado por programa validado — AGT".

## 11. Implementation

- Tokens: `tokens.css` (CSS custom props, `:root` + `.dark`) · `tailwind.config.js` · `tokens.json` (W3C) · `tokens.ts`.
- Dark mode: class strategy (`.dark` on `<html>`).
- Components bind to semantic tokens (--bg, --text-primary, --brand), never raw scale values.
- Architecture: Atomic (atoms → molecules → organisms → templates), CVA variants, components in `src/components/ui/*`.
- Priority order: Button → Input/Field → Card → Badge → Alert/Toast → Table → Tabs → Modal/Drawer → Select/Combobox → Sidebar/Topbar shell → KPI card → Charts wrapper → Empty states → Pagination → Stepper.

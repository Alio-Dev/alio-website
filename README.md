# Alio Analytics — Website

Marketing website and design system for **Alio Analytics, Lda** — a technology
and data company in Luanda, Angola. Bilingual (Portuguese / English), fully
themed (light / dark), and powered end-to-end by the Alio Analytics Design
System.

- **Live:** https://www.alio.ao
- **Design system docs:** `/design-system` (alias: `/docs`)

---

## Tech stack (post-upgrade)

| Area | Tech | Version |
|------|------|---------|
| Framework | React | 19.2 |
| Language | TypeScript | 6.0 |
| Build tool | Vite | 8.1 |
| Styling | Tailwind CSS (CSS-first `@theme`) | 4.3 |
| Routing | react-router-dom | 7.18 |
| UI icons | lucide-react | 1.23 |
| Brand/social icons | react-icons (FontAwesome set) | 5.7 |
| Contact form | @formspree/react | 3.0 |
| Analytics | @vercel/analytics · @vercel/speed-insights | 2.0 |
| Lint | ESLint (flat config) + typescript-eslint | 10 / 8 |
| Image tooling (dev) | sharp | 0.35 |
| Package manager | **pnpm** | 11+ |
| Runtime | Node.js | ≥ 20.19 (built on 24) |
| Hosting | **Vercel** (auto-deploy from `main`) | — |

No CMS or database — all content lives in the repo (see **Content model**).
The site is **live** at https://www.alio.ao, deployed on Vercel from the `main`
branch of `Alio-Dev/alio-2025`.

---

## Prerequisites & environment variables

- **Node.js ≥ 20.19** (Vite 8 requirement) and **pnpm** (`npm i -g pnpm`).
- **No secrets are required to run or build.** The only integration is Formspree,
  whose public form ID is committed in `src/components/ContactModal.tsx`.
- If you later add secrets, put them in a git-ignored `.env` as `VITE_`-prefixed
  variables (e.g. `VITE_FORMSPREE_ID`) and read them via `import.meta.env`.
  `.env*` files are already git-ignored.

---

## Install / run / build

```bash
pnpm install          # install dependencies

pnpm dev              # dev server → http://localhost:5173
pnpm build            # production build → dist/
pnpm preview          # serve the production build locally
pnpm lint             # ESLint

# Type-check (not part of build; run in CI):
pnpm exec tsc --noEmit -p tsconfig.app.json

# Regenerate optimized images / OG image after adding new assets:
node scripts/optimize-images.mjs   # raster → WebP in /public
node scripts/generate-og.mjs       # public/og-image.png (1200×630)
```

> Note: `pnpm build` runs `vite build` (esbuild) and does **not** type-check.
> Run `tsc --noEmit` separately (the project is kept at **0 type errors**).

---

## Project structure

```
├── index.html               # SPA shell: meta, OG, JSON-LD, GTM, fonts, no-flash theme
├── public/                  # static assets (shipped as-is)
│   ├── Alio.svg             # logo lockup
│   ├── brand/               # icon variants (gradient / navy / white / black)
│   ├── og-image.png         # social share image (generated)
│   ├── *.webp               # optimized imagery
│   ├── robots.txt · sitemap.xml
├── design/source-images/    # original (unoptimized) rasters — kept, not shipped
├── scripts/                 # optimize-images.mjs · generate-og.mjs
├── src/
│   ├── main.tsx             # entry; mounts ThemeProvider + Router
│   ├── App.tsx              # routes; keeps <html lang> in sync
│   ├── index.css            # Tailwind v4 @theme (maps tokens → utilities)
│   ├── styles/tokens.css    # design tokens: :root (light) + .dark
│   ├── design-system/       # tokens.ts/json · ThemeProvider
│   ├── lib/cn.ts            # className combiner
│   ├── components/
│   │   ├── ui/              # the component library (single source of truth)
│   │   ├── Layout.tsx · Footer.tsx · Seo.tsx · MarketingHero.tsx
│   │   ├── ServiceHero.tsx · ServiceFeatures.tsx · ContactModal.tsx …
│   ├── pages/
│   │   ├── HomePage · AboutPage · CaseStudiesPage · BlogPage · BlogArticlePage
│   │   ├── CareersPage · LegalPage
│   │   ├── services/       # 6 service pages
│   │   └── design-system/  # the /design-system docs app (code-split)
│   ├── data/               # translations.ts (bilingual copy) · legal.ts
│   ├── hooks/useLanguage.ts
│   └── types/language.ts
├── tsconfig*.json · eslint.config.js · postcss.config.js · vite.config.ts
└── BRAND.md                 # machine-readable brand summary
```

---

## Design system

The design system is the **single source of truth** for styling and components.

- **Tokens** live in `src/styles/tokens.css` as CSS custom properties on `:root`
  (light) and `.dark` (dark). This file is the source of truth for every colour,
  font, spacing, radius, shadow and motion value. TS/JSON copies:
  `src/design-system/tokens.ts` / `tokens.json`.
- **Tailwind** conforms to the tokens: `src/index.css` maps them into Tailwind v4's
  utility namespaces with `@theme inline` (so no values are duplicated and light/dark
  switching stays automatic). Semantic utilities include `bg-bg`, `bg-surface`,
  `text-primary/secondary/tertiary`, `border-border`, `text-brand`,
  `bg-gradient-brand`, plus the full scales (`bg-primary-700`, `text-accent-600`…).
- **Component library:** `src/components/ui/*` (33 components — Button, Input/Field,
  Card, Badge, Alert, Toast, Table, Tabs, Modal, Drawer, Select, Charts, AppShell,
  KpiCard, EmptyState, Stepper, MapSurface, …). Import from the barrel:
  ```tsx
  import { Button, Card, Badge } from './components/ui';
  ```
- **Live docs:** run the app and open `/design-system` — every component has a live
  preview, props table, and copy-paste code, plus token/brand/foundation pages.

### Add a component

1. Create `src/components/ui/MyThing.tsx`. Use semantic tokens (`bg-surface`,
   `text-primary`, `focus-visible:ring-focus`), the `cn()` helper, and support dark
   mode via those tokens (no hard-coded colours).
2. Export it from `src/components/ui/index.ts`.
3. Document it: add a preview to the relevant page under
   `src/pages/design-system/components-pages/`.

See **BRAND.md** (repo root) for the full brand spec — colour, type, voice, motion.

---

## Content model

There is **no CMS/database**; content is in the repo:

- **`src/data/translations.ts`** — bilingual (`pt` / `en`) copy for the homepage and
  shared UI, typed by `src/types/language.ts`. Portuguese is the default language.
- **Service pages** — each `src/pages/services/*Page.tsx` holds its own feature list
  and technology list (currently Portuguese).
- **`src/data/legal.ts`** — bilingual Privacy Policy & Terms content (drafted for
  Angola; review by counsel before relying on it).
- **Images** — in `public/` (optimized `.webp`; originals kept in
  `design/source-images/`).

To edit copy, change the relevant string in `translations.ts` / the page / `legal.ts`.
Language is chosen via the header switcher and persisted in `localStorage`
(`alio-language`); `useLanguage()` reads it via `useSyncExternalStore`.

### Pending content (scaffolded pages)
Case Studies, Blog posts, Careers roles, and any official partner/social logos are
**placeholders** marked *"Draft — content pending."* Supply real content to publish.

---

## Theming (light / dark)

- Class strategy: a `.dark` class on `<html>` (Tailwind v4 `@custom-variant dark`).
- `ThemeProvider` (`src/design-system/ThemeProvider.tsx`) is mounted at the app root
  (`main.tsx`), persists the choice to `localStorage` (`alio-theme`), and honours the
  OS preference when unset. A tiny inline script in `index.html` applies the stored
  theme before paint to avoid a flash.
- Toggle anywhere with the `ThemeToggle` component or `useTheme()`.
- Components must theme via tokens (`bg-surface`, `text-primary`, …) — never
  hard-coded colours — so both modes work for free.

---

## Deployment (Vercel)

The site is hosted on **Vercel** and **auto-deploys on every push to `main`**
(project `alio-website` ← `Alio-Dev/alio-2025`). No environment variables are
required.

**Project settings** (Vercel → Settings):
- Framework preset: **Vite** · Build: `pnpm build` · Output: `dist` · Install: `pnpm install`
- Node.js: **≥ 20.19**
- **Production Branch: `main`** (Settings → Git)
- SPA routing is handled by the committed **`vercel.json`**
  (`{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`) so deep
  links like `/services/gis` resolve on refresh.

**⚠️ Commit email must match a GitHub account.** Vercel blocks a deploy if the
commit author's email isn't linked to a GitHub account with access to the repo
(*"commit email … could not be matched to a GitHub account"*). Always commit with:
```bash
git config user.name  "Aristoteles Bernardo"
git config user.email "aristoteles.bernardo@alio.ao"   # must be VERIFIED on GitHub
```
(Or use the account's `…@users.noreply.github.com` email, which always matches.)

**Manual deploy** (bypasses Git, e.g. to hotfix): `pnpm dlx vercel --prod`.
Do **not** add the `vercel` CLI as a project dependency — use `pnpm dlx`.

**Analytics:** `@vercel/analytics` and `@vercel/speed-insights` are mounted in
`src/App.tsx`; enable the **Analytics** and **Speed Insights** tabs in the Vercel
project to collect data.

Other static hosts work too (serve `dist/` with an SPA fallback to `index.html`;
Netlify: `/* → /index.html 200`).

---

## Contributing / branch conventions

- Work on feature branches; open a PR into `main`. `main` is the production branch
  (a push to it deploys). `master` and `development` are kept in sync.
- Conventional-commit style: `feat(...)`, `build(deps): ...`, `a11y(...)`,
  `perf,seo(...)`, `chore: ...`.
- **Set the commit identity** (see Deployment) so Vercel doesn't block the deploy.
- Before pushing: `pnpm lint`, `pnpm exec tsc --noEmit -p tsconfig.app.json`,
  and `pnpm build` must all pass.
- New UI must use design-system tokens/components and work in light **and** dark.

---

## License

Proprietary — © Alio Analytics, Lda. All rights reserved. Not licensed for reuse
or redistribution without written permission.

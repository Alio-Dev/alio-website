import { Download, Check, X } from 'lucide-react';
import { Seo } from './components/Seo';
import { PageHeader, Section, Subsection } from './components/DocPrimitives';
import { ColorSwatch } from './components/ColorSwatch';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { SCALES, SEMANTIC_SCALES, CHART_PALETTE } from './data/colors';
import { BASE } from './nav';

const LOGO_VARIANTS = [
  { label: 'Gradient (default)', file: '/Alio.svg', bg: 'bg-white', darkText: true },
  { label: 'Mono navy', file: '/brand/alio-icon-navy.svg', bg: 'bg-white', darkText: true },
  { label: 'Mono black', file: '/brand/alio-icon-black.svg', bg: 'bg-white', darkText: true },
  { label: 'Mono white', file: '/brand/alio-icon-white.svg', bg: 'bg-primary-950', darkText: false },
];

const TYPE_SPECIMENS = [
  { name: 'Display L', cls: 'text-display-l', sample: 'Clarity', font: 'Sora 700' },
  { name: 'Heading 1', cls: 'text-h1', sample: 'Data into decisions', font: 'Sora 700' },
  { name: 'Heading 3', cls: 'text-h3', sample: 'Engineered precision', font: 'Sora 600' },
  { name: 'Body L', cls: 'text-body-l font-sans', sample: 'World-class engineering and design, delivered from Luanda.', font: 'Instrument Sans 400' },
  { name: 'Body M', cls: 'text-body-m font-sans', sample: 'For organisations that run on critical data.', font: 'Instrument Sans 400' },
  { name: 'Overline', cls: 'text-overline font-mono uppercase tracking-[0.08em]', sample: 'Analytics · BI · GIS', font: 'JetBrains Mono 500' },
  { name: 'Code', cls: 'text-code font-mono', sample: 'const clarity = fromComplexity(data);', font: 'JetBrains Mono 400' },
];

function LogoCard({ label, file, bg, darkText }: (typeof LOGO_VARIANTS)[number]) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className={`flex h-32 items-center justify-center ${bg}`}>
        <img src={file} alt={`Alio logo — ${label}`} className="h-12 w-auto" />
      </div>
      <div className="flex items-center justify-between border-t border-border-subtle p-3">
        <span className={`text-body-s font-medium ${darkText ? 'text-primary' : 'text-primary'}`}>
          {label}
        </span>
        <a
          href={file}
          download
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-caption font-medium text-tertiary transition-colors hover:bg-bg-subtle hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <Download size={13} /> SVG
        </a>
      </div>
    </Card>
  );
}

export default function BrandPage() {
  return (
    <>
      <Seo
        title="Brand"
        description="Alio Analytics brand — logo system, colour palette, typography, iconography and voice."
        path={`${BASE}/brand`}
      />
      <PageHeader
        eyebrow="Identity"
        title="Brand"
        description="The Alio mark, palette, type and voice. Two interlocking rounded peaks drawn as a circuit path, a cyan-to-indigo gradient, and language that is confident, not boastful."
      />

      {/* Logo */}
      <Section id="logo" title="Logo system" description="Gradient cyan #07B7D1 → indigo #2B3990. Clear space ½ the symbol height; minimum lockup width 96px, symbol 16px.">
        <div className="grid gap-4 sm:grid-cols-2">
          {LOGO_VARIANTS.map((v) => (
            <LogoCard key={v.label} {...v} />
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-900 dark:bg-success-950/30">
            <p className="mb-2 flex items-center gap-2 text-body-s font-semibold text-success-700 dark:text-success-300">
              <Check size={16} /> Do
            </p>
            <ul className="space-y-1 text-body-s text-secondary">
              <li>Keep ½-symbol clear space on all sides.</li>
              <li>Use mono white on navy or photography.</li>
              <li>Favicon ≤24px: white symbol on navy #131840 tile.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-danger-200 bg-danger-50 p-4 dark:border-danger-900 dark:bg-danger-950/30">
            <p className="mb-2 flex items-center gap-2 text-body-s font-semibold text-danger-700 dark:text-danger-300">
              <X size={16} /> Never
            </p>
            <ul className="space-y-1 text-body-s text-secondary">
              <li>Stretch, rotate, recolour or add shadows.</li>
              <li>Place the gradient mark on mid-tone fields.</li>
              <li>Set the wordmark in another typeface.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Colors */}
      <Section id="colors" title="Colour" description="Click any swatch or format chip to copy. Accent text on white uses 600 — the 500 cyan fails AA contrast.">
        {[...SCALES].map((scale) => (
          <Subsection key={scale.token} title={scale.name}>
            {scale.note && <p className="mb-3 text-body-s text-tertiary">{scale.note}</p>}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {scale.steps.map((step) => (
                <ColorSwatch
                  key={step.step}
                  name={`${scale.token}-${step.step}`}
                  hex={step.hex}
                  token={`--${scale.token}-${step.step}`}
                />
              ))}
            </div>
          </Subsection>
        ))}

        <Subsection title="Semantic">
          <div className="space-y-6">
            {SEMANTIC_SCALES.map((scale) => (
              <div key={scale.token}>
                <p className="mb-2 text-body-s font-medium text-secondary">{scale.name}</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {scale.steps
                    .filter((s) => ['50', '500', '600', '700'].includes(s.step))
                    .map((step) => (
                      <ColorSwatch
                        key={step.step}
                        name={`${scale.token}-${step.step}`}
                        hex={step.hex}
                        token={`--${scale.token}-${step.step}`}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Subsection>

        <Subsection title="Chart palette">
          <p className="mb-3 text-body-s text-tertiary">Categorical order for data visualisation.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {CHART_PALETTE.map((c) => (
              <ColorSwatch key={c.token} name={c.name} hex={c.hex} token={c.token} />
            ))}
          </div>
        </Subsection>
      </Section>

      {/* Typography */}
      <Section id="typography" title="Typography" description="Sora for display & headings, Instrument Sans for body & UI, JetBrains Mono for code, data and labels.">
        <div className="divide-y divide-border-subtle rounded-lg border border-border">
          {TYPE_SPECIMENS.map((t) => (
            <div key={t.name} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:justify-between">
              <span className={`${t.cls} text-primary`}>{t.sample}</span>
              <span className="shrink-0 font-mono text-caption text-tertiary sm:ml-6 sm:text-right">
                {t.name} · {t.font}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Iconography */}
      <Section id="iconography" title="Iconography" description="Lucide icons at 1.5–2px stroke. Node-dot motif for illustration. Never use emoji in UI.">
        <div className="flex flex-wrap gap-3">
          {['16px overline labels', '2px stroke', 'Rounded joins', 'Node-dot accents'].map((tag) => (
            <Badge key={tag} variant="neutral">{tag}</Badge>
          ))}
        </div>
      </Section>

      {/* Voice */}
      <Section id="voice" title="Voice & tone" description="Confident not boastful. Precise not cold. Plain language, short sentences, verbs over nouns. No exclamation marks in UI.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-success-200 bg-success-50 p-5 dark:border-success-900 dark:bg-success-950/30">
            <p className="mb-3 text-body-s font-semibold text-success-700 dark:text-success-300">We say</p>
            <ul className="space-y-2 text-body-m text-secondary">
              <li>“Clarity from complexity.”</li>
              <li>“Your data is safe. Try again in a moment.”</li>
              <li>“Built in Angola. Engineered for the world.”</li>
            </ul>
          </div>
          <div className="rounded-lg border border-danger-200 bg-danger-50 p-5 dark:border-danger-900 dark:bg-danger-950/30">
            <p className="mb-3 text-body-s font-semibold text-danger-700 dark:text-danger-300">We avoid</p>
            <ul className="space-y-2 text-body-m text-secondary">
              <li>“Revolutionary synergy!!!”</li>
              <li>“You entered the wrong password.”</li>
              <li>Jargon, hype, and blaming the user.</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}

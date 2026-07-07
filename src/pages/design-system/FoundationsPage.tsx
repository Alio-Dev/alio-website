import { useState } from 'react';
import { Play } from 'lucide-react';
import { Seo } from './components/Seo';
import { PageHeader, Section } from './components/DocPrimitives';
import { CopyButton } from './components/CopyButton';
import { Button } from '../../components/ui/Button';
import { BASE } from './nav';

const SPACING = [
  ['1', 4], ['2', 8], ['3', 12], ['4', 16], ['6', 24], ['8', 32],
  ['10', 40], ['12', 48], ['16', 64], ['20', 80], ['24', 96],
] as const;

const RADII = [
  ['sm', 6, 'Badges'], ['md', 8, 'Buttons · inputs'], ['lg', 12, 'Cards'],
  ['xl', 16, 'Modals'], ['2xl', 24, 'Heroes'], ['full', 999, 'Pills · avatars'],
] as const;

const SHADOWS = ['xs', 'sm', 'md', 'lg', 'xl', 'float'] as const;

const MOTION = [
  ['75ms', 'press', 'duration-75'], ['150ms', 'hover', 'duration-150'],
  ['200ms', 'lifts', 'duration-200'], ['300ms', 'page enter / accordion', 'duration-300'],
  ['400ms', 'drawers / success', 'duration-400'], ['500ms', 'charts', 'duration-500'],
] as const;

function MotionDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="rounded-lg border border-border p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-body-s text-secondary">Replay the page-enter animation (fade + 8px rise).</p>
        <Button size="sm" variant="outline" leftIcon={<Play size={14} />} onClick={() => setKey((k) => k + 1)}>
          Replay
        </Button>
      </div>
      <div key={key} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-fade-up rounded-lg bg-brand-subtle p-4 text-center text-body-s font-medium text-brand"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {i * 40}ms
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FoundationsPage() {
  return (
    <>
      <Seo
        title="Foundations"
        description="Spacing, grid, radius, shadows, motion and accessibility for Alio Analytics."
        path={`${BASE}/foundations`}
      />
      <PageHeader
        eyebrow="System"
        title="Foundations"
        description="The invisible rules — an 8-pt spacing scale, a 12-column grid, indigo-tinted elevation, and motion that respects reduced-motion. Generous whitespace is a brand asset."
      />

      {/* Spacing */}
      <Section id="spacing" title="Spacing" description="8-pt scale. Card padding 24 / 32 / 40. Section rhythm ≥ 80px.">
        <div className="space-y-2">
          {SPACING.map(([name, px]) => (
            <div key={name} className="flex items-center gap-4">
              <code className="w-16 font-mono text-body-s text-tertiary">space-{name}</code>
              <div className="h-4 rounded bg-accent-500" style={{ width: px }} />
              <span className="font-mono text-caption text-tertiary">{px}px</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Grid */}
      <Section id="grid" title="Grid & breakpoints" description="12 columns desktop (24px gutter, 48px margin) · 8 tablet · 4 mobile. Container max 1200px.">
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex h-16 items-center justify-center rounded bg-brand-subtle text-caption font-mono text-brand">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 font-mono text-caption text-tertiary">
          {[['sm', 640], ['md', 768], ['lg', 1024], ['xl', 1280], ['2xl', 1536]].map(([n, v]) => (
            <span key={n} className="rounded border border-border px-2 py-1">{n} · {v}px</span>
          ))}
        </div>
      </Section>

      {/* Radius */}
      <Section id="radius" title="Radius" description="From subtle badges to expressive heroes.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {RADII.map(([name, px, use]) => (
            <div key={name} className="flex flex-col items-center gap-2 rounded-lg border border-border p-4">
              <div
                className="h-16 w-16 border-2 border-primary-500 bg-brand-subtle"
                style={{ borderRadius: px === 999 ? 999 : px }}
              />
              <div className="text-center">
                <p className="font-mono text-body-s text-primary">radius-{name}</p>
                <p className="text-caption text-tertiary">{use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section id="shadows" title="Shadows" description="Indigo-tinted, never pure black. Dark mode swaps shadows for borders below md.">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {SHADOWS.map((name) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <div className={`h-20 w-full rounded-lg bg-surface shadow-${name}`} />
              <code className="font-mono text-caption text-tertiary">shadow-{name}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* Motion */}
      <Section id="motion" title="Motion" description="Durations map to intent; standard easing cubic-bezier(.4,0,.2,1). Spring is reserved for success moments.">
        <div className="mb-6 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-body-s">
            <tbody className="divide-y divide-border-subtle">
              {MOTION.map(([dur, use, token]) => (
                <tr key={dur}>
                  <td className="px-4 py-2.5 font-mono text-brand">{dur}</td>
                  <td className="px-4 py-2.5 text-secondary">{use}</td>
                  <td className="px-4 py-2.5 text-right">
                    <CopyButton value={token} label={token} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <MotionDemo />
      </Section>

      {/* Accessibility */}
      <Section id="accessibility" title="Accessibility" description="WCAG AA is the floor, not the ceiling.">
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            'Colour contrast ≥ 4.5:1 for text (accent text uses cyan-600 on white).',
            'Visible focus ring: 2px cyan, 2px offset, on every interactive element.',
            'Touch targets ≥ 44px.',
            'Respects prefers-reduced-motion — animation collapses to opacity.',
            'Labels always visible; inputs wired with aria-describedby.',
            'Full keyboard navigation, including ⌘K search and modal focus traps.',
          ].map((item) => (
            <li key={item} className="flex gap-2 rounded-lg border border-border p-4 text-body-s text-secondary">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

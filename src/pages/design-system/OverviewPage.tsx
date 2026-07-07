import { Link } from 'react-router-dom';
import {
  Palette,
  Layers,
  Component,
  LayoutTemplate,
  Package,
  Braces,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Seo } from './components/Seo';
import { BASE } from './nav';

const QUICK_LINKS = [
  { to: `${BASE}/brand`, icon: Palette, title: 'Brand', desc: 'Logo, colour, type, voice & tone.' },
  { to: `${BASE}/foundations`, icon: Layers, title: 'Foundations', desc: 'Spacing, grid, radius, shadow, motion.' },
  { to: `${BASE}/components`, icon: Component, title: 'Components', desc: 'The live, production component library.' },
  { to: `${BASE}/patterns`, icon: LayoutTemplate, title: 'Patterns', desc: 'Dashboards, empty & error templates.' },
  { to: `${BASE}/brand-kit`, icon: Package, title: 'Brand kit', desc: 'Downloadable logos, documents, social.' },
  { to: `${BASE}/tokens`, icon: Braces, title: 'Tokens', desc: 'CSS · Tailwind · JSON · TypeScript.' },
];

const PILLARS = [
  'Engineered precision',
  'Human clarity',
  'African ambition',
  'Quiet confidence',
  'Long-term trust',
];

export default function OverviewPage() {
  return (
    <>
      <Seo
        title="Overview"
        description="The Alio Analytics design system — tokens, components and guidelines for building clear, reliable software."
        path={BASE}
      />

      {/* Hero */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: 'var(--gradient-brand)' }}
            aria-hidden="true"
          />
          <Badge variant="accent" dot className="mb-5">
            v1.0 · July 2026
          </Badge>
          <h1 className="max-w-2xl font-display text-display-m text-primary sm:text-display-l">
            Clarity from{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent">complexity</span>.
          </h1>
          <p className="mt-5 max-w-prose text-body-l text-secondary">
            The Alio Analytics design system — the single source of truth for the tokens,
            components and guidelines behind world-class engineering and design, delivered
            from Luanda.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`${BASE}/components`}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary-700 px-5 text-body-s font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] dark:bg-primary-400 dark:text-neutral-950 dark:hover:bg-primary-300"
            >
              Browse components <ArrowRight size={16} />
            </Link>
            <Link
              to={`${BASE}/tokens`}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface px-5 text-body-s font-semibold text-primary transition-colors hover:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              Get the tokens
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="mb-16">
        <h2 className="mb-5 font-display text-h4 text-primary">Explore</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {QUICK_LINKS.map(({ to, icon: Icon, title, desc }) => (
            <Link key={to} to={to} className="group focus-visible:outline-none">
              <Card interactive className="h-full">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="flex items-center gap-1 text-h6 text-primary">
                      {title}
                      <ArrowRight
                        size={15}
                        className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </h3>
                    <p className="mt-1 text-body-s text-tertiary">{desc}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand intro */}
      <section className="mb-8">
        <div className="rounded-xl border border-border bg-bg-subtle p-8">
          <div className="mb-4 flex items-center gap-2 text-accent">
            <Sparkles size={18} />
            <span className="font-mono text-overline uppercase tracking-[0.08em]">Brand pillars</span>
          </div>
          <p className="max-w-prose text-body-l text-secondary">
            For organisations in Angola and across Africa that run on critical data, Alio is the
            technology partner that turns complex systems into clear, reliable software.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {PILLARS.map((p) => (
              <Badge key={p} variant="brand">
                {p}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

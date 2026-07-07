import { Badge } from './ui/Badge';

interface MarketingHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Shows a "Draft — content pending" chip for scaffolded pages. */
  draft?: boolean;
}

/** Shared page header for marketing content pages (About, Blog, Careers, …). */
export function MarketingHero({ eyebrow, title, subtitle, draft }: MarketingHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-bg-subtle">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--gradient-brand)' }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-container px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {(eyebrow || draft) && (
            <div className="mb-4 flex items-center gap-3">
              {eyebrow && (
                <span className="font-mono text-overline uppercase tracking-[0.08em] text-accent">
                  {eyebrow}
                </span>
              )}
              {draft && (
                <Badge variant="warning" size="sm">
                  Draft — content pending
                </Badge>
              )}
            </div>
          )}
          <h1 className="font-display text-h1 text-primary md:text-display-m">{title}</h1>
          {subtitle && <p className="mt-4 text-body-l text-secondary">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

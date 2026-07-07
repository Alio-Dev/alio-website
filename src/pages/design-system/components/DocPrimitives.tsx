import { cn } from '../../../lib/cn';

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('mb-10', className)}>
      {eyebrow && (
        <p className="mb-2 font-mono text-overline uppercase tracking-[0.08em] text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-h1 text-primary">{title}</h1>
      {description && (
        <p className="mt-3 max-w-prose text-body-l text-secondary">{description}</p>
      )}
    </header>
  );
}

export function Section({
  id,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 mb-16', className)}>
      {title && (
        <div className="mb-5">
          <h2 className="font-display text-h3 text-primary">{title}</h2>
          {description && <p className="mt-2 max-w-prose text-body-m text-secondary">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Subsection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-8', className)}>
      <h3 className="mb-3 font-display text-h5 text-primary">{title}</h3>
      {children}
    </div>
  );
}

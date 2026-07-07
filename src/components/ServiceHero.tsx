import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ServiceHeroProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  /** Per-service Tailwind gradient background classes. */
  gradient: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  icon: Icon,
  title,
  subtitle,
  description,
  gradient,
}) => {
  return (
    <section className={`relative flex min-h-[70vh] items-center justify-center overflow-hidden ${gradient}`}>
      <div className="absolute inset-0 bg-primary-950/25" />

      {/* Ambient brand orbs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-float absolute -right-40 -top-40 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="animate-float-delayed absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-white/20 backdrop-blur-sm">
            <Icon size={48} className="text-white" />
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-white md:text-display-m">
            {title}
          </h1>
          <p className="mb-6 font-display text-h4 font-medium text-white/90 md:text-h3">
            {subtitle}
          </p>
          <p className="mx-auto max-w-3xl text-body-l text-white/80">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;

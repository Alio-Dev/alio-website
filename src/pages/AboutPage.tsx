import { useEffect } from 'react';
import { CheckCircle, Target, Eye, Heart } from 'lucide-react';
import Layout from '../components/Layout';
import { MarketingHero } from '../components/MarketingHero';
import { Card } from '../components/ui/Card';
import { useLanguage } from '../hooks/useLanguage';

/** Dedicated /about page built from the existing bilingual About content. */
export default function AboutPage() {
  const { t, currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';
  const yearsExperience = new Date().getFullYear() - 2022;

  useEffect(() => {
    document.title = `${t.about.title} ${t.about.subtitle} · Alio Analytics`;
  }, [t]);

  const pillars = [
    { icon: Target, title: t.about.mission.title, body: t.about.mission.description },
    { icon: Eye, title: t.about.vision.title, body: t.about.vision.description },
  ];

  return (
    <Layout showBackButton>
      <MarketingHero
        eyebrow={isPt ? 'Sobre nós' : 'About us'}
        title={`${t.about.title} ${t.about.subtitle}`}
        subtitle={t.about.description1}
      />

      <section className="bg-bg py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-6 text-body-l text-secondary">{t.about.description2}</p>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center">
                  <div className="font-display text-h2 text-brand">20+</div>
                  <div className="mt-1 text-body-s text-tertiary">{t.about.stats.projects}</div>
                </Card>
                <Card className="text-center">
                  <div className="font-display text-h2 text-accent">{yearsExperience}+</div>
                  <div className="mt-1 text-body-s text-tertiary">{t.about.stats.experience}</div>
                </Card>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-brand-135 p-8 text-white">
              <h2 className="mb-4 font-display text-h4">{t.about.whyChoose.title}</h2>
              <ul className="space-y-4">
                {t.about.whyChoose.reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="mt-0.5 shrink-0 text-accent-300" />
                    <span className="text-body-m text-white/90">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-subtle py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <Card key={p.title} padding="lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                  <p.icon size={22} />
                </div>
                <h3 className="mb-3 font-display text-h4 text-primary">{p.title}</h3>
                <p className="text-body-m text-secondary">{p.body}</p>
              </Card>
            ))}
            <Card padding="lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                <Heart size={22} />
              </div>
              <h3 className="mb-3 font-display text-h4 text-primary">{t.about.values.title}</h3>
              <div className="space-y-2">
                {Object.values(t.about.values.items).map((value, i) => (
                  <p key={i} className="text-body-s text-secondary">{value}</p>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { MarketingHero } from '../components/MarketingHero';
import { Seo } from '../components/Seo';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { FolderOpen } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useLocalizedPicker } from '../lib/cms/useLocalized';
import { listCaseStudies, getMediaPublicUrl } from '../lib/cms/api';
import type { CaseStudy } from '../lib/cms/types';

/** /case-studies — entries edited from /gestao (alio_case_studies). */
export default function CaseStudiesPage() {
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';
  const pick = useLocalizedPicker();
  const [cases, setCases] = useState<CaseStudy[] | null>(null);

  useEffect(() => {
    listCaseStudies({ onlyPublished: true })
      .then(setCases)
      .catch(() => setCases([]));
  }, []);

  return (
    <Layout showBackButton>
      <Seo
        title={isPt ? 'Casos de Estudo' : 'Case Studies'}
        description={isPt ? 'Como a Alio transforma sistemas complexos em software claro e fiável.' : 'How Alio turns complex systems into clear, reliable software.'}
        path="/case-studies"
      />
      <MarketingHero
        eyebrow={isPt ? 'Portfólio' : 'Portfolio'}
        title={isPt ? 'Casos de Estudo' : 'Case Studies'}
        subtitle={isPt
          ? 'Como transformamos sistemas complexos em software claro e fiável para organizações em Angola e em África.'
          : 'How we turn complex systems into clear, reliable software for organisations across Angola and Africa.'}
      />

      <section className="bg-bg py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          {cases === null ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64" />)}
            </div>
          ) : cases.length === 0 ? (
            <EmptyState
              icon={<FolderOpen size={22} />}
              title={isPt ? 'Ainda sem casos de estudo' : 'No case studies yet'}
              description={isPt
                ? 'Os casos publicados no painel de gestão aparecem aqui.'
                : 'Case studies published from the management panel will appear here.'}
            />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <Link key={c.slug} to={`/case-studies/${c.slug}`} className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg">
                  <Card interactive padding="none" className="h-full overflow-hidden">
                    <div className="flex h-40 items-center justify-center bg-gradient-brand-135">
                      {c.cover_path ? (
                        <img src={getMediaPublicUrl(c.cover_path)} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="font-mono text-caption uppercase tracking-widest text-white/70">Cover image</span>
                      )}
                    </div>
                    <div className="p-6">
                      {c.industry && <Badge variant="brand" size="sm" className="mb-3">{c.industry}</Badge>}
                      <h3 className="font-display text-h5 text-primary transition-colors group-hover:text-brand">{pick(c.title)}</h3>
                      {c.client && <p className="mt-1 text-caption text-tertiary">{c.client}</p>}
                      <p className="mt-3 text-body-s text-secondary">{pick(c.summary)}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

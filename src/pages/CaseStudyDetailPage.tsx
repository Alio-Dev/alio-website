import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Seo } from '../components/Seo';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { useLanguage } from '../hooks/useLanguage';
import { useLocalizedPicker } from '../lib/cms/useLocalized';
import { listCaseStudies, getMediaPublicUrl } from '../lib/cms/api';
import type { CaseStudy } from '../lib/cms/types';

/** /case-studies/:slug — challenge/solution/results the admin already
 * writes in /gestao, finally rendered somewhere on the public site. */
export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';
  const pick = useLocalizedPicker();
  const [study, setStudy] = useState<CaseStudy | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) { setStudy(null); return; }
    let cancelled = false;
    listCaseStudies({ onlyPublished: true })
      .then((all) => { if (!cancelled) setStudy(all.find((c) => c.slug === slug) ?? null); })
      .catch(() => { if (!cancelled) setStudy(null); });
    return () => { cancelled = true; };
  }, [slug]);

  if (study === undefined) {
    return (
      <Layout showBackButton>
        <div className="mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }

  if (!study) {
    return (
      <Layout showBackButton>
        <div className="mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
          <EmptyState
            title={isPt ? 'Caso não encontrado' : 'Case study not found'}
            action={<Link to="/case-studies"><Button variant="outline">{isPt ? '← Voltar aos casos' : '← Back to case studies'}</Button></Link>}
          />
        </div>
      </Layout>
    );
  }

  const title = pick(study.title);
  const challenge = study.challenge ? pick(study.challenge) : '';
  const solution = study.solution ? pick(study.solution) : '';
  const results = study.results ? pick(study.results) : '';

  return (
    <Layout showBackButton>
      <Seo title={title} description={pick(study.summary)} path={`/case-studies/${slug ?? ''}`} />
      <article className="bg-bg py-16">
        <div className="mx-auto max-w-prose px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[{ label: isPt ? 'Casos de Estudo' : 'Case Studies', href: '/case-studies' }, { label: title }]}
          />

          {study.cover_path && (
            <img src={getMediaPublicUrl(study.cover_path)} alt="" className="mb-8 w-full rounded-xl object-cover" />
          )}

          {study.industry && (
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="brand" size="sm">{study.industry}</Badge>
            </div>
          )}

          <h1 className="font-display text-h1 text-primary">{title}</h1>
          {study.client && <p className="mt-3 text-body-s text-tertiary">{study.client}</p>}
          <p className="mt-6 text-body-l text-secondary">{pick(study.summary)}</p>

          <div className="mt-10 flex flex-col gap-8">
            {challenge && (
              <div>
                <h2 className="font-display text-h3 text-primary">{isPt ? 'Desafio' : 'Challenge'}</h2>
                <p className="mt-2 text-body-m text-secondary">{challenge}</p>
              </div>
            )}
            {solution && (
              <div>
                <h2 className="font-display text-h3 text-primary">{isPt ? 'Solução' : 'Solution'}</h2>
                <p className="mt-2 text-body-m text-secondary">{solution}</p>
              </div>
            )}
            {results && (
              <div>
                <h2 className="font-display text-h3 text-primary">{isPt ? 'Resultados' : 'Results'}</h2>
                <p className="mt-2 text-body-m text-secondary">{results}</p>
              </div>
            )}
          </div>

          <div className="mt-12 border-t border-border-subtle pt-8">
            <Link to="/case-studies"><Button variant="outline">{isPt ? '← Voltar aos casos' : '← Back to case studies'}</Button></Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

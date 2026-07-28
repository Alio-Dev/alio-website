import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { MarketingHero } from '../components/MarketingHero';
import { Seo } from '../components/Seo';
import { Alert } from '../components/ui/Alert';
import { Skeleton } from '../components/ui/Skeleton';
import { useLanguage } from '../hooks/useLanguage';
import { getLegalDoc } from '../lib/cms/api';
import type { LegalDocRow } from '../lib/cms/types';

/**
 * /privacy and /terms. Content is edited from /gestao (alio_legal_docs),
 * seeded from the Angola-specific draft (Law No. 22/11 + the APD) that used
 * to live in src/data/legal.ts. It is a good-faith draft, not legal advice —
 * have counsel review before relying on it.
 */
export default function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'pt' ? 'pt' : 'en';
  const isPt = lang === 'pt';

  const [doc, setDoc] = useState<LegalDocRow | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getLegalDoc(kind)
      .then((d) => { if (!cancelled) setDoc(d); })
      .catch(() => { if (!cancelled) setDoc(null); });
    return () => { cancelled = true; };
  }, [kind]);

  const title = kind === 'privacy'
    ? (isPt ? 'Política de Privacidade' : 'Privacy Policy')
    : (isPt ? 'Termos e Condições' : 'Terms & Conditions');

  if (doc === undefined) {
    return (
      <Layout showBackButton>
        <MarketingHero eyebrow="Legal" title={title} />
        <div className="mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (!doc) {
    return (
      <Layout showBackButton>
        <MarketingHero eyebrow="Legal" title={title} />
        <div className="mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
          <Alert variant="danger">
            {isPt ? 'Não foi possível carregar este documento.' : 'This document could not be loaded.'}
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBackButton>
      <Seo title={title} description={doc.intro[lang].slice(0, 155)} path={kind === 'privacy' ? '/privacy' : '/terms'} />
      <MarketingHero eyebrow="Legal" title={title} />

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-prose px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-body-s text-tertiary">
            {isPt ? 'Última actualização' : 'Last updated'}:{' '}
            <time dateTime={doc.updated_at}>{doc.updated_at.slice(0, 10)}</time>
          </p>

          <Alert variant="info" className="mb-10">
            {isPt
              ? 'Este documento foi elaborado de boa-fé e alinhado à legislação angolana. Não constitui aconselhamento jurídico — recomenda-se a validação por assessoria jurídica antes da publicação definitiva.'
              : 'This document is drafted in good faith and aligned with Angolan law. It does not constitute legal advice — validation by legal counsel is recommended before final publication.'}
          </Alert>

          <p className="mb-10 text-body-l text-secondary">{doc.intro[lang]}</p>

          <div className="flex flex-col gap-8">
            {doc.sections.map((s, i) => (
              <div key={i}>
                <h2 className="mb-2 font-display text-h4 text-primary">
                  {i + 1}. {s.heading[lang]}
                </h2>
                <p className="text-body-m text-secondary">{s.body[lang]}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 border-t border-border-subtle pt-6 text-body-s text-tertiary">
            Alio Analytics, Lda · NIF 5001021800 · Rua 49, Bairro Nova Vida, Edifício E-67,
            Kilamba Kiaxi, Luanda, Angola · info@alio.ao
          </p>
        </div>
      </section>
    </Layout>
  );
}

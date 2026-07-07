import { useEffect } from 'react';
import Layout from '../components/Layout';
import { MarketingHero } from '../components/MarketingHero';
import { Alert } from '../components/ui/Alert';
import { useLanguage } from '../hooks/useLanguage';
import { PRIVACY, TERMS } from '../data/legal';

/**
 * /privacy and /terms. Content is drafted for Angola (Law No. 22/11 + the APD)
 * in src/data/legal.ts. It is a good-faith draft, not legal advice — have
 * counsel review before relying on it.
 */
export default function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'pt' ? 'pt' : 'en';
  const isPt = lang === 'pt';

  const doc = kind === 'privacy' ? PRIVACY : TERMS;
  const title = kind === 'privacy'
    ? (isPt ? 'Política de Privacidade' : 'Privacy Policy')
    : (isPt ? 'Termos e Condições' : 'Terms & Conditions');

  useEffect(() => {
    document.title = `${title} · Alio Analytics`;
  }, [title]);

  return (
    <Layout showBackButton>
      <MarketingHero eyebrow={isPt ? 'Legal' : 'Legal'} title={title} />

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-prose px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-body-s text-tertiary">
            {isPt ? 'Última actualização' : 'Last updated'}:{' '}
            <time dateTime={doc.updated}>{doc.updated}</time>
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

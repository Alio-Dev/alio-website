import { useEffect } from 'react';
import Layout from '../components/Layout';
import { MarketingHero } from '../components/MarketingHero';
import { Alert } from '../components/ui/Alert';
import { useLanguage } from '../hooks/useLanguage';

/**
 * SCAFFOLD — /privacy and /terms. Section headings are placeholders; the real
 * legal text must be supplied (ideally reviewed by counsel). Do not ship the
 * placeholder body as binding legal copy.
 */
export default function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';

  const title = kind === 'privacy'
    ? (isPt ? 'Política de Privacidade' : 'Privacy Policy')
    : (isPt ? 'Termos e Condições' : 'Terms & Conditions');

  const sections = kind === 'privacy'
    ? (isPt
        ? ['Dados que recolhemos', 'Como usamos os dados', 'Base legal', 'Partilha com terceiros', 'Retenção', 'Os seus direitos', 'Cookies', 'Contacto']
        : ['Data we collect', 'How we use data', 'Legal basis', 'Third-party sharing', 'Retention', 'Your rights', 'Cookies', 'Contact'])
    : (isPt
        ? ['Aceitação dos termos', 'Utilização do serviço', 'Propriedade intelectual', 'Limitação de responsabilidade', 'Rescisão', 'Lei aplicável', 'Alterações', 'Contacto']
        : ['Acceptance of terms', 'Use of the service', 'Intellectual property', 'Limitation of liability', 'Termination', 'Governing law', 'Changes', 'Contact']);

  useEffect(() => {
    document.title = `${title} · Alio Analytics`;
  }, [title]);

  return (
    <Layout showBackButton>
      <MarketingHero draft eyebrow={isPt ? 'Legal' : 'Legal'} title={title} />

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-prose px-4 sm:px-6 lg:px-8">
          <Alert variant="warning" title={isPt ? 'Texto legal por fornecer' : 'Legal text to be provided'} className="mb-10">
            {isPt
              ? 'Este é um modelo com a estrutura de secções. Substitua por texto legal real, revisto por assessoria jurídica, antes de publicar.'
              : 'This is a scaffold with the section structure. Replace with real legal text, reviewed by counsel, before publishing.'}
          </Alert>

          <div className="flex flex-col gap-8">
            {sections.map((heading, i) => (
              <div key={i}>
                <h2 className="mb-2 font-display text-h4 text-primary">{i + 1}. {heading}</h2>
                <p className="text-body-m text-secondary">
                  {isPt ? 'Conteúdo por adicionar.' : 'Content to be added.'}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 border-t border-border-subtle pt-6 text-body-s text-tertiary">
            Alio Analytics, Lda · NIF 5001021800 · Kilamba Kiaxi, Luanda, Angola
          </p>
        </div>
      </section>
    </Layout>
  );
}

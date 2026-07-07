import Layout from '../components/Layout';
import { MarketingHero } from '../components/MarketingHero';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { FolderOpen, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

/**
 * SCAFFOLD — /case-studies. Replace PLACEHOLDER_CASES with real client work
 * (title, client, sector, summary, result metrics, cover image, slug).
 */
const PLACEHOLDER_CASES = [
  { title: 'Case study title', client: 'Client / sector', tag: 'GIS', summary: 'One or two sentences on the problem, what Alio built, and the measurable outcome.' },
  { title: 'Case study title', client: 'Client / sector', tag: 'Data & BI', summary: 'One or two sentences on the problem, what Alio built, and the measurable outcome.' },
  { title: 'Case study title', client: 'Client / sector', tag: 'Web & Mobile', summary: 'One or two sentences on the problem, what Alio built, and the measurable outcome.' },
];

export default function CaseStudiesPage() {
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';

  return (
    <Layout showBackButton>
      <MarketingHero
        draft
        eyebrow={isPt ? 'Portfólio' : 'Portfolio'}
        title={isPt ? 'Casos de Estudo' : 'Case Studies'}
        subtitle={isPt
          ? 'Como transformamos sistemas complexos em software claro e fiável para organizações em Angola e em África.'
          : 'How we turn complex systems into clear, reliable software for organisations across Angola and Africa.'}
      />

      <section className="bg-bg py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_CASES.map((c, i) => (
              <Card key={i} interactive padding="none" className="overflow-hidden">
                <div className="flex h-40 items-center justify-center bg-gradient-brand-135">
                  <span className="font-mono text-caption uppercase tracking-widest text-white/70">Cover image</span>
                </div>
                <div className="p-6">
                  <Badge variant="brand" size="sm" className="mb-3">{c.tag}</Badge>
                  <h3 className="font-display text-h5 text-primary">{c.title}</h3>
                  <p className="mt-1 text-caption text-tertiary">{c.client}</p>
                  <p className="mt-3 text-body-s text-secondary">{c.summary}</p>
                  <div className="mt-4 flex items-center gap-1 text-body-s font-semibold text-brand">
                    {isPt ? 'Ler caso' : 'Read case'} <ArrowRight size={15} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <EmptyState
              icon={<FolderOpen size={22} />}
              title={isPt ? 'Conteúdo por adicionar' : 'Content to be added'}
              description={isPt
                ? 'Este é um modelo. Envie os casos de estudo reais (cliente, desafio, solução, resultados e imagens) para publicar.'
                : 'This is a scaffold. Provide the real case studies (client, challenge, solution, results and images) to publish.'}
              action={<Button variant="outline">{isPt ? 'Falar connosco' : 'Talk to us'}</Button>}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

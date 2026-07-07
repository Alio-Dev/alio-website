import Layout from '../components/Layout';
import { MarketingHero } from '../components/MarketingHero';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Briefcase, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

/**
 * SCAFFOLD — /careers. Replace PLACEHOLDER_ROLES with real openings
 * (title, team, location, type, applyHref) and the culture points.
 */
const PLACEHOLDER_ROLES = [
  { title: 'Role title', team: 'Engineering', location: 'Luanda / Remote', type: 'Full-time' },
  { title: 'Role title', team: 'Design', location: 'Luanda / Remote', type: 'Full-time' },
];

export default function CareersPage() {
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';

  const culture = isPt
    ? ['Engenharia de precisão', 'Clareza humana', 'Ambição africana', 'Confiança de longo prazo']
    : ['Engineered precision', 'Human clarity', 'African ambition', 'Long-term trust'];

  return (
    <Layout showBackButton>
      <MarketingHero
        draft
        eyebrow={isPt ? 'Carreiras' : 'Careers'}
        title={isPt ? 'Construa connosco' : 'Build with us'}
        subtitle={isPt
          ? 'Engenharia e design de classe mundial, feitos a partir de Luanda. Junte-se a uma equipa que transforma complexidade em clareza.'
          : 'World-class engineering and design, delivered from Luanda. Join a team that turns complexity into clarity.'}
      />

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap gap-2">
            {culture.map((c) => <Badge key={c} variant="brand">{c}</Badge>)}
          </div>

          <h2 className="mb-6 font-display text-h3 text-primary">{isPt ? 'Vagas abertas' : 'Open roles'}</h2>
          <div className="space-y-4">
            {PLACEHOLDER_ROLES.map((role, i) => (
              <Card key={i} interactive className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-h6 text-primary">{role.title}</h3>
                    <p className="text-body-s text-tertiary">{role.team} · {role.location} · {role.type}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" rightIcon={<ArrowRight size={15} />}>{isPt ? 'Candidatar' : 'Apply'}</Button>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <EmptyState
              icon={<Briefcase size={22} />}
              title={isPt ? 'Vagas por publicar' : 'Roles to be published'}
              description={isPt
                ? 'Modelo de página. Envie as vagas reais e o link de candidatura para publicar.'
                : 'Page scaffold. Provide the real openings and application link to publish.'}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { MarketingHero } from '../components/MarketingHero';
import { Seo } from '../components/Seo';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { Briefcase, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useLocalizedPicker } from '../lib/cms/useLocalized';
import { listJobOpenings } from '../lib/cms/api';
import type { JobOpening } from '../lib/cms/types';

/** /careers — open roles edited from /gestao (alio_job_openings). */
export default function CareersPage() {
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';
  const pick = useLocalizedPicker();
  const [roles, setRoles] = useState<JobOpening[] | null>(null);

  useEffect(() => {
    listJobOpenings({ onlyPublished: true })
      .then(setRoles)
      .catch(() => setRoles([]));
  }, []);

  const culture = isPt
    ? ['Engenharia de precisão', 'Clareza humana', 'Ambição africana', 'Confiança de longo prazo']
    : ['Engineered precision', 'Human clarity', 'African ambition', 'Long-term trust'];

  return (
    <Layout showBackButton>
      <Seo
        title={isPt ? 'Carreiras' : 'Careers'}
        description={isPt ? 'Junte-se à Alio Analytics — engenharia e design de classe mundial a partir de Luanda.' : 'Join Alio Analytics — world-class engineering and design from Luanda.'}
        path="/careers"
      />
      <MarketingHero
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

          {roles === null ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
            </div>
          ) : roles.length === 0 ? (
            <EmptyState
              icon={<Briefcase size={22} />}
              title={isPt ? 'Sem vagas abertas de momento' : 'No open roles right now'}
              description={isPt
                ? 'As vagas publicadas no painel de gestão aparecem aqui.'
                : 'Roles published from the management panel will appear here.'}
            />
          ) : (
            <div className="space-y-4">
              {roles.map((role) => (
                <Card key={role.slug} interactive className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h3 className="font-display text-h6 text-primary">{pick(role.title)}</h3>
                      <p className="text-body-s text-tertiary">
                        {[role.department, role.location, role.employment_type].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight size={15} />}>
                    {isPt ? 'Candidatar' : 'Apply'}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

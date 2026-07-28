import { useEffect, useState } from 'react';
import Layout from '../Layout';
import ServiceHero from '../ServiceHero';
import ServiceFeatures from '../ServiceFeatures';
import ContactModal from '../ContactModal';
import { Skeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import { getServicePageBySlug } from '../../lib/cms/api';
import { useLocalizedPicker } from '../../lib/cms/useLocalized';
import { resolveServiceIcon } from './serviceIconMap';
import type { ServicePage } from '../../lib/cms/types';

export function ServiceTemplatePage({ slug }: { slug: string }) {
  const [page, setPage] = useState<ServicePage | null | undefined>(undefined);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const pick = useLocalizedPicker();

  useEffect(() => {
    let cancelled = false;
    getServicePageBySlug(slug)
      .then((p) => { if (!cancelled) setPage(p); })
      .catch(() => { if (!cancelled) setPage(null); });
    return () => { cancelled = true; };
  }, [slug]);

  if (page === undefined) {
    return (
      <Layout showBackButton>
        <div className="min-h-[70vh]">
          <Skeleton className="h-[70vh] w-full" />
        </div>
      </Layout>
    );
  }

  if (page === null) {
    return (
      <Layout showBackButton>
        <div className="mx-auto max-w-2xl px-4 py-24">
          <EmptyState title="Conteúdo indisponível" description="Não foi possível carregar esta página de serviço." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBackButton>
      <ServiceHero
        icon={resolveServiceIcon(page.icon)}
        title={pick(page.title)}
        subtitle={pick(page.subtitle)}
        description={pick(page.description)}
        gradient={page.gradient}
      />
      <ServiceFeatures
        title={pick(page.features_title)}
        features={page.features.map((f) => ({ title: pick(f.title), description: pick(f.description) }))}
        technologies={page.technologies}
        serviceType={page.service_type}
        onContactClick={() => setIsContactModalOpen(true)}
      />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </Layout>
  );
}

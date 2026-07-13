import { Link } from 'react-router-dom';
import { FileWarning, ArrowLeft, Mail } from 'lucide-react';
import Layout from '../components/Layout';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Catch-all 404 — rendered for any route that doesn't match (typo'd URL,
 * removed page, bad external link). Calm, on-brand, gives a next step;
 * never indexed (see <Seo noindex>).
 */
export default function NotFoundPage() {
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';

  return (
    <Layout>
      <Seo
        title={isPt ? 'Página não encontrada' : 'Page not found'}
        noindex
      />
      <section className="flex min-h-[70vh] items-center justify-center bg-bg px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex max-w-lg flex-col items-center gap-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-subtle text-brand">
            <FileWarning size={26} />
          </span>
          <div>
            <p className="font-mono text-overline uppercase tracking-[0.08em] text-tertiary">
              {isPt ? 'Erro 404' : 'Error 404'}
            </p>
            <h1 className="mt-1 font-display text-h2 text-primary md:text-h1">
              {isPt ? 'Não encontrámos essa página' : "We couldn't find that page"}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-body-m text-secondary">
              {isPt
                ? 'O endereço pode estar incorreto ou a página pode ter sido movida. Os seus dados estão seguros — volte ao início ou contacte-nos para continuar.'
                : "The address may be wrong, or the page may have moved. Your data is safe — head back to the homepage or contact us to continue."}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link to="/">
              <Button leftIcon={<ArrowLeft size={16} />}>
                {isPt ? 'Voltar ao início' : 'Back to homepage'}
              </Button>
            </Link>
            <a href="mailto:info@alio.ao">
              <Button variant="outline" leftIcon={<Mail size={16} />}>
                {isPt ? 'Contactar-nos' : 'Contact us'}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { MarketingHero } from '../components/MarketingHero';
import { Seo } from '../components/Seo';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../hooks/useLanguage';

/**
 * SCAFFOLD — /blog. Replace PLACEHOLDER_POSTS with real posts (title, excerpt,
 * category, date, author, slug, cover). A real CMS/MDX source can back this later.
 */
export const PLACEHOLDER_POSTS = [
  { slug: 'post-one', title: 'Article title goes here', category: 'Engineering', date: '2026-01-01', excerpt: 'A one- or two-sentence summary of the article that draws the reader in.' },
  { slug: 'post-two', title: 'Article title goes here', category: 'Data & AI', date: '2026-01-01', excerpt: 'A one- or two-sentence summary of the article that draws the reader in.' },
  { slug: 'post-three', title: 'Article title goes here', category: 'Design', date: '2026-01-01', excerpt: 'A one- or two-sentence summary of the article that draws the reader in.' },
];

export default function BlogPage() {
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';

  return (
    <Layout showBackButton>
      <Seo
        title={isPt ? 'Blog e Insights' : 'Blog & Insights'}
        description={isPt ? 'Ideias sobre engenharia, dados e design da Alio Analytics.' : 'Notes on engineering, data and design from Alio Analytics.'}
        path="/blog"
      />
      <MarketingHero
        draft
        eyebrow={isPt ? 'Insights' : 'Insights'}
        title={isPt ? 'Blog e Insights' : 'Blog & Insights'}
        subtitle={isPt
          ? 'Ideias sobre engenharia, dados e design — construídas em Angola, pensadas para o mundo.'
          : 'Notes on engineering, data and design — built in Angola, engineered for the world.'}
      />

      <section className="bg-bg py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_POSTS.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg">
                <Card interactive padding="none" className="h-full overflow-hidden">
                  <div className="flex h-40 items-center justify-center bg-bg-subtle">
                    <span className="font-mono text-caption uppercase tracking-widest text-tertiary">Cover image</span>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="accent" size="sm">{post.category}</Badge>
                      <time className="text-caption text-tertiary" dateTime={post.date}>{post.date}</time>
                    </div>
                    <h2 className="font-display text-h5 text-primary transition-colors group-hover:text-brand">{post.title}</h2>
                    <p className="mt-2 text-body-s text-secondary">{post.excerpt}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

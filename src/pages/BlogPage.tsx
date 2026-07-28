import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { MarketingHero } from '../components/MarketingHero';
import { Seo } from '../components/Seo';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { useLanguage } from '../hooks/useLanguage';
import { useLocalizedPicker } from '../lib/cms/useLocalized';
import { listBlogPosts, getMediaPublicUrl } from '../lib/cms/api';
import type { BlogPost } from '../lib/cms/types';

/** /blog — posts are edited from /gestao (alio_blog_posts). Empty until published. */
export default function BlogPage() {
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';
  const pick = useLocalizedPicker();
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    listBlogPosts({ onlyPublished: true })
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <Layout showBackButton>
      <Seo
        title={isPt ? 'Blog e Insights' : 'Blog & Insights'}
        description={isPt ? 'Ideias sobre engenharia, dados e design da Alio Analytics.' : 'Notes on engineering, data and design from Alio Analytics.'}
        path="/blog"
      />
      <MarketingHero
        eyebrow="Insights"
        title={isPt ? 'Blog e Insights' : 'Blog & Insights'}
        subtitle={isPt
          ? 'Ideias sobre engenharia, dados e design — construídas em Angola, pensadas para o mundo.'
          : 'Notes on engineering, data and design — built in Angola, engineered for the world.'}
      />

      <section className="bg-bg py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          {posts === null ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64" />)}
            </div>
          ) : posts.length === 0 ? (
            <EmptyState
              title={isPt ? 'Ainda sem artigos' : 'No articles yet'}
              description={isPt ? 'Os artigos publicados no painel de gestão aparecem aqui.' : 'Articles published from the management panel will appear here.'}
            />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg">
                  <Card interactive padding="none" className="h-full overflow-hidden">
                    <div className="flex h-40 items-center justify-center bg-bg-subtle">
                      {post.cover_path ? (
                        <img src={getMediaPublicUrl(post.cover_path)} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="font-mono text-caption uppercase tracking-widest text-tertiary">Cover image</span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-2">
                        {post.category && <Badge variant="accent" size="sm">{post.category}</Badge>}
                        {post.published_at && (
                          <time className="text-caption text-tertiary" dateTime={post.published_at}>
                            {post.published_at.slice(0, 10)}
                          </time>
                        )}
                      </div>
                      <h2 className="font-display text-h5 text-primary transition-colors group-hover:text-brand">{pick(post.title)}</h2>
                      <p className="mt-2 text-body-s text-secondary">{pick(post.excerpt)}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

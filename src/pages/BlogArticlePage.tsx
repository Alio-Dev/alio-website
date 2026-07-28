import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Seo } from '../components/Seo';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { useLanguage } from '../hooks/useLanguage';
import { useLocalizedPicker } from '../lib/cms/useLocalized';
import { getBlogPostBySlug } from '../lib/cms/api';
import { renderBody } from '../lib/cms/markdown';
import type { BlogPost } from '../lib/cms/types';

/** /blog/:slug — article template, content edited from /gestao. */
export default function BlogArticlePage() {
  const { slug } = useParams();
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';
  const pick = useLocalizedPicker();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) { setPost(null); return; }
    let cancelled = false;
    getBlogPostBySlug(slug)
      .then((p) => { if (!cancelled) setPost(p && p.published ? p : null); })
      .catch(() => { if (!cancelled) setPost(null); });
    return () => { cancelled = true; };
  }, [slug]);

  if (post === undefined) {
    return (
      <Layout showBackButton>
        <div className="mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout showBackButton>
        <div className="mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
          <EmptyState
            title={isPt ? 'Artigo não encontrado' : 'Article not found'}
            action={<Link to="/blog"><Button variant="outline">{isPt ? '← Voltar ao blog' : '← Back to blog'}</Button></Link>}
          />
        </div>
      </Layout>
    );
  }

  const title = pick(post.title);
  const body = pick(post.body);

  return (
    <Layout showBackButton>
      <Seo title={title} description={pick(post.excerpt)} path={`/blog/${slug ?? ''}`} />
      <article className="bg-bg py-16">
        <div className="mx-auto max-w-prose px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[{ label: 'Blog', href: '/blog' }, { label: title }]}
          />

          {post.category && (
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="accent" size="sm">{post.category}</Badge>
            </div>
          )}

          <h1 className="font-display text-h1 text-primary">{title}</h1>
          <p className="mt-3 text-body-s text-tertiary">
            {post.author ?? (isPt ? 'Alio Analytics' : 'Alio Analytics')}
            {post.published_at && <> · <time dateTime={post.published_at}>{post.published_at.slice(0, 10)}</time></>}
          </p>

          <div className="mt-8 flex flex-col gap-4 text-body-l text-secondary">
            {renderBody(body)}
          </div>

          <div className="mt-12 border-t border-border-subtle pt-8">
            <Link to="/blog"><Button variant="outline">{isPt ? '← Voltar ao blog' : '← Back to blog'}</Button></Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

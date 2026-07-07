import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Seo } from '../components/Seo';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useLanguage } from '../hooks/useLanguage';
import { PLACEHOLDER_POSTS } from './BlogPage';

/**
 * SCAFFOLD — /blog/:slug. Article template. Wire real content (MDX/CMS) into
 * the prose area. Falls back gracefully for unknown slugs.
 */
export default function BlogArticlePage() {
  const { slug } = useParams();
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';
  const post = PLACEHOLDER_POSTS.find((p) => p.slug === slug);

  return (
    <Layout showBackButton>
      <Seo
        title={post?.title ?? (isPt ? 'Artigo' : 'Article')}
        description={post?.excerpt}
        path={`/blog/${slug ?? ''}`}
      />
      <article className="bg-bg py-16">
        <div className="mx-auto max-w-prose px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: isPt ? 'Blog' : 'Blog', href: '/blog' },
              { label: post?.title ?? (isPt ? 'Artigo' : 'Article') },
            ]}
          />

          <div className="mb-3 flex items-center gap-2">
            <Badge variant="accent" size="sm">{post?.category ?? 'Category'}</Badge>
            <Badge variant="warning" size="sm">Draft — content pending</Badge>
          </div>

          <h1 className="font-display text-h1 text-primary">
            {post?.title ?? (isPt ? 'Título do artigo' : 'Article title')}
          </h1>
          <p className="mt-3 text-body-s text-tertiary">
            {isPt ? 'Por Alio Analytics' : 'By Alio Analytics'} · <time dateTime={post?.date}>{post?.date ?? '2026'}</time>
          </p>

          <div className="mt-8 flex flex-col gap-4 text-body-l text-secondary">
            <p>
              {isPt
                ? 'Este é um modelo de artigo. Substitua este texto pelo conteúdo real do post. A largura da coluna segue a medida de leitura ideal (máx. 680px) definida no design system.'
                : 'This is an article template. Replace this text with the real post content. The column width follows the ideal reading measure (max 680px) defined in the design system.'}
            </p>
            <h2 className="mt-4 font-display text-h3 text-primary">{isPt ? 'Subtítulo de secção' : 'Section heading'}</h2>
            <p>
              {isPt
                ? 'Parágrafo de exemplo. Use títulos, listas, citações e código conforme necessário — todos herdam a tipografia e as cores da marca.'
                : 'Sample paragraph. Use headings, lists, quotes and code as needed — all inherit the brand typography and colours.'}
            </p>
          </div>

          <div className="mt-12 border-t border-border-subtle pt-8">
            <Link to="/blog"><Button variant="outline">{isPt ? '← Voltar ao blog' : '← Back to blog'}</Button></Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

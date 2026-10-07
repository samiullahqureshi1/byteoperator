import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {contentPageJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
import {ArticlesPageView} from '~/components/articles/ArticlesPageView';
import {ARTICLES_DATA, type ArticleItem} from '~/data/articlesData';
import {getCmsArticles} from '~/lib/cms/db';

export const metadata: Metadata = pageMetadata({
  title: 'Articles & Insights | Byte Operator',
  description:
    'Read our latest insights on software development, CRO frameworks, SEO strategies, and generative AI commerce optimization.',
  path: '/articles',
});

export const dynamic = 'force-dynamic';

export default function ArticlesPage() {
  const cmsArticles = getCmsArticles(false);
  
  const allArticles: ArticleItem[] = cmsArticles && cmsArticles.length > 0
    ? cmsArticles.map((art) => ({
        id: art.id,
        handle: art.handle,
        path: `/articles/${art.handle}`,
        title: art.title,
        excerpt: art.excerpt,
        publishedAt: art.publishedAt,
        updatedAt: art.updatedAt,
        category: art.category,
        articleType: art.articleType,
        featured: art.featured,
        mainFeatured: art.mainFeatured,
        image: art.image,
        seo: art.seo,
      }))
    : ARTICLES_DATA;

  const cards = allArticles.map(({contentHtml, faqs, seo, ...card}: any) => card);
  const featuredArticle = cards.find((a) => a.mainFeatured) || cards[0];

  const graph = contentPageJsonLd({
    path: '/articles',
    name: String(metadata.title).replace(/ \| Byte Operator$/, ''),
    description: String(metadata.description),
    type: 'CollectionPage',
    breadcrumbs: [{name: 'Articles', path: '/articles'}],
    items: allArticles.map((article) => ({name: article.title, path: article.path})),
  });

  return (
    <>
      <JsonLd graph={graph} />
      <ArticlesPageView
        articles={cards as ArticleItem[]}
        featuredArticle={featuredArticle as ArticleItem}
      />
    </>
  );
}

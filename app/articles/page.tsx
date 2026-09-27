import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {contentPageJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
import {ArticlesPageView} from '~/components/articles/ArticlesPageView';
import {ARTICLES_DATA} from '~/data/articlesData';

export const metadata: Metadata = pageMetadata({
  title: 'Articles & Insights | Byte Operator',
  description:
    'Read our latest insights on software development, CRO frameworks, SEO strategies, and generative AI commerce optimization.',
  path: '/articles',
});

export default function ArticlesPage() {
  const featuredArticle = ARTICLES_DATA.find((a) => a.mainFeatured) || ARTICLES_DATA[0];

  // CollectionPage + ItemList of the articles this page lists.
  const graph = contentPageJsonLd({
    path: '/articles',
    name: String(metadata.title).replace(/ \| Byte Operator$/, ''),
    description: String(metadata.description),
    type: 'CollectionPage',
    breadcrumbs: [{name: 'Articles', path: '/articles'}],
    items: ARTICLES_DATA.map((article) => ({name: article.title, path: article.path})),
  });

  return (
    <>
      <JsonLd graph={graph} />
      <ArticlesPageView
        articles={ARTICLES_DATA}
        featuredArticle={featuredArticle}
      />
    </>
  );
}

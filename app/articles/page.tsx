import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {contentPageJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
import {ArticlesPageView} from '~/components/articles/ArticlesPageView';
import {ARTICLES_DATA, type ArticleItem} from '~/data/articlesData';

export const metadata: Metadata = pageMetadata({
  title: 'Articles & Insights | Byte Operator',
  description:
    'Read our latest insights on software development, CRO frameworks, SEO strategies, and generative AI commerce optimization.',
  path: '/articles',
});

export default function ArticlesPage() {
  // The listing only shows cards, so the full article bodies and FAQs are
  // left out of the props (they were serialized into every /articles page).
  const cards = ARTICLES_DATA.map(({contentHtml, faqs, seo, ...card}) => card);
  const featuredArticle = cards.find((a) => a.mainFeatured) || cards[0];

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
        articles={cards as ArticleItem[]}
        featuredArticle={featuredArticle as ArticleItem}
      />
    </>
  );
}

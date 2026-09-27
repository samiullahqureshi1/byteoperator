import type {Metadata} from 'next';
import {ArticlesPageView} from '~/components/articles/ArticlesPageView';
import {ARTICLES_DATA} from '~/data/articlesData';

export const metadata: Metadata = {
  title: 'Articles & Insights | Byte Operator - Software & Ecommerce Strategy',
  description:
    'Read our latest insights on software development, CRO frameworks, SEO strategies, and generative AI commerce optimization.',
  alternates: {
    canonical: 'https://www.byteoperator.com/articles',
  },
};

export default function ArticlesPage() {
  const featuredArticle = ARTICLES_DATA.find((a) => a.mainFeatured) || ARTICLES_DATA[0];

  return (
    <ArticlesPageView
      articles={ARTICLES_DATA}
      featuredArticle={featuredArticle}
    />
  );
}

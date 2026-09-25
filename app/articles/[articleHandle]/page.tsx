import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ArticleDetail} from '~/components/articles/ArticleDetail';
import {ARTICLES_DATA, getArticleByHandle} from '~/data/articlesData';

interface Props {
  params: {
    articleHandle: string;
  };
}

export function generateStaticParams() {
  return ARTICLES_DATA.map((article) => ({
    articleHandle: article.handle,
  }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const article = getArticleByHandle(params.articleHandle);
  if (!article) {
    return {title: 'Article | Byte Operator'};
  }
  return {
    title: article.seo?.title || `${article.title} | Byte Operator`,
    description: article.seo?.description || article.excerpt || '',
    alternates: {
      canonical: `https://byteoperator.com/articles/${article.handle}`,
    },
  };
}

export default function ArticlePage({params}: Props) {
  const article = getArticleByHandle(params.articleHandle);

  if (!article) {
    notFound();
  }

  const editorialArticle = {
    title: article.title,
    excerpt: article.excerpt,
    contentHtml: article.contentHtml || `<p>${article.excerpt || ''}</p>`,
    publishedAt: article.publishedAt,
    authorV2: {name: 'Byte Operator Team'},
    articleType: {value: article.articleType},
  };

  return <ArticleDetail article={editorialArticle} />;
}

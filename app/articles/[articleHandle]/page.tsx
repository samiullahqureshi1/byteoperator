import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {notFound} from 'next/navigation';
import {ArticleDetail} from '~/components/articles/ArticleDetail';
import {
  ARTICLES_DATA,
  getArticleByHandle,
  type ArticleFaq,
  type ArticleItem,
} from '~/data/articlesData';
import {getCmsArticleByHandle, getCmsArticles} from '~/lib/cms/db';
import {articleJsonLd} from '~/lib/seo/jsonld';
import {absoluteUrl, faqSchema, jsonLdString} from '~/lib/seo/schema';

interface Props {
  params: {
    articleHandle: string;
  };
}

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  const cmsArts = getCmsArticles(false);
  const handles = new Set<string>();
  cmsArts.forEach(a => handles.add(a.handle));
  ARTICLES_DATA.forEach(a => handles.add(a.handle));

  return Array.from(handles).map((handle) => ({
    articleHandle: handle,
  }));
}

function resolveArticle(handle: string): ArticleItem | undefined {
  const cmsArt = getCmsArticleByHandle(handle);
  if (cmsArt && cmsArt.status === 'published') {
    return {
      id: cmsArt.id,
      handle: cmsArt.handle,
      path: `/articles/${cmsArt.handle}`,
      title: cmsArt.title,
      excerpt: cmsArt.excerpt,
      contentHtml: cmsArt.contentHtml,
      publishedAt: cmsArt.publishedAt,
      updatedAt: cmsArt.updatedAt,
      category: cmsArt.category,
      articleType: cmsArt.articleType,
      featured: cmsArt.featured,
      mainFeatured: cmsArt.mainFeatured,
      image: cmsArt.image,
      seo: cmsArt.seo,
    };
  }
  return getArticleByHandle(handle);
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const article = resolveArticle(params.articleHandle);
  if (!article) {
    return {title: 'Article | Byte Operator'};
  }
  return pageMetadata({
    title: article.seo?.title || `${article.title} | Byte Operator`,
    description: article.seo?.description || article.excerpt || '',
    path: `/articles/${article.handle}`,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    ...(article.image?.url
      ? {
          image: {
            url: article.image.url,
            width: article.image.width ?? 1200,
            height: article.image.height ?? 675,
            alt: article.image.altText || article.title,
          },
        }
      : {}),
  });
}

export default function ArticlePage({params}: Props) {
  const article = resolveArticle(params.articleHandle);

  if (!article) {
    notFound();
  }

  const faqs = article.faqs ?? [];
  const editorialArticle = {
    title: article.title,
    excerpt: article.excerpt,
    contentHtml:
      (article.contentHtml || `<p>${article.excerpt || ''}</p>`) +
      relatedHtml(article.handle) +
      faqHtml(faqs),
    publishedAt: article.publishedAt,
    lastModified: article.updatedAt ? {value: article.updatedAt} : null,
    authorV2: {name: 'Byte Operator Team'},
    articleType: {value: article.articleType},
    image: article.image,
  };

  // Article + WebPage + BreadcrumbList (+ FAQPage) in one @graph.
  const [descriptor] = articleJsonLd({
    path: article.path,
    title: article.title,
    seoDescription: article.seo?.description,
    excerpt: article.excerpt,
    contentHtml: article.contentHtml,
    imageUrl: article.image?.url ? absoluteUrl(article.image.url) : null,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
  });
  const graph = descriptor?.['script:ld+json'];
  if (graph && faqs.length) {
    (graph['@graph'] as unknown[]).push(faqSchema(article.path, faqs));
  }

  return (
    <>
      {graph ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: jsonLdString(graph)}}
        />
      ) : null}
      <ArticleDetail article={editorialArticle} />
    </>
  );
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Links every article to the others, so no guide is a dead end. */
function relatedHtml(currentHandle: string): string {
  const related = ARTICLES_DATA.filter((a) => a.handle !== currentHandle);
  if (!related.length) return '';

  return `<p><strong>Related reading:</strong></p><ul>${related
    .slice(0, 4)
    .map((a) => `<li><a href="${a.path}">${escapeHtml(a.title)}</a></li>`)
    .join('')}</ul>`;
}

/** Visible FAQ section; the same questions feed the FAQPage schema. */
function faqHtml(faqs: ArticleFaq[]): string {
  if (!faqs.length) return '';

  return `<h2>Frequently asked questions</h2>${faqs
    .map(
      ({question, answer}) =>
        `<h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`,
    )
    .join('')}`;
}

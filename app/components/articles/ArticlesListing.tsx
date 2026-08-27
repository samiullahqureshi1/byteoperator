import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {ArticleFilter} from './ArticlesIntro';
import {getArticlePath} from '~/lib/route-mappings';

type ArticleCategory = Exclude<ArticleFilter, 'all'>;

export type ArticlesListingArticle = {
  id: string;
  handle: string;
  title: string;
  excerpt: string | null;
  publishedAt: string;
  image: {
    id?: string;
    altText?: string | null;
    url: string;
    width?: number | null;
    height?: number | null;
  } | null;
  seo: {
    title?: string | null;
    description?: string | null;
  } | null;
  category: ArticleCategory | null;
  articleType: string;
  featured: boolean;
};

type ArticlesListingProps = {
  activeFilter: ArticleFilter;
  articles: ArticlesListingArticle[];
  featuredArticle: ArticlesListingArticle | null;
};

export function ArticlesListing({
  activeFilter,
  articles,
  featuredArticle,
}: ArticlesListingProps) {
  // The big Featured block only renders when the selected article passes the
  // active filter. When it is hidden, nothing is excluded from the grid.
  const visibleFeatured =
    featuredArticle &&
    (activeFilter === 'all' || featuredArticle.category === activeFilter)
      ? featuredArticle
      : null;

  const categoryArticles =
    activeFilter === 'all'
      ? articles
      : articles.filter((article) => article.category === activeFilter);

  // Exclude ONLY the one article rendered in the Featured block, by id.
  // Other articles with `featured_article = true` stay in the grid.
  const filteredArticles = visibleFeatured
    ? categoryArticles.filter((article) => article.id !== visibleFeatured.id)
    : categoryArticles;

  return (
    <section className="ft-articles-listing" aria-label="Articles">
      <div className="ft-articles-listing__container">
        {visibleFeatured ? (
          <FeaturedArticle article={visibleFeatured} />
        ) : null}

        <div className="ft-articles-listing__grid">
          {filteredArticles.map((article, index) => (
            <ArticleCard
              article={article}
              key={article.id}
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedArticle({article}: {article: ArticlesListingArticle}) {
  const articlePath = getArticlePath(article.handle);

  // Only the image and the "Read article" link navigate. The wrapper is a
  // plain <div> so the label, title, excerpt and surrounding space are inert.
  return (
    <article className="ft-articles-featured">
      <div className="ft-articles-featured__link">
        {article.image ? (
          <Link className="ft-articles-featured__image" to={articlePath}>
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading="eager"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          </Link>
        ) : null}

        <div className="ft-articles-featured__content">
          <p className="ft-articles-listing__type">Featured</p>
          <h2>{article.title}</h2>
          {article.excerpt ? <p>{article.excerpt}</p> : null}

          <Link className="ft-articles-featured__cta" to={articlePath}>
            Read article
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function ArticleCard({
  article,
  loading,
}: {
  article: ArticlesListingArticle;
  loading: HTMLImageElement['loading'];
}) {
  return (
    <article className="ft-articles-card">
      <Link to={getArticlePath(article.handle)}>
        {article.image ? (
          <div className="ft-articles-card__image">
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading={loading}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        ) : null}

        <div className="ft-articles-card__content">
          <p className="ft-articles-listing__type">{article.articleType}</p>
          <h2>{article.title}</h2>
          {article.excerpt ? <p>{article.excerpt}</p> : null}
        </div>
      </Link>
    </article>
  );
}
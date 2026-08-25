import type {Storefront} from '@shopify/hydrogen';

export type ArticleCategory =
  | 'cro'
  | 'platform'
  | 'apps'
  | 'seo'
  | 'marketing'
  | 'email';

type MetafieldValue = {value: string} | null;

type IncludedBlog = {
  id: string;
  handle: string;
  title: string;
  seo: {title: string | null; description: string | null} | null;
  showOnArticlesPage: MetafieldValue;
};

type BlogDiscoveryResult = {
  blogs: {
    nodes: IncludedBlog[];
    pageInfo: {hasNextPage: boolean; endCursor: string | null};
  };
};

type RawArticle = {
  id: string;
  handle: string;
  title: string;
  excerpt: string | null;
  publishedAt: string;
  image: {
    id: string;
    altText: string | null;
    url: string;
    width: number | null;
    height: number | null;
  } | null;
  seo: {title: string | null; description: string | null} | null;
  articleCategory: MetafieldValue;
  articleType: MetafieldValue;
  featuredArticle: MetafieldValue;
  mainFeaturedArticle: MetafieldValue;
};

type BlogArticlesResult = {
  blog: {
    articles: {
      nodes: RawArticle[];
      pageInfo: {hasNextPage: boolean; endCursor: string | null};
    };
  } | null;
};

export type ArticlesPageArticle = Omit<
  RawArticle,
  | 'articleCategory'
  | 'articleType'
  | 'featuredArticle'
  | 'mainFeaturedArticle'
> & {
  category: ArticleCategory | null;
  articleType: string;
  featured: boolean;
  mainFeatured: boolean;
};

const ARTICLE_CATEGORIES = new Set<ArticleCategory>([
  'cro',
  'platform',
  'apps',
  'seo',
  'marketing',
  'email',
]);

export async function getIncludedArticleBlogs(storefront: Storefront) {
  const blogs: IncludedBlog[] = [];
  let after: string | null = null;

  do {
    const result: BlogDiscoveryResult =
      await storefront.query<BlogDiscoveryResult>(
      ARTICLES_PAGE_BLOGS_QUERY,
      {variables: {after}},
    );

    blogs.push(...result.blogs.nodes);
    after = result.blogs.pageInfo.hasNextPage
      ? result.blogs.pageInfo.endCursor
      : null;
  } while (after);

  return blogs.filter((blog) => isTrue(blog.showOnArticlesPage));
}

export async function getArticlesPageData(storefront: Storefront) {
  const includedBlogs = await getIncludedArticleBlogs(storefront);
  const articleGroups = await Promise.all(
    includedBlogs.map((blog) => getBlogArticles(storefront, blog.handle)),
  );
  const articles = articleGroups
    .flat()
    .map(normalizeArticle)
    .sort(sortNewestFirst);
  // The large Featured slot is controlled only by
  // `custom.main_featured_article`. Because `articles` is newest-first,
  // find() resolves accidental duplicates to the newest selected article.
  const selectedFeaturedArticle =
    articles.find((article) => article.mainFeatured) ?? null;
  const seoSource =
    includedBlogs.find((blog) => blog.handle === 'news') ?? includedBlogs[0];

  return {
    articles,
    featuredArticle: selectedFeaturedArticle,
    includedBlogCount: includedBlogs.length,
    articleCount: articles.length,
    seo: seoSource?.seo ?? null,
  };
}

async function getBlogArticles(storefront: Storefront, blogHandle: string) {
  const articles: RawArticle[] = [];
  let after: string | null = null;

  do {
    const result: BlogArticlesResult =
      await storefront.query<BlogArticlesResult>(
      ARTICLES_PAGE_BLOG_ARTICLES_QUERY,
      {variables: {blogHandle, after}},
    );
    const connection: NonNullable<BlogArticlesResult['blog']>['articles'] |
      undefined = result.blog?.articles;

    if (!connection) break;

    articles.push(...connection.nodes);
    after = connection.pageInfo.hasNextPage
      ? connection.pageInfo.endCursor
      : null;
  } while (after);

  return articles;
}

function normalizeArticle(article: RawArticle): ArticlesPageArticle {
  return {
    id: article.id,
    handle: article.handle,
    title: article.title,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    image: article.image,
    seo: article.seo,
    category: normalizeCategory(article.articleCategory?.value),
    articleType: article.articleType?.value.trim() || 'Article',
    featured: isTrue(article.featuredArticle),
    mainFeatured: isTrue(article.mainFeaturedArticle),
  };
}

function normalizeCategory(value?: string): ArticleCategory | null {
  const category = value?.trim().toLowerCase() as ArticleCategory | undefined;
  return category && ARTICLE_CATEGORIES.has(category) ? category : null;
}

function isTrue(metafield: MetafieldValue) {
  return metafield?.value.trim().toLowerCase() === 'true';
}

function sortNewestFirst(a: ArticlesPageArticle, b: ArticlesPageArticle) {
  return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
}

const ARTICLES_PAGE_BLOGS_QUERY = `#graphql
  query ArticlesPageBlogs(
    $after: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    blogs(first: 250, after: $after) {
      nodes {
        id
        handle
        title
        seo {
          title
          description
        }
        showOnArticlesPage: metafield(
          namespace: "custom"
          key: "show_on_articles_page"
        ) {
          value
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
` as const;

const ARTICLES_PAGE_BLOG_ARTICLES_QUERY = `#graphql
  query ArticlesPageBlogArticles(
    $blogHandle: String!
    $after: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    blog(handle: $blogHandle) {
      articles(
        first: 250
        after: $after
        sortKey: PUBLISHED_AT
        reverse: true
      ) {
        nodes {
          id
          handle
          title
          excerpt
          publishedAt
          image {
            id
            altText
            url
            width
            height
          }
          seo {
            title
            description
          }
          articleCategory: metafield(
            namespace: "custom"
            key: "article_category"
          ) {
            value
          }
          articleType: metafield(
            namespace: "custom"
            key: "article_type"
          ) {
            value
          }
          featuredArticle: metafield(
            namespace: "custom"
            key: "featured_article"
          ) {
            value
          }
          mainFeaturedArticle: metafield(
            namespace: "custom"
            key: "main_featured_article"
          ) {
            value
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
` as const;
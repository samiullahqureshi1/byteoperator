import {useState} from 'react';
import {useLoaderData} from 'react-router';
import type {Route} from './+types/articles._index';
import {
  ArticlesIntro,
  type ArticleFilter,
} from '~/components/articles/ArticlesIntro';
import {ArticlesListing} from '~/components/articles/ArticlesListing';
import {HomeExperts} from '~/components/HomeExperts';
import {WorkTestimonial} from '~/components/work/WorkTestimonial';
import {getArticlesPageData} from '~/lib/articles-data.server';
import {ARTICLES_CLEAN_PATH} from '~/lib/route-mappings';
import articlesIntroStyles from '~/styles/articles-intro.css?url';
import articlesListingStyles from '~/styles/articles-listing.css?url';
import homeExpertsStyles from '~/styles/home-experts.css?url';
import workTestimonialStyles from '~/styles/work-testimonial.css?url';

export const links: Route.LinksFunction = () => [
  // Intro + the article listing grid are this page's primary content,
  // visible immediately — keep blocking.
  {rel: 'stylesheet', href: articlesIntroStyles},
  {rel: 'stylesheet', href: articlesListingStyles},
  // WorkTestimonial + HomeExperts render last, below the fold — deferred
  // (see DEFER_STYLES_SCRIPT in root.tsx).
  {
    rel: 'preload',
    as: 'style',
    href: workTestimonialStyles,
    'data-defer': 'true',
  },
  {
    rel: 'preload',
    as: 'style',
    href: homeExpertsStyles,
    'data-defer': 'true',
  },
];

export const meta: Route.MetaFunction = ({data}) => {
  const title = data?.seo?.title || 'FoldTech Articles';
  const description = data?.seo?.description;

  return [
    {title},
    ...(description ? [{name: 'description', content: description}] : []),
    {tagName: 'link', rel: 'canonical', href: ARTICLES_CLEAN_PATH},
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  return getArticlesPageData(context.storefront);
}

export default function Articles() {
  const {articles, featuredArticle} = useLoaderData<typeof loader>();
  const [activeFilter, setActiveFilter] = useState<ArticleFilter>('all');

  return (
    <>
      <ArticlesIntro
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <ArticlesListing
        activeFilter={activeFilter}
        articles={articles}
        featuredArticle={featuredArticle}
      />
      <WorkTestimonial />
      <div className="ft-articles-experts">
        <HomeExperts />
      </div>
    </>
  );
}

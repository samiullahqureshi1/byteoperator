import {HomeSideRail} from '~/components/HomeSideRail';
import {HomeHero} from '~/components/HomeHero';
import {HomeHeroGallery} from '~/components/HomeHeroGallery';
import {HomeAbout} from '~/components/HomeAbout';
import {HomeServices} from '~/components/HomeServices';
import homeSideRailStyles from '~/styles/home-side-rail.css?url';
import {HomeProjects} from '~/components/HomeProjects';
import {HomeFeature} from '~/components/HomeFeature';
import {HOME_FEATURES} from '~/data/homeFeatures';
import {HomePeople} from '~/components/HomePeople';
import {HomePartners} from '~/components/HomePartners';
import {HomeExperts} from '~/components/HomeExperts';
import {HomeObservatory} from '~/components/HomeObservatory';
import '~/styles/home-hero.css';
import homeHeroGalleryStyles from '~/styles/home-hero-gallery.css?url';
import homeAboutStyles from '~/styles/home-about.css?url';
import homeServicesStyles from '~/styles/home-services.css?url';
import homeProjectsStyles from '~/styles/home-projects.css?url';
import homeFeatureStyles from '~/styles/home-feature.css?url';
import homePeopleStyles from '~/styles/home-people.css?url';
import homePartnersStyles from '~/styles/home-partners.css?url';
import homeExpertsStyles from '~/styles/home-experts.css?url';
import homeObservatoryStyles from '~/styles/home-observatory.css?url';
export const links = () => [
  {
    rel: 'stylesheet',
    href: homeHeroGalleryStyles,
  },
  {
    rel: 'stylesheet',
    href: homeSideRailStyles,
  },
    {
    rel: 'stylesheet',
    href: homeAboutStyles,
  },
  {
  rel: 'stylesheet',
  href: homeServicesStyles,
},
{
  rel: 'stylesheet',
  href: homeProjectsStyles,
},
{
  rel: 'stylesheet',
  href: homeFeatureStyles,
},
{
  rel: 'stylesheet',
  href: homePeopleStyles,
},
{
  rel: 'stylesheet',
  href: homePartnersStyles,
},
{
  rel: 'stylesheet',
  href: homeExpertsStyles,
},
{
  rel: 'stylesheet',
  href: homeObservatoryStyles,
},
];
import {
  Await,
  useLoaderData,
  Link,
} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';

/*
 * Metadata is derived from the approved hero copy rendered by
 * <HomeHero />, so the title and description match the page.
 */
const HOME_TITLE =
  'FoldTech | The Shopify Agency That Drives Real Growth';

const HOME_DESCRIPTION =
  'High-performing Shopify stores, backed by proven CRO, SEO, and AI visibility strategies that deliver measurable results.';

export const meta: Route.MetaFunction = () => {
  return [
    {title: HOME_TITLE},
    {name: 'description', content: HOME_DESCRIPTION},
    {property: 'og:type', content: 'website'},
    {property: 'og:title', content: HOME_TITLE},
    {
      property: 'og:description',
      content: HOME_DESCRIPTION,
    },
    {tagName: 'link', rel: 'canonical', href: '/'},
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <HomeSideRail />

      <HomeHero />
      <HomeHeroGallery />
      <HomeAbout />
      <HomeServices />
      <HomeProjects />
      {HOME_FEATURES.map((feature) => (
  <HomeFeature
    key={feature.id}
    feature={feature}
  />
))}
<HomePeople />
<HomePartners />
<HomeExperts />
<HomeObservatory />
      {/* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */}
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;

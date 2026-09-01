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
  // Hero + gallery are the first two sections on the page (visible at or
  // just past the fold), so their CSS stays render-blocking to avoid FOUC.
  {
    rel: 'stylesheet',
    href: homeHeroGalleryStyles,
  },
  {
    rel: 'stylesheet',
    href: homeSideRailStyles,
  },
  // Everything from here down is below the fold on first paint. Loaded via
  // rel="preload" (fetched immediately, non-blocking) and swapped to
  // rel="stylesheet" by DEFER_STYLES_SCRIPT in root.tsx once downloaded.
  {
    rel: 'preload',
    as: 'style',
    href: homeAboutStyles,
    'data-defer': 'true',
  },
  {
    rel: 'preload',
    as: 'style',
    href: homeServicesStyles,
    'data-defer': 'true',
  },
  {
    rel: 'preload',
    as: 'style',
    href: homeProjectsStyles,
    'data-defer': 'true',
  },
  {
    rel: 'preload',
    as: 'style',
    href: homeFeatureStyles,
    'data-defer': 'true',
  },
  {
    rel: 'preload',
    as: 'style',
    href: homePeopleStyles,
    'data-defer': 'true',
  },
  {
    rel: 'preload',
    as: 'style',
    href: homePartnersStyles,
    'data-defer': 'true',
  },
  {
    rel: 'preload',
    as: 'style',
    href: homeExpertsStyles,
    'data-defer': 'true',
  },
  {
    rel: 'preload',
    as: 'style',
    href: homeObservatoryStyles,
    'data-defer': 'true',
  },
];
import type {Route} from './+types/_index';

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

export default function Homepage() {
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
    </div>
  );
}

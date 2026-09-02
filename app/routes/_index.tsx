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
import homeHeroStyles from '~/styles/home-hero.css?url';
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
  // The hero gallery's video poster is the page's LCP element. `<video>`
  // doesn't support fetchpriority directly (browsers don't recognize it
  // there), so the supported way to raise its priority is to preload the
  // poster image itself with fetchpriority=high — this is the exact image
  // the video paints before (and unless) playback starts, so prioritizing
  // its fetch is what actually speeds up LCP.
  {
    rel: 'preload',
    as: 'image',
    href: '/images/home-gallery/hero-video-poster.webp',
    type: 'image/webp',
    fetchpriority: 'high',
  },
  // Hero + gallery are the first two sections on the page (visible at or
  // just past the fold), so their CSS stays render-blocking to avoid FOUC.
  // Listed in visual order (hero content, then gallery, then the side
  // rail) so the browser's preload scanner and priority scheduler see the
  // most immediately-visible styles first.
  {
    rel: 'stylesheet',
    href: homeHeroStyles,
    fetchpriority: 'high',
  },
  {
    rel: 'stylesheet',
    href: homeHeroGalleryStyles,
    fetchpriority: 'high',
  },
  {
    rel: 'stylesheet',
    href: homeSideRailStyles,
    fetchpriority: 'high',
  },
  // Everything from here down is below the fold on first paint. Loaded via
  // rel="preload" (fetched immediately, non-blocking) and swapped to
  // rel="stylesheet" by DEFER_STYLES_SCRIPT in root.tsx once downloaded.
  // A <noscript> fallback for each of these is rendered in the page body
  // below (React Router's links()/<Links/> can't emit a <noscript>-wrapped
  // link, since it only outputs a flat list of tags), so JS-disabled
  // clients still get every one of these stylesheets.
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
      {/*
       * Fallback for the 8 below-the-fold stylesheets deferred via
       * rel="preload" in links() above. React Router's links() can only
       * emit a flat list of <link> tags, so it can't wrap these in
       * <noscript> itself — this is rendered here instead, in the same
       * order as links(), so JS-disabled clients still get every one of
       * these stylesheets rather than silently missing them.
       */}
      <noscript>
        <link rel="stylesheet" href={homeAboutStyles} />
        <link rel="stylesheet" href={homeServicesStyles} />
        <link rel="stylesheet" href={homeProjectsStyles} />
        <link rel="stylesheet" href={homeFeatureStyles} />
        <link rel="stylesheet" href={homePeopleStyles} />
        <link rel="stylesheet" href={homePartnersStyles} />
        <link rel="stylesheet" href={homeExpertsStyles} />
        <link rel="stylesheet" href={homeObservatoryStyles} />
      </noscript>

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

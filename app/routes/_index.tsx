import {contentPageJsonLd} from '~/lib/seo/jsonld';
import {absoluteUrl} from '~/lib/seo/schema';
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
  // Everything from here down is below the fold on first paint, but still
  // render-blocking: loading these via rel="preload" + a JS swap left each
  // section unstyled until the swap ran, which reads as the page visibly
  // reflowing a beat after it appears. Correct rendering wins over the
  // first-paint saving here.
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
    {tagName: 'link', rel: 'canonical', href: absoluteUrl('/')},

    /*
     * WebPage only. No BreadcrumbList — this is the root of every trail, so a
     * one-item list saying "Home" asserts nothing. No ItemList of services
     * either: the homepage renders a selection, not the full set, and
     * `/services` is where that list is genuinely on the page.
     */
    ...contentPageJsonLd({
      path: '/',
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
    }),
  ];
};

export default function Homepage() {
  return (
    <div className="home">
      {/*
       * No <noscript> fallback needed: every stylesheet above is a plain
       * render-blocking link, so JS-disabled clients get them all.
       */}
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

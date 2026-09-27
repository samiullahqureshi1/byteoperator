import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {HomeHero} from '~/components/HomeHero';
import {HomeHeroGallery} from '~/components/HomeHeroGallery';
import {HomeAbout} from '~/components/HomeAbout';
import {HomeServices} from '~/components/HomeServices';
import {HomeProjects} from '~/components/HomeProjects';
import {HomeFeature} from '~/components/HomeFeature';
import {HOME_FEATURES} from '~/data/homeFeatures';
import {HomePeople} from '~/components/HomePeople';
import {HomePartners} from '~/components/HomePartners';
import {HomeExperts} from '~/components/HomeExperts';
import {HomeObservatory} from '~/components/HomeObservatory';
import {contentPageJsonLd} from '~/lib/seo/jsonld';

const HOME_TITLE = 'Software & AI Agency | Byte Operator';
const HOME_DESCRIPTION =
  'High-performing digital platforms & applications, backed by proven CRO, SEO, and AI visibility strategies that deliver measurable results.';

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  description:
    HOME_DESCRIPTION,
  path: '/',
});

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
        <HomeFeature key={feature.id} feature={feature} />
      ))}
      <HomePeople />
      <HomePartners />
      <HomeExperts />
      <HomeObservatory />
    </div>
  );
}

import type {Metadata} from 'next';
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

const HOME_TITLE = 'Byte Operator | The Software Agency That Drives Real Growth';
const HOME_DESCRIPTION =
  'High-performing digital platforms & applications, backed by proven CRO, SEO, and AI visibility strategies that deliver measurable results.';

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://www.byteoperator.com',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.byteoperator.com',
  },
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
        <HomeFeature key={feature.id} feature={feature} />
      ))}
      <HomePeople />
      <HomePartners />
      <HomeExperts />
      <HomeObservatory />
    </div>
  );
}

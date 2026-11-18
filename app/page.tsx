import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {HomeHero} from '~/components/HomeHero';
import {HomeHeroGallery} from '~/components/HomeHeroGallery';
import {HomeAbout} from '~/components/HomeAbout';
import {HomeServices} from '~/components/HomeServices';
import {HomeFeature} from '~/components/HomeFeature';
import {HOME_FEATURES} from '~/data/homeFeatures';
import {HomeConnectedOperations} from '~/components/HomeConnectedOperations';
import {HomeWhyChoose} from '~/components/HomeWhyChoose';
import {HomeProcess} from '~/components/HomeProcess';
import {HomeSecurityPrivacy} from '~/components/HomeSecurityPrivacy';
import {HomeCaseStudies} from '~/components/HomeCaseStudies';
import {HomeHealthcareFaq} from '~/components/HomeHealthcareFaq';
import {HomeFinalCta} from '~/components/HomeFinalCta';
import {getSiteContent} from '~/lib/cms/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cmsContent = getSiteContent();
  const home = cmsContent.home;
  return pageMetadata({
    title:
      home?.seoTitle ||
      'Healthcare AI Solutions & Software Development | Byte Operator',
    description:
      home?.seoDescription ||
      'Build smarter healthcare operations with AI voice agents, workflow automation, custom software and system integrations from Byte Operator.',
    path: '/',
    keywords: [
      'Healthcare AI Solutions',
      'Healthcare Software Development',
      'AI Voice Agents for Healthcare',
      'Healthcare Workflow Automation',
      'Healthcare System Integration',
    ],
  });
}

export default function Homepage() {
  const cmsContent = getSiteContent();
  const home = cmsContent.home;

  return (
    <div className="home">
      <HomeSideRail />
      {home?.heroShowSection !== false && <HomeHero content={home} />}
      {home?.galleryShowSection !== false && <HomeHeroGallery content={home} />}
      {home?.aboutShowSection !== false && <HomeAbout content={home} />}
      {home?.servicesShowSection !== false && <HomeServices content={home} />}
      {home?.featuresShowSection !== false &&
        HOME_FEATURES.map((feature) => (
          <HomeFeature key={feature.id} feature={feature} />
        ))}
      <HomeConnectedOperations />
      <HomeWhyChoose />
      <HomeProcess />
      <HomeSecurityPrivacy />
      <HomeCaseStudies />
      <HomeHealthcareFaq />
      <HomeFinalCta />
    </div>
  );
}

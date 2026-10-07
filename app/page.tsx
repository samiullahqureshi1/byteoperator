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
import {getSiteContent} from '~/lib/cms/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cmsContent = getSiteContent();
  const home = cmsContent.home;
  return pageMetadata({
    title: home?.seoTitle || 'Byte Operator — AI Automation & Custom Software Engineering',
    description:
      home?.seoDescription ||
      'Byte Operator is an independent software engineering and AI automation company. We design, engineer, and deploy high-velocity web platforms, custom SaaS architectures, and autonomous AI automation systems.',
    path: '/',
  });
}

export default function Homepage() {
  const cmsContent = getSiteContent();
  const home = cmsContent.home;

  const expertMedia = home?.observatoryImage
    ? [
        {
          src: home.observatoryImage,
          alt: home.observatoryHeading || 'Byte Operator Architects',
        },
      ]
    : undefined;

  return (
    <div className="home">
      <HomeSideRail />
      {home?.heroShowSection !== false && <HomeHero content={home} />}
      {home?.galleryShowSection !== false && <HomeHeroGallery content={home} />}
      {home?.aboutShowSection !== false && <HomeAbout content={home} />}
      {home?.servicesShowSection !== false && <HomeServices content={home} />}
      {home?.projectsShowSection !== false && <HomeProjects content={home} />}
      {home?.featuresShowSection !== false &&
        HOME_FEATURES.map((feature) => (
          <HomeFeature key={feature.id} feature={feature} />
        ))}
      {home?.peopleShowSection !== false && <HomePeople content={home} />}
      {home?.partnersShowSection !== false && <HomePartners content={home} />}
      {home?.observatoryShowSection !== false && (
        <HomeExperts
          eyebrow={home?.observatoryEyebrow || 'Senior Engineering & AI Architects'}
          heading={
            home?.observatoryHeading ||
            'Ready to architect your next software platform, Shopify store, or AI automation?'
          }
          description={[
            home?.observatorySubtitle ||
              'Byte Operator partners directly with ambitious founders and enterprise brands to design, engineer, and deploy high-impact digital solutions.',
            home?.observatoryDescriptionSecondary ||
              'Speak directly with our senior software engineers and AI automation architects to map your technical roadmap.',
          ]}
          hideMedia={home?.observatoryShowImage === false}
          media={expertMedia}
          ctaLabel={home?.observatoryCtaText || 'Schedule Technical Consultation'}
          ctaTo={home?.observatoryCtaLink || '/contact'}
        />
      )}
      <HomeObservatory />
    </div>
  );
}

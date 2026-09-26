'use client';

import {useCallback, useState} from 'react';
import {SERVICES_FEATURES} from '~/data/servicesFeatures';
import {SERVICES_LANDING_HERO} from '~/data/servicePages';
import {HomeFeature} from './HomeFeature';
import {HomePeople} from './HomePeople';
import {VideoModal} from './shared/VideoModal';
import {ServicesDirectory} from './services/ServicesDirectory';
import {ServiceHero} from './services/ServiceHero';
import {ServicesWideImage} from './services/ServicesWideImage';
import {HomePartners} from '~/components/HomePartners';
import {WorkTestimonial} from './work/WorkTestimonial';
import {HomeExperts} from '~/components/HomeExperts';

interface ServicesPageProps {
  page: {
    handle: string;
    body: string;
  };
}

function getFirstParagraph(html: string) {
  const match = html.match(/<p\b[^>]*>[\s\S]*?<\/p>/i);

  return match?.[0] ?? '';
}

export function ServicesPage({
  page,
}: ServicesPageProps) {
  const heroDescription = getFirstParagraph(
    '<p>Byte Operator delivers end-to-end Software solutions — from custom theme design and development to SEO, conversion rate optimization, migrations and ongoing support. We help ecommerce brands launch faster, convert better and scale smarter with expert Software and Enterprise Platform Solutions services.</p>',
  );
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const closeCaseStudy = useCallback(() => setIsCaseStudyOpen(false), []);

  return (
    <div
      className="ft-services-page"
      data-page-handle={page.handle}
    >
      <ServiceHero
        {...SERVICES_LANDING_HERO}
        descriptionHtml={heroDescription}
      />
      <ServicesWideImage />
      <ServicesDirectory />

      <div className="ft-services-people">
        <HomePeople
          content={{
            headingFirstLine: 'People-First Software Growth ',
            headingSecondLine: 'Agency',
            description:
              'A specialised Software team focused on design, development, SEO and growth. We help ecommerce brands plan, build and continuously improve high-performing online stores that drive more traffic, higher conversions and long-term revenue.',
            buttonLabel: 'Our Story',
          }}
        />
      </div>

      <div className="ft-services-features">
        {SERVICES_FEATURES.map((feature) => (
          <HomeFeature
            feature={feature}
            key={feature.id}
          />
        ))}
      </div>
      <div className="ft-services-partners">
        <HomePartners />
      </div>

      <div className="ft-services-case-study">
        <WorkTestimonial
          image="/images/home-features/feature-01/primary.webp"
          imageWidth={1086}
          imageHeight={1448}
          alt="Cambridge Satchel ecommerce project"
          heading="Re-launching a heritage brand with the power of Enterprise Platform Solutions"
          meta="Cambridge Satchel X Byte Operator"
          actionLabel="See Case Study"
          onAction={() => setIsCaseStudyOpen(true)}
        />
      </div>

      {/*
        TEMP placeholder — this is the Cambridge Satchel case study, not the
        client review, so it deliberately does not follow the shared
        testimonial. Swap in the real case study video when it exists.
      */}
      <VideoModal
        open={isCaseStudyOpen}
        src="https://cdn.shopify.com/videos/c/o/v/1fde2ba0cc3146e88e9b22dd031b9193.mp4"
        ariaLabel="Cambridge Satchel case study video"
        onClose={closeCaseStudy}
      />
      <div className="ft-services-experts">
  <HomeExperts />
</div>
    </div>
  );
}

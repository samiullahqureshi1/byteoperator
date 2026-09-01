import {useCallback, useState} from 'react';
import {SERVICES_FEATURES} from '~/data/servicesFeatures';
import {WORK_HERO_TESTIMONIAL} from '~/data/workHeroProof';
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
    '<p>The Fold Tech delivers end-to-end Shopify solutions — from custom theme design and development to SEO, conversion rate optimization, migrations and ongoing support. We help ecommerce brands launch faster, convert better and scale smarter with expert Shopify and Shopify Plus services.</p>',
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
            headingFirstLine: 'People-First Shopify Growth ',
            headingSecondLine: 'Agency',
            description:
              'A specialised Shopify team focused on design, development, SEO and growth. We help ecommerce brands plan, build and continuously improve high-performing online stores that drive more traffic, higher conversions and long-term revenue.',
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
          heading="Re-launching a heritage brand with the power of Shopify Plus"
          meta="Cambridge Satchel X FoldTech"
          actionLabel="See Case Study"
          onAction={() => setIsCaseStudyOpen(true)}
        />
      </div>

      <VideoModal
        open={isCaseStudyOpen}
        src={WORK_HERO_TESTIMONIAL.video}
        ariaLabel="Cambridge Satchel case study video"
        onClose={closeCaseStudy}
      />
      <div className="ft-services-experts">
  <HomeExperts />
</div>
    </div>
  );
}

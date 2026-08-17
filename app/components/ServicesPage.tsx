import {useCallback, useState} from 'react';
import {SERVICES_FEATURES} from '~/data/servicesFeatures';
import {WORK_HERO_TESTIMONIAL} from '~/data/workHeroProof';
import {HomeFeature} from './HomeFeature';
import {HomePeople} from './HomePeople';
import {VideoModal} from './shared/VideoModal';
import {ServicesDirectory} from './services/ServicesDirectory';
import {ServicesHero} from './services/ServicesHero';
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
  const heroDescription = getFirstParagraph(page.body);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const closeCaseStudy = useCallback(() => setIsCaseStudyOpen(false), []);

  return (
    <main
      className="ft-services-page"
      data-page-handle={page.handle}
    >
      <ServicesHero descriptionHtml={heroDescription} />
      <ServicesWideImage />
      <ServicesDirectory />

      <div className="ft-services-people">
        <HomePeople />
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
    </main>
  );
}

import type {ServicePageConfig} from '~/data/servicePages';
import {HomeFeature} from '~/components/HomeFeature';
import {HomeExperts} from '~/components/HomeExperts';
import {WorkTestimonial} from '~/components/work/WorkTestimonial';
import {ServiceHero} from './ServiceHero';
import {
  ServiceDetailFaqs,
  type ServiceDetailFaqItem,
} from './detail/ServiceDetailFaqs';
import {ServiceAboutSection} from './detail/ServiceAboutSection';

interface ServiceDetailPageProps {
  page: {
    handle: string;
    title: string;
    faqs?: readonly ServiceDetailFaqItem[];
  };
  config: ServicePageConfig;
}

export function ServiceDetailPage({
  page,
  config,
}: ServiceDetailPageProps) {
  return (
    <main data-page-handle={page.handle}>
      <ServiceHero {...config.hero} />

      {config.about ? (
        <ServiceAboutSection data={config.about} />
      ) : null}

      {config.features?.map((feature) => (
        <HomeFeature key={feature.id} feature={feature} />
      ))}

      {page.faqs?.length ? (
        <ServiceDetailFaqs
          title={config.faqTitle ?? page.title}
          faqs={page.faqs}
        />
      ) : null}

      <WorkTestimonial />

      <div className="ft-service-detail-experts">
        <HomeExperts />
      </div>
    </main>
  );
}

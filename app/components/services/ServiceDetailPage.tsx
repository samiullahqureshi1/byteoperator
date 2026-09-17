import type {ReactNode} from 'react';
import type {ServicePageConfig} from '~/data/servicePages';
import {HomeFeature} from '~/components/HomeFeature';
import {HomeExperts} from '~/components/HomeExperts';
import {HomePartners} from '~/components/HomePartners';
import {WorkTestimonial} from '~/components/work/WorkTestimonial';
import {ServiceHero} from './ServiceHero';
import {
  ServiceDetailFaqs,
  type ServiceDetailFaqItem,
} from './detail/ServiceDetailFaqs';
import {ServiceAboutSection} from './detail/ServiceAboutSection';
import {MigrationPlatformsAccordion} from './detail/MigrationPlatformsAccordion';
import {ServicePlusAgencyCta} from './detail/ServicePlusAgencyCta';

interface ServiceDetailPageProps {
  page: {
    handle: string;
    title: string;
    faqs?: readonly ServiceDetailFaqItem[];
  };
  config: ServicePageConfig;
  /** Bulk hours section; only service pages supply one (not podcast, guides…). */
  bulkHoursCta?: ReactNode;
}

export function ServiceDetailPage({
  page,
  config,
  bulkHoursCta,
}: ServiceDetailPageProps) {
  return (
    <div    
  className={`ft-service-detail ft-service-detail--${page.handle}`}
    data-page-handle={page.handle}>
      <ServiceHero {...config.hero} />

      {config.heroOnly ? null : (
        <>
          {config.about ? (
            <ServiceAboutSection
              data={config.about}
              afterMedia={
                config.platforms ? (
                  <MigrationPlatformsAccordion
                    data={config.platforms}
                  />
                ) : null
              }
            />
          ) : null}

          {config.features?.map((feature) => (
            <HomeFeature key={feature.id} feature={feature} />
          ))}

          {config.showPartners ? <HomePartners /> : null}

          {page.faqs?.length ? (
            <ServiceDetailFaqs
              title={config.faqTitle ?? page.title}
              faqs={page.faqs}
            />
          ) : null}

          <WorkTestimonial />

          {bulkHoursCta}

          {config.plusAgencyCta ? (
            <ServicePlusAgencyCta data={config.plusAgencyCta} />
          ) : null}

          <div className="ft-service-detail-experts">
            <HomeExperts {...config.experts} />
          </div>
        </>
      )}
    </div>
  );
}

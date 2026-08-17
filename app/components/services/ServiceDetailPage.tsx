import type {ServicePageConfig} from '~/data/servicePages';
import {ServiceHero} from './ServiceHero';
import {ServiceAboutSection} from './detail/ServiceAboutSection';

interface ServiceDetailPageProps {
  page: {
    handle: string;
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
    </main>
  );
}

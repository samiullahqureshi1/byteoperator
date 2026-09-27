'use client';

import {SERVICES_FEATURES} from '~/data/servicesFeatures';
import {SERVICES_LANDING_HERO} from '~/data/servicePages';
import {HomeFeature} from './HomeFeature';
import {HomePeople} from './HomePeople';
import {ServicesDirectory} from './services/ServicesDirectory';
import {ServiceHero} from './services/ServiceHero';
import {ServicesWideImage} from './services/ServicesWideImage';
import {HomePartners} from '~/components/HomePartners';
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

      <div className="ft-services-experts">
  <HomeExperts />
</div>
    </div>
  );
}

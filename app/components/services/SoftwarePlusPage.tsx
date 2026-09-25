import type {ReactNode} from 'react';
import {HomeExperts} from '~/components/HomeExperts';
import {HomeFeature} from '~/components/HomeFeature';
import {HomeHeroGallery} from '~/components/HomeHeroGallery';
import {HomeObservatory} from '~/components/HomeObservatory';
import {HomePartners} from '~/components/HomePartners';
import {HomePeople} from '~/components/HomePeople';
import {HomeProjects} from '~/components/HomeProjects';
import {ClientLogoGrid} from '~/components/shared/ClientLogoGrid';
import {SHOPIFY_PLUS_PAGE} from '~/data/softwarePlusPage';
import {ServiceHero} from './ServiceHero';

export function SoftwarePlusPage({
  bulkHoursCta,
}: {
  bulkHoursCta?: ReactNode;
}) {
  return (
    <div
      className="ft-software-plus-page"
      data-page-handle="software-plus"
    >
      <ServiceHero {...SHOPIFY_PLUS_PAGE.hero} />

      <HomeHeroGallery />

      <ServiceHero {...SHOPIFY_PLUS_PAGE.lightHero} />

      <ClientLogoGrid {...SHOPIFY_PLUS_PAGE.trustedBrands} />

      <div className="ft-software-plus-page__projects">
        <HomeProjects {...SHOPIFY_PLUS_PAGE.projects} />
      </div>

      <div className="ft-software-plus-page__features">
        {SHOPIFY_PLUS_PAGE.features.map((feature) => (
          <HomeFeature key={feature.id} feature={feature} />
        ))}
      </div>

      <div className="ft-software-plus-page__people">
        <HomePeople />
      </div>

      <div className="ft-software-plus-page__partners">
        <HomePartners />
      </div>

      {bulkHoursCta}

      <div className="ft-software-plus-page__experts">
        <HomeExperts />
      </div>

      <HomeObservatory />
    </div>
  );
}

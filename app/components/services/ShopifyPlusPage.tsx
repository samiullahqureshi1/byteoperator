import {HomeExperts} from '~/components/HomeExperts';
import {HomeFeature} from '~/components/HomeFeature';
import {HomeHeroGallery} from '~/components/HomeHeroGallery';
import {HomeObservatory} from '~/components/HomeObservatory';
import {HomePartners} from '~/components/HomePartners';
import {HomePeople} from '~/components/HomePeople';
import {HomeProjects} from '~/components/HomeProjects';
import {ClientLogoGrid} from '~/components/shared/ClientLogoGrid';
import {SHOPIFY_PLUS_PAGE} from '~/data/shopifyPlusPage';
import {ServiceHero} from './ServiceHero';

export function ShopifyPlusPage() {
  return (
    <div
      className="ft-shopify-plus-page"
      data-page-handle="shopify-plus"
    >
      <ServiceHero {...SHOPIFY_PLUS_PAGE.hero} />

      <HomeHeroGallery />

      <ServiceHero {...SHOPIFY_PLUS_PAGE.lightHero} />

      <ClientLogoGrid {...SHOPIFY_PLUS_PAGE.trustedBrands} />

      <div className="ft-shopify-plus-page__projects">
        <HomeProjects {...SHOPIFY_PLUS_PAGE.projects} />
      </div>

      <div className="ft-shopify-plus-page__features">
        {SHOPIFY_PLUS_PAGE.features.map((feature) => (
          <HomeFeature key={feature.id} feature={feature} />
        ))}
      </div>

      <div className="ft-shopify-plus-page__people">
        <HomePeople />
      </div>

      <div className="ft-shopify-plus-page__partners">
        <HomePartners />
      </div>

      <div className="ft-shopify-plus-page__experts">
        <HomeExperts />
      </div>

      <HomeObservatory />
    </div>
  );
}

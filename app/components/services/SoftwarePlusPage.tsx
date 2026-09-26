import {ServiceDetailPage} from '~/components/services/ServiceDetailPage';
import {SERVICE_PAGE_CONFIGS} from '~/data/servicePages';

export function SoftwarePlusPage() {
  const config = SERVICE_PAGE_CONFIGS['shopify-plus-agency'];
  return (
    <div
      className="ft-software-plus-page"
      data-page-handle="shopify-plus-agency"
    >
      <ServiceDetailPage
        page={{
          handle: 'shopify-plus-agency',
          title: 'Shopify Plus & Enterprise',
          faqs: config.faqs,
        }}
        config={config}
      />
    </div>
  );
}

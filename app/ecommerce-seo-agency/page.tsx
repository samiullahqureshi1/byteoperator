import type {Metadata} from 'next';
import {ServiceDetailPage} from '~/components/services/ServiceDetailPage';
import {SERVICE_PAGE_CONFIGS} from '~/data/servicePages';

export const metadata: Metadata = {
  title: 'Technical SEO & Search Architecture Agency | Byte Operator',
  description:
    'Deep technical SEO audits, crawl budget optimization, rich JSON-LD schema, and high-converting search architecture for enterprise brands.',
  alternates: {
    canonical: 'https://byteoperator.com/ecommerce-seo-agency',
  },
};

export default function EcommerceSeoAgencyPage() {
  const config = SERVICE_PAGE_CONFIGS['seo-agency'];
  return (
    <div className="ecommerce-seo-page">
      <ServiceDetailPage
        page={{
          handle: 'seo-agency',
          title: 'Technical SEO & Architecture',
          faqs: config.faqs,
        }}
        config={config}
      />
    </div>
  );
}

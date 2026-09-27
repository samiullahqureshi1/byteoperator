import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
import {ServiceDetailPage} from '~/components/services/ServiceDetailPage';
import {SERVICE_PAGE_CONFIGS} from '~/data/servicePages';

export const metadata: Metadata = pageMetadata({
  title: 'Technical SEO & Search Architecture Agency | Byte Operator',
  description:
    'Deep technical SEO audits, crawl budget optimization, rich JSON-LD schema, and high-converting search architecture for enterprise brands.',
  path: '/ecommerce-seo-agency',
});

export default function EcommerceSeoAgencyPage() {
  const config = SERVICE_PAGE_CONFIGS['seo-agency'];
  // Service schema from this page's own title and description.
  const graph = serviceJsonLd({
    path: '/ecommerce-seo-agency',
    name: String(metadata.title).replace(/ \| Byte Operator$/, ''),
    description: String(metadata.description),
  });

  return (
    <>
      <JsonLd graph={graph} />
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
    </>
  );
}

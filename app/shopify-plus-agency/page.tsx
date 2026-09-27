import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
import {SoftwarePlusPage} from '~/components/services/SoftwarePlusPage';

export const metadata: Metadata = pageMetadata({
  title: 'Shopify Plus & Enterprise Agency | Byte Operator',
  description:
    'Scale faster with a Shopify Plus & Enterprise agency. Custom themes, complex integrations, global checkouts, and high-velocity ecommerce growth.',
  path: '/shopify-plus-agency',
});

export default function SoftwarePlus() {
  // Service schema from this page's own title and description.
  const graph = serviceJsonLd({
    path: '/shopify-plus-agency',
    name: String(metadata.title).replace(/ \| Byte Operator$/, ''),
    description: String(metadata.description),
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="software-plus-page-wrap">
        <SoftwarePlusPage />
      </div>
    </>
  );
}

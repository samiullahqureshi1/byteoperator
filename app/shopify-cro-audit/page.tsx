import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
import {SoftwareCroOptimise} from '~/components/cro/SoftwareCroOptimise';

export const metadata: Metadata = pageMetadata({
  title: 'CRO Audit & Conversion Optimization | Byte Operator',
  description:
    'Turn more store visitors into paying customers with our rigorous, data-driven Conversion & Performance Optimization audits and testing programs.',
  path: '/shopify-cro-audit',
});

export default function SoftwareCroAudit() {
  // Service schema from this page's own title and description.
  const graph = serviceJsonLd({
    path: '/shopify-cro-audit',
    name: String(metadata.title).replace(/ \| Byte Operator$/, ''),
    description: String(metadata.description),
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="software-cro-page-wrap">
        <SoftwareCroOptimise />
      </div>
    </>
  );
}

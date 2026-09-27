import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {SoftwareCroOptimise} from '~/components/cro/SoftwareCroOptimise';

export const metadata: Metadata = pageMetadata({
  title: 'CRO Audit & Conversion Optimization | Byte Operator',
  description:
    'Turn more store visitors into paying customers with our rigorous, data-driven Conversion & Performance Optimization audits and testing programs.',
  path: '/shopify-cro-audit',
});

export default function SoftwareCroAudit() {
  return (
    <div className="software-cro-page-wrap">
      <SoftwareCroOptimise />
    </div>
  );
}

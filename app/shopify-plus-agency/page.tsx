import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {SoftwarePlusPage} from '~/components/services/SoftwarePlusPage';

export const metadata: Metadata = pageMetadata({
  title: 'Shopify Plus & Enterprise Agency | Byte Operator',
  description:
    'Scale faster with an accredited Shopify Plus & Enterprise agency. Custom themes, complex integrations, global checkouts, and high-velocity ecommerce growth.',
  path: '/shopify-plus-agency',
});

export default function SoftwarePlus() {
  return (
    <div className="software-plus-page-wrap">
      <SoftwarePlusPage />
    </div>
  );
}

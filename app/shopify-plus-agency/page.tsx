import type {Metadata} from 'next';
import {SoftwarePlusPage} from '~/components/services/SoftwarePlusPage';

export const metadata: Metadata = {
  title: 'Shopify Plus & Enterprise Agency | Byte Operator',
  description:
    'Scale faster with an accredited Shopify Plus & Enterprise agency. Custom themes, complex integrations, global checkouts, and high-velocity ecommerce growth.',
  alternates: {
    canonical: 'https://www.byteoperator.com/shopify-plus-agency',
  },
};

export default function SoftwarePlus() {
  return (
    <div className="software-plus-page-wrap">
      <SoftwarePlusPage />
    </div>
  );
}

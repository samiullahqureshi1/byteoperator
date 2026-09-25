import type {Metadata} from 'next';
import {SoftwarePlusPage} from '~/components/services/SoftwarePlusPage';

export const metadata: Metadata = {
  title: 'Enterprise Software Agency | Byte Operator',
  description:
    'Scale faster with an accredited Enterprise Software Agency. Bespoke themes, complex integrations, global checkouts, and high-velocity ecommerce growth.',
  alternates: {
    canonical: 'https://byteoperator.com/software-plus-agency',
  },
};

export default function SoftwarePlus() {
  return (
    <div className="software-plus-page-wrap">
      <SoftwarePlusPage />
    </div>
  );
}

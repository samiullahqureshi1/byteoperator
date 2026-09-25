import type {Metadata} from 'next';
import {SoftwareCroOptimise} from '~/components/cro/SoftwareCroOptimise';

export const metadata: Metadata = {
  title: 'Conversion & Performance Optimization Audit & Conversion Optimization | Byte Operator',
  description:
    'Turn more store visitors into paying customers with our rigorous, data-driven Conversion & Performance Optimization audits and testing programs.',
  alternates: {
    canonical: 'https://byteoperator.com/software-cro-audit',
  },
};

export default function SoftwareCroAudit() {
  return (
    <div className="software-cro-page-wrap">
      <SoftwareCroOptimise />
    </div>
  );
}

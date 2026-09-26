import type {Metadata} from 'next';
import {ServicesPage} from '~/components/ServicesPage';

export const metadata: Metadata = {
  title: 'Software Services & Solutions | Byte Operator',
  description:
    'End-to-end Software and Enterprise Platform Solutions services: from custom theme development, CRO and SEO to enterprise migrations and ongoing support.',
  alternates: {
    canonical: 'https://byteoperator.com/services',
  },
};

export default function Services() {
  return (
    <ServicesPage
      page={{
        handle: 'services',
        body: '<p>Byte Operator delivers end-to-end Software solutions.</p>',
      }}
    />
  );
}

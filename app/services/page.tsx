import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {contentPageJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
import {ServicesPage} from '~/components/ServicesPage';

export const metadata: Metadata = pageMetadata({
  title: 'Software Services & Solutions | Byte Operator',
  description:
    'End-to-end Software and Enterprise Platform Solutions services: from custom theme development, CRO and SEO to enterprise migrations and ongoing support.',
  path: '/services',
});

export default function Services() {
  const graph = contentPageJsonLd({
    path: '/services',
    name: String(metadata.title).replace(/ \| Byte Operator$/, ''),
    description: String(metadata.description),
    breadcrumbs: [{name: 'Services', path: '/services'}],
  });

  return (
    <>
      <JsonLd graph={graph} />
      <ServicesPage
        page={{
          handle: 'services',
          body: '<p>Byte Operator delivers end-to-end Software solutions.</p>',
        }}
      />
    </>
  );
}

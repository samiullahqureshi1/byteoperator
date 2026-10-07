import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {contentPageJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
import {ServicesPage} from '~/components/ServicesPage';
import {getSiteContent} from '~/lib/cms/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cmsContent = getSiteContent();
  const services = cmsContent.services;
  return pageMetadata({
    title: services?.seoTitle || 'Software Services & Solutions | Byte Operator',
    description:
      services?.seoDescription ||
      'End-to-end Software and Enterprise Platform Solutions services: from custom theme development, CRO and SEO to enterprise migrations and ongoing support.',
    path: '/services',
  });
}

export default function Services() {
  const cmsContent = getSiteContent();
  const services = cmsContent.services;
  const title = services?.seoTitle?.replace(/ \| Byte Operator$/, '') || 'Software Services & Solutions';
  const description = services?.seoDescription || 'End-to-end Software and Enterprise Platform Solutions services.';

  const graph = contentPageJsonLd({
    path: '/services',
    name: title,
    description: description,
    breadcrumbs: [{name: 'Services', path: '/services'}],
  });

  return (
    <>
      <JsonLd graph={graph} />
      <ServicesPage
        page={{
          handle: 'services',
          body: `<p>${services?.heroSubtitle || 'Byte Operator delivers end-to-end Software solutions.'}</p>`,
        }}
      />
    </>
  );
}

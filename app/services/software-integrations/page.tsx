import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {SoftwareIntegrationsPageClient} from './SoftwareIntegrationsPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'API Integration Services & Custom API Development | Byte Operator',
    description:
      'Connect your business systems with custom API development and integration services. Byte Operator builds REST APIs, third-party integrations and scalable data workflows.',
    path: '/services/software-integrations',
    keywords: [
      'API Integration Services',
      'Custom API Development',
      'System Integration Services',
      'API Development Services',
      'Third-Party API Integration',
      'ERP Integration',
      'CRM Integration',
      'REST API Development',
      'GraphQL API Development',
    ],
  });
}

export default function SoftwareIntegrationsPage() {
  const graph = serviceJsonLd({
    name: 'API Development & System Integration Services',
    description:
      'Connect your business systems with custom API development and integration services. Byte Operator builds REST APIs, third-party integrations and scalable data workflows.',
    path: '/services/software-integrations',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <SoftwareIntegrationsPageClient />
      </div>
    </>
  );
}

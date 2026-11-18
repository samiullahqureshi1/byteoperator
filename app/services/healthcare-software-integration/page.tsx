import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {HealthcareIntegrationPageClient} from './HealthcareIntegrationPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Healthcare Software Integration Services | Byte Operator',
    description:
      "Connect healthcare applications and systems with Byte Operator's HL7, FHIR, API and custom healthcare software integration services.",
    path: '/services/healthcare-software-integration',
    keywords: [
      'Healthcare Software Integration Services',
      'Healthcare Integration Services',
      'Healthcare System Integration',
      'HL7 Integration Services',
      'FHIR Integration Services',
      'EHR Integration',
      'EMR Integration',
      'Healthcare API Integration',
      'Healthcare Data Integration',
      'Healthcare Interoperability',
      'Medical Software Integration',
    ],
  });
}

export default function HealthcareSoftwareIntegrationPage() {
  const graph = serviceJsonLd({
    name: 'Healthcare Software Integration Services',
    description:
      "Connect healthcare applications and systems with Byte Operator's HL7, FHIR, API and custom healthcare software integration services.",
    path: '/services/healthcare-software-integration',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <HealthcareIntegrationPageClient />
      </div>
    </>
  );
}

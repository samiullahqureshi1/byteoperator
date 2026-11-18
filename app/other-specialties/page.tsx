import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {OtherSpecialtiesPageClient} from '~/services/other-specialties/OtherSpecialtiesPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Healthcare Software Solutions for Specialty Practices | Byte Operator',
    description:
      'Explore healthcare software solutions for specialty practices, including AI voice agents, workflow automation, custom software development, and healthcare integrations.',
    path: '/other-specialties',
    keywords: [
      'Healthcare Software Solutions for Specialty Practices',
      'Specialty Medical Practice Software',
      'Specialty Clinic Workflow Automation',
      'Healthcare AI Voice Agents',
      'Specialty EHR Integration',
      'Cardiology Practice Software',
      'Orthopedic Practice Management Software',
      'Neurology Practice Automation',
    ],
  });
}

export default function OtherSpecialtiesDirectPage() {
  const graph = serviceJsonLd({
    name: 'Healthcare Software Solutions for Specialty Practices',
    description:
      'Explore healthcare software solutions for specialty practices, including AI voice agents, workflow automation, custom software development, and healthcare integrations.',
    path: '/other-specialties',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <OtherSpecialtiesPageClient />
      </div>
    </>
  );
}

import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {OphthalmologyClinicsPageClient} from '~/services/ophthalmology-clinics/OphthalmologyClinicsPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Ophthalmology Clinic Software Solutions | Byte Operator',
    description:
      'Explore ophthalmology clinic software solutions, AI voice agents, workflow automation, custom software development, and healthcare integrations with Byte Operator.',
    path: '/healthcare-solutions/ophthalmology-clinics',
    keywords: [
      'Ophthalmology Clinic Software Solutions',
      'Ophthalmology practice management software',
      'ophthalmology workflow automation',
      'ophthalmology AI voice agents',
      'ophthalmology EHR integration',
      'eye clinic software development',
      'ophthalmology imaging integration',
      'ophthalmology patient communication automation',
    ],
  });
}

export default function OphthalmologyClinicsPage() {
  const graph = serviceJsonLd({
    name: 'Ophthalmology Clinic Software Solutions',
    description:
      'Explore ophthalmology clinic software solutions, AI voice agents, workflow automation, custom software development, and healthcare integrations with Byte Operator.',
    path: '/healthcare-solutions/ophthalmology-clinics',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <OphthalmologyClinicsPageClient />
      </div>
    </>
  );
}

import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {DermatologyClinicsPageClient} from './DermatologyClinicsPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Dermatology & Aesthetic Clinic Technology Solutions | Byte Operator',
    description:
      'Discover technology solutions for dermatology and aesthetic clinics, including custom applications, AI-powered tools, workflow automation and software integrations.',
    path: '/services/dermatology-aesthetic-clinics',
    keywords: [
      'Dermatology and Aesthetic Clinic Technology Solutions',
      'Dermatology Software Development',
      'Aesthetic Clinic Software Development',
      'Dermatology Clinic Automation',
      'Aesthetic Clinic Automation',
      'AI Solutions for Dermatology Clinics',
      'Aesthetic Clinic Software Integration',
      'Healthcare Applications for Dermatology',
      'Multi-Location Clinic Management Solutions',
    ],
  });
}

export default function DermatologyClinicsServicesPage() {
  const graph = serviceJsonLd({
    name: 'Technology Solutions for Dermatology & Aesthetic Clinics',
    description:
      'Discover technology solutions for dermatology and aesthetic clinics, including custom applications, AI-powered tools, workflow automation and software integrations.',
    path: '/services/dermatology-aesthetic-clinics',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <DermatologyClinicsPageClient />
      </div>
    </>
  );
}

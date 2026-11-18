import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {DentalPracticesPageClient} from './DentalPracticesPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Dental Practice Technology Solutions | Byte Operator',
    description:
      'Explore dental practice technology solutions, including custom applications, AI-powered tools, workflow automation, and software integrations.',
    path: '/services/dental-practices',
    keywords: [
      'Dental Practice Technology Solutions',
      'Dental Software Development Services',
      'Custom Dental Software Development',
      'Dental Practice Automation',
      'Dental Software Integration',
      'Dental Technology Solutions',
      'Dental Application Development',
      'Dental Workflow Automation',
      'Dental AI Solutions',
      'Dental Software API Integration',
    ],
  });
}

export default function DentalPracticesServicesPage() {
  const graph = serviceJsonLd({
    name: 'Technology Solutions for Modern Dental Practices',
    description:
      'Explore dental practice technology solutions, including custom applications, AI-powered tools, workflow automation, and software integrations.',
    path: '/services/dental-practices',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <DentalPracticesPageClient />
      </div>
    </>
  );
}

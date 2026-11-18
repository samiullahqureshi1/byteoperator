import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {MedicalPracticesPageClient} from './MedicalPracticesPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Medical Practice Technology Solutions | Byte Operator',
    description:
      'Medical practice technology solutions, including custom healthcare applications, AI-powered tools, workflow automation, and software integrations.',
    path: '/services/medical-practices',
    keywords: [
      'Medical Practice Technology Solutions',
      'Medical Practice Software',
      'Healthcare Applications for Medical Practices',
      'Practice Management Automation',
      'AI for Medical Practices',
      'Medical Practice API Integration',
      'Custom Healthcare Software',
    ],
  });
}

export default function MedicalPracticesServicesPage() {
  const graph = serviceJsonLd({
    name: 'Technology Solutions for Modern Medical Practices',
    description:
      'Medical practice technology solutions, including custom healthcare applications, AI-powered tools, workflow automation, and software integrations.',
    path: '/services/medical-practices',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <MedicalPracticesPageClient />
      </div>
    </>
  );
}

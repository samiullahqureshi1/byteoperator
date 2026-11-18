import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {HealthcareSolutionsPageClient} from '~/services/healthcare-solutions/HealthcareSolutionsPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Healthcare Technology Solutions | Byte Operator',
    description:
      'Explore healthcare technology solutions from Byte Operator, including custom applications, AI-powered software, workflow automation, and system integrations.',
    path: '/healthcare-solutions',
    keywords: [
      'Healthcare Technology Solutions',
      'Healthcare Solutions',
      'Healthcare Software Solutions',
      'Healthcare Application Development',
      'Custom Healthcare Applications',
      'Healthcare AI Solutions',
      'Healthcare Workflow Automation',
      'Healthcare API Integration',
      'Healthcare Technology Services',
    ],
  });
}

export default function HealthcareSolutionsRootPage() {
  const graph = serviceJsonLd({
    name: 'Healthcare Technology Solutions for Modern Healthcare Organizations',
    description:
      'Explore healthcare technology solutions from Byte Operator, including custom applications, AI-powered software, workflow automation, and system integrations.',
    path: '/healthcare-solutions',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <HealthcareSolutionsPageClient />
      </div>
    </>
  );
}

import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {CustomSoftwarePageClient} from './CustomSoftwarePageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Custom Healthcare Software Development | Byte Operator',
    description:
      'Build custom healthcare applications with AI-powered features, workflow automation and third-party integrations. Explore healthcare software solutions by Byte Operator.',
    path: '/services/custom-healthcare-software-development',
    keywords: [
      'Custom Healthcare Software Development',
      'Healthcare Software Development Services',
      'Healthcare Application Development',
      'Custom Healthcare Applications',
      'AI Healthcare Software Development',
      'Healthcare Software Integration',
      'Healthcare Workflow Automation',
    ],
  });
}

export default function CustomHealthcareSoftwarePage() {
  const graph = serviceJsonLd({
    name: 'Custom Healthcare Software Development',
    description:
      'Build custom healthcare applications with AI-powered features, workflow automation and third-party integrations. Explore healthcare software solutions by Byte Operator.',
    path: '/services/custom-healthcare-software-development',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <CustomSoftwarePageClient />
      </div>
    </>
  );
}

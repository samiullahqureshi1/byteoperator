import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {PrimaryCarePageClient} from './PrimaryCarePageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Primary Care Software Solutions | Byte Operator',
    description:
      'Explore primary care software solutions, AI voice agents, workflow automation, custom software development, and healthcare integrations with Byte Operator.',
    path: '/services/primary-care',
    keywords: [
      'Primary Care Software Solutions',
      'Primary Care Practice Management Software',
      'Family Medicine Software Solutions',
      'Primary Care Workflow Automation',
      'Primary Care AI Voice Agents',
      'Primary Care EHR Integration',
      'Primary Care Patient Intake Automation',
      'Preventive Care Reminder Software',
    ],
  });
}

export default function PrimaryCareServicePage() {
  const graph = serviceJsonLd({
    name: 'Primary Care Software Solutions',
    description:
      'Explore primary care software solutions, AI voice agents, workflow automation, custom software development, and healthcare integrations with Byte Operator.',
    path: '/services/primary-care',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <PrimaryCarePageClient />
      </div>
    </>
  );
}

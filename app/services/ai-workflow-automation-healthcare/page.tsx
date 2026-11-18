import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {AiWorkflowPageClient} from './AiWorkflowPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'AI Workflow Automation for Healthcare | Byte Operator',
    description:
      'Streamline patient intake, referral coordination, document extraction, and appointment workflows with custom healthcare AI automation from Byte Operator.',
    path: '/services/ai-workflow-automation-healthcare',
    keywords: [
      'AI Workflow Automation Healthcare',
      'Healthcare Operations Automation',
      'Patient Intake Automation',
      'Healthcare Document Processing AI',
      'n8n Healthcare Automation',
      'EHR EMR Workflow Integration',
      'Healthcare Referral Management',
    ],
  });
}

export default function AiWorkflowAutomationPage() {
  const graph = serviceJsonLd({
    name: 'AI Workflow Automation for Healthcare',
    description:
      'Streamline patient intake, referral coordination, document extraction, and appointment workflows with custom healthcare AI automation from Byte Operator.',
    path: '/services/ai-workflow-automation-healthcare',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <AiWorkflowPageClient />
      </div>
    </>
  );
}

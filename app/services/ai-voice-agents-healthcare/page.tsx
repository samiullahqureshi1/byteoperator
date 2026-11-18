import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {AiVoicePageClient} from './AiVoicePageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'AI Voice Agents & Healthcare Receptionists | Byte Operator',
    description:
      'Automate healthcare calls, appointment scheduling and patient follow-ups with AI voice agents and custom EHR/EMR integrations from Byte Operator.',
    path: '/services/ai-voice-agents-healthcare',
    keywords: [
      'AI Voice Agents for Healthcare',
      'AI Healthcare Receptionist',
      'Healthcare Appointment Scheduling Automation',
      'Healthcare AI Voice Solutions',
      'EHR EMR Voice Integration',
      'Medical Practice Phone Automation',
    ],
  });
}

export default function AiVoiceAgentsPage() {
  const graph = serviceJsonLd({
    name: 'AI Voice Agents & Healthcare Receptionists',
    description:
      'Automate healthcare calls, appointment scheduling and patient follow-ups with AI voice agents and custom EHR/EMR integrations from Byte Operator.',
    path: '/services/ai-voice-agents-healthcare',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <AiVoicePageClient />
      </div>
    </>
  );
}

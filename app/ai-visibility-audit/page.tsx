import type {Metadata} from 'next';
import {AiVisibilityAuditHero} from '~/components/audit/AiVisibilityAuditHero';

export const metadata: Metadata = {
  title: 'Free AI Visibility Audit | Byte Operator',
  description:
    'Discover how your Software brand appears in ChatGPT, Perplexity, and Gemini searches with our comprehensive AI visibility audit.',
  alternates: {
    canonical: 'https://byteoperator.com/ai-visibility-audit',
  },
};

export default function AiVisibilityAuditPage() {
  return (
    <div className="ai-visibility-audit-page">
      <AiVisibilityAuditHero />
    </div>
  );
}

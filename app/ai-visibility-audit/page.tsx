import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {ServiceDetailPage} from '~/components/services/ServiceDetailPage';
import {SERVICE_PAGE_CONFIGS} from '~/data/servicePages';

export const metadata: Metadata = pageMetadata({
  title: 'GEO & AI Search Visibility Agency | Byte Operator',
  description:
    'Be the cited brand in ChatGPT, Perplexity, Gemini, and Google AI Overviews with specialized Generative Engine Optimization (GEO).',
  path: '/ai-visibility-audit',
});

export default function AiVisibilityAuditPage() {
  const config = SERVICE_PAGE_CONFIGS['geo-agency'];
  return (
    <div className="ai-visibility-audit-page">
      <ServiceDetailPage
        page={{
          handle: 'geo-agency',
          title: 'Generative Engine Optimisation (GEO)',
          faqs: config.faqs,
        }}
        config={config}
      />
    </div>
  );
}

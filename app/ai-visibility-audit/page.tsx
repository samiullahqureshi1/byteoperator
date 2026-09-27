import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
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
  // Service schema from this page's own title and description.
  const graph = serviceJsonLd({
    path: '/ai-visibility-audit',
    name: String(metadata.title).replace(/ \| Byte Operator$/, ''),
    description: String(metadata.description),
  });

  return (
    <>
      <JsonLd graph={graph} />
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
    </>
  );
}

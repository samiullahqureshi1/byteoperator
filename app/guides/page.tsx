import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {GuidesPageView} from '~/components/guides/GuidesPageView';

export const metadata: Metadata = pageMetadata({
  title: 'Technical Guides & Architecture Blueprints | Byte Operator',
  description:
    'Engineering blueprints, Next.js commerce whitepapers, Generative Engine Optimization (GEO) runbooks and 150-point CRO audit checklists to download.',
  path: '/guides',
  keywords: [
    'Byte Operator Guides',
    'Ecommerce Engineering Blueprints',
    'Headless Next.js Whitepaper',
    'Generative Engine Optimization Guide',
    'Conversion Rate Optimization Checklist',
    'Zero Downtime Migration Runbook',
    'Shopify Plus Enterprise Architecture',
  ],
});

export default function GuidesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Byte Operator Technical Guides & Blueprints',
    description:
      'Download actionable engineering blueprints, Next.js commerce whitepapers, and scientific CRO audit checklists.',
    url: 'https://www.byteoperator.com/guides',
    provider: {
      '@type': 'Organization',
      name: 'Byte Operator',
      url: 'https://www.byteoperator.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <GuidesPageView />
    </>
  );
}

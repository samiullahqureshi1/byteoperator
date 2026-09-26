import type {Metadata} from 'next';
import {GuidesPageView} from '~/components/guides/GuidesPageView';

export const metadata: Metadata = {
  title: 'Technical Guides & Architecture Blueprints | Byte Operator',
  description:
    'Download actionable engineering blueprints, Next.js commerce whitepapers, Generative Engine Optimization (GEO) runbooks, and 150-point scientific CRO audit checklists.',
  keywords: [
    'Byte Operator Guides',
    'Ecommerce Engineering Blueprints',
    'Headless Next.js Whitepaper',
    'Generative Engine Optimization Guide',
    'Conversion Rate Optimization Checklist',
    'Zero Downtime Migration Runbook',
    'Shopify Plus Enterprise Architecture',
  ],
  alternates: {
    canonical: 'https://byteoperator.com/guides',
  },
  openGraph: {
    title: 'Technical Guides & Blueprints | Byte Operator',
    description:
      'Download our battle-tested whitepapers, headless architecture runbooks, CRO audit frameworks, and AI search protocols used to scale 8-figure enterprise storefronts.',
    url: 'https://byteoperator.com/guides',
    siteName: 'Byte Operator',
    type: 'website',
  },
};

export default function GuidesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Byte Operator Technical Guides & Blueprints',
    description:
      'Download actionable engineering blueprints, Next.js commerce whitepapers, and scientific CRO audit checklists.',
    url: 'https://byteoperator.com/guides',
    provider: {
      '@type': 'Organization',
      name: 'Byte Operator',
      url: 'https://byteoperator.com',
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

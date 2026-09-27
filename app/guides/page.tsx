import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {GuidesPageView} from '~/components/guides/GuidesPageView';

export const metadata: Metadata = pageMetadata({
  title: 'Technical Guides & Architecture Blueprints | Byte Operator',
  description:
    'Coming soon: planned in-depth guides from Byte Operator on software architecture, platform migrations, CRO and AI search.',
  path: '/guides',
  // Not launched yet: reachable, but kept out of the index and sitemap.
  robots: {
    index: false,
    follow: true,
  },
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
  return <GuidesPageView />;
}

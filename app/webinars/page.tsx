import type {Metadata} from 'next';
import {WebinarsPageView} from '~/components/webinars/WebinarsPageView';

export const metadata: Metadata = {
  title: 'Webinars & Masterclasses | Byte Operator - Live Architecture & CRO Teardowns',
  description:
    'Watch high-impact technical teardowns and architecture masterclasses. Learn Core Web Vitals profiling, Headless Next.js App Router engineering, and Generative Engine Optimization (GEO).',
  keywords: [
    'Byte Operator Webinars',
    'Ecommerce Masterclasses',
    'Core Web Vitals Teardown',
    'Headless Next.js Webinar',
    'Generative Search Masterclass',
    'Conversion Rate Optimization Live Stream',
    'Shopify Plus Architecture Workshops',
  ],
  alternates: {
    canonical: 'https://www.byteoperator.com/webinars',
  },
  openGraph: {
    title: 'Webinars & Masterclasses | Byte Operator',
    description:
      'Watch real-world code refactors, Core Web Vitals audits, AI search integrations, and conversion rate optimization teardowns led by elite software engineers.',
    url: 'https://www.byteoperator.com/webinars',
    siteName: 'Byte Operator',
    type: 'website',
  },
};

export default function WebinarsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EventSeries',
    name: 'Byte Operator Architecture & CRO Masterclasses',
    description:
      'High-impact technical teardowns, Core Web Vitals audits, and headless commerce masterclasses.',
    url: 'https://www.byteoperator.com/webinars',
    organizer: {
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
      <WebinarsPageView />
    </>
  );
}

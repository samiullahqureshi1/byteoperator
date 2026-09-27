import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {WebinarsPageView} from '~/components/webinars/WebinarsPageView';

export const metadata: Metadata = pageMetadata({
  title: 'Webinars & Masterclasses | Byte Operator',
  description:
    'Live technical teardowns and architecture masterclasses on Core Web Vitals, headless Next.js engineering and Generative Engine Optimization (GEO).',
  path: '/webinars',
  keywords: [
    'Byte Operator Webinars',
    'Ecommerce Masterclasses',
    'Core Web Vitals Teardown',
    'Headless Next.js Webinar',
    'Generative Search Masterclass',
    'Conversion Rate Optimization Live Stream',
    'Shopify Plus Architecture Workshops',
  ],
});

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

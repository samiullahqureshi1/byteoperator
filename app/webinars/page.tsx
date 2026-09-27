import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {WebinarsPageView} from '~/components/webinars/WebinarsPageView';

export const metadata: Metadata = pageMetadata({
  title: 'Webinars & Masterclasses | Byte Operator',
  description:
    'Coming soon: planned live sessions from the Byte Operator team on Core Web Vitals, AI search and conversion optimisation.',
  path: '/webinars',
  // Not launched yet: reachable, but kept out of the index and sitemap.
  robots: {
    index: false,
    follow: true,
  },
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
  return <WebinarsPageView />;
}

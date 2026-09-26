import type {Metadata} from 'next';
import {NewsletterPageView} from '~/components/newsletter/NewsletterPageView';

export const metadata: Metadata = {
  title: 'Join The Operator Dispatch | Byte Operator - Technical & Growth Newsletter',
  description:
    'Join 14,000+ CTOs, ecommerce directors, and software engineers. Receive weekly deep-dives on Next.js performance, conversion rate optimization split tests, and AI search architecture.',
  keywords: [
    'Byte Operator Newsletter',
    'Ecommerce Engineering Newsletter',
    'Next.js Performance Dispatch',
    'CRO A/B Testing Newsletter',
    'Generative Engine Optimization AI',
    'Shopify Plus Technical Briefing',
  ],
  alternates: {
    canonical: 'https://byteoperator.com/newsletter',
  },
  openGraph: {
    title: 'The Operator Dispatch: Weekly Briefing for CTOs & Growth Engineers | Byte Operator',
    description:
      'Join 14,000+ software architects, ecommerce directors, and technical founders receiving our weekly deep-dives on Next.js performance, CRO split tests, and AI search algorithms.',
    url: 'https://byteoperator.com/newsletter',
    siteName: 'Byte Operator',
    type: 'website',
  },
};

export default function NewsletterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Periodical',
    name: 'The Operator Dispatch',
    description:
      'Weekly technical and growth briefing for CTOs, ecommerce architects, and growth engineers.',
    url: 'https://byteoperator.com/newsletter',
    publisher: {
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
      <NewsletterPageView />
    </>
  );
}

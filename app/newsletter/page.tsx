import type {Metadata} from 'next';
import {NewsletterPageView} from '~/components/newsletter/NewsletterPageView';

export const metadata: Metadata = {
  title: 'The Operator Dispatch | Byte Operator - Weekly Engineering & Growth Newsletter',
  description:
    'Join CTOs, ecommerce directors, and software engineers. Receive weekly deep-dives on Next.js performance, conversion rate optimization, and AI search architecture.',
  alternates: {
    canonical: 'https://www.byteoperator.com/newsletter',
  },
  openGraph: {
    title: 'The Operator Dispatch: Weekly Briefing for CTOs & Growth Engineers | Byte Operator',
    description:
      'Weekly deep-dives on Next.js performance, CRO split tests, and AI search algorithms — from the engineering team at Byte Operator.',
    url: 'https://www.byteoperator.com/newsletter',
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
    url: 'https://www.byteoperator.com/newsletter',
    publisher: {
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
      <NewsletterPageView />
    </>
  );
}

import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {NewsletterPageView} from '~/components/newsletter/NewsletterPageView';

export const metadata: Metadata = pageMetadata({
  title: 'The Operator Dispatch Newsletter | Byte Operator',
  description:
    'Weekly deep-dives for CTOs, ecommerce leaders and engineers on Next.js performance, conversion rate optimization and AI search architecture.',
  path: '/newsletter',
});

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

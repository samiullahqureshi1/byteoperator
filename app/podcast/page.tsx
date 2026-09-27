import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {PodcastPageView} from '~/components/podcast/PodcastPageView';

export const metadata: Metadata = pageMetadata({
  title: 'Architecting Scale Podcast | Byte Operator',
  description:
    'Architecting Scale, the engineering podcast by Byte Operator: technical teardowns, Next.js commerce architecture, GEO and high-growth CTO strategy.',
  path: '/podcast',
  keywords: [
    'Byte Operator Podcast',
    'Ecommerce Engineering Podcast',
    'Headless Next.js Podcast',
    'CTO Tech Teardown',
    'Generative Engine Optimization GEO',
    'Conversion Rate Optimization Audio',
    'High Volume Ecommerce Architecture',
  ],
});

export default function PodcastPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: 'Architecting Scale: The CTO & Commerce Podcast',
    description:
      'Unfiltered engineering conversations, architecture teardowns, and growth masterclasses with top CTOs, AI researchers, and high-growth ecommerce founders.',
    url: 'https://www.byteoperator.com/podcast',
    creator: {
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
      <PodcastPageView />
    </>
  );
}

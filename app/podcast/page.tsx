import type {Metadata} from 'next';
import {PodcastPageView} from '~/components/podcast/PodcastPageView';

export const metadata: Metadata = {
  title: 'Podcast: Architecting Scale | Byte Operator - CTO & Commerce Engineering',
  description:
    'Listen to Architecting Scale, the engineering podcast by Byte Operator. Technical teardowns, Next.js commerce architectures, Generative Engine Optimization (GEO), and high-growth CTO strategies.',
  keywords: [
    'Byte Operator Podcast',
    'Ecommerce Engineering Podcast',
    'Headless Next.js Podcast',
    'CTO Tech Teardown',
    'Generative Engine Optimization GEO',
    'Conversion Rate Optimization Audio',
    'High Volume Ecommerce Architecture',
  ],
  alternates: {
    canonical: 'https://www.byteoperator.com/podcast',
  },
  openGraph: {
    title: 'Architecting Scale: The CTO & Commerce Podcast | Byte Operator',
    description:
      'Unfiltered engineering conversations, architecture teardowns, and growth masterclasses with top CTOs, AI researchers, and high-growth ecommerce founders.',
    url: 'https://www.byteoperator.com/podcast',
    siteName: 'Byte Operator',
    type: 'website',
  },
};

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

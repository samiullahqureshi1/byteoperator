import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {PodcastPageView} from '~/components/podcast/PodcastPageView';

export const metadata: Metadata = pageMetadata({
  title: 'Architecting Scale Podcast | Byte Operator',
  description:
    'Coming soon: Architecting Scale, a planned podcast of engineering conversations and architecture teardowns from the Byte Operator team.',
  path: '/podcast',
  // Not launched yet: reachable, but kept out of the index and sitemap.
  robots: {
    index: false,
    follow: true,
  },
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
  return <PodcastPageView />;
}

import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {NewsletterPageView} from '~/components/newsletter/NewsletterPageView';

export const metadata: Metadata = pageMetadata({
  title: 'The Operator Dispatch Newsletter | Byte Operator',
  description:
    'Coming soon: The Operator Dispatch, a planned weekly briefing on web performance, conversion optimisation and AI search.',
  path: '/newsletter',
  // Not launched yet: reachable, but kept out of the index and sitemap.
  robots: {
    index: false,
    follow: true,
  },
});

export default function NewsletterPage() {
  return <NewsletterPageView />;
}

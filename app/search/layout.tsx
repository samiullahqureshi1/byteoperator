import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = pageMetadata({
  title: 'Search | Byte Operator',
  description:
    'Search Byte Operator services, case studies, and articles.',
  path: '/search',
  robots: {
    index: false,
    follow: true,
  },
});

export default function SearchLayout({children}: {children: React.ReactNode}) {
  return children;
}

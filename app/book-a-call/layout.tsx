import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';

// The page itself is a client component, so its metadata lives here.
// Kept out of the index: it is a thin scheduling handoff, not a landing page.
export const metadata: Metadata = pageMetadata({
  title: 'Book a Call | Byte Operator',
  description:
    'Schedule a free discovery call with Byte Operator to discuss your software, ecommerce, CRO, SEO, or AI project.',
  path: '/book-a-call',
  robots: {
    index: false,
    follow: true,
  },
});

export default function BookACallLayout({children}: {children: React.ReactNode}) {
  return children;
}

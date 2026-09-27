import type {Metadata} from 'next';

// The page itself is a client component, so its metadata lives here.
// Kept out of the index: it is a thin scheduling handoff, not a landing page.
export const metadata: Metadata = {
  title: 'Book a Call | Byte Operator',
  description:
    'Schedule a free discovery call with Byte Operator to discuss your software, ecommerce, CRO, SEO, or AI project.',
  alternates: {
    canonical: 'https://www.byteoperator.com/book-a-call',
  },
  openGraph: {
    title: 'Book a Call | Byte Operator',
    description:
      'Schedule a free discovery call with Byte Operator to discuss your software, ecommerce, CRO, SEO, or AI project.',
    url: 'https://www.byteoperator.com/book-a-call',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function BookACallLayout({children}: {children: React.ReactNode}) {
  return children;
}

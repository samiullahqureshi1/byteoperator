import type {Metadata} from 'next';

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: 'Search | Byte Operator',
  description: 'Search Byte Operator services, case studies, and articles.',
  alternates: {
    canonical: 'https://www.byteoperator.com/search',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({children}: {children: React.ReactNode}) {
  return children;
}

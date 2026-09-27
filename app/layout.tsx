import type {Metadata} from 'next';
import './globals.css';
import {PageLayout} from '~/components/PageLayout';
import {SITEWIDE_GRAPH, jsonLdString} from '~/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Byte Operator | The Software Agency That Drives Real Growth',
  description:
    'High-performing digital platforms & applications, backed by proven CRO, SEO, and AI visibility strategies that deliver measurable results.',
  metadataBase: new URL('https://www.byteoperator.com'),
  // Pages set their own url/title/description via pageMetadata(); the share
  // image comes from app/opengraph-image.tsx.
  openGraph: {
    siteName: 'Byte Operator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Google Search shows a favicon only if it is square and a multiple of
  // 48px, so every icon here is 48/96/192/512. /favicon.ico (16/32/48) is
  // served from public/ for browsers and crawlers that request it directly.
  icons: {
    icon: [
      {url: '/favicon.ico', sizes: '48x48'},
      {url: '/images/favicon-48.png', sizes: '48x48', type: 'image/png'},
      {url: '/images/favicon-96.png', sizes: '96x96', type: 'image/png'},
      {url: '/images/favicon-192.png', sizes: '192x192', type: 'image/png'},
    ],
    apple: [{url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="MH80_WYTkwy23muXrl99RBVKfe76gOw3bmDJFHEQTlk"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString(SITEWIDE_GRAPH),
          }}
        />
      </head>
      <body>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}

import type {Metadata} from 'next';
import './globals.css';
import {PageLayout} from '~/components/PageLayout';
import {SITEWIDE_GRAPH, jsonLdString} from '~/lib/seo/schema';

export const metadata: Metadata = {
  // Fallback only: every page sets its own title via pageMetadata().
  title: 'Byte Operator — AI Automation & Custom Software Engineering',
  description:
    'Byte Operator is an independent software engineering and AI automation company. We build high-performance web applications, custom SaaS platforms, and autonomous AI systems.',
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
  // Google Search shows a favicon only if it is square and ≥48px.
  // /favicon.ico must be served from public/ at the root for crawlers.
  icons: {
    icon: [
      // favicon.ico — no sizes attr; let the browser/crawler auto-detect
      {url: '/favicon.ico', type: 'image/x-icon'},
      {url: '/images/favicon-48.png', sizes: '48x48', type: 'image/png'},
      {url: '/images/favicon-96.png', sizes: '96x96', type: 'image/png'},
      {url: '/images/favicon-192.png', sizes: '192x192', type: 'image/png'},
      {url: '/images/favicon-512.png', sizes: '512x512', type: 'image/png'},
    ],
    shortcut: [{url: '/favicon.ico', type: 'image/x-icon'}],
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
        {/* Explicit shortcut icon — picked up by Google's favicon crawler */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="48x48" href="/images/favicon-48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
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

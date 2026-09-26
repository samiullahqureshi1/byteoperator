import type {Metadata} from 'next';
import './globals.css';
import {PageLayout} from '~/components/PageLayout';
import {SITEWIDE_GRAPH, jsonLdString} from '~/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Byte Operator | The Software Agency That Drives Real Growth',
  description:
    'High-performing digital platforms & applications, backed by proven CRO, SEO, and AI visibility strategies that deliver measurable results.',
  metadataBase: new URL('https://byteoperator.com'),
  openGraph: {
    title: 'Byte Operator | The Software Agency That Drives Real Growth',
    description:
      'High-performing digital platforms & applications, backed by proven CRO, SEO, and AI visibility strategies that deliver measurable results.',
    url: 'https://byteoperator.com',
    siteName: 'Byte Operator',
    type: 'website',
  },
  icons: {
    icon: [
      {url: '/images/site-icon.png', sizes: 'any', type: 'image/png'},
      {url: '/images/favicon-32.png', sizes: '32x32', type: 'image/png'},
      {url: '/images/byte-operator-logo.png', sizes: '512x512', type: 'image/png'},
    ],
    shortcut: '/images/site-icon.png',
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
        <link rel="icon" href="/images/site-icon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/images/site-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
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

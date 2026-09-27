import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Byte Operator',
    short_name: 'Byte Operator',
    description:
      'Custom software, AI automation, ecommerce engineering, SEO and CRO agency.',
    start_url: '/',
    display: 'browser',
    background_color: '#070f2b',
    theme_color: '#070f2b',
    icons: [
      {src: '/images/favicon-192.png', sizes: '192x192', type: 'image/png'},
      {src: '/images/favicon-512.png', sizes: '512x512', type: 'image/png'},
    ],
  };
}

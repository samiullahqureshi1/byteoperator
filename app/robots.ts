import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /contact?service=… and ?subject=… prefill the form; they all
        // canonicalise to /contact, so crawlers need not fetch each one.
        disallow: ['/api/', '/search', '/contact?'],
      },
    ],
    sitemap: 'https://www.byteoperator.com/sitemap.xml',
    host: 'https://www.byteoperator.com',
  };
}

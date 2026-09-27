import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/search'],
      },
    ],
    sitemap: 'https://www.byteoperator.com/sitemap.xml',
    host: 'https://www.byteoperator.com',
  };
}

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
    sitemap: 'https://byteoperator.com/sitemap.xml',
    host: 'https://byteoperator.com',
  };
}

import type {MetadataRoute} from 'next';
import {SERVICE_PAGE_CONFIGS} from '~/data/servicePages';
import {CASE_STUDIES} from '~/data/caseStudiesData';
import {ARTICLES_DATA} from '~/data/articlesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://byteoperator.com';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {url: baseUrl, lastModified: now, priority: 1.0},
    {url: `${baseUrl}/about`, lastModified: now, priority: 0.9},
    {url: `${baseUrl}/services`, lastModified: now, priority: 0.9},
    {url: `${baseUrl}/software-plus-agency`, lastModified: now, priority: 0.9},
    {url: `${baseUrl}/software-cro-audit`, lastModified: now, priority: 0.9},
    {url: `${baseUrl}/ecommerce-seo-agency`, lastModified: now, priority: 0.9},
    {url: `${baseUrl}/ai-visibility-audit`, lastModified: now, priority: 0.8},
    {url: `${baseUrl}/work`, lastModified: now, priority: 0.9},
    {url: `${baseUrl}/articles`, lastModified: now, priority: 0.8},
    {url: `${baseUrl}/contact`, lastModified: now, priority: 0.9},
    {url: `${baseUrl}/book-a-call`, lastModified: now, priority: 0.8},
  ];

  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(SERVICE_PAGE_CONFIGS).map((handle) => ({
    url: `${baseUrl}/services/${handle}`,
    lastModified: now,
    priority: 0.8,
  }));

  const workRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${baseUrl}/work/${cs.handle}`,
    lastModified: now,
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES_DATA.map((art) => ({
    url: `${baseUrl}/articles/${art.handle}`,
    lastModified: now,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...articleRoutes];
}

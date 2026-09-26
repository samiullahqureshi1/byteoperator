import type {MetadataRoute} from 'next';
import {SERVICE_PAGE_CONFIGS} from '~/data/servicePages';
import {CASE_STUDIES} from '~/data/caseStudiesData';
import {ARTICLES_DATA} from '~/data/articlesData';

const POLICY_HANDLES = [
  'privacy-policy',
  'terms-of-service',
  'refund-policy',
  'subscription-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://byteoperator.com';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/software-plus-agency`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shopify-cro-audit`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ecommerce-seo-agency`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-visibility-audit`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/podcast`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/webinars`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/book-a-call`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/policies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(SERVICE_PAGE_CONFIGS).map((handle) => ({
    url: `${baseUrl}/services/${handle}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const workRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${baseUrl}/work/${cs.handle}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES_DATA.map((art) => ({
    url: `${baseUrl}/articles/${art.handle}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const policyRoutes: MetadataRoute.Sitemap = POLICY_HANDLES.map((handle) => ({
    url: `${baseUrl}/policies/${handle}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...workRoutes,
    ...articleRoutes,
    ...policyRoutes,
  ];
}

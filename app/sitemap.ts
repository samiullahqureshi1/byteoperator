import type {MetadataRoute} from 'next';
import {SERVICE_PAGE_CONFIGS} from '~/data/servicePages';
import {CASE_STUDIES} from '~/data/caseStudiesData';
import {ARTICLES_DATA} from '~/data/articlesData';
import {resolveCanonicalPath} from '~/lib/route-mappings';

const POLICY_HANDLES = [
  'privacy-policy',
  'terms-of-service',
  'refund-policy',
  'subscription-policy',
];

/** Dedicated modern services and solution pages */
const HEALTHCARE_AND_TECH_SERVICES = [
  '/services/ai-voice-agents-healthcare',
  '/services/ai-workflow-automation-healthcare',
  '/services/custom-healthcare-software-development',
  '/services/saas-web-application-development',
  '/services/software-integrations',
  '/services/healthcare-software-integration',
  '/services/cloud-infrastructure-engineering',
  '/services/healthcare-solutions',
  '/services/medical-practices',
  '/services/dental-practices',
  '/services/dermatology-aesthetic-clinics',
  '/services/ophthalmology-clinics',
  '/services/primary-care',
  '/services/other-specialties',
];

/** Direct clinical specialty and solution routes */
const HEALTHCARE_SOLUTION_ROUTES = [
  '/healthcare-solutions',
  '/healthcare-solutions/medical-practices',
  '/healthcare-solutions/dental-practices',
  '/healthcare-solutions/dermatology-aesthetic-clinics',
  '/healthcare-solutions/ophthalmology-clinics',
  '/healthcare-solutions/primary-care',
  '/healthcare-solutions/other-specialties',
  '/medical-practices',
  '/dental-practices',
  '/dermatology-aesthetic-clinics',
  '/ophthalmology-clinics',
  '/primary-care',
  '/other-specialties',
  '/cloud-infrastructure-engineering',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.byteoperator.com';
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
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
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
      priority: 0.85,
    },
    {
      url: `${baseUrl}/shopify-plus-agency`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/shopify-cro-audit`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ecommerce-seo-agency`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ai-visibility-audit`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/webinars`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/podcast`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/policies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // Modern dedicated services
  const modernServiceRoutes: MetadataRoute.Sitemap = HEALTHCARE_AND_TECH_SERVICES.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.88,
  }));

  // Direct practice and solution routes
  const clinicalSolutionRoutes: MetadataRoute.Sitemap = HEALTHCARE_SOLUTION_ROUTES.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Config-based legacy service pages (skip redirects / consolidated aliases)
  const legacyServiceRoutes: MetadataRoute.Sitemap = Object.keys(SERVICE_PAGE_CONFIGS)
    .filter((handle) => resolveCanonicalPath(`/services/${handle}`) === `/services/${handle}`)
    .map((handle) => ({
      url: `${baseUrl}/services/${handle}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.82,
    }));

  // Work & Case studies (including Bright Dental PMS, MedVoice AI, CareConnect WhatsApp)
  const workRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${baseUrl}/work/${cs.handle}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Knowledge base articles
  const articleRoutes: MetadataRoute.Sitemap = ARTICLES_DATA.map((art) => ({
    url: `${baseUrl}/articles/${art.handle}`,
    lastModified: new Date(art.updatedAt || art.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Legal policies
  const policyRoutes: MetadataRoute.Sitemap = POLICY_HANDLES.map((handle) => ({
    url: `${baseUrl}/policies/${handle}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.4,
  }));

  const allEntries: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...modernServiceRoutes,
    ...clinicalSolutionRoutes,
    ...legacyServiceRoutes,
    ...workRoutes,
    ...articleRoutes,
    ...policyRoutes,
  ];

  // Guaranteed 100% URL deduplication
  const seenUrls = new Set<string>();
  const deduplicatedSitemap: MetadataRoute.Sitemap = [];

  for (const entry of allEntries) {
    if (!seenUrls.has(entry.url)) {
      seenUrls.add(entry.url);
      deduplicatedSitemap.push(entry);
    }
  }

  return deduplicatedSitemap;
}

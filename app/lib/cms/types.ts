export interface CmsUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  recoveryCodes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CmsSession {
  token: string;
  userId: string;
  email: string;
  expiresAt: number;
}

export interface CharacterLimitConfig {
  max: number;
  recommendedMax?: number;
  warningAt?: number;
  label: string;
}

export const CHARACTER_LIMITS: Record<string, CharacterLimitConfig> = {
  // Global & SEO Limits
  metaTitle: { max: 60, recommendedMax: 55, label: 'SEO Meta Title' },
  metaDescription: { max: 160, recommendedMax: 155, label: 'SEO Meta Description' },
  
  // Page Headings & Titles
  heroEyebrow: { max: 40, recommendedMax: 30, label: 'Hero Eyebrow Badge' },
  heroTitle: { max: 75, recommendedMax: 60, label: 'Hero Main Title' },
  heroSubtitle: { max: 260, recommendedMax: 200, label: 'Hero Subtitle / Description' },
  sectionTitle: { max: 65, recommendedMax: 50, label: 'Section Heading' },
  sectionSubtitle: { max: 220, recommendedMax: 160, label: 'Section Subtitle' },
  ctaButtonText: { max: 30, recommendedMax: 20, label: 'CTA Button Label' },

  // Blog / Article Limits
  articleTitle: { max: 80, recommendedMax: 70, label: 'Article Headline' },
  articleExcerpt: { max: 180, recommendedMax: 160, label: 'Article Excerpt / Summary' },
  articleSlug: { max: 60, recommendedMax: 50, label: 'URL Slug' },
  categoryBadge: { max: 25, recommendedMax: 20, label: 'Category Badge' },
};

export interface HomeGalleryItem {
  title: string;
  image: string;
  alt: string;
  url: string;
}

export interface HomeServiceItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
  badgeAlt?: string;
}

export interface HomeProjectItem {
  title: string;
  type: string;
  href: string;
  image: string;
  alt: string;
}

export interface HomeFeatureItem {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  reverse?: boolean;
}

export interface HomePageContent {
  // Section 1: Hero
  heroEyebrow: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroTitleSuffix?: string;
  heroSubtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  heroImage?: string;
  heroShowSection?: boolean;

  // Section 2: Media / Gallery (Checkbox mode: gallery, image, or video)
  galleryMediaType?: 'gallery' | 'image' | 'video';
  gallerySingleImageUrl?: string;
  gallerySingleImageAlt?: string;
  galleryVideoUrl?: string;
  galleryVideoPoster?: string;
  galleryVideoMobileUrl?: string;
  galleryItems?: HomeGalleryItem[];
  galleryShowSection?: boolean;

  // Section 3: About
  aboutShowSection?: boolean;
  aboutEyebrow?: string;
  aboutHeading?: string;
  aboutDescription?: string;
  aboutImage?: string;
  aboutRightHeadingPrefix?: string;
  aboutRightHeadingEmphasis?: string;
  aboutRightHeadingSuffix?: string;
  aboutCtaText?: string;
  aboutCtaLink?: string;
  aboutStat1Value?: string;
  aboutStat1Label?: string;
  aboutStat2Value?: string;
  aboutStat2Label?: string;
  aboutStat3Value?: string;
  aboutStat3Label?: string;
  aboutStat4Value?: string;
  aboutStat4Label?: string;

  // Section 4: Services
  servicesShowSection?: boolean;
  servicesHeading: string;
  servicesSubtitle: string;
  servicesCtaText?: string;
  servicesCtaLink?: string;
  servicesList?: HomeServiceItem[];

  // Section 5: Projects / Case Studies
  projectsShowSection?: boolean;
  projectsHeading: string;
  projectsSubtitle: string;
  projectsImage?: string;
  projectsList?: HomeProjectItem[];

  // Section 6: Features
  featuresShowSection?: boolean;
  featureImage?: string;
  featuresList?: HomeFeatureItem[];

  // Section 7: People / Founders
  peopleShowSection?: boolean;
  peopleEyebrow?: string;
  peopleHeadingFirstLine?: string;
  peopleHeadingSecondLine?: string;
  peopleDescription?: string;
  peopleImage?: string;
  peopleButtonLabel?: string;
  peopleButtonLink?: string;

  // Section 8: Partners & Experts
  partnersShowSection?: boolean;
  expertsShowSection?: boolean;
  expertsEyebrow?: string;
  expertsTitle?: string;
  expertsDescription?: string;

  // Section 9: Observatory / Final CTA
  observatoryShowSection?: boolean;
  observatoryEyebrow?: string;
  observatoryHeading: string;
  observatorySubtitle: string;
  observatoryDescriptionSecondary?: string;
  observatoryImage?: string;
  observatoryShowImage?: boolean;
  observatoryCtaText?: string;
  observatoryCtaLink?: string;

  // SEO
  seoTitle?: string;
  seoDescription?: string;
}

export interface AboutPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  storyHeading: string;
  storyParagraph1: string;
  storyParagraph2: string;
  statTeamCount: string;
  statRetentionRate: string;
  statClientRating: string;
  statProjectsDelivered: string;
  valuesHeading: string;
  valuesSubtitle: string;
  heroImage?: string;
  storyImage?: string;
  spaceImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ServicesPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  heroImage?: string;
  featureImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface WorkPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaHeading: string;
  ctaSubtitle: string;
  heroImage?: string;
  showcaseImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ContactPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  directPhone: string;
  salesEmail: string;
  supportEmail: string;
  officeAddress: string;
  heroImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BookACallPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  calendlyNotice: string;
  ctaButtonText: string;
  heroImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SpecializedServiceContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  heroImage?: string;
  featureImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ServiceDetailContent {
  eyebrow: string;
  heading: string;
  description: string;
  ctaHeading?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  heroImage?: string;
  featureImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface MediaResourcePageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText?: string;
  heroImage?: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface PolicyPageContent {
  title: string;
  lastUpdated: string;
  summary: string;
  contentHtml: string;
  heroImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CmsSiteContent {
  home: HomePageContent;
  about: AboutPageContent;
  services: ServicesPageContent;
  work: WorkPageContent;
  contact: ContactPageContent;
  bookACall: BookACallPageContent;
  shopifyPlus: SpecializedServiceContent;
  ecommerceSeo: SpecializedServiceContent;
  shopifyCro: SpecializedServiceContent;
  aiAudit: SpecializedServiceContent;
  guides: MediaResourcePageContent;
  podcasts: MediaResourcePageContent;
  webinars: MediaResourcePageContent;
  newsletter: MediaResourcePageContent;
  privacyPolicy: PolicyPageContent;
  termsOfService: PolicyPageContent;
  refundPolicy: PolicyPageContent;
  subscriptionPolicy: PolicyPageContent;
  servicePages?: Record<string, ServiceDetailContent>;
}

export interface CmsArticle {
  id: string;
  handle: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  updatedAt?: string;
  category: 'cro' | 'platform' | 'apps' | 'seo' | 'marketing' | 'email';
  articleType: string;
  featured: boolean;
  mainFeatured?: boolean;
  status: 'published' | 'draft';
  image: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  seo: {
    title: string;
    description: string;
  };
}

export interface CmsDatabaseStore {
  users: CmsUser[];
  siteContent: CmsSiteContent;
  articles: CmsArticle[];
}

export interface PartnerLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const ECOMMERCE_PLATFORM_LOGOS: readonly PartnerLogo[] = [
  {
    src: '/images/home-partners/shopify.svg',
    alt: 'Shopify',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/shopify-plus.svg',
    alt: 'Shopify Plus',
    width: 176,
    height: 36,
  },
  {
    src: '/images/home-partners/bigcommerce.svg',
    alt: 'BigCommerce',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/woocommerce.svg',
    alt: 'WooCommerce',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/magento.svg',
    alt: 'Magento',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/salesforce-commerce-cloud.svg',
    alt: 'Salesforce Commerce Cloud',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/shopware.svg',
    alt: 'Shopware',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/prestashop.svg',
    alt: 'PrestaShop',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/opencart.svg',
    alt: 'OpenCart',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/squarespace.svg',
    alt: 'Squarespace',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/wix.svg',
    alt: 'Wix',
    width: 160,
    height: 36,
  },
] as const;

export const TECH_STACK_LOGOS: readonly PartnerLogo[] = [
  {
    src: '/images/home-partners/react.svg',
    alt: 'React',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/nextjs.svg',
    alt: 'Next.js',
    width: 180,
    height: 40,
  },
  {
    src: '/images/home-partners/ai.svg',
    alt: 'AI & Autonomous Agents',
    width: 200,
    height: 40,
  },
  {
    src: '/images/home-partners/typescript.svg',
    alt: 'TypeScript',
    width: 190,
    height: 40,
  },
  {
    src: '/images/home-partners/nodejs.svg',
    alt: 'Node.js',
    width: 170,
    height: 40,
  },
  {
    src: '/images/home-partners/python.svg',
    alt: 'Python',
    width: 160,
    height: 40,
  },
  {
    src: '/images/home-partners/graphql.svg',
    alt: 'GraphQL',
    width: 170,
    height: 40,
  },
  {
    src: '/images/home-partners/tailwindcss.svg',
    alt: 'Tailwind CSS',
    width: 180,
    height: 40,
  },
  {
    src: '/images/home-partners/n8n.svg',
    alt: 'n8n Automation',
    width: 150,
    height: 40,
  },
  {
    src: '/images/home-partners/aws.svg',
    alt: 'Amazon Web Services (AWS)',
    width: 150,
    height: 40,
  },
  {
    src: '/images/home-partners/cloudflare.svg',
    alt: 'Cloudflare',
    width: 180,
    height: 40,
  },
  {
    src: '/images/home-partners/postgresql.svg',
    alt: 'PostgreSQL',
    width: 190,
    height: 40,
  },
] as const;

export const PARTNER_LOGOS: readonly PartnerLogo[] = [
  ...ECOMMERCE_PLATFORM_LOGOS,
  ...TECH_STACK_LOGOS,
] as const;

export const CONTACT_PARTNER_LOGOS: readonly PartnerLogo[] = PARTNER_LOGOS;
export const ECOMMERCE_SEO_PARTNER_LOGOS: readonly PartnerLogo[] = PARTNER_LOGOS;

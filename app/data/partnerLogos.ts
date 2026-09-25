export interface PartnerLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const PARTNER_LOGOS: readonly PartnerLogo[] = [
  {
    src: '/images/home-partners/software.svg',
    alt: 'Software',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/software-plus.svg',
    alt: 'Enterprise Platform Solutions',
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

export const CONTACT_PARTNER_LOGOS: readonly PartnerLogo[] = PARTNER_LOGOS;
export const ECOMMERCE_SEO_PARTNER_LOGOS: readonly PartnerLogo[] = PARTNER_LOGOS;

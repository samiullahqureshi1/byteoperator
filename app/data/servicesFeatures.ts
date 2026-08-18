import {
  HOME_FEATURES,
  type HomeFeatureData,
} from './homeFeatures';
import {SHOPIFY_SEO_CLEAN_PATH} from '~/lib/route-mappings';

const SERVICES_FEATURE_CONFIG = [
  {
    id: 'shopify-launch',
    heading: 'Design & Development Services',
    button: {
      label: 'Explore New Store Services',
      href: '/pages/shopify-development',
    },
    description: [
      'FoldTech brings Shopify store design, development and technical implementation together for new builds and existing themes. We plan storefront structure, buying journeys and functionality around the needs of the brand and its customers.',
      'Each build considers user experience, performance, SEO foundations and maintainability, giving ecommerce teams a practical base for future campaigns, integrations and ongoing development.',
    ],
  },
  {
    id: 'shopify-support-growth',
    heading: 'Support & CRO Retainers',
    button: {
      label: 'Explore Retainers',
      href: '/pages/shopify-maintenance',
    },
    description: [
      'FoldTech supports Shopify stores through ongoing maintenance, development updates and conversion improvement. Retainers can cover day-to-day fixes, smaller development requirements and planned enhancements that keep the storefront dependable and easier to manage.',
      'CRO work uses performance analysis, customer behaviour and testing opportunities to improve the buying journey over time, connecting practical store changes with the commercial priorities of the ecommerce team.',
    ],
  },
  {
    id: 'shopify-seo-geo',
    heading: 'Shopify SEO Services',
    button: {
      label: 'Explore SEO',
      href: SHOPIFY_SEO_CLEAN_PATH,
    },
    description: [
      'Our Shopify SEO work brings technical optimisation, content strategy and site structure together to strengthen organic visibility. We review current performance, competitors and search opportunities across the storefront.',
      'This includes traditional search and AI-driven discovery, with recommendations shaped around both visibility and customer experience. The aim is to make improvements practical for the wider content, development and ecommerce teams.',
    ],
  },
  {
    id: 'email-sms-retention',
    heading: 'Email & SMS Marketing',
    button: {
      label: 'Explore Email Marketing',
      href: '/pages/email-sms-marketing',
    },
    description: [
      'FoldTech plans email and SMS activity around relevant moments in the customer journey. Work can include audience segmentation, targeted campaigns, automated lifecycle flows and triggered communications that support retention alongside the Shopify store.',
      'We can also consider how email and SMS connect with subscriptions, reviews, loyalty programmes and other ecommerce systems, helping campaigns and automations work as part of a joined-up customer experience.',
    ],
  },
] as const;

export const SERVICES_FEATURES: readonly HomeFeatureData[] =
  SERVICES_FEATURE_CONFIG.map(
    ({id, heading, description, button}) => {
      const feature = HOME_FEATURES.find(
        (candidate) => candidate.id === id,
      );

      if (!feature) {
        throw new Error(`Missing HomeFeature data for "${id}"`);
      }

      const featureWithoutLogos: HomeFeatureData = {
        ...feature,
      };

      delete featureWithoutLogos.logos;

      return {
        ...featureWithoutLogos,
        heading,
        description,
        buttons: [button],
      };
    },
  );

import {
  HOME_FEATURES,
  type HomeFeatureData,
} from './homeFeatures';
import {SHOPIFY_SEO_CLEAN_PATH} from '~/lib/route-mappings';

const SERVICES_FEATURE_CONFIG = [
  {
    id: 'shopify-launch',
    eyebrow: 'Shopify Agency',
    heading: 'Design & Development Services',
    button: {
      label: 'Explore New Store Services',
      href: '/pages/shopify-development',
    },
    description: [
      'The Fold Tech brings Shopify store design, development and technical implementation together for new builds and existing themes. We carefully plan storefront structure, buying journeys and functionality around your brand and customers.',
      'Every build is designed with user experience, performance, SEO foundations and long-term maintainability in mind giving ecommerce teams a strong base for future campaigns, integrations and ongoing growth.',
    ],
  },
  {
    id: 'shopify-support-growth',
    eyebrow: 'Shopify Monthly Support Agency',
    heading: 'Support & CRO Retainers',
    button: {
      label: 'Explore Retainers',
      href: '/pages/shopify-maintenance',
    },
    description: [
      'The Fold Tech provides ongoing Shopify support, maintenance and conversion rate optimisation through flexible monthly retainers. Our retainers cover day-to-day fixes, smaller development tasks and planned enhancements that keep your storefront reliable and easy to manage.',
      'CRO work combines performance analysis, customer behaviour insights and structured testing to continuously improve the buying journey — aligning practical store changes with your commercial goals.',
    ],
  },
  {
    id: 'shopify-seo-geo',
    eyebrow: 'Shopify SEO & GEO Agency',
    heading: 'Shopify SEO Services',
    button: {
      label: 'Explore SEO',
      href: SHOPIFY_SEO_CLEAN_PATH,
    },
    description: [
      'The Fold Tech delivers complete Shopify SEO services that combine technical optimization, content strategy and smart site structure to improve organic visibility. We analyze current performance, competitors and search opportunities across your entire storefront.',
    ],
  },
  {
    id: 'email-sms-retention',
    eyebrow: 'Shopify Email & SMS Marketing Agency',
    heading: 'Email & SMS Marketing for Ecommerce Growth',
    button: {
      label: 'Explore Email Marketing',
      href: '/pages/email-sms-marketing',
    },
    description: [
      'We design email and SMS strategies that engage customers at the right moments in their journey. From audience segmentation and targeted campaigns to automated flows and triggered messages, our work helps increase retention and repeat purchases.',
      'Our approach also integrates email and SMS with subscriptions, loyalty programmes and other Shopify systems delivering a seamless customer experience that drives measurable results.',
    ],
  },
] as const;

export const SERVICES_FEATURES: readonly HomeFeatureData[] =
  SERVICES_FEATURE_CONFIG.map(
    ({id, eyebrow, heading, description, button}) => {
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
        eyebrow,
        heading,
        description,
        buttons: [button],
      };
    },
  );

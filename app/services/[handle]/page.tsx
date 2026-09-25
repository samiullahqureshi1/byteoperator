import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ServiceDetailPage} from '~/components/services/ServiceDetailPage';
import {SoftwarePlusPage} from '~/components/services/SoftwarePlusPage';
import {SoftwareCroOptimise} from '~/components/cro/SoftwareCroOptimise';
import {
  SERVICE_PAGE_CONFIGS,
  type ServicePageConfig,
  type ServicePageHandle,
} from '~/data/servicePages';
import {BulkHoursCta} from '~/components/services/detail/BulkHoursCta';

interface Props {
  params: {
    handle: string;
  };
}

const HANDLE_ALIASES: Record<string, ServicePageHandle> = {
  // Software / Platform aliases
  'custom-software-platforms': 'software-developers',
  'full-stack-web-development': 'software-theme-development-builds',
  'software-development': 'software-theme-development-builds',
  'mobile-app-development': 'software-app-development',
  'api-system-integrations': 'software-integrations',
  'integrations': 'software-integrations',
  'headless-cloud-architecture': 'headless-commerce',
  'technical-seo-architecture': 'seo-agency',
  'ecommerce-seo': 'seo-agency',
  'ecommerce-seo-agency': 'seo-agency',
  'generative-engine-optimisation': 'ai-ecommerce-agency',
  'ai-automations-agents': 'ai-ecommerce-agency',
  'ai-seo-agency': 'seo-agency',
  'geo-agency': 'ai-ecommerce-agency',
  'ai-visibility-audit': 'ai-ecommerce-agency',
  'platform-seo-migrations': 'ecommerce-seo-migrations',
  'international-seo-markets': 'shopify-internationalisation',
  'performance-speed-audits': 'shopify-audits',
  'dedicated-engineering-support': 'support-and-maintenance',
  'architecture-tech-consulting': 'shopify-consultant',
  'shopify-store-development': 'shopify-web-design',
  'shopify-apps-extensions': 'shopify-app-development',
  'platform-migrations': 'shopify-migrations',
  'b2b-wholesale-systems': 'shopify-b2b-wholesale',
};

function resolveHandle(rawHandle: string): string {
  return HANDLE_ALIASES[rawHandle] || rawHandle;
}

export function generateStaticParams() {
  const directHandles = Object.keys(SERVICE_PAGE_CONFIGS);
  const aliasHandles = Object.keys(HANDLE_ALIASES);
  const extraHandles = [
    'software-plus-agency',
    'shopify-plus-agency',
    'software-cro-audit',
    'shopify-cro-audit',
    'cro-agency',
    'software-cro-agency',
    'conversion-rate-optimisation',
  ];

  const allHandles = Array.from(
    new Set([...directHandles, ...aliasHandles, ...extraHandles])
  );

  return allHandles.map((handle) => ({
    handle,
  }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {handle} = params;
  const canonicalHandle = resolveHandle(handle);

  if (handle === 'software-plus-agency' || handle === 'shopify-plus-agency') {
    return {
      title: 'Shopify Plus & Enterprise Agency | Byte Operator',
      description: 'Enterprise Shopify Plus design, development, and scalable growth architecture for high-volume brands.',
    };
  }

  if (
    handle === 'software-cro-audit' ||
    handle === 'shopify-cro-audit' ||
    handle === 'cro-agency' ||
    handle === 'software-cro-agency' ||
    handle === 'conversion-rate-optimisation'
  ) {
    return {
      title: 'Conversion Rate Optimisation (CRO) Audit & Services | Byte Operator',
      description: 'Data-backed conversion rate optimization, UX testing, and revenue audits for scaling ecommerce brands.',
    };
  }

  const config = SERVICE_PAGE_CONFIGS[canonicalHandle as ServicePageHandle];

  if (config) {
    const title = config.hero?.eyebrow || config.hero?.heading || handle;
    return {
      title: `${title} | Byte Operator`,
      description: config.hero?.description || config.hero?.heading || 'Specialized engineering and ecommerce services by Byte Operator.',
    };
  }

  return {
    title: `${handle} | Byte Operator`,
  };
}

export default function ServicePage({params}: Props) {
  const {handle} = params;
  const canonicalHandle = resolveHandle(handle);

  if (handle === 'software-plus-agency' || handle === 'shopify-plus-agency') {
    return (
      <div className="software-plus-page-wrap">
        <SoftwarePlusPage />
      </div>
    );
  }

  if (
    handle === 'software-cro-audit' ||
    handle === 'shopify-cro-audit' ||
    handle === 'cro-agency' ||
    handle === 'software-cro-agency' ||
    handle === 'conversion-rate-optimisation'
  ) {
    return (
      <div className="software-cro-page-wrap">
        <SoftwareCroOptimise />
      </div>
    );
  }

  const config = SERVICE_PAGE_CONFIGS[canonicalHandle as ServicePageHandle];

  if (!config) {
    notFound();
  }

  const title = config.hero?.eyebrow || config.hero?.heading || handle;

  return (
    <ServiceDetailPage
      page={{
        handle,
        title,
        faqs: (config as any).faqs,
      }}
      config={config}
      bulkHoursCta={<BulkHoursCta />}
    />
  );
}

import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ServiceDetailPage} from '~/components/services/ServiceDetailPage';
import {
  SERVICE_PAGE_CONFIGS,
  type ServicePageConfig,
  type ServicePageHandle,
} from '~/data/servicePages';
import {BulkHoursCta} from '~/components/services/detail/BulkHoursCta';
import {resolveCanonicalPath} from '~/lib/route-mappings';

const BASE_URL = 'https://www.byteoperator.com';

interface Props {
  params: {
    handle: string;
  };
}

// Aliases (e.g. /services/shopify-plus-agency) are 301'd by middleware.ts,
// so only handles that are their own canonical URL get a page.
function isCanonicalHandle(handle: string): boolean {
  const path = `/services/${handle}`;
  return resolveCanonicalPath(path) === path;
}

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGE_CONFIGS)
    .filter(isCanonicalHandle)
    .map((handle) => ({handle}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {handle} = params;
  const canonicalUrl = `${BASE_URL}/services/${handle}`;

  if (handle === 'software-developers') {
    return {
      title: 'Custom Software Development Services | Byte Operator',
      description:
        'Byte Operator designs and develops custom software, SaaS platforms, enterprise applications and business systems. Explore our software development services and case studies.',
      alternates: {canonical: canonicalUrl},
      openGraph: {
        title: 'Custom Software Development Services | Byte Operator',
        description: 'Byte Operator designs and develops custom software, SaaS platforms, enterprise applications and business systems.',
        url: canonicalUrl,
        type: 'website',
      },
    };
  }

  const config = isCanonicalHandle(handle)
    ? SERVICE_PAGE_CONFIGS[handle as ServicePageHandle]
    : undefined;

  if (config) {
    const title = config.hero?.eyebrow || config.hero?.heading || handle;
    const description = config.hero?.description || config.hero?.heading || 'Specialized engineering and ecommerce services by Byte Operator.';
    return {
      title: `${title} | Byte Operator`,
      description,
      alternates: {canonical: canonicalUrl},
      openGraph: {
        title: `${title} | Byte Operator`,
        description,
        url: canonicalUrl,
        type: 'website',
      },
    };
  }

  return {title: 'Service Not Found | Byte Operator'};
}

export default function ServicePage({params}: Props) {
  const {handle} = params;

  const config = isCanonicalHandle(handle)
    ? SERVICE_PAGE_CONFIGS[handle as ServicePageHandle]
    : undefined;

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
    />
  );
}

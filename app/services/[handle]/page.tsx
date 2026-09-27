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
import {pageMetadata} from '~/lib/seo/metadata';
import {SERVICE_SEO} from '~/data/seoOverrides';

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
  const config = isCanonicalHandle(handle)
    ? SERVICE_PAGE_CONFIGS[handle as ServicePageHandle]
    : undefined;

  if (!config) {
    return {title: 'Service Not Found | Byte Operator'};
  }

  const seo = SERVICE_SEO[handle];
  const title = seo?.title || config.hero?.eyebrow || config.hero?.heading || handle;
  const description =
    seo?.description ||
    config.hero?.description ||
    'Specialized engineering and ecommerce services by Byte Operator.';

  return pageMetadata({
    title: `${title} | Byte Operator`,
    description,
    path: `/services/${handle}`,
  });
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

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
import {contentPageJsonLd, serviceJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';

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

// Informational pages that live under /services but do not describe a
// service offering: they get a breadcrumb, but no Service node.
const NON_SERVICE_HANDLES = new Set(['why-custom-software']);

/** The page's visible <title> stem and meta description. */
function serviceSeo(handle: string, config: ServicePageConfig) {
  const seo = SERVICE_SEO[handle];
  return {
    title: seo?.title || config.hero?.eyebrow || config.hero?.heading || handle,
    description:
      seo?.description ||
      config.hero?.description ||
      'Specialized engineering and ecommerce services by Byte Operator.',
  };
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

  const {title, description} = serviceSeo(handle, config);

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
  const seo = serviceSeo(handle, config);
  const path = `/services/${handle}`;
  const graph = NON_SERVICE_HANDLES.has(handle)
    ? contentPageJsonLd({
        path,
        name: seo.title,
        description: seo.description,
        breadcrumbs: [
          {name: 'Services', path: '/services'},
          {name: seo.title, path},
        ],
      })
    : serviceJsonLd({path, name: seo.title, description: seo.description});

  return (
    <>
      <JsonLd graph={graph} />
      <ServiceDetailPage
        page={{
          handle,
          title,
          faqs: (config as any).faqs,
        }}
        config={config}
      />
    </>
  );
}

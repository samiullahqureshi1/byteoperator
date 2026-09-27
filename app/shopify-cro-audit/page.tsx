import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
import {SoftwareCroOptimise} from '~/components/cro/SoftwareCroOptimise';
import {ServiceDetailPage} from '~/components/services/ServiceDetailPage';
import {CRO_AUDIT_PAGE, CRO_AUDIT_TITLE} from '~/data/croAuditPage';

export const metadata: Metadata = pageMetadata({
  title: `${CRO_AUDIT_TITLE} | Byte Operator`,
  description:
    'A Shopify CRO audit of your product pages, collections, navigation, cart, checkout and mobile experience, with a prioritised list of fixes and tests.',
  path: '/shopify-cro-audit',
});

export default function SoftwareCroAudit() {
  // Service schema from this page's own title and description.
  const graph = serviceJsonLd({
    path: '/shopify-cro-audit',
    name: String(metadata.title).replace(/ \| Byte Operator$/, ''),
    description: String(metadata.description),
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="software-cro-page-wrap">
        <ServiceDetailPage
          page={{
            handle: 'shopify-cro-audit',
            title: CRO_AUDIT_TITLE,
            faqs: CRO_AUDIT_PAGE.faqs,
          }}
          config={CRO_AUDIT_PAGE}
          afterAbout={
            <SoftwareCroOptimise
              eyebrow="What We Review"
              titleLines={['Conversion Areas', 'We Analyse']}
            />
          }
        />
      </div>
    </>
  );
}

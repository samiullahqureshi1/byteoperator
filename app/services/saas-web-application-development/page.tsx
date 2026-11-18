import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {SaasWebPageClient} from './SaasWebPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'SaaS & Web Application Development Services | Byte Operator',
    description:
      'Build scalable SaaS platforms and custom web applications with Byte Operator. Get full-stack development, cloud architecture, integrations and ongoing support.',
    path: '/services/saas-web-application-development',
    keywords: [
      'SaaS & Web Application Development',
      'SaaS Development Services',
      'Custom SaaS Development',
      'SaaS Application Development',
      'Web Application Development Services',
      'Custom Web Application Development',
      'SaaS Platform Development',
      'Scalable Web Applications',
    ],
  });
}

export default function SaasWebApplicationPage() {
  const graph = serviceJsonLd({
    name: 'SaaS & Web Application Development Services',
    description:
      'Build scalable SaaS platforms and custom web applications with Byte Operator. Get full-stack development, cloud architecture, integrations and ongoing support.',
    path: '/services/saas-web-application-development',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <SaasWebPageClient />
      </div>
    </>
  );
}

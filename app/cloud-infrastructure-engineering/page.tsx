import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {HomeSideRail} from '~/components/HomeSideRail';
import {JsonLd} from '~/components/shared/JsonLd';
import {serviceJsonLd} from '~/lib/seo/jsonld';
import {CloudInfrastructurePageClient} from '~/services/cloud-infrastructure-engineering/CloudInfrastructurePageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Cloud Infrastructure Engineering Services | Byte Operator',
    description:
      'Build secure, scalable and reliable technology environments with Byte Operator\'s cloud infrastructure engineering services. Modernize infrastructure and optimize performance.',
    path: '/cloud-infrastructure-engineering',
    keywords: [
      'Cloud Infrastructure Engineering Services',
      'Cloud engineering services',
      'Cloud infrastructure services',
      'Cloud architecture services',
      'Cloud migration and modernization',
      'Infrastructure automation',
      'Cloud infrastructure management',
      'Cloud infrastructure security',
      'Cloud optimization services',
    ],
  });
}

export default function CloudInfrastructureRootPage() {
  const graph = serviceJsonLd({
    name: 'Cloud & Infrastructure Engineering',
    description:
      'Build secure, scalable and reliable technology environments with Byte Operator\'s cloud infrastructure engineering services. Modernize infrastructure and optimize performance.',
    path: '/cloud-infrastructure-engineering',
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="ft-service-page">
        <HomeSideRail />
        <CloudInfrastructurePageClient />
      </div>
    </>
  );
}

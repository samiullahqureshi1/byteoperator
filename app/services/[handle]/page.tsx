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

export function generateStaticParams() {
  const handles = Object.keys(SERVICE_PAGE_CONFIGS);
  return handles.map((handle) => ({
    handle,
  }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {handle} = params;
  const config = SERVICE_PAGE_CONFIGS[handle as ServicePageHandle];

  if (handle === 'software-plus-agency') {
    return {
      title: 'Enterprise Software Agency | Byte Operator',
      description: 'Enterprise Enterprise Platform Solutions design, development and growth architecture for scaling brands.',
    };
  }

  if (handle === 'software-cro-audit') {
    return {
      title: 'Conversion & Performance Optimization Audit & Optimization | Byte Operator',
      description: 'Data-backed conversion rate optimization and audits that double Software revenue.',
    };
  }

  if (config) {
    const title = config.hero?.eyebrow || config.hero?.heading || handle;
    return {
      title: `${title} | Byte Operator`,
      description: config.hero?.heading || 'Specialized software agency services by Byte Operator.',
    };
  }

  return {
    title: `${handle} | Byte Operator`,
  };
}

export default function ServicePage({params}: Props) {
  const {handle} = params;

  if (handle === 'software-plus-agency') {
    return (
      <div className="software-plus-page-wrap">
        <SoftwarePlusPage />
      </div>
    );
  }

  if (handle === 'software-cro-audit' || handle === 'cro-agency') {
    return (
      <div className="software-cro-page-wrap">
        <SoftwareCroOptimise />
      </div>
    );
  }

  const config = SERVICE_PAGE_CONFIGS[handle as ServicePageHandle];

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

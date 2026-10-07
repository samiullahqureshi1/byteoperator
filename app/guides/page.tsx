import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {GuidesPageView} from '~/components/guides/GuidesPageView';
import {getSiteContent} from '~/lib/cms/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cmsContent = getSiteContent();
  const guides = cmsContent.guides;
  return pageMetadata({
    title: guides?.seoTitle || 'Technical Guides & Architecture Blueprints | Byte Operator',
    description:
      guides?.seoDescription ||
      'Planned in-depth guides from Byte Operator on software architecture, platform migrations, CRO and AI search.',
    path: '/guides',
    robots: {
      index: false,
      follow: true,
    },
  });
}

export default function GuidesPage() {
  const cmsContent = getSiteContent();
  return <GuidesPageView content={cmsContent.guides} />;
}

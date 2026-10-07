import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {WebinarsPageView} from '~/components/webinars/WebinarsPageView';
import {getSiteContent} from '~/lib/cms/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cmsContent = getSiteContent();
  const webinars = cmsContent.webinars;
  return pageMetadata({
    title: webinars?.seoTitle || 'Webinars & Masterclasses | Byte Operator',
    description:
      webinars?.seoDescription ||
      'Live sessions from the Byte Operator team on Core Web Vitals, AI search and conversion optimisation.',
    path: '/webinars',
    robots: {
      index: false,
      follow: true,
    },
  });
}

export default function WebinarsPage() {
  const cmsContent = getSiteContent();
  return <WebinarsPageView content={cmsContent.webinars} />;
}

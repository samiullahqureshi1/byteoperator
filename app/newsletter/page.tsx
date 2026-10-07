import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {NewsletterPageView} from '~/components/newsletter/NewsletterPageView';
import {getSiteContent} from '~/lib/cms/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cmsContent = getSiteContent();
  const newsletter = cmsContent.newsletter;
  return pageMetadata({
    title: newsletter?.seoTitle || 'The Operator Dispatch Newsletter | Byte Operator',
    description:
      newsletter?.seoDescription ||
      'The Operator Dispatch, a weekly briefing on web performance, conversion optimisation and AI search.',
    path: '/newsletter',
    robots: {
      index: false,
      follow: true,
    },
  });
}

export default function NewsletterPage() {
  const cmsContent = getSiteContent();
  return <NewsletterPageView content={cmsContent.newsletter} />;
}

import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {PodcastPageView} from '~/components/podcast/PodcastPageView';
import {getSiteContent} from '~/lib/cms/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cmsContent = getSiteContent();
  const podcast = cmsContent.podcasts;
  return pageMetadata({
    title: podcast?.seoTitle || 'Architecting Scale Podcast | Byte Operator',
    description:
      podcast?.seoDescription ||
      'Architecting Scale, a podcast of engineering conversations and architecture teardowns from the Byte Operator team.',
    path: '/podcast',
    robots: {
      index: false,
      follow: true,
    },
  });
}

export default function PodcastPage() {
  const cmsContent = getSiteContent();
  return <PodcastPageView content={cmsContent.podcasts} />;
}

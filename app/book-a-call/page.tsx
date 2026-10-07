import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {getSiteContent} from '~/lib/cms/db';
import {BookACallClient} from './BookACallClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cmsContent = getSiteContent();
  const book = cmsContent.bookACall;
  return pageMetadata({
    title: book?.seoTitle || 'Book a Strategy Call | Byte Operator',
    description:
      book?.seoDescription ||
      'Book a 30-minute architecture discovery session with Byte Operator senior software engineers.',
    path: '/book-a-call',
  });
}

export default function BookACallPage() {
  const cmsContent = getSiteContent();
  return <BookACallClient content={cmsContent.bookACall} />;
}

import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {pageMetadata} from '~/lib/seo/metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Contact & Book Discovery | Byte Operator',
    description:
      'Schedule a discovery consultation with Byte Operator senior software engineers.',
    path: '/book-a-call',
  });
}

export default function BookACallPage() {
  redirect('/contact');
}

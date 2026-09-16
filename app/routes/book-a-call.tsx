import {useEffect} from 'react';

import type {Route} from './+types/book-a-call';

import {openCalendly} from '~/lib/calendly';
import {CONTACT_CLEAN_PATH} from '~/lib/route-mappings';

import ContactPage, {links, loader} from './contact';

/* =========================================================
   FOLDTECH — /book-a-call

   A shareable URL for the booking popup: campaigns, email
   signatures, social bios and anywhere a link is easier to
   pass on than a button.

   It renders the contact page and opens the Calendly modal
   over it. That page is the fallback, so a visitor with no
   JavaScript, a blocked widget or a closed modal still lands
   on the contact form rather than a dead end.
========================================================= */

export {links, loader};

export const meta: Route.MetaFunction = () => [
  {title: 'Book a Call | FoldTech'},

  {
    name: 'description',
    content:
      'Book a 30-minute call with FoldTech to talk through your Shopify build, migration, SEO or conversion work.',
  },

  {property: 'og:type', content: 'website'},
  {property: 'og:title', content: 'Book a Call | FoldTech'},

  // Same content as /contact, so that page stays canonical and this URL does
  // not compete with it in search.
  {tagName: 'link', rel: 'canonical', href: CONTACT_CLEAN_PATH},
];

export default function BookACallPage() {
  useEffect(() => {
    // A blocked or unreachable widget leaves the contact page on screen,
    // which is the point of rendering it underneath.
    void openCalendly().catch(() => {});
  }, []);

  return <ContactPage />;
}

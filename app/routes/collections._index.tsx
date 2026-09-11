import {redirect} from 'react-router';
import type {Route} from './+types/collections._index';

/**
 * The collections listing is retired. `/collections` permanently redirects to
 * the homepage.
 *
 * The redirect lives in the loader rather than in the `OLD_TO_CLEAN_PATHS`
 * table because `getCleanUrlRedirect` deliberately skips `.data` requests, so
 * a mapping-table entry would not catch a client-side navigation here. A
 * loader redirect covers both document and single fetch data requests.
 *
 * Individual collections (`/collections/:handle`) are unaffected. The CDN
 * preconnect this route used to declare lives on those routes instead: this
 * one no longer renders collection images.
 */
export async function loader(_args: Route.LoaderArgs) {
  return redirect('/', 301);
}

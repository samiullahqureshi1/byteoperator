import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import type {Route} from './+types/root';
import favicon from '/images/favicon_the_fold_tech.png';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import baseStyles from '~/styles/base.css?url';
import headerStyles from '~/styles/header.css?url';
import headerMenusStyles from '~/styles/header-menus.css?url';
import {PageLayout} from './components/PageLayout';
import footerStyles from '~/styles/footer.css?url';
import floatingContactCtaStyles from '~/styles/floating-contact-cta.css?url';
export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    // No global preconnects here: cdn.shopify.com is only needed on routes
    // that render Shopify-hosted images (products, collections, cart,
    // search, account orders, blogs/articles) — those routes declare it
    // themselves via their own links(). shop.app (Shop Pay) isn't used
    // anywhere in this app, so it isn't preconnected at all.
    {rel: 'icon', type: 'image/png', href: favicon},
    {rel: 'shortcut icon', type: 'image/png', href: favicon},
  ];
}

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {header};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const {storefront, customerAccount, cart} = context;

  // defer the footer query (below the fold)
  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer-menu',
      },
    })
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

// The footer is never visible without scrolling, on any page, so its
// stylesheet doesn't need to block initial render. Same for the floating
// contact button: it's `position: fixed`, so it never occupies document
// flow and can't cause layout shift when its styles apply a moment late.
// header-menus.css (the desktop mega menu + mobile nav panel, split out of
// header.css) is the same story: none of it is visible until a user
// hovers a mega-menu trigger or opens the mobile menu, and the mobile
// menu's own DOM isn't even mounted until first opened (see Aside.tsx),
// so deferring it can't cause a flash of unstyled content either.
// All three are loaded via rel="preload" (fetched immediately, but
// non-blocking) and swapped to rel="stylesheet" by DEFER_STYLES_SCRIPT
// below once downloaded, with a <noscript> fallback for the no-JS case.
//
// Routes defer their own below-the-fold section CSS the same way (see the
// links() export in routes/_index.tsx), and React Router mounts those
// <link> elements fresh on every client-side navigation. So this script
// cannot just snapshot the document once: a static querySelectorAll list
// plus a one-shot window "load" listener would promote only the links
// present during the initial head parse, leaving every link added by a
// later client-side navigation stuck at rel="preload" — fetched but never
// applied, i.e. an unstyled page below the fold. A MutationObserver keeps
// watching <head> so links added after first paint are promoted too.
const DEFER_STYLES_SCRIPT = `(function(){
  var SELECTOR = 'link[rel="preload"][as="style"][data-defer]';
  var loaded = document.readyState === 'complete';

  function apply(link){
    if (link.rel !== 'stylesheet') link.rel = 'stylesheet';
  }

  // Before first paint, wait for the preload to finish so promoting it
  // can't block rendering. After load there is no first paint left to
  // protect, so apply straight away — the styles are needed now.
  function track(link){
    if (loaded) {
      apply(link);
      return;
    }
    if (link.dataset.deferArmed) return;
    link.dataset.deferArmed = '1';
    link.addEventListener('load', function(){ apply(link); });
    link.addEventListener('error', function(){ apply(link); });
  }

  function sweep(){
    var links = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < links.length; i++) track(links[i]);
  }

  sweep();

  window.addEventListener('load', function(){
    loaded = true;
    // Catches any link whose own load event fired before this script ran.
    sweep();
  });

  // Promote stylesheets that React Router adds on client-side navigation.
  if (window.MutationObserver && document.head) {
    new MutationObserver(function(records){
      for (var r = 0; r < records.length; r++) {
        var added = records[r].addedNodes;
        for (var n = 0; n < added.length; n++) {
          var node = added[n];
          if (!node || node.nodeType !== 1) continue;
          if (node.tagName === 'LINK') {
            if (node.matches(SELECTOR)) track(node);
          } else if (node.querySelectorAll) {
            var nested = node.querySelectorAll(SELECTOR);
            for (var k = 0; k < nested.length; k++) track(nested[k]);
          }
        }
      }
    }).observe(document.head, {childList: true, subtree: true});
  }
})();`;

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={baseStyles} fetchPriority="high"></link>
        <link rel="stylesheet" href={headerStyles} fetchPriority="high"></link>
        <link
          rel="preload"
          as="style"
          href={headerMenusStyles}
          data-defer=""
          fetchPriority="low"
        ></link>
        <link
          rel="preload"
          as="style"
          href={footerStyles}
          data-defer=""
          fetchPriority="low"
        ></link>
        <link
          rel="preload"
          as="style"
          href={floatingContactCtaStyles}
          data-defer=""
          fetchPriority="low"
        ></link>
        <Meta />
        <Links />
        <noscript>
          <link rel="stylesheet" href={headerMenusStyles} />
          <link rel="stylesheet" href={footerStyles} />
          <link rel="stylesheet" href={floatingContactCtaStyles} />
        </noscript>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{__html: DEFER_STYLES_SCRIPT}}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<RootLoader>('root');

  if (!data) {
    return <Outlet />;
  }

  return (
    <Analytics.Provider
      cart={data.cart}
      shop={data.shop}
      consent={data.consent}
    >
      <PageLayout {...data}>
        <Outlet />
      </PageLayout>
    </Analytics.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}

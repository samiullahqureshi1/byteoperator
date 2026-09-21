/**
 * Resolves once every stylesheet is in the browser cache, so the next render
 * can apply it without a flash of unstyled content.
 *
 * React Router already blocks client navigations on stylesheets returned from
 * `links()`, but routes that pick their stylesheets from loader data emit them
 * through `meta`, which nothing waits for. Their `clientLoader` awaits this.
 *
 * Uses `rel="preload"` rather than inserting the stylesheet itself: `meta`
 * still owns the `<link rel="stylesheet">`, so it is removed when the user
 * navigates away instead of leaking onto other pages.
 *
 * Every href is preloaded, even ones the current page already uses: `meta`
 * re-creates those `<link>`s on the new route, and without cache headers the
 * browser refetches them. A preload is reused regardless of cache headers.
 */
export function preloadStylesheets(hrefs: string[], timeoutMs = 3000) {
  const pending = hrefs.map(
    (href) =>
      new Promise<void>((resolve) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        // An error must not block navigation; the page renders either way.
        link.onload = link.onerror = () => {
          link.remove();
          resolve();
        };
        document.head.appendChild(link);
      }),
  );

  // ponytail: fixed cap so a stalled request never hangs navigation; raise it if slow networks still flash.
  return Promise.race([
    Promise.all(pending),
    new Promise((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}

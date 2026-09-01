/**
 * Builds a `srcset` for a raw Shopify CDN image URL using the CDN's
 * on-the-fly `width` transform param (the same mechanism Hydrogen's own
 * `<Image>` component uses internally). For plain `<img>` usages of
 * CMS/article image URLs that don't go through `<Image>`.
 */
export function shopifyImageSrcSet(
  url: string,
  widths: readonly number[],
): string {
  return widths
    .map((width) => {
      const transformed = new URL(url);
      transformed.searchParams.set('width', String(width));
      return `${transformed.href} ${width}w`;
    })
    .join(', ');
}

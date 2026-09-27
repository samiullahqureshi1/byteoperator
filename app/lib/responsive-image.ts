/**
 * `src` / `srcSet` / `sizes` for a plain `<img>` so the browser downloads an
 * image close to its rendered size instead of the original upload (several
 * homepage photos are 4000–5500px and 1–2MB).
 *
 * - cdn.shopify.com: the CDN resizes via `?width=` and serves WebP/AVIF.
 * - Local raster files in /public: Next's built-in optimizer (`/_next/image`),
 *   which is what `next/image` uses under the hood; it resizes and serves
 *   WebP/AVIF, cached on Vercel's edge.
 * - SVGs, data URLs and other hosts are returned unchanged.
 *
 * Widths are limited to Next's default deviceSizes/imageSizes, which are the
 * only widths `/_next/image` accepts.
 */
const WIDTHS = [256, 384, 640, 828, 1080, 1200, 1920] as const;

export type ResponsiveImageProps = {
  src: string;
  srcSet?: string;
  sizes?: string;
};

function isShopifyCdn(src: string): boolean {
  return src.startsWith('https://cdn.shopify.com/');
}

function isLocalRaster(src: string): boolean {
  return (
    src.startsWith('/') &&
    !src.startsWith('//') &&
    /\.(jpe?g|png|webp|avif)$/i.test(src.split('?')[0])
  );
}

export function resizedImageUrl(src: string, width: number): string {
  if (isShopifyCdn(src)) {
    const url = new URL(src);
    url.searchParams.set('width', String(width));
    return url.href;
  }
  if (isLocalRaster(src)) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
  }
  return src;
}

/**
 * @param sizes  The `sizes` attribute: how wide the image renders, e.g.
 *               `(max-width: 48rem) 100vw, 45vw`.
 * @param maxWidth  Largest candidate to offer (≈ rendered width × 2 for retina).
 */
export function responsiveImage(
  src: string | undefined | null,
  sizes: string,
  maxWidth = 1920,
): ResponsiveImageProps {
  if (!src) return {src: ''};
  if (!isShopifyCdn(src) && !isLocalRaster(src)) return {src};

  const widths = WIDTHS.filter((width) => width <= maxWidth);

  return {
    src: resizedImageUrl(src, widths[widths.length - 1]),
    srcSet: widths
      .map((width) => `${resizedImageUrl(src, width)} ${width}w`)
      .join(', '),
    sizes,
  };
}

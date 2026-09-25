/**
 * Builds a `srcset` for a raw image URL.
 * Handles both Software CDN absolute URLs and local relative paths safely.
 */
export function softwareImageSrcSet(
  url: string,
  widths: readonly number[],
): string | undefined {
  if (!url) return undefined;
  
  // If it's a local/relative path, return undefined (no CDN resize query needed)
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return undefined;
  }

  try {
    return widths
      .map((width) => {
        const transformed = new URL(url);
        transformed.searchParams.set('width', String(width));
        return `${transformed.href} ${width}w`;
      })
      .join(', ');
  } catch {
    return undefined;
  }
}

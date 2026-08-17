import {resolveCleanPath} from '~/lib/route-mappings';

export function normalizeMenuUrl(
  url: string,
  primaryDomainUrl: string,
  publicStoreDomain: string,
  menuItemTitle?: string,
) {
  if (url.startsWith('/')) {
    const parsedUrl = new URL(url, 'https://foldtech.internal');

    return normalizeInternalUrl(parsedUrl, menuItemTitle);
  }

  try {
    const parsedUrl = new URL(url);
    const internalHosts = [primaryDomainUrl, publicStoreDomain]
      .map(getUrlHost)
      .filter((host): host is string => Boolean(host));

    if (
      internalHosts.includes(parsedUrl.host) ||
      parsedUrl.hostname.endsWith('.myshopify.com')
    ) {
      return normalizeInternalUrl(parsedUrl, menuItemTitle);
    }
  } catch {
    return url;
  }

  return url;
}

function normalizeInternalUrl(url: URL, menuItemTitle?: string) {
  const pathname = resolveCleanPath(url.pathname);

  if (url.pathname.startsWith('/pages/') && pathname === url.pathname) {
    console.warn(
      `Missing explicit clean URL mapping for Shopify menu item${
        menuItemTitle ? ` "${menuItemTitle}"` : ''
      }: ${url.pathname}`,
    );
  }

  return `${pathname}${url.search}${url.hash}`;
}

function getUrlHost(value: string): string | null {
  try {
    const url = value.startsWith('http') ? value : `https://${value}`;
    return new URL(url).host;
  } catch {
    return null;
  }
}

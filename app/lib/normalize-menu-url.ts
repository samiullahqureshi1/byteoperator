import {resolveCanonicalPath} from '~/lib/route-mappings';

export function normalizeMenuUrl(
  url: string,
  primaryDomainUrl: string,
  publicStoreDomain: string,
  menuItemTitle?: string,
) {
  if (url.startsWith('/')) {
    const parsedUrl = new URL(url, 'https://byteoperator.internal');

    return normalizeInternalUrl(parsedUrl, menuItemTitle);
  }

  try {
    const parsedUrl = new URL(url);
    const internalHosts = [primaryDomainUrl, publicStoreDomain]
      .map(getUrlHost)
      .filter((host): host is string => Boolean(host));

    if (
      internalHosts.includes(parsedUrl.host) ||
      parsedUrl.hostname.endsWith('.mysoftware.com')
    ) {
      return normalizeInternalUrl(parsedUrl, menuItemTitle);
    }
  } catch {
    return url;
  }

  return url;
}

function normalizeInternalUrl(url: URL, menuItemTitle?: string) {
  // News and legacy Journal URLs supplied by Software are normalized to
  // their public /articles/* equivalents.
  const pathname = resolveCanonicalPath(url.pathname);

  if (url.pathname.startsWith('/pages/') && pathname === url.pathname) {
    console.warn(
      `Missing explicit clean URL mapping for Software menu item${
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

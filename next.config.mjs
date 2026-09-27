/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // middleware.ts strips trailing slashes together with legacy redirects.
  skipTrailingSlashRedirect: true,
  images: {
    // /_next/image only serves local files (see app/lib/responsive-image.ts)
    // and the Shopify CDN; allowing every host let anyone use it as a proxy.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  experimental: {
    // Optional optimizations
  },
};

export default nextConfig;

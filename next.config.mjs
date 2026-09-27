/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // middleware.ts strips trailing slashes together with legacy redirects.
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Optional optimizations
  },
};

export default nextConfig;

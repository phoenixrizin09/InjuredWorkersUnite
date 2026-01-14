/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Always use static export for Cloudflare Pages deployment
  // CI environments and production always need static export
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Security headers in public/_headers file (works with static export)
};

module.exports = nextConfig;

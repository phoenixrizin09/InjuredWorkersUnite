/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dynamic: set output based on environment
  // - npm run dev / npm run build: API routes enabled
  // - npm run build:static: Static export for Cloudflare Pages (no API routes)
  ...(process.env.STATIC_EXPORT === 'true' ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
  // Security headers in public/_headers file (works with static export)
};

module.exports = nextConfig;

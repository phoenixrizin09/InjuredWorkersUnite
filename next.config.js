/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Security headers in public/_headers file (works with static export)
};

module.exports = nextConfig;

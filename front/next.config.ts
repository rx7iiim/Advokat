/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enable any experimental features if needed
  },
  images: {
    domains: ['drive.google.com'],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do not use static export for Docker deployment
  // output: 'export',
  
  // Configure image domains for Next.js Image component
  images: {
    domains: ['images.unsplash.com'],
  },
  
  // Environment variables that will be available at build time
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
  
  // Configure webpack to handle CSS properly
  webpack: (config) => {
    return config;
  },
  
  // Make sure Next.js listens on all network interfaces in Docker
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;

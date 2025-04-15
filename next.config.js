/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disable TypeScript type checking during build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Do not use static export for Docker deployment
  // output: 'export',
  
  // Configure image domains for Next.js Image component
  images: {
    domains: ['images.unsplash.com'],
  },
  
  // Environment variables that will be available at build time
  env: {
    // Use relative URLs for Next.js API routes
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
  
  // Configure webpack to handle CSS properly
  webpack: (config) => {
    return config;
  },
  
  // Make sure Next.js listens on all network interfaces in Docker
  output: 'standalone',
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for improved performance
  output: 'export',
  
  // Configure image domains for Next.js Image component
  images: {
    unoptimized: true, // For static export
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
};

module.exports = nextConfig;

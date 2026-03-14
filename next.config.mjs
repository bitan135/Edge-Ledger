/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Enable performance optimizations
    optimizeCss: true,
  }
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['gsap'],
  reactCompiler: true,
  reactStrictMode: true,
  compress: true,
};

export default nextConfig;

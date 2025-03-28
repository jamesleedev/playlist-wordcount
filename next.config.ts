import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@remixicon/react', 'lucide-react'],
  },
  output: 'standalone',
};

const bundleAnalyzer = withBundleAnalyzer();

export default process.env.ANALYZE === 'true' ? bundleAnalyzer(nextConfig) : nextConfig;

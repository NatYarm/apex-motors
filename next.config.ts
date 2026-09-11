import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: '*' }],
    qualities: [25, 75],
  },
};

export default nextConfig;

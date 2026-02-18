import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    // Required for static export — use <img> tags or a custom loader for external images
    unoptimized: true,
  },
};

export default nextConfig;

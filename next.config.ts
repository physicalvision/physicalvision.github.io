import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/physicalvision.github.io',
  assetPrefix: '/physicalvision.github.io/',
  trailingSlash: true,  // Highly recommended for GitHub Pages
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,  // Highly recommended for GitHub Pages
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig

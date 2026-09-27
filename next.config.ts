import type { NextConfig } from "next";

// Static export for GitHub Pages (org site → no basePath).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

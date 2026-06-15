import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add this: makes the "next build" command work in deployment
  output: "export",

  // Add this to fix the "404" on subpages like /services
  trailingSlash: true,
};

export default nextConfig;

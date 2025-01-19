import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["wpimarketplace.fly.dev"], // Add the hostname of your external image source
  },
};

export default nextConfig;

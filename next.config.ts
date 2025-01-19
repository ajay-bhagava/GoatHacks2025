import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["wpimarketplace.fly.dev"],
  },
  eslint:{
    ignoreDuringBuilds:true,
  }
};

export default nextConfig;

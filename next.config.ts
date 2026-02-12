import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["172.20.10.7"],
  },
};

export default nextConfig;
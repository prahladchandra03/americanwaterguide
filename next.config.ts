import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ["172.20.10.7"] },
  },
};

export default nextConfig;
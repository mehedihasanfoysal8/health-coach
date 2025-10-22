import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // wildcard: allow all https domains
      },
      {
        protocol: "http",
        hostname: "**", // allow all http domains too (optional)
      },
    ],
  },
};

export default nextConfig;

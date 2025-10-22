import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // REMOVE output: 'export'
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mahadpharmaceuticals.com", // or www.mahadpharmaceuticals.com
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

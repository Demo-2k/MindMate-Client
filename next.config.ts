import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.wallpapersafari.com",
      },
      {
        protocol: "https",
        hostname: "images3.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "wallpapercave.com",
      },
      {
        protocol: "https",
        hostname: "images.hdqwalls.com"
      },
      {
        protocol: "https",
        hostname: "4kwallpapers.com"
      },
       {
        protocol: "https",
        hostname: "images.hdqwalls.com"
      },
       {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
    ],
  },
};

export default nextConfig;

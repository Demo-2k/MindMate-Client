import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sdmntprnortheu.oaiusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.magicdecor.in",
      },
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
      },
      {
        protocol: "https",
        hostname: "wallpapercave.com",
      },
      {
        protocol: "https",
        hostname: "motionbgs.com"
      },
      {
        protocol: "https",
        hostname: "cdn3.vectorstock.com"
      },
      {
        protocol: "https",
        hostname: "img.freepik.com"
      },
       {
        protocol: "https",
        hostname: "sdmntprnorthcentralus.oaiusercontent.com"
      },
       {
        protocol: "https",
        hostname: "sdmntprsouthcentralus.oaiusercontent.com"
      },
       {
        protocol: "https",
        hostname: "cosmosmagazine.com"
      },
    ],
  },
};

export default nextConfig;

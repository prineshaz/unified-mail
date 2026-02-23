import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_MESSAGE_SERVICE_API: process.env.NEXT_PUBLIC_MESSAGE_SERVICE_API,
  },
};

export default nextConfig;

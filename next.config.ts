import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next.config.ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "raw.githubusercontent.com",
      pathname: "/GenKrit/Content/**",
    },
  ],
}

};

export default nextConfig;

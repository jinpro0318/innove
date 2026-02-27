import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/innove" : "",
  assetPrefix: isGithubPages ? "/innove/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

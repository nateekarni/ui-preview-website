import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/export/[id]": [
      "./data/projects/**/*",
      "./public/previews/**/*"
    ],
    "/preview/[id]": [
      "./data/projects/**/*"
    ],
    "/projects/[id]": [
      "./data/projects/**/*"
    ],
    "/screens/[id]": [
      "./data/projects/**/*"
    ],
    "/": [
      "./data/projects/**/*"
    ]
  }
};

export default nextConfig;

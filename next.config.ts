import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/samplefiles",
        destination: "/tools/sample-files",
        permanent: true,
      },
      {
        source: "/samplefiles/category/:slug*",
        destination: "/tools/sample-files/category/:slug*",
        permanent: true,
      },
      {
        source: "/samplefiles/results/:slug*",
        destination: "/tools/sample-files/extensions/:slug*",
        permanent: true,
      },
      {
        source: "/string-metrics",
        destination: "/tools/string-metrics",
        permanent: true,
      },
      {
        source: "/google-drive-direct-link-generator",
        destination: "/tools/google-drive-direct-download-link-generator",
        permanent: true,
      },
      {
        source: "/aspectratio",
        destination: "/tools/aspect-ratio-calculator",
        permanent: true,
      },
      {
        source: "/apple-inapp-promotional-offer-signature-generator-for-testing",
        destination:
          "/tools/apple-inapp-promotional-offer-signature-generator-for-testing",
        permanent: true,
      },
      {
        source: "/mzfilemanage",
        destination: "/apps/mzfilemanage",
        permanent: true,
      },
      {
        source: "/mzplayerhd",
        destination: "/apps/mzplayerhd",
        permanent: true,
      },
      {
        source: "/category/:slug*",
        destination: "/blog/category/:slug*",
        permanent: true,
      },
      {
        source: "/article/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dzm9gzl83npws.cloudfront.net",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "mzeeshan.me",
      },
      {
        protocol: "http",
        hostname: "mzeeshan.me",
      },
    ],
  },
};

export default nextConfig;

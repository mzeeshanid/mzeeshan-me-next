import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.mzeeshan.me",
          },
        ],
        destination: "https://mzeeshan.me/:path*",
        permanent: true,
        basePath: false,
      },
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
        source: "/tools/salary-tax-calculator",
        destination: "/tools/salary-tax-calculator-2026-2027-pakistan",
        permanent: true,
      },
      {
        source:
          "/apple-inapp-promotional-offer-signature-generator-for-testing",
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
    formats: ["image/webp"],
    qualities: [75, 85, 90],
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
      {
        protocol: "https",
        hostname: "cdn.mzeeshan.me",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/tools/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/blog/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);

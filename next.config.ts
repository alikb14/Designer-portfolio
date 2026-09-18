import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { frameAncestors } from "./src/lib/security/headers";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const studioOrigin = process.env.SANITY_STUDIO_ORIGIN;
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `base-uri 'self'; form-action 'self'; frame-ancestors ${frameAncestors(studioOrigin)}; frame-src 'self' https://player.vimeo.com; object-src 'none'`,
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  distDir: process.env.PLAYWRIGHT_TEST === "1" ? ".next-e2e" : ".next",
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
        protocol: "https",
      },
    ],
  },
  turbopack: {
    root: projectRoot,
  },
  async headers() {
    return [
      {
        // Vinext does not match "/:path*" against the root route.
        source: "/",
        headers: securityHeaders,
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

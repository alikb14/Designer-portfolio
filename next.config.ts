import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const studioOrigin = process.env.SANITY_STUDIO_ORIGIN;
const frameAncestors = studioOrigin ? `'self' ${studioOrigin}` : "'self'";

const nextConfig: NextConfig = {
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
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `base-uri 'self'; form-action 'self'; frame-ancestors ${frameAncestors}; frame-src 'self' https://player.vimeo.com; object-src 'none'`,
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), geolocation=(), microphone=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

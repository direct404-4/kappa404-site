import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  images: {
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)"
          },
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests"
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/servizi",
        permanent: true
      },
      {
        source: "/archive",
        destination: "/progetti",
        permanent: true
      },
      {
        source: "/terminal",
        destination: "/soluzioni-ai",
        permanent: true
      },
      {
        source: "/contact",
        destination: "/contatti",
        permanent: true
      },
      {
        source: "/portfolio",
        destination: "/progetti",
        permanent: true
      },
      {
        source: "/about",
        destination: "/chi-sono",
        permanent: true
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true
      }
    ];
  },
  outputFileTracingRoot: __dirname,
};

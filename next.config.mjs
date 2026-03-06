import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  images: {
    unoptimized: true
  },
  outputFileTracingRoot: __dirname,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());

import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  output: "export",
  images: {
    unoptimized: true
  },
  outputFileTracingRoot: __dirname
};

import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/cloudflare-image-loader.ts",
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

// Enables `getCloudflareContext()` to return real bindings (D1/KV/R2) when
// running under `next dev`, instead of only working via `wrangler pages dev`.
// Safe to call unconditionally: it's a no-op outside local dev.
// See: https://opennext.js.org/cloudflare
initOpenNextCloudflareForDev();

import type { ImageLoaderProps } from "next/image";

/**
 * Pass-through loader for next/image. Cloudflare Workers/Pages don't run the
 * default Next.js Image Optimization server, so this returns the source
 * unmodified rather than routing through /_next/image.
 *
 * When real photography replaces the placeholders, swap this for Cloudflare
 * Images (https://developers.cloudflare.com/images/) to get on-the-fly
 * resizing — build the `/cdn-cgi/image/...` URL here instead of returning
 * `src` as-is.
 */
export default function cloudflareImageLoader({ src }: ImageLoaderProps): string {
  return src;
}

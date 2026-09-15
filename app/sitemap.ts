import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { neighborhoods } from "@/lib/neighborhoods";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/residential",
    "/property-management",
    "/resources",
    "/dpa",
    "/contact",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const neighborhoodRoutes = neighborhoods.map((n) => ({
    url: `${siteConfig.url}/neighborhoods/${n.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...neighborhoodRoutes];
}

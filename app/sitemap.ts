import type { MetadataRoute } from "next";
import { PROJECTS, SERVICES } from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = "https://kappa404.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/servizi",
    "/progetti",
    "/soluzioni-ai",
    "/chi-sono",
    "/contatti",
    "/privacy-policy",
    "/cookie-policy",
    "/termini"
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7
  }));

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${BASE_URL}/servizi/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.68
  }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${BASE_URL}/progetti/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.66
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}

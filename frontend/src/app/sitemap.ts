import type { MetadataRoute } from "next";

// components
import { drugType } from "@/lib/types";
import { navLink } from "@/lib/constants";
import { BASE_URL } from "@/lib/constants";
import { server_getDrugs } from "@/actions/getDrugs";

type routeType = {
  url: string;
  priority: number;
  changeFrequency:
    | "monthly"
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "yearly"
    | "never";
}[];

export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: routeType = navLink.map((link) => ({
    url: link.href,
    priority: 1,
    changeFrequency: "daily",
  }));

  let drugs: drugType[] = [];
  try {
    const response = await server_getDrugs(null, null);
    drugs = response.results;
  } catch (error) {
    console.error("Failed to fetch drugs for sitemap:", error);
  }

  const productsRoutes: routeType = drugs.map((drug) => ({
    url: `/drugs/${drug.slug}`,
    changeFrequency: "daily",
    priority: 1,
  }));

  const allRoutes: routeType = [...staticRoutes, ...productsRoutes];

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

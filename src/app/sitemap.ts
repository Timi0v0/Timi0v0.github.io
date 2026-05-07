import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourusername.github.io";
  const posts = getAllPosts();

  const staticRoutes = [
    "/",
    "/blog",
    "/essays",
    "/photos",
    "/fund",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const postRoutes = posts
    .filter((post) => post.date)
    .map((post) => ({
      url: `${baseUrl}/${post.type === "blog" ? "blog" : "essays"}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...postRoutes];
}

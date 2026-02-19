import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://www.billreliefai.com";

const BLOG_CATEGORIES = [
  "Personal Finance",
  "Company News",
  "Health Insurance",
  "Reduce Medical Bills",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/get-started`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/register`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/legal/patient-agreement`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  let blogSlugs: { slug: string; updatedAt: Date }[] = [];
  try {
    blogSlugs = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    // If DB unavailable (e.g. build), skip dynamic URLs
  }

  const blogPostUrls: MetadataRoute.Sitemap = blogSlugs.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogsPostUrls: MetadataRoute.Sitemap = blogSlugs.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/blogs/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/blog/category/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...blogPostUrls,
    ...blogsPostUrls,
    ...categoryUrls,
  ];
}

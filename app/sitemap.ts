/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL
    ? process.env.NEXT_PUBLIC_FRONTEND_URL
    : "https://cosmetychka.com.ua"

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: FRONTEND_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${FRONTEND_URL}/catalog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  // === Підкатегорії ===
  let dynamicCategories: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories`, {
      next: { revalidate: 86400 }, // раз в сутки достаточно
    })

    if (res.ok) {
      const data = await res.json()
      dynamicCategories = (data.docs ?? []).flatMap((cat: any) =>
        (cat.subcategories ?? []).map((sub: any) => ({
          url: `${FRONTEND_URL}/catalog/${sub.id}`,
          lastModified: sub.updatedAt ? new Date(sub.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      )
    }
  } catch (e) {
    console.error("Failed to fetch subcategories for sitemap:", e)
  }

  // === Товари ===
  let dynamicProducts: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=5000`, {
      next: { revalidate: 3600 }, // 3600 - кеш на 1 час // 86400 - 24 години
    })

    if (res.ok) {
      const data = await res.json()
      dynamicProducts = (data.docs ?? []).map((product: any) => ({
        url: `${FRONTEND_URL}/product/${product.id}`,
        lastModified: product.updatedAt
          ? new Date(product.updatedAt)
          : product.createdAt
            ? new Date(product.createdAt)
            : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    }
  } catch (e) {
    console.error("Failed to fetch products for sitemap:", e)
  }

  return [...staticRoutes, ...dynamicCategories, ...dynamicProducts]
}

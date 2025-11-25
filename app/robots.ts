import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
      crawlDelay: 2,
    },
    sitemap: "https://cosmetychka.com.ua/sitemap.xml",
    host: "https://cosmetychka.com.ua",
  }
}

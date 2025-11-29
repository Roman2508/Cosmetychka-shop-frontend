import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL
    ? process.env.NEXT_PUBLIC_FRONTEND_URL
    : "https://cosmetychka.com.ua"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/*?*sort=",
        "/*?*price=",
        "/*?*price=",
        "/*?*brand=",
        "/*?*gender=",
        "/*?*page=",
        "/*?*limit=",
        "/*?*offset=",
      ],
    },
    sitemap: `${FRONTEND_URL}/sitemap.xml`,
    host: FRONTEND_URL,
  }
}

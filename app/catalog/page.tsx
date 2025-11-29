import { Metadata } from "next"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import CategoriesPage from "./CategoriesPage"
import { KEY_WORDS, SITE_DESCRIPTION, SITE_NAME } from "@/constants/constants"
import { prefetchCategories } from "@/hooks/queries/prefetch-categories-query"

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://cosmetychka.com.ua"

export const metadata: Metadata = {
  title: `Категорії товарів | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  keywords: KEY_WORDS,
  openGraph: {
    title: `Категорії товарів | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: new URL(`${baseUrl}/catalog`),
    images: [
      {
        url: `${baseUrl}/web-app-manifest-512x512.png`,
        width: 512,
        height: 512,
        alt: "Cosmetychka – професійна косметика",
      },
    ],
    siteName: `${baseUrl}/catalog`,
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Категорії товарів | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [`${baseUrl}/web-app-manifest-512x512.png`],
  },

  icons: {
    icon: "/web-app-manifest-192x192.png",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${baseUrl}/catalog`,
  },
}

export default async function Catalog() {
  const queryClient = await prefetchCategories()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesPage />
    </HydrationBoundary>
  )
}

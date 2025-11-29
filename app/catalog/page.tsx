import { Metadata } from "next"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import favicon from "@/public/c_logo.png"
import CategoriesPage from "./CategoriesPage"
import { KEY_WORDS, SITE_DESCRIPTION, SITE_NAME } from "@/constants/constants"
import { prefetchCategories } from "@/hooks/queries/prefetch-categories-query"

export const metadata: Metadata = {
  title: `Категорії товарів | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  keywords: KEY_WORDS,
  openGraph: {
    title: `Категорії товарів | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_FRONTEND_URL
      ? new URL(process.env.NEXT_PUBLIC_FRONTEND_URL)
      : new URL("https://cosmetychka.com.ua"),
    images: [{ url: favicon.src }],
    siteName: process.env.NEXT_PUBLIC_FRONTEND_URL
      ? process.env.NEXT_PUBLIC_FRONTEND_URL
      : "https://cosmetychka.com.ua",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Категорії товарів | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [favicon.src],
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
    canonical: process.env.NEXT_PUBLIC_FRONTEND_URL
      ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/catalog`
      : "https://cosmetychka.com.ua/catalog",
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

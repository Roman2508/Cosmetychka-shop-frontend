import { Metadata } from "next"

import CatalogPage from "./CatalogPage"
import favicon from "@/public/c_logo.png"
import { categoriesService } from "@/api/categories-service"
import { BASE_KEY_WORDS, SITE_DESCRIPTION, SITE_NAME } from "@/constants/constants"
// import { prefetchCategoryPage } from "@/hooks/queries/prefetch-category-query"
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://cosmetychka.com.ua"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const category = await categoriesService.getById(id)

  if (!category) {
    return {
      title: `Категорію не знайдено | ${SITE_NAME}`,
      description: "Спробуйте змінити фільтри або вибрати іншу категорію",
      alternates: {
        canonical: `${baseUrl}/catalog/${id}`,
      },
    }
  }

  return {
    title: `${category.name} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    keywords: [category.name, ...BASE_KEY_WORDS],

    openGraph: {
      title: `${category.name} | ${SITE_NAME}`,
      description: SITE_DESCRIPTION,
      url: new URL(`${baseUrl}/catalog/${category.id}`),
      images: [
        {
          url: `${baseUrl}/web-app-manifest-512x512.png`,
          width: 512,
          height: 512,
          alt: "Cosmetychka – професійна косметика",
        },
      ],
      siteName: `${baseUrl}/catalog/${category.id}`,
      locale: "uk_UA",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${category.name} | ${SITE_NAME}`,
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
      canonical: `${baseUrl}/catalog/${category.id}`,
    },
  }
}

// export default async function Catalog({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ id: string }>
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }) {
//   const resolvedParams = await params
//   const resolvedSearchParams = await searchParams

//   const queryClient = await prefetchCategoryPage(resolvedParams, resolvedSearchParams)

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <CatalogPage />
//     </HydrationBoundary>
//   )
// }

export default async function Catalog() {
  return <CatalogPage />
}

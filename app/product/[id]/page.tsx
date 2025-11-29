import { Metadata } from "next"
import { HydrationBoundary } from "@tanstack/react-query"

import favicon from "@/public/c_logo.png"
import FullProductPage from "./FullProductPage"
import { productService } from "@/api/producs-service"
import { BASE_KEY_WORDS, SITE_NAME } from "@/constants/constants"
import { createCEODescription } from "@/helpers/create-ceo-description"
import { prefetchProductPage } from "@/hooks/queries/prefetch-product-query"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await productService.getOne(id)

  if (!product) {
    return {
      title: `Товар не знайдено | ${SITE_NAME}`,
      description: "Спробуйте змінити фільтри або вибрати іншу категорію",
      alternates: {
        canonical: process.env.NEXT_PUBLIC_FRONTEND_URL
          ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/product/${id}`
          : `https://cosmetychka.com.ua/product/${id}`,
      },
    }
  }

  const DESCRIPTION = createCEODescription(product.name, product.description, product.price)

  return {
    title: `${product.name} | ${SITE_NAME}`,
    description: DESCRIPTION,
    keywords: [product.name, ...BASE_KEY_WORDS],
    openGraph: {
      title: `${product.name} | ${SITE_NAME}`,
      description: DESCRIPTION,
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
      title: `${product.name} | ${SITE_NAME}`,
      description: DESCRIPTION,
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
        ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/product/${product.id}`
        : `https://cosmetychka.com.ua/product/${product.id}`,
    },
  }
}

export default async function FullProduct({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const queryClient = await prefetchProductPage(resolvedParams)

  return (
    <HydrationBoundary state={queryClient}>
      <FullProductPage />
    </HydrationBoundary>
  )
}

import { Metadata } from "next"
import { HydrationBoundary } from "@tanstack/react-query"

import FullProductPage from "./FullProductPage"
import { productService } from "@/api/producs-service"
import { BASE_KEY_WORDS, SITE_NAME } from "@/constants/constants"
import { createCEODescription } from "@/helpers/create-ceo-description"
import { prefetchProductPage } from "@/hooks/queries/prefetch-product-query"
import ProductStructuredData from "@/components/features/product/product-structured-data"

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://cosmetychka.com.ua"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await productService.getOne(id)

  if (!product) {
    return {
      title: `Товар не знайдено | ${SITE_NAME}`,
      description: "Спробуйте змінити фільтри або вибрати іншу категорію",
      alternates: { canonical: `${baseUrl}/product/${id}` },
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
      url: new URL(`${baseUrl}/product/${product.id}`),
      images: [
        {
          url: `${baseUrl}/web-app-manifest-512x512.png`,
          width: 512,
          height: 512,
          alt: "Cosmetychka – професійна косметика",
        },
      ],
      siteName: `${baseUrl}/product/${product.id}`,
      locale: "uk_UA",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${SITE_NAME}`,
      description: DESCRIPTION,
      // images: [`${baseUrl}/web-app-manifest-512x512.png`],
      images: product.photos.map((p) => `${baseUrl}/${p.image.url}`),
    },

    icons: {
      icon: "/web-app-manifest-192x192.png",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },

    manifest: "/site.webmanifest",

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
      canonical: `${baseUrl}/product/${product.id}`,
    },
  }
}

export default async function FullProduct({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const queryClient = await prefetchProductPage(resolvedParams)

  const product = await productService.getOne(resolvedParams.id)

  return (
    <HydrationBoundary state={queryClient}>
      <ProductStructuredData product={product} />
      <FullProductPage />
    </HydrationBoundary>
  )
}

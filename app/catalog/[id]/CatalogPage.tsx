"use client"

import { useParams } from "next/navigation"
import { useBreakpoints } from "@siberiacancode/reactuse"

import Title from "@/components/features/title"
import Container from "@/components/layout/container"
import { SITE_DESCRIPTION } from "@/constants/constants"
import { useGetProducts } from "@/hooks/queries/products-queries"
import { MobileFilters } from "@/components/features/mobile-filters"
import { useGetCategories } from "@/hooks/queries/categories-queries"
import CatalogOrder from "@/components/features/catalog/catalog-order"
import { ProductCard } from "@/components/features/product/product-card"
import CatalogSidebar from "@/components/features/catalog/catalog-sidebar"
import CatalogPagination from "@/components/features/catalog/catalog-pagination"
import ProductCardSkeleton from "@/components/features/product/product-card-skeleton"

export default function CatalogPage() {
  const { id } = useParams<{ id: string }>()

  const { products, isSuccess } = useGetProducts()
  const { categories } = useGetCategories()

  const { smallerOrEqual } = useBreakpoints({ lg: 1024 })

  const currentCategoryName = (categories ? categories.docs : [])
    .flatMap((el) => el.subcategories)
    .find((el) => el.id === +id)?.name

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: currentCategoryName ? `Товари категорії: ${currentCategoryName}` : "Всі товари",
    description: "Перегляньте наш широкий вибір товарів у цій категорії. " + SITE_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_FRONTEND_URL
      ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/catalog/${id}`
      : `https://cosmetychka.com.ua/catalog/${id}`,
    numberOfItems: products ? products.docs.length : 0,
  }

  return (
    <Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="flex gap-10 mt-15 mb-20">
        <CatalogSidebar hidden={smallerOrEqual("lg")} />

        <div className="w-full">
          <Title className="mt-0 mb-6 text-left normal-case">
            {currentCategoryName ? `Товари категорії: ${currentCategoryName}` : "Всі товари"}
          </Title>

          <div className="flex justify-between items-center gap-4 mb-6 flex-col 2xs:flex-row">
            <p className="text-muted-foreground">товарів: {products ? products.docs.length : 0}</p>

            <div className="flex gap-2">
              {smallerOrEqual("lg") && <MobileFilters />}
              <CatalogOrder />
            </div>
          </div>

          {isSuccess && (!products?.docs || products.docs.length === 0) && (
            <p className="text-center py-6 font-mono font-bold text:lg md:text-xl">
              Нічого не знайдено. <br />
              Спробуйте змінити фільтри або вибрати іншу категорію.
            </p>
          )}

          <div className="grid grid-cols-1 2xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {products && products.docs
              ? products.docs.map((product) => <ProductCard key={product.id} product={product} />)
              : [...Array(12)].map((_, index) => <ProductCardSkeleton key={index} />)}
          </div>

          <CatalogPagination />
        </div>
      </div>
    </Container>
  )
}

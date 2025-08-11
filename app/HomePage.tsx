"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import Container from "@/components/layout/container"
import ProductsSlider from "@/components/features/products-slider"
import { useProductsByTag } from "@/hooks/queries/products-queries"

export default function HomePage() {
  const { products: newProducts } = useProductsByTag("new")
  const { products: topProducts } = useProductsByTag("top")
  const { products: hitProducts } = useProductsByTag("hit")

  return (
    <div>
      <div className="h-[calc(100vh-147px)] bg-cover bg-center" style={{ backgroundImage: "url(/banner.jpg)" }}>
        <Container className="h-full">
          <div className="flex justify-center items-center md:items-end flex-col gap-4 min-h-full">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-mono font-bold">Kosmetychka shop</h1>
            <p className="text-sm sm:text-base text-center md:text-end w-full md:w-2/3 lg:w-1/2">
              Цей текст є прикладом заповнення для демонстрації шрифтів, верстки та композиції сторінки. Його зміст не
              має смислового навантаження і використовується виключно як макетний текст. Цей текст є прикладом
              заповнення для демонстрації шрифтів, верстки та композиції сторінки.
            </p>

            <Link href="/catalog">
              <Button>Переглянути товари</Button>
            </Link>
          </div>
        </Container>
      </div>

      <ProductsSlider title="Новинки" products={newProducts ? newProducts.docs : []} />

      <ProductsSlider title="Популярне" products={topProducts ? topProducts.docs : []} />

      <ProductsSlider title="Бестселери" products={hitProducts ? hitProducts.docs : []} />
    </div>
  )
}

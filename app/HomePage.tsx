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
      <div
        className="h-[calc(100svh-74px)] sm:h-[calc(100vh-145px)] bg-cover bg-center"
        style={{ backgroundImage: "url(/banner.jpg)" }}
      >
        <Container className="h-full">
          <div className="flex justify-center items-center md:items-end flex-col gap-4 min-h-full">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-mono font-bold">Kosmetychka shop</h1>
            <p className="text-sm sm:text-base text-center md:text-end w-full md:w-2/3 lg:w-1/2">
              Краса починається тут🌸 <br />
              Kosmetychka shop— це більше, ніж магазин косметики. Це простір, де ви можете знайти все для своєї
              унікальності: ніжний догляд, трендові новинки та улюблену класику. Ми допоможемо вам підкреслити природну
              красу та відчути впевненість у собі.
            </p>

            <Link href="/catalog">
              <Button>Переглянути товари</Button>
            </Link>
          </div>
        </Container>
      </div>

      {newProducts && !!newProducts.docs.length && (
        <ProductsSlider title="Новинки" products={newProducts ? newProducts.docs : []} />
      )}

      {topProducts && !!topProducts.docs.length && (
        <ProductsSlider title="Популярне" products={topProducts ? topProducts.docs : []} />
      )}

      {hitProducts && !!hitProducts.docs.length && (
        <ProductsSlider title="Бестселери" products={hitProducts ? hitProducts.docs : []} />
      )}
    </div>
  )
}

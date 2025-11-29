"use client"

import ProductsSlider from "../products-slider"
import { useProductsByTag } from "@/hooks/queries/products-queries"

const ProductsSliders = () => {
  const { products: newProducts } = useProductsByTag("new")
  const { products: topProducts } = useProductsByTag("top")
  const { products: hitProducts } = useProductsByTag("hit")

  return (
    <>
      {newProducts && !!newProducts.docs.length && (
        <ProductsSlider title="Новинки" products={newProducts ? newProducts.docs : []} />
      )}

      {topProducts && !!topProducts.docs.length && (
        <ProductsSlider title="Популярне" products={topProducts ? topProducts.docs : []} />
      )}

      {hitProducts && !!hitProducts.docs.length && (
        <ProductsSlider title="Бестселери" products={hitProducts ? hitProducts.docs : []} />
      )}
    </>
  )
}

export default ProductsSliders

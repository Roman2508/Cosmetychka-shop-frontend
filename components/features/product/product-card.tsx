import Link from "next/link"
import Image from "next/image"

import ProductTag from "./product-tag"
import ProductPrice from "./product-price"
import AddToCartIcon from "../add-to-cart-icon"
import AddToFavouriteIcon from "../add-to-favourite-icon"
import { Product as ProductEntity } from "@/types/entities.types"

interface Props {
  product: ProductEntity
}

export function ProductCard({ product }: Props) {
  return (
    <div className="mx-auto flex flex-col items-center w-full">
      <div className="relative w-full min-h-[240px] max-h-[240px] border">
        <Link href={`/product/${product.id}`}>
          <Image
            width={300}
            height={300}
            alt="Product"
            src={product.photos[0].image.url}
            className="cursor-pointer min-w-full max-h-[240px] w-full h-full object-contain p-4"
          />
        </Link>

        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.tags?.map((tag) => (
            <ProductTag key={tag} tag={tag} />
          ))}
        </div>

        <div className="absolute right-2 top-2 flex flex-row gap-2">
          <AddToFavouriteIcon product={product} />
          <AddToCartIcon product={product} />
        </div>
      </div>

      <h3
        title={product.name}
        className="text-primary text-sm lg:text-lg font-semibold mt-2 uppercase truncate max-w-[200px] 2xl:max-w-[260px] cursor-pointer"
      >
        {product.name}
      </h3>

      <p className="text-sm lg:text-base text-primary-foreground truncate max-w-[180px] 2xl:max-w-[220px]">
        {product.subcategories.name}
      </p>

      <div className="flex items-center justify-center gap-2">
        <ProductPrice price={product.price} discount={product.discount} hasDiscount={product.hasDiscount} />
      </div>
    </div>
  )
}

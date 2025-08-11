import { calcDiscount } from "@/helpers/calc-price-discount"
import { Product } from "@/types/entities.types"
import { FC } from "react"

interface Props {
  price: number
  hasDiscount: boolean
  discount: Product["discount"]
}

const ProductPrice: FC<Props> = ({ price, hasDiscount, discount }) => {
  const priceWithDiscount = calcDiscount(price, discount)

  return (
    <>
      {hasDiscount ? (
        <>
          <p className="text-lg font-semibold line-through text-muted-foreground">{price} грн</p>
          <p className="text-lg font-semibold text-destructive">{priceWithDiscount} грн</p>
        </>
      ) : (
        <p className="text-lg font-semibold text-destructive">{price} грн</p>
      )}
    </>
  )
}

export default ProductPrice

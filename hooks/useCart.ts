import { useTypedSelector } from "./useTypedSelector"
import { calcDiscount } from "@/helpers/calc-price-discount"

export const useCart = () => {
  const items = useTypedSelector((state) => state.cart.items)

  const total = items.reduce((acc, item) => {
    const actualPrice = item.product.hasDiscount
      ? calcDiscount(item.product.price, item.product.discount)
      : item.product.price

    return acc + actualPrice * item.quantity
  }, 0)

  return { items, total }
}

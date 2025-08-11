import { Product } from "@/types/entities.types"

export const calcDiscount = (price: number, discount: Product["discount"]): number => {
  if (!discount) return 0

  if (discount.type === "fixed") {
    return price - discount.value
  }

  if (discount.type === "percent") {
    return Math.round(price - (price * discount.value) / 100)
  }

  return 0
}

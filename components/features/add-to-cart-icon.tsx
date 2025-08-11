import { FC } from "react"
import { ShoppingBag as ShoppingBagIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { useCart } from "@/hooks/useCart"
import { useActions } from "@/hooks/useActions"
import { Product } from "@/types/entities.types"

interface Props {
  product: Product
}

const AddToCartIcon: FC<Props> = ({ product }) => {
  const { items: cartItems } = useCart()
  const { addToCart, removeFromCart } = useActions()

  const currentCartElement = cartItems.find((cartItem) => cartItem.product.id === product.id)

  const onToggleItemToCart = () => {
    if (currentCartElement) {
      removeFromCart({ id: currentCartElement.product.id })
      return
    }
    addToCart({ product, quantity: 1, price: product.price })
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={onToggleItemToCart}
      className={cn(
        currentCartElement ? "border-destructive" : "",
        "cursor-pointer bg-background rounded-full w-[40px] h-[40px] border",
      )}
    >
      <ShoppingBagIcon
        className={cn("!w-[18px] !h-[18px] md:!w-[22px] md:!h-[22px]", !!currentCartElement ? "text-destructive" : "")}
      />
    </Button>
  )
}

export default AddToCartIcon

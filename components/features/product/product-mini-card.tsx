import Link from "next/link"
import Image from "next/image"
import { Minus as MinusIcon, Plus as PlusIcon, Trash as TrashIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { useCart } from "@/hooks/useCart"
import ProductPrice from "./product-price"
import { useActions } from "@/hooks/useActions"
import { Product as ProductEntity } from "@/types/entities.types"

interface Props {
  variant?: "cart" | "saved"
  product: ProductEntity
}

export function ProductMiniCard({ product, variant = "saved" }: Props) {
  const { removeFromCart, removeFromFavourite, changeQuantity } = useActions()

  const { items: cartItems } = useCart()
  const quantity = cartItems.find((cartItem) => cartItem.product.id === product.id)?.quantity || 1

  const onRemove = () => {
    if (variant === "cart") {
      const isConfirm = window.confirm("Ви дійсно хочете видалити товар з корзини?")
      if (isConfirm) removeFromCart({ id: product.id })
    }

    if (variant === "saved") {
      const isConfirm = window.confirm("Ви дійсно хочете видалити товар зі збережених?")
      if (isConfirm) removeFromFavourite({ id: product.id })
    }
  }

  return (
    <div className="flex flex-row items-center gap-4 mb-2">
      <Link href={`/product/${product.id}`} className="relative min-w-20 w-20 h-20">
        <Image
          width={80}
          height={80}
          alt="Product"
          src={product.photos[0].image.url}
          className="border cursor-pointer w-full h-full object-contain p-2"
        />
      </Link>

      <div className="flex flex-col items-start">
        <Link href={`/product/${product.id}`}>
          <h3
            className={cn(
              "text-primary text-sm font-semibold mt-2 uppercase truncate cursor-pointer",
              variant === "cart" ? "max-w-[360px]" : "max-w-[250px]",
            )}
          >
            {product.name}
          </h3>
        </Link>

        <Link
          href={`/catalog/${product.subcategories.id}`}
          className="text-sm lg:text-base text-primary-foreground truncate max-w-[180px] 2xl:max-w-[220px]"
        >
          {product.subcategories.name}
        </Link>

        <div className="flex items-center gap-2 [&>p]:text-sm [&>p]:mt-1">
          <ProductPrice discount={product.discount} hasDiscount={product.hasDiscount} price={product.price} />
        </div>

        {variant === "saved" && (
          <Button variant="ghost" size="sm" className="cursor-pointer !px-0" onClick={onRemove}>
            <TrashIcon />
            Видалити
          </Button>
        )}

        {variant === "cart" && (
          <div className="flex justify-between mt-1 gap-4">
            <div className="flex items-center border border-primary">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary cursor-pointer"
                onClick={() => changeQuantity({ id: product.id, type: "minus" })}
              >
                <MinusIcon />
              </Button>
              <Input
                readOnly
                minLength={1}
                maxLength={2}
                value={quantity}
                className="border-0 border-x focus-visible:border-0 focus-visible:border-x focus-visible:h-[32px] h-[32px] p-0 w-[50px] text-center cursor-default"
              />
              <Button
                size="sm"
                variant="ghost"
                className="text-primary hover:text-primary cursor-pointer"
                onClick={() => changeQuantity({ id: product.id, type: "plus" })}
              >
                <PlusIcon />
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="cursor-pointer !px-0" onClick={onRemove}>
              <TrashIcon />
              Видалити
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

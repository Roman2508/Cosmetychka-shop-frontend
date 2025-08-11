import { FC } from "react"
import { Heart as HeartIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { useActions } from "@/hooks/useActions"
import { Product } from "@/types/entities.types"
import { useFavourite } from "@/hooks/useFavourite"

interface Props {
  product: Product
}

const AddToFavouriteIcon: FC<Props> = ({ product }) => {
  const { items: favouriteItems } = useFavourite()
  const { addToFavourite, removeFromFavourite } = useActions()

  const currentFavouriteElement = favouriteItems.find((cartItem) => cartItem.id === product.id)

  const onToggleItemToFavourite = () => {
    if (currentFavouriteElement) {
      removeFromFavourite({ id: currentFavouriteElement.id })
      return
    }
    addToFavourite(product)
  }
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={onToggleItemToFavourite}
      className={cn(
        currentFavouriteElement ? "border-destructive" : "",
        "cursor-pointer bg-background rounded-full w-[40px] h-[40px] border",
      )}
    >
      <HeartIcon
        className={cn(
          "!w-[18px] !h-[18px] md:!w-[22px] md:!h-[22px]",
          !!currentFavouriteElement ? "text-destructive fill-destructive" : "",
        )}
      />
    </Button>
  )
}

export default AddToFavouriteIcon

import { Heart as HeartIcon } from "lucide-react"

import { Button } from "../../ui/button"
import { Badge } from "@/components/ui/badge"
import { useFavourite } from "@/hooks/useFavourite"
import { ProductMiniCard } from "../product/product-mini-card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function HeaderFovourite() {
  const { items: favouriteItems } = useFavourite()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="md" className="relative">
          <HeartIcon className="!w-[18px] !h-[18px] md:!w-[22px] md:!h-[22px]" />
          {!!favouriteItems.length && (
            <Badge variant="destructive" className="absolute -right-0 -top-0">
              {favouriteItems.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="py-2 gap-0">
        <h3 className="text-2xl font-medium mt-0 pb-2 text-left font-mono px-4 border-b">Збережені товари</h3>

        <div className="max-h-[calc(100vh-50px)] overflow-y-auto overflow-x-hidden px-4 pt-4">
          {favouriteItems.length ? (
            favouriteItems.map((product) => <ProductMiniCard key={product.id} product={product} />)
          ) : (
            <div>Тут ще немає жодного товару!</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

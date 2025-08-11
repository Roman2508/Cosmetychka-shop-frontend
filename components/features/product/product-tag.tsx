"use client"

import { cn } from "@/lib/utils"
import { Button } from "../../ui/button"
import { ProductTags } from "@/types/entities.types"

function getTagBackground(tag: ProductTags): string {
  switch (tag) {
    case "hit":
      return "bg-secondary-foreground"
    case "new":
      return "bg-primary"
    case "top":
      return "bg-secondary"
    default:
      return "bg-destructive"
  }
}

const ProductTag = ({ tag }: { tag: ProductTags }) => {
  return (
    <Button size="sm" className={cn("w-[50px]", getTagBackground(tag))}>
      {tag}
    </Button>
  )
}

export default ProductTag

import { Check as CheckIcon, X as XIcon } from "lucide-react"

import { ProductStatus as ProductStatusType } from "@/types/entities.types"
import { cn } from "@/lib/utils"

function getStatusData(status: ProductStatusType) {
  switch (status) {
    case "in_stock":
      return { label: "В наявності", bgColor: "text-green-600", Icon: CheckIcon }
    case "coming_soon":
      return { label: "Скоро у продажу", bgColor: "text-yellow-600", Icon: XIcon }
    case "discontinued":
      return { label: "Немає в наявності", bgColor: "text-red-600", Icon: XIcon }
    case "out_of_stock":
      return { label: "Знято з виробництва", bgColor: "text-violet-600", Icon: XIcon }
  }
}

const ProductStatus = ({ status }: { status: ProductStatusType }) => {
  const { label, bgColor, Icon } = getStatusData(status)

  return (
    <div className={cn("inline-flex items-center gap-1 px-2 mb-2 font-light", bgColor)}>
      <Icon size={18} />
      {label}
    </div>
  )
}

export default ProductStatus

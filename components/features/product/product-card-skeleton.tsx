import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-[258px] 2xs:w-full h-[240px] mb-3 mx-auto" />

      <Skeleton className="h-[20px] w-[80%] mx-auto mb-2" />

      <Skeleton className="h-[16px] w-[60%] mx-auto mb-4" />

      <div className="flex justify-center gap-2">
        <Skeleton className="h-[20px] w-[65px]" />
        <Skeleton className="h-[20px] w-[65px]" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton

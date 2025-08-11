import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { brandsService } from "@/api/brands-service"
import { useParams } from "next/navigation"

export const useGetBrands = () => {
  const params = useParams<{ id: string }>()

  const { data: brands, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: () => brandsService.getAll(params.id),
  })

  return useMemo(() => ({ brands, isLoading }), [brands, isLoading])
}

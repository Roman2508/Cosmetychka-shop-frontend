import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { categoriesService } from "@/api/categories-service"

export const useGetCategories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesService.getAll(),
  })

  return useMemo(() => ({ categories, isLoading }), [categories, isLoading])
}

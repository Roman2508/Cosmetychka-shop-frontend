import { dehydrate, QueryClient } from "@tanstack/react-query"

import { productService } from "@/api/producs-service"
import { categoriesService } from "@/api/categories-service"

export async function prefetchProductPage(params: { id: string }) {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: () => categoriesService.getAll(),
    }),

    queryClient.prefetchQuery({
      queryKey: ["product", { id: params.id }],
      queryFn: () => productService.getOne(params.id),
    }),
  ])

  return dehydrate(queryClient)
}

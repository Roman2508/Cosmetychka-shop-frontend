import { QueryClient } from "@tanstack/react-query"
import { categoriesService } from "@/api/categories-service"

export async function prefetchCategories() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesService.getAll(),
  })

  return queryClient
}

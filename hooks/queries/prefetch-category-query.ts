import { QueryClient } from "@tanstack/react-query"

import { productService } from "@/api/producs-service"
import { categoriesService } from "@/api/categories-service"
import { defaultParsedQuery, ParsedQuery, querySchema } from "../useParseQuertString"

export const useParseQueryStringServer = (searchParams: Record<string, string | string[] | undefined>) => {
  // const rawParams = Object.fromEntries(Object.entries(searchParams).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]))
  if (!searchParams || Object.keys(searchParams).length === 0) {
    return defaultParsedQuery
  }

  // @ts-ignore
  const rawParams = Object.fromEntries(searchParams.entries())
  const parsed = querySchema.safeParse(rawParams)

  if (!parsed.success) {
    console.error("Invalid query:", parsed.error)
    return defaultParsedQuery
  }

  const { sort_type, price_from, price_to, brand, gender, page, limit } = parsed.data

  return {
    sortType: sort_type,
    filter: { price: { from: price_from, to: price_to }, brand, gender },
    pagination: { page, limit },
  } satisfies ParsedQuery
}

export async function prefetchCategoryPage(
  params: { id: string },
  searchParams: Record<string, string | string[] | undefined>,
) {
  const queryClient = new QueryClient()

  const parsedQuery = useParseQueryStringServer(searchParams)

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: () => categoriesService.getAll(),
    }),

    queryClient.prefetchQuery({
      queryKey: ["products", { ...parsedQuery, subcategoryId: params.id }],
      queryFn: () => productService.getAll({ ...parsedQuery, subcategoryId: params.id }),
    }),
  ])

  return queryClient
}

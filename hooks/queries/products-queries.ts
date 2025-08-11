import { useMemo } from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { ProductTags } from "@/types/entities.types"
import { productService } from "@/api/producs-service"
import { useParseQueryString } from "../useParseQuertString"

export const useGetProducts = () => {
  const params = useParams<{ id: string }>()
  const query = useParseQueryString()

  const {
    isLoading,
    isSuccess,
    data: products,
  } = useQuery({
    queryKey: ["products", { ...query, subcategoryId: params.id }],
    queryFn: () => productService.getAll({ ...query, subcategoryId: params.id }),
  })

  return useMemo(() => ({ products, isLoading, isSuccess }), [products, isLoading, isSuccess])
}

export const useGetOneProduct = () => {
  const params = useParams<{ id: string }>()

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", { id: params.id }],
    queryFn: () => productService.getOne(params.id),
  })

  return useMemo(() => ({ product, isLoading, error }), [product, isLoading, error])
}

export const useSearchProducts = (search: string) => {
  const { data: products, isLoading } = useQuery({
    enabled: !!search,
    queryKey: ["products", { search: search }],
    queryFn: () => productService.search(search),
  })

  return useMemo(() => ({ products, isLoading }), [products, isLoading])
}

export const useProductsByTag = (tag: ProductTags) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", { tag }],
    queryFn: () => productService.getByTags(tag),
  })

  return useMemo(() => ({ products, isLoading }), [products, isLoading])
}

export const useProductsByCategory = (subcategoryId?: number) => {
  const { data: products, isLoading } = useQuery({
    enabled: !!subcategoryId,
    queryKey: ["products", { subcategoryId }],
    queryFn: () => productService.getBySubcategory(subcategoryId),
  })

  return useMemo(() => ({ products, isLoading }), [products, isLoading])
}

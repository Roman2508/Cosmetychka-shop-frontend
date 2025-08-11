"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { QueryKeys } from "@/types/general.types"
import { defaultParsedQuery } from "./useParseQuertString"

export const isDefaultValue = (key: string, value: any): boolean => {
  switch (key) {
    case "sort_type":
      return value === defaultParsedQuery.sortType

    case "price_from":
      return +value === defaultParsedQuery.filter.price.from

    case "price_to":
      return +value === defaultParsedQuery.filter.price.to

    case "gender":
      return value === defaultParsedQuery.filter.gender

    case "brand":
      const currentBrands = value.split(";").filter(Boolean)
      return !currentBrands.length

    case "page":
      return +value === defaultParsedQuery.pagination.page

    case "limit":
      return +value === defaultParsedQuery.pagination.limit

    default:
      return false
  }
}

export const useSetQueryString = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const setQueryString = useCallback(
    (name: QueryKeys, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (isDefaultValue(name, value) || value.trim() === "") {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [searchParams, router],
  )

  return { setQueryString }
}

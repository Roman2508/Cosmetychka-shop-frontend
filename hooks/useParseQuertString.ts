"use client"

import { z } from "zod"
import { useSearchParams } from "next/navigation"

const querySchema = z.object({
  sort_type: z.string().default("id"),
  price_from: z.coerce.number().default(0),
  price_to: z.coerce.number().default(0),
  brand: z
    .string()
    .transform((v) => v.split(";"))
    .default([""]),
  gender: z.string().default(""),
  limit: z.coerce.number().default(20),
  page: z.coerce.number().default(1),
})

export const defaultParsedQuery = {
  sortType: "id",
  filter: {
    price: { from: 0, to: 0 },
    brand: [] as string[],
    gender: "",
  },
  pagination: { page: 1, limit: 20 },
}

export type ParsedQuery = typeof defaultParsedQuery

export const useParseQueryString = () => {
  const searchParams = useSearchParams()

  const rawParams = Object.fromEntries(searchParams.entries())

  const parsed = querySchema.safeParse(rawParams)

  if (!parsed.success) {
    console.error("Invalid query:", parsed.error)
    return defaultParsedQuery
  }

  const { sort_type, price_from, price_to, brand, gender, page, limit } = parsed.data

  return {
    sortType: sort_type,
    filter: {
      price: { from: price_from, to: price_to },
      brand,
      gender,
    },
    pagination: { page, limit },
  } satisfies ParsedQuery
}

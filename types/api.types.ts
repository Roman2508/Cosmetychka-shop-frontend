import { ParsedQuery } from "@/hooks/useParseQuertString"

export type BaseResponseType<T> = {
  docs: T
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: any
  page: number
  pagingCounter: number
  prevPage: any
  totalDocs: number
  totalPages: number
}

export type GetProductPayload = {
  subcategoryId: string
} & ParsedQuery

export interface CreateOrderDto {
  products: { product: { id: number }; quantity: number }[]
  totalPrice: number
  username: string
  phone: string
  note?: string
}

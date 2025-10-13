import axiosInstance from "./axios"
import { Product, ProductTags } from "@/types/entities.types"
import { BaseResponseType, GetProductPayload } from "@/types/api.types"

export const productService = {
  async getAll(payload: GetProductPayload) {
    const { subcategoryId, sortType, filter, pagination } = payload

    let queryParams = `[where][subcategories][in]=${subcategoryId}&sort=${sortType}`

    // price
    if (filter.price.from) {
      queryParams += `&[where][finalPrice][greater_than_equal]=${filter.price.from}`
    }
    if (filter.price.to !== 0) {
      queryParams += `&[where][finalPrice][less_than_equal]=${filter.price.to}`
    }

    // brand
    const brands = filter.brand.filter((el) => !!el)
    if (brands.length) {
      brands.forEach((brand, index) => {
        queryParams += `&[where][or][${index}][name][contains]=${brand}`
      })
    }

    // gender
    if (filter.gender) {
      queryParams += `&[where][gender][equals]=${filter.gender}`
    }

    // pagination
    queryParams += `&page=${pagination.page}&limit=${pagination.limit}`

    const { data } = await axiosInstance.get<BaseResponseType<Product[]>>(`/products?${queryParams}`)
    return data
  },

  async search(payload: string) {
    let queryParams = ""
    if (payload) {
      queryParams += `&[where][or][0][name][contains]=${payload}&[where][or][1][description][contains]=${payload}`
    }
    const { data } = await axiosInstance.get<BaseResponseType<Product[]>>(`/products?${queryParams}`)
    return data
  },

  async getOne(id: string) {
    const { data } = await axiosInstance.get<Product>(`/products/${id}/full`)
    return data
  },

  async getByTags(tags: ProductTags) {
    const { data } = await axiosInstance.get<BaseResponseType<Product[]>>(
      `/products?[where][tags][in]=${tags}&sort=-id&page=1&limit=15`,
    )
    return data
  },

  async getBySubcategory(subcategoryId?: number) {
    const { data } = await axiosInstance.get<BaseResponseType<Product[]>>(
      `/products?[where][subcategories][in]=${subcategoryId}&sort=-id&page=1&limit=15`,
    )
    return data
  },
}

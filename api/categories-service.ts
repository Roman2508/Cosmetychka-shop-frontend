import axiosInstance from "./axios"
import { BaseResponseType } from "@/types/api.types"
import { Category, Subcategory } from "@/types/entities.types"

export const categoriesService = {
  async getAll() {
    const { data } = await axiosInstance.get<BaseResponseType<Category[]>>("/categories?page=1&limit=999")
    return data || []
  },
  async getById(id: string) {
    try {
      const { data } = await axiosInstance.get<Subcategory>(`/subcategories/${id}`)
      return data || null
    } catch (error) {
      return null
    }
  },
}

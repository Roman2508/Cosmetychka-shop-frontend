import axiosInstance from "./axios"
import { Category } from "@/types/entities.types"
import { BaseResponseType } from "@/types/api.types"

export const categoriesService = {
  async getAll() {
    const { data } = await axiosInstance.get<BaseResponseType<Category[]>>("/categories?page=1&limit=999")
    return data || []
  },
}

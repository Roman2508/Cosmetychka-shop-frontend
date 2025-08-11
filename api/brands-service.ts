import axiosInstance from "./axios"
import { Brand } from "@/types/entities.types"
import { BaseResponseType } from "@/types/api.types"

export const brandsService = {
  async getAll(subcategoryId?: string) {
    if (subcategoryId) {
      const { data } = await axiosInstance.get<BaseResponseType<Brand[]>>(
        `/brands?[where][subcategory][in]=${subcategoryId}&page=1&limit=999`,
      )
      return data || []
    }

    const { data } = await axiosInstance.get<BaseResponseType<Brand[]>>("/brands?page=1&limit=999")
    return data || []
  },
}

import axiosInstance from "./axios"
import { CreateOrderDto } from "@/types/api.types"

export const ordersService = {
  async create(payload: CreateOrderDto) {
    const { data } = await axiosInstance.post("/orders", payload)
    return data
  },
}

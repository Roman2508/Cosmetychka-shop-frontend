import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { useActions } from "../useActions"
import { CreateOrderDto } from "@/types/api.types"
import { ordersService } from "@/api/orders-service"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/constants/constants"

export const useCreateOrder = () => {
  const { resetCart } = useActions()

  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: (data: CreateOrderDto) => ordersService.create(data),
    onSuccess() {
      resetCart()
      toast.success(SUCCESS_MESSAGE)
    },
    onError() {
      toast.error(ERROR_MESSAGE)
    },
  })
}

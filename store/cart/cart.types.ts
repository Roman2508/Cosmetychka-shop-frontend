import { CartItem } from "@/types/store.types"

export interface ICartInitialState {
  items: CartItem[]
}

export interface IAddToCartPayload extends Omit<CartItem, "id"> {}

export interface IChangeQuantityPayload extends Pick<CartItem, "id"> {
  type: "minus" | "plus"
}

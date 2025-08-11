import { Product } from "./entities.types"

export interface CartItem {
  id: number
  product: Product
  quantity: number
  price: number
}

export interface FavouriteItem extends Product {}

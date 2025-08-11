import { cartSlice } from "./cart/cart.slice"
import { favouriteSlice } from "./favourite/favourite.slice"

export const rootActions = {
  ...cartSlice.actions,
  ...favouriteSlice.actions,
}

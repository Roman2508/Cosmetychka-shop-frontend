import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import type { IAddToCartPayload, ICartInitialState, IChangeQuantityPayload } from "./cart.types"

const initialState: ICartInitialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const isExist = state.items.some((item) => item.product.id === action.payload.product.id)
      if (!isExist) state.items.push({ ...action.payload, id: state.items.length })
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload.id)
    },
    changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
      const { id, type } = action.payload
      const item = state.items.find((item) => item.product.id === id)
      if (!item) return
      if (type === "plus") {
        item.quantity++
      } else if (type === "minus" && item.quantity !== 1) {
        item.quantity--
      }
    },
    resetCart: (state) => {
      state.items = []
    },
  },
})

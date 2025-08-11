import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import type { IAddToFavouritePayload, IFavouriteInitialState } from "./favourite.types"

const initialState: IFavouriteInitialState = {
  items: [],
}

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addToFavourite: (state, action: PayloadAction<IAddToFavouritePayload>) => {
      const isExist = state.items.some((item) => item.id === action.payload.id)
      if (!isExist) state.items.push(action.payload)
    },
    removeFromFavourite: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },

    resetFavourite: (state) => {
      state.items = []
    },
  },
})

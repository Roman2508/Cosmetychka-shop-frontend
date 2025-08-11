import storage from "redux-persist/lib/storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from "redux-persist"

import { cartSlice } from "./cart/cart.slice"
import { favouriteSlice } from "./favourite/favourite.slice"

const persistConfig = {
  key: "shop",
  storage,
  whiteList: ["cart", "favourite"],
}

const isClient = typeof window !== "undefined"

const combinedReducers = combineReducers({
  cart: cartSlice.reducer,
  favourite: favouriteSlice.reducer,
})

let mainReducer = combinedReducers

if (isClient) {
  const { persistReducer } = require("redux-persist")
  const storage = require("redux-persist/lib/storage")

  mainReducer = persistReducer(persistConfig, combinedReducers)
}

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof mainReducer>

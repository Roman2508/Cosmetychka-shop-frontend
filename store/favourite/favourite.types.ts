import { FavouriteItem } from "@/types/store.types"

export interface IFavouriteInitialState {
  items: FavouriteItem[]
}

export interface IAddToFavouritePayload extends FavouriteItem {}

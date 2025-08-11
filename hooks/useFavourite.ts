import { useTypedSelector } from "./useTypedSelector"

export const useFavourite = () => {
  const items = useTypedSelector((state) => state.favourite.items)
  return { items }
}

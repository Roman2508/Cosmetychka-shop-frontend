"use client"

import { useSetQueryString } from "@/hooks/useSetQueryString"
import { useParseQueryString } from "@/hooks/useParseQuertString"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const orderTypes = [
  { label: "За замовчуванням", value: "id" },
  { label: "Новинки", value: "createdAt" },
  { label: "Назва (А-Я)", value: "name" },
  { label: "Назва (Я-А)", value: "-name" },
  { label: "Ціна (За зростанням)", value: "price" },
  { label: "Ціна (За спаданням)", value: "-price" },
]

const CatalogOrder = () => {
  const { sortType } = useParseQueryString()
  const { setQueryString } = useSetQueryString()

  return (
    <Select
      value={sortType}
      defaultValue={sortType}
      onValueChange={(value) => {
        console.log(value)
        setQueryString("sort_type", value)
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Сортувати по:" />
      </SelectTrigger>
      <SelectContent>
        {orderTypes.map((el) => (
          <SelectItem key={el.value} value={el.value}>
            {el.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CatalogOrder

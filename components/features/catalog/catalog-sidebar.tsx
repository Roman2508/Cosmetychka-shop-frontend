import { FC, useMemo } from "react"
import { CheckedState } from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"
import { Checkbox } from "../../ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSetQueryString } from "@/hooks/useSetQueryString"
import { useGetBrands } from "@/hooks/queries/brands-queries"
import { useParseQueryString } from "@/hooks/useParseQuertString"
import { useGetProducts } from "@/hooks/queries/products-queries"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Props {
  hidden?: boolean
  className?: string
}

const CatalogSidebar: FC<Props> = ({ hidden = false, className = "" }) => {
  const { products } = useGetProducts()
  const { brands, isLoading } = useGetBrands()

  const { filter } = useParseQueryString()
  const { setQueryString } = useSetQueryString()

  const onCheckedChange = (checked: CheckedState, brand: string) => {
    if (checked) {
      const selectedBrands = filter.brand.filter((el) => !!el)
      const brands = [...selectedBrands, brand].join(";")
      setQueryString("brand", brands)
    } else {
      const brands = filter.brand.filter((value) => value !== brand).join(";")
      setQueryString("brand", brands)
    }
  }

  const maxPrice = useMemo(() => {
    if (!products) return 0
    return Math.max(...products.docs.map((el) => el.price))
  }, [products])

  return (
    <div className={cn("min-w-[240px]", hidden ? "hidden" : "")}>
      <h3 className="text-2xl font-medium mt-0 mb-6 text-left font-mono">Фільтр товарів</h3>

      <Accordion type="single" collapsible className={cn("w-[240px]", className)} defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Ціна</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm">Від</p>
              <Input
                min={0}
                type="number"
                value={filter.price.from}
                className="w-30 h-[30px] focus-visible:h-[29px]"
                onChange={(e) => setQueryString("price_from", e.target.value)}
              />
              <p className="text-sm">До</p>
              <Input
                type="number"
                max={maxPrice}
                className="w-30 h-[30px] focus-visible:h-[29px]"
                value={filter.price.to ? filter.price.to : maxPrice}
                onChange={(e) => setQueryString("price_to", e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Бренд</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {isLoading
              ? "Завантаження..."
              : (brands ? brands.docs : []).map((brand) => {
                  return (
                    <div className="flex items-center space-x-2" key={brand.id}>
                      <Checkbox
                        id={brand.name}
                        checked={filter.brand.includes(brand.name)}
                        onCheckedChange={(checked) => onCheckedChange(checked, brand.name)}
                      />
                      <Label htmlFor={brand.name}>{brand.name}</Label>
                    </div>
                  )
                })}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Стать</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <RadioGroup
              defaultValue={""}
              value={filter.gender}
              onValueChange={(value) => setQueryString("gender", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="" />
                <Label htmlFor="">Всі</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="man" id="man" />
                <Label htmlFor="man">Для чоловіків</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="woman" id="woman" />
                <Label htmlFor="woman">Для жінок</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">Унісекс</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default CatalogSidebar

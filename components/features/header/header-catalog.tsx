"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronRight as ChevronRightIcon, Grip as GripIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "../../ui/button"
import { Subcategory } from "@/types/entities.types"
import { useGetCategories } from "@/hooks/queries/categories-queries"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useBreakpoints } from "@siberiacancode/reactuse"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const HeaderCatalog = () => {
  const { categories, isLoading } = useGetCategories()

  const { smallerOrEqual } = useBreakpoints({ sm: 640, md: 768 })

  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="md" className="!px-4" variant={smallerOrEqual("sm") ? "ghost" : "default"}>
          <GripIcon className={smallerOrEqual("sm") ? "!w-[18px] !h-[18px] md:!w-[22px] md:!h-[22px]" : ""} />
          <span className="hidden sm:inline-block">Каталог</span>
        </Button>
      </PopoverTrigger>

      {smallerOrEqual("md") ? (
        <PopoverContent className="flex w-[100vw] gap-4" align="start">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            {(categories ? categories.docs : []).map((category) => (
              <AccordionItem value={String(category.id)} key={category.id}>
                <AccordionTrigger className="text-xl font-medium my-0 text-left text-primary">
                  {category.name}
                </AccordionTrigger>

                <AccordionContent className="">
                  {!category.subcategories.length && <h4 className="text-lg">Пусто</h4>}

                  {category.subcategories.map((subcategory) => {
                    return (
                      <div key={subcategory.id} className="mb-2 text-lg">
                        <Link
                          // onClick={() => setOpen(false)}
                          href={`/catalog/${subcategory.id}`}
                          className="block hover:text-destructive"
                        >
                          <h4>{subcategory.name}</h4>
                        </Link>
                      </div>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </PopoverContent>
      ) : (
        <PopoverContent className="flex w-full gap-4 max-h-[calc(100vh-100px)]" align="start">
          <div className="w-[300px] flex flex-col max-h-full overflow-auto">
            {(categories ? categories.docs : []).map((category) => {
              const isActive = activeCategoryId === category.id

              return (
                <div
                  key={category.id}
                  className={cn(
                    isActive ? "bg-muted" : "",
                    "flex justify-between items-center p-4 hover:bg-muted cursor-pointer",
                  )}
                  onMouseOver={() => {
                    setActiveCategoryId(category.id)
                    setSubcategories(category.subcategories)
                  }}
                  onClick={() => {
                    setActiveCategoryId(category.id)
                    setSubcategories(category.subcategories)
                  }}
                >
                  {category.name} <ChevronRightIcon className="min-w-[24px]" />
                </div>
              )
            })}
          </div>

          <div className="pr-10 min-w-80 max-h-full overflow-auto">
            {subcategories &&
              subcategories.map((subcategory) => {
                return (
                  <div key={subcategory.id} className="mb-2">
                    <Link
                      // onClick={() => setOpen(false)}
                      href={`/catalog/${subcategory.id}`}
                      className="block hover:text-destructive"
                    >
                      <h4>{subcategory.name}</h4>
                    </Link>
                  </div>
                )
              })}
          </div>
        </PopoverContent>
      )}
    </Popover>
  )
}

export default HeaderCatalog

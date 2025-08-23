"use client"

import { useDebounceValue } from "@siberiacancode/reactuse"
import { Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Product } from "@/types/entities.types"
import { ProductMiniCard } from "./product/product-mini-card"
import { useSearchProducts } from "@/hooks/queries/products-queries"
import Link from "next/link"

interface Props {
  searchLayoutVisible: boolean
  setSearchLayoutVisible: Dispatch<SetStateAction<boolean>>
}

const Search: FC<PropsWithChildren<Props>> = ({ children, searchLayoutVisible, setSearchLayoutVisible }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [search, setSearch] = useState("")

  const debouncedValue = useDebounceValue(search, 500)

  const { products, isLoading } = useSearchProducts(debouncedValue)

  useEffect(() => {
    if (searchLayoutVisible && inputRef.current) inputRef.current.focus()
  }, [searchLayoutVisible])

  return (
    <>
      <div
        onClick={() => setSearchLayoutVisible(false)}
        className={cn("fixed w-full h-full top-0 left-0 bg-black/50 z-[1]", !searchLayoutVisible && "hidden")}
      ></div>

      {!searchLayoutVisible && children}

      {searchLayoutVisible && (
        <div className="fixed top-[32.5px] left-[50%] translate-x-[-50%] bg-background z-[2] w-[calc(100vw-20px)] 2xs:w-[450px]">
          <div className={cn(searchLayoutVisible && "border-b-[2px] w-full", "border-primary bg-background h-[40px]")}>
            <Input
              ref={inputRef}
              value={search}
              placeholder="Пошук..."
              onChange={(e) => setSearch(e.target.value)}
              className={cn("xl:w-80 2xl:w-100 max-w-80 h-[40px] focus-visible:h-[40px]")}
            />
          </div>

          <div
            className={cn(
              !searchLayoutVisible && "hidden",
              "w-[calc(100vw-20px)] 2xs:w-[450px] px-4 py-6 absolute bg-background top-[40px] left-[50%] translate-x-[-50%] overflow-y-auto overflow-x-hidden max-h-[85vh]",
            )}
          >
            {products ? (
              products.docs.map((product) => (
                <div
                  key={product.id}
                  className="border border-background hover:border-border transition-all pl-0 hover:pl-4"
                >
                  <Link
                    href={`/product/${product.id}`}
                    onClick={() => {
                      setSearch("")
                      setSearchLayoutVisible(false)
                    }}
                  >
                    <ProductMiniCard product={product as Product} variant="search" />
                  </Link>
                </div>
              ))
            ) : (
              <p className="py-10 text-center">{isLoading ? "Завантаження..." : "Введіть текст для пошуку"}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Search

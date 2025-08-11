"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Search as SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import Container from "./container"
import { Button } from "../ui/button"
import Search from "../features/search"
import { Skeleton } from "../ui/skeleton"
import ShoppingCard from "../features/shopping-card"
import HeaderCatalog from "../features/header/header-catalog"
import { HeaderFovourite } from "../features/header/header-fovourite"
import { useGetCategories } from "@/hooks/queries/categories-queries"

const Header = () => {
  const { categories, isLoading } = useGetCategories()

  const scrollRef = useRef<HTMLDivElement>(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [searchLayoutVisible, setSearchLayoutVisible] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [categories?.docs?.length])

  return (
    <header>
      <div className="border-b py-2 md:py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 sm:gap-8 flex-1">
            <Link href="/">
              <Image
                priority
                alt="logo"
                width={300}
                height={300}
                src="/logo_transparent.png"
                className="w-[80px] md:min-w-[100px]"
              />
            </Link>

            <div>
              <HeaderCatalog />
            </div>
          </div>

          <Search searchLayoutVisible={searchLayoutVisible} setSearchLayoutVisible={setSearchLayoutVisible}>
            <Input
              placeholder="Пошук..."
              onClick={() => setSearchLayoutVisible(true)}
              className={cn("w-60 xl:w-80 2xl:w-100 max-w-80 h-[40px] focus-visible:h-[40px] hidden md:inline-block")}
            />
          </Search>

          <div className="flex items-center justify-end gap-4 md:gap-10 flex-1">
            <div className="flex flex-col h-[24px] md:h-auto">
              <div className="flex gap-2 items-center mb-[-6px]">
                <img
                  src="https://gtmcosmetics.com.ua/image/catalog/chm-files/icon-contact/instagram.svg"
                  className="min-w-[24px] min-h-[24px]"
                />
                <b className="hidden md:block">inst_nickname</b>
              </div>

              <p className="text-end hidden md:block">ми на зв'язку</p>
            </div>

            <div className="flex gap-2">
              <Search searchLayoutVisible={searchLayoutVisible} setSearchLayoutVisible={setSearchLayoutVisible}>
                <Button
                  size="md"
                  variant="ghost"
                  className="inline-block md:hidden"
                  onClick={() => setSearchLayoutVisible(true)}
                >
                  <SearchIcon className="!w-[18px] !h-[18px] md:!w-[22px] md:!h-[22px]" />
                </Button>
              </Search>

              <HeaderFovourite />

              <ShoppingCard type="icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[40px] border-b hidden lg:block">
        <Container className="w-full h-full">
          {isLoading && (
            <div className="flex justify-between items-center w-full h-full">
              {[...Array(8)].map((_, index) => (
                <Skeleton key={index} className="w-[100px] h-[18px]" />
              ))}
            </div>
          )}

          <NavigationMenu className="flex-1 [&>div:first-child]:w-full" viewport={false}>
            {canScrollLeft && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => scroll("left")}
                className="absolute p-0 left-0 top-0 translate-y-[4px] bottom-0 z-20 flex items-center px-1 bg-white/60 hover:bg-white backdrop-blur-sm cursor-pointer !bg-background"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </Button>
            )}

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className={cn(
                "flex gap-4 scroll-smooth w-full scrollbar-hide container overflow-x-hidden",
                "absolute top-0 left-0 h-full min-h-[40px] [&>div]:w-full",
                "header-categories overflow-y-hidden",
              )}
            >
              <NavigationMenuList
                className={cn(
                  "inline-flex gap-10 min-w-max",
                  categories && categories.docs.length > 5
                    ? "justify-between pr-10"
                    : "justify-between md:justify-evenly",
                )}
              >
                {(categories ? categories.docs : []).map((category, index) => {
                  const isFirst = index === 0
                  const isLast = index === Number(categories?.docs.length) - 1

                  return (
                    <NavigationMenuItem key={category.id} className="flex-none">
                      <NavigationMenuTrigger className="header-categories-link px-0">
                        <Button size="md" variant="link" className="font-normal px-0 cursor-default">
                          {category.name}
                        </Button>
                      </NavigationMenuTrigger>

                      <NavigationMenuContent
                        className={cn(
                          "header-categories-link absolute w-full min-h-50 z-[999] top-[-10px]",
                          isLast ? "!left-[-100%] !right-0 !translate-x-0" : "",
                          isFirst ? "!left-0 !right-0 !translate-x-0" : "",
                        )}
                      >
                        <ul className={cn("grid gap-2 grid-cols-1 min-w-50")}>
                          {category.subcategories.map((subcategory) => (
                            <NavigationMenuLink className="max-h-[30px]" key={subcategory.id}>
                              <Link href={`/catalog/${subcategory.id}`}>{subcategory.name}</Link>
                            </NavigationMenuLink>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </div>

            {canScrollRight && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => scroll("right")}
                className="absolute right-0 top-[50%] translate-y-[4px] bottom-0 z-20 flex items-center px-1 bg-white/60 hover:bg-white backdrop-blur-sm cursor-pointer !bg-background"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </Button>
            )}
          </NavigationMenu>
        </Container>
      </div>
    </header>
  )
}

export default Header

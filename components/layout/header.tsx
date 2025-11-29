"use client"

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import HeaderSearch from "./header-search"
import HeaderNavLayout from "./header-nav-layout"
import ShoppingCard from "../features/shopping-card"
import HeaderCatalog from "../features/header/header-catalog"
import { HeaderFovourite } from "../features/header/header-fovourite"
import { useGetCategories } from "@/hooks/queries/categories-queries"

const Header = () => {
  const params = useParams()

  const { categories, isLoading } = useGetCategories()

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

          <HeaderSearch />

          <div className="flex items-center justify-end gap-4 md:gap-10 flex-1">
            <a
              target="_blank"
              className="flex flex-col h-[24px] md:h-auto"
              href="https://www.instagram.com/accounts/login/?next=%2F__kosmetychka_shop_%2F&source=omni_redirect"
            >
              <div className="flex gap-2 items-center mb-[-6px]">
                <Image
                  width={24}
                  height={24}
                  alt="instagram logo"
                  src="/instagram.svg"
                  className="min-w-[24px] min-h-[24px]"
                />
                <b className="hidden md:block">__kosmetychka_shop_</b>
              </div>

              <p className="text-end hidden md:block">{"ми на зв'язку"}</p>
            </a>

            <div className="flex gap-2">
              {/* mobile-search */}
              <HeaderSearch type="mobile" />

              <HeaderFovourite />

              <ShoppingCard type="icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[40px] border-b hidden lg:block">
        <HeaderNavLayout categoriesLength={categories ? categories.docs?.length : 0} isLoading={isLoading}>
          {(categories ? categories.docs : []).map((category, index) => {
            const isFirst = index === 0
            const isLast = index === Number(categories?.docs.length) - 1

            return (
              <NavigationMenuItem key={category.id} className="flex-none">
                <NavigationMenuTrigger className="header-categories-link px-0" asChild>
                  <Button size="md" variant="link" className="font-normal px-0 cursor-default">
                    {category.name}
                  </Button>
                </NavigationMenuTrigger>

                <NavigationMenuContent
                  className={cn(
                    "header-categories-link absolute w-full min-h-50 z-[999] top-[-10px]",
                    isLast ? "!left-[-100%] !right-0 !translate-x-0 min-w-50 max-w-[300px]" : "",
                    // isLast ? "!left-[-200%] !right-0 !translate-x-0 min-w-50" : "",
                    isFirst ? "!left-0 !right-0 !translate-x-0 min-w-50" : "",
                  )}
                >
                  <ul className={cn("flex flex-col min-w-50")}>
                    {category.subcategories.map((subcategory) => (
                      <NavigationMenuLink
                        key={subcategory.id}
                        className={cn(
                          "max-h-[30px] hover:text-destructive inline-flex mb-2",
                          params.id === String(subcategory.id) && "text-destructive",
                        )}
                      >
                        <Link href={`/catalog/${subcategory.id}`} className="truncate min-h-8">
                          {subcategory.name}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          })}
        </HeaderNavLayout>
      </div>
    </header>
  )
}

export default Header

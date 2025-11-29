"use client"

import { FC, useEffect, useRef, useState } from "react"
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import Container from "./container"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"

interface Props {
  isLoading: boolean
  categoriesLength?: number
  children?: React.ReactNode
}

const HeaderNavLayout: FC<Props> = ({ categoriesLength = 0, isLoading, children }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

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
  }, [categoriesLength])

  return (
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
              categoriesLength > 5 ? "justify-between pr-10" : "justify-between md:justify-evenly",
            )}
          >
            {children}
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
  )
}

export default HeaderNavLayout

"use client"

import { FC, useState } from "react"
import { Search as SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Search from "../features/search"

interface Props {
  type?: "desktop" | "mobile"
}

const HeaderSearch: FC<Props> = ({ type = "desktop" }) => {
  const [searchLayoutVisible, setSearchLayoutVisible] = useState(false)

  return (
    <Search searchLayoutVisible={searchLayoutVisible} setSearchLayoutVisible={setSearchLayoutVisible}>
      {type === "mobile" ? (
        <Button
          size="md"
          variant="ghost"
          className="inline-block md:hidden"
          onClick={() => setSearchLayoutVisible(true)}
        >
          <SearchIcon className="!w-[18px] !h-[18px] md:!w-[22px] md:!h-[22px]" />
        </Button>
      ) : (
        <Input
          placeholder="Пошук..."
          onClick={() => setSearchLayoutVisible(true)}
          className={cn("w-60 xl:w-80 2xl:w-100 max-w-80 h-[40px] focus-visible:h-[40px] hidden md:inline-block")}
        />
      )}
    </Search>
  )
}

export default HeaderSearch

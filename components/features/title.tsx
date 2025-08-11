import { cn } from "@/lib/utils"
import React, { FC, PropsWithChildren } from "react"

const Title: FC<PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => {
  return (
    <h2
      className={cn(
        "uppercase text-center text-2xl lg:text-3xl mt-40 font-mono",
        className,
      )}
    >
      {children}
    </h2>
  )
}

export default Title

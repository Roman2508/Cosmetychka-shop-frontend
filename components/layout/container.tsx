import React, { FC, PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

const Container: FC<PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => {
  return <div className={cn("container mx-auto px-4 lg:px-6", className)}>{children}</div>
}

export default Container

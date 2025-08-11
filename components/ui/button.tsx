import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-background hover:bg-primary/90",
        destructive:
          "bg-destructive text-background hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-primary bg-transparent text-primary hover:text-primary/80 hover:border-primary/80 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-background hover:bg-secondary/80",
        ghost: "bg-transparent hover:opacity-[0.9] hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[50px] px-8 py-2 uppercase has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-2 uppercase has-[>svg]:px-2.5 cursor-default",
        md: "h-[40px] px-8 gap-1.5 px-3 uppercase has-[>svg]:px-2.5",
        lg: "h-[36px] px-6 uppercase has-[>svg]:px-4",
        icon: "size-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }

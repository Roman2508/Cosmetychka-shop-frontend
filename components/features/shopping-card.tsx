"use client"

import { Badge } from "@/components/ui/badge"
import { FC, Fragment, PropsWithChildren, useState } from "react"
import { ShoppingBag as ShoppingBagIcon } from "lucide-react"

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import OrderForm from "./order-form"
import { Button } from "../ui/button"
import { useCart } from "@/hooks/useCart"
import { ProductMiniCard } from "./product/product-mini-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Props {
  type?: "button" | "icon"
  onClick?: () => void
  buttonText?: string
}

const ShoppingCard: FC<PropsWithChildren<Props>> = ({ type = "button", buttonText = "Купити в 1 клік", onClick }) => {
  const { items: cartItems, total } = useCart()

  const [isVisible, setIsVisible] = useState(false)

  return (
    <Dialog onOpenChange={setIsVisible} open={isVisible}>
      <DialogTrigger>
        {type === "button" ? (
          <Button onClick={() => onClick && onClick()} className="w-full">
            {buttonText}
          </Button>
        ) : (
          <Button variant="ghost" size="md" className="relative">
            <ShoppingBagIcon className="!w-[18px] !h-[18px] md:!w-[22px] md:!h-[22px]" />
            {!!cartItems.length && (
              <Badge variant="destructive" className="absolute -right-0 -top-0">
                {cartItems.length}
              </Badge>
            )}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="px-0 gap-0">
        <DialogHeader className="px-4">
          <DialogTitle>
            <p className="pb-4">Ваше замовлення:</p>
            <hr />
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[80vh] overflow-y-auto px-4">
          {cartItems.length ? (
            <div>
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl font-medium my-0 text-left text-primary">
                    Товари:
                  </AccordionTrigger>
                  <AccordionContent className="">
                    {cartItems.map((el) => (
                      <ProductMiniCard key={el.product.id} product={el.product} variant="cart" />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <p className="text-lg font-medium my-0 text-left text-primary mb-4">
                Загальна сума замовлення: {total} грн
              </p>
            </div>
          ) : (
            <p className="py-4 text-center text-xl text-primary font-medium">Ваша корзина пуста</p>
          )}

          <hr className="pb-4" />

          <OrderForm setIsVisible={setIsVisible} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default ShoppingCard

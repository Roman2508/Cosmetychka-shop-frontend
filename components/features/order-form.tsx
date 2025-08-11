import z from "zod"
import { useMask } from "@react-input/mask"
import { Dispatch, MouseEvent, SetStateAction, useState } from "react"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import InputError from "./input-error"
import { useCart } from "@/hooks/useCart"
import { useCreateOrder } from "@/hooks/mutations/orders-mutations"

const initialFormData = {
  username: "",
  phone: "",
  note: "",
}

const formSchema = z.object({
  username: z.string().nonempty({ message: "Це поле обов'язкове" }),
  phone: z
    .string()
    .nonempty({ message: "Це поле обов'язкове" })
    .min(18, "Занадто короткий номер")
    .regex(/^[\d\+\-\s\(\)]+$/, "Невалідний формат номера"),
  note: z.string().optional(),
})

export type GroupFormData = z.infer<typeof formSchema>

const OrderForm = ({ setIsVisible }: { setIsVisible: Dispatch<SetStateAction<boolean>> }) => {
  const { items: cartItems, total: totalPrice } = useCart()

  const createOrder = useCreateOrder()

  const inputRef = useMask({ mask: "+38(___) ___-__-__", replacement: { _: /\d/ }, showMask: false })

  const [userFormData, setUserFormData] = useState<Partial<GroupFormData>>({})
  const [showErrors, setShowErrors] = useState(false)

  const formData = {
    ...initialFormData,
    ...userFormData,
  }

  const validate = () => {
    const res = formSchema.safeParse(formData)
    if (res.success) return
    return res.error.format()
  }

  const errors = showErrors ? validate() : undefined

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const errors = validate()
      if (errors) {
        setShowErrors(true)
        return
      }

      const products = cartItems.map((el) => ({
        product: { id: el.product.id },
        quantity: el.quantity,
      }))
      await createOrder.mutateAsync({ products, totalPrice, ...formData })
      setUserFormData({})
      setIsVisible(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <Input
          value={formData.username}
          placeholder={"Ваше ім'я*"}
          onChange={(e) => setUserFormData((prev) => ({ ...prev, username: e.target.value }))}
        />
        <InputError errors={errors} inputKey="username" />
      </div>

      <div className="mb-6">
        <Input
          type="tel"
          ref={inputRef}
          value={formData.phone}
          placeholder="+38(___) __-__-__"
          onChange={(e) => setUserFormData((prev) => ({ ...prev, phone: e.target.value }))}
        />
        <InputError errors={errors} inputKey="phone" />
      </div>

      <div className="mb-6">
        <Input
          placeholder="Коментар"
          value={formData.note}
          onChange={(e) => setUserFormData((prev) => ({ ...prev, note: e.target.value }))}
        />
        <InputError errors={errors} inputKey="note" />
      </div>

      <p className="mb-6 text-primary">Найближчим часом наш спеціаліст зв'яжеться з вами, щоб уточнити усі деталі.</p>

      <Button className="w-full" disabled={!!errors || createOrder.isPending || !cartItems.length}>
        {createOrder.isPending ? "Завантаження..." : "Оформити замовлення"}
      </Button>
    </form>
  )
}

export default OrderForm

"use client"

import Link from "next/link"

import Title from "@/components/features/title"
import { Button } from "@/components/ui/button"

export default function Error() {
  return (
    <div className="h-[calc(100vh-206px)] flex justify-center items-center flex-col gap-4">
      <Title className="!text-4xl font-semi !m-0">Помилка</Title>
      <p>Сталась непередбачувана помилка, спробуйте пізніше</p>
      <Link href="/">
        <Button>Повернутись на головну</Button>
      </Link>
    </div>
  )
}

import Link from "next/link"

import Title from "@/components/features/title"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-206px)] flex justify-center items-center flex-col gap-4">
      <Title className="!text-4xl font-semi !m-0">Не знайдено</Title>
      <p>Не вдалося знайти запитуваний ресурс</p>
      <Link href="/">
        <Button>Повернутись на головну</Button>
      </Link>
    </div>
  )
}

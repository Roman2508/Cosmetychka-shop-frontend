"use client"

import Link from "next/link"

import Title from "@/components/features/title"
import Container from "@/components/layout/container"
import { useGetCategories } from "@/hooks/queries/categories-queries"


export default function CategoriesPage() {
  const { categories } = useGetCategories()

  return (
    <Container>
      <div className="w-full my-15">
        <Title className="mt-0 mb-6 text-left normal-case font-semibold">Всі категорії</Title>

        <div className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {(categories ? categories.docs : []).map((category) => {
            if (!category.subcategories.length) return

            return (
              <div className="" key={category.id}>
                <h4 className="text-2xl font-semibold font-mono mb-2">{category.name}</h4>

                {category.subcategories.map((subcategory) => (
                  <p key={subcategory.id} className="mb-1">
                    <Link href={`catalog/${subcategory.id}`} className="hover:text-destructive">
                      {subcategory.name}
                    </Link>
                  </p>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

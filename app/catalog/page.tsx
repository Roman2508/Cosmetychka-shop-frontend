import { Metadata } from "next"

import CategoriesPage from "./CategoriesPage"
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/constants"

export const metadata: Metadata = {
  title: `Категорії товарів | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
}

export default function Catalog() {
  return <CategoriesPage />
}

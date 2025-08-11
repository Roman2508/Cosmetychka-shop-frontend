import { Metadata } from "next"

import CatalogPage from "./CatalogPage"
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/constants"

export const metadata: Metadata = {
  title: `Каталог | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
}

export default function Catalog() {
  return <CatalogPage />
}

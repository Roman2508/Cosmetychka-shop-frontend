import { Metadata } from "next"
import FullProductPage from "./FullProductPage"
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/constants"

export const metadata: Metadata = {
  title: `${SITE_NAME}`,
  description: SITE_DESCRIPTION,
}

export default function FullProduct() {
  return <FullProductPage />
}

import { Metadata } from "next"

import HomePage from "./HomePage"
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/constants"

export const metadata: Metadata = {
  title: `Головна | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
}

export default function Home() {
  return <HomePage />
}

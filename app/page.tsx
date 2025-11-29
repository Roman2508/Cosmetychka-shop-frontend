import { Metadata } from "next"

import HomePage from "./HomePage"
import { KEY_WORDS, SITE_DESCRIPTION, SITE_NAME } from "@/constants/constants"

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://cosmetychka.com.ua"

export const metadata: Metadata = {
  title: `Головна | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  keywords: KEY_WORDS,

  openGraph: {
    title: `Головна | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: new URL(baseUrl),
    images: [
      {
        url: `${baseUrl}/web-app-manifest-512x512.png`,
        width: 512,
        height: 512,
        alt: "Cosmetychka – професійна косметика",
      },
    ],
    siteName: baseUrl,
    locale: "uk_UA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `Головна | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [`${baseUrl}/web-app-manifest-192x192.png`],
  },

  icons: {
    icon: "/web-app-manifest-192x192.png",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
}

export default function Home() {
  return <HomePage />
}

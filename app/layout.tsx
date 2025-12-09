import Head from "next/head"
import { Jost, Cormorant_Garamond } from "next/font/google"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/layout/providers"
import ProgressBar from "@/components/features/progress-bar"
import { prefetchCategories } from "@/hooks/queries/prefetch-categories-query"
import { SITE_NAME } from "@/constants/constants"

const jostSans = Jost({
  variable: "--font-jost-mono",
  subsets: ["latin", "cyrillic"],
})

const CormorantGaramondMono = Cormorant_Garamond({
  variable: "--font-cormorant-garamond-mono",
  subsets: ["latin", "cyrillic"],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = await prefetchCategories()

  const baseUrl = process.env.FRONTEND_URL || "https://cosmetychka.com.ua"

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: ["Косметичка шоп", "cosmetychka com", "Косметичка ком", "cosmetychka com ua", "Косметичка ком юа"],
    url: baseUrl,
    logo: `${baseUrl}/web-app-manifest-512x512.png`,
    sameAs: ["https://www.instagram.com/__kosmetychka_shop_"],
  }

  return (
    <html lang="uk">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32 48x48" />
        {/* <link rel="icon" href="/favicon-32x32.png" type="image/png" /> */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />

        {/* <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" /> */}
        {/* <link rel="apple-touch-icon" sizes="512x512" href="/apple-touch-icon.png" /> */}
      </Head>

      <body
        style={{ marginRight: "0 !important" }}
        className={`${jostSans.variable} ${CormorantGaramondMono.variable} antialiased`}
      >
        <Providers>
          <ProgressBar />
          <Toaster closeButton richColors duration={8000} position="top-center" />
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />
          </HydrationBoundary>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

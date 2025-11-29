import { Toaster } from "@/components/ui/sonner"
import { Jost, Cormorant_Garamond } from "next/font/google"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Providers } from "@/components/layout/providers"
import ProgressBar from "@/components/features/progress-bar"
import { prefetchCategories } from "@/hooks/queries/prefetch-categories-query"

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

  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

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

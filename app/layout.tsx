import { Toaster } from "@/components/ui/sonner"
import { Jost, Cormorant_Garamond } from "next/font/google"

import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Providers } from "@/components/layout/providers"
import ProgressBar from "@/components/features/progress-bar"

const jostSans = Jost({
  variable: "--font-jost-mono",
  subsets: ["latin", "cyrillic"],
})

const CormorantGaramondMono = Cormorant_Garamond({
  variable: "--font-cormorant-garamond-mono",
  subsets: ["latin", "cyrillic"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ua">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>

      <body
        style={{ marginRight: "0 !important" }}
        className={`${jostSans.variable} ${CormorantGaramondMono.variable} antialiased`}
      >
        <Providers>
          <ProgressBar />
          <Toaster closeButton richColors duration={8000} position="top-center" />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

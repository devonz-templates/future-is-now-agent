import type React from "react"
import type { Metadata } from "next"
// Import Inter font instead of Geist
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SmoothScroll } from "@/components/smooth-scroll"

// Use Inter with thin weight (100) for the entire app
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "MORAVEC 04",
  description: "Meet our smartest humanoid yet",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

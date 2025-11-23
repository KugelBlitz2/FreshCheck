import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { BottomNav } from "@/components/layout/bottom-nav"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yuka Clone - Food Scanner",
  description: "Scan and analyze food products with health scores",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yuka Clone",
  },
  formatDetection: {
    telephone: false,
  },
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
    apple: "/icon.svg", // Fallback to SVG if PNGs aren't generated
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased pb-20`}>
        <main className="min-h-screen max-w-md mx-auto bg-white shadow-xl min-h-[100dvh] relative overflow-hidden">
          {children}
        </main>
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="w-full max-w-md pointer-events-auto">
            <BottomNav />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Toaster } from "react-hot-toast"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Odin Healthcare | Premium PCD Pharmaceutical Products",
    template: "%s | Odin Healthcare",
  },
  description:
    "Odin Healthcare Pvt Ltd provides high-quality pharmaceutical products including tablets, capsules, injections, and more. GMP & ISO certified PCD pharma partner for reliable healthcare solutions.",
  keywords: [
    "Odin Healthcare Pvt Ltd",
    "PCD pharma",
    "pharmaceutical products",
    "tablets",
    "capsules",
    "injections",
    "healthcare",
    "GMP certified",
    "ISO certified",
    "pharmaceutical distributor",
    "medicine supplier",
  ],
  generator: "v0.app",
  robots: "index, follow",
  authors: [{ name: "Odin Healthcare" }],
  creator: "Odin Healthcare",
  publisher: "Odin Healthcare",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    title: "Odin Healthcare | Premium PCD Pharmaceutical Products",
    description: "Discover high-quality pharmaceutical solutions for your healthcare needs.",
    url: "https://odinhealthcare.in",
    siteName: "Odin Healthcare",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Odin Healthcare - Premium Pharmaceutical Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Odin Healthcare | Premium PCD Pharmaceutical Products",
    description: "High-quality pharmaceutical solutions from Odin Healthcare",
    creator: "@odinhealth",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://odinhealthcare.in",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1c3a70" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Odin Healthcare",
              description: "Premium PCD Pharmaceutical Products and Healthcare Solutions",
              url: "https://odinhealthcare.in",
              telephone: "+919218630464",
              email: "info@odinhealth.in",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Plot no : 1",
                addressLocality: "Chambaghat, Industrial area, Solan",
                addressRegion: "Himachal Pradesh",
                postalCode: "173213",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/odinhc",
              ],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <Navigation />
        {children}
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  )
}

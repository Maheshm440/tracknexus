import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { HeaderWrapper } from "@/components/header-wrapper"
import { FooterWrapper } from "@/components/footer-wrapper"
import { MailButtonWrapper } from "@/components/mail-button-wrapper"
import { organizationSchema, softwareApplicationSchema } from "@/lib/seo/schemas"
import { CookieConsentProvider } from "@/components/cookies"
import { getConsentDefaultScript } from "@/lib/tracking/gtag-consent"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#096EB6",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://tracknexus.com"),
  title: "Track Nexus – AI-Powered Time Tracking Software for Modern Teams",
  description: "Track work hours effortlessly and boost team productivity with AI-powered insights. Perfect for remote, hybrid, and in-office teams.",
  keywords: "Time tracking software, Employee time tracking, Productivity tracking software, Employee monitoring software, Automatic attendance tracking, Workforce analytics software, Employee productivity software, best productivity tracker, productivity tracker app, Employee time management software, Automated time tracking software, Time management software",
  authors: [{ name: "Track Nexus" }],
  creator: "Track Nexus",
  publisher: "Track Nexus",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tracknexus.com",
    title: "Track Nexus – AI-Powered Time Tracking Software for Modern Teams",
    description: "Track work hours effortlessly and boost team productivity with AI-powered insights. Perfect for remote, hybrid, and in-office teams.",
    siteName: "Track Nexus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Track Nexus - AI-Powered Time Tracking Software Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Track Nexus – AI-Powered Time Tracking Software for Modern Teams",
    description: "Track work hours effortlessly and boost team productivity with AI-powered insights. Perfect for remote, hybrid, and in-office teams.",
    images: ["/twitter-image.jpg"],
  },
  verification: {
    other: {
      'msvalidate.01': '5A97D86AD48A3D922BC1B4A53876E0E8',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Additional preconnects for tracking pixels */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://snap.licdn.com" />
        <link rel="dns-prefetch" href="https://snap.licdn.com" />
        <link rel="preconnect" href="https://static.ads-twitter.com" />
        <link rel="dns-prefetch" href="https://static.ads-twitter.com" />

        <link rel="canonical" href="https://tracknexus.com" />
        <link rel="icon" href="/clock-logo.png" />
        <link rel="apple-touch-icon" href="/clock-logo.png" />
        <meta name="format-detection" content="telephone=no" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />

        {/*
          CRITICAL: Google Consent Mode v2 - Initialize with default denied state
          This MUST run before any tracking scripts are loaded (Google 2025 compliance)
        */}
        <script
          dangerouslySetInnerHTML={{ __html: getConsentDefaultScript() }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <CookieConsentProvider>
          <HeaderWrapper />
          <main>{children}</main>
          <FooterWrapper />
          <MailButtonWrapper />
          {/* Cookie consent banner is rendered by CookieConsentProvider */}
          {/* Tracking pixels are loaded conditionally based on user consent */}
        </CookieConsentProvider>
      </body>
    </html>
  )
}

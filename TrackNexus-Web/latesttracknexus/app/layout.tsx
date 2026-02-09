import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { HeaderWrapper } from "@/components/header-wrapper"
import { FooterWrapper } from "@/components/footer-wrapper"
import { MailButtonWrapper } from "@/components/mail-button-wrapper"
import { ScrollToTop } from "@/components/scroll-to-top"
import { organizationSchema, softwareApplicationSchema, websiteSchema, speakableSchema } from "@/lib/seo/schemas"
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
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // TODO: Replace with actual Google Search Console verification code
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="format-detection" content="telephone=no" />

        {/* Hreflang tags for international SEO */}
        <link rel="alternate" hrefLang="en" href="https://tracknexus.com" />
        <link rel="alternate" hrefLang="en-US" href="https://tracknexus.com" />
        <link rel="alternate" hrefLang="en-GB" href="https://tracknexus.com" />
        <link rel="alternate" hrefLang="en-IN" href="https://tracknexus.com" />
        <link rel="alternate" hrefLang="x-default" href="https://tracknexus.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
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
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Skip to main content
        </a>
        <CookieConsentProvider>
          <ScrollToTop />
          <HeaderWrapper />
          <main id="main-content" role="main" tabIndex={-1} className="pt-[64px]">{children}</main>
          <FooterWrapper />
          <MailButtonWrapper />
          {/* Cookie consent banner is rendered by CookieConsentProvider */}
          {/* Tracking pixels are loaded conditionally based on user consent */}
        </CookieConsentProvider>
      </body>
    </html>
  )
}

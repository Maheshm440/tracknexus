import type React from "react"
import type { Metadata, Viewport } from "next"
import { ADLaM_Display } from "next/font/google"
import "./globals.css"
import { HeaderWrapper } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { MailIcon, PhoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const adlam = ADLaM_Display({
  subsets: ["latin"],
  weight: "400",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#096EB6",
}

export const metadata: Metadata = {
  title: "Track Nexus– Smarter Time Tracking & Productivity Insights for Modern Teams",
  description: "Track Nexus helps you understand team performance, track work hours effortlessly, and boost productivity with real-time insights. Perfect for remote, hybrid, and in-office teams looking to work smarter, not harder.",
  keywords: "Time tracking software, Employee time tracking, Productivity tracking software, Employee monitoring software, Automatic attendance tracking, Workforce analytics software, Employee productivity software, best productivity tracker, productivity tracker app, Employee time management software, Automated time tracking software, Time management software",
  authors: [{ name: "Track Nexus" }],
  creator: "Track Nexus",
  publisher: "Track Nexus",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tracknexus.com",
    title: "Track Nexus– Smarter Time Tracking & Productivity Insights for Modern Teams",
    description: "Track Nexus helps you understand team performance, track work hours effortlessly, and boost productivity with real-time insights. Perfect for remote, hybrid, and in-office teams looking to work smarter, not harder.",
    siteName: "Track Nexus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Track Nexus - Time Tracking Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Track Nexus– Smarter Time Tracking & Productivity Insights for Modern Teams",
    description: "Track Nexus helps you understand team performance, track work hours effortlessly, and boost productivity with real-time insights. Perfect for remote, hybrid, and in-office teams looking to work smarter, not harder.",
    images: ["/twitter-image.jpg"],
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
        <link rel="canonical" href="https://tracknexus.com" />
        <link rel="icon" href="clock-logo.png" />
        <link rel="apple-touch-icon" href="clock-logo.png" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YGY3NCVSVV"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YGY3NCVSVV');
          `
        }} />
      </head>
      <body className={`${adlam.className} overflow-x-hidden`}>
        <HeaderWrapper />
        <main>{children}</main>
        <Footer />
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="mailto:Support@tracknextus.in"
                className="fixed bottom-6 right-6 z-50 bg-highlight text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 transform hover:scale-110"
              >
                <MailIcon className="w-6 h-6" />
                <span className="sr-only">Mail Us</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mail Us</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </body>
     
    </html>
  )
}

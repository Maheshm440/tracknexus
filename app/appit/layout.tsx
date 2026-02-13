import { Metadata } from "next"

export const metadata: Metadata = {
  title: "App Integration & IT Management | Track Nexus",
  description: "Manage application access, IT assets, and software usage tracking with Track Nexus integrated tools for modern IT departments.",
  keywords: "app management, IT tools, software tracking, application monitoring, IT management",
  alternates: { canonical: "https://tracknexus.com/appit" },
  openGraph: {
    title: "App Integration & IT Management | Track Nexus",
    description: "Manage application access and software usage tracking for modern IT departments.",
    url: "https://tracknexus.com/appit",
  },
}

export default function AppitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

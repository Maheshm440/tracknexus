import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Services | Track Nexus",
  description: "Track Nexus professional services including implementation support, custom integrations, training, and dedicated account management for enterprises.",
  keywords: "track nexus services, implementation support, custom integrations, enterprise training",
  alternates: { canonical: "https://tracknexus.com/services" },
  openGraph: {
    title: "Professional Services | Track Nexus",
    description: "Implementation support, custom integrations, and enterprise training.",
    url: "https://tracknexus.com/services",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Support | Track Nexus",
  description: "Get help with Track Nexus. Browse our support resources, FAQs, troubleshooting guides, and contact our support team for technical assistance.",
  keywords: "track nexus support, help desk, customer service, technical support, FAQ",
  alternates: { canonical: "https://tracknexus.com/support" },
  openGraph: {
    title: "Customer Support | Track Nexus",
    description: "Browse support resources, FAQs, and contact our support team.",
    url: "https://tracknexus.com/support",
  },
}

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

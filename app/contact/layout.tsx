import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Track Nexus | Get in Touch with Our Team",
  description: "Have questions about Track Nexus features, pricing, or support? Reach out to our friendly team for assistance, demos, or partnership inquiries. We're here to help you boost productivity.",
  keywords: "contact track nexus, support, customer service, demo request, partnership inquiries, time tracking support",
  alternates: { canonical: "https://tracknexus.com/contact" },
  openGraph: {
    title: "Contact Track Nexus | Get in Touch",
    description: "Reach out to our friendly team for assistance, demos, or partnership inquiries.",
    url: "https://tracknexus.com/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 
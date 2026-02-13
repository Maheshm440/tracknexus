import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resources & Learning Center | Track Nexus",
  description: "Explore Track Nexus resources including blog articles, case studies, webinars, whitepapers, and help center guides on employee productivity and time tracking.",
  keywords: "employee monitoring resources, time tracking guides, productivity tips, workforce management resources",
  alternates: { canonical: "https://tracknexus.com/resources" },
  openGraph: {
    title: "Resources & Learning Center | Track Nexus",
    description: "Explore resources on employee productivity, time tracking, and workforce management.",
    url: "https://tracknexus.com/resources",
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

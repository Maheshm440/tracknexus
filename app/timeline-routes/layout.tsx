import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Daily Timeline & GPS Routes | Track Nexus",
  description: "View complete daily timelines with GPS route tracking. Perfect for field teams, delivery drivers, and remote workforce management.",
  keywords: "GPS tracking, route tracking, daily timeline, location tracking, field team tracking, route history",
  alternates: { canonical: "https://tracknexus.com/timeline-routes" },
  openGraph: {
    title: "Daily Timeline & GPS Routes | Track Nexus",
    description: "View complete daily timelines with GPS route tracking.",
    url: "https://tracknexus.com/timeline-routes",
  },
}

export default function TimelineRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

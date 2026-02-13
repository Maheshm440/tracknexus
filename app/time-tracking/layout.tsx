import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('time-tracking')

export default function TimeTrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('activity-logs')

export default function ActivityLogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

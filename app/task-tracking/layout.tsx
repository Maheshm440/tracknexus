import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('task-tracking')

export default function TaskTrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

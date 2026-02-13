import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('audio-tracking')

export default function AudioTrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

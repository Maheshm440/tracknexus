import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('moonlight-detection')

export default function MoonlightDetectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

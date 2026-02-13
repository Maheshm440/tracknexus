import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('keystroke')

export default function KeystrokeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

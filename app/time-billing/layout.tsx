import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('time-billing')

export default function TimeBillingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

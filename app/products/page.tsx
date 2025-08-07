import type { Metadata } from "next"
import ProductsClientPage from "./ProductsClientPage"

export const metadata: Metadata = {
  title: "Products - Track Nexus | Advanced Time Tracking Solutions",
  description:
    "Discover Track Nexus products for intelligent employee tracking, project management, and workforce optimization. Start free today.",
  keywords: "time tracking software, employee monitoring, project management, workforce analytics, productivity tools",
}

export default function ProductsPage() {
  return <ProductsClientPage />
}

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "HR Management Software | Track Nexus",
    description: "Centralized HR management with employee records, onboarding, and workforce administration. Integrated with time tracking and payroll systems.",
    keywords: "HR management, employee management, workforce administration, HR software, employee records, onboarding",
    alternates: { canonical: "https://tracknexus.com/hr-management" },
    openGraph: {
        title: "HR Management Software | Track Nexus",
        description: "Centralized HR management with employee records and workforce administration.",
        url: "https://tracknexus.com/hr-management",
    },
}

export default function HRManagementLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 
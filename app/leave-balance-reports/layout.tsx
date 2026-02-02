import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Leave Balance & Time-Off Tracking | Track Nexus",
    description: "Track employee leave balances, PTO, and time-off requests. Automated accruals, approval workflows, and comprehensive absence management.",
    keywords: "leave tracking, PTO management, time-off tracking, leave balance, absence management, vacation tracking",
    alternates: { canonical: "https://tracknexus.com/leave-balance-reports" },
    openGraph: {
        title: "Leave Balance & Time-Off Tracking | Track Nexus",
        description: "Track employee leave balances, PTO, and time-off requests with automated workflows.",
        url: "https://tracknexus.com/leave-balance-reports",
    },
}

export default function LeaveBalanceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 
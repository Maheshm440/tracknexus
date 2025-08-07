"use client";

import { useState } from "react";
import { Clock, TrendingUp, Monitor, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const tabsData = {
  "time-tracking": {
    title: "Time Tracking & Billing",
    description:
      "Ensures precise tracking of work hours to avoid manual errors and improve payroll accuracy.",
    icon: Clock,
    features: [
      {
        title: "Time Tracking",
        description:
          "Accurately track employee hours, automatically or manually",
        href: "time-tracking",
      },
      {
        title: "Timeline & Routes",
        description: "See daily logs and GPS routes of activities",
        href: "timeline-routes",
      },
      {
        title: "Activity Logs",
        description: "Keep detailed logs of time entries, breaks, and sessions",
        href: "activity-logs",
      },
      {
        title: "Task Tracking",
        description:
          "Track time per task to assess productivity and balance workload",
        href: "task-tracking",
      },
      {
        title: "Time & Billing",
        description:
          "Turn tracked hours into billable entries for invoicing and payroll",
        href: "time-billing",
      },
    ],
  },
  productivity: {
    title: "Productivity & Performance",
    description:
      "Understand team efficiency through data-driven metrics and real-time reporting.",
    icon: TrendingUp,
    features: [
      {
        title: "Employee Productivity",
        description:
          "Monitor how efficiently employees utilize their work hours",
        href: "employee-productivity",
      },
      {
        title: "Usage Analytics",
        description: "Track which apps and websites are used during work hours",
        href: "usage-analytics",
      },
      {
        title: "Keystrokes",
        description:
          "Count and analyze typing activity to gauge employee engagement",
        href: "keystroke",
      },
      {
        title: "Productivity Reports",
        description:
          "Generate performance summaries to highlight trends and bottlenecks",
        href: "productivity-reports",
      },
      {
        title: "Insight Dashboards",
        description:
          "Visualize productivity data with graphs and performance insights",
        href: "insight-dashboards",
      },
    ],
  },
  monitoring: {
    title: "Monitoring & Oversight",
    description:
      "Track user actions and screen activity to ensure transparency and control.",
    icon: Monitor,
    features: [
      {
        title: "Monitoring",
        description:
          "Real-time tracking of employee screen and activity status",
        href: "monitoring",
      },
      {
        title: "Audio Tracking",
        description:
          "Detect and analyze background noise or conversation presence",
        href: "audio-tracking",
      },
      {
        title: "Moonlight Detection",
        description:
          "Identify work done on external or side projects during company time",
        href: "moonlight-detection",
      },
      {
        title: "Office TV",
        description:
          "Display live dashboards and work metrics on shared office screens",
        href: "office-tv",
      },
      {
        title: "Apps & Website Usage",
        description:
          "See what applications and websites employees use during work",
        href: "apps-website",
      },
    ],
  },
  "hr-admin": {
    title: "Attendance, HR & Admin",
    description:
      "Simplify HR tasks, manage attendance, and streamline team operations.",
    icon: Users,
    features: [
      {
        title: "Project Management",
        description: "Create, assign, and track progress of projects and tasks",
        href: "project-management",
      },
      {
        title: "Integrations",
        description:
          "Sync with payroll, calendars, HR systems, and third-party apps",
        href: "integrations",
      },
      {
        title: "Leave Balance Reports",
        description: "Track accruals, approvals, and remaining time off",
        href: "leave-balance-reports",
      },
      {
        title: "Location Activity",
        description:
          "Use GPS to confirm where employees check in or perform work",
        href: "location-activity",
      },
      {
        title: "HR Management",
        description:
          "Centralize employee records, departments, and permissions",
        href: "hr-management",
      },
      {
        title: "Facial Recognition",
        description:
          "Use AI-based face detection for fast, contactless attendance",
        href: "facial-recognition",
      },
    ],
  },
};

const navigationItems = [
  { id: "time-tracking", label: "Time Tracking & Billing", active: true },
  { id: "productivity", label: "Productivity & Performance", active: false },
  { id: "monitoring", label: "Monitoring & Oversight", active: false },
  { id: "hr-admin", label: "Attendance, HR & Admin", active: false },
];

interface AiFeaturesForModernTeamsProps {
  onAnyClick?: () => void;
}

export default function AiFeaturesForModernTeams({
  onAnyClick,
}: AiFeaturesForModernTeamsProps) {
  const [activeTab, setActiveTab] = useState("time-tracking");
  const currentData = tabsData[activeTab as keyof typeof tabsData];
  const IconComponent = currentData.icon;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl border-[2px] border-[#6D6D6D33] shadow-sm overflow-hidden">
        <div className="flex min-h-[400px]">
          {/* Left Navigation */}
          <div className="w-[20rem] p-6">
            <nav className="space-y-5 border-gray-200 border-r h-full pr-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onMouseEnter={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                    activeTab === item.id
                      ? "bg-[#096EB6] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeTab === item.id
                        ? "text-white"
                        : "opacity-0 group-hover:opacity-100 text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-5">
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-3">
              <div className="rounded-full flex items-center justify-center">
                <IconComponent className="w-9 h-9 text-[#096EB6]" />
              </div>
              <div>
                <h2 className="text-md font-semibold text-gray-900">
                  {currentData.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {currentData.description}
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {currentData.features.map((feature, index) =>
                "href" in feature ? (
                  <Link
                    onClick={onAnyClick}
                    href={`/${feature.href}`}
                    key={index}
                    className="space-y-2"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </Link>
                ) : (
                  <div onClick={onAnyClick} key={index} className="space-y-2">
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

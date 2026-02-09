"use client";

import { ChevronDown, Clock, MoveRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const tabs = [
  {
    key: "real-time",
    title: "Time Tracking & Billing",
    subtitle: "Work Metrics",
    emphasized: true, // first one is visually different
  },
  {
    key: "activity",
    title: "Productivity & Performance",
    subtitle: "Recognition",
  },
  {
    key: "Monitoring & Oversight",
    title: "AI Focus Tips",
  },
  {
    key: "reports",
    title: "Attendance, HR & Admin",
    subtitle: "Insights",
  },
];

const features = [
  {
    title: "Time Tracking",
    description: "Accurate track working hours, automatically or manually",
  },
  {
    title: "Task Tracking",
    description:
      "Track time per task to assess productivity and balance workload",
  },
  {
    title: "Timeline & Routes",
    description: "See daily logs and GPS routes of activities",
  },
  {
    title: "Time & Billing",
    description:
      "Turn tracked hours into billable entries for invoicing and payroll",
  },
  {
    title: "Activity Logs",
    description: "Keep detailed logs of time entries, breaks, and sessions",
  },
];

export function LandingTab() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const tabImages = {
    "real-time": "/images/time-tracking/ai-powered-automation.jpg", // Current image as default
    activity: "/images/time-tracking/real-time-visibility.jpg",
    focus: "/images/time-tracking/precision-without-effort.jpg",
    reports: "/images/time-tracking/ai-powered-automation.jpg",
  };

  const getCurrentImage = () => {
    if (hoveredTab && tabImages[hoveredTab as keyof typeof tabImages]) {
      return tabImages[hoveredTab as keyof typeof tabImages];
    }
    return tabImages["real-time"]; // Default image
  };
  return (
    <div className="min-h-screen bg-[#ffffff] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#096eb6] mb-6">
            Productivity & AI Insights
          </h1>
          <p className="text-lg md:text-xl text-[#252525] max-w-4xl mx-auto leading-relaxed">
            Track Nexus analyzes your work patterns to deliver actionable
            insights that boost productivity and streamline daily tasks.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-12 border-2 border-gray-200 rounded-3xl">
          {/* Feature Buttons */}
          <div className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant="ghost"
                className={`h-16 text-[#096eb6] hover:bg-[#096eb6] hover:text-white rounded-2xl text-base font-semibold flex items-center justify-between px-6 transition-all duration-300`}
                onMouseEnter={() => setHoveredTab(tab.key)}
              >
                <span className="flex-1 text-center">
                  {tab.title}
                  {tab.subtitle && (
                    <>
                      <br />
                      {tab.subtitle}
                    </>
                  )}
                </span>
                <MoveRight className="w-5 h-5 ml-2 text-white " />
              </Button>
            ))}
          </div>

          {/* Main Content Card */}
          <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* Header Section */}
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#096eb6] rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#252525] mb-2">
                  Time Accuracy
                </h2>
                <p className="text-[#666666] text-sm leading-relaxed">
                  Ensures precise tracking of work hours to avoid manual errors
                  and improve payroll accuracy.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-none bg-transparent"
                  >
                    <CardContent className="p-0">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1"></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#252525] mb-1 text-base">
                            {feature.title}
                          </h3>
                          <p className="text-[#666666] text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

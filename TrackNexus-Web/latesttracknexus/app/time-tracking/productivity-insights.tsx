"use client";

import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Component() {
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

        {/* Feature Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Button
            variant="outline"
            className="h-16 hover:bg-[#096eb6] text-[#096eb6] hover:text-white  rounded-2xl text-base font-semibold flex items-center justify-between px-6 transition-all duration-300"
            onMouseEnter={() => setHoveredTab("real-time")}
          >
            <span className="flex-1 text-center">
              Real-Time
              <br />
              Work Metrics
            </span>
            <ChevronDown className="w-5 h-5 ml-2" />
          </Button>

          <Button
            variant="outline"
            className="h-16 border-2 border-[#096eb6] text-[#096eb6] hover:bg-[#096eb6] hover:text-white rounded-2xl text-base font-semibold flex items-center justify-between px-6 bg-transparent transition-all duration-300"
            onMouseEnter={() => setHoveredTab("activity")}
          >
            <span className="flex-1 text-center">
              Activity
              <br />
              Recognition
            </span>
            <ChevronDown className="w-5 h-5 ml-2" />
          </Button>

          <Button
            variant="outline"
            className="h-16 border-2 border-[#096eb6] text-[#096eb6] hover:bg-[#096eb6] hover:text-white rounded-2xl text-base font-semibold flex items-center justify-between px-6 bg-transparent transition-all duration-300"
            onMouseEnter={() => setHoveredTab("focus")}
          >
            <span className="flex-1 text-center">AI Focus Tips</span>
            <ChevronDown className="w-5 h-5 ml-2" />
          </Button>

          <Button
            variant="outline"
            className="h-16 border-2 border-[#096eb6] text-[#096eb6] hover:bg-[#096eb6] hover:text-white rounded-2xl text-base font-semibold flex items-center justify-between px-6 bg-transparent transition-all duration-300"
            onMouseEnter={() => setHoveredTab("reports")}
          >
            <span className="flex-1 text-center">
              AI Reports &<br />
              Insights
            </span>
            <ChevronDown className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Main Content Card */}
        <Card className="rounded-3xl border-2 border-gray-200 overflow-hidden p-10">
          <CardContent className="p-0">
            <div className="relative overflow-hidden">
              <Image
                src={getCurrentImage() || "/placeholder.svg"}
                alt="Team working with analytics and productivity charts"
                width={1140}
                height={390}
                className="object-cover w-full h-auto transition-all duration-500 ease-in-out rounded-2xl"
                key={getCurrentImage()} // Force re-render for smooth transition
              />
            </div>
            <div className="p-8">
              <p className="text-lg text-[#252525] leading-relaxed transition-all duration-300">
                {hoveredTab === "activity" &&
                  "Monitor and categorize work activities automatically. Our AI recognizes patterns in your workflow to provide detailed breakdowns of how time is spent across different tasks and projects."}
                {hoveredTab === "focus" &&
                  "Receive personalized AI-powered recommendations to optimize your focus and minimize distractions. Get smart suggestions for better work habits and productivity improvements."}
                {hoveredTab === "reports" &&
                  "Access comprehensive AI-generated reports and insights about your productivity patterns. Discover trends, identify opportunities for improvement, and track your progress over time."}
                {(!hoveredTab || hoveredTab === "real-time") &&
                  "Get instant visibility into tasks, time spent, and team productivity as work happens. Track performance in real time, identify bottlenecks early, and make faster, data-driven decisions to boost efficiency."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

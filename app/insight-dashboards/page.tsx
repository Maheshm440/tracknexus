import Banner from "@/components/banner";
import ExportableBilling from "@/components/ExportableBilling";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import { InsightsFeatureCardsSection } from "@/components/insightsFeatureCardsSection";
import OurAIIntegrations from "@/components/OurAIIntegrations";
import SectionHeader from "@/components/section-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Card } from "@/components/ui/card";
import { Clock, Monitor, Section, TrendingUp } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

const cards = [
  {
    id: "app-website-monitoring-ai-powered",
    title: "App & Website Monitoring (AI-Powered)",
    description:
      "Track Nexus uses AI to monitor app usage and website activity in real time—revealing focus patterns, distractions, and productivity levels instantly.",
    color: "#86CA00",
    icon: <Monitor size={50} style={{ color: "#86CA00" }} />,
  },
  {
    id: "idle-time-vs-active-time-ai-powered-insight",
    title: "Idle Time vs Active Time (AI-Powered Insight)",
    description:
      "Track Nexus accurately detects when users are actively working versus idle—giving you a clear picture of productivity patterns.",
    color: "#0DAA97",
    icon: <Clock size={50} style={{ color: "#0DAA97" }} />,
  },
  {
    id: "focus-score-by-task-ai-powered",
    title: "Focus Score by Task (AI-Powered)",
    description:
      "Track Nexus analyzes attention levels and activity to assign a focus score for each task—helping you spot where deep work happens.",
    color: "#037EB9",
    icon: <TrendingUp size={50} style={{ color: "#037EB9" }} />,
  },
];

const insightsData = [
  {
    text: "Segment insights by team, role, or user",
    color: "#D8BFD8", // A light purple color, inspired by the image
  },
  {
    text: "AI-powered detection of work habits",
    color: "#FFA07A", // A light orange/coral color, inspired by the image
  },
  {
    text: "Analyze how apps and websites are used",
    color: "#ADD8E6", // A light blue color, inspired by the image
  },
];

// Daily & Weekly Productivity Reports – Powered by AI & Track Nexus
const cards2: {
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}[] = [
  {
    subtitle: "Exportable Reports (PDF, CSV)",
    description:
      "Track Nexus makes it simple to export detailed productivity reports in both PDF and CSV formats—perfect for sharing with clients, HR, or leadership teams. Each report is AI-generated, highlighting key metrics like active hours, app usage, task completion rates, and focus trends. Whether you're preparing for a performance review, weekly sync, or compliance check, these reports are clear, customizable, and ready to use—no manual formatting needed.",
    imageSrc: "/img.jpg",
    imageAlt: "Exportable Reports",
    imagePosition: "right",
  },
  {
    subtitle: "Summary by Team/Individual",
    description:
      "Track Nexus delivers detailed, AI-generated summaries that break down productivity and performance by both team and individual. These insights include time spent on tasks, active vs idle time, focus scores, and tool usage—making it easy to see how work is happening across your organization. Whether you're managing a small group or a large department, Track Nexus helps you compare performance, track improvement over time, and personalize coaching or support.",
    imageSrc: "/img.jpg",
    imageAlt: "Summary by Team/Individual",
    imagePosition: "left",
  },
  {
    subtitle: "Customizable Filters",
    description:
      "Drill deep into your data with fully customizable filters. Track Nexus allows you to segment productivity insights by user, team, role, date range, project, app usage, task type, and more. Whether you're analyzing weekly output, comparing departments, or spotting performance gaps, these AI-enhanced filters help surface exactly what you need—fast. Tailor your view to focus on high performers, identify trends, or flag inefficiencies in specific workflows. No more digging through raw data—Track Nexus delivers targeted visibility so you can take meaningful action with precision.",
    imageSrc: "/img.jpg",
    imageAlt: "Customizable Filters",
    imagePosition: "right",
  },
];

// Data-Driven & Dynamic – Powered by AI in Track Nexus
const performanceTrends: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}[] = [
  {
    title: "   Identify top-performing time slots",
    description:
      "Track Nexus allows you to monitor software engagement across daily, weekly, and monthly intervals—giving you a clear picture of how tools are being used over time. Whether it’s spotting a sudden drop in usage, identifying peak activity hours, or understanding which apps are gaining or losing traction, the AI-powered insights help you make informed decisions about your tech stack and team workflows. By visualizing trends across timeframes, you can optimize tool adoption, reduce digital distractions, and ensure your team is using the right platforms to stay productive.",
    imagePosition: "right",
    imageAlt: "Analytics dashboard showing software engagement trends",
    imageSrc: "/images/usage-analytics/3-1.jpg",
  },
  {
    title: "Discover hidden burnout or overload signals",
    description:
      "Track Nexus leverages advanced AI to detect early signs of burnout and work overload by analyzing real-time behavioral data, such as prolonged active hours, reduced focus, irregular engagement patterns, and tool-switching fatigue. By tracking daily, weekly, and monthly trends, it identifies when employees are overextending, under-engaging, or working outside normal productivity rhythms—often before they verbalize stress or disengagement. These subtle indicators, often missed in traditional monitoring, empower managers to take timely action—rebalancing workloads, initiating support, or preventing long-term burnout. With Track Nexus, you’re not just measuring productivity; you’re protecting it by supporting the well-being of your team.",
    imagePosition: "left",
    imageAlt: "Stressed man with laptop and hand on forehead",
    imageSrc: "/images/usage-analytics/3-2.jpg",
  },
  {
    title: "Spot top-performing hours and platforms effortlessly",
    description:
      "Track Nexus uses AI to help you effortlessly identify the hours when your team is most productive and the platforms that contribute the most to individual and team performance. By analyzing activity patterns and engagement levels across different times of day and tools, it reveals what’s been effective and when—which software drives meaningful output. These insights make it easier to optimize schedules, assign tasks strategically, and ensure your team works at their most effective times—without guesswork.",
    imagePosition: "right",
    imageAlt: "Businesswoman analyzing digital data at night",
    imageSrc: "/images/usage-analytics/3-3.jpg",
  },
];

export default function InsightDashboardPage() {
  return (
    <div>
      <Banner
        mediaType="video"
        mediaSrc="/images/insight-dashboard/banner.mp4"
        heading="AI Smarts for Team Performance – Track Nexus"
        subheading="Track Nexus uses AI to reveal patterns, streamline work, and show team performance—clearly and smartly."
      />
      <ImageTextSection
        title="What Are Insight Dashboards?"
        titleColor="text-highlight"
        subtitle="Smarter Visibility, Stronger Teams"
        description="Track Nexus dashboards offer a clear lens into your team’s activity, productivity, and billing readiness—powered by AI for real-time intelligence.Get instant, visual insights into how work is done across teams and timelines. With AI analyzing patterns behind the scenes, Track Nexs reveals performance trends, idle time, and project billing accuracy—enabling smarter planning and stronger outcomes."
        imageSrc="/images/insight-dashboard/1.gif"
        imageAlt=""
        imagePosition="right"
      />
      {/* */}

      {/* Live Work Analytics – Track Nexus*/}
      <SectionHeader
        title="Live Work Analytics – Track Nexus"
        subtitle="AI-powered analytics that deliver instant insights into productivity, focus, and real-time team activity"
      />
      <ImageTextSection
        videoSrc="/images/insight-dashboard/2.mp4"
        description="Track Nexus captures live activity data and transforms it into clear, actionable visualizations. Monitor real-time workflows, app usage, and focus time without disrupting your team. Instantly spot bottlenecks, idle time, or unproductive patterns—allowing you to take action before they impact performance.
Powered by AI, Track Nexus reveals deeper productivity trends and behavior patterns. From peak work hours to task-switching habits, get a full picture of how work actually happens. Use these insights to guide team coaching, improve time management, and drive smarter decisions across the board."
      />
      {/* AI-Powered Performance Trends – AI + Track Nexus */}
      <SectionHeader
        title="AI-Powered Performance Trends – AI + Track Nexus"
        subtitle="Track Nexus uses AI to reveal top performers, key tools, and peak productivity hours"
      />
      <div>
        {performanceTrends.map((x,i) => (
          <ImageTextSection
          key={i}
            imageSrc={x.imageSrc}
            imageAlt={x.imageAlt}
            title={x.title}
            description={x.description}
            imagePosition={x.imagePosition}
          />
        ))}
      </div>
      {/* AI-Enhanced Exportable Billing Dashboards – Track Nexusd */}
      <section className="container mx-auto">
      <SectionHeader title="AI-Enhanced Exportable Billing Dashboards – Track Nexus" subtitle=""/>
      <ExportableBilling/>
      </section>
      
      <OurAIIntegrations />
      <TestimonialsSection />
      <FAQSection faqs={defaultHomepageFaqs} />
    </div>
  );
}

import Banner from "@/components/banner";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import { InsightsFeatureCardsSection } from "@/components/insightsFeatureCardsSection";
import OurAIIntegrations from "@/components/OurAIIntegrations";
import SectionHeader from "@/components/section-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TestimonialsSectionTwo } from "@/components/testimonials-section-two";
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
const insights: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}[] = [
  {
    title: "Track software engagement by time period",
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

export default function UsageAnalyticsPage() {
  return (
    <div>
      <Banner
        mediaType="video"
        mediaSrc="/images/usage-analytics/banner.mp4"
        heading="AI Smarts for Team Performance – Track Nexus"
        subheading="Track Nexus uses AI to reveal patterns, streamline work, and show team performance—clearly and smartly."
      />
      <ImageTextSection
        title="AI-Driven Real-Time Tracking – Track Nexus"
        titleColor="text-highlight"
        subtitle="See productivity unfold live—with AI insights that make every second count."
        description="Track Nexus uses intelligent AI tracking to monitor app usage, website visits, and activity levels—giving you real-time visibility into how your team works, minute by minute. Understand which tools are being used, where time is spent, and how engaged your team is throughout the day. No more guesswork—just accurate, actionable productivity data to help you optimize performance and guide smarter decisions."
        imageSrc="/images/usage-analytics/b.gif"
        imageAlt="AI-Driven Real-Time Tracking"
        imagePosition="right"
      />
      {/* */}
      <div className="flex justify-center items-center gap-5 mb-20">
        {insightsData.map((card,i) => (
          <div
          key={i}
            className="w-64 h-64  p-2 clip-hexagon"
            style={{ backgroundColor: card.color }}
          >
            <div className="w-full h-full bg-white clip-hexagon flex items-center justify-center">
              <div className="w-40 h-40 bg-gray-300 clip-hexagon flex items-center justify-center">
                <div
                  className="w-[98%] h-[98%] bg-white clip-hexagon flex items-center justify-center text-center p-5 "
                  style={{ color: card.color }}
                >
                  {card.text}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI-Driven Comparisons. Smarter Benchmarks */}
      <SectionHeader
        title="AI-Driven Comparisons. Smarter Benchmarks. Better Teams – Track Nexus"
        subtitle="AI Team Comparison & Benchmarks – Track Nexus"
      />
      <ImageTextSection
        imageSrc="/images/usage-analytics/2.jpg"
        imageAlt="AI-Driven Comparisons. Smarter Benchmarks. Better Teams – Track Nexus"
        description="Track Nexus provides weekly AI-generated summaries that break down team performance, highlight shifts in productivity, and uncover unusual activity patterns. These reports give you a clear, digestible overview of how time is being spent, which tools are being used effectively, and where inefficiencies may be creeping in. With consistent updates, you can track progress over time, identify high performers, detect potential burnout, and address workflow disruptions before they become problems. It's not just data—it's real insight that helps you optimize team output, encourage smarter habits, and drive continuous improvement across your organization."
      />
      {/* Data-Driven & Dynamic – Powered by AI in Track Nexus */}
      <SectionHeader
        title="Data-Driven & Dynamic – Powered by AI in Track Nexus"
        subtitle="Track Nexus captures and analyzes usage behavior over time—revealing when, where, and how work happens across your team"
      />
      <div>
        {insights.map((x,i) => (
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
      {/* Exportable & Client-Ready Reports – Powered by AI in Track Nexus */}
      <section className="container mx-auto mb-20">
        <SectionHeader
          title="Exportable & Client-Ready Reports – Powered by AI in Track Nexus"
          subtitle="Download or schedule reports for HR, client reviews, or internal performance reviews with just a click"
        />
        <div className="flex items-center gap-10">
          <Image
            width={486}
            height={373}
            src={`/images/usage-analytics/4.png`}
            alt="Exportable & Client-Ready Reports – Powered by AI in Track Nexus"
          />
          <div className="flex flex-col gap-5">
        {[1,2,3].map((x,i) => (
          <Card className="flex p-4" key={i}>
            <Image src={`/images/usage-analytics/icon-1.png`} className="px-2" width={92} height={92} alt="" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xl">
                <span className="text-orange-400 text-3xl">01</span>
                One-click PDF exports
              </div>
              <p className="text-muted-foreground">
                Create a mobile-friendly, branded storefront with AI-driven
                layouts and behavior insights to boost engagement and
                conversions.
              </p>
            </div>
          </Card>
        ))}
          </div>
        </div>
      </section>
      <OurAIIntegrations />
      <TestimonialsSectionTwo />
      <FAQSection faqs={defaultHomepageFaqs} />
    </div>
  );
}

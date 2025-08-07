import Banner from "@/components/banner";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import { InsightsFeatureCardsSection } from "@/components/insightsFeatureCardsSection";
import OurAIIntegrations from "@/components/OurAIIntegrations";
import SectionHeader from "@/components/section-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Clock, Monitor, TrendingUp } from "lucide-react";
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

// Smarter Work Insights with AI – Track Nexus

// Daily & Weekly Productivity Reports – Powered by AI & Track Nexus
const cards3: {
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}[] = [
  {
    subtitle: "Exportable Reports (PDF, CSV)",
    description:
      "Track Nexus makes it simple to export detailed productivity reports in both PDF and CSV formats—perfect for sharing with clients, HR, or leadership teams. Each report is AI-generated, highlighting key metrics like active hours, app usage, task completion rates, and focus trends. Whether you’re preparing for a performance review, weekly sync, or compliance check, these reports are clear, customizable, and ready to use—no manual formatting needed.",
    imageSrc: "/images/productivity-reports/2.png",
    imageAlt: "Exportable Reports",
    imagePosition: "right",
  },
  {
    subtitle: "Summary by Team/Individual",
    description:
      "Track Nexus delivers detailed, AI-generated summaries that break down productivity and performance by both team and individual. These insights include time spent on tasks, active vs idle time, focus scores, and tool usage—making it easy to see how work is happening across your organization. Whether you’re managing a small group or a large department, Track Nexus helps you compare performance, track improvement over time, and personalize coaching or support.",
    imageSrc: "/images/productivity-reports/3.png",
    imageAlt: "Summary by Team/Individual",
    imagePosition: "left",
  },
  {
    subtitle: "Customizable Filters",
    description:
      "Drill deep into your data with fully customizable filters. Track Nexus allows you to segment productivity insights by user, team, role, date range, project, app usage, task type, and more. Whether you’re analyzing weekly output, comparing departments, or spotting performance gaps, these AI-enhanced filters help surface exactly what you need—fast. Tailor your view to focus on high performers, identify trends, or flag inefficiencies in specific workflows. No more digging through raw data—Track Nexus delivers targeted visibility so you can take meaningful action with precision.",
    imageSrc: "/images/productivity-reports/4.png",
    imageAlt: "Customizable Filters",
    imagePosition: "right",
  },
];

const imageWithText: {
  title: string;
  description: string;
  videoSrc: string;
  imagePosition: "left" | "right";
  iconListItems: {
    iconSrc: string;
    iconAlt: string;
    listTitle: string;
    listSubtitle: string;
  }[];
}[] = [
  {
    title: "Performance Heatmaps",
    description:
      "Track Nexus uses AI heatmaps to show when your team is most active—helping you align meetings, breaks, and workflows with peak focus times.",
    videoSrc: "/images/productivity-reports/v1.mp4",
    imagePosition: "left",
    iconListItems: [
      {
        iconSrc: "/monitor.png",
        iconAlt: "Bar Chart Icon",
        listTitle: "Productivity Patterns",
        listSubtitle:
          "Track Nexus visualizes when teams are most active or idle with easy-to-read, color-coded heatmaps.",
      },
      {
        iconSrc: "/monitor.png",
        iconAlt: "Line Chart Icon",
        listTitle: "Focus & Workload Insights",
        listSubtitle:
          "Identify peak hours, downtime, and workload gaps to optimize schedules and boost team performance.",
      },
    ],
  },
  {
    title: "Productivity Benchmarks & Alerts",
    description:
      "Track Nexus uses AI to set performance baselines and instantly notifies you of dips or unusual activity.",
    videoSrc: "/images/productivity-reports/v2.mp4",
    imagePosition: "right",
    iconListItems: [
      {
        iconSrc: "/monitor.png",
        iconAlt: "Activity Icon",
        listTitle: "Smart Productivity Benchmarks",
        listSubtitle:
          "Track Nexus uses AI to define baseline performance by analyzing real work patterns and engagement trends.",
      },
      {
        iconSrc: "/monitor.png",
        iconAlt: "Bell Icon",
        listTitle: "Real-Time Alerts",
        listSubtitle:
          "Get instant notifications when productivity drops or unusual activity is detected—so you can act fast.",
      },
    ],
  },
  {
    title: "Privacy-First Monitoring",
    description:
      "We believe in ethical tracking. Employees see what’s tracked, when, and why—helping you build trust while improving accountability.",
    imagePosition: "left",
    videoSrc: "/images/productivity-reports/v3.mp4",
    iconListItems: [
      {
        iconSrc: "/monitor.png",
        iconAlt: "Lock Icon",
        listTitle: "Privacy-Focused Design",
        listSubtitle:
          "Track Nexus avoids capturing personal or sensitive data, focusing only on work-related patterns.",
      },
      {
        iconSrc: "/monitor.png",
        iconAlt: "User Check Icon",
        listTitle: "Ethical Productivity Tracking",
        listSubtitle:
          "AI-powered insights that respect user boundaries while delivering clear, actionable data.",
      },
    ],
  },
];

export default function EmployeeProductivityPage() {
  return (
    <div>
      <Banner
        mediaType="video"
        mediaSrc="/images/productivity-reports/People_Statistical.mp4"
        heading="AI Smarts for Team Performance – Track Nexus"
        subheading="Track Nexus uses AI to reveal patterns, streamline work, and show team performance—clearly and smartly."
      />
      <ImageTextSection
        title="AI-Driven Real-Time Tracking – Track Nexus"
        titleColor="text-highlight"
        subtitle="See productivity unfold live—with AI insights that make every second count."
        description="Track Nexus uses intelligent AI tracking to monitor app usage, website visits, and activity levels—giving you real-time visibility into how your team works, minute by minute. Understand which tools are being used, where time is spent, and how engaged your team is throughout the day. No more guesswork—just accurate, actionable productivity data to help you optimize performance and guide smarter decisions."
        imageSrc="/images/productivity-reports/1.png"
        imageAlt="AI-Driven Real-Time Tracking"
        imagePosition="right"
      />
      <div className="flex justify-center items-center gap-5 mb-20">
        {cards.map((card,i) => (
          <div key={i} className="relative w-[24rem] h-[24rem] flex justify-center items-center">
            <div className="relative z-10 h-72 w-72 flex flex-col items-center text-center gap-4 border-2 border-gray-200 rounded-2xl p-4 bg-white">
              {/* <Image src="/monitor.png" alt="test" width={50} height={50} /> */}
              {/* <Monitor size={50} style={{color: card.color}}/> */}
              {card.icon}

              <div>App & Website Monitoring (AI-Powered)</div>
              <p>
                Track Nexus uses AI to monitor app usage and website activity in
                real time—revealing focus patterns, distractions, and
                productivity levels instantly.
              </p>
            </div>
            <div
              style={{ backgroundColor: card.color }}
              className={`h-72 w-72  rounded-2xl absolute bottom-0 right-0 z-0`}
            ></div>
          </div>
        ))}
      </div>

      {/*  */}
      <section>
        <SectionHeader
          title="Daily & Weekly Productivity Reports – Powered by AI & Track Nexus"
          subtitle="Automated insights that help you track progress, spot trends, and improve performance—every day, every week"
        />
        {cards3.map((card,i) => (
          <ImageTextSection
          key={i}
            version="v2"
            subtitle={card.subtitle}
            description={card.description}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            imagePosition={card.imagePosition}
          />
        ))}
      </section>
      {/*  */}
      <section>
        {imageWithText.map((x,i) => (
          <ImageTextSection
          key={i}
            title={x.title}
            description={x.description}
            videoSrc={x.videoSrc}
            imagePosition={x.imagePosition}
            iconListItems={x.iconListItems}
            version="v1"
          />
        ))}
      </section>

      {/* Smarter Work Insights with AI – Track Nexus */}
      <InsightsFeatureCardsSection />
      <OurAIIntegrations />
      <TestimonialsSection />
      <FAQSection faqs={defaultHomepageFaqs} />
    </div>
  );
}

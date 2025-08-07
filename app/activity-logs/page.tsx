import Banner from "@/components/banner";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import OurAIIntegrations from "@/components/OurAIIntegrations";
import SectionHeader from "@/components/section-header";
import { DailyTimeline } from "./daily-timeline";

interface IconListItem {
  iconSrc: string;
  iconAlt: string;
  listTitle: string;
  listSubtitle: string;
}

interface FeatureCardProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  iconListItems?: IconListItem[];
}

const sectionDataWithIconLists: FeatureCardProps[] = [
  {
    id: "auto-logged-app-website-usage",
    title: "Auto-logged App & Website Usage",
    imageSrc: "/images/activity-logs/activity-logs-1.jpg", // Placeholder for the laptop image
    imageAlt: "Laptop showing app usage data",
    imagePosition: "left",

    iconListItems: [
      {
        iconSrc: "/images/activity-logs/monitor-icon.png", // Placeholder icon for App Tracking
        iconAlt: "App Tracking Icon",
        listTitle: "App Tracking",
        listSubtitle:
          "Automatically logs time spent on each app to measure focus and productivity.",
      },
      {
        iconSrc: "", // Placeholder icon for Web Monitoring
        iconAlt: "Web Monitoring Icon",
        listTitle: "Web Monitoring",
        listSubtitle:
          "Tracks websites visited and highlights usage patterns with AI-powered insights.",
      },
    ],
  },
  {
    id: "categorized-activity",
    title: "Categorized activity (productive, neutral, unproductive)",
    imageSrc: "/images/activity-logs/activity-logs-2.jpg", // Placeholder for the sticky notes image
    imageAlt: "People collaborating around a desk with sticky notes",
    imagePosition: "right",
    iconListItems: [
      {
        iconSrc: "/images/activity-logs/monitor-icon.svg", // Placeholder icon for AI Classification
        iconAlt: "AI Classification Icon",
        listTitle: "AI Classification",
        listSubtitle:
          "Track Nexus uses AI to automatically label activities as productive, neutral, or unproductive.",
      },
      {
        iconSrc: "/images/activity-logs/monitor-icon.svg", // Placeholder icon for Time Clarity
        iconAlt: "Time Clarity Icon",
        listTitle: "Time Clarity",
        listSubtitle:
          "Quickly understand how time is spent across tools, tasks, and websites—no manual sorting needed.",
      },
    ],
  },
  {
    id: "real-time-session-tracking",
    title: "Real-time session tracking",
    imageSrc: "/images/activity-logs/activity-logs-3.jpg", // Placeholder for the desktop image
    imageAlt: "Desktop showing real-time session tracking",
    imagePosition: "left",
    iconListItems: [
      {
        iconSrc: "/images/activity-logs/monitor-icon.svg", // Placeholder icon for Live Monitoring
        iconAlt: "Live Monitoring Icon",
        listTitle: "Live Monitoring",
        listSubtitle:
          "View active sessions as they happen, with real-time visibility into ongoing work.",
      },
      {
        iconSrc: "/images/activity-logs/monitor-icon.svg", // Placeholder icon for Instant Insights
        iconAlt: "Instant Insights Icon",
        listTitle: "Instant Insights",
        listSubtitle:
          "Get immediate data on activity levels, tools in use, and session duration—powered by AI.",
      },
    ],
  },
  {
    id: "keyboard-mouse-activity-indicators",
    title: "Keyboard and mouse activity level indicators",
    imageSrc: "/images/activity-logs/activity-logs-4.jpg", // Placeholder for the glowing keyboard image
    imageAlt: "Hands on a glowing keyboard and mouse",
    imagePosition: "right",
    iconListItems: [
      {
        iconSrc: "/images/activity-logs/monitor-icon.svg", // Placeholder icon for Keyboard Tracking
        iconAlt: "Keyboard Tracking Icon",
        listTitle: "Keyboard Tracking",
        listSubtitle:
          "Monitors typing activity to measure engagement and focus during work hours.",
      },
      {
        iconSrc: "/images/activity-logs/monitor-icon.svg", // Placeholder icon for Mouse Movement
        iconAlt: "Mouse Movement Icon",
        listTitle: "Mouse Movement",
        listSubtitle:
          "Tracks mouse movements to indicate activity levels, helping you assess focus and detect idle time accurately.",
      },
    ],
  },
];

const dailyTimelines = [
  {
    title: "Report Export",
    subtitle: "Compliance-Ready Documents",
    color: "cyan-500",
    icon: "/monitor.png", // adjust path as per your app
    reverse: false,
  },
  {
    title: "Performance Trends",
    subtitle: "Daily, Weekly, Role-based",
    color: "gray-500",
    icon: "/monitor.png",
    reverse: true,
  },
  {
    title: "AI Dashboards",
    subtitle: "Track work, patterns, and performance",
    color: "yellow-400",
    icon: "/monitor.png",
    reverse: false,
  },
  {
    title: "TrackSight",
    subtitle: "Visualizes productivity patterns.",
    color: "rose-500",
    icon: "/monitor.png",
    reverse: true,
  },
];
export default function ActivityLogsPage() {
  return (
    <div>
      <Banner
        mediaSrc="/images/activity-logs/Office_Laptop.mp4"
        mediaType="video"
        heading="AI-Powered Activity Logs by Track Nexus"
        subheading="Automatically capture, analyze, and visualize every action your team takes—powered by AI for smarter oversight"
        buttonText="Explore the Demo"
      />
      <ImageTextSection
        imageSrc="/images/activity-logs/logs-head.jpg"
        imageAlt="Activity Logs"
        title="What Are Activity Logs?"
        titleColor="text-highlight"
        subtitle="Smarter Tracking. Clearer Insights. Powered by AI and Track Nexus"
        description="Track Nexus uses AI to seamlessly monitor and log employee activity across all digital touchpoints—apps, browsers, tools, and assigned tasks—creating a complete, real-time timeline of the workday. Whether your team works remotely, in-office, or in a hybrid setup, Track Nexus provides unmatched visibility into work patterns, time allocation, and productivity trends. You’ll see when tasks start and finish, how tools are being used, and where time may be slipping—without needing to micromanage. With intelligent insights and detailed logs, you can foster accountability, streamline workflows, and make informed decisions based on actual data, not assumptions."
      />
      <section>
        {sectionDataWithIconLists.map((section) => (
          <ImageTextSection
            key={section.id}
            imageSrc={section.imageSrc}
            imageAlt={section.imageAlt}
            title={section.title}
            titleColor="text-highlight"
            subtitle={section.subtitle}
            description={section.description}
            iconListItems={section.iconListItems}
            imagePosition={section.imagePosition}
          />
        ))}
      </section>
      <section className="mb-10">
        <SectionHeader
          title="Daily Timelines & Reports"
          subtitle="Track Nexus maps each user’s day into a clear, color-coded timeline based on activity type, status, and focus level. Dive into detailed sessions or get instant high-level summaries—all in one click"
        />
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 justify-items-center gap-4">
          {dailyTimelines.map((item, index) => (
            <DailyTimeline
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              color={item.color}
              iconSrc={item.icon}
              reverse={item.reverse}
            />
          ))}
        </div>
      </section>
      <OurAIIntegrations />
      <FAQSection faqs={defaultHomepageFaqs} />
    </div>
  );
}

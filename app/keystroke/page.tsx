import Banner from "@/components/banner";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import OurAIIntegrations from "@/components/OurAIIntegrations";
import { TestimonialsSection } from "@/components/testimonials-section";


const data = [
  {
    title: "Billing & Timesheet Integration",
    subtitle: "Use keystroke activity to validate logged hours and support client billing—without manual effort.",
    description: "Track Nexus uses typing data to auto-fill timesheets and validate active work hours—making billing accurate and transparent.",
    imageSrc: "/images/keystroke/1.jpg",
    imageAlt: "Image",
    imagePosition: "left",
    backgroundColor: "white",
    titleColor: "text-gray-900",
    subtitleColor: "text-gray-800",
    iconListItems: [
      {
        text: "Auto Timesheet Spyze",
        subtext: "Fills timesheets based on real typing activity.",
        checked: false
      },
      {
        text: "Client-Ready Proof",
        subtext: "Exports activity logs to support billing.",
        checked: true
      }
    ],
    version: "v1"
  },
  {
    title: "Privacy-Centered Approach",
    subtitle: "Track Nexus captures typing frequency—not content. No personal data, no keylogging, just ethical analytics.",
    description: "Track Nexus tracks only typing activity—not content—ensuring full transparency and team trust.",
    imageSrc: "/images/keystroke/2.jpg",
    imageAlt: "Image",
    imagePosition: "right",
    backgroundColor: "white",
    titleColor: "text-gray-900",
    subtitleColor: "text-gray-800",
    iconListItems: [
      {
        text: "No Content Recorded",
        subtext: "Only logs typing count and time, never what’s typed.",
        checked: true
      },
      {
        text: "Built for Compliance",
        subtext: "Designed to respect privacy and support workplace trust.",
        checked: true
      }
    ],
    version: "v1"
  },
  {
    title: "Individual & Team Dashboards",
    subtitle: "Zoom into individuals or view collective team keystroke behavior to drive performance coaching.",
    description: "Cut a clear view of how individuals and teams work, spot trends, and support performance with data-driven insights.",
    imageSrc: "/images/keystroke/3.jpg",
    imageAlt: "Image",
    imagePosition: "left",
    backgroundColor: "white",
    titleColor: "text-gray-900",
    subtitleColor: "text-gray-800",
    iconListItems: [
      {
        text: "Individual View",
        subtext: "Track active time, typing pace, and focus patterns.",
        checked: true
      },
      {
        text: "Team Overview",
        subtext: "Compare team-wide activity for balanced coaching.",
        checked: true
      }
    ],
    version: "v1"
  },
  {
    title: "Export-Ready Reports",
    subtitle: "Export keystroke activity insights in formats like XLS, PDF, or CSV to support reviews and client audits.",
    description: "Use customizable filters to create clear, billing-ready reports by team, date, task, or project.",
    imageSrc: "/images/keystroke/4.jpg",
    imageAlt: "Image",
    imagePosition: "right",
    backgroundColor: "white",
    titleColor: "text-gray-900",
    subtitleColor: "text-gray-800",
    iconListItems: [
      {
        text: "Filter by What Matters",
        subtext: "Sort data by team, day, task, or project.",
        checked: true
      },
      {
        text: "Billing-Ready Output",
        subtext: "Generate exportable, client-friendly reports instantly.",
        checked: true
      }
    ],
    version: "v1"
  },
  {
    title: "What Is Keystroke Monitoring?",
    subtitle: "Understanding the Basics Behind Input Activity Tracking",
    description: "Keystroke monitoring is the process of tracking keyboard activity to analyze how work is performed. Unlike keylogging, which can be invasive. AI-powered keystroke monitoring—like that used by Track Nexus—focuses on patterns, speed, and engagement levels rather than capturing specific content. It’s used to identify productivity trends, reduce idle time, and enhance workflow efficiency without compromising privacy.",
    imageSrc: "/images/keystroke/5.jpg",
    imageAlt: "Image",
    imagePosition: "left",
    backgroundColor: "white",
    titleColor: "text-gray-900",
    subtitleColor: "text-gray-800",
    iconListItems: [],
    version: "v1"
  },
  {
    title: "AI-Powered Typing Analytics",
    subtitle: "It’s not just about how much your team types—it’s about when, where, and how efficiently",
    description: "Track Nexus monitors typing speed and idle time to provide a clear view of productivity—without capturing personal content. It helps teams stay focused and manage work patterns more effectively.",
    imageSrc: "/images/keystroke/6.jpg",
    imageAlt: "Image",
    imagePosition: "right",
    backgroundColor: "white",
    titleColor: "text-gray-900",
    subtitleColor: "text-gray-800",
    iconListItems: [
      {
        text: "Typing Speed",
        subtext: "Tracks words per minute to measure engagement.",
        checked: false
      },
      {
        text: "Idle Detection",
        subtext: "Identifies pauses and break times through inactivity.",
        checked: false
      }
    ],
    version: "v1"
  },
  {
    title: "Productivity Insights from Keystrokes",
    subtitle: "Typing trends reveal more than effort—they reveal workflow health.",
    description: "Track Nexus uses AI to reveal deeper work patterns from typing behavior. It helps identify signs of burnout, focus time, and team-wide typing efficiency—all without invading privacy.",
    imageSrc: "/images/keystroke/7.jpg",
    imageAlt: "Image",
    imagePosition: "left",
    backgroundColor: "white",
    titleColor: "text-gray-900",
    subtitleColor: "text-gray-800",
    iconListItems: [
      {
        text: "Spot burnout from erratic typing rhythms",
        checked: false
      },
      {
        text: "Detect deep work and focus periods",
        checked: false
      },
      {
        text: "Compare typing flow across teams",
        checked: false
      }
    ],
    version: "v1"
  }
];

export default function KeystrokePage() {
    return (
        <div>
            <Banner
        mediaType="video"
        mediaSrc="/images/productivity-reports/People_Statistical.mp4"
        heading="AI-Based Keystroke Monitoring"
        subheading="Boost Productivity with Intelligent Input Analysis – Track Nexus"
      />
      {data.map((feature,i) => (
        <ImageTextSection
          key={i}
          title={feature.title}
          subtitle={feature.subtitle}
          description={feature.description}
          imageSrc={feature.imageSrc}
          imageAlt={feature.imageAlt}
          imagePosition={feature.imagePosition}
          titleColor="text-highlight"
        />
      ))}

        <OurAIIntegrations />
      <TestimonialsSection />
      <FAQSection faqs={defaultHomepageFaqs} />
        </div>
    )
} 
import Banner from "@/components/banner";
import { ImageTextSection } from "@/components/image-text-section";
import ProductivityInsights from "./productivity-insights";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import OurAIIntegrations from "@/components/OurAIIntegrations";
const whyNexus: {
  title: string;
  titleColor?: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}[] = [
  {
    title: "Why Track Nexus?",
    titleColor: "text-highlight",
    subtitle:
      "AI Time Tracking Built for Teams Who Value Accuracy and Efficiency",
    description:
      "Track Nexus combines intelligent automation with real-time analytics to ensure every work hour is accurately recorded. From task-level tracking to automatic timesheets, our AI-driven system minimizes human error, improves accountability, and enhances team efficiency. Whether in-office or remote, teams get a clear, detailed view of productivity, making it easier to manage workloads, meet deadlines, and optimize performance.",
    imageSrc: "/images/time-tracking/why-nexus.png",
    imageAlt: "",
    imagePosition: "right",
  },
  {
    title: "AI-Powered Automation",
    description:
      "Automate time logging with Track Nexus' AI-powered tracking that captures every task, break, and shift in real time—eliminating the need for manual entries. Whether your team is working remotely or in the office, the system intelligently monitors activity patterns, task durations, and engagement levels. Based on this data, it delivers personalized insights and suggestions to improve focus, reduce downtime, and streamline daily workflows. By identifying productivity trends and areas of improvement, Track Nexs helps teams work smarter, stay accountable, and continuously optimize their performance.",
    imageSrc: "/images/time-tracking/ai-powered-automation.jpg",
    imageAlt: "AI-Powered Automation",
    imagePosition: "left",
  },
  {
    title: "Real-Time Visibility",
    description:
      "Track Nexus gives you full real-time visibility into your team's workday, no matter where they are. From active tasks and time spent to app usage and productivity levels, every action is captured and displayed through intuitive dashboards. This live overview helps managers identify inefficiencies, monitor progress against goals, and take timely action when needed. By removing blind spots in team performance, Track Nexus keeps you informed, proactive, and in control—without the need for micromanagement or end-of-day reports.",
    imageSrc: "/images/time-tracking/real-time-visibility.jpg",
    imageAlt: "Real-Time Visibility",
    imagePosition: "right",
  },
  {
    title: "Precision Without Effort",
    description:
      "Track Nexus is designed to deliver highly accurate time and activity tracking without interrupting your team’s flow. With intelligent AI working quietly in the background, it automatically records work hours, tracks application usage, and monitors task engagement—eliminating the need for manual inputs or guesswork. This effortless precision not only boosts productivity but also ensures that managers and teams have reliable, real-time data they can trust. Spend less time tracking and more time doing—with accuracy built into every click and keystroke.",
    imageSrc: "/images/time-tracking/precision-without-effort.jpg",
    imageAlt: "Precision Without Effort",
    imagePosition: "left",
  },
];

export default function TimeTracingPage() {
  return (
    <div>
      <Banner
        mediaType="video"
        mediaSrc="images/time-tracking/time.mp4"
        buttonText="Get Started"
        buttonLink="/"
      />
      <div className="flex flex-col gap-8 mb-10">
        {whyNexus.map((item, index) => (
          <div key={index}>
            <ImageTextSection
              key={index}
              title={item.title}
              titleColor={item.titleColor}
              subtitle={item.subtitle}
              description={item.description}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              imagePosition={item.imagePosition}
            />
          </div>
        ))}
      </div>
      {/* Productivity & AI Insights */}
      <ProductivityInsights />
      {/*  Our AI Integrations & Ecosystem */}
      <OurAIIntegrations />
      {/* FAQ Section */}
      <FAQSection faqs={defaultHomepageFaqs}/>
    </div>
  );
}

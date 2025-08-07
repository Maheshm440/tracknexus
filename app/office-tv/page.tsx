import Banner from "@/components/banner";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import SectionHeader from "@/components/section-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import VideoBanner from "@/components/video-banner";
import PracticalInsight from "@/components/practical-insight";
import { TestimonialsSectionTwo } from "@/components/testimonials-section-two";

export const sectionsData = [
  {
    title: "Maximize Team Efficiency",
    subtitle: "Boost productivity and focus.",
    description:
      "Boost team performance by tracking productivity, improving focus, and identifying trends to prevent burnout all with Track Nexu's smart work monitoring.",
    imageSrc: "/images/office-tv/2.png",
    imageAlt: "Team working efficiently",
    imagePosition: "left",
    backgroundColor: "white",
    iconListItems: [
      {
        iconSrc: "/monitor.png",
        iconAlt: "Target icon",
        listTitle: "Align Goals, Accelerate Results",
        listSubtitle:
          "Drive success with clear, actionable goals and milestones that keep your team aligned and motivated.",
      },
      {
        iconSrc: "/monitor.png",
        iconAlt: "Chart icon",
        listTitle: "Unlock Team Trends & Insights",
        listSubtitle:
          "Uncover team patterns and collaboration trends to enhance workflow, efficiency, and decision-making.",
      },
    ],
    version: "v1",
  },
  {
    title: "Smarter Hybrid & Remote Work",
    subtitle: "Seamless collaboration for distributed teams.",
    description:
      "Enable seamless collaboration for distributed teams with productivity tracking, location-based insights, and remote attendance monitoring via Track Nexus.",
    imageSrc: "/images/office-tv/3.jpg",
    imageAlt: "People working remotely",
    imagePosition: "right",
    backgroundColor: "white",
    iconListItems: [
      {
        iconSrc: "/monitor.png",
        iconAlt: "Laptop icon",
        listTitle: "Work from Anywhere, Stay Productive",
        listSubtitle:
          "Support flexible work setups and empower teams to thrive in any environment with tools that boost efficiency.",
      },
      {
        iconSrc: "/monitor.png",
        iconAlt: "Lightbulb icon",
        listTitle: "Unlock Team Trends & Insights",
        listSubtitle:
          "Gain instant insights into employee activity and performance to drive informed decisions and team accountability.",
      },
    ],
    version: "v1",
  },
  {
    title: "Automated Attendance Tracking",
    subtitle: "Simplify attendance and time tracking.",
    description:
      "Simplify attendance and time tracking with real-time visibility, smart scheduling, and seamless data exports for payroll accuracy.",
    imageSrc: "/images/office-tv/4.png",
    imageAlt: "Calendar and clock",
    backgroundColor: "white",
    iconListItems: [
      {
        iconSrc: "/monitor.png",
        iconAlt: "Clock icon",
        listTitle: "Track Late Logins Effortlessly",
        listSubtitle:
          "Automatically detect and record late arrivals to ensure accurate and the transparent attendance reporting.",
      },
      {
        iconSrc: "/monitor.png",
        iconAlt: "Calendar icon",
        listTitle: "Seamless Shift Management",
        listSubtitle:
          "Easily manage multiple shifts and schedules to support a flexible and diverse workforce.",
      },
    ],
    version: "v1",
  },
  {
    title: "Optimize with Usage Analytics",
    subtitle: "Gain deep insights into app and software usage.",
    description:
      "Gain deep insights into app and software usage to streamline your tech stack and improve operational efficiency.",
    imageSrc: "/images/office-tv/5.png",
    imageAlt: "Graphs and charts",
    imagePosition: "right",
    backgroundColor: "white",
    iconListItems: [
      {
        iconSrc: "/monitor.png",
        iconAlt: "Bar chart icon",
        listTitle: "Smarter Tech Utilization",
        listSubtitle:
          "Leverage real-time usage data to ensure your team uses the right tools, boosting productivity and focus.",
      },
      {
        iconSrc: "/monitor.png",
        iconAlt: "Scissors icon",
        listTitle: "Cut Costs with Precision",
        listSubtitle:
          "Identify underused licenses and allocate resources wisely so you only pay for what your team truly needs.",
      },
    ],
    version: "v2", 
    videroSrc: "/path/to/your/video.mp4", 
  },
  {
    title: "Comprehensive Employee Monitoring",
    subtitle: "Full visibility into employee activity.",
    description:
      "Gain full visibility into employee activity with real-time tracking of keystrokes, mouse usage, screenshots, screen recordings, audio, and location.",
    imageSrc: "/images/office-tv/6.png",
    imageAlt: "Employee monitoring dashboard",
    imagePosition: "right",
    backgroundColor: "white",
    iconListItems: [
      {
        iconSrc: "/monitor.png",
        iconAlt: "TV icon",
        listTitle: "Live Activity Display with Office TV",
        listSubtitle:
          "View real-time screens of active employees to monitor productivity and ensure accountability across teams.",
      },
      {
        iconSrc: "/monitor.png",
        iconAlt: "Location pin icon",
        listTitle: "Smart Location Tracking",
        listSubtitle:
          "Track employee locations to boost operational security and manage remote or field teams more effectively.",
      },
    ],
    version: "v1",
  },
];


export default function OfficeTvPage() {
    return (
        <div>
            <VideoBanner title="Office TV" description="Monitor live screens, capture screenshots, and record activity to track team performance in real time. Ensure compliance and make informed decisions with complete digital visibility" videoSrc="/image/office-tv/1.png"/>
            {sectionsData.map((section, index) => (
                <ImageTextSection
                    key={index}
                    title={section.title}
                    subtitle={section.subtitle}
                    description={section.description}
                    imageSrc={section.imageSrc}
                    imageAlt={section.imageAlt}
                    imagePosition={section.imagePosition}
                    iconListItems={section.iconListItems}
                    videroSrc={section.videroSrc}
                />
            ))}
            <SectionHeader title="Uncover Practical Insights from Everyday Workflows" />
            <PracticalInsight/>
            <TestimonialsSectionTwo/>
            <FAQSection faqs={defaultHomepageFaqs}/>
        </div>
    )
}
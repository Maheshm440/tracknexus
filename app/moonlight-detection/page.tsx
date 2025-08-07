import Banner from "@/components/banner";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import PracticalInsight from "@/components/practical-insight";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TestimonialsSectionTwo } from "@/components/testimonials-section-two";
import VideoBanner from "@/components/video-banner";

const data : {
    title?: string;
  subtitle?: string;
  description?: string ;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  backgroundColor?: "white" | "gray";
  titleColor?: string;
  subtitleColor?: string;
  className?: string;
  list?: boolean;
  version?: "v1" | "v2";
}[] = [
  {
    title: "Enhance Productivity Across Teams",
    description: "Track Nexus drives team efficiency with smart workload management and real-time performance insights. Tailor interactive dashboards to enable smooth collaboration whether your teams work remotely, in-office, or in hybrid environments. Gain visibility into task progress, identify bottlenecks early, and make data-backed decisions. Empower your teams to stay aligned, focused, and performance-driven at every stage.",
    imageAlt: "A person on a video conference call with numerous participants displayed on a laptop screen."
    ,
    imageSrc:"/images/moonlight/2.png",
  },
  {
    title: "Intelligent Work Monitoring for Modern Teams",
    description: "Track Nexus enables efficient hybrid and remote work through advanced productivity tracking, location analytics, and smart attendance monitoring. Boost focus, align team objectives, and streamline workflows with actionable, data-driven insights. Detect work patterns, reduce distractions, and foster accountability across teams. Ensure operational clarity and performance consistency wherever your team works.",
    imageAlt: "An overhead view of a team meeting with business charts, overlaid with digital network icons."
    ,
    imageSrc:"/images/moonlight/3.png",
    imagePosition:"right"
  },
  {
    title: "Effortless Attendance & Shift Management",
    description: "Track Nexus streamlines attendance with automation, intelligent scheduling, and real-time tracking. Ensure accurate payroll and smooth shift coordination through timely alerts and comprehensive reports. Eliminate manual errors and save time with fully integrated attendance workflows. Empower HR and managers with instant access to attendance data for better decision-making.",
    imageAlt: "A manager presenting to his team in front of a whiteboard with the word 'MANAGEMENT' on it."
    ,
    imageSrc:"/images/moonlight/4.png",
    imagePosition:"left"
  },
  {
    title: "Smart Project & Time Management",
    description: "Track Nexus simplifies project, task, and time management through real-time tracking, intelligent scheduling, and automated attendance. It boosts team productivity, ensures accurate payroll, and enables smarter decisions with live performance insights. Track milestones effortlessly and keep teams aligned with clear visibility. Reduce delays, improve accountability, and drive projects to success with precision.",
    imageAlt: "A person writing at a desk with an alarm clock and a tablet nearby, signifying time management."
    ,
    imageSrc:"/images/moonlight/5.png",
    imagePosition:"right"
  },
  {
    title: "Optimize Your Tech Stack and Intelligence",
    description: "Track Nexus delivers real-time analytics on software and app usage, helping you enhance efficiency, eliminate digital waste, and lower tech expenses. Uncover underutilized tools, reassign licenses, and streamline operations with data-driven clarity. Improve ROI on software investments and support smarter budgeting decisions. Gain full visibility into your digital ecosystem to enable leaner, more focused work environments.",
    imageAlt: "A developer coding with an HTML tag visible on the screen and other digital interface elements."
    ,
    imageSrc:"/images/moonlight/6.png",
    imagePosition:"left"
  },
  {
    title: "Smarter Work Oversight for Modern Teams",
    description: "Track Nexus delivers intelligent, real-time employee monitoring through activity tracking, screen insights, and location-aware data. Enhance productivity, ensure accountability, and maintain transparency across remote and hybrid teams. Set custom alerts for inactivity or unusual behavior, and gain centralized visibility into workflows. Empower managers with actionable data to support performance, compliance, and efficiency.",
    imageAlt: "Two colleagues collaborating and pointing at a diagram on a transparent whiteboard."
    ,
    imageSrc:"/images/moonlight/7.png",
    imagePosition:"right"
  }
];
export default function MoonlightDetectionPage() {
    return (
        <div>
            <VideoBanner title="Detect Dual Employment with Ease" description="Easily identify employees involved in moonlighting. Customize settings to match company policies" imageSrc="/images/moonlight/1.png"/>
            {
                data.map((x,i) => (
                    <ImageTextSection
                    key={i}
                    title={x.title}
                    titleColor="text-highlight"
                    description={x.description}
                    imageSrc={x.imageSrc}
                    imageAlt={x.imageAlt}
                    imagePosition={x.imagePosition}
                    />
                ))
            }
            <PracticalInsight/>
            <TestimonialsSectionTwo/>
            <FAQSection faqs={defaultHomepageFaqs}/>
        </div>
    )
}
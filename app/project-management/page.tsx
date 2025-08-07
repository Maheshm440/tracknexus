import Banner from "@/components/banner";
import { CustomizeControlSection } from "@/components/customize-control-section";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
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
    title: "Set clear goals and stay focused",
    description: "Gain a specific objective for your project and align your team's efforts to achieve it efficiently. Stay on track, maintain clarity, and meet your deadlines with confidence. Break down complex goals into actionable steps to ensure steady progress. With focused direction, your team can deliver impactful results every time.",
    imageSrc:"/images/project-management/2.png",
    imageAlt:"",
    imagePosition:"left"
  },
  {
    title: "Efficient Sprint Planning & Tracking",
    description: "Easily add your project title, set estimated timelines, and plan each sprint within a defined time frame. Stay organized by tracking daily progress and viewing the exact number of days left to complete each project. Work with focus, stay on schedule, and deliver results without delay.",
    imageSrc:"/images/project-management/3.png",
    imageAlt:"",
    imagePosition:"right"
  },
  {
    title: "Smart Resource Allocation Made Easy",
    description: "Track Nexus simplifies resource management by enabling managers to assign the right resources to the right people accurately. Ensure optimal team performance with error-free, timely allocation that keeps projects running smoothly. Gain full visibility into resource availability and utilization to maximize productivity.",
    imageSrc:"/images/project-management/4.png",
    imageAlt:"",
    imagePosition:"left"
  },
  {
    title: "Streamlined Bug Tracking & Reporting",
    description: "Track Nexus makes it easy to track and manage bugs throughout your project. Open any work item, verify its status, and leave detailed comments for bugs if needed. Ensure faster resolutions and better product quality with transparent, real-time issue tracking. Stay in control with a clear overview of all reported bugs, their status, and assigned team members.",
    imageSrc:"/images/project-management/5.png",
    imageAlt:"",
    imagePosition:"right"
  }
];
export default function ProjectManagementPage() {
    return (
        <div>
            <VideoBanner title="Where your journey to project 
excellence begins today" description=" Elevate your project management experience with Track Nexus" videoSrc="/vid2.mp4"/>
            {data.map((item, index) => (
                <ImageTextSection
                    key={index}
                    title={item.title}
                    description={item.description}
                    imageSrc={item.imageSrc}
                    imageAlt={item.imageAlt}
                    imagePosition={item.imagePosition}
                />
            ))}
            <CustomizeControlSection/>
            <TestimonialsSectionTwo/>
            <FAQSection faqs={defaultHomepageFaqs}/>
        </div>
    )
}
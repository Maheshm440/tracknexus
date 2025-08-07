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
    title: "Boost Team Performance",
    description: "Track Nexus boosts team productivity with real-time performance insights and intelligent workload management. Customize dashboards to support seamless collaboration across remote, hybrid, or in-office setups.",
    imageAlt: "Illustration of three smiling and waving team members."
    ,
    imageSrc:"/images/apps-website/2.png"
  },
  {
    title: "Smart and flexible Work Monitoring",
    description: "Track Nexus supports smart hybrid and remote work with productivity tracking, location insights, and attendance monitoring. Improve focus, align goals, and optimize workflows through intelligent work monitoring and data-driven decisions.",
    imageAlt: "An illustration of a person working on a laptop with a calendar, clock, and gears in the background to symbolize work monitoring."
    ,
    imageSrc:"/images/apps-website/3.png"
    ,
    imagePosition:"right"
  },
  {
    title: "Smart Attendance Made Simple",
    description: "Track Nexus simplifies attendance with automated tracking, smart scheduling, and real-time visibility. It ensures payroll accuracy and shift management with auto-reminders and seamless reporting.",
    imageAlt: "An illustration of a person standing next to a large smartphone showing a 'Confirmed Attendance' checkmark."
    ,
    imageSrc:"/images/apps-website/4.png"
  },
  {
    title: "Optimize Projects, Time & Teams",
    description: "Track Nexus streamlines project, task, and time management with real-time tracking, smart scheduling, and automated attendance. It enhances productivity, ensures payroll accuracy, and supports data-driven decisions with live insights.",
    imageAlt: "An illustration of three people in separate video call windows, representing team collaboration."
    ,
    imageSrc:"/images/apps-website/5.png"
    ,
    imagePosition:"right"
  },
  {
    title: "Tech Stack with Smart Usage Analytics",
    description: "Track Nexus offers real-time insights into app usage, helping you boost efficiency, reduce digital clutter, and cut unnecessary software costs. Identify underused tools, reallocate resources, and optimize workflows with smart usage tracking.",
    imageAlt: "An illustration of a person analyzing charts and graphs on a large dashboard, representing usage analytics."
    ,
    imageSrc:"/images/apps-website/6.png"
  },
  {
    title: "Intelligent Employee Monitoring",
    description: "Track Nexus offers real-time employee monitoring with activity tracking, screen views, and smart location data to boost focus and accountability. Get full visibility, set alerts for idle or suspicious activity, and streamline oversight for hybrid teams.",
    imageAlt: "An illustration of several employees working at their desks with monitoring-related icons above their heads."
    ,
    imageSrc:"/images/apps-website/7.png"
    ,
    imagePosition:"right"
  }
];
export default function AppsWebsitePage() {
    return (
        <div>
            <VideoBanner title="Enhance workplace security by capturing verbal cues with audio tracking " description="Elevate workplace oversight with our intelligent audio tracking tool, enabling you to capture critical insights and ensure policy adherence in real time" imageSrc="/images/apps-website/1.png"/>
            {
                data.map((x,i) => (
                    <ImageTextSection key={i} title={x.title} titleColor="text-highlight" description={x.description} imageSrc={x.imageSrc} imageAlt={x.imageAlt} imagePosition={x.imagePosition}/>
                ))
            }
            <PracticalInsight/>
            <TestimonialsSectionTwo/>
            <FAQSection faqs={defaultHomepageFaqs}/>
        </div>
    )
}
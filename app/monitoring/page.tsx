import { CustomizeControlSection } from "@/components/customize-control-section";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TestimonialsSectionTwo } from "@/components/testimonials-section-two";
import VideoBanner from "@/components/video-banner";

// cards
const data : {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    imagePosition?: "left" | "right";
}[] = [
  {
    id: 1, // Keeping ID for unique key prop in React
    title: "Comprehensive Employee Monitoring",
    subtitle: "Track & Optimize Performance",
    description: "Track app and website usage, capture screenshots (random or triggered), monitor activity logs, and detect suspicious behavior—all in silent mode. Gain complete visibility into employee workflows to enhance productivity, ensure data security, and support informed decision-making. All data is collected discreetly and securely, providing actionable insights without disrupting employee operations. Customize monitoring parameters to align with organizational policies and compliance requirements. Leverage real-time alerts and detailed reports to proactively address risks and optimize team performance.",
    imageSrc: "/images/monitoring/2.png", // Placeholder, replace with actual image path if available
    imageAlt: "Magnifying glass over a target with employee icons"
    ,
    imagePosition: "right"
  },
  {
    id: 2,
    title: "Advanced Employee Monitoring Made Simple",
    subtitle: "Simplified Control & Insights",
    description: "Stay in control with real-time employee monitoring, manual screenshot capture, and detailed app and website usage insights. Track productivity throughout the comprehensive reports, monitor time and attendance automatically, and review activities as they happen. Get the data you need to manage performance and optimize workflows efficiently. Set custom alerts for unauthorized activities to safeguard sensitive company information. Easily filter and analyze historical data to identify trends and performance gaps over time. Empower management with visual evidence and actionable metrics to drive accountability and results.",
    imageSrc: "/images/monitoring/3.png", // Placeholder, replace with actual image path if available
    imageAlt: "Person looking at multiple computer monitors with data"
  },
  {
    id: 3,
    title: "Workforce Activity Monitoring",
    subtitle: "Detailed Activity Tracking",
    description: "Gain full visibility into your team's daily activities, including active, idle, and break times. Track application and website usage to understand how time is spent across tasks. Easily review, edit, and approve manual time entries for greater accuracy and transparency. Identify unproductive behavior early with detailed activity timelines and usage patterns. Ensure accountability with automatically logged sessions and customizable tracking settings. Support data-driven decisions by analyzing productivity trends across individuals or teams. Enhance operational efficiency by aligning employee activity data with performance goals and business objectives.",
    imageSrc: "/images/monitoring/4.png", // Placeholder, replace with actual image path if available
    imageAlt: "Gears with productivity icons inside"
    ,
    imagePosition: "right"
  }
];

// image text
const data2 : {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    imagePosition?: "left" | "right";
}[] = [
  {
    id: 1, // Keeping ID for unique key prop in React
    title: "Enhance Focus and Drive Productivity",
    subtitle: "Actionable Insights", // New subtitle based on content
    description: "Empower your team with actionable insights from Time Champ. Identify obstacles, track progress, and resolve issues effectively. Strengthen focus and commitment to achieve higher productivity with ease.",
    imageSrc: "/images/monitoring/5.png", // Placeholder, replace with actual image path if available
    imageAlt: "Target with arrows hitting the bullseye",
    imagePosition: "right"
  },
  {
    id: 2,
    title: "Effortless Remote Team Management",
    subtitle: "Confident Leadership", // New subtitle based on content
    description: "Lead your remote team with confidence using Time Champ. Stay updated with daily activity reports, track active hours, monitor screenshots, and review detailed logs. Streamline payroll with customizable hourly rates and gain full visibility into your team's performance.",
    imageSrc: "/images/monitoring/6.png", // Placeholder, replace with actual image path if available
    imageAlt: "Business person interacting with holographic team members",
  },
  {
    id: 3,
    title: "Enhance Attendance Accuracy",
    subtitle: "Accurate Time Tracking", // New subtitle based on content
    description: "Accurately track employee attendance through real laptop activity, ensuring timesheets reflect true working hours. Eliminate time theft and buddy punching while maintaining compliance.",
    imageSrc: "/images/monitoring/7.png", // Placeholder, replace with actual image path if available
    imageAlt: "Person checking a large clipboard with a clock",
    imagePosition: "right"
  }
];
export default function MonitoringPage() {
    return <div>
        <VideoBanner title="Real-Time Employee 
Monitoring" description="Monitor live screens, capture screenshots, and record activity to track team performance in real time. Ensure compliance and make informed decisions with complete digital visibility" imageSrc="/images/monitoring/image-1.png"/>
    {
        data.map((x,i)  => (
            <ImageTextSection
            key={i}
            title={x.title}
            titleColor="text-highlight"
            subtitle={x.subtitle}
            description={x.description}
            imageSrc={x.imageSrc}
            imageAlt={x.imageAlt}
            imagePosition={x.imagePosition}
            />
        ))
    }

    <CustomizeControlSection/>

    <section className="bg-black py-10">
        {data2.map((x,i)  => (
            <ImageTextSection
            key={i}
            title={x.title}
            subtitle={x.subtitle}
            description={x.description}
            imageSrc={x.imageSrc}
            imageAlt={x.imageAlt}
            imagePosition={x.imagePosition}
            />
        ))}
    </section>
    <TestimonialsSectionTwo/>
    <FAQSection faqs={defaultHomepageFaqs}/>
    </div>
}
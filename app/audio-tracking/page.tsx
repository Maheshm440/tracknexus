import { CustomizeControlSection } from "@/components/customize-control-section";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import VideoBanner from "@/components/video-banner";
import { Monitor, Mic, Clock } from "lucide-react";
import MonitoringFeature from "./monitoring-features";
import PracticalInsight from "@/components/practical-insight";
import { TestimonialsSectionTwo } from "@/components/testimonials-section-two";



// image text
const data2  = [
  {
    title: "Call Monitoring for Support Teams",
    imageSrc: "/images/audio-tracking/4.png",
    description: "Monitoring customer support and call center interactions helps ensure representatives deliver accurate, high-quality service. It also supports training and development by allowing managers to identify best practices and areas for improvement.",
    imageAlt: "Illustration of a manager overseeing support team members in circles, representing call monitoring.",
    imagePosition: "right"
  },
  {
    title: "Verbal Transaction Recording",
    imageSrc: "/images/audio-tracking/5.png",
    description: "In sectors like finance and stock trading, where verbal agreements are made over the phone, audio tracking provides a reliable record of each transaction. This helps safeguard both the company and the client, reducing the risk of misunderstandings or disputes.",
    imageAlt: "Illustration of one person speaking through a megaphone to another, symbolizing the recording of a verbal transaction.",
    imagePosition: "left"
  },
  {
    title: "Enhance Attendance Accuracy",
    imageSrc: "/images/audio-tracking/6.png",
    description: "Accurately track employee attendance through real laptop activity, ensuring timesheets reflect true working hours. Eliminate time theft and buddy punching while maintaining compliance.",
    imageAlt: "Illustration of two people working on laptops in front of a large gauge, symbolizing accurate attendance tracking.",
    imagePosition: "right"
  }
]

const monitoringSectionsData = [
  {
    imageSrc: "/images/audio-tracking/2.png", // Placeholder path for the first image
    features: [
      {
        title: "Screen Recording",
        description: "Monitor employee screen activity in real-time or on schedule to align with your organizational needs.",
        icon: Monitor,
      },
      {
        title: "Input and Output Recording",
        description: "Capture complete conversations from both ends of a call for better clarity and documentation.",
        icon: Mic,
      },
      {
        title: "Flexible Recording Schedules",
        description: "Gain the flexibility to schedule and track audio recordings based on your specific requirements.",
        icon: Clock,
      },
    ],
  },
  {
    reverse:true,
    imageSrc: "/images/audio-tracking/3.png", // Placeholder path for the second image
    features: [
      {
        title: "Customised Recordings",
        description: "Choose exactly how you want conversations to be recorded whether it's the full dialogue.",
        icon: Mic,
      },
      {
        title: "Secure Cloud Backup",
        description: "All audio recordings are securely stored in the cloud eliminating the need for manual backups.",
        icon: Clock, // Consider using a 'Cloud' or 'Server' icon if available in your icon library for better representation.
      },
      {
        title: "Work Hours Monitoring",
        description: "With Time Champ, you can accurately track the time your employees spend on work tasks.",
        icon: Monitor,
      },
    ],
  },
];
export default function AudioTrackingPage() {
    return <div>
        <VideoBanner title="Real-Time Employee 
Monitoring" description="Monitor live screens, capture screenshots, and record activity to track team performance in real time. Ensure compliance and make informed decisions with complete digital visibility" imageSrc="/images/audio-tracking/1.png"/>
    {
      monitoringSectionsData.map((x,i) => (
        <MonitoringFeature
        key={i}
        imageSrc={x.imageSrc}
        features={x.features}
        reverse={x.reverse}
        />
      ))
    }

    <CustomizeControlSection/>

    <section className="bg-black py-20">

    </section>

    <section className="bg-black py-10">
        {data2.map((x,i)  => (
            <ImageTextSection
            key={i}
            title={x.title}
            description={x.description}
            imageSrc={x.imageSrc}
            imageAlt={x.imageAlt}
            imagePosition={x.imagePosition}
            />
        ))}
    </section>
    <PracticalInsight/>
    <TestimonialsSectionTwo/>
    <FAQSection faqs={defaultHomepageFaqs}/>
    </div>
}
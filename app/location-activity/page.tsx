
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TestimonialsSectionTwo } from "@/components/testimonials-section-two";
import VideoBanner from "@/components/video-banner";

const locationTrackingFeatures: {
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
}[]  = [
  {
    title: "Live Team Location Tracking",
    description: "Stay connected with your team no matter where they are. Monitor real-time movements with precision and ease. Gain instant visibility into your field staff's location at any moment. Improve safety, accountability, and coordination in one place. Optimize task assignments with live location insights. Perfect for teams on the move—sales, delivery, service, and more. Empower smarter decisions with real-time tracking at your fingertips. Reduce delays and boost productivity with location-based insights. Build trust with clients through timely and transparent updates. Seamlessly integrate with your existing workflows for minimal disruption. Experience greater control and clarity with every movement tracked.",
    imageSrc: "/images/location-activity/2.png",
    imageAlt: "Real-time map showing team member locations with tracking indicators",
    imagePosition:"left"
  },
  {
    title: "Past Location Insights for Smarter Planning",
    description: "Analyze historical movement patterns to optimize future operations. Review completed routes and time spent at locations to improve planning efficiency. Use data-driven insights to make informed decisions about resource allocation and scheduling. Enhance operational strategy with comprehensive location history reports.",
    imageSrc: "/images/location-activity/3.png",
    imageAlt: "Historical location data visualization on a timeline map",
    imagePosition:"right"
  },
  {
    title: "Device Compatibility for Easy Tracking",
    description: "Our tracking software works across smartphones and specialized GPS units. Ensures real-time connectivity whether your team is in the field or office. Mobile apps provide on-the-go flexibility while dedicated GPS devices offer precision. Consistent functionality across all hardware enables smooth transitions between devices. Maintain productivity with the tools that best suit your team's needs.",
    imageSrc: "/images/location-activity/4.png",
    imageAlt: "Multiple devices displaying tracking interface",
    imagePosition:"left"
  },
  {
    title: "Smart, Customized Location Alerts",
    description: "Receive automated alerts about your team's movements. Instant notifications for late arrivals, early departures, or unusual routes. Set geofence alerts for entry/exit from designated zones. Monitor sensitive areas with precision. Reduce manual oversight with intelligent notifications. Customize alerts based on roles, schedules, or locations. Enhance safety and operational efficiency with smart monitoring.",
    imageSrc: "/images/location-activity/5.png",
    imageAlt: "Mobile device showing location alert notifications",
    imagePosition:"right"
  }
];

const managementFeatures : {
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
}[]= [
  {
    title: "Manager-Only Access & Control",
    description: "Allow managers to securely access only their team's data, evaluate performance metrics, and customize productivity labels ensuring focused oversight and effective team management.",
    imageSrc: "/images/location-activity/6.png",
    imageAlt: "Manager dashboard interface with team analytics",
  },
  {
    title: "Dedicated Manager Access",
    description: "Give managers secure, role-based access to their team's data. They can monitor performance, adjust productivity labels, and make informed decisions ensuring efficient and focused team oversight.",
    imageSrc: "/images/location-activity/7.png",
    imageAlt: "Role-based access control settings screen",

    imagePosition:"right"
  },
  {
    title: "Seamless API Integration",
    description: "Easily connect with any internal or third-party software using our robust REST API, enabling smooth data exchange and streamlined workflows across your organization.",
    imageSrc: "/images/location-activity/8.png",
    imageAlt: "API integration diagram with connected systems"
  },
  {
    title: "Raw Data Monitoring",
    description: "Get accurate, real-time insights into employees' computer activity captured down to the second for in-depth analysis and complete transparency.",
    imageSrc: "/images/location-activity/9.png",
    imageAlt: "Detailed activity log with timestamp data",

    imagePosition:"right"
  },
  {
    title: "Real-Time Productivity Alerts",
    description: "Stay informed with instant alerts triggered by productivity changes or unwanted activities. Monitor behavior in real time to quickly identify and respond to issues as they arise.",
    imageSrc: "/images/location-activity/10.png",
    imageAlt: "Notification alert popup on a dashboard",

    imagePosition:"right"
  },
  {
    title: "Smart Solutions for Employers",
    description: "Automated reports help you quantify performance, analyze workflows, and cut operational costs by up to 40% with greater accuracy and less effort.",
    imageSrc: "/images/location-activity/11.png",
    imageAlt: "Automated report generation with analytics charts"
  }
];

const useCase : {
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
    title: "Optimizing Emergency Response with Staff Tracking",
    description: "Hospitals and healthcare facilities leverage advanced tracking software to monitor the real-time location of medical staff. This technology enhances emergency response capabilities, improves coordination among teams, and ensures efficient, patient-centered care delivery.",
    imageSrc: "/images/location-activity/12.png",
    imageAlt: "Hospital floor plan with staff location tracking",
    imagePosition:"right"
  },
  {
    title: "Enhancing Productivity",
    description: "With remote work on the rise, tracking software plays a key role in enhancing productivity. By monitoring employee activity levels, it promotes accountability and helps ensure consistent performance, regardless of location.",
    imageSrc: "/images/location-activity/13.png",
    imageAlt: "Productivity dashboard showing remote work metrics"
  },
  {
    title: "Smart Staffing for Exceptional Hospitality",
    description: "Hotels and event venues utilize workforce management software to efficiently allocate staff, especially during peak hours. This ensures smooth operations and upholds a consistently high standard of guest service.",
    imageSrc: "/images/location-activity/14.png",
    imageAlt: "Hotel staff coordination interface",
    imagePosition:"right"
  }
];

export default function LocationActivityPage() {
    return (
        <div>
            <VideoBanner title="Smart employee location monitoring made simple" description="Gain real-time visibility and take control of productivity with precision, while ensuring workplace safety and peace of mind" videoSrc="/vid2.mp4"/>
            {
                locationTrackingFeatures.map((x,i) => (
                    <ImageTextSection key={i} title={x.title} titleColor="text-highlight" description={x.description} imageSrc={x.imageSrc} imageAlt={x.imageAlt} imagePosition={x.imagePosition}/>
                ))
            }
            <div className="container mx-auto flex flex-col text-center gap-4 py-4">
                <h3 className="text-4xl font-bold">Customize and Control Your Workspace</h3>
                <p className="text-muted-foreground text-xl">Leverage powerful features to manage team structures, restrict data access, and tailor Time Champ to fit your organization’s unique workflow. Stay organized, secure, and in full contro</p>
            </div>

            {
                managementFeatures.map((x,i) => (
                    <ImageTextSection key={i} title={x.title} titleColor="text-highlight" description={x.description} imageSrc={x.imageSrc} imageAlt={x.imageAlt} imagePosition={x.imagePosition}/>
                ))
            }

            <section className="bg-black py-10">
                    {
                        useCase.map((x,i) => (
                            <ImageTextSection key={i} title={x.title} titleColor="text-highlight" description={x.description} imageSrc={x.imageSrc} imageAlt={x.imageAlt} imagePosition={x.imagePosition} />
                        ))
                    }
            </section>
            <TestimonialsSectionTwo/>
            <FAQSection faqs={defaultHomepageFaqs}/>
        </div>
    )
}
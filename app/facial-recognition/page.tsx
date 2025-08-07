"use client"

import { FAQSection } from "@/components/faq-section"
import { ImageTextSection } from "@/components/image-text-section"
import { TestimonialsSectionTwo } from "@/components/testimonials-section-two"
import VideoBanner from "@/components/video-banner"

export default function ContactPage() {
    type FAQ = {
        id: number
        question: string
        answer: string
    }
    const customFaqs: FAQ[] = [
        {
            id: 1,
            question: "Is it legal for employers to monitor employee devices?",
            answer: "Click on the Sign Up button and fill in your details. It's quick and easy.",
        },
        {
            id: 2,
            question: "What can employee monitoring software track?",
            answer: "Yes, 24/7 customer support is available via chat and email.",
        },
        {
            id: 3,
            question: "What’s the most effective way to monitor employees?",
            answer: "Yes, 24/7 customer support is available via chat and email.",
        },
    ]
    const imageTextSections: Array<{
        title: string;
        subtitle: string;
        description: string;
        imageSrc: string;
        imageAlt: string;
        imagePosition: 'left' | 'right';
        backgroundColor: string;
        titleColor: string;
        subtitleColor: string;
    }> = [
        {
            title: "AI-Powered Attendance",
            subtitle: "Secure Clock-Ins with Face Recognition",
            description: "Employees can clock in effortlessly by scanning their face using a mobile device or shared kiosk. Powered by advanced AI, it ensures accurate, secure, and hassle-free attendance tracking no badges, no passwords, just a quick scan.",
            imageSrc: "/images/facial-reco/2.png",
            imageAlt: "Analytics Dashboard",
            imagePosition: "left",
            backgroundColor: "white",
            titleColor: "text-blue-900",
            subtitleColor: "text-gray-600",
        },
        {
            title: "Advanced 3D Face Scanning",
            subtitle: "Accurate, Secure & Effortless Clock-Ins",
            description: "Employees simply scan their face from multiple angles powerful AI creates a detailed biometric profile for reliable identification. Say goodbye to manual logins and enjoy a seamless, secure clock-in experience every time.",
            imageSrc: "/images/facial-reco/3.png",
            imageAlt: "Analytics Dashboard",
            imagePosition: "right",
            backgroundColor: "white",
            titleColor: "text-blue-900",
            subtitleColor: "text-gray-600",
        },
        {
            title: "Protect Against Face Spoofing",
            subtitle: "Security with Real-Time Validation",
            description: "Using advanced depth-sensing technology, our system detects and blocks attempts to clock in with photos or videos. This ensures only the right person is recognized preventing time fraud and keeping your data secure.",
            imageSrc: "/images/facial-reco/4.png",
            imageAlt: "Analytics Dashboard",
            imagePosition: "left",
            backgroundColor: "white",
            titleColor: "text-blue-900",
            subtitleColor: "text-gray-600",
        },
        {
            title: "Location-Based Clock-Ins Made Easy",
            subtitle: "Approved Work Zones",
            description: "Create virtual boundaries around designated work areas and assign team members to specific sites. Geofencing ensures employees can only clock in when they’re within the approved location helping you maintain accuracy and accountability.",
            imageSrc: "/images/facial-reco/5.png",
            imageAlt: "Analytics Dashboard",
            imagePosition: "right",
            backgroundColor: "white",
            titleColor: "text-blue-900",
            subtitleColor: "text-gray-600",
        },
        {
            title: "Understand Productivity",
            subtitle: "Track More Than Just Screen Time",
            description: "Gain valuable insights into employee behavior by monitoring website visits, app usage, and keystroke patterns during work hours. Get the full picture of how time is spent to better optimize performance and workflows.",
            imageSrc: "/images/facial-reco/6.png",
            imageAlt: "Analytics Dashboard",
            imagePosition: "left",
            backgroundColor: "white",
            titleColor: "text-blue-900",
            subtitleColor: "text-gray-600",
        },
        {
            title: "Offline Attendance, Always On Point",
            subtitle: "Reliable Tracking Without Internet ",
            description: "Even in remote or low-connectivity areas, employees can clock in and out using face recognition and location tracking. Jibble securely stores the data and syncs everything automatically once the connection is back ensuring uninterrupted attendance records.",
            imageSrc: "/images/facial-reco/7.png",
            imageAlt: "Analytics Dashboard",
            imagePosition: "right",
            backgroundColor: "white",
            titleColor: "text-blue-900",
            subtitleColor: "text-gray-600",
        },
        {
            title: "Stay Notified, Stay in Control",
            subtitle: "Smart Alerts for What Matters Most",
            description: "Intelligent notification system keeps you updated in real-time. Get instant alerts for face mismatches, late clock-ins, and more so you can take quick action and keep everything running smoothly.",
            imageSrc: "/images/facial-reco/8.png",
            imageAlt: "Analytics Dashboard",
            imagePosition: "left",
            backgroundColor: "white",
            titleColor: "text-blue-900",
            subtitleColor: "text-gray-600",
        },
        {
            title: "Unlock Actionable Insights",
            subtitle: "Visualize Workforce Data with Dashboards",
            description: "Easily see who’s working, where, and for how long. Our intuitive dashboard and detailed reports give you a complete overview of your team’s activities helping you streamline operations and make smarter decisions.",
            imageSrc: "/images/facial-reco/9.png",
            imageAlt: "Analytics Dashboard",
            imagePosition: "right",
            backgroundColor: "white",
            titleColor: "text-blue-900",
            subtitleColor: "text-gray-600",
        },
        {
            title: "Work Tools That Move With You",
            subtitle: "Access Insights Anytime, Anywhere",
            description: "Whether you're at the office, working remotely, or constantly on the move, keeps up. Enjoy the same powerful features on your phone as you do at your desk—so you're always connected, informed, and in control.",
            imageSrc: "/images/facial-reco/10.png",
            imageAlt: "Analytics Dashboard",
            imagePosition: "left",
            backgroundColor: "white",
            titleColor: "text-blue-900",
            subtitleColor: "text-gray-600",
        },
        {
            title: "Real-Time Location Tracking ",
            subtitle: "Accurate, Automated Update",
            description: "Effortlessly monitor your team’s live locations with automatic updates every few minutes. From face recognition attendance to GPS tracking, gives you full visibility ensuring secure, efficient, and uninterrupted operations.",
            imageSrc: "/images/facial-reco/11.png",
            imageAlt: "Analytics Dashboard",
            imagePosition: "right",
            backgroundColor: "white",
            titleColor: "text-blue-900",
            subtitleColor: "text-gray-600",
        },
    ];
    return (
        <>
            <VideoBanner
                videoSrc="/images/facial-recognition/banner.mp4"
                title="Zero-Cost Employee Monitoring Software"
                description="Track employee activities securely and transparently. Zero cost. Unlimited users"
                className="mb-16"
            />
            <section className="mx-auto flex flex-col space-y-12">
                {imageTextSections.map((section, idx) => (
                    <ImageTextSection
                        key={idx}
                        className="m-0"
                        title={section.title}
                        subtitle={section.subtitle}
                        description={section.description}
                        imageSrc={section.imageSrc}
                        imageAlt={section.imageAlt}
                        imagePosition={section.imagePosition}
                        titleColor={section.titleColor}
                        subtitleColor={section.subtitleColor}
                    />
                ))}
            </section>

            <section>
                <TestimonialsSectionTwo></TestimonialsSectionTwo>
            </section>

            <section>
                <FAQSection
                    faqs={customFaqs}
                    title="FAQs"
                    subtitle="Some frequently asked questions..."
                    showImage={true}
                    imageUrl="/images/facial-recognition/faq.png"
                    imageAlt="Custom FAQ Graphic"
                />
            </section>
        </>
    )
}
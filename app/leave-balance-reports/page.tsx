"use client"

import { FAQSection } from "@/components/faq-section"
import ImageContent from "@/components/ImageContent"
import { TestimonialsSectionTwo } from "@/components/testimonials-section-two"
import VideoBanner from "@/components/video-banner"
import { Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { Building2, User } from "lucide-react"

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
    return (
        <>
            <VideoBanner
                imageSrc="/images/leave-balance-reports/1.png"
                title="Zero-Cost Employee Monitoring Software"
                description="Track employee activities securely and transparently. Zero cost. Unlimited users"
                className="mb-16"
            />

            <section>
                <ImageContent
                    imageContent={
                        <div >
                            <img src="/images/leave-balance-reports/2.png" alt="" />
                        </div>
                    }
                    features={[
                        {
                            icon: <Clock className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />,
                            title: "Smart Timesheet Automation",
                            description: "Track work hours effortlessly with automatic time sheets..."
                        },
                        {
                            icon: <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />,
                            title: "Real-Time Productivity Insights",
                            description: "Monitor app and website usage to uncover productivity trends..."
                        },
                        {
                            icon: <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />,
                            title: "Proactive Activity Alerts",
                            description: "Stay informed with instant alerts on unusual activities..."
                        }
                    ]}
                />
                <ImageContent
                    imageSide="right"
                    imageContent={
                        <div >
                            <img src="/images/leave-balance-reports/3.png" alt="" />
                        </div>
                    }
                    features={[
                        {
                            icon: <Clock className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />,
                            title: "Smart Timesheet Automation",
                            description: "Track work hours effortlessly with automatic time sheets..."
                        },
                        {
                            icon: <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />,
                            title: "Real-Time Productivity Insights",
                            description: "Monitor app and website usage to uncover productivity trends..."
                        },
                        {
                            icon: <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />,
                            title: "Proactive Activity Alerts",
                            description: "Stay informed with instant alerts on unusual activities..."
                        }
                    ]}
                />
            </section>

            <section>
                <div className="w-full my-16">
                    {/* Hero Section */}
                    <section className="bg-[#0066B3] text-white py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="">
                                {/* First Feature Block */}
                                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-16">
                                    <div className="flex-shrink-0">
                                        <div>
                                            <img src="/images/leave-balance-reports/4.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">The Power of Time Tracking</h2>
                                        <p className="text-blue-100 leading-relaxed">
                                            Time tracking offers valuable insights into how time is spent, helping identify unproductive habits
                                            and streamline workflows. It enables better goal setting, task prioritization, and smarter resource
                                            allocation leading to improved focus and overall productivity.
                                        </p>
                                    </div>
                                </div>

                                {/* Second Feature Block */}
                                <div className="flex flex-col lg:flex-row-reverse items-center lg:items-center gap-16">
                                    <div className="flex-shrink-0">
                                        <div>
                                           <img src="/images/leave-balance-reports/5.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="text-center lg:text-right">
                                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Engage with Track Nexus Time Tracker</h2>
                                        <p className="text-blue-100 leading-relaxed">
                                            Time tracking offers valuable insights into how time is spent, helping identify unproductive habits
                                            and streamline workflows. It enables better goal setting, task prioritization, and smarter resource
                                            allocation leading to improved focus and overall productivity.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="bg-[#F8F3FF] py-16 px-4 sm:px-6 lg:px-8 mt-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                                {/* Company-Managed Devices */}
                                <div className=" rounded-lg p-6 lg:p-8 shadow-sm">
                                    <div className="flex items-end gap-4 mb-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Building2 className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Company-Managed Devices</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Ideal for office teams using company-provided computers, this setup ensures seamless tracking. Time
                                        Champ automatically starts when the device is powered on, giving you full control to monitor activity
                                        continuously, during set hours, or only when connected to a specific network—based on your
                                        organization&apos;s needs.
                                    </p>
                                </div>

                                {/* Remote Work Devices */}
                                <div className=" rounded-lg p-6 lg:p-8 shadow-sm">
                                    <div className="flex items-end gap-4 mb-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                <User className="w-6 h-6 text-green-600" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Remote Work Devices</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Perfect for remote or hybrid teams, this option gives employees more control over their time tracking.
                                        Using simple clock in/out buttons, team members can choose when Time Champ begins and ends monitoring,
                                        offering flexibility while still ensuring accountability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
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
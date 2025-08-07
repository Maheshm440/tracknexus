"use client";

import { FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import ImageContent from "@/components/ImageContent";
import SectionHeader from "@/components/section-header";
import { TestimonialsSectionTwo } from "@/components/testimonials-section-two";
import VideoBanner from "@/components/video-banner";
import { Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { Building2, User } from "lucide-react";
import Image from "next/image";

const imageTextData: {
  title?: string;
  subtitle?: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  iconListItems?: {
    iconSrc: string;
    iconAlt: string;
    listTitle: string;
    listSubtitle: string;
  }[];
}[] = [
  {
    title: "Go Paperless with Smarter HR Management",
    subtitle: "Empower your HR team with Track Nexus Intelligent HR software.",
    description:
      "Empower your HR team with Track Nexus intelligent HR software. Eliminate manual processes and reduce paperwork by digitizing your core HR operations. Save valuable time and resources while boosting accuracy, transparency, and overall efficiency.",
    imageSrc: "/images/hr-management/2.png",
    imagePosition: "right",
    iconListItems: [
      {
        iconSrc: "/images/hr-icon/4.png",
        iconAlt: "Employee Directory",
        listTitle: "Smart Employee Directory",
        listSubtitle:
          "Easily manage and access employee details in one organized, searchable platform.",
      },
      {
        iconSrc: "/images/hr-icon/5.png",
        iconAlt: "HR Workflows",
        listTitle: "Streamlined HR Workflows",
        listSubtitle:
          "Automate routine HR tasks from onboarding to exit with seamless and efficient workflows.",
      },
      {
        iconSrc: "/images/hr-icon/6.png",
        iconAlt: "HR Analytics",
        listTitle: "Insightful HR Analytics",
        listSubtitle:
          "Gain real-time insights into workforce data to support better decision-making.",
      },
      {
        iconSrc: "/images/hr-icon/7.png",
        iconAlt: "Document Management",
        listTitle: "Centralized Document Management",
        listSubtitle:
          "Securely store, manage, and access all HR documents in one place no more scattered files.",
      },
    ],
  },
  {
    title: "Master Time with Smart Workforce Tools",
    description:
      "Maximize team productivity by managing time more effectively. Track Nexus empowers your organization with intelligent tools that make every minute count  boosting efficiency, accuracy, and accountability.",
    imageSrc: "/images/hr-management/3.png",
    iconListItems: [
      {
        iconSrc: "/images/hr-icon/8.png",
        iconAlt: "Attendance Monitoring",
        listTitle: "Seamless Attendance Monitoring",
        listSubtitle:
          "Track employee attendance effortlessly with real-time, automated systems.",
      },
      {
        iconSrc: "/images/hr-icon/9.png",
        iconAlt: "Timesheets",
        listTitle: "Automated Timesheets",
        listSubtitle:
          "Eliminate manual entries with auto-generated timesheets for accurate payroll and reporting.",
      },
      {
        iconSrc: "/images/hr-icon/10.png",
        iconAlt: "Shift Scheduling",
        listTitle: "Adaptable Shift Scheduling",
        listSubtitle:
          "Create, manage, and adjust shifts with ease to suit your team’s dynamic needs.",
      },
      {
        iconSrc: "/images/hr-icon/11.png",
        iconAlt: "Performance Reporting",
        listTitle: "Live Performance Reporting",
        listSubtitle:
          "Access up-to-the-minute data to monitor hours, productivity, and workforce trends.",
      },
    ],
  },
  {
    title: "Take the Hassle Out of Leave Management",
    subtitle: "Say goodbye to messy spreadsheets and manual leave tracking.",
    description:
      "With Track Nexus, managing time off is smooth, transparent, and stress-free so you can focus on team.",
    imageSrc: "/images/hr-management/4.png",
    imageAlt: "Track Nexus Leave Management features",
    imagePosition: "right",
    iconListItems: [
      {
        iconSrc: "/images/hr-icon/12.png",
        iconAlt: "Leave Tracking",
        listTitle: "Monitor and manage employee leave",
        listSubtitle: "Ease using automated tracking",
      },
      {
        iconSrc: "/images/hr-icon/13.png",
        iconAlt: "Self-Service",
        listTitle: "Employee Self-Service",
        listSubtitle:
          "Let your team handle their own leave requests and balances through an",
      },
      {
        iconSrc: "/images/hr-icon/14.png",
        iconAlt: "Workload Balance",
        listTitle: "Balance workloads and avoid conflicts",
        listSubtitle: "With clear visibility into team",
      },
      {
        iconSrc: "/images/hr-icon/15.png",
        iconAlt: "Holiday Calendar",
        listTitle: "Built-in Holiday Calendar",
        listSubtitle:
          "Stay on top of public holidays and company-specific events all in one place",
      },
    ],
  },
];

const features = [
  {
    imageSrc: "/images/hr-management/5.png",
    title: "Modern HR Solutions",
    description:
      "Empower your workforce with advanced HR tools designed to meet today's employees needs. Time Champ helps you create a supportive, organized, and efficient work environment where every team member can thrive.",
  },
  {
    imageSrc: "/images/hr-management/6.png",
    title: "Role & Salary History Tracking",
    description:
      "Keep a complete record of employee designations and compensation changes. Ensure payroll accuracy, improve transparency, and streamline internal audits and HR reporting.",
  },
  {
    imageSrc: "/images/hr-management/7.png",
    title: "Smart Time & Attendance",
    description:
      "Automate time and attendance tracking to reduce errors and manual tasks. Ensure accurate work-hour logging, support work-life balance, and simplify scheduling with real-time data.",
  },
  {
    imageSrc: "/images/hr-management/8.png",
    title: "Automated Timesheets",
    description:
      "Ditch manual time entries with fully automated timesheets. Track employee hours precisely, reduce administrative effort, and improve operational efficiency.",
  },
  {
    imageSrc: "/images/hr-management/9.png",
    title: "Performance & Culture",
    description:
      "Build a high-performing team culture with tools that encourage recognition, feedback, and collaboration. Boost morale and retain top talent through performance-driven growth.",
  },
  {
    imageSrc: "/images/hr-management/10.png",
    title: "Payroll & Expense Management",
    description:
      "Manage employee salaries, reimbursements, and expenses all in one place. Time Champ ensures timely payments and clear financial oversight for a stress-free payroll experience.",
  },
];

export default function ContactPage() {
  type FAQ = {
    id: number;
    question: string;
    answer: string;
  };
  const customFaqs: FAQ[] = [
    {
      id: 1,
      question: "Is it legal for employers to monitor employee devices?",
      answer:
        "Click on the Sign Up button and fill in your details. It's quick and easy.",
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
  ];
  return (
    <>
      <VideoBanner
        imageSrc="/images/hr-management/1.png"
        title="Zero-Cost Employee Monitoring Software"
        description="Track employee activities securely and transparently. Zero cost. Unlimited users"
        className="mb-16"
      />

      <section>
        <SectionHeader
          title="Why Choose Time Champ for HR Management"
          subtitle="Empower your HR team with tools that boost engagement, simplify processes, and support employee growth in every stage of their journey"
        />
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          <div className="bg-[#252525] flex items-center justify-center gap-4 py-4 px-4 w-[382px] h-[177px] rounded-3xl">
            <Image
              height={25}
              width={25}
              src={`/images/hr-icon/1.png`}
              alt=""
            />
            <div className="text-white text-2xl">
              Smart Attendance Automation
            </div>
          </div>
          <div className="bg-[#252525] flex items-center justify-center gap-4 py-4 px-4 w-[382px] h-[177px] rounded-3xl">
            <Image
              height={25}
              width={25}
              src={`/images/hr-icon/2.png`}
              alt=""
            />
            <div className="text-white text-2xl">Seamless HR Automation</div>
          </div>
          <div className="bg-[#252525] flex items-center justify-center gap-4 py-4 px-4 w-[382px] h-[177px] rounded-3xl">
            <Image
              height={25}
              width={25}
              src={`/images/hr-icon/3.png`}
              alt=""
            />
            <div className="text-white text-2xl">
              Centralized Employee Directory
            </div>
          </div>
        </div>
      </section>

      <section>
        {imageTextData.map((x, i) => (
          <ImageTextSection
            key={i}
            title={x.title}
            subtitle={x.subtitle}
            description={x.description}
            imageSrc={x.imageSrc}
            iconListItems={x.iconListItems}
            imagePosition={x.imagePosition}
          />
        ))}
      </section>

      <section className="mb-20">
        <SectionHeader title="Streamlined Payroll for a Smoother Employee Experience" />
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4 ">
          {features.map((x, i) => (
            <div
              key={i}
              className="w-[387px] h[608px] p-4 border-2 border-gray-200 rounded-3xl"
            >
              <Image
                src={x.imageSrc}
                height={396}
                width={356}
                alt=""
                className="mb-4"
              />
              <div>
                <h6 className="text-xl">{x.title}</h6>
                <p>{x.description}</p>
              </div>
            </div>
          ))}
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
  );
}

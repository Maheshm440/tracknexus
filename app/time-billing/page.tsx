import Banner from "@/components/banner";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import OurAIIntegrations from "@/components/OurAIIntegrations";
import SectionHeader from "@/components/section-header";
import Image from "next/image";

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
}

const invoicingFeatureData: FeatureCardProps[] = [
  {
    id: "auto-generated-client-invoices",
    title: "Auto-Generated Client Invoices",
    description:
      "Powered by AI Automation from Track Nexus. Track Nexus uses advanced AI to automatically generate client invoices from real-time tracked hours, assigned tasks, and user-specific billing rates. It intelligently pulls data from daily logs, applies custom pricing rules, and compiles everything into a clean, professional invoice—ready to send in seconds. No need for manual calculations, spreadsheets, or back-and-forth corrections. Invoices are customizable with your branding, tax preferences, currency formats, and payment terms. Whether you're billing hourly, by task, or by project, Track Nexus ensures that every minute of work is accurately accounted for and turned into revenue—fast, error-free, and fully automated.",
    imageSrc: "/images/time-billing/time-billing-1.png",
    imageAlt: "Auto-Generated Client Invoices",
    imagePosition: "left",
  },
  {
    id: "billable-vs-non-billable-categorization",
    title: "Billable vs. Non-Billable Categorization",
    description:
      "AI-Smart Time Classification with Track Nexus. Track Nexus uses AI to automatically categorize tracked hours as billable or non-billable based on task types, user roles, and project-specific billing rules. This intelligent classification eliminates guesswork and ensures every minute is properly accounted for. Billable hours are seamlessly prepared for invoicing, while non-billable time is flagged for internal analysis. Teams gain clarity on how their time is distributed—enabling better decision-making, resource planning, and profitability tracking. By separating revenue-generating work from overhead, Track Nexus helps you focus efforts where they matter most and reduce time leakage across the organization.",
    imageSrc: "/images/time-billing/time-billing-2.png",
    imageAlt: "Billable vs. Non-Billable Categorization",
    imagePosition: "right",
  },
  {
    id: "integration-with-quickbooks-xero",
    title: "Integration with QuickBooks, Xero, and more",
    description:
      "AI-Enhanced Accounting Sync with Track Nexus. Track Nexus uses AI to streamline your financial workflow by integrating seamlessly with tools like QuickBooks, Xero, and other accounting platforms. Tracked hours, categorized by project and billing type, are automatically pushed into your accounting system—ready for payroll, invoicing, and reporting. No manual data transfer, no duplicate entries. AI ensures accuracy and consistency, so your billing and books stay in perfect sync. It supports multi-currency invoicing, tax rules, and client-specific templates—reducing administrative load, accelerating approvals, and giving finance teams real-time visibility into billable performance and revenue flow.",
    imageSrc: "/images/time-billing/time-billing-3.png",
    imageAlt: "Integration with QuickBooks, Xero, and more",
    imagePosition: "left",
  },
  {
    id: "project-based-rate-application",
    title: "Project-Based Rate Application",
    description:
      "Smart Billing Automation Powered by AI and Track Nexus. Track Nexus uses AI to automatically apply the correct billing rates based on project type, client, or team roles. Whether hourly, task-based, or flat-rate, it ensures accurate billing with no manual setup. Custom rate rules are applied in real time—eliminating errors and saving time. With Track Nexus, your billing stays consistent, smart, and revenue-focused, even across complex projects, multi-role teams, and dynamic client requirements—fully automated and always audit-ready. You can easily manage rate exceptions, discounts, or premium billing tiers, giving you full control while reducing billing disputes and administrative overhead.",
    imageSrc: "/images/time-billing/time-billing-4.png",
    imageAlt: "Project-Based Rate Application",
    imagePosition: "right",
  },
];

const aiPrecision = [
  {
    id: "ai-based-activity-idle-time-detection",
    iconSrc: "/monitor.png", // Placeholder for clock icon
    iconAlt: "Clock icon",
    title: "AI-based activity and idle time detection",
    description:
      "Track Nexus uses AI to identify when users are actively working or idle, ensuring accurate time logs without manual tracking or missed data.",
    bgColor: "#007bff", // Example color
  },
  {
    id: "offline-time-tracking-sync",
    iconSrc: "/monitor.png", // Placeholder for briefcase icon
    iconAlt: "Briefcase icon",
    title: "Offline time tracking & sync",
    description:
      "Track Nexus captures work hours even without internet and auto-syncs data once back online—so no time is ever lost.",
    bgColor: "#28a745", // Example color
  },
  {
    id: "automatic-timesheet-generation",
    iconSrc: "/monitor.png", // Placeholder for document icon
    iconAlt: "Document icon",
    title: "Automatic timesheet generation",
    description:
      "Track Nexus instantly builds timesheets from AI-captured work logs—accurate, organized, and ready for billing or payroll with no manual edits.",
    bgColor: "#ffc107", // Example color
  },
  {
    id: "per-user-daily-timelines",
    iconSrc: "https://placehold.co/50x50/000000/FFFFFF?text=Calendar", // Placeholder for calendar icon
    iconAlt: "Calendar icon",
    title: "Per-user daily timelines",
    description:
      "Track Nexus creates detailed daily timelines for each user—showing tasks, activities, and time spent with complete clarity.",
    bgColor: "#17a2b8", // Example color
  },
];

const realTimeReports = [
  {
    id: 'ai-powered-unbilled-hours-alerts',
    title: 'AI-Powered Unbilled Hours Alerts by Track Nexus',
    description: 'Track Nexus uses AI to alert you on unbilled hours—ensuring no billable time goes unnoticed or unpaid.'
    ,
    vidSrc:"/images/time-billing/2.mp4"
  },
  {
    id: 'top-performing-team-members',
    title: 'Top-Performing Team Members with AI by Track Nexus',
    description: 'Track Nexus uses AI to pinpoint your top-performing team members by analyzing work patterns, output, and time efficiency in real time.'
    ,
    vidSrc:"/images/time-billing/3.mp4"
  },
  {
    id: 'ai-driven-time-utilization',
    title: 'AI-Driven Time Utilization % by Track Nexus',
    description: 'Track Nexus uses AI to calculate time utilization by separating billable, non-billable, and idle hours—boosting overall team efficiency.'
    ,
    vidSrc:"/images/time-billing/4.mp4"
  },
  {
    id: 'total-billables-this-month',
    title: 'Total billables this month',
    description: 'We help you identify the most critical issue to address, instead of adapting large language models to fit every scenario.'
    ,
    vidSrc:"/images/time-billing/5.mp4"
  },
  {
    id: 'security-accuracy-you-can-trust',
    title: 'Security & Accuracy You Can Trust with TrackNexus AI',
    description: 'Track Nexus uses AI to deliver secure, accurate, and tamper-proof time and billing data you can trust.'
    ,
    vidSrc:"/images/time-billing/6.mp4"
  }
];

export default function TimeBillingPage() {
  return (
    <div>
      {/* 1 */}
      <Banner
        mediaType="video"
        mediaSrc="/images/time-billing/time-billing-vid.mp4"
        buttonText="Get Started"
        buttonLink="/"
        heading="Smarter Time Tracking. AI-Driven Billing. Powered by Track Nexus"
        subheading="Track Nexus uses AI to automate time tracking and billing—ensuring accurate logs and faster invoicing"
      />
      {/* 2 */}
      <ImageTextSection
        imageSrc="/images/time-billing/1.png"
        imageAlt="Smarter Time Tracking with Track Nexus AI"
        imagePosition="right"
        title="Smarter Time Tracking with Track Nexus AI"
        titleColor="text-highlight"
        subtitle="AI-Driven Time Intelligence"
        description="Track Nexus auto-logs work start/end times, breaks, and task transitions—powered by smart AI detection. No more manual input or missed hours. Real-time activity logs ensure every billable minute is captured accurately, whether your team is remote, in-office, or mobile. AI detects active work, idle time, and task switches automatically—giving you clean, compliant time data with zero manual effort.
Use it for payroll, billing, or productivity tracking—Track Nexus delivers reliable insights, live dashboards, and instant timesheets, all backed by intelligent automation."
      />

      {/* 3 */}
      <section className="container mx-auto mb-10">
        <SectionHeader title="Track Every Minute with AI Precision" subtitle="Capture work hours, task shifts, and breaks automatically—no manual input, just smart, accurate tracking"/>
        <div className="grid grid-cols-1 md:grid-cols-2  md:gap-x-[105px] md:gap-y-[32px] gap-y-5 mt-8 justify-items-center">
        {aiPrecision.map((feature) => (
          <div key={feature.id} className="relative flex justify-center items-center w-[628px] h-[211px]">
          <div className="absolute top-0 left-0 w-[211px] h-[211px] bg-sky-600 rounded-3xl z-0 hover:bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-300"></div>
          <div className="relative w-[540px] h-[150px] bg-white border-2 border-gray-200 rounded-2xl z-10 flex items-center gap-7 p-6">
            <Image
              src="/vector.png"
              alt="test"
              width={50}
              height={50}
              className=" p-2"
            />
            <div className="border-l-2 border-sky-600 pl-7">
              <h6 className="text-xl font-normal">
                AI-based activity and idle time detection
              </h6>
              <p>
                Track Nexus uses AI to identify when users are actively working or
                idle, ensuring accurate time logs without manual tracking or
                missed data.
              </p>
            </div>
          </div>
        </div>
        ))}
        </div>
      </section>

      {/* 4 */}
      <section>
        <SectionHeader
          title="Automated Billing & Invoicing with AI by Track Nexus"
          subtitle="Generate accurate invoices instantly with AI-powered time data—no missed hours, no manual effort"
        />
        {invoicingFeatureData.map((feature) => (
          <ImageTextSection
            key={feature.id}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.imageSrc}
            imageAlt={feature.title}
            imagePosition={feature.imagePosition}
          />
        ))}
      </section>

      {/* AI-Powered Real-Time Reports & Insights by Track Nexus */}
      <section className="mb-10">
        <SectionHeader title="AI-Powered Real-Time Reports & Insights by Track Nexus" subtitle="Full Financial & Time Visibility with AI by TrackNexus"/>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
  {realTimeReports.map(x => (
    <div key={x.id} className="w-[394px] h-[620px] flex flex-col justify-center items-center gap-4 border-2 border-gray-200 rounded-3xl p-5 hover:bg-sky-900 hover:text-white transition-all duration-300">
      <video
        className="w-[394px] h-[401px] rounded-3xl object-cover"
        autoPlay
        loop
        muted
        src={x.vidSrc}
      />
      <div className="text-2xl">{x.title}</div>
      <div>{x.description}</div>
    </div>
  ))}
</div>
      </section>

      <OurAIIntegrations />

      <FAQSection faqs={defaultHomepageFaqs} />
    </div>
  );
}

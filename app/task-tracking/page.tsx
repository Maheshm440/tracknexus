import Banner from "@/components/banner";
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
const featureData: FeatureCardProps[] = [
  {
    id: "ai-task-suggestions",
    title: "AI Task Suggestions",
    description:
      "Smarter task planning, driven by real-time insights. Track Nexus uses AI to recommend the right tasks to the right people at the right time. By analyzing team workload, skills, past performance, and current priorities, the system automatically suggests task assignments that boost efficiency and balance. It even detects idle time, highlights overdue items, and proposes next steps—so your team stays focused and productive without the guesswork.",
    imageSrc: "/images/task-tracking/1.png",
    imageAlt: "AI Task Suggestions",
  },
  {
    id: "ai-driven-task-timelines",
    title: "AI-Driven Task Timelines",
    description:
      "Smart timelines that adapt as your team works. Track Nexus brings your projects to life with adaptive task timelines designed to keep your team aligned and efficient. AI continuously monitors task progress, interdependencies, and team capacity to auto-adjust timelines as things change. When a delay or shift occurs, the system intelligently reschedules affected tasks, highlights potential bottlenecks, and ensures nothing falls through the cracks. No more static Gantt charts—just living, responsive timelines that help you deliver on time, every time.",
    imageSrc: "/images/task-tracking/2.png",
    imagePosition: "right",
    imageAlt: "AI-Driven Task Timelines",
  },
  {
    id: "ai-optimized-collaboration-tools",
    title: "AI-Optimized Collaboration Tools",
    description:
      "Streamline teamwork with intelligent task coordination. Track Nexus enhances collaboration by integrating AI into your daily workflows. From assigning tasks to sharing updates and managing deadlines, AI ensures the right people are always in sync. Get smart reminders, real-time suggestions, and automated follow-ups based on team activity. Integrated with tools like Slack, Zoom, and project boards, collaboration feels effortless—whether you're remote or in-office.",
    imageSrc: "/images/task-tracking/3.png",
    imageAlt: "AI-Optimized Collaboration Tools",
  },
  {
    id: "ai-driven-priority-status-labels",
    title: "AI-Driven Priority & Status Labels",
    description:
      'Instant clarity on what matters most—powered by intelligent labeling. Track Nexus uses AI to automatically assign priority levels and status labels based on task urgency, deadlines, dependencies, and team workload. No more manual tagging—tasks update themselves as conditions change. Whether it\'s "High Priority," "In Progress," or "At Risk," your team sees exactly where to focus, reducing confusion and boosting productivity across every project.',
    imageSrc: "/images/task-tracking/4.png",
    imagePosition: "right",
    imageAlt: "AI-Driven Priority & Status Labels",
  },
  {
    id: "smart-recurring-tasks",
    title: "Smart Recurring Tasks",
    description:
      "Automate routine work with intelligent scheduling. Track Nexus simplifies recurring tasks by using AI to learn patterns, optimize frequencies, and adjust schedules automatically. Whether it's weekly reports, daily check-ins, or monthly reviews, tasks are created and assigned without manual input. AI even suggests schedule changes based on team capacity, delays, or shifting priorities—keeping your workflow consistent and efficient.",
    imageSrc: "/images/task-tracking/5.png",
    imageAlt: "Smart Recurring Tasks",
  },
  {
    id: "ai-backed-task-time-logs",
    title: "AI-Backed Task Time Logs",
    description:
      "Accurate time tracking, auto-logged by intelligent systems. Track Nexus automatically logs the time spent on each task using AI-powered detection and tracking. From start to completion, every second is captured—no manual entries required. AI identifies active work sessions, pauses, and multitasking patterns to ensure precise time records. Use these logs for performance insights, billing, or project analysis with complete confidence and transparency.",
    imageSrc: "/images/task-tracking/6.png",
    imageAlt: "AI-Backed Task Time Logs",
    imagePosition: "right",
  },
];

const steps = [
  {
    title: "Planning",
    subTitle:
      "Set clear goals, define tasks, and outline timelines before starting.",
    color: "#3771C8",
  },
  {
    title: "Assignment",
    subTitle:
      "Assign the right tasks to the right people with clear responsibilities.",
    color: "#F08F2E",
  },
  {
    title: "Execution",
    subTitle: "Team members carry out tasks as per the plan.",
    color: "#CCD91C",
  },
  {
    title: "Tracking",
    subTitle: "Monitor progress, timelines, and task status in real time.",
    color: "#CCD91C",
  },
  {
    title: "Adjustment",
    subTitle: "Make changes based on performance and progress data.",
    color: "#3771C8",
  },
  {
    title: "Completion",
    subTitle: "Close tasks, review outcomes, and record learnings.",
    color: "#F08F2E",
  },
];

export default function TaskTracking() {
  return (
    <div>
      <Banner
        mediaType="video"
        mediaSrc="images/task-tracking/Businesswoman_Finance.mp4"
        buttonText="Get Started"
        buttonLink="/"
      />
      <ImageTextSection
        title="Why Task Tracking with Track Nexus?"
        titleColor="text-highlight"
        subtitle="AI Task Tracking Built for Teams Who Value Clarity and Control"
        description="Track Nexus makes it effortless to assign, monitor, and complete tasks with precision. Gain real-time visibility into team workflows, shifting priorities, and task progress—powered by intelligent automation. Automatically track task status, flag delays, and streamline collaboration across tools your team already uses. Whether you're managing sprints or daily checklists, Track Nexus keeps your entire team aligned, accountable, and moving forward."
        imageSrc="/images/task-tracking/5-benefits.png"
        imageAlt=""
        imagePosition="left"
      />
      {/* Advanced Task Tracking Built for Efficiency and Insight */}
      <section className="py-6">
        <SectionHeader
          title="Advanced Task Tracking Built for Efficiency and Insight"
          subtitle="Explore AI-enhanced features designed to simplify task tracking, boost team efficiency, and ensure full visibility."
        />
        {featureData.map((feature) => (
          <ImageTextSection
            key={feature.id}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.imageSrc}
            imageAlt={feature.imageAlt}
            imagePosition={feature.imagePosition}
          />
        ))}
      </section>
      {/*  Intelligent Task Management with AI */}
      <section className="py-8 mb-12">
        <SectionHeader
          title=" Intelligent Task Management with AI"
          subtitle="AI simplifies task management—automating assignments, optimizing workflows, and giving live updates on progress."
        />
        <div className="flex justify-center mb-16">
          <Image
            width={836}
            height={557}
            src="/images/task-tracking/task-management.png"
            alt="Intelligent Task Management with AI"
            className="rounded-2xl"
          />
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4 mt-4">
          {steps.map((x, i) => (
            <div
              key={i}
              style={{ backgroundColor: x.color }}
              className=" w-[234.273px] h-[356.203px] rounded-3xl"
            >
              <div
                className="w-[226.923px] h-[308.016px] bg-white translate-x-[15%] translate-y-[10%] rounded-3xl pt-12"
                style={{ boxShadow: "4px 0 8px rgba(0,0,0,0.1)" }}
              >
                <div
                  style={{ backgroundColor: x.color }}
                  className="flex justify-center items-center gap-2 w-[95.547px] h-[60.469px] ml-auto rounded-l-full text-white"
                >
                  <span>{i + 1}</span>
                </div>
                <div className="text-center px-5">
                  <div className="text-2xl font-bold">{x.title}</div>
                  <p>{x.subTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/*  */}
      <OurAIIntegrations />
    </div>
  );
}

import IntegrationCard from "@/components/IntegrationCard";
import SectionHeader from "@/components/section-header";

const cardData = [
  {
    id: "asana",
    title: "Asana",
    description:
      "Asana is a structured project management tool with tasks, timelines, and automation. When integrated with Track Nexus, it syncs tasks and tracks time using AI for real-time insights.",
    icon: "/images/integration/asana.svg",
  },
  {
    id: "trello",
    title: "Trello",
    description:
      "Trello is a simple, visual task-management tool based on boards and cards. With Track Nexus, you can track time from Trello cards and auto-map logs effortlessly using AI.",
    icon: "/images/integration/trello.svg",
  },
  {
    id: "microsoft-teams",
    title: "Microsoft Teams",
    description:
      "Microsoft Teams is a platform for team chat, meetings, and collaboration. Track Nexus lets you track time, get reminders, and view updates right inside Teams.",
    icon: "/images/integration/microsoft-teams.svg",
  },
  {
    id: "zoom-meet",
    title: "Zoom Meet",
    description:
      "Zoom is a video conferencing platform for virtual meetings and collaboration. Track Nexus logs meeting durations, links them to tasks, and helps analyze time spent on calls.",
    icon: "/images/integration/zoom.svg",
  },
  {
    id: "quick-books",
    title: "Quick Books",
    description:
      "Quickbooks is an accounting tool for invoicing, payroll, and expense management. Track Nexus syncs time logs with Quickbooks to automate billing and simplify payroll processing.",
    icon: "/images/integration/quickbooks.svg",
  },
  {
    id: "jira",
    title: "Jira",
    description:
      "Jira is a project management tool for issue tracking and agile workflows. Track Nexus syncs Jira issues, tracks time automatically, and provides AI-powered task insights.",
    icon: "/images/integration/jira.svg",
  },
  {
    id: "slack",
    title: "Slack",
    description:
      "Slack is a team messaging platform for real-time communication and collaboration. Track Nexus lets you start timers, receive reminders, and track tasks directly within Slack.",
    icon: "/images/integration/slack.svg",
  },
  {
    id: "google-workspace",
    title: "Google workspace",
    description:
      "Google Workspace offers tools like Gmail, Calendar, and Drive for team collaboration. Track Nexus syncs events, files, and tasks to track time and improve workflow efficiency.",
    icon: "/images/integration/google.svg",
  },
  {
    id: "zapier",
    title: "Zapier",
    description:
      "Zapier connects apps and automates workflows without coding. Track Nexus uses Zapier to link with 5,000+ apps, automating time tracking and task syncing across your tools.",
    icon: "/images/integration/zapier.svg",
  },
];

export default function OurAIIntegrations() {
  return (
    <div className="container mx-auto px-4 md:mb-20 mb-10">
      <SectionHeader
        title=" Our AI Integrations & Ecosystem"
        subtitle="Seamless AI Integration Across Your Workflow Track Nexus integrates AI into every step—automating tasks, analyzing performance, and streamlining your team's entire workflow effortlessly."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-[5rem] md:gap-y-[5rem] gap-y-5 mt-8 justify-items-center">
        {cardData.map((item) => (
          <IntegrationCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

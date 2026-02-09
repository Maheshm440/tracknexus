import Image from "next/image";
import SectionHeader from "./section-header";

const cards2 = [
  {
    id: "ai-work-pattern-analysis-1",
    number: 1,
    iconSrc: "/monitor.png", // Placeholder icon for AI Work Pattern Analysis
    title: "AI Work Pattern Analysis",
    description:
      "Track Nexus uses AI to detect trends, focus shifts, and inefficiencies—giving you a clear view of how work truly flows.",
  },
  {
    id: "distraction-alerts",
    number: 2,
    iconSrc: "/monitor.png", // Placeholder icon for Distraction Alerts
    title: "Distraction Alerts",
    description:
      "Track Nexus instantly flags unproductive app usage or off-task behavior, helping you reduce distractions and refocus teams in real time.",
  },
  {
    id: "ai-work-pattern-analysis-2",
    number: 3,
    iconSrc: "/monitor.png", // Placeholder icon for AI Work Pattern Analysis
    title: "AI Work Pattern Analysis",
    description:
      "Track Nexus uses AI to detect trends, focus shifts, and inefficiencies—giving you a clear view of how work truly flows.",
  },
];

export const InsightsFeatureCardsSection = () => {
  return (
    <section className="mb-20">
      <SectionHeader
        title="Smarter Work Insights with AI – Track Nexus"
        subtitle="Gain full visibility into work with real-time, AI-powered insights at every step"
      />
      <p className="container mx-auto mb-10 text-muted-foreground">
        Track Nexus uses intelligent AI tracking to monitor app usage, website
        visits, and activity levels—giving you real-time visibility into how
        your team works, minute by minute. Understand which tools are being
        used, where time is spent, and how engaged your team is throughout the
        day. No more guesswork—just accurate, actionable productivity datOur AI
        engine continuously analyzes work patterns to uncover trends, identify
        distractions, and spot inefficiencies across your team’s workflow. With
        these insights, Track Nexus offers intelligent suggestions on coaching
        opportunities, workload distribution, and process improvements—so you
        can boost productivity where it matters most. Make smarter decisions,
        backed by real-time data, not assumptions.a to help you optimize
        performance and guide smarter decisions.
      </p>
      <div className="flex justify-center items-center gap-5">
        {cards2.map((card, index) => (
          <div key={card.id} className="relative w-[24rem] h-[24rem] flex justify-center items-center shadow-lg border-2 border-gray-200 rounded-2xl">
            <div className="relative z-10 h-72 w-72 flex flex-col items-center text-center gap-4  p-4 bg-white">
              <div>0{index + 1}</div>
              <Image
                src={card.iconSrc || "/placeholder.svg"}
                alt="test"
                width={50}
                height={50}
              />
              {/* <Monitor size={50} style={{color: card.color}}/> */}

              <div className="">App & Website Monitoring (AI-Powered)</div>
              <p className="text-muted-foreground">
                Track Nexus uses AI to monitor app usage and website activity in
                real time—revealing focus patterns, distractions, and
                productivity levels instantly.
              </p>
            </div>
            <div
              className={`h-72 w-72  rounded-2xl absolute top-0 left-0 z-0`}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};

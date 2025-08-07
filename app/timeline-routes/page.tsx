"use client";
import Banner from "@/components/banner";
import { defaultHomepageFaqs, FAQSection } from "@/components/faq-section";
import { ImageTextSection } from "@/components/image-text-section";
import OurAIIntegrations from "@/components/OurAIIntegrations";
import SectionHeader from "@/components/section-header";
import { VideoTextSection } from "@/components/video-text-section";
import { ReactNode } from "react";
import { motion } from 'framer-motion'
import Image from 'next/image'

interface FeatureCardProps {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    imagePosition?: "left" | "right";
}

interface VideoTextSectionProps {
  id: string;
    title?: string | ReactNode;
    description?: string | ReactNode;
    videoSrc: string;
    videoAlt: string;
    videoPosition?: "left" | "right";
    backgroundColor?: "white" | "gray";
    titleColor?: string;
    className?: string;
}

const featureData : FeatureCardProps[] = [
    {
      id: 'smart-timelines',
      title: 'Smart Timelines (AI-driven)',
      description: 'Track Nexus brings your team’s daily work to life with Smart Timelines powered by AI. This feature automatically captures when tasks start, pause, resume, and finish. It builds a comprehensive and refined work pattern. AI analyzes this data to detect inefficiencies, bottlenecks, and time washes, helping managers understand how the day unfolds across teams and projects. It also adapts to past behaviors and workload trends, suggesting schedule improvements and helping redistribute tasks more effectively. With real-time visibility, predictive alerts, and intelligent adjustments, Smart Timelines ensure your team stays aligned, productive, and ahead of deadlines.',
      imageSrc: '/images/timeline-routes/1.jpg', 
      imageAlt: 'AI-driven smart timelines visual',
      imagePosition: 'right'
    },
    {
      id: 'gps-route-logs',
      title: 'GPS Route Logs (AI-enhanced)',
      description: 'Track Nexus combines the power of real-time GPS tracking and artificial intelligence to give businesses full visibility into team movement, work locations, and travel behavior. Built for today’s mobile, hybrid, and field-based workforces, it automatically logs and maps where employees go, how long they stay, and what routes they take—all without manual check-ins or paperwork. Whether your team is performing on-site services, deliveries, inspections or remote field visits, Track Nexus conveniently captures detailed location data—routes traveled, stop durations, distances covered, and time spent between locations. This raw data is then processed by advanced AI algorithms that do much more than just visualize a map. The system interprets movement patterns in the context of work activities, assigned tasks, and productivity benchmarks, giving managers a real-time view of what’s actually happening on the ground.',
      imageSrc: '/images/timeline-routes/2.jpg', 
      imageAlt: 'AI-enhanced GPS route logs visual',
      imagePosition: 'left'
    },
    {
      id: 'ai-based-idle-time-detection',
      title: 'AI-Based Idle Time Detection',
      description: 'Track Nexus combines GPS tracking with AI to log and analyze your team’s movement throughout the day. It records routes, stop durations, and travel patterns—ideal for field teams or hybrid setups. AI detects inefficiencies, flags unusual routes, and suggests smarter paths to improve accountability, reduce travel time, and optimize operations. Our time AI learns from past behavior and adjusts its analysis for better accuracy. It recognizes patterns, typical delays, and workflow habits to reduce false alerts and provide smarter suggestions. Managers gain real-time visibility, location-linked insights, and performance trends to make faster, data-driven decisions and improve daily planning.',
      imageSrc: '/images/timeline-routes/3.jpg', 
      imageAlt: 'AI-based idle time detection visual',
      imagePosition: 'right'
    },
    {
      id: 'break-task-visualization',
      title: 'Break and Task Visualization (AI-powered)',
      description: 'Track Nexus uses AI to visually map work sessions, break periods, and idle time in a clear, intuitive format. It automatically distinguishes between active tasks and downtime, showing exactly what work starts, pauses, and resumes. AI detects behavior patterns, flags excessive inactivity, and suggests optimal break times to support focus. This gives managers and employees a transparent view of time usage, helping to balance workloads, prevent burnout, and improve daily productivity. With Track Nexus, break and task visualization becomes actionable insight. AI tracks when breaks happen and analyzes their impact on performance and flow. It highlights patterns like frequent interruptions or energy dips, allowing managers to adjust schedules and helping teams build more sustainable, high-performing routines.',
      imageSrc: '/images/timeline-routes/4.jpg', 
      imageAlt: 'AI-powered break and task visualization visual',
      imagePosition: 'left'
    }
  ];


  const videoTextSectionData : VideoTextSectionProps[] = [
    {
      id: 'visual-daily-timeline',
      title: 'Visual daily timeline per user',
      description: 'Track Nexus offers an AI-powered visual timeline for each user, showing task start/end times, breaks, idle moments, and overall activity flow—giving managers a clear view of daily productivity.',
      videoSrc: '/images/timeline-routes/6.mp4', // Placeholder for video
      videoAlt: 'Visual daily timeline per user video',
      videoPosition: "right",
    },
    {
      id: 'ai-based-activity-detection',
      title: 'AI-based activity detection',
      description: 'Track Nexus uses AI to automatically detect user activity, idle time, and task changes. It ensures accurate time tracking and delivers real-time productivity insights without manual input.',
      videoSrc: '/images/timeline-routes/7.mp4', // Placeholder for video
      videoAlt: 'AI-based activity detection video',
      videoPosition: "left",
    },
    {
      id: 'break-identification-logging',
      title: 'Break identification & logging',
      description: 'Track Nexus uses AI to automatically detect and log break periods throughout the workday. It distinguishes between active work time and downtime, giving a clear view of daily routines and helping maintain balanced, productive schedules.',
      videoSrc: '/images/timeline-routes/8.mp4', // Placeholder for video
      videoAlt: 'Break identification and logging video',
      videoPosition: "right",
    },
    {
      id: 'performance-pattern-analysis',
      title: 'Performance pattern analysis (AI)',
      description: 'Track Nexus uses AI to analyze work patterns, spot performance trends, and highlight inefficiencies. It helps managers make informed decisions to improve team productivity.',
      videoSrc: '/images/timeline-routes/9.mp4', // Placeholder for video
      videoAlt: '/images/timeline-routes/9.mp4',
      videoPosition: "left",
    },
  ];
export default function TimelineRoutesPage() {
    return <div>
        <Banner mediaType="video" mediaSrc="images/timeline-routes/Tech_Background.mp4" buttonText="Get Started" buttonLink="/" />
        <ImageTextSection  title="What Is Timelines & Routes?" titleColor="text-highlight" subtitle="AI-Mapped and Measured Team Performance" description="Track Nexus Timelines & Routes provides a real-time, AI-powered view of your team’s daily task flow and physical movement. Whether your team is remote, field-based, or hybrid, AI intelligently maps out where time is spent, tracks progress across locations, and highlights patterns in productivity. This gives managers a clear, actionable picture—helping them optimize schedules, reduce idle time, and improve overall team efficiency with data-driven decisions."  imageSrc="/images/timeline-routes/dashboard.png" imageAlt="Timeline Routes Dashboard"/>
        {
            featureData.map((item, index) => (
                <ImageTextSection
                  key={index}
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  imagePosition={item.imagePosition}
                />
              ))
        }
        <section className="mb-10">
          <SectionHeader title="AI-Powered Work Timelines" subtitle="Track Nexus uses AI to map tasks, time, and movement in real time—giving you a clear, complete view of how every workday unfolds."/>
          <div className="flex flex-col gap-12">
        {
            videoTextSectionData.map((item, index) => (
                <VideoTextSection
                  key={index}
                  title={item.title}
                  description={item.description}
                  videoSrc={item.videoSrc}
                  videoAlt={item.videoAlt}
                  videoPosition={item.videoPosition}
                  backgroundColor={item.backgroundColor}
                />
              ))
        }
          </div>
        </section>

        <section className="mb-10">
          <SectionHeader title="Built with AI. Designed for Performance." subtitle="Every feature works smarter to help your team do more"/>
          <div className="px-4 lg:px-8 mb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
                      <motion.div className="relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Image
                src="/images/timeline-routes/10.jpg"
                alt="Graph overlay on paperwork"
                width={486}
                height={486}
                className="w-[628px] h-[628px] object-cover rounded-full"
              />
            </motion.div>

          {/* Content */}
          <motion.div className="space-y-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Gain real-time visibility into how work hours and movement align.
            </h3>
            <p className="text-lg font-semibold text-gray-700">
              Track Nexus takes time tracking to the next level.
            </p>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Track Nexus takes time tracking to the next level by combining intelligent time logs with GPS route monitoring, giving you unmatched visibility into how and where your team works. With AI at its core, every task, break, and route is automatically recorded, mapped, and analyzed—eliminating the need for manual input and guesswork.
              </p>
              <p>
                Instead of viewing time and location data as separate pieces, Track Nexus connects them seamlessly. AI links each work session to physical movement, showing exactly when a task was started, where it took place, how long it lasted, and how it aligns with project timelines.
              </p>
              <p>
                Interactive dashboards deliver live insights into your team’s daily flow—highlighting patterns, identifying delays, and flagging unusual behavior. Smart alerts notify you instantly if someone deviates from their assigned route, logs unexpected idle time, or misses a key task milestone.
              </p>
              <p>
                Whether you&apos;re managing a mobile workforce, a hybrid team, or an on-site crew, Track Nexus ensures that work hours and movement stay aligned, transparent, and optimized.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
        </section>

        <OurAIIntegrations/>
        <FAQSection faqs={defaultHomepageFaqs}/>
    </div>
}
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LandingTab } from "./landing";
import AiFeaturesForModernTeams from "@/components/AiFeaturesForModernTeams";
import ExportableBilling from "@/components/ExportableBilling";
import AiDrivenInsights from "@/components/AiDrivenInsights";

const whyNexus: {
  title: string;
  titleColor?: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  videoPosition: "left" | "right";
}[] = [
    {
      title: "Why Track Nexus?",
      titleColor: "text-highlight",
      subtitle:
        "AI Time Tracking Built for Teams Who Value Accuracy and Efficiency",
      description:
        "Track Nexus combines intelligent automation with real-time analytics to ensure every work hour is accurately recorded. From task-level tracking to automatic timesheets, our AI-driven system minimizes human error, improves accountability, and enhances team efficiency. Whether in-office or remote, teams get a clear, detailed view of productivity, making it easier to manage workloads, meet deadlines, and optimize performance.",
      imageSrc: "/images/time-tracking/why-nexus.png",
      imageAlt: "",
      videoPosition: "right",
    },
  ];

interface ImageTextSectionProps {
  title?: string | ReactNode;
  subtitle?: string;
  description?: string | ReactNode;
  imageSrc: string;
  imageAlt: string;
  videoPosition?: "left" | "right";
  backgroundColor?: "white" | "gray";
  titleColor?: string;
  subtitleColor?: string;
  className?: string;
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

function ImageVideoSection({
  title,
  description,
  videoPosition = "left",
  backgroundColor = "white",
  titleColor = "text-gray-900",
  className = "",
}: ImageTextSectionProps) {
  return (
    <div className={`px-4 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div
          className={`grid grid-cols- lg:grid-cols-3 gap-12 lg:gap-16 items-center ${videoPosition === "right" ? "lg:grid-flow-col-dense" : ""
            }`}
        >
          {/* video */}
          <motion.div
            className={`relative col-span-2 ${videoPosition === "right" ? "lg:col-start-2" : ""
              }`}
            {...(videoPosition === "left" ? fadeInLeft : fadeInRight)}
          >
            <video autoPlay loop muted playsInline className="rounded-2xl">
              <source
                src={`/images/activity-logs/Office_Laptop.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Content */}
          <motion.div
            className={`h-full ${videoPosition === "right" ? "lg:col-start-1" : ""
              }`}
            {...(videoPosition === "left" ? fadeInRight : fadeInLeft)}
          >
            <div className="h-full bg-[#F0F7F8] py-8 px-2 flex flex-col justify-between rounded-2xl">
              <div className="text-3xl text-[#055087] border-b-2 border-[#055087] pb-4">
                Visual daily timeline per user
              </div>
              <p className="text[#4F4F4F] text-xl text-center">
                Track Nexus offers an AI-powered visual timeline for each user,
                showing task start/end times, breaks, idle moments, and overall
                activity flow—giving managers a clear view of daily
                productivity.
              </p>
              <div className="flex justify-center">
                <button className="flex gap-2 text-[#252525] border-2 border-[#055087] rounded-full px-4 py-2">
                  <span>Book a demo</span>
                  <Image
                    src="/arrow-right.png"
                    alt="test"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function TestPage() {
  return (
    <div className="flex flex-col gap-12 justify-center items-center py-12">
      {/* 9 */}
      <h1>9</h1>
      <div className="w-[380px] h-[430px] flex flex-col justify-center items-center gap-4 rounded-2xl border-2 border-purple-600 text-center p-10">
        <div className="h-[84px] w-[84px] bg-purple-600 flex justify-center items-center rounded-full">
          <Image src={`/monitor.png`} height={25} width={25} alt="" />
        </div>
        <div className="text-2xl">Manager-Only Access & Control</div>
        <p className="text-[#4F4F4F]">
          Allow managers to securely access only their team’s data, evaluate
          performance metrics, and customize productivity labels—ensuring
          focused oversight and effective team management
        </p>
      </div>

      {/* 8 */}
      <div className=" w-[234.273px] h-[356.203px] bg-sky-600 rounded-3xl">
        <div
          className="w-[226.923px] h-[308.016px] bg-white translate-x-[15%] translate-y-[10%] rounded-3xl pt-12"
          style={{ boxShadow: "4px 0 8px rgba(0,0,0,0.1)" }}
        >
          <div className="flex justify-center items-center gap-2 w-[95.547px] h-[60.469px] bg-sky-600 ml-auto rounded-l-full text-white">
            <span>01</span>
          </div>
          <div className="text-center px-5">
            <div className="text-2xl font-bold">Planning</div>
            <p>
              Set clear goals, define tasks, and outline timelines before
              starting.
            </p>
          </div>
        </div>
      </div>

      {/* 1 */}
      <div className="relative flex justify-center items-center w-[628px] h-[211px]">
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

      {/* 2 */}

      {whyNexus.map((item, index) => (
        <ImageVideoSection
          key={index}
          title={item.title}
          titleColor={item.titleColor}
          subtitle={item.subtitle}
          description={item.description}
          imageSrc={item.imageSrc}
          imageAlt={item.imageAlt}
          videoPosition={item.videoPosition}
        />
      ))}

      {/* 3 */}
      <h1>3</h1>
      <div className="relative w-[21rem] h-[21rem]">
        <div className="relative z-10 h-72 w-72 flex flex-col items-center text-center gap-4 border-2 border-gray-200 rounded-2xl p-4 bg-white">
          <Image src="/monitor.png" alt="test" width={50} height={50} />
          <div>App & Website Monitoring (AI-Powered)</div>
          <p>
            Track Nexus uses AI to monitor app usage and website activity in
            real time—revealing focus patterns, distractions, and productivity
            levels instantly.
          </p>
        </div>
        <div className="h-72 w-72 bg-[#9747FF] rounded-2xl absolute bottom-0 right-0 z-0"></div>
      </div>
      {/* 4 */}
      <div className="w-64 h-64 bg-orange-600 p-2 clip-hexagon">
        <div className="w-full h-full bg-white clip-hexagon flex items-center justify-center">
          <div className="w-40 h-40 bg-gray-300 clip-hexagon flex items-center justify-center">
            <div className="w-[98%] h-[98%] bg-white clip-hexagon flex items-center justify-center text-center p-5 text-orange-600">
              Segment insights by team, role, or user
            </div>
          </div>
        </div>
      </div>
      {/* 5 */}
      <div className="relative">
        <div className="relative w-[620px] h-[235px] border-dashed border-4 border-gray-300 bg-gray-100 ">
          {/* ghraphic */}
          <div className="absolute flex items-center justify-center text-white text-2xl font-bold top-0 left-0 w-[50px] h-[50px] rounded-full bg-[#A2B969] translate-x-[-50%] translate-y-[-50%]">
            1
          </div>
          <div className="p-8 w-5/6">
            <ul className="list-disc flex flex-col gap-2">
              <li>
                <span className="font-bold">Real-Time Timelines </span> - Track
                daily work patterns, breaks, and focus hours with AI precision.
              </li>
              <li>
                <span className="font-bold">Real-Time Timelines </span> - Track
                daily work patterns, breaks, and focus hours with AI precision.
              </li>
              <li>
                <span className="font-bold">Real-Time Timelines </span> - Track
                daily work patterns, breaks, and focus hours with AI precision.
              </li>
            </ul>
          </div>
        </div>
        <div className="h-[235px] w-[220px] bg-[#A2B969] border-dashed border-l-4 border-gray-300 absolute top-0 right-0 rounded-s-full rounded-se-full translate-x-[50%] flex flex-col gap-2 text-center text-white justify-center items-center">
          <Image src="/clock-logo.png" alt="test" width={50} height={50} />
          <div>Activity timelines & app usage tracking</div>
        </div>
      </div>
      {/* 6 */}
      <h1>6</h1>
      <div className="relative flex justify-center items-center w-[450px] h-[300px] bg-white border-[20px] border-cyan-500 rounded-bl-full transform scale-x-[-1]">
        {/* logo */}
        <div>
          <div className="absolute flex justify-center items-center top-0 right-0 h-[145px] w-[145px] bg-white rounded-full border-2 border-gray-200 translate-x-[50%] translate-y-[30%] z-10">
            <div className="flex justify-center items-center w-[95px] h-[95px] shadow-inner rounded-full">
              <Image
                src={`/monitor.png`}
                height={50}
                width={50}
                alt=""
                className="shadow-md rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center scale-x-[-1]">
          <div className="title | text-2xl font-bold text-cyan-500">
            Report Export
          </div>
          <div className="subtitle | ">Compliance-Ready Documents</div>
        </div>

        {/* ghraphics */}
        <div className="absolute top-0 right-0 w-[160px] h-[150px] bg-cyan-500 rounded-tr-full translate-x-[100%] translate-y-[-13.5%] z-0"></div>
      </div>
      {/* ----- */}
      <h1>6.1</h1>
      <div className="relative flex justify-center items-center w-[450px] h-[300px] bg-white border-[20px] border-[#E1F0FD] rounded-3xl transform scale-x-[-1]">
        {/* logo */}
        <div>
          <div className="absolute flex justify-center items-center top-0 right-0 h-[145px] w-[145px] bg-white rounded-full border-2 border-gray-200 translate-x-[50%] translate-y-[30%] z-10">
            <div className="flex justify-center items-center w-[95px] h-[95px] shadow-inner rounded-full">
              <Image
                src={`/monitor.png`}
                height={50}
                width={50}
                alt=""
                className="shadow-md rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center scale-x-[-1]">
          <Image src={"/img.jpg"} alt="" width={452} height={292}/>
        </div>

        {/* ghraphics */}
        <div className="absolute top-0 right-0 w-[160px] h-[150px] bg-[#E1F0FD] rounded-tr-full translate-x-[100%] translate-y-[-13.5%] z-0"></div>
      </div>
      {/* 7 */}
      <div>
        <LandingTab />
      </div>

      <div className="flex flex-col gap-12 justify-center items-center py-12">
        <AiFeaturesForModernTeams />
      </div>
      <div className="flex flex-col gap-12 justify-center items-center py-12">
        <ExportableBilling />
      </div>
      <div className="flex flex-col gap-12 justify-center items-center py-12">
        <AiDrivenInsights />
      </div>

    </div>
  );
}

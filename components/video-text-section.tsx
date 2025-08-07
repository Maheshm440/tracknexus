'use client'
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface VideoTextSectionProps {
    title?: string | ReactNode;
    description?: string | ReactNode;
    videoSrc: string;
    videoAlt: string;
    videoPosition?: "left" | "right";
    backgroundColor?: "white" | "gray";
    titleColor?: string;
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
export function VideoTextSection({
    title,
    description,
    videoPosition = "left",
    backgroundColor = "white",
    titleColor = "text-gray-900",
    className = "",
    videoSrc
  }: VideoTextSectionProps) {
    return (
      <div className={`px-4 lg:px-8 ${className}`}>
        <div className="mx-auto max-w-7xl text-center">
          <div
            className={`grid grid-cols- lg:grid-cols-3 gap-12 lg:gap-16 items-center ${
              videoPosition === "right" ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* video */}
            <motion.div
              className={`relative col-span-2 ${
                videoPosition === "right" ? "lg:col-start-2" : ""
              }`}
              {...(videoPosition === "left" ? fadeInLeft : fadeInRight)}
            >
              <video autoPlay loop muted playsInline className="rounded-2xl">
                <source
                  src={videoSrc}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
  
            {/* Content */}
            <motion.div
              className={`h-full ${
                videoPosition === "right" ? "lg:col-start-1" : ""
              }`}
              {...(videoPosition === "left" ? fadeInRight : fadeInLeft)}
            >
              <div className="h-full bg-[#F0F7F8] py-8 px-2 flex flex-col justify-between rounded-2xl">
                <div className="text-3xl text-[#055087] border-b-2 border-[#055087] pb-4">
                    {title}
                </div>
                <p className="text[#4F4F4F] text-xl text-center">{description}</p>
                <div className="flex justify-center">
                  <button className="flex gap-2 text-[#252525] border-2 border-[#055087] rounded-full px-4 py-2">
                    <span>Book a demo</span>
                    <Image
                      src="/arrow-right-black.png"
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
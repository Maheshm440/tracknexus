"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface IconListItem {
  iconSrc: string;
  iconAlt: string;
  listTitle: string;
  listSubtitle: string;
}

interface ImageTextSectionProps {
  title?: string | ReactNode;
  subtitle?: string;
  description?: string | ReactNode;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  backgroundColor?: "white" | "gray";
  titleColor?: string;
  subtitleColor?: string;
  className?: string;
  list?: boolean;
  iconListItems?: IconListItem[];
  version?: "v1" | "v2";
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

export function ImageTextSection({
  title,
  subtitle,
  description,
  imageSrc = "/placeholder.svg",
  imageAlt = "Image",
  imagePosition = "left",
  backgroundColor = "white",
  titleColor = "text-gray-900",
  subtitleColor = "text-gray-800",
  className = "",
  iconListItems,
  version = "v1",
  videoSrc
}: ImageTextSectionProps) {

  return (
    <div className={`px-4 lg:px-8 ${className} mb-10`}>
      <div className="mx-auto max-w-7xl">
        <div
          className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center bg-white p-8 rounded-3xl`}
        >
          {/* Image Container - Order controlled by imagePosition */}
          <motion.div
            className={`w-full h-[320px] lg:w-1/2 ${
              imagePosition === "right" ? "lg:order-2" : "lg:order-1"
            }`}
            {...(imagePosition === "left" ? fadeInLeft : fadeInRight)}
          >
            {/* Image v1 - Made full width on mobile */}
            {videoSrc && (
              <video autoPlay loop muted playsInline className="rounded-2xl">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {version === "v1" && !videoSrc && (
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={imageAlt}
                width={580}
                height={320}
                className="h-[320px] object-cover rounded-2xl"
                priority
              />
            )}

            {/* Image v2 - Adjusted mobile sizing */}
            {version === "v2" && (
              <div className="relative flex justify-center items-center w-full h-[250px] sm:h-[300px] max-w-[450px] mx-auto bg-white border-[12px] sm:border-[20px] border-[#E1F0FD] rounded-2xl sm:rounded-3xl">
                <div>
                  <div className="absolute flex justify-center items-center top-0 right-0 h-[100px] sm:h-[145px] w-[100px] sm:w-[145px] bg-white rounded-full border-2 border-gray-200 translate-x-[40%] sm:translate-x-[50%] translate-y-[30%] z-10">
                    <div className="flex justify-center items-center w-[60px] sm:w-[95px] h-[60px] sm:h-[95px] shadow-inner rounded-full">
                      <Image
                        src={imageSrc || "/placeholder.svg"}
                        height={50}
                        width={50}
                        alt={imageAlt ? `${imageAlt} icon` : "Feature icon"}
                        className="shadow-md rounded-full w-[30px] sm:w-auto"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={imageSrc || "/placeholder.svg"}
                      alt={imageAlt || "Feature illustration"}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-[120px] sm:w-[160px] h-[110px] sm:h-[150px] bg-[#E1F0FD] rounded-tr-full translate-x-[80%] sm:translate-x-[100%] translate-y-[-13.5%] z-0"></div>
              </div>
            )}
          </motion.div>

          {/* Content Container - No changes needed for mobile */}
          <motion.div
            className={`w-full lg:w-1/2 space-y-4 ${
              imagePosition === "right" ? "lg:order-1" : "lg:order-2"
            }`}
            {...(imagePosition === "left" ? fadeInRight : fadeInLeft)}
          >
            {/* Content remains unchanged */}
            {title && (
              <h3 className={`text-3xl lg:text-4xl font-bold ${titleColor}`}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className={`text-lg font-semibold ${subtitleColor}`}>
                {subtitle}
              </p>
            )}
            {description && (
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {typeof description === "string" ? (
                  <p>{description}</p>
                ) : (
                  description
                )}
              </div>
            )}
            {iconListItems && iconListItems.length > 0 && (
              <div className="mt-6 space-y-4">
                {iconListItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-gray-700 text-lg">
                      <p className="font-semibold">{item.listTitle}</p>
                      <div className="flex gap-4 items-center">
                        <Image
                          src={item.iconSrc}
                          alt={item.iconAlt}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                        <p>{item.listSubtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

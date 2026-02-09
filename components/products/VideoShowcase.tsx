"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { OptimizedVideo } from "@/components/optimized-video";

interface VideoShowcaseProps {
  categoryTitle: string;
  videoSrc?: string;
  posterSrc?: string;
  gradient: string;
}

export function VideoShowcase({
  categoryTitle,
  videoSrc,
  posterSrc,
  gradient,
}: VideoShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-500"
      style={{ willChange: 'transform', boxSizing: 'border-box' }}
    >
      {videoSrc ? (
        <OptimizedVideo
          src={videoSrc}
          poster={posterSrc}
          autoPlay={false}
          lazy={true}
          loop={true}
          muted={true}
          showPlayButton={true}
          className="w-full h-full object-cover"
          alt={`${categoryTitle} demonstration video`}
        />
      ) : (
        // Placeholder when no video is provided
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
          {/* Gradient accent */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
          />

          {/* Animated gradient orbs */}
          <motion.div
            className={`absolute top-10 right-10 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-20`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={`absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-15`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Play button placeholder */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`w-24 h-24 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center shadow-2xl mb-5 cursor-pointer group hover:shadow-3xl transition-shadow duration-300`}
              style={{ willChange: 'transform' }}
            >
              <Play className="w-12 h-12 text-white ml-1.5 transition-transform duration-300" fill="currentColor" style={{ willChange: 'transform' }} />
            </motion.div>
            <p className="text-gray-700 font-semibold text-lg">Video coming soon</p>
            <p className="text-gray-500 text-sm mt-2 max-w-xs text-center">{categoryTitle} demonstration video</p>
          </div>

          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer" />
        </div>
      )}
    </motion.div>
  );
}

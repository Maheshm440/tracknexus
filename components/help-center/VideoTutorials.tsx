"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Clock, Video, X } from "lucide-react"
import { videoTutorials } from "@/lib/help-center-data"

interface VideoModalProps {
  youtubeId: string
  title: string
  onClose: () => void
}

function VideoModal({ youtubeId, title, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Close video"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl"
      >
        <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="text-white text-center mt-4 text-lg font-semibold">{title}</p>
      </motion.div>
    </motion.div>
  )
}

export default function VideoTutorials() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const handlePlayClick = (youtubeId: string, title: string) => {
    setSelectedVideo(youtubeId)
    setSelectedTitle(title)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Video className="w-6 h-6 text-deloitte-green" />
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
              Video Tutorials
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch step-by-step guides and tutorials to master TrackNexus features
          </p>
        </motion.div>

        {/* Videos Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {videoTutorials.map((video, index) => (
            <motion.div key={video.id} variants={itemVariants}>
              <div className="group h-full flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-deloitte-green hover:shadow-xl transition-all">
                {/* Thumbnail */}
                <div
                  className="relative overflow-hidden bg-gray-800 aspect-video cursor-pointer"
                  onClick={() => handlePlayClick(video.youtubeId, video.title)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center"
                    >
                      <Play className="w-6 h-6 text-deloitte-green ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col">
                  {/* Category */}
                  <span className="text-xs font-bold uppercase tracking-wider text-deloitte-green bg-deloitte-green/10 px-2 py-1 rounded-full w-fit mb-3">
                    {video.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-deloitte-green transition-colors">
                    {video.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
                    {video.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handlePlayClick(video.youtubeId, video.title)}
                      className="text-sm font-semibold text-deloitte-green hover:text-deloitte-green-dark transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
                      Watch Now
                    </button>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {video.duration}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/resources/webinars"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-deloitte-green text-deloitte-green font-semibold rounded-lg hover:bg-deloitte-green hover:text-white transition-colors"
          >
            <Video className="w-5 h-5" />
            View More Webinars
          </Link>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            youtubeId={selectedVideo}
            title={selectedTitle}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

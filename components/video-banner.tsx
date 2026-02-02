"use client"

import { OptimizedVideo } from "./optimized-video"

interface VideoBannerProps {
  imageSrc?: string
  videoSrc?: string
  /** Poster image for the video (shown before video loads) */
  poster?: string
  /** WebM version of the video for better compression */
  webmSrc?: string
  title?: string
  subtitle?: string
  description?: string
  className?: string
  /** Enable autoplay (default: true for hero background) */
  autoPlay?: boolean
  /** Enable lazy loading (default: false for hero) */
  lazy?: boolean
}

export default function VideoBanner({
  videoSrc,
  imageSrc,
  poster,
  webmSrc,
  title = "Zero-Cost Employee Monitoring Software",
  subtitle = "Track employee activities securely and transparently.",
  description = "Zero cost. Unlimited users",
  className = "",
  autoPlay = true,
  lazy = false,
}: VideoBannerProps) {
  return (
    <div className={`relative h-[40rem] w-full overflow-hidden ${className}`}>
      {/* Video Background */}
      {videoSrc && (
        <OptimizedVideo
          src={videoSrc}
          webmSrc={webmSrc}
          poster={poster || imageSrc}
          autoPlay={autoPlay}
          lazy={lazy}
          loop={true}
          muted={true}
          playsInline={true}
          showPlayButton={false}
          className="absolute inset-0 h-full w-full object-cover"
          containerClassName="absolute inset-0"
          alt={title || "Video banner background"}
        />
      )}

      {/* Fallback image if no video */}
      {!videoSrc && imageSrc && (
        <img
          src={imageSrc}
          alt="Banner background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-xl font-normal tracking-tight text-white md:text-3xl">{title}</h1>
            <p className="mt-4 text-base font-medium text-white sm:text-lg max-w-[30rem]">
             {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

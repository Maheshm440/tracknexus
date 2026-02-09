"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { Play } from "lucide-react"

interface OptimizedVideoProps {
  /** Primary video source (MP4) */
  src: string
  /** Optional WebM source for better compression */
  webmSrc?: string
  /** Poster image shown before video loads/plays */
  poster?: string
  /** Enable autoplay (default: false for performance) */
  autoPlay?: boolean
  /** Enable lazy loading via IntersectionObserver (default: true) */
  lazy?: boolean
  /** Loop the video (default: true for background videos) */
  loop?: boolean
  /** Mute the video (default: true) */
  muted?: boolean
  /** Play inline on mobile (default: true) */
  playsInline?: boolean
  /** Show play button overlay when not autoplaying */
  showPlayButton?: boolean
  /** Video preload strategy: "none" | "metadata" | "auto" (default: "auto" for autoplay, "metadata" otherwise) */
  preload?: "none" | "metadata" | "auto"
  /** CSS classes for the video element */
  className?: string
  /** CSS classes for the container */
  containerClassName?: string
  /** Callback when video starts playing */
  onPlay?: () => void
  /** Callback when video is paused */
  onPause?: () => void
  /** Callback when video enters viewport (lazy loading) */
  onVisible?: () => void
  /** Alt text for accessibility */
  alt?: string
}

export function OptimizedVideo({
  src,
  webmSrc,
  poster,
  autoPlay = false,
  lazy = true,
  loop = true,
  muted = true,
  playsInline = true,
  showPlayButton = true,
  preload,
  className = "",
  containerClassName = "",
  onPlay,
  onPause,
  onVisible,
  alt = "Video content",
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(!lazy)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isVisible) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            onVisible?.()
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "100px", // Start loading 100px before entering viewport
        threshold: 0.1,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, isVisible, onVisible])

  // Handle autoplay when visible
  useEffect(() => {
    if (isVisible && autoPlay && videoRef.current && !hasInteracted) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, show play button
        setIsPlaying(false)
      })
    }
  }, [isVisible, autoPlay, hasInteracted])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    onPlay?.()
  }, [onPlay])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
    onPause?.()
  }, [onPause])

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handlePlayClick = useCallback(() => {
    if (videoRef.current) {
      setHasInteracted(true)
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [isPlaying])

  // Derive WebM source from MP4 if not provided (but don't use if not explicitly provided)
  const derivedWebmSrc = webmSrc

  // Set preload strategy: auto for autoplay videos, metadata otherwise
  const preloadStrategy = preload || (autoPlay ? "auto" : "metadata")

  return (
    <div
      ref={containerRef}
      className={`relative ${containerClassName}`}
      role="region"
      aria-label={alt}
    >
      {/* Poster/Placeholder when not visible or not loaded */}
      {poster && (!isVisible || !isLoaded) && (
        <img
          src={poster}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          loading="lazy"
        />
      )}

      {/* Video element - only render when visible */}
      {isVisible && (
        <video
          ref={videoRef}
          className={`${className} ${!isLoaded && poster ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          preload={preloadStrategy}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          onPlay={handlePlay}
          onPause={handlePause}
          onLoadedData={handleLoadedData}
          aria-label={alt}
        >
          {/* WebM source first (better compression, modern browsers) - only if explicitly provided */}
          {derivedWebmSrc && <source src={derivedWebmSrc} type="video/webm" />}
          {/* MP4 fallback (universal support) */}
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Play button overlay */}
      {showPlayButton && !autoPlay && isVisible && isLoaded && !isPlaying && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group"
          aria-label="Play video"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-gray-800 ml-1" fill="currentColor" />
          </div>
        </button>
      )}

      {/* Loading skeleton when lazy loading */}
      {lazy && !isVisible && !poster && (
        <div className={`animate-pulse bg-gray-200 ${className}`} />
      )}
    </div>
  )
}

export default OptimizedVideo

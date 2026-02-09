"use client"

import { Button } from "@/components/ui/button";
import { OptimizedVideo } from "./optimized-video";

interface BannerMediaProps {
  mediaType: "video" | "image";
  mediaSrc: string;
  /** Poster image for the video */
  poster?: string;
  /** WebM version of the video */
  webmSrc?: string;
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonColor?: "text-highlight" | "text-white";
  /** Enable lazy loading (default: false for hero banners) */
  lazy?: boolean;
  /** Enable autoplay (default: true for background videos) */
  autoPlay?: boolean;
}

export default function Banner({
  mediaType,
  mediaSrc,
  poster,
  webmSrc,
  heading = "Welcome to Our Product",
  subheading = "Experience the future, today.",
  buttonText = "Get Started",
  buttonLink = "/",
  buttonColor = "text-highlight",
  lazy = false,
  autoPlay = true,
}: BannerMediaProps) {
  return (
    <div className="relative h-[724px] w-full overflow-hidden shadow-lg">
      {/* Background Media */}
      {mediaType === "video" ? (
        <OptimizedVideo
          src={mediaSrc}
          webmSrc={webmSrc}
          poster={poster}
          autoPlay={autoPlay}
          lazy={lazy}
          loop={true}
          muted={true}
          playsInline={true}
          showPlayButton={false}
          className="absolute top-0 left-0 w-full h-full object-cover"
          containerClassName="absolute inset-0"
          alt={heading || "Banner video background"}
        />
      ) : (
        <img
          src={mediaSrc}
          alt="Banner background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center bg-black/40 p-4 text-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{heading}</h1>
          <p className="text-lg">{subheading}</p>
          <Button variant="secondary" className="text-white bg-[#096EB6] hover:bg-[#3076a7] font-semibold border-white">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

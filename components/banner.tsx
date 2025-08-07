// components/BannerMedia.tsx
import { Button } from "@/components/ui/button";

interface BannerMediaProps {
  mediaType: "video" | "image";
  mediaSrc: string;
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonColor?: "text-highlight" | "text-white";
}

export default function Banner({
  mediaType,
  mediaSrc,
  heading = "Welcome to Our Product",
  subheading = "Experience the future, today.",
  buttonText = "Get Started",
  buttonLink = "/",
  buttonColor = "text-highlight",
}: BannerMediaProps) {
  return (
    <div className="relative h-[724px] w-full overflow-hidden shadow-lg">
      {/* Background Media */}
      {mediaType === "video" ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={mediaSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
          <Button variant="secondary" className="text-white bg-[#096EB6] hover:bg-[#3076a7]  font-semibold border-white">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

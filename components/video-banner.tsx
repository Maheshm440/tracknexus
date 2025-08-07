interface VideoBannerProps {
  imageSrc?: string
  videoSrc?: string
  title?: string
  subtitle?: string
  description?: string
  className?: string
}

export default function VideoBanner({
  videoSrc = "/placeholder-video.mp4",
  imageSrc = "/placeholder.svg",
  title = "Zero-Cost Employee Monitoring Software",
  subtitle = "Track employee activities securely and transparently.",
  description = "Zero cost. Unlimited users",
  className = "",
}: VideoBannerProps) {
  return (
    <div className={`relative h-[40rem] w-full overflow-hidden ${className}`}>
      {/* Video Background */}
      {videoSrc && (
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Banner background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Decorative Elements */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-16 left-8 h-12 w-12 rounded-full bg-red-500/80 blur-sm" />
        <div className="absolute top-1/3 left-4 h-8 w-8 rounded-full bg-red-500/60 blur-sm" />
        <div className="absolute bottom-1/3 left-12 h-16 w-16 rounded-full bg-red-500/70 blur-sm" />
        <div className="absolute top-1/4 right-1/4 h-6 w-6 rounded-full bg-red-400/50 blur-sm" />
        <div className="absolute bottom-1/4 right-1/3 h-10 w-10 rounded-full bg-red-500/60 blur-sm" />
      </div> */}

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

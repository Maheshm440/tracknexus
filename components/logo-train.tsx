"use client"

import Image from "next/image"

const logos = [
  { src: "/images/train-logs/1.png", alt: "Company 1" },
  { src: "/images/train-logs/2.png", alt: "Company 2" },
  { src: "/images/train-logs/3.png", alt: "Company 3" },
  { src: "/images/train-logs/4.png", alt: "Company 4" },
  { src: "/images/train-logs/5.png", alt: "Company 5" },
  { src: "/images/train-logs/6.png", alt: "Company 6" },
  { src: "/images/train-logs/7.png", alt: "Company 7" },
  { src: "/images/train-logs/8.png", alt: "Company 8" },
  { src: "/images/train-logs/9.png", alt: "Company 9" },
]

export function LogoTrain() {
  const duplicatedLogos = [...logos, ...logos]

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative group overflow-hidden">
          <div className="flex animate-scroll-mobile md:animate-scroll group-hover:pause">
            {duplicatedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-6">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={40}
                  className="object-contain h-10 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 
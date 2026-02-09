"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"

const testimonials = [
    {
        id: 1,
        image: "/images/review/img1.png",
        text: "Track Nexus has completely streamlined our timetracking. It's intuitive, fast and our team actually enjoys it",
        author: "Anjali M, Doctor ☆"
    },
    {
        id: 2,
        image: "/images/review/img2.png",
        text: "The best time tracking solution we've used. Saves us hours every week!",
        author: "Raj K, Developer ☆"
    },
    {
        id: 3,
        image: "/images/review/img3.png",
        text: "Simple yet powerful. Perfect for our remote team's needs.",
        author: "Priya S, Designer ☆"
    },
]

export function TestimonialsSectionTwo() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768) // Tailwind's md breakpoint
        }
        
        handleResize() // Set initial value
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const getTestimonialIndex = (offset: number) => {
        return (currentIndex + offset + testimonials.length) % testimonials.length
    }

    // Mobile view - single card
    if (isMobile) {
        return (
            <section className="bg-gray-50 px-4 py-12 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-normal text-[#096EB6] mb-4">
                            Join thousands who trust Track Nexus for effortless time management
                        </h2>
                    </motion.div>

                    {/* Mobile Slider */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                className="relative w-full h-[250px] rounded-2xl overflow-hidden mx-auto"
                                style={{
                                    backgroundImage: `url(${testimonials[currentIndex].image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    maxWidth: "400px"
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div
                                    className="absolute inset-0 z-10"
                                    style={{
                                        background: "linear-gradient(290.37deg, #83BCC4 -2.43%, #755555 99.95%)",
                                        mixBlendMode: "hard-light",
                                        borderRadius: "inherit",
                                        opacity: 1,
                                    }}
                                ></div>
                                <div className="relative z-20 text-white p-4 flex flex-col justify-center h-full space-y-2">
                                    <p>⭐⭐⭐⭐⭐</p>
                                    <p className="text-sm font-normal leading-snug">
                                        &ldquo;{testimonials[currentIndex].text}&rdquo;
                                    </p>
                                    <p className="text-sm font-medium">- {testimonials[currentIndex].author}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Arrows for mobile */}
                        <div className="flex justify-center items-center space-x-8 mt-6">
                            <button 
                                onClick={prevTestimonial}
                                className="border-2 border-[#096EB6] rounded-full p-2 hover:bg-[#096EB6] hover:text-white transition-colors"
                            >
                                <ArrowLeft className="text-[#096EB6] hover:text-white" size={20} />
                            </button>
                            <button 
                                onClick={nextTestimonial}
                                className="border-2 border-[#096EB6] rounded-full p-2 hover:bg-[#096EB6] hover:text-white transition-colors"
                            >
                                <ArrowRight className="text-[#096EB6] hover:text-white" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    // Desktop view - three cards
    return (
        <section className="bg-white px-4 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl lg:text-4xl font-normal text-[#096EB6] mb-4 max-w-[70rem] text-center mx-auto">
                        Join thousands who trust Track Nexus for effortless time management
                    </h2>
                </motion.div>

                {/* Desktop Slider */}
                <div className="relative">
                    {/* Testimonials */}
                    <div className="flex items-center justify-center gap-4 w-full">
                        {/* Left Testimonial (small) */}
                        <motion.div
                            key={getTestimonialIndex(-1)}
                            className="relative w-[400px] h-[260px] rounded-[32.4px] overflow-hidden shrink-0"
                            style={{
                                backgroundImage: `url(${testimonials[getTestimonialIndex(-1)].image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div
                                className="absolute inset-0 z-10"
                                style={{
                                    background: "linear-gradient(290.37deg, #83BCC4 -2.43%, #755555 99.95%)",
                                    mixBlendMode: "hard-light",
                                    borderRadius: "32.4px",
                                    opacity: 1,
                                }}
                            ></div>
                            {/* Content for side cards */}
                            <div className="relative z-20 text-white p-4 flex flex-col justify-center h-full space-y-1">
                                <p className="text-sm">⭐⭐⭐⭐⭐</p>
                                <p className="text-xs font-normal leading-tight">
                                    &ldquo;{testimonials[getTestimonialIndex(-1)].text}&rdquo;
                                </p>
                                <p className="text-xs font-medium">- {testimonials[getTestimonialIndex(-1)].author}</p>
                            </div>
                        </motion.div>

                        {/* Center Testimonial (large) */}
                        <motion.div
                            key={currentIndex}
                            className="relative w-[540px] h-[329.4px] rounded-[32.4px] overflow-hidden z-10"
                            style={{
                                backgroundImage: `url(${testimonials[currentIndex].image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div
                                className="absolute inset-0 z-10"
                                style={{
                                    background: "linear-gradient(290.37deg, #83BCC4 -2.43%, #755555 99.95%)",
                                    mixBlendMode: "hard-light",
                                    borderRadius: "32.4px",
                                    opacity: 1,
                                }}
                            ></div>
                            {/* Content for center card */}
                            <div className="relative z-20 text-white p-6 flex flex-col justify-center h-full space-y-2">
                                <p>⭐⭐⭐⭐⭐</p>
                                <p className="text-md font-normal leading-loose">
                                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                                </p>
                                <p className="text-md font-medium">- {testimonials[currentIndex].author}</p>
                            </div>
                        </motion.div>

                        {/* Right Testimonial (small) */}
                        <motion.div
                            key={getTestimonialIndex(1)}
                            className="relative w-[400px] h-[260px] rounded-[32.4px] overflow-hidden shrink-0"
                            style={{
                                backgroundImage: `url(${testimonials[getTestimonialIndex(1)].image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div
                                className="absolute inset-0 z-10"
                                style={{
                                    background: "linear-gradient(290.37deg, #83BCC4 -2.43%, #755555 99.95%)",
                                    mixBlendMode: "hard-light",
                                    borderRadius: "32.4px",
                                    opacity: 1,
                                }}
                            ></div>
                            {/* Content for side cards */}
                            <div className="relative z-20 text-white p-4 flex flex-col justify-center h-full space-y-1">
                                <p className="text-sm">⭐⭐⭐⭐⭐</p>
                                <p className="text-xs font-normal leading-tight">
                                    &ldquo;{testimonials[getTestimonialIndex(1)].text}&rdquo;
                                </p>
                                <p className="text-xs font-medium">- {testimonials[getTestimonialIndex(1)].author}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Arrows */}
                    <div className="flex justify-center items-center space-x-8 mt-16">
                        <button 
                            onClick={prevTestimonial}
                            className="border-2 border-[#096EB6] rounded-full p-2 hover:bg-[#096EB6] hover:text-white transition-colors"
                        >
                            <ArrowLeft className="text-[#096EB6] hover:text-white" />
                        </button>
                        <button 
                            onClick={nextTestimonial}
                            className="border-2 border-[#096EB6] rounded-full p-2 hover:bg-[#096EB6] hover:text-white transition-colors"
                        >
                            <ArrowRight className="text-[#096EB6] hover:text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
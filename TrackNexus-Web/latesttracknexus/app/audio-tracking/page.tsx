"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Mic, Volume2, Shield, FileText, Clock, Headphones } from "lucide-react"


const features = [
  {
    title: "Call Monitoring for Support Teams",
    description: "Monitor customer support and call center interactions to ensure representatives deliver accurate, high-quality service. Support training and development by allowing managers to identify best practices and areas for improvement through comprehensive call analytics.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Input & Output Recording",
    description: "Capture complete conversations from both ends of a call for better clarity and documentation. Whether it's client calls, team meetings, or support interactions, get full context with dual-channel recording capabilities.",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Verbal Transaction Recording",
    description: "In sectors like finance and stock trading, where verbal agreements are made over the phone, audio tracking provides a reliable record of each transaction. This helps safeguard both the company and the client, reducing the risk of misunderstandings or disputes.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Flexible Recording Schedules",
    description: "Gain the flexibility to schedule and track audio recordings based on your specific requirements. Set up automated recording schedules, trigger-based captures, or on-demand recordings to match your compliance and operational needs.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Mic,
    title: "Call Recording",
    description: "Record and store customer calls for quality assurance and training purposes.",
  },
  {
    icon: Volume2,
    title: "Meeting Detection",
    description: "Automatically detect when meetings are in progress for accurate time tracking.",
  },
  {
    icon: Shield,
    title: "Secure Storage",
    description: "All recordings are encrypted and stored securely in the cloud.",
  },
  {
    icon: FileText,
    title: "Transcription",
    description: "AI-powered transcription converts audio to searchable text records.",
  },
  {
    icon: Clock,
    title: "Scheduled Recording",
    description: "Set up flexible recording schedules based on your operational needs.",
  },
  {
    icon: Headphones,
    title: "Quality Assurance",
    description: "Monitor call quality and provide coaching based on real interactions.",
  },
]

const stats = [
  { value: "100%", label: "Call Coverage" },
  { value: "99.9%", label: "Audio Quality" },
  { value: "Secure", label: "Cloud Storage" },
  { value: "24/7", label: "Recording" },
]

const faqs = [
  {
    question: "Is audio monitoring legal?",
    answer: "Audio monitoring is legal when employees and customers are informed and consent is obtained. Track Nexus provides tools to ensure compliance with local recording consent laws.",
  },
  {
    question: "What audio is recorded?",
    answer: "Track Nexus records work-related calls and meetings based on your configured settings. Personal calls can be excluded, and recording schedules can be customized.",
  },
  {
    question: "How is audio data secured?",
    answer: "All audio recordings are encrypted in transit and at rest. Access is controlled through role-based permissions, and data is stored in secure cloud infrastructure.",
  },
  {
    question: "Can recordings be searched?",
    answer: "Yes, AI-powered transcription converts audio to text, making recordings fully searchable by keyword, date, participant, or topic.",
  },
]

export default function AudioTrackingPage() {
  return (
    <ProductPageLayout
      badge="Audio Monitoring"
      title="Workplace Audio"
      titleHighlight="Tracking"
      subtitle="Capture critical insights with intelligent audio monitoring. Ensure policy adherence, quality assurance, and compliance with comprehensive recording capabilities."
      heroImage="https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Mic, Volume2, Shield, Headphones]}
      features={features}
      benefitsTitle="Complete Audio Monitoring"
      benefitsSubtitle="Everything you need for workplace audio compliance and quality assurance"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for audio compliance?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}

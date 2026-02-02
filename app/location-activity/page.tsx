"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { MapPin, Navigation, Bell, Shield, Clock, Smartphone } from "lucide-react"

const features = [
  {
    title: "Live Team Location Tracking",
    description: "Stay connected with your team no matter where they are. Monitor real-time movements with precision and ease. Gain instant visibility into your field staff's location at any moment. Improve safety, accountability, and coordination in one place.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Historical Location Insights",
    description: "Analyze historical movement patterns to optimize future operations. Review completed routes and time spent at locations to improve planning efficiency. Use data-driven insights to make informed decisions about resource allocation and scheduling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Smart Location Alerts",
    description: "Receive automated alerts about your team's movements. Instant notifications for late arrivals, early departures, or unusual routes. Set geofence alerts for entry/exit from designated zones. Monitor sensitive areas with precision.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Multi-Device Compatibility",
    description: "Our tracking software works across smartphones and specialized GPS units. Ensures real-time connectivity whether your team is in the field or office. Mobile apps provide on-the-go flexibility while dedicated GPS devices offer precision.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: MapPin,
    title: "Real-Time Location",
    description: "See where your team is right now with live GPS tracking.",
  },
  {
    icon: Navigation,
    title: "Route History",
    description: "Review completed routes and optimize future travel paths.",
  },
  {
    icon: Bell,
    title: "Geofence Alerts",
    description: "Get notified when employees enter or leave designated areas.",
  },
  {
    icon: Shield,
    title: "Privacy Controls",
    description: "Configurable tracking that respects employee privacy.",
  },
  {
    icon: Clock,
    title: "Time at Location",
    description: "Track how long employees spend at each client site.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Track from any device—smartphones, tablets, or GPS units.",
  },
]

const stats = [
  { value: "Real-time", label: "Tracking" },
  { value: "GPS", label: "Precision" },
  { value: "Geofence", label: "Alerts" },
  { value: "24/7", label: "Monitoring" },
]

const faqs = [
  {
    question: "Is employee location tracking legal?",
    answer: "Yes, when employees are informed and provide consent. Track Nexus includes tools for transparent policies and employee acknowledgment of location tracking.",
  },
  {
    question: "Does tracking continue outside work hours?",
    answer: "No, you can configure tracking to only occur during work hours. Employees can also manually stop tracking when off duty.",
  },
  {
    question: "How accurate is GPS tracking?",
    answer: "Track Nexus uses high-precision GPS with accuracy typically within 5-10 meters. Indoor tracking uses Wi-Fi positioning for improved accuracy.",
  },
  {
    question: "Can I set up geofence zones?",
    answer: "Yes, create unlimited geofence zones around client sites, offices, or any location. Receive instant alerts when employees enter or exit these areas.",
  },
]

export default function LocationActivityPage() {
  return (
    <ProductPageLayout
      badge="Location Tracking"
      title="GPS Location"
      titleHighlight="Tracking"
      subtitle="Smart employee location monitoring made simple. Gain real-time visibility and take control of productivity for field teams and remote workers."
      heroImage="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[MapPin, Navigation, Bell, Shield]}
      features={features}
      benefitsTitle="Complete Location Features"
      benefitsSubtitle="Everything you need for field team and remote worker tracking"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for location tracking?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}

"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Scan, Shield, MapPin, Bell, Smartphone, Users } from "lucide-react"


const features = [
  {
    title: "AI-Powered Attendance",
    description: "Employees can clock in effortlessly by scanning their face using a mobile device or shared kiosk. Powered by advanced AI, it ensures accurate, secure, and hassle-free attendance tracking—no badges, no passwords, just a quick scan.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Advanced 3D Face Scanning",
    description: "Employees simply scan their face from multiple angles—powerful AI creates a detailed biometric profile for reliable identification. Say goodbye to manual logins and enjoy a seamless, secure clock-in experience every time.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Anti-Spoofing Protection",
    description: "Using advanced depth-sensing technology, our system detects and blocks attempts to clock in with photos or videos. This ensures only the right person is recognized—preventing time fraud and keeping your data secure.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Location-Based Verification",
    description: "Create virtual boundaries around designated work areas and assign team members to specific sites. Geofencing ensures employees can only clock in when they're within the approved location—helping you maintain accuracy and accountability.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Scan,
    title: "Instant Recognition",
    description: "Clock in under 2 seconds with our lightning-fast facial recognition technology.",
  },
  {
    icon: Shield,
    title: "Prevent Buddy Punching",
    description: "Eliminate time theft with biometric verification that can't be shared or faked.",
  },
  {
    icon: MapPin,
    title: "Geofencing Support",
    description: "Combine face recognition with location verification for maximum accuracy.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get instant notifications for face mismatches, late arrivals, and anomalies.",
  },
  {
    icon: Smartphone,
    title: "Works Offline",
    description: "Clock in even without internet—data syncs automatically when connected.",
  },
  {
    icon: Users,
    title: "Multi-Site Support",
    description: "Deploy across unlimited locations with centralized management.",
  },
]

const stats = [
  { value: "<2s", label: "Recognition Time" },
  { value: "99.9%", label: "Accuracy Rate" },
  { value: "0%", label: "Buddy Punching" },
  { value: "24/7", label: "Availability" },
]

const faqs = [
  {
    question: "Is facial recognition attendance legal?",
    answer: "Yes, when implemented with proper consent and data protection measures. Track Nexus complies with GDPR and other privacy regulations, ensuring employee consent and transparent data handling.",
  },
  {
    question: "What if an employee's appearance changes?",
    answer: "Our AI adapts to gradual changes like haircuts or glasses. For significant changes, employees can quickly update their biometric profile through a simple re-enrollment process.",
  },
  {
    question: "Does it work in low light conditions?",
    answer: "Yes, our facial recognition uses infrared technology that works accurately in various lighting conditions, including low light and outdoor environments.",
  },
  {
    question: "How is biometric data protected?",
    answer: "Biometric data is encrypted and stored securely. We use industry-standard encryption and never share biometric information with third parties.",
  },
]

export default function FacialRecognitionPage() {
  return (
    <ProductPageLayout
      badge="Biometric Attendance"
      title="Facial Recognition"
      titleHighlight="Attendance"
      subtitle="Secure, contactless clock-ins powered by AI. Eliminate buddy punching and ensure accurate attendance with advanced facial recognition technology."
      heroImage="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Scan, Shield, MapPin, Bell]}
      features={features}
      benefitsTitle="Why Choose Facial Recognition"
      benefitsSubtitle="The most secure and convenient way to track attendance"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for contactless attendance?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}

import { Metadata } from "next"
import { Clock, Users, BarChart3, Smartphone, MapPin, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Services - Track Nexus",
  description: "Comprehensive time tracking and employee management services by Track Nexus",
}

const services = [
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Accurate time tracking with automated timesheets, break management, and productivity insights.",
    features: ["Automatic time logging", "Manual time entry", "Break time tracking", "Overtime calculation"]
  },
  {
    icon: Users,
    title: "Employee Management", 
    description: "Complete employee monitoring and management solutions for teams of all sizes.",
    features: ["Employee profiles", "Attendance tracking", "Performance monitoring", "Team collaboration"]
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description: "Detailed reports and analytics to help you make data-driven decisions.",
    features: ["Real-time dashboards", "Custom reports", "Productivity analytics", "Export capabilities"]
  },
  {
    icon: Smartphone,
    title: "Mobile Tracking",
    description: "Track time and manage tasks on the go with our mobile applications.",
    features: ["iOS & Android apps", "Offline tracking", "GPS integration", "Push notifications"]
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description: "GPS-based location tracking for field employees and remote workers.",
    features: ["Real-time location", "Geofencing", "Route tracking", "Location history"]
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Enterprise-grade security to protect your sensitive business data.",
    features: ["Data encryption", "Secure cloud storage", "Access controls", "Compliance support"]
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-highlight to-[#043050] text-white py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Comprehensive time tracking and employee management solutions designed to boost your team&apos;s productivity and streamline your business operations.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Track Time Effectively
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From basic time tracking to advanced analytics, we provide all the tools your business needs to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-highlight to-[#043050] rounded-lg mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-highlight rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-highlight to-[#043050] text-white py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Time Management?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Get started with Track Nexus today and experience the difference our comprehensive services can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-highlight px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-highlight transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Need Help Getting Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our team of experts is here to help you implement and optimize Track Nexus for your business needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-highlight rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">24/7 customer support from our experienced team</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-highlight rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Setup</h3>
              <p className="text-gray-600 text-sm">Personalized setup and configuration for your business</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-highlight rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Training</h3>
              <p className="text-gray-600 text-sm">Comprehensive training for your team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
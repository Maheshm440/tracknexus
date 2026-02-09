import Image from "next/image"
import { Monitor, Clock, BarChart3, Workflow, Smartphone, Shield } from "lucide-react"

export default function PracticalInsight
() {
  const leftFeatures = [
    {
      icon: Monitor,
      title: "Device Activity Monitoring",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Clock,
      title: "Time & Attendance Analytics",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: BarChart3,
      title: "Task Engagement Metrics",
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const rightFeatures = [
    {
      icon: Workflow,
      title: "Streamlined Workflows",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Smartphone,
      title: "Smarter Tech Usage",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Shield,
      title: "Stronger Data Security",
      color: "bg-blue-100 text-blue-600",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Features */}
        <div className="space-y-6">
          {leftFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-xl ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-700 text-lg">{feature.title}</h3>
            </div>
          ))}
        </div>

        {/* Central Illustration */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm">
            <Image
              src="/images/office-tv/person.jpg"
              alt="Business person surrounded by technology icons and gears"
              width={400}
              height={300}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Right Features */}
        <div className="space-y-6">
          {rightFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-xl ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-700 text-lg">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

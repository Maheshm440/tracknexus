import Image from "next/image"
import { Monitor, Mic, Clock } from "lucide-react"

interface FeatureList {
    title: string
    description: string
    icon: React.ElementType
}
interface MonitoringFeatureProps {
    classname?: string
    imageSrc: string
    features: FeatureList[]
    reverse?: boolean
}

export default function MonitoringFeature({
    reverse = false,
  imageSrc,
  features,
}: MonitoringFeatureProps) {
  const data = [
    {
      icon: Monitor,
      title: "Screen Recording",
      description:
        "Monitor employee screen activity in real-time and schedule to align with your organizational needs.",
    },
    {
      icon: Mic,
      title: "Input and Output Recording",
      description: "Capture complete conversations from both ends of a call for better clarity and documentation.",
    },
    {
      icon: Clock,
      title: "Flexible Recording Schedules",
      description: "Gain the flexibility to schedule and track audio recordings based on your specific requirements.",
    },
  ]

  return (
    <div className={ `w-full max-w-6xl mx-auto p-8 flex ${reverse? "flex-row-reverse" : "flex-row"}` }>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Illustration */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md">
            <Image
              src={imageSrc || "/placeholder.svg"} 
              alt="Employee working at desk with time tracking and monitoring elements"
              width={500}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Right Features */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

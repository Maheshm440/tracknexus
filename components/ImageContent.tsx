import { ReactNode } from "react";
import { Clock } from "lucide-react";

interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
}

interface ImageContentSwapProps {
  features: FeatureItem[];
  imageSide?: "left" | "right";
  imageContent?: ReactNode;
}

export default function ImageContent({
  features,
  imageSide = "left",
  imageContent = <DefaultImageContent />,
}: ImageContentSwapProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Image side - dynamic order based on prop */}
        <div className={`relative ${imageSide === "left" ? "order-2 lg:order-1" : "order-2"}`}>
          {imageContent}
        </div>

        {/* Content side */}
        <div className={`space-y-8 md:space-y-12 ${imageSide === "left" ? "order-1 lg:order-2" : "order-1"}`}>
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureItem) {
  return (
    <div className="flex gap-4 md:gap-6">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 md:w-14 md:h-14 border-2 border-gray-300 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{title}</h3>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function DefaultImageContent() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-8 h-8 bg-blue-300 rounded-full"></div>
          <div className="absolute bottom-8 left-8 w-6 h-6 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1/2 right-8 w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center space-y-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-white" />
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="w-full h-8 bg-blue-100 rounded mb-2"></div>
              <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="w-full h-8 bg-green-100 rounded mb-2"></div>
              <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="w-full h-8 bg-purple-100 rounded mb-2"></div>
              <div className="w-4/5 h-2 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="w-full h-8 bg-orange-100 rounded mb-2"></div>
              <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
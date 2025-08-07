import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function IntegrationCard({
  title,
  description,
  icon,
}: IntegrationCardProps) {
  return (
    <Card className="w-full max-w-sm bg-white shadow-lg border border-gray-200 rounded-2xl">
      <CardContent className="p-8 text-center">
        {/* Asana Logo */}
        <div className="flex justify-center mb-6">
          <Image src={icon} alt={title} width={32} height={32} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          {description}
        </p>

        {/* Get Started Button with Gradient */}
        <Button className="w-full bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] hover:from-[#4338ca] hover:to-[#0891b2] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

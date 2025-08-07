import { Card } from "./ui/card";

export default function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[#096eb6] mb-6">
        {title}
      </h1>
      <p className="text-[21px] md:text-xl text-[#252525] max-w-4xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

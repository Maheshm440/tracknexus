"use client";
import Image from "next/image";

interface CardProps {
  title: string;
  subtitle: string;
  color: string; // Tailwind color class like 'cyan-500'
  iconSrc: string;
  reverse?: boolean;
}

export const DailyTimeline = ({
  title,
  subtitle,
  color,
  iconSrc,
  reverse = false,
}: CardProps) => {
  const colorClassMap = {
    "cyan-500": {
      text: "text-cyan-500",
      border: "border-cyan-500",
      bg: "bg-cyan-500",
    },
    "gray-500": {
      text: "text-gray-500",
      border: "border-gray-500",
      bg: "bg-gray-500",
    },
    "yellow-400": {
      text: "text-yellow-400",
      border: "border-yellow-400",
      bg: "bg-yellow-400",
    },
    "rose-500": {
      text: "text-rose-500",
      border: "border-rose-500",
      bg: "bg-rose-500",
    },
  };

  const { text, border, bg } =
    colorClassMap[color as keyof typeof colorClassMap] || colorClassMap["gray-500"];
  const flipClass = reverse ? "scale-x-[-1]" : "";
  const textFlipClass = reverse ? "scale-x-[-1]" : "";

  return (
    <div
      className={`relative flex justify-center items-center w-[450px] h-[300px] bg-white border-[20px] rounded-bl-full transform ${flipClass} border-${color}`}
    >
      {/* Floating logo */}
      <div
        className={`absolute flex justify-center items-center top-0 right-0 h-[145px] w-[145px] bg-white rounded-full border-2 border-gray-200 translate-x-[50%] translate-y-[30%] z-10`}
      >
        <div className="flex justify-center items-center w-[95px] h-[95px] shadow-inner rounded-full">
          <Image
            src={iconSrc}
            height={50}
            width={50}
            alt="icon"
            className="shadow-md rounded-full"
          />
        </div>
      </div>

      {/* Text */}
      <div
        className={`flex flex-col justify-center items-center ${textFlipClass}`}
      >
        <div className={`text-2xl font-bold text-${color}`}>{title}</div>
        <div>{subtitle}</div>
      </div>

      {/* Decorative graphic */}
      <div
        className={`absolute top-0 right-0 w-[160px] h-[150px] bg-${color} rounded-tr-full translate-x-[100%] translate-y-[-13.5%] z-0`}
      />
    </div>
  );
};

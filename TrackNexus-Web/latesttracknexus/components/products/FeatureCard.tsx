"use client";

import { motion } from "framer-motion";
import { Feature } from "./ProductsData";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  feature: Feature;
  gradient: string;
  color?: string;
  index: number;
}

export function FeatureCard({ feature, gradient, color, index }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative p-7 rounded-3xl bg-white border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-transparent cursor-pointer"
      style={{ willChange: 'transform', boxSizing: 'border-box' }}
    >
      {/* Gradient background that appears on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Subtle gradient accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 group-hover:opacity-10 blur-2xl transition-opacity duration-500"
        style={{ backgroundImage: color ? `linear-gradient(to bottom right, ${color}, transparent)` : undefined }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="mb-5"
          whileHover={{ rotate: 3, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, duration: 0.3 }}
          style={{ willChange: 'transform' }}
        >
          <div className={`inline-flex p-3.5 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 group-hover:text-white/90 transition-colors duration-300 line-clamp-3">
          {feature.description}
        </p>

        {/* Read more arrow that appears on hover */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 0, x: 0 }}
          className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ color: color || '#3b82f6' }}
        >
          <span className="group-hover:text-white">Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white" />
        </motion.div>
      </div>

      {/* Decorative corner element */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors duration-500" />
    </motion.div>
  );
}

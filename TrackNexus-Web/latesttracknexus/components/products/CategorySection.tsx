"use client";

import { motion } from "framer-motion";
import { Category } from "./ProductsData";
import { FeatureCard } from "./FeatureCard";
import { VideoShowcase } from "./VideoShowcase";

interface CategorySectionProps {
  category: Category;
  index: number;
  videoPosition?: "left" | "right";
}

export function CategorySection({
  category,
  index,
  videoPosition = "left",
}: CategorySectionProps) {
  const Icon = category.icon;
  const isEven = index % 2 === 0;
  const actualVideoPosition = videoPosition || (isEven ? "left" : "right");

  return (
    <section
      id={category.id}
      className="py-20 md:py-28 scroll-mt-24 relative overflow-hidden"
    >
      {/* Background Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 -z-10" />
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br opacity-5 blur-3xl -z-10"
        style={{ backgroundImage: `linear-gradient(to bottom right, ${category.color}, transparent)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg shadow-${category.color}/20`}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {category.title}
              </h2>
              <div className={`h-1 w-24 bg-gradient-to-r ${category.gradient} rounded-full mt-2`} />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            {category.description}
          </p>
        </motion.div>

        {/* Video and Features Layout */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
            actualVideoPosition === "right" ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: actualVideoPosition === "right" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`${
              actualVideoPosition === "right" ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <VideoShowcase
              categoryTitle={category.title}
              gradient={category.gradient}
            />
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: actualVideoPosition === "right" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`${
              actualVideoPosition === "right" ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {category.features.map((feature, featureIndex) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  gradient={category.gradient}
                  color={category.color}
                  index={featureIndex}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-28">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${category.gradient}`} />
          </div>
        </div>
      </div>
    </section>
  );
}

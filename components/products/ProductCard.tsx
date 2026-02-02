"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Category } from "./ProductsData";

interface ProductCardProps {
  category: Category;
  index: number;
}

export function ProductCard({ category, index }: ProductCardProps) {
  const router = useRouter();
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      onClick={() => router.push(`/product/${category.id}`)}
      className="group relative cursor-pointer h-full"
      style={{ willChange: 'transform' }}
    >
      {/* Animated Glow Border - contained within card boundaries */}
      <div className="absolute inset-0 bg-gradient-to-r from-deloitte-green via-deloitte-green-dark to-deloitte-green rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 group-hover:blur-2xl" />

      {/* Main Card */}
      <div className="relative h-full min-h-[360px] bg-white rounded-3xl overflow-hidden border border-gray-100 group-hover:border-deloitte-green/20 shadow-xl group-hover:shadow-2xl transition-all duration-500 flex flex-col" style={{ boxSizing: 'border-box' }}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-deloitte-black via-gray-900 to-deloitte-black" />
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306B6D4' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating Orb - Cyan Theme */}
        <motion.div
          className="absolute top-6 right-6 w-32 h-32 bg-deloitte-green/0 group-hover:bg-deloitte-green/10 rounded-full blur-2xl transition-all duration-700"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="relative p-4 lg:p-5 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 flex-shrink-0">
            {/* Icon with Enhanced Hover */}
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative flex-shrink-0"
              style={{ willChange: 'transform' }}
            >
              <div className="absolute inset-0 bg-deloitte-green/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-deloitte-green to-deloitte-green-dark shadow-lg group-hover:shadow-xl group-hover:shadow-deloitte-green/50 transition-all duration-500">
                <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </motion.div>

            {/* Glassmorphic Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex items-center gap-1 px-2 py-1 bg-deloitte-green/10 backdrop-blur-md border border-deloitte-green/30 group-hover:bg-deloitte-green/20 group-hover:border-deloitte-green/50 text-deloitte-green group-hover:text-white rounded-full text-xs font-bold shadow-lg transition-all duration-500 flex-shrink-0"
            >
              <Zap className="w-3 h-3 fill-current" />
              Popular
            </motion.div>
          </div>

          {/* Title with Light Typography */}
          <motion.h3
            className="text-base lg:text-lg font-light text-gray-900 group-hover:text-white mb-2 transition-colors duration-500 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <span className="font-bold">{category.title.split(' ')[0]}</span>
            {' '}
            {category.title.split(' ').slice(1).join(' ')}
          </motion.h3>

          {/* Description */}
          <p className="text-gray-600 group-hover:text-white/90 mb-4 leading-relaxed line-clamp-2 transition-colors duration-500 text-sm flex-shrink-0 min-h-[40px]">
            {category.description}
          </p>

          {/* Keywords with Enhanced Styling */}
          <div className="flex flex-wrap gap-1.5 mb-4 flex-shrink-0">
            {category.keywords.slice(0, 3).map((keyword, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.4 + i * 0.05 }}
                className="px-2 py-1 bg-gray-50 group-hover:bg-white/10 backdrop-blur-sm border border-gray-200 group-hover:border-white/20 text-gray-700 group-hover:text-white text-xs font-medium rounded-lg transition-all duration-500 hover:scale-105"
              >
                {keyword}
              </motion.span>
            ))}
            {category.keywords.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 group-hover:bg-white/10 backdrop-blur-sm border border-gray-200 group-hover:border-white/20 text-gray-700 group-hover:text-white text-xs font-medium rounded-lg transition-all duration-500">
                +{category.keywords.length - 3}
              </span>
            )}
          </div>

          {/* Features Count and CTA */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-200 group-hover:border-deloitte-green/30 transition-colors duration-500 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-deloitte-green transition-colors duration-500" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-white/90 transition-colors duration-500">
                {category.features.length} Features
              </span>
            </div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-2 text-sm font-bold text-deloitte-green group-hover:text-white transition-all duration-500"
              style={{ willChange: 'transform' }}
            >
              Explore
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Enhanced Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: '-200%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-deloitte-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-bl-full" />
      </div>

      {/* Animated Bottom Glow - contained within card */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-deloitte-green/0 group-hover:bg-deloitte-green/30 rounded-full blur-2xl transition-all duration-700"
        animate={{
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

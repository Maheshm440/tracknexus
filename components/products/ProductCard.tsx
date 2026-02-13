"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Category } from "./ProductsData";

interface ProductCardProps {
  category: Category;
  index: number;
}

export function ProductCard({ category }: ProductCardProps) {
  if (!category) {
    return null;
  }

  const Icon = category.icon;

  return (
    <Link
      href={`/product/${category.id}`}
      className="group block bg-white rounded-2xl border-2 border-gray-300 p-6 no-underline transition-all duration-300 hover:scale-105 hover:border-cyan-500 hover:shadow-2xl"
      title=""
      aria-label={category.title}
      style={{
        outline: 'none',
        textDecoration: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.removeAttribute('title');
      }}
    >
      {/* Icon */}
      {Icon && (
        <div className="mb-4">
          <div className="inline-flex p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: '#06B6D4' }}>
            <Icon className="w-6 h-6" style={{ color: 'white' }} />
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-bold mb-2 transition-colors duration-300 group-hover:text-cyan-600" style={{ color: '#111827' }}>
        {category.title || 'Untitled'}
      </h3>

      {/* Description */}
      <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
        {category.description || ''}
      </p>

      {/* Keywords */}
      <div className="mb-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {category.keywords?.slice(0, 3).map((keyword, i) => (
          <span
            key={i}
            className="px-2 py-1 text-xs rounded"
            style={{ backgroundColor: '#F3F4F6', color: '#374151' }}
          >
            {keyword}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t-2" style={{ borderColor: '#E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="text-sm" style={{ color: '#6B7280' }}>
          {category.features?.length || 0} Features
        </span>
        <div className="transition-all duration-300 group-hover:translate-x-2" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#06B6D4', fontWeight: 'bold', fontSize: '14px' }}>
          <span>View</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

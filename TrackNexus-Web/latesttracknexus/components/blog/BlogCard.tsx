'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog/types';
import { format } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden">
        <div
          className={`relative ${featured ? 'h-full min-h-[300px]' : 'h-48'}`}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            style={{ willChange: 'transform' }}
          />
          <div className="absolute top-4 left-4">
            <span
              className="px-3 py-1 text-xs font-medium text-white rounded-full"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.name}
            </span>
          </div>
        </div>
      </Link>

      <div className={`p-6 ${featured ? 'flex flex-col justify-center' : ''}`}>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {format(new Date(post.date), 'MMM d, yyyy')}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3
            className={`font-bold text-gray-900 mb-2 group-hover:text-highlight transition-colors ${
              featured ? 'text-2xl' : 'text-lg'
            }`}
          >
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {post.author.name}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-highlight hover:gap-2 transition-all"
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog/types';
import { format } from 'date-fns';

interface BlogHeaderProps {
  post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <header className="relative">
      {/* Cover Image */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category Badge */}
            <span
              className="inline-block px-4 py-1 text-sm font-medium text-white rounded-full mb-4"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.name}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">{post.author.name}</p>
                  <p className="text-sm text-white/70">{post.author.role}</p>
                </div>
              </div>

              <span className="hidden md:block text-white/40">|</span>

              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 hover:text-white transition-colors ml-auto"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

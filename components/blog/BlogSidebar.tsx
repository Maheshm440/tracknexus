'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Tag } from 'lucide-react';
import { BlogPost, Category } from '@/lib/blog/types';
import { format } from 'date-fns';

interface BlogSidebarProps {
  categories: Category[];
  recentPosts: BlogPost[];
  tags: string[];
  currentCategory?: string;
}

export function BlogSidebar({
  categories,
  recentPosts,
  tags,
  currentCategory,
}: BlogSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/blog"
              className={`block px-3 py-2 rounded-lg transition-colors ${
                !currentCategory
                  ? 'bg-highlight text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Posts
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${category.slug}`}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  currentCategory === category.slug
                    ? 'bg-highlight text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="flex gap-3 group">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-highlight transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 10).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="bg-highlight rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
        <p className="text-white/80 text-sm mb-4">
          Get the latest productivity tips and insights delivered to your inbox.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button className="w-full bg-white text-highlight font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Subscribe
        </button>
      </div>
    </aside>
  );
}

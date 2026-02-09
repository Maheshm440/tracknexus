import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogPostFrontmatter } from './types';
import { getAuthorById } from '@/content/blog/authors';
import { getCategoryBySlug } from '@/content/blog/categories';

const postsDirectory = path.join(process.cwd(), 'content/blog/posts');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogPostFrontmatter;

  const author = getAuthorById(frontmatter.authorId);
  const category = getCategoryBySlug(frontmatter.categorySlug);

  if (!author || !category) {
    console.error(`Missing author or category for post: ${slug}`);
    return null;
  }

  const stats = readingTime(content);

  return {
    slug: realSlug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    content,
    coverImage: frontmatter.coverImage,
    date: frontmatter.date,
    author,
    category,
    tags: frontmatter.tags || [],
    readingTime: stats.text,
    featured: frontmatter.featured || false,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.mdx$/, '')))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category.slug === categorySlug);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getRecentPosts(count: number = 5): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return getAllPosts()
    .filter(
      (post) =>
        post.slug !== currentSlug &&
        (post.category.slug === currentPost.category.slug ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, count);
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

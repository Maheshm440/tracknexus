export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  avatarAlt: string;
  role: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  lastModified?: string;
  author: Author;
  category: Category;
  tags: string[];
  readingTime: string;
  featured?: boolean;
}

export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  lastModified?: string;
  authorId: string;
  categorySlug: string;
  tags: string[];
  featured?: boolean;
}

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, getRelatedPosts, getRecentPosts, getAllTags } from '@/lib/blog/utils';
import { getAllCategories } from '@/content/blog/categories';
import { BlogHeader, BlogContent, BlogSidebar, BlogCard } from '@/components/blog';
import { FreeTrialCTA } from '@/components/free-trial-cta';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | TrackNexus Blog',
    };
  }

  return {
    title: `${post.title} | TrackNexus Blog`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [post.coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const categories = getAllCategories();
  const recentPosts = getRecentPosts(5);
  const tags = getAllTags();

  // Generate JSON-LD for the blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TrackNexus',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tracknexus.com/logo.png',
      },
    },
  };

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://tracknexus.com' },
    { name: 'Blog', url: 'https://tracknexus.com/blog' },
    { name: post.category.name, url: `https://tracknexus.com/blog/category/${post.category.slug}` },
    { name: post.title, url: `https://tracknexus.com/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <BlogHeader post={post} />

        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/blog/category/${post.category.slug}`}>{post.category.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Content */}
        <section className="py-12 pt-4">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <BlogContent content={post.content} />

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Author Bio */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {post.author.name}
                        </h4>
                        <p className="text-sm text-highlight mb-2">
                          {post.author.role}
                        </p>
                        <p className="text-gray-600 text-sm">{post.author.bio}</p>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Related Articles
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <BlogCard key={relatedPost.slug} post={relatedPost} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar
                  categories={categories}
                  recentPosts={recentPosts}
                  tags={tags}
                  currentCategory={post.category.slug}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <FreeTrialCTA />
      </main>
    </>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPostSlugs } from "@/lib/blog-data";
import { BlogLayout } from "@/components/blog-layout";
import { generateBlogPostingSchema, generateBreadcrumbSchema, generateFAQSchema, organizationSchema } from "@/lib/seo/schemas";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate SEO metadata for each blog post
export async function generateMetadata(
  props: BlogPostPageProps
): Promise<Metadata> {
  const params = await props.params;
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The article you're looking for doesn't exist.",
    };
  }

  const baseUrl = "https://tracknexus.com";
  const canonical = `${baseUrl}/blog/${post.slug}`;

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.lastModified || post.publishedDate,
      images: [
        {
          url: `${baseUrl}${post.heroImage}`,
          width: 1200,
          height: 630,
          alt: post.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
      images: [`${baseUrl}${post.heroImage}`],
      creator: "@tracknexus",
      site: "@tracknexus",
    },
    keywords: [post.slug.split("-").join(" "), post.category],
    authors: [
      {
        name: "Track Nexus Team",
        url: baseUrl,
      },
    ],
  };
}


export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await props.params;
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  // Generate structured data schemas
  const blogPostingSchema = generateBlogPostingSchema({
    title: post.title,
    description: post.metaDescription,
    slug: post.slug,
    publishedDate: post.publishedDate,
    modifiedDate: post.lastModified,
    image: post.heroImage,
    readTime: post.readTime,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tracknexus.com" },
    { name: "Blog", url: "https://tracknexus.com/blog" },
    { name: post.title, url: `https://tracknexus.com/blog/${post.slug}` },
  ]);

  const faqSchema = post.faqItems && post.faqItems.length > 0
    ? generateFAQSchema(post.faqItems)
    : null;

  return (
    <>
      {/* Structured Data - BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Blog Post Content */}
      <BlogLayout post={post} />
    </>
  );
}

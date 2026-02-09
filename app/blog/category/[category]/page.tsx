import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getRecentPosts, getAllTags } from '@/lib/blog/utils';
import { getAllCategories, getCategoryBySlug } from '@/content/blog/categories';
import { BlogCard, BlogSidebar } from '@/components/blog';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found | TrackNexus Blog',
    };
  }

  return {
    title: `${category.name} Articles | TrackNexus Blog`,
    description: category.description,
    openGraph: {
      title: `${category.name} Articles | TrackNexus Blog`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(categorySlug);
  const categories = getAllCategories();
  const recentPosts = getRecentPosts(5);
  const tags = getAllTags();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="py-20"
        style={{
          background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-white/80">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    No Posts Yet
                  </h2>
                  <p className="text-gray-600">
                    We&apos;re working on content for this category. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                categories={categories}
                recentPosts={recentPosts}
                tags={tags}
                currentCategory={categorySlug}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

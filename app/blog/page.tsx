import { Metadata } from 'next';
import { getAllPosts, getRecentPosts, getAllTags } from '@/lib/blog/utils';
import { getAllCategories } from '@/content/blog/categories';
import { BlogCard, BlogSidebar } from '@/components/blog';

export const metadata: Metadata = {
  title: 'Blog | TrackNexus - Time Tracking & Productivity Insights',
  description:
    'Discover expert insights on time tracking, productivity, remote work, and employee management. Stay updated with the latest tips and best practices.',
  openGraph: {
    title: 'Blog | TrackNexus - Time Tracking & Productivity Insights',
    description:
      'Discover expert insights on time tracking, productivity, remote work, and employee management.',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const recentPosts = getRecentPosts(5);
  const tags = getAllTags();

  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const regularPosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section - Deloitte Style */}
      <section className="bg-black text-white py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">
              Insights & Resources
            </p>
            <h1 className="text-hero font-light mb-6">
              Discover. Learn. Transform.
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Expert insights on time tracking, productivity, and workforce management to help your team succeed.
            </p>
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
                    Coming Soon
                  </h2>
                  <p className="text-gray-600">
                    We&apos;re working on bringing you great content. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Featured Post */}
                  {featuredPost && (
                    <div className="mb-8">
                      <h2 className="text-sm font-semibold text-highlight uppercase tracking-wide mb-4">
                        Featured Article
                      </h2>
                      <BlogCard post={featuredPost} featured />
                    </div>
                  )}

                  {/* Regular Posts Grid */}
                  {regularPosts.length > 0 && (
                    <>
                      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Latest Articles
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {regularPosts.map((post) => (
                          <BlogCard key={post.slug} post={post} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                categories={categories}
                recentPosts={recentPosts}
                tags={tags}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

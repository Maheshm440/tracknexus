import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMarketingPageBySlug, getAllMarketingSlugs } from "@/lib/marketing-data";
import MarketingPageContent from "@/app/marketing/[slug]/page-content";

// Generate static params for all marketing pages
export function generateStaticParams() {
  return getAllMarketingSlugs().map((slug) => ({ slug }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getMarketingPageBySlug(slug);

  if (!page) {
    return { title: "Not Found | Track Nexus" };
  }

  return {
    title: `${page.title} | Track Nexus`,
    description: page.description,
    keywords: [page.category, ...page.tags, "Track Nexus", "workforce management"].join(", "),
    alternates: {
      canonical: `https://tracknexus.com/${slug}`,
    },
    openGraph: {
      title: `${page.title} - Track Nexus`,
      description: page.description,
      url: `https://tracknexus.com/${slug}`,
      type: "website",
      ...(page.heroImage ? { images: [{ url: page.heroImage }] } : {}),
    },
  };
}

// Page component
export default async function MarketingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getMarketingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <MarketingPageContent page={page} />;
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productCategories, getCategoryById } from "@/components/products/ProductsData";
import ProductPageClient from "./ProductPageClient";

// Generate static params for all 9 product categories
export function generateStaticParams() {
  return productCategories.map((category) => ({
    slug: category.id,
  }));
}

// Generate dynamic metadata per category for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    return {
      title: "Product Not Found | Track Nexus",
    };
  }

  const featureKeywords = category.features.map(f => f.title).join(", ");

  return {
    title: `${category.title} Software | Track Nexus`,
    description: `${category.description} Discover ${category.features.length} powerful features including ${category.features.slice(0, 3).map(f => f.title).join(", ")} and more.`,
    keywords: `${category.title}, ${featureKeywords}, employee monitoring, workforce management, Track Nexus`,
    alternates: {
      canonical: `https://tracknexus.com/product/${category.id}`
    },
    openGraph: {
      title: `${category.title} - Track Nexus`,
      description: category.description,
      url: `https://tracknexus.com/product/${category.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} | Track Nexus`,
      description: category.description,
    },
  };
}

// Page component
export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    notFound();
  }

  // Pass only the slug - client component will look up the category data
  return <ProductPageClient slug={slug} />;
}

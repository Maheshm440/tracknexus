import { redirect } from "next/navigation";
import { getAllMarketingSlugs } from "@/lib/marketing-data";

// Generate static params so old URLs still build
export function generateStaticParams() {
  return getAllMarketingSlugs().map((slug) => ({ slug }));
}

// Redirect /marketing/<slug> -> /<slug>
export default async function MarketingPageRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/${slug}`);
}

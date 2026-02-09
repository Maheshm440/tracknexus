import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCompetitorBySlug, getCompetitorSlugs } from '@/content/comparisons';
import {
  ComparisonHero,
  ComparisonTable,
  PricingComparison,
  VerdictSection,
  ComparisonFAQ,
} from '@/components/comparison';
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
  params: Promise<{ competitor: string }>;
}

export async function generateStaticParams() {
  const slugs = getCompetitorSlugs();
  return slugs.map((slug) => ({
    competitor: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { competitor: slug } = await params;
  const competitor = getCompetitorBySlug(slug);

  if (!competitor) {
    return {
      title: 'Comparison Not Found | TrackNexus',
    };
  }

  return {
    title: competitor.seoTitle,
    description: competitor.seoDescription,
    openGraph: {
      title: competitor.seoTitle,
      description: competitor.seoDescription,
      type: 'website',
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { competitor: slug } = await params;
  const competitor = getCompetitorBySlug(slug);

  if (!competitor) {
    notFound();
  }

  // Generate JSON-LD for the comparison
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: competitor.seoTitle,
    description: competitor.seoDescription,
    author: {
      '@type': 'Organization',
      name: 'TrackNexus',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TrackNexus',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tracknexus.com/logo.png',
      },
    },
    about: [
      {
        '@type': 'SoftwareApplication',
        name: 'TrackNexus',
        applicationCategory: 'BusinessApplication',
      },
      {
        '@type': 'SoftwareApplication',
        name: competitor.name,
        applicationCategory: 'BusinessApplication',
      },
    ],
  };

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://tracknexus.com' },
    { name: 'Compare', url: 'https://tracknexus.com/compare' },
    { name: `TrackNexus vs ${competitor.name}`, url: `https://tracknexus.com/compare/${competitor.slug}` },
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

      <main className="min-h-screen">
        <ComparisonHero competitor={competitor} />

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
                  <Link href="/compare">Compare</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>TrackNexus vs {competitor.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <ComparisonTable
          features={competitor.features}
          competitorName={competitor.name}
        />

        <PricingComparison
          competitorName={competitor.name}
          competitorPricing={competitor.pricing}
        />

        <VerdictSection
          competitorName={competitor.name}
          verdict={competitor.verdict}
          verdictSummary={competitor.verdictSummary}
          tracknexusPros={competitor.tracknexusPros}
          competitorPros={competitor.competitorPros}
          tracknexusCons={competitor.tracknexusCons}
          competitorCons={competitor.competitorCons}
        />

        <ComparisonFAQ faqs={competitor.faqs} competitorName={competitor.name} />

        <FreeTrialCTA />
      </main>
    </>
  );
}

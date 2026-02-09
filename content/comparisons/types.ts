export interface PricingPlan {
  plan: string;
  price: string;
  billingCycle: string;
  features: string[];
}

export interface FeatureComparison {
  name: string;
  category: string;
  tracknexus: boolean | string;
  competitor: boolean | string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CompetitorData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  website: string;
  foundedYear: number;
  headquarters: string;
  pricing: PricingPlan[];
  features: FeatureComparison[];
  tracknexusPros: string[];
  competitorPros: string[];
  tracknexusCons: string[];
  competitorCons: string[];
  verdict: string;
  verdictSummary: string;
  faqs: FAQ[];
  seoTitle: string;
  seoDescription: string;
}

export interface CompetitorSummary {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  shortDescription: string;
}

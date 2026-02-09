// Cookie Consent Configuration - Google Consent Mode v2 Compliant

// Consent categories aligned with Google Consent Mode v2
export type ConsentCategory = 'necessary' | 'analytics' | 'marketing' | 'functional';

export interface ConsentState {
  necessary: boolean;      // Always true (essential cookies)
  analytics: boolean;      // GA4, general analytics
  marketing: boolean;      // Google Ads, Meta, LinkedIn, Twitter pixels
  functional: boolean;     // Enhanced functionality cookies
}

export interface ConsentPreferences {
  consent: ConsentState;
  timestamp: string;       // ISO date string
  version: string;         // Consent version for audit trail
}

// Google Consent Mode v2 signal types
export interface GtagConsentParams {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
  personalization_storage: 'granted' | 'denied';
  security_storage: 'granted';  // Always granted
}

// Tracking pixel configuration
export interface TrackingPixelConfig {
  ga4MeasurementId: string;
  googleAdsId?: string;
  metaPixelId?: string;
  linkedInPartnerId?: string;
  twitterPixelId?: string;
}

// Constants
export const CONSENT_STORAGE_KEY = 'tracknexus_cookie_consent';
export const CONSENT_VERSION = '1.0.0';

// Default consent state (all denied except necessary)
export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

// Pixel configuration - IDs from environment variables
export const PIXEL_CONFIG: TrackingPixelConfig = {
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_ID || 'G-YGY3NCVSVV',
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || undefined,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || undefined,
  linkedInPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || undefined,
  twitterPixelId: process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID || undefined,
};

// Consent category descriptions for UI
export const CONSENT_CATEGORIES = [
  {
    key: 'necessary' as const,
    label: 'Strictly Necessary',
    description: 'Essential for the website to function properly. These cookies cannot be disabled.',
    alwaysEnabled: true,
  },
  {
    key: 'analytics' as const,
    label: 'Analytics',
    description: 'Help us understand how visitors interact with our website by collecting anonymous usage data (Google Analytics).',
    alwaysEnabled: false,
  },
  {
    key: 'marketing' as const,
    label: 'Marketing',
    description: 'Used to deliver personalized advertisements and measure ad campaign effectiveness (Google Ads, Facebook, LinkedIn, Twitter).',
    alwaysEnabled: false,
  },
  {
    key: 'functional' as const,
    label: 'Functional',
    description: 'Enable enhanced functionality and personalization features.',
    alwaysEnabled: false,
  },
] as const;

/**
 * Verification Meta Tags for Search Engines and Social Platforms
 * These tags are used to verify ownership of the website with various services
 */

export interface VerificationMetadata {
  google?: string;
  other?: {
    'msvalidate.01'?: string; // Bing Webmaster
    'google-site-verification'?: string; // Alternative Google method
    'facebook-domain-verification'?: string; // Meta/Facebook
    'linkedin-site-verification'?: string; // LinkedIn
    'twitter:site'?: string; // Twitter/X
    'gtm-id'?: string; // Google Tag Manager
  };
}

/**
 * Generate verification metadata from environment variables
 * Reads verification codes from .env and returns properly formatted metadata
 */
export function getVerificationMetadata(): VerificationMetadata {
  const verification: VerificationMetadata = {
    other: {},
  };

  // Google Search Console - primary method
  if (process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION) {
    verification.google = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;
  }

  // Bing Webmaster Tools
  if (process.env.NEXT_PUBLIC_BING_VERIFICATION) {
    verification.other!['msvalidate.01'] = process.env.NEXT_PUBLIC_BING_VERIFICATION;
  }

  // Facebook/Meta Domain Verification
  if (process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION) {
    verification.other!['facebook-domain-verification'] = process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION;
  }

  // LinkedIn Site Verification
  if (process.env.NEXT_PUBLIC_LINKEDIN_VERIFICATION) {
    verification.other!['linkedin-site-verification'] = process.env.NEXT_PUBLIC_LINKEDIN_VERIFICATION;
  }

  // Google Tag Manager ID (not verification but commonly grouped)
  if (process.env.NEXT_PUBLIC_GTM_ID) {
    verification.other!['gtm-id'] = process.env.NEXT_PUBLIC_GTM_ID;
  }

  // Twitter/X site identifier
  if (process.env.NEXT_PUBLIC_TWITTER_SITE) {
    verification.other!['twitter:site'] = process.env.NEXT_PUBLIC_TWITTER_SITE;
  }

  // Remove empty other object if no other verifications exist
  if (Object.keys(verification.other || {}).length === 0) {
    delete verification.other;
  }

  return verification;
}

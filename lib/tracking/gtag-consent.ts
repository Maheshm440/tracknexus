// Google Consent Mode v2 Utilities
import { ConsentState, GtagConsentParams } from './consent-config';

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Initialize gtag function without loading any scripts
export function initializeGtagFunction(): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
}

// Set default denied state BEFORE any tracking scripts load
// This MUST run before any Google scripts are loaded
export function initializeGtagWithDefaultDenied(): void {
  initializeGtagFunction();

  // Set default consent state to denied (Google Consent Mode v2 requirement)
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted', // Always granted for security features
    wait_for_update: 500, // Wait 500ms for consent update before firing tags
  });

  // Enable URL passthrough for conversion modeling without cookies
  // This allows Google to model conversions even when consent is denied
  window.gtag('set', 'url_passthrough', true);

  // Enable ads data redaction when consent is denied
  // Removes ads-related data from requests when ad_storage is denied
  window.gtag('set', 'ads_data_redaction', true);
}

// Map internal consent state to Google Consent Mode parameters
function mapConsentToGtagParams(consent: ConsentState): GtagConsentParams {
  return {
    ad_storage: consent.marketing ? 'granted' : 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
    functionality_storage: consent.functional ? 'granted' : 'denied',
    personalization_storage: consent.functional ? 'granted' : 'denied',
    security_storage: 'granted',
  };
}

// Update consent state in gtag
// Call this when user makes a consent choice
export function updateGtagConsent(consent: ConsentState): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  const gtagParams = mapConsentToGtagParams(consent);
  window.gtag('consent', 'update', gtagParams);
}

// Get the inline script content for the head
// This returns the script content that should be added to <head> before any other scripts
export function getConsentDefaultScript(): string {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted',
      'wait_for_update': 500
    });
    gtag('set', 'url_passthrough', true);
    gtag('set', 'ads_data_redaction', true);
  `.trim();
}

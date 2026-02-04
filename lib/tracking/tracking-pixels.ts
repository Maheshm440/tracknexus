// @ts-nocheck
// Tracking Pixels Loader - Loads scripts ONLY after consent is granted
// TypeScript checking disabled due to third-party pixel code patterns
import { ConsentState, PIXEL_CONFIG } from './consent-config';

// Extend Window for various tracking pixel globals
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
    lintrk: (...args: unknown[]) => void;
    _linkedin_data_partner_ids: string[];
    twq: (...args: unknown[]) => void;
  }
}

// Track which scripts have been loaded to prevent duplicates
const loadedScripts = new Set<string>();

// Helper function to dynamically load a script
function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (loadedScripts.has(id)) {
      resolve();
      return;
    }

    // Check if script already exists in DOM
    if (document.getElementById(id)) {
      loadedScripts.add(id);
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.id = id;
    script.onload = () => {
      loadedScripts.add(id);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

// Load Google Analytics 4
export async function loadGA4(): Promise<void> {
  if (!PIXEL_CONFIG.ga4MeasurementId) return;
  if (loadedScripts.has('ga4')) return;

  try {
    await loadScript(
      `https://www.googletagmanager.com/gtag/js?id=${PIXEL_CONFIG.ga4MeasurementId}`,
      'ga4-script'
    );

    window.gtag('js', new Date());
    window.gtag('config', PIXEL_CONFIG.ga4MeasurementId, {
      send_page_view: true,
    });

    loadedScripts.add('ga4');
  } catch (error) {
    console.error('Failed to load GA4:', error);
  }
}

// Load Google Ads
export async function loadGoogleAds(): Promise<void> {
  if (!PIXEL_CONFIG.googleAdsId) return;
  if (loadedScripts.has('google-ads')) return;

  try {
    // Google Ads uses the same gtag.js, just needs config
    await loadScript(
      `https://www.googletagmanager.com/gtag/js?id=${PIXEL_CONFIG.googleAdsId}`,
      'gads-script'
    );

    window.gtag('config', PIXEL_CONFIG.googleAdsId);
    loadedScripts.add('google-ads');
  } catch (error) {
    console.error('Failed to load Google Ads:', error);
  }
}

// Load Meta/Facebook Pixel
export function loadMetaPixel(): void {
  if (!PIXEL_CONFIG.metaPixelId) return;
  if (loadedScripts.has('meta-pixel')) return;

  try {
    // Facebook Pixel base code (standard implementation)
    (function (f: Window, b: Document, e: string, v: string) {
      let n: typeof window.fbq;
      let t: HTMLScriptElement;
      let s: HTMLScriptElement | null;

      if (typeof f.fbq !== 'undefined') return;

      n = f.fbq = function (...args: unknown[]) {
        if (n.callMethod) {
          n.callMethod.apply(n, args);
        } else {
          n.queue.push(args);
        }
      } as typeof window.fbq;

      if (!f._fbq) f._fbq = n;
      (n as { push: typeof Array.prototype.push }).push = n as unknown as typeof Array.prototype.push;
      (n as { loaded: boolean }).loaded = true;
      (n as { version: string }).version = '2.0';
      (n as { queue: unknown[] }).queue = [];

      t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0] as HTMLScriptElement | null;
      s?.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', PIXEL_CONFIG.metaPixelId);
    window.fbq('track', 'PageView');

    loadedScripts.add('meta-pixel');
  } catch (error) {
    console.error('Failed to load Meta Pixel:', error);
  }
}

// Load LinkedIn Insight Tag
export function loadLinkedInPixel(): void {
  if (!PIXEL_CONFIG.linkedInPartnerId) return;
  if (loadedScripts.has('linkedin-pixel')) return;

  try {
    const partnerId = PIXEL_CONFIG.linkedInPartnerId;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(partnerId);

    (function (l: typeof window.lintrk | undefined) {
      if (!l) {
        window.lintrk = function (a: unknown, b: unknown) {
          (window.lintrk as unknown as { q: unknown[] }).q.push([a, b]);
        };
        (window.lintrk as unknown as { q: unknown[] }).q = [];
      }
      const s = document.getElementsByTagName('script')[0];
      const b = document.createElement('script');
      b.type = 'text/javascript';
      b.async = true;
      b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      s.parentNode?.insertBefore(b, s);
    })(window.lintrk);

    loadedScripts.add('linkedin-pixel');
  } catch (error) {
    console.error('Failed to load LinkedIn Pixel:', error);
  }
}

// Load Twitter/X Pixel
export function loadTwitterPixel(): void {
  if (!PIXEL_CONFIG.twitterPixelId) return;
  if (loadedScripts.has('twitter-pixel')) return;

  try {
    (function (e: Window, t: Document, n: string) {
      let s: typeof window.twq;
      let u: HTMLScriptElement;
      let a: HTMLScriptElement | null;

      if (e.twq) return;

      s = e.twq = function (...args: unknown[]) {
        if ((s as unknown as { exe?: (...args: unknown[]) => void }).exe) {
          (s as unknown as { exe: (...args: unknown[]) => void }).exe.apply(s, args);
        } else {
          (s as unknown as { queue: unknown[] }).queue.push(args);
        }
      };
      (s as unknown as { version: string }).version = '1.1';
      (s as unknown as { queue: unknown[] }).queue = [];

      u = t.createElement(n) as HTMLScriptElement;
      u.async = true;
      u.src = 'https://static.ads-twitter.com/uwt.js';
      a = t.getElementsByTagName(n)[0] as HTMLScriptElement | null;
      a?.parentNode?.insertBefore(u, a);
    })(window, document, 'script');

    window.twq('config', PIXEL_CONFIG.twitterPixelId);
    loadedScripts.add('twitter-pixel');
  } catch (error) {
    console.error('Failed to load Twitter Pixel:', error);
  }
}

// Main function to load all pixels based on consent
export function loadTrackingPixels(consent: ConsentState): void {
  if (typeof window === 'undefined') return;

  // Analytics consent - load GA4
  if (consent.analytics) {
    loadGA4();
  }

  // Marketing consent - load all ad pixels
  if (consent.marketing) {
    loadGoogleAds();
    loadMetaPixel();
    loadLinkedInPixel();
    loadTwitterPixel();
  }
}

// Check if any pixels are loaded
export function arePixelsLoaded(): { analytics: boolean; marketing: boolean } {
  return {
    analytics: loadedScripts.has('ga4'),
    marketing:
      loadedScripts.has('google-ads') ||
      loadedScripts.has('meta-pixel') ||
      loadedScripts.has('linkedin-pixel') ||
      loadedScripts.has('twitter-pixel'),
  };
}

// Track custom events (only if consent is given)
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>,
  consent?: ConsentState
): void {
  if (typeof window === 'undefined') return;

  // Track in GA4 if analytics consent
  if (consent?.analytics && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Track in Meta Pixel if marketing consent
  if (consent?.marketing && window.fbq) {
    window.fbq('track', eventName, eventParams);
  }

  // Track in LinkedIn if marketing consent
  if (consent?.marketing && window.lintrk) {
    window.lintrk('track', { conversion_id: eventName });
  }

  // Track in Twitter if marketing consent
  if (consent?.marketing && window.twq) {
    window.twq('event', eventName, eventParams);
  }
}

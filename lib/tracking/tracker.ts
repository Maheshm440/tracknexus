'use client';

// Visitor Tracking Script for TrackNexus CRM
// Tracks page views, sessions, and visitor behavior after consent

interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

interface TrackerConfig {
  apiUrl: string;
}

const STORAGE_KEYS = {
  VISITOR_ID: 'tn_visitor_id',
  SESSION_ID: 'tn_session_id',
  CONSENT: 'tracknexus_cookie_consent',
};

class VisitorTracker {
  private config: TrackerConfig;
  private visitorId: string | null = null;
  private sessionId: string | null = null;
  private sessionStartTime: number = 0;
  private currentPageStartTime: number = 0;
  private currentPageViewId: string | null = null;
  private isInitialized: boolean = false;

  constructor(config: TrackerConfig) {
    this.config = config;
  }

  /**
   * Initialize the tracker
   * Call this after the cookie consent provider has loaded
   */
  async initialize(): Promise<void> {
    if (typeof window === 'undefined') return;
    if (this.isInitialized) return;

    this.isInitialized = true;

    // Load existing visitor ID from storage
    this.visitorId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
    this.sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);

    // Check if consent is given
    if (this.hasConsent()) {
      await this.startTracking();
    }
  }

  /**
   * Called when user gives consent
   */
  async onConsentGiven(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    await this.startTracking();
  }

  /**
   * Start tracking after consent
   */
  private async startTracking(): Promise<void> {
    try {
      // Register consent and get visitor/session IDs
      const response = await this.sendToAPI('/api/tracking/consent', {
        visitorId: this.visitorId,
        fingerprint: this.generateFingerprint(),
        consentGiven: true,
        userAgent: navigator.userAgent,
      });

      if (response.success) {
        this.visitorId = response.visitorId;
        this.sessionId = response.sessionId;

        // Store IDs
        if (this.visitorId) {
          localStorage.setItem(STORAGE_KEYS.VISITOR_ID, this.visitorId);
        }
        if (this.sessionId) {
          localStorage.setItem(STORAGE_KEYS.SESSION_ID, this.sessionId);
        }

        this.sessionStartTime = Date.now();
        this.currentPageStartTime = Date.now();

        // Track initial page view
        await this.trackPageView();

        // Set up event listeners
        this.setupEventListeners();
      }
    } catch (error) {
      console.error('Failed to start tracking:', error);
    }
  }

  /**
   * Set up event listeners for page lifecycle
   */
  private setupEventListeners(): void {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.endSession();
      }
    });

    // Track before unload
    window.addEventListener('beforeunload', () => {
      this.endSession();
    });

    // Track navigation (for SPA)
    if (typeof window !== 'undefined') {
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = (...args) => {
        originalPushState.apply(history, args);
        this.onNavigate();
      };

      history.replaceState = (...args) => {
        originalReplaceState.apply(history, args);
        this.onNavigate();
      };

      window.addEventListener('popstate', () => {
        this.onNavigate();
      });
    }
  }

  /**
   * Handle SPA navigation
   */
  private async onNavigate(): Promise<void> {
    // End time tracking for previous page
    if (this.currentPageViewId) {
      const timeOnPage = Math.floor((Date.now() - this.currentPageStartTime) / 1000);
      await this.updatePageView(this.currentPageViewId, timeOnPage);
    }

    // Track new page view
    this.currentPageStartTime = Date.now();
    await this.trackPageView();
  }

  /**
   * Track a page view
   */
  async trackPageView(): Promise<void> {
    if (!this.hasConsent() || !this.visitorId || !this.sessionId) return;

    try {
      const response = await this.sendToAPI('/api/tracking/pageview', {
        visitorId: this.visitorId,
        sessionId: this.sessionId,
        path: window.location.pathname,
        title: document.title,
        referrer: document.referrer,
        ...this.getUTMParams(),
      });

      if (response.success) {
        this.currentPageViewId = response.pageViewId;
      }
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  /**
   * Update page view with time on page
   */
  private async updatePageView(pageViewId: string, timeOnPage: number): Promise<void> {
    // Use sendBeacon for reliable delivery
    const scrollDepth = this.calculateScrollDepth();

    const data = JSON.stringify({
      sessionId: this.sessionId,
      lastPageViewId: pageViewId,
      scrollDepth,
      timeOnPage,
    });

    navigator.sendBeacon(
      `${this.config.apiUrl}/api/tracking/session`,
      new Blob([data], { type: 'application/json' })
    );
  }

  /**
   * End the current session
   */
  private endSession(): void {
    if (!this.sessionId) return;

    const duration = Math.floor((Date.now() - this.sessionStartTime) / 1000);
    const scrollDepth = this.calculateScrollDepth();
    const timeOnPage = Math.floor((Date.now() - this.currentPageStartTime) / 1000);

    const data = JSON.stringify({
      sessionId: this.sessionId,
      duration,
      lastPageViewId: this.currentPageViewId,
      scrollDepth,
      timeOnPage,
    });

    // Use sendBeacon for reliable delivery on page exit
    navigator.sendBeacon(
      `${this.config.apiUrl}/api/tracking/session`,
      new Blob([data], { type: 'application/json' })
    );
  }

  /**
   * Check if consent is given
   */
  hasConsent(): boolean {
    try {
      const consentData = localStorage.getItem(STORAGE_KEYS.CONSENT);
      if (!consentData) return false;
      const parsed = JSON.parse(consentData);
      return parsed.consent?.analytics === true;
    } catch {
      return false;
    }
  }

  /**
   * Get visitor ID
   */
  getVisitorId(): string | null {
    return this.visitorId;
  }

  /**
   * Get session ID
   */
  getSessionId(): string | null {
    return this.sessionId;
  }

  /**
   * Get UTM parameters from URL
   */
  private getUTMParams(): UTMParams {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source') || undefined,
      medium: params.get('utm_medium') || undefined,
      campaign: params.get('utm_campaign') || undefined,
      term: params.get('utm_term') || undefined,
      content: params.get('utm_content') || undefined,
    };
  }

  /**
   * Calculate scroll depth percentage
   */
  private calculateScrollDepth(): number {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 100;
    return Math.min(Math.round((scrollTop / docHeight) * 100), 100);
  }

  /**
   * Generate a simple browser fingerprint
   */
  private generateFingerprint(): string {
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width,
      screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0,
    ];
    return this.hashCode(components.join('|'));
  }

  /**
   * Simple hash function
   */
  private hashCode(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'fp_' + Math.abs(hash).toString(36);
  }

  /**
   * Send data to API
   */
  private async sendToAPI(endpoint: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    const response = await fetch(`${this.config.apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

// Create and export tracker instance
let trackerInstance: VisitorTracker | null = null;

export function getTracker(): VisitorTracker {
  if (!trackerInstance) {
    trackerInstance = new VisitorTracker({
      apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
    });
  }
  return trackerInstance;
}

export function initializeTracker(): Promise<void> {
  return getTracker().initialize();
}

export function onConsentGiven(): Promise<void> {
  return getTracker().onConsentGiven();
}

export function getVisitorId(): string | null {
  return getTracker().getVisitorId();
}

export function getSessionId(): string | null {
  return getTracker().getSessionId();
}

export { VisitorTracker };

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ConsentState,
  ConsentPreferences,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  DEFAULT_CONSENT,
} from '@/lib/tracking/consent-config';
import {
  initializeGtagWithDefaultDenied,
  updateGtagConsent,
} from '@/lib/tracking/gtag-consent';
import { loadTrackingPixels } from '@/lib/tracking/tracking-pixels';

export interface UseCookieConsentReturn {
  consent: ConsentState;
  hasInteracted: boolean | null;
  isLoading: boolean;
  saveConsent: (consent: ConsentState) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  resetConsent: () => void;
}

export function useCookieConsent(): UseCookieConsentReturn {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [hasInteracted, setHasInteracted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved preferences on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize gtag with default denied state FIRST (Google Consent Mode v2 requirement)
    initializeGtagWithDefaultDenied();

    // Auto-accept all cookies silently (no popup shown to users)
    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (saved) {
        const preferences: ConsentPreferences = JSON.parse(saved);
        setConsent(preferences.consent);
        setHasInteracted(true);
        updateGtagConsent(preferences.consent);
        loadTrackingPixels(preferences.consent);
      } else {
        // Auto-accept immediately without showing any popup
        const autoConsent: ConsentState = {
          necessary: true,
          analytics: true,
          marketing: true,
          functional: true,
        };
        const preferences: ConsentPreferences = {
          consent: autoConsent,
          timestamp: new Date().toISOString(),
          version: CONSENT_VERSION,
        };
        localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
        setConsent(autoConsent);
        setHasInteracted(true);
        updateGtagConsent(autoConsent);
        loadTrackingPixels(autoConsent);
      }
    } catch (error) {
      console.error('Error loading consent preferences:', error);
      setHasInteracted(true);
    }

    setIsLoading(false);
  }, []);

  // Save consent preferences to localStorage and update tracking
  const saveConsent = useCallback((newConsent: ConsentState) => {
    // Ensure necessary is always true
    const finalConsent: ConsentState = {
      ...newConsent,
      necessary: true,
    };

    const preferences: ConsentPreferences = {
      consent: finalConsent,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving consent preferences:', error);
    }

    setConsent(finalConsent);
    setHasInteracted(true);

    // Update gtag consent
    updateGtagConsent(finalConsent);

    // Load tracking pixels based on new consent
    loadTrackingPixels(finalConsent);
  }, []);

  // Accept all cookies
  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  }, [saveConsent]);

  // Reject all non-essential cookies
  const rejectAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  }, [saveConsent]);

  // Reset consent (show banner again)
  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch (error) {
      console.error('Error removing consent preferences:', error);
    }
    setHasInteracted(false);
    setConsent(DEFAULT_CONSENT);
    initializeGtagWithDefaultDenied();
  }, []);

  return {
    consent,
    hasInteracted,
    isLoading,
    saveConsent,
    acceptAll,
    rejectAll,
    resetConsent,
  };
}

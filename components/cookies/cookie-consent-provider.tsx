'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useCookieConsent, UseCookieConsentReturn } from '@/hooks/use-cookie-consent';
import { CookieConsentBanner } from './cookie-consent-banner';
import { CookiePreferencesModal } from './cookie-preferences-modal';

// Extended context type with openPreferences function
interface CookieConsentContextType extends UseCookieConsentReturn {
  openPreferences: () => void;
  closePreferences: () => void;
  isPreferencesOpen: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

// Hook to use the cookie consent context
export function useCookieConsentContext(): CookieConsentContextType {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsentContext must be used within CookieConsentProvider');
  }
  return context;
}

interface CookieConsentProviderProps {
  children: React.ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const hookValues = useCookieConsent();
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const contextValue: CookieConsentContextType = {
    ...hookValues,
    openPreferences,
    closePreferences,
    isPreferencesOpen,
  };

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
      {/* Cookie Consent Banner - renders when user hasn't interacted */}
      <CookieConsentBanner />
      {/* Standalone preferences modal for "Manage Cookies" links */}
      <CookiePreferencesModal
        isOpen={isPreferencesOpen}
        onClose={closePreferences}
      />
    </CookieConsentContext.Provider>
  );
}

// Export a component for the "Manage Cookies" button/link
export function ManageCookiesButton({
  children,
  className,
  asChild,
}: {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}) {
  const { openPreferences } = useCookieConsentContext();

  if (asChild) {
    // Allow wrapping custom elements
    return (
      <span onClick={openPreferences} className={className}>
        {children}
      </span>
    );
  }

  return (
    <button
      onClick={openPreferences}
      className={className || 'text-gray-400 hover:text-white transition-colors text-sm'}
    >
      {children || 'Manage Cookies'}
    </button>
  );
}

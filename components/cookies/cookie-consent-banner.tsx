'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, Shield } from 'lucide-react';
import { useCookieConsentContext } from './cookie-consent-provider';
import { CookiePreferencesModal } from './cookie-preferences-modal';

export function CookieConsentBanner() {
  const { hasInteracted, isLoading, acceptAll, rejectAll } = useCookieConsentContext();
  const [showPreferences, setShowPreferences] = useState(false);

  // Don't render during SSR, while loading, or if user has already interacted
  if (isLoading || hasInteracted !== false) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Main content */}
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                {/* Cookie icon */}
                <div className="hidden sm:flex w-12 h-12 bg-highlight/10 rounded-full items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-highlight" />
                </div>

                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-highlight sm:hidden" />
                    We value your privacy
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized ads,
                    and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                    You can customize your preferences or reject non-essential cookies.
                  </p>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={acceptAll}
                      className="bg-highlight hover:bg-highlight/90 text-white font-medium"
                    >
                      Accept All
                    </Button>
                    <Button
                      onClick={rejectAll}
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      Reject All
                    </Button>
                    <Button
                      onClick={() => setShowPreferences(true)}
                      variant="ghost"
                      className="text-highlight hover:text-highlight/80 hover:bg-highlight/5"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Preferences
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy policy link */}
            <div className="bg-gray-50 px-5 md:px-6 py-3 border-t border-gray-100">
              <a
                href="/privacy-policy"
                className="text-sm text-highlight hover:underline inline-flex items-center gap-1"
              >
                Read our Privacy Policy
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Preferences Modal */}
      <CookiePreferencesModal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
      />
    </>
  );
}

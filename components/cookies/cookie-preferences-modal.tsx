'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { X, Shield, BarChart3, Target, Wrench } from 'lucide-react';
import { useCookieConsentContext } from './cookie-consent-provider';
import { ConsentState, CONSENT_CATEGORIES } from '@/lib/tracking/consent-config';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Icon mapping for categories
const CATEGORY_ICONS = {
  necessary: Shield,
  analytics: BarChart3,
  marketing: Target,
  functional: Wrench,
} as const;

export function CookiePreferencesModal({ isOpen, onClose }: CookiePreferencesModalProps) {
  const { consent, saveConsent, acceptAll, rejectAll } = useCookieConsentContext();
  const [localConsent, setLocalConsent] = useState<ConsentState>(consent);

  // Sync local state with context when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalConsent(consent);
    }
  }, [isOpen, consent]);

  const handleToggle = (key: keyof ConsentState) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setLocalConsent((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    saveConsent(localConsent);
    onClose();
  };

  const handleAcceptAll = () => {
    acceptAll();
    onClose();
  };

  const handleRejectAll = () => {
    rejectAll();
    onClose();
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[110]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
          >
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 id="cookie-preferences-title" className="text-xl font-semibold text-gray-900">
                  Cookie Preferences
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                  aria-label="Close dialog"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Manage your cookie preferences below. Your choices will be saved and applied immediately.
              </p>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
              {CONSENT_CATEGORIES.map((category) => {
                const Icon = CATEGORY_ICONS[category.key];
                const isEnabled = localConsent[category.key];

                return (
                  <div
                    key={category.key}
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                      isEnabled
                        ? 'border-highlight/30 bg-highlight/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isEnabled ? 'bg-highlight/10' : 'bg-gray-100'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${isEnabled ? 'text-highlight' : 'text-gray-400'}`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">{category.label}</h3>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={() => handleToggle(category.key)}
                          disabled={category.alwaysEnabled}
                          className={category.alwaysEnabled ? 'opacity-50 cursor-not-allowed' : ''}
                          aria-label={`Toggle ${category.label} cookies`}
                        />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                      {category.alwaysEnabled && (
                        <span className="text-xs text-gray-400 mt-1 block">Always enabled</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-5 md:p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleSave}
                  className="bg-highlight hover:bg-highlight/90 text-white flex-1 font-medium"
                >
                  Save Preferences
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  variant="outline"
                  className="flex-1 border-gray-300"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleRejectAll}
                  variant="ghost"
                  className="flex-1 text-gray-600 hover:text-gray-900"
                >
                  Reject All
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

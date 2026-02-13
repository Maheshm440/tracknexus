"use client";

import { useEffect, useRef, useState } from 'react';

interface VisitorTrackerProps {
  page?: string;
}

export default function VisitorTracker({ page }: VisitorTrackerProps) {
  const [mounted, setMounted] = useState(false);
  const sessionStartTime = useRef<number>(0);
  const lastPageViewId = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    // Initialize session start time on client only
    if (sessionStartTime.current === 0) {
      sessionStartTime.current = Date.now();
    }

    const trackVisitor = async () => {
      try {
        const currentPage = page || window.location.pathname;
        const userAgent = navigator.userAgent;

        // Check if this page was already tracked in this session
        const trackedPages = JSON.parse(sessionStorage.getItem('tracked_pages') || '[]');
        const visitorId = sessionStorage.getItem('tn_visitor_id');
        const sessionId = sessionStorage.getItem('tn_session_id');

        // If no visitor/session yet, create one via consent API (auto-accepted)
        if (!visitorId || !sessionId) {
          // Generate a simple fingerprint from browser info
          const fingerprint = generateFingerprint();

          const consentRes = await fetch('/api/tracking/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fingerprint,
              consentGiven: true,
              userAgent,
            }),
          });

          if (consentRes.ok) {
            const consentData = await consentRes.json();
            if (consentData.success) {
              sessionStorage.setItem('tn_visitor_id', consentData.visitorId);
              sessionStorage.setItem('tn_session_id', consentData.sessionId || '');
              sessionStartTime.current = Date.now();

              // Now track the first page view
              if (consentData.sessionId) {
                await trackPageView(consentData.visitorId, consentData.sessionId, currentPage);
              }
            }
          }
          return;
        }

        // Visitor and session exist — track page view if not already tracked
        const pageKey = `${sessionId}_${currentPage}`;
        if (!trackedPages.includes(pageKey) && sessionId) {
          await trackPageView(visitorId, sessionId, currentPage);
          trackedPages.push(pageKey);
          sessionStorage.setItem('tracked_pages', JSON.stringify(trackedPages));
        }
      } catch (error) {
        console.error('Visitor tracking error:', error);
      }
    };

    trackVisitor();

    // Track page changes for SPA navigation
    const handleRouteChange = () => {
      setTimeout(trackVisitor, 200);
    };

    window.addEventListener('popstate', handleRouteChange);

    // End session when user leaves the page
    const handleBeforeUnload = () => {
      const sessionId = sessionStorage.getItem('tn_session_id');
      if (sessionId) {
        const duration = Math.round((Date.now() - sessionStartTime.current) / 1000);
        navigator.sendBeacon(
          '/api/tracking/session',
          JSON.stringify({
            sessionId,
            duration,
            lastPageViewId: lastPageViewId.current,
          })
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [page, mounted]);

  // Don't render anything during SSR
  if (!mounted) return null;

  return null;
}

async function trackPageView(visitorId: string, sessionId: string, path: string) {
  try {
    const res = await fetch('/api/tracking/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        sessionId,
        path,
        title: document.title,
        referrer: document.referrer,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.pageViewId) {
        // Store for session end tracking
        sessionStorage.setItem('tn_last_pageview', data.pageViewId);
      }
    }
  } catch {
    // Silently ignore tracking failures
  }
}

function generateFingerprint(): string {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
  ];
  // Simple hash
  let hash = 0;
  const str = components.join('|');
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'fp_' + Math.abs(hash).toString(36);
}

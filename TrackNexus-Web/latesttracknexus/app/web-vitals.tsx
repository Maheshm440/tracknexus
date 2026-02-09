'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log Core Web Vitals in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
      });

      const url = '/api/analytics/vitals';

      // Use sendBeacon if available (more reliable)
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body);
      } else {
        // Fallback to fetch with keepalive
        fetch(url, {
          body,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
        }).catch((error) => {
          console.error('Failed to send web vitals:', error);
        });
      }
    }
  });

  return null;
}

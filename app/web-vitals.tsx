'use client'

import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals'
import { useEffect } from 'react'

function sendToAnalytics(metric: Metric) {
  // Send to analytics endpoint
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  })

  // Use sendBeacon for reliability (won't be cancelled on page unload)
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/web-vitals', body)
  } else {
    // Fallback for browsers without sendBeacon
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch((error) => {
      // Silently fail - don't block user experience
      console.error('Failed to send web vitals:', error)
    })
  }

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    })
  }
}

export function WebVitals() {
  useEffect(() => {
    // Track Core Web Vitals
    onCLS(sendToAnalytics)  // Cumulative Layout Shift
    onINP(sendToAnalytics)  // Interaction to Next Paint (replaces FID)
    onLCP(sendToAnalytics)  // Largest Contentful Paint
    onFCP(sendToAnalytics)  // First Contentful Paint
    onTTFB(sendToAnalytics) // Time to First Byte
  }, [])

  return null // This component doesn't render anything
}

"use client";

import { useEffect } from 'react';

interface VisitorTrackerProps {
  page?: string;
}

export default function VisitorTracker({ page = window.location.pathname }: VisitorTrackerProps) {
  useEffect(() => {
    // Track visitor when component mounts or page changes
    const trackVisitor = async () => {
      try {
        const userAgent = navigator.userAgent;
        const referrer = document.referrer;

        // Get IP address (fallback to client-side detection)
        const ip = await getClientIP();

        // Simulate tracking for demo purposes (no backend required)
        const visitorData = {
          page,
          userAgent,
          ip,
          referrer,
          timestamp: new Date().toISOString()
        };

        // Store in localStorage for demo purposes
        const existingData = localStorage.getItem('visitor_tracking') || '[]';
        const trackingHistory = JSON.parse(existingData);
        trackingHistory.push(visitorData);

        // Keep only last 50 entries
        if (trackingHistory.length > 50) {
          trackingHistory.shift();
        }

        localStorage.setItem('visitor_tracking', JSON.stringify(trackingHistory));

        console.log('Visitor tracked (demo mode):', visitorData);
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }
    };

    // Track visitor immediately
    trackVisitor();

    // Track page changes
    const handleRouteChange = () => {
      setTimeout(trackVisitor, 100); // Small delay to ensure page is loaded
    };

    // Listen for route changes (for SPAs)
    window.addEventListener('popstate', handleRouteChange);

    // Custom event for programmatic navigation
    window.addEventListener('routechange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('routechange', handleRouteChange);
    };
  }, [page]);

  // This component doesn't render anything visible
  return null;
}

// Helper function to get client IP (fallback method)
async function getClientIP(): Promise<string> {
  try {
    // Try to get IP from a public API
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    // Fallback to a generic IP if the API fails
    return '127.0.0.1';
  }
}

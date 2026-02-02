/**
 * Date formatting and manipulation utilities for the CRM dashboard
 */

/**
 * Format a date to a readable string (e.g., "Jan 23, 2026")
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date to ISO string (YYYY-MM-DD)
 */
export function formatDateToISO(date: Date | string): string {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Format a date with time (e.g., "Jan 23, 2026 3:45 PM")
 */
export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format relative time (e.g., "2 hours ago", "yesterday")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) {
    return 'just now';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days === 1) {
    return 'yesterday';
  }
  if (days < 7) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

/**
 * Format a date range as a string (e.g., "Jan 1 - Jan 31, 2026")
 */
export function formatDateRange(startDate: Date | string, endDate: Date | string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startFormatted = start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const endFormatted = end.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Get the start of today
 */
export function getStartOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the end of today
 */
export function getEndOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Get the start of the week (Monday)
 */
export function getStartOfWeek(date: Date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the end of the week (Sunday)
 */
export function getEndOfWeek(date: Date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? 0 : 7); // adjust when day is Sunday
  d.setDate(diff);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Get the start of the month
 */
export function getStartOfMonth(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the end of the month
 */
export function getEndOfMonth(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Get the start of the year
 */
export function getStartOfYear(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setMonth(0);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the end of the year
 */
export function getEndOfYear(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setMonth(11);
  d.setDate(31);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Add days to a date
 */
export function addDays(date: Date | string, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Subtract days from a date
 */
export function subtractDays(date: Date | string, days: number): Date {
  return addDays(date, -days);
}

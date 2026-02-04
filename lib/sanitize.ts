// SECURITY FIX #13: Input sanitization utility
import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href']
  });
}

/**
 * Sanitize plain text (removes all HTML tags)
 */
export function sanitizeText(text: string): string {
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  // Remove any HTML tags and trim
  const cleaned = sanitizeText(email).toLowerCase().trim();

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleaned)) {
    throw new Error('Invalid email format');
  }

  return cleaned;
}

/**
 * Sanitize URL
 */
export function sanitizeUrl(url: string): string {
  const cleaned = sanitizeText(url).trim();

  // Only allow http and https protocols
  try {
    const parsed = new URL(cleaned);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid URL protocol');
    }
    return parsed.toString();
  } catch {
    throw new Error('Invalid URL format');
  }
}

/**
 * Sanitize object with specific field types
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  schema: Record<keyof T, 'text' | 'html' | 'email' | 'url' | 'number'>
): T {
  const sanitized = {} as T;

  for (const key in schema) {
    const value = obj[key];
    const type = schema[key];

    if (value === null || value === undefined) {
      sanitized[key] = value;
      continue;
    }

    switch (type) {
      case 'text':
        sanitized[key] = sanitizeText(String(value)) as any;
        break;
      case 'html':
        sanitized[key] = sanitizeHtml(String(value)) as any;
        break;
      case 'email':
        sanitized[key] = sanitizeEmail(String(value)) as any;
        break;
      case 'url':
        sanitized[key] = sanitizeUrl(String(value)) as any;
        break;
      case 'number':
        sanitized[key] = Number(value) as any;
        break;
      default:
        sanitized[key] = value;
    }
  }

  return sanitized;
}

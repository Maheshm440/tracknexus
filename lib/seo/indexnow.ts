/**
 * IndexNow Integration for faster search engine indexing
 * Supports: Bing, Yandex, Seznam, Naver
 *
 * Usage:
 * - Call submitToIndexNow() when new content is published
 * - Call submitUrlsToIndexNow() for batch URL submissions
 */

const INDEXNOW_KEY = 'tracknexus-indexnow-key-2025';
const SITE_HOST = 'tracknexus.com';
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;

// IndexNow endpoints for different search engines
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

interface IndexNowResponse {
  success: boolean;
  endpoint: string;
  status?: number;
  error?: string;
}

/**
 * Submit a single URL to IndexNow
 * @param url - The full URL to submit for indexing
 */
export async function submitToIndexNow(url: string): Promise<IndexNowResponse[]> {
  const results: IndexNowResponse[] = [];

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const params = new URLSearchParams({
        url,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
      });

      const response = await fetch(`${endpoint}?${params.toString()}`, {
        method: 'GET',
      });

      results.push({
        success: response.ok,
        endpoint,
        status: response.status,
      });
    } catch (error) {
      results.push({
        success: false,
        endpoint,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return results;
}

/**
 * Submit multiple URLs to IndexNow (batch submission)
 * @param urls - Array of full URLs to submit for indexing
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowResponse[]> {
  const results: IndexNowResponse[] = [];

  // Use only the primary endpoint for batch submissions
  const endpoint = INDEXNOW_ENDPOINTS[0];

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });

    results.push({
      success: response.ok,
      endpoint,
      status: response.status,
    });
  } catch (error) {
    results.push({
      success: false,
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  return results;
}

/**
 * Get the IndexNow key for verification
 */
export function getIndexNowKey(): string {
  return INDEXNOW_KEY;
}

/**
 * Generate common URLs to submit after deployment
 */
export function getCommonUrlsToIndex(): string[] {
  const baseUrl = `https://${SITE_HOST}`;

  return [
    baseUrl,
    `${baseUrl}/pricing`,
    `${baseUrl}/product`,
    `${baseUrl}/about`,
    `${baseUrl}/contact`,
    `${baseUrl}/blog`,
    `${baseUrl}/compare`,
  ];
}

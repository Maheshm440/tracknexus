// SECURITY FIX #5: CSRF token endpoint
import { NextRequest, NextResponse } from 'next/server';
import { generateCsrfToken, setCsrfCookie } from '@/lib/csrf';

/**
 * GET /api/csrf - Get CSRF token
 * This endpoint generates a new CSRF token for forms and AJAX requests
 */
export async function GET(request: NextRequest) {
  try {
    const token = generateCsrfToken();
    const response = NextResponse.json({
      csrfToken: token,
      message: 'Include this token in X-CSRF-Token header for state-changing requests'
    });

    setCsrfCookie(response, token);

    return response;
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token. Please try again.' },
      { status: 500 }
    );
  }
}

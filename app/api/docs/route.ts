import { NextResponse } from 'next/server';

const apiDocumentation = {
  name: 'TrackNexus API',
  version: '1.0.0',
  baseUrl: '/api',
  authentication: {
    type: 'Cookie-based (JWT)',
    cookies: ['tracknexus_auth', 'tracknexus_role'],
    description: 'Most endpoints require authentication via HTTP-only cookies set during login.',
  },
  endpoints: {
    authentication: [
      { method: 'POST', path: '/api/auth/signup', auth: false, description: 'Register a new user account', rateLimit: '3 requests/hour' },
      { method: 'POST', path: '/api/auth/login', auth: false, description: 'Login with email and password', rateLimit: '5 requests/15min' },
      { method: 'POST', path: '/api/auth/logout', auth: true, description: 'Clear authentication cookies' },
      { method: 'POST', path: '/api/auth/check-email', auth: false, description: 'Check if email exists and requires password' },
      { method: 'POST', path: '/api/auth/check-mfa', auth: false, description: 'Check MFA status for admin user' },
      { method: 'POST', path: '/api/auth/login-mfa', auth: false, description: 'Login with MFA code (admin only)', rateLimit: '5 requests/5min' },
      { method: 'GET', path: '/api/auth/mfa/setup', auth: true, description: 'Get MFA setup status' },
      { method: 'POST', path: '/api/auth/mfa/setup', auth: true, description: 'Generate MFA QR code and secret' },
      { method: 'POST', path: '/api/auth/mfa/verify', auth: true, description: 'Verify MFA code during login' },
      { method: 'POST', path: '/api/auth/mfa/verify-setup', auth: true, description: 'Complete MFA setup with first code' },
      { method: 'POST', path: '/api/auth/mfa/disable', auth: true, description: 'Disable MFA (requires current code)' },
      { method: 'GET', path: '/api/auth/mfa/backup-codes', auth: true, description: 'Get remaining backup codes count' },
      { method: 'POST', path: '/api/auth/mfa/backup-codes', auth: true, description: 'Generate new backup codes' },
    ],
    leads: [
      { method: 'GET', path: '/api/leads', auth: true, description: 'List leads with filters and pagination' },
      { method: 'POST', path: '/api/leads', auth: false, description: 'Create a new lead (with input sanitization)' },
      { method: 'GET', path: '/api/leads/:id', auth: true, description: 'Get lead details with visitor data' },
      { method: 'PATCH', path: '/api/leads/:id', auth: true, description: 'Update lead status or score' },
      { method: 'DELETE', path: '/api/leads/:id', auth: true, description: 'Delete a lead (cascade)' },
    ],
    clients: [
      { method: 'GET', path: '/api/clients', auth: true, description: 'List clients with filters and stats' },
      { method: 'POST', path: '/api/clients', auth: true, description: 'Create a new client' },
      { method: 'GET', path: '/api/clients/:id', auth: true, description: 'Get client details' },
      { method: 'PATCH', path: '/api/clients/:id', auth: true, description: 'Update client information' },
      { method: 'DELETE', path: '/api/clients/:id', auth: true, description: 'Delete a client' },
    ],
    tickets: [
      { method: 'GET', path: '/api/tickets', auth: true, description: 'List tickets with filters and pagination' },
      { method: 'POST', path: '/api/tickets', auth: true, description: 'Create a support ticket' },
      { method: 'GET', path: '/api/tickets/:id', auth: true, description: 'Get ticket with responses' },
      { method: 'PATCH', path: '/api/tickets/:id', auth: true, description: 'Update ticket status/priority' },
      { method: 'DELETE', path: '/api/tickets/:id', auth: true, description: 'Delete a ticket (cascade)' },
      { method: 'POST', path: '/api/tickets/:id/responses', auth: true, description: 'Add a response to a ticket' },
    ],
    followUps: [
      { method: 'GET', path: '/api/follow-ups', auth: true, description: 'List follow-ups with filters' },
      { method: 'POST', path: '/api/follow-ups', auth: true, description: 'Create a follow-up task' },
      { method: 'GET', path: '/api/follow-ups/:id', auth: true, description: 'Get follow-up details' },
      { method: 'PATCH', path: '/api/follow-ups/:id', auth: true, description: 'Update follow-up status' },
      { method: 'DELETE', path: '/api/follow-ups/:id', auth: true, description: 'Delete a follow-up' },
    ],
    analytics: [
      { method: 'GET', path: '/api/analytics', auth: true, description: 'Get analytics (overview, geo, pages, trends)' },
      { method: 'GET', path: '/api/attribution', auth: true, description: 'Get attribution data with filters' },
      { method: 'POST', path: '/api/attribution', auth: true, description: 'Create attribution record' },
      { method: 'GET', path: '/api/visitors', auth: true, description: 'List visitors with filters' },
      { method: 'GET', path: '/api/bot-activity', auth: true, description: 'Get bot activity summary' },
      { method: 'GET', path: '/api/team', auth: true, description: 'List team members with stats' },
    ],
    tracking: [
      { method: 'POST', path: '/api/tracking/consent', auth: false, description: 'Record cookie consent and init tracking' },
      { method: 'POST', path: '/api/tracking/session', auth: false, description: 'End session with final metrics' },
      { method: 'POST', path: '/api/tracking/pageview', auth: false, description: 'Track a page view' },
    ],
    security: [
      { method: 'GET', path: '/api/csrf', auth: false, description: 'Generate CSRF token' },
    ],
  },
  rateLimits: {
    auth: '5 requests per 15 minutes per IP',
    signup: '3 requests per hour per IP',
    mfa: '5 requests per 5 minutes per IP',
    api: '100 requests per 15 minutes per IP',
    tracking: '1000 requests per 15 minutes per IP',
  },
  errorCodes: {
    400: 'Bad Request - Invalid input or missing required fields',
    401: 'Unauthorized - Authentication required',
    403: 'Forbidden - Insufficient permissions or invalid CSRF token',
    404: 'Not Found - Resource does not exist',
    429: 'Too Many Requests - Rate limit exceeded',
    500: 'Internal Server Error - Unexpected server error',
  },
};

export async function GET() {
  return NextResponse.json(apiDocumentation, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Logout successful' },
    { status: 200 }
  );

  // Clear the auth cookies
  response.cookies.delete('tracknexus_auth');
  response.cookies.delete('tracknexus_role');

  return response;
}

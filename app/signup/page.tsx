'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Signup is disabled - MFA-only authentication
// Redirect to login page
export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <p>Redirecting to login...</p>
      </div>
    </div>
  );
}

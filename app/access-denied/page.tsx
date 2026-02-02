'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldAlert, Home, LogOut, ArrowLeft } from 'lucide-react';

export default function AccessDeniedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    // Auto-redirect countdown
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/');
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-red-100">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <ShieldAlert className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
            Access Denied
          </h1>

          {/* Message */}
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            The dashboard is restricted to administrators only. Your current account does not have admin privileges.
          </p>

          {/* Info box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800 text-center">
              <strong>Admin Access Only:</strong> Only admin accounts can access the dashboard. Please contact your administrator if you need access.
            </p>
          </div>

          {/* Auto-redirect message */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500">
              Redirecting to homepage in <span className="font-bold text-red-600">{countdown}</span> seconds...
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 active:scale-95"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>

            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 w-full py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>

        {/* Help text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link href="/contact" className="text-red-600 hover:text-red-700 font-medium underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

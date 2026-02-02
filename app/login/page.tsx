'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Lock, CheckCircle, Mail, Eye, EyeOff } from 'lucide-react';
import { LogoWithoutDropdown } from '@/components/logo';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  // Get redirect URL from search params
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if email requires password
  const checkEmailRequirements = async (emailValue: string) => {
    if (!emailValue || !emailValue.includes('@')) {
      setRequiresPassword(false);
      return;
    }

    setCheckingEmail(true);
    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue.toLowerCase() }),
      });

      if (response.ok) {
        const data = await response.json();
        setRequiresPassword(data.requiresPassword);
      }
    } catch (err) {
      console.error('Error checking email:', err);
    } finally {
      setCheckingEmail(false);
    }
  };

  // Handle email blur - check requirements
  const handleEmailBlur = () => {
    if (email.trim()) {
      checkEmailRequirements(email.trim());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Validate password if required
    if (requiresPassword && !password.trim()) {
      setError('Please enter your password');
      setIsLoading(false);
      return;
    }

    try {
      setSuccess('Signing you in...');

      // First, logout any existing session to clear old cookies
      await fetch('/api/auth/logout', { method: 'POST' });

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password || undefined
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store dashboard data in localStorage for all users
        // Only update if API returns actual data, don't overwrite with empty arrays
        if (data.dashboardData) {
          if (data.dashboardData.users && data.dashboardData.users.length > 0) {
            localStorage.setItem('tracknexus_users', JSON.stringify(data.dashboardData.users));
          }
          if (data.dashboardData.leads && data.dashboardData.leads.length > 0) {
            localStorage.setItem('tracknexus_leads', JSON.stringify(data.dashboardData.leads));
          }
          if (data.dashboardData.visitors && data.dashboardData.visitors.length > 0) {
            localStorage.setItem('visitor_tracking', JSON.stringify(data.dashboardData.visitors));
          }
          if (data.dashboardData.activities && data.dashboardData.activities.length > 0) {
            localStorage.setItem('tracknexus_activities', JSON.stringify(data.dashboardData.activities));
          }
        }
        localStorage.setItem('tracknexus_user', JSON.stringify(data.user));

        // Dispatch custom event to notify header about auth change
        window.dispatchEvent(new Event('auth-change'));

        // Redirect based on role - admin to dashboard, users to homepage
        const isAdmin = data.user?.role === 'admin';
        const targetUrl = isAdmin ? redirectUrl : '/';
        const message = isAdmin ? 'Admin login successful! Redirecting to dashboard...' : 'Login successful! Redirecting...';
        setSuccess(message);
        setTimeout(() => {
          router.push(targetUrl);
        }, 500);
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please check your connection and try again.');
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col" key="login-container">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-highlight/10 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Back to home */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Login form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xs">
          <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-5 border border-white/20">
            {/* Logo */}
            <div className="text-center mb-5">
              <Link href="/" className="inline-flex justify-center">
                <LogoWithoutDropdown dark />
              </Link>
              <h1 className="mt-4 text-2xl font-bold text-gray-900">
                Login
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Sign in to your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1.5 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    disabled={isLoading}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1.5 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-red-700 text-xs font-medium">{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-green-700 text-xs font-medium">{success}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email.trim() || checkingEmail}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                  isLoading || !email.trim() || checkingEmail
                    ? 'bg-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-highlight hover:bg-highlight/90 active:scale-95'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Security Notice */}
          <div className="mt-4 text-center text-[10px] text-gray-400">
            <p>Secure login</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <LoginContent />
    </Suspense>
  );
}

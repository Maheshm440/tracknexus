'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Shield, CheckCircle, Mail, Smartphone } from 'lucide-react';
import { LogoWithoutDropdown } from '@/components/logo';
import Image from 'next/image';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [step, setStep] = useState<'email' | 'setup' | 'mfa'>('email');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [manualEntryKey, setManualEntryKey] = useState('');

  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Step 1: Validate email and check if MFA is set up
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!email.trim()) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/check-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.hasMFA) {
          // User has MFA enabled, show code input
          setStep('mfa');
          setSuccess('');
        } else if (data.needsSetup) {
          // User needs to set up MFA, show QR code
          setQrCodeDataURL(data.qrCodeDataURL);
          setManualEntryKey(data.manualEntryKey);
          setStep('setup');
          setSuccess('');
        } else {
          setError('Unable to set up MFA. Please contact administrator.');
        }
      } else {
        setError(data.error || 'Invalid email address');
      }
    } catch (err) {
      console.error('Email check error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2/3: Verify MFA code and login
  const handleMFASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!mfaCode.trim() || mfaCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      setIsLoading(false);
      return;
    }

    try {
      setSuccess('Verifying...');

      const response = await fetch('/api/auth/login-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase(),
          code: mfaCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.dashboardData) {
          if (data.dashboardData.leads?.length > 0) {
            localStorage.setItem('tracknexus_leads', JSON.stringify(data.dashboardData.leads));
          }
          if (data.dashboardData.visitors?.length > 0) {
            localStorage.setItem('visitor_tracking', JSON.stringify(data.dashboardData.visitors));
          }
          if (data.dashboardData.activities?.length > 0) {
            localStorage.setItem('tracknexus_activities', JSON.stringify(data.dashboardData.activities));
          }
        }
        localStorage.setItem('tracknexus_user', JSON.stringify(data.user));

        window.dispatchEvent(new Event('auth-change'));

        const isAdmin = data.user?.role === 'admin';
        const targetUrl = isAdmin ? redirectUrl : '/';
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          router.push(targetUrl);
        }, 500);
      } else {
        // Clear success message when there's an error
        setSuccess('');
        setError(data.error || 'Invalid verification code');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('MFA verification error:', err);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col" key="login-container">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-highlight/10 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className={`w-full ${step === 'setup' ? 'max-w-sm' : 'max-w-xs'}`}>
          <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-5 border border-white/20">
            <div className="text-center mb-5">
              <Link href="/" className="inline-flex justify-center">
                <LogoWithoutDropdown dark />
              </Link>
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {step === 'setup' ? (
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Shield className="w-6 h-6 text-blue-600" />
                  )}
                </div>
              </div>
              <h1 className="mt-3 text-xl font-bold text-gray-900">
                {step === 'email' ? 'Login' : step === 'setup' ? 'Set Up Authenticator' : 'Verify Identity'}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {step === 'email'
                  ? 'Enter your email to continue'
                  : step === 'setup'
                  ? 'Scan the QR code with your authenticator app'
                  : 'Enter the code from your authenticator app'
                }
              </p>
            </div>

            {/* Step 1: Email */}
            {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                      disabled={isLoading}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-red-700 text-xs font-medium">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                    isLoading || !email.trim()
                      ? 'bg-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-highlight hover:bg-highlight/90 active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Checking...</span>
                    </>
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </form>
            )}

            {/* Step 2: MFA Setup with QR Code */}
            {step === 'setup' && (
              <form onSubmit={handleMFASubmit} className="space-y-4">
                <div className="text-center mb-2">
                  <p className="text-xs text-gray-500">{email}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setMfaCode('');
                      setError('');
                      setQrCodeDataURL('');
                      setManualEntryKey('');
                    }}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Change email
                  </button>
                </div>

                {/* QR Code */}
                {qrCodeDataURL && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
                      <Image
                        src={qrCodeDataURL}
                        alt="Scan with authenticator app"
                        width={160}
                        height={160}
                        className="w-40 h-40"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Can&apos;t scan? Enter this code manually:</p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono break-all">
                        {manualEntryKey}
                      </code>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <label htmlFor="setupCode" className="block text-xs font-medium text-gray-700 mb-1.5">
                    Enter the 6-digit code from your app
                  </label>
                  <input
                    id="setupCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    disabled={isLoading}
                    className="w-full px-3 py-3 text-center text-xl font-mono tracking-[0.5em] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    autoComplete="one-time-code"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-red-700 text-xs font-medium">{error}</span>
                  </div>
                )}

                {success && (
                  <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-700 text-xs font-medium">{success}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || mfaCode.length !== 6}
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                    isLoading || mfaCode.length !== 6
                      ? 'bg-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-highlight hover:bg-highlight/90 active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>Verify & Login</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 3: MFA Code Verification */}
            {step === 'mfa' && (
              <form onSubmit={handleMFASubmit} className="space-y-4">
                <div className="text-center mb-2">
                  <p className="text-xs text-gray-500">{email}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setMfaCode('');
                      setError('');
                    }}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Change email
                  </button>
                </div>

                <div>
                  <label htmlFor="mfaCode" className="block text-xs font-medium text-gray-700 mb-1.5">
                    6-Digit Code
                  </label>
                  <input
                    id="mfaCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    disabled={isLoading}
                    className="w-full px-3 py-3 text-center text-xl font-mono tracking-[0.5em] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    autoComplete="one-time-code"
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-red-700 text-xs font-medium">{error}</span>
                  </div>
                )}

                {success && (
                  <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-700 text-xs font-medium">{success}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || mfaCode.length !== 6}
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                    isLoading || mfaCode.length !== 6
                      ? 'bg-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-highlight hover:bg-highlight/90 active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>Login</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="mt-4 text-center text-[10px] text-gray-400">
            <p>Secure MFA login</p>
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

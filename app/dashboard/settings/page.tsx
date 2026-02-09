'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Shield, Check, X, Copy, RefreshCw, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

type TabType = 'profile' | 'security';

interface MFAStatus {
  mfaEnabled: boolean;
  hasBackupCodes: boolean;
  remainingBackupCodes?: number;
}

interface MFASetupData {
  qrCodeDataURL: string;
  manualEntryKey: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [mfaStatus, setMfaStatus] = useState<MFAStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [setupMode, setSetupMode] = useState(false);
  const [setupData, setSetupData] = useState<MFASetupData | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [disableCode, setDisableCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Get user from localStorage
  const [user, setUser] = useState({
    name: 'Loading...',
    email: 'Loading...',
    role: 'User',
    status: 'Active',
    initials: '...',
  });

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('tracknexus_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        name: userData.name || 'User',
        email: userData.email || '',
        role: userData.role === 'admin' ? 'Admin' : 'User',
        status: 'Active',
        initials: (userData.name || 'U').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
      });
    }

    // Fetch MFA status
    fetchMFAStatus();
  }, []);

  const fetchMFAStatus = async () => {
    try {
      const response = await fetch('/api/auth/mfa/setup');
      if (response.ok) {
        const data = await response.json();
        setMfaStatus(data);
      }
    } catch (err) {
      console.error('Failed to fetch MFA status:', err);
    } finally {
      setLoading(false);
    }
  };

  const startMFASetup = async () => {
    setError('');
    setSuccess('');
    setActionLoading(true);

    try {
      const response = await fetch('/api/auth/mfa/setup', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setSetupData({
          qrCodeDataURL: data.qrCodeDataURL,
          manualEntryKey: data.manualEntryKey,
        });
        setSetupMode(true);
      } else {
        setError(data.error || 'Failed to start MFA setup');
      }
    } catch (err) {
      console.error('MFA setup error:', err);
      setError('Failed to start MFA setup');
    } finally {
      setActionLoading(false);
    }
  };

  const verifyMFASetup = async () => {
    if (verifyCode.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setError('');
    setActionLoading(true);

    try {
      const response = await fetch('/api/auth/mfa/verify-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verifyCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setBackupCodes(data.backupCodes);
        setSuccess('MFA has been enabled successfully!');
        setSetupMode(false);
        setSetupData(null);
        setVerifyCode('');
        fetchMFAStatus();
      } else {
        setError(data.error || 'Invalid verification code');
      }
    } catch (err) {
      console.error('MFA verify error:', err);
      setError('Failed to verify code');
    } finally {
      setActionLoading(false);
    }
  };

  const disableMFA = async () => {
    if (disableCode.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setError('');
    setActionLoading(true);

    try {
      const response = await fetch('/api/auth/mfa/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: disableCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('MFA has been disabled');
        setShowDisableModal(false);
        setDisableCode('');
        fetchMFAStatus();
      } else {
        setError(data.error || 'Failed to disable MFA');
      }
    } catch (err) {
      console.error('MFA disable error:', err);
      setError('Failed to disable MFA');
    } finally {
      setActionLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'security' as TabType, label: 'Security', icon: Lock },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 -mx-6 px-6">
        <div className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-0.5 text-sm">Manage your account settings</p>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Sidebar - Tabs */}
        <div className="lg:w-48 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-1.5">
            <nav className="space-y-0.5">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 border-l-3 border-orange-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-gray-900">Profile Information</h2>

                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center text-orange-600 font-bold text-base">
                    {user.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Account Details</h3>
                  <div className="space-y-0">
                    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Email</span>
                      <span className="text-gray-900 text-sm font-medium">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Role</span>
                      <span className="text-gray-900 text-sm font-medium">{user.role}</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Status</span>
                      <span className="text-gray-900 text-sm font-medium">{user.status}</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5">
                      <span className="text-gray-600 text-sm">MFA</span>
                      <div className="flex items-center gap-1.5">
                        {loading ? (
                          <span className="text-gray-500 text-sm">Loading...</span>
                        ) : mfaStatus?.mfaEnabled ? (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-green-500 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-green-600 text-sm font-medium">Enabled</span>
                          </>
                        ) : (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300"></div>
                            <span className="text-gray-500 text-sm font-medium">Disabled</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-gray-900">Security Settings</h2>

                {/* Error/Success Messages */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    {error}
                  </div>
                )}
                {success && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    <Check className="w-4 h-4" />
                    {success}
                  </div>
                )}

                {/* Backup Codes Display (shown after MFA setup) */}
                {backupCodes && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Save Your Backup Codes
                    </h3>
                    <p className="text-yellow-700 text-xs mb-3">
                      Store these codes in a safe place. You can use them to access your account if you lose your authenticator device.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {backupCodes.map((code, index) => (
                        <div key={index} className="bg-white px-3 py-2 rounded border border-yellow-300 font-mono text-sm text-center">
                          {code}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(backupCodes.join('\n'))}
                        className="flex items-center gap-1 px-3 py-1.5 bg-yellow-600 text-white text-xs font-medium rounded hover:bg-yellow-700"
                      >
                        <Copy className="w-3 h-3" />
                        Copy All
                      </button>
                      <button
                        onClick={() => setBackupCodes(null)}
                        className="px-3 py-1.5 bg-gray-600 text-white text-xs font-medium rounded hover:bg-gray-700"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}

                {/* MFA Setup Mode */}
                {setupMode && setupData && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-800 mb-3">Setup MFA</h3>

                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-blue-700 text-xs mb-3">
                          Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                        </p>
                        <div className="inline-block bg-white p-3 rounded-lg shadow-sm">
                          <Image
                            src={setupData.qrCodeDataURL}
                            alt="MFA QR Code"
                            width={200}
                            height={200}
                            className="w-48 h-48"
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-blue-700 text-xs mb-2">Or enter this code manually:</p>
                        <div className="flex items-center justify-center gap-2">
                          <code className="bg-white px-3 py-2 rounded border border-blue-300 font-mono text-sm">
                            {setupData.manualEntryKey}
                          </code>
                          <button
                            onClick={() => copyToClipboard(setupData.manualEntryKey)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-blue-700 text-xs font-medium mb-2">
                          Enter the 6-digit code from your authenticator app:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="000000"
                            className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-center font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={verifyMFASetup}
                            disabled={actionLoading || verifyCode.length !== 6}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {actionLoading ? 'Verifying...' : 'Verify'}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSetupMode(false);
                          setSetupData(null);
                          setVerifyCode('');
                          setError('');
                        }}
                        className="w-full py-2 text-gray-600 text-sm hover:text-gray-800"
                      >
                        Cancel Setup
                      </button>
                    </div>
                  </div>
                )}

                {/* MFA Authentication */}
                {!setupMode && (
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">MFA Authentication</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">
                        Secure your account using an authenticator app.
                      </p>
                      <div className="flex items-center gap-2">
                        {loading ? (
                          <span className="text-gray-500 text-xs">Loading...</span>
                        ) : mfaStatus?.mfaEnabled ? (
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                              <Shield className="w-3.5 h-3.5" />
                              Enabled
                            </span>
                            <button
                              onClick={() => setShowDisableModal(true)}
                              className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition-colors"
                            >
                              Disable
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={startMFASetup}
                            disabled={actionLoading}
                            className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            {actionLoading ? 'Loading...' : 'Enable MFA'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Sessions */}
                {!setupMode && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Active Sessions</h3>
                    <p className="text-gray-500 text-xs mb-3">
                      Manage your active sessions across different devices.
                    </p>
                    <div className="bg-gray-50 rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-900">Current Session</p>
                            <p className="text-[10px] text-gray-500">Windows • Chrome • Active now</p>
                          </div>
                        </div>
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Disable MFA Modal */}
      {showDisableModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Disable MFA</h3>
            <p className="text-gray-600 text-sm mb-4">
              Enter your current authenticator code to disable MFA. This will prevent you from logging in.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <input
              type="text"
              maxLength={6}
              value={disableCode}
              onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDisableModal(false);
                  setDisableCode('');
                  setError('');
                }}
                className="flex-1 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={disableMFA}
                disabled={actionLoading || disableCode.length !== 6}
                className="flex-1 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading ? 'Disabling...' : 'Disable MFA'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

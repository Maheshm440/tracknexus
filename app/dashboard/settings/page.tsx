'use client';

import { useState } from 'react';
import { User, Lock, Shield, Check } from 'lucide-react';

type TabType = 'profile' | 'security';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Mock user data - in production, this would come from your auth context/API
  const user = {
    name: 'Mahes Mangala',
    email: 'mahesh.mangala@workisy.com',
    role: 'Admin',
    status: 'Active',
    twoFactorEnabled: true,
    initials: 'MM',
  };

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'security' as TabType, label: 'Security', icon: Lock },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account settings</p>
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
                {/* Profile Information Header */}
                <h2 className="text-base font-semibold text-gray-900">Profile Information</h2>

                {/* User Card */}
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

                {/* Account Details */}
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
                      <span className="text-gray-600 text-sm">Two-Factor Auth</span>
                      <div className="flex items-center gap-1.5">
                        {user.twoFactorEnabled ? (
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
                {/* Security Header */}
                <h2 className="text-base font-semibold text-gray-900">Security Settings</h2>

                {/* Password Section */}
                <div className="pb-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Password</h3>
                  <p className="text-gray-500 text-xs mb-3">
                    Change your password to keep your account secure.
                  </p>
                  <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors">
                    Change Password
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="pb-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-xs">
                      Add an extra layer of security to your account.
                    </p>
                    <div className="flex items-center gap-2">
                      {user.twoFactorEnabled ? (
                        <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                          <Shield className="w-3.5 h-3.5" />
                          Enabled
                        </span>
                      ) : (
                        <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors">
                          Enable 2FA
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Active Sessions */}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

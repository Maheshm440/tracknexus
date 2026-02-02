'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  TrendingUp,
  Shield,
  Calendar,
  Megaphone,
  Headphones,
  Building2,
  UsersRound,
  ChevronRight,
  Clock,
  Zap,
  Target,
  Globe,
  FileText,
  Award,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-cyan-500', badge: null },
  { name: 'Leads', href: '/dashboard/leads', icon: UserPlus, color: 'from-emerald-500 to-teal-500', badge: null },
  { name: 'Visitors', href: '/dashboard/visitors', icon: Users, color: 'from-purple-500 to-pink-500', badge: null },
  { name: 'Attribution', href: '/dashboard/attribution', icon: TrendingUp, color: 'from-orange-500 to-red-500', badge: null },
  { name: 'Bot Activity', href: '/dashboard/bot-activity', icon: Shield, color: 'from-indigo-500 to-purple-500', badge: null },
  { name: 'Follow-ups', href: '/dashboard/follow-ups', icon: Calendar, color: 'from-amber-500 to-orange-500', badge: null },
  { name: 'Marketing', href: '/dashboard/marketing', icon: Megaphone, color: 'from-pink-500 to-rose-500', badge: null },
  { name: 'Help Desk', href: '/dashboard/help-desk', icon: Headphones, color: 'from-cyan-500 to-blue-500', badge: null },
  { name: 'Manage Clients', href: '/dashboard/clients', icon: Building2, color: 'from-green-500 to-emerald-500', badge: null },
  { name: 'Team', href: '/dashboard/team', icon: UsersRound, color: 'from-violet-500 to-purple-500', badge: null },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, color: 'from-gray-500 to-slate-500', badge: null },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 transform transition-transform duration-300 ease-in-out lg:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/10 flex-shrink-0" suppressHydrationWarning>
          <div className="flex items-center gap-3" suppressHydrationWarning>
            <div className="w-10 h-10 flex items-center justify-center" suppressHydrationWarning>
              <Clock className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
            <div suppressHydrationWarning>
              <div className="flex items-center gap-1" suppressHydrationWarning>
                <span className="text-white font-bold text-xl tracking-tight">Track</span>
                <span className="text-cyan-400 font-bold text-xl tracking-tight">Nexus</span>
              </div>
              <p className="text-white text-[10px] leading-tight -mt-0.5">Smart Monitoring for Smarter Teams</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 min-h-0 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg transform scale-105'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-200',
                  isActive 
                    ? 'bg-white/20 shadow-inner' 
                    : 'bg-white/5 group-hover:bg-white/10'
                )}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className={cn(
                    'px-2 py-1 text-xs font-bold rounded-full',
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gradient-to-r ' + item.color + ' text-white'
                  )}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>
        {/* Footer - Fixed at bottom */}
        <div className="mt-auto border-t border-white/10">
          {/* User Profile Section */}
          <div className="px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                MM
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Mahes Mangala</p>
                <p className="text-xs text-gray-400 truncate">Admin</p>
              </div>
            </div>
          </div>

          {/* Sign Out Link */}
          <div className="px-4 pb-6">
            <button
              onClick={() => {
                setSidebarOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-56 lg:flex-col">
        <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-white/10">
          {/* Enhanced Header */}
          <div className="flex items-center h-16 px-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <Clock className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-white font-bold text-lg tracking-tight">Track</span>
                  <span className="text-cyan-400 font-bold text-lg tracking-tight">Nexus</span>
                </div>
                <p className="text-white text-[9px] leading-tight -mt-0.5">Smart Monitoring for Smarter Teams</p>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation - Scrollable */}
          <nav className="flex-1 min-h-0 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group relative flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-md flex items-center justify-center mr-2 transition-all duration-200',
                    isActive 
                      ? 'bg-white/20 shadow-inner' 
                      : 'bg-white/5 group-hover:bg-white/10'
                  )}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-xs">{item.name}</span>
                  {item.badge && (
                    <span className={cn(
                      'px-1.5 py-0.5 text-xs font-bold rounded-full animate-pulse',
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                    )}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight className="w-3 h-3 ml-auto animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer - Fixed at bottom */}
          <div className="mt-auto border-t border-white/10">
            {/* User Profile Section */}
            <div className="px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                  MM
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Mahes Mangala</p>
                  <p className="text-xs text-gray-400 truncate">Admin</p>
                </div>
              </div>
            </div>

            {/* Sign Out Link */}
            <div className="px-3 pb-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-56">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 flex items-center h-16 px-4 bg-white/80 backdrop-blur-md border-b border-gray-200 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-4 flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Clock className="w-8 h-8 text-gray-900" strokeWidth={2} />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-900 font-bold text-lg tracking-tight">Track</span>
              <span className="text-cyan-600 font-bold text-lg tracking-tight">Nexus</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6 px-6">{children}</main>
      </div>
    </div>
  );
}

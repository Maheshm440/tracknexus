'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Globe,
  MapPin,
  Eye,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertCircle,
  Activity,
  Clock,
  RefreshCw,
  Monitor,
  Smartphone,
  ArrowUpRight,
  TrendingDown,
  Share2,
  Search,
  DollarSign,
  Mail,
  TrendingUp,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

// ─── Types ───────────────────────────────────────────────────────────
interface OverviewData {
  totalVisitors: number;
  totalSessions: number;
  totalPageViews: number;
  avgDuration: number;
  bounceRate: number;
}

interface RealtimeData {
  activeVisitors: number;
  activeSessions: Array<{
    id: string;
    country: string;
    countryCode: string | null;
    currentPage: string;
    startTime: string;
  }>;
  topActivePages: Array<{ path: string; count: number }>;
}

interface TopPage {
  path: string;
  views: number;
}

interface GeoItem {
  country: string;
  countryCode: string | null;
  count: number;
}

interface VisitorItem {
  id: string;
  fingerprint: string | null;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  totalPageViews: number;
  totalTimeOnSite: number;
  sessionCount: number;
  firstVisit: string;
  lastVisit: string;
  leads: number;
  sessions: number;
}

interface SessionItem {
  id: string;
  visitorFingerprint: string | null;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  deviceType: string | null;
  browser: string | null;
  os: string | null;
  referrer: string | null;
  pageViews: number;
}

interface TrafficSourceStats {
  visitors: number;
  sessions: number;
  leads: number;
  conversion: number;
}

interface AnalyticsResponse {
  success: boolean;
  overview: OverviewData;
  realtime: RealtimeData;
  trafficSources: Record<string, TrafficSourceStats>;
  socialBreakdown: Record<string, number>;
  topPages: TopPage[];
  geography: GeoItem[];
  visitors: VisitorItem[];
  sessions: SessionItem[];
}

// ─── Helpers ─────────────────────────────────────────────────────────
function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0s';
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

function formatDurationShort(seconds: number): string {
  if (!seconds || seconds <= 0) return '0s';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
}

const DATE_RANGES = [
  { label: 'All Time', days: 3650 },
  { label: '90 Days', days: 90 },
  { label: '30 Days', days: 30 },
  { label: '14 Days', days: 14 },
  { label: '7 Days', days: 7 },
  { label: 'Today', days: 1 },
];

// ─── Component ───────────────────────────────────────────────────────
export default function VisitorsPage() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState(30);
  const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'sessions'>('overview');
  const [visitorPage, setVisitorPage] = useState(1);
  const [sessionPage, setSessionPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const perPage = 10;

  const fetchData = useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const res = await fetch(`/api/visitors/analytics?days=${selectedDays}`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json: AnalyticsResponse = await res.json();
      if (!json.success) throw new Error('API returned error');
      setData(json);
    } catch (err) {
      console.error('Failed to fetch visitor analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedDays]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Pagination
  const paginatedVisitors = data?.visitors.slice((visitorPage - 1) * perPage, visitorPage * perPage) || [];
  const totalVisitorPages = Math.ceil((data?.visitors.length || 0) / perPage);
  const paginatedSessions = data?.sessions.slice((sessionPage - 1) * perPage, sessionPage * perPage) || [];
  const totalSessionPages = Math.ceil((data?.sessions.length || 0) / perPage);

  // ─── Loading Skeleton ────────────────────────────────────────────
  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div className="bg-white border-b border-gray-200 -mx-6 px-6 py-3">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mt-2" />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="h-40 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-white rounded-xl border animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const overview = data?.overview || { totalVisitors: 0, totalSessions: 0, totalPageViews: 0, avgDuration: 0, bounceRate: 0 };
  const realtime = data?.realtime || { activeVisitors: 0, activeSessions: [], topActivePages: [] };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 -mx-6 px-6">
        <div className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Visitor Analytics</h1>
            <p className="text-gray-500 mt-0.5 text-sm">
              Track and analyze your website visitors in real-time
            </p>
          </div>
        </div>
      </div>

      {/* Date Range Tabs + Refresh */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {DATE_RANGES.map((range) => (
            <button
              key={range.days}
              onClick={() => { setSelectedDays(range.days); setVisitorPage(1); setSessionPage(1); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedDays === range.days
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Sub-tabs: Overview | Visitors | Sessions */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Activity className="w-4 h-4" />
          Overview
        </button>
        <button
          onClick={() => { setActiveTab('visitors'); setVisitorPage(1); }}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'visitors'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Users className="w-4 h-4" />
          Visitors
          {data && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-200 rounded-full">
              {data.overview.totalVisitors.toLocaleString()}
            </span>
          )}
        </button>
        <button
          onClick={() => { setActiveTab('sessions'); setSessionPage(1); }}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'sessions'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Monitor className="w-4 h-4" />
          Sessions
          {data && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-200 rounded-full">
              {data.overview.totalSessions.toLocaleString()}
            </span>
          )}
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-amber-800 font-medium text-sm">{error}</p>
            <button
              onClick={() => fetchData()}
              className="text-xs text-amber-700 underline mt-1"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════ OVERVIEW TAB ═══════════════ */}
      {activeTab === 'overview' && (
        <>
          {/* Real-time Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-100">Real-time</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Active Visitors */}
              <div>
                <p className="text-3xl font-bold">{realtime.activeVisitors}</p>
                <p className="text-green-100 text-sm mt-1">Active Visitors</p>
              </div>

              {/* Top Active Pages */}
              <div>
                <p className="text-sm font-medium text-green-100 mb-2">Top Active Pages</p>
                {realtime.topActivePages.length > 0 ? (
                  <div className="space-y-1.5">
                    {realtime.topActivePages.slice(0, 3).map((page, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="truncate text-white/90">{page.path}</span>
                        <span className="text-green-200 ml-2 font-medium">{page.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-200 text-sm">No active pages</p>
                )}
              </div>

              {/* Active Sessions */}
              <div>
                <p className="text-sm font-medium text-green-100 mb-2">Active Sessions</p>
                {realtime.activeSessions.length > 0 ? (
                  <div className="space-y-1.5">
                    {realtime.activeSessions.slice(0, 3).map((s, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-white/90">{s.country}</span>
                        <span className="truncate text-green-200 ml-2">{s.currentPage}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-200 text-sm">No active sessions</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Unique Visitors */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-xl font-semibold text-gray-900">{overview.totalVisitors.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-0.5">Unique Visitors</p>
            </div>

            {/* Page Views */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-xl font-semibold text-gray-900">{overview.totalPageViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-0.5">Page Views</p>
            </div>

            {/* Avg Time on Site */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-xl font-semibold text-gray-900">{formatDurationShort(overview.avgDuration)}</p>
              <p className="text-sm text-gray-500 mt-0.5">Avg. Time on Site</p>
            </div>

            {/* Bounce Rate */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-xl font-semibold text-gray-900">{overview.bounceRate}%</p>
              <p className="text-sm text-gray-500 mt-0.5">Bounce Rate</p>
            </div>
          </div>

          {/* Traffic Sources Section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-5">
              <Share2 className="w-5 h-5 text-gray-600" />
              <h2 className="text-base font-semibold text-gray-900">Traffic Sources</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sources Table */}
              <div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Visitors</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Leads</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Conv.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {/* Direct */}
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Direct</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.direct?.visitors || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.direct?.sessions || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.direct?.leads || 0}</td>
                      <td className="py-3 px-2 text-center text-sm font-medium text-gray-900">{data?.trafficSources?.direct?.conversion?.toFixed(2) || 0}%</td>
                    </tr>

                    {/* Organic */}
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Search className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Organic</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.organic?.visitors || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.organic?.sessions || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.organic?.leads || 0}</td>
                      <td className="py-3 px-2 text-center text-sm font-medium text-gray-900">{data?.trafficSources?.organic?.conversion?.toFixed(2) || 0}%</td>
                    </tr>

                    {/* Social */}
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Share2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Social</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.social?.visitors || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.social?.sessions || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.social?.leads || 0}</td>
                      <td className="py-3 px-2 text-center text-sm font-medium text-gray-900">{data?.trafficSources?.social?.conversion?.toFixed(2) || 0}%</td>
                    </tr>

                    {/* Paid */}
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Paid</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.paid?.visitors || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.paid?.sessions || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.paid?.leads || 0}</td>
                      <td className="py-3 px-2 text-center text-sm font-medium text-gray-900">{data?.trafficSources?.paid?.conversion?.toFixed(2) || 0}%</td>
                    </tr>

                    {/* Referral */}
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <ArrowUpRight className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Referral</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.referral?.visitors || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.referral?.sessions || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.referral?.leads || 0}</td>
                      <td className="py-3 px-2 text-center text-sm font-medium text-gray-900">{data?.trafficSources?.referral?.conversion?.toFixed(2) || 0}%</td>
                    </tr>

                    {/* Email */}
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                            <Mail className="w-4 h-4 text-pink-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Email</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.email?.visitors || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.email?.sessions || 0}</td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600">{data?.trafficSources?.email?.leads || 0}</td>
                      <td className="py-3 px-2 text-center text-sm font-medium text-gray-900">{data?.trafficSources?.email?.conversion?.toFixed(2) || 0}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Social Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Social Breakdown</h3>
                <div className="space-y-3">
                  {/* LinkedIn */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">LinkedIn</span>
                    </div>
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${data?.socialBreakdown && Object.values(data.socialBreakdown).reduce((a, b) => a + b, 0) > 0 ? (data.socialBreakdown.linkedin / Object.values(data.socialBreakdown).reduce((a, b) => a + b, 0) * 100) : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">{data?.socialBreakdown?.linkedin || 0}</span>
                    </div>
                  </div>

                  {/* Twitter */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-black" />
                      <span className="text-sm text-gray-700">Twitter</span>
                    </div>
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black rounded-full transition-all"
                          style={{ width: `${data?.socialBreakdown && Object.values(data.socialBreakdown).reduce((a, b) => a + b, 0) > 0 ? (data.socialBreakdown.twitter / Object.values(data.socialBreakdown).reduce((a, b) => a + b, 0) * 100) : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">{data?.socialBreakdown?.twitter || 0}</span>
                    </div>
                  </div>

                  {/* Facebook */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Facebook</span>
                    </div>
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${data?.socialBreakdown && Object.values(data.socialBreakdown).reduce((a, b) => a + b, 0) > 0 ? (data.socialBreakdown.facebook / Object.values(data.socialBreakdown).reduce((a, b) => a + b, 0) * 100) : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">{data?.socialBreakdown?.facebook || 0}</span>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span className="text-sm text-gray-700">Instagram</span>
                    </div>
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-pink-600 rounded-full transition-all"
                          style={{ width: `${data?.socialBreakdown && Object.values(data.socialBreakdown).reduce((a, b) => a + b, 0) > 0 ? (data.socialBreakdown.instagram / Object.values(data.socialBreakdown).reduce((a, b) => a + b, 0) * 100) : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">{data?.socialBreakdown?.instagram || 0}</span>
                    </div>
                  </div>

                  {/* Other */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Other</span>
                    </div>
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-400 rounded-full transition-all"
                          style={{ width: `${data?.socialBreakdown && Object.values(data.socialBreakdown).reduce((a, b) => a + b, 0) > 0 ? (data.socialBreakdown.other / Object.values(data.socialBreakdown).reduce((a, b) => a + b, 0) * 100) : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">{data?.socialBreakdown?.other || 0}</span>
                    </div>
                  </div>
                </div>

                {Object.values(data?.socialBreakdown || {}).reduce((a, b) => a + b, 0) === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">No social traffic yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Top Pages + Geography */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Top Pages */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm">Top Pages</h3>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
              <div className="p-4">
                {(data?.topPages || []).length > 0 ? (
                  <div className="space-y-3">
                    {data!.topPages.slice(0, 8).map((page, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center min-w-0 flex-1">
                          <span className="text-xs text-gray-400 w-5 flex-shrink-0">{i + 1}.</span>
                          <span className="text-sm text-gray-700 truncate">{page.path}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 ml-3">{page.views}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm text-center py-6">No page data yet</p>
                )}
              </div>
            </div>

            {/* Geography */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm">Top Countries</h3>
                <Globe className="w-4 h-4 text-gray-400" />
              </div>
              <div className="p-4">
                {(data?.geography || []).length > 0 ? (
                  <div className="space-y-3">
                    {data!.geography.slice(0, 8).map((geo, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center min-w-0 flex-1">
                          <span className="text-xs text-gray-400 w-5 flex-shrink-0">{i + 1}.</span>
                          <Globe className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">{geo.country}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 ml-3">{geo.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm text-center py-6">No geography data yet</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════ VISITORS TAB ═══════════════ */}
      {activeTab === 'visitors' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Visitor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Location</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Sessions</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Page Views</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Time on Site</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Last Visit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedVisitors.map((visitor) => (
                  <tr key={visitor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {visitor.fingerprint
                              ? `Visitor ${visitor.fingerprint.slice(0, 8)}`
                              : `Visitor ${visitor.id.slice(0, 8)}`}
                          </p>
                          {visitor.leads > 0 && (
                            <span className="text-xs text-green-600 font-medium">{visitor.leads} lead(s)</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {visitor.country ? (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1.5 flex-shrink-0" />
                          <span className="truncate">
                            {visitor.city && `${visitor.city}, `}
                            {visitor.country}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Unknown</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-sm text-gray-600">{visitor.sessions}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-sm text-gray-600">{visitor.totalPageViews}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-sm text-gray-600">{formatDuration(visitor.totalTimeOnSite)}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                        {visitor.lastVisit && !isNaN(new Date(visitor.lastVisit).getTime())
                          ? format(new Date(visitor.lastVisit), 'MMM d, yyyy')
                          : 'N/A'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedVisitors.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No visitors found for this period</p>
            </div>
          )}

          {/* Pagination */}
          {totalVisitorPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Showing {(visitorPage - 1) * perPage + 1} to{' '}
                {Math.min(visitorPage * perPage, data?.visitors.length || 0)} of{' '}
                {data?.visitors.length || 0} visitors
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVisitorPage((p) => Math.max(1, p - 1))}
                  disabled={visitorPage === 1}
                  className="p-1.5 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-600">
                  {visitorPage} / {totalVisitorPages}
                </span>
                <button
                  onClick={() => setVisitorPage((p) => Math.min(totalVisitorPages, p + 1))}
                  disabled={visitorPage === totalVisitorPages}
                  className="p-1.5 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════ SESSIONS TAB ═══════════════ */}
      {activeTab === 'sessions' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Visitor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Location</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Pages</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Device</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Referrer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Started</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          {session.deviceType === 'mobile' ? (
                            <Smartphone className="w-4 h-4 text-purple-600" />
                          ) : (
                            <Monitor className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {session.visitorFingerprint
                              ? `Visitor ${session.visitorFingerprint.slice(0, 8)}`
                              : `Session ${session.id.slice(0, 8)}`}
                          </p>
                          <p className="text-xs text-gray-400">
                            {[session.browser, session.os].filter(Boolean).join(' / ') || 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {session.country ? (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1.5 flex-shrink-0" />
                          <span className="truncate">
                            {session.city && `${session.city}, `}
                            {session.country}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Unknown</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-sm text-gray-600">{session.pageViews}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-sm text-gray-600">
                        {session.duration ? formatDuration(session.duration) : (
                          session.endTime ? '< 1s' : (
                            <span className="text-green-600 text-xs font-medium">Active</span>
                          )
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                        session.deviceType === 'mobile'
                          ? 'bg-blue-50 text-blue-700'
                          : session.deviceType === 'tablet'
                          ? 'bg-orange-50 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {session.deviceType || 'desktop'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {session.referrer ? (
                        <div className="flex items-center text-sm text-gray-600 max-w-[150px]">
                          <ArrowUpRight className="w-3 h-3 text-gray-400 mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {(() => { try { return new URL(session.referrer).hostname; } catch { return session.referrer; } })()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Direct</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm text-gray-500">
                        {session.startTime && !isNaN(new Date(session.startTime).getTime())
                          ? formatDistanceToNow(new Date(session.startTime), { addSuffix: true })
                          : 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedSessions.length === 0 && (
            <div className="text-center py-12">
              <Monitor className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No sessions found for this period</p>
            </div>
          )}

          {/* Pagination */}
          {totalSessionPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Showing {(sessionPage - 1) * perPage + 1} to{' '}
                {Math.min(sessionPage * perPage, data?.sessions.length || 0)} of{' '}
                {data?.sessions.length || 0} sessions
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSessionPage((p) => Math.max(1, p - 1))}
                  disabled={sessionPage === 1}
                  className="p-1.5 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-600">
                  {sessionPage} / {totalSessionPages}
                </span>
                <button
                  onClick={() => setSessionPage((p) => Math.min(totalSessionPages, p + 1))}
                  disabled={sessionPage === totalSessionPages}
                  className="p-1.5 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

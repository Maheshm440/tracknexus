"use client";

import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Users, TrendingUp, Activity, CheckCircle, AlertCircle } from 'lucide-react';

// Lazy load heavy components
const VisitorTracker = lazy(() => import('@/components/VisitorTracker'));

interface DashboardData {
  overview: {
    totalLeads: number;
    newLeads: number;
    convertedLeads: number;
    totalUsers: number;
    conversionRate: string;
    totalVisitors: number;
    todayVisitors: number;
    totalPageViews: number;
    todayPageViews: number;
    avgPagesPerVisit: string;
  };
  charts: {
    leadsByStatus: Array<{ _count: number; status: string }>;
  };
  recentLeads: Array<{
    id: string;
    name: string;
    email: string;
    status: string;
    priority: string;
    createdAt: string;
    assignedUser?: { name: string; email: string };
  }>;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    userRef: { name: string; avatar?: string };
  }>;
  recentVisitors: Array<{
    id: string;
    ipAddress: string;
    userAgent: string;
    referrer: string;
    visitCount: number;
    lastVisit: string;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch leads from the database API
      const leadsResponse = await fetch('/api/leads?page=1&limit=100');
      const leadsResult = await leadsResponse.json();
      const leads = leadsResult.success ? leadsResult.data : [];

      // Get visitor data from localStorage (client-side tracking)
      const visitorTrackingData = localStorage.getItem('visitor_tracking') || '[]';
      const visitors = JSON.parse(visitorTrackingData);

      // Calculate lead stats
      const leadStats = leads.reduce((acc: any, lead: any) => {
        acc.total++;
        if (lead.status === 'NEW') acc.new++;
        else if (lead.status === 'CONVERTED') acc.converted++;
        else if (lead.status === 'CONTACTED') acc.contacted++;
        else if (lead.status === 'QUALIFIED') acc.qualified++;
        return acc;
      }, { total: 0, new: 0, converted: 0, contacted: 0, qualified: 0 });

      const totalLeads = leadStats.total;
      const newLeads = leadStats.new;
      const convertedLeads = leadStats.converted;
      const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0';

      // Visitor stats from localStorage
      const today = new Date().toDateString();
      const visitorStats = visitors.reduce((acc: any, v: any) => {
        acc.total++;
        if (new Date(v.timestamp).toDateString() === today) {
          acc.today++;
        }
        return acc;
      }, { total: 0, today: 0 });

      const totalVisitors = visitorStats.total;
      const todayVisitors = visitorStats.today;
      const totalPageViews = visitors.length;
      const todayPageViews = visitorStats.today;
      const avgPagesPerVisit = totalVisitors > 0 ? (totalPageViews / totalVisitors).toFixed(2) : '0.00';

      // Status counts
      const leadsByStatus = [
        { status: 'NEW', _count: leadStats.new },
        { status: 'CONTACTED', _count: leadStats.contacted },
        { status: 'QUALIFIED', _count: leadStats.qualified },
        { status: 'CONVERTED', _count: leadStats.converted }
      ];

      // Recent leads from database (already sorted by API)
      const recentLeads = leads.slice(0, 3).map((lead: any) => ({
        id: lead.id,
        name: lead.name,
        email: lead.companyEmail,
        status: lead.status,
        priority: 'medium',
        createdAt: lead.createdAt,
        assignedUser: null
      }));

      // Get recent activities from localStorage
      const activitiesData = localStorage.getItem('tracknexus_activities') || '[]';
      const activities = JSON.parse(activitiesData);
      const recentActivities = [...activities]
        .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);

      // Get recent unique visitors from localStorage
      const visitorMap = new Map();
      visitors.forEach((v: any) => {
        if (!visitorMap.has(v.ip) || new Date(v.timestamp) > new Date(visitorMap.get(v.ip).lastVisit)) {
          const existingVisitor = visitorMap.get(v.ip) || { visitCount: 0 };
          visitorMap.set(v.ip, {
            id: v.ip,
            ipAddress: v.ip,
            userAgent: v.userAgent || 'Unknown',
            referrer: v.referrer || 'direct',
            visitCount: existingVisitor.visitCount + 1,
            lastVisit: v.timestamp
          });
        }
      });
      const recentVisitors = Array.from(visitorMap.values())
        .sort((a: any, b: any) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
        .slice(0, 5);

      const dashboardData: DashboardData = {
        overview: {
          totalLeads,
          newLeads,
          convertedLeads,
          totalUsers: 0,
          conversionRate,
          totalVisitors,
          todayVisitors,
          totalPageViews,
          todayPageViews,
          avgPagesPerVisit
        },
        charts: {
          leadsByStatus
        },
        recentLeads,
        recentActivities,
        recentVisitors
      };

      setData(dashboardData);
      setError(null);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setError(`Failed to load dashboard data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Memoize status color function to avoid recreating on each render
  const getStatusColor = useMemo(() => (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-800';
      case 'CONTACTED': return 'bg-yellow-100 text-yellow-800';
      case 'QUALIFIED': return 'bg-purple-100 text-purple-800';
      case 'CONVERTED': return 'bg-green-100 text-green-800';
      case 'LOST': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, []);

  if (!mounted) return null;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <div className="bg-white border-b border-gray-200 -mx-6 px-6">
          <div className="flex items-center justify-between h-14">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="py-4">
          {/* Skeleton Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 animate-pulse">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                </div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          {/* Skeleton Data Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 animate-pulse">
                <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                        <div className="h-2 w-24 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Visitor Tracker - invisible component with Suspense */}
      <Suspense fallback={null}>
        <VisitorTracker page="/dashboard" />
      </Suspense>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 -mx-6 px-6">
        <div className="flex items-center justify-between h-14">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Welcome back, Admin</h1>
        </div>
      </div>

      <div className="py-4">
        {/* Stats Cards - FlowSense Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          {/* Total Leads */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3.5 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-[11px] font-semibold uppercase tracking-wide">Total Leads</p>
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900">{data.overview.totalLeads}</p>
          </div>

          {/* New Leads */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3.5 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-[11px] font-semibold uppercase tracking-wide">New Leads</p>
              <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-cyan-600" />
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900">{data.overview.newLeads}</p>
          </div>

          {/* Converted */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3.5 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-[11px] font-semibold uppercase tracking-wide">Won</p>
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900">{data.overview.convertedLeads}</p>
          </div>

          {/* Conversion Rate */}
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-3.5 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-[11px] font-semibold uppercase tracking-wide">Conversion</p>
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                <Activity className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900">{data.overview.conversionRate}%</p>
          </div>

          {/* Total Visitors */}
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-3.5 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-[11px] font-semibold uppercase tracking-wide">Visitors</p>
              <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900">{data.overview.totalVisitors}</p>
          </div>

          {/* Page Views */}
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-3.5 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-[11px] font-semibold uppercase tracking-wide">Page Views</p>
              <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center">
                <Activity className="w-4 h-4 text-pink-600" />
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900">{data.overview.totalPageViews}</p>
          </div>
        </div>

        {/* Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Leads */}
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-base font-bold text-gray-900">Recent Leads</h2>
              <a href="/dashboard/leads" className="text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center gap-1">
                View all →
              </a>
            </div>
            <div className="p-4 space-y-2">
              {data.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{lead.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      <span className="text-[10px] text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-base font-bold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-4 space-y-2">
              {data.recentActivities && data.recentActivities.length > 0 ? (
                data.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm leading-tight">{activity.description}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <p className="text-[10px] text-gray-600 font-medium">{activity.userRef?.name || 'System'}</p>
                        <span className="text-[10px] text-gray-300">•</span>
                        <p className="text-[10px] text-gray-500">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No activities yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Visitors */}
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-base font-bold text-gray-900">Recent Visitors</h2>
            </div>
            <div className="p-4 space-y-2">
              {data.recentVisitors.map((visitor, index) => (
                <div key={visitor.id || `visitor-${index}`} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{visitor.ipAddress}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="px-2 py-0.5 text-[10px] bg-purple-100 text-purple-700 rounded-full font-semibold">
                        {visitor.visitCount} visits
                      </span>
                      <p className="text-[10px] text-gray-500">
                        {new Date(visitor.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

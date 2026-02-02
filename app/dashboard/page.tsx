"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Activity, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import VisitorTracker from '@/components/VisitorTracker';

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
      console.log('Loading dashboard data...');

      // Get real data from localStorage
      const usersData = localStorage.getItem('tracknexus_users') || '[]';
      const users = JSON.parse(usersData);

      const activitiesData = localStorage.getItem('tracknexus_activities') || '[]';
      const activities = JSON.parse(activitiesData);

      const leadsData = localStorage.getItem('tracknexus_leads') || '[]';
      const leads = JSON.parse(leadsData);

      const visitorTrackingData = localStorage.getItem('visitor_tracking') || '[]';
      const visitors = JSON.parse(visitorTrackingData);

      // Calculate stats from real data
      const totalUsers = users.length;
      const totalLeads = leads.length;
      const newLeads = leads.filter((l: any) => l.status === 'NEW').length;
      const convertedLeads = leads.filter((l: any) => l.status === 'CONVERTED').length;
      const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0';

      // Visitor stats
      const totalVisitors = visitors.length;
      const today = new Date().toDateString();
      const todayVisitors = visitors.filter((v: any) =>
        new Date(v.timestamp).toDateString() === today
      ).length;

      const totalPageViews = visitors.length;
      const todayPageViews = visitors.filter((v: any) =>
        new Date(v.timestamp).toDateString() === today
      ).length;
      const avgPagesPerVisit = totalVisitors > 0 ? (totalPageViews / totalVisitors).toFixed(2) : '0.00';

      // Get status counts
      const leadsByStatus = [
        { status: 'NEW', _count: leads.filter((l: any) => l.status === 'NEW').length },
        { status: 'CONTACTED', _count: leads.filter((l: any) => l.status === 'CONTACTED').length },
        { status: 'QUALIFIED', _count: leads.filter((l: any) => l.status === 'QUALIFIED').length },
        { status: 'CONVERTED', _count: leads.filter((l: any) => l.status === 'CONVERTED').length }
      ];

      // Get recent items (last 3)
      const recentLeads = [...leads]
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)
        .map((lead: any) => ({
          ...lead,
          assignedUser: lead.assignedUser || null
        }));

      const recentActivities = [...activities]
        .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);

      // Get recent unique visitors
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
          totalUsers,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-800';
      case 'CONTACTED': return 'bg-yellow-100 text-yellow-800';
      case 'QUALIFIED': return 'bg-purple-100 text-purple-800';
      case 'CONVERTED': return 'bg-green-100 text-green-800';
      case 'LOST': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Visitor Tracker - invisible component */}
      <VisitorTracker page="/dashboard" />

      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Welcome back, Admin</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards - FlowSense Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {/* Total Leads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs font-medium">Total Leads</p>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.overview.totalLeads}</p>
          </motion.div>

          {/* New Leads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs font-medium">New Leads</p>
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-cyan-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.overview.newLeads}</p>
          </motion.div>

          {/* Converted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs font-medium">Won</p>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.overview.convertedLeads}</p>
          </motion.div>

          {/* Conversion Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs font-medium">Conversion</p>
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <Activity className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.overview.conversionRate}%</p>
          </motion.div>

          {/* Total Visitors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs font-medium">Visitors</p>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.overview.totalVisitors}</p>
          </motion.div>

          {/* Page Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs font-medium">Page Views</p>
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                <Activity className="w-4 h-4 text-pink-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.overview.totalPageViews}</p>
          </motion.div>
        </div>

        {/* Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Leads */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900">Recent Leads</h2>
              <a href="/dashboard/leads" className="text-blue-600 hover:text-blue-700 text-xs font-semibold">View all →</a>
            </div>
            <div className="space-y-3">
              {data.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-start gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{lead.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      <span className="text-[10px] text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
          >
            <h2 className="text-sm font-bold text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-3">
              {data.recentActivities && data.recentActivities.length > 0 ? (
                data.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-xs">{activity.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[10px] text-gray-500">{activity.userRef.name}</p>
                        <span className="text-[10px] text-gray-300">•</span>
                        <p className="text-[10px] text-gray-400">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-xs">No activities yet</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Visitors */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
          >
            <h2 className="text-sm font-bold text-gray-900 mb-4">Recent Visitors</h2>
            <div className="space-y-3">
              {data.recentVisitors.map((visitor) => (
                <div key={visitor.id} className="flex items-start gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-xs truncate">{visitor.ipAddress}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 text-[10px] bg-purple-100 text-purple-700 rounded-full font-medium">
                        {visitor.visitCount} visits
                      </span>
                      <p className="text-[10px] text-gray-400">
                        {new Date(visitor.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

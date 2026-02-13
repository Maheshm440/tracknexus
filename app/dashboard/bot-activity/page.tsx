'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Bot,
  Search,
  Globe,
  MessageSquare,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays, subWeeks, subMonths } from 'date-fns';

interface BotStats {
  summary: {
    totalVisits: number;
    since: string;
    until: string | null;
  };
  byBot: { name: string; count: number }[];
  byCategory: { category: string; count: number }[];
  topPaths: { path: string; count: number }[];
  recentActivity: {
    id: string;
    botName: string;
    botCategory: string;
    path: string;
    statusCode: number;
    timestamp: string;
  }[];
}

type DatePreset = 'all' | 'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month' | 'custom';

const DATE_PRESETS: { key: DatePreset; label: string; icon?: boolean }[] = [
  { key: 'all', label: 'All Time' },
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'this_week', label: 'This Week' },
  { key: 'last_week', label: 'Last Week' },
  { key: 'this_month', label: 'This Month' },
  { key: 'last_month', label: 'Last Month' },
  { key: 'custom', label: 'Custom', icon: true },
];

const categoryColors: Record<string, string> = {
  AI: 'bg-purple-100 text-purple-700',
  SEARCH: 'bg-blue-100 text-blue-700',
  SOCIAL: 'bg-green-100 text-green-700',
  OTHER: 'bg-gray-100 text-gray-700',
};

const categoryIcons: Record<string, React.ElementType> = {
  AI: MessageSquare,
  SEARCH: Search,
  SOCIAL: Globe,
  OTHER: Bot,
};

function getCategoryCount(byCategory: { category: string; count: number }[], cat: string): number {
  return byCategory.find((c) => c.category === cat)?.count || 0;
}

function getStatusColor(code: number): string {
  if (code >= 200 && code < 300) return 'text-green-700 bg-green-50';
  if (code >= 300 && code < 400) return 'text-yellow-700 bg-yellow-50';
  return 'text-red-700 bg-red-50';
}

function getDateRange(preset: DatePreset): { since?: string; until?: string; days?: number } {
  const now = new Date();
  switch (preset) {
    case 'all':
      return { days: 3650 };
    case 'today':
      return { since: startOfDay(now).toISOString(), until: endOfDay(now).toISOString() };
    case 'yesterday': {
      const yesterday = subDays(now, 1);
      return { since: startOfDay(yesterday).toISOString(), until: endOfDay(yesterday).toISOString() };
    }
    case 'this_week':
      return { since: startOfWeek(now, { weekStartsOn: 1 }).toISOString(), until: endOfDay(now).toISOString() };
    case 'last_week': {
      const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
      const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
      return { since: lastWeekStart.toISOString(), until: lastWeekEnd.toISOString() };
    }
    case 'this_month':
      return { since: startOfMonth(now).toISOString(), until: endOfDay(now).toISOString() };
    case 'last_month': {
      const lastMonth = subMonths(now, 1);
      return { since: startOfMonth(lastMonth).toISOString(), until: endOfMonth(lastMonth).toISOString() };
    }
    default:
      return { days: 30 };
  }
}

export default function BotActivityPage() {
  const [data, setData] = useState<BotStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<DatePreset>('this_month');
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const itemsPerPage = 10;

  const fetchData = useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const range = getDateRange(activePreset);
      const params = new URLSearchParams();
      if (range.since) params.set('since', range.since);
      if (range.until) params.set('until', range.until);
      if (range.days) params.set('days', range.days.toString());

      const response = await fetch(`/api/bot-activity?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch bot activity data');

      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'Unknown error');

      setData(result);
      setCurrentPage(1);
    } catch (err) {
      console.error('Bot activity fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [activePreset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCustomApply = () => {
    if (customFrom && customTo) {
      setShowCustom(false);
      // For custom, we override fetchData manually
      const fetchCustom = async () => {
        try {
          setLoading(true);
          setError(null);
          const params = new URLSearchParams();
          params.set('since', new Date(customFrom).toISOString());
          params.set('until', endOfDay(new Date(customTo)).toISOString());
          const response = await fetch(`/api/bot-activity?${params.toString()}`);
          if (!response.ok) throw new Error('Failed to fetch');
          const result = await response.json();
          if (!result.success) throw new Error(result.error || 'Unknown error');
          setData(result);
          setCurrentPage(1);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load data');
        } finally {
          setLoading(false);
        }
      };
      fetchCustom();
    }
  };

  const paginatedActivity = data?.recentActivity
    ? data.recentActivity.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];
  const totalPages = data?.recentActivity
    ? Math.ceil(data.recentActivity.length / itemsPerPage)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Bot Activity</h1>
        <p className="text-gray-500 mt-1">
          Monitor AI crawlers, search engines, and social bots accessing your website
        </p>
      </div>

      {/* Date Range Tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {DATE_PRESETS.map((preset) => (
          <button
            key={preset.key}
            onClick={() => {
              if (preset.key === 'custom') {
                setShowCustom(!showCustom);
                setActivePreset('custom');
              } else {
                setShowCustom(false);
                setActivePreset(preset.key);
              }
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activePreset === preset.key
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-1.5">
              {preset.icon && <Calendar className="w-3.5 h-3.5" />}
              {preset.label}
            </span>
          </button>
        ))}
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="p-2 ml-1 text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Custom Date Picker */}
      {showCustom && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-end gap-4 flex-wrap">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={handleCustomApply}
            disabled={!customFrom || !customTo}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-amber-800 font-medium">{error}</p>
            <button onClick={() => fetchData()} className="text-sm text-amber-700 underline mt-1">
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-7 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-32 mb-5"></div>
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="flex justify-between mb-4">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : data ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Visits */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Visits</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {data.summary.totalVisits.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Bots */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ai Bots</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {getCategoryCount(data.byCategory, 'AI').toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Search Bots */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Search Bots</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {getCategoryCount(data.byCategory, 'SEARCH').toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Bots */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Social Bots</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {getCategoryCount(data.byCategory, 'SOCIAL').toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Bots & Most Crawled Pages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Bots */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Top Bots</h3>
              {data.byBot.length > 0 ? (
                <div className="space-y-4">
                  {data.byBot.slice(0, 10).map((bot, i) => (
                    <div key={bot.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 w-5 text-right font-medium">{i + 1}</span>
                        <span className="text-[15px] font-medium text-gray-800">{bot.name}</span>
                      </div>
                      <span className="text-[15px] font-semibold text-orange-600">{bot.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">No bot visits recorded yet</p>
              )}
            </div>

            {/* Most Crawled Pages */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Most Crawled Pages</h3>
              {data.topPaths.length > 0 ? (
                <div className="space-y-4">
                  {data.topPaths.slice(0, 10).map((page, i) => (
                    <div key={page.path} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-sm text-gray-400 w-5 text-right font-medium flex-shrink-0">{i + 1}</span>
                        <span className="text-[15px] text-gray-700 truncate">{page.path}</span>
                      </div>
                      <span className="text-[15px] font-semibold text-orange-600 flex-shrink-0">{page.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">No pages crawled yet</p>
              )}
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            </div>
            {paginatedActivity.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Bot</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Path</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {paginatedActivity.map((activity) => {
                        const CategoryIcon = categoryIcons[activity.botCategory] || Bot;
                        return (
                          <tr key={activity.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2.5">
                                <CategoryIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-800">{activity.botName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[activity.botCategory] || categoryColors.OTHER}`}>
                                {activity.botCategory}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-600 max-w-[280px] truncate inline-block">
                                {activity.path}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusColor(activity.statusCode)}`}>
                                {activity.statusCode}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(activity.timestamp), 'MMM d, HH:mm')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing{' '}
                      <span className="font-medium text-gray-700">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                      <span className="font-medium text-gray-700">
                        {Math.min(currentPage * itemsPerPage, data.recentActivity.length)}
                      </span>{' '}
                      of <span className="font-medium text-gray-700">{data.recentActivity.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 text-gray-500 hover:bg-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-gray-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-gray-600 px-2">
                        Page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{totalPages}</span>
                      </span>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 text-gray-500 hover:bg-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-gray-200"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-12 text-center">
                <Bot className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No bot activity recorded yet</p>
                <p className="text-gray-400 text-sm mt-1">Bot visits will appear here as bots crawl your site</p>
              </div>
            )}
          </div>

        </>
      ) : null}
    </div>
  );
}

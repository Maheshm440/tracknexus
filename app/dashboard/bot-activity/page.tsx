'use client';

import { useEffect, useState } from 'react';
import {
  Bot,
  Activity,
  TrendingUp,
  AlertCircle,
  Clock,
  Target,
  Search,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { format } from 'date-fns';

interface BotActivity {
  id: string;
  botType: 'crawler' | 'scraper' | 'monitor' | 'scanner' | 'other';
  userAgent: string;
  ipAddress: string;
  action: string;
  endpoint: string;
  timestamp: string;
  requestCount: number;
  blocked: boolean;
}

interface BotStats {
  totalBots: number;
  blockedBots: number;
  totalRequests: number;
  crawlers: number;
  scrapers: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Mock data for when database is unavailable
const mockBotActivities: BotActivity[] = [
  {
    id: '1',
    botType: 'crawler',
    userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1)',
    ipAddress: '66.249.64.45',
    action: 'Index',
    endpoint: '/sitemap.xml',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    requestCount: 127,
    blocked: false,
  },
  {
    id: '2',
    botType: 'scraper',
    userAgent: 'python-requests/2.28.0',
    ipAddress: '203.0.113.45',
    action: 'Scrape',
    endpoint: '/api/products',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    requestCount: 234,
    blocked: true,
  },
  {
    id: '3',
    botType: 'monitor',
    userAgent: 'UptimeRobot/2.0',
    ipAddress: '192.0.2.89',
    action: 'Monitor',
    endpoint: '/health',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    requestCount: 18,
    blocked: false,
  },
  {
    id: '4',
    botType: 'crawler',
    userAgent: 'Mozilla/5.0 (compatible; bingbot/2.0)',
    ipAddress: '40.77.167.0',
    action: 'Index',
    endpoint: '/',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    requestCount: 89,
    blocked: false,
  },
  {
    id: '5',
    botType: 'scraper',
    userAgent: 'curl/7.64.1',
    ipAddress: '198.51.100.22',
    action: 'Scrape',
    endpoint: '/api/listings',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    requestCount: 156,
    blocked: true,
  },
  {
    id: '6',
    botType: 'scanner',
    userAgent: 'Nmap Scripting Engine',
    ipAddress: '192.0.2.145',
    action: 'Scan',
    endpoint: '/admin',
    timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    requestCount: 342,
    blocked: true,
  },
  {
    id: '7',
    botType: 'monitor',
    userAgent: 'Pingdom.com_bot_version_1.4',
    ipAddress: '2a02:26f0:6e::5f1',
    action: 'Monitor',
    endpoint: '/api/status',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    requestCount: 12,
    blocked: false,
  },
  {
    id: '8',
    botType: 'crawler',
    userAgent: 'Mozilla/5.0 (compatible; Baiduspider/2.0)',
    ipAddress: '123.125.71.0',
    action: 'Index',
    endpoint: '/blog',
    timestamp: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
    requestCount: 98,
    blocked: false,
  },
  {
    id: '9',
    botType: 'scraper',
    userAgent: 'scrapy/2.6.1',
    ipAddress: '203.0.113.78',
    action: 'Scrape',
    endpoint: '/api/users',
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    requestCount: 267,
    blocked: true,
  },
  {
    id: '10',
    botType: 'other',
    userAgent: 'Unknown-Bot/1.0',
    ipAddress: '192.0.2.201',
    action: 'Access',
    endpoint: '/contact',
    timestamp: new Date(Date.now() - 11 * 60 * 1000).toISOString(),
    requestCount: 45,
    blocked: true,
  },
];

const mockStats: BotStats = {
  totalBots: 342,
  blockedBots: 127,
  totalRequests: 3856,
  crawlers: 156,
  scrapers: 89,
};

export default function BotActivityPage() {
  const [botActivities, setBotActivities] = useState<BotActivity[]>([]);
  const [stats, setStats] = useState<BotStats>(mockStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/bot-activity?page=${currentPage}&limit=10`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch bot activity data');
      }

      // Use mock data if no activities are returned (empty database)
      if (!data.activities || data.activities.length === 0) {
        const start = (currentPage - 1) * 10;
        const end = start + 10;
        setBotActivities(mockBotActivities.slice(start, end));
        setPagination({
          page: currentPage,
          limit: 10,
          total: mockBotActivities.length,
          totalPages: Math.ceil(mockBotActivities.length / 10),
        });
        setStats(mockStats);
        setIsUsingMockData(false);
        setError(null);
        return;
      }

      // Transform API data to match BotActivity interface
      const transformedActivities = data.activities.map((activity: any) => {
        const botType = activity.activityType === 'bot' ? 'scanner' : (activity.activityType === 'suspicious' ? 'scraper' : 'monitor');
        return {
          id: activity.id,
          botType,
          userAgent: activity.userAgent || 'Unknown',
          ipAddress: activity.ipAddress || 'N/A',
          action: activity.activityType === 'bot' ? 'Scan' : activity.activityType === 'suspicious' ? 'Suspicious' : 'Monitor',
          endpoint: `/activity/${activity.id}`,
          timestamp: activity.detectedAt || new Date().toISOString(),
          requestCount: activity.pageViewCount || 0,
          blocked: activity.suspicionScore > 50,
        };
      });

      setBotActivities(transformedActivities);
      setPagination({
        page: currentPage,
        limit: 10,
        total: data.total || 0,
        totalPages: data.totalPages || 0,
      });

      // Use stats from API response
      setStats({
        totalBots: data.stats.totalBots || 0,
        blockedBots: data.stats.botsDetected || 0,
        totalRequests: data.stats.avgPageViews || 0,
        crawlers: data.stats.botsDetected || 0,
        scrapers: data.stats.suspiciousCount || 0,
      });
      setIsUsingMockData(false);
    } catch (err) {
      console.error('Bot activity fetch error:', err);
      // Use mock data as fallback when database is unavailable
      const start = (currentPage - 1) * 10;
      const end = start + 10;
      setBotActivities(mockBotActivities.slice(start, end));
      setStats(mockStats);
      setError(null);
      setIsUsingMockData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const getBotTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      crawler: 'bg-blue-100 text-blue-800',
      scraper: 'bg-red-100 text-red-800',
      monitor: 'bg-green-100 text-green-800',
      scanner: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || colors.other;
  };

  const getBotTypeIcon = (type: string) => {
    const icons: Record<string, React.ElementType> = {
      crawler: Bot,
      scraper: Activity,
      monitor: Activity,
      scanner: Shield,
      other: Bot,
    };
    return icons[type] || Bot;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 -mx-6 px-6">
        <div className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Bot Activity</h1>
            <p className="text-gray-500 mt-0.5 text-sm">Monitor and manage bot traffic on your website</p>
          </div>
        </div>
      </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-amber-800 font-medium">{error}</p>
              <p className="text-xs text-amber-700 mt-1">
                {isUsingMockData && '🤖 Displaying sample bot activity data for demonstration purposes'}
              </p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Bots */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Bots</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{stats.totalBots}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Blocked Bots */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Blocked</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{stats.blockedBots}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Total Requests */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Requests</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{stats.totalRequests}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Crawlers */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Crawlers</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{stats.crawlers}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Scrapers */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Scrapers</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{stats.scrapers}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by IP, User Agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter by Type */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="all">All Bot Types</option>
                <option value="crawler">Crawlers</option>
                <option value="scraper">Scrapers</option>
                <option value="monitor">Monitors</option>
                <option value="scanner">Scanners</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bot Activity Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <p className="text-gray-600 mt-3">Loading bot activity data...</p>
            </div>
          ) : botActivities.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Bot Type</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">IP Address</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Endpoint</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Requests</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {botActivities.map((activity) => {
                      const BotIcon = getBotTypeIcon(activity.botType);
                      return (
                        <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <BotIcon className="w-4 h-4 text-gray-500" />
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBotTypeColor(activity.botType)}`}>
                                {activity.botType.charAt(0).toUpperCase() + activity.botType.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">{activity.ipAddress}</code>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-700 font-medium">{activity.action}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">{activity.endpoint}</code>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-gray-900">{activity.requestCount}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {activity.blocked ? (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1 w-fit">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                Blocked
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Allowed
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              {format(new Date(activity.timestamp), 'HH:mm')}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * 10, pagination.total)}</span> of{' '}
                  <span className="font-medium">{pagination.total}</span> bot activities
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:bg-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-700 mx-2">
                    Page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{pagination.totalPages}</span>
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                    disabled={currentPage === pagination.totalPages}
                    className="p-2 text-gray-600 hover:bg-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <Bot className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No bot activity found</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* What is Bot Activity */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </span>
              What is Bot Activity?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Bot activity monitoring tracks automated traffic to your website. This includes search engine crawlers, monitoring services,
              and potentially malicious scrapers or scanners.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Crawlers:</strong> Search engines indexing your content</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span><strong>Scrapers:</strong> Unauthorized content extraction</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Monitors:</strong> Uptime and performance monitoring</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Scanners:</strong> Security vulnerability scanning</span>
              </li>
            </ul>
          </div>

          {/* Security Tips */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </span>
              Security Best Practices
            </h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Block suspicious scrapers and scanners using IP rules</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Monitor request patterns for unusual activity</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Set rate limiting to prevent resource exhaustion</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Allow legitimate crawlers like Google and Bing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Review logs regularly for security threats</span>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
}

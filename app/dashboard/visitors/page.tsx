'use client';

import { useEffect, useState } from 'react';
import {
  Globe,
  MapPin,
  Eye,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';

interface Visitor {
  id: string;
  fingerprint: string | null;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  consentGiven: boolean;
  totalPageViews: number;
  totalTimeOnSite: number;
  firstVisit: string;
  lastVisit: string;
  _count: {
    sessions: number;
    leads: number;
  };
}

interface GeoData {
  byCountry: Array<{
    country: string;
    countryCode: string;
    count: number;
  }>;
  byCity: Array<{
    city: string;
    country: string;
    count: number;
  }>;
}

interface PageData {
  topPages: Array<{
    path: string;
    views: number;
    avgTimeOnPage: number;
    avgScrollDepth: number;
  }>;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

function formatDuration(seconds: number): string {
  if (!seconds) return '0s';
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'visitors' | 'geo' | 'pages'>(
    'visitors'
  );

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        setError(null);
        setIsUsingMockData(false);

        // Read from localStorage
        const visitorTrackingData = localStorage.getItem('visitor_tracking') || '[]';
        const trackingData = JSON.parse(visitorTrackingData);

        if (activeTab === 'visitors') {
          // Process tracking data into visitor format
          // Group by userAgent as a simple way to identify unique visitors
          const visitorMap = new Map();

          trackingData.forEach((visit: any) => {
            const key = visit.userAgent || 'unknown';
            if (!visitorMap.has(key)) {
              visitorMap.set(key, {
                id: key,
                fingerprint: null,
                country: null,
                countryCode: null,
                city: null,
                consentGiven: true,
                totalPageViews: 0,
                totalTimeOnSite: 0,
                firstVisit: visit.timestamp,
                lastVisit: visit.timestamp,
                _count: { sessions: 1, leads: 0 }
              });
            }

            const visitor = visitorMap.get(key);
            visitor.totalPageViews++;
            if (new Date(visit.timestamp) > new Date(visitor.lastVisit)) {
              visitor.lastVisit = visit.timestamp;
            }
            if (new Date(visit.timestamp) < new Date(visitor.firstVisit)) {
              visitor.firstVisit = visit.timestamp;
            }
          });

          const allVisitors = Array.from(visitorMap.values()).sort(
            (a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
          );

          // Paginate
          const start = (currentPage - 1) * 10;
          const end = start + 10;
          const paginatedVisitors = allVisitors.slice(start, end);

          setVisitors(paginatedVisitors);
          setPagination({
            page: currentPage,
            limit: 10,
            total: allVisitors.length,
            totalPages: Math.ceil(allVisitors.length / 10),
          });
        } else if (activeTab === 'geo') {
          // For now, show empty geo data since we don't have location info
          setGeoData({ byCountry: [], byCity: [] });
        } else if (activeTab === 'pages') {
          // Process page views
          const pageMap = new Map();

          trackingData.forEach((visit: any) => {
            const path = visit.page || '/';
            if (!pageMap.has(path)) {
              pageMap.set(path, {
                path,
                views: 0,
                avgTimeOnPage: 0,
                avgScrollDepth: 0
              });
            }
            pageMap.get(path).views++;
          });

          const topPages = Array.from(pageMap.values())
            .sort((a, b) => b.views - a.views)
            .slice(0, 10);

          setPageData({ topPages });
        }
      } catch (err) {
        console.error('Error loading visitor data:', err);
        setError(null);
        // Set empty data instead of showing error
        if (activeTab === 'visitors') {
          setVisitors([]);
          setPagination({
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          });
        } else if (activeTab === 'geo') {
          setGeoData({ byCountry: [], byCity: [] });
        } else if (activeTab === 'pages') {
          setPageData({ topPages: [] });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up auto-refresh every 3 seconds to capture new visitor data
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [activeTab, currentPage]);

  const tabs = [
    { id: 'visitors', label: 'Visitors', icon: Users },
    { id: 'geo', label: 'Geography', icon: Globe },
    { id: 'pages', label: 'Top Pages', icon: Eye },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visitor Analytics</h1>
        <p className="text-gray-500 mt-1">
          Analyze your website visitors and their behavior
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-amber-800 font-medium">{error}</p>
            <p className="text-xs text-amber-700 mt-1">
              {isUsingMockData && '📊 Displaying sample data for demonstration purposes'}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-highlight text-highlight'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-highlight"></div>
            </div>
          ) : (
            <>
              {/* Visitors Tab */}
              {activeTab === 'visitors' && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                            Visitor
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                            Location
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                            Sessions
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                            Page Views
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                            Time on Site
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                            Last Visit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {visitors.map((visitor) => (
                          <tr key={visitor.id} className="hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-highlight/10 rounded-full flex items-center justify-center mr-3">
                                  <Users className="w-4 h-4 text-highlight" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">
                                    {visitor.fingerprint
                                      ? `Visitor ${visitor.fingerprint.slice(0, 8)}`
                                      : `Visitor ${visitor.id.slice(0, 8)}`}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {visitor._count.leads > 0 && (
                                      <span className="text-green-600">
                                        {visitor._count.leads} lead(s)
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              {visitor.country ? (
                                <div className="flex items-center text-sm">
                                  <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1" />
                                  <span>
                                    {visitor.city && `${visitor.city}, `}
                                    {visitor.country}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">
                                  Unknown
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="text-sm text-gray-600">
                                {visitor._count.sessions}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="text-sm text-gray-600">
                                {visitor.totalPageViews}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="text-sm text-gray-600">
                                {formatDuration(visitor.totalTimeOnSite)}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="w-3.5 h-3.5 mr-1" />
                                {format(
                                  new Date(visitor.lastVisit),
                                  'MMM d, yyyy'
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {visitors.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No visitors found</p>
                    </div>
                  )}

                  {/* Pagination */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-500">
                        Showing {(currentPage - 1) * pagination.limit + 1} to{' '}
                        {Math.min(
                          currentPage * pagination.limit,
                          pagination.total
                        )}{' '}
                        of {pagination.total} visitors
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-gray-600">
                          Page {currentPage} of {pagination.totalPages}
                        </span>
                        <button
                          onClick={() =>
                            setCurrentPage((p) =>
                              Math.min(pagination.totalPages, p + 1)
                            )
                          }
                          disabled={currentPage === pagination.totalPages}
                          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Geography Tab */}
              {activeTab === 'geo' && geoData && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Top Countries
                    </h3>
                    {geoData.byCountry.length > 0 ? (
                      <div className="space-y-3">
                        {geoData.byCountry.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <Globe className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="font-medium">
                                {item.country || 'Unknown'}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {item.count} visitors
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No data available
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Top Cities
                    </h3>
                    {geoData.byCity.length > 0 ? (
                      <div className="space-y-3">
                        {geoData.byCity.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                              <div>
                                <span className="font-medium">
                                  {item.city || 'Unknown'}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                  {item.country}
                                </span>
                              </div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {item.count} visitors
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No data available
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Top Pages Tab */}
              {activeTab === 'pages' && pageData && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Top Pages by Views
                  </h3>
                  {pageData.topPages.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                              Page
                            </th>
                            <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                              Views
                            </th>
                            <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                              Avg. Time
                            </th>
                            <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                              Scroll Depth
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {pageData.topPages.map((page, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <span className="font-medium text-gray-900">
                                  {page.path}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right text-gray-600">
                                {page.views}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-600">
                                {formatDuration(page.avgTimeOnPage)}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-600">
                                {page.avgScrollDepth}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No page data available
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

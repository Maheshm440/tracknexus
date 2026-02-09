'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface Attribution {
  id: string;
  source?: string;
  medium?: string;
  campaign?: string;
  referrer?: string;
  landingPage?: string;
  lead?: {
    id: string;
    name: string;
    status: string;
  };
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Stats {
  totalAttributions: number;
  conversions: number;
  conversionRate: number;
  topSources: Array<{ source: string; count: number }>;
  topCampaigns: Array<{ campaign: string; count: number }>;
}


export default function AttributionPage() {
  const [attributions, setAttributions] = useState<Attribution[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('');
  const [mediumFilter, setMediumFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAttribution, setSelectedAttribution] = useState<Attribution | null>(null);

  const fetchAttributions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get leads from localStorage
      const leadsData = localStorage.getItem('tracknexus_leads') || '[]';
      const leads = JSON.parse(leadsData);

      // Get visitor tracking data to extract referrer/source info
      const visitorData = localStorage.getItem('visitor_tracking') || '[]';
      const visitors = JSON.parse(visitorData);

      // Create attributions from leads
      const attributionsFromLeads: Attribution[] = leads.map((lead: any) => ({
        id: lead.id,
        source: lead.source || 'Direct',
        medium: 'Organic',
        campaign: lead.formType || 'N/A',
        referrer: 'direct',
        landingPage: '/',
        lead: {
          id: lead.id,
          name: lead.name,
          status: lead.status || 'NEW',
        },
        createdAt: lead.createdAt,
      }));

      // Apply filters
      let filteredAttributions: Attribution[] = attributionsFromLeads;

      if (sourceFilter) {
        filteredAttributions = filteredAttributions.filter(
          (attr: Attribution) => attr.source?.toLowerCase() === sourceFilter.toLowerCase()
        );
      }

      if (mediumFilter) {
        filteredAttributions = filteredAttributions.filter(
          (attr: Attribution) => attr.medium?.toLowerCase() === mediumFilter.toLowerCase()
        );
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredAttributions = filteredAttributions.filter(
          (attr) =>
            attr.campaign?.toLowerCase().includes(searchLower) ||
            attr.lead?.name.toLowerCase().includes(searchLower)
        );
      }

      // Sort by date (newest first)
      filteredAttributions.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Calculate stats from all leads (not filtered)
      const totalAttributions = attributionsFromLeads.length;
      const conversions = attributionsFromLeads.filter(
        (attr) => attr.lead?.status === 'CONVERTED'
      ).length;
      const conversionRate =
        totalAttributions > 0 ? (conversions / totalAttributions) * 100 : 0;

      // Get top sources
      const sourceMap = new Map();
      attributionsFromLeads.forEach((attr) => {
        const count = sourceMap.get(attr.source) || 0;
        sourceMap.set(attr.source, count + 1);
      });
      const topSources = Array.from(sourceMap.entries())
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Get top campaigns
      const campaignMap = new Map();
      attributionsFromLeads.forEach((attr) => {
        const campaign = attr.campaign || 'Uncategorized';
        const count = campaignMap.get(campaign) || 0;
        campaignMap.set(campaign, count + 1);
      });
      const topCampaigns = Array.from(campaignMap.entries())
        .map(([campaign, count]) => ({ campaign, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Paginate
      const start = (currentPage - 1) * 10;
      const end = start + 10;
      const paginatedAttributions = filteredAttributions.slice(start, end);

      setAttributions(paginatedAttributions);
      setPagination({
        page: currentPage,
        limit: 10,
        total: filteredAttributions.length,
        totalPages: Math.ceil(filteredAttributions.length / 10),
      });
      setStats({
        totalAttributions,
        conversions,
        conversionRate,
        topSources,
        topCampaigns,
      });
      setIsUsingMockData(false);
    } catch (err) {
      console.error('Error loading attributions:', err);
      setAttributions([]);
      setPagination({
        page: currentPage,
        limit: 10,
        total: 0,
        totalPages: 0,
      });
      setStats({
        totalAttributions: 0,
        conversions: 0,
        conversionRate: 0,
        topSources: [],
        topCampaigns: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttributions();
  }, [currentPage, sourceFilter, mediumFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAttributions();
  };

  if (loading && attributions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-highlight"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 -mx-6 px-6">
        <div className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Attribution</h1>
            <p className="text-gray-500 mt-0.5 text-sm">
              Track lead sources and campaign performance
            </p>
          </div>
        </div>
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

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Leads Attributed</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {stats.totalAttributions}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Conversions</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {stats.conversions}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {stats.conversionRate.toFixed(2)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Top Source</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {stats.topSources[0]?.source || 'N/A'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>
      )}

      {/* Top Sources & Campaigns */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Sources */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Sources</h3>
            <div className="space-y-3">
              {stats.topSources.map((source, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">
                    {source.source || 'Direct'}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${
                            (source.count / stats.totalAttributions) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {source.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Campaigns */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Campaigns</h3>
            <div className="space-y-3">
              {stats.topCampaigns.map((campaign, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">
                    {campaign.campaign || 'Uncategorized'}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${
                            (campaign.count / stats.totalAttributions) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {campaign.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by campaign..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                />
              </div>
            </form>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sourceFilter}
                onChange={(e) => {
                  setSourceFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
              >
                <option value="">All Sources</option>
                <option value="google">Google</option>
                <option value="facebook">Facebook</option>
                <option value="direct">Direct</option>
                <option value="referral">Referral</option>
                <option value="organic">Organic</option>
              </select>
            </div>
            <select
              value={mediumFilter}
              onChange={(e) => {
                setMediumFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
            >
              <option value="">All Medium</option>
              <option value="cpc">CPC</option>
              <option value="organic">Organic</option>
              <option value="email">Email</option>
              <option value="social">Social</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Source
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Medium
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Campaign
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Lead
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {attributions.map((attribution) => (
                <tr
                  key={attribution.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedAttribution(attribution)}
                >
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {attribution.source || 'Direct'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {attribution.medium || 'Organic'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-900">
                    {attribution.campaign || 'Uncategorized'}
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">
                      {attribution.lead?.name || 'N/A'}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        attribution.lead?.status === 'CONVERTED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {attribution.lead?.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {format(parseISO(attribution.createdAt), 'MMM d, yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {attributions.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No attributions found</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * pagination.limit + 1} to{' '}
              {Math.min(currentPage * pagination.limit, pagination.total)} of{' '}
              {pagination.total} attributions
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
                  setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))
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

      {/* Attribution Detail Modal */}
      {selectedAttribution && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedAttribution(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Attribution Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Source</p>
                  <p className="font-medium capitalize">
                    {selectedAttribution.source || 'Direct'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Medium</p>
                  <p className="font-medium capitalize">
                    {selectedAttribution.medium || 'Organic'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Campaign</p>
                  <p className="font-medium">
                    {selectedAttribution.campaign || 'Uncategorized'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Term</p>
                  <p className="font-medium">
                    {selectedAttribution.landingPage || 'N/A'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Landing Page</p>
                  <p className="font-medium text-sm break-all">
                    {selectedAttribution.landingPage || 'N/A'}
                  </p>
                </div>
                {selectedAttribution.lead && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Lead Name</p>
                      <p className="font-medium">{selectedAttribution.lead.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Lead Status</p>
                      <p className="font-medium">{selectedAttribution.lead.status}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Date: {format(parseISO(selectedAttribution.createdAt), 'PPpp')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

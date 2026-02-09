'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Phone,
  Building,
  Calendar,
  Star,
  MoreVertical,
  Eye,
  Trash2,
  TrendingUp,
  AlertCircle,
  Zap,
  Users,
} from 'lucide-react';
import { format } from 'date-fns';

interface Lead {
  id: string;
  name: string;
  companyName: string;
  companyEmail: string;
  companySize: string;
  mobileNumber: string;
  message: string;
  formType: string;
  score: number;
  status: string;
  createdAt: string;
  visitor?: {
    country: string | null;
    city: string | null;
    totalPageViews: number;
    totalTimeOnSite: number;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface LeadStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  conversionRate: number;
  avgScore: number;
}

const emptyStats: LeadStats = {
  totalLeads: 0,
  newLeads: 0,
  convertedLeads: 0,
  conversionRate: 0,
  avgScore: 0,
};

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-800',
  CONTACTED: 'bg-yellow-100 text-yellow-800',
  QUALIFIED: 'bg-purple-100 text-purple-800',
  CONVERTED: 'bg-green-100 text-green-800',
  LOST: 'bg-gray-100 text-gray-800',
};

const statusOptions = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'];

function ScoreBadge({ score }: { score: number }) {
  let colorClass = 'bg-gray-100 text-gray-800';
  if (score >= 80) colorClass = 'bg-green-100 text-green-800';
  else if (score >= 60) colorClass = 'bg-blue-100 text-blue-800';
  else if (score >= 40) colorClass = 'bg-yellow-100 text-yellow-800';
  else if (score >= 20) colorClass = 'bg-orange-100 text-orange-800';
  else colorClass = 'bg-red-100 text-red-800';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      <Star className="w-3 h-3 mr-1" />
      {score}
    </span>
  );
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats>(emptyStats);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      // Read leads from localStorage
      const leadsData = localStorage.getItem('tracknexus_leads') || '[]';
      let allLeads = JSON.parse(leadsData);

      // Apply filters
      if (statusFilter) {
        allLeads = allLeads.filter((lead: Lead) => lead.status === statusFilter);
      }

      if (search) {
        const searchLower = search.toLowerCase();
        allLeads = allLeads.filter((lead: Lead) =>
          lead.name.toLowerCase().includes(searchLower) ||
          lead.companyName.toLowerCase().includes(searchLower) ||
          lead.companyEmail.toLowerCase().includes(searchLower)
        );
      }

      // Sort by date (newest first)
      allLeads.sort((a: Lead, b: Lead) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Calculate stats from all leads (before pagination)
      const leadsDataForStats = JSON.parse(localStorage.getItem('tracknexus_leads') || '[]');
      const totalLeads = leadsDataForStats.length;
      const newLeads = leadsDataForStats.filter((l: Lead) => l.status === 'NEW').length;
      const convertedLeads = leadsDataForStats.filter((l: Lead) => l.status === 'CONVERTED').length;
      const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100) : 0;
      const avgScore = totalLeads > 0
        ? leadsDataForStats.reduce((sum: number, l: Lead) => sum + (l.score || 0), 0) / totalLeads
        : 0;

      setStats({
        totalLeads,
        newLeads,
        convertedLeads,
        conversionRate: Math.round(conversionRate * 100) / 100,
        avgScore: Math.round(avgScore),
      });

      // Pagination
      const limit = 10;
      const total = allLeads.length;
      const totalPages = Math.ceil(total / limit);
      const start = (currentPage - 1) * limit;
      const end = start + limit;
      const paginatedLeads = allLeads.slice(start, end);

      setLeads(paginatedLeads);
      setPagination({
        page: currentPage,
        limit,
        total,
        totalPages,
      });
      setIsUsingMockData(false);
    } catch (err) {
      console.error('Error loading leads:', err);
      setError('Failed to load leads from storage');
      setLeads([]);
      setPagination({
        page: currentPage,
        limit: 10,
        total: 0,
        totalPages: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [currentPage, statusFilter, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchLeads();
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      // Update in localStorage
      const leadsData = localStorage.getItem('tracknexus_leads') || '[]';
      const leads = JSON.parse(leadsData);
      const updatedLeads = leads.map((lead: Lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      );
      localStorage.setItem('tracknexus_leads', JSON.stringify(updatedLeads));

      // Add activity log
      const activitiesData = localStorage.getItem('tracknexus_activities') || '[]';
      const activities = JSON.parse(activitiesData);
      activities.push({
        id: Date.now().toString(),
        type: 'lead_updated',
        description: `Lead status updated to ${newStatus}`,
        timestamp: new Date().toISOString(),
        userRef: { name: 'System', email: 'system@tracknexus.com' }
      });
      localStorage.setItem('tracknexus_activities', JSON.stringify(activities));

      // Refresh leads
      fetchLeads();
      setShowDropdown(null);
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const deleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      // Delete from localStorage
      const leadsData = localStorage.getItem('tracknexus_leads') || '[]';
      const leads = JSON.parse(leadsData);
      const updatedLeads = leads.filter((lead: Lead) => lead.id !== leadId);
      localStorage.setItem('tracknexus_leads', JSON.stringify(updatedLeads));

      // Add activity log
      const activitiesData = localStorage.getItem('tracknexus_activities') || '[]';
      const activities = JSON.parse(activitiesData);
      activities.push({
        id: Date.now().toString(),
        type: 'lead_deleted',
        description: `Lead deleted`,
        timestamp: new Date().toISOString(),
        userRef: { name: 'System', email: 'system@tracknexus.com' }
      });
      localStorage.setItem('tracknexus_activities', JSON.stringify(activities));

      fetchLeads();
      setShowDropdown(null);
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  if (loading && leads.length === 0) {
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
            <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
            <p className="text-gray-500 mt-0.5 text-sm">
              Manage and track your leads from website forms
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Total Leads */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-xs font-medium">Total Leads</p>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-xl font-semibold text-gray-900">{stats.totalLeads}</p>
        </div>

        {/* New Leads */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-xs font-medium">New Leads</p>
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyan-600" />
            </div>
          </div>
          <p className="text-xl font-semibold text-gray-900">{stats.newLeads}</p>
        </div>

        {/* Converted Leads */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-xs font-medium">Converted</p>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-xl font-semibold text-gray-900">{stats.convertedLeads}</p>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-xs font-medium">Conversion Rate</p>
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Star className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-xl font-semibold text-gray-900">{stats.conversionRate}%</p>
        </div>

        {/* Average Score */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-xs font-medium">Avg Score</p>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <Star className="w-4 h-4 text-orange-600" />
            </div>
          </div>
          <p className="text-xl font-semibold text-gray-900">{stats.avgScore}/100</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
              />
            </div>
          </form>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
            >
              <option value="">All Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Lead
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Company
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Source
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                  Score
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Date
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{lead.name}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        {lead.companyEmail}
                      </div>
                      {lead.mobileNumber && (
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                          <Phone className="w-3.5 h-3.5 mr-1" />
                          {lead.mobileNumber}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-gray-900 text-sm">{lead.companyName || '-'}</p>
                        <p className="text-xs text-gray-500">
                          {lead.companySize} employees
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {lead.formType.replace('-', ' ')}
                    </span>
                    {lead.visitor?.country && (
                      <p className="text-xs text-gray-500 mt-1">
                        {lead.visitor.city}, {lead.visitor.country}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <ScoreBadge score={lead.score} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[lead.status] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowDropdown(
                            showDropdown === lead.id ? null : lead.id
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      {showDropdown === lead.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <div className="border-t my-1" />
                          <p className="px-4 py-1 text-xs text-gray-500 font-medium">
                            Change Status
                          </p>
                          {statusOptions.map((status) => (
                            <button
                              key={status}
                              onClick={() => updateLeadStatus(lead.id, status)}
                              className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 ${
                                lead.status === status
                                  ? 'text-highlight font-medium'
                                  : 'text-gray-700'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                          <div className="border-t my-1" />
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {leads.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No leads found</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * pagination.limit + 1} to{' '}
              {Math.min(currentPage * pagination.limit, pagination.total)} of{' '}
              {pagination.total} leads
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

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Lead Details
                </h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Name</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedLead.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Company</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedLead.companyName || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Email</p>
                  <p className="text-sm text-gray-900">{selectedLead.companyEmail}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Phone</p>
                  <p className="text-sm text-gray-900">{selectedLead.mobileNumber || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Company Size</p>
                  <p className="text-sm text-gray-900">{selectedLead.companySize}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Form Type</p>
                  <p className="text-sm text-gray-900 capitalize">
                    {selectedLead.formType.replace('-', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Score</p>
                  <ScoreBadge score={selectedLead.score} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[selectedLead.status]
                    }`}
                  >
                    {selectedLead.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5">Message</p>
                <p className="text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {selectedLead.message}
                </p>
              </div>
              {selectedLead.visitor && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1.5">Visitor Info</p>
                  <div className="p-3 bg-blue-50 rounded-lg grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-blue-900">Location:</span>{' '}
                      <span className="text-blue-800">{selectedLead.visitor.city}, {selectedLead.visitor.country}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-900">Page Views:</span>{' '}
                      <span className="text-blue-800">{selectedLead.visitor.totalPageViews}</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="border-t pt-3 text-xs text-gray-500">
                <span className="font-medium">Created:</span>{' '}
                {format(new Date(selectedLead.createdAt), 'PPpp')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

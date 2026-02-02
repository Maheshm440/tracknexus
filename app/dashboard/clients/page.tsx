'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Building2,
  DollarSign,
  Users,
  MoreVertical,
  Eye,
  Trash2,
  X,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PROSPECT' | 'CHURNED';
  value?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ClientStats {
  total: number;
  active: number;
  totalValue: number;
  churnRate: number;
  avgClientValue: number;
}

const defaultClientStats: ClientStats = {
  total: 0,
  active: 0,
  totalValue: 0,
  churnRate: 0,
  avgClientValue: 0,
};

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  PROSPECT: 'bg-blue-100 text-blue-800',
  CHURNED: 'bg-red-100 text-red-800',
};

const statusOptions = ['ACTIVE', 'INACTIVE', 'PROSPECT', 'CHURNED'];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState<ClientStats>(defaultClientStats);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });

      if (statusFilter) params.append('status', statusFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/clients?${params}`);
      const data = await res.json();

      setClients(data.data || []);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 });
      setStats(data.stats || defaultClientStats);
      setError(null);
      setIsUsingMockData(false);
    } catch (err) {
      console.error('Clients fetch error:', err);
      setClients([]);
      setPagination({ page: 1, limit: 10, total: 0, totalPages: 0 });
      setStats(defaultClientStats);
      setError(null);
      setIsUsingMockData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [currentPage, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchClients();
  };

  const updateClientStatus = async (clientId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/clients/${clientId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update client');
      fetchClients();
      if (selectedClient?.id === clientId) {
        setSelectedClient(null);
      }
      setShowDropdown(null);
    } catch (err) {
      console.error('Failed to update client:', err);
    }
  };

  const deleteClient = async (clientId: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      const res = await fetch(`/api/clients/${clientId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete client');
      fetchClients();
      if (selectedClient?.id === clientId) {
        setSelectedClient(null);
      }
      setShowDropdown(null);
    } catch (err) {
      console.error('Failed to delete client:', err);
    }
  };

  if (loading && clients.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-highlight"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Clients</h1>
          <p className="text-gray-500 mt-1">View and manage all clients</p>
        </div>
      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Clients */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Clients</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Active Clients */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Clients</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.active}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Total Value */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Value</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">${(stats.totalValue || 0).toLocaleString()}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Churn Rate */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Churn Rate</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.churnRate}%</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Avg Client Value */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg Value</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">${(stats.avgClientValue || 0).toLocaleString()}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Company
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                  Status
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                  Value
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{client.name}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{client.email}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {client.company || '-'}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[client.status]
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-sm font-medium text-gray-900">
                    ${client.value?.toLocaleString() || '0'}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowDropdown(showDropdown === client.id ? null : client.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      {showDropdown === client.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                          <button
                            onClick={() => setSelectedClient(client)}
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
                              onClick={() => updateClientStatus(client.id, status)}
                              className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 ${
                                client.status === status
                                  ? 'text-highlight font-medium'
                                  : 'text-gray-700'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                          <div className="border-t my-1" />
                          <button
                            onClick={() => deleteClient(client.id)}
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

        {clients.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No clients found</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * pagination.limit + 1} to{' '}
              {Math.min(currentPage * pagination.limit, pagination.total)} of{' '}
              {pagination.total} clients
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

      {/* Client Detail Modal */}
      {selectedClient && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedClient(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Client Details</h2>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedClient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[selectedClient.status]
                    }`}
                  >
                    {selectedClient.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedClient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedClient.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{selectedClient.company || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{selectedClient.industry || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Client Value</p>
                  <p className="font-medium text-lg text-green-600">
                    ${selectedClient.value?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
              {selectedClient.notes && (
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {selectedClient.notes}
                  </p>
                </div>
              )}
              <div className="text-sm text-gray-500">
                Created: {format(parseISO(selectedClient.createdAt), 'PPpp')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

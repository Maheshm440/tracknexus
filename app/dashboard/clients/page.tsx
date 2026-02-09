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
  Plus,
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

// Mock client data
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    industry: 'Technology',
    status: 'ACTIVE',
    value: 50000,
    notes: 'Premium client with annual contract',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-08T15:30:00Z',
  },
  {
    id: '2',
    name: 'TechStart Inc',
    email: 'info@techstart.io',
    phone: '+1 (555) 234-5678',
    company: 'TechStart',
    industry: 'Software',
    status: 'ACTIVE',
    value: 35000,
    notes: 'Growing startup, expansion planned',
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-02-07T12:45:00Z',
  },
  {
    id: '3',
    name: 'Global Solutions LLC',
    email: 'sales@globalsol.com',
    phone: '+1 (555) 345-6789',
    company: 'Global Solutions',
    industry: 'Consulting',
    status: 'ACTIVE',
    value: 75000,
    notes: 'Enterprise client, multiple departments',
    createdAt: '2023-12-10T14:20:00Z',
    updatedAt: '2024-02-06T10:00:00Z',
  },
  {
    id: '4',
    name: 'Digital Marketing Pro',
    email: 'hello@digitalmarketingpro.com',
    phone: '+1 (555) 456-7890',
    company: 'DMP',
    industry: 'Marketing',
    status: 'PROSPECT',
    value: 15000,
    notes: 'Potential client in evaluation phase',
    createdAt: '2024-02-01T11:30:00Z',
    updatedAt: '2024-02-08T09:20:00Z',
  },
  {
    id: '5',
    name: 'CloudNet Services',
    email: 'support@cloudnet.io',
    phone: '+1 (555) 567-8901',
    company: 'CloudNet',
    industry: 'Cloud Services',
    status: 'ACTIVE',
    value: 60000,
    notes: 'Multi-year agreement in place',
    createdAt: '2024-01-05T16:45:00Z',
    updatedAt: '2024-02-05T14:15:00Z',
  },
  {
    id: '6',
    name: 'DataDrive Analytics',
    email: 'contact@datadrive.io',
    phone: '+1 (555) 678-9012',
    company: 'DataDrive',
    industry: 'Analytics',
    status: 'INACTIVE',
    value: 30000,
    notes: 'Account put on hold - pending payment',
    createdAt: '2023-11-20T13:00:00Z',
    updatedAt: '2024-01-28T11:22:00Z',
  },
  {
    id: '7',
    name: 'FinanceFlow Corp',
    email: 'info@financeflow.com',
    phone: '+1 (555) 789-0123',
    company: 'FinanceFlow',
    industry: 'Finance',
    status: 'ACTIVE',
    value: 85000,
    notes: 'Largest client account',
    createdAt: '2023-10-15T08:30:00Z',
    updatedAt: '2024-02-07T16:40:00Z',
  },
  {
    id: '8',
    name: 'RetailMax International',
    email: 'procurement@retailmax.com',
    phone: '+1 (555) 890-1234',
    company: 'RetailMax',
    industry: 'Retail',
    status: 'CHURNED',
    value: 40000,
    notes: 'Contract ended - switched to competitor',
    createdAt: '2023-09-01T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
];

function calculateStats(clientList: Client[]): ClientStats {
  const total = clientList.length;
  const active = clientList.filter(c => c.status === 'ACTIVE').length;
  const totalValue = clientList.reduce((sum, c) => sum + (c.value || 0), 0);
  const churned = clientList.filter(c => c.status === 'CHURNED').length;
  const churnRate = total > 0 ? Math.round((churned / total) * 100) : 0;
  const avgClientValue = total > 0 ? Math.round(totalValue / total) : 0;

  return {
    total,
    active,
    totalValue,
    churnRate,
    avgClientValue,
  };
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [allClients, setAllClients] = useState<Client[]>(mockClients);
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    status: 'PROSPECT' as const,
    value: '',
    notes: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

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

      if (data.data && data.data.length > 0) {
        // Use API data
        const allClientsData = data.allClients || data.data;
        setAllClients(allClientsData);
        setClients(data.data);
        setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 });
        // Always calculate stats from all clients data to ensure accuracy
        setStats(calculateStats(allClientsData));
        setIsUsingMockData(false);
      } else {
        throw new Error('No data from API');
      }
      setError(null);
    } catch (err) {
      console.error('Clients fetch error:', err);
      // Use mock data as fallback
      let filteredClients = mockClients;

      if (statusFilter) {
        filteredClients = filteredClients.filter(c => c.status === statusFilter);
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredClients = filteredClients.filter(c =>
          c.name.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower) ||
          c.company?.toLowerCase().includes(searchLower)
        );
      }

      const limit = 10;
      const total = filteredClients.length;
      const totalPages = Math.ceil(total / limit);
      const start = (currentPage - 1) * limit;
      const paginatedClients = filteredClients.slice(start, start + limit);

      // Use mock data - set all clients and calculate stats from full dataset
      setAllClients(mockClients);
      setClients(paginatedClients);
      setPagination({ page: currentPage, limit, total, totalPages });
      // Calculate stats from ALL mockClients, not just filtered/paginated
      setStats(calculateStats(mockClients));
      setError(null);
      setIsUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  // Initialize stats on component mount
  useEffect(() => {
    setStats(calculateStats(mockClients));
  }, []);

  useEffect(() => {
    fetchClients();
  }, [currentPage, statusFilter, search]);

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

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || !formData.email || !formData.company) {
      setFormError('Name, email, and company are required');
      return;
    }

    try {
      const newClient: Client = {
        id: (Math.max(...clients.map(c => parseInt(c.id) || 0), 0) + 1).toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company,
        industry: formData.industry || undefined,
        status: formData.status,
        value: formData.value ? parseInt(formData.value) : undefined,
        notes: formData.notes || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      });

      if (!res.ok) throw new Error('Failed to create client');

      setFormSuccess(true);
      setTimeout(() => {
        setShowAddModal(false);
        setFormSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          industry: '',
          status: 'PROSPECT',
          value: '',
          notes: '',
        });
        fetchClients();
      }, 1500);
    } catch (err) {
      console.error('Failed to add client:', err);
      setFormError('Failed to create client. Using local storage.');
      // Add to local clients list as fallback
      const newClient: Client = {
        id: (Math.max(...clients.map(c => parseInt(c.id) || 0), 0) + 1).toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company,
        industry: formData.industry || undefined,
        status: formData.status,
        value: formData.value ? parseInt(formData.value) : undefined,
        notes: formData.notes || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setClients([newClient, ...clients]);
      setFormSuccess(true);
      setTimeout(() => {
        setShowAddModal(false);
        setFormSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          industry: '',
          status: 'PROSPECT',
          value: '',
          notes: '',
        });
        setFormError('');
      }, 1500);
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
      <div className="bg-white border-b border-gray-200 -mx-6 px-6">
        <div className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Manage Clients</h1>
            <p className="text-gray-500 mt-0.5 text-sm">View and manage all clients</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-highlight text-white rounded-lg hover:bg-opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>
      </div>


      {/* Selected Client Card - Display Above Stats */}
      {selectedClient && !selectedClient.id.startsWith('temp-') && (
        <div className="bg-white rounded-xl shadow-md border border-highlight/20 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{selectedClient.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedClient.company}</p>
            </div>
            <button
              onClick={() => setSelectedClient(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-1">Email</p>
              <p className="text-sm font-medium text-gray-900">{selectedClient.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-1">Phone</p>
              <p className="text-sm font-medium text-gray-900">{selectedClient.phone || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-1">Status</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedClient.status]}`}>
                {selectedClient.status}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-1">Value</p>
              <p className="text-sm font-bold text-green-600">${selectedClient.value?.toLocaleString() || '0'}</p>
            </div>
          </div>

          {selectedClient.notes && (
            <div className="mb-6 pb-6 border-b">
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">Notes</p>
              <p className="text-sm text-gray-900">{selectedClient.notes}</p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => {
                const newStatus = selectedClient.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
                updateClientStatus(selectedClient.id, newStatus);
              }}
              className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
            >
              Change Status
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this client?')) {
                  deleteClient(selectedClient.id);
                }
              }}
              className="flex-1 px-4 py-2 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}

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
                <tr key={client.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedClient(client)}>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900 text-sm">{client.name}</p>
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-600">{client.email}</td>
                  <td className="py-4 px-4 text-xs text-gray-600">
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
                  <td className="py-4 px-4 text-right text-xs font-medium text-gray-900">
                    ${client.value?.toLocaleString() || '0'}
                  </td>
                  <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
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
                        <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                          <button
                            onClick={() => {
                              setSelectedClient(client);
                              setShowDropdown(null);
                            }}
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <div className="border-t my-1" />
                          <p className="px-4 py-1 text-xs text-gray-500 font-medium">
                            Quick Actions
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
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this client?')) {
                                deleteClient(client.id);
                              }
                            }}
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
            className="bg-white rounded-xl shadow-2xl w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Client Details</h2>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Name</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedClient.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Status</p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-0.5 ${
                      statusColors[selectedClient.status]
                    }`}
                  >
                    {selectedClient.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Email</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedClient.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Phone</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedClient.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Company</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedClient.company || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Industry</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedClient.industry || '-'}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-2">Client Value</p>
                <p className="text-lg font-bold text-green-600">
                  ${selectedClient.value?.toLocaleString() || '0'}
                </p>
              </div>
              {selectedClient.notes && (
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase mb-2">Notes</p>
                  <p className="text-sm text-gray-900 p-2.5 bg-gray-50 rounded">
                    {selectedClient.notes}
                  </p>
                </div>
              )}
              <div className="text-xs text-gray-500 pt-3 border-t">
                Created: {format(parseISO(selectedClient.createdAt), 'PPpp')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Add New Client</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="p-4 space-y-3">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{formError}</p>
                </div>
              )}

              {formSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600">Client created successfully!</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 uppercase">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Client name"
                    className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight"
                    disabled={formSuccess}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 uppercase">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@example.com"
                    className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight"
                    disabled={formSuccess}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 uppercase">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight"
                    disabled={formSuccess}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 uppercase">Company *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight"
                    disabled={formSuccess}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 uppercase">Industry</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g., Technology"
                    className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight"
                    disabled={formSuccess}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 uppercase">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight"
                    disabled={formSuccess}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 uppercase">Client Value ($)</label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g., 50000"
                  className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight"
                  disabled={formSuccess}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 uppercase">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes about the client"
                  rows={3}
                  className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight resize-none"
                  disabled={formSuccess}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={formSuccess}
                  className="flex-1 px-4 py-2 bg-highlight text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
                >
                  {formSuccess ? 'Creating...' : 'Create Client'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  disabled={formSuccess}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

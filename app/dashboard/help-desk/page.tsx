'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Clock,
  MoreVertical,
  Eye,
  Trash2,
  Send,
  X,
  TrendingUp,
  Users,
  AlertCircle,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface TicketResponse {
  id: string;
  message: string;
  isInternal: boolean;
  createdBy?: string;
  createdAt: string;
}

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  email: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED';
  category?: string;
  assignedTo?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    responses: number;
  };
  responses?: TicketResponse[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const priorityColors: Record<string, string> = {
  URGENT: 'bg-red-100 text-red-800',
  HIGH: 'bg-orange-100 text-orange-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  LOW: 'bg-gray-100 text-gray-800',
};

const statusColors: Record<string, string> = {
  OPEN: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-purple-100 text-purple-800',
  WAITING: 'bg-yellow-100 text-yellow-800',
  RESOLVED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-gray-100 text-gray-800',
};

const statusOptions = ['OPEN', 'IN_PROGRESS', 'WAITING', 'RESOLVED', 'CLOSED'];
const priorityOptions = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export default function HelpDeskPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'progress' | 'resolved'>('all');
  const [newResponse, setNewResponse] = useState('');
  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    avgResolutionTime: '2d',
    resolvedToday: 0,
  });

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });

      let status = '';
      if (activeTab === 'open') status = 'OPEN';
      else if (activeTab === 'progress') status = 'IN_PROGRESS';
      else if (activeTab === 'resolved') status = 'RESOLVED';

      if (status) params.append('status', status);
      if (priorityFilter) params.append('priority', priorityFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/tickets?${params}`);
      const data = await res.json();

      setTickets(data.data || []);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 });
      calculateStats(data.data || []);
      setError(null);
      setIsUsingMockData(false);
    } catch (err) {
      console.error('Tickets fetch error:', err);
      setTickets([]);
      setPagination({ page: 1, limit: 10, total: 0, totalPages: 0 });
      calculateStats([]);
      setError(null);
      setIsUsingMockData(false);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ticketList: Ticket[]) => {
    const open = ticketList.filter((t) => t.status === 'OPEN').length;
    const inProgress = ticketList.filter((t) => t.status === 'IN_PROGRESS').length;
    const resolvedToday = ticketList.filter(
      (t) =>
        t.status === 'RESOLVED' &&
        t.resolvedAt &&
        new Date(t.resolvedAt).toDateString() === new Date().toDateString()
    ).length;

    setStats({
      open,
      inProgress,
      avgResolutionTime: '2d',
      resolvedToday,
    });
  };

  useEffect(() => {
    fetchTickets();
  }, [currentPage, priorityFilter, activeTab]);

  useEffect(() => {
    if (selectedTicket && selectedTicket.id) {
      // Re-fetch full ticket details when opening modal
      fetch(`/api/tickets/${selectedTicket.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSelectedTicket(data.data);
          }
        });
    }
  }, [selectedTicket?.id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchTickets();
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update ticket');

      const data = await res.json();
      if (data.success && selectedTicket?.id === ticketId) {
        setSelectedTicket(data.data);
      }

      fetchTickets();
      setShowDropdown(null);
    } catch (err) {
      console.error('Failed to update ticket:', err);
    }
  };

  const deleteTicket = async (ticketId: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;

    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete ticket');

      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(null);
      }

      fetchTickets();
      setShowDropdown(null);
    } catch (err) {
      console.error('Failed to delete ticket:', err);
    }
  };

  const addResponse = async () => {
    if (!newResponse.trim() || !selectedTicket) return;

    try {
      const res = await fetch(`/api/tickets/${selectedTicket.id}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: newResponse,
          isInternal: false,
          createdBy: 'Support Agent',
        }),
      });

      if (!res.ok) throw new Error('Failed to add response');

      setNewResponse('');

      // Refresh ticket details
      const ticketRes = await fetch(`/api/tickets/${selectedTicket.id}`);
      const ticketData = await ticketRes.json();
      if (ticketData.success) {
        setSelectedTicket(ticketData.data);
      }
    } catch (err) {
      console.error('Failed to add response:', err);
    }
  };

  if (loading && tickets.length === 0) {
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
          <h1 className="text-2xl font-bold text-gray-900">Help Desk</h1>
          <p className="text-gray-500 mt-1">
            Manage customer support tickets
          </p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Open Tickets */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Open Tickets</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.open}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Headphones className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">In Progress</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.inProgress}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Avg Resolution Time */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg Resolution</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.avgResolutionTime}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Resolved Today */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Resolved Today</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.resolvedToday}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b">
          <nav className="flex -mb-px">
            {[
              { id: 'all', label: 'All' },
              { id: 'open', label: 'Open' },
              { id: 'progress', label: 'In Progress' },
              { id: 'resolved', label: 'Resolved' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setCurrentPage(1);
                }}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-highlight text-highlight'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ticket #, subject, or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                />
              </div>
            </form>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
              >
                <option value="">All Priority</option>
                {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Ticket #
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Subject
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Email
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                  Priority
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                  Status
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm font-medium text-gray-900">
                      {ticket.ticketNumber}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{ticket.subject}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {ticket._count?.responses || 0} responses
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {ticket.email}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        priorityColors[ticket.priority]
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[ticket.status]
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowDropdown(showDropdown === ticket.id ? null : ticket.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      {showDropdown === ticket.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                          <button
                            onClick={() => setSelectedTicket(ticket)}
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
                              onClick={() => updateTicketStatus(ticket.id, status)}
                              className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 ${
                                ticket.status === status
                                  ? 'text-highlight font-medium'
                                  : 'text-gray-700'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                          <div className="border-t my-1" />
                          <button
                            onClick={() => deleteTicket(ticket.id)}
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

        {tickets.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tickets found</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * pagination.limit + 1} to{' '}
              {Math.min(currentPage * pagination.limit, pagination.total)} of{' '}
              {pagination.total} tickets
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

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTicket(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{selectedTicket.ticketNumber}</p>
                  <h2 className="text-xl font-bold text-gray-900 mt-1">
                    {selectedTicket.subject}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Ticket Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedTicket.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      priorityColors[selectedTicket.priority]
                    }`}
                  >
                    {selectedTicket.priority}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[selectedTicket.status]
                    }`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{selectedTicket.category || 'General'}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-900">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Responses */}
              <div>
                <p className="text-sm text-gray-500 mb-3 font-medium">Responses</p>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                    selectedTicket.responses.map((response) => (
                      <div
                        key={response.id}
                        className={`p-3 rounded-lg ${
                          response.isInternal
                            ? 'bg-yellow-50 border border-yellow-200'
                            : 'bg-blue-50 border border-blue-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-medium text-gray-600">
                              {response.createdBy || 'Support'}
                              {response.isInternal && ' (Internal)'}
                            </p>
                            <p className="text-sm text-gray-900 mt-1">
                              {response.message}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {format(parseISO(response.createdAt), 'MMM d, h:mm a')}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No responses yet
                    </p>
                  )}
                </div>

                {/* Add Response */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a response..."
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addResponse();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                  />
                  <button
                    onClick={addResponse}
                    disabled={!newResponse.trim()}
                    className="p-2 bg-highlight text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Footer Info */}
              <div className="text-xs text-gray-500 flex justify-between pt-4 border-t">
                <span>Created: {format(parseISO(selectedTicket.createdAt), 'PPpp')}</span>
                <span>Updated: {format(parseISO(selectedTicket.updatedAt), 'PPpp')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

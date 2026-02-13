'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
  Headphones,
  Clock,
  Trash2,
  Send,
  X,
  AlertCircle,
  UserPlus,
  RefreshCw,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Users,
} from 'lucide-react';
import { format, parseISO, isToday, isYesterday, isThisWeek, isThisMonth, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from 'date-fns';

interface TicketResponse {
  id: string;
  message: string;
  isInternal: boolean;
  createdBy?: string;
  createdAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role?: string;
  department?: string;
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
  createdBy?: string;
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
  URGENT: 'text-red-600 font-semibold',
  HIGH: 'text-orange-600 font-semibold',
  MEDIUM: 'text-yellow-600 font-medium',
  LOW: 'text-gray-500 font-medium',
};

const priorityLabels: Record<string, string> = {
  URGENT: 'Urgent',
  HIGH: 'High',
  MEDIUM: 'Normal',
  LOW: 'Low',
};

const statusColors: Record<string, string> = {
  OPEN: 'bg-orange-100 text-orange-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  WAITING: 'bg-yellow-100 text-yellow-700',
  RESOLVED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-600',
};

const statusLabels: Record<string, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  WAITING: 'Pending Confirm',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

const statusOptions = ['OPEN', 'IN_PROGRESS', 'WAITING', 'RESOLVED', 'CLOSED'];
const priorityOptions = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
const periodOptions = ['All Time', 'Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'Last Month', 'Custom'] as const;
type PeriodOption = typeof periodOptions[number];

function isInPeriod(dateStr: string, period: PeriodOption): boolean {
  if (period === 'All Time' || period === 'Custom') return true;
  const date = new Date(dateStr);
  const now = new Date();

  switch (period) {
    case 'Today':
      return isToday(date);
    case 'Yesterday':
      return isYesterday(date);
    case 'This Week':
      return isThisWeek(date, { weekStartsOn: 1 });
    case 'Last Week': {
      const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
      const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
      return date >= lastWeekStart && date <= lastWeekEnd;
    }
    case 'This Month':
      return isThisMonth(date);
    case 'Last Month': {
      const lastMonthStart = startOfMonth(subMonths(now, 1));
      const lastMonthEnd = endOfMonth(subMonths(now, 1));
      return date >= lastMonthStart && date <= lastMonthEnd;
    }
    default:
      return true;
  }
}

export default function HelpDeskPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>('All Time');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newResponse, setNewResponse] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');

  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    pendingConfirm: 0,
    critical: 0,
    closed: 0,
  });

  const fetchTeamMembers = useCallback(async () => {
    try {
      const res = await fetch('/api/team?limit=100');
      const data = await res.json();
      if (data.success && data.data?.length > 0) {
        setTeamMembers(data.data);
      }
    } catch {
      // Silently fail
    }
  }, []);

  const fetchAllTicketsForStats = useCallback(async () => {
    try {
      const res = await fetch('/api/tickets?limit=1000');
      const data = await res.json();
      if (data.success) {
        setAllTickets(data.data || []);
      }
    } catch {
      // Silently fail - stats will show 0
    }
  }, []);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });

      if (statusFilter) params.append('status', statusFilter);
      if (priorityFilter) params.append('priority', priorityFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/tickets?${params}`);
      const data = await res.json();

      setTickets(data.data || []);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 });
      setError(null);
    } catch {
      setTickets([]);
      setPagination({ page: 1, limit: 10, total: 0, totalPages: 0 });
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, priorityFilter, search]);

  // Calculate stats from all tickets filtered by period
  useEffect(() => {
    const filtered = allTickets.filter(t => isInPeriod(t.createdAt, selectedPeriod));
    setStats({
      open: filtered.filter(t => t.status === 'OPEN').length,
      inProgress: filtered.filter(t => t.status === 'IN_PROGRESS').length,
      pendingConfirm: filtered.filter(t => t.status === 'WAITING').length,
      critical: filtered.filter(t => t.priority === 'URGENT' || t.priority === 'HIGH').length,
      closed: filtered.filter(t => t.status === 'CLOSED').length,
    });
  }, [allTickets, selectedPeriod]);

  useEffect(() => {
    fetchTickets();
    fetchAllTicketsForStats();
    fetchTeamMembers();
  }, [fetchTickets, fetchAllTicketsForStats, fetchTeamMembers]);

  useEffect(() => {
    if (selectedTicket && selectedTicket.id) {
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

  const handleRefresh = () => {
    setRefreshing(true);
    Promise.all([fetchTickets(), fetchAllTicketsForStats()]).finally(() => {
      setTimeout(() => setRefreshing(false), 500);
    });
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error('Failed to update ticket:', data.error || 'Unknown error');
        alert(data.error || 'Failed to update ticket status. Please try again.');
        return;
      }

      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(data.data);
      }

      await fetchTickets();
      await fetchAllTicketsForStats();
    } catch (err) {
      console.error('Failed to update ticket:', err);
      alert('An error occurred while updating the ticket. Please try again.');
    }
  };

  const deleteTicket = async (ticketId: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;

    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error('Failed to delete ticket:', data.error || 'Unknown error');
        alert(data.error || 'Failed to delete ticket. Please try again.');
        return;
      }

      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(null);
      }

      await fetchTickets();
      await fetchAllTicketsForStats();
    } catch (err) {
      console.error('Failed to delete ticket:', err);
      alert('An error occurred while deleting the ticket. Please try again.');
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

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error('Failed to add response:', data.error || 'Unknown error');
        alert(data.error || 'Failed to add response. Please try again.');
        return;
      }

      setNewResponse('');

      const ticketRes = await fetch(`/api/tickets/${selectedTicket.id}`);
      const ticketData = await ticketRes.json();
      if (ticketData.success) {
        setSelectedTicket(ticketData.data);
      }
    } catch (err) {
      console.error('Failed to add response:', err);
      alert('An error occurred while adding the response. Please try again.');
    }
  };

  const assignTicket = async (ticketId: string, assignee: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedTo: assignee }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error('Failed to assign ticket:', data.error || 'Unknown error');
        alert(data.error || 'Failed to assign ticket. Please try again.');
        return;
      }

      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(data.data);
      }

      await fetchTickets();
      await fetchAllTicketsForStats();
    } catch (err) {
      console.error('Failed to assign ticket:', err);
      alert('An error occurred while assigning the ticket. Please try again.');
    }
  };

  // Extract client name from email
  const getClientName = (email: string) => {
    const parts = email.split('@');
    const domain = parts[1]?.split('.')[0] || '';
    return domain.charAt(0).toUpperCase() + domain.slice(1);
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
      {/* Show ticket list OR ticket detail - not both */}
      {!selectedTicket ? (
        <>
          {/* Header */}
          <div className="bg-white border-b border-gray-200 -mx-6 px-6">
            <div className="flex items-center justify-between py-3">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Help Desk</h1>
                <p className="text-gray-500 mt-0.5 text-sm">Manage support tickets from clients</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/dashboard/clients"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
                >
                  <Users className="w-4 h-4" />
                  Manage Clients
                </a>
                <button
                  onClick={handleRefresh}
                  className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 transition-all"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 font-medium">{error}</p>
            </div>
          )}

          {/* Stats Cards - 5 cards matching screenshot */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Open', value: stats.open, icon: Headphones, iconBg: 'bg-blue-50', iconColor: 'text-blue-500', borderColor: 'border-blue-100' },
              { label: 'In Progress', value: stats.inProgress, icon: Clock, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500', borderColor: 'border-yellow-100' },
              { label: 'Pending Confirm', value: stats.pendingConfirm, icon: CheckCircle2, iconBg: 'bg-green-50', iconColor: 'text-green-500', borderColor: 'border-green-100' },
              { label: 'Critical', value: stats.critical, icon: AlertTriangle, iconBg: 'bg-red-50', iconColor: 'text-red-500', borderColor: 'border-red-100', valueColor: 'text-red-600' },
              { label: 'Closed', value: stats.closed, icon: CheckCircle2, iconBg: 'bg-gray-50', iconColor: 'text-gray-400', borderColor: 'border-gray-100' },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 border ${stat.borderColor} hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 ${stat.iconBg} rounded-full flex items-center justify-center`}>
                    <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
                <p className={`text-xl font-semibold ${stat.valueColor || 'text-gray-900'}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Time Period Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium text-gray-600">Created:</span>
                {periodOptions.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      selectedPeriod === period
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {period === 'Custom' && <Calendar className="w-3 h-3 inline mr-1" />}
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Search + Filters Row */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3">
                <form onSubmit={handleSearch} className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                    />
                  </div>
                </form>
                <div className="flex items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent bg-white min-w-[130px]"
                  >
                    <option value="">All Status</option>
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                  <select
                    value={priorityFilter}
                    onChange={(e) => {
                      setPriorityFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent bg-white min-w-[130px]"
                  >
                    <option value="">All Urgency</option>
                    {priorityOptions.map((p) => (
                      <option key={p} value={p}>{priorityLabels[p]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tickets Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Ticket</th>
                    <th className="text-left py-3 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Client</th>
                    <th className="text-left py-3 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Urgency</th>
                    <th className="text-left py-3 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Assigned</th>
                    <th className="text-left py-3 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Created</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors group"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      {/* TICKET column: number + subject */}
                      <td className="py-4 px-5">
                        <p className="font-mono text-sm text-blue-600 font-medium">{ticket.ticketNumber}</p>
                        <p className="text-sm text-gray-900 mt-0.5">{ticket.subject}</p>
                      </td>

                      {/* CLIENT column: name + email */}
                      <td className="py-4 px-5">
                        <p className="text-sm font-medium text-gray-900">{getClientName(ticket.email)}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{ticket.email}</p>
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                          {statusLabels[ticket.status]}
                        </span>
                      </td>

                      {/* URGENCY */}
                      <td className="py-4 px-5">
                        <span className={`text-sm ${priorityColors[ticket.priority]}`}>
                          {priorityLabels[ticket.priority]}
                        </span>
                      </td>

                      {/* ASSIGNED */}
                      <td className="py-4 px-5">
                        <span className="text-sm text-gray-500">{ticket.assignedTo || 'Unassigned'}</span>
                      </td>

                      {/* CREATED */}
                      <td className="py-4 px-5">
                        <span className="text-sm text-gray-500">
                          {format(parseISO(ticket.createdAt), 'MMM d, hh:mm a')}
                        </span>
                      </td>

                      {/* Arrow */}
                      <td className="py-4 px-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTicket(ticket);
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="View ticket details"
                        >
                          <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {tickets.length === 0 && !loading && (
              <div className="text-center py-16">
                <Headphones className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No tickets found</p>
                <p className="text-gray-400 text-sm mt-1">Adjust your filters to see tickets</p>
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * pagination.limit + 1} to{' '}
                  {Math.min(currentPage * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} tickets
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={currentPage === pagination.totalPages}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Ticket Detail - Inline (keeps dashboard sidebar visible) */}
          {/* Header */}
          <div className="bg-white border-b border-gray-200 -mx-6 px-6">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Back to tickets"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-sm text-gray-500 font-medium">{selectedTicket.ticketNumber}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[selectedTicket.status]}`}>
                  {statusLabels[selectedTicket.status]}
                </span>
                <h1 className="text-lg font-bold text-gray-900">{selectedTicket.subject}</h1>
              </div>
              <button
                onClick={() => {
                  setSelectedAssignee(selectedTicket.assignedTo || '');
                  setShowAssignModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-semibold"
              >
                <UserPlus className="w-4 h-4" />
                Assign
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Activity */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-3">Activity</h2>

                {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                  <div className="space-y-3">
                    {selectedTicket.responses.map((response) => (
                      <div key={response.id} className="border-l-4 border-orange-300 pl-4 py-2">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-medium text-gray-900">
                            {response.createdBy || 'Support Agent'}
                            {response.isInternal && <span className="text-xs text-gray-500 ml-1">(Internal)</span>}
                          </p>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {format(parseISO(response.createdAt), 'MMM d h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{response.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">No activity yet</p>
                  </div>
                )}

                {/* Add Response */}
                <div className="mt-5 pt-5 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a response..."
                      value={newResponse}
                      onChange={(e) => setNewResponse(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newResponse.trim()) {
                          addResponse();
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      onClick={addResponse}
                      disabled={!newResponse.trim()}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              {/* Details */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h2 className="text-sm font-semibold text-gray-900 mb-4">Details</h2>
                <div className="space-y-4 text-sm">
                  {/* Client */}
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase mb-1">Client</p>
                    <p className="font-semibold text-gray-900">{getClientName(selectedTicket.email)}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{selectedTicket.email}</p>
                  </div>

                  {/* Priority */}
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase mb-1">Priority</p>
                    <span className={`inline-block font-semibold ${priorityColors[selectedTicket.priority]}`}>
                      {priorityLabels[selectedTicket.priority]}
                    </span>
                  </div>

                  {/* Assigned To */}
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase mb-1">Assigned To</p>
                    <p className="text-gray-900">{selectedTicket.assignedTo || 'Unassigned'}</p>
                  </div>

                  {/* Created */}
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase mb-1">Created</p>
                    <p className="text-gray-900 text-xs">{format(parseISO(selectedTicket.createdAt), 'MMM d, yyyy')}</p>
                  </div>
                </div>
              </div>

              {/* Change Status */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Change Status</h2>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => updateTicketStatus(selectedTicket.id, status)}
                      className={`w-full px-3 py-2 text-xs font-medium rounded-lg transition-all text-left ${
                        selectedTicket.status === status
                          ? 'bg-orange-100 text-orange-700 border border-orange-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {statusLabels[status]}
                    </button>
                  ))}
                </div>

                {/* Delete */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => deleteTicket(selectedTicket.id)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}


      {/* Assign Modal */}
      {showAssignModal && selectedTicket && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAssignModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Select team member</h3>
            </div>

            {/* Team Members List */}
            <div className="max-h-72 overflow-y-auto">
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedAssignee(`${member.name} (${member.email})`)}
                    className={`w-full text-left px-6 py-3 text-sm transition-colors ${
                      selectedAssignee === `${member.name} (${member.email})`
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {member.name} ({member.email})
                  </button>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500 text-sm">
                  No team members found. Add members in the Team section.
                </div>
              )}
            </div>

            {/* Selected Dropdown */}
            <div className="px-6 py-3 border-t border-gray-200">
              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="w-full px-4 py-2.5 border border-orange-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              >
                <option value="">Select a team member</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={`${member.name} (${member.email})`}>
                    {member.name} ({member.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedAssignee.trim()) {
                    assignTicket(selectedTicket.id, selectedAssignee.trim());
                    setShowAssignModal(false);
                  }
                }}
                disabled={!selectedAssignee.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                <UserPlus className="w-4 h-4" />
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

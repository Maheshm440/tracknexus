'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreVertical,
  Plus,
  Eye,
  Trash2,
  X,
} from 'lucide-react';
import { format, isPast, isSameDay, parseISO } from 'date-fns';

interface Lead {
  id: string;
  name: string;
  companyName: string;
}

interface FollowUp {
  id: string;
  leadId: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  assignedTo?: string;
  completedAt?: string;
  lead?: Lead;
  createdAt: string;
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
  MEDIUM: 'bg-blue-100 text-blue-800',
  LOW: 'bg-gray-100 text-gray-800',
};

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
};

const statusOptions = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
const priorityOptions = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<FollowUp | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'overdue' | 'completed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [creating, setCreating] = useState(false);
  const [newFollowUp, setNewFollowUp] = useState({
    leadId: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM' as string,
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    overdue: 0,
    completedToday: 0,
  });

  const fetchFollowUps = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });

      let status = '';
      if (activeTab === 'pending') status = 'PENDING';
      else if (activeTab === 'completed') status = 'COMPLETED';

      if (status) params.append('status', status);
      if (priorityFilter) params.append('priority', priorityFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/follow-ups?${params}`);
      const data = await res.json();

      if (data.success) {
        setFollowUps(data.data || []);
        setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 });
        calculateStats(data.data || []);
        setError(null);
        setIsUsingMockData(false);
      } else {
        throw new Error(data.error || 'Failed to fetch follow-ups');
      }
    } catch (err) {
      console.error('Follow-ups fetch error:', err);
      setFollowUps([]);
      setPagination({ page: 1, limit: 10, total: 0, totalPages: 0 });
      calculateStats([]);
      setError(null);
      setIsUsingMockData(false);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (tasks: FollowUp[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let pending = 0;
    let overdue = 0;
    let completedToday = 0;

    tasks.forEach((task) => {
      if (task.status === 'PENDING') pending++;
      if (
        task.status === 'PENDING' &&
        isPast(parseISO(task.dueDate)) &&
        !isSameDay(parseISO(task.dueDate), today)
      ) {
        overdue++;
      }
      if (
        task.status === 'COMPLETED' &&
        task.completedAt &&
        isSameDay(parseISO(task.completedAt), today)
      ) {
        completedToday++;
      }
    });

    setStats({
      total: tasks.length,
      pending,
      overdue,
      completedToday,
    });
  };

  useEffect(() => {
    fetchFollowUps();
  }, [currentPage, priorityFilter, activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchFollowUps();
  };

  const updateFollowUpStatus = async (taskId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/follow-ups/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update follow-up');
      fetchFollowUps();
      setShowDropdown(null);
    } catch (err) {
      console.error('Failed to update follow-up:', err);
    }
  };

  const deleteFollowUp = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this follow-up?')) return;

    try {
      const res = await fetch(`/api/follow-ups/${taskId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete follow-up');
      fetchFollowUps();
      setShowDropdown(null);
    } catch (err) {
      console.error('Failed to delete follow-up:', err);
    }
  };

  const fetchLeads = async () => {
    try {
      const leadsData = localStorage.getItem('tracknexus_leads') || '[]';
      const allLeads = JSON.parse(leadsData);
      setLeads(allLeads.map((l: any) => ({ id: l.id, name: l.name, companyName: l.companyName || l.company || '' })));
    } catch {
      setLeads([]);
    }
  };

  const handleCreateFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFollowUp.leadId || !newFollowUp.title || !newFollowUp.dueDate) return;

    try {
      setCreating(true);
      const res = await fetch('/api/follow-ups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFollowUp),
      });

      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setNewFollowUp({ leadId: '', title: '', description: '', dueDate: '', priority: 'MEDIUM' });
        fetchFollowUps();
      } else {
        alert(data.error || 'Failed to create follow-up');
      }
    } catch (err) {
      console.error('Failed to create follow-up:', err);
      alert('Failed to create follow-up. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const openCreateModal = () => {
    fetchLeads();
    setShowCreateModal(true);
  };

  if (loading && followUps.length === 0) {
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
            <h1 className="text-xl font-semibold text-gray-900">Follow-ups</h1>
            <p className="text-gray-500 mt-0.5 text-sm">
              Manage and track lead follow-up tasks
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-highlight text-white rounded-lg hover:bg-opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Follow-up
          </button>
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
        {/* Total Tasks */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Tasks</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.pending}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Overdue</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.overdue}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Completed Today */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Completed Today</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{stats.completedToday}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
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
              { id: 'pending', label: 'Pending' },
              { id: 'overdue', label: 'Overdue' },
              { id: 'completed', label: 'Completed' },
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
                  placeholder="Search by task title or lead name..."
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

        {/* Tasks Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Task
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Lead
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Due Date
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
              {followUps.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{task.lead?.name}</p>
                      <p className="text-sm text-gray-500">{task.lead?.companyName}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {format(parseISO(task.dueDate), 'MMM d, yyyy')}
                      {isPast(parseISO(task.dueDate)) &&
                        task.status !== 'COMPLETED' && (
                          <span className="ml-1 text-red-600 font-medium">Overdue</span>
                        )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        priorityColors[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[task.status]
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowDropdown(showDropdown === task.id ? null : task.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      {showDropdown === task.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                          <button
                            onClick={() => setSelectedTask(task)}
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
                              onClick={() => updateFollowUpStatus(task.id, status)}
                              className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 ${
                                task.status === status
                                  ? 'text-highlight font-medium'
                                  : 'text-gray-700'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                          <div className="border-t my-1" />
                          <button
                            onClick={() => deleteFollowUp(task.id)}
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

        {followUps.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No follow-up tasks found</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * pagination.limit + 1} to{' '}
              {Math.min(currentPage * pagination.limit, pagination.total)} of{' '}
              {pagination.total} follow-ups
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

      {/* Create Follow-up Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">New Follow-up</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleCreateFollowUp} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lead *</label>
                <select
                  value={newFollowUp.leadId}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, leadId: e.target.value })}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                >
                  <option value="">Select a lead</option>
                  {leads.map((lead) => (
                    <option key={lead.id} value={lead.id}>
                      {lead.name} {lead.companyName ? `- ${lead.companyName}` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={newFollowUp.title}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, title: e.target.value })}
                  required
                  placeholder="e.g., Schedule demo call"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newFollowUp.description}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, description: e.target.value })}
                  rows={3}
                  placeholder="Add details about this follow-up..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                  <input
                    type="date"
                    value={newFollowUp.dueDate}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, dueDate: e.target.value })}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newFollowUp.priority}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, priority: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                  >
                    {priorityOptions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 bg-highlight text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Follow-up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Task Details</h2>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="font-medium">{selectedTask.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[selectedTask.status]
                    }`}
                  >
                    {selectedTask.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      priorityColors[selectedTask.priority]
                    }`}
                  >
                    {selectedTask.priority}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">
                    {format(parseISO(selectedTask.dueDate), 'PPP')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lead</p>
                  <p className="font-medium">{selectedTask.lead?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{selectedTask.lead?.companyName}</p>
                </div>
              </div>
              {selectedTask.description && (
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {selectedTask.description}
                  </p>
                </div>
              )}
              <div className="text-sm text-gray-500">
                Created: {format(parseISO(selectedTask.createdAt), 'PPpp')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

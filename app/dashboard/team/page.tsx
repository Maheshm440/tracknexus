'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  Phone,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Trash2,
  X,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { format } from 'date-fns';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'Admin' | 'Manager' | 'Agent' | 'Analyst';
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'away';
  avatar?: string;
  tasksCompleted: number;
  performanceScore: number;
  lastActive: string;
}

interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  managers: number;
  avgPerformance: number;
  departments: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const defaultStats: TeamStats = {
  totalMembers: 0,
  activeMembers: 0,
  managers: 0,
  avgPerformance: 0,
  departments: 0,
};

const roleColors: Record<string, string> = {
  'Admin': 'bg-red-100 text-red-800',
  'Manager': 'bg-purple-100 text-purple-800',
  'Agent': 'bg-blue-100 text-blue-800',
  'Analyst': 'bg-green-100 text-green-800',
};

const statusColors: Record<string, string> = {
  'active': 'bg-green-100 text-green-800',
  'away': 'bg-yellow-100 text-yellow-800',
  'inactive': 'bg-gray-100 text-gray-800',
};

const statusIcons: Record<string, string> = {
  'active': '🟢',
  'away': '🟡',
  'inactive': '⚪',
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState<TeamStats>(defaultStats);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterDept, setFilterDept] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });

      if (filterRole && filterRole !== 'all') params.append('role', filterRole);
      if (filterDept && filterDept !== 'all') params.append('department', filterDept);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/team?${params}`);
      const data = await res.json();

      setMembers(data.data || []);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 });
      setStats(data.stats || defaultStats);
      setError(null);
      setIsUsingMockData(false);
    } catch (err) {
      console.error('Team fetch error:', err);
      setMembers([]);
      setPagination({ page: 1, limit: 10, total: 0, totalPages: 0 });
      setStats(defaultStats);
      setError(null);
      setIsUsingMockData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [currentPage, filterRole, filterDept, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 -mx-6 px-6">
        <div className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Team Management</h1>
            <p className="text-gray-500 mt-0.5 text-sm">Manage and monitor your team members</p>
          </div>
        </div>
      </div>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Members */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-violet-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Members</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{stats.totalMembers}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Active Members */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-violet-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Now</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{stats.activeMembers}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Managers */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-violet-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Managers</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{stats.managers}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Avg Performance */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-violet-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg Performance</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{stats.avgPerformance}%</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-violet-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Departments</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{stats.departments}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={filterRole}
                onChange={(e) => {
                  setFilterRole(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Agent">Agent</option>
                <option value="Analyst">Analyst</option>
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={filterDept}
                onChange={(e) => {
                  setFilterDept(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="all">All Departments</option>
                <option value="Leadership">Leadership</option>
                <option value="Sales">Sales</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Analytics">Analytics</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              <p className="text-gray-600 mt-3">Loading team members...</p>
            </div>
          ) : members.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Performance</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tasks</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last Active</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {members.map(member => (
                      <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              {member.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors[member.role]}`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700 font-medium">{member.department}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{statusIcons[member.status]}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[member.status]}`}>
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2 w-16">
                              <div
                                className={`h-2 rounded-full ${
                                  member.performanceScore >= 90 ? 'bg-green-500' :
                                  member.performanceScore >= 80 ? 'bg-blue-500' :
                                  'bg-orange-500'
                                }`}
                                style={{ width: `${member.performanceScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-12">{member.performanceScore}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{member.tasksCompleted}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{member.lastActive && !isNaN(new Date(member.lastActive).getTime()) ? format(new Date(member.lastActive), 'HH:mm') : '—'}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative">
                            <button
                              onClick={() => setShowDropdown(showDropdown === member.id ? null : member.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                            {showDropdown === member.id && (
                              <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                                <button
                                  onClick={() => {
                                    setSelectedMember(member);
                                    setShowDropdown(null);
                                  }}
                                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </button>
                                <div className="border-t my-1" />
                                <button
                                  onClick={() => setShowDropdown(null)}
                                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove
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

              {/* Pagination */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * 10, pagination.total)}</span> of{' '}
                  <span className="font-medium">{pagination.total}</span> members
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:bg-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-700">
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
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No team members found</p>
            </div>
          )}
        </div>


      {/* Member Profile Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b sticky top-0 bg-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
                <p className="text-gray-600 mt-1">{selectedMember.role} • {selectedMember.department}</p>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="text-gray-700">
                    <span>{selectedMember.email}</span>
                  </div>
                  {selectedMember.phone && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span>{selectedMember.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Work Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">Work Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedMember.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedMember.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Join Date</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {selectedMember.joinDate && !isNaN(new Date(selectedMember.joinDate).getTime()) ? format(new Date(selectedMember.joinDate), 'MMM d, yyyy') : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">Performance Score</span>
                      <span className="text-sm font-bold text-gray-900">{selectedMember.performanceScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedMember.performanceScore >= 90 ? 'bg-green-500' :
                          selectedMember.performanceScore >= 80 ? 'bg-blue-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${selectedMember.performanceScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">Tasks Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedMember.tasksCompleted}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">Last Active</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedMember.lastActive && !isNaN(new Date(selectedMember.lastActive).getTime()) ? format(new Date(selectedMember.lastActive), 'HH:mm') : '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

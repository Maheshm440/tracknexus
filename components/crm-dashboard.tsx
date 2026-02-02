"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Phone,
  Clock,
  Ticket,
  UserCheck,
  Eye,
  Activity,
  Download,
  Zap,
  CheckCircle,
  ChevronDown,
  Bell,
  Search,
  Filter,
  Calendar,
  Users,
  DollarSign,
  ShoppingCart,
  Mail,
  MessageSquare,
  Star,
  Award,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  RefreshCw,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  BarChart3,
  FileText,
  HelpCircle,
  User,
  UserPlus,
  Shield,
  Globe,
  MapPin,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
} from "lucide-react";

// Enhanced Chart Data
const visitorsData = [
  { name: "Jan", visitors: 4000, leads: 2400, conversion: 60 },
  { name: "Feb", visitors: 3000, leads: 1398, conversion: 47 },
  { name: "Mar", visitors: 2800, leads: 2800, conversion: 100 },
  { name: "Apr", visitors: 3400, leads: 3908, conversion: 115 },
  { name: "May", visitors: 3200, leads: 4800, conversion: 150 },
  { name: "Jun", visitors: 3800, leads: 3800, conversion: 100 },
  { name: "Jul", visitors: 4200, leads: 4300, conversion: 102 },
];

const revenueData = [
  { month: "Jan", revenue: 45000, target: 50000 },
  { month: "Feb", revenue: 52000, target: 55000 },
  { month: "Mar", revenue: 48000, target: 60000 },
  { month: "Apr", revenue: 61000, target: 65000 },
  { month: "May", revenue: 55000, target: 70000 },
  { month: "Jun", revenue: 67000, target: 75000 },
];

const deviceData = [
  { name: "Desktop", value: 45, color: "#3b82f6" },
  { name: "Mobile", value: 35, color: "#10b981" },
  { name: "Tablet", value: 20, color: "#f59e0b" },
];

const locationData = [
  { country: "United States", visitors: 8500, percentage: 35 },
  { country: "United Kingdom", visitors: 4200, percentage: 17 },
  { country: "Germany", visitors: 3100, percentage: 13 },
  { country: "France", visitors: 2800, percentage: 11 },
  { country: "Canada", visitors: 2200, percentage: 9 },
];

const activityData = [
  { time: "00:00", count: 400 },
  { time: "04:00", count: 300 },
  { time: "08:00", count: 600 },
  { time: "12:00", count: 800 },
  { time: "16:00", count: 700 },
  { time: "20:00", count: 900 },
  { time: "24:00", count: 500 },
];

const StatCard = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  bgColor,
  textColor,
  showProgress = false,
  progressValue = 0,
  extraInfo = null,
}: {
  title: string;
  value: string;
  subtitle: string;
  trend: number;
  icon: React.ComponentType<any>;
  bgColor: string;
  textColor: string;
  showProgress?: boolean;
  progressValue?: number;
  extraInfo?: string | null;
}) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.08)" }}
    className="relative overflow-hidden rounded-xl p-4 bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 group"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-teal-500 to-blue-500 transition-opacity duration-300" />
    
    {/* Animated Background Pattern */}
    <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-full h-full"
      >
        <div className={`${bgColor} rounded-full`} />
      </motion.div>
    </div>

    <div className="relative z-10">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
          <p className="text-gray-400 text-xs">{subtitle}</p>
          {extraInfo && (
            <p className="text-gray-500 text-xs mt-1">{extraInfo}</p>
          )}
        </div>

        <div
          className={`${bgColor} p-2 rounded-lg shadow-md flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
        >
          <Icon size={16} className={`${textColor}`} />
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progressValue}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <motion.div
              className={`${bgColor} h-1.5 rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progressValue}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 ${
              trend >= 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trend >= 0 ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
            <span className="text-xs font-bold">{Math.abs(trend)}%</span>
          </div>
          <span className="text-gray-400 text-xs">vs last month</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <MoreVertical size={14} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default function CRMDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 font-sans overflow-hidden">
      {/* MAIN CONTENT */}
      <main className="flex flex-col overflow-hidden">
        {/* ENHANCED HEADER */}
        <motion.header
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-slate-900 via-blue-700 to-teal-600 text-white px-6 py-4 border-b border-white/10 overflow-hidden flex-shrink-0"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"
            />
            <motion.div
              animate={{ opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-300 rounded-full opacity-10 blur-3xl"
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Compact Search */}
                <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 w-64">
                  <Search size={14} className="text-white/60" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-white placeholder-white/50 outline-none text-sm flex-1"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-white/60 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Compact Filter Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <Filter size={14} />
                  <span className="text-xs">Filter</span>
                </motion.button>

                {/* Notifications */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors relative"
                  >
                    <Bell size={16} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">Notifications</h3>
                        <div className="space-y-2">
                          <div className="p-2 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <p className="text-xs text-gray-900">New lead from John Doe</p>
                            <p className="text-xs text-gray-500">2 minutes ago</p>
                          </div>
                          <div className="p-2 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <p className="text-xs text-gray-900">Target achieved: 1000 visitors</p>
                            <p className="text-xs text-gray-500">1 hour ago</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Compact Refresh Button */}
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRefresh}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  disabled={isRefreshing}
                >
                  <motion.div
                    animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
                  >
                    <RefreshCw size={16} />
                  </motion.div>
                </motion.button>

                {/* Compact User Profile */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-xs font-semibold">Admin User</p>
                    <p className="text-xs text-blue-200">Administrator</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    A
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Welcome Section */}
            <div className="grid grid-cols-2 gap-6 items-center">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mb-1"
                >
                  Welcome back, Admin 👋
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-blue-100 text-sm"
                >
                  Real-time business performance overview
                </motion.p>
              </div>

              <div className="flex flex-col gap-2">
                {/* Compact Status Pills */}
                <div className="flex gap-2 flex-wrap">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/60 text-white px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm"
                  >
                    <CheckCircle size={12} />
                    Systems Operational
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1 bg-sky-500/20 border border-sky-400/60 text-white px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm"
                  >
                    <Zap size={12} />
                    Real-time Data
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1 bg-purple-500/20 border border-purple-400/60 text-white px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm"
                  >
                    <Shield size={12} />
                    Security Active
                  </motion.div>
                </div>

                {/* Compact Filter and Export */}
                <div className="flex gap-2">
                  <div className="relative">
                    <select 
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="appearance-none px-3 py-1.5 bg-white/15 text-white border border-white/30 rounded-lg text-xs font-medium focus:border-white/60 focus:bg-white/25 outline-none transition-all backdrop-blur-sm cursor-pointer"
                    >
                      <option className="bg-slate-900 text-white">This Month</option>
                      <option className="bg-slate-900 text-white">Last Month</option>
                      <option className="bg-slate-900 text-white">This Year</option>
                      <option className="bg-slate-900 text-white">Last 7 Days</option>
                    </select>
                    <ChevronDown
                      size={12}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none opacity-70"
                    />
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold rounded-lg flex items-center gap-1 shadow-lg hover:shadow-xl transition-all whitespace-nowrap text-xs"
                  >
                    <Download size={14} />
                    Export Report
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* COMPACT STATS CARDS - 4 Columns */}
            <div className="grid grid-cols-4 gap-3">
              <StatCard
                title="Total Visitors"
                value="24,856"
                subtitle="This month"
                trend={12}
                icon={Eye}
                bgColor="bg-gradient-to-br from-sky-400 to-sky-500"
                textColor="text-white"
                showProgress={true}
                progressValue={78}
                extraInfo="2.3K today"
              />
              <StatCard
                title="Total Leads"
                value="1,248"
                subtitle="Active leads"
                trend={8}
                icon={Phone}
                bgColor="bg-gradient-to-br from-teal-400 to-teal-500"
                textColor="text-white"
                showProgress={true}
                progressValue={65}
                extraInfo="142 new this week"
              />
              <StatCard
                title="Pending Follow-ups"
                value="342"
                subtitle="Awaiting action"
                trend={-3}
                icon={Clock}
                bgColor="bg-gradient-to-br from-amber-400 to-amber-500"
                textColor="text-white"
                showProgress={true}
                progressValue={45}
                extraInfo="23 overdue"
              />
              <StatCard
                title="Open Tickets"
                value="58"
                subtitle="Support queue"
                trend={-5}
                icon={Ticket}
                bgColor="bg-gradient-to-br from-red-400 to-red-500"
                textColor="text-white"
                showProgress={true}
                progressValue={82}
                extraInfo="12 high priority"
              />
            </div>

            {/* REVENUE AND PERFORMANCE SECTION */}
            <div className="grid grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="col-span-2 rounded-[24px] p-8 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Revenue Overview
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Monthly revenue vs target performance
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-600">Target</span>
                    </div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="month"
                      stroke="#999"
                      style={{ fontSize: "13px" }}
                    />
                    <YAxis stroke="#999" style={{ fontSize: "13px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="target" fill="#d1d5db" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Device Analytics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-[24px] p-8 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Device Analytics
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Traffic by device type</p>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value) => `${value}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-6 space-y-3">
                  {deviceData.map((device) => (
                    <div key={device.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: device.color }}
                        ></div>
                        <span className="text-sm text-gray-700">{device.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {device.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ENHANCED CHARTS SECTION - 2 Large Cards */}
            <div className="grid grid-cols-3 gap-6">
              {/* Visitors & Leads Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="col-span-2 rounded-[24px] p-8 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Visitors & Leads Trend
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Monthly performance metrics with conversion rates
                    </p>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={visitorsData}>
                    <defs>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      stroke="#999"
                      style={{ fontSize: "13px" }}
                    />
                    <YAxis stroke="#999" style={{ fontSize: "13px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value) => value.toLocaleString()}
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#0ea5e9"
                      strokeWidth={3}
                      fill="url(#colorVisitors)"
                    />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stroke="#14b8a6"
                      strokeWidth={3}
                      fill="url(#colorLeads)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Top Locations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-[24px] p-8 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Top Locations
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Visitors by country</p>
                </div>

                <div className="space-y-4">
                  {locationData.map((location, index) => (
                    <motion.div
                      key={location.country}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {location.country}
                          </p>
                          <p className="text-xs text-gray-500">
                            {location.visitors.toLocaleString()} visitors
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {location.percentage}%
                        </p>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <motion.div
                            className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${location.percentage}%` }}
                            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ENHANCED BOTTOM STATS - 3 Columns */}
            <div className="grid grid-cols-3 gap-6">
              <StatCard
                title="Active Clients"
                value="486"
                subtitle="Current clients"
                trend={15}
                icon={UserCheck}
                bgColor="bg-gradient-to-br from-emerald-400 to-emerald-500"
                textColor="text-white"
                showProgress={true}
                progressValue={88}
                extraInfo="32 new this month"
              />
              <StatCard
                title="Page Views"
                value="18.4K"
                subtitle="Total pageviews"
                trend={22}
                icon={Eye}
                bgColor="bg-gradient-to-br from-blue-400 to-blue-500"
                textColor="text-white"
                showProgress={true}
                progressValue={92}
                extraInfo="4.2K avg per day"
              />
              <StatCard
                title="Active Sessions"
                value="1,204"
                subtitle="Right now"
                trend={18}
                icon={Activity}
                bgColor="bg-gradient-to-br from-purple-400 to-purple-500"
                textColor="text-white"
                showProgress={true}
                progressValue={76}
                extraInfo="Peak: 1,892"
              />
            </div>

            {/* QUICK ACTIONS AND RECENT ACTIVITY */}
            <div className="grid grid-cols-2 gap-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-[24px] p-8 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Quick Actions
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Common tasks and shortcuts
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: UserPlus, label: "Add Lead", color: "from-blue-400 to-blue-500" },
                    { icon: MessageSquare, label: "Send Campaign", color: "from-emerald-400 to-emerald-500" },
                    { icon: FileText, label: "Generate Report", color: "from-purple-400 to-purple-500" },
                    { icon: Settings, label: "Settings", color: "from-gray-400 to-gray-500" },
                  ].map((action, index) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 bg-gradient-to-r ${action.color} text-white rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all`}
                    >
                      <action.icon size={20} />
                      <span className="font-medium">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="rounded-[24px] p-8 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Recent Activity
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Latest system events
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: UserPlus,
                      action: "New lead registered",
                      user: "John Doe",
                      time: "2 minutes ago",
                      color: "text-blue-500"
                    },
                    {
                      icon: ShoppingCart,
                      action: "Purchase completed",
                      user: "Sarah Smith",
                      time: "15 minutes ago",
                      color: "text-emerald-500"
                    },
                    {
                      icon: Ticket,
                      action: "Support ticket resolved",
                      user: "Mike Johnson",
                      time: "1 hour ago",
                      color: "text-purple-500"
                    },
                    {
                      icon: Mail,
                      action: "Email campaign sent",
                      user: "System",
                      time: "2 hours ago",
                      color: "text-amber-500"
                    },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                        <activity.icon size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* PERFORMANCE METRICS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="rounded-[24px] p-8 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  System Performance
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Real-time server and application metrics
                </p>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: "CPU Usage", value: "45%", icon: Cpu, color: "from-blue-400 to-blue-500", progress: 45 },
                  { label: "Memory", value: "6.2GB", icon: HardDrive, color: "from-emerald-400 to-emerald-500", progress: 62 },
                  { label: "Network", value: "124 Mbps", icon: Wifi, color: "from-purple-400 to-purple-500", progress: 78 },
                  { label: "Uptime", value: "99.9%", icon: Shield, color: "from-green-400 to-green-500", progress: 99 },
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      <metric.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {metric.value}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{metric.label}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`bg-gradient-to-r ${metric.color} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.progress}%` }}
                        transition={{ duration: 1, delay: 1.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import {
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Copy,
  Check,
  ExternalLink,
  Search,
  ChevronDown,
  Zap,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Share2,
  QrCode,
  X as CloseIcon,
  Eye,
  Globe,
  Building2,
  MapPin,
  RefreshCw,
  Calendar,
  Award,
  Link2,
} from 'lucide-react';

interface MarketingPage {
  id: string;
  title: string;
  url: string;
  category: string;
  tags: string[];
  leads: number;
  conversions: number;
  conversionRate: number;
  status: 'active' | 'paused' | 'draft';
  description?: string;
  createdDate?: string;
  updatedDate?: string;
  budget?: number;
  roi?: number;
  pageViews?: number;
  engagementRate?: number;
  clickThroughRate?: number;
  costPerLead?: number;
  costPerConversion?: number;
  trafficSource?: string;
  targetAudience?: string;
  campaignDuration?: string;
  performanceTrend?: 'up' | 'down' | 'stable';
  notes?: string;
}

interface MarketingStats {
  totalPages: number;
  activePages: number;
  totalLeads: number;
  wonLeads: number;
  totalConversions: number;
  conversionRate: number;
  avgConversionRate: number;
  totalPageViews: number;
  totalReach: number;
  cities: number;
  industries: number;
  regions: number;
}

// Mock marketing pages data
const mockMarketingPages: MarketingPage[] = [
  // Original Pages
  {
    id: '51',
    title: 'Time Tracking Pro Us - Kolkata',
    url: '/time-tracking-pro-us',
    category: 'Security',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '52',
    title: 'Employee Monitoring Enterprise - Coimbatore',
    url: '/employee-monitoring-enterprise',
    category: 'Time Tracking',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '53',
    title: 'Productivity Analytics Dashboard - Delhi',
    url: '/productivity-analytics-dashboard',
    category: 'Time Tracking',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '54',
    title: 'Remote Team Coordination - Mumbai',
    url: '/remote-team-coordination',
    category: 'Monitoring',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '55',
    title: 'Security Compliance Suite - Hyderabad',
    url: '/security-compliance-suite',
    category: 'Security',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '56',
    title: 'Project Billing Integration - Mumbai',
    url: '/project-billing-integration',
    category: 'Security',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '57',
    title: 'Advanced Time Reports - Coimbatore',
    url: '/advanced-time-reports',
    category: 'Monitoring',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '58',
    title: 'Attendance Management System - Mumbai',
    url: '/attendance-management-system',
    category: 'Security',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '59',
    title: 'Geolocation Tracking - Noida',
    url: '/geolocation-tracking',
    category: 'Security',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '60',
    title: 'Realtime Activity Dashboard - Kolkata',
    url: '/realtime-activity-dashboard',
    category: 'Monitoring',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '61',
    title: 'Payroll Integration Suite - Delhi',
    url: '/payroll-integration-suite',
    category: 'Monitoring',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '62',
    title: 'Team Performance Insights - Kochi',
    url: '/team-performance-insights',
    category: 'Security',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '63',
    title: 'Workload Management Platform - Chennai',
    url: '/workload-management-platform',
    category: 'Monitoring',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '64',
    title: 'Compliance Dashboard - Mumbai',
    url: '/compliance-dashboard',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '65',
    title: 'Project Cost Tracking - Ahmedabad',
    url: '/project-cost-tracking',
    category: 'Security',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '66',
    title: 'Employee Scheduling - Coimbatore',
    url: '/employee-scheduling',
    category: 'Analytics',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '67',
    title: 'Screen Recording Monitoring - Chennai',
    url: '/screen-recording-monitoring',
    category: 'Security',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '68',
    title: 'Productivity Trends Analysis - Ahmedabad',
    url: '/productivity-trends-analysis',
    category: 'Security',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '69',
    title: 'Task Management Integration - Hyderabad',
    url: '/task-management-integration',
    category: 'Monitoring',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '70',
    title: 'Budget Allocation Tools - Pune',
    url: '/budget-allocation-tools',
    category: 'Analytics',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '71',
    title: 'Leave Absence Management - Kochi',
    url: '/leave-absence-management',
    category: 'Time Tracking',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '72',
    title: 'Keystroke Monitoring - Vijayawada',
    url: '/keystroke-monitoring',
    category: 'Security',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '73',
    title: 'Efficiency Metrics Dashboard - Noida',
    url: '/efficiency-metrics-dashboard',
    category: 'Security',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '74',
    title: 'Distributed Team Coordination - Hyderabad',
    url: '/distributed-team-coordination',
    category: 'Time Tracking',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '75',
    title: 'Data Privacy Encryption - Gurugram',
    url: '/data-privacy-encryption',
    category: 'Time Tracking',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '76',
    title: 'Multi Project Invoicing - Vizag',
    url: '/multi-project-invoicing',
    category: 'Security',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '77',
    title: 'Shift Planning Suite - Pune',
    url: '/shift-planning-suite',
    category: 'Monitoring',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '78',
    title: 'Website App Usage Tracking - Bengaluru',
    url: '/website-app-usage-tracking',
    category: 'Time Tracking',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '79',
    title: 'Roi Calculation Engine - Kochi',
    url: '/roi-calculation-engine',
    category: 'Analytics',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '80',
    title: 'Cross Team Collaboration Hub - Delhi',
    url: '/cross-team-collaboration-hub',
    category: 'Security',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '81',
    title: 'Time Tracking Pro Us - Kolkata',
    url: '/time-tracking-pro-us',
    category: 'Time Tracking',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '82',
    title: 'Employee Monitoring Enterprise - Coimbatore',
    url: '/employee-monitoring-enterprise',
    category: 'Monitoring',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '83',
    title: 'Productivity Analytics Dashboard - Delhi',
    url: '/productivity-analytics-dashboard',
    category: 'Monitoring',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '84',
    title: 'Remote Team Coordination - Mumbai',
    url: '/remote-team-coordination',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '85',
    title: 'Security Compliance Suite - Hyderabad',
    url: '/security-compliance-suite',
    category: 'Monitoring',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '86',
    title: 'Project Billing Integration - Mumbai',
    url: '/project-billing-integration',
    category: 'Time Tracking',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '87',
    title: 'Advanced Time Reports - Coimbatore',
    url: '/advanced-time-reports',
    category: 'Analytics',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '88',
    title: 'Attendance Management System - Mumbai',
    url: '/attendance-management-system',
    category: 'Security',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '89',
    title: 'Geolocation Tracking - Noida',
    url: '/geolocation-tracking',
    category: 'Security',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '90',
    title: 'Realtime Activity Dashboard - Kolkata',
    url: '/realtime-activity-dashboard',
    category: 'Security',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '91',
    title: 'Payroll Integration Suite - Delhi',
    url: '/payroll-integration-suite',
    category: 'Time Tracking',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '92',
    title: 'Team Performance Insights - Kochi',
    url: '/team-performance-insights',
    category: 'Security',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '93',
    title: 'Workload Management Platform - Chennai',
    url: '/workload-management-platform',
    category: 'Security',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '94',
    title: 'Compliance Dashboard - Mumbai',
    url: '/compliance-dashboard',
    category: 'Monitoring',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '95',
    title: 'Project Cost Tracking - Ahmedabad',
    url: '/project-cost-tracking',
    category: 'Security',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '96',
    title: 'Employee Scheduling - Coimbatore',
    url: '/employee-scheduling',
    category: 'Security',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '97',
    title: 'Screen Recording Monitoring - Chennai',
    url: '/screen-recording-monitoring',
    category: 'Analytics',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '98',
    title: 'Productivity Trends Analysis - Ahmedabad',
    url: '/productivity-trends-analysis',
    category: 'Analytics',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '99',
    title: 'Task Management Integration - Hyderabad',
    url: '/task-management-integration',
    category: 'Time Tracking',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '100',
    title: 'Budget Allocation Tools - Pune',
    url: '/budget-allocation-tools',
    category: 'Monitoring',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '101',
    title: 'Leave Absence Management - Kochi',
    url: '/leave-absence-management',
    category: 'Security',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '102',
    title: 'Keystroke Monitoring - Vijayawada',
    url: '/keystroke-monitoring',
    category: 'Analytics',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '103',
    title: 'Efficiency Metrics Dashboard - Noida',
    url: '/efficiency-metrics-dashboard',
    category: 'Analytics',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '104',
    title: 'Distributed Team Coordination - Hyderabad',
    url: '/distributed-team-coordination',
    category: 'Monitoring',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '105',
    title: 'Data Privacy Encryption - Gurugram',
    url: '/data-privacy-encryption',
    category: 'Monitoring',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '106',
    title: 'Multi Project Invoicing - Vizag',
    url: '/multi-project-invoicing',
    category: 'Time Tracking',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '107',
    title: 'Shift Planning Suite - Pune',
    url: '/shift-planning-suite',
    category: 'Time Tracking',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '108',
    title: 'Website App Usage Tracking - Bengaluru',
    url: '/website-app-usage-tracking',
    category: 'Security',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '109',
    title: 'Roi Calculation Engine - Kochi',
    url: '/roi-calculation-engine',
    category: 'Monitoring',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '110',
    title: 'Cross Team Collaboration Hub - Delhi',
    url: '/cross-team-collaboration-hub',
    category: 'Security',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '111',
    title: 'Time Tracking Pro Us - Kolkata',
    url: '/time-tracking-pro-us',
    category: 'Analytics',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '112',
    title: 'Employee Monitoring Enterprise - Coimbatore',
    url: '/employee-monitoring-enterprise',
    category: 'Monitoring',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '113',
    title: 'Productivity Analytics Dashboard - Delhi',
    url: '/productivity-analytics-dashboard',
    category: 'Analytics',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '114',
    title: 'Remote Team Coordination - Mumbai',
    url: '/remote-team-coordination',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '115',
    title: 'Security Compliance Suite - Hyderabad',
    url: '/security-compliance-suite',
    category: 'Security',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '116',
    title: 'Project Billing Integration - Mumbai',
    url: '/project-billing-integration',
    category: 'Security',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '117',
    title: 'Advanced Time Reports - Coimbatore',
    url: '/advanced-time-reports',
    category: 'Monitoring',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '118',
    title: 'Attendance Management System - Mumbai',
    url: '/attendance-management-system',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '119',
    title: 'Geolocation Tracking - Noida',
    url: '/geolocation-tracking',
    category: 'Time Tracking',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '120',
    title: 'Realtime Activity Dashboard - Kolkata',
    url: '/realtime-activity-dashboard',
    category: 'Time Tracking',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '121',
    title: 'Payroll Integration Suite - Delhi',
    url: '/payroll-integration-suite',
    category: 'Analytics',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '122',
    title: 'Team Performance Insights - Kochi',
    url: '/team-performance-insights',
    category: 'Analytics',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '123',
    title: 'Workload Management Platform - Chennai',
    url: '/workload-management-platform',
    category: 'Security',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '124',
    title: 'Compliance Dashboard - Mumbai',
    url: '/compliance-dashboard',
    category: 'Security',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '125',
    title: 'Project Cost Tracking - Ahmedabad',
    url: '/project-cost-tracking',
    category: 'Time Tracking',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '126',
    title: 'Employee Scheduling - Coimbatore',
    url: '/employee-scheduling',
    category: 'Monitoring',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '127',
    title: 'Screen Recording Monitoring - Chennai',
    url: '/screen-recording-monitoring',
    category: 'Monitoring',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '128',
    title: 'Productivity Trends Analysis - Ahmedabad',
    url: '/productivity-trends-analysis',
    category: 'Time Tracking',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '129',
    title: 'Task Management Integration - Hyderabad',
    url: '/task-management-integration',
    category: 'Security',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '130',
    title: 'Budget Allocation Tools - Pune',
    url: '/budget-allocation-tools',
    category: 'Monitoring',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '131',
    title: 'Leave Absence Management - Kochi',
    url: '/leave-absence-management',
    category: 'Monitoring',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '132',
    title: 'Keystroke Monitoring - Vijayawada',
    url: '/keystroke-monitoring',
    category: 'Monitoring',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '133',
    title: 'Efficiency Metrics Dashboard - Noida',
    url: '/efficiency-metrics-dashboard',
    category: 'Analytics',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '134',
    title: 'Distributed Team Coordination - Hyderabad',
    url: '/distributed-team-coordination',
    category: 'Analytics',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '135',
    title: 'Data Privacy Encryption - Gurugram',
    url: '/data-privacy-encryption',
    category: 'Analytics',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '136',
    title: 'Multi Project Invoicing - Vizag',
    url: '/multi-project-invoicing',
    category: 'Monitoring',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '137',
    title: 'Shift Planning Suite - Pune',
    url: '/shift-planning-suite',
    category: 'Monitoring',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '138',
    title: 'Website App Usage Tracking - Bengaluru',
    url: '/website-app-usage-tracking',
    category: 'Security',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '139',
    title: 'Roi Calculation Engine - Kochi',
    url: '/roi-calculation-engine',
    category: 'Analytics',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '140',
    title: 'Cross Team Collaboration Hub - Delhi',
    url: '/cross-team-collaboration-hub',
    category: 'Security',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '141',
    title: 'Time Tracking Pro Us - Kolkata',
    url: '/time-tracking-pro-us',
    category: 'Time Tracking',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '142',
    title: 'Employee Monitoring Enterprise - Coimbatore',
    url: '/employee-monitoring-enterprise',
    category: 'Time Tracking',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '143',
    title: 'Productivity Analytics Dashboard - Delhi',
    url: '/productivity-analytics-dashboard',
    category: 'Monitoring',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '144',
    title: 'Remote Team Coordination - Mumbai',
    url: '/remote-team-coordination',
    category: 'Security',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '145',
    title: 'Security Compliance Suite - Hyderabad',
    url: '/security-compliance-suite',
    category: 'Security',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '146',
    title: 'Project Billing Integration - Mumbai',
    url: '/project-billing-integration',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '147',
    title: 'Advanced Time Reports - Coimbatore',
    url: '/advanced-time-reports',
    category: 'Time Tracking',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '148',
    title: 'Attendance Management System - Mumbai',
    url: '/attendance-management-system',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '149',
    title: 'Geolocation Tracking - Noida',
    url: '/geolocation-tracking',
    category: 'Time Tracking',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '150',
    title: 'Realtime Activity Dashboard - Kolkata',
    url: '/realtime-activity-dashboard',
    category: 'Security',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '151',
    title: 'Payroll Integration Suite - Delhi',
    url: '/payroll-integration-suite',
    category: 'Time Tracking',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '152',
    title: 'Team Performance Insights - Kochi',
    url: '/team-performance-insights',
    category: 'Security',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '153',
    title: 'Workload Management Platform - Chennai',
    url: '/workload-management-platform',
    category: 'Analytics',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '154',
    title: 'Compliance Dashboard - Mumbai',
    url: '/compliance-dashboard',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '155',
    title: 'Project Cost Tracking - Ahmedabad',
    url: '/project-cost-tracking',
    category: 'Monitoring',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '156',
    title: 'Employee Scheduling - Coimbatore',
    url: '/employee-scheduling',
    category: 'Time Tracking',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '157',
    title: 'Screen Recording Monitoring - Chennai',
    url: '/screen-recording-monitoring',
    category: 'Analytics',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '158',
    title: 'Productivity Trends Analysis - Ahmedabad',
    url: '/productivity-trends-analysis',
    category: 'Analytics',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '159',
    title: 'Task Management Integration - Hyderabad',
    url: '/task-management-integration',
    category: 'Analytics',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '160',
    title: 'Budget Allocation Tools - Pune',
    url: '/budget-allocation-tools',
    category: 'Monitoring',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '161',
    title: 'Leave Absence Management - Kochi',
    url: '/leave-absence-management',
    category: 'Security',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '162',
    title: 'Keystroke Monitoring - Vijayawada',
    url: '/keystroke-monitoring',
    category: 'Monitoring',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '163',
    title: 'Efficiency Metrics Dashboard - Noida',
    url: '/efficiency-metrics-dashboard',
    category: 'Analytics',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '164',
    title: 'Distributed Team Coordination - Hyderabad',
    url: '/distributed-team-coordination',
    category: 'Time Tracking',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '165',
    title: 'Data Privacy Encryption - Gurugram',
    url: '/data-privacy-encryption',
    category: 'Analytics',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '166',
    title: 'Multi Project Invoicing - Vizag',
    url: '/multi-project-invoicing',
    category: 'Analytics',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '167',
    title: 'Shift Planning Suite - Pune',
    url: '/shift-planning-suite',
    category: 'Monitoring',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '168',
    title: 'Website App Usage Tracking - Bengaluru',
    url: '/website-app-usage-tracking',
    category: 'Security',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '169',
    title: 'Roi Calculation Engine - Kochi',
    url: '/roi-calculation-engine',
    category: 'Monitoring',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '170',
    title: 'Cross Team Collaboration Hub - Delhi',
    url: '/cross-team-collaboration-hub',
    category: 'Time Tracking',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '171',
    title: 'Time Tracking Pro Us - Kolkata',
    url: '/time-tracking-pro-us',
    category: 'Analytics',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '172',
    title: 'Employee Monitoring Enterprise - Coimbatore',
    url: '/employee-monitoring-enterprise',
    category: 'Security',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '173',
    title: 'Productivity Analytics Dashboard - Delhi',
    url: '/productivity-analytics-dashboard',
    category: 'Analytics',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '174',
    title: 'Remote Team Coordination - Mumbai',
    url: '/remote-team-coordination',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '175',
    title: 'Security Compliance Suite - Hyderabad',
    url: '/security-compliance-suite',
    category: 'Time Tracking',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '176',
    title: 'Project Billing Integration - Mumbai',
    url: '/project-billing-integration',
    category: 'Time Tracking',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '177',
    title: 'Advanced Time Reports - Coimbatore',
    url: '/advanced-time-reports',
    category: 'Security',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '178',
    title: 'Attendance Management System - Mumbai',
    url: '/attendance-management-system',
    category: 'Time Tracking',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '179',
    title: 'Geolocation Tracking - Noida',
    url: '/geolocation-tracking',
    category: 'Security',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '180',
    title: 'Realtime Activity Dashboard - Kolkata',
    url: '/realtime-activity-dashboard',
    category: 'Monitoring',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '181',
    title: 'Payroll Integration Suite - Delhi',
    url: '/payroll-integration-suite',
    category: 'Monitoring',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '182',
    title: 'Team Performance Insights - Kochi',
    url: '/team-performance-insights',
    category: 'Time Tracking',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '183',
    title: 'Workload Management Platform - Chennai',
    url: '/workload-management-platform',
    category: 'Analytics',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '184',
    title: 'Compliance Dashboard - Mumbai',
    url: '/compliance-dashboard',
    category: 'Monitoring',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '185',
    title: 'Project Cost Tracking - Ahmedabad',
    url: '/project-cost-tracking',
    category: 'Security',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '186',
    title: 'Employee Scheduling - Coimbatore',
    url: '/employee-scheduling',
    category: 'Analytics',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '187',
    title: 'Screen Recording Monitoring - Chennai',
    url: '/screen-recording-monitoring',
    category: 'Analytics',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '188',
    title: 'Productivity Trends Analysis - Ahmedabad',
    url: '/productivity-trends-analysis',
    category: 'Analytics',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '189',
    title: 'Task Management Integration - Hyderabad',
    url: '/task-management-integration',
    category: 'Security',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '190',
    title: 'Budget Allocation Tools - Pune',
    url: '/budget-allocation-tools',
    category: 'Time Tracking',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '191',
    title: 'Leave Absence Management - Kochi',
    url: '/leave-absence-management',
    category: 'Security',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '192',
    title: 'Keystroke Monitoring - Vijayawada',
    url: '/keystroke-monitoring',
    category: 'Analytics',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '193',
    title: 'Efficiency Metrics Dashboard - Noida',
    url: '/efficiency-metrics-dashboard',
    category: 'Analytics',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '194',
    title: 'Distributed Team Coordination - Hyderabad',
    url: '/distributed-team-coordination',
    category: 'Monitoring',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '195',
    title: 'Data Privacy Encryption - Gurugram',
    url: '/data-privacy-encryption',
    category: 'Analytics',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '196',
    title: 'Multi Project Invoicing - Vizag',
    url: '/multi-project-invoicing',
    category: 'Time Tracking',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '197',
    title: 'Shift Planning Suite - Pune',
    url: '/shift-planning-suite',
    category: 'Time Tracking',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '198',
    title: 'Website App Usage Tracking - Bengaluru',
    url: '/website-app-usage-tracking',
    category: 'Security',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '199',
    title: 'Roi Calculation Engine - Kochi',
    url: '/roi-calculation-engine',
    category: 'Monitoring',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
  {
    id: '200',
    title: 'Cross Team Collaboration Hub - Delhi',
    url: '/cross-team-collaboration-hub',
    category: 'Time Tracking',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 0,
    conversions: 0,
    conversionRate: 0,
    status: 'active',
  },
];

const tagColors: Record<string, string> = {
  'Geo-Targeted': 'bg-blue-100 text-blue-700',
  'US Market': 'bg-indigo-100 text-indigo-700',
  'B2B': 'bg-purple-100 text-purple-700',
  'Enterprise': 'bg-red-100 text-red-700',
  'SMB Focus': 'bg-green-100 text-green-700',
  'Performance': 'bg-yellow-100 text-yellow-700',
  'Remote': 'bg-cyan-100 text-cyan-700',
  'Async': 'bg-teal-100 text-teal-700',
  'Compliance': 'bg-orange-100 text-orange-700',
  'Accounting': 'bg-pink-100 text-pink-700',
  'PSA': 'bg-violet-100 text-violet-700',
  'Security': 'bg-red-100 text-red-700',
  'Accessibility': 'bg-purple-100 text-purple-700',
  'Hyderabad': 'bg-orange-100 text-orange-700',
  'Bangalore': 'bg-purple-100 text-purple-700',
  'Chennai': 'bg-pink-100 text-pink-700',
  'Mumbai': 'bg-blue-100 text-blue-700',
  'Pune': 'bg-yellow-100 text-yellow-700',
  'Delhi': 'bg-red-100 text-red-700',
  'Kolkata': 'bg-green-100 text-green-700',
  'Ahmedabad': 'bg-indigo-100 text-indigo-700',
  'Surat': 'bg-cyan-100 text-cyan-700',
  'Jaipur': 'bg-amber-100 text-amber-700',
};

const periodOptions = ['All Time', 'Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'Last Month', 'Custom'] as const;
type PeriodOption = typeof periodOptions[number];

function computeStats(data: MarketingPage[]): MarketingStats {
  const activeCount = data.filter(p => p.status === 'active').length;

  // Extract unique cities from tags (first tag is usually the city)
  const citySet = new Set<string>();
  const categorySet = new Set<string>();
  const regionSet = new Set<string>();

  const regionMap: Record<string, string> = {
    'Kolkata': 'East', 'Delhi': 'North', 'Mumbai': 'West', 'Chennai': 'South',
    'Bangalore': 'South', 'Hyderabad': 'South', 'Pune': 'West', 'Ahmedabad': 'West',
    'Surat': 'West', 'Jaipur': 'North', 'Noida': 'North', 'Kochi': 'South',
    'Coimbatore': 'South', 'Lucknow': 'North', 'Indore': 'Central',
    'Chandigarh': 'North', 'Nagpur': 'Central', 'Bhopal': 'Central',
    'Visakhapatnam': 'South', 'Thiruvananthapuram': 'South', 'Gurgaon': 'North',
    'Mysore': 'South', 'Mangalore': 'South', 'Vadodara': 'West',
    'Nashik': 'West', 'Rajkot': 'West', 'Patna': 'East', 'Ranchi': 'East',
  };

  data.forEach(p => {
    categorySet.add(p.category);
    p.tags.forEach(tag => {
      if (tag !== 'Geo-Targeted' && tag !== 'US Market' && tag !== 'B2B' && tag !== 'Enterprise' &&
          tag !== 'SMB Focus' && tag !== 'Performance' && tag !== 'Remote' && tag !== 'Async' &&
          tag !== 'Compliance' && tag !== 'Accounting' && tag !== 'PSA' && tag !== 'Security' &&
          tag !== 'Accessibility') {
        citySet.add(tag);
        if (regionMap[tag]) regionSet.add(regionMap[tag]);
      }
    });
  });

  // Only show real data - no seed/dummy metrics
  return {
    totalPages: data.length,
    activePages: activeCount,
    totalLeads: 0,
    wonLeads: 0,
    totalConversions: 0,
    conversionRate: 0,
    avgConversionRate: 0,
    totalPageViews: 0,
    totalReach: 0,
    cities: citySet.size,
    industries: categorySet.size,
    regions: regionSet.size,
  };
}

export default function MarketingPage() {
  const [pages, setPages] = useState<MarketingPage[]>([]);
  const [stats, setStats] = useState<MarketingStats>({
    totalPages: 0,
    activePages: 0,
    totalLeads: 0,
    wonLeads: 0,
    totalConversions: 0,
    conversionRate: 0,
    avgConversionRate: 0,
    totalPageViews: 0,
    totalReach: 0,
    cities: 0,
    industries: 0,
    regions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>('This Month');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [copied, setCopied] = useState<string | null>(null);
  const [qrModal, setQrModal] = useState<{ isOpen: boolean; pageId: string | null; url: string }>({
    isOpen: false,
    pageId: null,
    url: '',
  });

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setPages(mockMarketingPages);
      setStats(computeStats(mockMarketingPages));
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setStats(computeStats(mockMarketingPages));
      setRefreshing(false);
    }, 800);
  };

  const filteredPages = pages
    .filter(p => filterStatus === 'all' || p.status === filterStatus)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCopyUrl = (url: string, pageId: string) => {
    const fullUrl = `${window.location.origin}/marketing${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(pageId);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 -mx-6 px-6">
        <div className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Marketing Tools</h1>
            <p className="text-gray-500 mt-0.5 text-sm">Landing pages directory with copy-to-clipboard, UTM builder, and social templates</p>
          </div>
        </div>
      </div>

      {/* Performance Stats Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Performance Stats Header with Period Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Performance Stats</h2>
              <p className="text-xs text-gray-500">Period: {selectedPeriod}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
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
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-200 transition-all ml-1"
              title="Refresh stats"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stats Row 1 - 5 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          {[
            { label: 'Total Leads', value: stats.totalLeads.toLocaleString(), icon: Users, bgColor: 'bg-blue-50', iconColor: 'text-blue-500', borderColor: 'border-blue-100' },
            { label: 'Won Leads', value: stats.wonLeads.toLocaleString(), icon: Award, bgColor: 'bg-green-50', iconColor: 'text-green-500', borderColor: 'border-green-100' },
            { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: TrendingUp, bgColor: 'bg-purple-50', iconColor: 'text-purple-500', borderColor: 'border-purple-100' },
            { label: 'Total Page Views', value: stats.totalPageViews.toLocaleString(), icon: Eye, bgColor: 'bg-pink-50', iconColor: 'text-pink-500', borderColor: 'border-pink-100' },
            { label: 'Active Pages', value: stats.activePages, icon: Globe, bgColor: 'bg-orange-50', iconColor: 'text-orange-500', borderColor: 'border-orange-100' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl p-4 border ${stat.borderColor} hover:shadow-md transition-all`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-semibold text-gray-900 leading-tight">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row 2 - 4 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Pages', value: stats.totalPages, icon: Globe, bgColor: 'bg-indigo-50', iconColor: 'text-indigo-500', borderColor: 'border-indigo-100' },
            { label: 'Cities', value: stats.cities, icon: Building2, bgColor: 'bg-violet-50', iconColor: 'text-violet-500', borderColor: 'border-violet-100' },
            { label: 'Industries', value: stats.industries, icon: Building2, bgColor: 'bg-teal-50', iconColor: 'text-teal-500', borderColor: 'border-teal-100' },
            { label: 'Regions', value: stats.regions, icon: Link2, bgColor: 'bg-amber-50', iconColor: 'text-amber-500', borderColor: 'border-amber-100' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              className={`bg-white rounded-xl p-4 border ${stat.borderColor} hover:shadow-md transition-all`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-semibold text-gray-900 leading-tight">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search pages by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-3 py-2 text-sm rounded-lg font-medium transition-all ${
                  filterStatus === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('paused')}
                className={`px-3 py-2 text-sm rounded-lg font-medium transition-all ${
                  filterStatus === 'paused'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Paused
              </button>
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-2 text-sm rounded-lg font-medium transition-all ${
                  filterStatus === 'all'
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
            </div>
          </div>
      </div>

      {/* Marketing Pages List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredPages.length > 0 ? (
        <div className="space-y-3">
            {filteredPages.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Title and Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{page.title}</h3>
                        <span className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
                          page.status === 'active' ? 'bg-green-100 text-green-700' :
                          page.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                        </span>
                        {page.tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-gray-500">
                        <span className="text-blue-500 font-medium truncate max-w-[180px]">{page.url}</span>
                        <span className="text-gray-300">|</span>
                        <span>{page.category}</span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {page.leads} leads
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-green-600 font-medium">{page.conversionRate}%</span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleCopyUrl(page.url, page.id)}
                        className={`p-1.5 rounded-md transition-all border ${
                          copied === page.id
                            ? 'bg-green-50 text-green-600 border-green-200'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200'
                        }`}
                        title={copied === page.id ? 'Copied!' : 'Copy URL'}
                      >
                        {copied === page.id ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Social Media Sharing */}
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}${page.url}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all border border-blue-200"
                        title="Share on LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}${page.url}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all border border-blue-200"
                        title="Share on Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}${page.url}`)}&text=${encodeURIComponent(page.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md bg-black/5 hover:bg-black/10 text-gray-700 transition-all border border-gray-200"
                        title="Share on X (Twitter)"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`https://www.instagram.com/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md bg-pink-50 hover:bg-pink-100 text-pink-600 transition-all border border-pink-200"
                        title="Share on Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setQrModal({
                          isOpen: true,
                          pageId: page.id,
                          url: `${window.location.origin}${page.url}`
                        })}
                        className="p-1.5 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-600 transition-all border border-purple-200"
                        title="Generate QR Code"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={`${page.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium transition-all border border-blue-200"
                        title="Open page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open
                      </a>

                      <button className="p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-500 transition-all border border-gray-200">
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
          <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No marketing pages found</p>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Result Count */}
      <div className="text-center text-sm text-gray-600">
        Showing <span className="font-semibold text-gray-900">{filteredPages.length}</span> of <span className="font-semibold text-gray-900">{pages.length}</span> pages
      </div>

      {/* QR Code Modal */}
      {qrModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">QR Code</h3>
              <button
                onClick={() => setQrModal({ isOpen: false, pageId: null, url: '' })}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <QRCodeCanvas
                  value={qrModal.url}
                  size={256}
                  level="H"
                  includeMargin={true}
                  fgColor="#000000"
                  bgColor="#ffffff"
                />
              </div>
              <p className="text-sm text-gray-600 text-center break-all">{qrModal.url}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(qrModal.url);
                  setQrModal({ isOpen: false, pageId: null, url: '' });
                }}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
              >
                Copy URL
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

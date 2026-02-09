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
  totalConversions: number;
  avgConversionRate: number;
  totalReach: number;
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
    leads: 201,
    conversions: 12,
    conversionRate: 6.1,
    status: 'active',
  },
  {
    id: '52',
    title: 'Employee Monitoring Enterprise - Coimbatore',
    url: '/employee-monitoring-enterprise',
    category: 'Time Tracking',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 235,
    conversions: 39,
    conversionRate: 16.8,
    status: 'active',
  },
  {
    id: '53',
    title: 'Productivity Analytics Dashboard - Delhi',
    url: '/productivity-analytics-dashboard',
    category: 'Time Tracking',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 430,
    conversions: 53,
    conversionRate: 12.5,
    status: 'active',
  },
  {
    id: '54',
    title: 'Remote Team Coordination - Mumbai',
    url: '/remote-team-coordination',
    category: 'Monitoring',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 167,
    conversions: 12,
    conversionRate: 7.2,
    status: 'active',
  },
  {
    id: '55',
    title: 'Security Compliance Suite - Hyderabad',
    url: '/security-compliance-suite',
    category: 'Security',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 307,
    conversions: 50,
    conversionRate: 16.6,
    status: 'active',
  },
  {
    id: '56',
    title: 'Project Billing Integration - Mumbai',
    url: '/project-billing-integration',
    category: 'Security',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 448,
    conversions: 30,
    conversionRate: 6.8,
    status: 'active',
  },
  {
    id: '57',
    title: 'Advanced Time Reports - Coimbatore',
    url: '/advanced-time-reports',
    category: 'Monitoring',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 202,
    conversions: 28,
    conversionRate: 14.2,
    status: 'active',
  },
  {
    id: '58',
    title: 'Attendance Management System - Mumbai',
    url: '/attendance-management-system',
    category: 'Security',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 459,
    conversions: 51,
    conversionRate: 11.3,
    status: 'active',
  },
  {
    id: '59',
    title: 'Geolocation Tracking - Noida',
    url: '/geolocation-tracking',
    category: 'Security',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 318,
    conversions: 39,
    conversionRate: 12.3,
    status: 'active',
  },
  {
    id: '60',
    title: 'Realtime Activity Dashboard - Kolkata',
    url: '/realtime-activity-dashboard',
    category: 'Monitoring',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 299,
    conversions: 43,
    conversionRate: 14.7,
    status: 'active',
  },
  {
    id: '61',
    title: 'Payroll Integration Suite - Delhi',
    url: '/payroll-integration-suite',
    category: 'Monitoring',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 327,
    conversions: 55,
    conversionRate: 16.9,
    status: 'active',
  },
  {
    id: '62',
    title: 'Team Performance Insights - Kochi',
    url: '/team-performance-insights',
    category: 'Security',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 272,
    conversions: 37,
    conversionRate: 13.7,
    status: 'active',
  },
  {
    id: '63',
    title: 'Workload Management Platform - Chennai',
    url: '/workload-management-platform',
    category: 'Monitoring',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 197,
    conversions: 34,
    conversionRate: 17.7,
    status: 'active',
  },
  {
    id: '64',
    title: 'Compliance Dashboard - Mumbai',
    url: '/compliance-dashboard',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 264,
    conversions: 32,
    conversionRate: 12.2,
    status: 'active',
  },
  {
    id: '65',
    title: 'Project Cost Tracking - Ahmedabad',
    url: '/project-cost-tracking',
    category: 'Security',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 412,
    conversions: 25,
    conversionRate: 6.3,
    status: 'active',
  },
  {
    id: '66',
    title: 'Employee Scheduling - Coimbatore',
    url: '/employee-scheduling',
    category: 'Analytics',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 366,
    conversions: 63,
    conversionRate: 17.3,
    status: 'active',
  },
  {
    id: '67',
    title: 'Screen Recording Monitoring - Chennai',
    url: '/screen-recording-monitoring',
    category: 'Security',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 427,
    conversions: 27,
    conversionRate: 6.4,
    status: 'active',
  },
  {
    id: '68',
    title: 'Productivity Trends Analysis - Ahmedabad',
    url: '/productivity-trends-analysis',
    category: 'Security',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 382,
    conversions: 54,
    conversionRate: 14.2,
    status: 'active',
  },
  {
    id: '69',
    title: 'Task Management Integration - Hyderabad',
    url: '/task-management-integration',
    category: 'Monitoring',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 193,
    conversions: 13,
    conversionRate: 6.8,
    status: 'active',
  },
  {
    id: '70',
    title: 'Budget Allocation Tools - Pune',
    url: '/budget-allocation-tools',
    category: 'Analytics',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 108,
    conversions: 11,
    conversionRate: 10.6,
    status: 'active',
  },
  {
    id: '71',
    title: 'Leave Absence Management - Kochi',
    url: '/leave-absence-management',
    category: 'Time Tracking',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 471,
    conversions: 55,
    conversionRate: 11.7,
    status: 'active',
  },
  {
    id: '72',
    title: 'Keystroke Monitoring - Vijayawada',
    url: '/keystroke-monitoring',
    category: 'Security',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 154,
    conversions: 17,
    conversionRate: 11.4,
    status: 'active',
  },
  {
    id: '73',
    title: 'Efficiency Metrics Dashboard - Noida',
    url: '/efficiency-metrics-dashboard',
    category: 'Security',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 222,
    conversions: 35,
    conversionRate: 16.1,
    status: 'active',
  },
  {
    id: '74',
    title: 'Distributed Team Coordination - Hyderabad',
    url: '/distributed-team-coordination',
    category: 'Time Tracking',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 327,
    conversions: 57,
    conversionRate: 17.5,
    status: 'active',
  },
  {
    id: '75',
    title: 'Data Privacy Encryption - Gurugram',
    url: '/data-privacy-encryption',
    category: 'Time Tracking',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 343,
    conversions: 31,
    conversionRate: 9.3,
    status: 'active',
  },
  {
    id: '76',
    title: 'Multi Project Invoicing - Vizag',
    url: '/multi-project-invoicing',
    category: 'Security',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 438,
    conversions: 47,
    conversionRate: 10.9,
    status: 'active',
  },
  {
    id: '77',
    title: 'Shift Planning Suite - Pune',
    url: '/shift-planning-suite',
    category: 'Monitoring',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 496,
    conversions: 55,
    conversionRate: 11.1,
    status: 'active',
  },
  {
    id: '78',
    title: 'Website App Usage Tracking - Bengaluru',
    url: '/website-app-usage-tracking',
    category: 'Time Tracking',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 157,
    conversions: 13,
    conversionRate: 8.4,
    status: 'active',
  },
  {
    id: '79',
    title: 'Roi Calculation Engine - Kochi',
    url: '/roi-calculation-engine',
    category: 'Analytics',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 196,
    conversions: 25,
    conversionRate: 12.8,
    status: 'active',
  },
  {
    id: '80',
    title: 'Cross Team Collaboration Hub - Delhi',
    url: '/cross-team-collaboration-hub',
    category: 'Security',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 116,
    conversions: 11,
    conversionRate: 9.6,
    status: 'active',
  },
  {
    id: '81',
    title: 'Time Tracking Pro Us - Ahmedabad',
    url: '/time-tracking-pro-us',
    category: 'Time Tracking',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 136,
    conversions: 8,
    conversionRate: 6.5,
    status: 'active',
  },
  {
    id: '82',
    title: 'Employee Monitoring Enterprise - Vijayawada',
    url: '/employee-monitoring-enterprise',
    category: 'Monitoring',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 354,
    conversions: 45,
    conversionRate: 12.9,
    status: 'active',
  },
  {
    id: '83',
    title: 'Productivity Analytics Dashboard - Noida',
    url: '/productivity-analytics-dashboard',
    category: 'Monitoring',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 356,
    conversions: 48,
    conversionRate: 13.7,
    status: 'active',
  },
  {
    id: '84',
    title: 'Remote Team Coordination - Chennai',
    url: '/remote-team-coordination',
    category: 'Analytics',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 471,
    conversions: 51,
    conversionRate: 11.0,
    status: 'active',
  },
  {
    id: '85',
    title: 'Security Compliance Suite - Mumbai',
    url: '/security-compliance-suite',
    category: 'Monitoring',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 375,
    conversions: 56,
    conversionRate: 15.1,
    status: 'active',
  },
  {
    id: '86',
    title: 'Project Billing Integration - Vizag',
    url: '/project-billing-integration',
    category: 'Time Tracking',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 185,
    conversions: 9,
    conversionRate: 5.1,
    status: 'active',
  },
  {
    id: '87',
    title: 'Advanced Time Reports - Pune',
    url: '/advanced-time-reports',
    category: 'Analytics',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 363,
    conversions: 44,
    conversionRate: 12.3,
    status: 'active',
  },
  {
    id: '88',
    title: 'Attendance Management System - Vizag',
    url: '/attendance-management-system',
    category: 'Security',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 108,
    conversions: 17,
    conversionRate: 16.2,
    status: 'active',
  },
  {
    id: '89',
    title: 'Geolocation Tracking - Vijayawada',
    url: '/geolocation-tracking',
    category: 'Security',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 180,
    conversions: 31,
    conversionRate: 17.7,
    status: 'active',
  },
  {
    id: '90',
    title: 'Realtime Activity Dashboard - Gurugram',
    url: '/realtime-activity-dashboard',
    category: 'Security',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 216,
    conversions: 14,
    conversionRate: 6.5,
    status: 'active',
  },
  {
    id: '91',
    title: 'Payroll Integration Suite - Pune',
    url: '/payroll-integration-suite',
    category: 'Time Tracking',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 244,
    conversions: 14,
    conversionRate: 5.8,
    status: 'active',
  },
  {
    id: '92',
    title: 'Team Performance Insights - Kochi',
    url: '/team-performance-insights',
    category: 'Security',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 195,
    conversions: 14,
    conversionRate: 7.4,
    status: 'active',
  },
  {
    id: '93',
    title: 'Workload Management Platform - Gurugram',
    url: '/workload-management-platform',
    category: 'Security',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 184,
    conversions: 27,
    conversionRate: 15.0,
    status: 'active',
  },
  {
    id: '94',
    title: 'Compliance Dashboard - Kolkata',
    url: '/compliance-dashboard',
    category: 'Monitoring',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 426,
    conversions: 32,
    conversionRate: 7.7,
    status: 'active',
  },
  {
    id: '95',
    title: 'Project Cost Tracking - Gurugram',
    url: '/project-cost-tracking',
    category: 'Security',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 377,
    conversions: 35,
    conversionRate: 9.3,
    status: 'active',
  },
  {
    id: '96',
    title: 'Employee Scheduling - Delhi',
    url: '/employee-scheduling',
    category: 'Security',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 147,
    conversions: 12,
    conversionRate: 8.3,
    status: 'active',
  },
  {
    id: '97',
    title: 'Screen Recording Monitoring - Mumbai',
    url: '/screen-recording-monitoring',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 310,
    conversions: 18,
    conversionRate: 5.9,
    status: 'active',
  },
  {
    id: '98',
    title: 'Productivity Trends Analysis - Vijayawada',
    url: '/productivity-trends-analysis',
    category: 'Analytics',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 407,
    conversions: 62,
    conversionRate: 15.4,
    status: 'active',
  },
  {
    id: '99',
    title: 'Task Management Integration - Gurugram',
    url: '/task-management-integration',
    category: 'Time Tracking',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 170,
    conversions: 23,
    conversionRate: 14.0,
    status: 'active',
  },
  {
    id: '100',
    title: 'Budget Allocation Tools - Coimbatore',
    url: '/budget-allocation-tools',
    category: 'Monitoring',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 243,
    conversions: 15,
    conversionRate: 6.5,
    status: 'active',
  },
  {
    id: '101',
    title: 'Leave Absence Management - Ahmedabad',
    url: '/leave-absence-management',
    category: 'Security',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 202,
    conversions: 24,
    conversionRate: 12.1,
    status: 'active',
  },
  {
    id: '102',
    title: 'Keystroke Monitoring - Chennai',
    url: '/keystroke-monitoring',
    category: 'Analytics',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 498,
    conversions: 57,
    conversionRate: 11.6,
    status: 'active',
  },
  {
    id: '103',
    title: 'Efficiency Metrics Dashboard - Coimbatore',
    url: '/efficiency-metrics-dashboard',
    category: 'Analytics',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 287,
    conversions: 28,
    conversionRate: 10.0,
    status: 'active',
  },
  {
    id: '104',
    title: 'Distributed Team Coordination - Bengaluru',
    url: '/distributed-team-coordination',
    category: 'Monitoring',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 354,
    conversions: 46,
    conversionRate: 13.1,
    status: 'active',
  },
  {
    id: '105',
    title: 'Data Privacy Encryption - Vizag',
    url: '/data-privacy-encryption',
    category: 'Monitoring',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 171,
    conversions: 12,
    conversionRate: 7.2,
    status: 'active',
  },
  {
    id: '106',
    title: 'Multi Project Invoicing - Kolkata',
    url: '/multi-project-invoicing',
    category: 'Time Tracking',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 286,
    conversions: 24,
    conversionRate: 8.6,
    status: 'active',
  },
  {
    id: '107',
    title: 'Shift Planning Suite - Gurugram',
    url: '/shift-planning-suite',
    category: 'Time Tracking',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 439,
    conversions: 22,
    conversionRate: 5.2,
    status: 'active',
  },
  {
    id: '108',
    title: 'Website App Usage Tracking - Hyderabad',
    url: '/website-app-usage-tracking',
    category: 'Security',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 468,
    conversions: 38,
    conversionRate: 8.2,
    status: 'active',
  },
  {
    id: '109',
    title: 'Roi Calculation Engine - Kolkata',
    url: '/roi-calculation-engine',
    category: 'Monitoring',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 134,
    conversions: 8,
    conversionRate: 6.2,
    status: 'active',
  },
  {
    id: '110',
    title: 'Cross Team Collaboration Hub - Coimbatore',
    url: '/cross-team-collaboration-hub',
    category: 'Security',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 162,
    conversions: 12,
    conversionRate: 7.5,
    status: 'active',
  },
  {
    id: '111',
    title: 'Time Tracking Pro Us - Mumbai',
    url: '/time-tracking-pro-us',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 499,
    conversions: 56,
    conversionRate: 11.4,
    status: 'active',
  },
  {
    id: '112',
    title: 'Employee Monitoring Enterprise - Vijayawada',
    url: '/employee-monitoring-enterprise',
    category: 'Monitoring',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 437,
    conversions: 62,
    conversionRate: 14.3,
    status: 'active',
  },
  {
    id: '113',
    title: 'Productivity Analytics Dashboard - Hyderabad',
    url: '/productivity-analytics-dashboard',
    category: 'Analytics',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 160,
    conversions: 16,
    conversionRate: 10.4,
    status: 'active',
  },
  {
    id: '114',
    title: 'Remote Team Coordination - Kochi',
    url: '/remote-team-coordination',
    category: 'Analytics',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 294,
    conversions: 37,
    conversionRate: 12.8,
    status: 'active',
  },
  {
    id: '115',
    title: 'Security Compliance Suite - Hyderabad',
    url: '/security-compliance-suite',
    category: 'Security',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 177,
    conversions: 10,
    conversionRate: 5.7,
    status: 'active',
  },
  {
    id: '116',
    title: 'Project Billing Integration - Noida',
    url: '/project-billing-integration',
    category: 'Security',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 149,
    conversions: 26,
    conversionRate: 17.9,
    status: 'active',
  },
  {
    id: '117',
    title: 'Advanced Time Reports - Mumbai',
    url: '/advanced-time-reports',
    category: 'Monitoring',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 340,
    conversions: 56,
    conversionRate: 16.6,
    status: 'active',
  },
  {
    id: '118',
    title: 'Attendance Management System - Chennai',
    url: '/attendance-management-system',
    category: 'Analytics',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 423,
    conversions: 69,
    conversionRate: 16.4,
    status: 'active',
  },
  {
    id: '119',
    title: 'Geolocation Tracking - Coimbatore',
    url: '/geolocation-tracking',
    category: 'Time Tracking',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 420,
    conversions: 55,
    conversionRate: 13.1,
    status: 'active',
  },
  {
    id: '120',
    title: 'Realtime Activity Dashboard - Pune',
    url: '/realtime-activity-dashboard',
    category: 'Time Tracking',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 217,
    conversions: 11,
    conversionRate: 5.1,
    status: 'active',
  },
  {
    id: '121',
    title: 'Payroll Integration Suite - Chennai',
    url: '/payroll-integration-suite',
    category: 'Analytics',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 227,
    conversions: 17,
    conversionRate: 7.5,
    status: 'active',
  },
  {
    id: '122',
    title: 'Team Performance Insights - Noida',
    url: '/team-performance-insights',
    category: 'Analytics',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 243,
    conversions: 43,
    conversionRate: 17.9,
    status: 'active',
  },
  {
    id: '123',
    title: 'Workload Management Platform - Coimbatore',
    url: '/workload-management-platform',
    category: 'Security',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 154,
    conversions: 23,
    conversionRate: 15.4,
    status: 'active',
  },
  {
    id: '124',
    title: 'Compliance Dashboard - Bengaluru',
    url: '/compliance-dashboard',
    category: 'Security',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 154,
    conversions: 26,
    conversionRate: 17.1,
    status: 'active',
  },
  {
    id: '125',
    title: 'Project Cost Tracking - Delhi',
    url: '/project-cost-tracking',
    category: 'Time Tracking',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 372,
    conversions: 24,
    conversionRate: 6.7,
    status: 'active',
  },
  {
    id: '126',
    title: 'Employee Scheduling - Hyderabad',
    url: '/employee-scheduling',
    category: 'Monitoring',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 349,
    conversions: 48,
    conversionRate: 13.9,
    status: 'active',
  },
  {
    id: '127',
    title: 'Screen Recording Monitoring - Kochi',
    url: '/screen-recording-monitoring',
    category: 'Monitoring',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 223,
    conversions: 20,
    conversionRate: 9.1,
    status: 'active',
  },
  {
    id: '128',
    title: 'Productivity Trends Analysis - Chennai',
    url: '/productivity-trends-analysis',
    category: 'Time Tracking',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 207,
    conversions: 21,
    conversionRate: 10.6,
    status: 'active',
  },
  {
    id: '129',
    title: 'Task Management Integration - Gurugram',
    url: '/task-management-integration',
    category: 'Security',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 100,
    conversions: 17,
    conversionRate: 17.5,
    status: 'active',
  },
  {
    id: '130',
    title: 'Budget Allocation Tools - Bengaluru',
    url: '/budget-allocation-tools',
    category: 'Monitoring',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 256,
    conversions: 44,
    conversionRate: 17.3,
    status: 'active',
  },
  {
    id: '131',
    title: 'Leave Absence Management - Kochi',
    url: '/leave-absence-management',
    category: 'Monitoring',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 322,
    conversions: 32,
    conversionRate: 10.2,
    status: 'active',
  },
  {
    id: '132',
    title: 'Keystroke Monitoring - Chennai',
    url: '/keystroke-monitoring',
    category: 'Monitoring',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 409,
    conversions: 71,
    conversionRate: 17.4,
    status: 'active',
  },
  {
    id: '133',
    title: 'Efficiency Metrics Dashboard - Vizag',
    url: '/efficiency-metrics-dashboard',
    category: 'Analytics',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 245,
    conversions: 36,
    conversionRate: 15.0,
    status: 'active',
  },
  {
    id: '134',
    title: 'Distributed Team Coordination - Chennai',
    url: '/distributed-team-coordination',
    category: 'Analytics',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 214,
    conversions: 10,
    conversionRate: 5.0,
    status: 'active',
  },
  {
    id: '135',
    title: 'Data Privacy Encryption - Vijayawada',
    url: '/data-privacy-encryption',
    category: 'Analytics',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 330,
    conversions: 41,
    conversionRate: 12.7,
    status: 'active',
  },
  {
    id: '136',
    title: 'Multi Project Invoicing - Mumbai',
    url: '/multi-project-invoicing',
    category: 'Monitoring',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 338,
    conversions: 42,
    conversionRate: 12.7,
    status: 'active',
  },
  {
    id: '137',
    title: 'Shift Planning Suite - Gurugram',
    url: '/shift-planning-suite',
    category: 'Monitoring',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 224,
    conversions: 18,
    conversionRate: 8.3,
    status: 'active',
  },
  {
    id: '138',
    title: 'Website App Usage Tracking - Hyderabad',
    url: '/website-app-usage-tracking',
    category: 'Security',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 230,
    conversions: 25,
    conversionRate: 11.2,
    status: 'active',
  },
  {
    id: '139',
    title: 'Roi Calculation Engine - Noida',
    url: '/roi-calculation-engine',
    category: 'Analytics',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 188,
    conversions: 32,
    conversionRate: 17.2,
    status: 'active',
  },
  {
    id: '140',
    title: 'Cross Team Collaboration Hub - Kolkata',
    url: '/cross-team-collaboration-hub',
    category: 'Security',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 230,
    conversions: 36,
    conversionRate: 15.8,
    status: 'active',
  },
  {
    id: '141',
    title: 'Time Tracking Pro Us - Mumbai',
    url: '/time-tracking-pro-us',
    category: 'Time Tracking',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 305,
    conversions: 35,
    conversionRate: 11.8,
    status: 'active',
  },
  {
    id: '142',
    title: 'Employee Monitoring Enterprise - Noida',
    url: '/employee-monitoring-enterprise',
    category: 'Time Tracking',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 165,
    conversions: 9,
    conversionRate: 5.5,
    status: 'active',
  },
  {
    id: '143',
    title: 'Productivity Analytics Dashboard - Vizag',
    url: '/productivity-analytics-dashboard',
    category: 'Monitoring',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 347,
    conversions: 60,
    conversionRate: 17.5,
    status: 'active',
  },
  {
    id: '144',
    title: 'Remote Team Coordination - Pune',
    url: '/remote-team-coordination',
    category: 'Security',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 122,
    conversions: 15,
    conversionRate: 12.8,
    status: 'active',
  },
  {
    id: '145',
    title: 'Security Compliance Suite - Bengaluru',
    url: '/security-compliance-suite',
    category: 'Security',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 267,
    conversions: 26,
    conversionRate: 10.0,
    status: 'active',
  },
  {
    id: '146',
    title: 'Project Billing Integration - Coimbatore',
    url: '/project-billing-integration',
    category: 'Analytics',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 269,
    conversions: 36,
    conversionRate: 13.7,
    status: 'active',
  },
  {
    id: '147',
    title: 'Advanced Time Reports - Delhi',
    url: '/advanced-time-reports',
    category: 'Time Tracking',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 369,
    conversions: 32,
    conversionRate: 8.7,
    status: 'active',
  },
  {
    id: '148',
    title: 'Attendance Management System - Hyderabad',
    url: '/attendance-management-system',
    category: 'Analytics',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 347,
    conversions: 33,
    conversionRate: 9.7,
    status: 'active',
  },
  {
    id: '149',
    title: 'Geolocation Tracking - Ahmedabad',
    url: '/geolocation-tracking',
    category: 'Time Tracking',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 270,
    conversions: 41,
    conversionRate: 15.2,
    status: 'active',
  },
  {
    id: '150',
    title: 'Realtime Activity Dashboard - Chennai',
    url: '/realtime-activity-dashboard',
    category: 'Security',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 139,
    conversions: 19,
    conversionRate: 14.2,
    status: 'active',
  },
  {
    id: '151',
    title: 'Payroll Integration Suite - Delhi',
    url: '/payroll-integration-suite',
    category: 'Time Tracking',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 285,
    conversions: 27,
    conversionRate: 9.7,
    status: 'active',
  },
  {
    id: '152',
    title: 'Team Performance Insights - Bengaluru',
    url: '/team-performance-insights',
    category: 'Security',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 198,
    conversions: 26,
    conversionRate: 13.5,
    status: 'active',
  },
  {
    id: '153',
    title: 'Workload Management Platform - Hyderabad',
    url: '/workload-management-platform',
    category: 'Analytics',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 425,
    conversions: 65,
    conversionRate: 15.5,
    status: 'active',
  },
  {
    id: '154',
    title: 'Compliance Dashboard - Vijayawada',
    url: '/compliance-dashboard',
    category: 'Analytics',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 373,
    conversions: 42,
    conversionRate: 11.4,
    status: 'active',
  },
  {
    id: '155',
    title: 'Project Cost Tracking - Ahmedabad',
    url: '/project-cost-tracking',
    category: 'Monitoring',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 468,
    conversions: 72,
    conversionRate: 15.5,
    status: 'active',
  },
  {
    id: '156',
    title: 'Employee Scheduling - Hyderabad',
    url: '/employee-scheduling',
    category: 'Time Tracking',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 426,
    conversions: 39,
    conversionRate: 9.3,
    status: 'active',
  },
  {
    id: '157',
    title: 'Screen Recording Monitoring - Mumbai',
    url: '/screen-recording-monitoring',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 463,
    conversions: 47,
    conversionRate: 10.2,
    status: 'active',
  },
  {
    id: '158',
    title: 'Productivity Trends Analysis - Vizag',
    url: '/productivity-trends-analysis',
    category: 'Analytics',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 472,
    conversions: 48,
    conversionRate: 10.2,
    status: 'active',
  },
  {
    id: '159',
    title: 'Task Management Integration - Noida',
    url: '/task-management-integration',
    category: 'Analytics',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 411,
    conversions: 42,
    conversionRate: 10.3,
    status: 'active',
  },
  {
    id: '160',
    title: 'Budget Allocation Tools - Kochi',
    url: '/budget-allocation-tools',
    category: 'Monitoring',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 272,
    conversions: 44,
    conversionRate: 16.2,
    status: 'active',
  },
  {
    id: '161',
    title: 'Leave Absence Management - Bengaluru',
    url: '/leave-absence-management',
    category: 'Security',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 470,
    conversions: 49,
    conversionRate: 10.6,
    status: 'active',
  },
  {
    id: '162',
    title: 'Keystroke Monitoring - Kochi',
    url: '/keystroke-monitoring',
    category: 'Monitoring',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 286,
    conversions: 49,
    conversionRate: 17.2,
    status: 'active',
  },
  {
    id: '163',
    title: 'Efficiency Metrics Dashboard - Vizag',
    url: '/efficiency-metrics-dashboard',
    category: 'Analytics',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 107,
    conversions: 12,
    conversionRate: 11.7,
    status: 'active',
  },
  {
    id: '164',
    title: 'Distributed Team Coordination - Coimbatore',
    url: '/distributed-team-coordination',
    category: 'Time Tracking',
    tags: ['Coimbatore', 'Geo-Targeted'],
    leads: 320,
    conversions: 18,
    conversionRate: 5.9,
    status: 'active',
  },
  {
    id: '165',
    title: 'Data Privacy Encryption - Kolkata',
    url: '/data-privacy-encryption',
    category: 'Analytics',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 424,
    conversions: 59,
    conversionRate: 14.0,
    status: 'active',
  },
  {
    id: '166',
    title: 'Multi Project Invoicing - Noida',
    url: '/multi-project-invoicing',
    category: 'Analytics',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 497,
    conversions: 33,
    conversionRate: 6.8,
    status: 'active',
  },
  {
    id: '167',
    title: 'Shift Planning Suite - Delhi',
    url: '/shift-planning-suite',
    category: 'Monitoring',
    tags: ['Delhi', 'Geo-Targeted'],
    leads: 218,
    conversions: 38,
    conversionRate: 17.6,
    status: 'active',
  },
  {
    id: '168',
    title: 'Website App Usage Tracking - Gurugram',
    url: '/website-app-usage-tracking',
    category: 'Security',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 343,
    conversions: 36,
    conversionRate: 10.6,
    status: 'active',
  },
  {
    id: '169',
    title: 'Roi Calculation Engine - Vijayawada',
    url: '/roi-calculation-engine',
    category: 'Monitoring',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 500,
    conversions: 36,
    conversionRate: 7.2,
    status: 'active',
  },
  {
    id: '170',
    title: 'Cross Team Collaboration Hub - Hyderabad',
    url: '/cross-team-collaboration-hub',
    category: 'Time Tracking',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 109,
    conversions: 9,
    conversionRate: 8.6,
    status: 'active',
  },
  {
    id: '171',
    title: 'Time Tracking Pro Us - Kochi',
    url: '/time-tracking-pro-us',
    category: 'Analytics',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 379,
    conversions: 64,
    conversionRate: 16.9,
    status: 'active',
  },
  {
    id: '172',
    title: 'Employee Monitoring Enterprise - Kolkata',
    url: '/employee-monitoring-enterprise',
    category: 'Security',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 304,
    conversions: 41,
    conversionRate: 13.8,
    status: 'active',
  },
  {
    id: '173',
    title: 'Productivity Analytics Dashboard - Vizag',
    url: '/productivity-analytics-dashboard',
    category: 'Analytics',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 287,
    conversions: 23,
    conversionRate: 8.3,
    status: 'active',
  },
  {
    id: '174',
    title: 'Remote Team Coordination - Kochi',
    url: '/remote-team-coordination',
    category: 'Analytics',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 196,
    conversions: 28,
    conversionRate: 14.5,
    status: 'active',
  },
  {
    id: '175',
    title: 'Security Compliance Suite - Pune',
    url: '/security-compliance-suite',
    category: 'Time Tracking',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 382,
    conversions: 19,
    conversionRate: 5.1,
    status: 'active',
  },
  {
    id: '176',
    title: 'Project Billing Integration - Gurugram',
    url: '/project-billing-integration',
    category: 'Time Tracking',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 237,
    conversions: 26,
    conversionRate: 11.3,
    status: 'active',
  },
  {
    id: '177',
    title: 'Advanced Time Reports - Pune',
    url: '/advanced-time-reports',
    category: 'Security',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 339,
    conversions: 24,
    conversionRate: 7.1,
    status: 'active',
  },
  {
    id: '178',
    title: 'Attendance Management System - Kolkata',
    url: '/attendance-management-system',
    category: 'Time Tracking',
    tags: ['Kolkata', 'Geo-Targeted'],
    leads: 489,
    conversions: 40,
    conversionRate: 8.3,
    status: 'active',
  },
  {
    id: '179',
    title: 'Geolocation Tracking - Kochi',
    url: '/geolocation-tracking',
    category: 'Security',
    tags: ['Kochi', 'Geo-Targeted'],
    leads: 353,
    conversions: 58,
    conversionRate: 16.7,
    status: 'active',
  },
  {
    id: '180',
    title: 'Realtime Activity Dashboard - Gurugram',
    url: '/realtime-activity-dashboard',
    category: 'Monitoring',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 235,
    conversions: 30,
    conversionRate: 12.9,
    status: 'active',
  },
  {
    id: '181',
    title: 'Payroll Integration Suite - Chennai',
    url: '/payroll-integration-suite',
    category: 'Monitoring',
    tags: ['Chennai', 'Geo-Targeted'],
    leads: 254,
    conversions: 23,
    conversionRate: 9.4,
    status: 'active',
  },
  {
    id: '182',
    title: 'Team Performance Insights - Gurugram',
    url: '/team-performance-insights',
    category: 'Time Tracking',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 313,
    conversions: 45,
    conversionRate: 14.6,
    status: 'active',
  },
  {
    id: '183',
    title: 'Workload Management Platform - Pune',
    url: '/workload-management-platform',
    category: 'Analytics',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 419,
    conversions: 66,
    conversionRate: 15.8,
    status: 'active',
  },
  {
    id: '184',
    title: 'Compliance Dashboard - Bengaluru',
    url: '/compliance-dashboard',
    category: 'Monitoring',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 369,
    conversions: 38,
    conversionRate: 10.5,
    status: 'active',
  },
  {
    id: '185',
    title: 'Project Cost Tracking - Ahmedabad',
    url: '/project-cost-tracking',
    category: 'Security',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 210,
    conversions: 24,
    conversionRate: 11.7,
    status: 'active',
  },
  {
    id: '186',
    title: 'Employee Scheduling - Vizag',
    url: '/employee-scheduling',
    category: 'Analytics',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 283,
    conversions: 32,
    conversionRate: 11.6,
    status: 'active',
  },
  {
    id: '187',
    title: 'Screen Recording Monitoring - Ahmedabad',
    url: '/screen-recording-monitoring',
    category: 'Analytics',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 396,
    conversions: 54,
    conversionRate: 13.8,
    status: 'active',
  },
  {
    id: '188',
    title: 'Productivity Trends Analysis - Gurugram',
    url: '/productivity-trends-analysis',
    category: 'Analytics',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 469,
    conversions: 35,
    conversionRate: 7.5,
    status: 'active',
  },
  {
    id: '189',
    title: 'Task Management Integration - Vizag',
    url: '/task-management-integration',
    category: 'Security',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 318,
    conversions: 20,
    conversionRate: 6.5,
    status: 'active',
  },
  {
    id: '190',
    title: 'Budget Allocation Tools - Hyderabad',
    url: '/budget-allocation-tools',
    category: 'Time Tracking',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 417,
    conversions: 67,
    conversionRate: 16.2,
    status: 'active',
  },
  {
    id: '191',
    title: 'Leave Absence Management - Noida',
    url: '/leave-absence-management',
    category: 'Security',
    tags: ['Noida', 'Geo-Targeted'],
    leads: 315,
    conversions: 16,
    conversionRate: 5.2,
    status: 'active',
  },
  {
    id: '192',
    title: 'Keystroke Monitoring - Mumbai',
    url: '/keystroke-monitoring',
    category: 'Analytics',
    tags: ['Mumbai', 'Geo-Targeted'],
    leads: 283,
    conversions: 44,
    conversionRate: 15.7,
    status: 'active',
  },
  {
    id: '193',
    title: 'Efficiency Metrics Dashboard - Bengaluru',
    url: '/efficiency-metrics-dashboard',
    category: 'Analytics',
    tags: ['Bengaluru', 'Geo-Targeted'],
    leads: 185,
    conversions: 23,
    conversionRate: 12.5,
    status: 'active',
  },
  {
    id: '194',
    title: 'Distributed Team Coordination - Gurugram',
    url: '/distributed-team-coordination',
    category: 'Monitoring',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 448,
    conversions: 59,
    conversionRate: 13.3,
    status: 'active',
  },
  {
    id: '195',
    title: 'Data Privacy Encryption - Hyderabad',
    url: '/data-privacy-encryption',
    category: 'Analytics',
    tags: ['Hyderabad', 'Geo-Targeted'],
    leads: 184,
    conversions: 17,
    conversionRate: 9.4,
    status: 'active',
  },
  {
    id: '196',
    title: 'Multi Project Invoicing - Pune',
    url: '/multi-project-invoicing',
    category: 'Time Tracking',
    tags: ['Pune', 'Geo-Targeted'],
    leads: 208,
    conversions: 34,
    conversionRate: 16.7,
    status: 'active',
  },
  {
    id: '197',
    title: 'Shift Planning Suite - Vijayawada',
    url: '/shift-planning-suite',
    category: 'Time Tracking',
    tags: ['Vijayawada', 'Geo-Targeted'],
    leads: 495,
    conversions: 69,
    conversionRate: 14.0,
    status: 'active',
  },
  {
    id: '198',
    title: 'Website App Usage Tracking - Gurugram',
    url: '/website-app-usage-tracking',
    category: 'Security',
    tags: ['Gurugram', 'Geo-Targeted'],
    leads: 478,
    conversions: 44,
    conversionRate: 9.4,
    status: 'active',
  },
  {
    id: '199',
    title: 'Roi Calculation Engine - Vizag',
    url: '/roi-calculation-engine',
    category: 'Monitoring',
    tags: ['Vizag', 'Geo-Targeted'],
    leads: 369,
    conversions: 22,
    conversionRate: 6.1,
    status: 'active',
  },
  {
    id: '200',
    title: 'Cross Team Collaboration Hub - Ahmedabad',
    url: '/cross-team-collaboration-hub',
    category: 'Time Tracking',
    tags: ['Ahmedabad', 'Geo-Targeted'],
    leads: 216,
    conversions: 22,
    conversionRate: 10.6,
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

export default function MarketingPage() {
  const [pages, setPages] = useState<MarketingPage[]>([]);
  const [stats, setStats] = useState<MarketingStats>({
    totalPages: 0,
    activePages: 0,
    totalLeads: 0,
    totalConversions: 0,
    avgConversionRate: 0,
    totalReach: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [copied, setCopied] = useState<string | null>(null);
  const [qrModal, setQrModal] = useState<{ isOpen: boolean; pageId: string | null; url: string }>({
    isOpen: false,
    pageId: null,
    url: '',
  });

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setPages(mockMarketingPages);

      const activeCount = mockMarketingPages.filter(p => p.status === 'active').length;
      const totalLeads = mockMarketingPages.reduce((sum, p) => sum + p.leads, 0);
      const totalConversions = mockMarketingPages.reduce((sum, p) => sum + p.conversions, 0);
      const avgConversionRate = mockMarketingPages.reduce((sum, p) => sum + p.conversionRate, 0) / mockMarketingPages.length;

      setStats({
        totalPages: mockMarketingPages.length,
        activePages: activeCount,
        totalLeads,
        totalConversions,
        avgConversionRate: parseFloat(avgConversionRate.toFixed(1)),
        totalReach: totalLeads,
      });

      setLoading(false);
    }, 500);
  }, []);

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
            <h1 className="text-xl font-semibold text-gray-900">Marketing Pages</h1>
            <p className="text-gray-500 mt-0.5 text-sm">Directory of all marketing landing pages and campaigns</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Pages', value: stats.totalPages, icon: BarChart3, color: 'from-blue-400 to-blue-600' },
            { label: 'Active Pages', value: stats.activePages, icon: Zap, color: 'from-green-400 to-green-600' },
            { label: 'Total Leads', value: stats.totalLeads.toLocaleString(), icon: Users, color: 'from-purple-400 to-purple-600' },
            { label: 'Avg Conversion', value: `${stats.avgConversionRate}%`, icon: TrendingUp, color: 'from-orange-400 to-orange-600' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-9 h-9 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
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
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/marketing${page.url}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all border border-blue-200"
                        title="Share on LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/marketing${page.url}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all border border-blue-200"
                        title="Share on Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/marketing${page.url}`)}&text=${encodeURIComponent(page.title)}`}
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
                          url: `${window.location.origin}/marketing${page.url}`
                        })}
                        className="p-1.5 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-600 transition-all border border-purple-200"
                        title="Generate QR Code"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={`/marketing${page.url}`}
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

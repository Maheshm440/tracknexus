import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MarketingPageContent from './page-content';

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
  description: string;
  createdDate: string;
  updatedDate: string;
  budget: number;
  roi: number;
  pageViews: number;
  engagementRate: number;
  clickThroughRate: number;
  costPerLead: number;
  costPerConversion: number;
  trafficSource: string;
  targetAudience: string;
  campaignDuration: string;
  performanceTrend: 'up' | 'down' | 'stable';
  notes: string;
}

const mockMarketingPages: MarketingPage[] = [
  { id: '1', title: 'Time Tracking Pro - US', url: '/time-tracking-pro-us', category: 'Time & Attendance', tags: ['Geo-Targeted', 'US Market'], leads: 342, conversions: 28, conversionRate: 8.2, status: 'active', description: 'Time Tracking Pro - US campaign targeting IT Departments via Organic traffic', createdDate: '2025-09-14', updatedDate: '2026-01-18', budget: 18750, roi: 73, pageViews: 9114, engagementRate: 16.2, clickThroughRate: 3.45, costPerLead: 54.82, costPerConversion: 669.64, trafficSource: 'Organic', targetAudience: 'IT Departments', campaignDuration: '6 months', performanceTrend: 'up', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '2', title: 'Employee Monitoring - Enterprise', url: '/employee-monitoring-enterprise', category: 'Monitoring', tags: ['B2B', 'Enterprise'], leads: 156, conversions: 18, conversionRate: 11.5, status: 'active', description: 'Employee Monitoring - Enterprise campaign targeting HR Professionals via Referral traffic', createdDate: '2025-08-12', updatedDate: '2025-10-18', budget: 21144, roi: 89, pageViews: 5148, engagementRate: 15.3, clickThroughRate: 6.23, costPerLead: 135.54, costPerConversion: 1174.67, trafficSource: 'Referral', targetAudience: 'HR Professionals', campaignDuration: '2 months', performanceTrend: 'stable', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '3', title: 'Productivity Analytics Dashboard', url: '/productivity-analytics-dashboard', category: 'Analytics', tags: ['Performance', 'SMB Focus'], leads: 267, conversions: 35, conversionRate: 13.1, status: 'active', description: 'Productivity Analytics Dashboard campaign targeting Finance Teams via Social Media traffic', createdDate: '2025-10-05', updatedDate: '2025-12-28', budget: 12512, roi: 130, pageViews: 8010, engagementRate: 12.6, clickThroughRate: 1.69, costPerLead: 46.87, costPerConversion: 357.49, trafficSource: 'Social Media', targetAudience: 'Finance Teams', campaignDuration: '6 months', performanceTrend: 'up', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '4', title: 'Remote Team Coordination', url: '/remote-team-coordination', category: 'Team Management', tags: ['Remote', 'Enterprise'], leads: 289, conversions: 39, conversionRate: 13.5, status: 'active', description: 'Remote Team Coordination campaign targeting Remote Workers via Paid Search traffic', createdDate: '2025-11-10', updatedDate: '2026-01-12', budget: 16234, roi: 118, pageViews: 9174, engagementRate: 18.1, clickThroughRate: 2.34, costPerLead: 56.15, costPerConversion: 416.26, trafficSource: 'Paid Search', targetAudience: 'Remote Workers', campaignDuration: '3 months', performanceTrend: 'up', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '5', title: 'Security & Compliance Suite', url: '/security-compliance-suite', category: 'Security', tags: ['Compliance', 'Enterprise'], leads: 201, conversions: 24, conversionRate: 11.9, status: 'active', description: 'Security & Compliance Suite campaign targeting Enterprise Teams via Email traffic', createdDate: '2025-10-15', updatedDate: '2025-12-05', budget: 22847, roi: 95, pageViews: 6030, engagementRate: 11.8, clickThroughRate: 4.89, costPerLead: 113.67, costPerConversion: 952.79, trafficSource: 'Email', targetAudience: 'Enterprise Teams', campaignDuration: '9 months', performanceTrend: 'stable', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '6', title: 'Project Billing Integration', url: '/project-billing-integration', category: 'Billing', tags: ['Accounting', 'PSA'], leads: 124, conversions: 22, conversionRate: 17.7, status: 'active', description: 'Project Billing Integration campaign targeting Finance Teams via Direct traffic', createdDate: '2025-09-22', updatedDate: '2026-01-05', budget: 8956, roi: 142, pageViews: 3844, engagementRate: 22.1, clickThroughRate: 5.12, costPerLead: 72.23, costPerConversion: 407.09, trafficSource: 'Direct', targetAudience: 'Finance Teams', campaignDuration: '1 month', performanceTrend: 'down', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '7', title: 'Advanced Time Reports', url: '/advanced-time-reports', category: 'Reports', tags: ['Performance', 'B2B'], leads: 278, conversions: 35, conversionRate: 12.6, status: 'active', description: 'Advanced Time Reports campaign targeting Service Companies via Email traffic', createdDate: '2025-10-28', updatedDate: '2026-01-15', budget: 15623, roi: 124, pageViews: 8890, engagementRate: 14.7, clickThroughRate: 3.78, costPerLead: 56.16, costPerConversion: 446.37, trafficSource: 'Email', targetAudience: 'Service Companies', campaignDuration: '3 months', performanceTrend: 'stable', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '8', title: 'Attendance Management System', url: '/attendance-management-system', category: 'Time & Attendance', tags: ['Enterprise', 'Compliance'], leads: 203, conversions: 24, conversionRate: 11.8, status: 'active', description: 'Attendance Management System campaign targeting HR Professionals via Organic traffic', createdDate: '2025-08-30', updatedDate: '2025-11-22', budget: 19234, roi: 98, pageViews: 5896, engagementRate: 13.9, clickThroughRate: 2.41, costPerLead: 94.69, costPerConversion: 801.42, trafficSource: 'Organic', targetAudience: 'HR Professionals', campaignDuration: '12 months', performanceTrend: 'up', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '9', title: 'Geolocation Tracking', url: '/geolocation-tracking', category: 'Monitoring', tags: ['Geo-Targeted', 'Enterprise'], leads: 167, conversions: 19, conversionRate: 11.4, status: 'active', description: 'Geolocation Tracking campaign targeting SMB Operations via Paid Search traffic', createdDate: '2025-09-05', updatedDate: '2025-10-30', budget: 27891, roi: 114, pageViews: 5008, engagementRate: 19.3, clickThroughRate: 1.56, costPerLead: 167.07, costPerConversion: 1468.00, trafficSource: 'Paid Search', targetAudience: 'SMB Operations', campaignDuration: '2 months', performanceTrend: 'down', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '10', title: 'Real-time Activity Dashboard', url: '/realtime-activity-dashboard', category: 'Analytics', tags: ['Performance', 'SMB Focus'], leads: 245, conversions: 32, conversionRate: 13.1, status: 'active', description: 'Real-time Activity Dashboard campaign targeting Remote Workers via Social Media traffic', createdDate: '2025-11-12', updatedDate: '2026-01-10', budget: 14578, roi: 117, pageViews: 7840, engagementRate: 17.2, clickThroughRate: 2.89, costPerLead: 59.51, costPerConversion: 455.56, trafficSource: 'Social Media', targetAudience: 'Remote Workers', campaignDuration: '6 months', performanceTrend: 'up', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '11', title: 'Payroll Integration Suite', url: '/payroll-integration-suite', category: 'Billing', tags: ['Accounting', 'Enterprise'], leads: 156, conversions: 18, conversionRate: 11.5, status: 'active', description: 'Payroll Integration Suite campaign targeting Enterprise Teams via Referral traffic', createdDate: '2025-10-08', updatedDate: '2025-12-10', budget: 23456, roi: 92, pageViews: 4992, engagementRate: 20.3, clickThroughRate: 5.67, costPerLead: 150.36, costPerConversion: 1303.11, trafficSource: 'Referral', targetAudience: 'Enterprise Teams', campaignDuration: '9 months', performanceTrend: 'stable', notes: 'Campaign performing well with consistent conversion rates' },
  { id: '12', title: 'Team Performance Insights', url: '/team-performance-insights', category: 'Analytics', tags: ['Performance', 'B2B'], leads: 198, conversions: 26, conversionRate: 13.1, status: 'active', description: 'Team Performance Insights campaign targeting IT Departments via Organic traffic', createdDate: '2025-09-18', updatedDate: '2025-12-22', budget: 9876, roi: 156, pageViews: 6336, engagementRate: 9.8, clickThroughRate: 3.34, costPerLead: 49.88, costPerConversion: 379.85, trafficSource: 'Organic', targetAudience: 'IT Departments', campaignDuration: '3 months', performanceTrend: 'up', notes: 'Campaign performing well with consistent conversion rates' },
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
};

export default async function MarketingPageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Convert slug back to URL format (e.g., "time-tracking-pro-us" -> "/time-tracking-pro-us")
  const searchUrl = '/' + slug;
  const page = mockMarketingPages.find(p => p.url === searchUrl);

  if (!page) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-6">The marketing page you're looking for doesn't exist.</p>
          <Link
            href="/dashboard/marketing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketing
          </Link>
        </div>
      </div>
    );
  }

  return <MarketingPageContent page={page} />;
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ChevronRight, ChevronDown, Star, Zap, Globe, CheckCircle2, Shield, Clock,
  Settings, BarChart3, Users, ArrowRight, Sparkles, Gauge, FileCheck,
  TrendingUp, Building2, Mail, MapPin, Monitor, Briefcase, Target,
  LineChart, Lock, CreditCard, CalendarDays, PieChart, Layers
} from 'lucide-react';
import { ContactPopup } from '@/components/contact-popup';
import { HeroContactForm } from '@/components/hero-contact-form';

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
  heroHeadline?: string;
  heroSubheadline?: string;
  heroImage?: string;
  keyFeatures?: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
  }>;
  valueProposition?: Array<{
    metric: string;
    value: string;
    description: string;
  }>;
  caseStudies?: Array<{
    id: string;
    company: string;
    location: string;
    challenge: string;
    solution: string;
    result: string;
    image: string;
  }>;
  testimonials?: Array<{
    id: string;
    author: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    image: string;
  }>;
  faqs?: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  industryStats?: Array<{
    label: string;
    value: string;
  }>;
  ctaText?: string;
  ctaButtonText?: string;
  location?: string;
  officeAddress?: string;
  officeEmail?: string;
  mapLat?: number;
  mapLng?: number;
}

// ── Local image pools — real professional workplace photos only ──
// All sourced from /images/blog/ — verified real photography, no illustrations
// Pool 1: "Built For" section (analytics, dashboards, productivity)
const builtForImages = [
  '/images/blog/01-productivity-tracker.jpg',
  '/images/blog/03-productivity-tracking-analytics.jpg',
  '/images/blog/05-employee-productivity-software.jpg',
  '/images/blog/06-employee-monitoring-dashboard.jpg',
  '/images/blog/09-work-analytics-dashboard.jpg',
  '/images/blog/11-project-time-tracking.jpg',
  '/images/blog/20-performance-management-analytics.jpg',
  '/images/blog/22-team-productivity-software.jpg',
  '/images/blog/27-roi-tracking-analytics.jpg',
  '/images/blog/29-business-intelligence-dashboard.jpg',
  '/images/blog/28-workforce-efficiency-metrics.jpg',
  '/images/blog/04-productivity-tracking-tools.jpg',
];

// Pool 2: "How It Works" section (monitoring, workflows, remote work)
const howItWorksImages = [
  '/images/blog/02-automatic-time-tracking.jpg',
  '/images/blog/07-workforce-monitoring-software.jpg',
  '/images/blog/08-activity-monitoring-reports.jpg',
  '/images/blog/10-screen-monitoring-software.jpg',
  '/images/blog/14-remote-team-management.jpg',
  '/images/blog/16-work-from-home-productivity.jpg',
  '/images/blog/18-time-management-tools.jpg',
  '/images/blog/23-productivity-tools-teams.jpg',
  '/images/blog/30-web-development-workflow.jpg',
  '/images/blog/33-remote-work-management.jpg',
  '/images/blog/15-distributed-team-productivity.jpg',
  '/images/blog/19-employee-accountability-trust.jpg',
];

// Pool 3: "Why Choose" section (teams, collaboration, business meetings)
const whyChooseImages = [
  '/images/blog/13-team-collaboration-remote.jpg',
  '/images/blog/17-office-productivity-team.jpg',
  '/images/blog/25-client-billing-accuracy.jpg',
  '/images/blog/26-project-profitability-analysis.jpg',
  '/images/blog/32-team-productivity-office.jpg',
  '/images/blog/34-business-team-meeting.jpg',
  '/images/blog/12-employee-tracking-software.jpg',
  '/images/blog/21-task-management-software.jpg',
  '/images/blog/31-automatic-tracking-system.jpg',
  '/images/blog/employee-monitoring-guide.jpg',
  '/images/blog/remote-work-productivity-tips.jpg',
  '/images/blog/time-tracking-best-practices.jpg',
];

// Each page gets a unique image per section using its numeric ID as index
function getPageImages(pageId: string) {
  const idx = (parseInt(pageId, 10) - 1) || 0;
  return {
    builtFor: builtForImages[idx % builtForImages.length],
    howItWorks: howItWorksImages[idx % howItWorksImages.length],
    whyChoose: whyChooseImages[idx % whyChooseImages.length],
  };
}

// ── Category Icon Map ──────────────────────────────────────────────
const categoryIcons: Record<string, React.ElementType> = {
  'Time & Attendance': Clock,
  'Monitoring': Monitor,
  'Analytics': LineChart,
  'Security': Lock,
  'Billing': CreditCard,
  'Team Management': Users,
  'Workforce Management': Building2,
  'Productivity': TrendingUp,
  'Reports': PieChart,
  'Integration': Layers,
};

// ── Get transformation cards per category ──────────────────────────
function getTransformationCards(category: string) {
  const cards: Record<string, Array<{ icon: React.ElementType; value: string; label: string }>> = {
    'Time & Attendance': [
      { icon: Gauge, value: '95%', label: 'Payroll Accuracy' },
      { icon: Zap, value: '80%', label: 'Faster Processing' },
      { icon: BarChart3, value: 'Real-time', label: 'Attendance Visibility' },
      { icon: FileCheck, value: '100%', label: 'Labor Compliance' },
    ],
    'Monitoring': [
      { icon: Gauge, value: '32%', label: 'Productivity Boost' },
      { icon: Zap, value: '24/7', label: 'Continuous Monitoring' },
      { icon: BarChart3, value: 'Real-time', label: 'Activity Tracking' },
      { icon: FileCheck, value: '100%', label: 'Data Protection' },
    ],
    'Analytics': [
      { icon: Gauge, value: '40%', label: 'Better Insights' },
      { icon: Zap, value: '60%', label: 'Faster Decisions' },
      { icon: BarChart3, value: 'AI-Powered', label: 'Predictions' },
      { icon: FileCheck, value: '100%', label: 'Data Accuracy' },
    ],
    'Security': [
      { icon: Gauge, value: 'Zero-Trust', label: 'Architecture' },
      { icon: Zap, value: '99.9%', label: 'Threat Detection' },
      { icon: BarChart3, value: 'Real-time', label: 'Monitoring' },
      { icon: FileCheck, value: '100%', label: 'Compliance' },
    ],
    'Billing': [
      { icon: Gauge, value: '40%', label: 'Faster Billing' },
      { icon: Zap, value: '95%', label: 'Revenue Capture' },
      { icon: BarChart3, value: 'Real-time', label: 'Profitability' },
      { icon: FileCheck, value: '100%', label: 'Invoice Accuracy' },
    ],
    'Team Management': [
      { icon: Gauge, value: '35%', label: 'Better Utilization' },
      { icon: Zap, value: '50%', label: 'Faster Onboarding' },
      { icon: BarChart3, value: 'Real-time', label: 'Team Insights' },
      { icon: FileCheck, value: '100%', label: 'Workload Balance' },
    ],
    'Workforce Management': [
      { icon: Gauge, value: '30%', label: 'Cost Reduction' },
      { icon: Zap, value: '60%', label: 'Schedule Efficiency' },
      { icon: BarChart3, value: 'Real-time', label: 'Workforce View' },
      { icon: FileCheck, value: '100%', label: 'Compliance Ready' },
    ],
    'Productivity': [
      { icon: Gauge, value: '32%', label: 'Output Increase' },
      { icon: Zap, value: '45%', label: 'Less Time Wasted' },
      { icon: BarChart3, value: 'AI-Driven', label: 'Optimization' },
      { icon: FileCheck, value: '100%', label: 'Goal Tracking' },
    ],
    'Reports': [
      { icon: Gauge, value: '80%', label: 'Time Saved' },
      { icon: Zap, value: 'Instant', label: 'Report Generation' },
      { icon: BarChart3, value: 'Custom', label: 'Dashboards' },
      { icon: FileCheck, value: '100%', label: 'Audit Ready' },
    ],
    'Integration': [
      { icon: Gauge, value: '100+', label: 'Connectors' },
      { icon: Zap, value: '50%', label: 'Less Manual Work' },
      { icon: BarChart3, value: 'Real-time', label: 'Data Sync' },
      { icon: FileCheck, value: '100%', label: 'Data Accuracy' },
    ],
  };
  return cards[category] || cards['Productivity'];
}

// ── Get "Why Choose" checklist items ───────────────────────────────
function getWhyChooseItems(category: string): string[] {
  const items: Record<string, string[]> = {
    'Time & Attendance': [
      'Automated time capture via desktop, mobile, and browser extensions',
      'Manager approval workflows with automated reminders',
      'Direct payroll integration reducing processing time by 80%',
      'GPS and geofencing for on-site attendance verification',
      'Overtime and break compliance tracking built-in',
    ],
    'Monitoring': [
      'Lightweight monitoring agents with customizable privacy settings',
      'AI-powered activity categorization and anomaly detection',
      'Real-time dashboards with productivity scoring',
      'Automated compliance reports and audit trails',
      'Cross-platform support for desktop, web, and mobile',
    ],
    'Analytics': [
      'Unified analytics aggregating data from multiple systems',
      'AI-powered trend detection and predictive insights',
      'Custom dashboards with drill-down capabilities',
      'Automated report generation and scheduled delivery',
      'Industry benchmarking and cross-team comparisons',
    ],
    'Security': [
      'Zero-trust architecture with continuous verification',
      'Automated threat detection and incident response',
      'SOC 2, GDPR, HIPAA, and ISO 27001 compliance',
      'Data loss prevention and access governance',
      'Real-time security monitoring and alert escalation',
    ],
    'Billing': [
      'Automatic capture of billable hours from time tracking',
      'One-click professional invoice generation',
      'Multi-currency support for global clients',
      'Real-time project profitability tracking',
      'Integration with accounting systems and payment platforms',
    ],
    'Team Management': [
      'Unified dashboard showing team workloads and availability',
      'Skill-based task assignment with AI recommendations',
      'Burnout prevention through workload monitoring',
      'Data-driven performance reviews and recognition',
      'Collaborative tools for distributed teams',
    ],
    'Workforce Management': [
      'Single platform for remote, hybrid, and on-site teams',
      'Intelligent scheduling based on skills and availability',
      'Automated labor law and overtime compliance',
      'Employee self-service for schedules and time-off requests',
      'Scalable from small teams to enterprise workforces',
    ],
    'Productivity': [
      'Smart activity categorization with customizable rules',
      'Peak performance period identification per team member',
      'Personal productivity dashboards for self-improvement',
      'Automated alerts for productivity pattern changes',
      'Industry benchmarking for competitive context',
    ],
    'Reports': [
      'Dozens of pre-built report templates ready to use',
      'Automated report generation on daily/weekly/monthly schedules',
      'Interactive dashboards with drill-down analysis',
      'Proactive alerts when metrics cross defined thresholds',
      'Export in PDF, Excel, and CSV for any stakeholder',
    ],
    'Integration': [
      '100+ pre-built connectors for popular business tools',
      'Secure OAuth and API key authentication',
      'No-code workflow builder for cross-system automation',
      'Real-time data synchronization and health monitoring',
      'REST APIs with comprehensive developer documentation',
    ],
  };
  return items[category] || [
    `Comprehensive ${category.toLowerCase()} capabilities built for enterprises`,
    'AI-powered automation that saves hours every week',
    'Real-time dashboards and actionable insights',
    'Enterprise-grade security and compliance',
    'Seamless integration with your existing tech stack',
  ];
}

// ── Get modules per category ───────────────────────────────────────
function getModules(category: string): Array<{ title: string; description: string; tags: string[]; icon: React.ElementType }> {
  const modules: Record<string, Array<{ title: string; description: string; tags: string[]; icon: React.ElementType }>> = {
    'Time & Attendance': [
      { title: 'Time Tracking', description: 'Automated time capture across desktop, mobile, and web with smart detection and manual entry support.', tags: ['Auto-Capture', 'Multi-Device', 'Smart Detection'], icon: Clock },
      { title: 'Attendance Management', description: 'GPS-verified attendance with geofencing, biometric support, and real-time presence tracking.', tags: ['GPS Tracking', 'Geofencing', 'Biometrics'], icon: MapPin },
      { title: 'Payroll Integration', description: 'Direct data flow to payroll systems with validation, overtime calculations, and compliance checks.', tags: ['Auto-Sync', 'Overtime Calc', 'Validation'], icon: CreditCard },
      { title: 'Leave Management', description: 'Self-service leave requests, approval workflows, balance tracking, and holiday calendar management.', tags: ['Self-Service', 'Approvals', 'Balance Tracking'], icon: CalendarDays },
      { title: 'Compliance Engine', description: 'Automated monitoring of labor laws, break requirements, overtime rules, and industry regulations.', tags: ['FLSA', 'Overtime Rules', 'Audit Trails'], icon: Shield },
      { title: 'Scheduling', description: 'Smart shift planning based on skills, availability, and demand with employee self-service swaps.', tags: ['Shift Planning', 'Smart Assign', 'Self-Service'], icon: Settings },
    ],
    'Monitoring': [
      { title: 'Activity Tracking', description: 'Real-time monitoring of application usage, website visits, and task activity across all devices.', tags: ['App Usage', 'Web Tracking', 'Real-time'], icon: Monitor },
      { title: 'Screen Monitoring', description: 'Configurable screenshot capture and screen recording with privacy-first settings.', tags: ['Screenshots', 'Recording', 'Privacy Controls'], icon: Layers },
      { title: 'Productivity Scoring', description: 'AI-powered productivity analysis with automatic activity categorization and trend detection.', tags: ['AI Scoring', 'Categorization', 'Trends'], icon: BarChart3 },
      { title: 'Security Monitoring', description: 'Anomaly detection, data access tracking, and insider threat prevention capabilities.', tags: ['Threat Detection', 'Access Logs', 'DLP'], icon: Shield },
      { title: 'Remote Work Tools', description: 'Visibility into distributed team activities with balanced privacy and accountability.', tags: ['Remote Teams', 'Privacy Balance', 'Accountability'], icon: Globe },
      { title: 'Compliance Reports', description: 'Automated audit trail generation, regulatory reports, and policy adherence tracking.', tags: ['Audit Trails', 'Regulatory', 'Policy Tracking'], icon: FileCheck },
    ],
    'Analytics': [
      { title: 'Custom Dashboards', description: 'Build personalized analytics views with drag-and-drop widgets and real-time data refresh.', tags: ['Drag & Drop', 'Real-time', 'Personalized'], icon: PieChart },
      { title: 'Predictive Analytics', description: 'AI-powered forecasting for resource needs, budget projections, and trend predictions.', tags: ['AI Forecasting', 'Trend Analysis', 'Predictions'], icon: TrendingUp },
      { title: 'Cross-Team Insights', description: 'Break down data silos with unified analytics spanning departments and projects.', tags: ['Unified View', 'Cross-Team', 'Benchmarks'], icon: Users },
      { title: 'Automated Reports', description: 'Scheduled report delivery to stakeholders with customizable templates and filters.', tags: ['Scheduling', 'Templates', 'Distribution'], icon: FileCheck },
      { title: 'ROI Tracking', description: 'Measure business impact with cost analysis, value realization, and performance KPIs.', tags: ['Cost Analysis', 'KPIs', 'Value Tracking'], icon: LineChart },
      { title: 'Data Integration', description: 'Connect multiple data sources through APIs for a unified analytics foundation.', tags: ['API Library', 'Data Sync', 'Unified Data'], icon: Layers },
    ],
    'Security': [
      { title: 'Access Control', description: 'Zero-trust access management with role-based permissions and continuous verification.', tags: ['Zero-Trust', 'RBAC', 'Verification'], icon: Lock },
      { title: 'Threat Detection', description: 'AI-powered monitoring that identifies anomalies and potential security incidents in real time.', tags: ['AI Detection', 'Anomalies', 'Real-time'], icon: Shield },
      { title: 'Compliance Management', description: 'Automated enforcement and reporting for SOC 2, GDPR, HIPAA, and ISO 27001.', tags: ['SOC 2', 'GDPR', 'HIPAA'], icon: FileCheck },
      { title: 'Incident Response', description: 'Automated response playbooks with escalation workflows and remediation tracking.', tags: ['Playbooks', 'Escalation', 'Remediation'], icon: Zap },
      { title: 'Data Protection', description: 'Data loss prevention with encryption, movement monitoring, and exposure alerts.', tags: ['DLP', 'Encryption', 'Monitoring'], icon: Lock },
      { title: 'Audit Management', description: 'Complete audit trails, entitlement reviews, and access governance capabilities.', tags: ['Audit Trails', 'Reviews', 'Governance'], icon: Settings },
    ],
    'Billing': [
      { title: 'Time-to-Invoice', description: 'Automatically transform tracked billable hours into professional invoices with one click.', tags: ['Auto-Generate', 'One-Click', 'Accurate'], icon: CreditCard },
      { title: 'Rate Management', description: 'Flexible rate cards for clients, projects, team members, and time periods.', tags: ['Custom Rates', 'Multi-tier', 'Flexible'], icon: Settings },
      { title: 'Project Profitability', description: 'Real-time budget tracking, cost analysis, and margin monitoring per project.', tags: ['Budget Tracking', 'Cost Analysis', 'Margins'], icon: LineChart },
      { title: 'Payment Tracking', description: 'Accounts receivable management with aging reports and automated payment reminders.', tags: ['AR Tracking', 'Reminders', 'Aging Reports'], icon: FileCheck },
      { title: 'Revenue Forecasting', description: 'Predict future revenue based on WIP, backlog, and historical billing patterns.', tags: ['WIP Analysis', 'Forecasting', 'Cash Flow'], icon: TrendingUp },
      { title: 'Multi-Currency', description: 'Support international clients with multi-currency billing, tax calculations, and compliance.', tags: ['Multi-Currency', 'Tax', 'Global'], icon: Globe },
    ],
    'Team Management': [
      { title: 'Team Dashboard', description: 'Unified view of all team members, workloads, availability, and current assignments.', tags: ['Overview', 'Workloads', 'Availability'], icon: Users },
      { title: 'Resource Allocation', description: 'AI-powered task assignment based on skills, capacity, and workload balance.', tags: ['AI Matching', 'Skills Matrix', 'Balance'], icon: Target },
      { title: 'Performance Tracking', description: 'Objective metrics for reviews, goal tracking, and top performer recognition.', tags: ['Reviews', 'Goals', 'Recognition'], icon: BarChart3 },
      { title: 'Collaboration Hub', description: 'Built-in communication, shared calendars, and project timelines for distributed teams.', tags: ['Communication', 'Calendars', 'Timelines'], icon: Briefcase },
      { title: 'Burnout Prevention', description: 'Automated workload monitoring with alerts for at-risk team members.', tags: ['Workload Monitor', 'Alerts', 'Wellness'], icon: Shield },
      { title: 'Onboarding', description: 'Streamlined new member setup with role templates and automated workflows.', tags: ['Templates', 'Automation', 'Quick Setup'], icon: Settings },
    ],
    'Workforce Management': [
      { title: 'Unified Platform', description: 'Manage remote, hybrid, and on-site employees from a single workforce management hub.', tags: ['All-in-One', 'Multi-Location', 'Unified'], icon: Building2 },
      { title: 'Smart Scheduling', description: 'AI-optimized schedules based on skills, availability, demand, and labor regulations.', tags: ['AI Scheduling', 'Demand-Based', 'Compliance'], icon: CalendarDays },
      { title: 'Attendance Automation', description: 'Eliminate manual timecards with automated tracking, break monitoring, and overtime alerts.', tags: ['Auto-Track', 'Break Monitor', 'OT Alerts'], icon: Clock },
      { title: 'Compliance Engine', description: 'Automated labor law compliance with alerts for overtime, breaks, and scheduling violations.', tags: ['Labor Laws', 'Violations', 'Alerts'], icon: Shield },
      { title: 'Employee Self-Service', description: 'Mobile-first portal for schedules, time-off requests, shift swaps, and pay information.', tags: ['Mobile App', 'Self-Service', 'Time-Off'], icon: Users },
      { title: 'Workforce Analytics', description: 'Productivity metrics, performance tracking, and strategic planning dashboards.', tags: ['Metrics', 'Planning', 'Strategy'], icon: BarChart3 },
    ],
    'Productivity': [
      { title: 'Activity Monitoring', description: 'Smart categorization of work activities as productive, neutral, or unproductive.', tags: ['Smart Categories', 'Auto-Classify', 'Custom Rules'], icon: Monitor },
      { title: 'Performance Dashboard', description: 'Real-time productivity scores across individuals, teams, and departments.', tags: ['Real-time', 'Team View', 'Individual'], icon: BarChart3 },
      { title: 'Peak Hours Analysis', description: 'Identify high-performance periods to schedule critical work at optimal times.', tags: ['Peak Detection', 'Scheduling', 'Optimization'], icon: TrendingUp },
      { title: 'Distraction Analysis', description: 'Quantify unproductive activities and provide targeted recommendations to reduce them.', tags: ['Time Wasters', 'Recommendations', 'Reduction'], icon: Target },
      { title: 'Goal Tracking', description: 'Set, monitor, and celebrate productivity goals for individuals and teams.', tags: ['Goal Setting', 'Progress', 'Achievements'], icon: Sparkles },
      { title: 'Benchmarking', description: 'Compare productivity across teams, departments, and industry standards.', tags: ['Cross-Team', 'Industry', 'Comparisons'], icon: LineChart },
    ],
    'Reports': [
      { title: 'Report Builder', description: 'Create custom reports with drag-and-drop builders, filters, and visualization options.', tags: ['Drag & Drop', 'Custom', 'Visual'], icon: PieChart },
      { title: 'Automated Delivery', description: 'Schedule reports for automatic generation and distribution to stakeholders.', tags: ['Scheduling', 'Distribution', 'Automated'], icon: Zap },
      { title: 'Interactive Dashboards', description: 'Drill-down from summaries to granular details with interactive chart capabilities.', tags: ['Drill-Down', 'Interactive', 'Charts'], icon: BarChart3 },
      { title: 'Compliance Reports', description: 'Audit-ready reports with complete documentation for regulatory reviews.', tags: ['Audit Ready', 'Regulatory', 'Documentation'], icon: FileCheck },
      { title: 'Alert System', description: 'Proactive notifications when metrics cross thresholds requiring immediate attention.', tags: ['Thresholds', 'Notifications', 'Proactive'], icon: Shield },
      { title: 'Export & Share', description: 'Export in PDF, Excel, and CSV formats or share via secure links and BI integrations.', tags: ['PDF', 'Excel', 'BI Integration'], icon: Globe },
    ],
    'Integration': [
      { title: 'Connector Library', description: '100+ pre-built connectors for popular business applications and platforms.', tags: ['100+ Tools', 'Pre-Built', 'One-Click'], icon: Layers },
      { title: 'Workflow Builder', description: 'No-code automation builder for cross-system workflows and data pipelines.', tags: ['No-Code', 'Automation', 'Pipelines'], icon: Settings },
      { title: 'API Platform', description: 'Comprehensive REST APIs with interactive documentation and client libraries.', tags: ['REST API', 'Documentation', 'SDKs'], icon: Monitor },
      { title: 'Data Sync', description: 'Real-time bidirectional data synchronization between all connected systems.', tags: ['Real-time', 'Bi-directional', 'Reliable'], icon: Zap },
      { title: 'Migration Tools', description: 'Import historical data from legacy systems with mapping, validation, and rollback.', tags: ['Data Import', 'Validation', 'Rollback'], icon: FileCheck },
      { title: 'Marketplace', description: 'Third-party integrations and extensions from technology partners and developers.', tags: ['Third-Party', 'Extensions', 'Partners'], icon: Globe },
    ],
  };
  return modules[category] || modules['Productivity'];
}

// ── Get industry/audience types ────────────────────────────────────
function getIndustryTypes(category: string): Array<{ emoji: string; label: string }> {
  const types: Record<string, Array<{ emoji: string; label: string }>> = {
    'Time & Attendance': [
      { emoji: '🏢', label: 'Enterprises' },
      { emoji: '🏥', label: 'Healthcare' },
      { emoji: '🏭', label: 'Manufacturing' },
      { emoji: '🏗️', label: 'Construction' },
      { emoji: '🛒', label: 'Retail' },
      { emoji: '📚', label: 'Education' },
      { emoji: '🏦', label: 'Financial Services' },
      { emoji: '🚚', label: 'Logistics' },
    ],
    'Monitoring': [
      { emoji: '💻', label: 'Software Teams' },
      { emoji: '🎯', label: 'IT Services' },
      { emoji: '📞', label: 'Call Centers' },
      { emoji: '🏦', label: 'Financial Services' },
      { emoji: '⚖️', label: 'Legal Firms' },
      { emoji: '🏥', label: 'Healthcare' },
      { emoji: '🏢', label: 'Enterprises' },
      { emoji: '🌐', label: 'Remote Teams' },
    ],
    'Analytics': [
      { emoji: '💻', label: 'Tech Companies' },
      { emoji: '📊', label: 'Data Teams' },
      { emoji: '🏦', label: 'Finance' },
      { emoji: '🏥', label: 'Healthcare' },
      { emoji: '🛒', label: 'E-Commerce' },
      { emoji: '🏢', label: 'Enterprises' },
      { emoji: '🎓', label: 'EdTech' },
      { emoji: '📱', label: 'SaaS Companies' },
    ],
    'Security': [
      { emoji: '🏦', label: 'Banking' },
      { emoji: '🏥', label: 'Healthcare' },
      { emoji: '⚖️', label: 'Legal' },
      { emoji: '🏛️', label: 'Government' },
      { emoji: '💻', label: 'Technology' },
      { emoji: '🏢', label: 'Enterprises' },
      { emoji: '🔐', label: 'Cybersecurity' },
      { emoji: '☁️', label: 'Cloud Services' },
    ],
    'Billing': [
      { emoji: '⚖️', label: 'Law Firms' },
      { emoji: '💼', label: 'Consulting' },
      { emoji: '💻', label: 'IT Services' },
      { emoji: '🎨', label: 'Creative Agencies' },
      { emoji: '📐', label: 'Architecture' },
      { emoji: '🔧', label: 'Engineering' },
      { emoji: '📊', label: 'Accounting' },
      { emoji: '🏢', label: 'Professional Services' },
    ],
    'Team Management': [
      { emoji: '💻', label: 'Software Teams' },
      { emoji: '🎯', label: 'Product Teams' },
      { emoji: '📈', label: 'Sales Teams' },
      { emoji: '📣', label: 'Marketing Teams' },
      { emoji: '🔧', label: 'Engineering' },
      { emoji: '🎨', label: 'Design Teams' },
      { emoji: '📞', label: 'Support Teams' },
      { emoji: '🌐', label: 'Remote Teams' },
    ],
    'Workforce Management': [
      { emoji: '🏢', label: 'Enterprises' },
      { emoji: '🏭', label: 'Manufacturing' },
      { emoji: '🛒', label: 'Retail Chains' },
      { emoji: '🏥', label: 'Healthcare' },
      { emoji: '🚚', label: 'Logistics' },
      { emoji: '🏗️', label: 'Construction' },
      { emoji: '🍽️', label: 'Hospitality' },
      { emoji: '📚', label: 'Education' },
    ],
    'Productivity': [
      { emoji: '💻', label: 'Tech Startups' },
      { emoji: '🏢', label: 'Enterprises' },
      { emoji: '🌐', label: 'Remote Teams' },
      { emoji: '💼', label: 'Consulting' },
      { emoji: '🎨', label: 'Creative Teams' },
      { emoji: '📈', label: 'Growth Teams' },
      { emoji: '🔧', label: 'Engineering' },
      { emoji: '📱', label: 'Product Teams' },
    ],
    'Reports': [
      { emoji: '📊', label: 'Data Analysts' },
      { emoji: '💼', label: 'Executives' },
      { emoji: '🏦', label: 'Finance Teams' },
      { emoji: '⚖️', label: 'Compliance' },
      { emoji: '👥', label: 'HR Teams' },
      { emoji: '📈', label: 'Operations' },
      { emoji: '🎯', label: 'Project Managers' },
      { emoji: '🏢', label: 'Enterprises' },
    ],
    'Integration': [
      { emoji: '💻', label: 'Dev Teams' },
      { emoji: '🔧', label: 'IT Operations' },
      { emoji: '🏢', label: 'Enterprises' },
      { emoji: '📱', label: 'SaaS Companies' },
      { emoji: '☁️', label: 'Cloud-First Orgs' },
      { emoji: '🌐', label: 'Global Teams' },
      { emoji: '🏭', label: 'Manufacturing' },
      { emoji: '🏥', label: 'Healthcare' },
    ],
  };
  return types[category] || types['Productivity'];
}

// ── Fade-in animation variants ─────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

// ── Extract location from title or field ───────────────────────────
function extractLocation(title: string, locationField?: string): string {
  // Priority 1: Use explicit location field
  if (locationField) return locationField;

  // Priority 2: Extract from title (pattern: "Product Name - Location")
  const parts = title.split(' - ');
  if (parts.length >= 2) {
    return parts[parts.length - 1].trim();
  }

  return '';
}

// ── Extract clean product name from title ─────────────────────────
function extractProductName(title: string): string {
  // Remove location suffix like " - US", " - Enterprise", " - Kolkata"
  const parts = title.split(' - ');
  if (parts.length >= 2) {
    return parts.slice(0, -1).join(' - ').trim();
  }
  return title;
}

export default function MarketingPageContent({ page }: { page: MarketingPage }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Extract location from title or use explicit field
  const location = extractLocation(page.title, page.location);
  const productName = extractProductName(page.title);

  const transformationCards = getTransformationCards(page.category);
  const whyChooseItems = getWhyChooseItems(page.category);
  const modules = getModules(page.category);
  const industryTypes = getIndustryTypes(page.category);
  const CategoryIcon = categoryIcons[page.category] || BarChart3;
  const sectionImages = getPageImages(page.id);

  // Build FAQ Schema for SEO
  const faqSchema = page.faqs && page.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // Build Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tracknexus.com' },
      { '@type': 'ListItem', position: 2, name: page.category, item: `https://tracknexus.com/product` },
      { '@type': 'ListItem', position: 3, name: page.title, item: `https://tracknexus.com${page.url}` },
    ],
  };

  // Build Software Application Schema
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `TrackNexus - ${page.title}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Windows, macOS, iOS, Android',
    description: page.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free trial available',
    },
    aggregateRating: page.testimonials && page.testimonials.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: (page.testimonials.reduce((sum, t) => sum + t.rating, 0) / page.testimonials.length).toFixed(1),
      reviewCount: page.testimonials.length,
      bestRating: '5',
    } : undefined,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Contact Popup for Free Trial */}
      <ContactPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        context={{ type: 'free-trial' }}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO — Two-column with badge, headline, CTAs
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-cyan-50">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA2QjZENCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-500 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <a href="/" className="hover:text-cyan-600 transition-colors">Home</a>
            <ChevronRight className="w-3 h-3" />
            <a href="/product" className="hover:text-cyan-600 transition-colors">Products</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{page.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 pt-4"
            >
              {/* Category Badge */}
              <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold border border-cyan-200">
                <CategoryIcon className="w-4 h-4" />
                {productName}{location ? ` ${location}` : ''}
              </span>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                {location ? (
                  <>
                    <span className="text-cyan-600">{productName}</span>{' '}
                    in {location}
                  </>
                ) : (
                  page.heroHeadline || page.title
                )}
              </h1>

              {/* Description below headline */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                {location
                  ? `Cloud-based ${productName.toLowerCase()} solutions for ${location} businesses. Industry-specific modules with local implementation support.`
                  : (page.heroSubheadline || page.description)}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsContactOpen(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 rounded-lg font-bold text-base hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 cursor-pointer"
                >
                  Get Free Demo
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <a
                  href="/contact"
                  className="border-2 border-gray-300 text-gray-700 hover:border-cyan-500 hover:text-cyan-600 px-8 py-3.5 rounded-lg font-bold text-base transition-all inline-flex items-center gap-2"
                >
                  {location ? `Contact ${location} Team` : 'Contact Sales'}
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4">
                <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {location ? `300+ ${location} Customers` : '57,000+ Companies'}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {location ? 'Local Support Team' : '24/7 Support'}
                </span>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <HeroContactForm location={location} category={page.category} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: METRICS — 4-column stats grid
         ═══════════════════════════════════════════════════════════ */}
      {page.industryStats && page.industryStats.length > 0 && (
        <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {page.industryStats.slice(0, 4).map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-1"
                >
                  <p className="text-3xl sm:text-4xl font-bold text-cyan-600">{stat.value}</p>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: TRANSFORMATION CARDS — 4-column grid
         ═══════════════════════════════════════════════════════════ */}
      <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-cyan-200">
              Proven Results
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Transform Your {page.category} Operations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See the measurable impact TrackNexus delivers for {page.targetAudience || 'your team'} from day one.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {transformationCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md hover:border-cyan-200 transition-all"
                >
                  <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                  <p className="text-sm text-gray-600">{card.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: "BUILT FOR" — Three-column images + content
         ═══════════════════════════════════════════════════════════ */}
      <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Single Topic Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gradient-to-br from-cyan-100 to-blue-100">
                <img
                  src={sectionImages.builtFor}
                  alt={`${productName} ${page.category.toLowerCase()} solution for ${page.targetAudience || 'businesses'}${location ? ` in ${location}` : ''} - professional team collaboration`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              {/* Overlapping stat card */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{page.industryStats?.[2]?.value || '149%'}</p>
                    <p className="text-xs text-gray-500">{page.industryStats?.[2]?.label || 'Average ROI'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-cyan-200">
                Built for {location ? `${page.targetAudience || 'Teams'} in ${location}` : (page.targetAudience || 'Your Team')}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Powering {productName} Excellence{location ? ` in ${location}` : ''}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {location
                  ? `TrackNexus ${productName} is trusted by ${location}-based businesses across manufacturing, IT services, healthcare, retail, and more. Our platform provides industry-specific ${page.category.toLowerCase()} modules with GST compliance, local language support, and dedicated ${location} implementation teams to ensure rapid deployment and maximum ROI.`
                  : page.description}
              </p>

              {/* Key benefits list */}
              {location && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Dedicated {location} support team with same-day response for enterprise clients</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">On-site deployment assistance and hands-on training for {location} teams</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Customizable workflows tailored to {location} industry regulations and compliance</p>
                  </div>
                </div>
              )}

              {/* Feature grid 2x2 from key features */}
              {page.keyFeatures && page.keyFeatures.length >= 4 && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {page.keyFeatures.slice(0, 4).map((feature) => (
                    <div key={feature.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-cyan-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4B: HOW IT WORKS — Reversed three-column images + content
         ═══════════════════════════════════════════════════════════ */}
      <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content - Left side */}
            <div className="space-y-6 order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-cyan-200">
                How It Works{location ? ` in ${location}` : ''}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Streamline Your {productName} Workflow{location ? ` in ${location}` : ''}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {location
                  ? `Our ${productName} solution is specifically optimized for ${location} businesses. From initial setup to advanced automation, TrackNexus delivers a seamless experience with local data hosting, regional compliance tools, and a dedicated ${location} success manager to guide your team every step of the way.`
                  : `TrackNexus ${productName} simplifies complex workflows with intelligent automation, real-time visibility, and actionable insights. Our platform adapts to your business processes—not the other way around—delivering measurable results from day one.`}
              </p>

              {/* Step-by-step process */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                  <div>
                    <p className="font-semibold text-gray-900">Quick Setup & Onboarding</p>
                    <p className="text-sm text-gray-600">{location ? `Deploy in ${location} with our guided onboarding — go live in under 48 hours` : 'Deploy across your organization with guided onboarding in under 48 hours'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                  <div>
                    <p className="font-semibold text-gray-900">Automated Data Collection</p>
                    <p className="text-sm text-gray-600">TrackNexus automatically captures {page.category.toLowerCase()} data across all devices with zero manual effort</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                  <div>
                    <p className="font-semibold text-gray-900">AI-Powered Insights & Reports</p>
                    <p className="text-sm text-gray-600">Get real-time dashboards, automated alerts, and AI-driven recommendations to optimize operations</p>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-600">{page.industryStats?.[0]?.value || '98%'}</p>
                  <p className="text-xs text-gray-500">{page.industryStats?.[0]?.label || 'Customer Satisfaction'}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-600">{page.industryStats?.[1]?.value || '50+'}</p>
                  <p className="text-xs text-gray-500">{page.industryStats?.[1]?.label || 'Integrations'}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-600">24/7</p>
                  <p className="text-xs text-gray-500">{location ? `${location} Support` : 'Global Support'}</p>
                </div>
              </div>
            </div>

            {/* Single Topic Image - Right side */}
            <div className="relative order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gradient-to-br from-blue-100 to-indigo-100">
                <img
                  src={sectionImages.howItWorks}
                  alt={`How ${productName} ${page.category.toLowerCase()} works - step by step workflow${location ? ` for ${location} teams` : ''} - automated process visualization`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-2 sm:-left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">AI-Powered</p>
                    <p className="text-xs text-gray-500">Smart Automation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: WHY CHOOSE — Three-column images with checklist
         ═══════════════════════════════════════════════════════════ */}
      <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-cyan-200">
                Why Choose TrackNexus
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                From Setup to Results in Minutes
              </h2>
              <div className="space-y-4">
                {whyChooseItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    viewport={{ once: true }}
                    className="flex gap-3 items-start"
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Single Topic Image */}
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gradient-to-br from-blue-100 to-cyan-100">
                <img
                  src={sectionImages.whyChoose}
                  alt={`Why choose TrackNexus ${productName} for ${page.category.toLowerCase()}${location ? ` in ${location}` : ''} - enterprise features and benefits`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: MODULES — 3-column card grid
         ═══════════════════════════════════════════════════════════ */}
      <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-cyan-200">
              Core Modules
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Everything You Need for {page.category}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful, integrated modules designed to cover every aspect of your {page.category.toLowerCase()} workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, idx) => {
              const ModIcon = mod.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-cyan-200 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-cyan-50 group-hover:bg-cyan-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <ModIcon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{mod.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{mod.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: INDUSTRY TYPES — 8-column grid
         ═══════════════════════════════════════════════════════════ */}
      <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Built for Every Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              TrackNexus {page.category} solutions are trusted across industries and team types worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {industryTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-cyan-200 hover:shadow-md transition-all cursor-default"
              >
                <span className="text-2xl mb-2 block">{type.emoji}</span>
                <p className="text-xs font-medium text-gray-700">{type.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: VALUE PROPOSITION — Metrics cards
         ═══════════════════════════════════════════════════════════ */}
      {page.valueProposition && page.valueProposition.length > 0 && (
        <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-3">
              <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-cyan-200">
                By The Numbers
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Why {location ? `${location} ${page.targetAudience || 'Teams'}` : (page.targetAudience || 'Teams')} Choose TrackNexus
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real, measurable results that drive business growth and operational excellence{location ? ` in ${location}` : ''}.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {page.valueProposition.map((prop, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center space-y-3 bg-gradient-to-br from-gray-50 to-cyan-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all"
                >
                  <p className="text-4xl sm:text-5xl font-bold text-cyan-600">{prop.value}</p>
                  <p className="text-lg font-semibold text-gray-900">{prop.metric}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{prop.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9: CASE STUDIES — Success stories
         ═══════════════════════════════════════════════════════════ */}
      {page.caseStudies && page.caseStudies.length > 0 && (
        <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-3">
              <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-cyan-200">
                Success Stories
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Proven Results Worldwide</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how leading organizations achieve remarkable results with TrackNexus.
              </p>
            </div>
            <div className="space-y-6">
              {page.caseStudies.map((study) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:border-cyan-200 hover:shadow-lg transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Company</p>
                      <p className="text-lg font-bold text-gray-900">{study.company}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {study.location}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Challenge</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Solution</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{study.solution}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Result</p>
                      <p className="text-xl font-bold text-green-600">{study.result}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10: TESTIMONIAL — Gradient full-width
         ═══════════════════════════════════════════════════════════ */}
      {page.testimonials && page.testimonials.length > 0 && (
        <section className="py-16 sm:py-24 bg-gradient-to-r from-cyan-500 to-blue-600 relative overflow-hidden">
          {/* Pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA4IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Quote Mark */}
            <div className="text-6xl sm:text-8xl font-serif text-white/30 mb-6 leading-none">&ldquo;</div>

            {/* Testimonial content - pick the highest rated or first */}
            {(() => {
              const topTestimonial = [...page.testimonials].sort((a, b) => b.rating - a.rating)[0];
              return (
                <>
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-8">
                    {topTestimonial.content}
                  </blockquote>
                  <div className="space-y-1">
                    <p className="text-white font-bold text-lg">{topTestimonial.author}</p>
                    <p className="text-white/80 text-sm">{topTestimonial.role}, {topTestimonial.company}</p>
                  </div>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(Math.floor(topTestimonial.rating))].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 11: MORE TESTIMONIALS — Grid cards (if multiple)
         ═══════════════════════════════════════════════════════════ */}
      {page.testimonials && page.testimonials.length > 1 && (
        <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Trusted by industry leaders worldwide. Here is what real users say.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {page.testimonials.slice(1).map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  whileHover={{ y: -3 }}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-cyan-200 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-5 italic leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-xs text-gray-500">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 12: FAQ — Accordion style
         ═══════════════════════════════════════════════════════════ */}
      {page.faqs && page.faqs.length > 0 && (
        <motion.section id="faqs" {...fadeInUp} className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-3">
              <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-cyan-200">
                FAQs
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get detailed answers to common questions about {page.title}.
              </p>
            </div>
            <div className="space-y-3">
              {page.faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-900 pr-6">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                        openFaq === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-5 pb-5"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 13: SUPPORT — Contact & support info
         ═══════════════════════════════════════════════════════════ */}
      <motion.section {...fadeInUp} className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-cyan-200">
                Dedicated Support
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {productName} Experts {location ? `in ${location}` : 'at Your Side'}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated {productName.toLowerCase()} specialists provide personalized support to ensure your team gets maximum value from TrackNexus. From implementation to optimization, we are here every step of the way.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">{page.officeEmail || 'support@tracknexus.com'}</p>
                  </div>
                </div>
                {page.officeAddress && location && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{location} Office</p>
                      <p className="text-sm text-gray-600">{page.officeAddress}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Enterprise Support</p>
                    <p className="text-sm text-gray-600">Dedicated account manager & priority response</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Global Coverage</p>
                    <p className="text-sm text-gray-600">24/7 support across all time zones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map / Visual */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              <iframe
                title={`TrackNexus ${location || 'Office'} Location`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(location ? `${location}, India` : 'Hyderabad, India')}&output=embed`}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 14: FINAL CTA — Gradient full-width
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-r from-cyan-500 to-blue-600 overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA4IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {page.ctaText || `Ready to Transform Your ${page.category} Operations?`}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of {page.targetAudience || 'teams'} who have streamlined their {page.category.toLowerCase()} with TrackNexus. Start your free trial today.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-cyan-600 px-10 py-4 rounded-lg font-bold text-base hover:bg-gray-50 transition-all shadow-xl inline-flex items-center gap-2 cursor-pointer"
            >
              {page.ctaButtonText || 'Start Free Trial'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <a
              href="/product"
              className="border-2 border-white/50 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-bold text-base transition-all inline-flex items-center gap-2"
            >
              View All Solutions
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-white/80 text-sm">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Enterprise Security</span>
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> No Credit Card Required</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 24/7 Support</span>
          </div>
        </div>
      </section>
    </div>
  );
}

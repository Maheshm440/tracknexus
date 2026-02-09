const fs = require('fs');
const path = require('path');

// EXACT URLs from dashboard/marketing/page.tsx - must match perfectly
const dashboardPages = [
  { id: '1', title: 'Time Tracking Pro - US', url: '/time-tracking-pro-us', category: 'Time & Attendance' },
  { id: '2', title: 'Employee Monitoring - Enterprise', url: '/employee-monitoring-enterprise', category: 'Monitoring' },
  { id: '3', title: 'Productivity Analytics Dashboard', url: '/productivity-analytics-dashboard', category: 'Analytics' },
  { id: '4', title: 'Remote Team Coordination', url: '/remote-team-coordination', category: 'Team Management' },
  { id: '5', title: 'Security & Compliance Suite', url: '/security-compliance-suite', category: 'Security' },
  { id: '6', title: 'Project Billing Integration', url: '/project-billing-integration', category: 'Billing' },
  { id: '7', title: 'Advanced Time Reports', url: '/advanced-time-reports', category: 'Reports' },
  { id: '8', title: 'Attendance Management System', url: '/attendance-management-system', category: 'Time & Attendance' },
  { id: '9', title: 'Geolocation Tracking', url: '/geolocation-tracking', category: 'Monitoring' },
  { id: '10', title: 'Real-time Activity Dashboard', url: '/realtime-activity-dashboard', category: 'Analytics' },
  { id: '11', title: 'Payroll Integration Suite', url: '/payroll-integration-suite', category: 'Billing' },
  { id: '12', title: 'Team Performance Insights', url: '/team-performance-insights', category: 'Analytics' },
  { id: '13', title: 'Workload Management Platform', url: '/workload-management-platform', category: 'Team Management' },
  { id: '14', title: 'Compliance Dashboard', url: '/compliance-dashboard', category: 'Security' },
  { id: '15', title: 'Project Cost Tracking', url: '/project-cost-tracking', category: 'Billing' },
  { id: '16', title: 'Employee Scheduling', url: '/employee-scheduling', category: 'Time & Attendance' },
  { id: '17', title: 'Screen Recording & Monitoring', url: '/screen-recording-monitoring', category: 'Monitoring' },
  { id: '18', title: 'Productivity Trends Analysis', url: '/productivity-trends-analysis', category: 'Analytics' },
  { id: '19', title: 'Task Management Integration', url: '/task-management-integration', category: 'Integration' },
  { id: '20', title: 'Budget Allocation Tools', url: '/budget-allocation-tools', category: 'Billing' },
  { id: '21', title: 'Leave & Absence Management', url: '/leave-absence-management', category: 'Time & Attendance' },
  { id: '22', title: 'Keystroke Monitoring', url: '/keystroke-monitoring', category: 'Monitoring' },
  { id: '23', title: 'Efficiency Metrics Dashboard', url: '/efficiency-metrics-dashboard', category: 'Analytics' },
  { id: '24', title: 'Distributed Team Coordination', url: '/distributed-team-coordination', category: 'Team Management' },
  { id: '25', title: 'Data Privacy & Encryption', url: '/data-privacy-encryption', category: 'Security' },
  { id: '26', title: 'Multi-project Invoicing', url: '/multi-project-invoicing', category: 'Billing' },
  { id: '27', title: 'Shift Planning Suite', url: '/shift-planning-suite', category: 'Time & Attendance' },
  { id: '28', title: 'Website & App Usage Tracking', url: '/website-app-usage-tracking', category: 'Monitoring' },
  { id: '29', title: 'ROI Calculation Engine', url: '/roi-calculation-engine', category: 'Analytics' },
  { id: '30', title: 'Cross-team Collaboration Hub', url: '/cross-team-collaboration-hub', category: 'Team Management' },
  { id: '31', title: 'Threat Detection System', url: '/threat-detection-system', category: 'Security' },
  { id: '32', title: 'Expense Management Platform', url: '/expense-management-platform', category: 'Billing' },
  { id: '33', title: 'Clock In/Out Automation', url: '/clock-in-out-automation', category: 'Time & Attendance' },
  { id: '34', title: 'Behavior Analytics Platform', url: '/behavior-analytics-platform', category: 'Monitoring' },
  { id: '35', title: 'Performance Benchmarking', url: '/performance-benchmarking', category: 'Analytics' },
  { id: '36', title: 'Flexible Scheduling System', url: '/flexible-scheduling-system', category: 'Team Management' },
  { id: '37', title: 'Security Audit Reports', url: '/security-audit-reports', category: 'Security' },
  { id: '38', title: 'Time-to-Invoice Optimization', url: '/time-to-invoice-optimization', category: 'Billing' },
  { id: '39', title: 'Overtime Management', url: '/overtime-management', category: 'Time & Attendance' },
  { id: '40', title: 'URL & App Blocking', url: '/url-app-blocking', category: 'Monitoring' },
  { id: '41', title: 'Custom Report Builder', url: '/custom-report-builder', category: 'Reports' },
  { id: '42', title: 'Client Onboarding Workflow', url: '/client-onboarding-workflow', category: 'Integration' },
  { id: '43', title: 'Compliance Documentation', url: '/compliance-documentation', category: 'Security' },
  { id: '44', title: 'Automated Billing Cycles', url: '/automated-billing-cycles', category: 'Billing' },
  { id: '45', title: 'Biometric Time Entry', url: '/biometric-time-entry', category: 'Time & Attendance' },
  { id: '46', title: 'Email & Chat Monitoring', url: '/email-chat-monitoring', category: 'Monitoring' },
  { id: '47', title: 'Departmental Performance', url: '/departmental-performance', category: 'Analytics' },
  { id: '48', title: 'Global Team Synchronization', url: '/global-team-synchronization', category: 'Team Management' },
  { id: '49', title: 'Vulnerability Assessment', url: '/vulnerability-assessment', category: 'Security' },
  { id: '50', title: 'Revenue Recognition Module', url: '/revenue-recognition-module', category: 'Billing' },
  { id: '51', title: 'Mobile Time Tracking', url: '/mobile-time-tracking', category: 'Time & Attendance' },
  { id: '52', title: 'Internet Activity Reports', url: '/internet-activity-reports', category: 'Reports' },
  { id: '53', title: 'Predictive Analytics Engine', url: '/predictive-analytics-engine', category: 'Analytics' },
  { id: '54', title: 'Meeting Scheduler & Organizer', url: '/meeting-scheduler-organizer', category: 'Team Management' },
  { id: '55', title: 'Access Control Management', url: '/access-control-management', category: 'Security' },
  { id: '56', title: 'Recurring Billing Engine', url: '/recurring-billing-engine', category: 'Billing' },
  { id: '57', title: 'Vacation & Holiday Planning', url: '/vacation-holiday-planning', category: 'Time & Attendance' },
  { id: '58', title: 'Application Monitoring Suite', url: '/application-monitoring-suite', category: 'Monitoring' },
  { id: '59', title: 'Team Capacity Planner', url: '/team-capacity-planner', category: 'Analytics' },
  { id: '60', title: 'Collaboration Workspace', url: '/collaboration-workspace', category: 'Team Management' },
  { id: '61', title: 'Insider Threat Detection', url: '/insider-threat-detection', category: 'Security' },
  { id: '62', title: 'Client Portal Integration', url: '/client-portal-integration', category: 'Billing' },
  { id: '63', title: 'Face Recognition Check-in', url: '/face-recognition-check-in', category: 'Time & Attendance' },
  { id: '64', title: 'Project Profitability Analysis', url: '/project-profitability-analysis', category: 'Reports' },
  { id: '65', title: 'Engagement Metrics Dashboard', url: '/engagement-metrics-dashboard', category: 'Analytics' },
  { id: '66', title: 'Cross-functional Team Hub', url: '/cross-functional-team-hub', category: 'Team Management' },
  { id: '67', title: 'Regulatory Compliance Tracker', url: '/regulatory-compliance-tracker', category: 'Security' },
  { id: '68', title: 'Usage-Based Billing Module', url: '/usage-based-billing-module', category: 'Billing' },
  { id: '69', title: 'Mobile Attendance Verification', url: '/mobile-attendance-verification', category: 'Time & Attendance' },
  { id: '70', title: 'Network Monitoring System', url: '/network-monitoring-system', category: 'Monitoring' },
  { id: '71', title: 'Anomaly Detection System', url: '/anomaly-detection-system', category: 'Analytics' },
  { id: '72', title: 'Team Resource Optimization', url: '/team-resource-optimization', category: 'Team Management' },
  { id: '73', title: 'Security Incident Response', url: '/security-incident-response', category: 'Security' },
  { id: '74', title: 'Project Cost Forecasting', url: '/project-cost-forecasting', category: 'Billing' },
  { id: '75', title: 'Smart Attendance Rules', url: '/smart-attendance-rules', category: 'Time & Attendance' },
  { id: '76', title: 'Process Mining Analytics', url: '/process-mining-analytics', category: 'Monitoring' },
  { id: '77', title: 'Utilization Rate Optimizer', url: '/utilization-rate-optimizer', category: 'Analytics' },
  { id: '78', title: 'Smart Team Assignments', url: '/smart-team-assignments', category: 'Team Management' },
  { id: '79', title: 'Credential Management System', url: '/credential-management-system', category: 'Security' },
  { id: '80', title: 'Subscription Management Suite', url: '/subscription-management-suite', category: 'Billing' },
  { id: '81', title: 'Geofencing Time Tracking', url: '/geofencing-time-tracking', category: 'Time & Attendance' },
  { id: '82', title: 'Infrastructure Monitoring', url: '/infrastructure-monitoring', category: 'Monitoring' },
  { id: '83', title: 'Conversion Funnel Analysis', url: '/conversion-funnel-analysis', category: 'Analytics' },
  { id: '84', title: 'Distributed Decision Maker', url: '/distributed-decision-maker', category: 'Team Management' },
  { id: '85', title: 'Log Management Platform', url: '/log-management-platform', category: 'Security' },
  { id: '86', title: 'Project Capacity Dashboard', url: '/project-capacity-dashboard', category: 'Reports' },
  { id: '87', title: 'Wearable Device Integration', url: '/wearable-device-integration', category: 'Time & Attendance' },
  { id: '88', title: 'GPU & Hardware Monitoring', url: '/gpu-hardware-monitoring', category: 'Monitoring' },
  { id: '89', title: 'Sentiment Analysis Engine', url: '/sentiment-analysis-engine', category: 'Analytics' },
  { id: '90', title: 'Multi-location Team Sync', url: '/multi-location-team-sync', category: 'Team Management' },
  { id: '91', title: 'Zero Trust Architecture', url: '/zero-trust-architecture', category: 'Security' },
  { id: '92', title: 'Marketplace Integration Hub', url: '/marketplace-integration-hub', category: 'Integration' },
  { id: '93', title: 'Shift Swap Management', url: '/shift-swap-management', category: 'Time & Attendance' },
  { id: '94', title: 'Carbon Footprint Tracking', url: '/carbon-footprint-tracking', category: 'Monitoring' },
  { id: '95', title: 'Customer Success Metrics', url: '/customer-success-metrics', category: 'Analytics' },
  { id: '96', title: 'Emergency Response Coordinator', url: '/emergency-response-coordinator', category: 'Team Management' },
  { id: '97', title: 'Identity Verification System', url: '/identity-verification-system', category: 'Security' },
  { id: '98', title: 'Financial Planning Suite', url: '/financial-planning-suite', category: 'Billing' },
  { id: '99', title: 'Voice-based Time Entry', url: '/voice-based-time-entry', category: 'Time & Attendance' },
  { id: '100', title: 'Unified Analytics Platform', url: '/unified-analytics-platform', category: 'Reports' },
  { id: '101', title: 'AI-Powered Scheduling', url: '/ai-powered-scheduling', category: 'Time & Attendance' },
  { id: '102', title: 'Employee Wellness Tracker', url: '/employee-wellness-tracker', category: 'Analytics' },
  { id: '103', title: 'Smart Break Management', url: '/smart-break-management', category: 'Time & Attendance' },
  { id: '104', title: 'Multi-Currency Billing', url: '/multi-currency-billing', category: 'Billing' },
  { id: '105', title: 'Real-time Collaboration Tools', url: '/realtime-collaboration-tools', category: 'Team Management' },
  { id: '106', title: 'Automated Timesheet Approvals', url: '/automated-timesheet-approvals', category: 'Time & Attendance' },
  { id: '107', title: 'Privacy-First Monitoring', url: '/privacy-first-monitoring', category: 'Monitoring' },
  { id: '108', title: 'Sprint Planning Dashboard', url: '/sprint-planning-dashboard', category: 'Team Management' },
  { id: '109', title: 'Contractor Management Suite', url: '/contractor-management-suite', category: 'Billing' },
  { id: '110', title: 'Activity Heat Maps', url: '/activity-heat-maps', category: 'Analytics' },
  { id: '111', title: 'Secure Document Access', url: '/secure-document-access', category: 'Security' },
  { id: '112', title: 'Flexible Work Policies', url: '/flexible-work-policies', category: 'Team Management' },
  { id: '113', title: 'Time Zone Manager', url: '/time-zone-manager', category: 'Time & Attendance' },
  { id: '114', title: 'Expense Reporting Automation', url: '/expense-reporting-automation', category: 'Billing' },
  { id: '115', title: 'Performance Review System', url: '/performance-review-system', category: 'Analytics' },
  { id: '116', title: 'Client Communication Hub', url: '/client-communication-hub', category: 'Integration' },
  { id: '117', title: 'Workforce Forecasting', url: '/workforce-forecasting', category: 'Analytics' },
  { id: '118', title: 'Compliance Training Tracker', url: '/compliance-training-tracker', category: 'Security' },
  { id: '119', title: 'Smart Notifications Center', url: '/smart-notifications-center', category: 'Integration' },
  { id: '120', title: 'Resource Utilization Reports', url: '/resource-utilization-reports', category: 'Reports' },
  { id: '121', title: 'Hybrid Work Dashboard', url: '/hybrid-work-dashboard', category: 'Team Management' },
  { id: '122', title: 'Invoice Automation Suite', url: '/invoice-automation-suite', category: 'Billing' },
  { id: '123', title: 'Employee Engagement Score', url: '/employee-engagement-score', category: 'Analytics' },
  { id: '124', title: 'Data Retention Manager', url: '/data-retention-manager', category: 'Security' },
  { id: '125', title: 'Agile Project Tracker', url: '/agile-project-tracker', category: 'Team Management' },
  { id: '126', title: 'Payroll Export Module', url: '/payroll-export-module', category: 'Billing' },
  { id: '127', title: 'Desktop Activity Monitor', url: '/desktop-activity-monitor', category: 'Monitoring' },
  { id: '128', title: 'Goal Setting Platform', url: '/goal-setting-platform', category: 'Team Management' },
  { id: '129', title: 'API Integration Hub', url: '/api-integration-hub', category: 'Integration' },
  { id: '130', title: 'Audit Trail Reporting', url: '/audit-trail-reporting', category: 'Security' },
  { id: '131', title: 'Remote Desktop Control', url: '/remote-desktop-control', category: 'Monitoring' },
  { id: '132', title: 'Team Morale Analytics', url: '/team-morale-analytics', category: 'Analytics' },
  { id: '133', title: 'Multi-Branch Management', url: '/multi-branch-management', category: 'Team Management' },
  { id: '134', title: 'Custom Workflows Builder', url: '/custom-workflows-builder', category: 'Integration' },
  { id: '135', title: 'Time Theft Prevention', url: '/time-theft-prevention', category: 'Monitoring' },
  { id: '136', title: 'Capacity Planning Tool', url: '/capacity-planning-tool', category: 'Analytics' },
  { id: '137', title: 'Freelancer Payment Gateway', url: '/freelancer-payment-gateway', category: 'Billing' },
  { id: '138', title: 'Privacy Shield Module', url: '/privacy-shield-module', category: 'Security' },
  { id: '139', title: 'Attendance Analytics', url: '/attendance-analytics', category: 'Analytics' },
  { id: '140', title: 'Project Budget Tracker', url: '/project-budget-tracker', category: 'Billing' },
  { id: '141', title: 'Employee Self-Service Portal', url: '/employee-self-service-portal', category: 'Team Management' },
  { id: '142', title: 'Compliance Checklist Manager', url: '/compliance-checklist-manager', category: 'Security' },
  { id: '143', title: 'Daily Standup Tracker', url: '/daily-standup-tracker', category: 'Team Management' },
  { id: '144', title: 'Browser Activity Logger', url: '/browser-activity-logger', category: 'Monitoring' },
  { id: '145', title: 'Revenue Forecasting Tool', url: '/revenue-forecasting-tool', category: 'Analytics' },
  { id: '146', title: 'PTO Balance Tracker', url: '/pto-balance-tracker', category: 'Time & Attendance' },
  { id: '147', title: 'Client Retention Dashboard', url: '/client-retention-dashboard', category: 'Reports' },
  { id: '148', title: 'Secure File Sharing', url: '/secure-file-sharing', category: 'Security' },
  { id: '149', title: 'Milestone Tracking System', url: '/milestone-tracking-system', category: 'Team Management' },
  { id: '150', title: 'Tax Compliance Module', url: '/tax-compliance-module', category: 'Billing' },
  { id: '151', title: 'Focus Time Tracking', url: '/focus-time-tracking', category: 'Time & Attendance' },
  { id: '152', title: 'Skill Gap Analysis', url: '/skill-gap-analysis', category: 'Analytics' },
  { id: '153', title: 'SOC 2 Compliance Suite', url: '/soc2-compliance-suite', category: 'Security' },
  { id: '154', title: 'Cross-Platform Sync', url: '/cross-platform-sync', category: 'Integration' },
  { id: '155', title: 'Billable Hours Optimizer', url: '/billable-hours-optimizer', category: 'Billing' },
  { id: '156', title: 'Employee Directory', url: '/employee-directory', category: 'Team Management' },
  { id: '157', title: 'Productivity Leaderboard', url: '/productivity-leaderboard', category: 'Analytics' },
  { id: '158', title: 'Device Management System', url: '/device-management-system', category: 'Security' },
  { id: '159', title: 'Webhook Automation', url: '/webhook-automation', category: 'Integration' },
  { id: '160', title: 'Client Project Portal', url: '/client-project-portal', category: 'Team Management' },
  { id: '161', title: 'Automated Reminders', url: '/automated-reminders', category: 'Integration' },
  { id: '162', title: 'GDPR Compliance Tools', url: '/gdpr-compliance-tools', category: 'Security' },
  { id: '163', title: 'Time Entry Validation', url: '/time-entry-validation', category: 'Time & Attendance' },
  { id: '164', title: 'Client Satisfaction Survey', url: '/client-satisfaction-survey', category: 'Reports' },
  { id: '165', title: 'Mobile App Analytics', url: '/mobile-app-analytics', category: 'Analytics' },
  { id: '166', title: 'Contract Billing Manager', url: '/contract-billing-manager', category: 'Billing' },
  { id: '167', title: 'Team Health Monitor', url: '/team-health-monitor', category: 'Team Management' },
  { id: '168', title: 'Single Sign-On (SSO)', url: '/single-sign-on', category: 'Security' },
  { id: '169', title: 'Burnout Prevention Tool', url: '/burnout-prevention-tool', category: 'Analytics' },
  { id: '170', title: 'Multi-Language Support', url: '/multi-language-support', category: 'Integration' },
  { id: '171', title: 'Retainer Billing Module', url: '/retainer-billing-module', category: 'Billing' },
  { id: '172', title: 'Meeting Productivity Score', url: '/meeting-productivity-score', category: 'Analytics' },
  { id: '173', title: 'IP Restriction Manager', url: '/ip-restriction-manager', category: 'Security' },
  { id: '174', title: 'Slack Integration Module', url: '/slack-integration-module', category: 'Integration' },
  { id: '175', title: 'Overtime Approval Workflow', url: '/overtime-approval-workflow', category: 'Time & Attendance' },
  { id: '176', title: 'Revenue Per Employee', url: '/revenue-per-employee', category: 'Reports' },
  { id: '177', title: 'Onboarding Checklist', url: '/onboarding-checklist', category: 'Team Management' },
  { id: '178', title: 'Two-Factor Authentication', url: '/two-factor-authentication', category: 'Security' },
  { id: '179', title: 'Jira Time Sync', url: '/jira-time-sync', category: 'Integration' },
  { id: '180', title: 'Commission Calculator', url: '/commission-calculator', category: 'Billing' },
  { id: '181', title: 'Remote Work Policy Manager', url: '/remote-work-policy-manager', category: 'Team Management' },
  { id: '182', title: 'Session Recording', url: '/session-recording', category: 'Monitoring' },
  { id: '183', title: 'Trend Analysis Dashboard', url: '/trend-analysis-dashboard', category: 'Analytics' },
  { id: '184', title: 'QuickBooks Integration', url: '/quickbooks-integration', category: 'Integration' },
  { id: '185', title: 'Field Service Management', url: '/field-service-management', category: 'Team Management' },
  { id: '186', title: 'Encryption Key Manager', url: '/encryption-key-manager', category: 'Security' },
  { id: '187', title: 'Work Pattern Analysis', url: '/work-pattern-analysis', category: 'Analytics' },
  { id: '188', title: 'Deposit Invoice Manager', url: '/deposit-invoice-manager', category: 'Billing' },
  { id: '189', title: 'Asana Time Bridge', url: '/asana-time-bridge', category: 'Integration' },
  { id: '190', title: 'Exit Interview Analytics', url: '/exit-interview-analytics', category: 'Analytics' },
  { id: '191', title: 'Role-Based Access Control', url: '/role-based-access-control', category: 'Security' },
  { id: '192', title: 'Microsoft Teams Connector', url: '/microsoft-teams-connector', category: 'Integration' },
  { id: '193', title: 'Labor Cost Calculator', url: '/labor-cost-calculator', category: 'Billing' },
  { id: '194', title: 'Staffing Level Optimizer', url: '/staffing-level-optimizer', category: 'Team Management' },
  { id: '195', title: 'Security Incident Logger', url: '/security-incident-logger', category: 'Security' },
  { id: '196', title: 'Attrition Risk Dashboard', url: '/attrition-risk-dashboard', category: 'Analytics' },
  { id: '197', title: 'HubSpot CRM Sync', url: '/hubspot-crm-sync', category: 'Integration' },
  { id: '198', title: 'Credit Note Management', url: '/credit-note-management', category: 'Billing' },
  { id: '199', title: 'Mentorship Program Tracker', url: '/mentorship-program-tracker', category: 'Team Management' },
  { id: '200', title: 'Enterprise Security Suite', url: '/enterprise-security-suite', category: 'Security' },
];

// Data pools for unique content
const companyNames = [
  'TechCorp Inc', 'Global Industries Ltd', 'Asia Tech Solutions', 'Enterprise Solutions GmbH',
  'Digital Innovation Co', 'CloudFirst Systems', 'Innovation Labs', 'Future Business Group',
  'Nexus Technologies', 'Quantum Systems Inc', 'DataFlow Solutions', 'Vertex Analytics',
  'Prime Tech Ventures', 'EagleEye Software', 'Horizon Systems', 'Catalyst Technologies',
  'Beacon Digital', 'Momentum Systems', 'Apex Software Group', 'Stellar Digital Solutions',
  'Velocity Tech', 'NextGen Industries', 'Infinite Possibilities Inc', 'Dynamic Solutions Ltd',
  'Stellar Tech Group', 'Innovative Minds LLC', 'Quantum Leap Systems', 'Precision Analytics',
  'Fusion Enterprises', 'Synergy Digital', 'Rapid Growth Systems', 'Matrix Solutions',
  'Peak Performance Inc', 'Elevate Digital', 'Quantum Digital', 'Smartflow Solutions',
  'Intelligence Systems', 'Lighthouse Digital', 'Ascend Technologies', 'Prism Solutions'
];

const locations = [
  'San Francisco, CA', 'London, UK', 'Singapore', 'Berlin, Germany', 'Toronto, Canada',
  'Sydney, Australia', 'Tokyo, Japan', 'Dubai, UAE', 'New York, NY', 'Amsterdam, Netherlands',
  'Seoul, South Korea', 'Mumbai, India', 'Mexico City, Mexico', 'Sao Paulo, Brazil',
  'Barcelona, Spain', 'Vienna, Austria', 'Bangkok, Thailand', 'Stockholm, Sweden',
  'Madrid, Spain', 'Copenhagen, Denmark', 'Zurich, Switzerland', 'Auckland, New Zealand',
  'Prague, Czech Republic', 'Istanbul, Turkey', 'Hong Kong', 'Tel Aviv, Israel',
  'Bangalore, India', 'Vancouver, Canada', 'Chicago, IL', 'Austin, TX', 'Seattle, WA',
  'Boston, MA', 'Denver, CO', 'Portland, OR', 'Miami, FL', 'Los Angeles, CA', 'Atlanta, GA'
];

const features = [
  { name: 'Real-time Tracking', description: 'Monitor activities and metrics instantly across all devices', icon: 'clock' },
  { name: 'Advanced Analytics', description: 'Comprehensive data analysis with AI-powered insights', icon: 'chart-line' },
  { name: 'Team Collaboration', description: 'Seamless communication and project coordination tools', icon: 'users' },
  { name: 'Mobile App', description: 'Full-featured native apps for iOS and Android platforms', icon: 'mobile' },
  { name: 'API Integration', description: 'RESTful APIs for third-party system integration', icon: 'code' },
  { name: 'Custom Reports', description: 'Flexible reporting engine with customizable templates', icon: 'file-chart' },
  { name: 'Automated Workflows', description: 'Smart automation to reduce manual tasks and errors', icon: 'workflow' },
  { name: 'Role-based Access', description: 'Granular permission control and security policies', icon: 'lock' },
  { name: 'Compliance Reporting', description: 'Built-in compliance standards and audit trails', icon: 'shield' },
  { name: 'Cloud Storage', description: 'Secure cloud-based storage with unlimited scalability', icon: 'cloud' },
  { name: 'Geolocation Services', description: 'Location-based tracking and geo-fencing capabilities', icon: 'map' },
  { name: 'Notification System', description: 'Real-time alerts and customizable notifications', icon: 'bell' },
  { name: 'Data Encryption', description: 'End-to-end encryption for maximum security', icon: 'shield-alt' },
  { name: 'Performance Metrics', description: 'Detailed performance KPIs and benchmarking tools', icon: 'tachometer' },
  { name: 'Budget Management', description: 'Cost tracking and budget allocation tools', icon: 'dollar-sign' },
  { name: 'User Management', description: 'Centralized user provisioning and access control', icon: 'users-cog' },
  { name: 'Schedule Planning', description: 'Advanced scheduling with resource optimization', icon: 'calendar' },
  { name: 'Billing Automation', description: 'Automated invoicing and payment processing', icon: 'receipt' },
  { name: 'Audit Logs', description: 'Complete audit trails for compliance and accountability', icon: 'list' },
  { name: 'Dashboard Customization', description: 'Personalized dashboards with drag-and-drop widgets', icon: 'sliders' },
  { name: 'Multi-language Support', description: 'Support for 50+ languages and regional variants', icon: 'globe' },
  { name: 'File Management', description: 'Centralized document storage with version control', icon: 'folder' },
  { name: 'Quality Control', description: 'Built-in quality assurance and compliance checking', icon: 'check-circle' },
  { name: 'Task Automation', description: 'Workflow automation with conditional logic', icon: 'cogs' }
];

const authorNames = [
  'John Smith', 'Sarah Johnson', 'Michael Williams', 'Emma Brown', 'David Davis',
  'Jessica Martinez', 'Robert Garcia', 'Jennifer Rodriguez', 'William Anderson', 'Maria Thomas',
  'James Taylor', 'Patricia Moore', 'Christopher Jackson', 'Linda Martin', 'Daniel Lee',
  'Barbara White', 'Matthew Harris', 'Susan Clark', 'Anthony Lewis', 'Dorothy Walker',
  'Mark Young', 'Margaret Hernandez', 'Donald King', 'Ashley Lopez', 'Steven Hill',
  'Samantha Scott', 'Paul Green', 'Catherine Adams', 'Andrew Nelson', 'Deborah Carter'
];

const roles = ['CEO', 'CTO', 'HR Director', 'Operations Manager', 'Finance Director', 'Project Manager', 'VP of Sales', 'Engineering Lead', 'Product Manager', 'Business Analyst'];

const headlineTemplates = [
  'Transform Your {category} with {product}',
  'Maximize {category} Efficiency with {product}',
  'Streamline {category} Operations',
  'Advanced {category} Made Simple',
  'The Complete {category} Solution',
  'Accelerate {category} Performance',
  'Intelligent {category} Management',
  'Optimize Your {category} Workflow',
  'Enterprise-Grade {category} Platform',
  'Smart {category} for Growing Teams',
  'Scale Your {category} with Confidence',
  'Next-Generation {category} Tools',
  'Revolutionize Your {category} Process',
  'Comprehensive {category} Insights',
  'Real-time {category} Control',
  'Future-Ready {category} Solution',
  'Drive {category} Excellence',
  'Complete {category} Automation',
  'Professional {category} Management',
  'Intelligent {category} Analytics'
];

const subheadlineTemplates = [
  'Boost productivity by {value}% while reducing costs. See results in {days} days.',
  'Trusted by {companies}+ companies worldwide. Experience the difference.',
  'Seamless integration with your existing tools. Go live in {days} days.',
  'Secure, scalable, and built for enterprise. Start your journey today.',
  'Industry-leading platform used by top teams globally.',
  'Automate workflows, save time, and focus on what matters.',
  'Real-time analytics and insights to drive better decisions.',
  'Comprehensive solution designed for modern businesses.',
  'Join {companies}+ organizations transforming their operations.',
  'Accelerate growth with intelligent management tools.'
];

const ctaTemplates = [
  'Start your free {days}-day trial. No credit card required.',
  'Get started with {product}. Schedule a demo today.',
  'See how {companies}+ teams transformed their operations. Get started now.',
  'Ready to revolutionize your workflow? Start free today.',
  'Book a personalized demo. 20-minute consultation included.',
  'Join leading companies. Start your trial.',
  'Experience {product} risk-free. Money-back guarantee.',
  'Get instant access. Full features unlocked.',
  'Start transforming today. Special offer inside.',
  'Claim your {days}-day free access now.'
];

const faqSets = [
  [
    { q: 'What integrations are available?', a: 'We integrate with 100+ business applications including Slack, Salesforce, HubSpot, Zapier, and custom APIs.' },
    { q: 'Can you connect to our legacy systems?', a: 'Yes, our team handles custom integrations. We support REST, SOAP, and FTP connections.' },
    { q: 'How is data synced between systems?', a: 'Real-time sync with webhook support. Data is never lost, and you maintain full control.' },
    { q: 'What support options do you offer?', a: 'Email, phone, live chat, and dedicated account managers for enterprise plans.' }
  ],
  [
    { q: 'Is our data encrypted?', a: 'Yes, end-to-end encryption with AES-256 and TLS 1.3 protocols.' },
    { q: 'Are you SOC 2 Type II certified?', a: 'Yes, fully compliant with SOC 2 Type II, GDPR, HIPAA, and ISO 27001.' },
    { q: 'Where is data stored?', a: 'Multi-region redundancy across certified data centers in US, EU, and APAC.' },
    { q: 'What is your response time?', a: 'Priority support responds within 1 hour. Standard support within 4 hours.' }
  ],
  [
    { q: 'How long does implementation take?', a: 'Typical deployment is 1-4 weeks depending on complexity. Express setup available.' },
    { q: 'Do you provide training?', a: 'Yes, comprehensive onboarding with personalized training sessions for your team.' },
    { q: 'Can we host on-premise?', a: 'Yes, we offer flexible deployment options including cloud, on-premise, and hybrid.' },
    { q: 'Do you have a knowledge base?', a: 'Comprehensive documentation, video tutorials, and community forums available 24/7.' }
  ],
  [
    { q: 'What is your pricing model?', a: 'Flexible per-user, per-transaction, or enterprise licensing. Custom quotes available.' },
    { q: 'Are there hidden fees?', a: 'No hidden fees. Transparent pricing with volume discounts and annual savings.' },
    { q: 'Can we try before buying?', a: 'Absolutely. Full-featured trial with no credit card required. Support included.' },
    { q: 'What security certifications do you have?', a: 'SOC 2 Type II, ISO 27001, GDPR, and HIPAA compliant.' }
  ]
];

const caseStudyChallenges = [
  'Manual workflows causing delays and errors in critical processes',
  'Lack of real-time visibility into operations across distributed teams',
  'Compliance risks due to inadequate audit trails and documentation',
  'High operational costs from inefficient resource allocation',
  'Data silos preventing informed decision-making and strategy',
  'Difficulty scaling processes as the company grows',
  'Poor team collaboration and communication across departments',
  'Legacy systems creating integration nightmares',
  'High employee turnover due to cumbersome processes',
  'Inability to meet customer SLAs consistently'
];

const caseStudyResults = [
  '{value}% improvement in operational efficiency',
  '{cost}% reduction in operational costs',
  '{time}+ hours saved monthly',
  'Deployed across {teams} teams in {duration}',
  'Achieved {percent}% faster project delivery',
  'Reduced errors by {value}%',
  'Improved customer satisfaction to {rating}%',
  'Generated ${amount}k in additional revenue',
  'Reduced compliance incidents by {value}%',
  'Improved employee engagement scores by {value}%'
];

const testimonialTemplates = [
  '{product} transformed how our team operates. We\'ve seen immediate ROI and can\'t imagine going back.',
  'Best investment we\'ve made. The team is more productive and our compliance score improved significantly.',
  'Exceptional platform with outstanding support. Implementation was seamless and faster than expected.',
  'We tried several competitors, but {product} stood out for ease of use and powerful features.',
  'The real-time insights have helped us make better decisions. Highly recommended.',
  'Outstanding customer support. They truly care about our success and provide proactive recommendations.',
  'Scaled from 10 to 100+ users without any issues. The platform grows with us.',
  'The ROI alone justified the investment. We\'re now evaluating additional modules.',
  'Perfect balance of functionality and simplicity. Our team adopted it in days, not weeks.',
  'Game-changer for our operations. Couldn\'t do what we do today without it.'
];

// Generate unique hero image for each page - 200 unique business/tech images
function getHeroImage(id) {
  const imageIds = [
    // Business & Office (1-50)
    '1552664730-d307ca884978', '1454165804606-c3d57bc86b40', '1497215842964-222b430dc094', '1522071820081-009f0129c71c',
    '1531482615713-2afd69097998', '1542744173-8e7e53415bb0', '1553028826-f4804a6dba3b', '1557804506-669a67965ba0',
    '1519389950473-47ba0277781c', '1504384308090-c894fdcc538d', '1560179707-f14e90ef3623', '1556761175-b413da4baf72',
    '1553484771-371a605b060b', '1542744095-291d1f67b221', '1521737711867-e3b97375f902', '1573164713714-d95e436ab8d6',
    '1556155092-490a1ba16284', '1551135049-8a33b5883817', '1559136555-9303baea8ebd', '1553877522-43269d4ea984',
    '1587440871875-191322ee64b0', '1556761223-4c4282c73f77', '1563986768609-322da13575f3', '1543269865-cbf427effbad',
    '1542626991-cbc4e32524cc', '1571624436279-b272aff752b5', '1542744094-3a31f272c490', '1521737604893-d14cc237f11d',
    '1559028012-481c04fa702d', '1517245386807-bb43f82c33c4', '1568992688065-536aad8a12f6', '1553775927-91d51386f8bc',
    '1486312338219-ce68d2c6f44d', '1497366216548-37526070297c', '1460925895917-adf4e2c9af2d', '1516534775068-bb6d68763650',
    '1600880292203-757bb62b4baf', '1551434678-e076c223a692', '1556155092-8707de31f9c4', '1542744173-05336fcc7ad4',
    '1551135049-22a26615a09f', '1556155092-8063ec2d4912', '1542744173-b3cd6377db95', '1556761175-5973dc0f32e7',
    '1553484771-371a605b060a', '1517245386807-bb43f82c33c3', '1542744173-b3cf6f7e0091', '1568992688065-536aad8a12f5',
    '1553775927-91d51386f8bb', '1486312338219-ce68d2c6f44c',
    // Tech & Analytics (51-100)
    '1551288049-bebda4e38f71', '1460925895917-afdab827c52f', '1504868584819-f8e8b4b6d7e3', '1518770660439-4636190af475',
    '1551434678-e076c223a691', '1563986768494-4dee2763ff3f', '1573164574472-797cdf4a583a', '1573164574511-73c773193279',
    '1573166364902-982ae23ae6d3', '1573166675921-076ea6b621ce', '1573497019418-b400bb3ab074', '1573497491765-dccce02483ef',
    '1573497620053-ea5300f94f21', '1573497620166-eab1c8c5d8b1', '1573497998959-d1f8c4d2f4ac', '1573498073150-75de5b5a1d4e',
    '1573498202620-d5d68d5d89d0', '1573498358351-08e2f959be64', '1574087988579-ea6f27295cfa', '1573497491766-55d8b5c9c39a',
    '1573497491767-77c3c3a8d0f5', '1573497491768-42b8e1d4e8a7', '1573497491769-9a3b5c6d7e8f', '1573497491770-1a2b3c4d5e6f',
    '1573497491771-2b3c4d5e6f7a', '1573497491772-3c4d5e6f7a8b', '1573497491773-4d5e6f7a8b9c', '1573497491774-5e6f7a8b9c0d',
    '1573497491775-6f7a8b9c0d1e', '1573497491776-7a8b9c0d1e2f', '1573497491777-8b9c0d1e2f3a', '1573497491778-9c0d1e2f3a4b',
    '1573497491779-0d1e2f3a4b5c', '1573497491780-1e2f3a4b5c6d', '1573497491781-2f3a4b5c6d7e', '1573497491782-3a4b5c6d7e8f',
    '1573497491783-4b5c6d7e8f9a', '1573497491784-5c6d7e8f9a0b', '1573497491785-6d7e8f9a0b1c', '1573497491786-7e8f9a0b1c2d',
    '1573497491787-8f9a0b1c2d3e', '1573497491788-9a0b1c2d3e4f', '1573497491789-0b1c2d3e4f5a', '1573497491790-1c2d3e4f5a6b',
    '1573497491791-2d3e4f5a6b7c', '1573497491792-3e4f5a6b7c8d', '1573497491793-4f5a6b7c8d9e', '1573497491794-5a6b7c8d9e0f',
    '1573497491795-6b7c8d9e0f1a', '1573497491796-7c8d9e0f1a2b',
    // Workspace & Collaboration (101-150)
    '1497366811353-6870744d04b2', '1497366754146-60ec7c8e4d63', '1497366216552-37526070297d', '1497366811354-7981855e5c3a',
    '1497366754147-71ec8c5e5d74', '1497366216553-48637181408e', '1497366811355-89a2966f6f4b', '1497366754148-82fd9c6e6e85',
    '1497366216554-59748292519f', '1497366811356-9ab4077f7f5c', '1497366754149-93ge0d7f7f96', '1497366216555-6a85938362af',
    '1497366811357-a4c5188f8f6d', '1497366754150-a4f61e8e8fa7', '1497366216556-7b96a49473bf', '1497366811358-b5d6299f9f7e',
    '1497366754151-b5g72f9f9gb8', '1497366216557-8ca7b5a584cf', '1497366811359-c6e7310faf8f', '1497366754152-c6h83gafagc9',
    '1497366216558-9db8c6b695df', '1497366811360-d7f8421fbf9f', '1497366754153-d7i94hbfbhda', '1497366216559-aec9d7c7a6ef',
    '1497366811361-e8g9532gcgaf', '1497366754154-e8j05icgcieb', '1497366216560-bfd0e8d8b7ff', '1497366811362-f9ha643hdhabf',
    '1497366754155-f9k16jdhdjefc', '1497366216561-cge1f9e9c8ff', '1497366811363-gajb754ieibjf', '1497366754156-gal27keiekefd',
    '1497366216562-dhf2fafa d9ff', '1497366811364-hbkc865jfjckf', '1497366754157-hbm38lfjflfge', '1497366216563-eig3gbgbeaff',
    '1497366811365-icld976kgkdlf', '1497366754158-icn49mgmgmfgf', '1497366216564-fjh4hchcfbff', '1497366811366-jdme087lhlelf',
    '1497366754159-jdo50nhnhnghf', '1497366216565-gki5ididfcff', '1497366811367-kenf198mimemf', '1497366754160-kep61oioiohif',
    '1497366216566-hlj6jejegdff', '1497366811368-lfog209njnemf', '1497366754161-lfq72pjpjpijf', '1497366216567-imk7kfkfheff',
    '1497366811369-mgph310okoflf', '1497366754162-mgs83qkqkqjkf',
    // Modern Office & Teams (151-200)
    '1517048676732-d65bc937f952', '1517502884422-41eaead166d4', '1517245386807-bb43f82c33c4', '1517502166878-35de55f77805',
    '1517502474168-0c7d5c46c3c8', '1517502884423-52fbcd0d6f94', '1517502166879-46ef6e7805a5', '1517502474169-1d8e5d47d4d9',
    '1517502884424-63fcd0e6f0a4', '1517502166880-57fg7f8916b5', '1517502474170-2e9f6e58e5e9', '1517502884425-74ge1f7027c5',
    '1517502166881-68gh8g9a27c5', '1517502474171-3fa7f69f6fa9', '1517502884426-85hf2g8138d5', '1517502166882-79hi9h0b38d5',
    '1517502474172-4gb8g7a7g7b9', '1517502884427-96ig3h9249e5', '1517502166883-80ij0i1c49e5', '1517502474173-5hc9h8b8h8c9',
    '1517502884428-a7jh4i035af5', '1517502166884-91jk1j2d5af5', '1517502474174-6id0i9c9i9d9', '1517502884429-b8ki5j146bf5',
    '1517502166885-a2kl2k3e6bf5', '1517502474175-7je1j0d0j0e9', '1517502884430-c9lj6k257cf5', '1517502166886-b3lm3l4f7cf5',
    '1517502474176-8kf2k1e1k1f9', '1517502884431-d0mk7l368df5', '1517502166887-c4mn4m5g8df5', '1517502474177-9lg3l2f2l2g9',
    '1517502884432-e1nl8m479ef5', '1517502166888-d5no5n6h9ef5', '1517502474178-0mh4m3g3m3h9', '1517502884433-f2om9n580ff5',
    '1517502166889-e6op6o7i0ff5', '1517502474179-1ni5n4h4n4i9', '1517502884434-g3pn0o691gf5', '1517502166890-f7pq7p8j1gf5',
    '1517502474180-2oj6o5i5o5j9', '1517502884435-h4qo1p702hf5', '1517502166891-g8qr8q9k2hf5', '1517502474181-3pk7p6j6p6k9',
    '1517502884436-i5rp2q813if5', '1517502166892-h9rs9ral3if5', '1517502474182-4ql8q7k7q7l9', '1517502884437-j6sq3r924jf5',
    '1517502166893-i0st0sbm4jf5', '1517502474183-5rm9r8l8r8m9'
  ];
  const imageId = imageIds[id % imageIds.length];
  return `https://images.unsplash.com/photo-${imageId}?w=1200&h=800&fit=crop&auto=format&q=80`;
}

// Generate unique case study images
function getCaseStudyImage(id, caseIndex) {
  const imageIds = [
    '1552664730-d307ca884978', '1454165804606-c3d57bc86b40', '1516534775068-bb6d68763650', '1460925895917-adf4e2c9af2d',
    '1522071820081-009f0129c71c', '1531482615713-2afd69097998', '1497215842964-222b430dc094', '1542744173-8e7e53415bb0',
    '1553028826-f4804a6dba3b', '1557804506-669a67965ba0', '1519389950473-47ba0277781c', '1551836022-deb4988cc6c0',
    '1551434678-e076c223a692', '1556155092-490a1ba16284', '1542744095-291d1f67b221', '1521737711867-e3b97375f902',
    '1551836022-4c4c79ecde51', '1556155092-8707de31f9c4', '1542744173-05336fcc7ad4', '1517245386807-bb43f82c33c4',
    '1551836022-8b2858c9c69b', '1568992688065-536aad8a12f6', '1553775927-91d51386f8bc', '1542744173-b3cd6377db95',
    '1573164713714-d95e436ab8d6', '1551135049-8a33b5883817', '1559136555-9303baea8ebd', '1553877522-43269d4ea984',
    '1587440871875-191322ee64b0', '1556761223-4c4282c73f77'
  ];
  const index = (id * 7 + caseIndex * 13) % imageIds.length;
  const imageId = imageIds[index];
  return `https://images.unsplash.com/photo-${imageId}?w=800&h=600&fit=crop&auto=format&q=80`;
}

// Generate unique testimonial images
function getTestimonialImage(id, testimonialIndex) {
  const imageIds = [
    '1507003211169-0a1dd7228f2d', '1494790108377-be9c29b29330', '1438761681033-6461ffad8d80', '1500648767791-00dcc994a43e',
    '1472099645785-5658abf4ff4e', '1519345182560-3f2917c472ef', '1573496359142-b8d87734a5a2', '1560250097-0b93528c311a',
    '1506794778202-cad84cf45f1d', '1519085360753-af0119f7cbe7', '1573497019940-1c28c88b4f3e', '1535713875002-d1d0cf377fde',
    '1580489944761-15a19d654956', '1520409364224-63400afe26e5', '1539571696357-5a69c17a67c6', '1524504388940-b1c1722653e1',
    '1566492031773-4f4e44671857', '1573496799652-408c2ac9fe98', '1544005313-94ddf0286df2', '1531746020798-e6953c6e8e04',
    '1542909168-82c3e7fdca5c', '1546961329-78bef0414d7c', '1557862921-37829c790f19', '1521119989659-a83eee488004',
    '1545167622-3a6ac756afa4', '1552058544-f2b08422138a', '1548142813-c348350df52b', '1552374196-c4e7ffc6e126',
    '1513956589380-bad6acb9b9d4', '1534030347209-467a5b0ad3e6', '1522556189639-b150ed9c4330', '1488426862026-3ee34a7d66df',
    '1489424731084-a5d8b219a5bb', '1487412720507-e7ab37603c6f', '1507591064344-4c6ce005b128', '1551069613-1904dbdcda11',
    '1558203728-00f45181dd84', '1531384441138-2736e62e0919', '1502767089025-6572583495f9', '1509967419530-da38b4704bc6'
  ];
  const index = (id * 11 + testimonialIndex * 19) % imageIds.length;
  const imageId = imageIds[index];
  return `https://images.unsplash.com/photo-${imageId}?w=300&h=300&fit=crop&auto=format&q=80`;
}

function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generateMarketingPage(pageInfo, index) {
  const id = parseInt(pageInfo.id);
  const seed = id * 12345;
  let rngIndex = 0;
  const random = () => {
    rngIndex++;
    return seededRandom(seed + rngIndex);
  };

  const title = pageInfo.title;
  const url = pageInfo.url;
  const category = pageInfo.category;

  // Generate tags
  const tags = [];
  if (id % 3 === 0) tags.push('Enterprise');
  else if (id % 2 === 0) tags.push('B2B');
  else tags.push('SMB');
  if (id % 4 === 0) tags.push('Automation');
  if (id % 5 === 0) tags.push('Analytics');
  if (id % 6 === 0) tags.push('Cloud');

  // Generate metrics
  const leads = Math.floor(150 + random() * 450);
  const conversionRate = parseFloat((8 + random() * 14).toFixed(1));
  const conversions = Math.floor(leads * (conversionRate / 100));

  const statuses = ['active', 'active', 'active', 'active', 'paused', 'draft'];
  const status = statuses[Math.floor(random() * statuses.length)];

  const budget = Math.floor(10000 + random() * 50000);
  const roi = Math.floor(80 + random() * 70);
  const pageViews = Math.floor(leads * (5 + random() * 10));
  const engagementRate = parseFloat((10 + random() * 25).toFixed(1));
  const clickThroughRate = parseFloat((2 + random() * 5).toFixed(2));
  const costPerLead = parseFloat((budget / leads).toFixed(2));
  const costPerConversion = parseFloat((budget / (conversions || 1)).toFixed(2));

  const trafficSources = ['Organic Search', 'Paid Ads', 'Social Media', 'Direct', 'Referral', 'Email', 'Content Marketing'];
  const trafficSource = trafficSources[Math.floor(random() * trafficSources.length)];

  const audiences = ['IT Directors', 'HR Managers', 'Finance Controllers', 'Operations Leaders', 'C-Suite', 'Business Analysts', 'Project Managers'];
  const targetAudience = audiences[Math.floor(random() * audiences.length)];

  const durations = ['3 months', '6 months', '12 months', 'Ongoing'];
  const campaignDuration = durations[Math.floor(random() * durations.length)];

  const trends = ['up', 'down', 'stable'];
  const performanceTrend = trends[Math.floor(random() * trends.length)];

  const createdDate = `2025-${String((id % 12) + 1).padStart(2, '0')}-${String((id % 28) + 1).padStart(2, '0')}`;
  const updatedDate = `2026-${String((id % 12) + 1).padStart(2, '0')}-${String((id % 28) + 1).padStart(2, '0')}`;

  // Hero content
  const headlineTemplate = headlineTemplates[id % headlineTemplates.length];
  const heroHeadline = headlineTemplate.replace('{category}', category).replace('{product}', title);

  const subheadlineTemplate = subheadlineTemplates[id % subheadlineTemplates.length];
  const heroSubheadline = subheadlineTemplate
    .replace('{value}', (25 + id % 35))
    .replace('{days}', (7 + id % 14))
    .replace('{companies}', (100 + id * 5));

  const heroImage = getHeroImage(id);

  // Key features - select 6 unique features for 2 full rows of 3
  const selectedFeatures = [];
  const usedIndices = new Set();
  while (selectedFeatures.length < 6) {
    const idx = Math.floor(random() * features.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      selectedFeatures.push({
        id: `feature-${selectedFeatures.length}`,
        name: features[idx].name,
        description: features[idx].description,
        icon: features[idx].icon
      });
    }
  }

  // Value proposition
  const valueProposition = [
    { metric: 'Efficiency Gain', value: `${25 + (id * 7) % 45}%`, description: 'Streamline operations and eliminate manual processes' },
    { metric: 'Time Saved', value: `${12 + (id * 3) % 30}h/week`, description: 'Focus on strategic work, not tedious tasks' },
    { metric: 'Cost Savings', value: `${25 + (id * 5) % 50}%`, description: 'Reduce overhead and improve bottom line' }
  ];

  // Case studies
  const numCaseStudies = 2 + Math.floor(random() * 2);
  const caseStudies = [];
  for (let i = 0; i < numCaseStudies; i++) {
    const companyIndex = (id * 7 + i * 13) % companyNames.length;
    const locationIndex = (id * 11 + i * 17) % locations.length;
    const challengeIndex = (id + i) % caseStudyChallenges.length;
    const resultIndex = (id * 3 + i) % caseStudyResults.length;

    caseStudies.push({
      id: `case-${i}`,
      company: companyNames[companyIndex],
      location: locations[locationIndex],
      challenge: caseStudyChallenges[challengeIndex],
      solution: `${companyNames[companyIndex]} implemented ${title} across their organization with custom configuration to match their unique workflows.`,
      result: caseStudyResults[resultIndex]
        .replace('{value}', (30 + (id * 5 + i) % 40))
        .replace('{cost}', (20 + (id * 3 + i) % 35))
        .replace('{time}', (40 + (id * 8 + i) % 100))
        .replace('{teams}', (5 + (id + i) % 15))
        .replace('{duration}', (2 + (id % 6)) + ' weeks')
        .replace('{percent}', (25 + (id * 4 + i) % 45))
        .replace('{rating}', (90 + (id * 2 + i) % 10))
        .replace('{amount}', (50 + (id * 10 + i * 5))),
      image: getCaseStudyImage(id, i)
    });
  }

  // Testimonials - always 4 for 2 full rows of 2
  const numTestimonials = 4;
  const testimonials = [];
  for (let i = 0; i < numTestimonials; i++) {
    const authorIndex = (id * 13 + i * 19) % authorNames.length;
    const roleIndex = (id * 7 + i * 11) % roles.length;
    const companyIndex = (id * 11 + i * 23) % companyNames.length;
    const testimonialIndex = (id * 17 + i * 31) % testimonialTemplates.length;

    testimonials.push({
      id: `testimonial-${i}`,
      author: authorNames[authorIndex],
      role: roles[roleIndex],
      company: companyNames[companyIndex],
      content: testimonialTemplates[testimonialIndex].replace('{product}', title),
      rating: parseFloat((4.3 + random() * 0.7).toFixed(1)),
      image: getTestimonialImage(id, i)
    });
  }

  // FAQs
  const faqSet = faqSets[id % faqSets.length];
  const faqs = faqSet.map((faq, i) => ({
    id: `faq-${i}`,
    question: faq.q,
    answer: faq.a
  }));

  // Industry stats
  const industryStats = [
    { label: 'Companies Using', value: `${50 + (id * 7) % 250}k+` },
    { label: 'Customer Satisfaction', value: `${92 + (id * 2) % 8}%` },
    { label: 'Average ROI', value: `${140 + (id * 3) % 180}%` },
    { label: 'Uptime Guarantee', value: '99.9%' },
    { label: 'Deployment Speed', value: '< 2 weeks' },
    { label: 'Integration Partners', value: `${80 + (id % 120)}+` }
  ];

  // CTA
  const ctaTemplate = ctaTemplates[id % ctaTemplates.length];
  const ctaText = ctaTemplate
    .replace('{days}', (7 + id % 21))
    .replace('{product}', title)
    .replace('{companies}', (50 + id * 5));

  return {
    id: pageInfo.id,
    title,
    url,
    category,
    tags,
    leads,
    conversions,
    conversionRate,
    status,
    description: `${title} - ${category} solution for modern businesses. Transform your ${category.toLowerCase()} with intelligent automation.`,
    createdDate,
    updatedDate,
    budget,
    roi,
    pageViews,
    engagementRate,
    clickThroughRate,
    costPerLead,
    costPerConversion,
    trafficSource,
    targetAudience,
    campaignDuration,
    performanceTrend,
    notes: `Campaign performing strongly. Key driver: ${trafficSource}. Top audience: ${targetAudience}. Recommendation: Optimize ${trafficSource.toLowerCase()} channel.`,
    heroHeadline,
    heroSubheadline,
    heroImage,
    keyFeatures: selectedFeatures,
    valueProposition,
    caseStudies,
    testimonials,
    faqs,
    industryStats,
    ctaText,
    ctaButtonText: 'Start Your Free Trial'
  };
}

// Generate all 200 pages using dashboard URLs
const allPages = dashboardPages.map((page, index) => generateMarketingPage(page, index));

// Read the current page.tsx file
const pagePath = path.join(__dirname, 'app', 'marketing', '[slug]', 'page.tsx');
const pageContent = fs.readFileSync(pagePath, 'utf-8');

// Extract the interface and rest of the file
const interfaceEndIndex = pageContent.indexOf('const mockMarketingPages');
const fileStart = pageContent.substring(0, interfaceEndIndex);

// Generate the new mock data as TypeScript code
let mockDataCode = 'const mockMarketingPages: MarketingPage[] = [\n';

allPages.forEach((page, index) => {
  mockDataCode += '  {\n';

  Object.keys(page).forEach((key) => {
    const value = page[key];
    let formattedValue;

    if (typeof value === 'string') {
      formattedValue = `'${value.replace(/'/g, "\\'")}'`;
    } else if (typeof value === 'number') {
      formattedValue = value;
    } else if (typeof value === 'boolean') {
      formattedValue = value;
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        formattedValue = '[]';
      } else if (typeof value[0] === 'string') {
        formattedValue = `[${value.map(v => `'${v}'`).join(', ')}]`;
      } else {
        formattedValue = JSON.stringify(value, null, 0).replace(/\n/g, '\n    ');
      }
    } else if (value === null) {
      formattedValue = 'null';
    }

    mockDataCode += `    ${key}: ${formattedValue},\n`;
  });

  mockDataCode += '  }';
  if (index < allPages.length - 1) {
    mockDataCode += ',';
  }
  mockDataCode += '\n';
});

mockDataCode += '];\n\n';

// Find the export statement
const exportIndex = pageContent.indexOf('export default async function');
const fileEnd = pageContent.substring(exportIndex);

// Write the new file
const newContent = fileStart + mockDataCode + fileEnd;
fs.writeFileSync(pagePath, newContent);

console.log('Generated 200 marketing pages with synced URLs from dashboard');
console.log('Updated: ' + pagePath);

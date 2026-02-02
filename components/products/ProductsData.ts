import { LucideIcon } from "lucide-react";
import {
  Clock,
  MapPin,
  Timer,
  Coffee,
  Monitor,
  Activity,
  Camera,
  Moon,
  Globe,
  Brain,
  Sparkles,
  UserCog,
  Lightbulb,
  AlertTriangle,
  Play,
  FileCheck,
  ClipboardList,
  History,
  Users,
  Shield,
  UserPlus,
  Building2,
  LayoutDashboard,
  FileBarChart,
  FileText,
  Mail,
  Download,
  MonitorSmartphone,
  Keyboard,
  Bell,
  Wifi,
  Power,
  KeyRound,
  LogOut,
  Lock,
  Gauge,
  Image,
  Hourglass,
  CalendarClock,
  ToggleLeft,
  BarChart3,
  TrendingUp,
  Cpu,
  Briefcase,
  Network,
} from "lucide-react";

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  color: string;
  keywords: string[];
  features: Feature[];
  faqs: FAQ[];
}

export const productCategories: Category[] = [
  {
    id: "workforce-analytics",
    title: "Workforce Analytics",
    description: "Comprehensive insights into team performance, attendance, and work patterns with precision tracking.",
    icon: BarChart3,
    gradient: "from-blue-500 to-cyan-500",
    color: "#0ea5e9",
    keywords: [
      "Attendance Automation",
      "Performance Insights",
      "Time Tracking",
      "Productivity Analysis",
      "Real-time Monitoring",
      "Team Analytics",
    ],
    features: [
      {
        id: "attendance-tracking",
        icon: MapPin,
        title: "Attendance Tracking",
        description: "Automatically track punch-ins and punch-outs with location-based verification for accurate attendance records. Monitor late arrivals, early departures, and overtime hours in real-time. Generate comprehensive attendance reports for payroll processing and compliance audits.",
      },
      {
        id: "time-tracking",
        icon: Clock,
        title: "Time Tracking",
        description: "Monitor work sessions with precise start and end timestamps to capture every minute of productive time. Identify time gaps and analyze how employees spend their work hours across different tasks and projects. Perfect for billing clients, managing deadlines, and optimizing team schedules.",
      },
      {
        id: "productivity-tracking",
        icon: TrendingUp,
        title: "Productivity Tracking",
        description: "Measure daily productivity scores based on active work time, application usage, and task completion rates. Analyze individual and team work patterns to identify peak performance hours and improvement opportunities. Set productivity goals and track progress with visual dashboards and trend reports.",
      },
      {
        id: "break-management",
        icon: Coffee,
        title: "Break Management",
        description: "Track scheduled and unscheduled breaks to ensure employees maintain healthy work-life balance. Set customizable break reminders to prevent burnout and promote wellness. Monitor break duration and frequency to ensure compliance with company policies and labor regulations.",
      },
    ],
    faqs: [
      {
        id: 1,
        question: "How does attendance tracking work?",
        answer: "Track Nexus automatically records punch-in and punch-out times when employees start and stop working. The system uses location verification and can detect when employees are actively working on their computers.",
      },
      {
        id: 2,
        question: "Can I track remote employees?",
        answer: "Yes, Track Nexus is designed for both in-office and remote teams. The desktop application tracks work activity regardless of location, and you can monitor productivity metrics for distributed teams in real-time.",
      },
      {
        id: 3,
        question: "What attendance reports are available?",
        answer: "You can generate daily, weekly, and monthly attendance reports showing work hours, late arrivals, early departures, and overtime. Reports can be exported to PDF or Excel for payroll processing.",
      },
      {
        id: 4,
        question: "How accurate is time tracking?",
        answer: "Time tracking is precise to the second. The system continuously monitors active work sessions and accurately captures productive time, breaks, and idle periods throughout the workday.",
      },
    ],
  },
  {
    id: "productivity-monitoring",
    title: "Productivity Monitoring",
    description: "Real-time visibility into your team's work status with detailed activity breakdowns and insights.",
    icon: Monitor,
    gradient: "from-indigo-500 to-purple-500",
    color: "#8b5cf6",
    keywords: [
      "Employee Monitoring",
      "Activity Tracking",
      "Screenshot Capture",
      "Idle Detection",
      "App Usage Tracking",
      "Work Status Visibility",
    ],
    features: [
      {
        id: "employee-monitoring",
        icon: Monitor,
        title: "Employee Monitoring",
        description: "Get real-time visibility into your entire team's work status with live dashboards showing who's active, idle, or on break. Monitor remote and in-office employees equally with consistent tracking across all locations. Receive instant notifications for unusual activity patterns or extended idle periods.",
      },
      {
        id: "activity-insights",
        icon: Activity,
        title: "Activity Insights",
        description: "View detailed activity breakdowns showing exactly how time is spent across applications, websites, and tasks. Identify your team's most-used tools and discover workflow inefficiencies with visual analytics. Compare activity patterns across team members and departments to optimize resource allocation.",
      },
      {
        id: "screenshot-monitoring",
        icon: Camera,
        title: "Screenshot Monitoring",
        description: "Capture automatic screenshots at customizable intervals from 1 to 60 minutes for workplace accountability. All screenshots are securely stored with access controls and automatic blur for sensitive content. Review visual work evidence to ensure quality, provide feedback, and resolve disputes fairly.",
      },
      {
        id: "idle-time-detection",
        icon: Moon,
        title: "Idle Time Detection",
        description: "Automatically detect inactive periods when no keyboard or mouse activity is registered for configurable thresholds. Allow employees to claim idle time with explanations for legitimate reasons like meetings or phone calls. Maintain accurate time records that distinguish between true idle time and productive offline work.",
      },
      {
        id: "app-website-usage",
        icon: Globe,
        title: "App & Website Usage",
        description: "Track every application and website accessed during work hours with detailed usage duration and frequency reports. Categorize apps as productive, unproductive, or neutral based on job roles and company policies. Identify time-wasting activities and help employees focus on work that matters most.",
      },
    ],
    faqs: [
      {
        id: 1,
        question: "How are screenshots captured?",
        answer: "Screenshots are captured automatically at configurable intervals (1-60 minutes). The desktop app takes screenshots silently in the background without disrupting work. All screenshots are securely stored and accessible only to authorized managers.",
      },
      {
        id: 2,
        question: "What triggers idle detection?",
        answer: "Idle detection is triggered when there's no keyboard or mouse activity for a configurable period (default 5 minutes). The system differentiates between short breaks and extended idle periods, allowing employees to claim idle time with explanations.",
      },
      {
        id: 3,
        question: "Can employees see their own monitoring data?",
        answer: "Yes, employees can view their own productivity scores, work hours, and activity summaries through the employee portal. This transparency helps them understand their work patterns and improve productivity.",
      },
      {
        id: 4,
        question: "Is app usage tracking privacy-compliant?",
        answer: "Yes, Track Nexus is designed with privacy in mind. We only track work-related activity during designated work hours. Personal data is not collected, and all monitoring complies with GDPR and other privacy regulations.",
      },
    ],
  },
  {
    id: "ai-powered-intelligence",
    title: "AI-Powered Intelligence",
    description: "Leverage artificial intelligence for comprehensive reports, smart classifications, and actionable insights.",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
    color: "#ec4899",
    keywords: [
      "AI Reports",
      "Smart Classification",
      "Role-Based Analysis",
      "Personalized Recommendations",
      "Anomaly Detection",
      "Predictive Insights",
    ],
    features: [
      {
        id: "ai-productivity-reports",
        icon: Sparkles,
        title: "AI Productivity Reports",
        description: "Generate comprehensive AI-analyzed reports with productivity scores, trend analysis, and actionable insights. Our machine learning algorithms identify patterns in work behavior to highlight strengths and areas for improvement. Schedule automated reports daily, weekly, or monthly with customizable metrics and visualizations.",
      },
      {
        id: "smart-activity-classification",
        icon: Cpu,
        title: "Smart Activity Classification",
        description: "Automatically categorize every application and website as productive, unproductive, or neutral based on intelligent role analysis. The AI learns from your organization's unique workflows to provide increasingly accurate classifications over time. Eliminate manual categorization and get instant productivity insights.",
      },
      {
        id: "role-based-analysis",
        icon: UserCog,
        title: "Role-Based Analysis",
        description: "Customize productivity rules for 20+ predefined job roles including Developers, Marketers, Designers, Sales, HR, and more. Each role has tailored app classifications that reflect their actual work requirements. Create custom roles with specific productivity criteria unique to your organization.",
      },
      {
        id: "personalized-recommendations",
        icon: Lightbulb,
        title: "Personalized Recommendations",
        description: "Receive AI-generated suggestions to improve individual and team productivity based on actual work patterns. Get actionable tips like optimal break times, focus hours, and workflow improvements tailored to each employee. Track recommendation implementation and measure the impact on performance metrics.",
      },
      {
        id: "fake-activity-detection",
        icon: AlertTriangle,
        title: "Fake Activity Detection",
        description: "Identify suspicious patterns like mouse jigglers, frozen screens, repetitive keystrokes, and simulated activity. Our AI distinguishes between genuine work breaks and attempts to game the monitoring system. Receive alerts for anomalies while respecting legitimate variations in work style.",
      },
    ],
    faqs: [
      {
        id: 1,
        question: "How does AI classify activities as productive?",
        answer: "Our AI analyzes application usage patterns based on job roles. For developers, coding tools are productive; for designers, creative software is productive. You can customize these rules to match your organization's definitions.",
      },
      {
        id: 2,
        question: "What is fake activity detection?",
        answer: "Fake activity detection identifies suspicious patterns like mouse jigglers, frozen screens, or repetitive keyboard inputs. The AI learns normal work patterns and flags anomalies for manager review.",
      },
      {
        id: 3,
        question: "How often are AI reports generated?",
        answer: "AI reports can be generated on-demand or scheduled daily, weekly, or monthly. Each report includes productivity scores, trend analysis, and personalized recommendations for improvement.",
      },
      {
        id: 4,
        question: "Can I customize productivity rules per role?",
        answer: "Yes, Track Nexus supports 20+ predefined job roles with customizable productivity rules. You can modify which apps and websites count as productive for each role or create custom role definitions.",
      },
    ],
  },
  {
    id: "work-management",
    title: "Work Management",
    description: "Monitor work sessions, manage idle time claims, and maintain complete audit trails of all activities.",
    icon: Briefcase,
    gradient: "from-teal-500 to-green-500",
    color: "#14b8a6",
    keywords: [
      "Session Tracking",
      "Idle Time Claims",
      "Approval Workflows",
      "Activity Logs",
      "Audit Trails",
      "Task Management",
    ],
    features: [
      {
        id: "work-session-tracking",
        icon: Play,
        title: "Work Session Tracking",
        description: "Monitor individual work sessions with precise start and end timestamps for complete transparency. Track session duration, activity levels, and breaks taken throughout each work period. View historical session data to analyze productivity patterns and identify areas for improvement.",
      },
      {
        id: "idle-time-claims",
        icon: Timer,
        title: "Idle Time Claims",
        description: "Empower employees to submit idle time claims with explanations for legitimate non-computer activities like meetings or calls. Managers receive instant notifications and can review claims with full context before approval. Maintain fair and accurate time records that account for all productive work activities.",
      },
      {
        id: "approval-workflows",
        icon: FileCheck,
        title: "Approval Workflows",
        description: "Streamline manager decision-making with one-click approve or reject actions for break requests and idle claims. Set up automatic approval rules based on duration, frequency, or reason categories to reduce manual workload. Track approval history and response times to ensure timely processing.",
      },
      {
        id: "activity-logs",
        icon: History,
        title: "Activity Logs",
        description: "Maintain comprehensive audit trails capturing every work event from session starts to application switches. Store logs securely with configurable retention periods for compliance and dispute resolution. Export detailed activity records for external auditing, payroll verification, or legal requirements.",
      },
    ],
    faqs: [
      {
        id: 1,
        question: "How do idle time claims work?",
        answer: "When employees are away from their computer, they can submit an idle time claim explaining the reason (meeting, phone call, etc.). Managers receive notifications and can approve or reject claims with one click.",
      },
      {
        id: 2,
        question: "What approval workflows are available?",
        answer: "Track Nexus supports customizable approval workflows for break requests, idle time claims, and time-off requests. Managers can set auto-approval rules or require manual review based on duration or frequency.",
      },
      {
        id: 3,
        question: "How detailed are the activity logs?",
        answer: "Activity logs capture every work event including session starts/stops, application switches, break times, and manager actions. Logs are retained for your configured retention period and can be exported for auditing.",
      },
      {
        id: 4,
        question: "Can I track individual work sessions?",
        answer: "Yes, each work session is tracked with precise timestamps, duration, and activity breakdown. You can view session history for any employee and analyze their work patterns over time.",
      },
    ],
  },
  {
    id: "team-management",
    title: "Team Management",
    description: "Create and manage employee accounts with role-based access control and team organization.",
    icon: Users,
    gradient: "from-orange-500 to-amber-500",
    color: "#f59e0b",
    keywords: [
      "User Management",
      "Role-Based Access",
      "Team Assignment",
      "Multi-Company Support",
      "Permission Control",
      "Employee Onboarding",
    ],
    features: [
      {
        id: "user-management",
        icon: UserPlus,
        title: "User Management",
        description: "Create, update, and manage employee accounts with comprehensive profile management and role-based access control. Easily onboard new team members with automated invitation emails and guided setup workflows. Maintain complete employee records including contact details, job roles, departments, and reporting structures.",
      },
      {
        id: "role-based-access",
        icon: Shield,
        title: "Role-Based Access",
        description: "Assign granular permissions with four distinct roles: SuperAdmin for full system control, Admin for company-wide management, Manager for team oversight, and User for employee self-service. Each role has carefully designed permissions that balance functionality with data security. Customize access levels to match your organizational hierarchy.",
      },
      {
        id: "team-assignment",
        icon: Network,
        title: "Team Assignment",
        description: "Organize your workforce into logical teams with drag-and-drop simplicity and assign reporting managers effortlessly. Create hierarchical structures that mirror your organization for accurate reporting and permissions. Move employees between teams and update assignments without losing historical data.",
      },
      {
        id: "multi-company-support",
        icon: Building2,
        title: "Multi-Company Support",
        description: "Manage multiple companies, subsidiaries, or client organizations from a single dashboard with complete data isolation. Each company maintains separate configurations, users, and settings while SuperAdmins can switch between entities seamlessly. Perfect for agencies, franchises, and multi-location businesses.",
      },
    ],
    faqs: [
      {
        id: 1,
        question: "What user roles are available?",
        answer: "Track Nexus offers four roles: SuperAdmin (full system access), Admin (company-wide management), Manager (team oversight), and User (employee access). Each role has specific permissions tailored to their responsibilities.",
      },
      {
        id: 2,
        question: "Can I manage multiple companies?",
        answer: "Yes, Track Nexus supports multi-company management. Each company has isolated data, separate configurations, and independent user bases. SuperAdmins can switch between companies seamlessly.",
      },
      {
        id: 3,
        question: "How do I assign team managers?",
        answer: "Navigate to Team Management, select the team, and assign a manager from the dropdown. Managers automatically gain access to their team members' productivity data and approval workflows.",
      },
      {
        id: 4,
        question: "Is there bulk user import?",
        answer: "Yes, you can import users via CSV file with columns for name, email, role, and team. The system validates data and sends automatic invitation emails to new users.",
      },
    ],
  },
  {
    id: "reports-analytics",
    title: "Reports & Analytics",
    description: "View key metrics on a unified dashboard with detailed reports and flexible export options.",
    icon: FileBarChart,
    gradient: "from-cyan-500 to-blue-500",
    color: "#06b6d4",
    keywords: [
      "Dashboard Analytics",
      "Attendance Reports",
      "AI Summaries",
      "Email Reports",
      "Export Options",
      "Data Visualization",
    ],
    features: [
      {
        id: "dashboard-overview",
        icon: LayoutDashboard,
        title: "Dashboard Overview",
        description: "Access all critical metrics from a unified dashboard showing real-time team status, productivity scores, and attendance rates. Visualize trends with interactive charts that update automatically as new data arrives. Customize your dashboard layout to prioritize the metrics most important to your workflow.",
      },
      {
        id: "attendance-reports",
        icon: ClipboardList,
        title: "Attendance Reports",
        description: "Generate comprehensive attendance reports with flexible date ranges covering days, weeks, or entire months. Track patterns like late arrivals, early departures, overtime, and absenteeism across individuals or teams. Filter and sort data by department, role, or custom criteria for targeted analysis.",
      },
      {
        id: "ai-summary-reports",
        icon: FileText,
        title: "AI Summary Reports",
        description: "Get intelligent, human-readable summaries of productivity data generated by our AI with a single click. Receive insights about work patterns, performance trends, and actionable recommendations for individuals, teams, or the entire organization. Save hours of manual analysis with automated narrative reports.",
      },
      {
        id: "email-reports",
        icon: Mail,
        title: "Email Reports",
        description: "Schedule automated report delivery daily, weekly, or monthly to keep stakeholders informed without manual effort. Customize recipient lists, report content, and delivery times to match your organization's communication needs. Track email delivery and engagement to ensure reports reach the right people.",
      },
      {
        id: "export-options",
        icon: Download,
        title: "Export Options",
        description: "Export any report to PDF for professional presentations or Excel/CSV for advanced data analysis and integration. Maintain consistent formatting across exports with branded templates and customizable layouts. Schedule automatic exports to shared folders or cloud storage for seamless workflows.",
      },
    ],
    faqs: [
      {
        id: 1,
        question: "What export formats are available?",
        answer: "Reports can be exported to PDF for presentations or Excel/CSV for data analysis. All exports include the selected date range, metrics, and visualizations from the dashboard.",
      },
      {
        id: 2,
        question: "Can I schedule automatic reports?",
        answer: "Yes, you can schedule daily, weekly, or monthly reports to be automatically generated and emailed to specified recipients. Configure report content, format, and delivery time in settings.",
      },
      {
        id: 3,
        question: "What metrics are shown on the dashboard?",
        answer: "The dashboard displays real-time metrics including active users, total work hours, productivity scores, attendance rates, top applications, and team performance comparisons with trend charts.",
      },
      {
        id: 4,
        question: "How do AI summaries work?",
        answer: "AI summaries analyze productivity data and generate human-readable insights about work patterns, productivity trends, and improvement suggestions. Available for individuals, teams, or the entire organization.",
      },
    ],
  },
  {
    id: "desktop-application",
    title: "Desktop Application",
    description: "Lightweight desktop app with system tray integration, keyboard shortcuts, and offline support.",
    icon: MonitorSmartphone,
    gradient: "from-slate-500 to-gray-600",
    color: "#64748b",
    keywords: [
      "System Tray",
      "Keyboard Shortcuts",
      "Break Reminders",
      "Offline Support",
      "Auto-Start",
      "Cross-Platform",
    ],
    features: [
      {
        id: "system-tray-integration",
        icon: MonitorSmartphone,
        title: "System Tray Integration",
        description: "Run the application silently in the background while maintaining quick access from the system tray for instant control. View your current work status, active time, and break options with a single click on the tray icon. Minimize distractions while keeping productivity tracking always accessible.",
      },
      {
        id: "global-keyboard-shortcuts",
        icon: Keyboard,
        title: "Global Keyboard Shortcuts",
        description: "Control tracking instantly with customizable keyboard shortcuts that work from any application. Toggle tracking on/off, start or end breaks, and capture manual screenshots without switching windows. Configure your preferred key combinations in settings to match your workflow habits.",
      },
      {
        id: "break-reminders",
        icon: Bell,
        title: "Break Reminders",
        description: "Receive gentle, periodic notifications encouraging employees to take healthy breaks and prevent burnout. Customize reminder intervals and messages to align with your company's wellness policies. Track break compliance and promote a healthier work-life balance across your organization.",
      },
      {
        id: "offline-support",
        icon: Wifi,
        title: "Offline Support",
        description: "Continue tracking work activity seamlessly even without an internet connection for uninterrupted productivity monitoring. All data is securely stored locally and automatically syncs to the cloud when connectivity is restored. Never lose tracking data due to network issues or remote work locations.",
      },
      {
        id: "auto-start",
        icon: Power,
        title: "Auto-Start",
        description: "Configure the application to launch automatically when employees log into their computers for consistent tracking. Ensure monitoring begins immediately without requiring manual intervention or user action. Set startup preferences at the organization level or allow individual customization.",
      },
    ],
    faqs: [
      {
        id: 1,
        question: "Which platforms are supported?",
        answer: "Track Nexus desktop application is available for Windows (10 and later) and macOS (10.14 and later). The application is lightweight and optimized for minimal system resource usage.",
      },
      {
        id: 2,
        question: "Does the app work offline?",
        answer: "Yes, the desktop app continues tracking work activity even without internet connection. All data is stored locally and automatically synced to the cloud when connectivity is restored.",
      },
      {
        id: 3,
        question: "How do keyboard shortcuts work?",
        answer: "Global keyboard shortcuts let you quickly start/stop tracking, take breaks, or capture manual screenshots. Shortcuts are customizable in the app settings and work even when the app is minimized.",
      },
      {
        id: 4,
        question: "Can the app auto-start with my computer?",
        answer: "Yes, you can enable auto-start in settings so the app launches automatically when you log in. This ensures tracking begins immediately without manual intervention.",
      },
    ],
  },
  {
    id: "security-compliance",
    title: "Security & Compliance",
    description: "Enterprise-grade security with two-factor authentication, encryption, and access controls.",
    icon: Lock,
    gradient: "from-red-500 to-rose-500",
    color: "#ef4444",
    keywords: [
      "OTP Authentication",
      "Session Management",
      "Data Encryption",
      "Rate Limiting",
      "Access Control",
      "Compliance Ready",
    ],
    features: [
      {
        id: "otp-authentication",
        icon: KeyRound,
        title: "OTP Authentication",
        description: "Add an extra layer of security with two-factor authentication requiring email OTP verification for every login. One-time passwords expire after 10 minutes and can only be used once, preventing unauthorized access. Protect your organization's sensitive productivity data from compromised credentials.",
      },
      {
        id: "session-management",
        icon: LogOut,
        title: "Session Management",
        description: "Enforce single active session per user to prevent credential sharing and unauthorized concurrent access. Administrators can force logout any user remotely when security concerns arise or devices are lost. Track active sessions and login history for complete audit visibility.",
      },
      {
        id: "data-encryption",
        icon: Lock,
        title: "Data Encryption",
        description: "Protect all sensitive data with industry-standard TLS 1.3 encryption in transit and AES-256 encryption at rest. Screenshots, activity logs, and personal information are secured with multiple layers of protection. Meet enterprise security requirements with encryption that exceeds compliance standards.",
      },
      {
        id: "rate-limiting",
        icon: Gauge,
        title: "Rate Limiting",
        description: "Defend against brute force attacks and API abuse with intelligent rate limiting that blocks suspicious activity patterns. Failed login attempts trigger temporary lockouts while legitimate users experience no disruption. Receive alerts for unusual access patterns requiring investigation.",
      },
    ],
    faqs: [
      {
        id: 1,
        question: "How does OTP authentication work?",
        answer: "When logging in, users receive a one-time password via email that must be entered to complete authentication. OTPs expire after 10 minutes and can only be used once for enhanced security.",
      },
      {
        id: 2,
        question: "Is employee data encrypted?",
        answer: "Yes, all data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Screenshots and sensitive information are stored securely with access controls.",
      },
      {
        id: 3,
        question: "Can I force logout a user remotely?",
        answer: "Yes, administrators can force logout any user from the admin panel. This immediately terminates all active sessions and requires the user to re-authenticate.",
      },
      {
        id: 4,
        question: "What rate limiting protection is in place?",
        answer: "Track Nexus implements API rate limiting to prevent brute force attacks and abuse. Failed login attempts are tracked, and accounts are temporarily locked after multiple failures.",
      },
    ],
  },
  {
    id: "configuration-settings",
    title: "Configuration & Settings",
    description: "Flexible configuration options to customize the platform to match your organization's policies.",
    icon: ToggleLeft,
    gradient: "from-emerald-500 to-teal-500",
    color: "#10b981",
    keywords: [
      "Screenshot Config",
      "Idle Timeout",
      "Working Hours",
      "Feature Toggles",
      "Custom Policies",
      "Flexible Settings",
    ],
    features: [
      {
        id: "screenshot-intervals",
        icon: Image,
        title: "Screenshot Intervals",
        description: "Configure screenshot capture frequency anywhere from 1 to 60 minutes to balance monitoring needs with storage considerations. Adjust capture quality and resolution settings to optimize file sizes without sacrificing visual clarity. Enable automatic blur for sensitive content detection to protect confidential information.",
      },
      {
        id: "idle-timeout-settings",
        icon: Hourglass,
        title: "Idle Timeout Settings",
        description: "Set custom idle detection thresholds from 1 to 30 minutes to match your organization's definition of inactivity. Configure whether tracking should auto-pause during idle periods or continue with time flagged for review. Different thresholds can be set for different teams based on their work patterns.",
      },
      {
        id: "working-hours",
        icon: CalendarClock,
        title: "Working Hours",
        description: "Define company-wide standard working hours and business days to accurately distinguish regular work from overtime. Set flexible schedules for different teams or locations across multiple time zones. Activity outside defined hours can be flagged, restricted, or separately tracked based on your policies.",
      },
      {
        id: "feature-toggles",
        icon: ToggleLeft,
        title: "Feature Toggles",
        description: "Enable or disable individual features like screenshot capture, AI reports, idle tracking, and break reminders with simple toggles. Customize the monitoring experience for each company or team based on their specific requirements. Test new features gradually or disable unused functionality to simplify the employee experience.",
      },
    ],
    faqs: [
      {
        id: 1,
        question: "How do I configure screenshot intervals?",
        answer: "Navigate to Settings > Screenshot Configuration and set the interval from 1 to 60 minutes. You can also configure screenshot quality and whether to blur sensitive content automatically.",
      },
      {
        id: 2,
        question: "Can I customize idle timeout duration?",
        answer: "Yes, go to Settings > Idle Detection and set the timeout threshold (default is 5 minutes). You can also configure whether to auto-pause tracking during idle periods.",
      },
      {
        id: 3,
        question: "How do I define company working hours?",
        answer: "In Settings > Working Hours, define your company's standard work schedule including start time, end time, and working days. Tracking outside these hours can be flagged or restricted.",
      },
      {
        id: 4,
        question: "Which features can be toggled on/off?",
        answer: "You can enable or disable: screenshot capture, AI productivity reports, idle time tracking, break reminders, app usage tracking, and email notifications. Each setting can be configured per company.",
      },
    ],
  },
];

// Helper function to get a category by ID
export function getCategoryById(id: string): Category | undefined {
  return productCategories.find((category) => category.id === id);
}

// Helper to get all feature IDs
export function getAllFeatureIds(): string[] {
  return productCategories.flatMap((category) =>
    category.features.map((feature) => feature.id)
  );
}

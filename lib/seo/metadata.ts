import { Metadata } from 'next'

const baseUrl = 'https://tracknexus.com'
const siteName = 'Track Nexus'

// Base metadata that all pages inherit
export const baseMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Page-specific metadata configurations
export const pageMetadata: Record<string, Metadata> = {
  // Time Tracking & Billing
  'time-tracking': {
    title: 'Automatic Time Tracking Software | Track Nexus',
    description: 'AI-powered automatic time tracking for employees. Track work hours effortlessly with real-time insights, automatic attendance, and seamless integrations.',
    keywords: 'time tracking software, automatic time tracking, employee time tracker, work hours tracker, timesheet software',
    alternates: { canonical: `${baseUrl}/time-tracking` },
    openGraph: {
      title: 'Automatic Time Tracking Software | Track Nexus',
      description: 'AI-powered automatic time tracking for employees.',
      url: `${baseUrl}/time-tracking`,
    },
  },
  'time-billing': {
    title: 'Time Billing & Invoicing Software | Track Nexus',
    description: 'Convert tracked time directly to invoices. Automated billing, accurate timesheets, and seamless client invoicing for agencies and freelancers.',
    keywords: 'time billing software, time to invoice, billable hours tracking, client billing, timesheet invoicing',
    alternates: { canonical: `${baseUrl}/time-billing` },
    openGraph: {
      title: 'Time Billing & Invoicing Software | Track Nexus',
      description: 'Convert tracked time directly to invoices.',
      url: `${baseUrl}/time-billing`,
    },
  },
  'task-tracking': {
    title: 'Task-Level Time Tracking | Track Nexus',
    description: 'Track time at the task and project level. See exactly where time goes with detailed breakdowns, task assignments, and productivity metrics.',
    keywords: 'task time tracking, project time tracking, task management, time per task, work tracking',
    alternates: { canonical: `${baseUrl}/task-tracking` },
    openGraph: {
      title: 'Task-Level Time Tracking | Track Nexus',
      description: 'Track time at the task and project level.',
      url: `${baseUrl}/task-tracking`,
    },
  },
  'activity-logs': {
    title: 'Employee Activity Logs & History | Track Nexus',
    description: 'Complete activity logging for employees. Review detailed work history, application usage, and daily activity timelines.',
    keywords: 'activity logs, employee activity tracking, work history, activity timeline, daily logs',
    alternates: { canonical: `${baseUrl}/activity-logs` },
    openGraph: {
      title: 'Employee Activity Logs & History | Track Nexus',
      description: 'Complete activity logging for employees.',
      url: `${baseUrl}/activity-logs`,
    },
  },
  'timeline-routes': {
    title: 'Daily Timeline & GPS Routes | Track Nexus',
    description: 'View complete daily timelines with GPS route tracking. Perfect for field teams, delivery drivers, and remote workforce management.',
    keywords: 'GPS tracking, route tracking, daily timeline, location tracking, field team tracking',
    alternates: { canonical: `${baseUrl}/timeline-routes` },
    openGraph: {
      title: 'Daily Timeline & GPS Routes | Track Nexus',
      description: 'View complete daily timelines with GPS route tracking.',
      url: `${baseUrl}/timeline-routes`,
    },
  },

  // Productivity & Analytics
  'employee-productivity': {
    title: 'Employee Productivity Tracking Software | Track Nexus',
    description: 'Measure and improve employee productivity with AI-powered analytics. Track focus time, productivity scores, and performance metrics.',
    keywords: 'employee productivity, productivity tracking, performance monitoring, workforce productivity, productivity software',
    alternates: { canonical: `${baseUrl}/employee-productivity` },
    openGraph: {
      title: 'Employee Productivity Tracking Software | Track Nexus',
      description: 'Measure and improve employee productivity with AI-powered analytics.',
      url: `${baseUrl}/employee-productivity`,
    },
  },
  'productivity-reports': {
    title: 'Automated Productivity Reports | Track Nexus',
    description: 'Generate automated productivity reports for individuals and teams. Daily, weekly, and monthly insights with exportable PDF/CSV formats.',
    keywords: 'productivity reports, automated reports, team analytics, performance reports, work reports',
    alternates: { canonical: `${baseUrl}/productivity-reports` },
    openGraph: {
      title: 'Automated Productivity Reports | Track Nexus',
      description: 'Generate automated productivity reports for individuals and teams.',
      url: `${baseUrl}/productivity-reports`,
    },
  },
  'insight-dashboards': {
    title: 'Analytics Dashboards & Insights | Track Nexus',
    description: 'Real-time analytics dashboards for workforce insights. Customizable views, trend analysis, and actionable productivity data.',
    keywords: 'analytics dashboard, workforce analytics, productivity insights, data visualization, team dashboard',
    alternates: { canonical: `${baseUrl}/insight-dashboards` },
    openGraph: {
      title: 'Analytics Dashboards & Insights | Track Nexus',
      description: 'Real-time analytics dashboards for workforce insights.',
      url: `${baseUrl}/insight-dashboards`,
    },
  },
  'usage-analytics': {
    title: 'App & Website Usage Analytics | Track Nexus',
    description: 'Track application and website usage across your team. Identify productivity patterns, time wasters, and optimize workflows.',
    keywords: 'app usage tracking, website tracking, usage analytics, application monitoring, digital activity',
    alternates: { canonical: `${baseUrl}/usage-analytics` },
    openGraph: {
      title: 'App & Website Usage Analytics | Track Nexus',
      description: 'Track application and website usage across your team.',
      url: `${baseUrl}/usage-analytics`,
    },
  },
  'keystroke': {
    title: 'Keystroke Monitoring & Analytics | Track Nexus',
    description: 'Monitor keyboard activity for productivity insights. Typing analytics, activity detection, and work verification without invasion of privacy.',
    keywords: 'keystroke monitoring, typing analytics, keyboard tracking, activity monitoring, work verification',
    alternates: { canonical: `${baseUrl}/keystroke` },
    openGraph: {
      title: 'Keystroke Monitoring & Analytics | Track Nexus',
      description: 'Monitor keyboard activity for productivity insights.',
      url: `${baseUrl}/keystroke`,
    },
  },

  // Monitoring & Oversight
  'monitoring': {
    title: 'Employee Monitoring Software | Track Nexus',
    description: 'Comprehensive employee monitoring with screen capture, activity tracking, and real-time oversight. Ethical monitoring for modern workplaces.',
    keywords: 'employee monitoring, screen monitoring, activity tracking, workforce monitoring, employee surveillance',
    alternates: { canonical: `${baseUrl}/monitoring` },
    openGraph: {
      title: 'Employee Monitoring Software | Track Nexus',
      description: 'Comprehensive employee monitoring with screen capture and activity tracking.',
      url: `${baseUrl}/monitoring`,
    },
  },
  'audio-tracking': {
    title: 'Workplace Audio Monitoring | Track Nexus',
    description: 'Audio detection for workplace environments. Monitor background noise, meeting detection, and ambient sound analysis.',
    keywords: 'audio monitoring, sound detection, workplace audio, noise monitoring, meeting detection',
    alternates: { canonical: `${baseUrl}/audio-tracking` },
    openGraph: {
      title: 'Workplace Audio Monitoring | Track Nexus',
      description: 'Audio detection for workplace environments.',
      url: `${baseUrl}/audio-tracking`,
    },
  },
  'facial-recognition': {
    title: 'Facial Recognition Attendance System | Track Nexus',
    description: 'Contactless clock-in with facial recognition technology. Biometric attendance, identity verification, and secure access control.',
    keywords: 'facial recognition, biometric attendance, contactless clock-in, face recognition, identity verification',
    alternates: { canonical: `${baseUrl}/facial-recognition` },
    openGraph: {
      title: 'Facial Recognition Attendance System | Track Nexus',
      description: 'Contactless clock-in with facial recognition technology.',
      url: `${baseUrl}/facial-recognition`,
    },
  },
  'moonlight-detection': {
    title: 'Moonlighting & Side Project Detection | Track Nexus',
    description: 'Detect unauthorized side work and moonlighting activity. Protect company resources and ensure employee focus during work hours.',
    keywords: 'moonlighting detection, side project detection, employee compliance, dual employment, work policy',
    alternates: { canonical: `${baseUrl}/moonlight-detection` },
    openGraph: {
      title: 'Moonlighting & Side Project Detection | Track Nexus',
      description: 'Detect unauthorized side work and moonlighting activity.',
      url: `${baseUrl}/moonlight-detection`,
    },
  },
  'apps-website': {
    title: 'App & Website Usage Tracking | Track Nexus',
    description: 'Monitor which applications and websites employees use. Categorize productive vs unproductive activities and optimize workflows.',
    keywords: 'app tracking, website monitoring, application usage, digital activity, productivity categorization',
    alternates: { canonical: `${baseUrl}/apps-website` },
    openGraph: {
      title: 'App & Website Usage Tracking | Track Nexus',
      description: 'Monitor which applications and websites employees use.',
      url: `${baseUrl}/apps-website`,
    },
  },
  'office-tv': {
    title: 'Office TV Dashboard Display | Track Nexus',
    description: 'Display real-time productivity dashboards on office screens. Team leaderboards, live metrics, and motivational displays.',
    keywords: 'office dashboard, TV display, team leaderboard, live metrics, office screen',
    alternates: { canonical: `${baseUrl}/office-tv` },
    openGraph: {
      title: 'Office TV Dashboard Display | Track Nexus',
      description: 'Display real-time productivity dashboards on office screens.',
      url: `${baseUrl}/office-tv`,
    },
  },

  // HR & Administration
  'hr-management': {
    title: 'HR Management Software | Track Nexus',
    description: 'Centralized HR management with employee records, onboarding, and workforce administration. Integrated with time tracking and payroll.',
    keywords: 'HR management, employee management, workforce administration, HR software, employee records',
    alternates: { canonical: `${baseUrl}/hr-management` },
    openGraph: {
      title: 'HR Management Software | Track Nexus',
      description: 'Centralized HR management with employee records and workforce administration.',
      url: `${baseUrl}/hr-management`,
    },
  },
  'leave-balance-reports': {
    title: 'Leave Balance & Time-Off Tracking | Track Nexus',
    description: 'Track employee leave balances, PTO, and time-off requests. Automated accruals, approval workflows, and absence management.',
    keywords: 'leave tracking, PTO management, time-off tracking, leave balance, absence management',
    alternates: { canonical: `${baseUrl}/leave-balance-reports` },
    openGraph: {
      title: 'Leave Balance & Time-Off Tracking | Track Nexus',
      description: 'Track employee leave balances, PTO, and time-off requests.',
      url: `${baseUrl}/leave-balance-reports`,
    },
  },
  'location-activity': {
    title: 'GPS Location & Activity Tracking | Track Nexus',
    description: 'Track employee locations with GPS. Perfect for field teams, remote workers, and delivery management with real-time location updates.',
    keywords: 'GPS tracking, location tracking, field team tracking, remote work tracking, employee location',
    alternates: { canonical: `${baseUrl}/location-activity` },
    openGraph: {
      title: 'GPS Location & Activity Tracking | Track Nexus',
      description: 'Track employee locations with GPS for field teams and remote workers.',
      url: `${baseUrl}/location-activity`,
    },
  },
  'project-management': {
    title: 'Project Time Tracking & Management | Track Nexus',
    description: 'Track time by project with integrated project management. Budgets, milestones, team assignments, and profitability analysis.',
    keywords: 'project management, project tracking, time by project, project budgets, team projects',
    alternates: { canonical: `${baseUrl}/project-management` },
    openGraph: {
      title: 'Project Time Tracking & Management | Track Nexus',
      description: 'Track time by project with integrated project management.',
      url: `${baseUrl}/project-management`,
    },
  },
}

// Helper to get metadata for a specific page
export function getPageMetadata(slug: string): Metadata {
  return pageMetadata[slug] || {}
}

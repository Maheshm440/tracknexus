import { CompetitorData } from './types';

export const hubstaffData: CompetitorData = {
  slug: 'hubstaff',
  name: 'Hubstaff',
  tagline: 'Time tracking and project management',
  description:
    'Hubstaff is a time tracking software that offers GPS location tracking, employee monitoring, and project management features. Founded in 2012, it has become popular among remote teams.',
  logo: '/images/comparisons/hubstaff-logo.png',
  website: 'https://hubstaff.com',
  foundedYear: 2012,
  headquarters: 'Indianapolis, USA',
  pricing: [
    {
      plan: 'Starter',
      price: '$4.99',
      billingCycle: 'per user/month',
      features: ['Time tracking', 'Limited screenshots', 'Basic reporting'],
    },
    {
      plan: 'Grow',
      price: '$7.50',
      billingCycle: 'per user/month',
      features: ['All Starter features', 'App tracking', 'Automatic payroll'],
    },
    {
      plan: 'Team',
      price: '$10',
      billingCycle: 'per user/month',
      features: ['All Grow features', 'Geofencing', 'Scheduling'],
    },
    {
      plan: 'Enterprise',
      price: 'Custom',
      billingCycle: 'contact sales',
      features: ['All Team features', 'SSO', 'Dedicated support'],
    },
  ],
  features: [
    { name: 'Automatic Time Tracking', category: 'Time Tracking', tracknexus: true, competitor: true },
    { name: 'Manual Time Entries', category: 'Time Tracking', tracknexus: true, competitor: true },
    { name: 'Idle Time Detection', category: 'Time Tracking', tracknexus: true, competitor: true },
    { name: 'Screenshot Capture', category: 'Monitoring', tracknexus: true, competitor: true },
    { name: 'App & Website Tracking', category: 'Monitoring', tracknexus: true, competitor: true },
    { name: 'Keystroke Logging', category: 'Monitoring', tracknexus: true, competitor: false },
    { name: 'Facial Recognition', category: 'Monitoring', tracknexus: true, competitor: false },
    { name: 'GPS Location Tracking', category: 'Location', tracknexus: true, competitor: true },
    { name: 'Geofencing', category: 'Location', tracknexus: true, competitor: true },
    { name: 'Route Tracking', category: 'Location', tracknexus: true, competitor: 'Limited' },
    { name: 'AI-Powered Analytics', category: 'Analytics', tracknexus: true, competitor: false },
    { name: 'Productivity Scoring', category: 'Analytics', tracknexus: true, competitor: true },
    { name: 'Custom Reports', category: 'Analytics', tracknexus: true, competitor: true },
    { name: 'Real-time Dashboards', category: 'Analytics', tracknexus: true, competitor: 'Limited' },
    { name: 'Project Management', category: 'Management', tracknexus: true, competitor: true },
    { name: 'Task Management', category: 'Management', tracknexus: true, competitor: true },
    { name: 'Leave Management', category: 'HR', tracknexus: true, competitor: false },
    { name: 'Attendance Tracking', category: 'HR', tracknexus: true, competitor: true },
    { name: 'Payroll Integration', category: 'Integrations', tracknexus: true, competitor: true },
    { name: 'Slack Integration', category: 'Integrations', tracknexus: true, competitor: true },
    { name: 'Office TV Display', category: 'Features', tracknexus: true, competitor: false },
    { name: 'Mobile Apps', category: 'Platform', tracknexus: true, competitor: true },
    { name: 'Desktop Apps', category: 'Platform', tracknexus: true, competitor: true },
    { name: 'Browser Extension', category: 'Platform', tracknexus: true, competitor: true },
  ],
  tracknexusPros: [
    'More comprehensive monitoring features including facial recognition',
    'AI-powered analytics for deeper insights',
    'Complete HR management suite including leave management',
    'Office TV display for team visibility',
    'More affordable pricing for full-featured plans',
    'Better suited for Indian businesses with local support',
  ],
  competitorPros: [
    'Established brand with longer market presence',
    'Larger user community',
    'More third-party integrations available',
    'Strong project management features',
  ],
  tracknexusCons: [
    'Newer to the market',
    'Smaller integration ecosystem (growing)',
  ],
  competitorCons: [
    'No facial recognition for enhanced security',
    'Limited AI-powered analytics',
    'No leave management system',
    'No Office TV feature',
    'Higher pricing for comparable features',
  ],
  verdict:
    'TrackNexus offers more comprehensive monitoring and HR features at competitive pricing, making it ideal for businesses seeking an all-in-one workforce management solution. Hubstaff remains a solid choice for teams focused primarily on time tracking and project management.',
  verdictSummary: 'Choose TrackNexus for comprehensive features; Hubstaff for established simplicity',
  faqs: [
    {
      question: 'Can I migrate from Hubstaff to TrackNexus?',
      answer:
        'Yes, TrackNexus offers migration support to help you transition smoothly from Hubstaff. Our team can assist with data export and import to ensure continuity.',
    },
    {
      question: 'How does pricing compare between TrackNexus and Hubstaff?',
      answer:
        'TrackNexus offers more features at comparable or lower price points. While Hubstaff charges $10/user for their Team plan, TrackNexus provides additional features like facial recognition and AI analytics at similar pricing.',
    },
    {
      question: 'Which is better for remote teams?',
      answer:
        'Both solutions work well for remote teams. TrackNexus offers additional features like facial recognition for identity verification and more comprehensive productivity analytics that may be valuable for distributed workforces.',
    },
    {
      question: 'Does TrackNexus have all the integrations Hubstaff offers?',
      answer:
        'TrackNexus integrates with major tools like Slack, popular project management platforms, and payroll systems. While Hubstaff has more integrations due to market presence, TrackNexus covers the most commonly used tools and is continuously adding more.',
    },
  ],
  seoTitle: 'TrackNexus vs Hubstaff: Complete Comparison 2025',
  seoDescription:
    'Compare TrackNexus and Hubstaff features, pricing, and capabilities. Find out which time tracking software is best for your team in 2025.',
};

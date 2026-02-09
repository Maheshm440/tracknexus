import { CompetitorData } from './types';

export const clockifyData: CompetitorData = {
  slug: 'clockify',
  name: 'Clockify',
  tagline: 'Free time tracking software',
  description:
    'Clockify is a popular free time tracking app used by millions of users worldwide. It offers basic time tracking features with optional paid upgrades for additional functionality. Known for its generous free tier, it\'s often the entry point for teams new to time tracking.',
  logo: '/images/comparisons/clockify-logo.png',
  website: 'https://clockify.me',
  foundedYear: 2017,
  headquarters: 'San Francisco, USA',
  pricing: [
    {
      plan: 'Free',
      price: '$0',
      billingCycle: 'forever',
      features: ['Unlimited tracking', 'Unlimited users', 'Basic reports'],
    },
    {
      plan: 'Basic',
      price: '$3.99',
      billingCycle: 'per user/month',
      features: ['All Free features', 'Administration', 'Project templates'],
    },
    {
      plan: 'Standard',
      price: '$5.49',
      billingCycle: 'per user/month',
      features: ['All Basic features', 'Time off', 'Invoicing'],
    },
    {
      plan: 'Pro',
      price: '$7.99',
      billingCycle: 'per user/month',
      features: ['All Standard features', 'GPS tracking', 'Screenshots'],
    },
    {
      plan: 'Enterprise',
      price: '$11.99',
      billingCycle: 'per user/month',
      features: ['All Pro features', 'SSO', 'Control accounts'],
    },
  ],
  features: [
    { name: 'Automatic Time Tracking', category: 'Time Tracking', tracknexus: true, competitor: 'Pro only' },
    { name: 'Manual Time Entries', category: 'Time Tracking', tracknexus: true, competitor: true },
    { name: 'Timer Widget', category: 'Time Tracking', tracknexus: true, competitor: true },
    { name: 'Idle Time Detection', category: 'Time Tracking', tracknexus: true, competitor: 'Pro only' },
    { name: 'Screenshot Capture', category: 'Monitoring', tracknexus: true, competitor: 'Pro only' },
    { name: 'App & Website Tracking', category: 'Monitoring', tracknexus: true, competitor: false },
    { name: 'Keystroke Logging', category: 'Monitoring', tracknexus: true, competitor: false },
    { name: 'Facial Recognition', category: 'Monitoring', tracknexus: true, competitor: false },
    { name: 'AI-Powered Analytics', category: 'Analytics', tracknexus: true, competitor: false },
    { name: 'Productivity Scoring', category: 'Analytics', tracknexus: true, competitor: false },
    { name: 'Custom Reports', category: 'Analytics', tracknexus: true, competitor: true },
    { name: 'Real-time Dashboards', category: 'Analytics', tracknexus: true, competitor: 'Limited' },
    { name: 'GPS Location Tracking', category: 'Location', tracknexus: true, competitor: 'Pro only' },
    { name: 'Geofencing', category: 'Location', tracknexus: true, competitor: false },
    { name: 'Route Tracking', category: 'Location', tracknexus: true, competitor: false },
    { name: 'Project Management', category: 'Management', tracknexus: true, competitor: true },
    { name: 'Task Management', category: 'Management', tracknexus: true, competitor: true },
    { name: 'Leave Management', category: 'HR', tracknexus: true, competitor: 'Standard+' },
    { name: 'Attendance Tracking', category: 'HR', tracknexus: true, competitor: 'Limited' },
    { name: 'Scheduling', category: 'HR', tracknexus: true, competitor: 'Standard+' },
    { name: 'Invoicing', category: 'Billing', tracknexus: true, competitor: 'Standard+' },
    { name: 'Office TV Display', category: 'Features', tracknexus: true, competitor: false },
    { name: 'Mobile Apps', category: 'Platform', tracknexus: true, competitor: true },
    { name: 'Desktop Apps', category: 'Platform', tracknexus: true, competitor: true },
    { name: 'Browser Extension', category: 'Platform', tracknexus: true, competitor: true },
  ],
  tracknexusPros: [
    'Complete employee monitoring suite',
    'AI-powered productivity analytics',
    'Facial recognition for identity verification',
    'App and website usage tracking included',
    'Comprehensive GPS with geofencing',
    'Better suited for managing remote teams',
    'More detailed productivity insights',
    'Office TV display feature',
  ],
  competitorPros: [
    'Generous free tier for basic time tracking',
    'Simple and easy to learn interface',
    'Lower entry price point',
    'Good for freelancers and small teams',
    'Solid reporting features',
  ],
  tracknexusCons: [
    'No free tier (7-day free trial instead)',
    'More features may require learning curve',
  ],
  competitorCons: [
    'No employee monitoring features',
    'No productivity scoring or AI analytics',
    'No facial recognition',
    'No app/website tracking',
    'Limited GPS functionality (Pro tier only)',
    'No geofencing capabilities',
    'Basic HR features',
    'Not suited for enterprise monitoring needs',
  ],
  verdict:
    'Clockify is excellent for simple time tracking needs with its free tier, but lacks the monitoring and productivity features that growing businesses need. TrackNexus is the better choice for organizations that need comprehensive workforce management beyond basic time tracking.',
  verdictSummary: 'Clockify for basic free tracking; TrackNexus for comprehensive workforce management',
  faqs: [
    {
      question: 'Is Clockify really free?',
      answer:
        'Clockify offers a free tier with basic time tracking features. However, advanced features like screenshots, GPS tracking, and better administration require paid plans ranging from $3.99 to $11.99 per user per month.',
    },
    {
      question: 'Why choose TrackNexus over free Clockify?',
      answer:
        'While Clockify\'s free tier is great for basic time tracking, it lacks employee monitoring, productivity analytics, facial recognition, and comprehensive HR features. If you need to actively manage productivity and workforce, TrackNexus provides significantly more value.',
    },
    {
      question: 'Can Clockify track employee productivity?',
      answer:
        'Clockify tracks time but doesn\'t monitor productivity in the way TrackNexus does. It has no app/website tracking, no productivity scoring, and no AI-powered analytics to help understand how time is being spent.',
    },
    {
      question: 'Which is better for a growing company?',
      answer:
        'TrackNexus is better suited for growing companies that need workforce management beyond time tracking. As teams scale, features like facial recognition, GPS tracking, productivity monitoring, and HR management become essential.',
    },
  ],
  seoTitle: 'TrackNexus vs Clockify: Beyond Free Time Tracking 2025',
  seoDescription:
    'Compare TrackNexus with Clockify. See why growing businesses choose comprehensive workforce management over basic free time tracking.',
};

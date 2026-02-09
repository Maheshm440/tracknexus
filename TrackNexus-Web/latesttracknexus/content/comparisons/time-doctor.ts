import { CompetitorData } from './types';

export const timeDoctorData: CompetitorData = {
  slug: 'time-doctor',
  name: 'Time Doctor',
  tagline: 'Employee time tracking & productivity monitoring',
  description:
    'Time Doctor is an employee monitoring and productivity management platform that helps businesses track work hours, monitor employee activity, and improve team performance. It focuses heavily on distraction management and productivity insights.',
  logo: '/images/comparisons/time-doctor-logo.png',
  website: 'https://timedoctor.com',
  foundedYear: 2012,
  headquarters: 'Las Vegas, USA',
  pricing: [
    {
      plan: 'Basic',
      price: '$5.90',
      billingCycle: 'per user/month',
      features: ['Time tracking', 'Basic screenshots', 'Activity levels'],
    },
    {
      plan: 'Standard',
      price: '$8.40',
      billingCycle: 'per user/month',
      features: ['All Basic features', 'App & website tracking', 'Payroll'],
    },
    {
      plan: 'Premium',
      price: '$16.70',
      billingCycle: 'per user/month',
      features: ['All Standard features', 'Video screen capture', 'Executive dashboard'],
    },
  ],
  features: [
    { name: 'Automatic Time Tracking', category: 'Time Tracking', tracknexus: true, competitor: true },
    { name: 'Manual Time Entries', category: 'Time Tracking', tracknexus: true, competitor: true },
    { name: 'Idle Time Detection', category: 'Time Tracking', tracknexus: true, competitor: true },
    { name: 'Screenshot Capture', category: 'Monitoring', tracknexus: true, competitor: true },
    { name: 'Video Screen Recording', category: 'Monitoring', tracknexus: true, competitor: 'Premium only' },
    { name: 'App & Website Tracking', category: 'Monitoring', tracknexus: true, competitor: true },
    { name: 'Keystroke Logging', category: 'Monitoring', tracknexus: true, competitor: false },
    { name: 'Facial Recognition', category: 'Monitoring', tracknexus: true, competitor: false },
    { name: 'Distraction Alerts', category: 'Productivity', tracknexus: true, competitor: true },
    { name: 'AI-Powered Analytics', category: 'Analytics', tracknexus: true, competitor: false },
    { name: 'Productivity Scoring', category: 'Analytics', tracknexus: true, competitor: true },
    { name: 'Custom Reports', category: 'Analytics', tracknexus: true, competitor: true },
    { name: 'Real-time Dashboards', category: 'Analytics', tracknexus: true, competitor: true },
    { name: 'Executive Dashboard', category: 'Analytics', tracknexus: true, competitor: 'Premium only' },
    { name: 'GPS Location Tracking', category: 'Location', tracknexus: true, competitor: 'Limited' },
    { name: 'Geofencing', category: 'Location', tracknexus: true, competitor: false },
    { name: 'Project Management', category: 'Management', tracknexus: true, competitor: true },
    { name: 'Task Management', category: 'Management', tracknexus: true, competitor: true },
    { name: 'Leave Management', category: 'HR', tracknexus: true, competitor: false },
    { name: 'Attendance Tracking', category: 'HR', tracknexus: true, competitor: true },
    { name: 'Payroll Integration', category: 'Integrations', tracknexus: true, competitor: true },
    { name: 'Office TV Display', category: 'Features', tracknexus: true, competitor: false },
    { name: 'Mobile Apps', category: 'Platform', tracknexus: true, competitor: true },
    { name: 'Desktop Apps', category: 'Platform', tracknexus: true, competitor: true },
  ],
  tracknexusPros: [
    'More affordable pricing with more features included',
    'Facial recognition for identity verification',
    'GPS and geofencing included in standard plans',
    'AI-powered productivity analytics',
    'Complete HR suite with leave management',
    'Office TV display for team visibility',
    'Keystroke monitoring for enhanced oversight',
  ],
  competitorPros: [
    'Strong focus on distraction management',
    'Established brand recognition',
    'Good integration ecosystem',
    'Detailed activity level tracking',
  ],
  tracknexusCons: [
    'Newer market presence',
    'Smaller community compared to Time Doctor',
  ],
  competitorCons: [
    'Premium features require expensive top tier ($16.70/user)',
    'No facial recognition',
    'Limited GPS tracking capabilities',
    'No geofencing feature',
    'No leave management system',
    'No keystroke logging option',
  ],
  verdict:
    'TrackNexus delivers significantly more value for the price, with advanced features like facial recognition, AI analytics, and comprehensive HR tools included in standard plans. Time Doctor excels at distraction management but requires premium pricing for comparable functionality.',
  verdictSummary: 'TrackNexus offers better value; Time Doctor focuses on distraction management',
  faqs: [
    {
      question: 'Is TrackNexus more affordable than Time Doctor?',
      answer:
        'Yes, TrackNexus includes advanced features like facial recognition, AI analytics, and GPS tracking in standard plans that Time Doctor either doesn\'t offer or reserves for premium tiers. You get more functionality at a comparable or lower price point.',
    },
    {
      question: 'Which solution has better monitoring capabilities?',
      answer:
        'TrackNexus offers more comprehensive monitoring including facial recognition for identity verification, keystroke logging, and detailed GPS tracking with geofencing. Time Doctor focuses more on screenshot capture and distraction alerts.',
    },
    {
      question: 'Can Time Doctor do facial recognition like TrackNexus?',
      answer:
        'No, Time Doctor does not offer facial recognition. TrackNexus uses facial recognition to verify employee identity during clock-in, which is particularly valuable for remote teams and preventing time theft.',
    },
    {
      question: 'Which is better for managing field workers?',
      answer:
        'TrackNexus is significantly better for field workers due to comprehensive GPS tracking with geofencing, route tracking, and location history. Time Doctor has limited location tracking capabilities.',
    },
  ],
  seoTitle: 'TrackNexus vs Time Doctor: Detailed Comparison 2025',
  seoDescription:
    'Compare TrackNexus and Time Doctor for employee monitoring. See features, pricing, and which time tracking software provides better value for your team.',
};

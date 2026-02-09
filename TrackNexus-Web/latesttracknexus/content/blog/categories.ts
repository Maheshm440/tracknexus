import { Category } from '@/lib/blog/types';

export const categories: Record<string, Category> = {
  'time-tracking': {
    slug: 'time-tracking',
    name: 'Time Tracking',
    description: 'Best practices and tips for effective time tracking in the workplace.',
    color: '#096EB6',
  },
  'productivity': {
    slug: 'productivity',
    name: 'Productivity',
    description: 'Strategies and insights to boost team and individual productivity.',
    color: '#10B981',
  },
  'remote-work': {
    slug: 'remote-work',
    name: 'Remote Work',
    description: 'Managing distributed teams and remote workforce effectively.',
    color: '#8B5CF6',
  },
  'employee-monitoring': {
    slug: 'employee-monitoring',
    name: 'Employee Monitoring',
    description: 'Ethical approaches to employee monitoring and performance tracking.',
    color: '#F59E0B',
  },
  'business-tips': {
    slug: 'business-tips',
    name: 'Business Tips',
    description: 'General business advice for growing companies.',
    color: '#EC4899',
  },
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories[slug];
};

export const getAllCategories = (): Category[] => {
  return Object.values(categories);
};

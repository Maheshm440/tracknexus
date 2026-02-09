import { Author } from '@/lib/blog/types';

export const authors: Record<string, Author> = {
  'tracknexus-team': {
    id: 'tracknexus-team',
    name: 'TrackNexus Team',
    bio: 'The TrackNexus team is dedicated to helping businesses optimize productivity and streamline workforce management through innovative time tracking solutions.',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop',
    avatarAlt: 'TrackNexus team collaboration in modern office workspace',
    role: 'Product Team',
    social: {
      twitter: 'https://twitter.com/tracknexus',
      linkedin: 'https://linkedin.com/company/tracknexus',
    },
  },
  'sarah-johnson': {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    bio: 'Sarah is a productivity expert with over 10 years of experience helping remote teams optimize their workflows.',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    avatarAlt: 'Professional headshot of Sarah Johnson, Productivity Expert',
    role: 'Productivity Expert',
    social: {
      linkedin: 'https://linkedin.com/in/sarah-johnson',
    },
  },
  'michael-chen': {
    id: 'michael-chen',
    name: 'Michael Chen',
    bio: 'Michael specializes in HR technology and employee management best practices for growing businesses.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    avatarAlt: 'Professional headshot of Michael Chen, HR Technology Specialist',
    role: 'HR Technology Specialist',
    social: {
      twitter: 'https://twitter.com/michaelchen',
      linkedin: 'https://linkedin.com/in/michael-chen',
    },
  },
};

export const getAuthorById = (id: string): Author | undefined => {
  return authors[id];
};

export const getAllAuthors = (): Author[] => {
  return Object.values(authors);
};


import { Post, Platform, Campaign } from './api';

// Mock data for development
export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Exciting news! Our new product line launches next week. Stay tuned for exclusive deals! #newlaunch #exclusive',
    platform: 'twitter',
    scheduledDate: new Date(Date.now() + 86400000).toISOString(),
    status: 'scheduled',
    analytics: {
      likes: 0,
      shares: 0,
      comments: 0,
      views: 0,
    },
  },
  {
    id: '2',
    content: 'Check out our latest blog post on sustainable business practices and how they can benefit your bottom line.',
    platform: 'linkedin',
    status: 'published',
    analytics: {
      likes: 45,
      shares: 12,
      comments: 8,
      views: 1240,
    },
  },
  {
    id: '3',
    content: 'Behind the scenes at our annual conference. Great minds coming together to shape the future of our industry!',
    platform: 'instagram',
    status: 'published',
    analytics: {
      likes: 132,
      shares: 28,
      comments: 17,
      views: 2450,
    },
  },
  {
    id: '4',
    content: 'Draft post about upcoming feature announcement',
    platform: 'facebook',
    status: 'draft',
  },
];

export const mockPlatforms: Platform[] = [
  {
    id: '1',
    name: 'Twitter',
    type: 'twitter',
    connected: true,
    icon: 'twitter',
  },
  {
    id: '2',
    name: 'LinkedIn',
    type: 'linkedin',
    connected: true,
    icon: 'linkedin',
  },
  {
    id: '3',
    name: 'Instagram',
    type: 'instagram',
    connected: true,
    icon: 'instagram',
  },
  {
    id: '4',
    name: 'Facebook',
    type: 'facebook',
    connected: false,
    icon: 'facebook',
  },
  {
    id: '5',
    name: 'YouTube',
    type: 'youtube',
    connected: false,
    icon: 'youtube',
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Product Launch',
    status: 'active',
    startDate: '2025-06-01',
    endDate: '2025-07-15',
    platforms: ['1', '2', '3'],
    performance: {
      reach: 45000,
      engagement: 2.8,
      conversion: 1.2,
    },
  },
  {
    id: '2',
    name: 'Holiday Promotion',
    status: 'draft',
    startDate: '2025-11-20',
    endDate: '2025-12-31',
    platforms: ['1', '3', '4'],
  },
  {
    id: '3',
    name: 'Q1 Brand Awareness',
    status: 'completed',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    platforms: ['1', '2'],
    performance: {
      reach: 120000,
      engagement: 3.2,
      conversion: 0.9,
    },
  },
];

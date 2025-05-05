
import { toast } from '@/components/ui/sonner';

// Base API endpoints
const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

// API error handling
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || 'An error occurred while fetching data',
        response.status
      );
    }

    // For 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      // Handle specific API errors
      if (error.status === 401) {
        // Handle unauthorized
        toast.error('Session expired. Please login again.');
      } else if (error.status === 403) {
        // Handle forbidden
        toast.error('You do not have permission to perform this action.');
      } else {
        // Handle other API errors
        toast.error(error.message);
      }
      throw error;
    }
    
    // Handle network errors
    if (!navigator.onLine) {
      toast.error('You are offline. Please check your internet connection.');
    } else {
      toast.error('Network error. Please try again later.');
    }
    
    throw new Error('Network error');
  }
}

// Service interfaces
export interface Post {
  id: string;
  content: string;
  platform: string;
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  analytics?: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
  };
}

export interface Platform {
  id: string;
  name: string;
  type: string;
  connected: boolean;
  icon: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'completed';
  startDate: string;
  endDate: string;
  platforms: string[];
  performance?: {
    reach: number;
    engagement: number;
    conversion: number;
  };
}

// Service functions
export const postsService = {
  getAll: () => fetchApi<Post[]>('/posts'),
  getById: (id: string) => fetchApi<Post>(`/posts/${id}`),
  create: (data: Omit<Post, 'id'>) => fetchApi<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Post>) => fetchApi<Post>(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchApi<void>(`/posts/${id}`, {
    method: 'DELETE',
  }),
  getScheduled: () => fetchApi<Post[]>('/posts/scheduled'),
  getDrafts: () => fetchApi<Post[]>('/posts/drafts'),
};

export const platformsService = {
  getAll: () => fetchApi<Platform[]>('/platforms'),
  connect: (id: string) => fetchApi<Platform>(`/platforms/${id}/connect`, {
    method: 'POST',
  }),
  disconnect: (id: string) => fetchApi<Platform>(`/platforms/${id}/disconnect`, {
    method: 'POST',
  }),
};

export const campaignsService = {
  getAll: () => fetchApi<Campaign[]>('/campaigns'),
  getById: (id: string) => fetchApi<Campaign>(`/campaigns/${id}`),
  create: (data: Omit<Campaign, 'id'>) => fetchApi<Campaign>('/campaigns', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Campaign>) => fetchApi<Campaign>(`/campaigns/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchApi<void>(`/campaigns/${id}`, {
    method: 'DELETE',
  }),
};


import { toast } from '@/components/ui/sonner';
import { getApiConfig, useMockData, useSupabase } from './api-config';
import { mockPosts, mockPlatforms, mockCampaigns } from './mock-data';
import { createClient } from '@supabase/supabase-js';

// Base API endpoints
const getBaseUrl = () => getApiConfig().baseUrl;

// API error handling
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Get Supabase client
const getSupabaseClient = () => {
  const config = getApiConfig();
  if (!config.supabaseUrl || !config.supabaseKey) {
    throw new Error('Supabase configuration is missing');
  }
  return createClient(config.supabaseUrl, config.supabaseKey);
};

// Generic fetch wrapper with error handling
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Check if we should use Supabase
  if (useSupabase()) {
    return fetchSupabase<T>(endpoint, options);
  }
  
  // Check if we should use mock data
  if (useMockData()) {
    return getMockResponse<T>(endpoint, options);
  }

  try {
    const config = getApiConfig();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Add API key if configured
    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
    }

    // Merge with user provided headers, if any
    if (options.headers) {
      const userHeaders = options.headers as Record<string, string>;
      Object.keys(userHeaders).forEach(key => {
        headers[key] = userHeaders[key];
      });
    }

    const response = await fetch(`${getBaseUrl()}${endpoint}`, {
      ...options,
      headers,
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

// Fetch data from Supabase
async function fetchSupabase<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const supabase = getSupabaseClient();
    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body as string) : undefined;
    
    // Parse endpoint to determine which table to query
    const table = endpoint.split('/')[1]; // e.g., /posts -> posts
    const id = endpoint.match(/\/([^\/]+)\/([^\/]+)/)?.[2]; // e.g., /posts/123 -> 123
    
    // Handle different endpoints based on the method and path
    switch (true) {
      // GET all items
      case method === 'GET' && !id:
        const { data, error } = await supabase.from(table).select('*');
        if (error) throw new ApiError(error.message, 500);
        return data as unknown as T;
        
      // GET single item
      case method === 'GET' && !!id:
        const { data: singleData, error: singleError } = await supabase
          .from(table)
          .select('*')
          .eq('id', id)
          .single();
        if (singleError) throw new ApiError(singleError.message, 500);
        return singleData as unknown as T;
        
      // POST new item
      case method === 'POST':
        const { data: insertData, error: insertError } = await supabase
          .from(table)
          .insert(body)
          .select()
          .single();
        if (insertError) throw new ApiError(insertError.message, 500);
        return insertData as unknown as T;
        
      // PUT update item
      case method === 'PUT' && !!id:
        const { data: updateData, error: updateError } = await supabase
          .from(table)
          .update(body)
          .eq('id', id)
          .select()
          .single();
        if (updateError) throw new ApiError(updateError.message, 500);
        return updateData as unknown as T;
        
      // DELETE item
      case method === 'DELETE' && !!id:
        const { error: deleteError } = await supabase
          .from(table)
          .delete()
          .eq('id', id);
        if (deleteError) throw new ApiError(deleteError.message, 500);
        return {} as T;
        
      default:
        throw new ApiError(`Endpoint not implemented: ${endpoint}`, 501);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    toast.error('Error connecting to Supabase');
    throw new ApiError('Error connecting to Supabase', 500);
  }
}

// Mock data response handler
async function getMockResponse<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body as string) : undefined;
  
  // Posts endpoints
  if (endpoint.startsWith('/posts')) {
    const id = endpoint.match(/\/posts\/([^\/]+)/)?.[1];
    
    if (endpoint === '/posts') {
      if (method === 'GET') return mockPosts as unknown as T;
      if (method === 'POST' && body) {
        const newPost = { id: Date.now().toString(), ...body };
        return newPost as unknown as T;
      }
    }
    
    if (endpoint === '/posts/scheduled') {
      return mockPosts.filter(p => p.status === 'scheduled') as unknown as T;
    }
    
    if (endpoint === '/posts/drafts') {
      return mockPosts.filter(p => p.status === 'draft') as unknown as T;
    }
    
    if (id) {
      if (method === 'GET') {
        const post = mockPosts.find(p => p.id === id);
        if (!post) throw new ApiError('Post not found', 404);
        return post as unknown as T;
      }
      
      if (method === 'PUT' && body) {
        return { id, ...body } as unknown as T;
      }
      
      if (method === 'DELETE') {
        return {} as T;
      }
    }
  }
  
  // Platforms endpoints
  if (endpoint.startsWith('/platforms')) {
    const id = endpoint.match(/\/platforms\/([^\/]+)/)?.[1];
    
    if (endpoint === '/platforms') {
      return mockPlatforms as unknown as T;
    }
    
    if (id && endpoint.endsWith('/connect')) {
      const platform = mockPlatforms.find(p => p.id === id);
      if (!platform) throw new ApiError('Platform not found', 404);
      return { ...platform, connected: true } as unknown as T;
    }
    
    if (id && endpoint.endsWith('/disconnect')) {
      const platform = mockPlatforms.find(p => p.id === id);
      if (!platform) throw new ApiError('Platform not found', 404);
      return { ...platform, connected: false } as unknown as T;
    }
  }
  
  // Campaigns endpoints
  if (endpoint.startsWith('/campaigns')) {
    const id = endpoint.match(/\/campaigns\/([^\/]+)/)?.[1];
    
    if (endpoint === '/campaigns') {
      if (method === 'GET') return mockCampaigns as unknown as T;
      if (method === 'POST' && body) {
        const newCampaign = { id: Date.now().toString(), ...body };
        return newCampaign as unknown as T;
      }
    }
    
    if (id) {
      if (method === 'GET') {
        const campaign = mockCampaigns.find(c => c.id === id);
        if (!campaign) throw new ApiError('Campaign not found', 404);
        return campaign as unknown as T;
      }
      
      if (method === 'PUT' && body) {
        return { id, ...body } as unknown as T;
      }
      
      if (method === 'DELETE') {
        return {} as T;
      }
    }
  }
  
  // Default response for unknown endpoints
  throw new ApiError(`Endpoint not implemented in mock: ${endpoint}`, 501);
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


// Configuration for the API
type ApiMode = 'mock' | 'api' | 'supabase';

interface ApiConfig {
  mode: ApiMode;
  baseUrl: string;
  apiKey?: string;
  supabaseUrl?: string;
  supabaseKey?: string;
}

// Default configuration - change this when ready to connect to real API
const apiConfig: ApiConfig = {
  // Set to 'supabase' to use Supabase backend
  mode: 'supabase',
  
  // Update this URL when your real API server is deployed
  baseUrl: 'https://api.example.com',
  
  // Supabase configuration
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
};

export const getApiConfig = (): ApiConfig => {
  return apiConfig;
};

// Helper to determine if we should use mock data or real API
export const useMockData = (): boolean => {
  return getApiConfig().mode === 'mock';
};

// Helper to determine if we should use Supabase
export const useSupabase = (): boolean => {
  return getApiConfig().mode === 'supabase';
};

// Update this when transitioning to a real API
export const setApiMode = (mode: ApiMode, baseUrl?: string, apiKey?: string, supabaseUrl?: string, supabaseKey?: string) => {
  apiConfig.mode = mode;
  if (baseUrl) apiConfig.baseUrl = baseUrl;
  if (apiKey) apiConfig.apiKey = apiKey;
  if (supabaseUrl) apiConfig.supabaseUrl = supabaseUrl;
  if (supabaseKey) apiConfig.supabaseKey = supabaseKey;
};


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
  // Set to 'mock' when Supabase env vars are missing, otherwise 'supabase'
  mode: (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) ? 'supabase' : 'mock',
  
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

// Get current user id from Supabase
export const getCurrentUserId = async (): Promise<string | null> => {
  if (!useSupabase()) {
    console.log('Not using Supabase, returning null user ID');
    return null;
  }
  
  const config = getApiConfig();
  if (!config.supabaseUrl || !config.supabaseKey) {
    console.error('Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
    return null;
  }
  
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      config.supabaseUrl,
      config.supabaseKey
    );
    
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      console.log('No active session found');
      return null;
    }
    
    return data.session.user.id;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};


// Configuration for the API
type ApiMode = 'mock' | 'api';

interface ApiConfig {
  mode: ApiMode;
  baseUrl: string;
  apiKey?: string;
}

// Default configuration - change this when ready to connect to real API
const apiConfig: ApiConfig = {
  // Set to 'api' when you have a real API server ready
  mode: 'mock',
  
  // Update this URL when your real API server is deployed
  baseUrl: 'https://api.example.com',
  
  // Add your API key here if needed
  // apiKey: 'your-api-key'
};

export const getApiConfig = (): ApiConfig => {
  return apiConfig;
};

// Helper to determine if we should use mock data or real API
export const useMockData = (): boolean => {
  return getApiConfig().mode === 'mock';
};

// Update this when transitioning to a real API
export const setApiMode = (mode: ApiMode, baseUrl?: string, apiKey?: string) => {
  apiConfig.mode = mode;
  if (baseUrl) apiConfig.baseUrl = baseUrl;
  if (apiKey) apiConfig.apiKey = apiKey;
};


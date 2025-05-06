
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import { getApiConfig, setApiMode, useMockData, useSupabase } from '@/lib/api-config';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const ApiSettings: React.FC = () => {
  const config = getApiConfig();
  const [apiMode, setApiModeState] = useState<'mock' | 'api' | 'supabase'>(config.mode);
  const [baseUrl, setBaseUrl] = useState(config.baseUrl);
  const [apiKey, setApiKey] = useState(config.apiKey || '');
  const [supabaseUrl, setSupabaseUrl] = useState(config.supabaseUrl || '');
  const [supabaseKey, setSupabaseKey] = useState(config.supabaseKey || '');
  
  const handleSaveSettings = () => {
    // Validate base URL if using custom API
    if (apiMode === 'api') {
      try {
        new URL(baseUrl);
      } catch (error) {
        toast.error('Please enter a valid API URL');
        return;
      }
      
      if (!baseUrl) {
        toast.error('API URL is required when using real API');
        return;
      }
    }
    
    // Validate Supabase settings if using Supabase
    if (apiMode === 'supabase') {
      if (!supabaseUrl || !supabaseKey) {
        toast.error('Supabase URL and API key are required');
        return;
      }
    }
    
    setApiMode(
      apiMode,
      baseUrl,
      apiKey || undefined,
      supabaseUrl || undefined,
      supabaseKey || undefined
    );
    toast.success('API settings updated successfully');
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">API Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Configure how the app connects to your backend
        </p>
      </div>
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>API Connection</CardTitle>
          <CardDescription>
            Choose between mock data, a real API server, or Supabase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup 
            value={apiMode} 
            onValueChange={(value) => setApiModeState(value as 'mock' | 'api' | 'supabase')}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mock" id="mock" />
              <Label htmlFor="mock">Use Mock Data</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="api" id="api" />
              <Label htmlFor="api">Use Custom API Server</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="supabase" id="supabase" />
              <Label htmlFor="supabase">Use Supabase</Label>
            </div>
          </RadioGroup>
          
          {/* Custom API settings */}
          <div className={`space-y-4 ${apiMode !== 'api' ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="space-y-2">
              <Label htmlFor="api-url">API Base URL</Label>
              <Input 
                id="api-url"
                placeholder="https://api.example.com"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                disabled={apiMode !== 'api'}
              />
              <p className="text-xs text-muted-foreground">
                The base URL for your API server (e.g., https://api.example.com)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key (Optional)</Label>
              <Input 
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={apiMode !== 'api'}
              />
              <p className="text-xs text-muted-foreground">
                If your API requires authentication, enter your API key here
              </p>
            </div>
          </div>

          {/* Supabase settings */}
          <div className={`space-y-4 ${apiMode !== 'supabase' ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="space-y-2">
              <Label htmlFor="supabase-url">Supabase URL</Label>
              <Input 
                id="supabase-url"
                placeholder="https://your-project.supabase.co"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                disabled={apiMode !== 'supabase'}
              />
              <p className="text-xs text-muted-foreground">
                Your Supabase project URL
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supabase-key">Supabase Anon Key</Label>
              <Input 
                id="supabase-key"
                type="password"
                placeholder="Enter your Supabase anon key"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                disabled={apiMode !== 'supabase'}
              />
              <p className="text-xs text-muted-foreground">
                Your public (anon) Supabase API key
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>Save API Settings</Button>
        </CardFooter>
      </Card>
      
      {apiMode === 'supabase' && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
          <h4 className="font-medium mb-2">Supabase Integration</h4>
          <p className="text-sm">
            Your app is connected to Supabase. The connection details are fetched automatically
            from your Supabase project. You can manage your Supabase project directly from the
            Supabase integration panel.
          </p>
        </div>
      )}

      {apiMode === 'api' && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
          <h4 className="font-medium mb-2">Setting up your API server</h4>
          <p className="text-sm">
            Your API server should implement endpoints that match the structure defined in the app.
            Refer to the API client for the expected endpoint structure and response formats.
          </p>
          <div className="mt-2 space-y-1 text-sm">
            <p>Required endpoints:</p>
            <ul className="list-disc pl-5">
              <li>GET /posts - List all posts</li>
              <li>POST /posts - Create a new post</li>
              <li>GET /posts/:id - Get a single post</li>
              <li>PUT /posts/:id - Update a post</li>
              <li>DELETE /posts/:id - Delete a post</li>
              <li>GET /platforms - List all platforms</li>
              <li>GET /campaigns - List all campaigns</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

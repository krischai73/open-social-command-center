
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import { getApiConfig, setApiMode, useMockData } from '@/lib/api-config';

export const ApiSettings: React.FC = () => {
  const [useMock, setUseMock] = useState(useMockData());
  const [baseUrl, setBaseUrl] = useState(getApiConfig().baseUrl);
  const [apiKey, setApiKey] = useState(getApiConfig().apiKey || '');
  
  const handleSaveSettings = () => {
    // Validate base URL if not using mock
    if (!useMock) {
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
    
    setApiMode(useMock ? 'mock' : 'api', baseUrl, apiKey || undefined);
    toast.success('API settings updated successfully');
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">API Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Configure how the app connects to your API endpoints
        </p>
      </div>
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>API Connection</CardTitle>
          <CardDescription>
            Choose between mock data and a real API server
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="use-mock">Use Mock Data</Label>
              <p className="text-sm text-muted-foreground">
                Toggle to switch between mock data and a real API server
              </p>
            </div>
            <Switch
              id="use-mock"
              checked={useMock}
              onCheckedChange={setUseMock}
            />
          </div>
          
          <div className={`space-y-4 ${useMock ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="space-y-2">
              <Label htmlFor="api-url">API Base URL</Label>
              <Input 
                id="api-url"
                placeholder="https://api.example.com"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                disabled={useMock}
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
                disabled={useMock}
              />
              <p className="text-xs text-muted-foreground">
                If your API requires authentication, enter your API key here
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>Save API Settings</Button>
        </CardFooter>
      </Card>
      
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
    </div>
  );
};

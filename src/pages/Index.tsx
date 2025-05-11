
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSupabase, getCurrentUserId } from '@/lib/api-config';
import { createClient } from '@supabase/supabase-js';
import { getApiConfig } from '@/lib/api-config';
import { toast } from '@/components/ui/sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Dashboard from "./Dashboard";

const Index = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tablePolicies, setTablePolicies] = useState<{table: string, policies: string[]}[]>([]);
  const isUsingSupabase = useSupabase();
  
  useEffect(() => {
    const checkAuth = async () => {
      if (!isUsingSupabase) return;
      
      try {
        const id = await getCurrentUserId();
        setUserId(id);
        setIsAuthenticated(!!id);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    
    checkAuth();
  }, [isUsingSupabase]);

  const handleSignIn = async () => {
    if (!isUsingSupabase) {
      toast.error('Supabase is not configured');
      return;
    }
    
    try {
      const config = getApiConfig();
      const supabase = createClient(
        config.supabaseUrl || '',
        config.supabaseKey || ''
      );
      
      // For demo purposes, using a magic link
      const { error } = await supabase.auth.signInWithOtp({
        email: prompt('Enter your email for a magic link') || '',
      });
      
      if (error) {
        toast.error(`Authentication error: ${error.message}`);
      } else {
        toast.success('Check your email for the login link');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to initiate sign in');
    }
  };

  const handleSignOut = async () => {
    if (!isUsingSupabase) return;
    
    try {
      const config = getApiConfig();
      const supabase = createClient(
        config.supabaseUrl || '',
        config.supabaseKey || ''
      );
      
      await supabase.auth.signOut();
      setUserId(null);
      setIsAuthenticated(false);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };
  
  // For demo purposes, show either the auth demo or the dashboard
  if (!isUsingSupabase) {
    return <Dashboard />;
  }
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">SocialCommand</h1>
      <p className="text-muted-foreground">Your all-in-one social media management platform</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Authentication Status</CardTitle>
          <CardDescription>
            {isAuthenticated 
              ? 'You are authenticated and can access your protected data'
              : 'You need to sign in to access your data'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAuthenticated ? (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <AlertTitle>Authenticated</AlertTitle>
              <AlertDescription>
                User ID: {userId}
                <p className="mt-2">
                  Your Row Level Security policies are active. You can only access data that belongs to your user.
                </p>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-amber-50 border-amber-200 text-amber-800">
              <AlertTitle>Not Authenticated</AlertTitle>
              <AlertDescription>
                Sign in to access your protected data. With RLS policies, 
                users can only access their own data.
              </AlertDescription>
            </Alert>
          )}
          
          {isAuthenticated && tablePolicies.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Active RLS Policies</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table</TableHead>
                    <TableHead>Policies</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tablePolicies.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.table}</TableCell>
                      <TableCell>
                        <ul className="list-disc pl-5">
                          {item.policies.map((policy, i) => (
                            <li key={i}>{policy}</li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {isAuthenticated ? (
            <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
          ) : (
            <Button onClick={handleSignIn}>Sign In</Button>
          )}
          <Button 
            className="ml-2" 
            variant="secondary" 
            onClick={() => window.location.href = '/dashboard'}
          >
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-sm text-muted-foreground">
        <p>
          <strong>Tip:</strong> After adding RLS policies, you should:
        </p>
        <ol className="list-decimal pl-5 mt-2">
          <li>Ensure all API calls include authentication</li>
          <li>Test access control by trying to access different users' data</li>
          <li>Implement proper sign-in, sign-up, and sign-out flows</li>
        </ol>
      </div>
    </div>
  );
};

export default Index;

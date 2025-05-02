
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const SecuritySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account security and access settings.
        </p>
      </div>
      <Separator />
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Password</h4>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long and include numbers and symbols.
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            
            <div>
              <Button className="mt-2">Update Password</Button>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch id="enable-2fa" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="2fa-method">Preferred 2FA Method</Label>
            <Select defaultValue="app">
              <SelectTrigger id="2fa-method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app">Authenticator App</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Button variant="outline">Set Up Two-Factor Authentication</Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Login Sessions</h4>
          
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-xs text-muted-foreground">
                  Chrome on MacOS • California, USA • Started May 2, 2025
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
            </div>
          </div>
          
          <div>
            <Button variant="outline">Manage All Sessions</Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Advanced Security</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Login Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified about new logins to your account
                </p>
              </div>
              <Switch id="login-notify" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Require approval for new devices</p>
                <p className="text-sm text-muted-foreground">
                  New devices will require your approval before login
                </p>
              </div>
              <Switch id="device-approval" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">IP restrictions</p>
                <p className="text-sm text-muted-foreground">
                  Limit access to trusted IP addresses
                </p>
              </div>
              <Switch id="ip-restrict" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Save Security Settings</Button>
      </div>
    </div>
  );
};

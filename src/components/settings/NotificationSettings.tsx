
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Configure how and when you receive notifications.
        </p>
      </div>
      <Separator />
      
      <div className="space-y-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Delivery Methods</h4>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex items-center gap-2">
                Email Notifications
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="browser-notifications" className="flex items-center gap-2">
                Browser Notifications
              </Label>
              <Switch id="browser-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="mobile-notifications" className="flex items-center gap-2">
                Mobile Push Notifications
              </Label>
              <Switch id="mobile-notifications" defaultChecked />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Notification Types</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Post Performance</p>
                <p className="text-sm text-muted-foreground">
                  Engagement milestones and analytics reports
                </p>
              </div>
              <Switch id="post-performance" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mentions & Comments</p>
                <p className="text-sm text-muted-foreground">
                  When your account is mentioned or receives comments
                </p>
              </div>
              <Switch id="mentions-comments" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Followers</p>
                <p className="text-sm text-muted-foreground">
                  When your accounts gain new followers
                </p>
              </div>
              <Switch id="new-followers" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Scheduled Posts</p>
                <p className="text-sm text-muted-foreground">
                  Reminders about upcoming scheduled content
                </p>
              </div>
              <Switch id="scheduled-posts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Team Activity</p>
                <p className="text-sm text-muted-foreground">
                  When team members make changes or add content
                </p>
              </div>
              <Switch id="team-activity" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Platform Updates</p>
                <p className="text-sm text-muted-foreground">
                  New features, tips and product announcements
                </p>
              </div>
              <Switch id="platform-updates" defaultChecked />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Notification Frequency</h4>
          <div className="grid gap-2">
            <Label htmlFor="frequency">Email Digest Frequency</Label>
            <Select defaultValue="daily">
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Digest</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
};

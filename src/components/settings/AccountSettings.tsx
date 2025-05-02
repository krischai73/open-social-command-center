
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export const AccountSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Account Information</h3>
        <p className="text-sm text-muted-foreground">Update your account details and preferences.</p>
      </div>
      <Separator />
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="yourname@example.com" />
          <p className="text-xs text-muted-foreground">This is the email used for notifications and login.</p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="yourcompany" />
          <p className="text-xs text-muted-foreground">This is your public username visible across the platform.</p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select defaultValue="utc-8">
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc-12">UTC-12:00</SelectItem>
              <SelectItem value="utc-11">UTC-11:00</SelectItem>
              <SelectItem value="utc-10">UTC-10:00</SelectItem>
              <SelectItem value="utc-9">UTC-09:00</SelectItem>
              <SelectItem value="utc-8">UTC-08:00 (Pacific)</SelectItem>
              <SelectItem value="utc-7">UTC-07:00 (Mountain)</SelectItem>
              <SelectItem value="utc-6">UTC-06:00 (Central)</SelectItem>
              <SelectItem value="utc-5">UTC-05:00 (Eastern)</SelectItem>
              <SelectItem value="utc-4">UTC-04:00</SelectItem>
              <SelectItem value="utc-3">UTC-03:00</SelectItem>
              <SelectItem value="utc-2">UTC-02:00</SelectItem>
              <SelectItem value="utc-1">UTC-01:00</SelectItem>
              <SelectItem value="utc">UTC+00:00</SelectItem>
              <SelectItem value="utc+1">UTC+01:00</SelectItem>
              <SelectItem value="utc+2">UTC+02:00</SelectItem>
              <SelectItem value="utc+3">UTC+03:00</SelectItem>
              <SelectItem value="utc+4">UTC+04:00</SelectItem>
              <SelectItem value="utc+5">UTC+05:00</SelectItem>
              <SelectItem value="utc+5:30">UTC+05:30</SelectItem>
              <SelectItem value="utc+6">UTC+06:00</SelectItem>
              <SelectItem value="utc+7">UTC+07:00</SelectItem>
              <SelectItem value="utc+8">UTC+08:00</SelectItem>
              <SelectItem value="utc+9">UTC+09:00</SelectItem>
              <SelectItem value="utc+10">UTC+10:00</SelectItem>
              <SelectItem value="utc+11">UTC+11:00</SelectItem>
              <SelectItem value="utc+12">UTC+12:00</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Your timezone will be used for scheduling and reporting.</p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="date-format">Date Format</Label>
          <Select defaultValue="mm-dd-yyyy">
            <SelectTrigger id="date-format">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
              <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
              <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="language">Language</Label>
          <Select defaultValue="en">
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="it">Italian</SelectItem>
              <SelectItem value="pt">Portuguese</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
              <SelectItem value="ko">Korean</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

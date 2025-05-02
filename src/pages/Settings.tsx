
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { TeamSettings } from '@/components/settings/TeamSettings';
import { PlatformSettings } from '@/components/settings/PlatformSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your account and platform preferences
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>
            Manage your account, preferences, and social media connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4">
              <AccountSettings />
            </TabsContent>
            <TabsContent value="profile" className="space-y-4">
              <ProfileSettings />
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="team" className="space-y-4">
              <TeamSettings />
            </TabsContent>
            <TabsContent value="platforms" className="space-y-4">
              <PlatformSettings />
            </TabsContent>
            <TabsContent value="security" className="space-y-4">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

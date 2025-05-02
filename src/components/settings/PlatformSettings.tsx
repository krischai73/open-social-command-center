
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Twitter, Instagram, Facebook, Plus } from 'lucide-react';

const connectedAccounts = [
  { id: 1, platform: "twitter", name: "@yourcompany", isConnected: true },
  { id: 2, platform: "instagram", name: "@yourcompany", isConnected: true },
  { id: 3, platform: "facebook", name: "Your Company Page", isConnected: false }
];

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
  switch (platform) {
    case 'twitter':
      return <Twitter className="h-5 w-5" />;
    case 'instagram':
      return <Instagram className="h-5 w-5" />;
    case 'facebook':
      return <Facebook className="h-5 w-5" />;
    default:
      return null;
  }
};

export const PlatformSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Platform Connections</h3>
            <p className="text-sm text-muted-foreground">
              Manage your connected social media accounts.
            </p>
          </div>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add Account
          </Button>
        </div>
      </div>
      <Separator />
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Connected Accounts</h4>
          <div className="border rounded-md divide-y">
            {connectedAccounts.map((account) => (
              <div key={account.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    account.platform === 'twitter' ? 'bg-blue-100 text-blue-500' :
                    account.platform === 'instagram' ? 'bg-pink-100 text-pink-500' :
                    'bg-indigo-100 text-indigo-500'
                  }`}>
                    <PlatformIcon platform={account.platform} />
                  </div>
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{account.platform}</p>
                  </div>
                </div>
                <div>
                  {account.isConnected ? (
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-green-50 border-green-200 text-green-600">
                        Connected
                      </Badge>
                      <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                  ) : (
                    <Button size="sm">Connect</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Platform Settings</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-publish across platforms</p>
                <p className="text-sm text-muted-foreground">
                  Automatically publish content to all connected accounts
                </p>
              </div>
              <Switch id="auto-publish" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Adaptive content formatting</p>
                <p className="text-sm text-muted-foreground">
                  Automatically optimize content for each platform
                </p>
              </div>
              <Switch id="adaptive-format" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Schedule timezone adjustment</p>
                <p className="text-sm text-muted-foreground">
                  Adjust posting times based on audience timezone
                </p>
              </div>
              <Switch id="timezone-adjust" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Advanced analytics integration</p>
                <p className="text-sm text-muted-foreground">
                  Connect with external analytics platforms
                </p>
              </div>
              <Switch id="analytics-integration" defaultChecked />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">API Access</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">API Key</p>
                <p className="text-sm text-muted-foreground">
                  For integrating with other applications
                </p>
              </div>
              <Button variant="outline" size="sm">Generate API Key</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Webhooks</p>
                <p className="text-sm text-muted-foreground">
                  Set up event notifications to external services
                </p>
              </div>
              <Button variant="outline" size="sm">Configure Webhooks</Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Save Platform Settings</Button>
      </div>
    </div>
  );
};

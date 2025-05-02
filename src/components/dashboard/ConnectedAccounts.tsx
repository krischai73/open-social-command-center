
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Twitter, Instagram, Facebook, Plus } from 'lucide-react';

interface Account {
  id: string;
  platform: 'twitter' | 'instagram' | 'facebook';
  username: string;
  avatar: string;
  isConnected: boolean;
}

const accounts: Account[] = [
  {
    id: '1',
    platform: 'twitter',
    username: '@yourcompany',
    avatar: 'https://i.pravatar.cc/100?img=1',
    isConnected: true,
  },
  {
    id: '2',
    platform: 'instagram',
    username: '@yourcompany',
    avatar: 'https://i.pravatar.cc/100?img=2',
    isConnected: true,
  },
  {
    id: '3',
    platform: 'facebook',
    username: 'Your Company Page',
    avatar: 'https://i.pravatar.cc/100?img=3',
    isConnected: false,
  }
];

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
  switch (platform) {
    case 'twitter':
      return <Twitter className="h-4 w-4" />;
    case 'instagram':
      return <Instagram className="h-4 w-4" />;
    case 'facebook':
      return <Facebook className="h-4 w-4" />;
    default:
      return null;
  }
};

export const ConnectedAccounts: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">Connected Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {accounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  account.platform === 'twitter' ? 'bg-blue-100 text-blue-500' :
                  account.platform === 'instagram' ? 'bg-pink-100 text-pink-500' :
                  'bg-indigo-100 text-indigo-500'
                }`}>
                  <PlatformIcon platform={account.platform} />
                </div>
                <div>
                  <p className="text-sm font-medium">{account.username}</p>
                  <p className="text-xs text-muted-foreground capitalize">{account.platform}</p>
                </div>
              </div>
              <Button 
                variant={account.isConnected ? "outline" : "default"} 
                size="sm" 
                className={account.isConnected ? "text-xs" : "text-xs flex items-center gap-1"}
              >
                {!account.isConnected && <Plus className="h-3 w-3" />}
                {account.isConnected ? 'Connected' : 'Connect'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

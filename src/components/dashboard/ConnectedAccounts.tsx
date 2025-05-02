
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Twitter, Instagram, Facebook, Linkedin, Youtube, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Account {
  id: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin' | 'youtube';
  username: string;
  avatar: string;
  isConnected: boolean;
  contentTypes?: string[];
}

const accounts: Account[] = [
  {
    id: '1',
    platform: 'twitter',
    username: '@yourcompany',
    avatar: 'https://i.pravatar.cc/100?img=1',
    isConnected: true,
    contentTypes: ['posts', 'polls']
  },
  {
    id: '2',
    platform: 'instagram',
    username: '@yourcompany',
    avatar: 'https://i.pravatar.cc/100?img=2',
    isConnected: true,
    contentTypes: ['posts', 'stories', 'reels']
  },
  {
    id: '3',
    platform: 'facebook',
    username: 'Your Company Page',
    avatar: 'https://i.pravatar.cc/100?img=3',
    isConnected: false,
    contentTypes: ['posts', 'stories']
  },
  {
    id: '4',
    platform: 'linkedin',
    username: 'Your Company',
    avatar: 'https://i.pravatar.cc/100?img=4',
    isConnected: true,
    contentTypes: ['posts', 'articles']
  },
  {
    id: '5',
    platform: 'youtube',
    username: 'Your Company Channel',
    avatar: 'https://i.pravatar.cc/100?img=5',
    isConnected: false,
    contentTypes: ['videos', 'shorts']
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
    case 'linkedin':
      return <Linkedin className="h-4 w-4" />;
    case 'youtube':
      return <Youtube className="h-4 w-4" />;
    default:
      return null;
  }
};

const getIconBackground = (platform: string) => {
  switch (platform) {
    case 'twitter': return 'bg-blue-100 text-blue-500';
    case 'instagram': return 'bg-pink-100 text-pink-500';
    case 'facebook': return 'bg-indigo-100 text-indigo-500';
    case 'linkedin': return 'bg-blue-100 text-blue-800';
    case 'youtube': return 'bg-red-100 text-red-500';
    default: return 'bg-gray-100';
  }
};

export const ConnectedAccounts: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md font-medium">Connected Accounts</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">View all</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {accounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getIconBackground(account.platform)}`}>
                  <PlatformIcon platform={account.platform} />
                </div>
                <div>
                  <p className="text-sm font-medium">{account.username}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-muted-foreground capitalize">{account.platform}</p>
                    {account.isConnected && account.contentTypes && (
                      <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                        {account.contentTypes.length} content types
                      </Badge>
                    )}
                  </div>
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


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Twitter, Instagram, Facebook, Linkedin, Youtube, 
  MessageSquare, Video, Image, FileText, Plus, 
  Calendar, Share, Bell
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SocialAccount {
  id: string;
  platform: string;
  name: string;
  isConnected: boolean;
  contentTypes: string[];
  lastSync?: string;
}

const connectedAccounts: SocialAccount[] = [
  { 
    id: "1", 
    platform: "twitter", 
    name: "@yourcompany", 
    isConnected: true, 
    contentTypes: ["posts", "polls", "images"],
    lastSync: "2025-05-01T14:30:00"
  },
  { 
    id: "2", 
    platform: "instagram", 
    name: "@yourcompany", 
    isConnected: true, 
    contentTypes: ["posts", "stories", "reels", "carousels"],
    lastSync: "2025-05-01T15:20:00"
  },
  { 
    id: "3", 
    platform: "facebook", 
    name: "Your Company Page", 
    isConnected: false,
    contentTypes: ["posts", "stories", "videos", "polls"]
  },
  { 
    id: "4", 
    platform: "linkedin", 
    name: "Your Company", 
    isConnected: true,
    contentTypes: ["posts", "articles", "polls"],
    lastSync: "2025-05-01T13:45:00"
  },
  { 
    id: "5", 
    platform: "youtube", 
    name: "Your Company Channel", 
    isConnected: false,
    contentTypes: ["videos", "shorts", "comments"]
  },
  { 
    id: "6", 
    platform: "pinterest", 
    name: "Your Company", 
    isConnected: false,
    contentTypes: ["pins", "boards", "carousels"]
  },
  { 
    id: "7", 
    platform: "reddit", 
    name: "u/yourcompany", 
    isConnected: false,
    contentTypes: ["posts", "comments", "polls"]
  },
  { 
    id: "8", 
    platform: "tiktok", 
    name: "@yourcompany", 
    isConnected: false,
    contentTypes: ["videos", "challenges", "duets"]
  },
  { 
    id: "9", 
    platform: "threads", 
    name: "@yourcompany", 
    isConnected: false,
    contentTypes: ["posts", "replies"]
  },
  { 
    id: "10", 
    platform: "mastodon", 
    name: "@yourcompany@instance.social", 
    isConnected: false,
    contentTypes: ["posts", "replies"]
  },
  { 
    id: "11", 
    platform: "bluesky", 
    name: "@yourcompany.bsky.social", 
    isConnected: false,
    contentTypes: ["posts", "replies"]
  }
];

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
  switch (platform) {
    case 'twitter':
      return <Twitter className="h-5 w-5" />;
    case 'instagram':
      return <Instagram className="h-5 w-5" />;
    case 'facebook':
      return <Facebook className="h-5 w-5" />;
    case 'linkedin':
      return <Linkedin className="h-5 w-5" />;
    case 'youtube':
      return <Youtube className="h-5 w-5" />;
    case 'reddit':
      return <MessageSquare className="h-5 w-5" />;
    case 'pinterest':
      return <Image className="h-5 w-5" />;
    case 'tiktok':
      return <Video className="h-5 w-5" />;
    case 'threads':
      return <MessageSquare className="h-5 w-5" />;
    case 'mastodon':
      return <Share className="h-5 w-5" />;
    case 'bluesky':
      return <FileText className="h-5 w-5" />;
    default:
      return <MessageSquare className="h-5 w-5" />;
  }
};

const getIconBackground = (platform: string) => {
  switch (platform) {
    case 'twitter': return 'bg-blue-100 text-blue-500';
    case 'instagram': return 'bg-pink-100 text-pink-500';
    case 'facebook': return 'bg-indigo-100 text-indigo-500';
    case 'linkedin': return 'bg-blue-100 text-blue-800';
    case 'youtube': return 'bg-red-100 text-red-500';
    case 'reddit': return 'bg-orange-100 text-orange-500';
    case 'pinterest': return 'bg-red-100 text-red-600';
    case 'tiktok': return 'bg-slate-100 text-slate-800';
    case 'threads': return 'bg-gray-100 text-gray-800';
    case 'mastodon': return 'bg-purple-100 text-purple-500';
    case 'bluesky': return 'bg-sky-100 text-sky-500';
    default: return 'bg-gray-100 text-gray-500';
  }
};

export const PlatformSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredAccounts = searchFilter 
    ? connectedAccounts.filter(account => 
        account.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
        account.platform.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : connectedAccounts;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Platform Connections</h3>
            <p className="text-sm text-muted-foreground">
              Manage your connected social media accounts across all platforms
            </p>
          </div>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add Account
          </Button>
        </div>
      </div>
      <Separator />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="content">Content Types</TabsTrigger>
          <TabsTrigger value="settings">API Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts" className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search platforms or accounts..."
              className="w-full px-3 py-2 border rounded-md mb-2"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          
          <div className="border rounded-md divide-y max-h-[450px] overflow-y-auto">
            {filteredAccounts.map((account) => (
              <div key={account.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconBackground(account.platform)}`}>
                    <PlatformIcon platform={account.platform} />
                  </div>
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <div className="flex items-center">
                      <p className="text-xs text-muted-foreground capitalize">{account.platform}</p>
                      {account.lastSync && (
                        <p className="text-xs text-muted-foreground ml-2">
                          • Last synced: {new Date(account.lastSync).toLocaleDateString()}
                        </p>
                      )}
                    </div>
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
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Supported Content Types by Platform</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connectedAccounts.map((account) => (
                  <div key={account.id} className="border rounded-md p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getIconBackground(account.platform)}`}>
                        <PlatformIcon platform={account.platform} />
                      </div>
                      <p className="font-medium capitalize">{account.platform}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {account.contentTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Cross-Platform Content Settings</h4>
            
            <div className="space-y-4">
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
                  <p className="font-medium">Auto-crop visuals</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically crop images and videos to match platform requirements
                  </p>
                </div>
                <Switch id="auto-crop" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Content compliance check</p>
                  <p className="text-sm text-muted-foreground">
                    Check content against platform guidelines before publishing
                  </p>
                </div>
                <Switch id="compliance-check" defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">API Configuration</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rate limit protection</p>
                  <p className="text-sm text-muted-foreground">
                    Prevent API rate limit errors by managing request frequency
                  </p>
                </div>
                <Switch id="rate-limit" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Error notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when API errors occur
                  </p>
                </div>
                <Switch id="error-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-reconnect</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically reconnect APIs when token expires
                  </p>
                </div>
                <Switch id="auto-reconnect" defaultChecked />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Platform Interaction Settings</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Unified inbox</p>
                  <p className="text-sm text-muted-foreground">
                    Manage comments and messages from all platforms in one inbox
                  </p>
                </div>
                <Switch id="unified-inbox" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-respond to comments</p>
                  <p className="text-sm text-muted-foreground">
                    Set up automatic responses to common comments
                  </p>
                </div>
                <Switch id="auto-respond" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Comment moderation</p>
                  <p className="text-sm text-muted-foreground">
                    Filter inappropriate comments before they appear publicly
                  </p>
                </div>
                <Switch id="comment-moderation" defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Global Platform Settings</h4>
        
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
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push notifications for manual posting</p>
              <p className="text-sm text-muted-foreground">
                Receive mobile alerts when manual posting is required
              </p>
            </div>
            <Switch id="push-notifications" defaultChecked />
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
      
      <div className="flex justify-end">
        <Button>Save Platform Settings</Button>
      </div>
    </div>
  );
};

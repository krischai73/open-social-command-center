
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Twitter, Instagram, Facebook, Linkedin, Youtube, 
  MessageSquare, Video, Image, FileText, Plus, 
  Search, Calendar, Bell
} from 'lucide-react';

interface PlatformAccount {
  id: string;
  platform: string;
  name: string;
  isConnected: boolean;
  contentTypes: string[];
  lastSync?: string;
  profilePic?: string;
  metrics?: {
    followers: number;
    engagement: number;
    posts: number;
  };
}

const accounts: PlatformAccount[] = [
  { 
    id: "1", 
    platform: "twitter", 
    name: "@yourcompany", 
    isConnected: true, 
    contentTypes: ["posts", "polls", "images"],
    lastSync: "2025-05-01T14:30:00",
    profilePic: "https://i.pravatar.cc/100?img=1",
    metrics: {
      followers: 12500,
      engagement: 3.2,
      posts: 458
    }
  },
  { 
    id: "2", 
    platform: "instagram", 
    name: "@yourcompany", 
    isConnected: true, 
    contentTypes: ["posts", "stories", "reels", "carousels"],
    lastSync: "2025-05-01T15:20:00",
    profilePic: "https://i.pravatar.cc/100?img=2",
    metrics: {
      followers: 25800,
      engagement: 4.7,
      posts: 312
    }
  },
  { 
    id: "3", 
    platform: "facebook", 
    name: "Your Company Page", 
    isConnected: false,
    contentTypes: ["posts", "stories", "videos", "polls"],
    profilePic: "https://i.pravatar.cc/100?img=3"
  },
  { 
    id: "4", 
    platform: "linkedin", 
    name: "Your Company", 
    isConnected: true,
    contentTypes: ["posts", "articles", "polls"],
    lastSync: "2025-05-01T13:45:00",
    profilePic: "https://i.pravatar.cc/100?img=4",
    metrics: {
      followers: 8450,
      engagement: 2.8,
      posts: 156
    }
  },
  { 
    id: "5", 
    platform: "youtube", 
    name: "Your Company Channel", 
    isConnected: false,
    contentTypes: ["videos", "shorts", "comments"],
    profilePic: "https://i.pravatar.cc/100?img=5"
  },
  { 
    id: "6", 
    platform: "pinterest", 
    name: "Your Company", 
    isConnected: false,
    contentTypes: ["pins", "boards", "carousels"],
    profilePic: "https://i.pravatar.cc/100?img=6"
  },
  { 
    id: "7", 
    platform: "reddit", 
    name: "u/yourcompany", 
    isConnected: false,
    contentTypes: ["posts", "comments", "polls"],
    profilePic: "https://i.pravatar.cc/100?img=7"
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
    default: return 'bg-gray-100 text-gray-500';
  }
};

const PlatformsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = searchQuery === '' || 
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.platform.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeTab === 'all' || 
      (activeTab === 'connected' && account.isConnected) ||
      (activeTab === 'disconnected' && !account.isConnected);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold">Platform Management</h1>
        <p className="text-muted-foreground mt-1">Connect and manage all your social media platforms</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search accounts..." 
            className="pl-8 w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="flex items-center gap-2 w-full md:w-auto">
          <Plus className="h-4 w-4" />
          Connect New Platform
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Accounts</CardTitle>
          <CardDescription>
            Connect, manage and monitor all your social platform accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Platforms</TabsTrigger>
              <TabsTrigger value="connected">Connected</TabsTrigger>
              <TabsTrigger value="disconnected">Not Connected</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map(account => (
                  <Card key={account.id} className="overflow-hidden">
                    <div className="p-4 flex items-start">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${getIconBackground(account.platform)}`}>
                        <PlatformIcon platform={account.platform} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{account.name}</h3>
                            <p className="text-sm text-muted-foreground capitalize">{account.platform}</p>
                          </div>
                          <Badge variant={account.isConnected ? "outline" : "secondary"} className={
                            account.isConnected ? "bg-green-50 text-green-700 border-green-200" : ""
                          }>
                            {account.isConnected ? "Connected" : "Not Connected"}
                          </Badge>
                        </div>
                        
                        {account.isConnected && account.metrics && (
                          <div className="grid grid-cols-3 gap-2 mt-3">
                            <div className="text-center p-1 bg-muted rounded">
                              <p className="text-sm font-medium">{account.metrics.followers.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">Followers</p>
                            </div>
                            <div className="text-center p-1 bg-muted rounded">
                              <p className="text-sm font-medium">{account.metrics.engagement}%</p>
                              <p className="text-xs text-muted-foreground">Engagement</p>
                            </div>
                            <div className="text-center p-1 bg-muted rounded">
                              <p className="text-sm font-medium">{account.metrics.posts}</p>
                              <p className="text-xs text-muted-foreground">Posts</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex gap-2 mt-3">
                          {account.isConnected ? (
                            <>
                              <Button variant="outline" size="sm" className="text-xs">View Analytics</Button>
                              <Button variant="outline" size="sm" className="text-xs">Settings</Button>
                            </>
                          ) : (
                            <Button size="sm" className="text-xs">Connect Account</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 py-10 text-center">
                  <p className="text-muted-foreground">No accounts found matching your criteria</p>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformsPage;

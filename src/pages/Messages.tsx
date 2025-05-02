
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, Twitter, Instagram, Facebook, Linkedin, MessageSquare,
  User, Send, Image, Smile, AtSign, Clock
} from 'lucide-react';

interface Message {
  id: string;
  platform: string;
  sender: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  time: string;
  isRead: boolean;
}

const messages: Message[] = [
  {
    id: '1',
    platform: 'twitter',
    sender: '@customer1',
    senderName: 'John Doe',
    senderAvatar: 'https://i.pravatar.cc/150?img=1',
    content: 'When will the new product be available? I\'ve been waiting for months!',
    time: '2025-05-02T09:30:00',
    isRead: false,
  },
  {
    id: '2',
    platform: 'instagram',
    sender: '@customer2',
    senderName: 'Sarah Smith',
    senderAvatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Love your latest post! Can you share what tools you used to create that animation?',
    time: '2025-05-02T09:15:00',
    isRead: true,
  },
  {
    id: '3',
    platform: 'facebook',
    sender: 'David Johnson',
    senderName: 'David Johnson',
    senderAvatar: 'https://i.pravatar.cc/150?img=3',
    content: 'Do you ship internationally? I\'m interested in ordering your product but I live in France.',
    time: '2025-05-02T08:45:00',
    isRead: false,
  },
  {
    id: '4',
    platform: 'linkedin',
    sender: 'Emily Williams',
    senderName: 'Emily Williams',
    senderAvatar: 'https://i.pravatar.cc/150?img=4',
    content: 'I saw your article on industry trends. Would you be interested in speaking at our upcoming virtual conference?',
    time: '2025-05-01T17:20:00',
    isRead: true,
  },
  {
    id: '5',
    platform: 'instagram',
    sender: '@customer5',
    senderName: 'Michael Brown',
    senderAvatar: 'https://i.pravatar.cc/150?img=5',
    content: 'Your story was amazing today! What camera do you use for those shots?',
    time: '2025-05-01T15:10:00',
    isRead: true,
  },
  {
    id: '6',
    platform: 'twitter',
    sender: '@customer6',
    senderName: 'Lisa Anderson',
    senderAvatar: 'https://i.pravatar.cc/150?img=6',
    content: 'I\'m having an issue with your app. It keeps crashing when I try to upload multiple photos. Can you help?',
    time: '2025-05-01T14:05:00',
    isRead: false,
  },
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
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const getIconBackground = (platform: string) => {
  switch (platform) {
    case 'twitter': return 'bg-blue-100 text-blue-500';
    case 'instagram': return 'bg-pink-100 text-pink-500';
    case 'facebook': return 'bg-indigo-100 text-indigo-500';
    case 'linkedin': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-500';
  }
};

const formatTime = (timeString: string) => {
  const messageTime = new Date(timeString);
  const now = new Date();
  const diffInHours = (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return messageTime.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

const MessagesPage: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredMessages = messages.filter(message => {
    const matchesSearch = searchQuery === '' || 
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      (activeTab === 'all') ||
      (activeTab === 'unread' && !message.isRead) || 
      (activeTab === message.platform);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold">Unified Inbox</h1>
        <p className="text-muted-foreground mt-1">Manage messages and comments from all your platforms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Messages</CardTitle>
                <Badge>{messages.filter(m => !m.isRead).length}</Badge>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="px-4">
                <TabsList className="w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="twitter">Twitter</TabsTrigger>
                  <TabsTrigger value="instagram">Instagram</TabsTrigger>
                </TabsList>
              </div>
              <CardContent className="p-0 mt-2">
                <div className="h-[500px] overflow-y-auto">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`p-3 border-b cursor-pointer transition-colors ${
                          selectedMessage?.id === message.id 
                            ? 'bg-muted' 
                            : message.isRead ? '' : 'bg-blue-50'
                        }`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img src={message.senderAvatar} alt={message.senderName} className="w-full h-full object-cover" />
                            </div>
                            <div className={`absolute -right-1 -bottom-1 w-5 h-5 rounded-full flex items-center justify-center ${getIconBackground(message.platform)}`}>
                              <PlatformIcon platform={message.platform} />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm truncate">{message.sender}</p>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatTime(message.time)}
                              </span>
                            </div>
                            <p className="text-sm truncate text-muted-foreground">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-muted-foreground">No messages found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {selectedMessage ? (
              <>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={selectedMessage.senderAvatar} alt={selectedMessage.senderName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{selectedMessage.sender}</p>
                          <div className={`px-1.5 py-0.5 rounded-full text-xs flex items-center gap-1 ${getIconBackground(selectedMessage.platform)}`}>
                            <PlatformIcon platform={selectedMessage.platform} />
                            <span className="capitalize">{selectedMessage.platform}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{new Date(selectedMessage.time).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button variant="outline" size="sm">History</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <img src={selectedMessage.senderAvatar} alt={selectedMessage.senderName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="bg-muted rounded-lg p-3 inline-block">
                          <p>{selectedMessage.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{formatTime(selectedMessage.time)}</p>
                      </div>
                    </div>
                    
                    {/* Example of a response message */}
                    <div className="flex gap-3 justify-end">
                      <div>
                        <div className="bg-primary text-primary-foreground rounded-lg p-3 inline-block">
                          <p>Thank you for reaching out! Let me check and get back to you shortly.</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-right">{formatTime(new Date().toISOString())}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="space-y-4">
                    <div>
                      <Textarea 
                        placeholder="Type your reply..." 
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <AtSign className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Clock className="h-4 w-4" />
                          <span className="text-xs">Schedule</span>
                        </Button>
                      </div>
                      <div>
                        <Button className="gap-1">
                          <Send className="h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full p-8 text-center">
                <div>
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No message selected</h3>
                  <p className="text-muted-foreground">Select a message from the list to view the conversation</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;

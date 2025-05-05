
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Globe, Lock, Eye, EyeOff, Copy, ExternalLink } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const PublicPortfolio: React.FC = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [username, setUsername] = useState('yourcompany');
  const [activeTab, setActiveTab] = useState('settings');
  const portfolioUrl = `https://socialcommand.app/portfolio/${username}`;
  
  const handleTogglePublic = (checked: boolean) => {
    setIsPublic(checked);
    toast.success(checked ? 'Portfolio is now public!' : 'Portfolio is now private');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    toast.success('Portfolio link copied to clipboard!');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="h-5 w-5 text-brand-600" />
          Public Portfolio
        </CardTitle>
        <CardDescription>
          Showcase your best content to the world
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Public portfolio</Label>
                <p className="text-sm text-muted-foreground">
                  Make your portfolio accessible to anyone with the link
                </p>
              </div>
              <Switch checked={isPublic} onCheckedChange={handleTogglePublic} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Portfolio URL</Label>
              <div className="flex gap-2">
                <div className="bg-muted rounded-l-md flex items-center px-3 text-sm text-muted-foreground">
                  socialcommand.app/portfolio/
                </div>
                <Input 
                  id="username"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="username"
                  className="rounded-l-none"
                  disabled={!isPublic}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Choose a unique username for your public portfolio URL
              </p>
            </div>
            
            {isPublic && (
              <div className="space-y-2 pt-2">
                <Label>Portfolio link</Label>
                <div className="flex gap-2">
                  <Input readOnly value={portfolioUrl} className="text-sm flex-1" />
                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            )}
            
            <div className="space-y-2 pt-4">
              <Label className="text-base">Visibility options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList>
                      <TabsTrigger value="all">All content</TabsTrigger>
                      <TabsTrigger value="selected">Selected content</TabsTrigger>
                      <TabsTrigger value="auto">Auto-curated</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose which content to showcase in your public portfolio
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            {isPublic ? (
              <div className="space-y-4">
                <div className="border rounded-md p-6 bg-card text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-brand-100 mx-auto flex items-center justify-center">
                    <Globe className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-xl">Your Company</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    View our best social media content and campaigns
                  </p>
                  <div className="flex justify-center gap-2">
                    <Badge variant="secondary">42 Posts</Badge>
                    <Badge variant="secondary">12 Campaigns</Badge>
                    <Badge variant="secondary">3 Platforms</Badge>
                  </div>
                  <div className="pt-4">
                    <Button>View Public Portfolio</Button>
                  </div>
                </div>
                <div className="text-sm text-center text-muted-foreground">
                  This is how your portfolio landing page will appear to visitors
                </div>
              </div>
            ) : (
              <div className="border rounded-md p-8 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Lock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium">Your portfolio is private</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Enable public portfolio in the settings tab to preview how it will look
                </p>
                <Button 
                  variant="outline" 
                  className="mt-2" 
                  onClick={() => setActiveTab('settings')}
                >
                  Go to settings
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

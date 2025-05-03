
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar as CalendarIcon, Twitter, Instagram, Facebook, Image, Link, AtSign, Hash, Clock,
  Save, SendHorizontal, BrainCircuit, FileText
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import AIAssistant from '@/components/compose/AIAssistant';

const Compose: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [content, setContent] = useState<string>('');
  const [showAIOptions, setShowAIOptions] = useState<boolean>(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold">Compose Content</h1>
        <p className="text-muted-foreground mt-1">Create and schedule posts across multiple platforms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Post Content</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => setShowAIOptions(!showAIOptions)}
                >
                  <BrainCircuit className="h-4 w-4" />
                  <span>AI Assistant</span>
                </Button>
              </CardTitle>
              <CardDescription>Create your post content and preview how it will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {showAIOptions && (
                  <AIAssistant content={content} setContent={setContent} />
                )}
                
                <Textarea 
                  placeholder="What do you want to share?" 
                  className="min-h-[120px] resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Image className="h-4 w-4" />
                    <span>Media</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Link className="h-4 w-4" />
                    <span>Link</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <AtSign className="h-4 w-4" />
                    <span>Mention</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Hash className="h-4 w-4" />
                    <span>Hashtag</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" />
                    <span>Repurpose</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Post Preview</CardTitle>
              <CardDescription>See how your post will appear on each platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="twitter">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="twitter" className="gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </TabsTrigger>
                  <TabsTrigger value="instagram" className="gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </TabsTrigger>
                  <TabsTrigger value="facebook" className="gap-2">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="twitter" className="border rounded-lg p-4 bg-white">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <Twitter className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">Your Company</span>
                        <span className="text-muted-foreground">@yourcompany</span>
                      </div>
                      <p className="mt-1">{content || "Your post content will appear here. Add text in the composer to see the preview."}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="instagram" className="border rounded-lg p-4 bg-white">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                      <Instagram className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-semibold">yourcompany</span>
                      <p className="mt-1">{content || "Your post content will appear here. Add text in the composer to see the preview."}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="facebook" className="border rounded-lg p-4 bg-white">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                      <Facebook className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-semibold">Your Company Page</span>
                      <p className="mt-1">{content || "Your post content will appear here. Add text in the composer to see the preview."}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
              <CardDescription>Configure when and where to publish</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Platforms</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1 bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-blue-700">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Schedule</label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full justify-start gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-1">
                      <Clock className="h-4 w-4" />
                      Select time
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Categories</label>
                  <Input placeholder="Add categories (optional)" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-3">
            <Button variant="outline" className="w-full gap-1">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button className="w-full gap-1">
              <SendHorizontal className="h-4 w-4" />
              Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;

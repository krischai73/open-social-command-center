
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar as CalendarIcon, Twitter, Instagram, Facebook, Image, Link, AtSign, Hash, Clock,
  Save, SendHorizontal, BrainCircuit, FileText, BarChart
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { toast } from '@/components/ui/sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import AIAssistant from '@/components/compose/AIAssistant';
import IntelligentScheduling from '@/components/compose/IntelligentScheduling';
import TimeSelector from '@/components/compose/TimeSelector';
import AnalyticsInsights from '@/components/analytics/AnalyticsInsights';

const Compose: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [showAIOptions, setShowAIOptions] = useState<boolean>(false);
  const [showSchedulingOptions, setShowSchedulingOptions] = useState<boolean>(false);
  const [showAnalyticsInsights, setShowAnalyticsInsights] = useState<boolean>(false);
  
  // Platform selection state
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter']);
  
  // New states for button dialogs
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [linkTitle, setLinkTitle] = useState<string>('');
  const [mention, setMention] = useState<string>('');
  const [hashtag, setHashtag] = useState<string>('');
  const [repurposeContent, setRepurposeContent] = useState<string>('');

  // Toggle platform selection
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  // Handle media insertion
  const handleInsertMedia = () => {
    if (!mediaUrl.trim()) {
      toast.error("Please enter a valid media URL");
      return;
    }
    
    // In a real app, you might want to validate the URL format
    const mediaPlaceholder = `\n[Image: ${mediaUrl}]\n`;
    setContent(prevContent => prevContent + mediaPlaceholder);
    setMediaUrl('');
    toast.success("Media added to post");
  };

  // Handle link insertion
  const handleInsertLink = () => {
    if (!linkUrl.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    const linkText = linkTitle.trim() || linkUrl;
    const linkMarkup = ` [${linkText}](${linkUrl}) `;
    
    setContent(prevContent => prevContent + linkMarkup);
    setLinkUrl('');
    setLinkTitle('');
    toast.success("Link added to post");
  };

  // Handle mention insertion
  const handleInsertMention = () => {
    if (!mention.trim()) {
      toast.error("Please enter a valid username");
      return;
    }
    
    let mentionText = mention.trim();
    // Add @ if it doesn't exist
    if (!mentionText.startsWith('@')) {
      mentionText = `@${mentionText}`;
    }
    
    setContent(prevContent => prevContent + ` ${mentionText} `);
    setMention('');
    toast.success("Mention added to post");
  };

  // Handle hashtag insertion
  const handleInsertHashtag = () => {
    if (!hashtag.trim()) {
      toast.error("Please enter a valid hashtag");
      return;
    }
    
    let hashtagText = hashtag.trim();
    // Remove spaces and special characters
    hashtagText = hashtagText.replace(/[^\w]/g, '');
    // Add # if it doesn't exist
    if (!hashtagText.startsWith('#')) {
      hashtagText = `#${hashtagText}`;
    }
    
    setContent(prevContent => prevContent + ` ${hashtagText} `);
    setHashtag('');
    toast.success("Hashtag added to post");
  };

  // Handle repurpose content
  const handleRepurposeContent = () => {
    if (!repurposeContent.trim()) {
      toast.error("Please enter content to repurpose");
      return;
    }
    
    // In a real app, this would use AI to repurpose content
    // For now, we'll just add it to the current content
    setContent(prevContent => {
      if (prevContent.trim()) {
        return prevContent + "\n\n" + repurposeContent;
      }
      return repurposeContent;
    });
    
    setRepurposeContent('');
    toast.success("Content repurposed successfully");
  };

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
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => setShowAIOptions(!showAIOptions)}
                  >
                    <BrainCircuit className="h-4 w-4" />
                    <span>AI Assistant</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => setShowAnalyticsInsights(!showAnalyticsInsights)}
                  >
                    <BarChart className="h-4 w-4" />
                    <span>Insights</span>
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Create your post content and preview how it will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {showAIOptions && (
                  <AIAssistant content={content} setContent={setContent} />
                )}
                
                {showAnalyticsInsights && (
                  <AnalyticsInsights />
                )}
                
                <Textarea 
                  placeholder="What do you want to share?" 
                  className="min-h-[120px] resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                
                <div className="flex flex-wrap items-center gap-2">
                  {/* Media Button with Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Image className="h-4 w-4" />
                        <span>Media</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Insert Media</DialogTitle>
                        <DialogDescription>
                          Add an image or video to your post.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="media-url">Media URL</Label>
                          <Input 
                            id="media-url" 
                            placeholder="https://example.com/image.jpg" 
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={handleInsertMedia}>Insert Media</Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Link Button with Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Link className="h-4 w-4" />
                        <span>Link</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Insert Link</DialogTitle>
                        <DialogDescription>
                          Add a link to your post.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="link-url">URL</Label>
                          <Input 
                            id="link-url" 
                            placeholder="https://example.com" 
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="link-title">Link Text (optional)</Label>
                          <Input 
                            id="link-title" 
                            placeholder="Click here" 
                            value={linkTitle}
                            onChange={(e) => setLinkTitle(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={handleInsertLink}>Insert Link</Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Mention Button with Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <AtSign className="h-4 w-4" />
                        <span>Mention</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Insert Mention</DialogTitle>
                        <DialogDescription>
                          Mention a user in your post.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="mention">Username</Label>
                          <Input 
                            id="mention" 
                            placeholder="username" 
                            value={mention}
                            onChange={(e) => setMention(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={handleInsertMention}>Insert Mention</Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Hashtag Button with Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Hash className="h-4 w-4" />
                        <span>Hashtag</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Insert Hashtag</DialogTitle>
                        <DialogDescription>
                          Add a hashtag to your post.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="hashtag">Hashtag</Label>
                          <Input 
                            id="hashtag" 
                            placeholder="trending" 
                            value={hashtag}
                            onChange={(e) => setHashtag(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={handleInsertHashtag}>Insert Mention</Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Repurpose Button with Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <FileText className="h-4 w-4" />
                        <span>Repurpose</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Repurpose Content</DialogTitle>
                        <DialogDescription>
                          Reuse existing content in your post.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="repurpose">Content to Repurpose</Label>
                          <Textarea 
                            id="repurpose" 
                            placeholder="Paste content here to repurpose" 
                            value={repurposeContent}
                            onChange={(e) => setRepurposeContent(e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={handleRepurposeContent}>Repurpose</Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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
              <Tabs defaultValue={selectedPlatforms[0] || "twitter"}>
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
                      <p className="mt-1 whitespace-pre-line">{content || "Your post content will appear here. Add text in the composer to see the preview."}</p>
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
                      <p className="mt-1 whitespace-pre-line">{content || "Your post content will appear here. Add text in the composer to see the preview."}</p>
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
                      <p className="mt-1 whitespace-pre-line">{content || "Your post content will appear here. Add text in the composer to see the preview."}</p>
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
              <CardTitle className="flex items-center justify-between">
                <span>Post Settings</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => setShowSchedulingOptions(!showSchedulingOptions)}
                >
                  <BrainCircuit className="h-4 w-4" />
                  <span>Smart Schedule</span>
                </Button>
              </CardTitle>
              <CardDescription>Configure when and where to publish</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {showSchedulingOptions && (
                  <IntelligentScheduling 
                    date={date}
                    setDate={setDate}
                    time={time}
                    setTime={setTime}
                  />
                )}
              
                <div>
                  <label className="block text-sm font-medium mb-1">Platforms</label>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`gap-1 ${selectedPlatforms.includes('twitter') ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-blue-700' : ''}`}
                      onClick={() => togglePlatform('twitter')}
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`gap-1 ${selectedPlatforms.includes('instagram') ? 'bg-pink-50 border-pink-200 text-pink-600 hover:bg-pink-100 hover:text-pink-700' : ''}`}
                      onClick={() => togglePlatform('instagram')}
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`gap-1 ${selectedPlatforms.includes('facebook') ? 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700' : ''}`}
                      onClick={() => togglePlatform('facebook')}
                    >
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
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <div className="flex gap-2">
                    <TimeSelector value={time} onChange={setTime} />
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
            <Button variant="outline" className="w-full gap-1" onClick={() => toast.success("Draft saved!")}>
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button 
              className="w-full gap-1" 
              onClick={() => {
                if (selectedPlatforms.length === 0) {
                  toast.error("Please select at least one platform!");
                  return;
                }
                if (!date || !time) {
                  toast.error("Please select a date and time first!");
                  return;
                }
                toast.success(`Post scheduled successfully for ${format(date, "PPP")} at ${time} on ${selectedPlatforms.join(', ')}!`);
              }}
            >
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


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Twitter, Linkedin, Facebook, Instagram, Users, Link2, Globe } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';

interface SocialSharingProps {
  postId?: string;
  postTitle?: string;
  platforms?: string[];
  metrics?: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export const SocialSharing: React.FC<SocialSharingProps> = ({ 
  postId = '1234', 
  postTitle = 'Amazing content created with SocialCommand',
  platforms = ['twitter', 'linkedin'],
  metrics = { likes: 128, shares: 45, comments: 32 }
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://socialcommand.app/p/${postId}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleSharePlatform = (platform: string) => {
    let shareUrl;
    const postUrl = `https://socialcommand.app/p/${postId}`;
    const text = encodeURIComponent(`Check out my post: ${postTitle} #CreatedWithSocialCommand`);
    
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(postUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      default:
        shareUrl = postUrl;
    }
    
    window.open(shareUrl, '_blank');
    toast.success(`Shared on ${platform}!`);
  };

  return (
    <Card className="border-dashed border-2 border-brand-100 bg-gradient-to-br from-white to-brand-50/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Share2 className="h-5 w-5 text-brand-600" />
          Share Your Success
        </CardTitle>
        <CardDescription>
          Share your successful post with your network
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm mb-1 font-medium">Quick share</p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2" 
              onClick={() => handleSharePlatform('twitter')}
            >
              <Twitter className="h-4 w-4 text-blue-400" />
              Twitter
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2" 
              onClick={() => handleSharePlatform('linkedin')}
            >
              <Linkedin className="h-4 w-4 text-blue-700" />
              LinkedIn
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2" 
              onClick={() => handleSharePlatform('facebook')}
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              Facebook
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 items-center">
          <Input 
            readOnly 
            value={shareUrl} 
            className="text-sm flex-1"
          />
          <Button 
            size="sm" 
            variant={copied ? "outline" : "default"} 
            className={`gap-2 ${copied ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : ''}`}
            onClick={handleCopyLink}
          >
            {copied ? 'Copied!' : 'Copy Link'}
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="bg-muted/50 rounded-md p-3">
          <div className="text-sm font-medium mb-1">Post Performance</div>
          <div className="flex gap-4 text-sm">
            <div>
              <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                {metrics.likes} Likes
              </Badge>
            </div>
            <div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {metrics.shares} Shares
              </Badge>
            </div>
            <div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                {metrics.comments} Comments
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <p className="text-xs text-muted-foreground">
          Created with <span className="font-medium">SocialCommand</span>
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" size="sm" className="text-brand-600 p-0">
              Get embed code
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Embed this post</DialogTitle>
              <DialogDescription>
                Copy this code to embed the post on your website
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-muted p-3 rounded-md text-xs overflow-auto">
                <code>{`<iframe src="https://socialcommand.app/embed/${postId}" width="100%" height="400" frameborder="0"></iframe>`}</code>
              </div>
              <Button onClick={() => {
                navigator.clipboard.writeText(`<iframe src="https://socialcommand.app/embed/${postId}" width="100%" height="400" frameborder="0"></iframe>`);
                toast.success('Embed code copied to clipboard!');
              }} className="w-full">
                Copy Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

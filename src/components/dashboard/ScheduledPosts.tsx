
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Instagram, Twitter, Facebook } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  platform: 'twitter' | 'instagram' | 'facebook';
  scheduledFor: string;
  status: 'scheduled' | 'draft';
}

const dummyPosts: Post[] = [
  { id: 1, title: 'New product announcement', platform: 'twitter', scheduledFor: '2025-05-03T14:30:00', status: 'scheduled' },
  { id: 2, title: 'Weekend promotion campaign', platform: 'instagram', scheduledFor: '2025-05-04T10:00:00', status: 'scheduled' },
  { id: 3, title: 'Customer testimonial highlight', platform: 'facebook', scheduledFor: '2025-05-04T16:45:00', status: 'scheduled' },
  { id: 4, title: 'Team introduction post', platform: 'instagram', scheduledFor: '2025-05-05T09:15:00', status: 'draft' },
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

export const ScheduledPosts: React.FC = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Upcoming Posts</CardTitle>
        <Button variant="ghost" size="sm">View all</Button>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-1">
          {dummyPosts.map((post) => {
            const date = new Date(post.scheduledFor);
            const formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });
            
            return (
              <div key={post.id} className="flex items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  post.platform === 'twitter' ? 'bg-blue-100 text-blue-500' :
                  post.platform === 'instagram' ? 'bg-pink-100 text-pink-500' :
                  'bg-indigo-100 text-indigo-500'
                }`}>
                  <PlatformIcon platform={post.platform} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm truncate">{post.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formattedDate}
                  </div>
                </div>
                <Badge variant={post.status === 'scheduled' ? 'outline' : 'secondary'} className="ml-2">
                  {post.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Profile Information</h3>
        <p className="text-sm text-muted-foreground">Update your public profile information.</p>
      </div>
      <Separator />
      
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="" alt="Profile picture" />
          <AvatarFallback className="text-lg">
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div>
          <Button size="sm" variant="outline">
            Upload New Image
          </Button>
          <p className="text-xs mt-1 text-muted-foreground">
            JPG, GIF or PNG. Max size of 800K.
          </p>
        </div>
      </div>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" defaultValue="Your Company" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="title">Title / Position</Label>
          <Input id="title" defaultValue="Social Media Manager" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            rows={4} 
            defaultValue="Social media expert specializing in brand growth and community engagement."
          />
          <p className="text-xs text-muted-foreground">Brief description visible on your profile.</p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" type="url" defaultValue="https://yourcompany.com" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" defaultValue="San Francisco, CA" />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Save Profile</Button>
      </div>
    </div>
  );
};

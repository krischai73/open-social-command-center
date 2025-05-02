
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Plus, Pencil, Trash } from 'lucide-react';

const teamMembers = [
  { id: 1, name: "Jane Cooper", email: "jane@example.com", role: "Admin", avatar: "" },
  { id: 2, name: "Wade Warren", email: "wade@example.com", role: "Editor", avatar: "" },
  { id: 3, name: "Esther Howard", email: "esther@example.com", role: "Viewer", avatar: "" },
  { id: 4, name: "Cameron Williamson", email: "cameron@example.com", role: "Editor", avatar: "" },
];

export const TeamSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Team Management</h3>
            <p className="text-sm text-muted-foreground">
              Invite team members and assign roles.
            </p>
          </div>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add Member
          </Button>
        </div>
      </div>
      <Separator />
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input id="teamName" defaultValue="Your Team" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="teamPlan">Current Plan</Label>
            <div className="flex items-center gap-2">
              <Badge className="bg-brand-600">Enterprise</Badge>
              <span className="text-sm text-muted-foreground">Unlimited users & features</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Team Members</h4>
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-4 p-3 border-b bg-muted/50 text-sm font-medium">
              <div className="col-span-5">Name</div>
              <div className="col-span-3">Role</div>
              <div className="col-span-4">Actions</div>
            </div>
            {teamMembers.map((member) => (
              <div key={member.id} className="grid grid-cols-12 gap-4 p-3 border-b last:border-b-0 items-center">
                <div className="col-span-5 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <Select defaultValue={member.role.toLowerCase()}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-4 flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Pending Invitations</h4>
          <div className="border rounded-md p-4 text-center">
            <p className="text-sm text-muted-foreground">No pending invitations</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Save Team Settings</Button>
      </div>
    </div>
  );
};

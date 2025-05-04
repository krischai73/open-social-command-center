
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Plus, Pencil, Trash, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';

// Sample team members data
const teamMembers = [
  { id: 1, name: "Jane Cooper", email: "jane@example.com", role: "Admin", avatar: "", status: "active" },
  { id: 2, name: "Wade Warren", email: "wade@example.com", role: "Editor", avatar: "", status: "active" },
  { id: 3, name: "Esther Howard", email: "esther@example.com", role: "Viewer", avatar: "", status: "pending" },
  { id: 4, name: "Cameron Williamson", email: "cameron@example.com", role: "Editor", avatar: "", status: "active" },
];

const TeamMembers: React.FC = () => {
  const [members, setMembers] = useState(teamMembers);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddMember = () => {
    if (!name || !email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newMember = {
      id: members.length + 1,
      name,
      email,
      role,
      avatar: "",
      status: "pending"
    };
    
    setMembers([...members, newMember]);
    toast.success(`Invitation sent to ${email}`);
    setName('');
    setEmail('');
    setRole('editor');
    setIsAddDialogOpen(false);
  };

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
    toast.success("Team member removed");
  };

  const handleRoleChange = (id: number, newRole: string) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, role: newRole } : member
    ));
    toast.success("Role updated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Team Members</h3>
          <p className="text-sm text-muted-foreground">
            Manage team members and their permissions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Invite a new member to your team and set their role
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddMember}>Add & Invite</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Separator />
      
      <div className="border rounded-md">
        <div className="grid grid-cols-12 gap-4 p-3 border-b bg-muted/50 text-sm font-medium">
          <div className="col-span-5">Name</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Actions</div>
        </div>
        {members.map((member) => (
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
              <Select 
                defaultValue={member.role.toLowerCase()} 
                onValueChange={(value) => handleRoleChange(member.id, value)}
              >
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
            <div className="col-span-2">
              {member.status === 'active' ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  <Clock className="h-3 w-3 mr-1" /> Pending
                </Badge>
              )}
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDeleteMember(member.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-medium">Permissions by Role</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-md p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500">Admin</Badge>
              <span className="text-sm font-medium">Full Access</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Manage team members</li>
              <li>• Approve content</li>
              <li>• Access analytics</li>
              <li>• Manage settings</li>
              <li>• Delete content</li>
            </ul>
          </div>
          <div className="border rounded-md p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">Editor</Badge>
              <span className="text-sm font-medium">Creation Access</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Create and edit content</li>
              <li>• Submit for approval</li>
              <li>• View analytics</li>
              <li>• Manage schedule</li>
              <li>• Add comments</li>
            </ul>
          </div>
          <div className="border rounded-md p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500">Viewer</Badge>
              <span className="text-sm font-medium">View-Only Access</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• View content</li>
              <li>• View calendar</li>
              <li>• Limited analytics</li>
              <li>• Add comments</li>
              <li>• No publishing rights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;

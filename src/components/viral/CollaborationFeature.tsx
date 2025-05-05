
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { UserRound, MessageSquare, Share2, Link, Copy, Clock, CheckCheck } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const CollaborationFeature: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [collaborationLink, setCollaborationLink] = useState('https://socialcommand.app/collaborate?code=C0LL4B1234');
  
  const handleSendInvitation = () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }
    
    toast.success(`Invitation sent to ${email}`);
    setEmail('');
    setMessage('');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(collaborationLink);
    toast.success('Collaboration link copied to clipboard!');
  };
  
  const collaborators = [
    { id: 1, name: 'You', email: 'you@company.com', avatar: '', role: 'Owner', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', avatar: '', role: 'Editor', status: 'active' },
    { id: 3, name: 'Mike Peters', email: 'mike@example.com', avatar: '', role: 'Viewer', status: 'pending' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserRound className="h-5 w-5 text-brand-600" />
          Content Collaboration
        </CardTitle>
        <CardDescription>
          Collaborate on content with team members and external contributors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="invite">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="invite">Invite</TabsTrigger>
            <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invite" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Invite via email</h3>
                <div className="grid gap-2">
                  <Input 
                    placeholder="Email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input 
                    placeholder="Add a message (optional)" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button onClick={handleSendInvitation}>
                    Send Invitation
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Or share a collaboration link</h3>
                <div className="flex gap-2">
                  <Input readOnly value={collaborationLink} className="flex-1" />
                  <Button variant="outline" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone with this link can view and comment on this content
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Collaboration permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Editors can:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Edit content</li>
                      <li>• Add comments</li>
                      <li>• Suggest changes</li>
                      <li>• Upload media</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Viewers can:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• View content</li>
                      <li>• Add comments</li>
                      <li>• Export as PDF</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="collaborators" className="space-y-4 pt-4">
            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-2 p-3 border-b bg-muted/50 text-sm font-medium">
                <div className="col-span-5">Name</div>
                <div className="col-span-3">Role</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Actions</div>
              </div>
              {collaborators.map((user) => (
                <div key={user.id} className="grid grid-cols-12 gap-2 p-3 border-b last:border-b-0 items-center">
                  <div className="col-span-5 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="col-span-3">{user.role}</div>
                  <div className="col-span-2">
                    {user.status === 'active' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCheck className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="col-span-2">
                    {user.id !== 1 && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">Manage</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Manage Collaborator</DialogTitle>
                            <DialogDescription>
                              Change permissions or remove this collaborator
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{user.name}</h4>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            
                            <div className="grid gap-2">
                              <Tabs defaultValue={user.role.toLowerCase()}>
                                <TabsList className="grid grid-cols-3 w-full">
                                  <TabsTrigger value="editor">Editor</TabsTrigger>
                                  <TabsTrigger value="viewer">Viewer</TabsTrigger>
                                  <TabsTrigger value="none">No Access</TabsTrigger>
                                </TabsList>
                              </Tabs>
                            </div>
                            
                            <div className="flex justify-between">
                              <Button variant="outline" onClick={() => toast.success('Changes saved')}>
                                Save Changes
                              </Button>
                              <Button variant="destructive" onClick={() => toast.success('Collaborator removed')}>
                                Remove Access
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Manage Sharing Settings
              </Button>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium mb-2">External Sharing History</h3>
              <div className="text-sm text-muted-foreground border rounded-md p-4 text-center">
                No external sharing activity in the past 30 days
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

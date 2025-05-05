
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Users, Link, Mail, Copy, CheckCheck, Clock } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const TeamInvites: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor');
  const [inviteLink, setInviteLink] = useState('https://socialcommand.app/join?code=T3AM1NV1T3');
  const [pendingInvites, setPendingInvites] = useState([
    { email: 'sarah@example.com', role: 'editor', date: '2025-05-02', status: 'pending' },
    { email: 'mike@example.com', role: 'viewer', date: '2025-05-01', status: 'accepted' }
  ]);
  const [referralStats, setReferralStats] = useState({
    invited: 6,
    joined: 4,
    activeUsers: 3,
    creditsEarned: 120
  });
  
  const handleSendInvite = () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }
    
    // Add the new invite to pending invites
    setPendingInvites([
      { email, role, date: new Date().toISOString().split('T')[0], status: 'pending' },
      ...pendingInvites
    ]);
    
    toast.success(`Invitation sent to ${email}`);
    setEmail('');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success('Invite link copied to clipboard!');
  };
  
  const handleGenerateNewLink = () => {
    // Generate a new random code
    const newCode = 'T3AM' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteLink(`https://socialcommand.app/join?code=${newCode}`);
    toast.success('New invite link generated!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-brand-600" />
          Team Invitations
        </CardTitle>
        <CardDescription>
          Invite team members and track referrals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="email">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="email">Email Invite</TabsTrigger>
            <TabsTrigger value="link">Invite Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              <div className="md:col-span-4">
                <Input 
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1">
                <Button 
                  className="w-full" 
                  onClick={handleSendInvite}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="link" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input readOnly value={inviteLink} className="flex-1" />
                <Button variant="outline" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  This link expires in 7 days
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleGenerateNewLink}
                >
                  Generate New Link
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="border rounded-md p-4 bg-muted/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-semibold text-brand-600">
                {referralStats.invited}
              </div>
              <div className="text-sm text-muted-foreground">Invites Sent</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-brand-600">
                {referralStats.joined}
              </div>
              <div className="text-sm text-muted-foreground">Team Joined</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-brand-600">
                {referralStats.activeUsers}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-brand-600">
                {referralStats.creditsEarned}
              </div>
              <div className="text-sm text-muted-foreground">Credits Earned</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Recent Invites</h3>
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-2 p-3 border-b bg-muted/50 text-sm font-medium">
              <div className="col-span-6">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Status</div>
            </div>
            {pendingInvites.map((invite, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 p-3 border-b last:border-b-0 text-sm items-center">
                <div className="col-span-6">{invite.email}</div>
                <div className="col-span-2 capitalize">{invite.role}</div>
                <div className="col-span-2">{invite.date}</div>
                <div className="col-span-2">
                  {invite.status === 'pending' ? (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCheck className="h-3 w-3 mr-1" />
                      Joined
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, Key, ShieldAlert, ShieldCheck, LockKeyhole, TwoFactorAuthentication } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';
import { useAppStore } from '@/lib/store';

export const SecuritySettings: React.FC = () => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState('app');
  const [verificationCode, setVerificationCode] = useState('');
  const [showRoleSetup, setShowRoleSetup] = useState(false);
  
  // Mocked roles
  const [availableRoles, setAvailableRoles] = useState([
    { id: 'admin', name: 'Admin', permissions: ['all'] },
    { id: 'editor', name: 'Editor', permissions: ['create', 'read', 'update'] },
    { id: 'viewer', name: 'Viewer', permissions: ['read'] }
  ]);
  
  const [selectedRole, setSelectedRole] = useState('viewer');
  
  const handleTwoFactorToggle = (checked: boolean) => {
    if (checked) {
      setShowTwoFactorSetup(true);
    } else {
      setIsTwoFactorEnabled(false);
      toast.success("Two-factor authentication disabled");
    }
  };
  
  const handleTwoFactorSetup = () => {
    if (verificationCode.length === 6) {
      setIsTwoFactorEnabled(true);
      setShowTwoFactorSetup(false);
      toast.success("Two-factor authentication enabled successfully");
    } else {
      toast.error("Please enter a valid verification code");
    }
  };
  
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    toast.success(`Role changed to ${availableRoles.find(r => r.id === role)?.name}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Security Settings</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage your account security and access settings.
        </p>
      </div>
      <Separator />
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <LockKeyhole className="h-5 w-5 text-primary" />
            <h4 className="text-sm font-medium">Password</h4>
          </div>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long and include numbers and symbols.
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            
            <div>
              <Button 
                className="mt-2"
                onClick={() => toast.success("Password updated successfully")}
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TwoFactorAuthentication className="h-5 w-5 text-primary" />
            <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch 
              id="enable-2fa" 
              checked={isTwoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="2fa-method">Preferred 2FA Method</Label>
            <Select 
              value={twoFactorMethod} 
              onValueChange={setTwoFactorMethod}
              disabled={!isTwoFactorEnabled}
            >
              <SelectTrigger id="2fa-method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app">Authenticator App</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Button 
              variant="outline" 
              onClick={() => setShowTwoFactorSetup(true)}
              disabled={isTwoFactorEnabled}
            >
              Set Up Two-Factor Authentication
            </Button>
          </div>
          
          <Dialog open={showTwoFactorSetup} onOpenChange={setShowTwoFactorSetup}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
                <DialogDescription>
                  {twoFactorMethod === 'app' && 
                    "Scan this QR code with your authenticator app, then enter the verification code below."
                  }
                  {twoFactorMethod === 'sms' && 
                    "We've sent a verification code to your registered phone number. Please enter it below."
                  }
                  {twoFactorMethod === 'email' && 
                    "We've sent a verification code to your email address. Please enter it below."
                  }
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                {twoFactorMethod === 'app' && (
                  <div className="flex justify-center">
                    <div className="border border-border rounded p-4 w-[180px] h-[180px] flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">QR Code Placeholder</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Enter verification code</Label>
                  <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setShowTwoFactorSetup(false)}>Cancel</Button>
                  <Button onClick={handleTwoFactorSetup}>Verify</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-primary" />
            <h4 className="text-sm font-medium">Login Sessions</h4>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-xs text-muted-foreground">
                  Chrome on MacOS • California, USA • Started May 2, 2025
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
            </div>
          </div>
          
          <div>
            <Button 
              variant="outline" 
              onClick={() => toast.success("All other sessions terminated")}
            >
              Manage All Sessions
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <h4 className="text-sm font-medium">Role-Based Access Control</h4>
          </div>
          
          <div className="space-y-2">
            <Label>Current Role</Label>
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="pt-2">
              <h5 className="text-sm font-medium mb-2">Role Permissions</h5>
              <div className="border rounded-md p-4">
                {selectedRole === 'admin' && (
                  <div className="space-y-2">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Admin</Badge>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <ShieldCheck className="h-4 w-4 text-green-600 mr-2" />
                        Full system access
                      </li>
                      <li className="flex items-center">
                        <ShieldCheck className="h-4 w-4 text-green-600 mr-2" />
                        Manage users and permissions
                      </li>
                      <li className="flex items-center">
                        <ShieldCheck className="h-4 w-4 text-green-600 mr-2" />
                        Access all content and settings
                      </li>
                      <li className="flex items-center">
                        <ShieldCheck className="h-4 w-4 text-green-600 mr-2" />
                        Perform system-critical operations
                      </li>
                    </ul>
                  </div>
                )}
                
                {selectedRole === 'editor' && (
                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-700 border-green-200">Editor</Badge>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <ShieldCheck className="h-4 w-4 text-green-600 mr-2" />
                        Create and edit content
                      </li>
                      <li className="flex items-center">
                        <ShieldCheck className="h-4 w-4 text-green-600 mr-2" />
                        Publish and schedule posts
                      </li>
                      <li className="flex items-center">
                        <ShieldCheck className="h-4 w-4 text-green-600 mr-2" />
                        View analytics data
                      </li>
                      <li className="flex items-center">
                        <ShieldAlert className="h-4 w-4 text-red-600 mr-2" />
                        Cannot manage users and permissions
                      </li>
                    </ul>
                  </div>
                )}
                
                {selectedRole === 'viewer' && (
                  <div className="space-y-2">
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Viewer</Badge>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <ShieldCheck className="h-4 w-4 text-green-600 mr-2" />
                        View content and analytics
                      </li>
                      <li className="flex items-center">
                        <ShieldAlert className="h-4 w-4 text-red-600 mr-2" />
                        Cannot create or edit content
                      </li>
                      <li className="flex items-center">
                        <ShieldAlert className="h-4 w-4 text-red-600 mr-2" />
                        Cannot publish or schedule posts
                      </li>
                      <li className="flex items-center">
                        <ShieldAlert className="h-4 w-4 text-red-600 mr-2" />
                        Cannot manage users or system settings
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h4 className="text-sm font-medium">Advanced Security</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Login Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified about new logins to your account
                </p>
              </div>
              <Switch id="login-notify" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Require approval for new devices</p>
                <p className="text-sm text-muted-foreground">
                  New devices will require your approval before login
                </p>
              </div>
              <Switch id="device-approval" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">IP restrictions</p>
                <p className="text-sm text-muted-foreground">
                  Limit access to trusted IP addresses
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="ip-restrict" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.info("IP restriction setup requires enterprise plan")}
                >
                  Configure
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">GDPR Data Management</p>
                <p className="text-sm text-muted-foreground">
                  Control your personal data usage and export options
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.info("Your data export has been queued and will be emailed to you")}
              >
                Export Data
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 mt-2">
            <Label htmlFor="compliance-mode">Compliance Mode</Label>
            <Select defaultValue="standard">
              <SelectTrigger id="compliance-mode">
                <SelectValue placeholder="Select compliance mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="gdpr">GDPR Focused</SelectItem>
                <SelectItem value="ccpa">CCPA Focused</SelectItem>
                <SelectItem value="hipaa">HIPAA Compliant (Enterprise)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Changes how data is handled and stored in the application
            </p>
          </div>
          
          <div className="mt-4 border rounded p-4 bg-amber-50">
            <h5 className="text-sm font-medium flex items-center">
              <ShieldAlert className="h-4 w-4 text-amber-600 mr-1" />
              Security Audit Log
            </h5>
            <p className="text-xs text-muted-foreground mt-1">
              Last security audit: April 28, 2025
            </p>
            <p className="text-xs mt-2">
              Regular security audits and penetration testing ensure your data remains secure.
              <Button 
                variant="link" 
                size="sm" 
                className="h-auto p-0 ml-1"
                onClick={() => toast.info("Security report will be emailed to the account admin")}
              >
                Request report
              </Button>
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={() => toast.success("Security settings saved successfully")}>
          Save Security Settings
        </Button>
      </div>
    </div>
  );
};

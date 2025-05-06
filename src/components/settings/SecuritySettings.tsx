
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Shield, Key, ShieldCheck, LockKeyhole, Smartphone } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';

export const SecuritySettings: React.FC = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryMethod, setRecoveryMethod] = useState('email');
  const [otp, setOtp] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleTwoFactorAuthChange = (checked: boolean) => {
    setTwoFactorAuth(checked);
    toast.success(`Two-factor authentication ${checked ? 'enabled' : 'disabled'}.`);
  };

  const handleEmailNotificationsChange = (checked: boolean) => {
    setEmailNotifications(checked);
    toast.success(`Email notifications ${checked ? 'enabled' : 'disabled'}.`);
  };

  const handlePushNotificationsChange = (checked: boolean) => {
    setPushNotifications(checked);
    toast.success(`Push notifications ${checked ? 'enabled' : 'disabled'}.`);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }
    toast.success('Password changed successfully!');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleRecoveryMethodChange = (value: string) => {
    setRecoveryMethod(value);
    toast.success(`Recovery method updated to ${value}.`);
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast.error('OTP must be 6 digits.');
      return;
    }
    toast.success('OTP verified successfully!');
    setOtp('');
  };

  const handleOtpValueChange = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions.');
      return;
    }
    toast.success('Form submitted successfully!');
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold">Security</h1>
        <p className="text-muted-foreground mt-1">
          Configure your security settings for enhanced protection
        </p>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Account Security</CardTitle>
          <CardDescription>
            Manage your password, two-factor authentication, and recovery options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="2fa">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by requiring a
                  verification code in addition to your password.
                </p>
              </div>
              <Switch
                id="2fa"
                checked={twoFactorAuth}
                onCheckedChange={handleTwoFactorAuthChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Change Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button size="sm" onClick={handleChangePassword}>
                Change password
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Recovery Method</Label>
              <RadioGroup
                defaultValue={recoveryMethod}
                onValueChange={handleRecoveryMethodChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" disabled />
                  <Label htmlFor="phone">Phone (Coming Soon)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">Verify OTP</Label>
              <InputOTP maxLength={6} value={otp} onChange={handleOtpValueChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button size="sm" onClick={handleVerifyOTP}>
                Verify OTP
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage your notification preferences for email and push notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates and important announcements via email.
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={handleEmailNotificationsChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get real-time updates and alerts on your device.
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={handlePushNotificationsChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Terms & Conditions</CardTitle>
          <CardDescription>
            Please read and accept the terms and conditions to proceed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">View Terms & Conditions</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Terms & Conditions</DialogTitle>
                <DialogDescription>
                  Please read and accept the terms and conditions to continue
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    non risus. Suspendisse lectus tortor, dignissim sit amet,
                    adipiscing nec, ultricies sed, dolor. Cras elementum
                    ultrices diam. Maecenas ligula massa, varius a, semper
                    congue, euismod non, mi. Proin porttitor, orci nec nonummy
                    molestie, enim est eleifend mi, non fermentum diam nisl sit
                    amet erat. Duis semper. Duis arcu massa, scelerisque vitae,
                    consequat in, pretium a, enim. Pellentesque congue. Ut in
                    risus volutpat libero pharetra tempor. Cras vestibulum
                    bibendum augue. Praesent egestas leo in pede. Praesent
                    blandit odio eu enim. Pellentesque sed dui ut augue blandit
                    interdum.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    />
                    <Label htmlFor="terms">I accept the terms and conditions</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSubmit} disabled={!termsAccepted}>
                  Accept
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

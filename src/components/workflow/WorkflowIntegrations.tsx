
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GitMerge, Globe, Check, X, ExternalLink, AlertCircle, GitBranch, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Sample integrations
const initialIntegrations = [
  {
    id: 1,
    name: "Asana",
    icon: "https://cdn.worldvectorlogo.com/logos/asana-1.svg",
    description: "Connect your Asana projects to sync tasks and deadlines",
    status: "connected",
    lastSynced: "2024-05-03T14:30:00",
    settings: {
      syncTasks: true,
      syncComments: true,
      autoCreateTasks: false
    }
  },
  {
    id: 2,
    name: "Trello",
    icon: "https://cdn.worldvectorlogo.com/logos/trello.svg",
    description: "Sync your Trello boards with content calendar",
    status: "disconnected",
    lastSynced: null,
    settings: {
      syncTasks: true,
      syncComments: true,
      autoCreateTasks: true
    }
  },
  {
    id: 3,
    name: "Slack",
    icon: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
    description: "Send notifications and updates to your Slack channels",
    status: "connected",
    lastSynced: "2024-05-02T09:15:00",
    settings: {
      notifyOnPublish: true,
      notifyOnComments: false,
      notifyOnApproval: true
    }
  },
  {
    id: 4,
    name: "Google Drive",
    icon: "https://cdn.worldvectorlogo.com/logos/google-drive.svg",
    description: "Access and import assets from Google Drive",
    status: "connected",
    lastSynced: "2024-05-01T16:45:00",
    settings: {
      autoSync: true,
      syncFolder: "/Marketing Assets"
    }
  },
  {
    id: 5,
    name: "Zoom",
    icon: "https://cdn.worldvectorlogo.com/logos/zoom-6.svg",
    description: "Schedule and join Zoom meetings from the platform",
    status: "disconnected",
    lastSynced: null,
    settings: {}
  },
  {
    id: 6,
    name: "Monday.com",
    icon: "https://cdn.worldvectorlogo.com/logos/monday-1.svg",
    description: "Sync projects and tasks with Monday.com boards",
    status: "disconnected",
    lastSynced: null,
    settings: {}
  },
  {
    id: 7,
    name: "Zapier",
    icon: "https://cdn.worldvectorlogo.com/logos/zapier-2.svg",
    description: "Connect with thousands of apps through Zapier",
    status: "connected",
    lastSynced: "2024-04-28T11:20:00",
    settings: {
      activeZaps: 3
    }
  }
];

interface Integration {
  id: number;
  name: string;
  icon: string;
  description: string;
  status: string;
  lastSynced: string | null;
  settings: Record<string, any>;
}

const WorkflowIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  // Toggle integration connection status
  const toggleIntegrationStatus = (id: number) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id ? {
        ...integration,
        status: integration.status === 'connected' ? 'disconnected' : 'connected',
        lastSynced: integration.status === 'disconnected' ? new Date().toISOString() : integration.lastSynced
      } : integration
    ));
    
    const integration = integrations.find(int => int.id === id);
    if (integration) {
      const actionText = integration.status === 'connected' ? 'disconnected from' : 'connected to';
      toast.success(`Successfully ${actionText} ${integration.name}`);
    }
  };

  // Update integration settings
  const updateIntegrationSetting = (id: number, setting: string, value: boolean | string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id ? {
        ...integration,
        settings: {
          ...integration.settings,
          [setting]: value
        }
      } : integration
    ));
    
    toast.success("Integration settings updated");
  };

  // Connect Zapier webhook
  const connectZapierWebhook = () => {
    if (!webhookUrl) {
      toast.error("Please enter a webhook URL");
      return;
    }
    
    // Update Zapier integration
    setIntegrations(integrations.map(integration => 
      integration.name === 'Zapier' ? {
        ...integration,
        settings: {
          ...integration.settings,
          webhooks: [...(integration.settings.webhooks || []), webhookUrl]
        }
      } : integration
    ));
    
    setWebhookUrl('');
    toast.success("Zapier webhook connected successfully");
  };

  // Connect API key
  const connectApiKey = () => {
    if (!apiKey) {
      toast.error("Please enter an API key");
      return;
    }
    
    if (selectedIntegration) {
      setIntegrations(integrations.map(integration => 
        integration.id === selectedIntegration.id ? {
          ...integration,
          status: 'connected',
          settings: {
            ...integration.settings,
            apiKey: apiKey
          },
          lastSynced: new Date().toISOString()
        } : integration
      ));
      
      setApiKey('');
      setSelectedIntegration(null);
      toast.success(`API key connected for ${selectedIntegration.name}`);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Workflow Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect your tools and manage your integrations
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map(integration => (
          <Card 
            key={integration.id} 
            className={`overflow-hidden ${integration.status === 'connected' ? 'border-primary/20' : ''}`}
          >
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                  <img src={integration.icon} alt={integration.name} className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-base">{integration.name}</CardTitle>
                  {integration.status === 'connected' ? (
                    <p className="text-xs text-muted-foreground">
                      Last synced: {integration.lastSynced ? new Date(integration.lastSynced).toLocaleString() : 'Never'}
                    </p>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 mt-1">
                      Not connected
                    </Badge>
                  )}
                </div>
              </div>
              <Button 
                variant={integration.status === 'connected' ? 'destructive' : 'default'} 
                size="sm"
                onClick={() => {
                  if (integration.status === 'disconnected') {
                    setSelectedIntegration(integration);
                  } else {
                    toggleIntegrationStatus(integration.id);
                  }
                }}
              >
                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-muted-foreground mb-3">
                {integration.description}
              </p>
              
              {integration.status === 'connected' && (
                <div>
                  {integration.name === 'Asana' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`sync-tasks-${integration.id}`} className="text-xs">Sync Tasks</Label>
                        <Switch 
                          id={`sync-tasks-${integration.id}`} 
                          checked={integration.settings.syncTasks} 
                          onCheckedChange={(checked) => updateIntegrationSetting(integration.id, 'syncTasks', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`sync-comments-${integration.id}`} className="text-xs">Sync Comments</Label>
                        <Switch 
                          id={`sync-comments-${integration.id}`} 
                          checked={integration.settings.syncComments} 
                          onCheckedChange={(checked) => updateIntegrationSetting(integration.id, 'syncComments', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`auto-create-${integration.id}`} className="text-xs">Auto-create Tasks</Label>
                        <Switch 
                          id={`auto-create-${integration.id}`} 
                          checked={integration.settings.autoCreateTasks} 
                          onCheckedChange={(checked) => updateIntegrationSetting(integration.id, 'autoCreateTasks', checked)}
                        />
                      </div>
                    </div>
                  )}
                  
                  {integration.name === 'Slack' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`notify-publish-${integration.id}`} className="text-xs">Notify on Publish</Label>
                        <Switch 
                          id={`notify-publish-${integration.id}`} 
                          checked={integration.settings.notifyOnPublish} 
                          onCheckedChange={(checked) => updateIntegrationSetting(integration.id, 'notifyOnPublish', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`notify-comments-${integration.id}`} className="text-xs">Notify on Comments</Label>
                        <Switch 
                          id={`notify-comments-${integration.id}`} 
                          checked={integration.settings.notifyOnComments} 
                          onCheckedChange={(checked) => updateIntegrationSetting(integration.id, 'notifyOnComments', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`notify-approval-${integration.id}`} className="text-xs">Notify on Approval</Label>
                        <Switch 
                          id={`notify-approval-${integration.id}`} 
                          checked={integration.settings.notifyOnApproval} 
                          onCheckedChange={(checked) => updateIntegrationSetting(integration.id, 'notifyOnApproval', checked)}
                        />
                      </div>
                    </div>
                  )}
                  
                  {integration.name === 'Google Drive' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`auto-sync-${integration.id}`} className="text-xs">Auto-sync Assets</Label>
                        <Switch 
                          id={`auto-sync-${integration.id}`} 
                          checked={integration.settings.autoSync} 
                          onCheckedChange={(checked) => updateIntegrationSetting(integration.id, 'autoSync', checked)}
                        />
                      </div>
                      <div className="text-xs space-y-1">
                        <Label htmlFor={`sync-folder-${integration.id}`}>Sync Folder</Label>
                        <div className="bg-muted p-1 rounded text-xs font-mono">
                          {integration.settings.syncFolder}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {integration.name === 'Zapier' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Active Zaps</span>
                        <Badge>{integration.settings.activeZaps}</Badge>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full text-xs mt-2">
                            Add Webhook
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Connect Zapier Webhook</DialogTitle>
                            <DialogDescription>
                              Enter your Zapier webhook URL to connect
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="webhook-url">Webhook URL</Label>
                              <Input 
                                id="webhook-url" 
                                placeholder="https://hooks.zapier.com/..." 
                                value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)}
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button onClick={connectZapierWebhook}>Connect</Button>
                              </DialogClose>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3 text-xs gap-1"
                    onClick={() => toast.success(`Syncing ${integration.name}...`)}
                  >
                    <RefreshCw className="h-3 w-3" /> Sync Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={!!selectedIntegration} onOpenChange={(open) => !open && setSelectedIntegration(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Enter your API key to authorize access
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input 
                id="api-key" 
                placeholder="Enter your API key" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type="password"
              />
              <p className="text-xs text-muted-foreground">
                You can find your API key in your {selectedIntegration?.name} account settings
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedIntegration(null)}>Cancel</Button>
              <Button onClick={connectApiKey}>Connect</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <GitMerge className="h-4 w-4" />
            Integration Status Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2 pr-4">
              <div className="flex items-center justify-between p-2 rounded bg-green-50 text-green-700 border border-green-100">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Asana connection active</span>
                </div>
                <span className="text-xs">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-green-50 text-green-700 border border-green-100">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Slack notifications working</span>
                </div>
                <span className="text-xs">5 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-green-50 text-green-700 border border-green-100">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Google Drive sync completed</span>
                </div>
                <span className="text-xs">30 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-amber-50 text-amber-700 border border-amber-100">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Zapier webhook #2 requires attention</span>
                </div>
                <span className="text-xs">1 hour ago</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-red-50 text-red-700 border border-red-100">
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  <span className="text-sm">Trello API authentication failed</span>
                </div>
                <span className="text-xs">2 hours ago</span>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={() => window.open('#', '_blank')}
        >
          <Globe className="h-4 w-4" /> Browse More Integrations <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default WorkflowIntegrations;

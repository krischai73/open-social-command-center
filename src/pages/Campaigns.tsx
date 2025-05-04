
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Users, MessageSquare, BookmarkPlus, FilePlus, GitBranch, RefreshCw } from 'lucide-react';
import ContentApprovalWorkflow from '@/components/workflow/ContentApprovalWorkflow';
import TeamMembers from '@/components/workflow/TeamMembers';
import ContentIdeas from '@/components/workflow/ContentIdeas';
import AssetLibrary from '@/components/workflow/AssetLibrary';
import ContentCalendar from '@/components/workflow/ContentCalendar';
import WorkflowIntegrations from '@/components/workflow/WorkflowIntegrations';

const Campaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState('team');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold">Collaboration & Workflow</h1>
        <p className="text-muted-foreground mt-1">
          Manage your team, content approval processes, and workflow integrations
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Workflow Dashboard</CardTitle>
          <CardDescription>
            Coordinate with your team and manage content production workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="team" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <TabsTrigger value="team">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden md:inline">Team</span>
                </span>
              </TabsTrigger>
              <TabsTrigger value="approval">
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden md:inline">Approvals</span>
                </span>
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <span className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="hidden md:inline">Calendar</span>
                </span>
              </TabsTrigger>
              <TabsTrigger value="ideas">
                <span className="flex items-center gap-2">
                  <BookmarkPlus className="h-4 w-4" />
                  <span className="hidden md:inline">Ideas</span>
                </span>
              </TabsTrigger>
              <TabsTrigger value="assets">
                <span className="flex items-center gap-2">
                  <FilePlus className="h-4 w-4" />
                  <span className="hidden md:inline">Assets</span>
                </span>
              </TabsTrigger>
              <TabsTrigger value="integrations">
                <span className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  <span className="hidden md:inline">Integrations</span>
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="team" className="space-y-4">
              <TeamMembers />
            </TabsContent>
            
            <TabsContent value="approval" className="space-y-4">
              <ContentApprovalWorkflow />
            </TabsContent>
            
            <TabsContent value="calendar" className="space-y-4">
              <ContentCalendar />
            </TabsContent>
            
            <TabsContent value="ideas" className="space-y-4">
              <ContentIdeas />
            </TabsContent>
            
            <TabsContent value="assets" className="space-y-4">
              <AssetLibrary />
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-4">
              <WorkflowIntegrations />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Campaigns;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SocialSharing } from '@/components/viral/SocialSharing';
import { PublicPortfolio } from '@/components/viral/PublicPortfolio';
import { TeamInvites } from '@/components/viral/TeamInvites';
import { CollaborationFeature } from '@/components/viral/CollaborationFeature';
import { TemplateMarketplace } from '@/components/viral/TemplateMarketplace';

const Growth: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold">Growth & Adoption</h1>
        <p className="text-muted-foreground mt-1">
          Tools to help grow your audience and expand your team
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Growth Features</CardTitle>
          <CardDescription>
            Showcase your work, collaborate with others, and grow your audience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sharing" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              <TabsTrigger value="sharing">Social Sharing</TabsTrigger>
              <TabsTrigger value="portfolio">Public Portfolio</TabsTrigger>
              <TabsTrigger value="team">Team Invites</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sharing" className="space-y-6">
              <SocialSharing />
            </TabsContent>
            
            <TabsContent value="portfolio" className="space-y-6">
              <PublicPortfolio />
            </TabsContent>
            
            <TabsContent value="team" className="space-y-6">
              <TeamInvites />
            </TabsContent>
            
            <TabsContent value="collaboration" className="space-y-6">
              <CollaborationFeature />
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-6">
              <TemplateMarketplace />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Growth;

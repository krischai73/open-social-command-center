
import React from 'react';
import { Eye, MessageCircle, Share2, Heart } from 'lucide-react';
import { PerformanceCard } from '@/components/dashboard/PerformanceCard';
import { ScheduledPosts } from '@/components/dashboard/ScheduledPosts';
import { EngagementChart } from '@/components/dashboard/EngagementChart';
import { ConnectedAccounts } from '@/components/dashboard/ConnectedAccounts';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold">Welcome to SocialCommand</h1>
        <p className="text-muted-foreground mt-1">
          Your all-in-one social media management platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PerformanceCard 
          title="Total Views"
          value="12.4K"
          change={12}
          icon={<Eye />}
        />
        <PerformanceCard 
          title="Interactions"
          value="1,892"
          change={8.5}
          icon={<MessageCircle />}
        />
        <PerformanceCard 
          title="Likes"
          value="3,945"
          change={-2.4}
          icon={<Heart />}
        />
        <PerformanceCard 
          title="Shares"
          value="1,271"
          change={24.2}
          icon={<Share2 />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EngagementChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScheduledPosts />
        <ConnectedAccounts />
      </div>
    </div>
  );
};

export default Dashboard;

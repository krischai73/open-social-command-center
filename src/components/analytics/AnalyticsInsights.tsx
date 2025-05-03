
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample data for analytics
const performanceData = [
  { platform: 'Twitter', likes: 423, comments: 87, shares: 145 },
  { platform: 'Instagram', likes: 721, comments: 219, shares: 98 },
  { platform: 'Facebook', likes: 289, comments: 76, shares: 64 },
  { platform: 'LinkedIn', likes: 176, comments: 42, shares: 53 },
];

const trendData = [
  { date: 'Apr 26', engagement: 234, reach: 1245, clicks: 56 },
  { date: 'Apr 27', engagement: 278, reach: 1390, clicks: 78 },
  { date: 'Apr 28', engagement: 342, reach: 1456, clicks: 89 },
  { date: 'Apr 29', engagement: 389, reach: 1598, clicks: 102 },
  { date: 'Apr 30', engagement: 367, reach: 1687, clicks: 97 },
  { date: 'May 01', engagement: 421, reach: 1843, clicks: 124 },
  { date: 'May 02', engagement: 498, reach: 2156, clicks: 156 },
];

const contentTypeData = [
  { name: 'Images', value: 45 },
  { name: 'Videos', value: 30 },
  { name: 'Text', value: 15 },
  { name: 'Links', value: 10 },
];

const audienceData = [
  { age: '18-24', percentage: 15 },
  { age: '25-34', percentage: 35 },
  { age: '35-44', percentage: 25 },
  { age: '45-54', percentage: 15 },
  { age: '55+', percentage: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsInsights: React.FC = () => {
  const [timeframe, setTimeframe] = useState('week');

  return (
    <Card className="border-dashed border-primary/20 bg-background/50">
      <CardContent className="pt-4 pb-2">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium">Analytics & Insights</h3>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="h-8 w-[150px] text-xs">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="performance">
          <TabsList className="grid grid-cols-4 mb-2">
            <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
            <TabsTrigger value="trends" className="text-xs">Trends</TabsTrigger>
            <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
            <TabsTrigger value="audience" className="text-xs">Audience</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="platform" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip 
                  contentStyle={{ fontSize: '12px', padding: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                <Bar dataKey="shares" fill="#ffc658" name="Shares" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="trends" className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip 
                  contentStyle={{ fontSize: '12px', padding: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="engagement" stroke="#8884d8" name="Engagement" />
                <Line type="monotone" dataKey="reach" stroke="#82ca9d" name="Reach" />
                <Line type="monotone" dataKey="clicks" stroke="#ffc658" name="Clicks" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="content" className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center" 
                  fontSize={10}
                />
                <Tooltip 
                  contentStyle={{ fontSize: '12px', padding: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="audience" className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={audienceData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" fontSize={10} />
                <YAxis dataKey="age" type="category" fontSize={10} />
                <Tooltip 
                  contentStyle={{ fontSize: '12px', padding: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Bar dataKey="percentage" fill="#8884d8" name="Percentage" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
        
        <div className="mt-2 text-xs text-muted-foreground">
          <p>Key insights:</p>
          <ul className="list-disc list-inside ml-2 space-y-0.5">
            <li>Instagram has 68% higher engagement than Facebook</li>
            <li>Video content performs 2.3x better than images</li>
            <li>Peak audience activity: 6-8pm weekdays</li>
            <li>25-34 age group shows highest conversion rates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsInsights;

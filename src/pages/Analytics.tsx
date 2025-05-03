
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  LineChart,
  PieChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';
import { Download, Filter, BarChart2, TrendingUp, Users, ThumbsUp, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

// Sample data for the dashboard
const overviewData = [
  { date: 'Apr 26', engagement: 1245, reach: 5670, clicks: 356 },
  { date: 'Apr 27', engagement: 1390, reach: 6120, clicks: 423 },
  { date: 'Apr 28', engagement: 1560, reach: 7230, clicks: 512 },
  { date: 'Apr 29', engagement: 1780, reach: 8340, clicks: 478 },
  { date: 'Apr 30', engagement: 1920, reach: 9120, clicks: 597 },
  { date: 'May 01', engagement: 2150, reach: 10250, clicks: 687 },
  { date: 'May 02', engagement: 2490, reach: 12380, clicks: 756 },
];

const platformData = [
  { name: 'Twitter', value: 30 },
  { name: 'Instagram', value: 40 },
  { name: 'Facebook', value: 20 },
  { name: 'LinkedIn', value: 10 },
];

const contentPerformance = [
  { type: 'Images', engagement: 356, reach: 2450, clicks: 123 },
  { type: 'Videos', engagement: 542, reach: 3780, clicks: 245 },
  { type: 'Text only', engagement: 287, reach: 1560, clicks: 67 },
  { type: 'Links', engagement: 198, reach: 1230, clicks: 95 },
  { type: 'Carousels', engagement: 467, reach: 2890, clicks: 156 },
];

const audienceData = [
  { age: '18-24', male: 15, female: 22, other: 3 },
  { age: '25-34', male: 25, female: 29, other: 4 },
  { age: '35-44', male: 18, female: 20, other: 2 },
  { age: '45-54', male: 12, female: 10, other: 1 },
  { age: '55+', male: 8, female: 7, other: 0 },
];

const competitorData = [
  { competitor: 'Your Brand', engagement: 2490, followers: 12500, growth: 5.6 },
  { competitor: 'Competitor A', engagement: 2100, followers: 18600, growth: 3.2 },
  { competitor: 'Competitor B', engagement: 1890, followers: 9800, growth: 7.1 },
  { competitor: 'Competitor C', engagement: 3120, followers: 22400, growth: 2.8 },
];

const insightsData = [
  {
    id: 1,
    title: 'Engagement spike detected',
    description: 'Your video content is performing 2.3x better than images this week.',
    type: 'positive',
  },
  {
    id: 2,
    title: 'Optimal posting time',
    description: 'Posts published between 6-8pm on weekdays receive 47% more engagement.',
    type: 'insight',
  },
  {
    id: 3,
    title: 'Trending topic opportunity',
    description: 'Content about "sustainable practices" is gaining traction in your industry.',
    type: 'opportunity',
  },
  {
    id: 4,
    title: 'Audience change detected',
    description: '25-34 age demographic engagement increased by 18% this month.',
    type: 'insight',
  },
  {
    id: 5,
    title: 'Competitor growth alert',
    description: 'Competitor B is growing 27% faster than your accounts this quarter.',
    type: 'negative',
  },
];

const Analytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('week');
  const [platform, setPlatform] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-1">Comprehensive performance data across all platforms</p>
        </div>
        
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6">
        <Tabs defaultValue="overview">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium">Performance Summary</CardTitle>
                  <CardDescription>Engagement, reach and clicks over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={overviewData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <defs>
                        <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="engagement" stroke="#8884d8" fillOpacity={1} fill="url(#colorEngagement)" />
                      <Area type="monotone" dataKey="reach" stroke="#82ca9d" fillOpacity={1} fill="url(#colorReach)" />
                      <Area type="monotone" dataKey="clicks" stroke="#ffc658" fillOpacity={1} fill="url(#colorClicks)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium">Platform Distribution</CardTitle>
                  <CardDescription>Engagement by platform</CardDescription>
                </CardHeader>
                <CardContent className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium">Content Performance</CardTitle>
                  <CardDescription>Performance by content type</CardDescription>
                </CardHeader>
                <CardContent className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={contentPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="engagement" fill="#8884d8" />
                      <Bar dataKey="clicks" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Smart Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insightsData.map((insight) => (
                  <Card key={insight.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={`rounded-full p-2 
                          ${insight.type === 'positive' ? 'bg-green-100 text-green-700' : 
                          insight.type === 'negative' ? 'bg-red-100 text-red-700' : 
                          insight.type === 'opportunity' ? 'bg-blue-100 text-blue-700' : 
                          'bg-amber-100 text-amber-700'}`}>
                          {insight.type === 'positive' ? <ThumbsUp className="h-5 w-5" /> : 
                           insight.type === 'negative' ? <TrendingUp className="h-5 w-5 rotate-180" /> : 
                           insight.type === 'opportunity' ? <BarChart2 className="h-5 w-5" /> :
                           <Users className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{insight.title}</h4>
                            <Badge variant="outline" className={`text-xs ${
                              insight.type === 'positive' ? 'bg-green-50 text-green-700' : 
                              insight.type === 'negative' ? 'bg-red-50 text-red-700' : 
                              insight.type === 'opportunity' ? 'bg-blue-50 text-blue-700' : 
                              'bg-amber-50 text-amber-700'
                            }`}>
                              {insight.type === 'positive' ? 'Positive' : 
                               insight.type === 'negative' ? 'Action Needed' : 
                               insight.type === 'opportunity' ? 'Opportunity' : 'Insight'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mt-1">{insight.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="audience" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium">Audience Demographics</CardTitle>
                  <CardDescription>Age and gender distribution</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={audienceData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" fill="#8884d8" name="Male" />
                      <Bar dataKey="female" fill="#82ca9d" name="Female" />
                      <Bar dataKey="other" fill="#ffc658" name="Other" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Placeholder for other audience tabs that would be implemented */}
              <Card className="col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium">Growth & Retention</CardTitle>
                  <CardDescription>New followers and audience retention</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <RefreshCw className="mx-auto h-12 w-12 text-muted-foreground animate-spin opacity-25" />
                    <p className="mt-4 text-muted-foreground">Loading audience data...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="competitors" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">Competitor Benchmarking</CardTitle>
                <CardDescription>Performance compared to key competitors</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competitorData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="competitor" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="engagement" fill="#8884d8" name="Engagement" />
                    <Bar yAxisId="right" dataKey="followers" fill="#82ca9d" name="Followers (hundreds)" />
                    <Bar yAxisId="left" dataKey="growth" fill="#ffc658" name="Growth %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium">Top Performing Content</CardTitle>
                  <CardDescription>Content with highest engagement rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({length: 5}).map((_, i) => (
                      <div key={i} className="flex items-start gap-4 border-b pb-4">
                        <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-muted-foreground">IMG</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Post Title {i+1}</h4>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              {90 - i*10}% above avg
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Posted on May {i+1}, 2025</p>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span>👍 {1200 - i*100}</span>
                            <span>💬 {320 - i*40}</span>
                            <span>🔄 {280 - i*30}</span>
                            <span>👁️ {5600 - i*500}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-3 md:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium">Available Reports</CardTitle>
                  <CardDescription>Custom reports for download</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Performance Summary', 'Content Analysis', 'Audience Insights', 'Competitor Analysis', 'Full Analytics Report'].map((report, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                        <span>{report}</span>
                        <Button variant="outline" size="sm">Export</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-3 md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium">Custom Report Builder</CardTitle>
                  <CardDescription>Create tailored analytics reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">Report Type</label>
                        <Select defaultValue="performance">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="performance">Performance</SelectItem>
                            <SelectItem value="audience">Audience</SelectItem>
                            <SelectItem value="content">Content</SelectItem>
                            <SelectItem value="competitors">Competitors</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Date Range</label>
                        <Select defaultValue="30days">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7days">Last 7 days</SelectItem>
                            <SelectItem value="30days">Last 30 days</SelectItem>
                            <SelectItem value="90days">Last 90 days</SelectItem>
                            <SelectItem value="12months">Last 12 months</SelectItem>
                            <SelectItem value="custom">Custom range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Format</label>
                        <Select defaultValue="pdf">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="ppt">PowerPoint</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button>Generate Report</Button>
                      <Button variant="outline">Save Template</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;

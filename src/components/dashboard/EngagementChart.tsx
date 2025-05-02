
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const data = [
  { name: 'Apr 25', twitter: 240, instagram: 139, facebook: 221 },
  { name: 'Apr 26', twitter: 300, instagram: 198, facebook: 251 },
  { name: 'Apr 27', twitter: 200, instagram: 214, facebook: 235 },
  { name: 'Apr 28', twitter: 278, instagram: 278, facebook: 241 },
  { name: 'Apr 29', twitter: 189, instagram: 239, facebook: 230 },
  { name: 'Apr 30', twitter: 349, instagram: 271, facebook: 223 },
  { name: 'May 01', twitter: 402, instagram: 301, facebook: 250 },
  { name: 'May 02', twitter: 410, instagram: 321, facebook: 270 },
];

export const EngagementChart = () => {
  const [period, setPeriod] = React.useState('7d');
  
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-md font-medium">Engagement Overview</CardTitle>
          <CardDescription>Analytics across all connected platforms</CardDescription>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-2 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="twitterGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1DA1F2" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1DA1F2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="instagramGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E1306C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#E1306C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="facebookGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4267B2" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4267B2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
            />
            <Area
              type="monotone"
              dataKey="twitter"
              stroke="#1DA1F2"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#twitterGradient)"
              name="Twitter"
            />
            <Area
              type="monotone"
              dataKey="instagram"
              stroke="#E1306C"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#instagramGradient)"
              name="Instagram"
            />
            <Area
              type="monotone"
              dataKey="facebook"
              stroke="#4267B2"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#facebookGradient)"
              name="Facebook"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
